(function () {
  'use strict';

  const KEY_STORAGE = 'docushield_v2_license_key';
  const CLIENT_STORAGE = 'docushield_v2_client_id';
  const state = { apiBase: window.location.origin, key: '', clientId: '' };
  const byId = (id) => document.getElementById(id);

  function loadClientId() {
    try {
      let cid = localStorage.getItem(CLIENT_STORAGE) || '';
      if (!cid) {
        cid = (window.crypto?.randomUUID?.() || String(Date.now()) + '-' + Math.random().toString(16).slice(2));
        localStorage.setItem(CLIENT_STORAGE, cid);
      }
      return cid;
    } catch {
      return 'browser-session';
    }
  }

  function loadStoredKey() {
    try { return (sessionStorage.getItem(KEY_STORAGE) || '').trim(); } catch { return ''; }
  }

  function saveStoredKey(val) {
    state.key = String(val || '').trim();
    try {
      if (state.key) sessionStorage.setItem(KEY_STORAGE, state.key);
      else sessionStorage.removeItem(KEY_STORAGE);
    } catch {}
  }

  function announce(msg) {
    const live = byId('vsLiveStatus');
    if (live) { live.textContent = ''; window.requestAnimationFrame(() => { live.textContent = msg; }); }
  }

  function setLicenseError(msg) {
    const input = byId('vsLicenseInput');
    const errEl = byId('vsLicenseError');
    if (!input || !errEl) return;
    const isErr = Boolean(msg);
    input.setAttribute('aria-invalid', isErr ? 'true' : 'false');
    input.classList.toggle('user-invalid-fallback', isErr);
    if (isErr) {
      input.setAttribute('aria-describedby', errEl.id);
      errEl.textContent = msg;
      errEl.classList.add('is-visible');
      announce(msg);
    } else {
      input.removeAttribute('aria-describedby');
      errEl.textContent = '';
      errEl.classList.remove('is-visible');
    }
  }

  function getHeaders() {
    const hdr = {};
    if (state.key) hdr['X-DocuShield-License'] = state.key;
    if (state.clientId) hdr['X-DocuShield-Client'] = state.clientId;
    return hdr;
  }

  function renderQuota(q) {
    const badge = byId('vsTierBadge');
    const note = byId('vsLicenseStatusNote');
    if (!badge || !q) return;
    if (q.tier === 'PRO') {
      const offer = byId('vsQuotaOffer');
      if (offer && !offer.hidden) {
        offer.hidden = true;
        byId('vsRemediateProgress').hidden = true;
        byId('vsRemediateBtn').focus();
      }
      badge.className = 'vs-tier-badge is-pro';
      badge.textContent = `PRO Active · Unlimited${q.expires_iso ? ` (until ${q.expires_iso})` : ''}`;
      if (note) note.textContent = `License verified (${q.source === 'gumroad' ? 'Gumroad' : 'ECDSA CFK2'}). Unlimited pages & daily runs unlocked.`;
    } else {
      badge.className = 'vs-tier-badge';
      badge.textContent = `Free · ${q.remaining ?? 0}/${q.daily_limit ?? 3} left today · ${q.max_pages ?? 10}p max`;
      if (note) note.textContent = `Free tier allows ${q.daily_limit ?? 3} PDFs/day up to ${q.max_pages ?? 10} pages. Activate PRO below for unlimited remediation.`;
    }
  }

  async function refreshQuota(apiBase) {
    if (apiBase) state.apiBase = apiBase;
    try {
      const resp = await fetch(`${state.apiBase}/api/quota`, { credentials: 'include', headers: getHeaders() });
      if (!resp.ok) return null;
      const data = await resp.json();
      renderQuota(data);
      return data;
    } catch {
      return null;
    }
  }

  function handleQuotaError(data) {
    renderQuota(data);
    const offer = byId('vsQuotaOffer');
    if (offer) {
      offer.hidden = false;
      offer.scrollIntoView({ block: 'nearest' });
    } else {
      const details = byId('vsLicenseDetails');
      details.open = true;
      details.scrollIntoView({ block: 'nearest' });
    }
  }

  async function handleVerifySubmit(e) {
    e.preventDefault();
    const input = byId('vsLicenseInput');
    const btn = byId('vsActivateLicenseBtn');
    const candidate = (input?.value || '').trim();
    if (!candidate) return setLicenseError('Paste a CFK2.DOC.PRO or Gumroad license key.');
    setLicenseError('');
    if (btn) btn.disabled = true;
    try {
      const resp = await fetch(`${state.apiBase}/api/license/verify`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...getHeaders() },
        body: JSON.stringify({ license_key: candidate }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.valid) {
        return setLicenseError(`License key rejected (${data.reason || data.detail || 'invalid key'}).`);
      }
      saveStoredKey(candidate);
      input.value = '';
      if (data.quota) renderQuota(data.quota);
      announce('DocuShield PRO license activated.');
    } catch {
      setLicenseError('The license service is unavailable. Try again.');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  function init() {
    state.clientId = loadClientId();
    try { localStorage.removeItem(KEY_STORAGE); } catch {}
    state.key = loadStoredKey();
    const input = byId('vsLicenseInput');
    const form = byId('vsLicenseForm');
    const clearBtn = byId('vsClearLicenseBtn');

    if (input) {
      input.addEventListener('input', () => { if (input.value.trim()) setLicenseError(''); });
      input.addEventListener('invalid', (e) => { e.preventDefault(); setLicenseError('Paste a valid license key.'); });
    }
    byId('vsOpenKeyEntry')?.addEventListener('click', () => {
      byId('vsLicenseDetails').open = true;
      input.focus();
    });
    if (form) form.addEventListener('submit', handleVerifySubmit);
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        saveStoredKey('');
        if (input) input.value = '';
        setLicenseError('');
        refreshQuota(state.apiBase);
        announce('Cleared stored license key.');
      });
    }
  }

  window.DocuShieldLicense = Object.freeze({
    getKey: () => state.key,
    getHeaders,
    setApiBase: (url) => { if (url) state.apiBase = url; },
    refreshQuota,
    handleQuotaError,
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
