/* Keep buyer worksheet coordinates attached to the normal DealShield review. */
window.createDealWorkbookWorkflow=function({state, makeControl, render, inspect}) {
  const el=id=>document.getElementById(id);
  let book=null, filename='', rows=[], importVersion=0, version=0, exporting=false;
  const mapped=new Set();
  const columnNumber=letter=>[...letter].reduce((n,c)=>26*n+c.charCodeAt(0)-64,0);
  const opt=(node,pairs)=>node.replaceChildren(...pairs.map(([value,label])=>new Option(label,value)));
  const passages=()=>window.DealShieldEvidence.splitPolicy(el('sourceCorpusTextarea').value);
  const coordinate=(i,r,c)=>i+':'+r+':'+c;
  function clear() {
    importVersion++;version++;
    book=null; rows=[]; mapped.clear(); exporting=false;
    for(const id of ['workbookMapping','wbInspector','wbExport','wbProgress'])el(id).hidden=true;
    for(const id of ['wbStatus','wbDownloadStatus','wbExportSummary'])el(id).textContent='';
    el('fileInputQuestionnaire').value='';
  }
  function range(){
    const first=Number(el('wbFirst').value),last=Number(el('wbLast').value);
    if(!Number.isInteger(first)||!Number.isInteger(last)||first<1||last<first||last>1048576)throw Error('Select a valid inclusive row range.');
    const col=el('wbQuestion').value;
    return rows.filter(r=>r.number>=first && r.number<=last && String(r.cells[col]??'').trim());
  }
  function preview() {
    try {
      const found=range();
      el('wbPreview').textContent=found.length+' rows containing question text.'+(found.length?' First: '+String(found[0].cells[el('wbQuestion').value]).slice(0,180):'');
    }catch(e){el('wbPreview').textContent=e.message;}
  }
  function chooseSheet(){
    try {
      rows=book.preview(Number(el('wbSheet').value));
      const columns=[...new Set(rows.flatMap(r=>Object.keys(r.cells)))].sort((a,b)=>columnNumber(a)-columnNumber(b));
      if(!columns.length)throw Error('Empty worksheet. Select a questionnaire sheet.');
      const isQuestionHeader=value=>typeof value==='string' && value.length<100 &&
        /\bquestions?(?:\s+text)?\s*$/i.test(value.trim()) && !/\b(?:id|code|number|response|answer)\b/i.test(value);
      const isQuestion=value=>typeof value==='string' && /\?\s*\**\s*$/.test(value);
      const header=rows.find(r=>Object.values(r.cells).some(isQuestionHeader));
      const counts=new Map(columns.map(c=>[c,0]));
      if(!header)for(const row of rows)for(const [c,value] of Object.entries(row.cells))if(isQuestion(value))counts.set(c,counts.get(c)+1);
      const question=columns.find(c=>header&&isQuestionHeader(header.cells[c])) ||
        columns.reduce((best,c)=>counts.get(c)>counts.get(best)?c:best,columns[0]);
      const next=columnNumber(question)+1;
      if(next<=16384 && !columns.some(c=>columnNumber(c)===next)){
        let n=next, label='';
        while(n){n--;label=String.fromCharCode(65+n%26)+label;n=Math.floor(n/26);}
        columns.push(label);columns.sort((a,b)=>columnNumber(a)-columnNumber(b));
      }
      const pairs=columns.map(c=>[c,c+(header?.cells[c]?' · '+header.cells[c].slice(0,50):'')]);
      opt(el('wbQuestion'),pairs);opt(el('wbAnswer'),pairs);opt(el('wbExtra'),[['','None'],...pairs]);
      el('wbQuestion').value=question;
      el('wbAnswer').value=columns.find(c=>c!==question&&header&&/^(?:csp )?(?:caiq )?(?:response|answer)(?:s| to question)?$/i.test(header.cells[c]||'')) || columns[columns.indexOf(question)+1] || columns[0];
      const qs=rows.filter(r=>isQuestion(r.cells[question]));
      el('wbFirst').value=header?header.number+1:qs[0]?.number||rows[0].number;
      el('wbLast').value=qs.at(-1)?.number||rows.at(-1).number;
      el('wbStatus').textContent=''; preview();
    }catch(e){rows=[];el('wbPreview').textContent=e.message;}
  }
  async function open(file){
    const stamp=importVersion, feedback=el('customParseFeedback');
    feedback.classList.remove('hidden');feedback.textContent='Opening Excel workbook…';
    try {
      const loaded=await window.DealWorkbook.open(file);
      if(stamp!==importVersion)return;
      book=loaded; filename=file.name;
      const sheets=book.sheets.map((s,i)=>[String(i),s.name,s.visibility]).filter(x=>x[2]==='visible');
      if(!sheets.length)throw Error('No visible worksheets.');
      opt(el('wbSheet'),sheets);
      el('wbSheet').value=(sheets.find(x=>/^(?:CAIQ|Organization$|Questionnaire)/i.test(x[1]))||sheets[0])[0];
      el('dealSetup').open=true;el('detailsCustomUpload').open=true;
      el('workbookMapping').hidden=false;chooseSheet();el('wbSheet').focus();
      feedback.textContent=filename+' opened. Choose the cells to fill below.';
    }catch(e){if(stamp===importVersion)feedback.textContent=e.message;}
  }
  function add(){
    try {
      if(state.sourceDirty)throw Error('Refresh answers after changing the policy, then add the range.');
      const i=Number(el('wbSheet').value),q=el('wbQuestion').value,a=el('wbAnswer').value,x=el('wbExtra').value;
      if(!a || !q || a===q || (x && (x===q || x===a)))throw Error('Choose distinct question, answer and explanation columns.');
      const existing=new Set(), result=[], sections=passages();
      for(const c of state.controls) if(c.wb)for(const col of [c.wb.a,c.wb.x].filter(Boolean))existing.add(coordinate(c.wb.i,c.wb.row,col));
      let skipped=0, reason='';
      for(const record of range()){
        const row=record.number,key=coordinate(i,row,q);
        if(mapped.has(key)||[a,x].filter(Boolean).some(col=>existing.has(coordinate(i,row,col)))){skipped++;reason='already mapped';continue;}
        const choices=book.allowedValues(i,row,a);
        const why=book.blockedReason(i,row,a,choices?.[0]);
        if(why){skipped++;reason=why;continue;}
        if(x && book.blockedReason(i,row,x)){skipped++;reason='explanation cell is unavailable';continue;}
        const ref=book.sheets[i].name+'!'+q+row;
        const c=makeControl(record.cells[q],state.controls.length+result.length,sections);
        c.id=ref;c.domain=book.sheets[i].name;c.wb={i,row,q,a,x,choices,key};
        result.push(c);
      }
      if(result.length+state.controls.length>5000)throw Error('Select a smaller range (up to 5,000 questions per review).');
      if(result.length){
        result.forEach(c=>mapped.add(c.wb.key));state.controls.push(...result);state.sourceDirty=false;
        el('wbExport').hidden=false;render();
      }
      el('wbStatus').textContent=result.length+' questions added. '+skipped+' skipped'+(reason?' (e.g. '+reason+')':'')+'.';
      if(result.length)inspect(result[0]);
    }catch(e){el('wbStatus').textContent=e.message;}
  }
  function showInspector(c,locked){
    const wb=c?.wb;el('wbInspector').hidden=!wb;
    if(!wb)return;
    el('wbAddress').textContent=book.sheets[wb.i].name+' · Answer '+wb.a+wb.row+(wb.x?' · Explanation '+wb.x+wb.row:'');
    el('wbChoiceLabel').hidden=!wb.choices;
    if(wb.choices){opt(el('wbChoice'),[['','Choose a response'],...wb.choices.map(v=>[v,v])]);el('wbChoice').value=c.wbChoice||'';el('wbChoice').disabled=locked;}
    const source=passages();
    opt(el('wbEvidence'),[['','Select supporting evidence'],...source.map((s,i)=>[String(i),s.anchor+' · '+s.excerpt.slice(0,92)])]);
    const idx=source.findIndex(s=>s.line===c.evidence?.line && s.excerpt===c.evidence?.excerpt);
    el('wbEvidence').value=idx<0?'':String(idx);
    el('wbEvidence').disabled=locked;
  }
  function record(c,decision){
    if(!c.wb)return true;
    const sel=el('wbEvidence').value, passage=sel===''?null:passages()[Number(sel)];
    if(decision==='REVIEWED' && c.wb.choices && !el('wbChoice').value){el('inspectorSaveStatus').textContent='Select a permitted workbook response before approving.';return false;}
    if(decision==='REVIEWED' && !passage){el('inspectorSaveStatus').textContent='Select a supporting policy passage before approving.';return false;}
    if(decision==='REVIEWED' && !el('inspectorAnswerTextarea').value.trim()){el('inspectorSaveStatus').textContent='Enter a response before approving.';return false;}
    c.evidence=passage?{line:passage.line,anchor:passage.anchor,excerpt:passage.excerpt}:null;
    c.anchor=passage?.anchor||'';c.wbChoice=c.wb.choices?el('wbChoice').value:null;
    return true;
  }
  function approved(){
    return state.controls.filter((c,index)=>c.wb&&c.status==='REVIEWED'&&c.evidence&&c.answer.trim()&&(state.isProUnlocked||index<6));
  }
  function sync(){
    version++;exporting=false;el('wbProgress').hidden=true;
    if(!book)return;
    const count=approved().length;
    el('wbDownload').disabled=state.sourceDirty||!count;
    el('wbDownloadStatus').textContent='';
    el('wbExportSummary').textContent=state.sourceDirty?'Refresh and review the changed policy before exporting.':
      count+' approved of '+state.controls.length+' mapped questions ready to write.'+(state.isProUnlocked?'':' Free preview covers the first six mapped questions.');
  }
  async function download(){
    if(exporting || state.sourceDirty || !book)return;
    const stamp=version, groups=new Map(), edits=approved();
    if(!edits.length)return;
    function addCell(wb,col,text) {
      const key=wb.i+':'+col;
      if(!groups.has(key))groups.set(key,{sheetIndex:wb.i,answerCol:col,edits:[]});
      groups.get(key).edits.push({row:wb.row,text});
    }
    for(const c of edits){
      addCell(c.wb,c.wb.a,c.wb.choices?c.wbChoice:c.answer);
      if(c.wb.x)addCell(c.wb,c.wb.x,c.wb.choices?c.answer:c.evidence.excerpt);
    }
    exporting=true;const progress=el('wbProgress');
    progress.hidden=false;progress.value=0;el('wbDownload').disabled=true;el('wbDownloadStatus').textContent='Preparing the approved cells…';
    try{
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      if(stamp!==version)return;
      progress.value=50;
      const blob=await book.fillMany([...groups.values()]);if(stamp!==version)return;
      const url=URL.createObjectURL(blob),link=document.createElement('a');
      link.href=url;link.download=filename.replace(/\.xlsx$/i,'')+'-reviewed.xlsx';link.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
      progress.value=100;el('wbDownloadStatus').textContent=link.download+' prepared with '+edits.length+' reviewed responses.';
    }catch(e){if(stamp===version){progress.hidden=true;el('wbDownloadStatus').textContent=e.message;}}
    finally{if(stamp===version){exporting=false;el('wbDownload').disabled=false;}}
  }
  el('wbSheet').addEventListener('change',chooseSheet);
  for(const id of ['wbFirst','wbLast','wbQuestion'])el(id).addEventListener('input',preview);
  el('wbOpenPolicy').addEventListener('click',()=>{
    el('dealSetup').open=true;el('detailsSourceCorpus').open=true;el('sourceCorpusTextarea').focus();
  });
  el('wbEvidence').addEventListener('change',()=>{
    if(el('wbEvidence').value==='')return;
    const p=passages()[Number(el('wbEvidence').value)];
    if(p)el('inspectorAnswerTextarea').value=p.excerpt;
  });
  el('chooseWorkbook').addEventListener('click',()=>{el('dealSetup').open=true;el('detailsCustomUpload').open=true;el('fileInputQuestionnaire').click();});
  el('wbAdd').addEventListener('click',add);el('wbDownload').addEventListener('click',download);
  return {clear,open,showInspector,record,sync};
};
