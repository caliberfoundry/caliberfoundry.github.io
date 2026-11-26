(() => {
  'use strict';
  const criteria = [
    ['WCAG 1.1.1','Non-text content'],['WCAG 1.3.1','Info and relationships'],
    ['WCAG 1.4.3','Contrast (minimum)'],['WCAG 1.4.10','Reflow'],['WCAG 2.1.1','Keyboard'],
    ['WCAG 2.4.11','Focus not obscured (minimum)'],['EN 301 549, clause 10','Non-web documents'],
    ['Revised Section 508, chapter 6','Support documentation and services']
  ];
  const options=['Not evaluated','Supports','Partially supports','Does not support','Not applicable'];
  const reviews=new Map();
  const rows=()=>criteria.map(([code,title])=>({code,title,level:'Not evaluated',remarks:'',...reviews.get(code)}));
  function render(onSave) {
    const tbody=document.getElementById('vpatTableBody');
    const frag=document.createDocumentFragment();
    for(const r of rows()){
      const tr=document.createElement('tr');
      tr.insertCell().textContent=r.code;
      tr.insertCell().textContent=r.title;
      const select=document.createElement('select');
      select.className='cf-select'; select.setAttribute('aria-label',r.code+' assessment');
      for(const name of options)select.add(new Option(name,name,false,name===r.level));
      tr.insertCell().append(select);
      const note=document.createElement('textarea');note.rows=2;note.className='cf-textarea';
      note.setAttribute('aria-label',r.code+' review evidence');note.placeholder='Record your test, source and observation';note.value=r.remarks;
      const save=document.createElement('button');save.type='button';save.className='cf-btn-secondary';save.textContent='Save assessment';
      const status=document.createElement('span');status.setAttribute('role','status');
      save.onclick=()=>{
        const remarks=note.value.trim();
        if(select.value!=='Not evaluated' && !remarks){status.textContent=' Add the evidence for this decision.';note.focus();return;}
        reviews.set(r.code,{level:select.value,remarks});status.textContent=' Saved to this review.';onSave();
      };
      tr.insertCell().append(note,save,status);frag.append(tr);
    }
    tbody.replaceChildren(frag);
  }
  window.DealShieldAccessibility={rows,render,clear:()=>reviews.clear()};
})();
