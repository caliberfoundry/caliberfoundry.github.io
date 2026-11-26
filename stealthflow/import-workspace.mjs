import { normalizeCatalog, normalizeSupplierJson, toCsv, countEscapedCells } from './catalog-import.mjs';
const fileInput = document.querySelector('#supplierCsv');
const status = document.querySelector('#supplierStatus');
const preview = document.querySelector('#supplierPreview');
const download = document.querySelector('#supplierDownload');
let current = null, generation = 0;

async function readCatalog() {
  const version = ++generation;
  current = null;
  download.disabled = true;
  preview.textContent = '';
  status.textContent = '';
  const file = fileInput.files[0];
  if (!file) return;
  try {
    const json=/\.json$/i.test(file.name)||file.type==='application/json';
    if (file.size > (json?20000000:5000000)) throw Error('CSV limit: 5 MB. JSON limit: 20 MB.');
    let source;
    try { source = new TextDecoder('utf-8', {fatal:true}).decode(await file.arrayBuffer()); }
    catch { throw new Error('Choose a readable UTF-8 catalog.'); }
    const result = json ? normalizeSupplierJson(source) : normalizeCatalog(source);
    if (version !== generation) return;
    current = result;
    const display=toCsv({...result, rows:result.rows.slice(0, 3)});
    preview.textContent=display.length>3000?display.slice(0,3000)+'…':display;
    status.textContent = file.name + ' · ' + result.total + ' input rows · ' + result.changed +
      ' URLs normalized · ' + result.duplicates + ' duplicate rows removed. ' + countEscapedCells(result) + ' formula-like cells will be exported as text.';
    download.disabled = false;
  } catch (error) {
    if (version === generation) status.textContent = error.message;
  } finally {
    if (version === generation) fileInput.value = '';
  }
}
fileInput.addEventListener('change',readCatalog);
fileInput.disabled=false;
if(fileInput.files.length)readCatalog();

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
