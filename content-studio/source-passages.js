// Offsets use JavaScript UTF-16 code units in the submitted source text.
(function () {
  function collect(text) {
    const passages = [];
    function add(anchor, start, end) {
      while (start < end && /\s/u.test(text[start])) start++;
      while (end > start && /\s/u.test(text[end - 1])) end--;
      if (start === end) return;
      passages.push({anchor:anchor || 'Passage ' + (passages.length + 1), statement:text.slice(start,end), startOffset:start, endOffset:end});
    }
    function prose(start, end) {
      // Blank lines and sentence endings give plain text useful citation boundaries.
      const block = text.slice(start,end);
      const markup = /^(?:#{1,6}\s|#{3,}$|\.\.\s|[`~]{3}|[*=_-]{3,}$)|\]\(/m.test(block);
      const separators = markup ? /(?:\r?\n[ \t]*){2,}/gu : /(?:\r?\n[ \t]*){2,}|(?<=[.!?])\s+/gu;
      let offset = start;
      for (const gap of block.matchAll(separators)) {
        const boundary = start + gap.index;
        add(null,offset,boundary);
        offset = boundary + gap[0].length;
      }
      add(null,offset,end);
    }
    // Explicit source labels use "[label] passage". Ordinary Markdown links,
    // reference definitions, and bracketed expressions inside prose stay intact.
    const tags = /\[([^\]\r\n]{1,120})\](?=[ \t]+\S)/gu;
    const anchors = [];
    for (const tag of text.matchAll(tags)) {
      const prefix=text.slice(text.lastIndexOf('\n',tag.index-1)+1,tag.index);
      const atLineStart=!prefix.trim();
      const named=/^(?:clause|section|table|article|schedule|appendix|cell|page|row|paragraph)\s+[\p{L}\p{N}]/iu.test(tag[1]);
      if ((atLineStart && (named || /^[\p{L}\p{N}_-]+$/u.test(tag[1]))) || (named && /[.!?]\s*$/u.test(prefix))) anchors.push(tag);
    }
    if (!anchors.length) prose(0,text.length);
    else {
      prose(0,anchors[0].index);
      anchors.forEach((tag,i)=>add(tag[1].trim(),tag.index+tag[0].length,anchors[i+1]?.index ?? text.length));
    }
    return passages;
  }
  window.ContentForgePassages = {collect};
})();
