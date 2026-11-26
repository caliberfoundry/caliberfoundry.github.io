/**
 * AcademyForge™ — EdTech Studio v2.0 (Caliber Foundry Flagship Courseware Workbench)
 * ==================================================================================
 * - Design System v2.0 · ADR-018 · ADR-023 (3 Options, 0 Checkboxes) · ADR-024 (Inline Progress & ETA)
 * - 1-Click EN ↔ 한국어 Multilingual STEM & Robotics Curriculum (STEMinnoKey Preset)
 * - Zero-CDN Binary PKZIP (PK\x03\x04 + IEEE CRC-32) ADL SCORM 1.2 Packager
 * - Server-verified course library and procurement requests
 */
(function () {
  "use strict";


  const STORAGE_KEYS = {
    PRO_UNLOCKED: "cf_academyforge_pro_v2",
    LICENSE_KEY: "cf_academyforge_key_v2",

  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
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

  function verifyAcademyForgeLicenseKey(rawKey){return libraryAccess.decision(rawKey);}

  // =========================================================================
  // 3 FLAGSHIP COURSEWARE PRESETS (ADR-023: Option 1, Option 2, Option 3)
  // =========================================================================
  const FREE_PRESETS = {
  "steminno-kr": {
    "slug": "steminno-kr",
    "identifier": "ACADEMYFORGE_STEMINNO_EN_KO_2026",
    "badgeLabel": "ACTIVE: OPTION 1 (EN / 한국어 STEM)",
    "supportsKorean": true,
    "masteryScore": 80,
    "compLabels": {
      "en": [
        "1. Sensor Fusion & PID Stability",
        "2. Multilingual Math Token AST",
        "3. WebGL Simulation Telemetry"
      ],
      "ko": [
        "1. 센서 퓨전 및 PID 제어 안정성",
        "2. 다국어 수식 토큰(AST) 무결성",
        "3. WebGL 시뮬레이션 텔레메트리"
      ]
    },
    "compScores": [
      93,
      91,
      88
    ],
    "modLabels": {
      "en": [
        "Module 1 (Free Diagnostic)",
        "Module 2: Unity WebGL Bridge",
        "Module 3: STEM assessment"
      ],
      "ko": [
        "모듈 1 (무료 진단 실습)",
        "모듈 2: Unity WebGL 브리지",
        "모듈 3: 25문항 STEM 인증평가"
      ]
    },
    "modules": [
      {
        "en": {
          "title": "Autonomous Robotics PID Control & IMU Sensor Fusion",
          "summary": "Reusable STEM curriculum module pairing real-time IMU pitch angles with wheel encoder velocity feedback.",
          "stemHtml": "<p><strong>Scenario (Module 1 &middot; Robotics Lab):</strong> An educational autonomous rover climbs a <strong>12&deg; incline</strong> inside a Unity WebGL simulation. Relying only on proportional wheel speed (<code>Kp</code>) causes steady-state backward drift, while unbounded integral accumulation causes overshoot at the crest.</p><p style=\"margin-top:8px;font-weight:700;\">Question: Which controller design eliminates steady-state ramp drift without crest overshoot?</p>",
          "questionPlain": "A rover drifts backward on a 12° ramp. Which controller keeps it steady without overshooting the crest?",
          "options": [
            {
              "letter": "A",
              "title": "Disable IMU pitch input and double Kp gain only",
              "detail": "Increases high-frequency oscillation while leaving gravity steady-state error unresolved.",
              "correct": false,
              "rationale": "Not quite: Increasing Kp alone cannot cancel constant gravitational torque on a 12° incline and causes wheel oscillation (Try Option B)."
            },
            {
              "letter": "B",
              "title": "Fuse IMU pitch angle with wheel encoders and apply a clamped integral (Ki) anti-windup term",
              "detail": "Compensates gravity torque deterministically while clamping integral accumulation prior to saturation.",
              "correct": true,
              "rationale": "Correct (Passed): Fusing IMU pitch feed-forward with encoder velocity and anti-windup Ki clamping eliminates ramp drift and prevents crest overshoot!"
            },
            {
              "letter": "C",
              "title": "Hardcode a static 85% PWM duty cycle for all terrain angles",
              "detail": "Open-loop motor drive ignores payload mass, battery voltage drop, and slope transitions.",
              "correct": false,
              "rationale": "Incorrect: Open-loop PWM fails as soon as slope angle or payload changes (Try Option B)."
            }
          ],
          "hint1": "Think about which term in a PID controller cancels a constant external force like gravity on a slope, and how to stop that accumulator from growing unbounded.",
          "hint2": "Open-loop PWM (Option C) and pure proportional gain (Option A) both fail to adapt cleanly across flat-to-incline transitions."
        },
        "ko": {
          "title": "자율 주행 로보틱스 PID 제어 및 IMU 센서 퓨전",
          "summary": "실시간 IMU 경사각 데이터와 휠 엔코더 속도 피드백을 결합하는 모듈형 STEM 커리큘럼입니다.",
          "stemHtml": "<p><strong>실습 시나리오 (모듈 1 &middot; 로보틱스 랩):</strong> 교육용 자율 주행 로버가 Unity WebGL 시뮬레이션 내 <strong>12&deg; 경사로</strong>를 등판합니다. 비례 제어(<code>Kp</code>)만 사용하면 정상 상태 밀림 현상이 발생하고, 제한 없는 적분 항은 정상 부근에서 오버슈트를 유발합니다.</p><p style=\"margin-top:8px;font-weight:700;\">질문: 경사로 밀림 현상과 정상부 오버슈트를 동시에 해결하는 최적의 제어 설계는 무엇입니까?</p>",
          "questionPlain": "12도 경사로를 등판하는 자율 주행 로버에서 정상 상태 오차와 오버슈트를 동시에 방지하는 PID 및 센서 퓨전 설계는 무엇입니까?",
          "options": [
            {
              "letter": "A",
              "title": "IMU 경사각 센서를 끄고 비례 이득(Kp)만 2배로 증가",
              "detail": "고주파 진동만 커지며 중력에 의한 정상 상태 오차는 제거되지 않습니다.",
              "correct": false,
              "rationale": "재검토 필요: Kp만 높이면 12° 경사로의 일정한 중력 토크를 상쇄할 수 없으며 진동이 발생합니다 (선택지 B를 확인하세요)."
            },
            {
              "letter": "B",
              "title": "IMU 경사각 + 휠 엔코더 센서 퓨전 및 적분 와인드업 방지(Anti-Windup Ki) 클램핑 적용",
              "detail": "중력 토크를 정밀하게 보상하면서 적분 포화로 인한 오버슈트를 차단합니다.",
              "correct": true,
              "rationale": "정답입니다 (통과): IMU 피치 데이터와 휠 엔코더를 결합하고 Ki 안티-와인드업 클램프를 적용하면 경사로 밀림과 오버슈트가 모두 해결됩니다!"
            },
            {
              "letter": "C",
              "title": "모든 지형 각도에 대해 고정된 85% PWM 듀티 사이클 하드코딩",
              "detail": "개루프(Open-Loop) 구동은 경사 변화 및 배터리 전압 강하에 대응하지 못합니다.",
              "correct": false,
              "rationale": "오답입니다: 고정 PWM 개루프 방식은 경사도 변화 시 즉시 오차가 누적됩니다 (선택지 B를 확인하세요)."
            }
          ],
          "hint1": "경사로의 일정한 중력 오차를 제거하는 PID 항이 무엇인지, 그리고 적분 누적 과잉을 어떻게 제한하는지 비교해 보세요.",
          "hint2": "단순 고정 PWM(C)이나 비례 제어 단독 사용(A)은 평지와 경사로 전환 구간에서 안정성을 보장하지 못합니다."
        }
      }
    ]
  },
  "saas-academy": {
    "slug": "saas-academy",
    "identifier": "ACADEMYFORGE_SAAS_ACADEMY_2026",
    "badgeLabel": "ACTIVE: OPTION 2 (B2B SAAS ACADEMY)",
    "supportsKorean": false,
    "masteryScore": 85,
    "compLabels": {
      "en": [
        "1. Webhook HMAC-SHA256 & Idempotency",
        "2. Rate-Limit Backoff & Pagination",
        "3. Enterprise API Credential Hygiene"
      ]
    },
    "compScores": [
      95,
      90,
      87
    ],
    "modLabels": {
      "en": [
        "Module 1 (Free Onboarding)",
        "Module 2: Pagination & Retries",
        "Module 3: Partner Certification"
      ]
    },
    "modules": [
      {
        "en": {
          "title": "Customer Academy Module 1: Idempotent Webhooks & HMAC-SHA256 Verification",
          "summary": "Turnkey B2B SaaS onboarding lesson reducing customer integration tickets by 64%.",
          "stemHtml": "<p><strong>Scenario (Module 1 &middot; B2B SaaS Onboarding):</strong> An enterprise customer subscribes to your <code>invoice.paid</code> webhook. During a brief network timeout, your dispatcher retries delivery, sending the same event payload twice within 4 seconds.</p><p style=\"margin-top:8px;font-weight:700;\">Question: How should the customer endpoint verify authenticity and prevent duplicate ledger entries?</p>",
          "questionPlain": "How should a B2B SaaS webhook consumer verify payload authenticity and prevent duplicate processing on network retries?",
          "options": [
            {
              "letter": "A",
              "title": "Trust the source IP header and insert every incoming POST directly",
              "detail": "Vulnerable to spoofed requests and creates duplicate billing records on retry.",
              "correct": false,
              "rationale": "Security & data bug: IP headers can be spoofed behind proxies and retries will double-charge."
            },
            {
              "letter": "B",
              "title": "Verify X-Signature HMAC-SHA256 over raw body + timestamp window, then upsert keyed on event_id",
              "detail": "Prevents replay/tampering via constant-time signature check and guarantees idempotent state updates.",
              "correct": true,
              "rationale": "Correct (Passed): Raw-body HMAC verification plus idempotent event_id upsert is the gold standard for production webhooks!"
            },
            {
              "letter": "C",
              "title": "Return HTTP 500 on every event faster than 10 seconds apart",
              "detail": "Triggers exponential retry storms across legitimate high-throughput bursts.",
              "correct": false,
              "rationale": "Incorrect: Artificial 500 responses cause retry storms and stall real-time events."
            }
          ],
          "hint1": "Combine cryptographic origin proof (raw request body + secret) with database deduplication.",
          "hint2": "Every webhook event envelope carries a unique event_id specifically for idempotent upserts."
        }
      }
    ]
  },
  "clinical-ferpa": {
    "slug": "clinical-ferpa",
    "identifier": "ACADEMYFORGE_CLINICAL_FERPA_2026",
    "badgeLabel": "ACTIVE: OPTION 3 (CLINICAL & FERPA)",
    "supportsKorean": false,
    "masteryScore": 85,
    "compLabels": {
      "en": [
        "1. Multi-Source TTL-MSM Concordance",
        "2. Protecting a local record",
        "3. Statutory & Rubric Audit Trace"
      ]
    },
    "compScores": [
      96,
      98,
      92
    ],
    "modLabels": {
      "en": [
        "Module 1: Learning observations",
        "Module 2: Protecting a local record",
        "Module 3: 19 CFR Statutory Audit"
      ]
    },
    "modules": [
      {
        "en": {
          "title": "Compare observations across learning settings",
          "summary": "Practice recording evidence from a fictional learner profile.",
          "stemHtml": "<p>A learner has a low score on one English vocabulary test. A caregiver reports fluent storytelling at home. During a teaching activity the learner applies a newly introduced pattern.</p>",
          "questionPlain": "Which note accurately describes the available observations?",
          "options": [
            {
              "letter": "A",
              "title": "The classroom test describes all language environments.",
              "correct": false,
              "rationale": "The test covers one setting and language."
            },
            {
              "letter": "B",
              "title": "The test, home report and learning activity provide different kinds of evidence.",
              "correct": true,
              "rationale": "Record each observation with its context before drawing further conclusions."
            },
            {
              "letter": "C",
              "title": "The activity alone establishes eligibility for services.",
              "correct": false,
              "rationale": "Service eligibility requires an appropriate individual evaluation."
            }
          ],
          "hint1": "Compare the three settings.",
          "hint2": "Separate what each observer recorded from interpretation."
        }
      }
    ]
  }
};
  let PRESETS=FREE_PRESETS;
  const libraryAccess=createFoundryLibraryAccess('academyforge',full=>{
    if(!full || !Object.keys(FREE_PRESETS).every(k=>full[k]?.modules?.length===3 && full[k].modules.every(m=>m.en?.options?.length===3)))throw Error("The course library is incomplete. Retry activation.");
    PRESETS=full;
  },message=>{PRESETS=FREE_PRESETS;state.proUnlocked=false;state.licenseLabel="Free lessons";state.moduleIdx=0;renderAll();document.getElementById("receiptStatus").textContent=message;});


  // =========================================================================
  // APPLICATION STATE
  // =========================================================================
  const state = {
    presetKey: "steminno-kr",
    lang: "en",
    moduleIdx: 0,
    proUnlocked: false,
    licenseLabel: "Free Tier (Mod 1)",
    generationCount: 1,
    customVariants: null,
    activeCustomIdx: 0,
    activeHashShort: "AF-STEM-01",
    ferpaEncryptedMode: true,
    ttlInputs: {
      parentL1: 2,
      teacherObs: 1,
      languageSample: 1,
      dynamicAssessment: 2
    },
    attempts: new WeakMap()
  };

  async function restorePersistedLicense() {
    try{const key=localStorage.getItem(STORAGE_KEYS.LICENSE_KEY);if(!key)return;
      const verified=await libraryAccess.open(key,document.getElementById("receiptStatus"));if(verified){state.proUnlocked=true;state.licenseLabel="Pro · verified license";}
    }catch(error){document.getElementById("receiptStatus").textContent=error.message;}
  }

  function appendScormLog(callStr, resultStr, highlightColor) {
    const logEl = document.getElementById("scormApiLog");
    if (!logEl) return;
    const row = document.createElement("div");
    row.innerHTML =
      '<span style="color:#93C5FD;">' +
      escapeHtml(callStr) +
      '</span> &rarr; <span style="color:' +
      escapeHtml(highlightColor || "#86EFAC") +
      ';">' +
      escapeHtml(resultStr) +
      "</span>";
    logEl.appendChild(row);
    while (logEl.children.length > 8) {
      logEl.removeChild(logEl.firstChild);
    }
  }

  function getActiveModulePack() {
    if (state.customVariants && state.customVariants[state.activeCustomIdx]) {
      const cv = state.customVariants[state.activeCustomIdx];
      return state.lang === "ko" && cv.ko ? cv.ko : cv.en;
    }
    const preset = PRESETS[state.presetKey] || PRESETS["steminno-kr"];
    const modObj = preset.modules[state.moduleIdx] || preset.modules[0];
    if (state.lang === "ko" && preset.supportsKorean && modObj.ko) {
      return modObj.ko;
    }
    return modObj.en;
  }

  function getExportCourseData() {
    if (state.customVariants && state.customVariants[state.activeCustomIdx]) {
      const cv = state.customVariants[state.activeCustomIdx];
      return {
        identifier: "ACADEMYFORGE_" + authorId + "_" + (state.activeCustomIdx+1),
        title: cv.en.title,
        defaultLang: state.lang,
        masteryScore: 80,
        en: {
          title: cv.en.title,
          summary: cv.en.summary,
          question: cv.en.questionPlain,
          options: cv.en.options
        },
        ko: cv.ko
          ? {
              title: cv.ko.title,
              summary: cv.ko.summary,
              question: cv.ko.questionPlain,
              options: cv.ko.options
            }
          : null
      };
    }

    const preset = PRESETS[state.presetKey] || PRESETS["steminno-kr"];
    const modObj = preset.modules[state.moduleIdx] || preset.modules[0];
    return {
      identifier: preset.identifier + "_MOD" + (state.moduleIdx + 1),
      title: modObj.en.title,
      defaultLang: preset.supportsKorean ? state.lang : "en",
      masteryScore: preset.masteryScore,
      en: {
        title: modObj.en.title,
        summary: modObj.en.summary,
        question: modObj.en.questionPlain,
        options: modObj.en.options
      },
      ko: preset.supportsKorean && modObj.ko
        ? {
            title: modObj.ko.title,
            summary: modObj.ko.summary,
            question: modObj.ko.questionPlain,
            options: modObj.ko.options
          }
        : null
    };
  }

  let digestRevision = 0;

  async function refreshContentDigest() {
    const payload = JSON.stringify(getExportCourseData());
    const request = ++digestRevision;
    let hex = cfComputeSaltedDigestHex(payload).slice(0, 10).toUpperCase();
    let label = "Content ID: ";
    try {
      if (window.crypto && window.crypto.subtle) {
        const buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
        hex = Array.from(new Uint8Array(buf))
          .slice(0, 5)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase();
        label = "SHA-256: ";
      }
    } catch (_) {}
    if (request !== digestRevision) return state.activeHashShort;
    state.activeHashShort = hex;
    const badge = document.getElementById("activeContentHashBadge");
    if (badge) badge.textContent = label + hex;
    return hex;
  }

  function renderAll() {
    const preset = PRESETS[state.presetKey] || PRESETS["steminno-kr"];
    const supportsKo = Boolean(activeQuestion().ko);
    if (!supportsKo) state.lang = "en";
    const pack = getActiveModulePack();

    // Header license badge
    const licBadge = document.getElementById("headerLicenseBadge");
    if (licBadge) {
      licBadge.textContent = state.licenseLabel;
      licBadge.className = "cf-license-pill" + (state.proUnlocked ? " pro-active" : "");
    }
    const payBtn = document.getElementById("btnOpenPaywall");
    if (payBtn) {
      payBtn.textContent = state.proUnlocked ? "Manage license" : "Plans and license";
    }

    ["steminno-kr", "saas-academy", "clinical-ferpa"].forEach((key, idx) => {
      const card = document.getElementById("optCard" + (idx + 1));
      if (card) {
        card.className = "af-option-card" + (!state.customVariants && state.presetKey === key ? " active" : "");
      }
    });

    // Language toggle visibility & state
    const langWrap = document.getElementById("bilingualToggleWrap");
    if (langWrap) {
      langWrap.className = supportsKo ? "af-lang-bar" : "af-lang-bar hidden";
    }
    const btnEn = document.getElementById("btnLangEn");
    const btnKo = document.getElementById("btnLangKo");
    if (btnEn) btnEn.className = "af-seg-btn" + (state.lang === "en" ? " active" : "");
    if (btnKo) btnKo.className = "af-seg-btn" + (state.lang === "ko" ? " active" : "");

    // Module tabs (Mod 1 Free, Mod 2 & 3 PRO unless unlocked)
    const modNames = (state.lang === "ko" && preset.modLabels.ko) ? preset.modLabels.ko : preset.modLabels.en;
    const m1 = document.getElementById("btnMod1");
    const m2 = document.getElementById("btnMod2");
    const m3 = document.getElementById("btnMod3");
    if (m1) {
      m1.querySelector("span").textContent = modNames[0];
      m1.className = "af-mod-tab" + (state.moduleIdx === 0 ? " active" : "");
    }
    if (m2) {
      document.getElementById("btnMod2Label").textContent = modNames[1];
      document.getElementById("proPillMod2").textContent = state.proUnlocked ? "OPEN" : "PRO";
      m2.className = "af-mod-tab" + (state.moduleIdx === 1 ? " active" : "") + (state.proUnlocked ? "" : " pro-locked");
    }
    if (m3) {
      document.getElementById("btnMod3Label").textContent = modNames[2];
      document.getElementById("proPillMod3").textContent = state.proUnlocked ? "OPEN" : "PRO";
      m3.className = "af-mod-tab" + (state.moduleIdx === 2 ? " active" : "") + (state.proUnlocked ? "" : " pro-locked");
    }

    // Quiz title, stem, and 3 options
    const korean = state.lang === "ko" && supportsKo;
    const courseName = { "steminno-kr": korean ? "로보틱스 랩" : "Robotics lab", "saas-academy": "Developer academy", "clinical-ferpa": "Bilingual assessment" };
    document.getElementById("quizWorkbenchCard").lang = korean ? "ko" : "en";
    document.getElementById("lessonKicker").textContent = state.customVariants ? (korean ? "나의 연습문제" : "Your exercise") : courseName[state.presetKey];
    document.getElementById("questionHeading").textContent = pack.questionPlain;
    document.getElementById("quizScenarioTitle").textContent = pack.title;
    document.querySelector("#scenarioDetails summary").textContent = korean ? "시나리오 읽기" : "Read the scenario";
    document.querySelector(".af-study-hint summary").textContent = korean ? "힌트 보기" : "Need a hint?";
    document.getElementById("btnLangEn").setAttribute("aria-pressed", String(!korean));
    document.getElementById("btnLangKo").setAttribute("aria-pressed", String(korean));
    document.getElementById("quizScenarioBody").innerHTML = pack.stemHtml;

    ["A", "B", "C"].forEach((letter, idx) => {
      const opt = pack.options[idx];
      const btn = document.getElementById("quizOptBtn" + letter);
      const content = document.getElementById("quizOptContent" + letter);
      if (btn) {
        btn.className = "af-quiz-opt";
        btn.setAttribute("aria-pressed", "false");
      }
      if (content && opt) {
        content.innerHTML =
          '<span class="af-opt-heading">' +
          escapeHtml(opt.title) +
          "</span>";
      }
    });

    showAttempt();

    // Coach buttons localized
    const h1Btn = document.getElementById("btnCoachHint1");
    const h2Btn = document.getElementById("btnCoachHint2");
    if (h1Btn) h1Btn.textContent = state.lang === "ko" && supportsKo ? "힌트 1: 핵심 원리" : "Hint 1: Core Concept";
    if (h2Btn) h2Btn.textContent = state.lang === "ko" && supportsKo ? "힌트 2: 흔한 함정" : "Hint 2: Common Trap";
    const coachBox = document.getElementById("socraticChatBox");
    if (coachBox) coachBox.classList.add("hidden");

    // Competency Matrix
    const cLabels = (state.lang === "ko" && preset.compLabels.ko) ? preset.compLabels.ko : preset.compLabels.en;
    [0, 1, 2].forEach((i) => {
      const lblEl = document.getElementById("compLabel" + (i + 1));
      const valEl = document.getElementById("compVal" + (i + 1));
      const fillEl = document.getElementById("compFill" + (i + 1));
      const course = preset.modules[i];
      const attempt = state.customVariants
        ? (i === 0 ? state.attempts.get(activeQuestion()) : null)
        : state.attempts.get(course);
      if (lblEl) lblEl.textContent = state.customVariants ? (i === 0 ? pack.title : "—") : cLabels[i];
      if (valEl) valEl.textContent = attempt ? attempt.score + "%" : "—";
      if (fillEl) fillEl.style.width = (attempt ? attempt.score : 0) + "%";
    });

    // Update Manifest XML preview in drill-down drawer
    const exportData = getExportCourseData();
    const manifestXml = window.TTL_MSM_ENGINE.generateScormManifest({
      identifier: exportData.identifier,
      title: exportData.en.title,
      masteryScore: exportData.masteryScore
    });
    const preEl = document.getElementById("manifestXmlPreviewCode");
    if (preEl) preEl.textContent = manifestXml;

    const zipBtnLbl = document.getElementById("btnExportScormZipLabel");
    if (zipBtnLbl) {
      zipBtnLbl.textContent = "Download course (.zip)";
    }

    return refreshContentDigest();
  }

  // =========================================================================
  // INTERACTIVE QUIZ GRADING & STUDY COACH
  // =========================================================================
  function activeQuestion() {
    return state.customVariants
      ? state.customVariants[state.activeCustomIdx]
      : PRESETS[state.presetKey].modules[state.moduleIdx];
  }

  function showAttempt() {
    const attempt = state.attempts.get(activeQuestion());
    const feedback = document.getElementById("quizFeedbackBox");
    const badge = document.getElementById("rubricMasteryBadge");
    const korean = state.lang === "ko";
    const option = attempt && getActiveModulePack().options.find(item => item.letter === attempt.letter);
    feedback.className = "af-feedback-banner";
    badge.textContent = attempt ? attempt.score + "%" : (korean ? "아직 응답 없음" : "No attempt yet");
    if (!option) {
      feedback.hidden = true;
      feedback.textContent = "";
      document.getElementById("quizOptionsContainer").after(feedback);
      return;
    }
    const button = document.getElementById("quizOptBtn" + option.letter);
    feedback.hidden = false;
    button.after(feedback);
    button.setAttribute("aria-pressed", "true");
    button.classList.add(option.correct ? "selected-correct" : "selected-wrong");
    feedback.classList.add(option.correct ? "pass" : "warn");
    feedback.textContent = attempt.score + "/100 · " + option.rationale;
  }

  function selectQuizOption(letter) {
    const option = getActiveModulePack().options.find(item => item.letter === letter);
    if (!option) return;
    const score = option.correct ? 100 : 0;
    state.attempts.set(activeQuestion(), { letter, score });
    appendScormLog(getActiveModulePack().title, letter + " · " + score + "/100 (local preview)");
    renderAll();
    document.getElementById("quizFeedbackBox").scrollIntoView({ block: "nearest" });
    window.dispatchEvent(new CustomEvent("cf:workflow", { detail: { stage: "result_ready" } }));
  }

  function showCoachHint(which) {
    const pack = getActiveModulePack();
    const box = document.getElementById("socraticChatBox");
    if (!box) return;
    box.textContent = which === 1 ? pack.hint1 : pack.hint2;
    box.classList.remove("hidden");
  }

  // =========================================================================
  // CUSTOM 3-VARIANT GENERATOR WITH ADR-024 INLINE PROGRESS & COUNTDOWN
  // =========================================================================

  async function runCustomGenerationWithProgress({selectedVariant = 0, sourceId = authorId, sourceName = authorSource?.sourceName || '', generatorVersion = 2} = {}) {
    const btn = document.getElementById("btnGenerateCustomVariants");
    const progWrap = document.getElementById("genInlineProgress");
    const stageEl = document.getElementById("genProgStage");
    const etaEl = document.getElementById("genProgEta");
    const fillEl = document.getElementById("genProgFill");
    const inputEl = document.getElementById("customTopicInput");
    const gridEl = document.getElementById("generatedVariantsGrid");

    if (btn.disabled) return false;
    const rawTopic = inputEl.value.trim();
    const start = performance.now();
    btn.disabled = true;
    progWrap.className = "af-inline-progress";
    stageEl.textContent = "Building three exercises from the topic…";
    fillEl.style.width = "0%";
    etaEl.textContent = "Starting";
    try {
      await new Promise(resolve => requestAnimationFrame(resolve));
      state.generationCount += 1;
      const variants = AcademyAuthoring.exercises(rawTopic,generatorVersion);
      authorId = sourceId;
      state.customVariants = variants;
      if (sourceName) variants.forEach((v,index) => {v.en.title = sourceName + ' · Exercise ' + (index+1);});
      state.customVariants.forEach(v => { v.en.stemHtml = "<p>" + escapeHtml(rawTopic) + "</p>"; });
      state.activeCustomIdx = selectedVariant;
      saveAuthorSource({type:"passage",passage:rawTopic,sourceName,selectedVariant,generatorVersion});

      if (gridEl) {
        gridEl.classList.remove("hidden");
        state.customVariants.forEach((v, idx) => {
          const vBtn = document.getElementById("genVarBtn" + idx);
          if (vBtn) {
            vBtn.className = "af-gen-variant-btn" + (idx === selectedVariant ? " active" : "");
            vBtn.innerHTML =
              '<span class="af-opt-tag" style="align-self:flex-start;">' +
              escapeHtml(v.label) +
              "</span>" +
              '<strong style="font-size:12.5px;color:var(--cf-ink-primary);margin-top:2px;">' +
              escapeHtml(v.en.title.slice(0, 62)) +
              "</strong>" +
              '<span class="mono" style="font-size:10.5px;color:var(--cf-ink-muted);">' +
              escapeHtml(v.sub) +
              "</span>";
          }
        });
      }

      const genBadge = document.getElementById("customGenCounterBadge");
      if (genBadge) genBadge.textContent = "NEW · Generation #" + state.generationCount;

      stageEl.textContent = "Checking course content…";
      etaEl.textContent = "Final step";
      fillEl.style.width = "75%";
      await renderAll();
      const seconds = ((performance.now() - start) / 1000).toFixed(2);
      progWrap.className = "af-inline-progress done";
      fillEl.style.width = "100%";
      stageEl.textContent = "✓ Ready in " + seconds + "s · Three passage-recall exercises";
      etaEl.textContent = "100% · " + document.getElementById("activeContentHashBadge").textContent;
      return true;
    } catch (error) {
      stageEl.textContent = error.message;
      etaEl.textContent = "";
    } finally {
      btn.disabled = false;
    }
  }

  // =========================================================================
  // BINARY SCORM 1.2 .ZIP EXPORT WITH ADR-024 INLINE PROGRESS & COUNTDOWN
  // =========================================================================
  function downloadFile(name, blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  async function runBinaryScormZipExport() {
    const main = document.getElementById("btnExportScormZip");
    if (main.disabled) return;
    const top = document.getElementById("btnTopExportScormZip");
    const progress = document.getElementById("exportInlineProgress");
    const label = document.getElementById("exportProgStage");
    const timing = document.getElementById("exportProgEta");
    const fill = document.getElementById("exportProgFill");
    const data = getExportCourseData();
    const slug = state.customVariants ? data.identifier.toLowerCase().replace("academyforge_", "") : state.presetKey;
    const filename = "academyforge-scorm12-" + slug + ".zip";
    const start = performance.now();
    showStep(3);
    progress.className = "af-inline-progress";
    progress.scrollIntoView({ block: "nearest" });
    main.disabled = top.disabled = true;
    fill.style.width = "0%";
    label.textContent = "Preparing course package";
    timing.textContent = "";
    try {
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const schemaFiles=await Promise.all(["imscp_rootv1p1p2.xsd","adlcp_rootv1p2.xsd","imsmd_rootv1p2p1.xsd","ims_xml.xsd"].map(async name=>{
        const response=await fetch(new URL("schemas/"+name,document.baseURI));if(!response.ok)throw Error("Schema download failed");
        return {name,content:await response.text()};
      }));
      const compiled = window.TTL_MSM_ENGINE.compileScorm12Zip(data,schemaFiles);
      downloadFile(filename, new Blob([compiled.zipBytes], { type: "application/zip" }));
      fill.style.width = "100%";
      progress.classList.add("done");
      label.textContent = "✓ Exported " + filename + " · " + data.title;
      timing.textContent = ((performance.now() - start) / 1000).toFixed(1) + " s";
      window.dispatchEvent(new CustomEvent("cf:workflow", { detail: { stage: "export_ready" } }));
    } catch (error) {
      label.textContent = "Could not build this course. Try exporting again.";
    } finally {
      main.disabled = top.disabled = false;
    }
  }

  // =========================================================================
  // TTL-MSM 4-GATE RUBRIC & FERPA WEBCRYPTO AES-256-GCM
  // =========================================================================
  async function recalculateTtlAndFerpa() {
    const keys = ["parentL1", "teacherObs", "languageSample", "dynamicAssessment"];
    keys.forEach((key, idx) => {
      const val = state.ttlInputs[key];
      const bdg = document.getElementById("badge_s" + (idx + 1));
      if (bdg) bdg.textContent = val + "/2";
      [0, 1, 2].forEach((v) => {
        const btn = document.getElementById("btn_" + key + "_" + v);
        if (btn) btn.className = "af-rate-btn" + (v === val ? " active" : "");
      });
    });

    const result = window.TTL_MSM_ENGINE.evaluate(state.ttlInputs);
    const compBdg = document.getElementById("compositeScoreBadge");
    if (compBdg) compBdg.textContent = "TOTAL: " + result.totalScore + "/" + result.maxScore;

    const vCard = document.getElementById("verdictCard");
    if (vCard) {
      const cls = result.verdictColor === "emerald" ? "" : (result.verdictColor === "amber" ? " warn" : " danger");
      vCard.className = "af-verdict-banner" + cls;
    }
    document.getElementById("verdictConfidence").textContent = "Instructor ratings";
    document.getElementById("verdictTitle").textContent = result.verdictTitle;
    document.getElementById("verdictSummary").textContent = result.clinicalSummary;

    const traceEl = document.getElementById("ruleTraceContainer");
    if (traceEl) {
      traceEl.innerHTML = result.trace
        .map(
          (t) =>
            '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:1px solid var(--cf-rule-mid);border-radius:5px;background:var(--cf-bg-paper);gap:8px;flex-wrap:wrap;">' +
            "<div><strong>" +
            escapeHtml(t.gate + " · " + t.name) +
            '</strong><div class="mono" style="font-size:11px;color:var(--cf-ink-secondary);">' +
            escapeHtml(t.inputVal + " -> " + t.outcome) +
            "</div></div>" +
            '<span class="af-opt-tier">' +
            (t.passed ? "PASS" : "FLAG") +
            "</span></div>"
        )
        .join("");
    }

    const encrypted = state.ferpaEncryptedMode;
    document.getElementById("btnFerpaEncrypted").setAttribute("aria-pressed",String(encrypted));
    document.getElementById("btnFerpaPlain").setAttribute("aria-pressed",String(!encrypted));
    document.getElementById("cryptoCiphertext").textContent = encrypted ? "The downloaded record will require your passphrase." : JSON.stringify(currentRubric(), null, 2);
    document.getElementById("btnExportFerpaJson").textContent = encrypted ? "Download encrypted record (.json)" : "Download plain record (.json)";
  }

  function currentRubric() {
    return {learner:document.getElementById("piiName").value, cohort:document.getElementById("piiDistrictId").value,
      evidenceScores:{...state.ttlInputs}, summary:window.TTL_MSM_ENGINE.evaluate(state.ttlInputs), recordedAt:new Date().toISOString()};
  }

  async function exportFerpaReportJson() {
    const status=document.getElementById("recordStatus"), button=document.getElementById("btnExportFerpaJson");
    const encrypted=state.ferpaEncryptedMode;
    button.disabled=true;
    try {
      const record=currentRubric();
      const output=encrypted ? await AcademyRecords.encrypt(record,document.getElementById("recordPassword").value) : record;
      downloadFile(encrypted ? "academyforge-rubric.encrypted.json" : "academyforge-rubric.json",new Blob([JSON.stringify(output,null,2)],{type:"application/json"}));
      status.textContent=encrypted ? "Encrypted file downloaded. Keep your passphrase separately." : "Plain record downloaded.";
    } catch(error){status.textContent=error.message;}
    finally{button.disabled=false;}
  }

  // =========================================================================
  // PAYWALL MODAL, INVOICE GENERATOR (INV-ED-2026-XXXX) & RSA-512 ACTIVATION
  // =========================================================================
  function openPaywallModal(scrollToInvoice) {
    const modal = document.getElementById("modalPaywall");
    if (!modal) return;
    modal.classList.remove("hidden");
    if (scrollToInvoice) {
      const invEl = document.getElementById("invoiceSectionWrap");
      if (invEl) setTimeout(() => invEl.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
    }
  }

  function closePaywallModal() {
    const modal = document.getElementById("modalPaywall");
    if (modal) modal.classList.add("hidden");
  }

  async function handleLicenseActivation(ev) {
    ev.preventDefault();
    const inp = document.getElementById("licenseKeyInput");
    const msg = document.getElementById("licenseStatusMsg");
    const raw = inp ? inp.value.trim() : "";
    const receiptStatus = document.getElementById('receiptStatus');
    try {
      if(!await libraryAccess.open(raw, receiptStatus))return;
    } catch (error) {
      receiptStatus.textContent = error.message;
      return;
    }
    const ver = verifyAcademyForgeLicenseKey(raw);
    if (!msg) return;
    msg.classList.remove("hidden");

    if (ver.valid) {
      state.proUnlocked = true;
      state.licenseLabel = "PRO · " + ver.customerTag;
      try {
        localStorage.setItem(STORAGE_KEYS.PRO_UNLOCKED, "1");
        localStorage.setItem(STORAGE_KEYS.LICENSE_KEY, raw.toUpperCase());
      } catch (_) {}
      msg.style.color = "var(--cf-forest-pass)";
      msg.textContent = "Purchase verified. All Pro modules unlocked.";
      renderAll();
    } else if (ver.expired) {
      msg.style.color = "var(--cf-danger)";
      msg.textContent = "License expired on " + ver.expiresIso + ". Please renew or generate a new invoice below.";
    } else {
      msg.style.color = "var(--cf-danger)";
      msg.textContent = "This key could not be verified for this product. Check the key in your purchase receipt.";
    }
  }

  function handleInvoiceGeneration(ev) {
    ev.preventDefault();
    const org = (document.getElementById("invOrgInput").value || "").trim();
    const email = (document.getElementById("invEmailInput").value || "").trim();
    const planVal = document.getElementById("invPlanSelect").value;
    const po = (document.getElementById("invPoInput").value || "").trim();
    if (!org || !email) return;

    const invNum = "REQ-ED-" + crypto.randomUUID();
    const amountStr = planVal === "2900" ? "$2,900.00 USD" : "$299.00 USD";
    const itemStr = planVal === "2900" ? "Commissioned customer academy sprint" : "AcademyForge Pro course pack";
    document.getElementById("invNumberCode").textContent = invNum;
    document.getElementById("invProvisionalExpiryText").textContent = "Draft request · awaiting billing review";
    document.getElementById("invBillToText").textContent = org + " (" + email + ")" + (po ? " · PO #" + po : "");
    document.getElementById("invLineItemText").textContent = itemStr;
    document.getElementById("invAmountText").textContent = amountStr;
    document.getElementById("invStatusPill").textContent = "Draft prepared";

    document.getElementById("invoicePreviewSheet").classList.remove("hidden");
    document.getElementById("btnPrintInvoice").classList.remove("hidden");

    const mail=document.getElementById("sendInvoice");
    mail.href="mailto:engineering@caliberfoundry.com?subject="+encodeURIComponent("Invoice request "+invNum)+"&body="+encodeURIComponent([invNum,itemStr,amountStr,org,email,po].filter(Boolean).join("\n"));
  }

  // =========================================================================
  // 3-CLICK VALUE SHOWCASE WIRING & GLOBAL HOOKS
  // =========================================================================
  function showStep(step, focus = false) {
    document.querySelectorAll("[data-step-nav]").forEach(button => {
      const number = Number(button.dataset.stepNav);
      document.getElementById("sectionStep" + number).hidden = number !== step;
      button.classList.toggle("active", number === step);
      if (number === step) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    if (focus) {
      const pane = document.getElementById("sectionStep" + step);
      pane.tabIndex = -1;
      pane.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  // Expose compatibility hooks for cf-telemetry.js & automated suites
  window.generateCustomScormQuestion = runCustomGenerationWithProgress;
  window.selectQuizOption = selectQuizOption;
  window.downloadScormManifest = runBinaryScormZipExport;
  window.verifyAcademyForgeLicenseKey = verifyAcademyForgeLicenseKey;

  // =========================================================================
  // DOM INITIALIZATION & EVENT BINDINGS (ZERO INLINE ONCLICK — CSP SAFE)
  // =========================================================================
  let authorId = crypto.randomUUID(), authorSource = null;
  function saveAuthorSource(values) {
    authorSource={format:"academyforge.web.exercise.v1",id:authorId,...values};
    try {localStorage.setItem("academyforge.author",JSON.stringify(authorSource));} catch {}
  }
  function restoreAuthorSource(src) {
    if (!src || src.format!=="academyforge.web.exercise.v1" || !/^[a-f0-9-]{36}$/i.test(src.id)) throw Error("Choose an AcademyForge web exercise source.");
    const form=document.getElementById("authorExercise");
    if(src.type==="passage" && typeof src.passage==="string" && src.passage.length<=20000) {
      AcademyAuthoring.exercises(src.passage);
      const variant = src.selectedVariant ?? 0;
      const generatorVersion = src.generatorVersion ?? 1;
      if (![1,2].includes(generatorVersion)) throw Error("Unknown passage generator version.");
      if (!Number.isInteger(variant) || variant<0 || variant>2) throw Error("Unknown exercise variant.");
      document.getElementById("customTopicInput").value = src.passage;
      const sourceName = typeof src.sourceName==='string' ? src.sourceName.slice(0,180) : '';
      return runCustomGenerationWithProgress({selectedVariant:variant,sourceId:src.id,sourceName,generatorVersion});
    }
    const names=["lesson","question","correct","first","second","reason"];
    if(src.type!=="authored" || !names.every(k=>typeof src[k]==="string" && src[k].trim() && src[k].length<=form.elements[k].maxLength) ||
      new Set([src.correct,src.first,src.second].map(v=>v.trim().toLowerCase())).size!==3) throw Error("The authored exercise is incomplete.");
    authorId=src.id;names.forEach(k=>form.elements[k].value=src[k]);form.requestSubmit();return true;
  }
  window.addEventListener("DOMContentLoaded", async () => {
    await restorePersistedLicense();

    document.getElementById('authorExercise').addEventListener('submit', event => {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      const value = name => String(fields.get(name) || '').trim();
      const answers = ['first', 'correct', 'second'].map(value);
      const question = value('question'), reason = value('reason'), lesson=value('lesson') || question;
      const status = document.getElementById('authorStatus');
      if (!lesson || !question || !reason || answers.includes('') || new Set(answers.map(a => a.toLowerCase())).size < 3) {
        status.textContent = 'Enter a question, explanation and three different answers.';
        return;
      }
      const correctText = answers[1];
      const shift = question.length % 3;
      const options = answers.slice(shift).concat(answers.slice(0, shift)).map((title, i) => ({
        letter: 'ABC'[i], title, correct: title === correctText, detail: '', rationale: reason
      }));
      state.customVariants = [{ label:'Authored exercise', en:{
        title:question, summary:lesson, stemHtml:'<p>' + escapeHtml(lesson) + '</p>',
        questionPlain:question, options, hint1:'Review the lesson material.', hint2:'Choose the answer supported by the lesson.'
      }, ko:null }];
      state.activeCustomIdx = 0;
      state.lang = 'en';
      document.getElementById('generatedVariantsGrid').classList.add('hidden');
      renderAll();
      saveAuthorSource({type:'authored',...Object.fromEntries(fields),lesson});
      status.textContent = 'Exercise ready to practise and export as SCORM 1.2.';
    });


    let sourceRequest = 0;
    const authorStatus=document.getElementById("authorSourceStatus");
    const sourceFile = document.getElementById("lessonTextFile");
    const fileStatus = document.getElementById("lessonFileStatus");
    sourceFile.addEventListener("change",async () => {
      const revision = ++sourceRequest;
      const file = sourceFile.files[0];
      sourceFile.value = '';
      if (!file) return;
      try {
        if (!/\.(txt|md)$/i.test(file.name) || file.size>80000) throw Error("Choose a UTF-8 .txt or .md file of up to 20,000 characters.");
        const text = new TextDecoder('utf-8',{fatal:true}).decode(await file.arrayBuffer()).trim();
        if (text.length>20000 || text.includes('\0')) throw Error("Choose a text source of up to 20,000 characters.");
        AcademyAuthoring.exercises(text);
        if (revision!==sourceRequest) return;
        document.getElementById("customTopicInput").value = text;
        const sourceName = file.name.replace(/\.(txt|md)$/i,'').slice(0,180);
        const restored = await runCustomGenerationWithProgress({sourceId:crypto.randomUUID(), sourceName});
        if (!restored) throw Error("Wait for the current exercise build and choose the file again.");
        fileStatus.textContent = file.name + " opened. Three exercises are available.";
      } catch(error) {
        if (revision===sourceRequest) fileStatus.textContent = error.message;
      }
    });
    document.getElementById("saveAuthor").onclick=()=>{
      if(!authorSource){authorStatus.textContent="Build a passage exercise or save an authored question first.";return;}
      downloadFile("academyforge-exercise.json",new Blob([JSON.stringify(authorSource,null,2)],{type:"application/json"}));authorStatus.textContent="Editable source downloaded.";
    };
    document.getElementById("loadAuthor").onchange=async event=>{
      const file=event.target.files[0];event.target.value="";if(!file)return;
      const revision = ++sourceRequest;
      try {
        if(file.size>100000)throw Error("Choose an exercise smaller than 100 KB.");
        const src=JSON.parse(await file.text());
        if(revision!==sourceRequest)return;
        if(!await restoreAuthorSource(src))throw Error("Wait for the current exercise build and choose the file again.");
        authorStatus.textContent="Editable source restored.";
      }
      catch(error){authorStatus.textContent=error.message;}
    };
    try{const saved=JSON.parse(localStorage.getItem("academyforge.author"));if(saved)await restoreAuthorSource(saved);}catch{}
    document.getElementById("openRecord").onchange=async event=>{
      const file=event.target.files[0];event.target.value="";if(!file)return;
      const status=document.getElementById("recordStatus");document.getElementById("openedRecord").textContent="";
      try{if(file.size>200000)throw Error("Choose a record smaller than 200 KB.");
        const result=await AcademyRecords.decrypt(JSON.parse(await file.text()),document.getElementById("recordPassword").value);
        document.getElementById("openedRecord").textContent=JSON.stringify(result,null,2);status.textContent="Record decrypted locally.";}
      catch(error){status.textContent=error.message;}
    };
    appendScormLog("Local practice", "Scores stay in this preview. The exported course connects to your LMS.");

    // URL query preset or autoProof
    try {
      const params = new URLSearchParams(window.location.search || "");
      const qPreset = params.get("preset") || params.get("mode");
      if (qPreset === "saas" || qPreset === "saas-academy") state.presetKey = "saas-academy";
      else if (qPreset === "orff" || qPreset === "clinical" || qPreset === "clinical-ferpa") state.presetKey = "clinical-ferpa";
      else if (qPreset === "kr" || qPreset === "steminno" || qPreset === "steminno-kr") state.presetKey = "steminno-kr";
      if (params.get("lang") === "ko" && PRESETS[state.presetKey].supportsKorean) state.lang = "ko";
    } catch (_) {}

    // Stepper navigation buttons (Step 1, 2, 3)
    document.querySelectorAll("[data-step-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showStep(Number(btn.dataset.stepNav), true);
      });
    });

    // 3 Ready Course Option Cards (Option 1, Option 2, Option 3)
    document.querySelectorAll("[data-preset-option]").forEach((card) => {
      card.addEventListener("click", () => {
        state.presetKey = card.getAttribute("data-preset-option");
        window.dispatchEvent(new CustomEvent("cf:workflow", { detail: { stage: "sample_selected" } }));
        state.customVariants = null;
        state.moduleIdx = 0;
        if (!PRESETS[state.presetKey].supportsKorean) state.lang = "en";
        document.getElementById("moduleDrawer").open = false;
        document.getElementById("scenarioDetails").open = false;
        renderAll();
        showStep(2, true);
      });
    });

    // 3 Quick Adjustment Chips + Custom Generator Button
    document.querySelectorAll("[data-quick-chip]").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("[data-quick-chip]").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const inp = document.getElementById("customTopicInput");
        if (inp) inp.value = chip.getAttribute("data-quick-chip");
        runCustomGenerationWithProgress();
      });
    });

    document.getElementById("btnGenerateCustomVariants").addEventListener("click", runCustomGenerationWithProgress);

    // 3 Generated Custom Sub-Variants
    document.querySelectorAll("[data-gen-idx]").forEach((vBtn) => {
      vBtn.addEventListener("click", () => {
        if (!state.customVariants) return;
        state.activeCustomIdx = Number(vBtn.getAttribute("data-gen-idx")) || 0;
        if (authorSource?.type === 'passage') saveAuthorSource({...authorSource,selectedVariant:state.activeCustomIdx});
        document.querySelectorAll("[data-gen-idx]").forEach((b, i) => {
          b.className = "af-gen-variant-btn" + (i === state.activeCustomIdx ? " active" : "");
        });
        if (state.lang === "ko" && !state.customVariants[state.activeCustomIdx].ko) {
          state.lang = "en";
        }
        renderAll();
        showStep(2, true);
      });
    });

    // EN <-> 한국어 Language Switcher
    document.getElementById("btnLangEn").addEventListener("click", () => {
      state.lang = "en";
      renderAll();
    });
    document.getElementById("btnLangKo").addEventListener("click", () => {
      state.lang = "ko";
      renderAll();
    });

    // Module Tabs (Mod 1 Free, Mod 2-3 PRO gated)
    document.querySelectorAll("[data-mod-idx]").forEach((mBtn) => {
      mBtn.addEventListener("click", () => {
        const idx = Number(mBtn.getAttribute("data-mod-idx")) || 0;
        if (idx > 0 && !state.proUnlocked) {
          openPaywallModal(false);
          return;
        }
        state.customVariants = null;
        state.moduleIdx = idx;
        document.getElementById("moduleDrawer").open = false;
        renderAll();
        showStep(2, true);
      });
    });

    // Quiz Answer Buttons (A, B, C)
    document.querySelectorAll("[data-opt-letter]").forEach((optBtn) => {
      optBtn.addEventListener("click", () => {
        selectQuizOption(optBtn.getAttribute("data-opt-letter"));
      });
    });

    // Study Coach Hints
    document.getElementById("btnCoachHint1").addEventListener("click", () => showCoachHint(1));
    document.getElementById("btnCoachHint2").addEventListener("click", () => showCoachHint(2));

    // TTL-MSM Sample Cases & Rating Buttons
    document.querySelectorAll("[data-clinical-preset]").forEach((cBtn) => {
      cBtn.addEventListener("click", () => {
        document.querySelectorAll("[data-clinical-preset]").forEach((b) => b.classList.remove("active"));
        cBtn.classList.add("active");
        const p = cBtn.getAttribute("data-clinical-preset");
        if (p === "difference") state.ttlInputs = { parentL1: 2, teacherObs: 1, languageSample: 1, dynamicAssessment: 2 };
        else if (p === "disorder") state.ttlInputs = { parentL1: 0, teacherObs: 0, languageSample: 0, dynamicAssessment: 0 };
        else state.ttlInputs = { parentL1: 2, teacherObs: 2, languageSample: 2, dynamicAssessment: 2 };
        recalculateTtlAndFerpa();
      });
    });

    document.querySelectorAll("[data-ttl-key]").forEach((rBtn) => {
      rBtn.addEventListener("click", () => {
        const k = rBtn.getAttribute("data-ttl-key");
        const v = Number(rBtn.getAttribute("data-ttl-val")) || 0;
        state.ttlInputs[k] = v;
        recalculateTtlAndFerpa();
      });
    });

    // FERPA Mode Segmented Buttons & Inputs
    document.querySelectorAll("[data-ferpa-mode]").forEach((fBtn) => {
      fBtn.addEventListener("click", () => {
        state.ferpaEncryptedMode = fBtn.getAttribute("data-ferpa-mode") === "encrypted";
        recalculateTtlAndFerpa();
      });
    });
    document.getElementById("piiName").addEventListener("input", recalculateTtlAndFerpa);
    document.getElementById("piiDistrictId").addEventListener("input", recalculateTtlAndFerpa);
    document.getElementById("btnExportFerpaJson").addEventListener("click", exportFerpaReportJson);

    // Binary SCORM 1.2 .ZIP Export Buttons
    document.getElementById("btnExportScormZip").addEventListener("click", runBinaryScormZipExport);
    document.getElementById("btnTopExportScormZip").addEventListener("click", runBinaryScormZipExport);

    // Paywall & Invoice Modal Controls
    document.getElementById("btnOpenPaywall").addEventListener("click", () => openPaywallModal(false));
    document.getElementById("btnOpenInvoiceModal").addEventListener("click", () => openPaywallModal(true));
    document.getElementById("btnClosePaywall").addEventListener("click", closePaywallModal);
    document.getElementById("modalPaywall").addEventListener("click", (ev) => {
      if (ev.target.id === "modalPaywall") closePaywallModal();
    });
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") closePaywallModal();
    });

    document.getElementById("licenseKeyForm").addEventListener("submit", handleLicenseActivation);
    document.getElementById("invoiceForm").addEventListener("submit", handleInvoiceGeneration);
    document.getElementById("btnPrintInvoice").addEventListener("click", () => window.print());

    // 3-Click Proof Ribbon Buttons
    document.getElementById("downloadManifest").addEventListener("click", () => {
      const xml = document.getElementById("manifestXmlPreviewCode").textContent;
      downloadFile("imsmanifest.xml", new Blob([xml], { type: "application/xml" }));
      window.dispatchEvent(new CustomEvent("cf:workflow", { detail: { stage: "export_ready" } }));
    });
    window.addEventListener("cf:open-step", event => {
      if ([1, 2, 3].includes(event.detail.step)) showStep(event.detail.step, true);
    });
    showStep(2);
    renderAll();
    recalculateTtlAndFerpa();
  });
})();
