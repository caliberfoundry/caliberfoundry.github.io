(() => {
  'use strict';
  const stop = new Set(('a an all and any are as at be by can describe do does each for from have how if in into is it of on or our please provide state that the their these this to under use used uses using what when where which who will with would you your policy policies security control controls include including data does process processes company organization organizations ensure implemented implementing management').split(' '));
  const concepts = [
    ['mfa','multi-factor','multifactor','two-factor','2fa'], ['sso','single sign-on','single sign on'],
    ['encrypt','encryption','encrypted','encrypts','encrypting'], ['backup','backups','back-up'],
    ['retention','retain','retains','retained'], ['rotate','rotating','rotation','rotated'],
    ['revoke','revoked','revocation'], ['authentication','authenticate','authenticated'],
    ['logs','logging','log'], ['vendor','supplier','vendors','suppliers'], ['key','keys'],
    ['password','passwords'], ['screen reader','screenreader'], ['keyboard','keyboard-only']
  ];
  const phrases = concepts.flatMap(group => group.map(term => [new RegExp('\\b'+term+'\\b','gi'), group[0]]));
  const distinctive = new Set(['mfa','sso','saml','fido2','webauthn','tls','kms','aes','rto','rpo','pitr','ssn','scim','rbac','wcag','gdpr','ferpa','encryption','encrypt','retention','backup','screenreader','keyboard','rotate','revocation','revoke']);
  function words(text) {
    let normalized = String(text).normalize('NFKC').toLowerCase();
    for (const [pattern, word] of phrases) normalized = normalized.replace(pattern, word);
    return new Set((normalized.match(/[\p{L}\p{N}][\p{L}\p{N}.-]*/gu) || []).map(w=>w.replace(/[.-]+$/,'')).filter(w=>w.length > 1 && !stop.has(w)));
  }
  function splitPolicy(text) {
    const sections = [];
    String(text || '').split(/\r\n|\r|\n/).forEach((line, i) => {
      const pieces = line.split(/(?=\[[\w.-]+\]\s+)/);
      for (const [j, part] of pieces.entries()) {
        const content = part.trim();
        if (!content) continue;
        const tag = content.match(/^\[([\w.-]+)\]\s*/);
        const excerpt = content.slice(tag ? tag[0].length : 0).trim();
        if (excerpt) sections.push({anchor:tag ? '['+tag[1]+']' : 'Line '+(i+1)+(j ? '.'+(j+1) : ''),line:i+1,excerpt,terms:words(excerpt)});
      }
    });
    return sections;
  }
  function match(question, sections) {
    const named = new Set(String(question).match(/\[[\w.-]+\]/g) || []);
    if (named.size) {
      const cited = sections.filter(section => named.has(section.anchor));
      if (cited.length !== 1) return null;
      const {anchor, line, excerpt} = cited[0];
      return {anchor, line, excerpt};
    }
    const terms=words(question);
    let best=null, bestScore=0, ambiguous=false;
    for (const section of sections) {
      const overlap=[...terms].filter(term=>section.terms.has(term));
      const strong=overlap.filter(term=>distinctive.has(term));
      if (!strong.length && (overlap.length < 2 || overlap.length / terms.size < 0.4)) continue;
      const score=overlap.length+strong.length*2;
      if(score>bestScore){best=section;bestScore=score;ambiguous=false;}
      else if(score===bestScore && section.excerpt!==best.excerpt){ambiguous=true;}
    }
    if (ambiguous || !best) return null;
    return {anchor:best.anchor,line:best.line,excerpt:best.excerpt};
  }
  const api=Object.freeze({splitPolicy,match});
  if (typeof module==='object' && module.exports) module.exports=api;
  else window.DealShieldEvidence=api;
})();
