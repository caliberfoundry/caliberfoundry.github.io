/* A local, paired comparison. The caller supplies the source charges and final review decisions. */
(() => {
  'use strict';
  const required = ['variant', 'task_id', 'call_id', 'stage', 'actor', 'cost_basis', 'cost_usd', 'verdict', 'rubric', 'expected_calls'];
  const tokenFields = ['input_tokens', 'output_tokens', 'cached_input_tokens'];
  const costTypes = new Set(['billed', 'estimated', 'subscription', 'unknown', 'no_charge']);
  const illustrativeSources = new Set(['example', 'synthetic', 'illustrative', 'demo', 'sample', 'test']);
  const variants = ['before', 'after'];
  const stages = ['execute', 'retry', 'review'];
  const decimal = /^(?:0|[1-9]\d*)(?:\.\d{1,12})?$/;
  const integer = /^(?:0|[1-9]\d*)$/;
  const round = n => Number(n.toFixed(12));

  function numeric(value, whole, label) {
    if (!(whole ? integer : decimal).test(value) || !Number.isFinite(Number(value)) || Number(value) > Number.MAX_SAFE_INTEGER) {
      throw Error('Expected a non-negative ' + (whole ? 'integer' : 'USD amount') + ' for ' + label + '.');
    }
    return Number(value);
  }

  function parseLedger(csv) {
    const parsed = window.FinOpsGuardEngine.parseCsv(csv);
    if (parsed.error) throw Error(parsed.error);
    const missing = required.filter(name => !parsed.headers.includes(name));
    if (missing.length) throw Error('Missing columns: ' + missing.join(', ') + '. Use the task CSV template.');
    if (new Set(parsed.headers).size !== parsed.headers.length) throw Error('Each column name must be unique.');
    const groups = {before: new Map(), after: new Map()};
    const ids = {before: new Set(), after: new Set()};
    let example = false;
    for (const row of parsed.rows) {
      const fail = message => { throw Error('Row ' + row.__rowIndex + ': ' + message); };
      const source = (row.dataset || '').toLowerCase();
      if (illustrativeSources.has(source)) example = true;
      else if (source && source !== 'measured') fail('Use measured or example in dataset, or leave it blank.');
      if (!variants.includes(row.variant)) fail('variant must be before or after.');
      if (!row.task_id || !row.actor) fail('Provide the task ID and actor ID.');
      const group = groups[row.variant];
      if (!group.has(row.task_id)) group.set(row.task_id, {id:row.task_id, calls:[], outcome:null});
      const task = group.get(row.task_id);
      if (row.stage === 'outcome') {
        if (task.outcome) fail('A task has more than one final outcome.');
        if (!['accepted', 'rejected', 'pending'].includes(row.verdict) || !row.rubric) fail('Provide a final verdict and rubric ID.');
        if (row.call_id || row.cost_basis || row.cost_usd || row.estimated_usd || tokenFields.some(k=>row[k])) fail('Record costs and tokens on calls only.');
        task.outcome = {verdict:row.verdict, actor:row.actor, rubric:row.rubric, expected:numeric(row.expected_calls, true, 'expected_calls at row ' + row.__rowIndex)};
        continue;
      }
      if (!stages.includes(row.stage) || !row.call_id) fail('Provide a unique call ID and an execute, retry or review stage.');
      if (row.verdict || row.rubric || row.expected_calls) fail('Put the final verdict, rubric and expected_calls on an outcome row.');
      if (ids[row.variant].has(row.call_id)) fail('Repeated call ID within a variant.');
      ids[row.variant].add(row.call_id);
      if (!costTypes.has(row.cost_basis)) fail('Use billed, estimated, no_charge, subscription or unknown in cost_basis.');
      let billed = null, estimate = null;
      if (row.cost_basis === 'billed' || row.cost_basis === 'estimated' || row.cost_basis === 'no_charge') {
        const value = numeric(row.cost_usd, false, 'cost_usd at row ' + row.__rowIndex);
        if (row.cost_basis === 'estimated') estimate = value;
        else billed = value;
        if (row.cost_basis === 'no_charge') {
          if (value !== 0) fail('A no_charge step must have cost_usd=0.');
          estimate = 0;
        }
      } else if (row.cost_usd) fail('Leave cost_usd blank for subscription and unknown pricing.');
      if (row.estimated_usd) {
        const value = numeric(row.estimated_usd, false, 'estimated_usd at row ' + row.__rowIndex);
        if (estimate !== null && estimate !== value) fail('The two estimates for this call disagree.');
        estimate = value;
      }
      const usage = tokenFields.map(key => row[key] ? numeric(row[key], true, key + ' at row ' + row.__rowIndex) : null);
      if (usage[0] !== null && usage[2] !== null && usage[2] > usage[0]) fail('Cached reads cannot exceed total input tokens.');
      task.calls.push({id:row.call_id, stage:row.stage, actor:row.actor, basis:row.cost_basis, billed, estimate, usage});
    }
    return {groups, example};
  }

  function totals(values) {
    return values.length && values.every(n=>n!==null) ? round(values.reduce((sum,n)=>sum+n,0)) : null;
  }

  function summarize(group, variant, issues) {
    const tasks = Array.from(group.values());
    const calls = tasks.flatMap(task => task.calls);
    const criteria = new Set();
    let accepted = 0, rejected = 0;
    for (const task of tasks) {
      const outcome = task.outcome;
      const workers = task.calls.filter(call=>call.stage !== 'review').map(call=>call.actor);
      const qualifiedReview = outcome && task.calls.some(call=>call.stage==='review' && call.actor===outcome.actor) && !workers.includes(outcome.actor);
      if (!outcome || !task.calls.some(call => call.stage === 'execute') || outcome.expected !== task.calls.length) {
        issues.add(variant + ' contains an incomplete task or a call-count mismatch.');
      }
      if (!outcome || outcome.verdict === 'pending') issues.add('Some tasks have no final verdict.');
      if (!qualifiedReview) issues.add('At least one outcome lacks its own independent review call.');
      if (outcome) {
        criteria.add(outcome.rubric);
        if (outcome.verdict === 'accepted') accepted++;
        if (outcome.verdict === 'rejected') rejected++;
      }
    }
    const billed = totals(calls.map(c=>c.billed));
    const estimated = totals(calls.map(c=>c.estimate));
    const observed = tokenFields.map((_,i)=>totals(calls.map(c=>c.usage[i])));
    const tokens = observed[0] !== null && observed[1] !== null ? observed[0]+observed[1] : null;
    const fresh = observed[0]!==null && observed[2]!==null ? observed[0]-observed[2] : null;
    const byStage = {};
    for (const stage of stages) {
      const part = calls.filter(c=>c.stage===stage);
      byStage[stage] = {calls:part.length, billed:part.length ? totals(part.map(c=>c.billed)) : 0,
        estimate:part.length ? totals(part.map(c=>c.estimate)) : 0};
    }
    const unit = total=>total!==null && accepted ? round(total / accepted) : null;
    return {tasks:tasks.length, accepted, rejected, calls:calls.length, criteria:[...criteria], byStage,
      billed, estimated, tokens, freshInput:fresh, cachedInput:observed[2], output:observed[1],
      unitBilled:unit(billed), unitEstimated:unit(estimated), unitTokens:unit(tokens),
      priceSources:[...new Set(calls.map(c=>c.basis))]};
  }

  function compare(csv) {
    const {groups, example} = parseLedger(csv);
    const issues = new Set();
    const result = {};
    for (const variant of variants) result[variant] = summarize(groups[variant], variant, issues);
    const taskIds = new Set([...groups.before.keys(), ...groups.after.keys()]);
    const common = [];
    const lost = [];
    for (const id of taskIds) {
      const before = groups.before.get(id), after = groups.after.get(id);
      if (!before || !after) { issues.add('Use exactly the same task IDs before and after.'); continue; }
      if (before.outcome?.rubric !== after.outcome?.rubric) issues.add('An acceptance rubric changed between paired runs.');
      if (before.outcome?.verdict==='accepted' && after.outcome?.verdict==='rejected') lost.push(id);
      common.push(id);
    }
    if (new Set([...result.before.criteria, ...result.after.criteria]).size !== 1) issues.add('Use one common acceptance rubric for this task type.');
    if (lost.length) issues.add(lost.length + (lost.length===1 ? ' previously accepted task failed' : ' previously accepted tasks failed') + ' after the change.');
    if (!result.before.accepted || !result.after.accepted) issues.add('Each variant needs at least one accepted task to compare unit cost.');
    // Only compare like measures. Report a missing or incomplete price explicitly.
    const present = key=>variants.every(v=>result[v][key]!==null);
    const metric = present('billed') ? 'billed' : present('estimated') ? 'estimated' : present('tokens') ? 'tokens' : 'unpriced';
    const units = {billed:'unitBilled', estimated:'unitEstimated', tokens:'unitTokens'};
    const key = units[metric];
    const baseline = key ? result.before[key] : null;
    const current = key ? result.after[key] : null;
    const complete = issues.size===0;
    const difference = complete && baseline!==null && current!==null ? round(baseline-current) : null;
    const changedPct = difference!==null && baseline>0 ? round(100*difference/baseline) : null;
    return {version:1, example, ...result, matchedTasks:common.length, lostAcceptances:lost, issues:[...issues], qualityGate:complete,
      metric, baseline, current, difference, changedPct,
      reportedSavingsPerAcceptedTaskUsd:!example && complete && metric==='billed' && difference>0 ? difference : null};
  }

  const sampleHeader = [...required, ...tokenFields, 'dataset'];
  function sampleRows(scenario) {
    const rows = [sampleHeader];
    const baseline = [[[.11,1100],[.07,700],[.03,300]],[[.13,1300],[.03,300]],[[.10,1000],[.05,500]]];
    const optimized = [[[.10,1000],[.02,200]],[[.11,1100],[.03,300]],[[.07,700],[.03,300]]];
    for (const variant of variants) {
      const series = variant==='before' ? baseline : optimized;
      series.forEach((calls,i)=>{
        const task = 'item-' + (i+1);
        calls.forEach(([price,tokens],j)=>{
          const stage = j===calls.length-1 ? 'review' : j===0 ? 'execute' : 'retry';
          const subscription=scenario==='unpriced';
          rows.push([variant,task,variant+'-'+task+'-'+j,stage,stage==='review'?'checker':'worker',
            subscription?'subscription':'billed',subscription?'':price,'','','',tokens,tokens/5,0,'example']);
        });
        let accepted=i!==2;
        if(scenario==='quality' && variant==='after') accepted=i!==0;
        rows.push([variant,task,'','outcome','checker','','',accepted?'accepted':'rejected','rubric-1',calls.length,'','','','example']);
      });
    }
    return rows.map(row=>row.join(',')).join('\n')+'\n';
  }

  const $ = id=>document.getElementById(id);
  const show = (id,value)=>{$(id).textContent=value;};
  function currency(n) {
    if (n === null) return 'Unavailable';
    if (n > 0 && n < 0.000001) return '< $0.000001';
    const digits = n === 0 || n >= 1 ? 2 : Math.min(6, Math.max(2, 3-Math.floor(Math.log10(n))));
    return new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2, maximumFractionDigits:digits}).format(n);
  }
  const count = n=>n===null?'Unavailable':n.toLocaleString('en-US',{maximumFractionDigits:2});
  const state = {report:null, csv:'', name:'', sample:null, serial:0};
  const names = {retry:'Fewer retries', quality:'Quality regression', unpriced:'Subscription usage'};
  const displayUnit = (metric,n)=>n===null?'—':metric==='tokens'?count(n):currency(n);
  const canExport = ()=>Boolean(state.report && (state.sample || window.FinOpsGuardLicense.active()));
  function syncAccess() {
    $('taskExportActions').hidden=!canExport();
    $('taskExportLicense').hidden=!state.report || canExport();
    show('taskExportExplanation',!state.report?'Import a ledger to create a report.':canExport()
      ?'Download the cohort totals, stage costs and quality checks for this ledger.':'The summary is ready. FinOpsGuard Pro unlocks the comparison report for your own ledger.');
    show('taskExportStatus','');
  }
  function appendMetric(label,a,b) {
    const row=document.createElement('tr');
    const heading=document.createElement('th'); heading.scope='row'; heading.textContent=label; row.append(heading);
    for(const value of [a,b]) {const td=document.createElement('td'); td.textContent=value; row.append(td);}
    $('taskBreakdown').append(row);
  }
  function render() {
    const r=state.report;
    $('results').hidden=$('taskEvidence').hidden=!r;
    syncAccess();
    if(!r)return;
    const label=r.metric==='estimated'?'Estimated API cost':r.metric==='tokens'?'Tokens':r.metric==='unpriced'?'Cost':'Billed LLM cost';
    show('taskMetricTitle',label+' per accepted task');
    show('taskSourceName',(r.example?'Illustrative data':'Imported ledger')+' · '+state.name);
    const stepLabel = r.example ? 'call' : 'step';
    const counted = (n,label)=>n+' '+label+(n===1?'':'s');
    const stepNote = $('taskStepNote');
    if (stepNote) stepNote.hidden = r.example;
    const max=Math.max(r.baseline||0,r.current||0);
    for(const v of variants) {
      const s=r[v], prefix=v==='before'?'taskBefore':'taskAfter';
      const value=v==='before'?r.baseline:r.current;
      show(prefix+'Unit',displayUnit(r.metric,value));
      $(prefix+'Bar').style.width=(value!==null && max>0?Math.min(100,100*value/max):0)+'%';
      show(prefix+'Note',s.accepted+' of '+s.tasks+' tasks accepted · '+counted(s.calls, r.example ? 'call' : 'recorded step'));
    }
    if(r.issues.length) {
      show('taskVerdict',r.lostAcceptances.length?'Quality regression':'Comparison on hold');
      show('taskDecision',r.issues.join(' '));
    } else if(r.metric==='unpriced') {
      show('taskVerdict','Cost unavailable');
      show('taskDecision','Add complete charges, rate-card estimates or token counts to compare the two runs.');
    } else {
      const direction=r.difference>0?'lower':r.difference<0?'higher':'unchanged';
      const percent=r.changedPct!==null && r.changedPct!==0 ? Math.abs(r.changedPct).toLocaleString('en-US',{maximumFractionDigits:1})+'% ' : '';
      const unit={billed:'unit cost',estimated:'estimated API cost',tokens:'token use'}[r.metric];
      show('taskVerdict',r.difference===0?'Same '+unit:percent+direction+' '+unit);
      const usageQualifier = r.example ? 'Actual USD per call is unavailable.' : 'Complete billed amounts are unavailable.';
      const explanations = {
        billed: 'The comparison includes every listed attempt and review, including work on rejected tasks.',
        estimated: 'API equivalents use the supplied rate-card estimates and count steps reported at zero LLM cost as $0. Actual billed savings are unverified.',
        tokens: usageQualifier+' Token usage is compared for the supplied cohort.'
      };
      show('taskDecision',(r.example ? 'Illustrative comparison. ' : '')+explanations[r.metric]);
    }
    show('taskQuality',r.qualityGate?'Every previously accepted task passed the same rubric in this cohort.':'Paired tasks: '+r.matchedTasks+'. The quality check is incomplete or has a regression.');
    $('taskBreakdown').replaceChildren();
    const row=(label,calc)=>appendMetric(label,calc(r.before),calc(r.after));
    row('Accepted tasks',s=>s.accepted+' / '+s.tasks);
    row('Billed LLM spend',s=>currency(s.billed));
    row('API-equivalent spend',s=>currency(s.estimated));
    for(const [stage,label] of [['execute','Execution'],['retry','Retries'],['review','Independent review']]) {
      row(label,s=>{const part=s.byStage[stage]; const money=r.metric==='estimated'?part.estimate:part.billed;
        return counted(part.calls,stepLabel)+(money!==null?' · '+currency(money):'');});
    }
    row('Fresh input tokens',s=>count(s.freshInput));
    row('Cached input tokens',s=>count(s.cachedInput));
    row('Output tokens',s=>count(s.output));
    row('Tokens per accepted task',s=>count(s.unitTokens));
  }

  function message(text, pct=100, error=false) {
    $('taskImportState').hidden=false;
    $('taskImportState').toggleAttribute('data-error',error);
    $('taskProgress').value=pct;
    show('taskMessage',text);
  }
  function apply(csv,name,sample=null,notify=true) {
    state.csv=csv; state.name=name; state.sample=sample; state.report=null;
    try { state.report=compare(csv); if (notify) message('Reviewed '+name+' · '+state.report.matchedTasks+' paired tasks.'); }
    catch(error){message(error.message,0,true);}
    for(const button of document.querySelectorAll('[data-task-example]'))button.setAttribute('aria-pressed',String(button.dataset.taskExample===sample));
    render();
  }
  function useSample(key,notify=true) {
    state.serial++;
    apply(sampleRows(key),names[key],key,notify);
  }
  for(const button of document.querySelectorAll('[data-task-example]'))button.addEventListener('click',()=>{
    const url=new URL(location.href);url.searchParams.set('example',button.dataset.taskExample);url.hash='calls';
    history.replaceState(null,'',url); useSample(button.dataset.taskExample);
  });
  $('taskImport').addEventListener('click',()=>$('taskLedgerFile').click());
  $('taskLedgerFile').addEventListener('change',event=>{
    const file=event.target.files[0];
    if(!file)return;
    event.target.value='';
    const version=++state.serial;
    state.report=null;state.sample=null;render();
    document.querySelectorAll('[data-task-example]').forEach(b=>b.setAttribute('aria-pressed','false'));
    const url=new URL(location.href);url.searchParams.delete('example');url.hash='calls';history.replaceState(null,'',url);
    if(file.size>16*1024*1024) {message('This file exceeds 16 MiB. Export one matched task cohort and retry.',0,true);return;}
    const reader=new FileReader();
    const started=performance.now();
    message('Reading '+file.name+'…',0);
    reader.onprogress=e=>{
      if(version!==state.serial || !e.lengthComputable || !e.total)return;
      const pct=Math.floor(e.loaded/e.total*100);
      const seconds=e.loaded?Math.ceil((performance.now()-started)*(e.total-e.loaded)/e.loaded/1000):0;
      message('Reading '+file.name+' · '+pct+'%'+(seconds?' · about '+seconds+' s left':''),pct);
    };
    reader.onload=()=>{if(version===state.serial)apply(String(reader.result),file.name);};
    reader.onerror=()=>{if(version===state.serial)message('Could not read this file. Select the file to try again.',0,true);};
    reader.readAsText(file);
  });
  $('taskExportJson').addEventListener('click',async()=>{
    if(!canExport())return;
    const report=state.report, serial=state.serial;
    const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(state.csv));
    if(serial!==state.serial || report!==state.report || !canExport())return;
    const hash=Array.from(new Uint8Array(bytes),n=>n.toString(16).padStart(2,'0')).join('');
    const payload={source:{file:state.name,sha256:hash,type:report.example?'illustrative':'user-supplied'},report};
    const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download='finopsguard-llm-'+hash.slice(0,12)+'.json';
    document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    show('taskExportStatus','Comparison report prepared for download.');
  });
  document.addEventListener('finops-license-change',syncAccess);
  window.FinOpsGuardTaskAudit=Object.freeze({compare,sampleRows});
  const preset=new URLSearchParams(location.search).get('example');
  useSample(Object.hasOwn(names,preset)?preset:'retry',false);
})();
