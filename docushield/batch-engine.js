/**
 * DocuShield™ — Deterministic Client-Side PDF/HTML Structural Inspector & Batch Engine (PLAN-34)
 * Pure Vanilla ES6+ (Zero external dependencies; runs identically in Browser & Node.js tests)
 *
 * Scope & Honesty Policy:
 * - Inspects raw PDF COS tokens and HTML structural markers client-side.
 * - Explicitly flags compressed object/content streams (/ObjStm, /FlateDecode) that raw byte scanning cannot decompress.
 * - Explicitly separates automated structural checks from mandatory human/manual verification
 *   per PDF Association Matterhorn Protocol 1.1 (87 machine / 47 human / 2 N/A) and W3C WCAG-EM.
 * - Never claims ISO 14289-1 (PDF/UA-1), WCAG 2.2 AA, Section 508, ADA Title II, or EU EAA conformance from automated checks alone.
 */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof window !== 'undefined') {
    window.DocuShieldBatchEngine = api;
  }
  if (typeof root !== 'undefined') {
    root.DocuShieldBatchEngine = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CONFORMANCE_DISCLAIMER =
    'Automated structural byte checks inspect only a subset of technical PDF/HTML signals. ' +
    'Passing these automated checks does NOT establish or guarantee conformance with ISO 14289-1 (PDF/UA-1), ' +
    'WCAG 2.1/2.2 Level AA, U.S. Section 508, ADA Title II, EN 301 549, or the EU European Accessibility Act (Directive 2019/882). ' +
    'Manual human verification (and a full decompressed validator such as veraPDF or PAC for compressed PDFs) is required before publication.';

  const AUTOMATED_SCOPE_ITEMS = [
    {
      id: 'pdf-header',
      label: 'File format & page markers',
      detail: 'Verifies %PDF-x.y header (or HTML markup), estimates page count from uncompressed /Type /Page dictionaries, and detects /Encrypt or compressed streams (/ObjStm, /FlateDecode).'
    },
    {
      id: 'struct-tree-root',
      label: 'Structure tree declaration (/StructTreeRoot)',
      reference: 'Matterhorn 01-006 / ISO 14289-1 Cl. 7.1',
      detail: 'Checks whether the PDF Catalog declares /StructTreeRoot (or semantic landmark elements in HTML).'
    },
    {
      id: 'marked-flag',
      label: 'Marked content flag (/MarkInfo /Marked true)',
      reference: 'Matterhorn 01-006 / ISO 14289-1 Cl. 7.1',
      detail: 'Checks whether /MarkInfo declares /Marked true (or heading/table tags in HTML).'
    },
    {
      id: 'doc-language',
      label: 'Primary document language (/Lang)',
      reference: 'Matterhorn 11-001 / WCAG 2.2 SC 3.1.1',
      detail: 'Checks for a BCP-47 language tag such as /Lang (en-US) in the PDF Catalog (or <html lang="...">).'
    },
    {
      id: 'display-doc-title',
      label: 'Viewer title setting (/DisplayDocTitle true)',
      reference: 'Matterhorn 06-001 / WCAG 2.2 SC 2.4.2',
      detail: 'Checks whether /ViewerPreferences sets /DisplayDocTitle true (or nonempty <title> in HTML).'
    },
    {
      id: 'pdfua-xmp',
      label: 'PDF/UA XMP identifier (pdfuaid:part)',
      reference: 'Matterhorn 06-001 / ISO 14289-1 Cl. 5',
      detail: 'Checks whether an uncompressed XMP metadata packet declares pdfuaid:part (PDF only).'
    },
    {
      id: 'tab-order',
      label: 'Structure tab order (/Tabs /S)',
      reference: 'Matterhorn 09-003 / WCAG 2.2 SC 2.4.3',
      detail: 'Checks whether Page dictionaries specify /Tabs /S so focus follows structure order (PDF only).'
    },
    {
      id: 'conditional-objects',
      label: 'Object presence signals (headings, images/Alt, tables/TH, forms/TU)',
      reference: 'Matterhorn 13-004, 14-003, 15-002, 28-001',
      detail: 'Counts visible /H1-/H6, /Image, /Figure, /Alt, /Table, /TH, /Scope, /Widget, and /TU markers in uncompressed dictionaries to prioritize manual review.'
    }
  ];

  const MANUAL_REVIEW_CHECKLIST = [
    {
      id: 'manual-reading-order',
      title: 'Logical reading order across columns, callouts, and sidebars',
      reference: 'Matterhorn 09-001 (Human) / WCAG SC 1.3.2',
      reason: 'Software cannot verify whether multi-column syllabi, footnotes, or margin sidebars read in the order a student needs.'
    },
    {
      id: 'manual-alt-quality',
      title: 'Accuracy and educational equivalence of image, diagram, and formula /Alt text',
      reference: 'Matterhorn 13-004 (Human) / WCAG SC 1.1.1',
      reason: 'An automated check can see that /Alt is present, but only a human can confirm it accurately describes a chart, circuit, or chemical diagram (and is not a raw filename).'
    },
    {
      id: 'manual-heading-semantics',
      title: 'Meaningful heading hierarchy and absence of visual-only headings',
      reference: 'Matterhorn 14-002 / 14-003 (Human) / WCAG SC 1.3.1 & 2.4.6',
      reason: 'Large bold text styled as paragraphs and skipped or mislabeled heading levels require visual-vs-tag inspection.'
    },
    {
      id: 'manual-table-semantics',
      title: 'Table header bindings (<TH Scope>, /Headers) and layout vs. data tables',
      reference: 'Matterhorn 15-001..15-005 (Human) / WCAG SC 1.3.1',
      reason: 'Complex rubrics, merged cells, and grading schedules must be verified so screen readers announce the right row and column headers.'
    },
    {
      id: 'manual-artifacts-ocr',
      title: 'Decorative artifacts (/Artifact) and scanned-page OCR text accuracy',
      reference: 'Matterhorn 01-001..01-005 (Human) / WCAG SC 1.4.5',
      reason: 'Running headers, page numbers, watermarks, and scanned textbook pages require visual confirmation that real text is selectable and noise is marked as /Artifact.'
    },
    {
      id: 'manual-contrast-color',
      title: 'Color contrast (>= 4.5:1 normal text, >= 3:1 large text) and non-color cues',
      reference: 'WCAG SC 1.4.1 & 1.4.3',
      reason: 'Rendered foreground/background contrast over shaded callouts, diagrams, and links is not measured by raw COS token scanning.'
    },
    {
      id: 'manual-math-links-forms',
      title: 'Mathematical formulas (<Formula>/MathML), descriptive link text, and keyboard/screen-reader walkthrough',
      reference: 'Matterhorn 28-001..28-018 / WCAG SC 2.1.1, 2.4.4, 3.3.2',
      reason: 'Equations, interactive quiz/worksheet fields, and real NVDA/VoiceOver/JAWS traversal must be tested directly by a reviewer.'
    }
  ];

  function escapeHtml(str) {
    return String(str === null || str === undefined ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function decodeRawBytes(uint8ArrayOrText) {
    if (typeof uint8ArrayOrText === 'string') {
      return { rawText: uint8ArrayOrText, byteLength: uint8ArrayOrText.length };
    }
    let arr = null;
    if (uint8ArrayOrText instanceof Uint8Array) {
      arr = uint8ArrayOrText;
    } else if (uint8ArrayOrText instanceof ArrayBuffer) {
      arr = new Uint8Array(uint8ArrayOrText);
    } else if (ArrayBuffer.isView(uint8ArrayOrText)) {
      arr = new Uint8Array(uint8ArrayOrText.buffer, uint8ArrayOrText.byteOffset, uint8ArrayOrText.byteLength);
    }
    if (!arr) {
      return { rawText: '', byteLength: 0 };
    }
    // Decode latin1 1:1 byte-to-char mapping without blowing call stack on large PDFs
    if (typeof TextDecoder !== 'undefined') {
      try {
        return { rawText: new TextDecoder('latin1').decode(arr), byteLength: arr.byteLength };
      } catch (_) {}
    }
    const chunks = [];
    const step = 16384;
    for (let i = 0; i < arr.length; i += step) {
      chunks.push(String.fromCharCode.apply(null, Array.from(arr.subarray(i, i + step))));
    }
    return { rawText: chunks.join(''), byteLength: arr.byteLength };
  }

  /**
   * Inspects a single local PDF or HTML file buffer deterministically.
   * Returns honest automated signals, compressed-stream caveats, and tailored manual review items.
   */
  function inspectDocumentBuffer(fileName, uint8ArrayOrText) {
    const cleanName = String(fileName || 'uploaded-document.pdf').trim() || 'uploaded-document.pdf';
    const { rawText, byteLength } = decodeRawBytes(uint8ArrayOrText);

    const trimmed = rawText.trim();
    const isHtml = /\.html?$/i.test(cleanName) || /<!DOCTYPE\s+html|<html\b/i.test(rawText.slice(0, 600));
    const pdfVerMatch = rawText.match(/%PDF-(\d\.\d)/);

    if (!trimmed || (!pdfVerMatch && !(isHtml && /<[a-z][^>]*>/i.test(rawText)))) {
      return {
        fileName: cleanName,
        valid: false,
        fileType: 'INVALID',
        pdfVersion: 'Unrecognized',
        pages: 0,
        byteLength,
        fileSizeKB: byteLength > 0 ? Math.max(1, Math.round(byteLength / 1024)) : 0,
        encrypted: false,
        compressedStreamsDetected: false,
        objectStreamsDetected: false,
        checks: [],
        passedCount: 0,
        failedCount: 0,
        totalChecks: 0,
        passRatePercent: 0,
        missingSignals: ['Valid %PDF-x.y header or HTML markup'],
        objectCounts: { images: 0, figures: 0, altTokens: 0, tables: 0, thTokens: 0, scopeTokens: 0, headings: 0, forms: 0, tuTokens: 0 },
        manualReviewRequired: true,
        manualReviewReasons: ['File could not be parsed as PDF or HTML. Confirm the file is not corrupted, zero-byte, or another format.'],
        statusCode: 'INVALID',
        statusLabel: 'Unreadable / invalid file',
        errorMessage: 'Missing %PDF-x.y header or readable HTML markup.',
        summaryLine: 'Could not read as PDF or HTML (' + byteLength + ' bytes).'
      };
    }

    const detectedVersion = isHtml ? 'HTML5 / XHTML' : '%PDF-' + pdfVerMatch[1];
    const encrypted = !isHtml && /\/Encrypt\b/.test(rawText);
    const objectStreamsDetected = !isHtml && /\/Type\s*\/ObjStm\b|\/ObjStm\b/.test(rawText);
    const flateDetected = !isHtml && /\/FlateDecode\b/.test(rawText);
    const compressedStreamsDetected = objectStreamsDetected || flateDetected;

    // Count pages from uncompressed /Type /Page dictionaries (excluding /Type /Pages)
    const pageMatches = isHtml ? [] : (rawText.match(/\/Type\s*\/Page\b(?!s)/g) || []);
    const countMatch = !isHtml ? rawText.match(/\/Type\s*\/Pages[\s\S]{0,120}?\/Count\s+(\d+)/) : null;
    const detectedPages = isHtml
      ? 1
      : Math.max(pageMatches.length, countMatch ? parseInt(countMatch[1], 10) || 0 : 0, 1);

    // Core structural signals
    const hasStructTreeRoot = isHtml
      ? /<(main|article|section|nav)\b/i.test(rawText)
      : /\/StructTreeRoot\b/.test(rawText);
    const hasMarkedTrue = isHtml
      ? /<(h[1-6]|table|ul|ol)\b/i.test(rawText)
      : /\/MarkInfo\s*<<[\s\S]{0,120}?\/Marked\s+true\b/i.test(rawText);
    const langMatch = isHtml
      ? rawText.match(/<html[^>]+lang=["']([a-zA-Z-]+)["']/i)
      : rawText.match(/\/Lang\s*\(([a-zA-Z]{2,3}(?:-[a-zA-Z0-9]{2,8})*)\)/);
    const hasLang = !!langMatch;
    const detectedLang = langMatch ? langMatch[1] : null;
    const hasDisplayDocTitle = isHtml
      ? /<title>[^<]+<\/title>/i.test(rawText)
      : /\/DisplayDocTitle\s+true\b/i.test(rawText);
    const hasPdfUaId = !isHtml && /pdfuaid:part\s*[=>"\s]*1\b/i.test(rawText);
    const hasTabsStructure = !isHtml && /\/Tabs\s*\/S\b/.test(rawText);

    // Informational object counts (visible in uncompressed streams/dictionaries)
    const imageCount = (rawText.match(/\/Subtype\s*\/Image\b|<img\b/gi) || []).length;
    const figureCount = (rawText.match(/\/S\s*\/Figure\b|<figure\b/gi) || []).length;
    const altTokenCount = isHtml
      ? (rawText.match(/\balt\s*=\s*["'][^"']+["']/gi) || []).length
      : (rawText.match(/\/Alt\s*\([^)]+\)/g) || []).length;
    const tableCount = (rawText.match(/\/S\s*\/Table\b|<table\b/gi) || []).length;
    const thTokenCount = (rawText.match(/\/S\s*\/TH\b|<th\b/gi) || []).length;
    const scopeTokenCount = (rawText.match(/\/Scope\s*\/(Column|Row|Both)\b|\bscope\s*=\s*["'](col|row)/gi) || []).length;
    const headingCount = (rawText.match(/\/S\s*\/H[1-6]\b|<h[1-6]\b/gi) || []).length;
    const formCount = (rawText.match(/\/Subtype\s*\/Widget\b|\/AcroForm\b|<input\b|<select\b|<textarea\b/gi) || []).length;
    const tuTokenCount = isHtml
      ? (rawText.match(/<label\b|aria-label=/gi) || []).length
      : (rawText.match(/\/TU\s*\([^)]+\)/g) || []).length;

    const checks = [
      {
        id: '01-006-struct',
        clause: isHtml ? 'HTML Landmarks / WCAG 1.3.1' : 'Matterhorn 01-006 / ISO 14289-1 Cl. 7.1',
        wcag: 'WCAG 2.2 SC 1.3.1',
        category: 'Structure & Tagging',
        title: isHtml ? 'Semantic landmarks (<main>, <section>, <article>)' : 'Structure tree root (/StructTreeRoot)',
        marker: isHtml ? '<main>/<article>/<section>/<nav>' : '/StructTreeRoot',
        status: hasStructTreeRoot ? 'PASS' : 'FAIL',
        evidence: hasStructTreeRoot
          ? (isHtml ? 'Semantic landmark element found in HTML markup.' : '/StructTreeRoot dictionary reference found in raw PDF stream.')
          : (isHtml ? 'No semantic landmark element found.' : '/StructTreeRoot not found in uncompressed PDF bytes.' + (objectStreamsDetected ? ' (Note: /ObjStm compressed objects detected.)' : ''))
      },
      {
        id: '01-006-marked',
        clause: isHtml ? 'HTML Structure / WCAG 1.3.1' : 'Matterhorn 01-006 / ISO 14289-1 Cl. 7.1',
        wcag: 'WCAG 2.2 SC 1.3.1',
        category: 'Structure & Tagging',
        title: isHtml ? 'Structural headings, lists, or tables' : 'Marked content flag (/MarkInfo /Marked true)',
        marker: isHtml ? '<h1>-<h6> / <table> / <ul>' : '/MarkInfo << /Marked true >>',
        status: hasMarkedTrue ? 'PASS' : 'FAIL',
        evidence: hasMarkedTrue
          ? (isHtml ? 'Heading, list, or table tags detected.' : '/MarkInfo dictionary declares /Marked true.')
          : (isHtml ? 'No heading, list, or table tags detected.' : '/MarkInfo << /Marked true >> not found in uncompressed bytes.')
      },
      {
        id: '11-001-lang',
        clause: isHtml ? 'HTML lang / WCAG 3.1.1' : 'Matterhorn 11-001 / ISO 14289-1 Cl. 7.2',
        wcag: 'WCAG 2.2 SC 3.1.1',
        category: 'Metadata & Language',
        title: 'Primary document language (/Lang)',
        marker: isHtml ? '<html lang="..."> ' : '/Lang (BCP-47)',
        status: hasLang ? 'PASS' : 'FAIL',
        evidence: hasLang
          ? 'Language tag detected: ' + detectedLang + '.'
          : 'No primary BCP-47 language declaration found.'
      },
      {
        id: '06-001-title',
        clause: isHtml ? 'HTML <title> / WCAG 2.4.2' : 'Matterhorn 06-001 / ISO 14289-1 Cl. 7.1',
        wcag: 'WCAG 2.2 SC 2.4.2',
        category: 'Metadata & Language',
        title: isHtml ? 'Nonempty document <title>' : 'Viewer displays document title (/DisplayDocTitle true)',
        marker: isHtml ? '<title>...</title>' : '/DisplayDocTitle true',
        status: hasDisplayDocTitle ? 'PASS' : 'FAIL',
        evidence: hasDisplayDocTitle
          ? (isHtml ? 'Nonempty <title> element found.' : '/DisplayDocTitle true found in /ViewerPreferences.')
          : (isHtml ? 'Missing or empty <title> element.' : '/DisplayDocTitle true not found in uncompressed bytes.')
      }
    ];

    if (!isHtml) {
      checks.push(
        {
          id: '06-001-pdfua',
          clause: 'Matterhorn 06-001 / ISO 14289-1 Cl. 5',
          wcag: 'EN 301 549 Cl. 10.2',
          category: 'Metadata & Language',
          title: 'PDF/UA-1 XMP metadata identifier (pdfuaid:part=1)',
          marker: 'pdfuaid:part=1',
          status: hasPdfUaId ? 'PASS' : 'FAIL',
          evidence: hasPdfUaId
            ? 'XMP pdfuaid:part=1 declaration found.'
            : 'No pdfuaid:part=1 XMP metadata marker found in uncompressed bytes.'
        },
        {
          id: '09-003-tabs',
          clause: 'Matterhorn 09-003 / ISO 14289-1 Cl. 7.18.3',
          wcag: 'WCAG 2.2 SC 2.4.3',
          category: 'Structure & Tagging',
          title: 'Page tab order set to structure (/Tabs /S)',
          marker: '/Tabs /S',
          status: hasTabsStructure ? 'PASS' : 'FAIL',
          evidence: hasTabsStructure
            ? '/Tabs /S detected on page dictionary.'
            : '/Tabs /S not found on uncompressed page dictionaries.'
        }
      );
    }

    // Conditional checks when specific educational objects are visibly present
    if (imageCount > 0 || figureCount > 0) {
      checks.push({
        id: '13-004-alt',
        clause: isHtml ? 'HTML alt / WCAG 1.1.1' : 'Matterhorn 13-004 / ISO 14289-1 Cl. 7.3',
        wcag: 'WCAG 2.2 SC 1.1.1',
        category: 'Tables & Figures',
        title: 'Image / figure alternative text token (/Alt)',
        marker: isHtml ? 'alt="..."' : '/Alt (...)',
        status: altTokenCount > 0 ? 'PASS' : 'FAIL',
        evidence: altTokenCount > 0
          ? 'Found ' + altTokenCount + ' non-empty /Alt text token(s) alongside ' + Math.max(imageCount, figureCount) + ' image/figure object(s). Meaning still requires human review.'
          : 'Detected ' + Math.max(imageCount, figureCount) + ' image/figure object(s) with 0 visible /Alt text tokens.'
      });
    }

    if (tableCount > 0) {
      checks.push({
        id: '15-002-table',
        clause: isHtml ? 'HTML <th> / WCAG 1.3.1' : 'Matterhorn 15-002 / ISO 14289-1 Cl. 7.5',
        wcag: 'WCAG 2.2 SC 1.3.1',
        category: 'Tables & Figures',
        title: 'Table header cells (<TH> and /Scope)',
        marker: isHtml ? '<th scope="col|row">' : '/TH + /Scope',
        status: thTokenCount > 0 && scopeTokenCount > 0 ? 'PASS' : 'FAIL',
        evidence: thTokenCount > 0 && scopeTokenCount > 0
          ? 'Found ' + thTokenCount + ' header cell token(s) and ' + scopeTokenCount + ' /Scope token(s) across ' + tableCount + ' table(s). Header-to-cell accuracy requires manual check.'
          : 'Detected ' + tableCount + ' table object(s) but missing <TH> (' + thTokenCount + ') or /Scope (' + scopeTokenCount + ') markers.'
      });
    }

    if (formCount > 0) {
      checks.push({
        id: '28-001-form',
        clause: isHtml ? 'HTML Form Labels / WCAG 3.3.2' : 'Matterhorn 28-001 / ISO 14289-1 Cl. 7.18.1',
        wcag: 'WCAG 2.2 SC 3.3.2 & 4.1.2',
        category: 'Metadata & Forms',
        title: 'Interactive form field accessible tooltips (/TU)',
        marker: isHtml ? '<label> / aria-label' : '/TU (...)',
        status: tuTokenCount > 0 ? 'PASS' : 'FAIL',
        evidence: tuTokenCount > 0
          ? 'Found ' + tuTokenCount + ' tooltip/label token(s) for ' + formCount + ' form/widget marker(s). Label clarity requires manual review.'
          : 'Detected ' + formCount + ' form/widget object(s) with 0 visible /TU tooltip strings.'
      });
    }

    const passedCount = checks.filter(c => c.status === 'PASS').length;
    const totalChecks = checks.length;
    const failedCount = totalChecks - passedCount;
    const passRatePercent = totalChecks > 0 ? Math.round((passedCount / totalChecks) * 100) : 0;
    const missingSignals = checks.filter(c => c.status !== 'PASS').map(c => c.marker);

    // Tailored manual review list for this specific document
    const manualReviewReasons = [
      'Verify logical reading order (multi-column text, sidebars, footnotes) in a screen reader.',
      'Confirm heading nesting (<H1>-<H6>) matches visual document outline.',
      'Check rendered text/background contrast (>= 4.5:1) and non-color meaning.'
    ];
    if (imageCount > 0 || figureCount > 0) {
      manualReviewReasons.push('Review /Alt text accuracy for ' + Math.max(imageCount, figureCount) + ' image/figure object(s) (and mark decorative graphics as /Artifact).');
    } else {
      manualReviewReasons.push('Confirm whether vector graphics, scanned pages, or equations require <Figure>/<Formula> tags and /Alt text.');
    }
    if (tableCount > 0) {
      manualReviewReasons.push('Audit ' + tableCount + ' table(s) for accurate <TH Scope> / /Headers cell associations.');
    }
    if (formCount > 0) {
      manualReviewReasons.push('Test keyboard focus order and screen-reader announcements for ' + formCount + ' form/widget marker(s).');
    }
    if (encrypted) {
      manualReviewReasons.unshift('Encrypted PDF (/Encrypt detected): decrypt or inspect in a full validator before trusting raw token counts.');
    } else if (compressedStreamsDetected) {
      manualReviewReasons.unshift('Compressed PDF streams (/FlateDecode or /ObjStm) detected: re-check tags inside compressed streams with veraPDF/PAC plus manual review.');
    }

    let statusCode = 'NEEDS_REMEDIATION';
    let statusLabel = 'Automated findings (' + failedCount + ' missing)';
    if (encrypted) {
      statusCode = 'ENCRYPTED_LIMITED';
      statusLabel = 'Encrypted PDF — limited scan';
    } else if (failedCount === 0 && compressedStreamsDetected) {
      statusCode = 'SIGNALS_WITH_CAVEAT';
      statusLabel = 'Signals found · compressed streams & manual review';
    } else if (failedCount === 0) {
      statusCode = 'SIGNALS_PRESENT_MANUAL_REQUIRED';
      statusLabel = 'Automated signals present · manual review required';
    } else if (compressedStreamsDetected) {
      statusCode = 'FINDINGS_WITH_CAVEAT';
      statusLabel = failedCount + ' missing in raw bytes · compressed streams';
    }

    const summaryLine =
      passedCount + ' of ' + totalChecks + ' automated signals found (' + detectedVersion + ', ' +
      detectedPages + ' pp). ' +
      (failedCount > 0 ? 'Missing: ' + missingSignals.join(', ') + '. ' : 'All checked raw signals present. ') +
      (compressedStreamsDetected ? 'Compressed streams detected — verify with full parser. ' : '') +
      'Manual review required before claiming conformance.';

    return {
      fileName: cleanName,
      valid: true,
      fileType: isHtml ? 'HTML' : 'PDF',
      pdfVersion: detectedVersion,
      pages: detectedPages,
      byteLength,
      fileSizeKB: Math.max(1, Math.round(byteLength / 1024)),
      encrypted,
      compressedStreamsDetected,
      objectStreamsDetected,
      detectedLang,
      checks,
      passedCount,
      failedCount,
      totalChecks,
      passRatePercent,
      missingSignals,
      objectCounts: {
        images: imageCount,
        figures: figureCount,
        altTokens: altTokenCount,
        tables: tableCount,
        thTokens: thTokenCount,
        scopeTokens: scopeTokenCount,
        headings: headingCount,
        forms: formCount,
        tuTokens: tuTokenCount
      },
      manualReviewRequired: true,
      manualReviewReasons,
      statusCode,
      statusLabel,
      errorMessage: null,
      summaryLine
    };
  }

  /**
   * Aggregates an array of per-file inspection results into a batch summary object.
   */
  function summarizeBatchResults(fileResults, meta) {
    const items = Array.isArray(fileResults) ? fileResults : [];
    const validFiles = items.filter(r => r.valid);
    const invalidFiles = items.filter(r => !r.valid);
    const filesWithFindings = validFiles.filter(r => r.failedCount > 0);
    const filesWithAllRawSignals = validFiles.filter(r => r.failedCount === 0 && !r.encrypted);
    const filesWithCompressedStreams = validFiles.filter(r => r.compressedStreamsDetected);
    const totalPages = validFiles.reduce((acc, r) => acc + (r.pages || 0), 0);
    const totalAutomatedChecks = validFiles.reduce((acc, r) => acc + (r.totalChecks || 0), 0);
    const totalAutomatedPassed = validFiles.reduce((acc, r) => acc + (r.passedCount || 0), 0);
    const totalAutomatedFailed = validFiles.reduce((acc, r) => acc + (r.failedCount || 0), 0);

    return {
      generator: 'Caliber Foundry — DocuShield™ Batch Educational PDF Inspector',
      generatedAt: new Date().toISOString(),
      batchLabel: (meta && meta.batchLabel) || 'Custom Educational PDF Batch',
      sourceKind: (meta && meta.sourceKind) || 'local-upload',
      durationMs: (meta && typeof meta.durationMs === 'number') ? meta.durationMs : 0,
      conformanceDisclaimer: CONFORMANCE_DISCLAIMER,
      totals: {
        filesSubmitted: items.length,
        validFiles: validFiles.length,
        invalidFiles: invalidFiles.length,
        filesWithAutomatedFindings: filesWithFindings.length,
        filesWithAllRawSignalsPresent: filesWithAllRawSignals.length,
        filesWithCompressedStreams: filesWithCompressedStreams.length,
        filesRequiringManualReview: validFiles.length,
        totalPages,
        totalAutomatedChecks,
        totalAutomatedPassed,
        totalAutomatedFailed
      },
      automatedChecksScope: AUTOMATED_SCOPE_ITEMS,
      manualReviewChecklist: MANUAL_REVIEW_CHECKLIST,
      files: items
    };
  }

  /**
   * Escapes a single RFC-4180 CSV field and neutralizes spreadsheet formula injection (=, +, -, @, tab, CR).
   */
  function csvCell(value) {
    let str = String(value === null || value === undefined ? '' : value);
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }
    if (/[",\r\n]/.test(str)) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  function buildBatchCsv(batchSummary) {
    const header = [
      'file_name',
      'status',
      'file_type',
      'version',
      'pages',
      'bytes_scanned',
      'automated_signals_passed',
      'automated_signals_total',
      'automated_findings_count',
      'missing_automated_signals',
      'compressed_streams_detected',
      'manual_review_required',
      'manual_review_focus',
      'conformance_note'
    ];
    const rows = [header.map(csvCell).join(',')];
    const files = (batchSummary && Array.isArray(batchSummary.files)) ? batchSummary.files : [];

    files.forEach(item => {
      rows.push([
        item.fileName,
        item.statusLabel,
        item.fileType,
        item.pdfVersion,
        item.pages,
        item.byteLength,
        item.passedCount,
        item.totalChecks,
        item.failedCount,
        (item.missingSignals || []).join('; '),
        item.compressedStreamsDetected ? 'YES' : 'NO',
        'YES (Required)',
        (item.manualReviewReasons || []).join(' | '),
        'Automated pre-check only; does NOT certify PDF/UA, WCAG, Section 508, ADA Title II, or EU EAA conformance.'
      ].map(csvCell).join(','));
    });

    return rows.join('\r\n') + '\r\n';
  }

  function buildBatchJson(batchSummary) {
    return JSON.stringify(batchSummary, null, 2);
  }

  /**
   * 3 Ready-to-Run Educational Course PDF Batch Presets (ADR-023: Option 1 / Option 2 / Option 3).
   * Each preset supplies real raw %PDF-1.7 byte strings that are parsed live by inspectDocumentBuffer().
   */
  function getEducationalBatchPresets() {
    return [
      {
        id: 'STEM-COURSE-PACK',
        optionLabel: 'Option 1',
        title: 'STEM Course Pack (3 PDFs)',
        subtitle: 'Untagged syllabus, partially tagged lab manual, and tagged textbook chapter',
        files: [
          {
            name: 'BIO-101_Fall2026_Syllabus_Untagged.pdf',
            content: [
              '%PDF-1.7',
              '1 0 obj << /Type /Catalog /Pages 2 0 R /ViewerPreferences << /DisplayDocTitle false >> >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R 4 0 R 5 0 R] /Count 3 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Tabs /R >> endobj',
              '4 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Subtype /Image >> endobj',
              '5 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >> endobj',
              '%%EOF'
            ].join('\n')
          },
          {
            name: 'CHEM-204_Titration_Lab_Manual_Partial.pdf',
            content: [
              '%PDF-1.7',
              '1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-US) /MarkInfo << /Marked true >> /StructTreeRoot 10 0 R /ViewerPreferences << /DisplayDocTitle false >> >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Tabs /R >> endobj',
              '4 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Tabs /R >> endobj',
              '10 0 obj << /Type /StructTreeRoot /K [ << /S /H1 >> << /S /Table >> << /S /Figure >> ] >> endobj',
              '11 0 obj << /Type /XObject /Subtype /Image /Width 640 /Height 480 >> endobj',
              '%%EOF'
            ].join('\n')
          },
          {
            name: 'PHYS-301_Maxwell_Chapter04_Tagged.pdf',
            content: [
              '%PDF-1.7',
              '1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-US) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /Metadata 8 0 R /StructTreeRoot 10 0 R >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R 4 0 R 5 0 R 6 0 R] /Count 4 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Tabs /S >> endobj',
              '4 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Tabs /S >> endobj',
              '5 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Tabs /S >> endobj',
              '6 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Tabs /S >> endobj',
              '8 0 obj << /Type /Metadata /Subtype /XML >> stream <x:xmpmeta><pdfuaid:part>1</pdfuaid:part></x:xmpmeta> endstream endobj',
              '10 0 obj << /Type /StructTreeRoot /K [ << /S /H1 >> << /S /Table >> << /S /TH /A << /O /Table /Scope /Column >> >> << /S /Figure /Alt (Faraday induction loop diagram showing magnetic flux direction) >> ] >> endobj',
              '%%EOF'
            ].join('\n')
          }
        ]
      },
      {
        id: 'UNI-LMS-PACK',
        optionLabel: 'Option 2',
        title: 'LMS Handouts & Forms (3 PDFs)',
        subtitle: 'Interactive worksheet with missing /TU, bilingual reading, and compressed export',
        files: [
          {
            name: 'HIST-210_Primary_Source_Reader_Compressed.pdf',
            content: [
              '%PDF-1.7',
              '1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-GB) /StructTreeRoot 9 0 R /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R /Tabs /S /Contents 7 0 R >> endobj',
              '4 0 obj << /Type /Page /Parent 2 0 R /Tabs /S >> endobj',
              '7 0 obj << /Filter /FlateDecode /Length 42 >> stream compressed-bytes endstream endobj',
              '9 0 obj << /Type /StructTreeRoot /K [ << /S /H1 >> << /S /P >> ] >> endobj',
              '%%EOF'
            ].join('\n')
          },
          {
            name: 'NURS-115_Clinical_Skills_Worksheet_Form.pdf',
            content: [
              '%PDF-1.7',
              '1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-US) /AcroForm << /Fields [6 0 R] >> /StructTreeRoot 10 0 R /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /Metadata 8 0 R >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R /Tabs /S >> endobj',
              '6 0 obj << /Type /Annot /Subtype /Widget /FT /Tx /T (student_id) >> endobj',
              '8 0 obj << /Type /Metadata /Subtype /XML >> stream <pdfuaid:part>1</pdfuaid:part> endstream endobj',
              '10 0 obj << /Type /StructTreeRoot /K [ << /S /H1 >> ] >> endobj',
              '%%EOF'
            ].join('\n')
          },
          {
            name: 'ECON-102_Midterm_Rubric_Tagged.pdf',
            content: [
              '%PDF-1.7',
              '1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-US) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /Metadata 8 0 R /StructTreeRoot 10 0 R >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R /Tabs /S >> endobj',
              '8 0 obj << /Type /Metadata /Subtype /XML >> stream <pdfuaid:part>1</pdfuaid:part> endstream endobj',
              '10 0 obj << /Type /StructTreeRoot /K [ << /S /Table >> << /S /TH /A << /O /Table /Scope /Column >> >> ] >> endobj',
              '%%EOF'
            ].join('\n')
          }
        ]
      },
      {
        id: 'EDGE-CASE-PACK',
        optionLabel: 'Option 3',
        title: 'Mixed Edge-Case Audit (4 files)',
        subtitle: 'Tagged PDF, untagged handout, encrypted exam, and 1 corrupted file',
        files: [
          {
            name: 'CS-220_Algorithms_Lecture01_Tagged.pdf',
            content: [
              '%PDF-1.7',
              '1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-US) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /Metadata 8 0 R /StructTreeRoot 10 0 R >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R /Tabs /S >> endobj',
              '4 0 obj << /Type /Page /Parent 2 0 R /Tabs /S >> endobj',
              '8 0 obj << /Type /Metadata /Subtype /XML >> stream <pdfuaid:part>1</pdfuaid:part> endstream endobj',
              '10 0 obj << /Type /StructTreeRoot /K [ << /S /H1 >> << /S /H2 >> ] >> endobj',
              '%%EOF'
            ].join('\n')
          },
          {
            name: 'CS-220_Scanned_Problem_Set.pdf',
            content: [
              '%PDF-1.4',
              '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R /Resources << /XObject << /Im1 4 0 R >> >> >> endobj',
              '4 0 obj << /Type /XObject /Subtype /Image /Width 2550 /Height 3300 >> endobj',
              '%%EOF'
            ].join('\n')
          },
          {
            name: 'CS-220_Final_Exam_Encrypted.pdf',
            content: [
              '%PDF-1.7',
              '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
              '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
              '3 0 obj << /Type /Page /Parent 2 0 R >> endobj',
              'trailer << /Root 1 0 R /Encrypt 9 0 R >>',
              '%%EOF'
            ].join('\n')
          },
          {
            name: 'corrupted_attachment_notes.pdf',
            content: 'NOT_A_VALID_PDF_STREAM_BYTES_0000'
          }
        ]
      }
    ];
  }

  return {
    CONFORMANCE_DISCLAIMER,
    AUTOMATED_SCOPE_ITEMS,
    MANUAL_REVIEW_CHECKLIST,
    escapeHtml,
    decodeRawBytes,
    inspectDocumentBuffer,
    summarizeBatchResults,
    csvCell,
    buildBatchCsv,
    buildBatchJson,
    getEducationalBatchPresets
  };
});
