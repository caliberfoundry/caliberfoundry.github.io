import {parseCsv} from '../assets/js/delimited.mjs';

function requireThat(condition, message) {
  if (!condition) throw Error(message);
}

function number(value, label, tokens = false) {
  requireThat((typeof value === 'string' && value.trim() !== '') || typeof value === 'number', 'Missing ' + label + '.');
  requireThat(typeof value==='number' || /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim()), 'Invalid '+label+'.');
  const n = Number(value);
  requireThat(Number.isFinite(n) && (!tokens || (Number.isSafeInteger(n) && n >= 0)), 'Invalid ' + label + '.');
  return n;
}

function timestamp(value) {
  if (value == null || value === '') return null;
  const raw = String(value).trim();
  const normalized = /^\d{4}-\d\d-\d\d[ T]\d\d:\d\d:\d\d(?:\.\d+)?$/.test(raw) ? raw.replace(' ','T')+'Z' : raw;
  const ms = /^\d{10}$/.test(raw) ? Number(raw) * 1000 : Date.parse(normalized);
  requireThat(Number.isFinite(ms), 'Invalid reporting date.');
  return ms;
}

function coverage(item, periods) {
  const start = timestamp(item.start_time ?? item.start_datetime);
  const end = timestamp(item.end_time ?? item.end_datetime);
  if (start !== null && end !== null) {
    requireThat(end > start, 'A report bucket ends before it starts.');
    periods.push({start,end});
  }
}

function category(label, amount) {
  if (amount <= 0) return 'adjustment';
  if (!label) return 'unallocated';
  if (/\bevals?\b|cache[d ]|batch|storage|training|fine.tun(ing|e job)|file search|image|audio|embedding|realtime|web search|tool|container/i.test(label)) return 'other';
  // An identified inference charge is a candidate for review. Never infer the model from an organization total.
  const model = /(?:\bgpt[- ]|\bo[134](?:[- :]|$)|\bchatgpt[- ])/i.test(label);
  if (model && /\b(input|output|prompt|completion|tokens?)\b/i.test(label)) return 'inference';
  return 'other';
}

function addCost(report, item) {
  const currency = String(item.amount?.currency ?? item.amount_currency ?? item.currency ?? '').trim().toUpperCase();
  requireThat(currency === 'USD', 'A cost row has missing or non-USD currency. Use a USD export.');
  const amount = number(item.amount?.value ?? item.amount_value, 'charge');
  const label = String(item.line_item ?? '').trim();
  const kind = category(label,amount);
  report.amounts[kind] += amount;
  const group = label || 'Unitemized charges';
  const entry = report.lines.get(group) || {label:group, charges:0, candidate:0};
  entry.charges += amount;
  if (kind === 'inference') entry.candidate += amount;
  report.lines.set(group, entry);
}

function addUsage(report, item) {
  const input = number(item.input_tokens,'input tokens',true);
  const output = number(item.output_tokens,'output tokens',true);
  const cached = item.input_cached_tokens;
  report.usage.input += input;
  report.usage.output += output;
  if (cached == null || cached === '') report.usage.cachedComplete = false;
  else {
    const c = number(cached,'cached tokens',true);
    requireThat(c <= input,'Cached tokens exceed input tokens.');
    report.usage.cached += c;
  }
  if (item.num_model_requests == null || item.num_model_requests === '') report.usage.requestsComplete = false;
  else report.usage.requests += number(item.num_model_requests,'request count',true);
}

function addOpenRouter(report, row, activity) {
  const model=String(activity ? row.slug : row.model_permaslug).trim();
  requireThat(model,'Missing model.');
  const amount=number(activity ? row.usage : row.cost_total,'reported USD usage');
  const requests=activity ? number(row.requests,'request count',true) : 1;
  const byok=activity ? number(row.byok_usage ?? 0,'BYOK usage') : 0;
  const inputs=number(activity ? row.prompt_tokens : row.tokens_prompt,'prompt tokens',true);
  const outputs=number(activity ? row.completion_tokens : row.tokens_completion,'completion tokens',true);
  const reasoning=activity ? row.reasoning_tokens : row.tokens_reasoning;
  const reasoningCount=reasoning == null || reasoning==='' ? null : number(reasoning,'reasoning tokens',true);
  const date=timestamp(activity ? row.date : row.created_at);
  requireThat(date!==null,'Missing date.');
  const kind=amount<0?'adjustment':requests===0 || byok>0 || (!activity && (String(row.variant).toLowerCase()!=='standard' ||
    ['error','cancelled','canceled'].includes(String(row.finish_reason_normalized).toLowerCase()))) ? 'other':'inference';
  report.amounts[kind]+=amount;
  report.byokUsd+=byok;
  report.usage.requests+=requests; report.usage.input+=inputs; report.usage.output+=outputs;
  if (reasoningCount!==null) report.usage.reasoning+=reasoningCount;
  else report.usage.reasoningComplete=false;
  let line=report.lines.get(model);
  if (!line) { line={label:model,charges:0,candidate:0,comparableCalls:0}; report.lines.set(model,line); }
  line.charges+=amount;
  if (kind==='inference' && requests>0) {line.candidate+=amount;line.comparableCalls+=requests;}
  report.usage.cachedComplete=false;
  return date;
}

function summarizePeriod(periods) {
  if (!periods.length) return null;
  const sorted = periods.sort((a,b)=>a.start-b.start);
  let end = sorted[0].end, gaps = false;
  for (const p of sorted) {
    if (p.start > end) gaps = true;
    end = Math.max(end,p.end);
  }
  return {from:new Date(sorted[0].start).toISOString(), until:new Date(end).toISOString(), gaps};
}

export function readProviderExport(text, filename) {
  const report = {filename, provider:"OpenAI", format:"OpenAI organization report", byokUsd:0, kind:null, rows:0, period:null, amounts:{inference:0, other:0, adjustment:0, unallocated:0},
    lines:new Map(), usage:{input:0,output:0,cached:0,requests:0,reasoning:0,reasoningComplete:true,cachedComplete:true,requestsComplete:true}};
  const periods=[];
  function add(item, row) {
    requireThat(item && typeof item === 'object', 'Invalid result at row '+row+'.');
    const kind = item.amount?.value != null || Object.hasOwn(item,'amount_value') ? 'costs' :
      Object.hasOwn(item,'input_tokens') && Object.hasOwn(item,'output_tokens') ? 'usage' : null;
    requireThat(kind, 'Unrecognized OpenAI costs or completions record at row '+row+'.');
    requireThat(!report.kind || report.kind===kind, 'Keep costs and usage in separate files.');
    report.kind=kind;
    try { if (kind==='costs') addCost(report,item); else addUsage(report,item); }
    catch (e) { throw Error('Row '+row+': '+e.message); }
    report.rows++;
  }
  const src=text.replace(/^\uFEFF/,'').trim();
  requireThat(src,'The file is empty.');
  if (/^[{\[]/.test(src)) {
    const data=JSON.parse(src);
    requireThat(!data.has_more,'This API page is incomplete. Retrieve all pages and combine their data arrays, or export the full range as CSV.');
    const buckets=Array.isArray(data)?data:data.data;
    requireThat(Array.isArray(buckets),'Expected an OpenAI response with a data array or the array of buckets.');
    let previousEnd=null;
    for (const bucket of buckets) {
      requireThat(Array.isArray(bucket?.results),'Expected results inside each time bucket.');
      const start=timestamp(bucket.start_time), end=timestamp(bucket.end_time);
      requireThat(start!==null && end!==null && (previousEnd===null || start>=previousEnd), 'Missing, duplicate or out-of-order time buckets.');
      previousEnd=end;
      coverage(bucket,periods);
      for (const item of bucket.results) add(item,report.rows+1);
    }
  } else {
    const [head,...rows]=parseCsv(src);
    const names=head.map(h=>h.trim().toLowerCase().replace(/[. ]/g,'_'));
    requireThat(new Set(names).size===names.length,'The CSV has duplicate column names.');
    const activity=['date','slug','usage','requests','prompt_tokens','completion_tokens'].every(k=>names.includes(k));
    const generation=['created_at','model_permaslug','cost_total','tokens_prompt','tokens_completion','variant'].every(k=>names.includes(k));
    if (activity || generation) {
      report.kind='costs'; report.provider='OpenRouter';
      report.format=activity?'OpenRouter Activity CSV':'OpenRouter Generations CSV';
    }
    requireThat(activity || generation || names.includes('amount_value') || (names.includes('input_tokens') && names.includes('output_tokens')), 'Expected OpenRouter Activity / Generations, OpenAI Costs (amount_value and currency) or completions usage (input_tokens and output_tokens). For AWS, FOCUS or a normalized CSV use Cloud billing audit.');
    rows.forEach((row,i)=>{
      requireThat(row.length===names.length,'Column count differs at CSV record '+(i+2)+'.');
      const item=Object.fromEntries(names.map((k,j)=>[k,row[j]]));
      if (activity || generation) {
        let date;
        try {date=addOpenRouter(report,item,activity);} catch(e) {throw Error('Row '+(i+2)+': '+e.message);}
        report.rows++;
        periods.push({start:date, end:date});
      } else {add(item,i+2);coverage(item,periods);}
    });
  }
  requireThat(report.rows,'This export contains no cost or usage records.');
  report.period=summarizePeriod(periods);
  if (report.provider==='OpenRouter' && report.period) {
    report.period={first:report.period.from,last:report.period.until,kind:report.format==='OpenRouter Activity CSV'?'bucketStarts':'requestTimes'};
  }
  report.lines=[...report.lines.values()].sort((a,b)=>b.charges-a.charges);
  return report;
}

export function estimate(report, shareValue, discountValue, allocationValue, selectedLabel = null) {
  requireThat(report?.kind==='costs','Import the Costs file to calculate dollar savings.');
  const share=number(shareValue,'eligible workload share'), discount=number(discountValue,'effective discount');
  requireThat(share>=0 && share<=100 && discount>=0 && discount<=100,'Enter percentages between 0 and 100.');
  const allocated=selectedLabel!==null || allocationValue==='' || allocationValue==null ? 0 : number(allocationValue,'documented inference spend');
  requireThat(allocated>=0 && allocated<=report.amounts.unallocated + 1e-8,'Documented allocation must fit within the unitemized charges.');
  const line=selectedLabel===null ? null : report.lines.find(l=>l.label===selectedLabel);
  requireThat(selectedLabel===null || line,'Selected model is missing.');
  const base=line ? line.candidate : report.amounts.inference+allocated;
  const observed=Object.values(report.amounts).reduce((sum,n)=>sum+n,0);
  requireThat(base>0 || report.amounts.unallocated===0, 'This report does not identify inference spend. Enter a substantiated allocation or import costs grouped by line item.');
  const eligible=base*share/100;
  const saving=eligible*discount/100;
  return {observedUsd:observed,identifiedInferenceUsd:report.amounts.inference,unitemizedUsd:report.amounts.unallocated,
    selectedLine:selectedLabel,assignedByUserUsd:line?0:allocated,eligibleSharePct:share,discountPct:discount,scenarioBaseUsd:eligible,estimatedSavingUsd:saving,
    projectedNetUsd:observed-saving,period:report.period};
}

export function compareObserved(report, from, to, shareValue) {
  const share=number(shareValue,'eligible workload share');
  requireThat(share>=0 && share<=100,'Enter a workload share between 0 and 100.');
  const a=report.lines.find(l=>l.label===from), b=report.lines.find(l=>l.label===to);
  requireThat(a && b && a!==b && a.comparableCalls>0 && b.comparableCalls>0,'Select two different models with observed calls.');
  const before=a.candidate/a.comparableCalls, after=b.candidate/b.comparableCalls;
  const calls=a.comparableCalls*share/100;
  const observed=Object.values(report.amounts).reduce((sum,n)=>sum+n,0);
  const difference=calls*(before-after);
  return {from,to,eligibleSharePct:share,modelCalls:a.comparableCalls,comparisonCalls:b.comparableCalls,
    currentUsdPerCall:before,alternativeUsdPerCall:after,modeledCalls:calls,observedUsd:observed,
    estimatedSavingUsd:difference,projectedNetUsd:observed-difference,period:report.period};
}
