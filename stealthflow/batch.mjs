import {fileRequestProgress, readUtf8} from '../assets/js/request-progress.mjs';
const progress = fileRequestProgress();
import {toCsv, countEscapedCells} from './catalog-import.mjs';
const byId = id => document.getElementById(id);
const input = byId('catalogs'), run = byId('combine'), status = byId('status'), output = byId('output');
let generation = 0;
let result;
function selectCatalogs() {
  generation++;
  progress.reset();
  result = null;
  output.hidden = true;
  const files = [...input.files];
  const valid = files.length > 0 && files.length <= 12 && files.reduce((n, file) => n + file.size, 0) <= 524288;
  status.textContent = !files.length ? '' : valid ? files.length + ' file(s) selected.' : 'Choose at most 12 files totalling up to 512 KiB.';
  run.disabled = !valid;
}
input.addEventListener('change',selectCatalogs);
input.disabled=false;
if(input.files.length)selectCatalogs();
function tableRow(values, tag) {
  const tr = document.createElement('tr');
  for (const value of values) {
    const cell = document.createElement(tag);
    cell.textContent = value;
    tr.append(cell);
  }
  return tr;
}
run.addEventListener('click', async () => {
  const request = ++generation;
  result = null;
  output.hidden = true;
  run.disabled = true;
  progress.begin();
  status.textContent = 'Reading your files…';
  try {
    const catalogs = await Promise.all([...input.files].map(readUtf8));
    if (request !== generation) return;
    progress.waiting();
    status.textContent = 'Matching columns and combining records…';
    const body = JSON.stringify({catalogs});
    if (new Blob([body]).size > 524288) throw Error('The encoded request exceeds 512 KiB. Choose a smaller batch.');
    const response = await fetch('https://api.caliberfoundry.com/portfolio/v1/stealthflow/catalogs', {
      method:'POST', headers:{'Content-Type':'application/json'}, credentials:'omit', referrerPolicy:'no-referrer',
      signal:AbortSignal.timeout(15000), body
    });
    const data = await response.json();
    if (request !== generation) return;
    if (!response.ok) throw Error(data.error || 'Processing failed. Check the files and retry.');
    byId('columns').replaceChildren(tableRow(data.headers, 'th'));
    byId('preview').replaceChildren(...data.rows.slice(0,3).map(row => tableRow(row,'td')));
    byId('counts').textContent = data.total + ' input rows · ' + data.rows.length + ' retained · ' + data.duplicates + ' duplicates removed.';
    const escaped = countEscapedCells(data);
    if (escaped) byId('counts').textContent += ' Spreadsheet-safe export protects ' + escaped + ' formula-like cell(s).';
    result = data;
    output.hidden = false;
    progress.complete();
    status.textContent = 'Your combined catalog is ready.';
  } catch (error) {
    if (generation === request) { progress.reset(); status.textContent = error.message; }
  } finally { if (generation === request) run.disabled = false; }
});
byId('download').addEventListener('click', () => {
  if (!result) return;
  const href = URL.createObjectURL(new Blob([toCsv(result)], {type:'text/csv;charset=utf-8'}));
  const a = document.createElement('a'); a.href = href; a.download = 'combined-catalog.csv'; a.click();
  setTimeout(() => URL.revokeObjectURL(href), 1500);
});
