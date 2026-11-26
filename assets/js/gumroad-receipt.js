/* Gumroad returns purchase details directly to the buyer's browser. Store only
   the decision in memory. Each product restores access with a new verification. */
window.createGumroadReceiptVerifier = function (productId, tier, durationDays) {
  'use strict';
  let accepted = '';
  let expiresAt = null;
  const normalize = code => String(code || '').trim().toUpperCase();
  const matches = code => /^(?:[A-F0-9]{8}-){3}[A-F0-9]{8}$/.test(normalize(code));
  function decision(code) {
    if (!accepted || accepted !== normalize(code)) return { valid: false };
    if (durationDays) {
      if (!Number.isFinite(expiresAt)) return { valid: false };
      const expiresIso = new Date(expiresAt).toISOString();
      if (Date.now() >= expiresAt) return { valid: false, expired: true, expiresIso };
      return { valid: true, tier, customerTag: 'Gumroad', provider: 'Gumroad', expiresIso };
    }
    return { valid: true, tier, customerTag: 'Gumroad', provider: 'Gumroad' };
  }

  async function check(code, feedback) {
    if (!matches(code)) return;
    expiresAt = null;
    const key = normalize(code);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    if (feedback) feedback.textContent = 'Checking your purchase with Gumroad…';
    try {
      const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
        method: 'POST', credentials: 'omit', cache: 'no-store', redirect: 'error',
        referrerPolicy: 'no-referrer', signal: controller.signal,
        body: new URLSearchParams({ product_id: productId, license_key: key, increment_uses_count: 'false' })
      });
      if (response.status === 404) {
        accepted = '';
        return;
      }
      if (!response.ok) throw new Error();
      const result = await response.json();
      const order = result.purchase;
      accepted = result.success === true && order?.product_id === productId &&
        normalize(order.license_key) === key && order.refunded === false &&
        order.disputed === false && order.chargebacked === false ? key : '';
      if (accepted && durationDays) {
        const purchased = Date.parse(order.created_at || order.sale_timestamp);
        if (!Number.isFinite(purchased) || purchased > Date.now()) accepted = '';
        else expiresAt = purchased + durationDays * 86400000;
      }
    } catch {
      accepted = '';
      throw new Error('Gumroad is unavailable. Check your connection and try the receipt key again.');
    } finally {
      clearTimeout(timeout);
      if (feedback) feedback.textContent = '';
    }
  }

  return Object.freeze({ matches, decision, check });
};
