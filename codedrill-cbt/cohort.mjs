import {fileRequestProgress, readUtf8} from '../assets/js/request-progress.mjs';
const progress = fileRequestProgress();
const byId = id => document.getElementById(id);
const fileInput = byId('attempts'), calculate = byId('calculate'), status = byId('status');
const url = 'https://api.caliberfoundry.com/portfolio/v1/codedrill/cohort';
let revision = 0;
let scored;
let practice;

function save(name, content, type) {
  const href = URL.createObjectURL(new Blob([content], {type}));
  const anchor = document.createElement('a');
  anchor.download = name;
  anchor.href = href;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(href), 1500);
}

async function readPractice() {
  const entry = JSON.parse(localStorage.getItem('CODEDRILL_CBT_STATE_V2026') || '{}');
  const answers = Object.entries(entry.questionWork || {}).filter(([, w]) => w.checked && w.selectedOption)
    .map(([questionId, w]) => ({questionId, choice:w.selectedOption}));
  if (!answers.length) {
    byId('practiceStatus').textContent = 'Check at least one answer in CodeDrill, then return to this page.';
    return;
  }
  const response = await fetch('data/codedrill-data.json', {cache:'no-cache'});
  if (!response.ok) throw Error('Could not load the question bank. Reload to retry.');
  const bank = await response.json();
  let attemptId = localStorage.getItem('codedrill-cohort-attempt-v1');
  if (!attemptId) {
    attemptId = crypto.randomUUID();
    localStorage.setItem('codedrill-cohort-attempt-v1', attemptId);
  }
  practice = {format:'codedrill-attempt-v1', attemptId, bankVersion:bank.meta.version, answers};
  byId('practiceStatus').textContent = answers.length + ' checked answer(s) ready to share. Save a fresh file after further practice.';
  byId('exportAttempt').disabled = false;
}
readPractice().catch(() => { byId('practiceStatus').textContent = 'Could not read saved practice or the question bank. Open CodeDrill in this browser and retry.'; });

byId('exportAttempt').addEventListener('click', () => {
  if (practice) save('codedrill-attempt-' + practice.attemptId + '.json', JSON.stringify(practice, null, 2), 'application/json');
});

fileInput.addEventListener('change', () => {
  revision++;
  progress.reset();
  scored = null;
  byId('result').hidden = true;
  const files = [...fileInput.files];
  const ready = files.length > 0 && files.length <= 100 && files.reduce((n,f) => n + f.size, 0) <= 524288;
  calculate.disabled = !ready;
  status.textContent = !files.length ? '' : ready ? files.length + ' file(s) selected.' : 'Select up to 100 files totalling at most 512 KiB.';
});

function pickAttempt(text) {
  const {format, attemptId, bankVersion, answers} = JSON.parse(text);
  if (format !== 'codedrill-attempt-v1' || !Array.isArray(answers) || !answers.length ||
      !/^[a-f0-9-]{36}$/i.test(attemptId) || typeof bankVersion !== 'string' || bankVersion.length > 64)
    throw Error('Choose JSON exported by CodeDrill.');
  const choices = answers.map(({questionId,choice}) => {
    if (!/^[a-z0-9_-]{1,40}$/i.test(questionId) || !/^[A-E]$/.test(choice)) throw Error('Invalid question or answer choice.');
    return {questionId,choice};
  });
  return {format,attemptId,bankVersion,answers:choices};
}

calculate.addEventListener('click', async () => {
  const request = ++revision;
  calculate.disabled = true;
  scored = null;
  byId('result').hidden = true;
  progress.begin();
  status.textContent = 'Reading selected files…';
  try {
    const attempts = await Promise.all([...fileInput.files].map(async f => pickAttempt(await readUtf8(f))));
    if (revision !== request) return;
    progress.waiting();
    status.textContent = 'Checking the answers against the question bank…';
    const response = await fetch(url, {method:'POST', headers:{'Content-Type':'application/json'}, credentials:'omit',
      referrerPolicy:'no-referrer', signal:AbortSignal.timeout(15000), body:JSON.stringify({attempts})});
    const report = await response.json();
    if (revision !== request) return;
    if (!response.ok) throw Error(report.error || 'Could not calculate results.');
    byId('summary').textContent = report.sessions + ' practice sessions · ' + report.correct + ' correct of ' + report.checked + ' checked (' + report.scorePercent + '%).';
    byId('topics').replaceChildren(...report.topics.map(topic => {
      const row = document.createElement('tr');
      for (const value of [topic.topic, topic.correct, topic.checked]) row.insertCell().textContent = value;
      return row;
    }));
    scored = report;
    byId('result').hidden = false;
    progress.complete();
    status.textContent = 'Calculation complete.';
  } catch (error) {
    if (revision === request) { progress.reset(); status.textContent = error instanceof SyntaxError ? 'Unreadable JSON file or server response. Check the input and retry.' : error.message; }
  } finally {
    if (revision === request) calculate.disabled = false;
  }
});

byId('download').addEventListener('click', () => {
  if (!scored) return;
  const csv = ['Session ID,Checked,Correct,Accuracy percent',
    ...scored.learners.map(s => [s.attemptId,s.checked,s.correct,s.scorePercent].join(','))];
  save('codedrill-cohort-scores.csv', csv.join('\r\n') + '\r\n', 'text/csv;charset=utf-8');
});
