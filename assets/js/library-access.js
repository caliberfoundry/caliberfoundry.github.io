/* Receipt-gated course and editorial libraries. Paid content lives only in memory. */
window.createFoundryLibraryAccess = (product, accept, clear) => {
  let active=null, activeKey='', timer, generation=0;
  function expired() {
    if(!active || active.expiresAt===null)return;
    const remaining=Date.parse(active.expiresAt)-Date.now();clearTimeout(timer);
    if(remaining<=0){active=null;activeKey='';clear('This license expired. Your own work remains available.');}
    else timer=setTimeout(expired,Math.min(remaining,2147483647));
  }
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)expired();});
  function decision(key) {
    if(!active || activeKey!==String(key||'').trim().toUpperCase() || (active.expiresAt && Date.now()>=Date.parse(active.expiresAt)))return {valid:false};
    return {valid:true,tier:active.tier,expiresIso:active.expiresAt,customerTag:'Verified purchase',provider:'license service'};
  }
  async function open(raw,status){
    const key=String(raw||'').trim().toUpperCase(), serial=++generation;
    if(!key)throw Error('Enter the purchase key from your receipt.');
    if(status)status.textContent='Verifying the purchase and loading the library…';
    const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),15000);
    try{
      let res;try{res=await fetch('https://api.caliberfoundry.com/portfolio/v1/'+product+'/library',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({licenseKey:key}),credentials:'omit',cache:'no-store',redirect:'error',referrerPolicy:'no-referrer',signal:controller.signal});}
      catch{throw Error('The library service is unavailable. Retry with your purchase key.');}
      if(serial!==generation)return null;
      if(!res.ok){
        const denied=[400,401,403,404,410,422].includes(res.status);
        if(denied && activeKey===key){active=null;activeKey='';clear('The license could not be verified.');}
        throw Error(denied?'This key cannot open this library. Check the product and validity of your purchase.':'The library service is unavailable. Retry with your purchase key.');
      }
      const result=await res.json();
      if(serial!==generation)return null;
      const expiresAt=result.expiresAt||null;
      if(expiresAt&&(!Number.isFinite(Date.parse(expiresAt))||Date.parse(expiresAt)<=Date.now()))throw Error('This license has expired.');
      accept(result.library);
      activeKey=key;active={tier:String(result.tier||'PRO'),expiresAt};expired();if(status)status.textContent='Purchase verified.';
      return decision(key);
    }finally{clearTimeout(timeout);}
  }
  return {open,decision};
};
