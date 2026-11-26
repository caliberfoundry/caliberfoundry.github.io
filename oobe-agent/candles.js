/* Convert exchange OHLCV observations to downside inputs for the teaching model. */
(() => {
  'use strict';
  const bucketSeconds=21600;
  const periodHours=[0,24,24,24,12];
  async function read(file) {
    if(file.size>1024*1024) throw Error('Use one Coinbase candle JSON of up to 1 MiB.');
    const bytes=await file.arrayBuffer();
    const candles=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
    if(!Array.isArray(candles)||candles.length<14||candles.length>300) throw Error('Choose an array of 14 to 300 six-hour candles.');
    const seen=new Set();
    for(const row of candles) {
      if(!Array.isArray(row)||row.length!==6||!row.every(Number.isFinite)) throw Error('Each candle needs timestamp, low, high, open, close and volume as numbers.');
      const [time,low,high,open,close,volume]=row;
      if(!Number.isSafeInteger(time)||time<0||time%bucketSeconds!==0||seen.has(time)) throw Error('Duplicate or misaligned six-hour bucket.');
      if(!(low>0 && low<=open && open<=high && low<=close && close<=high && volume>=0)) throw Error('Invalid OHLC price or volume.');
      seen.add(time);
    }
    const complete=candles.filter(row=>row[0]+bucketSeconds<=Date.now()/1000).sort((a,b)=>a[0]-b[0]);
    const window=complete.slice(-14);
    if(window.length!==14 || window.some((row,i)=>i>0 && row[0]!==window[i-1][0]+bucketSeconds)) throw Error('The latest 14 complete candles must be consecutive and six hours apart.');
    let offset=0;
    const periods=periodHours.map(hours=>{
      if(!hours)return {hours,drawdownBps:0};
      const count=hours/6, first=window[offset], last=window[offset+count-1];
      offset+=count;
      const returnPct=(last[4]/first[3]-1)*100;
      if(!Number.isFinite(returnPct)) throw Error('The price change exceeds the supported range.');
      return {hours,startUtc:new Date(first[0]*1000).toISOString(),endUtc:new Date((last[0]+bucketSeconds)*1000).toISOString(),
        open:first[3],close:last[4],returnPct,drawdownBps:Math.max(0,Math.round(-returnPct*100))};
    });
    const hash=await crypto.subtle.digest('SHA-256',bytes);
    return {format:'Coinbase Exchange six-hour candles',file:file.name,
      sha256:Array.from(new Uint8Array(hash),n=>n.toString(16).padStart(2,'0')).join(''),
      candlesInFile:candles.length,candlesUsed:14,periods};
  }
  window.OobeCandles=Object.freeze({read});
})();
