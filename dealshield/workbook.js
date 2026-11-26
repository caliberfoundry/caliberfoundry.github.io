/* Local, bounded OOXML worksheet reader and literal-text writer. */
(() => {
  'use strict';
  const MIB = 1024 * 1024;
  const MAX_ARCHIVE = 24 * MIB, MAX_PART = 16 * MIB, MAX_TOTAL = 96 * MIB;
  const MAX_FILES = 2048, MAX_ROWS = 25000, MAX_CELLS = 150000, MAX_EDITS = 25000;
  const SHEET_NS = new Set(['http://schemas.openxmlformats.org/spreadsheetml/2006/main', 'http://purl.oclc.org/ooxml/spreadsheetml/main']);
  const XML_NS = 'http://www.w3.org/XML/1998/namespace';
  const encoder = new TextEncoder();
  const decoder = new TextDecoder('utf-8', {fatal:true});
  const mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const library = new URL('./vendor/fflate-0.8.3.mjs', document.currentScript.src);
  const fail = message => { throw new Error(message); };
  const check = (condition, message) => { if (!condition) fail(message); };
  const truth = value => value === '1' || value === 'true';
  const children = (el, name) => Array.from(el?.children || []).filter(n=>n.localName === name && n.namespaceURI === el.namespaceURI);
  const child = (el,name) => children(el,name)[0];
  const descendants = (el,name) => Array.from(el.getElementsByTagNameNS('*', name));
  const view = bytes => new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const crcTable = Uint32Array.from({length:256}, (_,i) => {
    for (let j=0; j<8; j++) i=(i>>>1)^((i&1)?0xedb88320:0);
    return i>>>0;
  });
  function crc32(bytes) {
    let crc=0xffffffff;
    for(const b of bytes) crc=(crc>>>8)^crcTable[(crc^b)&255];
    return (crc^0xffffffff)>>>0;
  }

  function validPath(raw) {
    let name;
    try { name=decodeURIComponent(raw); } catch { return false; }
    return raw.length>0 && !/^[A-Za-z]:|^\/|\\|[\x00-\x1f\x7f]/.test(name) &&
      !/%2f|%5c/i.test(raw) && name.replace(/\/$/, '').split('/').every(s=>s && s!=='.' && s!=='..');
  }
  function archiveDirectory(bytes) {
    const v=view(bytes), n=bytes.length;
    let end=n-22;
    while(end>=Math.max(0,n-65557) && (v.getUint32(end,true)!==0x06054b50 || end+22+v.getUint16(end+20,true)!==n)) end--;
    check(end>=Math.max(0,n-65557), 'Could not locate a complete ZIP directory.');
    const count=v.getUint16(end+10,true), center=v.getUint32(end+16,true), size=v.getUint32(end+12,true);
    check(!v.getUint16(end+4,true) && !v.getUint16(end+6,true) && v.getUint16(end+8,true)===count &&
      count>0 && count<=MAX_FILES && center+size===end, 'Split, ZIP64 or oversized archives are unsupported.');
    let at=center, total=0;
    const parts=new Map(), normalized=new Set();
    for(let i=0; i<count; i++){
      check(at+46<=end && v.getUint32(at,true)===0x02014b50,'Invalid ZIP directory entry.');
      const flags=v.getUint16(at+8,true), method=v.getUint16(at+10,true), crc=v.getUint32(at+16,true);
      const compressed=v.getUint32(at+20,true), expanded=v.getUint32(at+24,true), offset=v.getUint32(at+42,true);
      const nameLen=v.getUint16(at+28,true), next=at+46+nameLen+v.getUint16(at+30,true)+v.getUint16(at+32,true);
      check(next<=end && offset+30<=center && (flags & ~0x80e)===0 && (method===0 || method===8) &&
        !v.getUint16(at+34,true), 'Unsupported, encrypted or corrupt ZIP entry.');
      const name=decoder.decode(bytes.subarray(at+46,at+46+nameLen));
      check(validPath(name),'Unsafe ZIP member path.');
      const key=decodeURIComponent(name).toLowerCase();
      check(!normalized.has(key),'Duplicate ZIP member path.'); normalized.add(key);
      total+=expanded;
      check(expanded<=MAX_PART && total<=MAX_TOTAL && (method!==0 || compressed===expanded), 'Expanded workbook exceeds the limit or has invalid stored sizes.');
      check(v.getUint32(offset,true)===0x04034b50 && v.getUint16(offset+6,true)===flags && v.getUint16(offset+8,true)===method,'ZIP member header mismatch.');
      const localNameLen=v.getUint16(offset+26,true), data=offset+30+localNameLen+v.getUint16(offset+28,true);
      check(data+compressed<=center && decoder.decode(bytes.subarray(offset+30,offset+30+localNameLen))===name,'ZIP data range or filename mismatch.');
      let stop=data+compressed, descriptor=0;
      if(flags&8){
        check(stop+12<=center,'Truncated ZIP descriptor.');
        const signed=v.getUint32(stop,true)===0x08074b50 && stop+16<=center && v.getUint32(stop+4,true)===crc;
        const fields=stop+(signed?4:0);
        check(v.getUint32(fields,true)===crc && v.getUint32(fields+4,true)===compressed && v.getUint32(fields+8,true)===expanded,'ZIP descriptor mismatch.');
        descriptor=signed?16:12; stop+=descriptor;
      } else {
        check(v.getUint32(offset+14,true)===crc && v.getUint32(offset+18,true)===compressed && v.getUint32(offset+22,true)===expanded,'ZIP size or CRC mismatch.');
      }
      parts.set(name,{name,at,offset,data,stop,descriptor,method,compressed,expanded,crc});
      at=next;
    }
    check(at===end,'Unexpected ZIP directory data.');
    const ordered=[...parts.values()].sort((a,b)=>a.offset-b.offset);
    check(ordered[0].offset===0 && ordered.every((p,i)=>p.stop===(ordered[i+1]?.offset??center)), 'ZIP member ranges are inconsistent.');
    check(![...parts.keys()].some(name=>/^_xmlsignatures\//i.test(name)), 'This workbook has a digital signature and cannot be edited here.');
    return {bytes,parts,ordered,center,end,total};
  }

  function readPart(archive, name, zip) {
    const part=archive.parts.get(name);
    check(part,'A required workbook part is missing.');
    const bytes=archive.bytes.subarray(part.data,part.data+part.compressed);
    let result=bytes;
    if(part.method===8){
      result=new Uint8Array(part.expanded);
      let written=0;
      const stream=new zip.Inflate(chunk=>{
        check(written+chunk.length<=result.length,'Workbook part expands beyond its declared size.');
        result.set(chunk,written); written+=chunk.length;
      });
      for(let i=0; i<bytes.length; i+=2048) stream.push(bytes.subarray(i,i+2048),i+2048>=bytes.length);
      check(written===result.length,'Truncated compressed workbook part.');
    }
    check(crc32(result)===part.crc,'Workbook part failed its ZIP checksum.');
    return result;
  }
  function parseXml(bytes) {
    let text;
    if(bytes[0]===0xff && bytes[1]===0xfe) text=new TextDecoder('utf-16le',{fatal:true}).decode(bytes);
    else if(bytes[0]===0xfe && bytes[1]===0xff) text=new TextDecoder('utf-16be',{fatal:true}).decode(bytes);
    else text=decoder.decode(bytes);
    check(!/<!DOCTYPE|<!ENTITY/i.test(text),'XML document type and entity declarations are unsupported.');
    const doc=new DOMParser().parseFromString(text,'application/xml');
    check(doc.documentElement && !descendants(doc,'parsererror').length,'Invalid workbook XML.');
    return doc;
  }
  function relFile(part) {
    const i=part.lastIndexOf('/');
    return part.slice(0,i+1)+'_rels/'+part.slice(i+1)+'.rels';
  }
  function resolvePart(root,target) {
    check(target && !/^[a-z][a-z0-9+.-]*:|^\/\/|[\\?#]/i.test(target),'Unsupported relationship target.');
    const result=target.startsWith('/')?[]:root.split('/').slice(0,-1);
    for(const value of target.replace(/^\//,'').split('/')){
      if(value==='.')continue;
      if(value==='..'){check(result.length,'Relationship escapes the package.');result.pop();}
      else result.push(value);
    }
    const name=result.join('/');
    check(validPath(name),'Invalid workbook part name.');return name;
  }
  function relationships(doc) {
    const map=new Map();
    for(const rel of children(doc.documentElement,'Relationship')){
      const id=rel.getAttribute('Id');
      check(id && !map.has(id),'Invalid or duplicate relationship ID.');
      map.set(id,{type:rel.getAttribute('Type')?.split('/').pop(),target:rel.getAttribute('Target'),external:rel.getAttribute('TargetMode')==='External'});
    }
    return map;
  }
  function numberCol(value) {
    check(typeof value==='string' && /^[A-Z]{1,3}$/.test(value),'Enter an Excel column letter from A to XFD.');
    let result=0; for(const c of value) result=result*26+c.charCodeAt(0)-64;
    check(result<=16384,'Invalid worksheet column.');return result;
  }
  function colName(number) {
    let name=''; for(let n=number;n>0;n=Math.floor((n-1)/26))name=String.fromCharCode(65+(n-1)%26)+name;
    return name;
  }
  function address(value) {
    const m=/^\$?([A-Z]{1,3})\$?([1-9]\d{0,6})$/.exec(value);
    check(m && Number(m[2])<=1048576,'Invalid worksheet cell reference.');
    return [numberCol(m[1]),Number(m[2])];
  }
  function bounds(raw) {
    const s=raw.replace(/\$/g,'').toUpperCase();
    let a,b;
    if(/^[A-Z]{1,3}:[A-Z]{1,3}$/.test(s)){const cols=s.split(':').map(numberCol);a=[cols[0],1];b=[cols[1],1048576];}
    else if(/^\d+:\d+$/.test(s)){const r=s.split(':').map(Number);check(r[0]>0&&r[1]<=1048576,'Invalid row range.');a=[1,r[0]];b=[16384,r[1]];}
    else {const pair=s.split(':');check(pair.length<=2,'Invalid worksheet range.');a=address(pair[0]);b=pair.length===2?address(pair[1]):a;}
    check(a[0]<=b[0]&&a[1]<=b[1],'Reversed worksheet range.');return [a[0],a[1],b[0],b[1]];
  }
  function contains(range,col,row) {return range[0]<=col && col<=range[2] && range[1]<=row && row<=range[3];}
  function ooxmlText(value) {return value.replace(/_x([0-9a-f]{4})_/gi,(_,h)=>String.fromCharCode(parseInt(h,16)));}
  function plainText(node) {
    if(!node)return '';
    return ooxmlText([...node.children].flatMap(n=>n.localName==='t'?[n.textContent]:n.localName==='r'?children(n,'t').map(t=>t.textContent):[]).join(''));
  }
  function valueOf(cell, strings) {
    const v=child(cell,'v')?.textContent??'', type=cell.getAttribute('t');
    if(type==='inlineStr')return plainText(child(cell,'is'));
    if(type==='s'){
      check(/^\d+$/.test(v) && Number(v)<strings.length, 'Invalid shared string reference.');
      return strings[Number(v)];
    }
    if(type==='b' && v!=='')return truth(v)?'TRUE':'FALSE';
    return type==='str'?ooxmlText(v):v;
  }
  function styleResolver(doc) {
    if(!doc)return () => true;
    const root=doc.documentElement, cells=children(child(root,'cellXfs'),'xf'), bases=children(child(root,'cellStyleXfs'),'xf');
    return style=>{
      const xf=cells[Number(style || 0)];
      if(!xf)return true;
      const own=xf.getAttribute('applyProtection')==='0'?null:child(xf,'protection');
      const inherited=child(bases[Number(xf.getAttribute('xfId') || 0)],'protection');
      const locked=(own||inherited)?.getAttribute('locked');
      return locked!=='0' && locked!=='false';
    };
  }

  function inspectSheet(doc, strings) {
    const root=doc.documentElement;
    check(root.localName==='worksheet' && SHEET_NS.has(root.namespaceURI),'This part is not an Excel worksheet.');
    const data=child(root,'sheetData');
    check(data,'Worksheet has no cell table.');
    const rows=new Map(), rules=[];
    let cellCount=0, previous=0;
    for(const node of children(data,'row')){
      const number=Number(node.getAttribute('r') || previous+1);
      check(Number.isInteger(number) && number>previous && number<=1048576 && rows.size<MAX_ROWS,'Invalid row order or worksheet exceeds 25,000 rows.');
      previous=number;
      const cells=new Map();
      let prevCol=0;
      for(const c of children(node,'c')){
        const ref=c.getAttribute('r');
        const [col,r]=ref?address(ref):[prevCol+1,number];
        check(r===number && col>prevCol && col<=16384 && ++cellCount<=MAX_CELLS,'Invalid cell coordinates or worksheet exceeds 150,000 cells.');
        prevCol=col;
        cells.set(col,{node:c,value:valueOf(c,strings)});
        const formula=child(c,'f');
        if(formula?.hasAttribute('ref')) rules.push({range:bounds(formula.getAttribute('ref')),reason:'Formula range'});
      }
      rows.set(number,{node,cells});
    }
    for(const merge of descendants(root,'mergeCell')) rules.push({range:bounds(merge.getAttribute('ref')||''),reason:'Merged cell'});
    function addRule(ref, rule) {
      check(ref?.trim(),'A worksheet rule has no supported target range.');
      for(const token of ref.trim().split(/\s+/)){
        check(rules.length<30000,'Worksheet contains too many protected ranges.');
        rules.push({...rule,range:bounds(token)});
      }
    }
    for(const val of descendants(root,'dataValidation')){
      const ref=val.getAttribute('sqref') || descendants(val,'sqref')[0]?.textContent;
      const type=val.getAttribute('type');
      // An Excel "any value" rule has no constraint, but preserve explicit warning and
      // prepopulated-cell guidance by declining to overwrite those cells.
      const formula=descendants(val,'formula1')[0]?.textContent?.trim() || '';
      const reason=type==='list'?'Choose an allowed list value':'Cell has an existing validation or input instruction';
      addRule(ref,{reason,listFormula:type==='list'?formula:null});
    }
    for(const link of descendants(root,'hyperlink')) addRule(link.getAttribute('ref'),{reason:'Cell has a hyperlink'});
    const columns=children(child(root,'cols'),'col').map(c=>({min:Number(c.getAttribute('min')),max:Number(c.getAttribute('max')),style:c.getAttribute('style')}));
    const sheetProtection=child(root,'sheetProtection');
    const protectedSheet=Boolean(sheetProtection && !['0','false'].includes(sheetProtection.getAttribute('sheet')));
    return {doc,root,data,rows,rules,columns,protectedSheet};
  }
  function sheetElement(sheet,name) {
    return sheet.doc.createElementNS(sheet.root.namespaceURI,(sheet.root.prefix?sheet.root.prefix+':':'')+name);
  }
  function setText(sheet,col,row,text) {
    let record=sheet.rows.get(row);
    if(!record){
      const element=sheetElement(sheet,'row');
      element.setAttribute('r',String(row));
      const next=children(sheet.data,'row').find(r=>Number(r.getAttribute('r'))>row);
      sheet.data.insertBefore(element,next || null);
      record={node:element,cells:new Map()};sheet.rows.set(row,record);
    }
    let cell=record.cells.get(col)?.node;
    const addedCell=!cell;
    if(addedCell){
      cell=sheetElement(sheet,'c');
      cell.setAttribute('r',colName(col)+row);
      const next=[...record.cells.keys()].filter(c=>c>col).sort((a,b)=>a-b)[0];
      record.node.insertBefore(cell,next?record.cells.get(next).node:(child(record.node,'extLst')||null));
      record.cells.set(col,{node:cell,value:text});
      if(record.node.hasAttribute('spans'))record.node.removeAttribute('spans');
    }
    const content=sheetElement(sheet,'is'), literal=sheetElement(sheet,'t');
    literal.setAttributeNS(XML_NS,'xml:space','preserve');
    literal.textContent=text.replace(/_x(?=[a-f\d]{4}_)/gi,'_x005F_x').replace(/\r/g,'_x000D_');
    cell.setAttribute('t','inlineStr');
    for(const old of [...children(cell,'v'),...children(cell,'is')])old.remove();
    content.append(literal);cell.insertBefore(content,child(cell,'extLst')||null);
    const dim=child(sheet.root,'dimension');
    if(addedCell && dim?.hasAttribute('ref')){
      const existing=bounds(dim.getAttribute('ref'));
      if(!contains(existing,col,row)){
        dim.setAttribute('ref',colName(Math.min(col,existing[0]))+Math.min(row,existing[1])+':'+colName(Math.max(col,existing[2]))+Math.max(row,existing[3]));
      }
    }
  }

  // Copy every other member including its local header, compressed data, extras
  // and descriptor. Only central-directory offsets of later records need adjusting.
  function substitute(archive, changes, zip) {
    const central=archive.bytes.slice(archive.center,archive.end), cv=view(central);
    const end=archive.bytes.slice(archive.end), chunks=[];
    let position=0, expandedTotal=archive.total;
    for(const p of archive.ordered){
      const at=p.at-archive.center;
      cv.setUint32(at+42,position,true);
      const raw=changes.get(p.name);
      if(!raw){
        chunks.push(archive.bytes.subarray(p.offset,p.stop));
        position+=p.stop-p.offset;
        continue;
      }
      expandedTotal+=raw.length-p.expanded;
      check(raw.length<=MAX_PART && expandedTotal<=MAX_TOTAL,'Edited workbook exceeds the expanded-size limit.');
      const compressed=p.method===8?zip.deflateSync(raw,{level:6}):raw;
      const crc=crc32(raw), local=archive.bytes.slice(p.offset,p.data), lv=view(local);
      for(const [delta,value] of [[0,crc],[4,compressed.length],[8,raw.length]]){
        cv.setUint32(at+16+delta,value,true);
        if(!p.descriptor || lv.getUint32(14+delta,true)!==0)lv.setUint32(14+delta,value,true);
      }
      chunks.push(local,compressed);position+=local.length+compressed.length;
      if(p.descriptor){
        const desc=new Uint8Array(p.descriptor), dv=view(desc), at=p.descriptor-12;
        if(at)dv.setUint32(0,0x08074b50,true);
        dv.setUint32(at,crc,true);dv.setUint32(at+4,compressed.length,true);dv.setUint32(at+8,raw.length,true);
        chunks.push(desc);position+=desc.length;
      }
    }
    check(position+central.length+end.length<=MAX_ARCHIVE,'Edited workbook exceeds the 24 MiB archive limit.');
    view(end).setUint32(16,position,true);
    return new Blob([...chunks,central,end],{type:mime});
  }
  async function open(file) {
    check(file && /\.xlsx$/i.test(file.name) && file.size>=22 && file.size<=MAX_ARCHIVE && typeof file.arrayBuffer==='function',
      'Choose a nonempty .xlsx workbook no larger than 24 MiB.');
    const archive=archiveDirectory(new Uint8Array(await file.arrayBuffer()));
    const zip=await import(library.href);
    const xml=name=>parseXml(readPart(archive,name,zip));
    const content=xml('[Content_Types].xml'), rootRels=relationships(xml('_rels/.rels'));
    const bookRel=[...rootRels.values()].find(r=>!r.external && r.type==='officeDocument');
    check(bookRel,'Workbook relationship is missing.');
    const bookPath=resolvePart('',bookRel.target);
    check(children(content.documentElement,'Override').some(n=>n.getAttribute('PartName')==='/'+bookPath &&
      n.getAttribute('ContentType')===mime+'.main+xml'),'Only standard .xlsx workbook packages are supported.');
    const book=xml(bookPath), rels=relationships(xml(relFile(bookPath)));
    const root=book.documentElement;
    check(root.localName==='workbook' && SHEET_NS.has(root.namespaceURI),'Invalid spreadsheet workbook.');
    const getRelated=type=>{
      const rel=[...rels.values()].find(r=>!r.external && r.type===type);
      return rel?xml(resolvePart(bookPath,rel.target)):null;
    };
    const shared=getRelated('sharedStrings');
    const strings=shared?children(shared.documentElement,'si').map(plainText):[];
    const lockedStyle=styleResolver(getRelated('styles'));
    const sheets=[], cache=new Map(), byName=new Map();
    for(const source of children(child(root,'sheets'),'sheet')){
      const rid=[...source.attributes].find(a=>a.localName==='id' && a.namespaceURI?.endsWith('/relationships'))?.value;
      const rel=rels.get(rid);
      check(rel && !rel.external,'Missing or external sheet relationship.');
      if(rel.type!=='worksheet') continue;
      const name=source.getAttribute('name');
      check(name && !byName.has(name.toLowerCase()),'Invalid or duplicate worksheet name.');
      const part=resolvePart(bookPath,rel.target);
      check(archive.parts.has(part),'Missing worksheet part.');
      byName.set(name.toLowerCase(),sheets.length);sheets.push({name,part,visibility:source.getAttribute('state')||'visible'});
    }
    check(sheets.length>0,'No editable worksheets found.');
    const load=i=>{
      check(Number.isInteger(i) && i>=0 && i<sheets.length,'Select an existing worksheet.');
      if(!cache.has(i))cache.set(i,inspectSheet(xml(sheets[i].part),strings));
      return cache.get(i);
    };
    function listValues(i,rule){
      const formula=(rule.listFormula || '').replace(/^=/,'');
      if(/^"(?:[^"]|"")*"$/.test(formula))return formula.slice(1,-1).replace(/""/g,'"').split(',');
      // Read literal cells from a static in-workbook list; never run a formula.
      const ref=/^(?:(?:'((?:[^']|'')+)'|([^'!\[\]:]+))!)?(\$?[A-Z]{1,3}\$?[1-9]\d{0,6}(?::\$?[A-Z]{1,3}\$?[1-9]\d{0,6})?)$/i.exec(formula);
      if(!ref)return null;
      const name=(ref[1]?.replace(/''/g,"'")||ref[2])?.toLowerCase();
      const src=name?byName.get(name):i;
      if(src===undefined)return null;
      const [left,top,right,bottom]=bounds(ref[3]);
      if((right-left+1)*(bottom-top+1)>256 || (right!==left && bottom!==top))return null;
      const sheet=load(src), result=[];
      for(let row=top;row<=bottom;row++)for(let col=left;col<=right;col++){
        const cell=sheet.rows.get(row)?.cells.get(col);
        if(!cell)continue;
        if(child(cell.node,'f'))return null;
        if(cell.value!=='')result.push(cell.value);
      }
      return result.length?[...new Set(result)]:null;
    }
    function allowedValues(i,row,letter) {
      const sheet=load(i),col=numberCol(letter);
      const matches=sheet.rules.filter(r=>r.listFormula && contains(r.range,col,row));
      if(!matches.length)return null;
      let result=null;
      for(const rule of matches){
        const options=listValues(i,rule);if(!options)return null;
        result=result?result.filter(v=>options.includes(v)):options;
      }
      return result;
    }
    function blockedReason(i,row,letter,value) {
      const sheet=load(i), col=numberCol(letter);
      if(!Number.isInteger(row)||row<1||row>1048576)return 'Invalid worksheet row';
      const record=sheet.rows.get(row), cell=record?.cells.get(col)?.node;
      if(cell && child(cell,'f'))return 'Formula cell';
      if(cell && (record.cells.get(col).value!=='' || cell.hasAttribute('cm') || cell.hasAttribute('vm')))return 'Existing value or metadata';
      if(sheet.protectedSheet){
        const column=sheet.columns.find(x=>x.min<=col && col<=x.max);
        const rowStyle=truth(record?.node.getAttribute('customFormat'))?record.node.getAttribute('s'):null;
        if(lockedStyle(cell?.getAttribute('s') ?? rowStyle ?? column?.style))return 'Locked cell on a protected sheet';
      }
      for(const rule of sheet.rules){
        if(!contains(rule.range,col,row))continue;
        if(rule.listFormula && typeof value==='string' && listValues(i,rule)?.includes(value))continue;
        return rule.reason;
      }
      return null;
    }
    function preview(i) {
      return [...load(i).rows.entries()].map(([number,row])=>({
        number, cells:Object.fromEntries([...row.cells].map(([col,cell])=>[colName(col),cell.value]))
      }));
    }
    async function fillMany(groups) {
      check(Array.isArray(groups) && groups.length>0, 'Supply worksheet edits.');
      const mutations=new Map(), targets=new Set();
      for(const group of groups){
        const {sheetIndex:i,answerCol:letter,edits}=group;
        load(i);const col=numberCol(letter);
        check(Array.isArray(edits),'Supply an array of cell edits.');
        if(!mutations.has(i))mutations.set(i,[]);
        for(const {row,text} of edits){
          const ref=letter+row, key=i+':'+ref;
          check(!targets.has(key) && targets.size<MAX_EDITS,'Duplicate target or more than 25,000 edits.');
          targets.add(key);
          check(typeof text==='string' && text.trim() && text.length<=32767 && !/[\x00-\x08\x0b\x0c\x0e-\x1f\ufffe\uffff]/.test(text) && !/[\uD800-\uDFFF]/u.test(text),
            sheets[i].name+'!'+ref+': supply valid Excel text (1–32,767 characters).');
          const reason=blockedReason(i,row,letter,text);
          check(!reason,sheets[i].name+'!'+ref+': '+reason+'.');
          mutations.get(i).push({col,row,text});
        }
      }
      if(!targets.size)return new Blob([archive.bytes],{type:mime});
      const output=new Map();
      for(const [i,edits] of mutations){
        if(!edits.length)continue;
        const sheet=inspectSheet(load(i).doc.cloneNode(true),strings);
        for(const e of edits)setText(sheet,e.col,e.row,e.text);
        output.set(sheets[i].part,encoder.encode(new XMLSerializer().serializeToString(sheet.doc)));
      }
      return substitute(archive,output,zip);
    }
    return Object.freeze({
      sheets:Object.freeze(sheets.map((s,i)=>Object.freeze({name:s.name,visibility:s.visibility,get protected(){return load(i).protectedSheet;}}))),
      preview,allowedValues,blockedReason,fillMany,
      fill:(sheetIndex,answerCol,edits)=>fillMany([{sheetIndex,answerCol,edits}])
    });
  }
  window.DealWorkbook=Object.freeze({open});
})();
