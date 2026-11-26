/* Gumroad returns purchase details directly to the buyer's browser. Store only
   the decision in memory. Each product restores access with a new verification. */
window.createGumroadReceiptVerifier = function (productId, tier) {
  'use strict';
  let accepted = '';
  const normalize = code => String(code || '').trim().toUpperCase();
  const matches = code => /^(?:[A-F0-9]{8}-){3}[A-F0-9]{8}$/.test(normalize(code));
  const decision = code => accepted && accepted === normalize(code)
    ? { valid: true, tier, customerTag: 'Gumroad', provider: 'Gumroad' }
    : { valid: false };

  async function check(code, feedback) {
    if (!matches(code)) return;
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
