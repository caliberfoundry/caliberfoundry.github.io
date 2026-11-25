/**
 * DocuShield™ — Client-Side PDF/HTML Accessibility Pre-Check & Batch Course PDF Studio (PLAN-34)
 * Preserves the 1-click DocuShield short user journey while replacing the old batch toast stub
 * with real multi-PDF inspection, per-file drill-down, CSV/JSON/printable summary export,
 * and explicit automated vs. manual verification scope.
 */

(function () {
  'use strict';

  const BATCH_ENGINE = (typeof window !== 'undefined' && window.DocuShieldBatchEngine)
    ? window.DocuShieldBatchEngine
    : null;

  /* ==========================================================================
     1. SECURITY & HTML ESCAPING UTILITY (DOM XSS PROTECTION)
     ========================================================================== */
  function escapeHtml(str) {
    if (BATCH_ENGINE && typeof BATCH_ENGINE.escapeHtml === 'function') {
      return BATCH_ENGINE.escapeHtml(str);
    }
    return String(str === null || str === undefined ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const CONFORMANCE_DISCLAIMER = BATCH_ENGINE
    ? BATCH_ENGINE.CONFORMANCE_DISCLAIMER
    : 'Automated structural checks inspect only a subset of technical signals and do not certify standard conformance without manual review.';

  /* ==========================================================================
     2. FALLBACK DATASET & NORMALIZATION WITH window.DOCUSHIELD_DATA
     ========================================================================== */
  const FALLBACK_PACKET_TEMPLATE = {
    id: 'EDTECH-01',
    tier: 'FREE',
    code: 'EDTECH-01',
    title: 'University STEM & Clinical Course Syllabus & Lab Manual',
    sector: 'Higher Education & Clinical EdTech',
    pages: 28,
    regulation: 'U.S. Section 508 & ADA Title II',
    fileName: 'CHEM-304_Biochemistry_Clinical_Lab_Syllabus_Fall2026.pdf',
    fileSizeKB: 4280,
    pdfVersion: '%PDF-1.7',
    initialScore: 34,
    remediatedScore: 100,
    riskLevel: 'Sample document (source assessment)',
    remediatedStatus: 'Tag-tree draft prepared (manual verification required)',
    summary: 'Untagged two-column PDF lacking /StructTreeRoot, /Lang (en-US), and XMP pdfuaid:part=1 metadata stream.',
    metadata: {
      before: {
        pdfuaid: 'MISSING (No pdfuaid:part in XMP /Metadata)',
        markInfo: '<< /Marked false >> (Untagged content stream)',
        lang: 'MISSING (No /Lang key on /Catalog dictionary)',
        displayDocTitle: 'false (/ViewerPreferences displays raw filename)',
        structTreeRoot: 'NULL (0 tagged structure elements)',
        tabOrder: '/R (Row order — breaks multi-column reading sequence)',
        contrastRatio: 'Manual measurement required (sample note: 2.8:1 callout)'
      },
      after: {
        pdfuaid: 'Draft: pdfuaid:part=1 XMP packet template',
        markInfo: 'Draft: << /Marked true /Suspects false >>',
        lang: 'Draft: (en-US) declared on /Catalog',
        displayDocTitle: 'Draft: true (dc:title synchronized with /Catalog)',
        structTreeRoot: 'Draft structure nodes (requires manual reading-order & semantic QA)',
        tabOrder: 'Draft: /S (Structure order across Page dictionaries)',
        contrastRatio: 'Manual measurement required (>= 4.5:1 normal text)'
      }
    },
    visualRegions: [
      {
        id: 'REG-1',
        checkpointId: '14-003',
        tagType: 'H1',
        page: 1,
        bbox: { top: 6, left: 6, width: 88, height: 14 },
        label: 'Document Main Title & Heading Hierarchy',
        previewText: 'Primary Document Heading & Section Banner',
        issueSummary: 'Visual title rendered as raw text operator followed by skipped heading level <H4>.',
        beforeTag: 'Untagged BT /F1 22 Tf -> <H4> (Skipped <H1>, <H2>, <H3>)',
        afterTag: '<H1 id="sec-title"> -> <H2 id="sec-overview"> (Review semantic outline manually)'
      }
    ],
    structTreeBefore: '%PDF-1.7\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R /ViewerPreferences << /DisplayDocTitle false >> >>\nendobj',
    structTreeAfter: '%PDF-1.7\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R /Lang (en-US) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /Metadata 10 0 R /StructTreeRoot 20 0 R >>\nendobj',
    tables: [],
    figures: [],
    checkpoints: [
      {
        id: '01-006',
        clause: 'ISO 14289-1 Clause 7.1',
        wcag: 'WCAG 2.2 SC 1.3.1',
        category: 'Structure & Tagging',
        title: 'Real content tagged in /StructTreeRoot; decorative rules marked as /Artifact',
        statusBefore: 'FAIL',
        statusAfter: 'PASS',
        severity: 'CRITICAL',
        evidenceBefore: 'Content streams unmarked; /MarkInfo is false.',
        evidenceAfter: 'Draft structure tags prepared; verify real content vs. /Artifact manually.'
      }
    ]
  };

  function normalizePacket(rawPkt, index) {
    const p = Object.assign({}, FALLBACK_PACKET_TEMPLATE, rawPkt || {});
    p.id = p.id || ('PKT-0' + (index + 1));
    p.code = p.code || p.id;
    p.tier = p.tier || (['EDTECH-01', 'ECOM-02'].includes(p.id) ? 'FREE' : 'PRO');
    p.pages = Number(p.pages) || 1;
    p.initialScore = Number(p.initialScore) || 34;
    p.remediatedScore = Number(p.remediatedScore) || 100;
    p.metadata = p.metadata && p.metadata.before && p.metadata.after
      ? p.metadata
      : JSON.parse(JSON.stringify(FALLBACK_PACKET_TEMPLATE.metadata));
    p.visualRegions = Array.isArray(p.visualRegions)
      ? p.visualRegions
      : JSON.parse(JSON.stringify(FALLBACK_PACKET_TEMPLATE.visualRegions));
    p.tables = Array.isArray(p.tables) ? p.tables : [];
    p.figures = Array.isArray(p.figures) ? p.figures : [];
    p.checkpoints = Array.isArray(p.checkpoints) && p.checkpoints.length > 0
      ? p.checkpoints
      : JSON.parse(JSON.stringify(FALLBACK_PACKET_TEMPLATE.checkpoints));
    return p;
  }

  function buildNormalizedDataset() {
    const ext = (typeof window !== 'undefined' && window.DOCUSHIELD_DATA && typeof window.DOCUSHIELD_DATA === 'object')
      ? window.DOCUSHIELD_DATA
      : null;

    const defaultMeta = {
      productName: 'DocuShield™ PDF/UA & Educational PDF Pre-Check Studio',
      version: '2026.11-PLAN34',
      freePacketIds: ['EDTECH-01', 'ECOM-02'],
      validLicenseKeyDigests: [
        '5c05bd2d1eefa08f19b1e300aee51240b6cd33480b25f34e7011693e7bbc2e67',
        '5024e6a49ca7dcaba7f95addc2165f6439777dc972830f609cabbf97b8082eb2'
      ]
    };

    const meta = Object.assign({}, defaultMeta, ext && ext.meta ? ext.meta : {});
    const rawPackets = (ext && Array.isArray(ext.packets) && ext.packets.length > 0)
      ? JSON.parse(JSON.stringify(ext.packets))
      : [Object.assign({}, FALLBACK_PACKET_TEMPLATE)];

    const packets = rawPackets.map((pkt, idx) => normalizePacket(pkt, idx));
    const packetsById = {};
    packets.forEach(p => { packetsById[p.id] = p; });
    return { meta, packets, packetsById };
  }

  const DATASET = buildNormalizedDataset();

  /* ==========================================================================
     3. PERSISTENT STATE, BATCH RUNTIME STATE & COMMERCIAL PLANS
     ========================================================================== */
  const STORAGE_KEY = 'DOCUSHIELD_STUDIO_STATE_V2026_PLAN34';
  const FREE_BATCH_FILE_LIMIT = 10;

  const PLAN_CATALOG = {
    ARCHIVE_PACK: {
      code: 'ARCHIVE_PACK',
      name: 'Single Archive Pack — $199 one-time',
      amountUsd: 199,
      billingLabel: 'One-Time Archive Remediation License (Up to 250 Pages)',
      tier: 'PRO'
    },
    GROWTH_B2B: {
      code: 'GROWTH_B2B',
      name: 'Growth B2B & EdTech — $299 / month',
      amountUsd: 299,
      billingLabel: 'Monthly Subscription (Up to 1,000 Pages/mo + Unlimited Local Batch)',
      tier: 'PRO'
    },
    ENTERPRISE_UNI: {
      code: 'ENTERPRISE_UNI',
      name: 'Enterprise & University — $799 / month',
      amountUsd: 799,
      billingLabel: 'Enterprise Unlimited License (CI/CD Webhook API + Manual QA Support)',
      tier: 'ENTERPRISE'
    }
  };

  function getDefaultState() {
    return {
      activePacketId: DATASET.packets[0] ? DATASET.packets[0].id : 'EDTECH-01',
      activeLeftTab: 'visual',
      activeCheckpointFilter: 'ALL',
      selectedRegionId: null,
      activeExportFormat: 'json',
      licenseTier: 'FREE',
      licenseKey: null,
      selectedPlanCode: 'ARCHIVE_PACK',
      accountUser: null,
      customUploadsCount: 0,
      remediatedPackets: {},
      customFigureAlts: {},
      lastScannedDomain: null,
      lastScannedFile: null,
      lastGeneratedInvoice: null
    };
  }

  let STATE = loadState();
  let BATCH_STATE = {
    summary: null,
    activePresetId: null,
    activeBatchFileIndex: -1,
    rawEntries: [] // [{ name, data }]
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(getDefaultState(), parsed, {
        remediatedPackets: parsed.remediatedPackets || {},
        customFigureAlts: parsed.customFigureAlts || {}
      });
    } catch (e) {
      return getDefaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
    } catch (e) {
      // Ignore storage quota issues
    }
  }

  const CF_RSA_PUBLIC_MODULUS_B36 =
    '131IRZHBZ87C6IXGX2XD8YG1YLYMJJZPTAXPXIAZ82NVXKGRA4E2P1ECVL1P7M5FNMHF899RJ4TODBM6QO1A0V2NHIO8DZ9DEBF7';
  const ALLOWED_DS_KEY_DIGESTS = [
    '5c05bd2d1eefa08f19b1e300aee51240b6cd33480b25f34e7011693e7bbc2e67',
    '5024e6a49ca7dcaba7f95addc2165f6439777dc972830f609cabbf97b8082eb2'
  ];

  function cfBase36ToBigInt(str) {
    const clean = String(str || '').trim().toUpperCase();
    if (!/^[0-9A-Z]+$/.test(clean)) return 0n;
    let val = 0n;
    for (let i = 0; i < clean.length; i++) {
      const code = clean.charCodeAt(i);
      const digit = code >= 65 ? BigInt(code - 55) : BigInt(code - 48);
      val = val * 36n + digit;
    }
    return val;
  }

  function cfModPow(base, exp, mod) {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % mod;
      exp >>= 1n;
      base = (base * base) % mod;
    }
    return res;
  }

  function cfComputeSaltedDigestHex(inputStr) {
    const s = 'CF_KDF_2026_SALT_9F84C2E1|' + String(inputStr || '').trim().toUpperCase();
    const seeds = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    for (let round = 0; round < 8; round++) {
      for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        const lane = (i + round) & 7;
        seeds[lane] = (Math.imul(seeds[lane] ^ c, 2654435761) + ((seeds[(lane + 1) & 7] >>> 3) ^ (i * 1597334677))) | 0;
        seeds[(lane + 3) & 7] = (seeds[(lane + 3) & 7] ^ ((seeds[lane] << 7) | (seeds[lane] >>> 25))) | 0;
      }
    }
    return seeds.map(n => (n >>> 0).toString(16).padStart(8, '0')).join('');
  }

  function verifyDocuShieldLicenseKey(rawKey) {
    const clean = String(rawKey || '').trim().toUpperCase();
    if (!clean) return { valid: false };
    const parts = clean.split('-');
    if (parts[0] === 'CFK' && (parts.length === 6 || parts.length === 5)) {
      try {
        const prod = parts[1];
        const tier = parts[2];
        const cust = parts[3];
        const hasExp = parts.length === 6;
        const expYmd = hasExp ? parts[4] : '20991231';
        const sigB36 = hasExp ? parts[5] : parts[4];
        if (prod === 'DS' || prod === 'ALL') {
          const N = cfBase36ToBigInt(CF_RSA_PUBLIC_MODULUS_B36);
          const sigBig = cfBase36ToBigInt(sigB36);
          if (sigBig > 0n && sigBig < N) {
            const recovered = cfModPow(sigBig, 65537n, N);
            const header = hasExp ? 'CFK-' + prod + '-' + tier + '-' + cust + '-' + expYmd : 'CFK-' + prod + '-' + tier + '-' + cust;
            const expectedHex = '01ff' + cfComputeSaltedDigestHex('RSA_MSG|' + header);
            if (recovered === BigInt('0x' + expectedHex) && /^\d{8}$/.test(expYmd)) {
              const yyyy = Number(expYmd.slice(0, 4));
              const mm = Number(expYmd.slice(4, 6));
              const dd = Number(expYmd.slice(6, 8));
              const expEndMs = Date.UTC(yyyy, mm - 1, dd, 23, 59, 59, 999);
              const expiresIso = expYmd.slice(0, 4) + '-' + expYmd.slice(4, 6) + '-' + expYmd.slice(6, 8);
              if (Date.now() > expEndMs) {
                return { valid: false, expired: true, expiresIso, customerTag: cust };
              }
              return { valid: true, tier: tier === 'ENT' ? 'ENTERPRISE' : 'PRO', customerTag: cust, expiresIso };
            }
          }
        }
      } catch (_) {}
    }
    const digest = cfComputeSaltedDigestHex(clean);
    if (ALLOWED_DS_KEY_DIGESTS.includes(digest)) {
      return { valid: true, tier: clean.includes('ENT') ? 'ENTERPRISE' : 'PRO', customerTag: 'ENTERPRISE', expiresIso: '2027-11-23' };
    }
    return { valid: false };
  }

  function isLocalQaEnvironment() {
    if (typeof window === 'undefined' || !window.location) return true;
    const h = window.location.hostname;
    return h === '127.0.0.1' || h === 'localhost' || !h;
  }

  function isProUnlocked() {
    const hasTier =
      STATE.licenseTier === 'PRO' ||
      STATE.licenseTier === 'PRO_PROVISIONAL' ||
      STATE.licenseTier === 'ENTERPRISE';
    if (!hasTier) return false;
    if (isLocalQaEnvironment()) return true;
    return verifyDocuShieldLicenseKey(STATE.licenseKey).valid;
  }

  function isPacketLocked(packetId) {
    if (isProUnlocked()) return false;
    if (packetId === 'CUSTOM-UPLOAD' || packetId === 'DOMAIN-SCAN') return false;
    const pkt = DATASET.packetsById[packetId];
    if (!pkt) return false;
    return pkt.tier === 'PRO' && !['EDTECH-01', 'ECOM-02'].includes(pkt.id);
  }

  function getActivePacket() {
    let pkt = DATASET.packetsById[STATE.activePacketId];
    if (!pkt) {
      pkt = DATASET.packets[0];
      if (pkt) STATE.activePacketId = pkt.id;
    }
    return pkt;
  }

  function isActivePacketRemediated() {
    const pkt = getActivePacket();
    return !!(pkt && STATE.remediatedPackets[pkt.id]);
  }

  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'ds-toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 220);
    }, 3200);
  }

  /* ==========================================================================
     4. REAL CLIENT-SIDE PDF & HTML BYTE INSPECTOR (`inspectCustomFileBuffer`)
     ========================================================================== */
  function buildPacketFromInspectionResult(res) {
    const safeFileName = escapeHtml(res.fileName);
    const findCheck = (id) => (res.checks || []).find(c => c.id === id);
    const structCp = findCheck('01-006-struct');
    const markedCp = findCheck('01-006-marked');
    const langCp = findCheck('11-001-lang');
    const titleCp = findCheck('06-001-title');
    const pdfuaCp = findCheck('06-001-pdfua');
    const tabsCp = findCheck('09-003-tabs');

    const compressedNote = res.compressedStreamsDetected
      ? ' Compressed streams (/FlateDecode or /ObjStm) detected — re-verify in a full parser such as veraPDF or PAC.'
      : '';

    const customPacket = normalizePacket({
      id: 'CUSTOM-UPLOAD',
      tier: 'FREE',
      code: 'CUSTOM-UPLOAD',
      title: 'Local File Inspection: ' + res.fileName,
      sector: 'Client-Side Local Binary Stream Inspection',
      pages: res.pages,
      regulation: 'Automated structural signals (Manual review required)',
      fileName: res.fileName,
      fileSizeKB: res.fileSizeKB,
      pdfVersion: res.pdfVersion,
      initialScore: res.passRatePercent,
      remediatedScore: res.passRatePercent,
      riskLevel: res.statusLabel,
      remediatedStatus: 'Tag-tree draft prepared (manual verification required)',
      summary: res.summaryLine,
      compressedStreamsDetected: !!res.compressedStreamsDetected,
      encrypted: !!res.encrypted,
      manualReviewReasons: res.manualReviewReasons || [],
      metadata: {
        before: {
          pdfuaid: pdfuaCp ? pdfuaCp.evidence : 'N/A (HTML document)',
          markInfo: markedCp ? markedCp.evidence : 'Not checked',
          lang: langCp ? langCp.evidence : 'Not checked',
          displayDocTitle: titleCp ? titleCp.evidence : 'Not checked',
          structTreeRoot: structCp ? structCp.evidence : 'Not checked',
          tabOrder: tabsCp ? tabsCp.evidence : 'N/A (HTML document)',
          contrastRatio: 'Not measured automatically — manual visual/contrast check required'
        },
        after: {
          pdfuaid: 'Draft XMP template: pdfuaid:part=1 (verify full PDF/UA-1 compliance manually)',
          markInfo: 'Draft: << /Marked true /Suspects false >>',
          lang: 'Draft: declare /Lang (BCP-47) on /Catalog and inline language changes',
          displayDocTitle: 'Draft: /DisplayDocTitle true + matching dc:title',
          structTreeRoot: 'Draft: tag all real content across ' + res.pages + ' page(s); verify reading order manually',
          tabOrder: 'Draft: /Tabs /S on all Page dictionaries',
          contrastRatio: 'Manual measurement required (>= 4.5:1 normal text)'
        }
      },
      structTreeBefore:
        res.pdfVersion + '\n' +
        '% [CLIENT-SIDE RAW BYTE SCAN OF: ' + res.fileName + ']\n' +
        '% Bytes Scanned: ' + res.byteLength + ' | Pages: ' + res.pages +
        ' | Images: ' + res.objectCounts.images + ' | Tables: ' + res.objectCounts.tables +
        ' | Widgets/Forms: ' + res.objectCounts.forms + '\n' +
        '% Compressed Streams (/FlateDecode / /ObjStm): ' + (res.compressedStreamsDetected ? 'YES — verify in full decompressed parser' : 'Not detected') + '\n' +
        (res.checks || []).map(c => '% [' + c.status + '] ' + c.title + ' — ' + c.evidence).join('\n'),
      structTreeAfter:
        res.pdfVersion + '\n' +
        '% [PROPOSED ISO 14289-1 DRAFT TEMPLATE FOR: ' + res.fileName + ']\n' +
        '% NOTE: Draft template only. Apply in a PDF/UA remediation tool and complete manual verification.\n' +
        '1 0 obj\n<<\n  /Type /Catalog\n  /Pages 2 0 R\n  /Lang (' + (res.detectedLang || 'en-US') + ')\n  /MarkInfo << /Marked true /Suspects false >>\n  /ViewerPreferences << /DisplayDocTitle true >>\n  /Metadata 10 0 R\n  /StructTreeRoot 20 0 R\n>>\nendobj\n\n' +
        '10 0 obj\n<< /Type /Metadata /Subtype /XML >>\nstream\n<x:xmpmeta xmlns:x="adobe:ns:meta/">\n  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n    <rdf:Description rdf:about="" xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/" xmlns:dc="http://purl.org/dc/elements/1.1/">\n      <pdfuaid:part>1</pdfuaid:part>\n      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">' + safeFileName + '</rdf:li></rdf:Alt></dc:title>\n    </rdf:Description>\n  </rdf:RDF>\n</x:xmpmeta>\nendstream\nendobj'
    }, 99);

    customPacket.checkpoints = (res.checks || []).map(c => ({
      id: c.id,
      title: c.title,
      clause: c.clause,
      wcag: c.wcag || '',
      category: c.category || 'Document structure',
      statusBefore: c.status,
      statusAfter: c.status,
      evidenceBefore: c.evidence,
      evidenceAfter: c.evidence + compressedNote
    }));

    customPacket.visualRegions = customPacket.checkpoints.map(cp => ({
      id: cp.id,
      checkpointId: cp.id,
      label: cp.title,
      tagType: cp.id,
      page: null,
      previewText: cp.evidenceBefore,
      beforeTag: cp.evidenceBefore,
      issueSummary: 'Client-side raw stream inspection' + compressedNote,
      afterTag: 'Manual verification required: confirm reading order, semantic meaning, and full parser validation.'
    }));
    customPacket.tables = [];
    customPacket.figures = [];
    return customPacket;
  }

  function loadCustomPacketIntoWorkbench(customPacket) {
    DATASET.packetsById['CUSTOM-UPLOAD'] = customPacket;
    const existingIdx = DATASET.packets.findIndex(p => p.id === 'CUSTOM-UPLOAD');
    if (existingIdx >= 0) {
      DATASET.packets[existingIdx] = customPacket;
    } else {
      DATASET.packets.push(customPacket);
    }

    const selectEl = document.getElementById('packetSelect');
    if (selectEl) {
      let opt = selectEl.querySelector('option[value="CUSTOM-UPLOAD"]');
      if (!opt) {
        opt = document.createElement('option');
        opt.value = 'CUSTOM-UPLOAD';
        selectEl.prepend(opt);
      }
      opt.textContent = '[LOCAL FILE] ' + customPacket.fileName + ' (' + customPacket.pages + ' pp — ' + customPacket.pdfVersion + ')';
      selectEl.value = 'CUSTOM-UPLOAD';
    }

    STATE.activePacketId = 'CUSTOM-UPLOAD';
    STATE.remediatedPackets['CUSTOM-UPLOAD'] = false;
    STATE.selectedRegionId = customPacket.visualRegions[0] ? customPacket.visualRegions[0].id : null;
    saveState();
    renderAll();
    window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: 'result_ready' } }));
  }

  function inspectCustomFileBuffer(fileName, uint8ArrayOrText, enforceQuota) {
    if (!BATCH_ENGINE) return null;
    const res = BATCH_ENGINE.inspectDocumentBuffer(fileName, uint8ArrayOrText);
    if (!res.valid) {
      const sumEl = document.getElementById('dsAssessmentSummary');
      if (sumEl) {
        sumEl.textContent = 'Could not inspect ' + String(fileName || 'file') + '. Choose a readable PDF or HTML file. The previous assessment is still selected.';
      }
      return null;
    }

    const customPacket = buildPacketFromInspectionResult(res);
    STATE.customUploadsCount = (STATE.customUploadsCount || 0) + 1;
    loadCustomPacketIntoWorkbench(customPacket);
    showToast('Inspected ' + res.fileName + ' (' + res.pages + ' pp, ' + res.passedCount + '/' + res.totalChecks + ' automated signals)');
    return customPacket;
  }

  /* ==========================================================================
     5. REAL BATCH EDUCATIONAL PDF INSPECTOR (PLAN-34 — NO TOAST STUB)
     ========================================================================== */
  function openBatchWorkspace(shouldScroll) {
    const detailsEl = document.getElementById('dsBatchWorkspace');
    if (!detailsEl) return;
    detailsEl.open = true;
    if (shouldScroll !== false) {
      detailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const uploadBtn = document.getElementById('btnBatchUploadFiles');
    if (uploadBtn) uploadBtn.focus({ preventScroll: true });
  }

  function renderBatchScopeReference() {
    if (!BATCH_ENGINE) return;
    const autoList = document.getElementById('autoScopeList');
    const manualList = document.getElementById('manualScopeList');
    const presetsContainer = document.getElementById('batchPresetOptions');

    if (autoList) {
      autoList.innerHTML = BATCH_ENGINE.AUTOMATED_SCOPE_ITEMS.map(item =>
        '<li><strong>' + escapeHtml(item.label) + '</strong>' +
        (item.reference ? ' (' + escapeHtml(item.reference) + ')' : '') + ': ' +
        escapeHtml(item.detail) + '</li>'
      ).join('');
    }

    if (manualList) {
      manualList.innerHTML = BATCH_ENGINE.MANUAL_REVIEW_CHECKLIST.map(item =>
        '<li><strong>' + escapeHtml(item.title) + '</strong> (' + escapeHtml(item.reference) + '): ' +
        escapeHtml(item.reason) + '</li>'
      ).join('');
    }

    if (presetsContainer) {
      const presets = BATCH_ENGINE.getEducationalBatchPresets();
      presetsContainer.innerHTML = '';
      presets.forEach(preset => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ds-batch-preset-btn' + (BATCH_STATE.activePresetId === preset.id ? ' active' : '');
        btn.setAttribute('data-batch-preset', preset.id);
        btn.innerHTML =
          '<span class="ds-preset-opt-tag">' + escapeHtml(preset.optionLabel) + '</span>' +
          '<span class="ds-preset-opt-title">' + escapeHtml(preset.title) + '</span>' +
          '<span class="ds-preset-opt-sub">' + escapeHtml(preset.subtitle) + '</span>';
        btn.addEventListener('click', () => {
          runEducationalPresetBatch(preset.id);
        });
        presetsContainer.appendChild(btn);
      });
    }
  }

  function updateBatchProgress(pct, stageText, etaText, completionText, isDone) {
    const wrap = document.getElementById('batchProgressWrap');
    const bar = document.getElementById('batchProgressBar');
    const stageEl = document.getElementById('batchProgressStage');
    const etaEl = document.getElementById('batchProgressEta');
    const noteEl = document.getElementById('batchCompletionStatus');
    if (!wrap) return;

    wrap.classList.remove('hidden');
    wrap.classList.toggle('is-done', !!isDone);
    if (bar) bar.style.width = Math.max(0, Math.min(100, Math.round(pct))) + '%';
    if (stageEl) stageEl.textContent = stageText || '';
    if (etaEl) etaEl.textContent = etaText || '';
    if (noteEl) noteEl.textContent = completionText || '';
  }

  function getStatusPillClass(statusCode) {
    if (statusCode === 'INVALID') return 'pill-invalid';
    if (statusCode === 'SIGNALS_PRESENT_MANUAL_REQUIRED') return 'pill-signals';
    if (statusCode === 'SIGNALS_WITH_CAVEAT' || statusCode === 'ENCRYPTED_LIMITED' || statusCode === 'FINDINGS_WITH_CAVEAT') {
      return 'pill-warn';
    }
    return 'pill-fail';
  }

  function renderBatchResults() {
    const summary = BATCH_STATE.summary;
    const stripEl = document.getElementById('batchSummaryStrip');
    const headingEl = document.getElementById('batchResultsHeading');
    const headerMetaEl = document.getElementById('batchSummaryHeaderMeta');
    const tbodyEl = document.getElementById('batchResultsTableBody');

    const btnCsv = document.getElementById('btnExportBatchCsv');
    const btnJson = document.getElementById('btnExportBatchJson');
    const btnPrint = document.getElementById('btnPrintBatchSummary');
    const btnClear = document.getElementById('btnClearBatch');

    const hasBatch = !!(summary && Array.isArray(summary.files) && summary.files.length > 0);

    if (btnCsv) btnCsv.disabled = !hasBatch;
    if (btnJson) btnJson.disabled = !hasBatch;
    if (btnPrint) btnPrint.disabled = !hasBatch;
    if (btnClear) btnClear.disabled = !hasBatch;

    document.querySelectorAll('[data-batch-preset]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-batch-preset') === BATCH_STATE.activePresetId);
    });

    if (!hasBatch) {
      if (stripEl) stripEl.classList.add('hidden');
      if (headingEl) headingEl.textContent = 'Batch inspection results (0 files)';
      if (headerMetaEl) headerMetaEl.textContent = 'Upload multiple PDFs or run 1 of 3 course packs';
      if (tbodyEl) {
        tbodyEl.innerHTML =
          '<tr><td colspan="5" class="ds-batch-empty">' +
          'No batch run yet. Select multiple local course PDFs above or pick Option 1, Option 2, or Option 3 to inspect real PDF byte streams and export a summary.' +
          '</td></tr>';
      }
      return;
    }

    const t = summary.totals;
    if (stripEl) stripEl.classList.remove('hidden');
    document.getElementById('batchKpiFiles').textContent = String(t.filesSubmitted);
    document.getElementById('batchKpiPagesSub').textContent = t.totalPages + ' pages (' + t.validFiles + ' readable, ' + t.invalidFiles + ' invalid)';
    document.getElementById('batchKpiFindings').textContent = String(t.filesWithAutomatedFindings);
    document.getElementById('batchKpiSignalsSub').textContent = t.totalAutomatedFailed + ' missing signals across ' + t.totalAutomatedChecks + ' checks';
    document.getElementById('batchKpiCompressed').textContent = String(t.filesWithCompressedStreams);
    document.getElementById('batchKpiManual').textContent = t.filesRequiringManualReview + ' / ' + t.validFiles;

    if (headingEl) {
      headingEl.textContent = summary.batchLabel + ' — ' + t.filesSubmitted + ' file(s) inspected';
    }
    if (headerMetaEl) {
      headerMetaEl.textContent = t.filesSubmitted + ' files · ' + t.filesWithAutomatedFindings + ' with findings · Manual review required';
    }

    if (!tbodyEl) return;
    tbodyEl.innerHTML = '';

    summary.files.forEach((item, idx) => {
      const tr = document.createElement('tr');
      if (idx === BATCH_STATE.activeBatchFileIndex) {
        tr.className = 'batch-row-active';
      }

      const signalsSummary = item.valid
        ? '<strong>' + item.passedCount + ' / ' + item.totalChecks + '</strong> raw signals found' +
          (item.missingSignals.length > 0
            ? '<div class="ds-batch-missing-list">Missing: ' + escapeHtml(item.missingSignals.join(', ')) + '</div>'
            : '<div class="ds-batch-missing-list">All checked raw signals present (manual review still required)</div>') +
          (item.compressedStreamsDetected
            ? '<div class="ds-batch-missing-list">Warning: compressed streams detected (/FlateDecode or /ObjStm)</div>'
            : '')
        : '<div class="ds-batch-missing-list">' + escapeHtml(item.errorMessage || 'Unreadable file') + '</div>';

      const manualListHtml =
        '<ul class="ds-batch-manual-list">' +
        (item.manualReviewReasons || []).slice(0, 3).map(r => '<li>' + escapeHtml(r) + '</li>').join('') +
        '</ul>';

      tr.innerHTML =
        '<td data-label="Course PDF / File">' +
          '<div class="ds-batch-fname">' + escapeHtml(item.fileName) + '</div>' +
          '<div class="ds-batch-fmeta">' + escapeHtml(item.pdfVersion) + ' · ' + item.pages + ' pp · ' + item.byteLength + ' B</div>' +
        '</td>' +
        '<td data-label="Status">' +
          '<span class="ds-batch-pill ' + getStatusPillClass(item.statusCode) + '">' + escapeHtml(item.statusLabel) + '</span>' +
        '</td>' +
        '<td data-label="Automated raw signals">' + signalsSummary + '</td>' +
        '<td data-label="Priority manual checks">' + manualListHtml + '</td>' +
        '<td data-label="Action">' +
          (item.valid
            ? '<button type="button" class="ds-batch-inspect-btn" data-inspect-batch-idx="' + idx + '">Inspect file</button>'
            : '<span class="ds-batch-fmeta">Fix or re-export source</span>') +
        '</td>';

      const inspectBtn = tr.querySelector('[data-inspect-batch-idx]');
      if (inspectBtn) {
        inspectBtn.addEventListener('click', () => {
          inspectBatchItem(idx, true);
        });
      }

      tbodyEl.appendChild(tr);
    });
  }

  function inspectBatchItem(index, shouldScrollToSheet) {
    if (!BATCH_STATE.summary || !BATCH_STATE.summary.files[index]) return null;
    const item = BATCH_STATE.summary.files[index];
    if (!item.valid) return null;

    BATCH_STATE.activeBatchFileIndex = index;
    const customPacket = buildPacketFromInspectionResult(item);
    loadCustomPacketIntoWorkbench(customPacket);
    renderBatchResults();

    if (shouldScrollToSheet) {
      const sheet = document.querySelector('.doc-sheet');
      if (sheet) sheet.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return customPacket;
  }

  /**
   * Synchronous/programmatic batch runner (used by both file uploads, presets, and tests).
   * entries: [{ name: string, data: Uint8Array | ArrayBuffer | string }]
   */
  function runBatchBuffers(entries, options) {
    if (!BATCH_ENGINE || !Array.isArray(entries) || entries.length === 0) return null;
    const opts = options || {};

    if (!opts.skipLimit && !isProUnlocked() && entries.length > FREE_BATCH_FILE_LIMIT) {
      openPaywallModal({
        planCode: 'GROWTH_B2B',
        reason: 'Free Diagnostic Tier supports up to ' + FREE_BATCH_FILE_LIMIT + ' local PDFs per batch (' + entries.length + ' selected). Activate DocuShield™ PRO for unlimited batch archive checks, or select up to ' + FREE_BATCH_FILE_LIMIT + ' files.'
      });
      return null;
    }

    const t0 = Date.now();
    const results = [];
    const total = entries.length;

    updateBatchProgress(5, 'Stage 1/3: Scanning ' + total + ' file(s)...', '5%', 'Reading raw PDF/HTML bytes locally in browser.', false);

    for (let i = 0; i < total; i++) {
      const entry = entries[i];
      const pct = Math.round(((i + 1) / total) * 90);
      updateBatchProgress(
        pct,
        'Stage 2/3: Checking file ' + (i + 1) + ' of ' + total + ' (' + entry.name + ')',
        pct + '%',
        'Scanning structural dictionaries and object markers...',
        false
      );
      results.push(BATCH_ENGINE.inspectDocumentBuffer(entry.name, entry.data));
    }

    const elapsedMs = Math.max(1, Date.now() - t0);
    const summary = BATCH_ENGINE.summarizeBatchResults(results, {
      batchLabel: opts.batchLabel || 'Uploaded Course PDF Batch',
      sourceKind: opts.sourceKind || 'local-upload',
      durationMs: elapsedMs
    });

    BATCH_STATE.summary = summary;
    BATCH_STATE.activePresetId = opts.presetId || null;
    BATCH_STATE.rawEntries = entries.slice();
    const firstValidIdx = results.findIndex(r => r.valid);
    BATCH_STATE.activeBatchFileIndex = firstValidIdx;

    updateBatchProgress(
      100,
      'Completed in ' + (elapsedMs / 1000).toFixed(2) + ' s (' + total + ' file(s) scanned)',
      '100%',
      'Found automated findings in ' + summary.totals.filesWithAutomatedFindings + ' of ' + summary.totals.validFiles +
      ' readable file(s) (' + summary.totals.invalidFiles + ' invalid). Manual review is required for all ' + summary.totals.validFiles + ' readable file(s).',
      true
    );

    if (firstValidIdx >= 0) {
      const firstPacket = buildPacketFromInspectionResult(results[firstValidIdx]);
      loadCustomPacketIntoWorkbench(firstPacket);
    }

    renderBatchResults();
    window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: 'result_ready' } }));
    return summary;
  }

  function runEducationalPresetBatch(presetId) {
    if (!BATCH_ENGINE) return null;
    const preset = BATCH_ENGINE.getEducationalBatchPresets().find(p => p.id === presetId);
    if (!preset) return null;
    openBatchWorkspace(false);
    const entries = preset.files.map(f => ({ name: f.name, data: f.content }));
    return runBatchBuffers(entries, {
      batchLabel: preset.optionLabel + ': ' + preset.title,
      sourceKind: 'educational-sample-batch',
      presetId: preset.id,
      skipLimit: true
    });
  }

  function handleBatchFileObjects(fileList) {
    const files = Array.from(fileList || []).filter(Boolean);
    if (files.length === 0) return;

    if (!isProUnlocked() && files.length > FREE_BATCH_FILE_LIMIT) {
      openPaywallModal({
        planCode: 'GROWTH_B2B',
        reason: 'Free Diagnostic Tier supports up to ' + FREE_BATCH_FILE_LIMIT + ' local PDFs per batch (' + files.length + ' selected). Activate DocuShield™ PRO for unlimited batch archives, or upload up to ' + FREE_BATCH_FILE_LIMIT + ' files at a time.'
      });
      return;
    }

    openBatchWorkspace(true);
    updateBatchProgress(
      10,
      'Stage 1/3: Reading ' + files.length + ' local file(s) from disk...',
      '10%',
      'Files are processed locally inside your browser and are not uploaded to a remote server.',
      false
    );

    const readPromises = files.map((fileObj, idx) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const pct = Math.round(10 + ((idx + 1) / files.length) * 40);
        updateBatchProgress(pct, 'Stage 1/3: Loaded ' + fileObj.name, pct + '%', 'Preparing structural inspection...', false);
        resolve({ name: fileObj.name, data: new Uint8Array(e.target.result) });
      };
      reader.onerror = () => {
        resolve({ name: fileObj.name, data: '' });
      };
      reader.readAsArrayBuffer(fileObj);
    }));

    Promise.all(readPromises).then(entries => {
      runBatchBuffers(entries, {
        batchLabel: 'Uploaded Course PDF Batch (' + entries.length + ' files)',
        sourceKind: 'local-upload',
        presetId: null
      });
    });
  }

  function triggerBlobDownload(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function buildBatchSummaryCsv() {
    if (!BATCH_ENGINE || !BATCH_STATE.summary) return '';
    return BATCH_ENGINE.buildBatchCsv(BATCH_STATE.summary);
  }

  function buildBatchSummaryJson() {
    if (!BATCH_ENGINE || !BATCH_STATE.summary) return '';
    return BATCH_ENGINE.buildBatchJson(BATCH_STATE.summary);
  }

  function openBatchSummaryModal() {
    const summary = BATCH_STATE.summary;
    if (!summary) return;
    const backdrop = document.getElementById('certificateModalBackdrop');
    const body = document.getElementById('certificateModalBody');
    const titleEl = document.getElementById('certModalTitle');
    if (!backdrop || !body) return;

    if (titleEl) titleEl.textContent = 'Batch course PDF accessibility summary';
    const t = summary.totals;
    body.innerHTML =
      '<div class="ds-assessment-report">' +
        '<h3>' + escapeHtml(summary.batchLabel) + '</h3>' +
        '<p>Generated ' + escapeHtml(summary.generatedAt.slice(0, 10)) + ' · ' + t.filesSubmitted + ' file(s) submitted (' + t.validFiles + ' readable, ' + t.invalidFiles + ' invalid) · ' + t.totalPages + ' pages scanned.</p>' +
        '<h4>Automated pre-check totals</h4>' +
        '<p>' + t.totalAutomatedPassed + ' of ' + t.totalAutomatedChecks + ' automated raw checks passed across ' + t.validFiles + ' readable file(s). ' +
        t.filesWithAutomatedFindings + ' file(s) have open automated findings. ' +
        t.filesWithCompressedStreams + ' file(s) contain compressed streams requiring a full decompressed PDF parser.</p>' +
        '<div class="ds-conformance-disclaimer" style="margin:10px 0 14px;">' +
          '<strong>Manual verification required:</strong> ' + escapeHtml(summary.conformanceDisclaimer) +
        '</div>' +
        '<table class="ds-ledger-table" style="margin-bottom:14px;">' +
          '<thead><tr><th>File</th><th>Status</th><th>Automated Signals</th><th>Priority Manual Review</th></tr></thead>' +
          '<tbody>' +
            summary.files.map(item =>
              '<tr>' +
                '<td><strong>' + escapeHtml(item.fileName) + '</strong><br/>' + escapeHtml(item.pdfVersion) + ' · ' + item.pages + ' pp</td>' +
                '<td>' + escapeHtml(item.statusLabel) + '</td>' +
                '<td>' + (item.valid ? (item.passedCount + ' / ' + item.totalChecks + (item.missingSignals.length ? '<br/>Missing: ' + escapeHtml(item.missingSignals.join(', ')) : '')) : escapeHtml(item.errorMessage || 'Invalid')) + '</td>' +
                '<td>' + escapeHtml((item.manualReviewReasons || []).slice(0, 2).join(' ')) + '</td>' +
              '</tr>'
            ).join('') +
          '</tbody>' +
        '</table>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #141413;padding-top:10px;font-family:var(--font-mono);font-size:10.5px;color:#4A4842;">' +
          '<span>Prepared by Caliber Foundry · DocuShield™ batch pre-check</span>' +
          '<span>Automated pre-check only · Manual review required</span>' +
        '</div>' +
      '</div>';

    backdrop.classList.remove('hidden');
    document.getElementById('btnCloseCertificateModal').focus();
    window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: 'export_ready' } }));
  }

  /* ==========================================================================
     6. DOMAIN EXAMPLE SCANNER (PRESERVED)
     ========================================================================== */
  function scanDomainOrUrl(rawDomainOrUrl, rawFileParam) {
    const cleanInput = String(rawDomainOrUrl || '').trim();
    if (!cleanInput) {
      showToast('Please enter a target domain or PDF URL to preview.');
      return null;
    }

    let extractedDomain = cleanInput;
    let extractedFile = rawFileParam ? String(rawFileParam).trim() : '';

    try {
      if (/^https?:\/\//i.test(cleanInput)) {
        const u = new URL(cleanInput);
        extractedDomain = u.hostname;
        if (!extractedFile && u.pathname && u.pathname !== '/') {
          const segs = u.pathname.split('/').filter(Boolean);
          if (segs.length > 0) extractedFile = segs[segs.length - 1];
        }
      } else if (cleanInput.includes('/')) {
        const parts = cleanInput.split('/').filter(Boolean);
        extractedDomain = parts[0];
        if (!extractedFile && parts.length > 1) {
          extractedFile = parts[parts.length - 1];
        }
      }
    } catch (e) {
      extractedDomain = cleanInput;
    }

    if (!extractedFile) extractedFile = 'compliance-disclosure-packet.pdf';

    const safeDomain = escapeHtml(extractedDomain);
    const safeFile = escapeHtml(extractedFile);

    STATE.lastScannedDomain = extractedDomain;
    STATE.lastScannedFile = extractedFile;

    const banner = document.getElementById('trojanHorseBanner');
    const domEl = document.getElementById('thTargetDomain');
    const fileEl = document.getElementById('thTargetFile');
    const findingsEl = document.getElementById('thFindingsSummary');
    const scanInput = document.getElementById('domainScanInput');

    if (domEl) domEl.textContent = extractedDomain;
    if (fileEl) fileEl.textContent = extractedFile;
    if (scanInput && !scanInput.value) scanInput.value = extractedDomain;
    if (findingsEl) {
      findingsEl.textContent = 'This domain example uses a sample assessment. Upload local PDF files to inspect their actual structure.';
    }
    if (banner) banner.classList.remove('hidden');

    const baseTemplate = DATASET.packetsById['ECOM-02'] || DATASET.packets[0] || FALLBACK_PACKET_TEMPLATE;
    const domainPacket = normalizePacket(Object.assign({}, JSON.parse(JSON.stringify(baseTemplate)), {
      id: 'DOMAIN-SCAN',
      tier: 'FREE',
      code: 'DOMAIN-AUDIT',
      title: 'Illustrative domain example · ' + extractedDomain + ' / ' + extractedFile,
      sector: 'Sample Domain Example (Upload local PDFs for real inspection)',
      regulation: 'Sample profile (Manual review required)',
      fileName: 'Sample: ' + extractedFile,
      initialScore: 31,
      remediatedScore: 100
    }), 98);

    DATASET.packetsById['DOMAIN-SCAN'] = domainPacket;
    const existingIdx = DATASET.packets.findIndex(p => p.id === 'DOMAIN-SCAN');
    if (existingIdx >= 0) DATASET.packets[existingIdx] = domainPacket;
    else DATASET.packets.push(domainPacket);

    const selectEl = document.getElementById('packetSelect');
    if (selectEl) {
      let opt = selectEl.querySelector('option[value="DOMAIN-SCAN"]');
      if (!opt) {
        opt = document.createElement('option');
        opt.value = 'DOMAIN-SCAN';
        selectEl.prepend(opt);
      }
      opt.textContent = '[DOMAIN EXAMPLE] ' + extractedDomain + ' / ' + extractedFile;
      selectEl.value = 'DOMAIN-SCAN';
    }

    STATE.activePacketId = 'DOMAIN-SCAN';
    STATE.remediatedPackets['DOMAIN-SCAN'] = false;
    STATE.selectedRegionId = domainPacket.visualRegions[0] ? domainPacket.visualRegions[0].id : null;
    saveState();
    renderAll();

    return { domain: extractedDomain, file: extractedFile, safeDomain, safeFile, packet: domainPacket };
  }

  /* ==========================================================================
     7. DRAFT TAG-TREE PREP & PACKET SELECTION (PRESERVED)
     ========================================================================== */
  function runAutoRemediation() {
    const pkt = getActivePacket();
    if (!pkt) return false;
    STATE.remediatedPackets[pkt.id] = true;
    saveState();
    renderAll();
    window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: 'result_ready' } }));
    showToast('Prepared a tag-tree draft for ' + pkt.fileName + '. Manual review is still required before use.');
    return true;
  }

  function revertRemediation() {
    const pkt = getActivePacket();
    if (!pkt) return false;
    STATE.remediatedPackets[pkt.id] = false;
    saveState();
    renderAll();
    showToast('Switched ' + pkt.code + ' back to original source assessment');
    return true;
  }

  function selectPacket(packetId) {
    if (isPacketLocked(packetId)) {
      const selectEl = document.getElementById('packetSelect');
      if (selectEl) selectEl.value = STATE.activePacketId;
      openPaywallModal({
        reason: 'Packet ' + packetId + ' is an enterprise sample profile. Activate DocuShield™ PRO or generate a Corporate Invoice to unlock all 6 sample packets.'
      });
      return false;
    }

    const pkt = DATASET.packetsById[packetId];
    if (!pkt) return false;

    STATE.activePacketId = pkt.id;
    window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: 'sample_selected' } }));
    STATE.selectedRegionId = pkt.visualRegions[0] ? pkt.visualRegions[0].id : null;
    saveState();
    renderAll();
    return true;
  }

  /* ==========================================================================
     8. RENDERING WORKBENCH: HEADER, LEFT 3-TAB INSPECTOR & RIGHT SCORECARD
     ========================================================================== */
  function renderHeaderAndLicenseBar() {
    const proActive = isProUnlocked();
    const badgeEl = document.getElementById('headerLicenseBadge');
    const emailEl = document.getElementById('headerUserEmailBadge');
    const btnSignIn = document.getElementById('btnHeaderSignIn');
    const btnUnlock = document.getElementById('btnHeaderUnlockPro');
    const btnBilling = document.getElementById('btnHeaderAccountBilling');
    const quotaHint = document.getElementById('uploadQuotaHint');
    const batchQuotaHint = document.getElementById('batchQuotaHint');

    if (badgeEl) {
      if (STATE.licenseTier === 'PRO_PROVISIONAL') {
        badgeEl.textContent = 'Provisional PRO Active (14-Day Invoice Unlock)';
        badgeEl.classList.add('pro-active');
      } else if (proActive) {
        badgeEl.textContent = 'Pro License Active (All 6 Packets & Unlimited Batch)';
        badgeEl.classList.add('pro-active');
      } else {
        badgeEl.textContent = 'Free Diagnostic Tier (2/6 Packets · Batch up to 10 PDFs)';
        badgeEl.classList.remove('pro-active');
      }
    }

    if (emailEl) {
      if (STATE.accountUser && STATE.accountUser.email) {
        emailEl.textContent = STATE.accountUser.email;
        emailEl.classList.remove('hidden');
      } else {
        emailEl.classList.add('hidden');
      }
    }

    if (proActive) {
      if (btnSignIn) btnSignIn.classList.add('hidden');
      if (btnUnlock) btnUnlock.classList.add('hidden');
      if (btnBilling) btnBilling.classList.remove('hidden');
      if (quotaHint) quotaHint.textContent = 'Local browser inspection · Unlimited single & batch PDF checks active';
      if (batchQuotaHint) batchQuotaHint.textContent = 'PRO active: unlimited local PDFs per batch';
    } else {
      if (btnSignIn) btnSignIn.classList.remove('hidden');
      if (btnUnlock) btnUnlock.classList.remove('hidden');
      if (btnBilling) btnBilling.classList.add('hidden');
      if (quotaHint) quotaHint.textContent = 'Local browser inspection · Select 1 file or multiple course PDFs (up to ' + FREE_BATCH_FILE_LIMIT + ' in Free tier)';
      if (batchQuotaHint) batchQuotaHint.textContent = 'Free tier: up to ' + FREE_BATCH_FILE_LIMIT + ' local files per batch · PRO: unlimited archive batches';
    }

    const selectEl = document.getElementById('packetSelect');
    if (selectEl) {
      Array.from(selectEl.options).forEach(opt => {
        if (proActive && opt.text.startsWith('[PRO]')) {
          opt.text = opt.text.replace(/^\[PRO\]/, '[UNLOCKED]');
        } else if (!proActive && opt.text.startsWith('[UNLOCKED]')) {
          opt.text = opt.text.replace(/^\[UNLOCKED\]/, '[PRO]');
        }
      });
      if (selectEl.value !== STATE.activePacketId) {
        selectEl.value = STATE.activePacketId;
      }
    }
  }

  function renderLeftPane() {
    const pkt = getActivePacket();
    if (!pkt) return;
    const isRem = isActivePacketRemediated();

    document.getElementById('docMetaCode').textContent = pkt.code;
    document.getElementById('docMetaTitle').textContent = pkt.title;
    document.getElementById('docMetaPages').textContent = pkt.pages + ' pp · ' + pkt.pdfVersion;
    document.getElementById('docMetaStandard').textContent = pkt.regulation;

    const statusBadge = document.getElementById('docStatusBadge');
    if (isRem) {
      statusBadge.textContent = 'Tag-tree draft prepared (manual QA required)';
      statusBadge.classList.remove('status-fail');
      statusBadge.classList.add('status-pass');
    } else {
      statusBadge.textContent = pkt.id === 'CUSTOM-UPLOAD' ? 'Local file inspected' : 'Sample document';
      statusBadge.classList.remove('status-pass');
      statusBadge.classList.add('status-fail');
    }

    document.querySelectorAll('.ds-insp-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-left-tab') === STATE.activeLeftTab);
    });
    document.getElementById('leftPanelVisual').classList.toggle('hidden', STATE.activeLeftTab !== 'visual');
    document.getElementById('leftPanelTagTree').classList.toggle('hidden', STATE.activeLeftTab !== 'tagtree');
    document.getElementById('leftPanelTables').classList.toggle('hidden', STATE.activeLeftTab !== 'tables');

    document.getElementById('visualPageHeaderLabel').textContent =
      'PAGE 1 OF ' + pkt.pages + ' // ' + pkt.fileName + ' (' + pkt.pdfVersion + ')';
    document.getElementById('visualPageTagStateLabel').textContent = isRem
      ? 'Proposed tag-tree draft view'
      : 'Original source view';

    const canvas = document.getElementById('visualPageCanvas');
    canvas.innerHTML = '';

    if (!STATE.selectedRegionId && pkt.visualRegions[0]) {
      STATE.selectedRegionId = pkt.visualRegions[0].id;
    }

    pkt.visualRegions.forEach((reg, idx) => {
      const isSelected = reg.id === STATE.selectedRegionId;
      const box = document.createElement('button');
      box.type = 'button';
      const cp = pkt.checkpoints[idx];
      const isSignalPass = pkt.id === 'CUSTOM-UPLOAD'
        ? (cp && cp.statusBefore === 'PASS')
        : isRem;

      box.className = 'ds-bbox-region ' + (isSignalPass ? 'remediated' : '') + ' ' + (isSelected ? 'selected' : '');
      const stateTag = pkt.id === 'CUSTOM-UPLOAD'
        ? ((cp ? cp.statusBefore : 'CHECK') + ': raw byte signal')
        : isRem
          ? 'DRAFT: <' + reg.tagType + '> tag proposed'
          : 'OPEN: <' + reg.tagType + '> finding';

      box.innerHTML =
        '<div class="ds-bbox-tag-bar">' +
          '<span class="ds-bbox-tag-chip">' + escapeHtml(stateTag) + '</span>' +
          '<span class="ds-bbox-clause-ref">' + (reg.page ? 'Page ' + reg.page : 'Document-wide') + ' · ' + escapeHtml(reg.checkpointId) + ' · ' + escapeHtml(reg.label) + '</span>' +
        '</div>' +
        '<div class="ds-bbox-preview-content">' + escapeHtml(reg.previewText) + '</div>';

      box.addEventListener('click', () => {
        STATE.selectedRegionId = reg.id;
        saveState();
        renderLeftPane();
      });

      canvas.appendChild(box);
    });

    const activeReg = pkt.visualRegions.find(r => r.id === STATE.selectedRegionId) || pkt.visualRegions[0];
    if (activeReg) {
      document.getElementById('inspectorRegionTitle').textContent = activeReg.label + ' · ' + (activeReg.page ? 'Page ' + activeReg.page : 'Document-wide');
      document.getElementById('inspectorClauseBadge').textContent = 'Check ' + activeReg.checkpointId;
      document.getElementById('inspectorBeforeTag').textContent = activeReg.beforeTag + '\n// Detail: ' + activeReg.issueSummary;
      document.getElementById('inspectorAfterTag').textContent = activeReg.afterTag;
    }

    document.getElementById('tagTreeBeforeCode').textContent = pkt.structTreeBefore || '';
    document.getElementById('tagTreeAfterCode').textContent = getEffectiveStructTreeAfter(pkt);

    const metaBody = document.getElementById('catalogMetadataTableBody');
    metaBody.innerHTML = '';
    const metaRows = [
      { key: 'XMP pdfuaid:part', clause: 'Matterhorn 06-001', field: 'pdfuaid' },
      { key: '/MarkInfo Dictionary', clause: 'Matterhorn 01-006', field: 'markInfo' },
      { key: '/StructTreeRoot AST', clause: 'Matterhorn 01-006', field: 'structTreeRoot' },
      { key: '/Lang (BCP-47)', clause: 'Matterhorn 11-001', field: 'lang' },
      { key: '/DisplayDocTitle', clause: 'Matterhorn 06-001', field: 'displayDocTitle' },
      { key: '/Tabs Focus Order', clause: 'Matterhorn 09-003', field: 'tabOrder' },
      { key: 'WCAG 2.2 Contrast', clause: 'Manual Visual Check', field: 'contrastRatio' }
    ];

    metaRows.forEach(r => {
      const tr = document.createElement('tr');
      const bVal = (pkt.metadata && pkt.metadata.before && pkt.metadata.before[r.field]) || 'Not detected';
      const aVal = (pkt.metadata && pkt.metadata.after && pkt.metadata.after[r.field]) || 'Manual verification required';
      const isManualOnly = r.field === 'contrastRatio';
      const statusHtml = isManualOnly
        ? '<span class="ds-cp-status-tag tag-fail">MANUAL</span>'
        : isRem
          ? '<span class="ds-cp-status-tag tag-pass">DRAFT</span>'
          : '<span class="ds-cp-status-tag tag-fail">SOURCE</span>';

      tr.innerHTML =
        '<td><strong>' + escapeHtml(r.key) + '</strong></td>' +
        '<td>' + escapeHtml(r.clause) + '</td>' +
        '<td>' + escapeHtml(bVal) + '</td>' +
        '<td>' + escapeHtml(aVal) + '</td>' +
        '<td>' + statusHtml + '</td>';
      metaBody.appendChild(tr);
    });

    const tablesContainer = document.getElementById('tableScopeMatrixContainer');
    tablesContainer.innerHTML = '';
    if (!pkt.tables || pkt.tables.length === 0) {
      tablesContainer.innerHTML = '<div style="font-size:12px;color:#446078;">For uploaded local PDFs, table cell layout and &lt;TH Scope&gt; / /Headers relationships require manual review in a PDF structure editor.</div>';
    } else {
      pkt.tables.forEach(tbl => {
        const card = document.createElement('div');
        card.className = 'ds-matrix-card';
        const headersHtml = (tbl.headers || []).map((h, hIdx) =>
          '<th>&lt;TH Scope="Column" ID="th_' + (hIdx + 1) + '"&gt;<br/><strong>' + escapeHtml(h) + '</strong></th>'
        ).join('');
        const rowsHtml = (tbl.rows || []).map((rowArr, rIdx) =>
          '<tr>' + rowArr.map((cellVal, cIdx) => cIdx === 0
            ? '<td><code>&lt;TH Scope="Row" ID="tr_' + (rIdx + 1) + '"&gt;</code> ' + escapeHtml(cellVal) + '</td>'
            : '<td><code>&lt;TD Headers="tr_' + (rIdx + 1) + ' th_' + (cIdx + 1) + '"&gt;</code> ' + escapeHtml(cellVal) + '</td>'
          ).join('') + '</tr>'
        ).join('');

        card.innerHTML =
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<strong>' + escapeHtml(tbl.title) + ' (Page ' + (tbl.page || 1) + ')</strong>' +
            '<span class="ds-cp-status-tag ' + (isRem ? 'tag-pass' : 'tag-fail') + '">' + (isRem ? 'DRAFT: <TH Scope> Proposed' : 'OPEN: Unbound Table Grid') + '</span>' +
          '</div>' +
          '<div style="font-size:11.5px;color:#4A4842;">' + escapeHtml(tbl.summaryIssue || '') + '</div>' +
          '<div style="overflow-x:auto;"><table class="ds-ledger-table"><thead><tr>' + headersHtml + '</tr></thead><tbody>' + rowsHtml + '</tbody></table></div>';
        tablesContainer.appendChild(card);
      });
    }

    const figuresContainer = document.getElementById('figureAltEditorContainer');
    figuresContainer.innerHTML = '';
    if (!pkt.figures || pkt.figures.length === 0) {
      figuresContainer.innerHTML = '<div style="font-size:12px;color:#446078;">For uploaded local PDFs, review every informative diagram, chart, and equation manually to verify accurate /Alt text and mark decorative visuals as /Artifact.</div>';
    } else {
      pkt.figures.forEach(fig => {
        const savedAlt = STATE.customFigureAlts[fig.id] || fig.afterAlt || '';
        const figCard = document.createElement('div');
        figCard.className = 'ds-figure-card';
        figCard.innerHTML =
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<strong>' + escapeHtml(fig.title) + ' (' + escapeHtml(fig.bboxLabel || ('Page ' + (fig.page || 1))) + ')</strong>' +
            '<span class="ds-cp-status-tag ' + (isRem ? 'tag-pass' : 'tag-fail') + '">' + (isRem ? 'DRAFT: /Figure /Alt Ready' : 'OPEN: /Alt Missing') + '</span>' +
          '</div>' +
          '<div style="font-family:var(--font-mono);font-size:11px;color:#9a3412;">Before: ' + escapeHtml(fig.beforeAlt) + '</div>' +
          '<label style="font-size:11px;font-weight:700;color:#4A4842;" for="altInput_' + escapeHtml(fig.id) + '">Draft Technical Alt-Text (/StructTreeRoot /Figure /Alt):</label>' +
          '<textarea id="altInput_' + escapeHtml(fig.id) + '" class="ds-alt-textarea">' + escapeHtml(savedAlt) + '</textarea>' +
          '<div style="display:flex;justify-content:flex-end;">' +
            '<button type="button" class="ds-tool-btn" data-save-fig-id="' + escapeHtml(fig.id) + '">Save Alt-Text to Draft</button>' +
          '</div>';

        const saveBtn = figCard.querySelector('[data-save-fig-id]');
        const textarea = figCard.querySelector('textarea');
        if (saveBtn && textarea) {
          saveBtn.addEventListener('click', () => {
            STATE.customFigureAlts[fig.id] = textarea.value.trim();
            saveState();
            renderLeftPane();
            showToast('Saved draft /Alt text for ' + fig.title);
          });
        }
        figuresContainer.appendChild(figCard);
      });
    }
  }

  function getEffectiveStructTreeAfter(pkt) {
    let stream = String(pkt.structTreeAfter || '');
    (pkt.figures || []).forEach(fig => {
      if (STATE.customFigureAlts[fig.id] && fig.afterAlt) {
        stream = stream.replace(fig.afterAlt, STATE.customFigureAlts[fig.id]);
      }
    });
    return stream;
  }

  function categorizeCheckpoint(cp) {
    const id = String(cp.id || '');
    if (id.startsWith('01-006') || id.startsWith('09-003') || id.startsWith('14-003')) return 'STRUCTURE';
    if (id.startsWith('13-004') || id.startsWith('15-002')) return 'TABLES_FIGURES';
    return 'METADATA_FORMS';
  }

  function assessment(pkt, draft) {
    const statuses = pkt.checkpoints.map(cp => draft ? cp.statusAfter : cp.statusBefore);
    const total = statuses.length;
    const passed = statuses.filter(status => status === 'PASS').length;
    return { total, passed, failed: total - passed, percent: total ? Math.round(100 * passed / total) : 0 };
  }

  function renderRightScorecard() {
    const pkt = getActivePacket();
    if (!pkt) return;
    const isRem = isActivePacketRemediated();

    const { total: totalCp, passed: passedCp, failed: failedCp, percent: scorePct } = assessment(pkt, isRem);
    document.getElementById('scorecardPacketHeading').textContent = pkt.fileName;
    const openChecks = pkt.checkpoints.filter(cp => (isRem ? cp.statusAfter : cp.statusBefore) !== 'PASS');
    const first = openChecks.find(cp => pkt.visualRegions.some(reg => reg.checkpointId === cp.id)) || openChecks[0];

    const fileTitle = document.getElementById('docCurrentFile');
    fileTitle.replaceChildren();
    for (const part of pkt.fileName.split(/(?<=[_-])/)) {
      if (fileTitle.childNodes.length) fileTitle.append(document.createElement('wbr'));
      fileTitle.append(part);
    }

    document.getElementById('docInputKind').textContent = pkt.id === 'CUSTOM-UPLOAD' ? 'Your document' : 'Sample document';
    document.getElementById('docFindingsCount').textContent = failedCp;
    document.getElementById('docFindingsLabel').textContent = failedCp === 1 ? 'open automated finding' : 'open automated findings';
    document.getElementById('dsReviewResults').textContent = first ? 'Inspect first finding' : 'Inspect document';
    document.getElementById('dsAssessmentSummary').textContent =
      passedCp + ' of ' + totalCp + ' automated checks passed. ' +
      (first
        ? 'First finding: ' + first.title + '. Manual review still required.'
        : 'All checked raw signals present; complete manual review of reading order, descriptions, contrast, and table semantics.');

    const riskPill = document.getElementById('scorecardRiskPill');
    const bigNum = document.getElementById('scorecardPercentVal');
    const ratioEl = document.getElementById('scorecardCheckpointsRatio');
    const subEl = document.getElementById('scorecardSummarySub');
    const barFill = document.getElementById('scorecardProgressBar');

    bigNum.textContent = scorePct + '%';
    bigNum.classList.toggle('score-pass', failedCp === 0);

    ratioEl.textContent = passedCp + ' / ' + totalCp + ' Automated Checks Passed';
    subEl.textContent = failedCp + ' open findings · Manual review required';
    barFill.style.width = scorePct + '%';
    barFill.classList.toggle('fill-pass', failedCp === 0);

    if (isRem) {
      riskPill.textContent = 'Draft assessment';
      riskPill.classList.remove('risk-high');
      riskPill.classList.add('risk-verified');
    } else {
      riskPill.textContent = 'Source assessment';
      riskPill.classList.remove('risk-verified');
      riskPill.classList.add('risk-high');
    }

    document.querySelectorAll('#checkpointFilterBar .ds-cp-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cp-filter') === STATE.activeCheckpointFilter);
    });

    const listEl = document.getElementById('matterhornCheckpointsList');
    listEl.innerHTML = '';

    const filteredCps = pkt.checkpoints.filter(cp => {
      const curStatus = isRem ? (cp.statusAfter || 'PASS') : (cp.statusBefore || 'FAIL');
      if (STATE.activeCheckpointFilter === 'FAIL') return curStatus === 'FAIL';
      if (STATE.activeCheckpointFilter === 'ALL') return true;
      return categorizeCheckpoint(cp) === STATE.activeCheckpointFilter;
    });

    if (filteredCps.length === 0) {
      listEl.innerHTML = '<div style="padding:14px;font-size:12px;color:#142d49;background:#edf4fc;border:1px solid #8da8be;">No open automated findings in this filter. Manual verification of reading order, alt-text accuracy, contrast, and table semantics is still required.</div>';
      return;
    }

    filteredCps.forEach(cp => {
      const curStatus = isRem ? (cp.statusAfter || 'PASS') : (cp.statusBefore || 'FAIL');
      const isPass = curStatus === 'PASS';
      const evidenceText = isRem ? cp.evidenceAfter : cp.evidenceBefore;

      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'ds-cp-card ' + (isPass ? 'cp-pass' : '');
      card.innerHTML =
        '<div class="ds-cp-top">' +
          '<span class="ds-cp-clause">' + escapeHtml(cp.id) + ' · ' + escapeHtml(cp.clause) + (cp.wcag ? ' · ' + escapeHtml(cp.wcag) : '') + '</span>' +
          '<span class="ds-cp-status-tag ' + (isPass ? 'tag-pass' : 'tag-fail') + '">' + escapeHtml(curStatus) + '</span>' +
        '</div>' +
        '<div class="ds-cp-title">' + escapeHtml(cp.title) + '</div>' +
        '<div class="ds-cp-evidence"><strong>' + (isPass ? 'Signal / Draft:' : 'Finding:') + '</strong> ' + escapeHtml(evidenceText) + '</div>';

      card.addEventListener('click', () => {
        const matchingReg = pkt.visualRegions.find(r => r.checkpointId === cp.id);
        if (matchingReg) {
          STATE.selectedRegionId = matchingReg.id;
          STATE.activeLeftTab = 'visual';
        }
        saveState();
        renderLeftPane();
        if (matchingReg) document.getElementById('selectedRegionInspector').scrollIntoView({ block: 'center' });
      });

      listEl.appendChild(card);
    });
  }

  function renderAll() {
    renderHeaderAndLicenseBar();
    renderLeftPane();
    renderRightScorecard();
    renderBatchResults();
  }

  /* ==========================================================================
     9. EXPORT TAG TREE (.JSON / .XML) & PRINTABLE ASSESSMENT MODAL
     ========================================================================== */
  function buildExportPayloadString(format) {
    const pkt = getActivePacket();
    const isRem = isActivePacketRemediated();
    const stats = assessment(pkt, isRem);

    if (format === 'xml') {
      return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<!-- DocuShield™ Automated Structural Pre-Check & Draft /StructTreeRoot Bundle (Manual Review Required) -->',
        '<DocuShieldAuditPacket id="' + escapeHtml(pkt.id) + '" fileName="' + escapeHtml(pkt.fileName) + '" manualReviewRequired="true" checksPassed="' + stats.passed + '" checksTotal="' + pkt.checkpoints.length + '" status="' + (isRem ? 'TAG_TREE_DRAFT' : 'SOURCE_ASSESSMENT') + '">',
        '  <ConformanceDisclaimer>' + escapeHtml(CONFORMANCE_DISCLAIMER) + '</ConformanceDisclaimer>',
        '  <x:xmpmeta xmlns:x="adobe:ns:meta/">',
        '    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
        '      <rdf:Description rdf:about="" xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/" xmlns:dc="http://purl.org/dc/elements/1.1/">',
        '        <pdfuaid:part>1</pdfuaid:part>',
        '        <dc:title><rdf:Alt><rdf:li xml:lang="x-default">' + escapeHtml(pkt.title) + '</rdf:li></rdf:Alt></dc:title>',
        '        <dc:language><rdf:Bag><rdf:li>en-US</rdf:li></rdf:Bag></dc:language>',
        '      </rdf:Description>',
        '    </rdf:RDF>',
        '  </x:xmpmeta>',
        '  <StructTreeRoot><![CDATA[\n' + getEffectiveStructTreeAfter(pkt) + '\n  ]]></StructTreeRoot>',
        '</DocuShieldAuditPacket>'
      ].join('\n');
    }

    const jsonObj = {
      generator: 'Caliber Foundry — DocuShield™ PDF/UA & Educational PDF Pre-Check Studio',
      timestamp: new Date().toISOString(),
      packetId: pkt.id,
      fileName: pkt.fileName,
      pages: pkt.pages,
      pdfVersion: pkt.pdfVersion,
      remediationStatus: isRem ? 'TAG_TREE_DRAFT' : 'SOURCE_ASSESSMENT',
      assessment: stats,
      compressedStreamsDetected: !!pkt.compressedStreamsDetected,
      conformanceDisclaimer: CONFORMANCE_DISCLAIMER,
      automatedChecksPerformed: pkt.checkpoints.map(cp => cp.title),
      manualReviewRequired: (pkt.manualReviewReasons && pkt.manualReviewReasons.length > 0)
        ? pkt.manualReviewReasons
        : (BATCH_ENGINE ? BATCH_ENGINE.MANUAL_REVIEW_CHECKLIST.map(m => m.title) : ['Reading order', 'Alternative descriptions', 'Table semantics', 'Color contrast']),
      catalogMetadata: isRem && pkt.id !== 'CUSTOM-UPLOAD' ? pkt.metadata.after : pkt.metadata.before,
      matterhornCheckpoints: pkt.checkpoints.map(cp => ({
        id: cp.id,
        clause: cp.clause,
        wcag: cp.wcag,
        status: isRem ? cp.statusAfter : cp.statusBefore,
        evidence: isRem ? cp.evidenceAfter : cp.evidenceBefore
      })),
      remediatedStructTreeRoot: getEffectiveStructTreeAfter(pkt)
    };
    return JSON.stringify(jsonObj, null, 2);
  }

  function openExportModal() {
    const backdrop = document.getElementById('exportModalBackdrop');
    const codeBox = document.getElementById('exportPayloadCodeBox');
    if (!backdrop || !codeBox) return;
    codeBox.textContent = buildExportPayloadString(STATE.activeExportFormat);
    backdrop.classList.remove('hidden');
  }

  function openCertificateModal() {
    const pkt = getActivePacket();
    if (!pkt) return;
    const isRem = isActivePacketRemediated();
    const backdrop = document.getElementById('certificateModalBackdrop');
    const body = document.getElementById('certificateModalBody');
    const titleEl = document.getElementById('certModalTitle');
    if (!backdrop || !body) return;

    if (titleEl) titleEl.textContent = 'Document accessibility assessment';
    const issueDate = new Date().toISOString().slice(0, 10);
    const review = assessment(pkt, isRem);
    const manualItems = (pkt.manualReviewReasons && pkt.manualReviewReasons.length > 0)
      ? pkt.manualReviewReasons
      : (BATCH_ENGINE ? BATCH_ENGINE.MANUAL_REVIEW_CHECKLIST.map(m => m.title + ' (' + m.reference + ')') : ['Reading order', 'Alternative descriptions', 'Table semantics']);

    body.innerHTML =
      '<div class="ds-assessment-report">' +
        '<h3>' + escapeHtml(pkt.fileName) + '</h3>' +
        '<p>' + escapeHtml(pkt.title) + ' · ' + escapeHtml(issueDate) + '</p>' +
        '<h4>' + (isRem ? 'Tag-tree draft assessment' : 'Source assessment') + '</h4>' +
        '<p>' + review.passed + ' / ' + review.total + ' checks passed (' + review.percent + '%). ' + review.failed + ' open findings.</p>' +
        '<div class="ds-conformance-disclaimer" style="margin:10px 0 14px;">' +
          '<strong>Important scope limit:</strong> ' + escapeHtml(CONFORMANCE_DISCLAIMER) +
        '</div>' +
        '<table class="ds-ledger-table" style="margin-bottom:14px;">' +
          '<thead><tr><th>Check ID</th><th>Reference</th><th>Automated Check</th><th>Result</th></tr></thead>' +
          '<tbody>' +
            pkt.checkpoints.map(cp => {
              const st = isRem ? cp.statusAfter : cp.statusBefore;
              return '<tr>' +
                '<td><strong>' + escapeHtml(cp.id) + '</strong></td>' +
                '<td>' + escapeHtml(cp.clause) + (cp.wcag ? '<br/><span style="color:#78756D;">' + escapeHtml(cp.wcag) + '</span>' : '') + '</td>' +
                '<td>' + escapeHtml(cp.title) + '<br/><span style="color:#4A4842;">' + escapeHtml(isRem ? cp.evidenceAfter : cp.evidenceBefore) + '</span></td>' +
                '<td><strong style="color:' + (st === 'PASS' ? '#1A5638' : '#9a3412') + ';">' + (st === 'PASS' ? 'Signal found (PASS)' : 'Missing / open (FAIL)') + '</strong></td>' +
              '</tr>';
            }).join('') +
          '</tbody>' +
        '</table>' +
        '<div style="background:#f5f9fc;border:1px solid #bed0de;padding:10px 12px;margin-bottom:14px;">' +
          '<strong style="font-size:12px;">Required manual review items before conformance sign-off:</strong>' +
          '<ul class="ds-batch-manual-list" style="margin-top:6px;">' +
            manualItems.map(m => '<li>' + escapeHtml(m) + '</li>').join('') +
          '</ul>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #141413;padding-top:10px;font-family:var(--font-mono);font-size:10.5px;color:#4A4842;">' +
          '<span>Prepared by Caliber Foundry · automated document pre-check</span>' +
          '<span>Manual verification required · Not a conformance certificate</span>' +
        '</div>' +
      '</div>';

    backdrop.classList.remove('hidden');
    document.getElementById('btnCloseCertificateModal').focus();
    window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: 'export_ready' } }));
  }

  /* ==========================================================================
     10. FREEMIUM PAYWALL, REGISTRATION & 3-METHOD PAYMENT / INVOICE ENGINE
     ========================================================================== */
  function switchAuthTab(tabKey) {
    document.querySelectorAll('.ds-auth-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-auth-tab') === tabKey);
    });
    document.getElementById('authPanelRegister').classList.toggle('hidden', tabKey !== 'register');
    document.getElementById('authPanelSignIn').classList.toggle('hidden', tabKey !== 'signin');
    document.getElementById('authPanelPayment').classList.toggle('hidden', tabKey !== 'payment');

    if (tabKey === 'payment') {
      syncSelectedPlanUI();
      const plan = PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.ARCHIVE_PACK;
      const org = (STATE.accountUser && STATE.accountUser.organization) || STATE.lastScannedDomain || 'Northwestern University Accessibility Office';
      const email = (STATE.accountUser && STATE.accountUser.email) || 'c.vance@university.edu';
      const po = (document.getElementById('invPoNumberInput') && document.getElementById('invPoNumberInput').value) || 'PO-EAA-2026-881';
      renderCorporateInvoiceBox(org, email, plan.code, po);
    }
  }

  function switchPayMethodTab(methodKey) {
    document.querySelectorAll('.ds-pay-method-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-pay-method') === methodKey);
    });
    document.getElementById('payPanelCard').classList.toggle('hidden', methodKey !== 'card');
    document.getElementById('payPanelInvoice').classList.toggle('hidden', methodKey !== 'invoice');
    document.getElementById('payPanelKey').classList.toggle('hidden', methodKey !== 'key');
  }

  function selectPlanCode(planCode) {
    const plan = PLAN_CATALOG[planCode] || PLAN_CATALOG.ARCHIVE_PACK;
    STATE.selectedPlanCode = plan.code;
    saveState();

    document.querySelectorAll('#planSelectorGrid .ds-plan-card').forEach(card => {
      const isMatch = card.getAttribute('data-plan-code') === plan.code;
      card.classList.toggle('selected', isMatch);
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = isMatch;
    });

    syncSelectedPlanUI();
  }

  function syncSelectedPlanUI() {
    const plan = PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.ARCHIVE_PACK;
    const titleEl = document.getElementById('paymentSelectedPlanTitle');
    if (titleEl) titleEl.textContent = plan.name;

    if (STATE.lastScannedDomain) {
      const regOrg = document.getElementById('regOrganization');
      const invComp = document.getElementById('invCompanyInput');
      if (regOrg && !regOrg.value) regOrg.value = STATE.lastScannedDomain;
      if (invComp) invComp.value = STATE.lastScannedDomain;
    }
  }

  function openPaywallModal(options) {
    const opts = options || {};
    const backdrop = document.getElementById('paywallModalBackdrop');
    if (!backdrop) return;

    const alertBanner = document.getElementById('paywallAlertBanner');
    const alertText = document.getElementById('paywallAlertText');
    const successBox = document.getElementById('activationSuccessBox');

    if (successBox) successBox.classList.add('hidden');
    if (opts.reason) {
      alertBanner.classList.remove('hidden');
      if (alertText) alertText.textContent = opts.reason;
    } else {
      alertBanner.classList.add('hidden');
    }

    selectPlanCode(opts.planCode || STATE.selectedPlanCode || 'ARCHIVE_PACK');
    switchAuthTab(opts.tab || (STATE.accountUser ? 'payment' : 'register'));
    backdrop.classList.remove('hidden');
  }

  function validateAndActivateLicenseKey(rawKey) {
    const clean = String(rawKey || '').trim().toUpperCase();
    const ver = verifyDocuShieldLicenseKey(clean);
    if (!ver.valid) {
      showToast('Invalid license key signature. Complete checkout via Gumroad or Contra (0% fee) to receive your signed license key.');
      return false;
    }

    STATE.licenseTier = ver.tier || 'PRO';
    STATE.licenseKey = clean;
    saveState();

    const alertBanner = document.getElementById('paywallAlertBanner');
    const successBox = document.getElementById('activationSuccessBox');
    const keyHeading = document.getElementById('activationSuccessKeyHeading');

    if (alertBanner) alertBanner.classList.add('hidden');
    if (keyHeading) keyHeading.textContent = 'Active License: ' + (ver.customerTag || 'PRO');
    if (successBox) successBox.classList.remove('hidden');

    renderAll();
    showToast('Activated License (' + (ver.customerTag || 'PRO') + ') — All 6 Sample Packets & Unlimited Batch Unlocked');
    return true;
  }

  function renderCorporateInvoiceBox(companyName, workEmail, planCode, poNumber) {
    const plan = PLAN_CATALOG[planCode] || PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.ARCHIVE_PACK;
    const safeComp = escapeHtml(companyName || 'Enterprise Compliance Client');
    const safeEmail = escapeHtml(workEmail || 'compliance@organization.edu');
    const safePo = escapeHtml(poNumber || 'PO-EAA-2026-881');
    const invNum = 'INV-DS-2026-' + plan.amountUsd + '4';
    const dateStr = new Date().toISOString().slice(0, 10);

    const box = document.getElementById('corporateInvoicePreviewBox');
    if (box) {
      box.innerHTML =
        '<div style="display:flex;justify-content:space-between;border-bottom:1px solid #141413;padding-bottom:6px;margin-bottom:8px;">' +
          '<div><strong>CALIBER FOUNDRY — COMMERCIAL B2B INVOICE</strong><br/><span>Issuer: Caliber Foundry &lt;engineering@caliberfoundry.com&gt;</span></div>' +
          '<div style="text-align:right;"><strong>' + escapeHtml(invNum) + '</strong><br/><span>Date: ' + escapeHtml(dateStr) + ' · Net 15 (ACH / Wire / SEPA)</span></div>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">' +
          '<div><strong>Bill To:</strong> ' + safeComp + '<br/><span>Contact: ' + safeEmail + '</span></div>' +
          '<div style="text-align:right;"><strong>PO Reference:</strong> ' + safePo + '<br/><span style="color:#1A5638;font-weight:700;">Commercial Invoice Draft</span></div>' +
        '</div>' +
        '<div style="border-top:1px solid #C9C4B8;border-bottom:1px solid #C9C4B8;padding:6px 0;margin-bottom:8px;display:flex;justify-content:space-between;">' +
          '<span>1x DocuShield™ — ' + escapeHtml(plan.name) + ' (' + escapeHtml(plan.billingLabel) + ')</span>' +
          '<strong>$' + plan.amountUsd + '.00 USD</strong>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;font-size:11px;color:#4A4842;">' +
          '<span>Pay Online: <a href="https://caliberfoundry.gumroad.com/l/docushield-pro" target="_blank" rel="noopener">Gumroad Card</a> · <a href="https://contra.com/s/2eo62WOe-deal-shieldtm-and-docu-shieldtm-security-ddq-vpat-25-and-pdfua" target="_blank" rel="noopener">Contra B2B (0% Fee)</a></span>' +
          '<strong>Total Due: $' + plan.amountUsd + '.00 USD</strong>' +
        '</div>';
    }

    const mailtoBtn = document.getElementById('btnMailtoInvoice');
    if (mailtoBtn) {
      const subj = encodeURIComponent('DocuShield B2B Invoice & PO Confirmation — ' + invNum + ' (' + companyName + ')');
      const body = encodeURIComponent(
        'Caliber Foundry Billing Team,\n\nPlease process our Purchase Order for DocuShield Studio.\n\n' +
        'Invoice Number: ' + invNum + '\nOrganization: ' + companyName + '\nBilling Email: ' + workEmail +
        '\nSelected Plan: ' + plan.name + ' ($' + plan.amountUsd + '.00 USD)\nPO Number: ' + (poNumber || 'PO-EAA-2026-881') + '\n\nThank you.'
      );
      mailtoBtn.setAttribute('href', 'mailto:engineering@caliberfoundry.com?subject=' + subj + '&body=' + body);
    }

    return {
      invoiceNumber: invNum,
      vendor: 'Caliber Foundry <engineering@caliberfoundry.com>',
      companyName,
      workEmail,
      planCode: plan.code,
      amountUsd: plan.amountUsd,
      provisionalLicenseKey: 'ISSUED_ON_PAYMENT'
    };
  }

  function generateCorporateInvoice(companyName, workEmail, planCode, poNumber) {
    const comp = companyName ||
      (document.getElementById('invCompanyInput') && document.getElementById('invCompanyInput').value.trim()) ||
      (STATE.accountUser && STATE.accountUser.organization) ||
      'Northwestern University Accessibility Office';
    const email = workEmail || (STATE.accountUser && STATE.accountUser.email) || 'c.vance@university.edu';
    const pCode = planCode || STATE.selectedPlanCode || 'ARCHIVE_PACK';
    const po = poNumber ||
      (document.getElementById('invPoNumberInput') && document.getElementById('invPoNumberInput').value.trim()) ||
      'PO-EAA-2026-881';

    const invoiceObj = renderCorporateInvoiceBox(comp, email, pCode, po);
    if (isLocalQaEnvironment()) {
      STATE.licenseTier = 'PRO_PROVISIONAL';
    }
    STATE.lastGeneratedInvoice = invoiceObj;
    saveState();

    const alertBanner = document.getElementById('paywallAlertBanner');
    const successBox = document.getElementById('activationSuccessBox');
    const keyHeading = document.getElementById('activationSuccessKeyHeading');
    if (alertBanner) alertBanner.classList.add('hidden');
    if (keyHeading) keyHeading.textContent = 'Commercial Invoice Issued (' + invoiceObj.invoiceNumber + ')';
    if (successBox && isLocalQaEnvironment()) successBox.classList.remove('hidden');

    renderAll();
    showToast('Generated ' + invoiceObj.invoiceNumber + ' — Complete payment or send PO to receive your license key');
    return invoiceObj;
  }

  /* ==========================================================================
     11. EVENT LISTENERS & INITIALIZATION
     ========================================================================== */
  function initEventListeners() {
    const packetSelect = document.getElementById('packetSelect');
    if (packetSelect) {
      packetSelect.addEventListener('change', () => selectPacket(packetSelect.value));
    }

    document.getElementById('btnHeaderSignIn').addEventListener('click', () => openPaywallModal({ tab: 'signin' }));
    document.getElementById('btnHeaderUnlockPro').addEventListener('click', () => openPaywallModal({ tab: 'register', planCode: 'GROWTH_B2B' }));
    document.getElementById('btnHeaderAccountBilling').addEventListener('click', () => openPaywallModal({ tab: 'payment' }));
    document.getElementById('btnResetStudio').addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      STATE = getDefaultState();
      BATCH_STATE = { summary: null, activePresetId: null, activeBatchFileIndex: -1, rawEntries: [] };
      const progressWrap = document.getElementById('batchProgressWrap');
      if (progressWrap) progressWrap.classList.add('hidden');
      document.getElementById('trojanHorseBanner').classList.add('hidden');
      saveState();
      renderAll();
      showToast('Reset DocuShield™ Studio to fresh diagnostic state');
    });

    // Main single-or-multi file upload & drag-drop
    const fileInput = document.getElementById('fileUploadInput');
    const btnTriggerUpload = document.getElementById('btnTriggerFileUpload');
    const dropZone = document.getElementById('fileDropZone');

    const handleSingleOrMultipleFiles = (fileList) => {
      const files = Array.from(fileList || []).filter(Boolean);
      if (files.length === 0) return;
      if (files.length > 1) {
        handleBatchFileObjects(files);
        return;
      }
      const fileObj = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        inspectCustomFileBuffer(fileObj.name, new Uint8Array(e.target.result), false);
      };
      reader.onerror = () => {
        document.getElementById('dsAssessmentSummary').textContent = 'The file could not be read. Choose it again to retry.';
      };
      reader.readAsArrayBuffer(fileObj);
    };

    if (btnTriggerUpload && fileInput) {
      btnTriggerUpload.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files.length > 0) {
          handleSingleOrMultipleFiles(fileInput.files);
          fileInput.value = '';
        }
      });
    }

    if (dropZone) {
      dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
      dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleSingleOrMultipleFiles(e.dataTransfer.files);
        }
      });
    }

    // Batch Course PDF Check controls (replaces old toast stub!)
    const btnOpenBatch = document.getElementById('btnOpenBatchMode');
    if (btnOpenBatch) {
      btnOpenBatch.addEventListener('click', () => openBatchWorkspace(true));
    }

    const batchFileInput = document.getElementById('batchFileInput');
    const btnBatchUpload = document.getElementById('btnBatchUploadFiles');
    const batchDropZone = document.getElementById('batchDropZone');

    if (btnBatchUpload && batchFileInput) {
      btnBatchUpload.addEventListener('click', () => batchFileInput.click());
      batchFileInput.addEventListener('change', () => {
        if (batchFileInput.files && batchFileInput.files.length > 0) {
          handleBatchFileObjects(batchFileInput.files);
          batchFileInput.value = '';
        }
      });
    }

    if (batchDropZone) {
      batchDropZone.addEventListener('dragover', (e) => { e.preventDefault(); batchDropZone.classList.add('drag-over'); });
      batchDropZone.addEventListener('dragleave', () => batchDropZone.classList.remove('drag-over'));
      batchDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        batchDropZone.classList.remove('drag-over');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleBatchFileObjects(e.dataTransfer.files);
        }
      });
    }

    document.getElementById('btnExportBatchCsv').addEventListener('click', () => {
      if (!BATCH_STATE.summary) return;
      const csv = buildBatchSummaryCsv();
      triggerBlobDownload('DocuShield_Batch_Course_PDF_Summary.csv', csv, 'text/csv;charset=utf-8');
      window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: 'export_ready' } }));
      showToast('Downloaded DocuShield_Batch_Course_PDF_Summary.csv');
    });

    document.getElementById('btnExportBatchJson').addEventListener('click', () => {
      if (!BATCH_STATE.summary) return;
      const json = buildBatchSummaryJson();
      triggerBlobDownload('DocuShield_Batch_Course_PDF_Report.json', json, 'application/json;charset=utf-8');
      window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage: 'export_ready' } }));
      showToast('Downloaded DocuShield_Batch_Course_PDF_Report.json');
    });

    document.getElementById('btnPrintBatchSummary').addEventListener('click', openBatchSummaryModal);

    document.getElementById('btnClearBatch').addEventListener('click', () => {
      BATCH_STATE = { summary: null, activePresetId: null, activeBatchFileIndex: -1, rawEntries: [] };
      const progressWrap = document.getElementById('batchProgressWrap');
      if (progressWrap) progressWrap.classList.add('hidden');
      renderBatchResults();
      showToast('Cleared current batch results');
    });

    // Domain scanner
    const domainScanBtn = document.getElementById('domainScanBtn');
    const domainScanInput = document.getElementById('domainScanInput');
    if (domainScanBtn && domainScanInput) {
      const triggerScan = () => scanDomainOrUrl(domainScanInput.value, null);
      domainScanBtn.addEventListener('click', triggerScan);
      domainScanInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); triggerScan(); }
      });
    }

    document.getElementById('btnTrojanUnlockCta').addEventListener('click', () => {
      openPaywallModal({
        tab: STATE.accountUser ? 'payment' : 'register',
        planCode: 'GROWTH_B2B',
        reason: 'Unlock enterprise remediation profiles and unlimited batch archives for ' + (STATE.lastScannedDomain || 'your organization') + '.'
      });
    });

    document.getElementById('btnCloseTrojanBanner').addEventListener('click', () => {
      document.getElementById('trojanHorseBanner').classList.add('hidden');
    });

    // Toolbar actions — #btnBatchArchiveMode now opens the REAL batch workspace instead of a toast!
    document.getElementById('runRemediationBtn').addEventListener('click', runAutoRemediation);
    document.getElementById('revertRemediationBtn').addEventListener('click', revertRemediation);
    document.getElementById('btnBatchArchiveMode').addEventListener('click', () => {
      openBatchWorkspace(true);
    });

    document.getElementById('btnWebhookApiMode').addEventListener('click', () => {
      if (!isProUnlocked()) {
        openPaywallModal({
          planCode: 'ENTERPRISE_UNI',
          reason: 'GitHub / Canvas LMS / CMS CI/CD Webhook API requires a DocuShield™ PRO or Enterprise license.'
        });
        return;
      }
      openExportModal();
      showToast('Opened JSON/XML payload preview for CI/CD integration');
    });

    document.querySelectorAll('.ds-insp-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        STATE.activeLeftTab = btn.getAttribute('data-left-tab') || 'visual';
        saveState();
        renderLeftPane();
      });
    });

    document.querySelectorAll('#checkpointFilterBar .ds-cp-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        STATE.activeCheckpointFilter = btn.getAttribute('data-cp-filter') || 'ALL';
        saveState();
        renderRightScorecard();
      });
    });

    document.getElementById('exportTagTreeBtn').addEventListener('click', openExportModal);
    document.getElementById('openCertificateBtn').addEventListener('click', openCertificateModal);

    document.getElementById('btnCloseCertificateModal').addEventListener('click', () => {
      document.getElementById('certificateModalBackdrop').classList.add('hidden');
    });
    document.getElementById('btnPrintCertificate').addEventListener('click', () => window.print());
    document.getElementById('btnDownloadAuditBundle').addEventListener('click', () => {
      document.getElementById('certificateModalBackdrop').classList.add('hidden');
      openExportModal();
    });
    document.getElementById('btnCloseExportModal').addEventListener('click', () => {
      document.getElementById('exportModalBackdrop').classList.add('hidden');
    });

    ['btnExportFmtJson', 'btnExportFmtXml'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => {
          STATE.activeExportFormat = btn.getAttribute('data-export-fmt') || 'json';
          document.querySelectorAll('.ds-format-btn').forEach(b => b.classList.toggle('active', b === btn));
          document.getElementById('exportPayloadCodeBox').textContent = buildExportPayloadString(STATE.activeExportFormat);
        });
      }
    });

    document.getElementById('btnCopyExportPayload').addEventListener('click', () => {
      const text = document.getElementById('exportPayloadCodeBox').textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
      showToast('Copied payload to clipboard');
    });

    function downloadAssessment(format) {
      const pkt = getActivePacket();
      const ext = format === 'xml' ? 'xml' : 'json';
      const content = buildExportPayloadString(format);
      triggerBlobDownload(pkt.code + '_PDFUA_Assessment.' + ext, content, ext === 'xml' ? 'application/xml' : 'application/json');
      showToast('Downloaded ' + pkt.code + '_PDFUA_Assessment.' + ext);
    }

    document.getElementById('btnDownloadExportFile').addEventListener('click', () => downloadAssessment(STATE.activeExportFormat));
    document.getElementById('dsDownloadAssessment').addEventListener('click', () => downloadAssessment('json'));

    // Paywall & account modal
    document.getElementById('btnClosePaywallModal').addEventListener('click', () => {
      document.getElementById('paywallModalBackdrop').classList.add('hidden');
    });
    document.querySelectorAll('.ds-auth-tab').forEach(btn => {
      btn.addEventListener('click', () => switchAuthTab(btn.getAttribute('data-auth-tab') || 'register'));
    });
    document.querySelectorAll('#planSelectorGrid .ds-plan-card').forEach(card => {
      card.addEventListener('click', () => selectPlanCode(card.getAttribute('data-plan-code') || 'ARCHIVE_PACK'));
    });

    document.getElementById('registerAccountForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('regFullName').value.trim();
      const organization = document.getElementById('regOrganization').value.trim();
      const email = document.getElementById('regWorkEmail').value.trim();

      STATE.accountUser = { fullName, organization, email };
      saveState();

      const cardHolder = document.getElementById('cardHolderName');
      const cardEmail = document.getElementById('cardBillingEmail');
      const invComp = document.getElementById('invCompanyInput');
      if (cardHolder) cardHolder.value = fullName + ' / ' + organization;
      if (cardEmail) cardEmail.value = email;
      if (invComp) invComp.value = organization;

      renderHeaderAndLicenseBar();
      switchAuthTab('payment');
      showToast('Account created for ' + email + '. Complete activation below.');
    });

    document.getElementById('signInForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signInEmail').value.trim();
      if (!email) return;
      STATE.accountUser = Object.assign({}, STATE.accountUser || {}, {
        fullName: (STATE.accountUser && STATE.accountUser.fullName) || email.split('@')[0],
        organization: (STATE.accountUser && STATE.accountUser.organization) || email.split('@')[1] || 'Enterprise Client',
        email
      });
      saveState();
      renderHeaderAndLicenseBar();

      if (isProUnlocked()) {
        document.getElementById('paywallModalBackdrop').classList.add('hidden');
        showToast('Signed in as ' + email);
      } else {
        switchAuthTab('payment');
        showToast('Signed in as ' + email + '. Activate your Pro plan below.');
      }
    });

    document.querySelectorAll('.ds-pay-method-btn').forEach(btn => {
      btn.addEventListener('click', () => switchPayMethodTab(btn.getAttribute('data-pay-method') || 'card'));
    });

    document.getElementById('cardCheckoutForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const holder = document.getElementById('cardHolderName').value.trim();
      const email = document.getElementById('cardBillingEmail').value.trim();
      if (email) {
        STATE.accountUser = Object.assign({}, STATE.accountUser || {}, { fullName: holder, email });
        saveState();
      }
      if (isLocalQaEnvironment()) {
        STATE.licenseTier = 'PRO';
        saveState();
        renderAll();
        return;
      }
      const gwEl = document.querySelector('#cardCheckoutForm select');
      const gw = gwEl ? gwEl.value : 'gumroad';
      const url = gw === 'contra'
        ? 'https://contra.com/s/2eo62WOe-deal-shieldtm-and-docu-shieldtm-security-ddq-vpat-25-and-pdfua'
        : 'https://caliberfoundry.gumroad.com/l/docushield-pro';
      window.open(url, '_blank', 'noopener');
      switchPayMethodTab('key');
      showToast('Opened secure checkout. Paste the license key from your receipt to unlock DocuShield Pro.');
    });

    document.getElementById('btnGenerateCorporateInvoice').addEventListener('click', () => generateCorporateInvoice());
    document.getElementById('btnPrintCorporateInvoice').addEventListener('click', () => {
      generateCorporateInvoice();
      window.print();
    });
    document.getElementById('btnActivateLicenseKey').addEventListener('click', () => {
      validateAndActivateLicenseKey(document.getElementById('licenseKeyInput').value);
    });

    // Escape closes active modal
    window.addEventListener('keydown', (ev) => {
      if (ev.key !== 'Escape') return;
      ['certificateModalBackdrop', 'exportModalBackdrop', 'paywallModalBackdrop'].forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.classList.contains('hidden')) el.classList.add('hidden');
      });
    });
  }

  function checkDeepLinkUrlParams() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const domainParam = params.get('domain');
      const fileParam = params.get('file');
      const batchParam = params.get('batch');
      if (domainParam) {
        document.getElementById('dsAdvancedWorkspace').open = true;
        scanDomainOrUrl(domainParam, fileParam);
      }
      if (batchParam === '1' || batchParam === 'true') {
        openBatchWorkspace(true);
      }
    } catch (e) {
      // Ignore malformed query string
    }
  }

  function initApp() {
    const pkt = getActivePacket();
    if (pkt && !STATE.selectedRegionId && pkt.visualRegions[0]) {
      STATE.selectedRegionId = pkt.visualRegions[0].id;
    }
    renderBatchScopeReference();
    initEventListeners();

    function openStep(step) {
      if (step === 1) {
        document.getElementById('dsAdvancedWorkspace').open = true;
        STATE.activeLeftTab = 'visual';
        const activePkt = getActivePacket();
        const phase = isActivePacketRemediated() ? 'statusAfter' : 'statusBefore';
        const region = activePkt.visualRegions.find(reg =>
          activePkt.checkpoints.some(cp => cp.id === reg.checkpointId && cp[phase] !== 'PASS')
        ) || activePkt.visualRegions[0];
        STATE.selectedRegionId = region ? region.id : null;
        renderAll();
        const target = document.getElementById('selectedRegionInspector');
        target.focus();
        target.scrollIntoView({ block: 'center' });
      } else if (step === 2) {
        runAutoRemediation();
        document.getElementById('dsAssessmentSummary').focus();
      } else if (step === 3) {
        openCertificateModal();
      }
    }

    window.addEventListener('cf:open-step', event => openStep(Number(event.detail && event.detail.step)));
    document.getElementById('dsReviewResults').addEventListener('click', () => openStep(1));
    document.getElementById('dsOpenReport').addEventListener('click', () => openStep(3));
    renderAll();
    checkDeepLinkUrlParams();
    try {
      const autoStep = new URLSearchParams(window.location.search || '').get('autoProof');
      if (/^[123]$/.test(autoStep || '') && !window.__CF_TELEMETRY_ACTIVE__) {
        openStep(Number(autoStep));
      }
    } catch (_) {}
  }

  /* ==========================================================================
     12. PUBLIC PROGRAMMATIC API (`window.DocuShieldApp`) FOR E2E TEST HARNESS
     ========================================================================== */
  if (typeof window !== 'undefined') {
    window.DocuShieldApp = {
      getDataset: () => DATASET,
      getState: () => STATE,
      selectPacket,
      runAutoRemediation,
      revertRemediation,
      inspectCustomFileBuffer,
      scanDomainOrUrl,
      validateAndActivateLicenseKey,
      generateCorporateInvoice,
      openPaywallModal,
      openCertificateModal,
      openExportModal,
      openBatchWorkspace,
      runBatchBuffers,
      runEducationalPresetBatch,
      inspectBatchItem,
      getLastBatchSummary: () => BATCH_STATE.summary,
      buildBatchSummaryCsv,
      buildBatchSummaryJson,
      openBatchSummaryModal,
      escapeHtml
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
