function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false, closed = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') field += c;
      else if (text[i + 1] === '"') { field += '"'; i++; }
      else { quoted = false; closed = true; }
    } else if (c === ',' || c === '\n' || c === '\r') {
      row.push(field);
      field = ''; closed = false;
      if (c !== ',') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        if (row.some(value => value.trim())) rows.push(row);
        row = [];
      }
    } else if (c === '"' && !field && !closed) quoted = true;
    else if (closed || c === '"') throw new Error('Invalid quotation in CSV.');
    else field += c;
  }
  if (quoted) throw new Error('Unclosed CSV field.');
  row.push(field);
  if (row.some(value => value.trim())) rows.push(row);
  return rows;
}

export function normalizeCatalog(input) {
  if (input.length > 5_000_000) throw new Error('Use a CSV file under 5 MB.');
  const [headers, ...rows] = parseCsv(input.replace(/^\uFEFF/, ''));
  if (!headers || !rows.length) throw new Error('Include a header and at least one record.');
  const names = headers.map(h => h.trim().toLowerCase());
  if (names.some(n => !n) || new Set(names).size !== names.length) throw new Error('Give each column a unique name.');
  const index = names.findIndex(h => ['url', 'canonical_url', 'product_url'].includes(h));
  if (index < 0) throw new Error('Include a url, product_url or canonical_url column.');
  const seen = new Set(), clean = [];
  let changed = 0;
  for (const [i, row] of rows.entries()) {
    if (row.length !== headers.length) throw new Error('Column count differs on record ' + (i + 1) + '.');
    let url;
    try { url = new URL(row[index].trim()); } catch { /* handled below */ }
    if (!url || !['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
      throw new Error('Invalid public HTTP(S) URL on record ' + (i + 1) + '.');
    }
    // Retain the spelling and order of all business parameters, including SKU variants.
    url.search = url.search.slice(1).split('&').filter(part => {
      const key = new URLSearchParams(part).keys().next().value || '';
      return !/^(utm_.*|fbclid|gclid)$/i.test(key);
    }).join('&');
    if (url.href !== row[index]) changed++;
    const values = [...row];
    values[index] = url.href;
    const key = JSON.stringify(values);
    if (!seen.has(key)) { clean.push(values); seen.add(key); }
  }
  return { headers, rows: clean, total: rows.length, changed, duplicates: rows.length - clean.length };
}

export function toCsv({headers, rows}) {
  const cell = value => '"' + String(value).replace(/"/g, '""') + '"';
  return [headers, ...rows].map(row => row.map(cell).join(',')).join('\r\n') + '\r\n';
}
