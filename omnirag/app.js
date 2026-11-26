/**
 * OmniRAG™ — Local Document Evidence Verifier & Due Diligence Pack ($249)
 * OmniRAG™ Production Workbench (caliberfoundry.com/omnirag/)
 *
 * Capabilities:
 *   - 3 built-in sample packs (preserving first-screen verification journey)
 *   - Real client-side binary PDF text-stream parser (uncompressed + FlateDecode)
 *   - Real client-side RFC-4180 CSV & TSV spreadsheet parser + plain text parser
 *   - Automated cross-document numeric & clause discrepancy verification
 *   - Print-ready Due Diligence Evidence Dossier (@media print + JSON + CSV)
 *   - Freemium boundary (2 files free / up to 12 files with $249 Pack)
 *   - Local purchase request generator + RSA-512 license verifier
 *
 * Security: Strict escapeHtml() on every dynamic HTML sink, 0 inline handlers, 0 external payments.
 */

(function () {
  'use strict';
  const receipt = window.createGumroadReceiptVerifier('6xYvQh92wtkxQlp8C3Vu-A==', 'PRO');

  const STORAGE_KEY = 'cf_omnirag_plan53_state_v1';
  const FREE_FILE_LIMIT = 2;
  const PRO_FILE_LIMIT = 12;

  const CF_RSA_PUBLIC_MODULUS_B36 =
    '131IRZHBZ87C6IXGX2XD8YG1YLYMJJZPTAXPXIAZ82NVXKGRA4E2P1ECVL1P7M5FNMHF899RJ4TODBM6QO1A0V2NHIO8DZ9DEBF7';

  const PLANS = {
    DD_PACK_249: {
      code: 'DD_PACK_249',
      name: 'OmniRAG™ Due Diligence Pack',
      shortLabel: '$249 Pack',
      amountUsd: 249,
      billingCycle: 'One-time license (up to 12 local files per session)',
      tier: 'PRO'
    },
    TEAM_499: {
      code: 'TEAM_499',
      name: 'OmniRAG™ Audit Team License',
      shortLabel: '$499 / mo',
      amountUsd: 499,
      billingCycle: 'Monthly team license (up to 5 reviewers)',
      tier: 'TEAM'
    },
    SPRINT_2500: {
      code: 'SPRINT_2500',
      name: 'OmniRAG™ Custom Document Pipeline Sprint',
      shortLabel: '$2,500 Sprint',
      amountUsd: 2500,
      billingCycle: 'Fixed-price async engineering sprint (custom formats & connectors)',
      tier: 'ENTERPRISE'
    }
  };

  /* =========================================================================
     1. BUILT-IN SAMPLE DOCUMENT PACKS (REUSED FROM LIVE OMNIRAG)
     ========================================================================= */
  const PRESETS = {
    enterprise_rag: {
      title: '1. Financial & Contract Audit',
      shortName: 'Financial audit',
      badge: 'BUILT-IN SAMPLE PACK · FINANCIAL & CONTRACT AUDIT',
      docs: [
        {
          id: 'doc_xlsx',
          name: 'Q3_Financials.xlsx',
          format: 'Sample Table',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'cit_xlsx_r12',
              coord: 'Sheet 2, Row 12 (Cell D12)',
              title: 'Annual Recurring Revenue & Gross Margin',
              text: 'Row 12 | Enterprise Tier Revenue: $14,820,000 | Gross Margin: 81.4% | Year-over-Year Growth: +34.2%.'
            },
            {
              id: 'cit_xlsx_r14',
              coord: 'Sheet 2, Row 14 (Cell F14)',
              title: 'Quarterly SLA Penalty Reserve Limit',
              text: 'Row 14 | Maximum SLA Penalty Cap: $285,000 per quarter (strictly capped at 12.0% of quarterly contract billings).'
            },
            {
              id: 'cit_xlsx_r19',
              coord: 'Sheet 2, Row 19 (Cell E19)',
              title: 'Q3 Operating Profit (Adjusted EBITDA)',
              text: 'Row 19 | Q3 Operating Profit (EBITDA): $4,190,000 (28.2% margin) | Cloud Compute Spend: $142,500.'
            }
          ]
        },
        {
          id: 'doc_docx',
          name: 'Master_Service_Agreement.docx',
          format: 'Sample Contract',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'cit_docx_s42',
              coord: 'Page 7, Section §4.2',
              title: 'Contractual Penalty Cap (12% / $285,000)',
              text: "§4.2 Service Credits: In no event shall Provider's cumulative SLA credit obligation exceed twelve percent (12.0%) of Customer's quarterly recurring fees ($285,000 cap)."
            },
            {
              id: 'cit_docx_s61',
              coord: 'Page 11, Section §6.1',
              title: 'Customer Data Privacy & Zero Retention',
              text: '§6.1 Data Governance: All customer documents are isolated per account with zero third-party model training retention.'
            }
          ]
        },
        {
          id: 'doc_pdf',
          name: 'Board_Audit_Report_2026.pdf',
          format: 'Sample PDF',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'cit_pdf_p4',
              coord: 'Page 4, Table 2.1',
              title: 'Auditor Sign-Off on Q3 Profit Minimum',
              text: 'Page 4, Table 2.1: Independent auditor confirms Q3 profit of $4.19M exceeds the $3.50M minimum requirement by +19.7%.'
            },
            {
              id: 'cit_pdf_p9',
              coord: 'Page 9, Paragraph 3',
              title: '100% Source Citation Verification Rule',
              text: 'Page 9, Para 3: Every automated check links directly to the exact page number and spreadsheet row before approval.'
            }
          ]
        }
      ]
    },

    agentpress_mcp: {
      title: '2. Sales Order & Discount Approval',
      shortName: 'Sales order',
      badge: 'BUILT-IN SAMPLE PACK · SALES ORDER vs. PRICING RULES',
      docs: [
        {
          id: 'ap_pdf',
          name: 'Acme_Enterprise_OrderForm.pdf',
          format: 'Sample PDF',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'ap_cit_p3',
              coord: 'Page 3, Section 2 (Order Schedule)',
              title: 'Acme Corp 3-Year Order ($240,000/yr, 18.5% Discount)',
              text: 'Page 3, Section 2: 250 Seats @ $80/seat/mo ($240,000 Annual Contract Value). Requested Discount: 18.5% off list price.'
            },
            {
              id: 'ap_cit_p5',
              coord: 'Page 5, Rider B',
              title: 'Requested Salesforce & Slack Integration Add-On',
              text: 'Page 5, Rider B: Customer requests bi-directional Salesforce CRM, Slack, and Stripe integration bundle included at $0.'
            }
          ]
        },
        {
          id: 'ap_xlsx',
          name: 'RevOps_DealDesk_Matrix.xlsx',
          format: 'Sample Table',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'ap_cit_r8',
              coord: 'Sheet 1, Row 8 (Approval Tier 2)',
              title: 'Maximum Allowed Discount (Up to 20.0%)',
              text: 'Row 8 | Deal Size: $200k–$500k | Max Auto-Approved Discount: 20.0% on 3-Year Contracts | Minimum Margin: 78.0%.'
            },
            {
              id: 'ap_cit_r15',
              coord: 'Sheet 1, Row 15 (Add-On Rules)',
              title: 'Free Integration Bundle Rule (Orders >= $200k)',
              text: 'Row 15 | Integration Bundle SKU: Included free of charge ($0) for any contract >= $200,000/year.'
            }
          ]
        },
        {
          id: 'ap_docx',
          name: 'Security_DPA_Addendum.docx',
          format: 'Sample Contract',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'ap_cit_s31',
              coord: 'Page 4, Clause §3.1',
              title: 'Pre-Approved Security Terms',
              text: '§3.1 Data Protection: Standard zero-retention security terms are pre-approved by Legal.'
            }
          ]
        }
      ]
    },

    buildq_solar: {
      title: '3. Engineering Permit vs. Equipment BOM',
      shortName: 'Engineering permit',
      badge: 'BUILT-IN SAMPLE PACK · ENGINEERING PERMIT vs. BOM',
      docs: [
        {
          id: 'bq_grid_pdf',
          name: 'Grid_Interconnection_Study.pdf',
          format: 'Sample PDF',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'bq_cit_p18',
              coord: 'Page 18, Table 3 (Grid Limit)',
              title: 'Permit Limit: Maximum 42.5 MW Allowed',
              text: 'Page 18, Table 3 | Official Grid Limit: Maximum continuous power injection at the substation is strictly capped at 42.5 MW AC unless an $11.4M transformer upgrade is paid.'
            }
          ]
        },
        {
          id: 'bq_epc_xlsx',
          name: 'EPC_Engineering_Spec.xlsx',
          format: 'Sample Table',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'bq_cit_r9',
              coord: 'Sheet 1, Row 9 (Equipment List)',
              title: 'MISMATCH: Equipment Orders 50.0 MW of Inverters',
              text: 'Row 9 | Scheduled Inverter Equipment: 20 x 2.5 MW = 50.0 MW AC capacity (Exceeds the 42.5 MW PDF permit limit by +7.5 MW!).'
            },
            {
              id: 'bq_cit_r22',
              coord: 'Sheet 1, Row 22 (Project Timeline)',
              title: '35-Year Financial Horizon (Ends Dec 31, 2061)',
              text: 'Row 22 | Project Finance Timeline: 35 Years aligned with December 31, 2061 land lease expiration.'
            }
          ]
        },
        {
          id: 'bq_lease_pdf',
          name: 'Solar_Land_Lease.pdf',
          format: 'Sample PDF',
          statusNote: 'Built-in sample',
          chunks: [
            {
              id: 'bq_cit_p4',
              coord: 'Page 4, Section §3.2',
              title: '35-Year Land Lease Term (Ends Dec 31, 2061)',
              text: 'Page 4, §3.2: Landowner grants 480 contiguous acres in Travis County, TX for 35 years (expiring December 31, 2061).'
            }
          ]
        }
      ]
    }
  };

  const QUESTIONS = {
    enterprise_rag: [
      ['What is the Q3 debt floor?', ['Compare Q3 profit vs. contract debt floor', 'What is the Q3 profit minimum?'], ['cit_pdf_p4', 'cit_xlsx_r19']],
      ['What is the penalty cap?', ['Check if the $285,000 penalty cap matches across Excel and Word'], ['cit_xlsx_r14', 'cit_docx_s42']],
      ['What is the data retention policy?', [], ['cit_docx_s61']]
    ],
    agentpress_mcp: [
      ["Is Acme Corp's 18.5% discount allowed under our pricing rules?", ['What discount is allowed?'], ['ap_cit_p3', 'ap_cit_r8']],
      ['Does the $240k order qualify for the free integration bundle?', [], ['ap_cit_p3', 'ap_cit_r15']],
      ['Which security terms are pre-approved?', [], ['ap_cit_s31']]
    ],
    buildq_solar: [
      ['Show the exact MW power mismatch between the PDF permit and Excel', ['What is the power limit?'], ['bq_cit_p18', 'bq_cit_r9']],
      ['Verify if the 35-year land lease date matches the financial model', [], ['bq_cit_r22', 'bq_cit_p4']],
      ['How many acres does the lease cover?', [], ['bq_cit_p4']]
    ]
  };

  const STOPWORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'check', 'compare', 'does',
    'for', 'from', 'how', 'if', 'in', 'is', 'it', 'of', 'on', 'or', 'our', 'per',
    'show', 'that', 'the', 'their', 'this', 'to', 'under', 'verify', 'vs', 'what',
    'which', 'with', 'across', 'between', 'file', 'files', 'document', 'documents'
  ]);

  const GENERIC_QUALIFIERS = new Set([
    'maximum', 'minimum', 'limit', 'cap', 'value', 'note', 'section', 'page', 'row',
    'total', 'reported', 'scheduled', 'metric', 'audit', 'compliance', 'unit', 'terms',
    'category', 'item', 'code', 'strictly', 'capped', 'verified', 'matches', 'exceeds',
    'against', 'schedule', 'usd', 'day', 'days', 'year', 'years'
  ]);

  /* =========================================================================
     2. APPLICATION STATE & PERSISTENCE
     ========================================================================= */
  const state = {
    activeMode: 'sample', // 'sample' | 'uploaded'
    currentPresetKey: 'enterprise_rag',
    currentDocId: 'doc_xlsx',
    highlightedChunkId: 'cit_xlsx_r12',
    uploadedDocs: [],
    crossFindings: [],
    pendingExcessFiles: [],
    answers: [],
    comparison: null,
    returnToAnswer: null,
    selectedPlanCode: 'DD_PACK_249',
    licenseTier: 'FREE', // 'FREE' | 'PRO' | 'TEAM' | 'ENTERPRISE'
    licenseKey: '',
    licenseCustomer: '',
    lastInvoice: null,
    lastDossierId: ''
  };

  async function loadPersistedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.selectedPlanCode && PLANS[saved.selectedPlanCode]) {
        state.selectedPlanCode = saved.selectedPlanCode;
      }
      if (saved.lastInvoice && saved.lastInvoice.invoiceId) {
        const draft = saved.lastInvoice;
        delete draft.dueDate;
        state.lastInvoice = {...draft, status:'draft', documentType:'pro_forma_purchase_request', paymentTerms:'Subject to billing confirmation'};
      }
      if (saved.licenseKey) {
        if (receipt.matches(saved.licenseKey)) {
          try { await receipt.check(saved.licenseKey); }
          catch (error) { document.getElementById('receiptStatus').textContent = error.message; }
        }
        const ver = verifyOmniLicenseKey(saved.licenseKey);
        if (ver.valid) {
          state.licenseTier = ver.tier;
          state.licenseKey = saved.licenseKey;
          state.licenseCustomer = ver.customerTag || 'PRO';
        }
      }
    } catch (_) {}
  }

  function savePersistedState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedPlanCode: state.selectedPlanCode,
          licenseTier: state.licenseTier,
          licenseKey: state.licenseKey,
          licenseCustomer: state.licenseCustomer,
          lastInvoice: state.lastInvoice
        })
      );
    } catch (_) {}
  }

  function isProUnlocked() {
    return Boolean(state.licenseKey && verifyOmniLicenseKey(state.licenseKey).valid);
  }

  function activeFileLimit() {
    return isProUnlocked() ? PRO_FILE_LIMIT : FREE_FILE_LIMIT;
  }

  /* =========================================================================
     3. SECURITY, HASHING & RSA-512 LICENSE VERIFICATION
     ========================================================================= */
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalized(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFKC').replace(/[^\p{L}\p{N}$%.]+/gu, ' ')
      .trim();
  }

  function tokenizeKeywords(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  }

  function deterministicHash(input) {
    let h1 = 0xdeadbeef ^ input.length;
    let h2 = 0x41c6ce57 ^ input.length;
    for (let i = 0; i < input.length; i++) {
      const ch = input.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  }

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
    let b = base % mod;
    let e = exp;
    while (e > 0n) {
      if (e & 1n) res = (res * b) % mod;
      e >>= 1n;
      b = (b * b) % mod;
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
    return seeds.map((n) => (n >>> 0).toString(16).padStart(8, '0')).join('');
  }

  function verifyOmniLicenseKey(rawKey) {
    if (receipt.matches(rawKey)) return receipt.decision(rawKey);
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
        if (prod === 'OMNI' || prod === 'ALL') {
          const N = cfBase36ToBigInt(CF_RSA_PUBLIC_MODULUS_B36);
          const sigBig = cfBase36ToBigInt(sigB36);
          if (sigBig > 0n && sigBig < N) {
            const recovered = cfModPow(sigBig, 65537n, N);
            const header = hasExp
              ? 'CFK-' + prod + '-' + tier + '-' + cust + '-' + expYmd
              : 'CFK-' + prod + '-' + tier + '-' + cust;
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
              return {
                valid: true,
                tier: tier === 'ENT' ? 'ENTERPRISE' : tier === 'TEAM' ? 'TEAM' : 'PRO',
                customerTag: cust,
                expiresIso
              };
            }
          }
        }
      } catch (_) {}
    }
    return { valid: false };
  }

  function workflow(stage) {
    window.dispatchEvent(new CustomEvent('cf:workflow', { detail: { stage } }));
  }

  /* =========================================================================
     4. REAL CLIENT-SIDE PARSERS: CSV/TSV, PDF (UNCOMPRESSED + FLATE), TXT
     ========================================================================= */
  /* =========================================================================
     5. AUTOMATED CROSS-DOCUMENT NUMERIC & CLAUSE DISCREPANCY ENGINE
     ========================================================================= */
  function extractStructuredMetrics(text) {
    return window.OmniFigures.measure(text).filter(figure => figure.unit);
  }

  function formatMetricValue(metric) {
    if (metric.unit === 'USD') {
      return '$' + Number(metric.value).toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    if (metric.unit === 'MW') return metric.value + ' MW';
    if (metric.unit === 'EUR' || metric.unit === 'GBP') return metric.unit + ' ' + metric.value;
    if (metric.unit === '%') return metric.value + '%';
    if (metric.unit === 'DAYS') return metric.value + ' days';
    if (metric.unit === 'YEARS') return metric.value + ' years';
    return metric.raw;
  }

  function runCrossDocumentChecks(docs) {
    const validDocs = docs.filter((d) => !d.parseError && d.chunks && d.chunks.length);
    state.crossCheckLimited = false;
    if (validDocs.length < 2) return [];

    const indexedByDoc = new Map();
    for (const doc of validDocs) {
      const indexed = [];
      for (const chunk of doc.chunks) {
        const metrics = new Map();
        for (const metric of extractStructuredMetrics(chunk.text)) {
          // Multiple figures with the same unit could refer to different years or clauses.
          metrics.set(metric.unit, metrics.has(metric.unit) ? null : metric);
        }
        if (!metrics.size) continue;
        const keywords = new Set(tokenizeKeywords(chunk.title + ' ' + chunk.text));
        indexed.push({doc, chunk, keywords, metrics});
      }
      if (indexed.length) indexedByDoc.set(doc.id, indexed);
    }
    const groups = [...indexedByDoc.values()];
    let pairCount = 0, previous = 0;
    for (const group of groups) { pairCount += previous * group.length; previous += group.length; }
    if (pairCount > 100000) {
      state.crossCheckLimited = true;
      return [];
    }
    const candidates = [];

    for (const [idx, group] of groups.entries()) {
      const otherDocs = groups.slice(idx + 1).flat();
      for (const a of group) for (const b of otherDocs) {

        const shared = [];
        const domainShared = [];
        a.keywords.forEach((kw) => {
          if (b.keywords.has(kw)) {
            shared.push(kw);
            if (!GENERIC_QUALIFIERS.has(kw)) domainShared.push(kw);
          }
        });
        if (shared.length < 2 || domainShared.length < 1) continue;

        const topic = (domainShared.length >= 2 ? domainShared : shared).slice(0, 4).join(' · ');
        for (const [unit, metricA] of a.metrics) {
          const metricB = b.metrics.get(unit);
          if (!metricA || !metricB) continue;
          candidates.push({
            status: metricA.value === metricB.value ? 'MATCH' : 'MISMATCH',
            unit, topic, domainScore: domainShared.length * 3 + shared.length,
            valueA: formatMetricValue(metricA), valueB: formatMetricValue(metricB),
            docA:a.doc, chunkA:a.chunk, docB:b.doc, chunkB:b.chunk
          });
        }
      }
    }

    // Keep highest-specificity 1:1 pairing per (chunkA, docB) to avoid cross-clause noise
    candidates.sort((x, y) => y.domainScore - x.domainScore);
    const usedPairSlots = new Set();
    const findings = [];
    for (const c of candidates) {
      const slotA = c.docA.id + ':' + c.chunkA.id + '->' + c.docB.id + ':' + c.unit;
      const slotB = c.docB.id + ':' + c.chunkB.id + '->' + c.docA.id + ':' + c.unit;
      if (usedPairSlots.has(slotA) || usedPairSlots.has(slotB)) continue;
      usedPairSlots.add(slotA);
      usedPairSlots.add(slotB);
      findings.push(Object.assign({ id: 'xc_' + findings.length }, c));
    }

    // Sort: mismatches first, then stronger domain overlap
    findings.sort((x, y) => {
      if (x.status !== y.status) return x.status === 'MISMATCH' ? -1 : 1;
      return y.domainScore - x.domainScore;
    });

    return findings.slice(0, 8);
  }

  /* =========================================================================
     6. ACTIVE PACK HELPERS & CITATION-LOCKED SEARCH
     ========================================================================= */
  function activeBaseDocs() {
    if (state.activeMode === 'uploaded' && state.uploadedDocs.length > 0) {
      return state.uploadedDocs;
    }
    return PRESETS[state.currentPresetKey].docs;
  }

  function availableDocs() {
    const docs = activeBaseDocs();
    if (!state.comparison) return docs;
    return docs.concat(
      ['a', 'b'].map((key) => ({
        id: 'pasted_' + key,
        name: 'Pasted passage ' + key.toUpperCase(),
        format: 'Text',
        statusNote: 'Manual comparison',
        chunks: [
          {
            id: 'cit_custom_' + key,
            coord: 'User input',
            title: 'Compared passage ' + key.toUpperCase(),
            text: state.comparison['source_' + key]
          }
        ]
      }))
    );
  }

  function activePackTitle() {
    if (state.activeMode === 'uploaded' && state.uploadedDocs.length > 0) {
      return 'Local Uploaded Pack (' + state.uploadedDocs.length + ' file' + (state.uploadedDocs.length === 1 ? '' : 's') + ')';
    }
    return PRESETS[state.currentPresetKey].title;
  }

  function buildUploadedSuggestedQuestions() {
    const qs = [];
    if (state.crossFindings.length > 0) {
      const firstMismatch = state.crossFindings.find((f) => f.status === 'MISMATCH');
      if (firstMismatch) {
        qs.push('Check mismatch: ' + firstMismatch.topic.replace(/\s*·\s*/g, ' '));
      }
      const firstMatch = state.crossFindings.find((f) => f.status === 'MATCH');
      if (firstMatch) {
        qs.push('Verify matching figure: ' + firstMatch.topic.replace(/\s*·\s*/g, ' '));
      }
    }
    // Fill up to 3 concrete suggested questions from actual parsed chunks (ADR-023)
    const docs = state.uploadedDocs;
    for (let d = 0; d < docs.length && qs.length < 3; d++) {
      for (let c = 0; c < docs[d].chunks.length && qs.length < 3; c++) {
        const ch = docs[d].chunks[c];
        const kws = tokenizeKeywords(ch.title + ' ' + ch.text);
        if (kws.length >= 2) {
          const candidate = 'Find evidence for ' + kws.slice(0, 3).join(' ');
          if (!qs.includes(candidate)) qs.push(candidate);
        }
      }
    }
    while (qs.length < 3) {
      qs.push('List key figures in uploaded pack (' + (qs.length + 1) + ')');
    }
    return qs.slice(0, 3);
  }

  function findEvidenceMatches(query) {
    const docs = activeBaseDocs();
    const passages = docs.flatMap((doc) => doc.chunks.map((chunk) => ({ doc, chunk })));
    const phrase = normalized(query);

    // 1. Exact built-in sample question lookup (preserves verify_product_first_results.cjs 100%)
    if (state.activeMode === 'sample') {
      const known = QUESTIONS[state.currentPresetKey].find(([question, aliases]) =>
        [question, ...aliases].some((val) => normalized(val) === phrase)
      );
      if (known) {
        return known[2].map((id) => passages.find(({ chunk }) => chunk.id === id)).filter(Boolean);
      }
    }

    // 2. Exact normalized phrase substring match
    if (phrase.length >= 4) {
      const exactMatches = passages.filter(
        ({ chunk }) => normalized(chunk.text).includes(phrase) || normalized(chunk.title).includes(phrase)
      );
      if (exactMatches.length > 0) return exactMatches.slice(0, 4);
    }

    // 3. Token & numeric overlap scoring (strict minimum threshold -> zero hallucination)
    const queryTokens = Array.from(new Set(tokenizeKeywords(query).filter(word => !/^\d+$/.test(word))));
    const queryNums = (query.match(/\$?[\d,]+(?:\.\d+)?/g) || []).map((n) => n.replace(/[$,]/g, ''));

    if (queryTokens.length === 0 && queryNums.length === 0) return [];

    const scored = [];
    passages.forEach((entry) => {
      const hay = (entry.chunk.title + ' ' + entry.chunk.text).toLowerCase();
      const hayCleanNums = (hay.match(/\$?[\d,]+(?:\.\d+)?/g) || []).map((n) => n.replace(/[$,]/g, ''));
      let score = 0;
      let tokenHits = 0;

      const passageTokens = new Set(tokenizeKeywords(hay));
      queryTokens.forEach((tk) => {
        if (passageTokens.has(tk)) {
          tokenHits++;
          score += tk.length >= 6 ? 3 : 2;
        }
      });

      let numHits = 0;
      queryNums.forEach((qn) => {
        if (qn.length >= 2 && hayCleanNums.includes(qn)) {
          numHits++;
          score += /^(19|20)\d{2}$/.test(qn) ? 1 : 5;
        }
      });

      // Require >= 2 meaningful token hits, OR 1 exact number + 1 keyword, OR 1 long specific keyword (>= 7 chars) on uploaded docs
      const qualifies =
        tokenHits >= 2 ||
        (numHits >= 1 && (tokenHits >= 1 || queryTokens.length === 0)) ||
        (state.activeMode === 'uploaded' && tokenHits === 1 && queryTokens.length === 1 && queryTokens[0].length >= 5);

      if (qualifies) {
        scored.push({ entry, score });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((s) => s.entry);
  }

  /* =========================================================================
     7. RENDERING UI COMPONENTS
     ========================================================================= */
  function setActiveStep(stepNum) {
    document.querySelectorAll('.om-step-btn').forEach((btn) => {
      btn.classList.toggle('is-active', Number(btn.getAttribute('data-workflow-step')) === stepNum);
    });
  }

  function renderLicenseHeader() {
    const pill = document.getElementById('omLicenseStatusPill');
    const headerBtn = document.getElementById('btnOpenPaywall');
    const footerBtn = document.getElementById('btnOpenPaywallFooter');
    const uploadMeta = document.getElementById('omUploadSummaryMeta');
    const forgetButton = document.getElementById('btnResetLocalLicense');

    const unlocked = isProUnlocked();
    const limit = activeFileLimit();

    if (pill) {
      if (unlocked) {
        pill.textContent = state.licenseTier + ' Active · up to ' + limit + ' files';
        pill.classList.add('is-unlocked');
      } else {
        pill.textContent = 'Free · ' + FREE_FILE_LIMIT + ' local files';
        pill.classList.remove('is-unlocked');
      }
    }

    if (headerBtn) {
      headerBtn.textContent = unlocked ? 'License and purchase request' : 'Due Diligence Pack ($249)';
    }
    if (footerBtn) {
      footerBtn.textContent = unlocked ? 'Purchase Request & License' : 'Unlock $249 Pack & Purchase Request';
    }
    if (uploadMeta) {
      const count = state.uploadedDocs.length;
      uploadMeta.textContent = unlocked
        ? count + ' uploaded · Active limit: ' + limit + ' files'
        : count + ' uploaded · Free limit: ' + FREE_FILE_LIMIT + ' files ($249: up to ' + PRO_FILE_LIMIT + ')';
    }
    if (forgetButton) forgetButton.classList.toggle('om-hidden', !unlocked);
  }

  function renderPromptChips() {
    const chipsDiv = document.getElementById('promptChipsContainer');
    const packNameEl = document.getElementById('omPackName');
    if (!chipsDiv) return;

    const questionsList =
      state.activeMode === 'uploaded' && state.uploadedDocs.length > 0
        ? buildUploadedSuggestedQuestions()
        : QUESTIONS[state.currentPresetKey].map(([q]) => q);

    if (packNameEl) {
      packNameEl.textContent =
        state.activeMode === 'uploaded' && state.uploadedDocs.length > 0
          ? 'Uploaded pack (' + state.uploadedDocs.length + ' file' + (state.uploadedDocs.length === 1 ? '' : 's') + ')'
          : PRESETS[state.currentPresetKey].shortName;
    }

    chipsDiv.replaceChildren(
      ...questionsList.map((question) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'prompt-chip';
        chip.textContent = question;
        chip.addEventListener('click', () => runPromptChip(question));
        return chip;
      })
    );
  }

  function renderDocumentTabs() {
    const docs = availableDocs();
    const container = document.getElementById('docTabsContainer');
    const summaryMeta = document.getElementById('omSourcesSummaryMeta');
    if (summaryMeta) {
      const totalChunks = docs.reduce((sum, d) => sum + d.chunks.length, 0);
      summaryMeta.textContent = docs.length + ' document' + (docs.length === 1 ? '' : 's') + ' · ' + totalChunks + ' passages';
    }
    if (!container) return;

    container.replaceChildren(
      ...docs.map((doc) => {
        const active = doc.id === state.currentDocId;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-tactile' + (active ? ' btn-tactile-ink' : '');
        btn.textContent = doc.format + ': ' + doc.name;
        btn.addEventListener('click', () => selectDocTab(doc.id));
        return btn;
      })
    );
  }

  function renderDocumentViewport() {
    const docs = availableDocs();
    const doc = docs.find((d) => d.id === state.currentDocId) || docs[0];
    const viewport = document.getElementById('documentViewport');
    if (!viewport || !doc) return;

    viewport.innerHTML = doc.chunks
      .map((chunk) => {
        const isHighlighted = chunk.id === state.highlightedChunkId;
        return (
          '<div id="chunk_' +
          escapeHtml(chunk.id) +
          '" data-doc-id="' +
          escapeHtml(doc.id) +
          '" data-chunk-id="' +
          escapeHtml(chunk.id) +
          '" class="doc-chunk ' +
          (isHighlighted ? 'source-highlighted' : '') +
          '">' +
          '<div class="chunk-head">' +
          '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
          '<span class="chunk-coord-pill">' +
          escapeHtml(displayDocument(doc)) +
          ' &mdash; ' +
          escapeHtml(chunk.coord) +
          '</span>' +
          '<strong style="font-size:13.5px;">' +
          escapeHtml(chunk.title) +
          '</strong>' +
          '</div>' +
          '<span class="mono" style="font-size:11px;font-weight:600;color:' +
          (isHighlighted ? 'var(--om-deep)' : 'var(--om-muted)') +
          ';">' +
          (isHighlighted ? 'Selected passage' : 'Select passage') +
          '</span>' +
          '</div>' +
          '<p class="chunk-body-text">&ldquo;' +
          escapeHtml(chunk.text) +
          '&rdquo;</p>' +
          '</div>'
        );
      })
      .join('');
  }

  function renderUploadedFilesAndChecks() {
    const listEl = document.getElementById('omUploadedFilesList');
    const crossEl = document.getElementById('omCrossCheckPanel');
    const clearBtn = document.getElementById('btnClearUploads');

    if (clearBtn) clearBtn.hidden = state.uploadedDocs.length === 0;
    renderLicenseHeader();

    if (listEl) {
      if (state.uploadedDocs.length === 0) {
        listEl.replaceChildren();
      } else {
        listEl.innerHTML = state.uploadedDocs
          .map(
            (doc) =>
              '<div class="om-file-card">' +
              '<div class="om-file-card-top">' +
              '<span class="om-file-name">' +
              escapeHtml(displayDocument(doc)) +
              '</span>' +
              '<button type="button" class="om-file-remove" data-remove-doc="' +
              escapeHtml(doc.id) +
              '" aria-label="Remove ' +
              escapeHtml(displayDocument(doc)) +
              '">Remove</button>' +
              '</div>' +
              '<div class="om-file-meta">' +
              escapeHtml(doc.format) +
              ' · ' +
              escapeHtml(Math.max(1, Math.round((doc.byteLength || 0) / 1024)) + ' KB') +
              ' · ' +
              escapeHtml(doc.statusNote || '') +
              '</div>' +
              '</div>'
          )
          .join('');
      }
    }

    if (crossEl) {
      if (state.uploadedDocs.length < 2) {
        crossEl.classList.add('om-hidden');
        crossEl.replaceChildren();
      } else {
        crossEl.classList.remove('om-hidden');
        if (state.crossCheckLimited) {
          crossEl.textContent = 'Automatic candidate comparison exceeds 100,000 numeric passage pairs. Search the indexed documents or choose a smaller pack.';
        } else if (state.crossFindings.length === 0) {
          crossEl.innerHTML =
            '<div class="om-crosscheck-title">Candidate numeric comparisons</div>' +
            '<p class="om-upload-note">No overlapping numeric clauses detected across the uploaded files. Use the search bar above to inspect exact passages.</p>';
        } else {
          const mismatchCount = state.crossFindings.filter((f) => f.status === 'MISMATCH').length;
          const matchCount = state.crossFindings.length - mismatchCount;
          crossEl.innerHTML =
            '<div class="om-crosscheck-title">Candidate numeric comparisons (' +
            mismatchCount +
            ' mismatch' +
            (mismatchCount === 1 ? '' : 'es') +
            ' · ' +
            matchCount +
            ' equal candidate' +
            (matchCount === 1 ? '' : 'es') +
            ')</div>' +
            state.crossFindings
              .map((f) => {
                const isMis = f.status === 'MISMATCH';
                return (
                  '<div class="om-crosscheck-card ' +
                  (isMis ? 'is-mismatch' : '') +
                  '">' +
                  '<div class="finding-header">' +
                  '<strong>' +
                  escapeHtml(isMis ? 'Mismatch: ' : 'Verified Match: ') +
                  escapeHtml(f.valueA) +
                  (isMis ? ' vs. ' + escapeHtml(f.valueB) : '') +
                  '</strong>' +
                  '<span class="pack-status-pill ' +
                  (isMis ? 'pack-status-warn' : 'pack-status-ok') +
                  '">' +
                  escapeHtml(isMis ? '! MISMATCH DETECTED' : 'Equal values') +
                  '</span>' +
                  '</div>' +
                  '<div style="font-size:13px;color:var(--om-muted);margin-bottom:6px;">Shared topic: ' +
                  escapeHtml(f.topic) +
                  '</div>' +
                  '<div class="finding-proof-btns">' +
                  '<button type="button" class="citation-badge" data-jump-doc="' +
                  escapeHtml(f.docA.id) +
                  '" data-jump-chunk="' +
                  escapeHtml(f.chunkA.id) +
                  '">Open ' +
                  escapeHtml(f.docA.name) +
                  ' · ' +
                  escapeHtml(f.chunkA.coord) +
                  '</button>' +
                  '<button type="button" class="citation-badge" data-jump-doc="' +
                  escapeHtml(f.docB.id) +
                  '" data-jump-chunk="' +
                  escapeHtml(f.chunkB.id) +
                  '">Open ' +
                  escapeHtml(f.docB.name) +
                  ' · ' +
                  escapeHtml(f.chunkB.coord) +
                  '</button>' +
                  '</div>' +
                  '</div>'
                );
              })
              .join('');
        }
      }
    }
  }

  function updateUploadProgress(stageText, pct, metaText, stateClass) {
    const wrap = document.getElementById('omUploadProgressWrap');
    const stageEl = document.getElementById('omUploadStageText');
    const etaEl = document.getElementById('omUploadEtaText');
    const fillEl = document.getElementById('omUploadProgressFill');
    if (!wrap || !stageEl || !etaEl || !fillEl) return;

    wrap.classList.remove('om-hidden', 'is-done', 'is-warn');
    if (stateClass) wrap.classList.add(stateClass);
    stageEl.textContent = stageText;
    etaEl.textContent = metaText || Math.round(pct) + '%';
    fillEl.style.width = Math.max(0, Math.min(100, pct)) + '%';
  }

  function flashOmniElement(elId) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.classList.remove('cf-flash-active');
    void el.offsetWidth;
    el.classList.add('cf-flash-active');
  }

  /* =========================================================================
     8. USER WORKFLOWS: PRESETS, UPLOAD, SEARCH, COMPARISON
     ========================================================================= */
  function switchPreset(presetKey, selectedByUser = true) {
    if (!PRESETS[presetKey]) return;
    if (selectedByUser) workflow('sample_selected');

    state.activeMode = 'sample';
    if (selectedByUser) { importRevision++; state.pendingExcessFiles = []; }
    state.currentPresetKey = presetKey;
    state.answers = [];
    state.comparison = null;
    state.returnToAnswer = null;

    const backBtn = document.getElementById('backToAnswer');
    if (backBtn) backBtn.hidden = true;
    const diffBadge = document.getElementById('customDiffStatusBadge');
    if (diffBadge) {
      diffBadge.textContent = 'Ready to compare two passages.';
      diffBadge.style.color = '';
    }

    ['enterprise_rag', 'agentpress_mcp', 'buildq_solar'].forEach((k) => {
      const btn = document.getElementById('preset_' + k);
      if (btn) btn.className = k === presetKey ? 'pack-card active-pack' : 'pack-card';
    });

    const preset = PRESETS[presetKey];
    const sourcesDetails = document.getElementById('omSources');
    const packsDetails = document.getElementById('omPacks');
    if (sourcesDetails) sourcesDetails.open = false;
    if (packsDetails) packsDetails.open = false;
    if (selectedByUser) {
      const qInput = document.getElementById('customQueryInput');
      if (qInput) qInput.focus();
    }

    document.getElementById('chatMessages').replaceChildren();
    state.currentDocId = preset.docs[0].id;
    state.highlightedChunkId = preset.docs[0].chunks[0].id;

    renderPromptChips();
    renderDocumentTabs();
    renderDocumentViewport();
    renderLicenseHeader();

    const firstDoc = preset.docs[0];
    const firstChunk = firstDoc.chunks[0];
    document.getElementById('activeCitationText').textContent =
      firstDoc.name + ' (' + firstChunk.coord + ') — "' + firstChunk.title + '"';
  }

  function activateUploadedPackView() {
    if (state.uploadedDocs.length === 0) {
      switchPreset(state.currentPresetKey, false);
      return;
    }
    state.activeMode = 'uploaded';
    state.answers = [];
    state.comparison = null;
    state.returnToAnswer = null;
    document.getElementById('backToAnswer').hidden = true;
    document.getElementById('chatMessages').replaceChildren();

    ['enterprise_rag', 'agentpress_mcp', 'buildq_solar'].forEach((k) => {
      const btn = document.getElementById('preset_' + k);
      if (btn) btn.className = 'pack-card';
    });

    const firstDoc = state.uploadedDocs[0];
    state.currentDocId = firstDoc.id;
    state.highlightedChunkId = firstDoc.chunks[0] ? firstDoc.chunks[0].id : '';

    state.crossFindings = runCrossDocumentChecks(state.uploadedDocs);

    renderPromptChips();
    renderUploadedFilesAndChecks();
    renderDocumentTabs();
    renderDocumentViewport();

    if (firstDoc.chunks[0]) {
      document.getElementById('activeCitationText').textContent =
        firstDoc.name + ' (' + firstDoc.chunks[0].coord + ') — "' + firstDoc.chunks[0].title + '"';
    }
    setActiveStep(2);
    workflow('sample_selected');
  }

  let importRevision = 0;
  let importQueue = Promise.resolve();
  let nextDocumentNumber = 0;

  function ingestLocalFiles(fileObjects, replace = false, revision = importRevision) {
    const incoming = Array.from(fileObjects);
    const task = async () => {
      if (revision !== importRevision) return;
      const errors = [];
      const limit = activeFileLimit();
      const docs = replace ? [] : state.uploadedDocs.slice();
      const queued = [];
      const started = performance.now();
      const {readLocalDocument} = await import('./uploaded-files.mjs');
      for (const [i, file] of incoming.entries()) {
        if (revision !== importRevision) return;
        if (docs.length >= limit) {
          queued.push(file);
          continue;
        }
        const pct = Math.round(100 * i / incoming.length);
        const elapsed = performance.now() - started;
        const eta = i ? Math.ceil((elapsed / i) * (incoming.length - i) / 1000) + 's remaining' : 'Estimating time';
        updateUploadProgress('Reading ' + file.name + ' (' + (i + 1) + '/' + incoming.length + ')', pct, eta, '');
        try {
          const buffer = file.arrayBuffer ? await file.arrayBuffer() : file.buffer;
          docs.push(await readLocalDocument(file.name, buffer, 'up_' + ++nextDocumentNumber));
        } catch (error) {
          errors.push(file.name + ' · ' + error.message);
        }
      }
      if (revision !== importRevision) return;
      if (docs.length && (replace || docs.length > state.uploadedDocs.length)) {
        state.uploadedDocs = docs;
        activateUploadedPackView();
      }
      state.pendingExcessFiles = isProUnlocked() ? [] : state.pendingExcessFiles.concat(queued);
      const active = state.activeMode === 'uploaded' ? state.uploadedDocs.length + ' local file(s) indexed' : 'Sample pack remains selected';
      const limitText = queued.length ? queued.length + ' additional file(s) exceeded the ' + limit + '-file limit.' : '';
      const status = [active, ...errors, limitText].filter(Boolean).join(' · ');
      updateUploadProgress(status, 100, Math.round(performance.now() - started) + ' ms', errors.length || queued.length ? 'is-warn' : 'is-done');
      if (queued.length && !isProUnlocked()) openPaywallModal(limitText + ' Unlock the pack to include up to ' + PRO_FILE_LIMIT + ' local files.');
    };
    importQueue = importQueue.then(task).catch(error => {
      if (revision === importRevision) updateUploadProgress('Unable to read files: ' + error.message, 100, 'Retry selection', 'is-warn');
    });
    return importQueue;
  }

  async function loadBundledReviewSamples() {
    const revision = ++importRevision;
    state.pendingExcessFiles = [];
    updateUploadProgress('Reading bundled PDF and CSV...', 0, 'Loading', '');
    try {
      const filenames = ['Vendor_SLA_Addendum.pdf', 'Q3_Financial_Schedule.csv'];
      const files = await Promise.all(filenames.map(async name => {
        const res = await fetch('./samples/' + name);
        if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + name);
        return {name, buffer: await res.arrayBuffer()};
      }));
      await ingestLocalFiles(files, true, revision);
    } catch (error) {
      if (revision === importRevision) updateUploadProgress('Unable to read sample files. ' + error.message, 100, 'Retry loading the samples', 'is-warn');
    }
  }

  function removeUploadedDoc(docId) {
    importRevision++;
    state.pendingExcessFiles = [];
    state.uploadedDocs = state.uploadedDocs.filter((d) => d.id !== docId);
    if (state.uploadedDocs.length === 0) {
      document.getElementById('omUploadProgressWrap').classList.add('om-hidden');
      renderUploadedFilesAndChecks();
      switchPreset(state.currentPresetKey, false);
    } else {
      activateUploadedPackView();
      updateUploadProgress(
        'Pack updated: ' + state.uploadedDocs.length + ' local file(s) active. Prior answers cleared.',
        100,
        'Re-indexed',
        'is-done'
      );
    }
  }

  function clearAllUploads() {
    importRevision++;
    state.uploadedDocs = [];
    state.crossFindings = [];
    state.pendingExcessFiles = [];
    document.getElementById('omUploadProgressWrap').classList.add('om-hidden');
    renderUploadedFilesAndChecks();
    switchPreset(state.currentPresetKey, false);
  }

  function selectDocTab(docId) {
    state.currentDocId = docId;
    const doc = availableDocs().find((d) => d.id === docId);
    if (doc && doc.chunks[0]) {
      state.highlightedChunkId = doc.chunks[0].id;
      document.getElementById('activeCitationText').textContent =
        doc.name + ' (' + doc.chunks[0].coord + ') — "' + doc.chunks[0].title + '"';
    }
    renderDocumentTabs();
    renderDocumentViewport();
  }

  function jumpToCitation(docId, chunkId) {
    const sourcesEl = document.getElementById('omSources');
    if (sourcesEl) sourcesEl.open = true;
    state.currentDocId = docId;
    state.highlightedChunkId = chunkId;
    renderDocumentTabs();
    renderDocumentViewport();

    const doc = availableDocs().find((d) => d.id === docId);
    const chunk = doc ? doc.chunks.find((c) => c.id === chunkId) : null;
    if (doc && chunk) {
      document.getElementById('activeCitationText').textContent =
        doc.name + ' (' + chunk.coord + ') — "' + chunk.title + '"';
    }

    const trigger = document.activeElement;
    if (trigger && trigger.closest && (trigger.closest('#chatMessages') || trigger.closest('#omCrossCheckPanel'))) {
      state.returnToAnswer = trigger;
      document.getElementById('backToAnswer').hidden = false;
      const target = document.getElementById('activeCitationBanner');
      target.tabIndex = -1;
      target.focus();
    }
    flashOmniElement('activeCitationBanner');
    flashOmniElement('chunk_' + chunkId);

    const el = document.getElementById('chunk_' + chunkId);
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function renderChatMessageHTML(html, isAlert) {
    return (
      '<div class="msg-system' +
      (isAlert ? ' is-alert' : '') +
      '">' +
      '<p class="om-receipt-label">' +
      (state.activeMode === 'uploaded' ? 'Evidence from uploaded local files' : 'Evidence from this pack') +
      '</p>' +
      '<div>' +
      html +
      '</div>' +
      '</div>'
    );
  }

  function runPromptChip(promptText) {
    const input = document.getElementById('customQueryInput');
    if (input) input.value = promptText;
    handleCustomQuery();
  }

  function handleCustomQuery(event) {
    if (event && event.preventDefault) event.preventDefault();
    const input = document.getElementById('customQueryInput');
    const query = (input && input.value ? input.value : '').trim();
    if (!query) return;

    const matches = findEvidenceMatches(query);
    const evidence = matches.map(({ doc, chunk }) => ({
      document: doc.name,
      document_id: doc.id,
      location: chunk.coord,
      text: chunk.text,
      id: chunk.id
    }));

    state.answers.push({
      question: query,
      result: matches.length ? 'source_found' : 'no_answer',
      evidence
    });

    const body = matches.length
      ? matches
          .map(
            ({ doc, chunk }) =>
              '<p>' +
              escapeHtml(chunk.text) +
              '</p>' +
              '<button class="citation-badge" type="button" data-jump-doc="' +
              escapeHtml(doc.id) +
              '" data-jump-chunk="' +
              escapeHtml(chunk.id) +
              '">Open ' +
              escapeHtml(displayDocument(doc)) +
              ' · ' +
              escapeHtml(chunk.coord) +
              '</button>'
          )
          .join('')
      : '<p>No supporting passage found in the active document pack. Choose a suggested question or search for an exact term from your source documents.</p>';

    const chat = document.getElementById('chatMessages');
    if (state.answers.length === 1 && !state.comparison) chat.replaceChildren();
    chat.insertAdjacentHTML(
      'beforeend',
      renderChatMessageHTML('<div class="finding-card"><strong>' + escapeHtml(query) + '</strong><div>' + body + '</div></div>', false)
    );

    setActiveStep(2);
    workflow('result_ready');
    if (chat.lastElementChild) chat.lastElementChild.scrollIntoView({ block: 'nearest' });
    if (input) input.value = '';
  }

  function runCustomTextDiff() {
    const textA = (document.getElementById('customDocAInput').value || '').trim();
    const textB = (document.getElementById('customDocBInput').value || '').trim();
    const badge = document.getElementById('customDiffStatusBadge');

    if (!textA || !textB) {
      if (badge) badge.textContent = 'Enter both passages to compare their numbers.';
      return;
    }

    const first = window.OmniFigures.measure(textA);
    const second = window.OmniFigures.measure(textB);
    if (!first.length || !second.length) {
      if (badge) badge.textContent = 'Both passages need at least one number for comparison.';
      return;
    }
    const numsA = first.map(figure => figure.raw);
    const numsB = second.map(figure => figure.raw);
    const hasMismatch = first.length !== second.length || first.some((figure, i) =>
      figure.unit !== second[i].unit || figure.value !== second[i].value);

    state.comparison = {
      source_a: textA,
      source_b: textB,
      numbers_a: numsA,
      numbers_b: numsB,
      status: hasMismatch ? 'different_numbers' : 'matching_numbers'
    };

    const existing = document.getElementById('latestComparison');
    if (existing && existing.closest('.msg-system')) existing.closest('.msg-system').remove();

    if (badge) {
      badge.textContent = hasMismatch
        ? '! Number mismatch caught (' + numsA.join(', ') + ' vs. ' + numsB.join(', ') + ')'
        : '✓ Numbers match across both passages';
      badge.style.color = hasMismatch ? 'var(--om-alert)' : 'var(--om-pass)';
    }

    const cardHtml =
      '<div id="latestComparison" class="finding-card">' +
      '<div class="finding-header">' +
      '<strong style="color:' +
      (hasMismatch ? 'var(--om-alert)' : 'var(--om-pass)') +
      ';">' +
      (hasMismatch ? '! Passage Comparison: Number Mismatch Caught' : '✓ Passage Comparison: Numbers Match') +
      '</strong>' +
      '<span class="pack-status-pill ' +
      (hasMismatch ? 'pack-status-warn' : 'pack-status-ok') +
      '">' +
      (hasMismatch ? '! MISMATCH DETECTED' : 'Equal values') +
      '</span>' +
      '</div>' +
      '<div class="diff-compare-grid">' +
      '<div class="diff-col-a"><div class="mono" style="font-size:11px;font-weight:600;">PASSAGE A: ' +
      escapeHtml(numsA.join(' · ')) +
      '</div><div>' +
      escapeHtml(textA) +
      '</div></div>' +
      '<div class="' +
      (hasMismatch ? 'diff-col-mismatch' : 'diff-col-b') +
      '"><div class="mono" style="font-size:11px;font-weight:600;">PASSAGE B: ' +
      escapeHtml(numsB.join(' · ')) +
      '</div><div>' +
      escapeHtml(textB) +
      '</div></div>' +
      '</div>' +
      '<div class="finding-proof-btns">' +
      '<button type="button" class="citation-badge" data-jump-doc="pasted_a" data-jump-chunk="cit_custom_a">Open passage A</button>' +
      '<button type="button" class="citation-badge" data-jump-doc="pasted_b" data-jump-chunk="cit_custom_b">Open passage B</button>' +
      '</div>' +
      '</div>';

    const chatDiv = document.getElementById('chatMessages');
    chatDiv.insertAdjacentHTML('afterbegin', renderChatMessageHTML(cardHtml, hasMismatch));
    jumpToCitation('pasted_a', 'cit_custom_a');
    setActiveStep(2);
    workflow('result_ready');
    flashOmniElement('chatMessages');
  }

  /* =========================================================================
     9. PRINT-READY EVIDENCE DOSSIER, JSON & CSV EXPORTS
     ========================================================================= */
  function displayDocument(doc) {
    if (!activeBaseDocs().some(other=>other.id!==doc.id && other.name===doc.name)) return doc.name;
    return doc.name+' ['+doc.id+(doc.fileSha256?' · '+doc.fileSha256.slice(0,10):'')+']';
  }

  function buildEvidencePayload() {
    const docs = activeBaseDocs();
    const corpusString = docs.map((d) => d.name + ':' + d.chunks.map((c) => c.text).join('\n')).join('\n---\n');
    const fingerprint = deterministicHash(corpusString);
    const selectedDoc = availableDocs().find(d=>d.chunks.some(c=>c.id===state.highlightedChunkId));
    const selectedPassage = selectedDoc?.chunks.find(c=>c.id===state.highlightedChunkId);
    const reviewVersion = deterministicHash(JSON.stringify([fingerprint, docs.map(d=>d.fileSha256 || d.id), state.answers, state.comparison, state.highlightedChunkId]));
    const dossierId = 'OMNI-DD-' + reviewVersion.toUpperCase();
    state.lastDossierId = dossierId;

    return {
      schema: 'https://caliberfoundry.com/omnirag/evidence-dossier.schema.json',
      studio_version: 'caliberfoundry-omnirag-plan53-review',
      dossier_id: dossierId,
      pack_origin: state.activeMode === 'uploaded' ? 'local_uploaded_files' : 'built_in_sample_pack',
      preset: state.activeMode === 'uploaded' ? 'custom_upload' : state.currentPresetKey,
      pack_title: activePackTitle(),
      license_tier: state.licenseTier,
      prepared_for: 'Local Verification Review',
      content_fingerprint: fingerprint,
      timestamp: new Date().toISOString(),
      documents: docs.map((d) => ({
        id: d.id, name: d.name,
        file_sha256: d.fileSha256 || null,
        format: d.format,
        status: d.statusNote || 'Indexed',
        passage_count: d.chunks.length,
        passages: d.chunks.map((c) => ({ id: c.id, location: c.coord, title: c.title, text: c.text }))
      })),
      automatic_comparison_skipped: state.activeMode === 'uploaded' && Boolean(state.crossCheckLimited),
      comparison_method: 'Candidate pairs selected by terminology and measurement unit. Review original passages.',
      cross_document_findings: (state.activeMode === 'uploaded' ? state.crossFindings : []).map((f) => ({
        status: f.status,
        topic: f.topic,
        unit: f.unit,
        source_a: { document: f.docA.name, document_id: f.docA.id, passage_id: f.chunkA.id, location: f.chunkA.coord, value: f.valueA, text: f.chunkA.text },
        source_b: { document: f.docB.name, document_id: f.docB.id, passage_id: f.chunkB.id, location: f.chunkB.coord, value: f.valueB, text: f.chunkB.text }
      })),
      selected_excerpt: selectedPassage?.id || null,
      selected_excerpt_location: selectedPassage ? {
        document_id:selectedDoc.id, document:selectedDoc.name, id:selectedPassage.id,
        location:selectedPassage.coord, text:selectedPassage.text
      } : null,
      questions: state.answers,
      comparison: state.comparison ? {...state.comparison, passages:['a','b'].map(side=>({
        id:'cit_custom_'+side, document_id:'pasted_'+side, text:state.comparison['source_'+side]
      }))} : null
    };
  }

  function buildEvidenceCsv(payload, spreadsheetText) {
    const header = ['Row_Type', 'Document', 'Location', 'Topic_Or_Question', 'Status', 'Evidence_Text', 'Document_Id', 'Passage_Id', 'Source_File_SHA256'];
    const files = new Map(payload.documents.map(d=>[d.id, d.file_sha256 || '']));
    const lines = [header.join(',')];
    const escCsv = (v) => '"' + spreadsheetText(v == null ? '' : v).replace(/"/g, '""') + '"';

    payload.cross_document_findings.forEach((f) => {
      lines.push(
        [
          'CROSS_CHECK',
          f.source_a.document + ' vs ' + f.source_b.document,
          f.source_a.location + ' / ' + f.source_b.location,
          f.topic,
          f.status,
          f.source_a.value + ' vs ' + f.source_b.value,
          f.source_a.document_id + ' / ' + f.source_b.document_id,
          f.source_a.passage_id + ' / ' + f.source_b.passage_id,
          [files.get(f.source_a.document_id), files.get(f.source_b.document_id)].join(' / ')
        ]
          .map(escCsv)
          .join(',')
      );
    });

    payload.questions.forEach((q) => {
      if (q.evidence && q.evidence.length) {
        q.evidence.forEach((e) => {
          lines.push(['QA_CITATION', e.document, e.location, q.question, 'SOURCE_FOUND', e.text, e.document_id, e.id, files.get(e.document_id)].map(escCsv).join(','));
        });
      } else {
        lines.push(['QA_CITATION', 'Active Pack', '-', q.question, 'NO_ANSWER', 'No supporting passage found', '', '', ''].map(escCsv).join(','));
      }
    });

    if (payload.comparison) {
      for (const side of ['a','b']) {
        lines.push(['MANUAL_COMPARISON', 'Pasted passage ' + side.toUpperCase(), '', '',
          payload.comparison.status, payload.comparison['source_' + side], 'pasted_'+side, 'cit_custom_'+side, ''].map(escCsv).join(','));
      }
    }
    payload.documents.forEach((d) => {
      d.passages.forEach((p) => {
        lines.push(['SOURCE_PASSAGE', d.name, p.location, p.title, d.format, p.text, d.id, p.id, d.file_sha256].map(escCsv).join(','));
      });
    });

    return lines.join('\n');
  }

  function openAuditPreviewModal() {
    const modal = document.getElementById('auditReportModalBackdrop');
    const content = document.getElementById('auditReportModalContent');
    if (!modal || !content) return;

    modal._opener = document.activeElement;
    const payload = buildEvidencePayload();
    const docs = activeBaseDocs();
    const totalPassages = docs.reduce((s, d) => s + d.chunks.length, 0);
    const mismatchCount = payload.cross_document_findings.filter((f) => f.status === 'MISMATCH').length;

    const documentLabels = new Map(docs.map(d=>[d.id, displayDocument(d)]));
    const inventoryRows = docs
      .map(
        (d) =>
          '<tr>' +
          '<td><strong>' +
          escapeHtml(displayDocument(d)) +
          '</strong></td>' +
          '<td class="mono">' +
          escapeHtml(d.format) +
          '</td>' +
          '<td class="mono">' +
          escapeHtml(d.chunks.length) +
          '</td>' +
          '<td>' +
          escapeHtml(d.statusNote || 'Indexed') +
          '</td>' +
          '</tr>'
      )
      .join('');

    const crossHtml = payload.cross_document_findings.length
      ? payload.cross_document_findings
          .map(
            (f) =>
              '<div class="om-qa-block">' +
              '<div class="finding-header">' +
              '<strong>' +
              escapeHtml(f.status === 'MISMATCH' ? '! Mismatch: ' : 'Equal values: ') +
              escapeHtml(f.source_a.value) +
              (f.status === 'MISMATCH' ? ' vs. ' + escapeHtml(f.source_b.value) : '') +
              '</strong>' +
              '<span class="pack-status-pill ' +
              (f.status === 'MISMATCH' ? 'pack-status-warn' : 'pack-status-ok') +
              '">' +
              escapeHtml(f.status) +
              '</span>' +
              '</div>' +
              '<div><strong>Source A:</strong> ' +
              escapeHtml((documentLabels.get(f.source_a.document_id) || f.source_a.document) + ' (' + f.source_a.location + ') — ' + f.source_a.text) +
              '</div>' +
              '<div><strong>Source B:</strong> ' +
              escapeHtml((documentLabels.get(f.source_b.document_id) || f.source_b.document) + ' (' + f.source_b.location + ') — ' + f.source_b.text) +
              '</div>' +
              '</div>'
          )
          .join('')
      : '<p style="font-size:13px;color:var(--om-muted);">No candidate figure comparisons are listed. Check source passages for completeness.</p>';

    const qaHtml = payload.questions.length
      ? payload.questions
          .map(
            (ans) =>
              '<div class="om-qa-block">' +
              '<div><strong>Q: ' +
              escapeHtml(ans.question) +
              '</strong></div>' +
              (ans.result === 'no_answer'
                ? '<div style="color:var(--om-muted);">No supporting passage found in the active document pack.</div>'
                : ans.evidence
                    .map(
                      (c) =>
                        '<div style="margin-top:4px;"><span class="mono" style="font-size:11.5px;font-weight:600;">[' +
                        escapeHtml((documentLabels.get(c.document_id) || c.document) + ' · ' + c.location) +
                        ']</span> ' +
                        escapeHtml(c.text) +
                        '</div>'
                    )
                    .join('')) +
              '</div>'
          )
          .join('')
      : '<p style="font-size:13px;color:var(--om-muted);">No questions asked yet. Ask a question or click a suggested check to include Q&amp;A citations here.</p>';

    const compHtml = payload.comparison
      ? '<div class="om-qa-block"><strong>Manual Two-Passage Comparison (' +
        escapeHtml(payload.comparison.status) +
        ')</strong><div>A: ' +
        escapeHtml(payload.comparison.source_a) +
        '</div><div>B: ' +
        escapeHtml(payload.comparison.source_b) +
        '</div></div>'
      : '';

    const passageRows = docs
      .map((d) =>
        d.chunks
          .map(
            (c) =>
              '<tr>' +
              '<td><strong>' +
              escapeHtml(displayDocument(d)) +
              '</strong></td>' +
              '<td class="mono">' +
              escapeHtml(c.coord) +
              '</td>' +
              '<td>' +
              escapeHtml(c.title) +
              '</td>' +
              '<td>' +
              escapeHtml(c.text) +
              '</td>' +
              '</tr>'
          )
          .join('')
      )
      .join('');

    const originNotice =
      state.activeMode === 'uploaded'
        ? 'Local uploaded files (parsed client-side in browser)'
        : 'Built-in illustrative sample pack';

    content.innerHTML =
      '<div class="om-dossier-meta">' +
      '<div><strong>Dossier ID:</strong> <span class="mono">' +
      escapeHtml(payload.dossier_id) +
      '</span></div>' +
      '<div><strong>Generated:</strong> <span class="mono">' +
      escapeHtml(payload.timestamp.slice(0, 19).replace('T', ' ') + ' UTC') +
      '</span></div>' +
      '<div><strong>Active Pack:</strong> ' +
      escapeHtml(payload.pack_title) +
      '</div>' +
      '<div><strong>Source Origin:</strong> ' +
      escapeHtml(originNotice) +
      '</div>' +
      '<div><strong>Prepared For:</strong> ' +
      escapeHtml(payload.prepared_for) +
      '</div>' +
      '<div><strong>Corpus Fingerprint:</strong> <span class="mono">' +
      escapeHtml(payload.content_fingerprint) +
      '</span></div>' +
      '<div><strong>Indexed Passages:</strong> <span class="mono">' +
      escapeHtml(docs.length + ' docs · ' + totalPassages + ' passages · ' + mismatchCount + ' mismatch(es)') +
      '</span></div>' +
      '<div><strong>License Tier:</strong> <span class="mono">' +
      escapeHtml(isProUnlocked() ? state.licenseTier + ' (up to ' + PRO_FILE_LIMIT + ' files)' : 'FREE (up to ' + FREE_FILE_LIMIT + ' files)') +
      '</span></div>' +
      '</div>' +
      '<h3 class="om-dossier-section-title">1. Document Inventory</h3>' +
      '<div class="om-table-wrap"><table class="om-data-table">' +
      '<thead><tr><th>File</th><th>Format</th><th>Passages</th><th>Parse Status</th></tr></thead>' +
      '<tbody>' +
      inventoryRows +
      '</tbody></table></div>' +
      '<h3 class="om-dossier-section-title">2. Cross-Document Verification &amp; Comparisons</h3>' +
      crossHtml +
      compHtml +
      '<h3 class="om-dossier-section-title">3. Verified Questions &amp; Citations</h3>' +
      qaHtml +
      '<h3 class="om-dossier-section-title">4. Source Passage Evidence Index</h3>' +
      '<div class="om-table-wrap"><table class="om-data-table">' +
      '<thead><tr><th>File</th><th>Page / Row</th><th>Clause / Title</th><th>Verbatim Passage</th></tr></thead>' +
      '<tbody>' +
      passageRows +
      '</tbody></table></div>';

    modal.classList.remove('om-hidden');
    setActiveStep(3);
    workflow('export_ready');
    const closeBtn = document.getElementById('btnCloseAuditModal');
    if (closeBtn) closeBtn.focus();
  }

  function closeAuditPreviewModal() {
    const modal = document.getElementById('auditReportModalBackdrop');
    if (modal) {
      modal.classList.add('om-hidden');
      if (modal._opener && modal._opener.isConnected) modal._opener.focus();
    }
  }

  function triggerDownload(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function triggerExpertSignOff() {
    const payload = buildEvidencePayload();
    const slug = state.activeMode === 'uploaded' ? 'uploaded_pack' : state.currentPresetKey;
    triggerDownload('omnirag_evidence_dossier_' + slug + '.json', JSON.stringify(payload, null, 2), 'application/json');
    workflow('export_ready');

    const btn = document.getElementById('btnSignOff');
    if (btn) {
      const prev = btn.textContent;
      btn.textContent = '✓ JSON downloaded';
      setTimeout(() => {
        btn.textContent = prev;
      }, 1800);
    }
  }

  async function triggerCsvDownload() {
    const {spreadsheetText} = await import('../assets/js/delimited.mjs');
    const payload = buildEvidencePayload();
    const slug = state.activeMode === 'uploaded' ? 'uploaded_pack' : state.currentPresetKey;
    triggerDownload('omnirag_evidence_' + slug + '.csv', '\uFEFF' + buildEvidenceCsv(payload, spreadsheetText), 'text/csv;charset=utf-8;');
    workflow('export_ready');
  }

  function printWithBodyClass(className) {
    document.body.classList.remove('om-printing-dossier', 'om-printing-invoice');
    document.body.classList.add(className);
    const cleanup = () => {
      document.body.classList.remove('om-printing-dossier', 'om-printing-invoice');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
    setTimeout(cleanup, 1500);
  }

  /* =========================================================================
     10. Purchasing and receipt activation
     ========================================================================= */
  function selectCommercialPlan(planCode) {
    const plan = PLANS[planCode] || PLANS.DD_PACK_249;
    state.selectedPlanCode = plan.code;
    savePersistedState();

    document.querySelectorAll('[data-plan-card]').forEach((card) => {
      card.classList.toggle('is-selected', card.getAttribute('data-plan-card') === plan.code);
    });
    document.querySelectorAll('[data-plan-select]').forEach((btn) => {
      const code = btn.getAttribute('data-plan-select');
      const p = PLANS[code];
      const active = code === plan.code;
      btn.classList.toggle('btn-tactile-primary', active);
      btn.textContent = active ? 'Selected: ' + p.shortLabel : 'Select ' + p.shortLabel;
    });

    if (state.lastInvoice && state.lastInvoice.planCode !== plan.code) {
      document.getElementById('omInvoicePrintSheet').classList.add('om-hidden');
      document.getElementById('omInvoiceActions').classList.add('om-hidden');
    }
    const genBtn = document.getElementById('btnGenerateInvoice');
    if (genBtn) {
      genBtn.textContent = 'Prepare purchase request ($' + plan.amountUsd.toLocaleString('en-US') + ')';
    }
  }

  function openPaywallModal(reasonText) {
    const modal = document.getElementById('omPaywallModal');
    const reasonEl = document.getElementById('omPaywallReason');
    if (!modal) return;
    modal._opener = document.activeElement;

    if (reasonEl) {
      if (reasonText) {
        reasonEl.textContent = reasonText;
        reasonEl.classList.remove('om-hidden');
      } else {
        reasonEl.classList.add('om-hidden');
      }
    }

    selectCommercialPlan(state.selectedPlanCode || 'DD_PACK_249');
    renderLicenseHeader();
    if (state.lastInvoice?.planCode === state.selectedPlanCode) {
      renderCorporateInvoiceSheet(state.lastInvoice);
    }

    modal.classList.remove('om-hidden');
    const closeBtn = document.getElementById('btnClosePaywallModal');
    if (closeBtn) closeBtn.focus();
  }

  function closePaywallModal() {
    const modal = document.getElementById('omPaywallModal');
    if (modal) {
      modal.classList.add('om-hidden');
      if (modal._opener && modal._opener.isConnected) modal._opener.focus();
    }
  }

  function renderCorporateInvoiceSheet(inv) {
    const sheet = document.getElementById('omInvoicePrintSheet');
    const actions = document.getElementById('omInvoiceActions');
    const mailtoLink = document.getElementById('omInvoiceMailtoLink');
    if (!sheet || !inv) return;

    const statusBadge = 'Local draft · awaiting billing review';

    sheet.innerHTML =
      '<div class="om-invoice-top">' +
      '<div>' +
      '<div class="mono" style="font-size:11px;font-weight:600;color:var(--om-deep);">CALIBER FOUNDRY — PRO FORMA PURCHASE REQUEST</div>' +
      '<div style="font-size:13px;">Vendor: <strong>Caliber Foundry</strong> · <code>engineering@caliberfoundry.com</code></div>' +
      '<div style="font-size:12px;color:var(--om-muted);">https://caliberfoundry.com/omnirag/</div>' +
      '</div>' +
      '<div style="text-align:right;" class="mono">' +
      '<div style="font-weight:700;font-size:14px;">' +
      escapeHtml(inv.invoiceId) +
      '</div>' +
      '<div style="font-size:11.5px;">Prepared on: ' +
      escapeHtml(inv.issueDate) +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="om-invoice-cols">' +
      '<div>' +
      '<div class="spec-label">Requested by</div>' +
      '<div><strong>' +
      escapeHtml(inv.company) +
      '</strong></div>' +
      '<div>' +
      escapeHtml(inv.email) +
      '</div>' +
      '</div>' +
      '<div style="text-align:right;">' +
      '<div class="spec-label">Reference &amp; Status</div>' +
      '<div class="mono" style="font-size:12px;">PO: ' +
      escapeHtml(inv.poNumber || 'None provided') +
      '</div>' +
      '<div class="mono" style="font-size:11.5px;font-weight:700;color:var(--om-pass);">' +
      escapeHtml(statusBadge) +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="om-invoice-line">' +
      '<div><strong>1 × ' +
      escapeHtml(inv.planName) +
      '</strong><div style="font-size:12px;color:var(--om-muted);">' +
      escapeHtml(inv.billingCycle) +
      '</div></div>' +
      '<div class="mono" style="font-weight:700;font-size:15px;">$' +
      escapeHtml(Number(inv.amountUsd).toLocaleString('en-US')) +
      '.00 USD</div>' +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:12px;color:var(--om-muted);">' +
      '<span>Send this draft for price and payment confirmation to <code>engineering@caliberfoundry.com</code>.</span>' +
      '<strong class="mono" style="color:var(--om-ink);font-size:14px;">Estimated amount: $' +
      escapeHtml(Number(inv.amountUsd).toLocaleString('en-US')) +
      '.00 USD</strong>' +
      '</div>';

    sheet.classList.remove('om-hidden');
    if (actions) actions.classList.remove('om-hidden');

    if (mailtoLink) {
      const subj = encodeURIComponent('OmniRAG purchase request ' + inv.invoiceId + ' (' + inv.company + ')');
      const body = encodeURIComponent(
        'Caliber Foundry Billing Team,\n\n' +
          'Please confirm pricing and invoicing for ' +
          inv.planName +
          '.\n\n' +
          'Request reference: ' +
          inv.invoiceId +
          '\n' +
          'Legal Entity: ' +
          inv.company +
          '\n' +
          'Billing Email: ' +
          inv.email +
          '\n' +
          'PO Reference: ' +
          (inv.poNumber || 'N/A') +
          '\n' +
          'Estimated amount: $' +
          inv.amountUsd +
          '.00 USD\n\n' +
          'Please reply with the confirmed scope, invoicing terms and delivery details.'
      );
      mailtoLink.setAttribute('href', 'mailto:engineering@caliberfoundry.com?subject=' + subj + '&body=' + body);
    }
  }

  function handleInvoiceFormSubmit(event) {
    event.preventDefault();
    const company = (document.getElementById('invCompanyInput').value || '').trim();
    const email = (document.getElementById('invEmailInput').value || '').trim();
    const poNumber = (document.getElementById('invPoInput').value || '').trim();
    if (!company || !email) return;

    const plan = PLANS[state.selectedPlanCode] || PLANS.DD_PACK_249;
    const now = new Date();
    const invoiceId = 'REQ-OMNI-' + crypto.randomUUID();

    const inv = {
      invoiceId,
      vendor: 'Caliber Foundry <engineering@caliberfoundry.com>',
      company,
      email,
      poNumber,
      planCode: plan.code,
      planName: plan.name,
      billingCycle: plan.billingCycle,
      amountUsd: plan.amountUsd,
      currency: 'USD',
      status: 'draft',
      documentType: 'pro_forma_purchase_request',
      paymentTerms: 'Subject to billing confirmation',
      issueDate: now.toISOString().slice(0, 10),
      generatedAt: now.toISOString(),
      externalPaymentTriggered: false
    };

    state.lastInvoice = inv;
    savePersistedState();
    renderCorporateInvoiceSheet(inv);

    const fb = document.getElementById('omLicenseFeedback');
    if (fb) {
      fb.classList.remove('om-hidden', 'is-error');
      fb.textContent =
        'Generated ' +
        inv.invoiceId +
        ' ($' +
        inv.amountUsd +
        '.00 USD) for ' +
        inv.company +
        '. Print or download the draft below.';
    }
  }

  async function processPendingExcessAfterUnlock() {
    if (state.pendingExcessFiles.length > 0 && isProUnlocked()) {
      const queued = state.pendingExcessFiles.slice();
      state.pendingExcessFiles = [];
      await ingestLocalFiles(queued);
    }
  }

  async function handleActivateLicenseKey() {
    const input = document.getElementById('omLicenseKeyInput');
    const fb = document.getElementById('omLicenseFeedback');
    const raw = input ? input.value.trim().toUpperCase() : '';
    const receiptStatus = document.getElementById('receiptStatus');
    try {
      await receipt.check(raw, receiptStatus);
    } catch (error) {
      receiptStatus.textContent = error.message;
      return;
    }
    const ver = verifyOmniLicenseKey(raw);

    if (ver.valid) {
      state.licenseTier = ver.tier;
      state.licenseKey = raw;
      state.licenseCustomer = ver.customerTag || 'PRO';
      savePersistedState();
      renderLicenseHeader();
      if (fb) {
        fb.classList.remove('om-hidden', 'is-error');
        fb.textContent =
          'License verified (' +
          ver.tier +
          ' · ' +
          state.licenseCustomer +
          (ver.expiresIso ? ', expires ' + ver.expiresIso : '') +
          '). Up to ' +
          PRO_FILE_LIMIT +
          ' local files per pack unlocked.';
      }
      processPendingExcessAfterUnlock();
    } else if (fb) {
      fb.classList.remove('om-hidden');
      fb.classList.add('is-error');
      fb.textContent = ver.expired
        ? 'This license key expired on ' + ver.expiresIso + '. Contact engineering@caliberfoundry.com to renew.'
        : 'This key could not be verified for this product. Check the key in your purchase receipt.';
    }
  }

  function handleResetLocalLicense() {
    state.licenseTier = 'FREE';
    state.licenseKey = '';
    state.licenseCustomer = '';
    document.getElementById('omLicenseKeyInput').value = '';
    document.getElementById('receiptStatus').textContent = '';
    clearAllUploads();
    savePersistedState();
    renderLicenseHeader();
    const fb = document.getElementById('omLicenseFeedback');
    if (fb) {
      fb.classList.remove('om-hidden', 'is-error');
      fb.textContent = 'License removed from this browser and local pack cleared. Free limit: ' + FREE_FILE_LIMIT + ' files.';
    }
  }

  /* =========================================================================
     11. EVENT BINDING & BOOTSTRAP
     ========================================================================= */
  function bindEvents() {
    // Query Form
    document.getElementById('omQueryForm').addEventListener('submit', handleCustomQuery);

    // Guided 3-Step Workflow Bar
    document.getElementById('stepBtn1').addEventListener('click', () => {
      setActiveStep(1);
      const up = document.getElementById('omUpload');
      if (up) {
        up.open = true;
        up.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      document.getElementById('btnTriggerFileUpload').focus();
    });
    document.getElementById('stepBtn2').addEventListener('click', () => {
      setActiveStep(2);
      const qInput = document.getElementById('customQueryInput');
      if (qInput) {
        qInput.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        qInput.focus();
      }
    });
    document.getElementById('stepBtn3').addEventListener('click', () => {
      setActiveStep(3);
      openAuditPreviewModal();
    });

    // Local File Upload & Drag-and-Drop
    const fileInput = document.getElementById('omFileInput');
    const dropzone = document.getElementById('omUploadDropzone');

    document.getElementById('btnTriggerFileUpload').addEventListener('click', () => {
      fileInput.click();
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        ingestLocalFiles(fileInput.files);
        fileInput.value = '';
      }
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('is-dragover');
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('is-dragover');
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('is-dragover');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        ingestLocalFiles(e.dataTransfer.files);
      }
    });

    document.getElementById('btnLoadBundledSamples').addEventListener('click', loadBundledReviewSamples);
    document.getElementById('btnClearUploads').addEventListener('click', clearAllUploads);

    // Delegated clicks for uploaded file removal, citation badges, and source chunks
    document.getElementById('omUploadedFilesList').addEventListener('click', (e) => {
      const rmBtn = e.target.closest('[data-remove-doc]');
      if (rmBtn) removeUploadedDoc(rmBtn.getAttribute('data-remove-doc'));
    });

    document.addEventListener('click', (e) => {
      const jumpBtn = e.target.closest('[data-jump-doc][data-jump-chunk]');
      if (jumpBtn) {
        jumpToCitation(jumpBtn.getAttribute('data-jump-doc'), jumpBtn.getAttribute('data-jump-chunk'));
        return;
      }
      const chunkCard = e.target.closest('.doc-chunk[data-doc-id][data-chunk-id]');
      if (chunkCard) {
        jumpToCitation(chunkCard.getAttribute('data-doc-id'), chunkCard.getAttribute('data-chunk-id'));
      }
    });

    // Sample Pack Selector
    document.querySelectorAll('[data-preset-key]').forEach((btn) => {
      btn.addEventListener('click', () => {
        switchPreset(btn.getAttribute('data-preset-key'), true);
      });
    });

    // Two-Passage Comparison & Invalidation on Edit
    document.getElementById('btnRunCustomDiff').addEventListener('click', runCustomTextDiff);
    ['customDocAInput', 'customDocBInput'].forEach((id) => {
      document.getElementById(id).addEventListener('input', () => {
        if (!state.comparison) return;
        state.comparison = null;
        const existing = document.getElementById('latestComparison');
        if (existing && existing.closest('.msg-system')) existing.closest('.msg-system').remove();
        selectDocTab(activeBaseDocs()[0].id);
        const badge = document.getElementById('customDiffStatusBadge');
        if (badge) {
          badge.textContent = 'Passage changed. Run the comparison again.';
          badge.style.color = '';
        }
      });
    });

    document.getElementById('backToAnswer').addEventListener('click', () => {
      if (state.returnToAnswer && state.returnToAnswer.isConnected) {
        state.returnToAnswer.focus();
      }
    });

    // Evidence Dossier & Export Actions
    document.getElementById('btnOpenAuditModal').addEventListener('click', openAuditPreviewModal);
    document.getElementById('btnCloseAuditModal').addEventListener('click', closeAuditPreviewModal);
    document.getElementById('btnPrintDossier').addEventListener('click', () => printWithBodyClass('om-printing-dossier'));
    document.getElementById('btnSignOff').addEventListener('click', triggerExpertSignOff);
    document.getElementById('btnDownloadJsonModal').addEventListener('click', triggerExpertSignOff);
    document.getElementById('btnDownloadCsvQuick').addEventListener('click', triggerCsvDownload);
    document.getElementById('btnDownloadCsvModal').addEventListener('click', triggerCsvDownload);
    document.getElementById('btnOpenPaywallFromReport').addEventListener('click', () => {
      closeAuditPreviewModal();
      openPaywallModal();
    });

    // Commercial $249 Licensing & Invoice Modal
    document.getElementById('btnOpenPaywall').addEventListener('click', () => openPaywallModal());
    document.getElementById('btnOpenPaywallFooter').addEventListener('click', () => openPaywallModal());
    document.getElementById('btnClosePaywallModal').addEventListener('click', closePaywallModal);

    document.querySelectorAll('[data-plan-select]').forEach((btn) => {
      btn.addEventListener('click', () => selectCommercialPlan(btn.getAttribute('data-plan-select')));
    });

    document.getElementById('omInvoiceForm').addEventListener('submit', handleInvoiceFormSubmit);
    document.getElementById('btnPrintInvoice').addEventListener('click', () => printWithBodyClass('om-printing-invoice'));
    document.getElementById('btnDownloadInvoiceJson').addEventListener('click', () => {
      if (!state.lastInvoice) return;
      triggerDownload(
        'omnirag_purchase_request_' + state.lastInvoice.invoiceId + '.json',
        JSON.stringify(state.lastInvoice, null, 2),
        'application/json'
      );
    });

    document.getElementById('btnActivateKey').addEventListener('click', handleActivateLicenseKey);
    document.getElementById('btnResetLocalLicense').addEventListener('click', handleResetLocalLicense);

    // Backdrop click & Escape dismissal
    document.getElementById('auditReportModalBackdrop').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeAuditPreviewModal();
    });
    document.getElementById('omPaywallModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closePaywallModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!document.getElementById('omPaywallModal').classList.contains('om-hidden')) {
        closePaywallModal();
      } else if (!document.getElementById('auditReportModalBackdrop').classList.contains('om-hidden')) {
        closeAuditPreviewModal();
      }
    });

    // Preserve inbound ?autoProof=1/2/3 via cf-telemetry.js
    window.addEventListener('cf:open-step', ({ detail }) => {
      if (!detail) return;
      if (detail.step === 1) {
        document.getElementById('omPacks').open = true;
        const activeBtn = document.querySelector('.pack-card.active-pack');
        if (activeBtn) activeBtn.focus();
      }
      if (detail.step === 2) {
        const qList = QUESTIONS[state.currentPresetKey];
        if (qList && qList[0]) runPromptChip(qList[0][0]);
      }
      if (detail.step === 3) {
        openAuditPreviewModal();
      }
    });
  }

  async function init() {
    await loadPersistedState();
    bindEvents();
    switchPreset('enterprise_rag', false);
    selectCommercialPlan(state.selectedPlanCode || 'DD_PACK_249');
    renderLicenseHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
