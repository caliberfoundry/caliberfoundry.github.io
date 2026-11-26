import {parseCsv, spreadsheetText} from '../assets/js/delimited.mjs';

export function normalizeProductUrl(value) {
  const url = new URL(value.trim());
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Choose an HTTP(S) link without credentials.');
  }
  // Retain the original spelling and order of all variant and business parameters.
  url.search = url.search.slice(1).split('&').filter(part => {
    const key = new URLSearchParams(part).keys().next().value || '';
    return !/^(utm_.*|fbclid|gclid)$/i.test(key);
  }).join('&');
  return url.href;
}

export function normalizeCatalog(input) {
  if (input.length > 5_000_000) throw new Error('Use a CSV file under 5 MB.');
  const [headers, ...rows] = parseCsv(input.replace(/^\uFEFF/, ''));
  return normalizeRows(headers,rows);
}

// Supplier JSON may use different fields for different products. Keep every field
// in the CSV and serialize nested values as JSON inside their original column.
export function normalizeSupplierJson(input) {
  const data=JSON.parse(input,(_key,value)=>{
    if(typeof value==='number' && (!Number.isFinite(value) || (Number.isInteger(value) && !Number.isSafeInteger(value)))) {
      throw Error('Represent very large numbers and long identifiers as strings in the JSON feed.');
    }
    return value;
  });
  const records=Array.isArray(data) ? data : [data];
  if (!records.length || records.length>50000) throw Error('Choose between 1 and 50,000 product objects.');
  const headers=new Set();
  for(const record of records) {
    if(!record || typeof record!=='object' || Array.isArray(record)) throw Error('Expected a JSON product object or array of product objects.');
    for(const key of Object.keys(record)) headers.add(key);
    if(headers.size>256) throw Error('Use a catalog with up to 256 distinct fields.');
  }
  const fields=[...headers];
  if (fields.length*records.length>2000000) throw Error('Choose a smaller JSON catalog.');
  const rows=records.map(record=>fields.map(key=>{
    if(!Object.hasOwn(record,key) || record[key]===null) return '';
    return typeof record[key]==='object' ? JSON.stringify(record[key]) : String(record[key]);
  }));
  return normalizeRows(fields,rows);
}

function normalizeRows(headers,rows) {
  if (!headers || !rows.length) throw new Error('Include a header and at least one record.');
  const names = headers.map(h => h.trim().toLowerCase());
  if (names.some(n => !n) || new Set(names).size !== names.length) throw new Error('Give each column a unique name.');
  const urlColumn = ['product_url', 'canonical_url', 'url'].find(name => names.includes(name));
  const index = names.indexOf(urlColumn);
  if (index < 0) throw new Error('Include a url, product_url or canonical_url column.');
  const seen = new Set(), clean = [];
  let changed = 0;
  for (const [i, row] of rows.entries()) {
    if (row.length !== headers.length) throw new Error('Column count differs on record ' + (i + 1) + '.');
    let link;
    try { link = normalizeProductUrl(row[index]); }
    catch { throw new Error('Invalid HTTP(S) URL on record ' + (i + 1) + '.'); }
    if (link !== row[index]) changed++;
    const values = [...row];
    values[index] = link;
    const key = JSON.stringify(values);
    if (!seen.has(key)) { clean.push(values); seen.add(key); }
  }
  return { headers, rows: clean, total: rows.length, changed, duplicates: rows.length - clean.length };
}

export function countEscapedCells({headers, rows}) {
  let escaped = 0;
  for (const row of [headers, ...rows]) {
    for (const value of row) if (spreadsheetText(value) !== value) escaped++;
  }
  return escaped;
}

export function toCsv({headers, rows}) {
  const cell = value => '"' + spreadsheetText(value).replace(/"/g, '""') + '"';
  return [headers, ...rows].map(row => row.map(cell).join(',')).join('\r\n') + '\r\n';
}
