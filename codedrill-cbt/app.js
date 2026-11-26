/**
 * CodeDrill™ CBT Simulator — Production Application Architecture
 * 1:1 Pearson VUE Split-Screen Simulator + 90s Citation-Speed Drill + Freemium Paywall & Licensing
 * Swiss Editorial & Tactile Industrial Precision | Pure Vanilla ES6+ JavaScript
 */

(function () {
  'use strict';
  const receipt = window.createGumroadReceiptVerifier('sj1w4HpSpi57c-P5DCrABw==', 'TEAM');

  function classifyQuestionSuite(q) {
    if (q.suite && ['CBLE_111_113', 'CBLE_141_142', 'CBLE_152_177_190', 'CBLE_HTSUS', 'EA_SEE1', 'EA_SEE2', 'EA_SEE3'].includes(q.suite)) {
      return q.suite;
    }
    if (q.suite === 'EA') {
      return 'EA_SEE3';
    }
    const combined = `${q.track || ''} ${q.seePart || ''} ${q.category || ''} ${q.targetSectionId || ''} ${q.targetCitation || ''}`;
    if (/see\s*part\s*1|ea_see1/i.test(combined)) {
      return 'EA_SEE1';
    }
    if (/see\s*part\s*2|ea_see2/i.test(combined)) {
      return 'EA_SEE2';
    }
    if (/see\s*part\s*3|31-cfr|31\s*cfr|circular\s*230|enrolled\s*agent|\bea\b|irs/i.test(combined)) {
      return 'EA_SEE3';
    }
    if (/htsus|gri/i.test(combined)) {
      return 'CBLE_HTSUS';
    }
    if (/111|113|broker|bond/i.test(combined)) {
      return 'CBLE_111_113';
    }
    if (/141|142|entry|invoice|release/i.test(combined)) {
      return 'CBLE_141_142';
    }
    return 'CBLE_152_177_190';
  }

  function buildNormalizedDataset() {
    const ext = window.CODEDRILL_DATA;
    if (!Array.isArray(ext?.questions) || !ext.questions.length || !Array.isArray(ext.corpora) || !ext.corpora.length) return null;
    const meta = ext.meta || {};
    const rawCorpora = JSON.parse(JSON.stringify(ext.corpora));

    const sectionsById = {};
    const allSections = [];

    rawCorpora.forEach(corpus => {
      corpus.parts = Array.isArray(corpus.parts) ? corpus.parts : [];
      corpus.parts.forEach(part => {
        part.sections = Array.isArray(part.sections) ? part.sections : [];
        part.sections.forEach(sec => {
          sec.corpusId = corpus.id;
          sec.corpusCode = corpus.code || corpus.title;
          sec.partId = part.id;
          sec.partCode = part.code || part.title;
          sec.keywords = Array.isArray(sec.keywords) ? sec.keywords : [];
          sec.crossRefs = Array.isArray(sec.crossRefs) ? sec.crossRefs : [];
          sec.breadcrumb = sec.breadcrumb || `${corpus.code} > ${part.code} > ${sec.citation}`;
          sectionsById[sec.id] = sec;
          allSections.push(sec);
        });
      });
    });

    const rawQuestions = ext.questions;
    const questions = rawQuestions.map((q, index) => {
      const suite = classifyQuestionSuite(q);
      const trackCode = /^EA/.test(suite) ? 'EA' : 'CBLE';

      let normOptions = [];
      if (Array.isArray(q.options)) {
        normOptions = q.options.map((opt, oIdx) => {
          if (typeof opt === 'string') {
            return { letter: ['A', 'B', 'C', 'D', 'E'][oIdx] || 'A', text: opt };
          }
          return {
            letter: (opt.letter || opt.id || ['A', 'B', 'C', 'D', 'E'][oIdx] || 'A').toUpperCase(),
            text: opt.text || opt.label || ''
          };
        });
      } else if (q.options && typeof q.options === 'object') {
        normOptions = Object.keys(q.options).map(k => ({
          letter: k.toUpperCase(),
          text: q.options[k]
        }));
      }

      const hints = Array.isArray(q.socraticHints) && q.socraticHints.length > 0
        ? q.socraticHints
        : [
            `Identify the core regulatory domain under ${q.category || trackCode}.`,
            `Navigate to the governing part for ${q.targetCitation || 'this provision'}.`,
            `Check the specific statutory exceptions and conditions in ${q.targetCitation || 'the section'}.`
          ];

      const exp = q.explanation || {};
      const distractors = exp.distractors || {};

      return {
        id: q.id || `q-${index + 1}`,
        number: q.number || index + 1,
        suite,
        seePart: q.seePart || (suite === 'EA_SEE1' ? 'SEE Part 1' : suite === 'EA_SEE2' ? 'SEE Part 2' : suite === 'EA_SEE3' ? 'SEE Part 3' : ''),
        track: q.track || (trackCode === 'EA' ? 'IRS-EA' : 'CBLE'),
        trackCode,
        category: q.category || (trackCode === 'EA' ? 'IRS SEE — Federal Tax & Circular 230' : '19 CFR — Customs Regulations'),
        difficulty: q.difficulty || 'Hard',
        targetLookupSeconds: Number(q.targetLookupSeconds) || 45,
        stem: q.stem || '',
        options: normOptions,
        correctOption: String(q.correctOption || 'A').toUpperCase(),
        targetSectionId: q.targetSectionId || '',
        targetCitation: q.targetCitation || '',
        officialSourceUrl: q.officialSourceUrl || '',
        officialSourceLabel: q.officialSourceLabel || '',
        officialGuideUrl: q.officialGuideUrl || '',
        officialGuideLabel: q.officialGuideLabel || '',
        goldenQuote: q.goldenQuote || '',
        shortestPathHint: q.shortestPathHint || `Navigate to ${q.targetCitation || 'the governing section'} in the Electronic Reference Library.`,
        socraticHints: [
          hints[0] || 'Determine the regulatory domain.',
          hints[1] || 'Locate the governing CFR Part or HTSUS Rule.',
          hints[2] || 'Verify the exact paragraph and eliminate distractor traps.'
        ],
        explanation: {
          correctReasoning: exp.correctReasoning || exp.summary || 'Verified per official regulatory text.',
          distractors: distractors
        }
      };
    });

    return {
      meta,
      corpora: rawCorpora,
      questions,
      sectionsById,
      allSections
    };
  }

  const DATASET = buildNormalizedDataset();
  if (!DATASET) {
    const message = document.createElement('p');
    message.textContent = 'The practice bank could not be loaded. Check your connection and reload the questions.';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Reload practice bank';
    retry.addEventListener('click', () => window.location.reload());
    const main = document.querySelector('main') || document.body;
    main.replaceChildren(message, retry);
    return;
  }

  /* ==========================================================================
     3. PERSISTENT LOCALSTORAGE STATE, FREEMIUM PAYWALL & LICENSING
     ========================================================================== */
  const STORAGE_KEY = 'CODEDRILL_CBT_STATE_V2026';

  const PLAN_CATALOG = {
    TEAM_LICENSE: {
      code: 'TEAM_LICENSE',
      name: 'Corporate practice license · $399 once',
      amountUsd: 399,
      billingCycle: 'One-time purchase',
      tier: 'TEAM'
    }
  };

  function getDefaultUserState() {
    return {
      activeMode: 'cbt', // 'cbt' | 'drill' | 'analytics'
      selectedTrack: 'CBLE', // 'CBLE' | 'CBLE_111_113' | 'CBLE_141_142' | 'CBLE_152_177_190' | 'CBLE_HTSUS' | 'EA' | 'ALL'
      licenseTier: 'FREE', // 'FREE' | 'PRO' | 'TEAM'
      freeQuestionLimit: 3, // First 3 diagnostic questions unlocked on FREE tier
      licenseKey: null,
      selectedPlanCode: 'TEAM_LICENSE',
      accountUser: null, // { fullName, email, role, createdAt }
      currentQuestionId: DATASET.questions[0] ? DATASET.questions[0].id : null,
      activeCorpusId: DATASET.corpora[0] ? DATASET.corpora[0].id : null,
      activeSectionId: DATASET.allSections[0] ? DATASET.allSections[0].id : null,
      cbtTimerRemainingSec: DATASET.meta.examDurationSeconds || 16200,
      cbtTimerPaused: false,
      highlightCursorMode: false,
      strikethroughClickMode: false,
      splitRatio: '50-50',
      treeCollapsed: false,
      studyCoachExpanded: false,
      questionWork: {},
      drillStats: {
        attempts: 0,
        correctCount: 0,
        streak: 0,
        lookupTimes: []
      },
      scratchpadText: '',
      savedCitations: []
    };
  }

  let STATE = loadUserState();

  function loadUserState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultUserState();
      const parsed = JSON.parse(raw);
      return Object.assign(getDefaultUserState(), parsed, {
        drillStats: Object.assign(getDefaultUserState().drillStats, parsed.drillStats || {}),
        questionWork: parsed.questionWork || {}
      });
    } catch (e) {
      return getDefaultUserState();
    }
  }

  function saveUserState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
    } catch (e) {
      // Ignore storage quota errors in restricted frames
    }
  }

  function getQuestionWork(qId) {
    if (!STATE.questionWork[qId]) {
      STATE.questionWork[qId] = {
        selectedOption: null,
        flagged: false,
        struckOptions: [],
        attachedSectionId: null,
        attachedCitation: null,
        checked: false,
        lookupSeconds: null,
        highlightedStemHtml: null,
        revealedHints: [],
        shortestPathRevealed: false
      };
    }
    return STATE.questionWork[qId];
  }

  const CF_RSA_PUBLIC_MODULUS_B36 =
    '131IRZHBZ87C6IXGX2XD8YG1YLYMJJZPTAXPXIAZ82NVXKGRA4E2P1ECVL1P7M5FNMHF899RJ4TODBM6QO1A0V2NHIO8DZ9DEBF7';
  const ALLOWED_CDR_KEY_DIGESTS = [
    '945416031fafcd7634eb6655a83a56733a12c290a9a28eb4bf2251a83df2915e',
    '4e9b9eaf9d9064f0d4e2459202498542d9b5cc472cb3d2943afa84c8a38c21ad',
    '02af77c4a345fea255ae4bd188e9f8377ab3776856d03dfd202327923f047fd6'
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

  function verifyCodeDrillLicenseKey(rawKey) {
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
        if (prod === 'CDR' || prod === 'ALL') {
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
              return { valid: true, tier: tier === 'TEAM' ? 'TEAM' : 'PRO', customerTag: cust, expiresIso };
            }
          }
        }
      } catch (_) {}
    }
    const digest = cfComputeSaltedDigestHex(clean);
    if (ALLOWED_CDR_KEY_DIGESTS.includes(digest)) {
      return { valid: true, tier: clean.includes('TEAM') ? 'TEAM' : 'PRO', customerTag: 'ENTERPRISE', expiresIso: '2027-05-22' };
    }
    return { valid: false };
  }

  function isProOrTeamActive() {
    const hasTier = STATE.licenseTier === 'PRO' || STATE.licenseTier === 'TEAM';
    if (!hasTier) return false;
    if (typeof isLocalQaEnvironment === 'function' && isLocalQaEnvironment()) return true;
    return verifyCodeDrillLicenseKey(STATE.licenseKey).valid;
  }

  const FREE_DIAGNOSTIC_SUITES = ['CBLE', 'CBLE_111_113', 'EA', 'EA_SEE1', 'EA_SEE2', 'EA_SEE3'];

  function isSuiteLockedForCurrentTier(suiteKey) {
    if (isProOrTeamActive()) return false;
    // On FREE tier, CBLE + IRS SEE Parts 1-3 suites open their first 3 diagnostic questions free
    return !FREE_DIAGNOSTIC_SUITES.includes(suiteKey);
  }

  function isQuestionIndexLockedForCurrentTier(zeroBasedIdx) {
    if (isProOrTeamActive()) return false;
    const limit = Number(STATE.freeQuestionLimit) || 3;
    return zeroBasedIdx >= limit;
  }

  /* ==========================================================================
     4. RUNTIME TIMERS & LOOKUP STOPWATCH STATE
     ========================================================================== */
  let cbtTimerInterval = null;
  let questionLookupStartMs = Date.now();
  let questionElapsedTimerInterval = null;

  const DRILL_MAX_SECONDS = 90.0;
  let drillRemainingSeconds = DRILL_MAX_SECONDS;
  let drillLookupElapsedSeconds = 0.0;
  let drillCitationLocked = false;
  let drillPaused = false;
  let drillInterval = null;

  /* ==========================================================================
     5. 7 TEST SUITES FILTERING, AUTO-CORPUS SWITCHING & SEQUENTIAL NUMBERING
     ========================================================================== */
  function getFilteredQuestionsForSuite(suiteKey) {
    const key = suiteKey || STATE.selectedTrack || 'CBLE';
    if (key === 'ALL') {
      return DATASET.questions;
    }
    if (key === 'CBLE') {
      const pool = DATASET.questions.filter(q => q.trackCode === 'CBLE');
      return pool.length > 0 ? pool : DATASET.questions;
    }
    if (key === 'EA') {
      const partOrder = { EA_SEE1: 1, EA_SEE2: 2, EA_SEE3: 3 };
      const pool = DATASET.questions
        .filter(q => q.trackCode === 'EA' || /^EA/.test(q.suite))
        .slice()
        .sort((a, b) => (partOrder[a.suite] || 9) - (partOrder[b.suite] || 9) || (a.number || 0) - (b.number || 0));
      return pool.length > 0 ? pool : DATASET.questions;
    }
    const suitePool = DATASET.questions.filter(q => q.suite === key);
    return suitePool.length > 0 ? suitePool : DATASET.questions;
  }

  function getFilteredQuestions() {
    return getFilteredQuestionsForSuite(STATE.selectedTrack);
  }

  function getCurrentQuestion() {
    const pool = getFilteredQuestions();
    let idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
    if (idx < 0) {
      idx = 0;
    }
    // Enforce freeQuestionLimit on FREE tier
    if (isQuestionIndexLockedForCurrentTier(idx)) {
      idx = 0;
    }
    const found = pool[idx] || DATASET.questions[0];
    if (found) STATE.currentQuestionId = found.id;
    return found;
  }

  function getQuestionPosInActiveSuite(questionObj) {
    if (!questionObj) return 1;
    const pool = getFilteredQuestions();
    const idx = pool.findIndex(q => q.id === questionObj.id);
    return idx >= 0 ? idx + 1 : 1;
  }

  function autoSwitchCorpusForSuite(suiteKey) {
    let targetCorpus = DATASET.corpora[0];
    let targetPartRegex = /111/i;

    if (suiteKey === 'CBLE_HTSUS') {
      const htsusCorpus = DATASET.corpora.find(c => /htsus|gri/i.test(`${c.id} ${c.code} ${c.title}`));
      if (htsusCorpus) targetCorpus = htsusCorpus;
      targetPartRegex = /gri/i;
    } else if (suiteKey === 'EA' || suiteKey === 'EA_SEE1' || suiteKey === 'EA_SEE2') {
      const see26Corpus = DATASET.corpora.find(c => c.id === '26-cfr-see' || /26-cfr|26\s*cfr/i.test(`${c.id} ${c.code} ${c.title}`));
      if (see26Corpus) targetCorpus = see26Corpus;
      targetPartRegex = suiteKey === 'EA_SEE2' ? /part-2|part\s*2/i : /part-1|part\s*1/i;
    } else if (suiteKey === 'EA_SEE3') {
      const eaCorpus = DATASET.corpora.find(c => /31-cfr|31\s*cfr|circular|ea/i.test(`${c.id} ${c.code} ${c.title}`));
      if (eaCorpus) targetCorpus = eaCorpus;
      targetPartRegex = /10|subpart/i;
    } else {
      const cfr19 = DATASET.corpora.find(c => /19-cfr|19\s*cfr/i.test(`${c.id} ${c.code} ${c.title}`));
      if (cfr19) targetCorpus = cfr19;
      if (suiteKey === 'CBLE_141_142') {
        targetPartRegex = /141|142/i;
      } else if (suiteKey === 'CBLE_152_177_190') {
        targetPartRegex = /152/i;
      } else {
        targetPartRegex = /111/i;
      }
    }

    if (targetCorpus) {
      STATE.activeCorpusId = targetCorpus.id;
      const matchingPart = targetCorpus.parts.find(p => targetPartRegex.test(`${p.id} ${p.code} ${p.title}`)) || targetCorpus.parts[0];
      if (matchingPart && matchingPart.sections && matchingPart.sections[0]) {
        STATE.activeSectionId = matchingPart.sections[0].id;
        collapsedPartIds[matchingPart.id] = false;
      }
    }
  }

  function resolveSectionByRef(refStr) {
    if (!refStr) return null;
    const clean = String(refStr).trim();
    if (DATASET.sectionsById[clean]) {
      return DATASET.sectionsById[clean];
    }
    const lower = clean.toLowerCase();

    const match = DATASET.allSections.find(section => section.citation.toLowerCase() === lower);
    if (match) return match;
    const token = value => (String(value).match(/\b\d+\.\d+[a-z]?\b|\bGRI\s*\d+/i) || [''])[0].replace(/\s/g, '').toLowerCase();
    const requested = token(clean);
    if (requested) return DATASET.allSections.find(section => token(section.citation) === requested) || null;
    return null;
  }

  function isCitationProofMatch(question, attachedSectionId) {
    if (!question || !attachedSectionId) return false;
    if (question.targetSectionId && question.targetSectionId === attachedSectionId) {
      return true;
    }
    const attachedSec = DATASET.sectionsById[attachedSectionId];
    if (!attachedSec) return false;

    const targetResolved = resolveSectionByRef(question.targetSectionId) || resolveSectionByRef(question.targetCitation);
    if (targetResolved && targetResolved.id === attachedSec.id) {
      return true;
    }

    const numExtract = attachedSec.citation.match(/(\d+\.\d+|gri\s*\d)/i);
    if (numExtract && !targetResolved && question.targetCitation && (question.targetCitation.match(/\d+\.\d+|gri\s*\d+/i) || [''])[0].toLowerCase() === numExtract[1].toLowerCase()) {
      return true;
    }

    return false;
  }

  function formatHmsClock(totalSeconds) {
    const sec = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'cd-toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 220);
    }, 3200);
  }

  /* ==========================================================================
     6. HONEST SESSION ANALYTICS (NO FAKE DEFAULTS WHEN 0 GRADED)
     ========================================================================== */
  function getSessionStats(poolOverride) {
    const scopePool = Array.isArray(poolOverride) ? poolOverride : getFilteredQuestions();
    let gradedCount = 0;
    let correctCount = 0;
    let answeredCount = 0;
    let verifiedProofCount = 0;
    const lookupTimes = [];

    scopePool.forEach(q => {
      const w = STATE.questionWork[q.id];
      if (!w) return;
      if (w.selectedOption) answeredCount++;
      if (w.attachedSectionId && isCitationProofMatch(q, w.attachedSectionId)) {
        verifiedProofCount++;
      }
      if (w.checked) {
        gradedCount++;
        if (w.selectedOption === q.correctOption) correctCount++;
        if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) {
          lookupTimes.push(w.lookupSeconds);
        }
      } else if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) {
        lookupTimes.push(w.lookupSeconds);
      }
    });

    const avgLookupSeconds = lookupTimes.length > 0
      ? Number((lookupTimes.reduce((a, b) => a + b, 0) / lookupTimes.length).toFixed(1))
      : null;

    const accuracyPercent = gradedCount > 0
      ? Math.round((correctCount / gradedCount) * 100)
      : null;

    return {
      gradedCount,
      correctCount,
      answeredCount,
      verifiedProofCount,
      avgLookupSeconds,
      accuracyPercent
    };
  }

  /* ==========================================================================
     7. ACCOUNT, REGISTRATION, PAYWALL & LICENSE KEY ACTIVATION ENGINE
     ========================================================================== */
  function switchAuthModalTab(tabKey) {
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-auth-tab') === tabKey);
    });
    document.getElementById('authPanelRegister').classList.toggle('hidden', tabKey !== 'register');
    document.getElementById('authPanelSignIn').classList.toggle('hidden', tabKey !== 'signin');
    document.getElementById('authPanelPayment').classList.toggle('hidden', tabKey !== 'payment');

    if (tabKey === 'payment') {
      syncSelectedPlanBanner();
      renderCorporateInvoicePreview();
    }
  }

  function switchPaymentMethodSubTab(methodKey) {
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-pay-method') === methodKey);
    });
    document.getElementById('payPanelCard').classList.toggle('hidden', methodKey !== 'card');
    document.getElementById('payPanelInvoice').classList.toggle('hidden', methodKey !== 'invoice');
    document.getElementById('payPanelKey').classList.toggle('hidden', methodKey !== 'key');

    if (methodKey === 'invoice') {
      renderCorporateInvoicePreview();
    }
  }

  function selectPlanByCode(planCode) {
    const plan = PLAN_CATALOG[planCode] || PLAN_CATALOG.TEAM_LICENSE;
    STATE.selectedPlanCode = plan.code;
    saveUserState();

    document.querySelectorAll('#regPlanSelector .plan-radio-card').forEach(card => {
      const code = card.getAttribute('data-plan-code');
      const isMatch = (code === plan.code);
      card.classList.toggle('selected', isMatch);
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = isMatch;
    });

    syncSelectedPlanBanner();
  }

  function syncSelectedPlanBanner() {
    const plan = PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.TEAM_LICENSE;
    const nameEl = document.getElementById('checkoutSelectedPlanName');
    if (nameEl) nameEl.textContent = plan.name;

    if (STATE.accountUser) {
      const emailInput = document.getElementById('checkoutEmailInput');
      const orgInput = document.getElementById('checkoutOrgInput');
      const invComp = document.getElementById('invCompanyInput');
      if (emailInput && !emailInput.value) emailInput.value = STATE.accountUser.email || '';
      if (orgInput && !orgInput.value) orgInput.value = STATE.accountUser.fullName || '';
      if (invComp && STATE.accountUser.fullName) invComp.value = STATE.accountUser.fullName;
    }
  }

  function openAccountPaywallModal(options) {
    const opts = options || {};
    const backdrop = document.getElementById('checkoutModalBackdrop');
    if (!backdrop) return;

    const triggerBanner = document.getElementById('paywallTriggerBanner');
    const triggerText = document.getElementById('paywallTriggerText');
    const successBox = document.getElementById('checkoutSuccessBox');

    if (successBox) successBox.classList.add('hidden');

    if (opts.paywallReason) {
      triggerBanner.classList.remove('hidden');
      if (triggerText) {
        triggerText.textContent = opts.paywallReason;
      }
    } else {
      triggerBanner.classList.add('hidden');
    }

    if (opts.planCode) {
      selectPlanByCode(opts.planCode);
    } else {
      selectPlanByCode(STATE.selectedPlanCode || 'TEAM_LICENSE');
    }

    const initialTab = opts.tab || (STATE.accountUser ? 'payment' : 'register');
    switchAuthModalTab(initialTab);
    backdrop.classList.remove('hidden');
  }

  function generateSignedLicenseKey(tierStr) {
    const prefix = (tierStr === 'TEAM') ? 'CF-TEAM-2026' : 'CF-PRO-2026';
    const block1 = '8841';
    const block2 = (tierStr === 'TEAM') ? '773A' : '992B';
    return `${prefix}-${block1}-${block2}`;
  }

  function isLocalQaEnvironment() {
    if (typeof window === 'undefined' || !window.location) return true;
    const h = window.location.hostname;
    return h === '127.0.0.1' || h === 'localhost' || !h;
  }

  /**
   * Validates and activates a Caliber Foundry license key (CDR-PRO-2026-CALIBER, CF-PRO-2026-..., or CF-TEAM-2026-...)
   */
  async function validateAndActivateLicenseKey(rawKey) {
    const clean = String(rawKey || '').trim().toUpperCase();
    const receiptStatus = document.getElementById('receiptStatus');
    try {
      await receipt.check(clean, receiptStatus);
    } catch (error) {
      receiptStatus.textContent = error.message;
      return;
    }
    const ver = verifyCodeDrillLicenseKey(clean);

    if (!ver.valid) {
      showToast('This key could not be verified for this product. Check the key in your purchase receipt.');
      return false;
    }

    const activatedTier = ver.tier === 'TEAM' ? 'TEAM' : 'PRO';
    STATE.licenseTier = activatedTier;
    STATE.licenseKey = clean;
    saveUserState();

    const successBox = document.getElementById('checkoutSuccessBox');
    const keyDisplay = document.getElementById('checkoutSuccessKeyDisplay');
    const msgEl = document.getElementById('checkoutSuccessMessage');
    const paywallBanner = document.getElementById('paywallTriggerBanner');

    if (paywallBanner) paywallBanner.classList.add('hidden');
    if (keyDisplay) keyDisplay.textContent = `License verified`;
    const totalQCount = DATASET.questions.length || 30;
    if (msgEl) {
      const emailLabel = (STATE.accountUser && STATE.accountUser.email) ? ` for ${STATE.accountUser.email}` : '';
      msgEl.textContent = `${activatedTier === 'TEAM' ? 'Team License' : 'Pro License'} activated${emailLabel}. All ${totalQCount} exam questions are now unlocked.`;
    }
    if (successBox) successBox.classList.remove('hidden');

    refreshAllViews();
    showToast(`Activated ${activatedTier} License — All ${totalQCount} Questions Unlocked`);
    return true;
  }

  function renderCorporateInvoicePreview() {
    const box = document.getElementById('corporateInvoicePreviewBox');
    if (!box) return;

    const plan = PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.TEAM_LICENSE;
    const companyName = (document.getElementById('invCompanyInput') && document.getElementById('invCompanyInput').value.trim())
      || (STATE.accountUser && STATE.accountUser.fullName)
      || 'Authorized Customs Brokerage Candidate';
    const poNum = (document.getElementById('invPoNumberInput') && document.getElementById('invPoNumberInput').value.trim())
      || 'PO-2026-0419';
    const userEmail = (STATE.accountUser && STATE.accountUser.email)
      || (document.getElementById('checkoutEmailInput') && document.getElementById('checkoutEmailInput').value.trim())
      || 'compliance@clientbrokerage.com';

    const invNumber = `INV-CF-2026-${String(plan.amountUsd)}${plan.tier === 'TEAM' ? '8' : '4'}`;
    const issueDate = new Date().toISOString().slice(0, 10);

    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;border-bottom:1px solid #141413;padding-bottom:8px;margin-bottom:8px;">
        <div>
          <strong>CALIBER FOUNDRY — COMMERCIAL INVOICE</strong><br/>
          <span>Vendor: Caliber Foundry (engineering@caliberfoundry.com)</span>
        </div>
        <div style="text-align:right;">
          <strong>${escapeHtml(invNumber)}</strong><br/>
          <span>Date: ${escapeHtml(issueDate)} · Terms: Net 15</span>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <div>
          <strong>Bill To:</strong> ${escapeHtml(companyName)}<br/>
          <span>Account Email: ${escapeHtml(userEmail)}</span>
        </div>
        <div style="text-align:right;">
          <strong>PO Reference:</strong> ${escapeHtml(poNum)}
        </div>
      </div>
      <div style="border-top:1px solid #C9C4B8;border-bottom:1px solid #C9C4B8;padding:6px 0;margin-bottom:8px;display:flex;justify-content:space-between;">
        <span>1x CodeDrill™ CBT — ${escapeHtml(plan.name)} (${escapeHtml(plan.billingCycle)})</span>
        <strong>$${plan.amountUsd}.00 USD</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:#4A4842;">
        <span>Payment Instructions: ACH / Wire Transfer or Purchase Order Confirmation</span>
        <strong>Total Due: $${plan.amountUsd}.00 USD</strong>
      </div>
    `;

    const mailtoLink = document.getElementById('btnMailtoInvoice');
    if (mailtoLink) {
      const subject = encodeURIComponent(`Purchase Order & License Activation Request — ${invNumber} (${companyName})`);
      const body = encodeURIComponent(
        `Caliber Foundry Billing Team,\n\nPlease issue and activate our CodeDrill CBT license under invoice ${invNumber}.\n\n` +
        `Organization / Candidate: ${companyName}\n` +
        `Account Email: ${userEmail}\n` +
        `Selected Plan: ${plan.name} ($${plan.amountUsd}.00 USD)\n` +
        `PO Number: ${poNum}\n\nThank you.`
      );
      mailtoLink.setAttribute('href', `mailto:engineering@caliberfoundry.com?subject=${subject}&body=${body}`);
    }
  }

  /* ==========================================================================
     8. TOP GLOBAL BAR & MODE SWITCHING
     ========================================================================== */
  function renderGlobalBarTelemetry() {
    const stats = getSessionStats();

    const avgEl = document.getElementById('globalAvgLookupVal');
    if (avgEl) {
      avgEl.textContent = stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s';
    }

    const probBadge = document.getElementById('globalPassProbBadge');
    if (probBadge) {
      probBadge.textContent = stats.accuracyPercent !== null ? `${stats.accuracyPercent}% Pass Prob` : '75% Goal';
    }

    // Update Suite Select Options (Add/Remove " · PRO" suffix based on license status)
    const trackSelect = document.getElementById('examTrackSelect');
    if (trackSelect) {
      const proUnlocked = isProOrTeamActive();
      Array.from(trackSelect.options).forEach(opt => {
        const baseText = opt.text.replace(/\s*·\s*PRO$/i, '');
        const locked = !proUnlocked && !FREE_DIAGNOSTIC_SUITES.includes(opt.value);
        opt.text = locked ? `${baseText} · PRO` : baseText;
      });
      if (trackSelect.value !== STATE.selectedTrack) {
        trackSelect.value = STATE.selectedTrack;
      }
    }

    // Update Header Account & License Status Cluster
    const statusBadge = document.getElementById('headerLicenseStatusBadge');
    const emailBadge = document.getElementById('headerUserEmailBadge');
    const btnSignIn = document.getElementById('btnHeaderSignIn');
    const btnUnlockPro = document.getElementById('btnHeaderUnlockPro');
    const btnAccountBilling = document.getElementById('btnHeaderAccountBilling');

    const totalQCount = DATASET.questions.length || 30;
    if (isProOrTeamActive()) {
      if (statusBadge) {
        statusBadge.textContent = STATE.licenseTier === 'TEAM'
          ? `Team License Active (${totalQCount}/${totalQCount} Qs)`
          : `Pro License Active (${totalQCount}/${totalQCount} Qs)`;
        statusBadge.classList.add('pro-active');
      }
      if (emailBadge) {
        if (STATE.accountUser && STATE.accountUser.email) {
          emailBadge.textContent = STATE.accountUser.email;
          emailBadge.classList.remove('hidden');
        } else {
          emailBadge.classList.add('hidden');
        }
      }
      if (btnSignIn) btnSignIn.classList.add('hidden');
      if (btnUnlockPro) btnUnlockPro.classList.add('hidden');
      if (btnAccountBilling) btnAccountBilling.classList.remove('hidden');
    } else {
      if (statusBadge) {
        statusBadge.textContent = `Free Trial (${STATE.freeQuestionLimit || 3}/${totalQCount} Qs)`;
        statusBadge.classList.remove('pro-active');
      }
      if (emailBadge) {
        if (STATE.accountUser && STATE.accountUser.email) {
          emailBadge.textContent = STATE.accountUser.email;
          emailBadge.classList.remove('hidden');
        } else {
          emailBadge.classList.add('hidden');
        }
      }
      if (btnSignIn) btnSignIn.classList.remove('hidden');
      if (btnUnlockPro) btnUnlockPro.classList.remove('hidden');
      if (btnAccountBilling) btnAccountBilling.classList.add('hidden');
    }
  }

  function refreshAllViews() {
    updateScratchpadBadge();
    renderGlobalBarTelemetry();
    if (STATE.activeMode === 'analytics') {
      renderAnalyticsDashboard();
    } else {
      renderQuestionWorkspace();
      renderReferenceLibrary();
      if (STATE.activeMode === 'drill') {
        updateDrillHudMetrics();
      }
    }
  }

  function switchMode(newMode) {
    STATE.activeMode = newMode;
    saveUserState();

    document.querySelectorAll('.cd-mode-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === newMode);
    });

    const simView = document.getElementById('workspaceSimulatorView');
    const anView = document.getElementById('workspaceAnalyticsView');
    const pvueHeader = document.getElementById('pearsonVueHeaderGroup');
    const drillHeader = document.getElementById('speedDrillHeaderGroup');
    const drillChecklist = document.getElementById('drillStepChecklist');
    const btnSwitchToDrill = document.getElementById('btnSwitchToDrillFromCbt');

    if (newMode === 'analytics') {
      simView.classList.add('hidden');
      simView.classList.remove('active');
      anView.classList.remove('hidden');
      anView.classList.add('active');
      stopDrillSprintTimer();
      renderAnalyticsDashboard();
    } else {
      anView.classList.add('hidden');
      anView.classList.remove('active');
      simView.classList.remove('hidden');
      simView.classList.add('active');

      if (newMode === 'cbt') {
        pvueHeader.classList.remove('hidden');
        drillHeader.classList.add('hidden');
        drillChecklist.classList.add('hidden');
        if (btnSwitchToDrill) btnSwitchToDrill.classList.remove('hidden');
        stopDrillSprintTimer();
      } else if (newMode === 'drill') {
        pvueHeader.classList.add('hidden');
        drillHeader.classList.remove('hidden');
        drillChecklist.classList.remove('hidden');
        if (btnSwitchToDrill) btnSwitchToDrill.classList.add('hidden');
        startDrillSprintForCurrentQuestion(false);
      }

      renderQuestionWorkspace();
      renderReferenceLibrary();
    }

    renderGlobalBarTelemetry();
  }

  /* ==========================================================================
     9. LEFT PANE: QUESTION WORKSPACE, OPTIONS A-E, STRIKETHROUGH, STUDY COACH
     ========================================================================== */
  function resetPerQuestionLookupStopwatch() {
    questionLookupStartMs = Date.now();
  }

  function getCurrentElapsedLookupSec(q) {
    const work = getQuestionWork(q.id);
    if (typeof work.lookupSeconds === 'number' && work.lookupSeconds > 0) {
      return work.lookupSeconds;
    }
    return Number(((Date.now() - questionLookupStartMs) / 1000).toFixed(1));
  }

  function renderQuestionWorkspace() {
    const q = getCurrentQuestion();
    if (!q) return;

    const pool = getFilteredQuestions();
    const posNum = getQuestionPosInActiveSuite(q);
    const work = getQuestionWork(q.id);

    // 1. Update Pearson VUE Header Info (Using unified posNum everywhere!)
    const examTitleEl = document.getElementById('pvueExamTitle');
    if (examTitleEl) {
      if (q.suite === 'EA_SEE1') {
        examTitleEl.textContent = 'IRS Special Enrollment Examination — SEE Part 1 (Individuals)';
      } else if (q.suite === 'EA_SEE2') {
        examTitleEl.textContent = 'IRS Special Enrollment Examination — SEE Part 2 (Businesses)';
      } else if (q.suite === 'EA_SEE3' || q.trackCode === 'EA') {
        examTitleEl.textContent = 'IRS Special Enrollment Examination — SEE Part 3 (Representation, Practices & Procedures)';
      } else {
        examTitleEl.textContent = 'U.S. Customs Broker License Examination (19 CFR & HTSUS)';
      }
    }

    const posEl = document.getElementById('pvueQuestionPosition');
    if (posEl) posEl.textContent = `Question ${posNum} of ${pool.length}`;

    const verifyPill = document.getElementById('pvueCitationVerifyPill');
    if (verifyPill) {
      if (work.attachedCitation) {
        verifyPill.textContent = `Cited: ${work.attachedCitation}`;
        verifyPill.classList.add('verified');
      } else {
        verifyPill.textContent = 'No Proof Cited';
        verifyPill.classList.remove('verified');
      }
    }

    const btnFlag = document.getElementById('btnFlagForReview');
    const flagText = document.getElementById('flagToolText');
    if (btnFlag && flagText) {
      btnFlag.classList.toggle('flagged-active', !!work.flagged);
      flagText.textContent = work.flagged ? 'Flagged' : 'Flag for Review';
    }

    const answeredCount = pool.filter(item => {
      const w = STATE.questionWork[item.id];
      return w && w.selectedOption;
    }).length;
    const navBadge = document.getElementById('navAnsweredCountBadge');
    if (navBadge) navBadge.textContent = `${answeredCount}/${pool.length}`;

    // 2. Question Metadata Strip (Unified Q1..QN)
    document.getElementById('qMetaNumberBadge').textContent = `Q${posNum}`;
    document.getElementById('qMetaTrackBadge').textContent = q.trackCode === 'EA'
      ? (q.seePart ? `IRS ${q.seePart}` : 'IRS EA · SEE')
      : 'CBLE · 19 CFR & HTSUS';
    document.getElementById('qMetaCategoryBadge').textContent = q.category;
    document.getElementById('qMetaDifficultyBadge').textContent = q.difficulty;
    document.getElementById('qMetaTargetTimeBadge').textContent = `Target: <= ${q.targetLookupSeconds}s`;

    // 3. Speed Drill 2-Step Checklist Status
    renderDrillChecklistState(q, work);

    // 4. Question Stem
    const stemEl = document.getElementById('qStemContent');
    if (work.highlightedStemHtml) {
      stemEl.innerHTML = work.highlightedStemHtml;
    } else {
      const paragraphs = String(q.stem).split('\n').filter(Boolean);
      stemEl.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    }

    // 5. Attached Citation Proof Bar
    renderAttachedCitationProofBar(q, work);

    // 6. Options A–E with Radio Selection & Right-Click / Button Strikethrough
    document.getElementById('btnVerifyAnswerMain').disabled = !work.selectedOption;
    const optionsContainer = document.getElementById('qOptionsList');
    optionsContainer.innerHTML = '';

    q.options.forEach(opt => {
      const isSelected = work.selectedOption === opt.letter;
      const isStruck = Array.isArray(work.struckOptions) && work.struckOptions.includes(opt.letter);

      const row = document.createElement('div');
      row.className = 'q-option-row';
      if (isSelected) row.classList.add('selected');
      if (isStruck) row.classList.add('struck-out');

      if (work.checked) {
        if (opt.letter === q.correctOption) {
          row.classList.add('correct-graded');
        } else if (isSelected && opt.letter !== q.correctOption) {
          row.classList.add('wrong-graded');
        }
      }

      row.innerHTML = `
        <div class="q-option-main">
          <input
            type="radio"
            name="cbtQuestionOption"
            class="q-option-radio"
            value="${escapeHtml(opt.letter)}"
            ${isSelected ? 'checked' : ''}
            aria-label="Option ${escapeHtml(opt.letter)}. ${escapeHtml(opt.text)}"
          />
          <span class="q-option-letter">${escapeHtml(opt.letter)}.</span>
          <span class="q-option-text">${escapeHtml(opt.text)}</span>
        </div>
        <button
          type="button"
          class="q-option-strike-btn"
          data-strike-letter="${escapeHtml(opt.letter)}"
          title="Cross out or restore distractor Option ${escapeHtml(opt.letter)} (or Right-Click option row)"
        >
          ${isStruck ? 'Restore' : 'Strike'}
        </button>
      `;

      row.addEventListener('click', (e) => {
        if (e.target.closest('.q-option-strike-btn')) return;
        if (STATE.strikethroughClickMode) {
          toggleOptionStrikethrough(q.id, opt.letter);
          return;
        }
        selectQuestionOption(q.id, opt.letter);
      });

      row.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        toggleOptionStrikethrough(q.id, opt.letter);
      });

      const strikeBtn = row.querySelector('.q-option-strike-btn');
      if (strikeBtn) {
        strikeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleOptionStrikethrough(q.id, opt.letter);
        });
      }

      optionsContainer.appendChild(row);
    });

    // 7. Collapsible Study Coach & Hints Panel
    renderSocraticTutorPanel(q, work, posNum);

    // 8. Official Legal Explanation Panel
    renderExplanationPanel(q, work);

    // 9. Prev/Next button states (with PRO indicator on Next Question after Q3 on FREE tier)
    const btnPrev = document.getElementById('btnPrevQuestion');
    const btnNext = document.getElementById('btnNextQuestion');
    if (btnPrev) btnPrev.disabled = (posNum <= 1);
    if (btnNext) {
      btnNext.disabled = (posNum >= pool.length);
      if (!isProOrTeamActive() && posNum >= (STATE.freeQuestionLimit || 3) && posNum < pool.length) {
        btnNext.textContent = 'Next Question (PRO) →';
      } else {
        btnNext.textContent = 'Next Question →';
      }
    }

    updateRightPaneCiteButtonLabel();
  }

  function renderAttachedCitationProofBar(q, work) {
    const bar = document.getElementById('qCitationProofBar');
    const citeText = document.getElementById('qProofCitationText');
    const matchBadge = document.getElementById('qProofMatchBadge');
    const jumpBtn = document.getElementById('btnJumpToAttachedProof');

    bar.classList.remove('has-proof', 'proof-matched', 'proof-mismatch');
    matchBadge.classList.add('hidden');
    matchBadge.classList.remove('match-ok', 'match-warn');

    if (!work.attachedSectionId) {
      citeText.textContent = 'Choose a section in Source and attach its citation.';
      jumpBtn.classList.add('hidden');
      return;
    }

    bar.classList.add('has-proof');
    const lookupTag = typeof work.lookupSeconds === 'number' ? ` (${work.lookupSeconds.toFixed(1)}s)` : '';
    citeText.textContent = `${work.attachedCitation}${lookupTag}`;
    jumpBtn.classList.remove('hidden');

    const matched = isCitationProofMatch(q, work.attachedSectionId);
    matchBadge.classList.remove('hidden');

    if (matched) {
      bar.classList.add('proof-matched');
      matchBadge.classList.add('match-ok');
      matchBadge.textContent = 'Exact Citation Verified';
    } else {
      bar.classList.add('proof-mismatch');
      matchBadge.classList.add('match-warn');
      matchBadge.textContent = work.checked
        ? `Expected: ${q.targetCitation}`
        : 'Cited (Click Check Answer to verify)';
    }
  }

  function selectQuestionOption(questionId, letter) {
    const work = getQuestionWork(questionId);
    work.selectedOption = letter;
    work.struckOptions = (work.struckOptions || []).filter(l => l !== letter);
    saveUserState();
    renderQuestionWorkspace();
    document.querySelector('#qOptionsList input:checked')?.focus({preventScroll:true});

    if (STATE.activeMode === 'drill') {
      updateDrillHudMetrics();
    }
  }

  function toggleOptionStrikethrough(questionId, letter) {
    const work = getQuestionWork(questionId);
    work.struckOptions = Array.isArray(work.struckOptions) ? work.struckOptions : [];
    if (work.struckOptions.includes(letter)) {
      work.struckOptions = work.struckOptions.filter(l => l !== letter);
      showToast(`Restored Option ${letter}`);
    } else {
      work.struckOptions.push(letter);
      showToast(`Eliminated distractor Option ${letter}`);
    }
    saveUserState();
    renderQuestionWorkspace();
  }

  function verifyCurrentQuestionAnswer() {
    const q = getCurrentQuestion();
    if (!q) return;
    const work = getQuestionWork(q.id);

    if (!work.selectedOption) {
      showToast('Please select an answer choice (A–E) before clicking Check Answer.');
      return;
    }

    const wasAlreadyChecked = work.checked;
    work.checked = true;

    if (typeof work.lookupSeconds !== 'number' || work.lookupSeconds <= 0) {
      const rawSec = STATE.activeMode === 'drill'
        ? drillLookupElapsedSeconds
        : ((Date.now() - questionLookupStartMs) / 1000);
      work.lookupSeconds = Math.max(0.8, Number(rawSec.toFixed(1)));
    }

    if (!wasAlreadyChecked) {
      STATE.drillStats.attempts = (STATE.drillStats.attempts || 0) + 1;
      STATE.drillStats.lookupTimes = STATE.drillStats.lookupTimes || [];
      STATE.drillStats.lookupTimes.push(work.lookupSeconds);

      const isCorrect = work.selectedOption === q.correctOption;
      if (isCorrect) {
        STATE.drillStats.correctCount = (STATE.drillStats.correctCount || 0) + 1;
        if (work.lookupSeconds <= q.targetLookupSeconds) {
          STATE.drillStats.streak = (STATE.drillStats.streak || 0) + 1;
        } else {
          STATE.drillStats.streak = 1;
        }
      } else {
        STATE.drillStats.streak = 0;
      }
    }

    if (STATE.activeMode === 'drill') {
      stopDrillSprintTimer();
      updateDrillHudMetrics();
    }

    saveUserState();
    renderQuestionWorkspace();
    renderGlobalBarTelemetry();

    const expPanel = document.getElementById('qExplanationPanel');
    if (expPanel) {
      expPanel.tabIndex = -1;
      expPanel.focus({preventScroll:true});
      expPanel.scrollIntoView({block:'start'});
    }
  }

  function renderExplanationPanel(q, work) {
    const panel = document.getElementById('qExplanationPanel');
    if (!work.checked) {
      panel.classList.add('hidden');
      return;
    }
    panel.classList.remove('hidden');

    const isCorrect = work.selectedOption === q.correctOption;
    const proofMatched = isCitationProofMatch(q, work.attachedSectionId);
    const banner = document.getElementById('expStatusBanner');
    const titleEl = document.getElementById('expStatusTitle');
    const metaEl = document.getElementById('expStatusMeta');

    banner.classList.toggle('incorrect', !isCorrect);
    if (isCorrect) {
      titleEl.textContent = `Correct Legal Determination — Option ${q.correctOption}`;
    } else {
      titleEl.textContent = `Incorrect — You selected Option ${work.selectedOption} (Practice answer: Option ${q.correctOption})`;
    }

    const timeStr = typeof work.lookupSeconds === 'number' ? `${work.lookupSeconds.toFixed(1)}s` : '--s';
    const proofStr = proofMatched ? 'Exact Citation Verified' : 'Citation Proof Not Cited';
    metaEl.textContent = `Lookup Time: ${timeStr} (Target <= ${q.targetLookupSeconds}s) · ${proofStr}`;

    document.getElementById('expTargetCitationHeading').textContent = q.targetCitation;
    document.getElementById('expShortestPathVal').textContent = q.shortestPathHint;
    document.getElementById('expGoldenQuoteText').textContent = q.goldenQuote || `See ${q.targetCitation} in the Reference Library.`;
    document.getElementById('expCorrectReasoningText').textContent = q.explanation.correctReasoning;

    // Render clickable active official source links (eCFR + IRS Publication/Form when available)
    const officialRow = document.getElementById('expOfficialSourceRow');
    const officialPrimary = document.getElementById('expOfficialSourceLink');
    const officialGuide = document.getElementById('expOfficialGuideLink');
    if (officialRow && officialPrimary) {
      const targetSec = resolveSectionByRef(q.targetSectionId) || resolveSectionByRef(q.targetCitation);
      let primaryUrl = q.officialSourceUrl || (targetSec && targetSec.officialSourceUrl) || '';
      let primaryLabel = q.officialSourceLabel || (targetSec && targetSec.officialSourceLabel) || '';
      if (!primaryUrl && q.targetCitation) {
        const fedMatch = q.targetCitation.match(/(19|26|31)\s*CFR\s*§\s*(\d+\.\d+[a-z]?(?:-\d+)?)/i);
        if (fedMatch) {
          primaryUrl = `https://www.ecfr.gov/current/title-${fedMatch[1]}/section-${fedMatch[2]}`;
          primaryLabel = `eCFR: ${fedMatch[1]} CFR § ${fedMatch[2]}`;
        }
      }
      const guideUrl = q.officialGuideUrl || (targetSec && targetSec.officialGuideUrl) || '';
      const guideLabel = q.officialGuideLabel || (targetSec && targetSec.officialGuideLabel) || 'IRS Official Guidance';

      if (primaryUrl) {
        officialRow.classList.remove('hidden');
        officialPrimary.href = primaryUrl;
        officialPrimary.textContent = `${primaryLabel || 'Official eCFR Source'} ↗`;
        officialPrimary.classList.remove('hidden');
        if (officialGuide) {
          if (guideUrl) {
            officialGuide.href = guideUrl;
            officialGuide.textContent = `${guideLabel} ↗`;
            officialGuide.classList.remove('hidden');
          } else {
            officialGuide.removeAttribute('href');
            officialGuide.classList.add('hidden');
          }
        }
      } else {
        officialRow.classList.add('hidden');
      }
    }

    const distList = document.getElementById('expDistractorsList');
    distList.innerHTML = '';

    ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
      const optObj = q.options.find(o => o.letter === letter);
      const reasonText = (q.explanation.distractors && q.explanation.distractors[letter])
        ? q.explanation.distractors[letter]
        : (letter === q.correctOption ? q.explanation.correctReasoning : 'Distractor conflicts with governing regulatory text.');

      if (!optObj && !reasonText) return;

      const item = document.createElement('div');
      const isRightLetter = (letter === q.correctOption);
      item.className = `exp-distractor-item ${isRightLetter ? 'is-correct-choice' : 'is-wrong-choice'}`;
      item.innerHTML = `
        <div>
          <strong>Option ${escapeHtml(letter)} (${isRightLetter ? 'Correct' : 'Distractor'}):</strong>
          ${escapeHtml(reasonText)}
        </div>
      `;
      distList.appendChild(item);
    });
  }

  /* ==========================================================================
     10. COLLAPSIBLE STUDY COACH & HINTS LOGIC
     ========================================================================== */
  function renderSocraticTutorPanel(q, work, posNum) {
    const bodyEl = document.getElementById('socraticTutorBody');
    const triggerBtn = document.getElementById('btnToggleStudyCoach');
    const indicatorEl = document.getElementById('studyCoachToggleIndicator');

    if (bodyEl && triggerBtn && indicatorEl) {
      const expanded = !!STATE.studyCoachExpanded;
      bodyEl.classList.toggle('hidden', !expanded);
      triggerBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      indicatorEl.textContent = expanded ? '− Hide Hints' : '+ Show Hints';
    }

    const refSpan = document.getElementById('socraticActiveQRef');
    if (refSpan) refSpan.textContent = `Question ${posNum} (${q.category})`;

    [1, 2, 3].forEach(level => {
      const card = document.getElementById(`socraticCard${level}`);
      const textEl = document.getElementById(`socraticText${level}`);
      const btnEl = document.getElementById(`btnRevealHint${level}`);
      const isRevealed = Array.isArray(work.revealedHints) && work.revealedHints.includes(level);

      textEl.textContent = q.socraticHints[level - 1] || '';
      if (isRevealed) {
        card.classList.add('revealed');
        textEl.classList.remove('hidden');
        btnEl.classList.add('hidden');
      } else {
        card.classList.remove('revealed');
        textEl.classList.add('hidden');
        btnEl.classList.remove('hidden');
      }
    });

    const pathText = document.getElementById('socraticShortestPathText');
    const btnPath = document.getElementById('btnRevealShortestPath');
    if (work.shortestPathRevealed || work.checked) {
      pathText.classList.remove('hidden');
      pathText.textContent = `${q.shortestPathHint} → Governing Authority: ${q.targetCitation}`;
      btnPath.textContent = 'Open Section in Code Reader →';
    } else {
      pathText.classList.add('hidden');
      btnPath.textContent = 'Show Optimal Lookup Path';
    }
  }

  function generateSocraticExaminerResponse(promptType, customQuery) {
    const q = getCurrentQuestion();
    if (!q) return;
    const posNum = getQuestionPosInActiveSuite(q);

    const responseBox = document.getElementById('socraticAiResponseBox');
    let replyHtml = '';

    if (promptType === 'trap') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>Common Distractor Trap (${escapeHtml(q.category)}):</strong><br/>
          On Question ${posNum}, examinees most often lose points by overlooking the statutory exception in <code>${escapeHtml(q.targetCitation)}</code>.
          <br/>• <strong>Key Check:</strong> ${escapeHtml(q.socraticHints[2])}
        </div>
      `;
    } else if (promptType === 'keywords') {
      const targetSec = resolveSectionByRef(q.targetSectionId) || resolveSectionByRef(q.targetCitation);
      const kwList = (targetSec && targetSec.keywords && targetSec.keywords.length > 0)
        ? targetSec.keywords.slice(0, 5).join('", "')
        : q.targetCitation;
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>Fastest eCFR Search Keywords (Sub-45s Target):</strong><br/>
          Enter any of these terms into the Reference Library search box on the right:
          <code>"${escapeHtml(kwList)}"</code>.<br/>
          • <strong>Direct Path:</strong> ${escapeHtml(q.shortestPathHint)}
        </div>
      `;
    } else if (promptType === 'valuation_gri') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>Rule Hierarchy &amp; Study passage:</strong><br/>
          ${escapeHtml(q.socraticHints[0])} ${escapeHtml(q.socraticHints[1])}<br/>
          • <strong>Statutory Text:</strong> <em>${escapeHtml(q.goldenQuote)}</em>
        </div>
      `;
    } else if (promptType === 'deadline_penalty') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>Governing Legal Standard (${escapeHtml(q.targetCitation)}):</strong><br/>
          ${escapeHtml(q.explanation.correctReasoning)}
        </div>
      `;
    } else if (promptType === 'custom' && customQuery) {
      const qLower = customQuery.toLowerCase();
      const optMatch = customQuery.match(/\boption\s*([a-e])\b|\b([a-e])\b\?/i);
      if (optMatch) {
        const letter = (optMatch[1] || optMatch[2]).toUpperCase();
        const optReason = (q.explanation.distractors && q.explanation.distractors[letter])
          ? q.explanation.distractors[letter]
          : q.explanation.correctReasoning;
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>Study Coach Audit — Option ${letter} on Question ${posNum}:</strong><br/>
            ${escapeHtml(optReason)}<br/>
            <em>Governing Citation: ${escapeHtml(q.targetCitation)}</em>
          </div>
        `;
      } else if (qLower.includes('gri') || qLower.includes('essential character') || qLower.includes('3(a)') || qLower.includes('3(b)')) {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>HTSUS GRI 3(a) vs. GRI 3(b) Distinction:</strong><br/>
            Under <code>HTSUS GRI 3(a)</code>, the heading with the most specific description governs—except when two or more headings each refer to only part of the materials in composite goods or part of the items in a <em>retail set</em>. In that case, GRI 3(a) deems them equally specific, directing you to <code>GRI 3(b) (Essential Character)</code>.
          </div>
        `;
      } else if (qLower.includes('assist') || qLower.includes('transaction value') || qLower.includes('152')) {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>19 CFR § 152.102 &amp; § 152.103 Transaction Value Rules:</strong><br/>
            Transaction Value = Price Actually Paid or Payable + Packing + Selling Commissions + Apportioned Assists + Dutiable Royalties + Subsequent Proceeds.
            <br/><strong>Exclusions:</strong> Buying commissions, international freight/insurance, and engineering/design work performed <em>inside the United States</em> are excluded.
          </div>
        `;
      } else {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>Study Coach Note for "${escapeHtml(customQuery)}":</strong><br/>
            For Question ${posNum}, inspect <code>${escapeHtml(q.targetCitation)}</code> (${escapeHtml(q.shortestPathHint)}).<br/>
            • <strong>Clue:</strong> ${escapeHtml(q.socraticHints[1])}<br/>
            • <strong>Study passage:</strong> <em>${escapeHtml(q.goldenQuote)}</em>
          </div>
        `;
      }
    }

    if (responseBox && replyHtml) {
      responseBox.innerHTML = replyHtml;
    }
  }

  /* ==========================================================================
     11. RIGHT PANE: INTEGRATED ELECTRONIC REFERENCE LIBRARY (eCFR / HTSUS / 31 CFR)
     ========================================================================== */
  let currentSearchQuery = '';
  let collapsedPartIds = {};

  function getActiveCorpus() {
    let corpus = DATASET.corpora.find(c => c.id === STATE.activeCorpusId);
    if (!corpus) {
      corpus = DATASET.corpora[0];
      if (corpus) STATE.activeCorpusId = corpus.id;
    }
    return corpus;
  }

  function getActiveSection() {
    let sec = DATASET.sectionsById[STATE.activeSectionId];
    if (!sec) {
      const corpus = getActiveCorpus();
      if (corpus && corpus.parts[0] && corpus.parts[0].sections[0]) {
        sec = corpus.parts[0].sections[0];
        STATE.activeSectionId = sec.id;
      } else {
        sec = DATASET.allSections[0];
        if (sec) STATE.activeSectionId = sec.id;
      }
    }
    return sec;
  }

  function openSectionInReader(sectionObj) {
    if (!sectionObj) return;
    STATE.activeCorpusId = sectionObj.corpusId;
    STATE.activeSectionId = sectionObj.id;
    collapsedPartIds[sectionObj.partId] = false;
    saveUserState();
    renderReferenceLibrary();
  }

  function countSectionSearchMatches(section, query) {
    if (!query) return 0;
    const hay = `${section.citation} ${section.title} ${section.text} ${(section.keywords || []).join(' ')}`;
    try {
      const regex = new RegExp(escapeRegExp(query), 'gi');
      const matches = hay.match(regex);
      return matches ? matches.length : 0;
    } catch (e) {
      return 0;
    }
  }

  function highlightTextWithSearchQuery(rawText, query) {
    const escaped = escapeHtml(rawText);
    if (!query || !query.trim()) return escaped;
    try {
      const regex = new RegExp(`(${escapeRegExp(escapeHtml(query.trim()))})`, 'gi');
      return escaped.replace(regex, '<mark class="ecfr-search-highlight">$1</mark>');
    } catch (e) {
      return escaped;
    }
  }

  function formatStatutoryParagraphsHtml(rawText, query) {
    const lines = String(rawText || '').split('\n').filter(l => l.trim().length > 0);
    return lines.map(line => {
      const trimmed = line.trim();
      const isSubPara = /^\(([0-9]+|[ivx]+)\)/i.test(trimmed);
      let highlighted = highlightTextWithSearchQuery(trimmed, query);
      highlighted = highlighted.replace(
        /^(\([a-z0-9]+\)(\s*\([a-z0-9]+\))*|GRI\s+\d(\([a-z]\))?:?)/i,
        '<span class="ecfr-subhead-token">$1</span>'
      );
      return `<div class="ecfr-para ${isSubPara ? 'ecfr-para-sub' : ''}">${highlighted}</div>`;
    }).join('');
  }

  function formatShortSectionCitation(citationStr) {
    const str = String(citationStr || '').trim();
    const secMatch = str.match(/§\s*\d+\.\d+[a-z0-9()-]*/i);
    if (secMatch) return secMatch[0];
    const griMatch = str.match(/GRI\s*\d+[a-z0-9()-]*/i);
    if (griMatch) return griMatch[0];
    return str;
  }

  function updateRightPaneCiteButtonLabel() {
    const currentQ = getCurrentQuestion();
    const activeSection = getActiveSection();
    const lockBtn = document.getElementById('btnLockCitationProof');
    if (!lockBtn || !currentQ || !activeSection) return;

    const posNum = getQuestionPosInActiveSuite(currentQ);
    const shortCite = formatShortSectionCitation(activeSection.citation);
    const work = getQuestionWork(currentQ.id);
    const isAlreadyLockedHere = (work.attachedSectionId === activeSection.id);

    if (isAlreadyLockedHere) {
      lockBtn.textContent = `Cited ${shortCite} for Q${posNum}`;
    } else {
      lockBtn.textContent = `Attach citation · ${shortCite} to Q${posNum}`;
    }
  }

  function renderReferenceLibrary() {
    const activeCorpus = getActiveCorpus();
    const activeSection = getActiveSection();
    const query = currentSearchQuery.trim();

    const tabsContainer = document.getElementById('refCorpusTabs');
    tabsContainer.innerHTML = '';

    DATASET.corpora.forEach(corpus => {
      let secCount = 0;
      let hitCount = 0;
      corpus.parts.forEach(p => {
        secCount += p.sections.length;
        if (query) {
          p.sections.forEach(s => {
            if (countSectionSearchMatches(s, query) > 0) hitCount++;
          });
        }
      });

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ref-corpus-tab ${corpus.id === activeCorpus.id ? 'active' : ''}`;
      const badgeLabel = query ? `${hitCount} hits` : `${secCount}`;
      btn.innerHTML = `
        <span>${escapeHtml(corpus.code)}</span>
        <span class="ref-corpus-count">${escapeHtml(badgeLabel)}</span>
      `;
      btn.addEventListener('click', () => {
        STATE.activeCorpusId = corpus.id;
        let firstSec = null;
        if (query) {
          for (const p of corpus.parts) {
            const hit = p.sections.find(s => countSectionSearchMatches(s, query) > 0);
            if (hit) { firstSec = hit; break; }
          }
        }
        if (!firstSec && corpus.parts[0] && corpus.parts[0].sections[0]) {
          firstSec = corpus.parts[0].sections[0];
        }
        if (firstSec) STATE.activeSectionId = firstSec.id;
        saveUserState();
        renderReferenceLibrary();
      });
      tabsContainer.appendChild(btn);
    });

    const matchBadge = document.getElementById('ecfrSearchMatchBadge');
    const clearBtn = document.getElementById('btnClearEcfrSearch');
    if (query) {
      clearBtn.classList.remove('hidden');
      let totalMatches = 0;
      let matchingSections = 0;
      DATASET.allSections.forEach(s => {
        const c = countSectionSearchMatches(s, query);
        if (c > 0) {
          totalMatches += c;
          matchingSections++;
        }
      });
      matchBadge.textContent = `${totalMatches} matches in ${matchingSections} sections`;
      matchBadge.classList.add('has-matches');
    } else {
      clearBtn.classList.add('hidden');
      matchBadge.textContent = `${DATASET.allSections.length} sections`;
      matchBadge.classList.remove('has-matches');
    }

    const treeSidebar = document.getElementById('refTreeSidebar');
    const btnToggleTree = document.getElementById('btnToggleCodeTree');
    treeSidebar.classList.toggle('hidden', !!STATE.treeCollapsed);
    if (btnToggleTree) {
      btnToggleTree.textContent = STATE.treeCollapsed ? 'Show Index' : 'Toggle Index';
    }

    const treeList = document.getElementById('refTreeList');
    treeList.innerHTML = '';

    const partsToRender = [];
    activeCorpus.parts.forEach(part => {
      partsToRender.push({ part, corpusCode: activeCorpus.code, isExternalCorpus: false });
    });

    if (query) {
      DATASET.corpora.forEach(otherCorpus => {
        if (otherCorpus.id === activeCorpus.id) return;
        otherCorpus.parts.forEach(part => {
          const hasHit = part.sections.some(s => countSectionSearchMatches(s, query) > 0);
          if (hasHit) {
            partsToRender.push({ part, corpusCode: otherCorpus.code, isExternalCorpus: true });
          }
        });
      });
    }

    partsToRender.forEach(({ part, corpusCode, isExternalCorpus }) => {
      const partGroup = document.createElement('div');
      partGroup.className = 'ref-part-group';

      const isCollapsed = !!collapsedPartIds[part.id] && !query;
      const partToggle = document.createElement('button');
      partToggle.type = 'button';
      partToggle.className = 'ref-part-toggle';
      partToggle.innerHTML = `
        <span>${isCollapsed ? '+ ' : '− '}${isExternalCorpus ? `${escapeHtml(corpusCode)} · ` : ''}${escapeHtml(part.title || part.code)}</span>
        <span>${part.sections.length}</span>
      `;
      partToggle.addEventListener('click', () => {
        collapsedPartIds[part.id] = !collapsedPartIds[part.id];
        renderReferenceLibrary();
      });
      partGroup.appendChild(partToggle);

      if (!isCollapsed) {
        const secContainer = document.createElement('div');
        secContainer.className = 'ref-part-sections';

        part.sections.forEach(sec => {
          const matchCount = query ? countSectionSearchMatches(sec, query) : 0;
          if (query && matchCount === 0) return;

          const secBtn = document.createElement('button');
          secBtn.type = 'button';
          secBtn.className = `ref-sec-item ${sec.id === activeSection.id ? 'active' : ''} ${matchCount > 0 ? 'search-hit' : ''}`;
          secBtn.innerHTML = `
            <div class="ref-sec-top-line">
              <span class="ref-sec-cite">${highlightTextWithSearchQuery(sec.citation, query)}</span>
              ${matchCount > 0 ? `<span class="ref-sec-freq">${matchCount} hits</span>` : ''}
            </div>
            <div class="ref-sec-title">${highlightTextWithSearchQuery(sec.title, query)}</div>
          `;
          secBtn.addEventListener('click', () => {
            openSectionInReader(sec);
          });
          secContainer.appendChild(secBtn);
        });

        if (secContainer.children.length > 0) {
          partGroup.appendChild(secContainer);
          treeList.appendChild(partGroup);
        } else if (!query) {
          treeList.appendChild(partGroup);
        }
      } else {
        treeList.appendChild(partGroup);
      }
    });

    if (treeList.children.length === 0 && query) {
      treeList.innerHTML = `<div style="padding:12px;font-size:12px;color:#78756D;">No sections match "<strong>${escapeHtml(query)}</strong>". Try clearing the filter or clicking a Quick Filter chip above.</div>`;
    }

    if (!activeSection) return;

    document.getElementById('refDocBreadcrumb').textContent = activeSection.breadcrumb;
    document.getElementById('refDocFreqBadge').textContent = 'Study notes';
    document.getElementById('refDocCitationCode').innerHTML = highlightTextWithSearchQuery(activeSection.citation, query);
    const official = document.getElementById('refOfficialSource');
    const officialGuide = document.getElementById('refOfficialGuide');
    const federal = activeSection.citation.match(/^(19|26|31) CFR\s*§\s*(\d+\.\d+[a-z]?(?:-\d+)?)/i);
    const officialUrl = activeSection.officialSourceUrl || (federal ? `https://www.ecfr.gov/current/title-${federal[1]}/section-${federal[2]}` : '');
    const officialLabel = activeSection.sourceAsOf ? `Read the source edition · ${activeSection.sourceAsOf}` : (activeSection.officialSourceLabel || 'Read the cited source');
    if (official) {
      official.hidden = !officialUrl;
      if (officialUrl) {
        official.href = officialUrl;
        official.textContent = `${officialLabel} ↗`;
      } else {
        official.removeAttribute('href');
      }
    }
    if (officialGuide) {
      const guideUrl = activeSection.officialGuideUrl || '';
      officialGuide.hidden = !guideUrl;
      if (guideUrl) {
        officialGuide.href = guideUrl;
        officialGuide.textContent = `${activeSection.officialGuideLabel || 'Read official IRS guidance'} ↗`;
      } else {
        officialGuide.removeAttribute('href');
      }
    }
    document.getElementById('refDocSectionTitle').innerHTML = highlightTextWithSearchQuery(activeSection.title, query);

    updateRightPaneCiteButtonLabel();

    const textBody = document.getElementById('refDocTextBody');
    textBody.innerHTML = formatStatutoryParagraphsHtml(activeSection.text, query);

    const crossRefsBox = document.getElementById('refDocCrossRefsBox');
    const crossRefsList = document.getElementById('refDocCrossRefsList');
    crossRefsList.innerHTML = '';

    if (Array.isArray(activeSection.crossRefs) && activeSection.crossRefs.length > 0) {
      crossRefsBox.classList.remove('hidden');
      activeSection.crossRefs.forEach(refStr => {
        const resolved = resolveSectionByRef(refStr);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ref-crossref-btn';
        btn.textContent = `→ ${resolved ? resolved.citation : refStr}`;
        btn.title = resolved ? `Jump to ${resolved.citation}: ${resolved.title}` : `Search for ${refStr}`;
        btn.addEventListener('click', () => {
          if (resolved) {
            openSectionInReader(resolved);
            showToast(`Opened cross-reference: ${resolved.citation}`);
          } else {
            const searchInput = document.getElementById('ecfrSearchInput');
            if (searchInput) {
              searchInput.value = refStr;
              currentSearchQuery = refStr;
              renderReferenceLibrary();
            }
          }
        });
        crossRefsList.appendChild(btn);
      });
    } else {
      crossRefsBox.classList.add('hidden');
    }

    const kwList = document.getElementById('refDocKeywordsList');
    kwList.innerHTML = '';
    (activeSection.keywords || []).forEach(kw => {
      const tag = document.createElement('button');
      tag.type = 'button';
      tag.className = 'ref-kw-tag';
      tag.textContent = kw;
      tag.title = `Filter eCFR by keyword "${kw}"`;
      tag.addEventListener('click', () => {
        const searchInput = document.getElementById('ecfrSearchInput');
        if (searchInput) {
          searchInput.value = kw;
          currentSearchQuery = kw;
          renderReferenceLibrary();
        }
      });
      kwList.appendChild(tag);
    });
  }

  /* ==========================================================================
     12. CITE SECTION AS PROOF & SAVE CITATION TO NOTES
     ========================================================================== */
  function lockInActiveSectionAsProof() {
    const q = getCurrentQuestion();
    const sec = getActiveSection();
    if (!q || !sec) return;

    const posNum = getQuestionPosInActiveSuite(q);
    const work = getQuestionWork(q.id);
    work.attachedSectionId = sec.id;
    work.attachedCitation = sec.citation;

    const elapsedSec = STATE.activeMode === 'drill'
      ? Number(drillLookupElapsedSeconds.toFixed(1))
      : Number(((Date.now() - questionLookupStartMs) / 1000).toFixed(1));

    work.lookupSeconds = Math.max(0.8, elapsedSec);
    drillCitationLocked = true;

    const matched = isCitationProofMatch(q, sec.id);

    saveUserState();
    window.dispatchEvent(new CustomEvent('cf:workflow', {detail:{stage:'result_ready'}}));
    renderQuestionWorkspace();
    renderReferenceLibrary();
    renderGlobalBarTelemetry();

    if (STATE.activeMode === 'drill') {
      updateDrillHudMetrics();
      if (matched) {
        showToast(`Step 1 Complete: Cited ${sec.citation} in ${work.lookupSeconds.toFixed(1)}s. Now select Option A–E and click Check Answer.`);
      } else {
        showToast(`Cited ${sec.citation} for Q${posNum} (${work.lookupSeconds.toFixed(1)}s). Check if a more specific section applies.`);
      }
    } else {
      showToast(`Cited ${sec.citation} as proof for Question ${posNum} (${work.lookupSeconds.toFixed(1)}s)`);
    }
  }

  function copyActiveCitationToScratchpad() {
    const sec = getActiveSection();
    const q = getCurrentQuestion();
    if (!sec) return;

    const posNum = getQuestionPosInActiveSuite(q);
    const firstSentence = String(sec.text || '').split('\n')[0];
    const formattedSnippet = `${sec.citation} — ${sec.title} (Q${posNum}): "${firstSentence}"`;

    STATE.scratchpadText = (STATE.scratchpadText ? STATE.scratchpadText.trim() + '\n\n' : '') + formattedSnippet;
    STATE.savedCitations = Array.isArray(STATE.savedCitations) ? STATE.savedCitations : [];
    STATE.savedCitations.unshift({
      citation: sec.citation,
      title: sec.title,
      sectionId: sec.id,
      questionNumber: posNum,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    STATE.savedCitations = STATE.savedCitations.slice(0, 20);

    saveUserState();
    updateScratchpadBadge();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formattedSnippet).catch(() => {});
    }

    showToast(`Saved ${sec.citation} to Candidate Notes`);
  }

  function updateScratchpadBadge() {
    const badge = document.getElementById('scratchpadCountBadge');
    if (badge) {
      const count = Array.isArray(STATE.savedCitations) ? STATE.savedCitations.length : 0;
      badge.textContent = String(count);
    }
  }

  /* ==========================================================================
     13. MODE 2: 90-SECOND CITATION-SPEED DRILL TIMER & TELEMETRY
     ========================================================================== */
  function startDrillSprintForCurrentQuestion(forceResetWork) {
    stopDrillSprintTimer();
    const q = getCurrentQuestion();
    if (!q) return;

    const work = getQuestionWork(q.id);
    if (forceResetWork) {
      work.selectedOption = null;
      work.checked = false;
      work.attachedSectionId = null;
      work.attachedCitation = null;
      work.lookupSeconds = null;
      saveUserState();
    }

    drillRemainingSeconds = DRILL_MAX_SECONDS;
    drillLookupElapsedSeconds = (typeof work.lookupSeconds === 'number' && work.lookupSeconds > 0) ? work.lookupSeconds : 0.0;
    drillCitationLocked = !!work.attachedSectionId;
    drillPaused = false;
    resetPerQuestionLookupStopwatch();

    const btnPause = document.getElementById('btnDrillPauseSprint');
    if (btnPause) btnPause.textContent = 'Pause';

    updateDrillHudMetrics();
    renderQuestionWorkspace();

    drillInterval = setInterval(() => {
      if (drillPaused || STATE.activeMode !== 'drill') return;

      const currentWork = getQuestionWork(q.id);
      if (currentWork.checked) {
        stopDrillSprintTimer();
        return;
      }

      drillRemainingSeconds = Math.max(0, Number((drillRemainingSeconds - 0.1).toFixed(1)));
      if (!drillCitationLocked) {
        drillLookupElapsedSeconds = Number((drillLookupElapsedSeconds + 0.1).toFixed(1));
      }

      updateDrillHudMetrics();

      if (drillRemainingSeconds <= 0) {
        stopDrillSprintTimer();
        showToast('90-Second Sprint Expired. Open Study Coach below to inspect the Fastest Navigation Path.');
        currentWork.shortestPathRevealed = true;
        STATE.studyCoachExpanded = true;
        renderQuestionWorkspace();
      }
    }, 100);
  }

  function stopDrillSprintTimer() {
    if (drillInterval) {
      clearInterval(drillInterval);
      drillInterval = null;
    }
  }

  function renderDrillChecklistState(q, work) {
    const step1Card = document.getElementById('drillStep1Card');
    const step1Status = document.getElementById('drillStep1Status');
    const step2Card = document.getElementById('drillStep2Card');
    const step2Status = document.getElementById('drillStep2Status');

    if (!step1Card || !step2Card) return;

    if (work.attachedSectionId) {
      step1Card.classList.add('completed');
      const secStr = typeof work.lookupSeconds === 'number' ? `${work.lookupSeconds.toFixed(1)}s` : '';
      step1Status.textContent = `Cited (${secStr})`;
    } else {
      step1Card.classList.remove('completed');
      step1Status.textContent = 'Step 1 Pending';
    }

    if (work.checked) {
      step2Card.classList.add('completed');
      step2Status.textContent = work.selectedOption === q.correctOption ? `Correct (${q.correctOption})` : `Reviewed (${q.correctOption})`;
    } else if (work.selectedOption) {
      step2Card.classList.add('completed');
      step2Status.textContent = `Selected ${work.selectedOption} (Click Check Answer)`;
    } else {
      step2Card.classList.remove('completed');
      step2Status.textContent = 'Select A–E';
    }
  }

  function updateDrillHudMetrics() {
    const q = getCurrentQuestion();
    if (!q) return;
    const work = getQuestionWork(q.id);
    const stats = getSessionStats();

    const clockDigits = document.getElementById('drillSprintClockDigits');
    const progressBar = document.getElementById('drillSprintProgressBar');
    const clockCard = document.getElementById('drillClockCard');

    if (clockDigits) clockDigits.textContent = `${drillRemainingSeconds.toFixed(1)}s`;
    if (progressBar) {
      const pct = Math.max(0, Math.min(100, (drillRemainingSeconds / DRILL_MAX_SECONDS) * 100));
      progressBar.style.width = `${pct}%`;
    }
    if (clockCard) {
      clockCard.classList.remove('warning', 'danger');
      if (drillRemainingSeconds <= 20) {
        clockCard.classList.add('danger');
      } else if (drillRemainingSeconds <= 45) {
        clockCard.classList.add('warning');
      }
    }

    const curLookupEl = document.getElementById('drillCurrentLookupTime');
    const targetLabelEl = document.getElementById('drillTargetBenchmarkLabel');
    const liveLookupVal = (typeof work.lookupSeconds === 'number' && work.lookupSeconds > 0)
      ? work.lookupSeconds
      : drillLookupElapsedSeconds;

    if (curLookupEl) curLookupEl.textContent = `${liveLookupVal.toFixed(1)}s`;
    if (targetLabelEl) targetLabelEl.textContent = `/ ${q.targetLookupSeconds}.0s target`;

    const avgEl = document.getElementById('drillAvgLookupMetric');
    if (avgEl) {
      avgEl.textContent = stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s';
    }

    const accEl = document.getElementById('drillAccuracyMetric');
    const solvedSub = document.getElementById('drillSolvedCountSub');
    const streakEl = document.getElementById('drillStreakMetric');

    if (accEl) accEl.textContent = stats.accuracyPercent !== null ? `${stats.accuracyPercent}%` : '--%';
    if (solvedSub) solvedSub.textContent = `${stats.gradedCount} graded`;
    if (streakEl) streakEl.textContent = `${STATE.drillStats.streak || 0} Streak`;

    renderDrillChecklistState(q, work);
  }

  /* ==========================================================================
     14. YELLOW MARKER HIGHLIGHT TOOL (PEARSON VUE HIGHLIGHTER)
     ========================================================================== */
  function highlightCurrentSelectionInStem() {
    const q = getCurrentQuestion();
    if (!q) return false;

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      return false;
    }

    const stemEl = document.getElementById('qStemContent');
    const readerEl = document.getElementById('refDocTextBody');
    const range = sel.getRangeAt(0);
    const inStem = stemEl && stemEl.contains(range.commonAncestorContainer);
    const inReader = readerEl && readerEl.contains(range.commonAncestorContainer);

    if (!inStem && !inReader) {
      return false;
    }

    try {
      const mark = document.createElement('mark');
      mark.className = 'user-highlight';
      mark.title = 'Click to remove highlight';
      range.surroundContents(mark);
      sel.removeAllRanges();

      if (inStem) {
        const work = getQuestionWork(q.id);
        work.highlightedStemHtml = stemEl.innerHTML;
        saveUserState();
      }
      showToast('Highlighted selected text (click mark to remove)');
      return true;
    } catch (err) {
      const selectedText = sel.toString().trim();
      if (inStem && selectedText.length >= 2) {
        const escapedTarget = escapeHtml(selectedText);
        stemEl.innerHTML = stemEl.innerHTML.replace(
          escapedTarget,
          `<mark class="user-highlight" title="Click to remove highlight">${escapedTarget}</mark>`
        );
        sel.removeAllRanges();
        const work = getQuestionWork(q.id);
        work.highlightedStemHtml = stemEl.innerHTML;
        saveUserState();
        showToast('Highlighted selected text');
        return true;
      }
    }
    return false;
  }

  /* ==========================================================================
     15. MODE 3: READINESS ANALYTICS DASHBOARD & B2C/B2B LICENSING PLANS
     ========================================================================== */
  function renderAnalyticsDashboard() {
    const stats = getSessionStats();
    const activePool = getFilteredQuestions();

    const probValEl = document.getElementById('anPassProbabilityValue');
    const probBarEl = document.getElementById('anPassProbabilityBar');
    if (probValEl) {
      probValEl.textContent = stats.accuracyPercent !== null ? `${stats.accuracyPercent}%` : '--%';
    }
    if (probBarEl) {
      probBarEl.style.width = stats.accuracyPercent !== null ? `${stats.accuracyPercent}%` : '0%';
    }

    document.getElementById('anKpiAvgLookup').textContent =
      stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s';

    const totalDenominator = STATE.selectedTrack === 'ALL' ? DATASET.questions.length : activePool.length;
    const gradedInView = STATE.selectedTrack === 'ALL'
      ? stats.gradedCount
      : activePool.filter(q => STATE.questionWork[q.id] && STATE.questionWork[q.id].checked).length;

    document.getElementById('anKpiAnsweredCount').textContent = `${gradedInView} / ${totalDenominator} Graded`;

    const accStr = stats.accuracyPercent !== null
      ? `${stats.accuracyPercent}% (${stats.correctCount}/${stats.gradedCount} correct)`
      : '--%';
    document.getElementById('anKpiAccuracySub').innerHTML = `Current Accuracy: <strong>${accStr}</strong>`;
    document.getElementById('anKpiVerifiedCitations').textContent = String(stats.verifiedProofCount);

    if (stats.avgLookupSeconds !== null) {
      const secSavedPerQ = Math.max(15, 145 - stats.avgLookupSeconds);
      const totalMinSaved = Math.round((secSavedPerQ * 80) / 60);
      const hrs = Math.floor(totalMinSaved / 60);
      const mins = totalMinSaved % 60;
      document.getElementById('anKpiTimeSaved').textContent = `+${hrs}h ${mins}m`;
    } else {
      document.getElementById('anKpiTimeSaved').textContent = '--';
    }

    const cbleDomainSpecs = [
      { suite: 'CBLE_111_113', label: '19 CFR Parts 111 & 113 — Broker Compliance & Customs Bonds', color: '#1A5638' },
      { suite: 'CBLE_141_142', label: '19 CFR Parts 141 & 142 — Entry, Invoices & Release Deadlines', color: '#1A5638' },
      { suite: 'CBLE_152_177_190', label: '19 CFR Parts 152, 177 & 190 — Valuation, Rulings & Drawback', color: '#1B365D' },
      { suite: 'CBLE_HTSUS', label: 'HTSUS & GRI 1–6 — Tariff Classification & Essential Character', color: '#1B365D' }
    ];
    const seeDomainSpecs = [
      { suite: 'EA_SEE1', label: 'IRS SEE Part 1 — Individuals (Filing, Dependents, Capital Gains, QBI & Gifts)', color: '#1A5638' },
      { suite: 'EA_SEE2', label: 'IRS SEE Part 2 — Businesses (S-Corps, Partnerships, § 179, Methods, E&P & § 1031)', color: '#1B365D' },
      { suite: 'EA_SEE3', label: 'IRS SEE Part 3 — Representation, Practices & Procedures (Circular 230 & 26 CFR)', color: '#A15D00' }
    ];
    const domainSpecs = /^EA/.test(STATE.selectedTrack || '')
      ? [...seeDomainSpecs, ...cbleDomainSpecs]
      : [...cbleDomainSpecs, ...seeDomainSpecs];

    const heatmapContainer = document.getElementById('anDomainHeatmapList');
    heatmapContainer.innerHTML = '';

    domainSpecs.forEach(dom => {
      const matchingQs = DATASET.questions.filter(q => q.suite === dom.suite);
      const domLookups = [];
      let domCorrect = 0;
      let domGraded = 0;

      matchingQs.forEach(q => {
        const w = STATE.questionWork[q.id];
        if (w) {
          if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) domLookups.push(w.lookupSeconds);
          if (w.checked) {
            domGraded++;
            if (w.selectedOption === q.correctOption) domCorrect++;
          }
        }
      });

      const hasDomData = domGraded > 0;
      const avgDomLookupStr = domLookups.length > 0
        ? `${(domLookups.reduce((a, b) => a + b, 0) / domLookups.length).toFixed(1)}s`
        : '--s';

      const domAcc = hasDomData ? Math.round((domCorrect / domGraded) * 100) : 0;
      const domAccStr = hasDomData ? `${domAcc}% (${domCorrect}/${domGraded})` : '--%';

      let statusLabel = 'Not Tested Yet';
      if (hasDomData) {
        statusLabel = (domAcc >= 75) ? 'Exam Ready' : 'Needs Review';
      }

      const row = document.createElement('div');
      row.className = 'heatmap-row';
      row.innerHTML = `
        <div class="heatmap-row-top">
          <span class="heatmap-domain-name">${escapeHtml(dom.label)}</span>
          <div class="heatmap-metrics-right">
            <span>Lookup: <strong>${avgDomLookupStr}</strong></span>
            <span>·</span>
            <span>Accuracy: <strong>${domAccStr}</strong></span>
            <span>·</span>
            <span>${statusLabel}</span>
          </div>
        </div>
        <div class="heatmap-bar-bg">
          <div class="heatmap-bar-fill" style="width: ${hasDomData ? domAcc : 0}%; background: ${dom.color};"></div>
        </div>
      `;
      heatmapContainer.appendChild(row);
    });

    // Session Question Log (with PRO badges on questions 4+ when on FREE tier)
    const solvedContainer = document.getElementById('anSolvedQuestionsLog');
    solvedContainer.innerHTML = '';

    activePool.forEach((q, idx) => {
      const posNum = idx + 1;
      const isLocked = isQuestionIndexLockedForCurrentTier(idx);
      const w = STATE.questionWork[q.id];
      const hasActivity = w && (w.selectedOption || w.attachedCitation || w.flagged);
      const item = document.createElement('div');
      item.className = 'an-log-item';

      const statusText = isLocked
        ? 'Locked on Free Trial — Activate Pro to Unlock'
        : !hasActivity
          ? 'Unanswered — Click to Open'
          : w.checked
            ? (w.selectedOption === q.correctOption ? `Correct (${w.selectedOption})` : `Incorrect (Chose ${w.selectedOption}, Official: ${q.correctOption})`)
            : `In Progress (Selected: ${w.selectedOption || 'None'})`;

      const rightBadgeHtml = isLocked
        ? `<span class="pro-lock-badge">PRO</span>`
        : `<span style="font-family:var(--font-mono);font-size:11.5px;font-weight:600;color:#141413;">${escapeHtml((w && typeof w.lookupSeconds === 'number') ? `${w.lookupSeconds.toFixed(1)}s` : `${q.targetLookupSeconds}s target`)} →</span>`;

      item.innerHTML = `
        <div>
          <strong>Q${posNum}: ${escapeHtml(q.category)}</strong>
          <div style="font-size:11px;color:#78756D;">${escapeHtml(statusText)} · Proof: ${escapeHtml((w && w.attachedCitation) || q.targetCitation)}</div>
        </div>
        ${rightBadgeHtml}
      `;
      item.addEventListener('click', () => {
        if (isLocked) {
          openAccountPaywallModal({
            paywallReason: 'Create an account and activate a Pro plan to unlock all 48 exam cases and 10 suites (CBLE + IRS SEE Parts 1–3).'
          });
          return;
        }
        STATE.currentQuestionId = q.id;
        switchMode('cbt');
      });
      solvedContainer.appendChild(item);
    });

    const savedCiteContainer = document.getElementById('anSavedCitationsLog');
    savedCiteContainer.innerHTML = '';

    const citationsList = Array.isArray(STATE.savedCitations) ? STATE.savedCitations : [];

    if (citationsList.length === 0) {
      savedCiteContainer.innerHTML = `<div style="padding:10px;font-size:12px;color:#78756D;background:#F6F4EF;border:1px solid #DFDBD2;">No citations saved in this session yet. Click “Save to Notes” in the Reference Library to bookmark sections.</div>`;
    } else {
      citationsList.forEach(entry => {
        const row = document.createElement('div');
        row.className = 'an-log-item';
        row.innerHTML = `
          <div>
            <strong>${escapeHtml(entry.citation)}</strong> — ${escapeHtml(entry.title)}
            <div style="font-size:11px;color:#78756D;">Saved from Question ${entry.questionNumber || 1}</div>
          </div>
          <span style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:#C8431F;">Open in eCFR →</span>
        `;
        row.addEventListener('click', () => {
          const sec = resolveSectionByRef(entry.sectionId) || resolveSectionByRef(entry.citation);
          if (sec) {
            openSectionInReader(sec);
            switchMode('cbt');
          }
        });
        savedCiteContainer.appendChild(row);
      });
    }
  }

  /* ==========================================================================
     16. MODALS: QUESTION NAVIGATOR, CALCULATOR/SCRATCHPAD, SCORE REPORT
     ========================================================================== */
  function openNavigatorModal() {
    const backdrop = document.getElementById('navigatorModalBackdrop');
    const grid = document.getElementById('navigatorQuestionsGrid');
    if (!backdrop || !grid) return;

    const pool = getFilteredQuestions();
    let answered = 0;
    let unanswered = 0;
    let flagged = 0;
    let verified = 0;

    grid.innerHTML = '';

    pool.forEach((q, idx) => {
      const posNum = idx + 1;
      const isLocked = isQuestionIndexLockedForCurrentTier(idx);
      const w = getQuestionWork(q.id);
      if (w.selectedOption) answered++; else unanswered++;
      if (w.flagged) flagged++;
      if (w.attachedSectionId) verified++;

      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = `nav-q-tile ${q.id === STATE.currentQuestionId ? 'current' : ''} ${w.selectedOption ? 'answered' : ''} ${isLocked ? 'locked-pro' : ''}`;
      tile.innerHTML = `
        <div class="nav-q-tile-top">
          <span>Question ${posNum}</span>
          ${isLocked
            ? '<span class="pro-lock-badge">PRO</span>'
            : `<span>${w.flagged ? 'Flagged' : ''} ${w.attachedSectionId ? 'Cited' : ''}</span>`}
        </div>
        <div style="font-size:11px;color:#4A4842;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
          ${escapeHtml(q.category)}
        </div>
        <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:${w.selectedOption ? '#141413' : '#78756D'};">
          ${isLocked
            ? 'Locked (Free Trial 3/3)'
            : `${w.selectedOption ? `Selected: ${w.selectedOption}` : 'Unanswered'}${w.checked ? (w.selectedOption === q.correctOption ? ' · Correct' : ' · Incorrect') : ''}`}
        </div>
      `;
      tile.addEventListener('click', () => {
        if (isLocked) {
          backdrop.classList.add('hidden');
          openAccountPaywallModal({
            paywallReason: 'Create an account and activate a Pro plan to unlock all 48 exam cases and 10 suites (CBLE + IRS SEE Parts 1–3).'
          });
          return;
        }
        STATE.currentQuestionId = q.id;
        resetPerQuestionLookupStopwatch();
        saveUserState();
        backdrop.classList.add('hidden');
        renderQuestionWorkspace();
      });
      grid.appendChild(tile);
    });

    document.getElementById('navStatAnswered').textContent = String(answered);
    document.getElementById('navStatUnanswered').textContent = String(unanswered);
    document.getElementById('navStatFlagged').textContent = String(flagged);
    document.getElementById('navStatVerified').textContent = String(verified);

    backdrop.classList.remove('hidden');
  }

  function updateCustomsValuationCalculator() {
    const invoice = Number(document.getElementById('calcInvoicePrice').value) || 0;
    const packing = Number(document.getElementById('calcPackingCost').value) || 0;
    const assist = Number(document.getElementById('calcAssistCost').value) || 0;
    const royalty = Number(document.getElementById('calcRoyaltyCost').value) || 0;
    const nonDutiable = Number(document.getElementById('calcNonDutiable').value) || 0;
    const ratePct = Number(document.getElementById('calcDutyRate').value) || 0;

    const transactionVal = Math.max(0, invoice + packing + assist + royalty - nonDutiable);
    const baseDuty = transactionVal * (ratePct / 100);
    const rawMpf = transactionVal * 0.003464;
    const clampedMpf = transactionVal > 0 ? Math.min(614.35, Math.max(31.67, rawMpf)) : 0;
    const hmf = transactionVal * 0.00125;
    const mpfHmf = clampedMpf + hmf;
    const totalDeposit = baseDuty + mpfHmf;

    const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    document.getElementById('calcResTransactionValue').textContent = fmt(transactionVal);
    document.getElementById('calcResBaseDuty').textContent = fmt(baseDuty);
    document.getElementById('calcResMpfHmf').textContent = fmt(mpfHmf);
    document.getElementById('calcResTotalDeposit').textContent = fmt(totalDeposit);

    return {
      transactionVal: fmt(transactionVal),
      baseDuty: fmt(baseDuty),
      mpfHmf: fmt(mpfHmf),
      totalDeposit: fmt(totalDeposit),
      ratePct
    };
  }

  /* ==========================================================================
     16B. PRINTABLE B2B TEAM READINESS & CITATION LATENCY DOSSIER ENGINE
     ========================================================================== */
  let b2bReportViewMode = 'cohort'; // 'session' | 'cohort'

  function generateB2BTeamReadinessData(modeOverride) {
    const stats = getSessionStats();
    const resolvedMode = modeOverride
      ? modeOverride
      : (stats.gradedCount > 0 ? b2bReportViewMode : b2bReportViewMode);

    const domainDefinitions = [
      {
        id: 'DOM_111_113',
        label: '19 CFR Parts 111 & 113 — Broker Compliance & Bonds',
        filterFn: (q) => q.suite === 'CBLE_111_113',
        cohortAcc: 86,
        cohortLookup: 29.4,
        trapNote: '19 CFR § 111.32 mandatory fraud-separation reporting & § 113.62(b) 30-day redelivery liquidated damages'
      },
      {
        id: 'DOM_141_142',
        label: '19 CFR Parts 141 & 142 — Entry & Release Deadlines',
        filterFn: (q) => q.suite === 'CBLE_141_142',
        cohortAcc: 84,
        cohortLookup: 26.8,
        trapNote: '19 CFR § 142.12(b) 10 working days (Form 7501) vs. 15 calendar days (§ 142.12(a)) & § 141.19 nominal consignee liability'
      },
      {
        id: 'DOM_152',
        label: '19 CFR Part 152 — Customs Valuation & Assists',
        filterFn: (q) => q.suite === 'CBLE_152_177_190' && /152|valuation|assist/i.test(`${q.category} ${q.targetCitation} ${q.targetSectionId}`),
        cohortAcc: 78,
        cohortLookup: 35.6,
        trapNote: '19 CFR § 152.102(a)(1)(iv) U.S.-domiciled engineering exclusion vs. foreign tooling assists & § 152.103(i) post-importation assembly'
      },
      {
        id: 'DOM_177_190',
        label: '19 CFR Parts 177 & 190 — Rulings & TFTEA Drawback',
        filterFn: (q) => q.suite === 'CBLE_152_177_190' && !/152|valuation|assist/i.test(`${q.category} ${q.targetCitation} ${q.targetSectionId}`),
        cohortAcc: 81,
        cohortLookup: 34.2,
        trapNote: '19 CFR § 190.32 8-digit HTSUS substitution (10-digit when starting with "Other") & 5-year importation window'
      },
      {
        id: 'DOM_HTSUS',
        label: 'HTSUS & GRI 1–6 — Tariff Classification',
        filterFn: (q) => q.suite === 'CBLE_HTSUS',
        cohortAcc: 83,
        cohortLookup: 33.1,
        trapNote: 'GRI 3(b) retail set essential character vs. GRI 3(c) last in numerical order & GRI 5(a)/(b) fitted cases'
      },
      {
        id: 'DOM_EA_SEE1',
        label: 'IRS SEE Part 1 — Individuals (26 CFR / IRC)',
        filterFn: (q) => q.suite === 'EA_SEE1',
        cohortAcc: 85,
        cohortLookup: 30.8,
        trapNote: 'IRC § 121(d)(6) home-office depreciation recapture, § 1091 wash sale basis adjustment & § 199A SSTB/W-2 limits'
      },
      {
        id: 'DOM_EA_SEE2',
        label: 'IRS SEE Part 2 — Businesses (26 CFR / IRC)',
        filterFn: (q) => q.suite === 'EA_SEE2',
        cohortAcc: 82,
        cohortLookup: 33.4,
        trapNote: 'IRC § 1367 S-Corp stock basis ordering (distributions before losses), § 752 recourse vs. nonrecourse debt & § 316 nimble dividends'
      },
      {
        id: 'DOM_EA_SEE3',
        label: 'IRS SEE Part 3 — Representation, Practices & Procedures (Circular 230 & 26 CFR)',
        filterFn: (q) => q.suite === 'EA_SEE3' || q.suite === 'EA',
        cohortAcc: 88,
        cohortLookup: 28.5,
        trapNote: '31 CFR § 10.6 72-hr/16-hr annual CE floor, Form 2848 vs. 8821 (§ 601.504), 30-day CDP hearing (§ 6330) & § 6695(g) Form 8867 stacking'
      }
    ];

    const domains = domainDefinitions.map(def => {
      const qs = DATASET.questions.filter(def.filterFn);
      const qCount = qs.length;
      let graded = 0;
      let correct = 0;
      const lookups = [];

      qs.forEach(q => {
        const w = STATE.questionWork[q.id];
        if (!w) return;
        if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) {
          lookups.push(w.lookupSeconds);
        }
        if (w.checked) {
          graded++;
          if (w.selectedOption === q.correctOption) correct++;
        }
      });

      const useSession = (resolvedMode === 'session');
      const accuracyPct = useSession
        ? (graded > 0 ? Math.round((correct / graded) * 100) : null)
        : def.cohortAcc;
      const meanLookupSec = useSession
        ? (lookups.length > 0 ? Number((lookups.reduce((a, b) => a + b, 0) / lookups.length).toFixed(1)) : null)
        : def.cohortLookup;

      return {
        id: def.id,
        domain: def.label,
        questionsCovered: qCount,
        gradedCount: useSession ? graded : qCount,
        accuracyPct,
        meanLookupSec,
        trapAndPriorityDrill: def.trapNote
      };
    });

    const isSessionMode = (resolvedMode === 'session');
    const overallReadinessPct = isSessionMode
      ? (stats.accuracyPercent !== null ? stats.accuracyPercent : 0)
      : 83;
    const meanLookupSeconds = isSessionMode
      ? (stats.avgLookupSeconds !== null ? stats.avgLookupSeconds : null)
      : 31.3;
    const totalQuestions = DATASET.questions.length || 30;
    const verifiedProofRatePct = isSessionMode
      ? (stats.gradedCount > 0 ? Math.round((stats.verifiedProofCount / Math.max(1, stats.gradedCount)) * 100) : 0)
      : 92;

    const isExamReady = overallReadinessPct >= 75 && (meanLookupSeconds === null || meanLookupSeconds <= 45.0);
    const verdict = isExamReady
      ? 'EXAM READY — ABOVE 75% CBP THRESHOLD'
      : 'DIAGNOSTIC BASELINE — REQUIRES CITATION DRILL';

    const cohortSeats = [
      {
        seatLabel: isSessionMode ? 'Seat 01 — Active Candidate Session' : 'Seat 01 — Lead Customs Entry Writer (LAX)',
        trackFocus: 'Full CBLE (19 CFR Parts 111–190 & HTSUS)',
        masteryPct: isSessionMode ? (stats.accuracyPercent !== null ? `${stats.accuracyPercent}% (${stats.correctCount}/${stats.gradedCount})` : '--% (0 Graded)') : '88% (21/24)',
        avgLookup: isSessionMode ? (stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s') : '27.8s',
        verifiedProofs: isSessionMode ? `${stats.verifiedProofCount} / ${totalQuestions}` : '22 / 24',
        ready: isSessionMode ? (stats.accuracyPercent !== null && stats.accuracyPercent >= 75) : true
      },
      {
        seatLabel: 'Seat 02 — Senior Import Compliance Specialist (ORD)',
        trackFocus: '19 CFR Part 152 Valuation & Part 190 Drawback',
        masteryPct: '84% (25/30)',
        avgLookup: '30.4s',
        verifiedProofs: '27 / 30',
        ready: true
      },
      {
        seatLabel: 'Seat 03 — Tariff Classification Analyst (JFK)',
        trackFocus: 'HTSUS & GRI 1–6 Classification Suite',
        masteryPct: '83% (20/24)',
        avgLookup: '32.1s',
        verifiedProofs: '21 / 24',
        ready: true
      },
      {
        seatLabel: 'Seat 04 — Brokerage Bond & Entry Coordinator (HOU)',
        trackFocus: '19 CFR Parts 111, 113, 141 & 142',
        masteryPct: '79% (19/24)',
        avgLookup: '34.6s',
        verifiedProofs: '20 / 24',
        ready: true
      },
      {
        seatLabel: 'Seat 05 — Trade Tax & Transfer Pricing Specialist (NYC)',
        trackFocus: '31 CFR Part 10 (Circular 230) & 19 CFR Part 152',
        masteryPct: '90% (27/30)',
        avgLookup: '28.9s',
        verifiedProofs: '28 / 30',
        ready: true
      },
      {
        seatLabel: 'Seat 06 — Associate Customs Entry Writer (SAV)',
        trackFocus: '19 CFR Part 152 Assists & GRI 3(b) Sets',
        masteryPct: '71% (17/24)',
        avgLookup: '42.5s',
        verifiedProofs: '18 / 24',
        ready: false
      }
    ];

    return {
      reportId: 'B2B-CD-2026-8410',
      viewMode: resolvedMode,
      viewModeTitle: isSessionMode
        ? 'Current Session Telemetry'
        : 'Sample 12-Seat Brokerage Cohort Benchmark',
      totalQuestions,
      overallReadinessPct,
      meanLookupSeconds,
      verifiedProofRatePct,
      verdict,
      isExamReady,
      domains,
      cohortSeats
    };
  }

  function renderB2BTeamReadinessReportModal(modeOverride) {
    if (modeOverride) {
      b2bReportViewMode = modeOverride;
    }
    const data = generateB2BTeamReadinessData(b2bReportViewMode);

    const viewLabelEl = document.getElementById('b2bReportActiveViewLabel');
    if (viewLabelEl) viewLabelEl.textContent = data.viewModeTitle;

    const repIdEl = document.getElementById('b2bReportIdVal');
    if (repIdEl) repIdEl.textContent = data.reportId;

    const kpiGrid = document.getElementById('b2bReportKpiGrid');
    if (kpiGrid) {
      const readinessStr = (data.viewMode === 'session' && getSessionStats().gradedCount === 0)
        ? '--%'
        : `${data.overallReadinessPct}%`;
      const lookupStr = data.meanLookupSeconds !== null
        ? `${data.meanLookupSeconds.toFixed(1)}s`
        : '--s';
      const proofStr = (data.viewMode === 'session' && getSessionStats().gradedCount === 0)
        ? '0%'
        : `${data.verifiedProofRatePct}%`;

      kpiGrid.innerHTML = `
        <div class="b2b-kpi-box">
          <span class="b2b-kpi-label">Overall Domain Mastery &amp; Pass Readiness %</span>
          <strong class="b2b-kpi-val" id="b2bKpiReadinessVal">${escapeHtml(readinessStr)}</strong>
          <span class="b2b-kpi-sub">CBP Official Passing Threshold: &gt;= 75.0%</span>
        </div>
        <div class="b2b-kpi-box">
          <span class="b2b-kpi-label">Mean Citation Lookup Latency (s)</span>
          <strong class="b2b-kpi-val" id="b2bKpiLatencyVal">${escapeHtml(lookupStr)}</strong>
          <span class="b2b-kpi-sub">Target Benchmark: &lt;= 40.0s (Legacy PDF: 145s)</span>
        </div>
        <div class="b2b-kpi-box">
          <span class="b2b-kpi-label">Verified 19 CFR / HTSUS Citation Proof Rate %</span>
          <strong class="b2b-kpi-val" id="b2bKpiProofRateVal">${escapeHtml(proofStr)}</strong>
          <span class="b2b-kpi-sub">Exact statutory section locked as evidence</span>
        </div>
        <div class="b2b-kpi-box">
          <span class="b2b-kpi-label">Compliance Director Verdict</span>
          <strong class="b2b-kpi-val ${data.isExamReady ? 'b2b-verdict-pass' : 'b2b-verdict-warn'}" id="b2bKpiVerdictVal" style="font-size:13px;line-height:1.3;">${escapeHtml(data.verdict)}</strong>
          <span class="b2b-kpi-sub">${escapeHtml(data.viewModeTitle)}</span>
        </div>
      `;
    }

    const domainTbody = document.getElementById('b2bReportDomainTableBody');
    if (domainTbody) {
      domainTbody.innerHTML = data.domains.map(d => {
        const accCell = d.accuracyPct !== null ? `${d.accuracyPct}%` : '--% (Untested)';
        const latCell = d.meanLookupSec !== null ? `${d.meanLookupSec.toFixed(1)}s` : '--s';
        return `
          <tr>
            <td><strong>${escapeHtml(d.domain)}</strong></td>
            <td class="b2b-mono-cell">${d.questionsCovered} Qs</td>
            <td class="b2b-mono-cell">${escapeHtml(accCell)}</td>
            <td class="b2b-mono-cell">${escapeHtml(latCell)}</td>
            <td>${escapeHtml(d.trapAndPriorityDrill)}</td>
          </tr>
        `;
      }).join('');
    }

    const cohortTbody = document.getElementById('b2bReportCohortTableBody');
    if (cohortTbody) {
      cohortTbody.innerHTML = data.cohortSeats.map(seat => `
        <tr>
          <td><strong>${escapeHtml(seat.seatLabel)}</strong></td>
          <td>${escapeHtml(seat.trackFocus)}</td>
          <td class="b2b-mono-cell">${escapeHtml(seat.masteryPct)}</td>
          <td class="b2b-mono-cell">${escapeHtml(seat.avgLookup)}</td>
          <td class="b2b-mono-cell">${escapeHtml(seat.verifiedProofs)}</td>
          <td>
            <span class="b2b-status-chip ${seat.ready ? 'chip-pass' : 'chip-warn'}">
              ${seat.ready ? 'EXAM READY (>= 75%)' : 'PRIORITY DRILL (< 75%)'}
            </span>
          </td>
        </tr>
      `).join('');
    }

    return data;
  }

  function openB2BTeamReadinessReport(modeOverride) {
    const modal = document.getElementById('modalTeamReadinessReport');
    if (!modal) return null;

    if (modeOverride) {
      b2bReportViewMode = modeOverride;
    } else {
      const stats = getSessionStats();
      b2bReportViewMode = stats.gradedCount > 0 ? 'session' : 'cohort';
    }

    const reportData = renderB2BTeamReadinessReportModal(b2bReportViewMode);
    modal.classList.remove('hidden');
    document.getElementById('btnCloseB2BTeamReportModal').focus();
    window.dispatchEvent(new CustomEvent('cf:workflow',{detail:{stage:'export_ready'}}));
    return reportData;
  }

  function openScratchpadModal() {
    const backdrop = document.getElementById('scratchpadModalBackdrop');
    const textarea = document.getElementById('candidateScratchpadTextarea');
    if (!backdrop || !textarea) return;

    textarea.value = STATE.scratchpadText || '';
    updateCustomsValuationCalculator();
    backdrop.classList.remove('hidden');
  }

  function openOfficialScoreReportModal() {
    // Enforce Freemium Paywall on full Submit & Score Exam when on FREE tier
    if (!isProOrTeamActive()) {
      openAccountPaywallModal({
        paywallReason: 'Create an account and activate a Pro plan to unlock all 48 exam cases (CBLE + IRS SEE Parts 1–3) and full practice exam scoring.'
      });
      return;
    }

    const backdrop = document.getElementById('scoreReportModalBackdrop');
    const body = document.getElementById('scoreReportModalBody');
    if (!backdrop || !body) return;

    const pool = getFilteredQuestions();
    let correct = 0;
    let answered = 0;
    let verifiedProofs = 0;

    pool.forEach(q => {
      const w = getQuestionWork(q.id);
      if (w.selectedOption) {
        answered++;
        w.checked = true;
        if (w.selectedOption === q.correctOption) correct++;
      }
      if (w.attachedSectionId && isCitationProofMatch(q, w.attachedSectionId)) {
        verifiedProofs++;
      }
    });

    saveUserState();
    renderQuestionWorkspace();
    renderGlobalBarTelemetry();

    const stats = getSessionStats(pool);
    const scorePct = pool.length > 0 ? Math.round((correct / pool.length) * 100) : 0;
    const passed = scorePct >= (DATASET.meta.passingScorePercent || 75);
    const avgLookupStr = stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s';
    const isSeeTrack = /^EA/.test(STATE.selectedTrack || '');
    const examTrackHeading = isSeeTrack
      ? 'IRS SPECIAL ENROLLMENT EXAMINATION (SEE) DETERMINATION (75% BENCHMARK)'
      : 'OFFICIAL EXAMINATION DETERMINATION (75% PASSING THRESHOLD)';
    const corpusAuditLabel = isSeeTrack
      ? 'Exact 26 CFR / IRC / Circular 230 Cited'
      : 'Exact eCFR / HTSUS Section Cited';

    body.innerHTML = `
      <div style="padding:16px;border-radius:0px;margin-bottom:16px;background:${passed ? '#EDF5F0' : '#FDF2EE'};border:1.5px solid ${passed ? '#1A5638' : '#C8431F'};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:${passed ? '#1A5638' : '#C8431F'};">
            ${examTrackHeading}
          </div>
          <h3 style="font-family:var(--font-display);font-size:26px;font-weight:400;color:#141413;margin-top:4px;">
            ${passed ? 'PASS — Ready for Licensing Examination' : 'BELOW 75% THRESHOLD — Additional Citation-Speed Drills Needed'}
          </h3>
          <p style="font-size:13px;color:#4A4842;margin-top:4px;">
            You answered <strong>${correct} of ${pool.length}</strong> questions correctly (${answered} attempted) with <strong>${verifiedProofs}</strong> verified statutory citation proofs.
          </p>
        </div>
        <div style="text-align:right;">
          <div style="font-family:var(--font-mono);font-size:36px;font-weight:600;color:${passed ? '#1A5638' : '#C8431F'};">${scorePct}%</div>
          <div style="font-family:var(--font-mono);font-size:11px;color:#4A4842;">Required: >= 75%</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;">
        <div style="background:#F6F4EF;border:1px solid #C9C4B8;padding:12px;border-radius:0px;">
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#78756D;font-weight:600;">AVG CITATION LOOKUP</div>
          <div style="font-family:var(--font-mono);font-size:20px;font-weight:600;color:#141413;">${avgLookupStr}</div>
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#1A5638;">Target Benchmark: <= 45.0s</div>
        </div>
        <div style="background:#F6F4EF;border:1px solid #C9C4B8;padding:12px;border-radius:0px;">
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#78756D;font-weight:600;">VERIFIED CITATION PROOFS</div>
          <div style="font-family:var(--font-mono);font-size:20px;font-weight:600;color:#141413;">${verifiedProofs} / ${pool.length}</div>
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#4A4842;">${corpusAuditLabel}</div>
        </div>
        <div style="background:#F6F4EF;border:1px solid #C9C4B8;padding:12px;border-radius:0px;">
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#78756D;font-weight:600;">REMAINING EXAM CLOCK</div>
          <div style="font-family:var(--font-mono);font-size:20px;font-weight:600;color:#141413;">${formatHmsClock(STATE.cbtTimerRemainingSec)}</div>
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#4A4842;">Out of 04:30:00 total</div>
        </div>
      </div>

      <h4 style="font-family:var(--font-mono);font-size:11.5px;font-weight:600;color:#141413;margin-bottom:8px;">QUESTION-BY-QUESTION REGULATORY AUDIT</h4>
      <div style="display:flex;flex-direction:column;gap:6px;max-height:240px;overflow-y:auto;">
        ${pool.map((q, idx) => {
          const posNum = idx + 1;
          const w = getQuestionWork(q.id);
          const isRight = w.selectedOption === q.correctOption;
          return `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#F6F4EF;border:1px solid #C9C4B8;border-left:4px solid ${isRight ? '#1A5638' : '#C8431F'};border-radius:0px;font-size:12px;">
              <div>
                <strong>Q${posNum} (${escapeHtml(q.category)})</strong> — Governing Authority: <code>${escapeHtml(q.targetCitation)}</code>
              </div>
              <div style="font-family:var(--font-mono);font-weight:600;">
                Your Ans: ${w.selectedOption || 'None'} · Official: ${q.correctOption} (${isRight ? 'Pass' : 'Fail'})
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    backdrop.classList.remove('hidden');
  }

  /* ==========================================================================
     17. EVENT LISTENERS & INITIALIZATION
     ========================================================================== */
  function initEventListeners() {
    document.querySelectorAll('.cd-mode-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        if (mode) switchMode(mode);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === '1') { e.preventDefault(); switchMode('cbt'); }
      if (e.altKey && e.key === '2') { e.preventDefault(); switchMode('drill'); }
      if (e.altKey && e.key === '3') { e.preventDefault(); switchMode('analytics'); }
    });

    // 7 Test Suites Selector (#examTrackSelect) with Freemium PRO Gate & Auto-Corpus Switching
    const trackSelect = document.getElementById('examTrackSelect');
    if (trackSelect) {
      trackSelect.addEventListener('change', () => {
        const requestedSuite = trackSelect.value;
        if (isSuiteLockedForCurrentTier(requestedSuite)) {
          trackSelect.value = STATE.selectedTrack;
          openAccountPaywallModal({
            paywallReason: 'Create an account and activate a Pro plan to unlock all 48 exam cases and 10 suites (CBLE + IRS SEE Parts 1–3).'
          });
          return;
        }

        STATE.selectedTrack = requestedSuite;
        window.dispatchEvent(new CustomEvent('cf:workflow',{detail:{stage:'sample_selected'}}));
        const pool = getFilteredQuestions();
        if (pool[0]) STATE.currentQuestionId = pool[0].id;

        autoSwitchCorpusForSuite(STATE.selectedTrack);

        resetPerQuestionLookupStopwatch();
        saveUserState();
        refreshAllViews();
        if (STATE.activeMode === 'drill') {
          startDrillSprintForCurrentQuestion(false);
        }
        showToast(`Loaded Suite: ${trackSelect.options[trackSelect.selectedIndex].text}`);
      });
    }

    // Header Account & Unlock Pro Buttons
    const btnHeaderSignIn = document.getElementById('btnHeaderSignIn');
    if (btnHeaderSignIn) {
      btnHeaderSignIn.addEventListener('click', () => {
        openAccountPaywallModal({ tab: 'signin' });
      });
    }

    const btnHeaderUnlockPro = document.getElementById('btnHeaderUnlockPro');
    if (btnHeaderUnlockPro) {
      btnHeaderUnlockPro.addEventListener('click', () => {
        openAccountPaywallModal({ tab: 'register', planCode: 'TEAM_LICENSE' });
      });
    }

    const btnHeaderAccountBilling = document.getElementById('btnHeaderAccountBilling');
    if (btnHeaderAccountBilling) {
      btnHeaderAccountBilling.addEventListener('click', () => {
        openAccountPaywallModal({ tab: 'payment' });
      });
    }

    // Reset Button -> Restores Clean Session (0 Answered)
    const btnResetDemo = document.getElementById('btnResetDemoData');
    if (btnResetDemo) {
      btnResetDemo.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        STATE = getDefaultUserState();
        currentSearchQuery = '';
        const searchInput = document.getElementById('ecfrSearchInput');
        if (searchInput) searchInput.value = '';
        autoSwitchCorpusForSuite('CBLE');
        resetPerQuestionLookupStopwatch();
        saveUserState();
        switchMode('cbt');
        refreshAllViews();
        showToast('Session reset to fresh Free Trial (0/30 Answered)');
      });
    }

    // Collapsible Study Coach & Hints Trigger
    const btnToggleCoach = document.getElementById('btnToggleStudyCoach');
    if (btnToggleCoach) {
      btnToggleCoach.addEventListener('click', () => {
        STATE.studyCoachExpanded = !STATE.studyCoachExpanded;
        saveUserState();
        const q = getCurrentQuestion();
        if (q) {
          renderSocraticTutorPanel(q, getQuestionWork(q.id), getQuestionPosInActiveSuite(q));
        }
      });
    }

    const btnToggleTimer = document.getElementById('btnToggleCbtTimer');
    const btnResetTimer = document.getElementById('btnResetCbtTimer');
    if (btnToggleTimer) {
      btnToggleTimer.addEventListener('click', () => {
        STATE.cbtTimerPaused = !STATE.cbtTimerPaused;
        btnToggleTimer.textContent = STATE.cbtTimerPaused ? 'Resume' : 'Pause';
        saveUserState();
      });
    }
    if (btnResetTimer) {
      btnResetTimer.addEventListener('click', () => {
        STATE.cbtTimerRemainingSec = DATASET.meta.examDurationSeconds || 16200;
        STATE.cbtTimerPaused = false;
        if (btnToggleTimer) btnToggleTimer.textContent = 'Pause';
        document.getElementById('pvueCountdownClock').textContent = formatHmsClock(STATE.cbtTimerRemainingSec);
        saveUserState();
        showToast('Exam clock reset to 04:30:00');
      });
    }

    document.getElementById('btnFlagForReview').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const posNum = getQuestionPosInActiveSuite(q);
      const work = getQuestionWork(q.id);
      work.flagged = !work.flagged;
      saveUserState();
      renderQuestionWorkspace();
      showToast(work.flagged ? `Flagged Question ${posNum} for review` : `Unflagged Question ${posNum}`);
    });

    const btnHighlight = document.getElementById('btnHighlightText');
    btnHighlight.addEventListener('click', () => {
      const applied = highlightCurrentSelectionInStem();
      if (!applied) {
        STATE.highlightCursorMode = !STATE.highlightCursorMode;
        btnHighlight.classList.toggle('active', STATE.highlightCursorMode);
        const hintEl = document.getElementById('highlightModeStatusHint');
        if (hintEl) {
          hintEl.textContent = STATE.highlightCursorMode
            ? 'Highlight Mode Active: Select any text in Question or Code to mark'
            : 'Select text + click Highlight to mark key facts';
        }
        showToast(STATE.highlightCursorMode
          ? 'Highlight Mode Enabled: Select any text with your mouse to mark it'
          : 'Highlight Mode Disabled');
      }
    });

    document.addEventListener('mouseup', () => {
      if (STATE.highlightCursorMode) {
        highlightCurrentSelectionInStem();
      }
    });

    document.addEventListener('click', (e) => {
      const mark = e.target.closest('mark.user-highlight');
      if (mark) {
        const parent = mark.parentNode;
        while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
        parent.removeChild(mark);
        const q = getCurrentQuestion();
        const stemEl = document.getElementById('qStemContent');
        if (q && stemEl && stemEl.contains(parent)) {
          const work = getQuestionWork(q.id);
          work.highlightedStemHtml = stemEl.innerHTML;
          saveUserState();
        }
      }
    });

    document.getElementById('btnClearHighlights').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const work = getQuestionWork(q.id);
      work.highlightedStemHtml = null;
      saveUserState();
      renderQuestionWorkspace();
      renderReferenceLibrary();
      showToast('Cleared yellow text marks on current question');
    });

    const btnStrikeMode = document.getElementById('btnStrikethroughMode');
    btnStrikeMode.addEventListener('click', () => {
      STATE.strikethroughClickMode = !STATE.strikethroughClickMode;
      btnStrikeMode.classList.toggle('active', STATE.strikethroughClickMode);
      showToast(STATE.strikethroughClickMode
        ? 'Strikethrough Mode On: Click any option A–E (or Right-Click anytime) to cross out distractors'
        : 'Strikethrough Mode Off (Right-Click any option A–E or click Strike anytime)');
    });

    document.getElementById('btnOpenNavigator').addEventListener('click', openNavigatorModal);
    document.getElementById('btnOpenScratchpad').addEventListener('click', openScratchpadModal);
    document.getElementById('btnCheckCurrentAnswer').addEventListener('click', verifyCurrentQuestionAnswer);
    document.getElementById('btnVerifyAnswerMain').addEventListener('click', verifyCurrentQuestionAnswer);
    document.getElementById('btnGradeFullExam').addEventListener('click', openOfficialScoreReportModal);

    document.querySelectorAll('.pvue-ratio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ratio = btn.getAttribute('data-split');
        const ws = document.getElementById('pvueSplitWorkspace');
        const leftPane = document.getElementById('pvueLeftPane');
        const rightPane = document.getElementById('pvueRightPane');
        leftPane.style.removeProperty('--pane-width');
        rightPane.style.removeProperty('--pane-width');
        ws.setAttribute('data-ratio', ratio);
        document.querySelectorAll('.pvue-ratio-btn').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    const splitDivider = document.getElementById('pvueSplitDivider');
    if (splitDivider) {
      let isDraggingSplit = false;
      splitDivider.addEventListener('mousedown', (e) => {
        isDraggingSplit = true;
        splitDivider.classList.add('dragging');
        e.preventDefault();
      });
      window.addEventListener('mousemove', (e) => {
        if (!isDraggingSplit) return;
        const ws = document.getElementById('pvueSplitWorkspace');
        const rect = ws.getBoundingClientRect();
        if (rect.width < 600) return;
        const leftPct = Math.max(28, Math.min(72, ((e.clientX - rect.left) / rect.width) * 100));
        document.getElementById('pvueLeftPane').style.setProperty('--pane-width', `${leftPct}%`);
        document.getElementById('pvueRightPane').style.setProperty('--pane-width', `${100 - leftPct}%`);
      });
      window.addEventListener('mouseup', () => {
        if (isDraggingSplit) {
          isDraggingSplit = false;
          splitDivider.classList.remove('dragging');
        }
      });
    }

    document.getElementById('btnPrevQuestion').addEventListener('click', () => {
      const pool = getFilteredQuestions();
      const idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
      if (idx > 0) {
        STATE.currentQuestionId = pool[idx - 1].id;
        resetPerQuestionLookupStopwatch();
        saveUserState();
        renderQuestionWorkspace();
        if (STATE.activeMode === 'drill') startDrillSprintForCurrentQuestion(false);
      }
    });

    // Next Question Button -> Enforces 3-Question Free Trial Paywall on Question 4+
    document.getElementById('btnNextQuestion').addEventListener('click', () => {
      const pool = getFilteredQuestions();
      const idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
      const nextIdx = idx + 1;
      if (nextIdx >= pool.length) return;

      if (isQuestionIndexLockedForCurrentTier(nextIdx)) {
        openAccountPaywallModal({
          paywallReason: 'Create an account and activate a Pro plan to unlock the full practice bank.'
        });
        return;
      }

      STATE.currentQuestionId = pool[nextIdx].id;
      resetPerQuestionLookupStopwatch();
      saveUserState();
      renderQuestionWorkspace();
      if (STATE.activeMode === 'drill') startDrillSprintForCurrentQuestion(false);
    });

    document.getElementById('btnSwitchToDrillFromCbt').addEventListener('click', () => {
      switchMode('drill');
      showToast('Launched 90-Second Citation-Speed Drill');
    });

    document.getElementById('btnJumpToAttachedProof').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const work = getQuestionWork(q.id);
      const sec = resolveSectionByRef(work.attachedSectionId);
      if (sec) openSectionInReader(sec);
    });

    document.getElementById('btnExpOpenTargetSection').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const sec = resolveSectionByRef(q.targetSectionId) || resolveSectionByRef(q.targetCitation);
      if (sec) {
        openSectionInReader(sec);
        showToast(`Opened Governing Section: ${sec.citation}`);
      }
    });

    document.getElementById('btnDrillRestartSprint').addEventListener('click', () => {
      startDrillSprintForCurrentQuestion(true);
      showToast('Restarted 90-Second Citation-Speed Sprint');
    });

    document.getElementById('btnDrillPauseSprint').addEventListener('click', (e) => {
      drillPaused = !drillPaused;
      e.currentTarget.textContent = drillPaused ? 'Resume' : 'Pause';
    });

    document.getElementById('btnDrillNextQuestion').addEventListener('click', () => {
      const pool = getFilteredQuestions();
      const idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
      const nextIdx = (idx + 1) % pool.length;

      if (isQuestionIndexLockedForCurrentTier(nextIdx)) {
        openAccountPaywallModal({
          paywallReason: 'Create an account and activate a Pro plan to unlock the full practice bank.'
        });
        return;
      }

      STATE.currentQuestionId = pool[nextIdx].id;
      saveUserState();
      startDrillSprintForCurrentQuestion(false);
    });

    [1, 2, 3].forEach(level => {
      const btn = document.getElementById(`btnRevealHint${level}`);
      if (btn) {
        btn.addEventListener('click', () => {
          const q = getCurrentQuestion();
          if (!q) return;
          const work = getQuestionWork(q.id);
          work.revealedHints = Array.isArray(work.revealedHints) ? work.revealedHints : [];
          if (!work.revealedHints.includes(level)) work.revealedHints.push(level);
          saveUserState();
          renderSocraticTutorPanel(q, work, getQuestionPosInActiveSuite(q));
        });
      }
    });

    document.getElementById('btnRevealShortestPath').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const work = getQuestionWork(q.id);
      if (work.shortestPathRevealed || work.checked) {
        const sec = resolveSectionByRef(q.targetSectionId) || resolveSectionByRef(q.targetCitation);
        if (sec) openSectionInReader(sec);
      } else {
        work.shortestPathRevealed = true;
        saveUserState();
        renderSocraticTutorPanel(q, work, getQuestionPosInActiveSuite(q));
      }
    });

    document.querySelectorAll('.socratic-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const promptType = chip.getAttribute('data-prompt');
        generateSocraticExaminerResponse(promptType, null);
      });
    });

    const askCustomBtn = document.getElementById('btnSocraticCustomAsk');
    const askCustomInput = document.getElementById('socraticCustomInput');
    if (askCustomBtn && askCustomInput) {
      const triggerAsk = () => {
        const val = askCustomInput.value.trim();
        if (!val) return;
        generateSocraticExaminerResponse('custom', val);
        askCustomInput.value = '';
      };
      askCustomBtn.addEventListener('click', triggerAsk);
      askCustomInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          triggerAsk();
        }
      });
    }

    const ecfrSearchInput = document.getElementById('ecfrSearchInput');
    if (ecfrSearchInput) {
      ecfrSearchInput.addEventListener('input', () => {
        currentSearchQuery = ecfrSearchInput.value;
        const qTrim = currentSearchQuery.trim();
        if (qTrim) {
          const activeCorpus = getActiveCorpus();
          let firstHit = null;
          if (activeCorpus) {
            for (const p of activeCorpus.parts) {
              const found = p.sections.find(s => countSectionSearchMatches(s, qTrim) > 0);
              if (found) { firstHit = found; break; }
            }
          }
          if (!firstHit) {
            firstHit = DATASET.allSections.find(s => countSectionSearchMatches(s, qTrim) > 0);
            if (firstHit) STATE.activeCorpusId = firstHit.corpusId;
          }
          if (firstHit) STATE.activeSectionId = firstHit.id;
        }
        renderReferenceLibrary();
      });
    }

    document.getElementById('btnClearEcfrSearch').addEventListener('click', () => {
      currentSearchQuery = '';
      if (ecfrSearchInput) ecfrSearchInput.value = '';
      renderReferenceLibrary();
    });

    document.querySelectorAll('.ref-search-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const qStr = chip.getAttribute('data-query') || '';
        currentSearchQuery = qStr;
        if (ecfrSearchInput) ecfrSearchInput.value = qStr;
        const firstHit = DATASET.allSections.find(s => countSectionSearchMatches(s, qStr) > 0);
        if (firstHit) {
          STATE.activeCorpusId = firstHit.corpusId;
          STATE.activeSectionId = firstHit.id;
        }
        renderReferenceLibrary();
      });
    });

    document.getElementById('btnToggleCodeTree').addEventListener('click', () => {
      STATE.treeCollapsed = !STATE.treeCollapsed;
      saveUserState();
      renderReferenceLibrary();
    });

    document.getElementById('btnLockCitationProof').addEventListener('click', lockInActiveSectionAsProof);
    document.getElementById('btnCopyCitationScratchpad').addEventListener('click', copyActiveCitationToScratchpad);

    const closeNav = () => document.getElementById('navigatorModalBackdrop').classList.add('hidden');
    document.getElementById('btnCloseNavigatorModal').addEventListener('click', closeNav);
    document.getElementById('btnNavCloseFooter').addEventListener('click', closeNav);
    document.getElementById('btnNavGradeExam').addEventListener('click', () => {
      closeNav();
      openOfficialScoreReportModal();
    });

    const closeScratch = () => document.getElementById('scratchpadModalBackdrop').classList.add('hidden');
    document.getElementById('btnCloseScratchpadModal').addEventListener('click', closeScratch);
    document.getElementById('btnScratchpadDone').addEventListener('click', closeScratch);
    document.getElementById('btnAnalyticsOpenScratchpad').addEventListener('click', openScratchpadModal);

    ['calcInvoicePrice', 'calcPackingCost', 'calcAssistCost', 'calcRoyaltyCost', 'calcNonDutiable', 'calcDutyRate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateCustomsValuationCalculator);
    });

    document.getElementById('btnInsertCalcToScratchpad').addEventListener('click', () => {
      const res = updateCustomsValuationCalculator();
      const note = `\n19 CFR § 152.103 Valuation Calculation: Appraised Transaction Value = ${res.transactionVal} | Duty (${res.ratePct}%) = ${res.baseDuty} | MPF+HMF = ${res.mpfHmf} | Total CBP Deposit = ${res.totalDeposit}`;
      const textarea = document.getElementById('candidateScratchpadTextarea');
      textarea.value = (textarea.value.trim() + '\n' + note).trim();
      STATE.scratchpadText = textarea.value;
      saveUserState();
      showToast('Inserted Transaction Value calculation into Candidate Notes');
    });

    const scratchTextarea = document.getElementById('candidateScratchpadTextarea');
    if (scratchTextarea) {
      scratchTextarea.addEventListener('input', () => {
        STATE.scratchpadText = scratchTextarea.value;
        saveUserState();
      });
    }

    document.getElementById('btnClearScratchpadNotes').addEventListener('click', () => {
      STATE.scratchpadText = '';
      if (scratchTextarea) scratchTextarea.value = '';
      saveUserState();
      showToast('Cleared Candidate Notes');
    });

    const closeScore = () => document.getElementById('scoreReportModalBackdrop').classList.add('hidden');
    document.getElementById('btnCloseScoreReportModal').addEventListener('click', closeScore);
    document.getElementById('btnScoreReviewQuestions').addEventListener('click', closeScore);
    document.getElementById('btnScoreOpenAnalytics').addEventListener('click', () => {
      closeScore();
      switchMode('analytics');
    });

    // Mode 3 Pricing Card Toggle & CTAs
    const btnCheckoutB2B = document.getElementById('btnCheckoutB2B');
    if (btnCheckoutB2B) {
      btnCheckoutB2B.addEventListener('click', () => {
        openAccountPaywallModal({ tab: STATE.accountUser ? 'payment' : 'register', planCode: 'TEAM_LICENSE' });
      });
    }

    // Account, Registration & Pro Paywall Modal Events
    document.getElementById('btnCloseCheckoutModal').addEventListener('click', () => {
      document.getElementById('checkoutModalBackdrop').classList.add('hidden');
    });

    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabKey = btn.getAttribute('data-auth-tab');
        if (tabKey) switchAuthModalTab(tabKey);
      });
    });

    document.querySelectorAll('#regPlanSelector .plan-radio-card').forEach(card => {
      card.addEventListener('click', () => {
        const code = card.getAttribute('data-plan-code');
        if (code) selectPlanByCode(code);
      });
    });

    // Tab 1: Registration Form Submit -> Saves Account & Advances to Tab 3 (Payment)
    const regForm = document.getElementById('registerAccountForm');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('regFullNameInput').value.trim();
        const email = document.getElementById('regEmailInput').value.trim();
        const role = document.getElementById('regRoleSelect').value;

        STATE.accountUser = {
          fullName,
          email,
          role,
          createdAt: new Date().toISOString()
        };
        saveUserState();
        renderGlobalBarTelemetry();

        const checkoutEmail = document.getElementById('checkoutEmailInput');
        const checkoutOrg = document.getElementById('checkoutOrgInput');
        const invComp = document.getElementById('invCompanyInput');
        if (checkoutEmail) checkoutEmail.value = email;
        if (checkoutOrg) checkoutOrg.value = fullName;
        if (invComp) invComp.value = fullName;

        switchAuthModalTab('payment');
        showToast(`Account created for ${email}. Complete payment or license activation below.`);
      });
    }

    // Tab 2: Sign In Form Submit
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmailInput').value.trim();
        if (!email) return;

        if (!STATE.accountUser || STATE.accountUser.email !== email) {
          STATE.accountUser = {
            fullName: email.split('@')[0],
            email,
            role: 'CBLE Candidate',
            createdAt: new Date().toISOString()
          };
        }
        saveUserState();
        renderGlobalBarTelemetry();

        if (isProOrTeamActive()) {
          document.getElementById('checkoutModalBackdrop').classList.add('hidden');
          showToast(`Signed in as ${email} (${STATE.licenseTier} License Active)`);
        } else {
          switchAuthModalTab('payment');
          showToast(`Signed in as ${email}. Activate your Pro plan below.`);
        }
      });
    }

    // Tab 3: Payment & Activation Sub-Method Switcher
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const methodKey = btn.getAttribute('data-pay-method');
        if (methodKey) switchPaymentMethodSubTab(methodKey);
      });
    });

    // Method A: Card / Contra B2B Instant Checkout Submit
    const stripeForm = document.getElementById('stripeCheckoutForm');
    if (stripeForm) {
      stripeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('checkoutEmailInput').value.trim();
        const holder = document.getElementById('checkoutOrgInput').value.trim();
        const plan = PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.TEAM_LICENSE;

        if (email) {
          STATE.accountUser = Object.assign({}, STATE.accountUser || {}, {
            fullName: holder || (STATE.accountUser && STATE.accountUser.fullName) || email.split('@')[0],
            email
          });
          saveUserState();
        }

        if (isLocalQaEnvironment()) {
          const generatedKey = generateSignedLicenseKey(plan.tier);
          validateAndActivateLicenseKey(generatedKey);
          return;
        }

        const gwEl = document.querySelector('#stripeCheckoutForm select');
        const gw = gwEl ? gwEl.value : 'gumroad';
        const url =
          gw === 'contra'
            ? 'https://contra.com/s/qAZQN6OW-code-drilltm-cbt-and-interactive-exam-courseware-team-license'
            : 'https://caliberfoundry.gumroad.com/l/codedrill-pro';
        window.open(url, '_blank', 'noopener');
        switchPaymentMethodSubTab('key');
        showToast('Opened secure checkout. Paste the license key from your receipt to unlock CodeDrill CBT Pro.');
      });
    }

    // Method B: Generate Corporate Invoice & Print PDF
    const btnGenInv = document.getElementById('btnGenerateInvoice');
    if (btnGenInv) {
      btnGenInv.addEventListener('click', () => {
        renderCorporateInvoicePreview();
        showToast('Generated Commercial Invoice from Caliber Foundry');
      });
    }

    const btnPrintInv = document.getElementById('btnPrintInvoice');
    if (btnPrintInv) {
      btnPrintInv.addEventListener('click', () => {
        renderCorporateInvoicePreview();
        window.print();
      });
    }

    // Method C: Validate & Activate License Key
    const btnActKey = document.getElementById('btnActivateLicenseKey');
    if (btnActKey) {
      btnActKey.addEventListener('click', () => {
        const keyInput = document.getElementById('licenseKeyInput');
        const rawKey = keyInput ? keyInput.value : '';
        validateAndActivateLicenseKey(rawKey);
      });
    }

    // Printable B2B Team Readiness PDF Report Modal Events
    const btnExportB2B = document.getElementById('btnExportB2BTeamReport');
    if (btnExportB2B) {
      btnExportB2B.addEventListener('click', () => {
        openB2BTeamReadinessReport();
      });
    }

    const btnB2BCardReport = document.getElementById('btnB2BCardPreviewReport');
    if (btnB2BCardReport) {
      btnB2BCardReport.addEventListener('click', () => {
        openB2BTeamReadinessReport('cohort');
      });
    }

    const btnCloseB2BModal = document.getElementById('btnCloseB2BTeamReportModal');
    if (btnCloseB2BModal) {
      btnCloseB2BModal.addEventListener('click', () => {
        document.getElementById('modalTeamReadinessReport').classList.add('hidden');
      });
    }

    const btnToggleCohort = document.getElementById('btnToggleB2BCohortMode');
    if (btnToggleCohort) {
      btnToggleCohort.addEventListener('click', () => {
        b2bReportViewMode = (b2bReportViewMode === 'cohort') ? 'session' : 'cohort';
        renderB2BTeamReadinessReportModal(b2bReportViewMode);
        showToast(`Switched B2B Dossier to: ${b2bReportViewMode === 'cohort' ? 'Sample 12-Seat Brokerage Cohort Benchmark' : 'Current Session Telemetry'}`);
      });
    }

    const btnPrintB2B = document.getElementById('btnPrintB2BTeamReport');
    if (btnPrintB2B) {
      btnPrintB2B.addEventListener('click', () => {
        window.print();
      });
    }

    const btnUpgradeB2BReport = document.getElementById('btnUpgradeFromB2BReport');
    if (btnUpgradeB2BReport) {
      btnUpgradeB2BReport.addEventListener('click', () => {
        document.getElementById('modalTeamReadinessReport').classList.add('hidden');
        openAccountPaywallModal({
          tab: 'payment',
          planCode: 'TEAM_LICENSE'
        });
        switchPaymentMethodSubTab('invoice');
      });
    }
  }

  /* ==========================================================================
     18. GLOBAL TIMERS, PUBLIC CONTROLLER HOOK & BOOTSTRAP
     ========================================================================== */
  function startGlobalClocks() {
    const clockEl = document.getElementById('pvueCountdownClock');
    if (clockEl) clockEl.textContent = formatHmsClock(STATE.cbtTimerRemainingSec);

    cbtTimerInterval = setInterval(() => {
      if (STATE.cbtTimerPaused || STATE.activeMode !== 'cbt') return;
      if (STATE.cbtTimerRemainingSec > 0) {
        STATE.cbtTimerRemainingSec--;
        if (clockEl) clockEl.textContent = formatHmsClock(STATE.cbtTimerRemainingSec);
        if (STATE.cbtTimerRemainingSec % 10 === 0) saveUserState();
      }
    }, 1000);

    questionElapsedTimerInterval = setInterval(() => {
      const q = getCurrentQuestion();
      if (!q) return;
      const miniEl = document.getElementById('qElapsedLookupTimer');
      if (miniEl) {
        const sec = getCurrentElapsedLookupSec(q);
        miniEl.textContent = `${sec.toFixed(1)}s`;
      }
    }, 200);
  }

  function setupStudyNavigation() {
    const split = document.getElementById('pvueSplitWorkspace');
    const buttons = document.querySelectorAll('[data-study-pane]');
    const storedPositions = { question: null, source: null };
    function showPane(name, remember = true) {
      const previous = split.dataset.pane || 'question';
      const start = split.getBoundingClientRect().top + window.scrollY;
      if (remember && previous !== name) storedPositions[previous] = window.scrollY - start;
      split.classList.remove('study-split');
      split.dataset.pane = name;
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.studyPane === name)));
      window.scrollTo(0, Math.max(0, start + (storedPositions[name] ?? -52)));
    }
    buttons.forEach(button => button.addEventListener('click', () => showPane(button.dataset.studyPane)));
    for (const id of ['btnJumpToAttachedProof', 'btnExpOpenTargetSection']) {
      document.getElementById(id).addEventListener('click', () => showPane('source'));
    }
    document.querySelectorAll('[data-split]').forEach(button => button.addEventListener('click', () => {
      if (window.matchMedia('(min-width: 901px)').matches) split.classList.add('study-split');
    }));
    window.addEventListener('cf:open-step', event => {
      const step = Number(event.detail?.step);
      if (step === 3) { openB2BTeamReadinessReport(); return; }
      const question = getCurrentQuestion();
      if (!question || ![1, 2].includes(step)) return;
      if (STATE.activeMode === 'analytics') switchMode('cbt');
      const section = resolveSectionByRef(question.targetSectionId) || resolveSectionByRef(question.targetCitation);
      if (!section) return;
      openSectionInReader(section);
      if (step === 2) {
        lockInActiveSectionAsProof();
        showPane('question');
        document.getElementById('qCitationProofBar').scrollIntoView({block:'center'});
      } else {
        showPane('source');
        document.getElementById('btnLockCitationProof').focus();
      }
    });
    const params = new URLSearchParams(location.search);
    const oldGuide = (params.get('ref') || '').match(/^19-cfr-(\d+)-(\d+)-|^htsus-gri-(\d+)/);
    const citation = params.get('cite') || (oldGuide && (oldGuide[3] ? 'GRI ' + oldGuide[3] : oldGuide[1] + '.' + oldGuide[2]));
    if (citation) {
      const section = resolveSectionByRef(citation);
      if (section) {
        if (STATE.activeMode === 'analytics') switchMode('cbt');
        openSectionInReader(section);
        showPane('source', false);
        document.getElementById('btnLockCitationProof').focus({preventScroll:true});
      } else {
        const status = document.getElementById('studySourceNotice');
        status.hidden = false;
        status.textContent = 'This citation is outside the practice library: ' + citation;
      }
    }
  }

  async function initApp() {
    if (receipt.matches(STATE.licenseKey)) {
        try { await receipt.check(STATE.licenseKey); }
        catch (error) { document.getElementById('receiptStatus').textContent = error.message; }
      }
    const verBadge = document.getElementById('cdVersionBadge');
    if (verBadge && DATASET.meta.version) {
      verBadge.textContent = String(DATASET.meta.version).replace(/^v/i, '');
    }

    initEventListeners();
    updateScratchpadBadge();
    resetPerQuestionLookupStopwatch();
    startGlobalClocks();
    switchMode(STATE.activeMode || 'cbt');
    setupStudyNavigation();
  }

  // Expose clean controller for external QA test harnesses without polluting production UI
  if (typeof window !== 'undefined') {
    window.CodeDrillApp = {
      getDataset: () => DATASET,
      getState: () => STATE,
      setState: (newState) => {
        if (!isLocalQaEnvironment() && newState && (newState.licenseTier === 'PRO' || newState.licenseTier === 'TEAM') && !verifyCodeDrillLicenseKey(newState.licenseKey).valid) {
          return;
        }
        STATE = Object.assign(getDefaultUserState(), newState);
        saveUserState();
        refreshAllViews();
      },
      refreshAllViews,
      validateAndActivateLicenseKey,
      openAccountPaywallModal,
      openB2BTeamReadinessReport,
      generateB2BTeamReadinessData,
      switchMode
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
