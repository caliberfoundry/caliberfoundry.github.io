(function () {
  'use strict';

  let publicKey;

  async function verify(code) {
    const parts = code.split('.');
    if (parts.length !== 6 || parts[0] !== 'CFK2' || !/^[A-Z0-9]{1,12}$/.test(parts[1]) ||
        !/^[A-Z0-9]{1,12}$/.test(parts[2]) || !/^(?:0|\d{8})$/.test(parts[3]) ||
        !/^[0-9a-f]{32}$/.test(parts[4]) || !/^[A-Za-z0-9_-]{86}$/.test(parts[5])) {
      throw Error('Enter the complete license code from your purchase.');
    }
    if (parts[1] !== 'FIN' || parts[2] !== 'PRO') {
      throw Error('This code is for a different product or license tier. Enter your FinOpsGuard Pro code.');
    }
    const raw = atob(parts[5].replace(/-/g, '+').replace(/_/g, '/') + '==');
    const canonical = btoa(raw).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    if (canonical !== parts[5]) throw Error('Check the license code and try again.');
    if (!publicKey) {
      const response = await fetch('./issuer-public.jwk.json', {credentials:'omit', referrerPolicy:'no-referrer'});
      if (!response.ok || !window.crypto?.subtle) throw Error('Verification is unavailable. Reopen the secure FinOpsGuard page and retry.');
      publicKey = await crypto.subtle.importKey('jwk', await response.json(), {name:'ECDSA', namedCurve:'P-256'}, false, ['verify']);
    }
    const valid = await crypto.subtle.verify({name:'ECDSA', hash:'SHA-256'}, publicKey,
      Uint8Array.from(raw, c => c.charCodeAt(0)), new TextEncoder().encode(parts.slice(0,5).join('.')));
    if (!valid) throw Error('The signature did not match. Copy the complete code from your purchase.');
    if (parts[3] === '0') return Infinity;
    const date = parts[3].replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
    const expires = Date.parse(date + 'T23:59:59.999Z');
    if (!Number.isFinite(expires) || new Date(expires).toISOString().slice(0,10) !== date) throw Error('The license date is invalid.');
    if (expires < Date.now()) throw Error('This license has expired. Enter a current FinOpsGuard license code.');
    return expires;
  }
  window.FinOpsGuardSignedLicense = Object.freeze({verify});
})();
