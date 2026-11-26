/* Three verbatim retrieval exercises built entirely from an instructor's passage. */
window.AcademyAuthoring = (() => {
  const commonEnglish = new Set(('the this those these there that their which where when while with from into over under other another have has been being does make made its own about more most very actually usually generally always sometimes').split(' '));
  function exercises(raw, version = 2) {
    const passage = raw.trim();
    const words = [...passage.matchAll(/[\p{L}\p{N}][\p{L}\p{M}\p{N}'’%-]*/gu)];
    const seen = new Set();
    const terms = words.filter(word => {
      const term = word[0].toLocaleLowerCase();
      if (seen.has(term)) return false;
      seen.add(term);
      return true;
    }).sort((a,b) => b[0].length - a[0].length);
    if (version === 2) {
      // Prefer distinctive source terms while keeping short and non-English passages usable.
      const relevance = word => commonEnglish.has(word[0].toLowerCase()) ? 1 : 0;
      terms.sort((a,b) => relevance(a) - relevance(b));
    }
    if (terms.length < 3) throw Error('Enter a source passage containing at least three distinct words.');
    return terms.slice(0, 3).map((match, i) => {
      const start = match.index, end = start + match[0].length;
      const before = passage.slice(0,start).split(/[.!?。！？]\s+|\n/).pop();
      const after = passage.slice(end).split(/(?<=[.!?。！？])\s+|\n/)[0];
      const question = 'Restore the missing word from the passage: “' + before.slice(-180) + '_____' + after.slice(0,180) + '”';
      const ordered = [match, ...terms.filter(w=>w !== match).slice(0,2)];
      const shift = (start + i) % ordered.length;
      const choices = ordered.slice(shift).concat(ordered.slice(0,shift));
      const options=choices.map((w,j)=>({letter:'ABC'[j],title:w[0],detail:'',correct:w===match,rationale:'The source reads “'+before.slice(-90)+match[0]+after.slice(0,90)+'”.'}));
      return {label:'Exercise '+(i+1),sub:'Passage recall',en:{title:'Passage recall '+(i+1),summary:passage,stemHtml:'',questionPlain:question,options,hint1:'Read the source and compare the words surrounding the gap.',hint2:'Check the original wording.'},ko:null};
    });
  }
  return {exercises};
})();
