import {readProviderExport, estimate, compareObserved} from './provider-report.mjs';

const get=id=>document.getElementById(id);
const money=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:6});
const usd=n=>money.format(n);
const count=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n);
let generation=0, reports=[], costs=null, output=null, licenseUntil=0, activation=0;
function note(parent,text) {
  const p=document.createElement('p');
  p.textContent=text;
  parent.append(p);
}
function options(element, pairs) {
  element.replaceChildren(...pairs.map(([value,title])=>new Option(title,value)));
}
function invalidate() {
  output=null; get('providerResult').hidden=true; get('scenarioNote').textContent=''; get('exportNote').textContent='';
}
function updateMethod() {
  const compare=get('method').value==='observed';
  get('compareMode').hidden=!compare;
  get('rangeMode').hidden=compare;
  get('allocationBox').hidden=!costs?.amounts.unallocated || get('chargeScope').value!=='';
  invalidate();
}
function periodLabel(p) {
  if (!p) return 'dates unavailable';
  const utc=iso=>iso.replace('T',' ').replace(/(?:\.000)?Z$/,' UTC');
  if (p.kind==='bucketStarts') return 'bucket starts '+utc(p.first)+' to '+utc(p.last)+' (bucket end times unspecified)';
  if (p.kind==='requestTimes') return 'requests recorded '+utc(p.first)+' to '+utc(p.last);
  return utc(p.from)+' to '+utc(p.until)+' (end exclusive)'+(p.gaps?' with gaps':'');
}
function showReports() {
  const facts=get('sourceFacts'), tbody=get('chargeTable').tBodies[0];
  facts.replaceChildren(); tbody.replaceChildren();
  costs=reports.find(r=>r.kind==='costs');
  get('observed').hidden=false; get('scenario').hidden=!costs;get('chargeTable').hidden=!costs;
  for (const r of reports) {
    const period=periodLabel(r.period);
    note(facts,r.filename+' · '+r.format+' · '+r.kind+' · '+period+' · '+count(r.rows)+' records.');
    if (r.kind==='usage' || r.provider==='OpenRouter') {
      const u=r.usage;
      note(facts,(u.requestsComplete?count(u.requests)+' requests · ':'')+count(u.input)+' input tokens · '+count(u.output)+' output tokens'+
        (u.cachedComplete?' · '+count(u.cached)+' cached (included in input)':'')+(r.provider==='OpenRouter'&&u.reasoningComplete?' · '+count(u.reasoning)+' reasoning (included in output)':'')+'.');
    }
    if (r.byokUsd) note(facts,'BYOK usage separately reported: '+usd(r.byokUsd)+'. Mixed BYOK rows are excluded from the scenario; check your external provider invoice separately.');
    if (r.kind==='costs') {
      const a=r.amounts;
      note(facts,'Observed net charges: '+usd(Object.values(a).reduce((x,y)=>x+y,0))+'. Identified candidate spend: '+usd(a.inference)+'. Unitemized: '+usd(a.unallocated)+'. Other charges: '+usd(a.other)+'. Credits / adjustments: '+usd(a.adjustment)+'.');
      for (const line of r.lines) {
        const row=tbody.insertRow();
        for(const value of [line.label,usd(line.charges),usd(line.candidate)]) row.insertCell().textContent=value;
      }
    }
  }
  if (!costs) {note(facts,'Usage has no billed amounts. Select the Costs export together with this file to estimate dollar savings.');return;}
  if (reports.length>1) note(facts,'Costs and token totals are shown independently. The estimate uses only the costs file; no dollars are assigned to individual requests.');
  const named=costs.lines.filter(l=>l.candidate>0);
  options(get('chargeScope'),[['','All identified charges'],...named.map(l=>[l.label,l.label])]);
  const peers=costs.lines.filter(l=>l.comparableCalls>0);
  for (const id of ['fromModel','toModel']) options(get(id),peers.map(l=>[l.label,l.label]));
  if(peers.length>1)get('toModel').selectedIndex=1;
  get('method').querySelector('[value="observed"]').disabled=peers.length<2;
  get('method').value='discount';
  get('unallocated').value='0';get('modelShare').value='';get('discountPct').value='';
  updateMethod();
}
async function importFiles() {
  const files=[...get('providerFiles').files], run=++generation, meter=get('loadProgress');
  invalidate();reports=[];costs=null;
  get('observed').hidden=get('scenario').hidden=true;
  get('importNote').textContent='';meter.hidden=true;
  if (!files.length)return;
  try {
    if(files.length>2 || files.reduce((t,f)=>t+f.size,0)>32*1024*1024) throw Error('Choose one costs export and optionally one usage export, up to 32 MiB total.');
    meter.value=0;meter.hidden=false;
    const loaded=[];
    for(const file of files) {
      get('importNote').textContent='Reading '+file.name+'…';
      const bytes=await file.arrayBuffer();
      if(run!==generation)return;
      const r=readProviderExport(new TextDecoder('utf-8',{fatal:true}).decode(bytes),file.name);
      const digest=await crypto.subtle.digest('SHA-256',bytes);
      if(run!==generation)return;
      r.sha256=Array.from(new Uint8Array(digest),n=>n.toString(16).padStart(2,'0')).join('');
      if(loaded.some(other=>other.kind===r.kind || other.provider!==r.provider))throw Error('Choose one financial export per estimate to avoid double counting. Pair usage and costs only from the same provider.');
      loaded.push(r);meter.value=100*loaded.length/files.length;
    }
    reports=loaded;showReports(); get('importNote').textContent='Import complete.';
  }catch(e){if(run===generation){get('importNote').textContent=e.message;meter.hidden=true;}}
}
const fileInput=get('providerFiles');
fileInput.addEventListener('change',importFiles);
fileInput.disabled=false;
if(fileInput.files.length)importFiles();
for(const id of ['modelShare','discountPct','unallocated','fromModel','toModel'])get(id).addEventListener('input',invalidate);
for(const id of ['method','chargeScope'])get(id).addEventListener('change',updateMethod);
get('calculateEstimate').addEventListener('click',()=>{
  invalidate();
  try {
    const comp=get('method').value==='observed';
    const result=comp?compareObserved(costs,get('fromModel').value,get('toModel').value,get('modelShare').value):
      estimate(costs,get('modelShare').value,get('discountPct').value,get('unallocated').value,get('chargeScope').value||null);
    const assumption=comp?'Observed average '+usd(result.currentUsdPerCall)+' versus '+usd(result.alternativeUsdPerCall)+' per call, over '+count(result.modeledCalls)+' modeled calls. Assumes equivalent workload and quality.':
      usd(result.scenarioBaseUsd)+' in eligible workload × '+result.discountPct+'% effective discount. Check latency, quality and provider eligibility.';
    get('savingTitle').textContent=(result.estimatedSavingUsd<0?'Estimated extra cost: ':'Estimated savings: ')+usd(Math.abs(result.estimatedSavingUsd));
    get('savingDetail').textContent=assumption+' Observed '+usd(result.observedUsd)+'; projected '+usd(result.projectedNetUsd)+' for the imported costs period.';
    output={version:1,method:get('method').value,sources:reports,result,assumption};
    get('providerResult').hidden=false;get('unlockPanel').hidden=licenseUntil>Date.now();
  }catch(e){get('scenarioNote').textContent=e.message;}
});

async function verify(key,silent=false) {
  const id=++activation;
  try {
    if(!silent)get('exportNote').textContent='Verifying purchase…';
    const clean=key.trim();
    let expiry;
    if(window.FinOpsGuardGumroad.matches(clean)){
      if(!await window.FinOpsGuardGumroad.verify(clean)) throw Error('This receipt does not unlock FinOpsGuard.');
      expiry=Infinity;
    } else expiry=await window.FinOpsGuardSignedLicense.verify(clean);
    if(id!==activation)return;
    licenseUntil=expiry;get('unlockPanel').hidden=true;
    get('exportNote').textContent='License active. Your estimate is ready to download.';
  }catch(e){if(id===activation && !silent)get('exportNote').textContent=e.message;}
}
get('providerUnlock').addEventListener('click',()=>{const input=get('providerLicenseKey');const key=input.value;input.value='';verify(key);});
try {const key=localStorage.getItem('finopsguard.license.v2');if(key)verify(key,true);} catch {}
get('downloadEstimate').addEventListener('click',()=>{
  if(!output)return;
  if(licenseUntil<=Date.now()){get('unlockPanel').hidden=false;get('providerLicenseKey').focus();get('exportNote').textContent='Activate your license to download the report.';return;}
  const url=URL.createObjectURL(new Blob([JSON.stringify(output,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='finopsguard-provider-estimate.json';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1500);get('exportNote').textContent='Estimate downloaded.';
});
