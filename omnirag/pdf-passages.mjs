// Text extraction only. PDF.js 5.4.624 is bundled under the accompanying Apache license.
import { getDocument, GlobalWorkerOptions } from './vendor/pdfjs/pdf.min.mjs';
GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.mjs', import.meta.url).href;

// PDF content streams can draw a table one column at a time. Associate text
// on the same baseline, then read each row from left to right.
function pageLines(items) {
  const bands = [];
  const sorted = items.filter(i => i.str?.trim()).sort((a, b) => b.transform[5] - a.transform[5]);
  for (const item of sorted) {
    const y = item.transform[5];
    let band = bands.at(-1);
    if (!band || Math.abs(y - band.y) > Math.min(2, Math.abs(item.height) * 0.25)) {
      band = { y, items: [] };
      bands.push(band);
    }
    band.items.push(item);
  }
  return bands.map(band => {
    const parts = band.items.sort((a, b) => a.transform[4] - b.transform[4]);
    if (parts.every(item => item.dir === 'rtl')) parts.reverse();
    return parts.map(item => item.str.trim()).join(' ');
  });
}

export async function parse(fileName, data, id) {
  const byteLength = data.byteLength;
  const base = { id, name:fileName, byteLength, format:'PDF', uploaded:true, chunks:[] };
  const task = getDocument({
    data:new Uint8Array(data), isEvalSupported:false, useSystemFonts:true,
    cMapUrl:new URL('./vendor/pdfjs/cmaps/', import.meta.url).href, cMapPacked:true
  });
  try {
    const pdf = await task.promise;
    const chunks = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      pageLines(content.items).forEach((text, j) => chunks.push({
        id:id + '_p' + i + '_l' + (j + 1), coord:'Page ' + i + ', Line ' + (j + 1), title:text.slice(0, 68), text
      }));
      page.cleanup();
    }
    return {...base, pageCount:pdf.numPages, chunks, statusNote:chunks.length ?
      pdf.numPages + ' pp · ' + chunks.length + ' text passages' : 'No text layer found. Upload a searchable PDF or run OCR first.'};
  } catch (error) {
    return {...base, parseError:true, statusNote:error.name === 'PasswordException' ?
      'Password-protected PDF. Upload an unlocked copy.' : 'Could not read this PDF. Re-export the file and retry.'};
  } finally {
    await task.destroy();
  }
}
