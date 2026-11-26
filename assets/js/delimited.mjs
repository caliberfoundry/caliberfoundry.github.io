export function parseCsv(text, delimiter = ',') {
  const rows = [];
  let row = [], field = '', quoted = false, closed = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') field += c;
      else if (text[i + 1] === '"') { field += '"'; i++; }
      else { quoted = false; closed = true; }
    } else if (c === delimiter || c === '\n' || c === '\r') {
      row.push(field);
      field = ''; closed = false;
      if (c !== delimiter) {
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

