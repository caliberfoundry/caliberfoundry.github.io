(function () {
  'use strict';

  const LANG_RE = /^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8})*$/;
  const MAX_PDF_BYTES = 25 * 1024 * 1024;
  const state = { apiBase: window.location.origin, online: false, selectedFile: null, jobId: null, timers: {} };
  const byId = (id) => document.getElementById(id);
  const escapeHtml = (val) => String(val ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  function resolveInitialApiBase(root) {
    if (root.dataset.standalone === 'true') return window.location.origin;
    if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      return window.location.protocol + '//' + window.location.hostname + ':8190';
    }
    return root.dataset.prodApi;
  }

  function announce(message) {
    const live = byId('vsLiveStatus');
    if (live) { live.textContent = ''; window.requestAnimationFrame(() => { live.textContent = message; }); }
  }

  function setFieldValidity(inputEl, errorEl, errorMessage) {
    if (!inputEl || !errorEl) return;
    const isErr = Boolean(errorMessage);
    inputEl.setAttribute('aria-invalid', isErr ? 'true' : 'false');
    inputEl.classList.toggle('user-invalid-fallback', isErr);
    if (isErr) {
      inputEl.setAttribute('aria-describedby', errorEl.id);
      errorEl.textContent = errorMessage;
      errorEl.classList.add('is-visible');
      announce(errorMessage);
    } else {
      inputEl.removeAttribute('aria-describedby');
      errorEl.textContent = '';
      errorEl.classList.remove('is-visible');
    }
  }

  function setProgressView(prefix, pct, stage, eta, note, stateClass) {
    const wrap = byId(prefix + 'Progress');
    if (!wrap) return;
    wrap.hidden = false;
    wrap.classList.remove('is-done', 'is-error', 'is-limited');
    if (stateClass) wrap.classList.add(stateClass);
    const bar = byId(prefix + 'Bar');
    if (bar) bar.style.width = `${pct}%`;
    if (byId(prefix + 'Stage')) byId(prefix + 'Stage').textContent = stage;
    if (byId(prefix + 'Eta')) byId(prefix + 'Eta').textContent = eta;
    if (byId(prefix + 'Note')) byId(prefix + 'Note').textContent = note;
  }

  function startProgress(prefix, stages, totalEstSec) {
    const offer = byId('vsQuotaOffer');
    if (offer) offer.hidden = true;
    clearInterval(state.timers[prefix]);
    const startedAt = Date.now();
    const tick = () => {
      const elapsed = Math.max(0, (Date.now() - startedAt) / 1000);
      const pct = Math.min(92, Math.round((elapsed / Math.max(1, totalEstSec)) * 88) + 8);
      const idx = Math.min(stages.length - 1, Math.floor((pct / 95) * stages.length));
      setProgressView(prefix, pct, stages[idx], `${pct}% · ${Math.round(elapsed)}s / ~${Math.max(1, Math.ceil(totalEstSec - elapsed))}s left`, 'Processing your document…', '');
    };
    tick();
    state.timers[prefix] = window.setInterval(tick, 350);
  }

  function finishProgress(prefix, ok, summaryText, detailText) {
    clearInterval(state.timers[prefix]);
    setProgressView(prefix, 100, summaryText, ok ? `100% · ${new Date().toLocaleTimeString()}` : 'Stopped', detailText || '', ok ? 'is-done' : 'is-error');
    announce(summaryText + (detailText ? '. ' + detailText : ''));
  }

  async function checkHealth() {
    const badge = byId('vsEngineBadge');
    const meta = byId('vsEngineMeta');
    const banner = byId('vsOfflineBanner');
    const ctrl = new AbortController();
    const tid = window.setTimeout(() => ctrl.abort(), 8000);
    try {
      const resp = await fetch(`${state.apiBase}/api/health`, { signal: ctrl.signal, credentials: 'include' });
      clearTimeout(tid);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      if (data.status !== 'ok' || !/^veraPDF /.test(data.verapdf_version)) throw new Error('Validator unavailable');
      state.online = true;
      if (badge) { badge.className = 'vs-engine-badge is-online'; badge.textContent = `Engine live · ${data.verapdf_version || 'veraPDF'}`; }
      if (meta) meta.textContent = `Version ${data.engine_version}`;
      if (banner) banner.hidden = true;
      byId('vsRunAuditBtn').disabled = false;
      byId('vsLicenseDetails').hidden = false;
      window.DocuShieldLicense?.refreshQuota(state.apiBase);
      return true;
    } catch {
      clearTimeout(tid);
      state.online = false;
      if (badge) { badge.className = 'vs-engine-badge is-offline'; badge.textContent = 'Processing unavailable'; }
      if (meta) meta.textContent = `Try again in a moment.`;
      if (banner) banner.hidden = false;
      byId('vsRunAuditBtn').disabled = true;
      byId('vsLicenseDetails').hidden = true;
      return false;
    }
  }

  function validateSelectedPdf(file) {
    if (!file) return 'Select a local .pdf file before running a veraPDF audit.';
    if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') return 'Only .pdf documents are accepted for PDF/UA-1 remediation.';
    if (file.size <= 0) return 'Selected PDF file is empty.';
    if (file.size > MAX_PDF_BYTES) return 'PDF exceeds the 25 MB upload limit.';
    return '';
  }

  function applySelectedFile(file) {
    state.selectedFile = file || null;
    state.jobId = null;
    for (const id of ['vsStep2', 'vsStep3', 'vsResultPanel', 'vsAuditProgress', 'vsRemediateProgress']) byId(id).hidden = true;
    const metaEl = byId('vsSelectedFileMeta');
    if (metaEl) metaEl.textContent = file ? `${file.name} (${(file.size / 1024).toFixed(1)} KB)` : 'No PDF selected yet.';
    setFieldValidity(byId('vsPdfInput'), byId('vsPdfError'), file ? validateSelectedPdf(file) : '');
  }

  function renderAuditResults(payload) {
    const vera = payload.verapdf || {};
    const insp = payload.inspection || {};
    const figs = insp.figures || [];
    const unembedded = insp.unembedded_fonts || [];

    if (byId('vsStep2')) byId('vsStep2').hidden = false;
    if (byId('vsStep3')) byId('vsStep3').hidden = false;
    if (byId('vsResultPanel')) byId('vsResultPanel').hidden = true;
    const titleInput = byId('vsTitleInput');
    if (titleInput) titleInput.value = insp.metadata?.title || '';

    const kpiGrid = byId('vsAuditKpis');
    if (kpiGrid) {
      const kpis = [
        ['veraPDF Before', vera.is_compliant ? 'Compliant' : 'Failed', `${vera.failed_rules ?? 0} failed / ${vera.passed_rules ?? 0} passed rules`, vera.is_compliant ? 'is-pass' : 'is-fail'],
        ['Failed Checks', String(vera.failed_checks ?? 0), vera.profile || 'PDF/UA-1 (ISO 14289-1)', vera.failed_checks ? 'is-fail' : 'is-pass'],
        ['Pages / Figures', `${insp.metadata?.page_count ?? '—'} / ${figs.length}`, figs.length ? 'Review figure descriptions below' : 'No figures extracted', ''],
        ['Unembedded Fonts', String(unembedded.length), unembedded.length ? 'Eligible fonts may be embedded' : 'All fonts embedded', unembedded.length ? 'is-fail' : 'is-pass']
      ];
      kpiGrid.innerHTML = kpis.map(([l, v, s, c]) => `<div class="vs-kpi-card"><span class="vs-kpi-label">${escapeHtml(l)}</span><span class="vs-kpi-val ${c}">${escapeHtml(v)}</span><span class="vs-kpi-label">${escapeHtml(s)}</span></div>`).join('');
    }

    const fontWarn = byId('vsFontWarning');
    if (fontWarn) {
      fontWarn.hidden = unembedded.length === 0;
      if (unembedded.length) fontWarn.innerHTML = `<strong>Unembedded Type1/CID fonts detected:</strong> ${escapeHtml(unembedded.join(', '))}. Auto attempts to embed matching fonts and checks the revised file. Inspect remaining font errors in the report.`;
    }
    if (byId('vsMarkAllDecorativeBtn')) byId('vsMarkAllDecorativeBtn').disabled = figs.length === 0;
    if (byId('vsFiguresEmpty')) byId('vsFiguresEmpty').hidden = figs.length > 0;
    const figsWrap = byId('vsFiguresList');
    if (figsWrap) {
      figsWrap.innerHTML = figs.map((fig) => {
        const fid = escapeHtml(fig.figure_id);
        return `<div class="vs-fig-card" data-fig-card="${fid}">` +
          `<img class="vs-fig-crop" src="${escapeHtml(state.apiBase + fig.crop_url)}" alt="Crop of figure ${fid} on page ${escapeHtml(fig.page)}" loading="lazy" />` +
          `<div class="vs-fig-meta"><span>${fid} · Page ${escapeHtml(fig.page)}</span><span>${escapeHtml(fig.width_px)}x${escapeHtml(fig.height_px)} px</span></div>` +
          `<div class="vs-field-group"><label class="vs-label" for="vsAlt_${fid}">Alternative text (/Alt)</label>` +
          `<input class="vs-input" id="vsAlt_${fid}" type="text" data-fig-alt="${fid}" value="${escapeHtml(fig.existing_alt || '')}" placeholder="Describe image content concisely..." /></div>` +
          `<label class="vs-check-label" for="vsDec_${fid}"><input type="checkbox" id="vsDec_${fid}" data-fig-dec="${fid}" /><span>Decorative (/Artifact) — no alt text needed</span></label>` +
          `</div>`;
      }).join('');
    }
  }

  function buildAltMapFromInputs() {
    const map = {};
    document.querySelectorAll('[data-fig-card]').forEach((card) => {
      const fid = card.getAttribute('data-fig-card');
      const dec = card.querySelector('[data-fig-dec]');
      const alt = card.querySelector('[data-fig-alt]');
      if (!fid) return;
      if (dec && dec.checked) map[fid] = { alt: '', decorative: true };
      else if (alt && alt.value.trim()) map[fid] = { alt: alt.value.trim(), decorative: false };
    });
    return map;
  }

  function renderDiffTable(beforeVera, afterVera) {
    const tbody = byId('vsDiffTableBody');
    if (!tbody) return;
    const keyOf = (v) => `${v.clause || ''}|${v.test_number || ''}|${v.description || ''}`;
    const merged = new Map();
    for (const v of (beforeVera.violations || [])) merged.set(keyOf(v), { clause: v.clause, desc: v.description, before: v.failed_checks || 0, after: 0 });
    for (const v of (afterVera.violations || [])) {
      const k = keyOf(v);
      const row = merged.get(k) || { clause: v.clause, desc: v.description, before: 0, after: 0 };
      row.after = v.failed_checks || 0;
      merged.set(k, row);
    }
    if (merged.size === 0) {
      tbody.innerHTML = '<tr><td>PDF/UA-1</td><td>All ISO 14289-1 machine-verifiable clauses passed</td><td>0</td><td>0</td><td><span class="vs-pill is-resolved">Passed</span></td></tr>';
      return;
    }
    tbody.innerHTML = Array.from(merged.values()).map((r) => `<tr>
      <td><code>${escapeHtml(r.clause || '-')}</code></td>
      <td>${escapeHtml(r.desc || 'Clause rule')}</td>
      <td>${escapeHtml(r.before)}</td>
      <td>${escapeHtml(r.after)}</td>
      <td><span class="vs-pill ${r.after === 0 ? 'is-resolved' : 'is-residual'}">${r.after === 0 ? 'Resolved' : 'Residual'}</span></td>
    </tr>`).join('');
  }

  function renderRemediationResult(result) {
    const panel = byId('vsResultPanel');
    const verdict = byId('vsVerdictBanner');
    if (!panel || !verdict) return;
    panel.hidden = false;
    const before = result.before || {};
    const after = result.after || {};
    const isOk = after.is_compliant === true;
    verdict.className = `vs-alert-banner ${isOk ? 'is-review' : 'is-fail'}`;
    const fallbackNote = result.fallback_triggered ? ` Auto mode switched from in-place to Reflow (${escapeHtml(result.fallback_reason || 'structure')}).` : '';
    const missingNote = (result.missing_alt_figures || []).length ? ` Missing alt text for figures: ${escapeHtml(result.missing_alt_figures.join(', '))}.` : '';
    verdict.innerHTML = `<strong>${isOk ? 'Automated PDF/UA-1 checks passed' : 'Residual ISO 14289-1 Violations Remaining'}</strong> — Mode used: <code>${escapeHtml(result.mode_used)}</code> · Before: <strong>${escapeHtml(before.failed_rules)} failed</strong> (${escapeHtml(before.failed_checks)} checks) → After: <strong>${escapeHtml(after.failed_rules)} failed / ${escapeHtml(after.passed_rules)} passed</strong> (${escapeHtml(after.failed_checks)} checks).${fallbackNote}${missingNote}`;
    for (const note of result.quality?.notes || []) {
      const line = document.createElement('p');
      line.textContent = note;
      verdict.append(line);
    }
    renderDiffTable(before, after);
    const dlBar = byId('vsDownloadBar');
    const dlPdf = byId('vsDownloadPdfLink');
    const dlRep = byId('vsDownloadReportLink');
    if (dlBar && dlPdf && dlRep && result.download_url) {
      dlPdf.href = `${state.apiBase}${result.download_url}`;
      dlRep.href = `${state.apiBase}${result.report_url}`;
      dlBar.hidden = false;
    }
  }

  async function runJobStep(e, kind) {
    e.preventDefault();
    const isAudit = kind === 'audit';
    const source = state.selectedFile;
    byId('vsResultPanel').hidden = true;
    const inputEl = byId(isAudit ? 'vsPdfInput' : 'vsLangInput');
    const errEl = byId(isAudit ? 'vsPdfError' : 'vsLangError');
    const btn = byId(isAudit ? 'vsRunAuditBtn' : 'vsRemediateBtn');
    const prefix = isAudit ? 'vsAudit' : 'vsRemediate';
    const errMsg = isAudit
      ? validateSelectedPdf(state.selectedFile)
      : (LANG_RE.test((inputEl?.value || '').trim()) ? '' : 'Enter a valid BCP-47 language tag (e.g., en-US, de-DE, ru-RU).');
    if (errMsg) return setFieldValidity(inputEl, errEl, errMsg);
    setFieldValidity(inputEl, errEl, '');
    if (!isAudit && !state.jobId) return finishProgress(prefix, false, 'No active audit job', 'Run Step 1 PDF audit before remediating.');

    const form = new FormData();
    let mode = 'auto';
    if (isAudit) {
      form.append('file', state.selectedFile);
    } else {
      mode = document.querySelector('input[name="vsMode"]:checked')?.value || 'auto';
      form.append('job_id', state.jobId);
      form.append('mode', mode);
      form.append('lang', inputEl.value.trim());
      const titleVal = byId('vsTitleInput')?.value.trim();
      if (titleVal) form.append('title', titleVal);
      form.append('alt_map', JSON.stringify(buildAltMapFromInputs()));
    }

    if (btn) btn.disabled = true;
    startProgress(
      prefix,
      isAudit
        ? ['Uploading PDF bytes...', 'Extracting figure PNG crops...', 'Running veraPDF ua1...']
        : [`Running ${mode} PDF/UA-1 pass...`, 'Embedding XMP & structure tree...', 'Verifying output with veraPDF...'],
      isAudit ? 4 : 5
    );
    try {
      const headers = window.DocuShieldLicense ? window.DocuShieldLicense.getHeaders() : {};
      const resp = await fetch(`${state.apiBase}/api/${kind}`, { method: 'POST', credentials: 'include', headers, body: form });
      const data = await resp.json();
      if (source !== state.selectedFile) { clearInterval(state.timers[prefix]); return; }
      if (resp.status === 402 && !isAudit) {
        clearInterval(state.timers[prefix]);
        setProgressView(prefix, 0, 'Free plan limit reached', '', data.detail || 'Pro unlocks more repairs.', 'is-limited');
        window.DocuShieldLicense?.handleQuotaError(data);
        return;
      }
      if (!resp.ok || !data.ok) throw new Error(data.detail || data.error || data.inspection?.error || `${kind} failed (HTTP ${resp.status})`);
      if (isAudit) {
        state.jobId = data.job_id;
        renderAuditResults(data);
        finishProgress(prefix, true, `Audit complete · ${data.verapdf?.failed_rules ?? 0} failed rules, ${(data.inspection?.figures || []).length} figures extracted`, `Job ${data.job_id.slice(0, 8)} ready for alt-text review.`);
        await checkHealth();
      } else {
        renderRemediationResult(data);
        if (data.quota) window.DocuShieldLicense?.refreshQuota(state.apiBase);
        const after = data.after || {};
        finishProgress(prefix, true, `Remediation complete · ${after.failed_rules ?? 0} failed / ${after.passed_rules ?? 0} passed rules`, data.compliant ? 'Review the revised file and report.' : 'Download ready; inspect residual rules below.');
      }
    } catch (err) {
      finishProgress(prefix, false, isAudit ? 'Audit failed' : 'Remediation failed', err.message || 'The processing service is unavailable.');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  function init() {
    const root = byId('verapdfStudio');
    if (!root) return;
    state.apiBase = resolveInitialApiBase(root);
    const pdfInput = byId('vsPdfInput');
    const pdfErr = byId('vsPdfError');
    const dropzone = byId('vsDropzone');
    const langInput = byId('vsLangInput');
    const langErr = byId('vsLangError');
    const figsList = byId('vsFiguresList');
    window.DocuShieldLicense?.setApiBase(state.apiBase);

    if (byId('vsPickPdfBtn') && pdfInput) byId('vsPickPdfBtn').addEventListener('click', () => pdfInput.click());
    if (pdfInput) {
      pdfInput.addEventListener('change', () => applySelectedFile(pdfInput.files && pdfInput.files[0]));
      pdfInput.addEventListener('invalid', (e) => { e.preventDefault(); setFieldValidity(pdfInput, pdfErr, validateSelectedPdf(state.selectedFile)); });
    }
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('is-dragover'); });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('is-dragover'));
      dropzone.addEventListener('drop', (e) => { e.preventDefault(); dropzone.classList.remove('is-dragover'); if (e.dataTransfer?.files?.[0]) applySelectedFile(e.dataTransfer.files[0]); });
    }
    if (byId('vsReconnectBtn')) byId('vsReconnectBtn').addEventListener('click', checkHealth);
    if (byId('vsAuditForm')) byId('vsAuditForm').addEventListener('submit', (e) => runJobStep(e, 'audit'));
    if (byId('vsRemediateForm')) byId('vsRemediateForm').addEventListener('submit', (e) => runJobStep(e, 'remediate'));
    if (langInput) {
      const syncLang = () => setFieldValidity(langInput, langErr, LANG_RE.test(langInput.value.trim()) ? '' : 'Enter a valid BCP-47 language tag (e.g., en-US, de-DE, ru-RU).');
      ['blur', 'input'].forEach((ev) => langInput.addEventListener(ev, syncLang));
      langInput.addEventListener('invalid', (e) => { e.preventDefault(); syncLang(); });
    }
    if (figsList) {
      figsList.addEventListener('change', (e) => {
        const cb = e.target.closest('[data-fig-dec]');
        if (!cb) return;
        const card = cb.closest('[data-fig-card]');
        const altInput = card ? card.querySelector('[data-fig-alt]') : null;
        if (altInput) altInput.disabled = cb.checked;
        if (card) card.classList.toggle('is-decorative', cb.checked);
      });
    }
    if (byId('vsMarkAllDecorativeBtn') && figsList) {
      byId('vsMarkAllDecorativeBtn').addEventListener('click', () => figsList.querySelectorAll('[data-fig-dec]').forEach((cb) => { cb.checked = true; cb.dispatchEvent(new Event('change', { bubbles: true })); }));
    }
    checkHealth();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
