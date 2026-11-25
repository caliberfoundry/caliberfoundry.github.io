(() => {
  'use strict';

  const productId = 'DeZTiB_cmFovFyBAzwVzuw==';
  const endpoint = 'https://api.gumroad.com/v2/licenses/verify';
  const unavailable = 'Gumroad could not verify the code right now. Check your connection and try again.';

  function matches(code) {
    return typeof code === 'string' && /^(?:[0-9a-f]{8}-){3}[0-9a-f]{8}$/i.test(code.trim());
  }

  async function verify(code) {
    if (!matches(code)) return false;
    const key = code.trim().toUpperCase();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'omit',
        cache: 'no-store',
        redirect: 'error',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        body: new URLSearchParams({
          product_id: productId,
          license_key: key,
          increment_uses_count: 'false',
        }),
      });
      if (response.status === 404) return false;
      if (!response.ok) throw new Error(unavailable);
      const result = await response.json();
      const purchase = result.purchase;
      return result.success === true &&
        purchase?.product_id === productId &&
        purchase.license_key === key &&
        purchase.refunded === false &&
        purchase.disputed === false &&
        purchase.chargebacked === false;
    } catch {
      throw new Error(unavailable);
    } finally {
      clearTimeout(timeout);
    }
  }

  window.FinOpsGuardGumroad = Object.freeze({matches, verify});
})();
