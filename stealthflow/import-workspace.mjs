import { normalizeCatalog, toCsv, countEscapedCells } from './catalog-import.mjs';
const fileInput = document.querySelector('#supplierCsv');
const status = document.querySelector('#supplierStatus');
const preview = document.querySelector('#supplierPreview');
const download = document.querySelector('#supplierDownload');
let current = null, generation = 0;

fileInput.addEventListener('change', async () => {
  const version = ++generation;
  current = null;
  download.disabled = true;
  preview.textContent = '';
  status.textContent = '';
  const file = fileInput.files[0];
  if (!file) return;
  try {
    if (file.size > 5_000_000) throw new Error('Use a CSV file under 5 MB.');
    let source;
    try { source = new TextDecoder('utf-8', {fatal:true}).decode(await file.arrayBuffer()); }
    catch { throw new Error('Choose a readable UTF-8 CSV file.'); }
    const result = normalizeCatalog(source);
    if (version !== generation) return;
    current = result;
    preview.textContent = toCsv({...result, rows:result.rows.slice(0, 3)});
    status.textContent = file.name + ' · ' + result.total + ' input rows · ' + result.changed +
      ' URLs normalized · ' + result.duplicates + ' duplicate rows removed. ' + countEscapedCells(result) + ' formula-like cells will be exported as text.';
    download.disabled = false;
  } catch (error) {
    if (version === generation) status.textContent = error.message;
  } finally {
    if (version === generation) fileInput.value = '';
  }
});

download.addEventListener('click', () => {
  if (!current) return;
  const url = URL.createObjectURL(new Blob([toCsv(current)], {type:'text/csv;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'normalized-catalog.csv';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = current.rows.length + ' normalized rows exported.';
});
