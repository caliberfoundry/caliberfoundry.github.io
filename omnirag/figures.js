// Find written figures and their units. The comparison is lexical, not a semantic assessment.
(function () {
  const aliases = {
    '$':'USD', '€':'EUR', '£':'GBP', usd:'USD', eur:'EUR', gbp:'GBP', '%':'%',
    mw:'MW', day:'DAYS', days:'DAYS', year:'YEARS', years:'YEARS', hour:'HOURS', hours:'HOURS'
  };
  const scales = {k:1e3, thousand:1e3, m:1e6, million:1e6, b:1e9, billion:1e9};
  const pattern = /(\()?([−+-]?)\s*([$€£]|USD\b|EUR\b|GBP\b)?\s*([−+-]?)((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?)(?:\s*(thousand|million|billion|[kmb])\b)?(?:\s*[- ]?\s*(USD\b|EUR\b|GBP\b|MW\b|%|days?\b|years?\b|hours?\b))?(\))?/gi;
  function measure(text) {
    return Array.from(String(text).matchAll(pattern), match => {
      const [, left, signA, currency, signB, number, scale, suffix, right] = match;
      const negative = [signA,signB].some(sign => sign === '−' || sign === '-') || left && right;
      const unit = currency || suffix || '';
      const multiplier = scales[(scale || '').toLowerCase()] || 1;
      return {
        value: Number(number.replaceAll(',', '')) * multiplier * (negative ? -1 : 1),
        unit: aliases[unit.toLowerCase()] || '',
        raw: match[0].trim()
      };
    });
  }
  window.OmniFigures = {measure};
})();
