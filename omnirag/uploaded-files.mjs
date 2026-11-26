import {parseCsv} from '../assets/js/delimited.mjs';

function columnName(number) {
  let result = '';
  while (number > 0) {
    number--;
    result = String.fromCharCode(65 + number % 26) + result;
    number = Math.floor(number / 26);
  }
  return result;
}

function table(document, text, isTsv) {
  const delimiter = isTsv ? '\t' : ',';
  const rows = parseCsv(text, delimiter, {keepEmptyRows: true});
  const first = rows.findIndex(row => row.some(value => value.trim()));
  const headers = rows[first]?.map(value => value.trim()) || [];
  const names = headers.map(value => value.toLowerCase());
  if (!headers.length || names.some(value => !value) || new Set(names).size !== names.length) {
    throw new Error('Include a header row with a unique name for each column.');
  }
  const chunks = [];
  for (let i = first + 1; i < rows.length; i++) {
    const values = rows[i];
    if (!values.some(value => value.trim())) continue;
    if (values.length !== headers.length) throw new Error('Column count differs on row ' + (i + 1) + '.');
    const pairs = values.map((value, col) => headers[col] + ': ' + value);
    chunks.push({
      id: document.id + '_r' + (i + 1),
      coord: 'Row ' + (i + 1) + ' (Col A-' + columnName(values.length) + ')',
      title: values.filter(Boolean).slice(0, 3).map(v => v.slice(0, 64)).join(' · '),
      text: 'Row ' + (i + 1) + ' | ' + pairs.join(' | '),
    });
  }
  if (!chunks.length) throw new Error('The table has no data rows below the header.');
  return {...document, format:isTsv ? 'TSV' : 'CSV', rowCount:chunks.length, colCount:headers.length, chunks,
    statusNote:chunks.length + ' rows × ' + headers.length + ' columns'};
}

export async function readLocalDocument(fileName, buffer, id) {
  const bytes = new Uint8Array(buffer);
  const document = {id, name:fileName, byteLength:bytes.length, uploaded:true};
  if (!bytes.length) throw new Error('The file is empty.');
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  document.fileSha256 = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  if (/\.pdf$/i.test(fileName) || new TextDecoder().decode(bytes.slice(0, 16)).includes('%PDF-')) {
    const reader = await import('./pdf-passages.mjs');
    const parsed = await reader.parse(fileName, buffer, id);
    if (parsed.parseError || !parsed.chunks.length) throw new Error(parsed.statusNote);
    return {...parsed, fileSha256:document.fileSha256};
  }
  if (!/\.(csv|tsv|txt|md)$/i.test(fileName)) throw new Error('Choose PDF, CSV, TSV, TXT or Markdown.');
  let text;
  try {
    text = new TextDecoder('utf-8', {fatal:true}).decode(bytes);
  } catch {
    throw new Error('Save the text file using UTF-8 and try again.');
  }
  if (text.includes('\0')) throw new Error('The file contains binary data. Export it as UTF-8 text.');
  if (/\.(csv|tsv)$/i.test(fileName)) return table(document, text, /\.tsv$/i.test(fileName));
  const chunks = text.split(/\r?\n\s*\r?\n/).map(part => part.trim()).filter(Boolean)
    .map((part, i) => ({id:id + '_s' + (i + 1), coord:'Section ' + (i + 1), title:part.slice(0, 68), text:part}));
  if (!chunks.length) throw new Error('The file contains no text.');
  return {...document, format:'TXT', chunks, statusNote:chunks.length + ' text section(s)'};
}
