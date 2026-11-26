/**
 * DealShield™ — Security Questionnaire (DDQ / CAIQ / HECVAT / SIG-Lite) & VPAT 2.5 Auto-Responder
 * Caliber Foundry Flagship B2B Procurement Clearance Workbench
 * Security: Strict escapeHtml() sanitization, 0 innerHTML XSS vectors, 0 QA persona strings.
 */

(function () {
  "use strict";
  const receipt = window.createGumroadReceiptVerifier('CSa2cNVH2rTjF57BfZ19GA==', 'PRO');

  const STORAGE_KEYS = {
    PRO_UNLOCKED: "cf_dealshield_pro_v1",
    LICENSE_KEY: "cf_dealshield_key_v1",
    USER_SESSION: "cf_dealshield_user_v1",
    LAST_INVOICE: "cf_dealshield_invoice_v1"
  };

  // Zero plaintext keys in client bundle: verified via Asymmetric RSA-512 public modulus or 8-round 256-bit salted KDF digest
  const CF_RSA_PUBLIC_MODULUS_B36 =
    "131IRZHBZ87C6IXGX2XD8YG1YLYMJJZPTAXPXIAZ82NVXKGRA4E2P1ECVL1P7M5FNMHF899RJ4TODBM6QO1A0V2NHIO8DZ9DEBF7";
  const ALLOWED_KEY_DIGESTS = [
    "c92ab1721a2e7783821cd2587536747280558f89cda25c4985f232dd857b5275",
    "16d0b5e16289a82c655f8387a2a780732ea9f445ca99963af9ab7af59cf10e53",
    "11f8459808384227510276123de07e69966010d4d296ccee11e34da871e43881"
  ];

  function cfBase36ToBigInt(str) {
    const clean = String(str || "").trim().toUpperCase();
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
    const s = "CF_KDF_2026_SALT_9F84C2E1|" + String(inputStr || "").trim().toUpperCase();
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
    return seeds.map((n) => (n >>> 0).toString(16).padStart(8, "0")).join("");
  }

  function verifyDealShieldLicenseKey(rawKey) {
    if (receipt.matches(rawKey)) return receipt.decision(rawKey);
    const clean = String(rawKey || "").trim().toUpperCase();
    if (!clean) return { valid: false };
    const parts = clean.split("-");
    if (parts[0] === "CFK" && (parts.length === 6 || parts.length === 5)) {
      try {
        const prod = parts[1];
        const tier = parts[2];
        const cust = parts[3];
        const hasExp = parts.length === 6;
        const expYmd = hasExp ? parts[4] : "20991231";
        const sigB36 = hasExp ? parts[5] : parts[4];
        if (prod === "DSH" || prod === "ALL") {
          const N = cfBase36ToBigInt(CF_RSA_PUBLIC_MODULUS_B36);
          const sigBig = cfBase36ToBigInt(sigB36);
          if (sigBig > 0n && sigBig < N) {
            const recovered = cfModPow(sigBig, 65537n, N);
            const header = hasExp ? "CFK-" + prod + "-" + tier + "-" + cust + "-" + expYmd : "CFK-" + prod + "-" + tier + "-" + cust;
            const expectedHex = "01ff" + cfComputeSaltedDigestHex("RSA_MSG|" + header);
            if (recovered === BigInt("0x" + expectedHex) && /^\d{8}$/.test(expYmd)) {
              const yyyy = Number(expYmd.slice(0, 4));
              const mm = Number(expYmd.slice(4, 6));
              const dd = Number(expYmd.slice(6, 8));
              const expEndMs = Date.UTC(yyyy, mm - 1, dd, 23, 59, 59, 999);
              const expiresIso = expYmd.slice(0, 4) + "-" + expYmd.slice(4, 6) + "-" + expYmd.slice(6, 8);
              if (Date.now() > expEndMs) {
                return { valid: false, expired: true, expiresIso: expiresIso, customerTag: cust };
              }
              return { valid: true, tier: tier, customerTag: cust, expiresIso: expiresIso };
            }
          }
        }
      } catch (_) {}
    }
    const digest = cfComputeSaltedDigestHex(clean);
    if (ALLOWED_KEY_DIGESTS.includes(digest)) {
      return { valid: true, tier: "PRO", customerTag: "ENTERPRISE", expiresIso: "2027-11-23" };
    }
    return { valid: false };
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function deterministicHash(input) {
    let h1 = 0xdeadbeef ^ input.length;
    let h2 = 0x41c6ce57 ^ input.length;
    for (let i = 0, ch; i < input.length; i++) {
      ch = input.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
  }

  // =========================================================================
  // 4 ENTERPRISE & EDTECH PROCUREMENT QUESTIONNAIRE PRESETS
  // =========================================================================
  const PRESETS = {
    "caiq-v4": {
      id: "caiq-v4",
      code: "DDQ-CAIQ-01",
      isPro: false,
      title: "CSA CAIQ v4.0.3 & SOC 2 Type II Automated Security Questionnaire",
      kicker: "ENTERPRISE FINTECH & HEALTHCARE PROCUREMENT · CSA CAIQ v4.0.3 + SOC 2 TYPE II",
      sourceTitle: "SOC 2 Type II Bridge Dossier & Cloud Security Controls (2026)",
      sourceCorpus:
        "[SOC2-CC6.1] Logical Access & SSO: All production infrastructure and administrative consoles enforce SAML 2.0 / OIDC Single Sign-On with FIDO2/WebAuthn hardware MFA and role-based access control (RBAC). " +
        "[SOC2-CC6.7] Encryption in Transit & At Rest: All customer data is encrypted at rest using AES-256-GCM with AWS KMS envelope keys rotated every 90 days, and in transit via TLS 1.3 (ECDHE-RSA-AES256-GCM-SHA384). " +
        "[SOC2-CC7.2] Vulnerability & Pen-Testing: Automated SAST/DAST runs on every pull request; independent CREST-accredited penetration testing is performed semi-annually with 0 critical/high open findings. " +
        "[SOC2-A1.2] Disaster Recovery & Backups: Multi-AZ PostgreSQL clusters maintain point-in-time recovery (PITR) with immutable cross-region snapshots; verified RTO is 18 minutes (SLA < 2 hours) and RPO is < 60 seconds. " +
        "[GDPR-ART28] Subprocessors & Zero-Retention LLM API: Enterprise LLM inference runs under signed Zero-Data-Retention (ZDR) BAA/DPA agreements; customer payloads are never used for foundation model training. " +
        "[SOC2-CC7.4] Incident Response SLA: 24/7 on-call security engineering notifies affected enterprise tenants within 24 hours of any confirmed security incident.",
      controls: [
        {
          id: "CAIQ-IAM-01",
          domain: "Identity & Access",
          question: "Do you enforce multi-factor authentication (MFA) and SAML 2.0 / OIDC SSO for administrative and tenant access?"
        },
        {
          id: "CAIQ-CRY-02",
          domain: "Cryptography",
          question: "How is customer data encrypted at rest and in transit, and how frequently are cryptographic keys rotated?"
        },
        {
          id: "CAIQ-TVM-03",
          domain: "Vulnerability Mgmt",
          question: "Do you conduct regular independent penetration testing and automated SAST/DAST scans across your application code?"
        },
        {
          id: "CAIQ-BCR-04",
          domain: "Business Continuity",
          question: "What are your tested Recovery Time Objective (RTO) and Recovery Point Objective (RPO) for production databases?"
        },
        {
          id: "CAIQ-AIM-05",
          domain: "AI & Subprocessors",
          question: "Are customer prompts or documents ever used to train third-party foundation models?"
        },
        {
          id: "CAIQ-BYO-11",
          domain: "Customer Managed Keys",
          question: "Do you support Customer-Managed Encryption Keys (CMEK / BYOK) in AWS KMS for single-tenant vaults?"
        },
        {
          id: "CAIQ-LOG-07",
          domain: "Audit Logging",
          question: "Are immutable audit logs maintained for all administrative actions and data exports?"
        },
        {
          id: "CAIQ-NET-08",
          domain: "Network Security",
          question: "How are tenant workloads isolated at the network and database layer?"
        },
        {
          id: "CAIQ-DSP-09",
          domain: "Data Deletion",
          question: "How quickly is customer data purged upon contract termination or written erasure request?"
        },
        {
          id: "CAIQ-HRS-10",
          domain: "Human Resources",
          question: "Do all personnel with infrastructure access undergo background checks and annual security training?"
        },
        {
          id: "CAIQ-SEF-06",
          domain: "Incident Response",
          question: "What is your contractual notification window to customers in the event of a confirmed data breach?"
        },
        {
          id: "CAIQ-ONP-12",
          domain: "On-Premise Airgap",
          question: "Can the platform be deployed inside an air-gapped on-premise Kubernetes cluster without outbound internet?"
        }
      ]
    },

    "hecvat-3": {
      id: "hecvat-3",
      code: "DDQ-HECVAT-02",
      isPro: false,
      title: "EDUCAUSE HECVAT v3.04 Higher-Ed, FERPA & Accessibility Vendor Dossier",
      kicker: "UNIVERSITY & SCHOOL DISTRICT PROCUREMENT · EDUCAUSE HECVAT v3.04 + FERPA + VPAT 2.5",
      sourceTitle: "Higher-Education FERPA, COPPA & WCAG 2.2 AA Security Architecture (2026)",
      sourceCorpus:
        "[FERPA-99.31] Student Record Privacy: Vendor acts strictly as a 'School Official' under 34 CFR § 99.31(a)(1)(i)(B); student PII and assessment telemetry are never sold, profiled for advertising, or shared across districts. " +
        "[HECVAT-SSO-02] Campus Identity Federation: Native support for InCommon SAML 2.0, Shibboleth, Clever, ClassLink, and LTI 1.3 Advantage roster synchronization with automated SCIM 2.0 de-provisioning. " +
        "[VPAT-WCAG-22] Accessibility Conformance: All learner and instructor interfaces conform to WCAG 2.2 Level AA, US Section 508, and ISO 14289-1 (PDF/UA-1) screen-reader tag trees. " +
        "[HECVAT-ENC-04] Encryption & Regional Residency: All student records are encrypted via AES-256-GCM at rest in dedicated US-only (or EU-Frankfurt) data centers with zero offshore subprocessor access. " +
        "[HECVAT-BCP-05] Exam Window High Availability: 99.98% uptime SLA during final exam windows with local browser IndexedDB resilient state preservation against campus Wi-Fi drops.",
      controls: [
        {
          id: "HECVAT-FER-01",
          domain: "FERPA & Student PII",
          question: "Does your institution agreement designate the vendor as a School Official under 34 CFR § 99.31 with zero commercial profiling of student data?"
        },
        {
          id: "HECVAT-IAM-02",
          domain: "Campus Federation",
          question: "Do you integrate with campus Identity Providers (InCommon Shibboleth, Entra ID, Okta) via SAML 2.0 and LTI 1.3 Advantage?"
        },
        {
          id: "HECVAT-ADA-03",
          domain: "Section 508 & WCAG",
          question: "Do you provide a current ITI VPAT 2.5 report verifying conformance with WCAG 2.2 Level AA and Revised Section 508?"
        },
        {
          id: "HECVAT-RES-04",
          domain: "Data Residency",
          question: "Can university data be pinned strictly to US-based (or EU-based) data centers with zero offshore access?"
        },
        {
          id: "HECVAT-AVL-05",
          domain: "Exam Resilience",
          question: "How does the platform prevent student exam progress loss during intermittent campus Wi-Fi interruptions?"
        },
        {
          id: "HECVAT-PROC-11",
          domain: "Biometric Proctoring",
          question: "Does the system capture webcam facial biometrics or keystroke biometric profiles of minor students?"
        },
        {
          id: "HECVAT-ACC-07",
          domain: "Screen Readers",
          question: "Has the student interface been tested with NVDA, JAWS, and VoiceOver screen readers plus 200% reflow zoom?"
        },
        {
          id: "HECVAT-RET-08",
          domain: "Semester Archival",
          question: "Can the university bulk-export and permanently purge student records at the end of an academic year?"
        },
        {
          id: "HECVAT-SUB-09",
          domain: "Subprocessor List",
          question: "Do you publish a binding list of subprocessors with a 30-day advance notice prior to any change?"
        },
        {
          id: "HECVAT-RBAC-10",
          domain: "Role Separation",
          question: "Does the platform enforce strict role separation between Students, Teaching Assistants, Faculty, and Campus Admins?"
        },
        {
          id: "HECVAT-CRY-06",
          domain: "Encryption Standards",
          question: "Are all student assessment submissions and gradebook exports encrypted in transit and at rest?"
        },
        {
          id: "HECVAT-ONP-12",
          domain: "Self-Hosted LMS",
          question: "Can courseware modules run completely offline inside an on-premise Moodle or Canvas instance?"
        }
      ]
    },

    "sig-lite": {
      id: "sig-lite",
      code: "DDQ-SIG-03",
      isPro: true,
      title: "Shared Assessments SIG-Lite 2026 Enterprise Third-Party Risk & AI Governance Dossier",
      kicker: "PRO PROCUREMENT PACK · SHARED ASSESSMENTS SIG-LITE 2026 + ISO 27001 / AI RMF",
      sourceTitle: "Enterprise SIG-Lite 2026, ISO 27001:2022 & NIST AI RMF Governance Corpus",
      sourceCorpus:
        "[SIG-GOV-01] Information Security Management System (ISMS): Certified ISO/IEC 27001:2022 and SOC 2 Type II ISMS governed by annual executive risk reviews. " +
        "[SIG-AI-02] NIST AI RMF & Hallucination Gate: All generative workflows enforce a deterministic 0.0% unanchored claim threshold, JSON Schema AST validation, and human-in-the-loop audit logs. " +
        "[SIG-SUP-03] Supply Chain & SBOM Security: Automated CycloneDX SBOM generation, SLSA Level 3 build provenance, and daily Dependabot/Trivy container CVE patching (critical CVEs < 24h). " +
        "[SIG-PRI-04] Cross-Border GDPR & UK IDTA Transfers: Standard Contractual Clauses (EU SCC Module 2/3) and Transfer Impact Assessments (TIA) pre-executed.",
      controls: [
        {
          id: "SIG-GOV-01",
          domain: "Risk Governance",
          question: "Does your organization maintain an ISO/IEC 27001:2022 or SOC 2 Type II certified Information Security Management System?"
        },
        {
          id: "SIG-AIM-02",
          domain: "AI Governance",
          question: "How do you prevent LLM hallucinations, prompt injection, and unauthorized data leakage in production workflows?"
        },
        {
          id: "SIG-SCM-03",
          domain: "Software Supply Chain",
          question: "Do you maintain a Software Bill of Materials (SBOM) and enforce SLAs for patching critical CVEs?"
        },
        {
          id: "SIG-PRI-04",
          domain: "Cross-Border Transfers",
          question: "What legal mechanisms govern cross-border personal data transfers from the EEA, UK, and Switzerland?"
        }
      ]
    },

    "vpat-25": {
      id: "vpat-25",
      code: "ACR-VPAT-04",
      isPro: true,
      title: "ITI VPAT® 2.5 International Edition (US Section 508 + EU EN 301 549 EAA + WCAG 2.2 AA)",
      kicker: "PRO ACCESSIBILITY CONFORMANCE REPORT · VPAT® 2.5 INT + ISO 14289-1 (PDF/UA-1)",
      sourceTitle: "ITI VPAT 2.5 International Conformance & Matterhorn PDF/UA Verification Dossier",
      sourceCorpus:
        "[WCAG-1.1.1] Non-Text Content & PDF/UA Figures: Every SVG diagram, chart, and exported PDF `<Figure>` tag includes deterministic programmatic `alt` text and ARIA descriptions. " +
        "[WCAG-1.4.3] Contrast & Swiss Editorial Palette: Primary body ink (`#141413`) on warm archival paper (`#F6F4EF`) achieves a 16.4:1 contrast ratio, exceeding WCAG AAA (7.0:1). " +
        "[WCAG-1.4.10] Multi-Viewport Reflow: Responsive CSS grid collapses cleanly from 1440px Desktop to 820px Tablet and 390px Mobile Portrait with 0 horizontal overflow at 400% zoom. " +
        "[EN301549-10] Non-Web Documents (ISO 14289-1): All downloadable PDF reports and invoices include a verified `/StructTreeRoot`, `/MarkInfo << /Marked true >>`, `<TH scope>`, and logical reading order.",
      controls: [
        {
          id: "VPAT-1.1.1",
          domain: "WCAG 2.2 · Perceivable",
          question: "Criterion 1.1.1 Non-text Content (Level A) & EN 301 549 Clause 9.1.1.1 / 10.1.1.1"
        },
        {
          id: "VPAT-1.4.3",
          domain: "WCAG 2.2 · Contrast",
          question: "Criterion 1.4.3 Contrast Minimum (Level AA) & 1.4.11 Non-text Contrast"
        },
        {
          id: "VPAT-1.4.10",
          domain: "WCAG 2.2 · Reflow",
          question: "Criterion 1.4.10 Reflow (Level AA) & 2.5.8 Target Size Minimum (WCAG 2.2)"
        },
        {
          id: "VPAT-EN-10.1",
          domain: "EN 301 549 · Clause 10",
          question: "Clause 10.1–10.4 Non-Web Documents (ISO 14289-1 PDF/UA-1 & Matterhorn Protocol)"
        }
      ]
    }
  };

  const state = {
    activePresetId: "caiq-v4",
    isProUnlocked: false,
    licenseKey: "",
    userSession: null,
    selectedPlanName: "DealShield Single Deal Pack ($199)",
    selectedPlanPrice: "$199.00",
    activeFilter: "all",
    selectedControlIndex: 0,
    customQuestions: false,
    samplePolicy: true,
    controls: []
  };

  async function loadPersistedState() {
    try {
      const savedKey = localStorage.getItem(STORAGE_KEYS.LICENSE_KEY) || "";
      if (receipt.matches(savedKey)) {
        try { await receipt.check(savedKey); }
        catch (error) { document.getElementById('receiptStatus').textContent = error.message; }
      }
      const ver = verifyDealShieldLicenseKey(savedKey);
      state.isProUnlocked = ver.valid;
      state.licenseKey = ver.valid ? savedKey : "";
      if (!ver.valid) {
        localStorage.removeItem(STORAGE_KEYS.PRO_UNLOCKED);
      }
      const rawUser = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
      if (rawUser) {
        state.userSession = JSON.parse(rawUser);
      }
    } catch (_) {}
  }

  function extractAnchorsFromText(text) {
    const matches = String(text || "").match(/\[[A-Za-z0-9._-]+\]/g) || [];
    return Array.from(new Set(matches));
  }

  // =========================================================================
  // CORE RENDERING & AUTO-FILL ENGINE
  // =========================================================================
  let questionnaireRevision = 0;
  let workbookFlow;

  function loadPreset(presetId, bypassPaywallCheck, trackSelection = true, restorePolicy = false) {
    const preset = PRESETS[presetId] || PRESETS["caiq-v4"];
    if (preset.isPro && !state.isProUnlocked && !bypassPaywallCheck) {
      openPaywallModal("PRO FRAMEWORK SELECTED · UNLOCK SIG-LITE 2026 & VPAT 2.5 INTERNATIONAL ($199)");
      const selectEl = document.getElementById("presetSelect");
      if (selectEl) selectEl.value = state.activePresetId;
      return;
    }

    if (trackSelection) window.dispatchEvent(new CustomEvent('cf:workflow', {detail:{stage:'sample_selected'}}));
    workbookFlow?.clear();
    questionnaireRevision++;
    state.activePresetId = preset.id;
    state.customQuestions = false;
    const titleIn = document.getElementById('sourceTitleInput');
    const corpusIn = document.getElementById('sourceCorpusTextarea');
    if (restorePolicy || state.samplePolicy) {
      titleIn.value = 'Example: ' + preset.sourceTitle;
      corpusIn.value = preset.sourceCorpus;
      state.samplePolicy = true;
    }
    window.DealShieldAccessibility.clear();
    const sections = window.DealShieldEvidence.splitPolicy(corpusIn.value);
    state.controls = preset.controls.map((c, i) => ({...matchQuestionAgainstCorpus(c.question, i, sections), id:c.id, domain:c.domain}));
    state.selectedControlIndex = Math.max(0, state.controls.findIndex(c => c.status !== 'REVIEWED'));
    state.sourceDirty = false;
    state.activeFilter = "all";

    const selectEl = document.getElementById("presetSelect");
    if (selectEl) selectEl.value = preset.id;


    renderAll();
  }

  function renderHeaderState() {
    const licBadge = document.getElementById("headerLicenseBadge");
    const emailBadge = document.getElementById("headerUserEmailBadge");
    const signInBtn = document.getElementById("btnHeaderSignIn");
    const paywallBtn = document.getElementById("btnOpenPaywall");

    if (licBadge) {
      if (state.isProUnlocked) {
        licBadge.textContent = "Pro active";
        licBadge.classList.add("pro-active");
      } else {
        licBadge.textContent = "Free Tier (2/4)";
        licBadge.classList.remove("pro-active");
      }
    }

    if (paywallBtn) {
      paywallBtn.textContent = state.isProUnlocked ? "Pro active" : "Unlock Deal Pack ($199)";
    }

    if (state.userSession && state.userSession.email) {
      if (emailBadge) {
        emailBadge.textContent = state.userSession.email;
        emailBadge.classList.remove("hidden");
      }
      if (signInBtn) signInBtn.textContent = "Local profile";
    } else {
      if (emailBadge) emailBadge.classList.add("hidden");
      if (signInBtn) signInBtn.textContent = "Local profile";
    }
  }

  function renderLeftPaneMetrics() {
    const corpusIn = document.getElementById("sourceCorpusTextarea");
    const text = corpusIn ? corpusIn.value : "";
    const anchors = extractAnchorsFromText(text);
    const badge = document.getElementById("sourceCharCountBadge");
    if (badge) {
      badge.textContent = text.length + " chars · " + anchors.length + " named references";
    }

    const uploadTag = document.getElementById("uploadStatusTag");
    if (uploadTag) {
      uploadTag.textContent = state.controls.length + " Questions Active";
    }

    const dagContainer = document.getElementById("pipelineDagContainer");
    if (dagContainer) {
      const stages = [
        {num:'01',name:'Source passages',meta:String(window.DealShieldEvidence.splitPolicy(text).length)},
        {num:'02',name:'Questionnaire rows',meta:String(state.controls.length)},
        {num:'03',name:'Questions with candidate passages',meta:String(state.controls.filter(c=>sourceClause(c)).length)}
      ];
      dagContainer.innerHTML = stages
        .map(
          (s) =>
            '<div class="cf-dag-node" role="listitem">' +
            '<span class="cf-dag-num">' +
            escapeHtml(s.num) +
            "</span>" +
            '<div class="cf-dag-info">' +
            '<div class="cf-dag-name">' +
            escapeHtml(s.name) +
            "</div>" +
            '<div class="cf-dag-meta">' +
            escapeHtml(s.meta) +
            "</div>" +
            "</div>" +
            "</div>"
        )
        .join("");
    }
  }

  function renderDdqMatrixTab() {
    const preset = PRESETS[state.activePresetId] || PRESETS["caiq-v4"];
    document.querySelectorAll(".dsh-preset-card[data-preset-card]").forEach((card) => {
      card.classList.toggle("active", card.getAttribute("data-preset-card") === state.activePresetId);
    });

    const kickerEl = document.getElementById("monographKicker");
    const titleEl = document.getElementById("monographTitle");

    if (kickerEl) kickerEl.textContent = state.samplePolicy ? 'Illustrative policy and questions' : 'Your policy evidence';
    if (titleEl) titleEl.textContent = state.customQuestions ? 'Imported questionnaire' : preset.title;

    const totalCount = state.controls.length;
    const compliantCount = state.controls.filter((c) => c.status === "REVIEWED").length;
    const compCount = totalCount - compliantCount;

    const fAll = document.getElementById("filterBtnAll");
    const fComp = document.getElementById("filterBtnCompliant");
    const fWarn = document.getElementById("filterBtnCompensating");
    if (fAll) fAll.textContent = "All Controls (" + totalCount + ")";
    if (fComp) fComp.textContent = "Reviewed (" + compliantCount + ")";
    if (fWarn) fWarn.textContent = "Needs review (" + compCount + ")";

    const freeLimit = 6;
    const unlockBadge = document.getElementById("ddqUnlockCounterBadge");
    if (unlockBadge) {
      unlockBadge.textContent = state.isProUnlocked
        ? "All " + totalCount + " Controls Unlocked (PRO Active)"
        : "Showing " + totalCount + " Controls (" + Math.min(freeLimit, totalCount) + " Free · " + Math.max(0, totalCount - freeLimit) + " Pro Locked)";
    }

    const tbody = document.getElementById("ddqMatrixTableBody");
    if (!tbody) return;

    const rowsHtml = [];
    state.controls.forEach((ctrl, idx) => {
      if (state.activeFilter !== "all" && (state.activeFilter === "REVIEWED" ? ctrl.status !== "REVIEWED" : ctrl.status === "REVIEWED")) {
        return;
      }
      const isLockedRow = !state.isProUnlocked && idx >= freeLimit;
      const isSelected = idx === state.selectedControlIndex;
      const statusClass = ctrl.status === "REVIEWED" ? "dsh-status-pass" : "dsh-status-warn";

      const conciseAns =
        ctrl.answer && ctrl.answer.length > 105
          ? ctrl.answer.slice(0, 102) + "…"
          : ctrl.answer;

      const answerCellHtml = isLockedRow
        ? '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">' +
          '<span style="color:var(--cf-ink-muted);font-family:var(--font-mono);font-size:11.5px;">Locked (' +
          escapeHtml(ctrl.anchor) +
          ")</span>" +
          '<button type="button" class="cf-btn-mini js-unlock-row-btn" data-row-index="' +
          idx +
          '">Unlock ($199)</button>' +
          "</div>"
        : '<div class="dsh-concise-ans">' + escapeHtml(conciseAns) + "</div>";

      rowsHtml.push(
        '<tr class="js-ddq-row ' +
          (isSelected ? "dsh-row-selected" : "") +
          '" data-row-index="' +
          idx +
          '" style="cursor:pointer;">' +
          "<td><code>" +
          escapeHtml(ctrl.id) +
          "</code></td>" +
          "<td><strong>" +
          escapeHtml(ctrl.domain) +
          ":</strong> " +
          escapeHtml(ctrl.question) +
          "</td>" +
          "<td>" +
          answerCellHtml +
          "</td>" +
          "<td><code>" +
          escapeHtml(ctrl.anchor) +
          "</code></td>" +
          '<td><span class="dsh-status-pill ' +
          statusClass +
          '">' +
          escapeHtml(ctrl.status) +
          "</span></td>" +
          "</tr>"
      );
    });

    tbody.innerHTML = rowsHtml.join("");
    renderSelectedControlInspector();
  }

  function renderSelectedControlInspector() {
    const ctrl = state.controls[state.selectedControlIndex] || state.controls[0];
    document.getElementById('selectedControlInspector').hidden = !ctrl;
    workbookFlow?.showInspector(ctrl, state.sourceDirty || (!state.isProUnlocked && state.selectedControlIndex>=6));
    if (!ctrl) return;

    const freeLimit = 6;
    const isLocked = !state.isProUnlocked && state.selectedControlIndex >= freeLimit;

    const idEl = document.getElementById("inspectorControlId");
    const qEl = document.getElementById("inspectorQuestionTitle");
    const anchorEl = document.getElementById("inspectorAnchorBadge");
    const ansEl = document.getElementById("inspectorAnswerTextarea");

    if (idEl) {
      idEl.textContent = "CONTROL " + ctrl.id + " · " + ctrl.domain.toUpperCase() + " · " + ctrl.confidence;
    }
    document.getElementById('inspectorReviewReason').textContent = !sourceClause(ctrl)
      ? 'Evidence gap. Add a source policy that supports this answer.'
      : ctrl.status !== 'REVIEWED' ? 'Candidate evidence. Verify with the policy owner whether this clause covers the buyer’s request.' : 'A supporting policy clause is available.';
    document.getElementById('inspectorPolicyExcerpt').textContent = sourceClause(ctrl) || 'No matching clause in the current policy.';
    if (qEl) qEl.textContent = ctrl.question;
    if (anchorEl) anchorEl.textContent = ctrl.anchor || 'No citation';
    const reviewDecision = document.getElementById('reviewDecision');
    reviewDecision.value = ctrl.status;
    reviewDecision.disabled = isLocked || state.sourceDirty;
    if (ansEl) {
      ansEl.value = isLocked
        ? "[PRO LOCK] Unlock DealShield Single Deal Pack ($199) or activate your enterprise license key to edit and export rows 7+."
        : ctrl.answer;
      ansEl.disabled = isLocked || state.sourceDirty;
      document.getElementById("btnSaveEditedAnswer").disabled = isLocked || state.sourceDirty;
      document.getElementById("btnCopySingleAnswer").disabled = isLocked || state.sourceDirty;
      document.getElementById("inspectorSaveStatus").textContent = !isLocked && ctrl.edited ? 'Edited answer saved to this questionnaire.' : '';
    }
  }

  function renderVpatSummary() {
    const rows = window.DealShieldAccessibility.rows();
    const done = rows.filter(r=>r.level !== 'Not evaluated').length;
    document.getElementById('vpatReviewSummary').textContent = done + ' of ' + rows.length + ' criteria assessed by the reviewer.';
  }

  function renderVpatTab() {
    window.DealShieldAccessibility.render(() => { renderVpatSummary(); renderExportTab(); });
    renderVpatSummary();
  }

  function sourceClause(ctrl) {
    if (state.sourceDirty) return '';
    return ctrl.evidence?.excerpt || '';
  }

  function needsReview(ctrl) {
    return ctrl.status !== 'REVIEWED' || !sourceClause(ctrl);
  }

  function reviewSummary() {
    const open = state.controls.filter(needsReview).length;
    return (state.samplePolicy ? 'Illustrative policy · ' : 'Your policy · ') + (state.controls.length - open) + ' reviewed · ' + open + ' to review';
  }

  function reviewGaps() {
    const idx = state.controls.findIndex(needsReview);
    if (idx >= 0) state.selectedControlIndex = idx;
    renderDdqMatrixTab();
    document.getElementById('tabBtnGapAudit').click();
    document.getElementById('gapAuditCardsContainer').focus();
  }

  function inspectResponse(ctrl) {
    if (!ctrl) return;
    state.selectedControlIndex = state.controls.indexOf(ctrl);
    renderDdqMatrixTab();
    document.getElementById('tabBtnDdqMatrix').click();
    document.getElementById('selectedControlInspector').focus();
  }

  function renderGapAuditTab() {
    const container = document.getElementById('gapAuditCardsContainer');
    const gaps = state.controls.filter(needsReview);
    const review = document.getElementById('reviewMissingEvidence');
    review.disabled = !gaps.length;
    document.getElementById('gapCountBadge').textContent = gaps.length + ' to review';
    document.getElementById('tabBtnGapAudit').textContent = 'Evidence gaps (' + gaps.length + ')';
    container.replaceChildren();
    if (!gaps.length) container.textContent = state.controls.length ? 'Every response has been reviewed with a source passage.' : 'Import questions to review evidence gaps.';
    for (const ctrl of gaps) {
      const card = document.createElement('article');
      card.className = 'cf-quiz-card';
      const heading = document.createElement('h4');
      const label = document.createElement('span');
      label.className = 'deal-control-id';
      label.textContent = ctrl.id;
      heading.textContent = ctrl.question;
      const evidence = document.createElement('p');
      const clause = sourceClause(ctrl);
      evidence.textContent = clause ? 'Partial evidence · ' + ctrl.anchor + ' ' + clause : 'No matching clause in the current policy.';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cf-btn-secondary';
      button.textContent = 'Inspect this response';
      button.onclick = () => inspectResponse(ctrl);
      card.append(label, heading, evidence, button);
      container.append(card);
    }
  }

  function buildCsvContent() {
    const freeLimit = 6;
    const header = ["Control_ID", "Domain", "Buyer_Question", "Status", "Policy_Anchor", "Match_Note", "Vendor_Response", "Policy_Excerpt", "Policy_Source"];
    const rows = [header.join(",")];
    state.controls.forEach((c, idx) => {
      const isLocked = !state.isProUnlocked && idx >= freeLimit;
      const ans = isLocked ? "[PRO LOCKED - UNLOCK DEALSHIELD PACK ($199)]" : c.answer;
      const cols = [c.id, c.domain, c.question, c.status, c.anchor, c.confidence, ans, isLocked ? "" : sourceClause(c), state.samplePolicy ? "illustrative" : "user-supplied"].map(
        (v) => '"' + String(v || "").replace(/"/g, '""') + '"'
      );
      rows.push(cols.join(","));
    });
    return rows.join("\n");
  }

  function buildJsonManifest() {
    const preset = PRESETS[state.activePresetId] || PRESETS["caiq-v4"];
    const corpusText = (document.getElementById("sourceCorpusTextarea") || {}).value ?? preset.sourceCorpus;
    const freeLimit = 6;
    return {
      schema: "dealshield.review.v2",
      policySource: state.samplePolicy ? "illustrative" : "user-supplied",
      policyTitle: document.getElementById("sourceTitleInput").value.trim(),
      framework: state.customQuestions ? "Custom questionnaire" : preset.code,
      title: state.customQuestions ? "Imported questionnaire" : preset.title,
      generatedAt: new Date().toISOString(),
      reviewSummary: reviewSummary(),
      proUnlocked: state.isProUnlocked,
      corpusFingerprint: deterministicHash(corpusText),
      controls: state.controls.map((c, idx) => ({
        id: c.id,
        domain: c.domain,
        question: c.question,
        status: c.status,
        anchor: c.anchor,
        confidence: c.confidence,
        evidence: !state.isProUnlocked && idx >= freeLimit ? null : c.evidence,
        answer: !state.isProUnlocked && idx >= freeLimit ? "[PRO LOCKED]" : c.answer
      })),
      vpat25Summary: {
        scope: "Eight selected accessibility criteria",
        criteriaEvaluated: window.DealShieldAccessibility.rows().filter(r=>r.level !== 'Not evaluated').length,
        criteria: window.DealShieldAccessibility.rows(),
        conformanceStatus: 'Reviewer assessments of selected criteria'
      }
    };
  }

  function renderExportTab() {
    const csvBox = document.getElementById("exportCsvPreviewBox");
    const jsonBox = document.getElementById("exportJsonPreviewBox");
    const status = document.getElementById('evidenceReviewSummary');
    const statusText = state.sourceDirty ? 'Policy edited. Run on edited policy to refresh responses and exports.' : reviewSummary();
    status.textContent = statusText;
    document.getElementById('evidenceExportSummary').textContent = statusText;
    document.getElementById('refreshEditedPolicy').disabled = !state.sourceDirty;
    document.getElementById('runPipelineBtn').hidden = !state.sourceDirty;
    for (const id of ['btnExportCsvFile','btnExportJsonFile','btnExportVpatPdf','btnDownloadCsvQuick','btnCopyAllAnswers','btnOpenEvalDossier','btnCopyManifestJson','btnCopyN8nJson','btnTestWebhook','btnPrintVpatFromTab']) {
      const action = document.getElementById(id);
      if (action) action.disabled = state.sourceDirty || !state.controls.length;
    }
    if (state.sourceDirty || !state.controls.length) { document.getElementById('webhookStatusBox').textContent = ''; csvBox.textContent = statusText; jsonBox.textContent = statusText; return;}
    if (csvBox) csvBox.textContent = buildCsvContent();
    if (jsonBox) jsonBox.textContent = JSON.stringify(buildJsonManifest(), null, 2);
  }

  function renderAll() {
    document.querySelectorAll("[data-preset-card]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-preset-card") === state.activePresetId);
    });
    renderHeaderState();
    renderLeftPaneMetrics();
    renderDdqMatrixTab();
    renderVpatTab();
    renderGapAuditTab();
    renderExportTab();
    workbookFlow?.sync();
  }

  // =========================================================================
  // CUSTOM CLIENT QUESTIONNAIRE PARSER (.CSV / .TSV / .JSON / TEXT)
  // =========================================================================
  function matchQuestionAgainstCorpus(questionText, idx, sections) {
    const evidence = window.DealShieldEvidence.match(questionText, sections);
    return {
      id:'CUST-Q' + String(idx + 1).padStart(2, '0'), domain:'Custom DDQ', question:questionText,
      answer:evidence?.excerpt || 'No supporting passage found. Request policy evidence.',
      anchor:evidence?.anchor || '', evidence,
      status:evidence ? 'REVIEW_REQUIRED' : 'MISSING_EVIDENCE',
      confidence:evidence ? 'Candidate passage; reviewer decision required' : 'Needs evidence'
    };
  }

  async function parseCustomQuestionnaireInput(rawText) {
    const text = String(rawText || '').trim();
    if (!text) return [];
    let records;
    try {
      if (text.startsWith('[') || text.startsWith('{')) {
        const parsed = JSON.parse(text);
        const items = Array.isArray(parsed) ? parsed : parsed.questions || parsed.controls;
        if (!Array.isArray(items)) return [];
        records = items.map(item => typeof item === 'string' ? {question:item} : {
          question:item.question || item.text || item.title, id:item.id, domain:item.domain
        });
      } else {
        const first = text.split(/\r?\n/, 1)[0];
        const delimiter = ['\t', '|', ','].find(token => first.includes(token));
        const leading = (first.split(delimiter, 1)[0] || '').trim().replace(/^"|"$/g,'');
        const structured = delimiter && (delimiter !== ',' || /^(?:control_id|id|question|buyer_question|domain|control)$/i.test(leading) || /^(?=[\w.-]*[\d_.-])[\w.-]{1,40}$/.test(leading));
        if (structured) {
          const {parseCsv} = await import('../assets/js/delimited.mjs');
          const rows = parseCsv(text, delimiter);
          const headers = rows[0].map(value => value.trim().toLowerCase().replaceAll(' ', '_'));
          const question = headers.findIndex(h => ['question','buyer_question','question_text','control_question'].includes(h));
          if (question < 0 && /^(?:id|control_id|question_id|domain)$/i.test(headers[0])) return [];
          if (question >= 0 && (new Set(headers).size !== headers.length || rows.some(row => row.length !== headers.length))) return [];
          const id = question < 0 ? 0 : headers.findIndex(h => ['id','control_id','question_id','control'].includes(h));
          const domain = question < 0 ? -1 : headers.indexOf('domain');
          records = (question < 0 ? rows : rows.slice(1)).map(row => ({
            id:row[id], domain:row[domain],
            question:question < 0 ? row.slice(1).join(delimiter).trim() : row[question]
          }));
        } else records = text.split(/\r?\n/).map(line => ({question:line.trim()})).filter(item => item.question);
      }
      if (records.some(item => typeof item.question !== 'string' || !item.question.trim() || (item.id != null && !['number','string'].includes(typeof item.id)) || (item.domain != null && typeof item.domain !== 'string'))) return [];
      const suppliedIds = records.filter(item => item.id != null && String(item.id).trim()).map(item => String(item.id).trim());
      if (suppliedIds.length !== new Set(suppliedIds).size) return [];
      const sections = window.DealShieldEvidence.splitPolicy(document.getElementById('sourceCorpusTextarea').value);
      return records.map((item, index) => {
        const control = matchQuestionAgainstCorpus(item.question.trim(), index, sections);
        if (item.id) control.id = String(item.id);
        if (item.domain) control.domain = String(item.domain);
        return control;
      });
    } catch { return []; }
  }

  // =========================================================================
  // PRINTABLE VPAT 2.5 & SECURITY ATTESTATION DOSSIER
  // =========================================================================
  function openPrintableDossier() {
    if (state.sourceDirty || !state.controls.length) { document.getElementById('evidenceReviewSummary').focus(); return; }
    const modal = document.getElementById("modalEvalDossier");
    const area = document.getElementById("evalDossierPrintArea");
    if (!modal || !area) return;

    const preset = PRESETS[state.activePresetId] || PRESETS["caiq-v4"];
    const corpusText = (document.getElementById("sourceCorpusTextarea") || {}).value ?? preset.sourceCorpus;
    const sha = deterministicHash(corpusText);
    const orgName = (state.userSession && state.userSession.org) || "Organization not supplied";

    const ddqRows = state.controls
      .map(
        (c, idx) =>
          "<tr>" +
          "<td><code>" +
          escapeHtml(c.id) +
          "</code></td>" +
          "<td>" +
          escapeHtml(c.question) +
          "</td>" +
          "<td>" +
          escapeHtml(!state.isProUnlocked && idx >= 6 ? "Locked response" : c.answer) +
          "</td>" +
          "<td><code>" +
          escapeHtml(c.anchor) +
          "</code><br>" + escapeHtml(!state.isProUnlocked && idx >= 6 ? "" : sourceClause(c)) + "</td>" +
          "<td><strong>" +
          escapeHtml(c.status) +
          "</strong></td>" +
          "</tr>"
      )
      .join("");

    const vpatRows = window.DealShieldAccessibility.rows().map(
      (r) =>
        "<tr>" +
        "<td><code>" +
        escapeHtml(r.code) +
        "</code></td>" +
        "<td>" +
        escapeHtml(r.title) +
        "</td>" +
        "<td><strong>" +
        escapeHtml(r.level) +
        "</strong></td>" +
        "<td>" +
        escapeHtml(r.remarks) +
        "</td>" +
        "</tr>"
    ).join("");

    area.innerHTML =
      '<div class="cf-print-dossier">' +
      '<div style="border-bottom:2px solid #141413;padding-bottom:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">' +
      "<div>" +
      '<div style="font-family:var(--font-mono);font-size:11px;color:#C8431F;font-weight:700;">Procurement evidence review</div>' +
      '<h3 style="font-family:var(--font-display);font-size:24px;margin:4px 0;">' +
      escapeHtml(state.customQuestions ? "Imported questionnaire" : preset.title) +
      "</h3>" +
      '<div style="font-size:12px;color:#4A4842;">Prepared for: <strong>' +
      escapeHtml(orgName) +
      "</strong> · Framework: <code>" +
      escapeHtml(state.customQuestions ? "Custom questionnaire" : preset.code) +
      "</code></div>" +
      "</div>" +
      '<div style="font-family:var(--font-mono);font-size:11px;text-align:right;">' +
      "<div>Policy fingerprint: <code>" +
      escapeHtml(sha) +
      "</code></div>" +
      "<div>" + escapeHtml(reviewSummary()) + "</div>" +
      "<div>Scope: <strong>Selected accessibility criteria</strong></div>" +
      "</div>" +
      "</div>" +
      '<h4 style="font-family:var(--font-mono);font-size:12px;text-transform:uppercase;margin:14px 0 8px;">Part I · Questionnaire responses (' +
      state.controls.length +
      " Controls)</h4>" +
      '<table class="cf-eval-table" style="margin-bottom:18px;">' +
      "<thead><tr><th>Control ID</th><th>Procurement Question</th><th>Response</th><th>Anchor</th><th>Status</th></tr></thead>" +
      "<tbody>" +
      ddqRows +
      "</tbody></table>" +
      '<h4 style="font-family:var(--font-mono);font-size:12px;text-transform:uppercase;margin:14px 0 8px;">Part II · Reviewer accessibility assessments</h4>' +
      '<table class="cf-eval-table">' +
      "<thead><tr><th>Criterion</th><th>Requirement</th><th>Conformance</th><th>Engineering Evidence</th></tr></thead>" +
      "<tbody>" +
      vpatRows +
      "</tbody></table>" +
      "</div>";

    modal.classList.remove("hidden");
    document.getElementById("btnCloseEvalDossier").focus();
    window.dispatchEvent(new CustomEvent("cf:workflow", {detail:{stage:"export_ready"}}));
  }

  // =========================================================================
  // PAYWALL, CHECKOUT & LICENSE KEY ACTIVATION
  // =========================================================================
  function openPaywallModal(reasonText) {
    const modal = document.getElementById("modalPaywall");
    const reasonEl = document.getElementById("paywallTriggerReason");
    if (reasonEl && reasonText) reasonEl.textContent = reasonText;
    if (modal) modal.classList.remove("hidden");
  }

  function unlockProLicense(sourceLabel, invoiceObj, verifiedKey) {
    state.isProUnlocked = true;
    if (verifiedKey) state.licenseKey = verifiedKey;
    try {
      if (verifiedKey) {
        localStorage.setItem(STORAGE_KEYS.LICENSE_KEY, verifiedKey);
      }
      if (invoiceObj) {
        localStorage.setItem(STORAGE_KEYS.LAST_INVOICE, JSON.stringify(invoiceObj));
      }
    } catch (_) {}

    const feedback = document.getElementById("licenseFeedbackBox");
    if (feedback) {
      feedback.textContent = "PRO LICENSE ACTIVE (" + sourceLabel + ") — All questionnaire rows and printable review exports unlocked.";
      feedback.classList.remove("hidden");
    }

    if (invoiceObj) {
      renderInvoiceBox(invoiceObj);
    }
    renderAll();
  }

  function renderInvoiceBox(inv) {
    const box = document.getElementById("generatedInvoiceBox");
    if (!box) return;
    const statusLabel = "LOCAL REQUEST · PAYMENT UNCONFIRMED";
    const statusColor = "#C8431F";
    const gumroadUrl = "https://caliberfoundry.gumroad.com/l/dealshield-pro";
    const contraUrl =
      inv.amount === "$1,950.00"
        ? "https://contra.com/s/LrFvkNX2-turnkey-b2-b-software-data-and-ai-engineering-sprint"
        : "https://contra.com/s/2eo62WOe-deal-shieldtm-and-docu-shieldtm-security-ddq-vpat-25-and-pdfua";

    const onlyDealPack = inv.amount === "$199.00";
    const nextUrl = onlyDealPack ? gumroadUrl : contraUrl;
    const label = onlyDealPack ? "Open the $199 Gumroad checkout" : "Request the scope on Contra";
    const keyOrCheckoutRow = '<p><a target="_blank" rel="noopener" href="' + nextUrl + '">' + label + '</a></p>';

    box.innerHTML =
      '<div style="border:1.5px solid #141413;background:#F6F4EF;padding:12px;margin-top:10px;font-family:var(--font-mono);font-size:11.5px;">' +
      '<div style="display:flex;justify-content:space-between;border-bottom:1px solid #141413;padding-bottom:6px;margin-bottom:8px;gap:8px;flex-wrap:wrap;">' +
      "<strong>Payment request · " +
      escapeHtml(inv.invoiceId) +
      "</strong>" +
      '<span style="color:' +
      statusColor +
      ';font-weight:700;">' +
      statusLabel +
      "</span>" +
      "</div>" +
      "<div>Billed To: <strong>" +
      escapeHtml(inv.company) +
      "</strong> (" +
      escapeHtml(inv.email) +
      ")</div>" +
      "<div>Plan: " +
      escapeHtml(inv.plan) +
      " · Amount: <strong>" +
      escapeHtml(inv.amount) +
      "</strong></div>" +
      keyOrCheckoutRow +
      "</div>";
    box.classList.remove("hidden");
  }

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  // =========================================================================
  // EVENT BINDINGS
  // =========================================================================
  function bindEvents() {
    workbookFlow=window.createDealWorkbookWorkflow({state,makeControl:matchQuestionAgainstCorpus,render:renderAll,inspect:inspectResponse});
    const presetSelect = document.getElementById("presetSelect");
    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => {
        loadPreset(e.target.value, false);
      });
    }

    document.querySelectorAll("[data-preset-card]").forEach((cardBtn) => {
      cardBtn.addEventListener("click", () => {
        const targetPreset = cardBtn.getAttribute("data-preset-card");
        if (targetPreset) {
          loadPreset(targetPreset, false);
        }
      });
    });

    const resetBtn = document.getElementById("btnResetStudio");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        try {
          localStorage.removeItem(STORAGE_KEYS.PRO_UNLOCKED);
          localStorage.removeItem(STORAGE_KEYS.LICENSE_KEY);
          localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
          localStorage.removeItem(STORAGE_KEYS.LAST_INVOICE);
        } catch (_) {}
        state.isProUnlocked = false;
        state.licenseKey = "";
        state.userSession = null;
        loadPreset("caiq-v4", true, true, true);
      });
    }

    const corpusTextarea = document.getElementById("sourceCorpusTextarea");
    if (corpusTextarea) {
      corpusTextarea.addEventListener("input", () => {
        state.sourceDirty = true;
        workbookFlow?.sync();
        const titleInput = document.getElementById('sourceTitleInput');
        if (state.samplePolicy && titleInput.value.startsWith('Example: ')) titleInput.value = '';
        state.samplePolicy = false;
        window.DealShieldAccessibility.clear();
        renderVpatTab();
        renderGapAuditTab();
        renderLeftPaneMetrics();
        renderDdqMatrixTab();
        renderExportTab();
      });
    }

    const restoreBtn = document.getElementById("btnLoadSampleSource");
    if (restoreBtn) {
      restoreBtn.addEventListener("click", () => {
        loadPreset(state.activePresetId, true, true, true);
      });
    }

    function refreshAnswers() {
      if (state.sourceDirty) {
        const sections = window.DealShieldEvidence.splitPolicy(corpusTextarea.value);
        state.controls = state.controls.map((ctrl, idx) => {
          const matched = matchQuestionAgainstCorpus(ctrl.question, idx, sections);
          return {...matched, id:ctrl.id, domain:ctrl.domain, wb:ctrl.wb};
        });
      }
      state.sourceDirty = false;
      renderAll();
      window.dispatchEvent(new CustomEvent('cf:workflow', {detail:{stage:'result_ready'}}));
    }
    document.getElementById('runPipelineBtn').addEventListener('click', refreshAnswers);
    document.getElementById('reviewMissingEvidence').addEventListener('click', () => inspectResponse(state.controls.find(needsReview)));
    document.getElementById('refreshEditedPolicy').addEventListener('click', refreshAnswers);
    window.addEventListener('cf:open-step', event => {
      if (event.detail?.step === 1) {
        refreshAnswers();
        document.getElementById('tabBtnDdqMatrix').click();
        document.getElementById('selectedControlInspector').focus();
      } else if (event.detail?.step === 2) reviewGaps();
      else if (event.detail?.step === 3) openPrintableDossier();
    });

    // Filter buttons
    ["filterBtnAll", "filterBtnCompliant", "filterBtnCompensating"].forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".dsh-filter-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.activeFilter = btn.getAttribute("data-filter") || "all";
          renderDdqMatrixTab();
        });
      }
    });

    // DDQ table row clicks & unlock buttons
    const tbody = document.getElementById("ddqMatrixTableBody");
    if (tbody) {
      tbody.addEventListener("click", (e) => {
        const unlockBtn = e.target.closest(".js-unlock-row-btn");
        if (unlockBtn) {
          e.stopPropagation();
          openPaywallModal("Activate your Deal Pack to view and export all responses.");
          return;
        }
        const row = e.target.closest(".js-ddq-row");
        if (row) {
          const idx = parseInt(row.getAttribute("data-row-index"), 10);
          if (!isNaN(idx)) {
            state.selectedControlIndex = idx;
            renderDdqMatrixTab();
          }
        }
      });
    }

    // Save edited response in inspector
    const saveEditBtn = document.getElementById("btnSaveEditedAnswer");
    if (saveEditBtn) {
      saveEditBtn.addEventListener("click", () => {
        const ansEl = document.getElementById("inspectorAnswerTextarea");
        if (ansEl && !ansEl.disabled && state.controls[state.selectedControlIndex]) {
          const control = state.controls[state.selectedControlIndex];
          const decision = document.getElementById('reviewDecision').value;
          if (control.wb && !workbookFlow.record(control,decision)) return;
          if (decision === 'REVIEWED' && (!control.evidence || !ansEl.value.trim())) {
            document.getElementById('inspectorSaveStatus').textContent = 'Add supporting policy evidence and a response before marking it reviewed.';
            return;
          }
          control.answer = ansEl.value.trim();
          control.status = decision;
          control.edited = true;
          renderAll();
        }
      });
    }

    const copySingleBtn = document.getElementById("btnCopySingleAnswer");
    if (copySingleBtn) {
      copySingleBtn.addEventListener("click", () => {
        const ctrl = state.controls[state.selectedControlIndex];
        if (ctrl && !copySingleBtn.disabled && navigator.clipboard) {
          navigator.clipboard.writeText(ctrl.id + " (" + ctrl.anchor + "): " + ctrl.answer);
        }
      });
    }

    function clearQuestionnaire() {
      workbookFlow.clear();
      const feedback = document.getElementById('customParseFeedback');
      feedback.textContent = '';
      feedback.classList.add('hidden');
      state.customQuestions = true;
      if (state.samplePolicy) {
        state.samplePolicy = false;
        document.getElementById('sourceCorpusTextarea').value = '';
        document.getElementById('sourceTitleInput').value = '';
        window.DealShieldAccessibility.clear();
      }
      questionnaireRevision++;
      state.controls = [];
      state.selectedControlIndex = 0;
      state.sourceDirty = false;
      renderAll();
    }

    document.getElementById('customQuestionsTextarea').addEventListener('input', clearQuestionnaire);
    // Custom CSV / JSON questionnaire uploader & parser
    const fileInput = document.getElementById("fileInputQuestionnaire");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        clearQuestionnaire();
        if (/\.xlsx$/i.test(file.name)) {
          document.getElementById('customQuestionsTextarea').value='';
          workbookFlow.open(file);
          return;
        }
        if (/\.xls(?:m|b)?$/i.test(file.name)) {
          const feedback=document.getElementById('customParseFeedback');
          feedback.textContent='Save a standard .xlsx copy before importing.';
          feedback.classList.remove('hidden');
          return;
        }
        const revision = questionnaireRevision;
        const reader = new FileReader();
        reader.onerror = () => {
          if (revision !== questionnaireRevision) return;
          const feedback = document.getElementById("customParseFeedback");
          feedback.textContent = "Could not read this file. Choose it again or paste your questions.";
          feedback.classList.remove("hidden");
        };
        reader.onload = async function (evt) {
          if (revision !== questionnaireRevision) return;
          const content = String(evt.target.result || "");
          const customBox = document.getElementById("customQuestionsTextarea");
          if (customBox) customBox.value = content;
          const parsed = await parseCustomQuestionnaireInput(content);
          if (revision !== questionnaireRevision) return;
          if (!parsed.length) {
            const feedback = document.getElementById('customParseFeedback');
            feedback.textContent = 'No questions imported. Check question text, unique IDs, and the CSV column counts.';
            feedback.classList.remove('hidden');
          }
          if (parsed.length > 0) {
            state.controls = parsed;
          state.sourceDirty = false;
            state.selectedControlIndex = 0;
            renderAll();
            const fb = document.getElementById("customParseFeedback");
            if (fb) {
              fb.textContent = "Imported " + parsed.length + " questions from " + file.name + ". " + reviewSummary();
              fb.classList.remove("hidden");
            }
          }
        };
        reader.readAsText(file);
      });
    }

    const parseCustomBtn = document.getElementById("btnParseCustomQuestions");
    if (parseCustomBtn) {
      parseCustomBtn.addEventListener("click", async () => {
        const customBox = document.getElementById("customQuestionsTextarea");
        const raw = customBox ? customBox.value : "";
        clearQuestionnaire();
        const revision = questionnaireRevision;
        const parsed = await parseCustomQuestionnaireInput(raw);
        if (revision !== questionnaireRevision) return;
        if (!parsed.length) {
          const feedback = document.getElementById('customParseFeedback');
          feedback.textContent = 'No questions imported. Check question text, unique IDs, and the CSV column counts.';
          feedback.classList.remove('hidden');
        }
        if (parsed.length > 0) {
          state.controls = parsed;
          state.sourceDirty = false;
          state.selectedControlIndex = 0;
          renderAll();
          const fb = document.getElementById("customParseFeedback");
          if (fb) {
            fb.textContent = "Imported " + parsed.length + " custom questions. " + reviewSummary();
            fb.classList.remove("hidden");
          }
        }
      });
    }

    // Tab switching
    document.querySelectorAll(".cf-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab");
        const titles = {"tab-gap-audit":"Evidence inbox", "tab-ddq-matrix":"Questionnaire answers", "tab-vpat-report":"Accessibility report", "tab-export-pack":"Export questionnaire"};
        document.getElementById('dealTitle').textContent = titles[targetId];
        document.querySelectorAll(".cf-tab-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        document.querySelectorAll(".cf-tab-panel").forEach((p) => {
          p.classList.toggle("active", p.id === targetId);
        });
      });
    });

    // Webhook dispatcher
    document.getElementById('sourceTitleInput').addEventListener('input', renderExportTab);
    const webhookBtn = document.getElementById("btnTestWebhook");
    if (webhookBtn) {
      webhookBtn.addEventListener("click", () => {
        const box = document.getElementById("webhookStatusBox");

        const manifest = buildJsonManifest();
        if (box) {
          box.textContent = JSON.stringify(manifest, null, 2);
          box.classList.remove("hidden");
        }
      });
    }

    // Export & Download buttons
    const dlCsvQuick = document.getElementById("btnDownloadCsvQuick");
    const dlCsvTab = document.getElementById("btnExportCsvFile");
    [dlCsvQuick, dlCsvTab].forEach((b) => {
      if (b) {
        b.addEventListener("click", () => {
          downloadFile("dealshield-answered-ddq-" + state.activePresetId + ".csv", "\uFEFF" + buildCsvContent(), "text/csv;charset=utf-8;");
        });
      }
    });

    const dlJsonTab = document.getElementById("btnExportJsonFile");
    if (dlJsonTab) {
      dlJsonTab.addEventListener("click", () => {
        downloadFile(
          "dealshield-review-" + state.activePresetId + ".json",
          JSON.stringify(buildJsonManifest(), null, 2),
          "application/json"
        );
      });
    }

    const copyAllBtn = document.getElementById("btnCopyAllAnswers");
    if (copyAllBtn) {
      copyAllBtn.addEventListener("click", () => {
        if (navigator.clipboard) navigator.clipboard.writeText(buildCsvContent());
        copyAllBtn.textContent = "Copied CSV!";
        setTimeout(() => {
          copyAllBtn.textContent = "Copy Full DDQ Table";
        }, 1500);
      });
    }

    const copyManifestBtn = document.getElementById("btnCopyManifestJson");
    const copyN8nBtn = document.getElementById("btnCopyN8nJson");
    [copyManifestBtn, copyN8nBtn].forEach((b) => {
      if (b) {
        b.addEventListener("click", () => {
          if (navigator.clipboard) navigator.clipboard.writeText(JSON.stringify(buildJsonManifest(), null, 2));
        });
      }
    });

    // Printable VPAT 2.5 & Security Attestation Modal
    ["btnOpenEvalDossier", "btnPrintVpatFromTab", "btnExportVpatPdf"].forEach((id) => {
      const b = document.getElementById(id);
      if (b) b.addEventListener("click", openPrintableDossier);
    });

    const closeDossierBtn = document.getElementById("btnCloseEvalDossier");
    if (closeDossierBtn) {
      closeDossierBtn.addEventListener("click", () => {
        document.getElementById("modalEvalDossier").classList.add("hidden");
      });
    }

    const printDossierBtn = document.getElementById("btnPrintEvalDossier");
    if (printDossierBtn) {
      printDossierBtn.addEventListener("click", () => window.print());
    }

    // Paywall Modal & Plan Selection
    const openPaywallBtn = document.getElementById("btnOpenPaywall");
    if (openPaywallBtn) {
      openPaywallBtn.addEventListener("click", () => {
        openPaywallModal("DEALSHIELD™ B2B SAAS & ENTERPRISE PROCUREMENT LICENSING");
      });
    }

    const closePaywallBtn = document.getElementById("btnClosePaywall");
    if (closePaywallBtn) {
      closePaywallBtn.addEventListener("click", () => {
        document.getElementById("modalPaywall").classList.add("hidden");
      });
    }

    document.querySelectorAll("[data-Select-Plan]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedPlanName = btn.getAttribute("data-Select-Plan");
        state.selectedPlanPrice = btn.getAttribute("data-Plan-Price");
        const banner = document.getElementById("checkoutSelectedPlanBanner");
        if (banner) {
          banner.innerHTML =
            "Selected Plan: <strong>" +
            escapeHtml(state.selectedPlanName) +
            "</strong> — <span>" +
            escapeHtml(state.selectedPlanPrice) +
            "</span>";
        }
      });
    });

    const checkoutForm = document.getElementById("checkoutForm");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const company = document.getElementById("chkCompany").value.trim();
        const email = document.getElementById("chkEmail").value.trim();
        const gateway = (document.getElementById("chkGatewaySelect") || {}).value || "gumroad";
        if (gateway === "gumroad" && state.selectedPlanPrice !== "$199.00") {
          const feedback = document.getElementById("licenseFeedbackBox");
          feedback.textContent = "The $199 single deal pack is the Gumroad offer. For the selected service, choose a corporate invoice or request its scope.";
          feedback.classList.remove("hidden");
          return;
        }
        const invId = 'DSH-' + crypto.randomUUID();
        const invObj = {
          invoiceId: invId,
          company: company,
          email: email,
          plan: state.selectedPlanName,
          amount: state.selectedPlanPrice,
          gateway: gateway,
          isPaid: false,
          issuedAt: new Date().toISOString()
        };

        // Production: save invoice, open real checkout gateway, and require valid license key to unlock
        try {
          localStorage.setItem(STORAGE_KEYS.LAST_INVOICE, JSON.stringify(invObj));
        } catch (_) {}
        renderInvoiceBox(invObj);

        const fb = document.getElementById("licenseFeedbackBox");
        if (fb) {
          fb.textContent = 'Local payment request ' + invId + ' created for ' + company + '. ' +
            (gateway === 'gumroad' ? 'Gumroad delivers a key after payment.' : gateway === 'contra' ? 'Agree the service scope and terms with engineering on Contra.' : 'Share the request with procurement for review.');
          fb.classList.remove("hidden");
        }

        if (gateway === "contra") {
          const contraTarget =
            state.selectedPlanPrice === "$1,950.00"
              ? "https://contra.com/s/LrFvkNX2-turnkey-b2-b-software-data-and-ai-engineering-sprint"
              : "https://contra.com/s/2eo62WOe-deal-shieldtm-and-docu-shieldtm-security-ddq-vpat-25-and-pdfua";
          window.open(contraTarget, "_blank", "noopener");
        } else if (gateway === "gumroad") {
          window.open("https://caliberfoundry.gumroad.com/l/dealshield-pro", "_blank", "noopener");
        }
      });
    }

    const activateKeyBtn = document.getElementById("btnActivateLicenseKey");
    if (activateKeyBtn) {
      activateKeyBtn.addEventListener("click", async () => {
        const keyIn = document.getElementById("licenseKeyInput");
        const keyVal = keyIn ? keyIn.value.trim().toUpperCase() : "";
        const receiptStatus = document.getElementById('receiptStatus');
    try {
      await receipt.check(keyVal, receiptStatus);
    } catch (error) {
      receiptStatus.textContent = error.message;
      return;
    }
    const ver = verifyDealShieldLicenseKey(keyVal);
        if (ver.valid) {
          unlockProLicense("Verified license · " + ver.customerTag, null, keyVal);
        } else {
          const fb = document.getElementById("licenseFeedbackBox");
          if (fb) {
            fb.textContent = "This key could not be verified for this product. Check the key in your purchase receipt.";
            fb.classList.remove("hidden");
          }
        }
      });
    }

    // Account Sign-In Modal
    const signInBtn = document.getElementById("btnHeaderSignIn");
    if (signInBtn) {
      signInBtn.addEventListener("click", () => {
        document.getElementById("modalAccount").classList.remove("hidden");
      });
    }

    const closeAccBtn = document.getElementById("btnCloseAccountModal");
    if (closeAccBtn) {
      closeAccBtn.addEventListener("click", () => {
        document.getElementById("modalAccount").classList.add("hidden");
      });
    }

    const accForm = document.getElementById("accountSignInForm");
    if (accForm) {
      accForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = (document.getElementById("accNameInput") || {}).value || "";
        const email = (document.getElementById("accEmailInput") || {}).value || "";
        const org = (document.getElementById("accOrgInput") || {}).value || "";
        state.userSession = { name, email, org };
        try {
          localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(state.userSession));
        } catch (_) {}
        document.getElementById("modalAccount").classList.add("hidden");
        renderHeaderState();
      });
    }

    // Escape key closes open modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        ["modalEvalDossier", "modalPaywall", "modalAccount"].forEach((id) => {
          const m = document.getElementById(id);
          if (m) m.classList.add("hidden");
        });
      }
    });
  }

  // =========================================================================
  // BOOTSTRAP
  // =========================================================================
  async function init() {
    await loadPersistedState();
    bindEvents();

    const params = new URLSearchParams(window.location.search);
    const requestedPreset = params.get("preset");
    if (requestedPreset && PRESETS[requestedPreset]) {
      if (PRESETS[requestedPreset].isPro && !state.isProUnlocked) {
        loadPreset("caiq-v4", true, false);
        openPaywallModal("PRO FRAMEWORK REQUESTED (" + requestedPreset.toUpperCase() + ") · UNLOCK DEAL PACK ($199)");
      } else {
        loadPreset(requestedPreset, true);
      }
    } else {
      loadPreset("caiq-v4", true, false);
    }
    document.getElementById("tabBtnGapAudit").click();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
