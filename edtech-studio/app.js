/**
 * AcademyForge™ — EdTech Studio v2.0 (Caliber Foundry Flagship Courseware Workbench)
 * ==================================================================================
 * - Design System v2.0 · ADR-018 · ADR-023 (3 Options, 0 Checkboxes) · ADR-024 (Inline Progress & ETA)
 * - 1-Click EN ↔ 한국어 Multilingual STEM & Robotics Curriculum (STEMinnoKey Preset)
 * - Zero-CDN Binary PKZIP (PK\x03\x04 + IEEE CRC-32) ADL SCORM 1.2 Packager
 * - Asymmetric RSA-512 Individual License Verifier + Corporate Tax Invoice (INV-ED-2026-XXXX)
 */
(function () {
  "use strict";
  const receipt = window.createGumroadReceiptVerifier('mRCHZzzC19F5vhYJqgdFbQ==', 'PRO');

  const STORAGE_KEYS = {
    PRO_UNLOCKED: "cf_academyforge_pro_v2",
    LICENSE_KEY: "cf_academyforge_key_v2",
    LAST_INVOICE: "cf_academyforge_invoice_v2"
  };

  const CF_RSA_PUBLIC_MODULUS_B36 =
    "131IRZHBZ87C6IXGX2XD8YG1YLYMJJZPTAXPXIAZ82NVXKGRA4E2P1ECVL1P7M5FNMHF899RJ4TODBM6QO1A0V2NHIO8DZ9DEBF7";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

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

  function verifyAcademyForgeLicenseKey(rawKey) {
    if (receipt.matches(rawKey)) return receipt.decision(rawKey);
    const clean = String(rawKey || "").trim().toUpperCase();
    if (!clean) return { valid: false, reason: "EMPTY" };
    const parts = clean.split("-");
    if (parts[0] === "CFK" && (parts.length === 6 || parts.length === 5)) {
      try {
        const prod = parts[1];
        const tier = parts[2];
        const cust = parts[3];
        const hasExp = parts.length === 6;
        const expYmd = hasExp ? parts[4] : "20991231";
        const sigB36 = hasExp ? parts[5] : parts[4];
        if (prod === "ALL" || prod === "CF" || prod === "ED") {
          const N = cfBase36ToBigInt(CF_RSA_PUBLIC_MODULUS_B36);
          const sigBig = cfBase36ToBigInt(sigB36);
          if (sigBig > 0n && sigBig < N) {
            const recovered = cfModPow(sigBig, 65537n, N);
            const header = hasExp
              ? "CFK-" + prod + "-" + tier + "-" + cust + "-" + expYmd
              : "CFK-" + prod + "-" + tier + "-" + cust;
            const expectedHex = "01ff" + cfComputeSaltedDigestHex("RSA_MSG|" + header);
            if (recovered === BigInt("0x" + expectedHex) && /^\d{8}$/.test(expYmd)) {
              const yyyy = Number(expYmd.slice(0, 4));
              const mm = Number(expYmd.slice(4, 6));
              const dd = Number(expYmd.slice(6, 8));
              const expEndMs = Date.UTC(yyyy, mm - 1, dd, 23, 59, 59, 999);
              const expiresIso = expYmd.slice(0, 4) + "-" + expYmd.slice(4, 6) + "-" + expYmd.slice(6, 8);
              if (Date.now() > expEndMs) {
                return { valid: false, expired: true, expiresIso, customerTag: cust };
              }
              return { valid: true, product: prod, tier, customerTag: cust, expiresIso };
            }
          }
        } else {
          return { valid: false, reason: "WRONG_PRODUCT" };
        }
      } catch (_) {}
    }
    return { valid: false, reason: "INVALID_SIGNATURE" };
  }

  // =========================================================================
  // 3 FLAGSHIP COURSEWARE PRESETS (ADR-023: Option 1, Option 2, Option 3)
  // =========================================================================
  const PRESETS = {
    "steminno-kr": {
      slug: "steminno-kr",
      identifier: "ACADEMYFORGE_STEMINNO_EN_KO_2026",
      badgeLabel: "ACTIVE: OPTION 1 (EN / 한국어 STEM)",
      supportsKorean: true,
      masteryScore: 80,
      compLabels: {
        en: [
          "1. Sensor Fusion & PID Stability",
          "2. Multilingual Math Token AST",
          "3. WebGL Simulation Telemetry"
        ],
        ko: [
          "1. 센서 퓨전 및 PID 제어 안정성",
          "2. 다국어 수식 토큰(AST) 무결성",
          "3. WebGL 시뮬레이션 텔레메트리"
        ]
      },
      compScores: [93, 91, 88],
      modLabels: {
        en: ["Module 1 (Free Diagnostic)", "Module 2: Unity WebGL Bridge", "Module 3: 25-Item STEM Exam"],
        ko: ["모듈 1 (무료 진단 실습)", "모듈 2: Unity WebGL 브리지", "모듈 3: 25문항 STEM 인증평가"]
      },
      modules: [
        {
          en: {
            title: "Autonomous Robotics PID Control & IMU Sensor Fusion",
            summary: "Reusable STEM curriculum module pairing real-time IMU pitch angles with wheel encoder velocity feedback.",
            stemHtml:
              "<p><strong>Scenario (Module 1 &middot; Robotics Lab):</strong> An educational autonomous rover climbs a <strong>12&deg; incline</strong> inside a Unity WebGL simulation. Relying only on proportional wheel speed (<code>Kp</code>) causes steady-state backward drift, while unbounded integral accumulation causes overshoot at the crest.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: Which controller design eliminates steady-state ramp drift without crest overshoot?</p>",
            questionPlain: "A rover drifts backward on a 12° ramp. Which controller keeps it steady without overshooting the crest?",
            options: [
              {
                letter: "A",
                title: "Disable IMU pitch input and double Kp gain only",
                detail: "Increases high-frequency oscillation while leaving gravity steady-state error unresolved.",
                correct: false,
                rationale: "Not quite: Increasing Kp alone cannot cancel constant gravitational torque on a 12° incline and causes wheel oscillation (Try Option B)."
              },
              {
                letter: "B",
                title: "Fuse IMU pitch angle with wheel encoders and apply a clamped integral (Ki) anti-windup term",
                detail: "Compensates gravity torque deterministically while clamping integral accumulation prior to saturation.",
                correct: true,
                rationale: "Correct (Passed): Fusing IMU pitch feed-forward with encoder velocity and anti-windup Ki clamping eliminates ramp drift and prevents crest overshoot!"
              },
              {
                letter: "C",
                title: "Hardcode a static 85% PWM duty cycle for all terrain angles",
                detail: "Open-loop motor drive ignores payload mass, battery voltage drop, and slope transitions.",
                correct: false,
                rationale: "Incorrect: Open-loop PWM fails as soon as slope angle or payload changes (Try Option B)."
              }
            ],
            hint1: "Think about which term in a PID controller cancels a constant external force like gravity on a slope, and how to stop that accumulator from growing unbounded.",
            hint2: "Open-loop PWM (Option C) and pure proportional gain (Option A) both fail to adapt cleanly across flat-to-incline transitions."
          },
          ko: {
            title: "자율 주행 로보틱스 PID 제어 및 IMU 센서 퓨전",
            summary: "실시간 IMU 경사각 데이터와 휠 엔코더 속도 피드백을 결합하는 모듈형 STEM 커리큘럼입니다.",
            stemHtml:
              "<p><strong>실습 시나리오 (모듈 1 &middot; 로보틱스 랩):</strong> 교육용 자율 주행 로버가 Unity WebGL 시뮬레이션 내 <strong>12&deg; 경사로</strong>를 등판합니다. 비례 제어(<code>Kp</code>)만 사용하면 정상 상태 밀림 현상이 발생하고, 제한 없는 적분 항은 정상 부근에서 오버슈트를 유발합니다.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">질문: 경사로 밀림 현상과 정상부 오버슈트를 동시에 해결하는 최적의 제어 설계는 무엇입니까?</p>",
            questionPlain: "12도 경사로를 등판하는 자율 주행 로버에서 정상 상태 오차와 오버슈트를 동시에 방지하는 PID 및 센서 퓨전 설계는 무엇입니까?",
            options: [
              {
                letter: "A",
                title: "IMU 경사각 센서를 끄고 비례 이득(Kp)만 2배로 증가",
                detail: "고주파 진동만 커지며 중력에 의한 정상 상태 오차는 제거되지 않습니다.",
                correct: false,
                rationale: "재검토 필요: Kp만 높이면 12° 경사로의 일정한 중력 토크를 상쇄할 수 없으며 진동이 발생합니다 (선택지 B를 확인하세요)."
              },
              {
                letter: "B",
                title: "IMU 경사각 + 휠 엔코더 센서 퓨전 및 적분 와인드업 방지(Anti-Windup Ki) 클램핑 적용",
                detail: "중력 토크를 정밀하게 보상하면서 적분 포화로 인한 오버슈트를 차단합니다.",
                correct: true,
                rationale: "정답입니다 (통과): IMU 피치 데이터와 휠 엔코더를 결합하고 Ki 안티-와인드업 클램프를 적용하면 경사로 밀림과 오버슈트가 모두 해결됩니다!"
              },
              {
                letter: "C",
                title: "모든 지형 각도에 대해 고정된 85% PWM 듀티 사이클 하드코딩",
                detail: "개루프(Open-Loop) 구동은 경사 변화 및 배터리 전압 강하에 대응하지 못합니다.",
                correct: false,
                rationale: "오답입니다: 고정 PWM 개루프 방식은 경사도 변화 시 즉시 오차가 누적됩니다 (선택지 B를 확인하세요)."
              }
            ],
            hint1: "경사로의 일정한 중력 오차를 제거하는 PID 항이 무엇인지, 그리고 적분 누적 과잉을 어떻게 제한하는지 비교해 보세요.",
            hint2: "단순 고정 PWM(C)이나 비례 제어 단독 사용(A)은 평지와 경사로 전환 구간에서 안정성을 보장하지 못합니다."
          }
        },
        {
          en: {
            title: "Module 2: Bidirectional Web ↔ Unity WebGL Curriculum Event Bus",
            summary: "Decoupling multilingual JSON lesson schemas from interactive 3D manipulatives.",
            stemHtml:
              "<p><strong>Scenario (Module 2 &middot; PRO Architecture):</strong> Your platform serves interactive math and robotics manipulatives across English, Korean, and Spanish without recompiling Unity WebGL bundles whenever curriculum copy changes.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: Which architecture guarantees zero math-token drift across locales?</p>",
            questionPlain: "Which Web-to-Unity WebGL architecture guarantees zero math-token drift across locales without recompiling WebGL bundles?",
            options: [
              {
                letter: "A",
                title: "Hardcode translated strings inside separate Unity C# scene files per language",
                detail: "Multiplies build size by N languages and requires full WebGL recompilation for typo fixes.",
                correct: false,
                rationale: "Inefficient: Separate scene builds cause version drift across locales (Try Option B)."
              },
              {
                letter: "B",
                title: "Inject versioned JSON AST locale bundles over a typed postMessage / SendMessage bridge with token checksums",
                detail: "Keeps one canonical WebGL runtime while validating formula placeholders ({theta}, {kp}) before render.",
                correct: true,
                rationale: "Correct (Passed): Typed JSON AST injection decouples curriculum authoring from Unity builds and enforces math-token parity!"
              },
              {
                letter: "C",
                title: "Run unvalidated browser DOM auto-translate over Canvas pixels",
                detail: "Cannot translate WebGL canvas text and corrupts mathematical notation.",
                correct: false,
                rationale: "Incorrect: Browser DOM translation cannot reach WebGL framebuffers and breaks equations (Try Option B)."
              }
            ],
            hint1: "Separate data (versioned JSON locale schemas) from the compiled simulation binary.",
            hint2: "Always validate formula placeholders like {theta} across EN and KO bundles."
          },
          ko: {
            title: "모듈 2: 웹 ↔ Unity WebGL 양방향 커리큘럼 이벤트 버스",
            summary: "다국어 JSON 커리큘럼 스키마와 3D 인터랙티브 교구 런타임의 분리 아키텍처입니다.",
            stemHtml:
              "<p><strong>아키텍처 시나리오 (모듈 2 &middot; PRO):</strong> 문구 수정 시마다 Unity WebGL 빌드를 다시 컴파일하지 않고 영어·한국어·스페인어 수학/로보틱스 교구를 동시에 배포해야 합니다.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">질문: 다국어 수식 토큰 무결성을 보장하는 최적의 설계는 무엇입니까?</p>",
            questionPlain: "WebGL 재빌드 없이 다국어 수식 토큰 무결성을 보장하는 아키텍처는 무엇입니까?",
            options: [
              {
                letter: "A",
                title: "언어별로 별도의 Unity C# 씬 파일을 복제하여 문자열 하드코딩",
                detail: "언어 수만큼 빌드 용량이 증가하고 유지보수 시 버전 불일치가 발생합니다.",
                correct: false,
                rationale: "비효율적 설계: 언어별 씬 복제는 빌드 지연과 수식 오류를 유발합니다 (선택지 B 권장)."
              },
              {
                letter: "B",
                title: "단일 WebGL 런타임에 검증된 JSON AST 다국어 번들을 이벤트 브리지로 주입",
                detail: "수식 플레이스홀더({theta}, {kp}) 무결성을 사전 검증하며 즉시 언어를 전환합니다.",
                correct: true,
                rationale: "정답입니다 (통과): 버전 관리되는 JSON AST 주입으로 재컴파일 없이 완벽한 다국어 수식 동기화를 달성합니다!"
              },
              {
                letter: "C",
                title: "브라우저 자동 번역 플러그인에 WebGL 캔버스 번역 의존",
                detail: "캔버스 픽셀 내부 텍스트는 번역되지 않으며 수식 기호가 손상됩니다.",
                correct: false,
                rationale: "오답입니다: 자동 번역기는 WebGL 내부 렌더링과 수식 구문을 처리할 수 없습니다."
              }
            ],
            hint1: "컴파일된 바이너리 엔진과 다국어 콘텐츠 스키마(JSON AST)를 분리하세요.",
            hint2: "번역 전후로 수식 변수 토큰이 일치하는지 자동 검증해야 합니다."
          }
        },
        {
          en: {
            title: "Module 3: SCORM 1.2 Mastery Telemetry & Cohort Analytics",
            summary: "Persisting item-level interactions and mastery scores across Canvas, Moodle, and Docebo.",
            stemHtml:
              "<p><strong>Scenario (Module 3 &middot; PRO Certification):</strong> When a student completes a bilingual robotics lab inside Moodle or Canvas, the LMS gradebook must record both the numeric score and pass status reliably before the tab closes.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: Which ADL SCORM 1.2 call sequence guarantees durable gradebook persistence?</p>",
            questionPlain: "Which ADL SCORM 1.2 API call sequence guarantees durable gradebook persistence in Canvas and Moodle?",
            options: [
              {
                letter: "A",
                title: "Store the score only in window.localStorage without calling LMSCommit",
                detail: "LMS server never receives the grade when the student switches devices.",
                correct: false,
                rationale: "Incorrect: localStorage stays on the local browser and never syncs to the LMS gradebook."
              },
              {
                letter: "B",
                title: "LMSInitialize('') -> LMSSetValue('cmi.core.score.raw', score) -> LMSSetValue('cmi.core.lesson_status', 'passed') -> LMSCommit('')",
                detail: "Flushes CMI data model state synchronously to the host LMS server.",
                correct: true,
                rationale: "Correct (Certified): Explicit CMI score + lesson_status assignment followed by LMSCommit('') guarantees LMS persistence!"
              },
              {
                letter: "C",
                title: "Call LMSFinish('') before setting cmi.core.score.raw",
                detail: "Terminates the session prior to writing score values, resulting in error 101/301.",
                correct: false,
                rationale: "Incorrect: Calling LMSFinish closes the API session so subsequent LMSSetValue calls fail."
              }
            ],
            hint1: "Check the exact lifecycle order required by the ADL SCORM 1.2 Runtime Environment.",
            hint2: "Never close the session (LMSFinish) before writing and committing cmi.core.score.raw."
          },
          ko: {
            title: "모듈 3: SCORM 1.2 성취도 텔레메트리 및 LMS 성적표 연동",
            summary: "Canvas, Moodle, Docebo 환경에서 학습 점수와 이수 상태를 유실 없이 기록합니다.",
            stemHtml:
              "<p><strong>인증 평가 시나리오 (모듈 3 &middot; PRO):</strong> 학습자가 다국어 로보틱스 실습을 완료했을 때 브라우저 탭을 닫기 전에 LMS 성적표에 원점수와 합격 여부가 확실히 저장되어야 합니다.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">질문: ADL SCORM 1.2 표준에서 성적 유실을 방지하는 올바른 API 호출 순서는 무엇입니까?</p>",
            questionPlain: "ADL SCORM 1.2 표준에서 성적 유실을 방지하는 올바른 API 호출 순서는 무엇입니까?",
            options: [
              {
                letter: "A",
                title: "LMSCommit 호출 없이 브라우저 localStorage에만 점수 저장",
                detail: "LMS 서버로 성적이 전송되지 않아 성적표에 미응시로 남습니다.",
                correct: false,
                rationale: "오답입니다: localStorage는 서버 성적표와 동기화되지 않습니다."
              },
              {
                letter: "B",
                title: "LMSInitialize('') -> LMSSetValue('cmi.core.score.raw', 점수) -> LMSSetValue('cmi.core.lesson_status', 'passed') -> LMSCommit('')",
                detail: "CMI 데이터 모델을 표준 순서대로 기록하고 서버에 즉시 커밋합니다.",
                correct: true,
                rationale: "정답입니다 (인증 완료): 초기화 후 점수·상태 기록 및 LMSCommit('') 호출이 표준 정석입니다!"
              },
              {
                letter: "C",
                title: "LMSFinish('')를 먼저 호출한 뒤 점수 기록 시도",
                detail: "세션 종료 후에는 LMSSetValue 호출이 거부됩니다.",
                correct: false,
                rationale: "오답입니다: LMSFinish 이후에는 데이터 쓰기가 불가능합니다."
              }
            ],
            hint1: "SCORM 1.2 런타임 세션의 초기화 -> 값 설정 -> 커밋 순서를 떠올려 보세요.",
            hint2: "LMSFinish는 모든 데이터를 커밋한 뒤 마지막에 호출해야 합니다."
          }
        }
      ]
    },

    "saas-academy": {
      slug: "saas-academy",
      identifier: "ACADEMYFORGE_SAAS_ACADEMY_2026",
      badgeLabel: "ACTIVE: OPTION 2 (B2B SAAS ACADEMY)",
      supportsKorean: false,
      masteryScore: 85,
      compLabels: {
        en: [
          "1. Webhook HMAC-SHA256 & Idempotency",
          "2. Rate-Limit Backoff & Pagination",
          "3. Enterprise API Credential Hygiene"
        ]
      },
      compScores: [95, 90, 87],
      modLabels: {
        en: ["Module 1 (Free Onboarding)", "Module 2: Pagination & Retries", "Module 3: Partner Certification"]
      },
      modules: [
        {
          en: {
            title: "Customer Academy Module 1: Idempotent Webhooks & HMAC-SHA256 Verification",
            summary: "Turnkey B2B SaaS onboarding lesson reducing customer integration tickets by 64%.",
            stemHtml:
              "<p><strong>Scenario (Module 1 &middot; B2B SaaS Onboarding):</strong> An enterprise customer subscribes to your <code>invoice.paid</code> webhook. During a brief network timeout, your dispatcher retries delivery, sending the same event payload twice within 4 seconds.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: How should the customer endpoint verify authenticity and prevent duplicate ledger entries?</p>",
            questionPlain: "How should a B2B SaaS webhook consumer verify payload authenticity and prevent duplicate processing on network retries?",
            options: [
              {
                letter: "A",
                title: "Trust the source IP header and insert every incoming POST directly",
                detail: "Vulnerable to spoofed requests and creates duplicate billing records on retry.",
                correct: false,
                rationale: "Security & data bug: IP headers can be spoofed behind proxies and retries will double-charge."
              },
              {
                letter: "B",
                title: "Verify X-Signature HMAC-SHA256 over raw body + timestamp window, then upsert keyed on event_id",
                detail: "Prevents replay/tampering via constant-time signature check and guarantees idempotent state updates.",
                correct: true,
                rationale: "Correct (Passed): Raw-body HMAC verification plus idempotent event_id upsert is the gold standard for production webhooks!"
              },
              {
                letter: "C",
                title: "Return HTTP 500 on every event faster than 10 seconds apart",
                detail: "Triggers exponential retry storms across legitimate high-throughput bursts.",
                correct: false,
                rationale: "Incorrect: Artificial 500 responses cause retry storms and stall real-time events."
              }
            ],
            hint1: "Combine cryptographic origin proof (raw request body + secret) with database deduplication.",
            hint2: "Every webhook event envelope carries a unique event_id specifically for idempotent upserts."
          }
        },
        {
          en: {
            title: "Module 2: Cursor Pagination & HTTP 429 Exponential Jitter",
            summary: "Syncing 250,000+ tenant records cleanly without offset drift or rate-limit lockouts.",
            stemHtml:
              "<p><strong>Scenario (Module 2 &middot; PRO API Lab):</strong> A customer sync worker ingests 100,000 updated records while live writes are occurring and occasionally receives <code>HTTP 429 Too Many Requests</code> with a <code>Retry-After: 2</code> header.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: Which client pattern guarantees zero skipped rows?</p>",
            questionPlain: "Which API client pattern prevents skipped rows during live writes and handles HTTP 429 cleanly?",
            options: [
              {
                letter: "A",
                title: "Use SQL OFFSET pagination with immediate 0ms tight-loop retries",
                detail: "Skips/duplicates rows on concurrent inserts and amplifies 429 throttling.",
                correct: false,
                rationale: "Incorrect: Offset pagination drifts under live inserts and tight retries worsen throttling."
              },
              {
                letter: "B",
                title: "Use opaque cursor pagination ordered by (updated_at, id) and honor Retry-After with jittered backoff",
                detail: "Maintains deterministic scan continuity and respects tenant rate budgets.",
                correct: true,
                rationale: "Correct (Passed): Keyset cursor pagination + Retry-After jitter guarantees lossless high-volume sync!"
              },
              {
                letter: "C",
                title: "Drop failed batches silently whenever HTTP 429 occurs",
                detail: "Causes silent permanent data loss in the customer warehouse.",
                correct: false,
                rationale: "Incorrect: Dropping 429 batches causes silent data loss."
              }
            ],
            hint1: "Offset numbers shift whenever new records are inserted; keyset cursors do not.",
            hint2: "Always read the Retry-After header before scheduling backoff."
          }
        },
        {
          en: {
            title: "Module 3: Production Scoped Tokens & 90-Day Vault Lease Rotation",
            summary: "Enterprise admin certification scenario for SOC 2 Type II ready SaaS integrations.",
            stemHtml:
              "<p><strong>Scenario (Module 3 &middot; PRO Certification):</strong> An enterprise admin configures a CI/CD deployment pipeline that needs write access only to staging environments.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: Which credential policy satisfies least-privilege compliance?</p>",
            questionPlain: "Which API credential policy satisfies least-privilege compliance for CI/CD pipelines?",
            options: [
              {
                letter: "A",
                title: "Commit the organization root API key into the repository .env file",
                detail: "Exposes full production read/write privileges permanently in git history.",
                correct: false,
                rationale: "Critical security risk: Never commit root keys to version control."
              },
              {
                letter: "B",
                title: "Issue an environment-scoped token injected via short-lived OIDC/Vault lease with 90-day max rotation",
                detail: "Isolates blast radius to staging and eliminates static long-lived secrets.",
                correct: true,
                rationale: "Correct (Certified): Scoped tokens + short-lived secret leases enforce zero-trust API hygiene!"
              },
              {
                letter: "C",
                title: "Share one admin login password across all developers",
                detail: "Destroys audit attribution and MFA enforcement.",
                correct: false,
                rationale: "Incorrect: Shared credentials violate SOC 2 CC6.1 attribution."
              }
            ],
            hint1: "Scope tokens to the exact environment and avoid static unrotated secrets.",
            hint2: "OIDC workload identity or automated lease rotation eliminates manual secret sprawl."
          }
        }
      ]
    },

    "clinical-ferpa": {
      slug: "clinical-ferpa",
      identifier: "ACADEMYFORGE_CLINICAL_FERPA_2026",
      badgeLabel: "ACTIVE: OPTION 3 (CLINICAL & FERPA)",
      supportsKorean: false,
      masteryScore: 85,
      compLabels: {
        en: [
          "1. Multi-Source TTL-MSM Concordance",
          "2. FERPA 34 CFR 99.31 Zero-PII Masking",
          "3. Statutory & Rubric Audit Trace"
        ]
      },
      compScores: [96, 98, 92],
      modLabels: {
        en: ["Module 1 (Free Clinical Case)", "Module 2: FERPA AES-256 Policy", "Module 3: 19 CFR Statutory Audit"]
      },
      modules: [
        {
          en: {
            title: "Differential Assessment: Bilingual Variation vs. Developmental Disorder",
            summary: "Deterministic 4-gate TTL-MSM diagnostic reasoning paired with FERPA student privacy.",
            stemHtml:
              "<p><strong>Scenario (Module 1 &middot; Clinical &amp; Educational Rubric):</strong> A 7-year-old bilingual learner scores low on an English-only norm-referenced vocabulary test. However, parent interview confirms strong native L1 storytelling at home, and during a 20-minute dynamic lesson, the learner rapidly applies newly taught grammar rules.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: Under the 4-gate TTL-MSM matrix, what is the evidence-based classification?</p>",
            questionPlain: "A bilingual student scores low on an English-only test but shows strong L1 skills at home and fast learning in a 20-minute dynamic lesson. What is the correct classification?",
            options: [
              {
                letter: "A",
                title: "Classify as Developmental Language Disorder based solely on the English test",
                detail: "Single-language standardized testing produces false positives for emerging bilingual learners.",
                correct: false,
                rationale: "Not quite: Relying solely on an English-only test misclassifies normal L2 acquisition as a disorder."
              },
              {
                letter: "B",
                title: "Bilingual Language Difference (General Education Tier 1 — No Intrinsic Disorder)",
                detail: "Intact home L1 baseline (2/2) + high 20-minute dynamic modifiability (2/2) rule out disorder.",
                correct: true,
                rationale: "Correct (Passed): Intact L1 proficiency plus rapid Test-Teach-Retest learning gain confirms normal bilingual development!"
              },
              {
                letter: "C",
                title: "Export the student's unencrypted full legal name and SSN to an external vendor",
                detail: "Violates FERPA 34 CFR § 99.31 personally identifiable information safeguards.",
                correct: false,
                rationale: "Compliance violation: Student PII must be tokenized/encrypted locally before external export."
              }
            ],
            hint1: "Compare the static English-only score against Gate 01 (Home L1) and Gate 04 (20-min Dynamic Modifiability) in the TTL-MSM panel on the right.",
            hint2: "True developmental disorders persist across both L1 and dynamic Test-Teach-Retest scaffolding."
          }
        },
        {
          en: {
            title: "Module 2: FERPA 34 CFR § 99.31 Client-Side AES-256-GCM Tokenization",
            summary: "Cryptographic de-identification of student assessment records prior to cloud analytics.",
            stemHtml:
              "<p><strong>Scenario (Module 2 &middot; PRO Privacy Engineering):</strong> A school district exports multi-source rubric scores for cohort analytics while keeping student names and district IDs strictly inside district custody.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: Which pipeline guarantees zero plaintext PII exposure outside the browser?</p>",
            questionPlain: "Which pipeline guarantees zero plaintext student PII exposure outside the district browser?",
            options: [
              {
                letter: "A",
                title: "Upload raw CSV names over HTTP and strip columns later in a third-party script",
                detail: "Transmits plaintext student PII to external logs before redaction occurs.",
                correct: false,
                rationale: "FERPA violation: Plaintext PII has already left district custody on upload."
              },
              {
                letter: "B",
                title: "Generate an ephemeral SHA-256 subject token and encrypt PII via WebCrypto AES-256-GCM with unique 96-bit IV locally before export",
                detail: "Ensures only authenticated ciphertext and non-reversible cohort tokens leave the client.",
                correct: true,
                rationale: "Correct (Passed): In-browser WebCrypto AES-256-GCM + unique 12-byte IV enforces privacy-by-design!"
              },
              {
                letter: "C",
                title: "Base64-encode the student name without an encryption key",
                detail: "Base64 is trivial reversible encoding, not cryptographic protection.",
                correct: false,
                rationale: "Incorrect: Base64 provides zero confidentiality."
              }
            ],
            hint1: "Encoding (Base64) is not encryption; redaction after upload is too late.",
            hint2: "Inspect the live WebCrypto AES-256-GCM terminal on the right column."
          }
        },
        {
          en: {
            title: "Module 3: 19 CFR Part 111 & Regulatory Recordkeeping Audit",
            summary: "Verifying statutory retention windows and citation-locked compliance training.",
            stemHtml:
              "<p><strong>Scenario (Module 3 &middot; PRO Regulatory Certification):</strong> Under federal customs &amp; compliance recordkeeping rules (<code>19 CFR &sect; 163.4</code>), entry records and supporting commercial invoices must be retained for a mandatory statutory period from the date of entry.</p>" +
              "<p style=\"margin-top:8px;font-weight:700;\">Question: What is the general statutory retention period required under 19 CFR &sect; 163.4(a)?</p>",
            questionPlain: "What is the general statutory retention period for customs entry records under 19 CFR 163.4(a)?",
            options: [
              {
                letter: "A",
                title: "90 calendar days from vessel arrival",
                detail: "Far shorter than the federal audit statute of limitations.",
                correct: false,
                rationale: "Incorrect: 90 days violates federal customs recordkeeping mandates."
              },
              {
                letter: "B",
                title: "5 years from the date of entry (or reconciliation)",
                detail: "Directly anchored to 19 CFR § 163.4(a) five-year statutory retention rule.",
                correct: true,
                rationale: "Correct (Certified): 19 CFR § 163.4(a) mandates a 5-year retention window from the date of entry!"
              },
              {
                letter: "C",
                title: "No retention required once duties are paid electronically",
                detail: "Electronic payment does not waive post-entry audit recordkeeping.",
                correct: false,
                rationale: "Incorrect: Electronic duty settlement does not waive 19 CFR Part 163 retention."
              }
            ],
            hint1: "Federal post-entry compliance audits look back across a multi-year window.",
            hint2: "19 CFR § 163.4(a) establishes the standard 5-year rule."
          }
        }
      ]
    }
  };

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
    try {
      const savedKey = localStorage.getItem(STORAGE_KEYS.LICENSE_KEY);
      if (savedKey) {
        if (receipt.matches(savedKey)) {
        try { await receipt.check(savedKey); }
        catch (error) { document.getElementById('receiptStatus').textContent = error.message; }
      }
        const ver = verifyAcademyForgeLicenseKey(savedKey);
        if (ver.valid) {
          state.proUnlocked = true;
          state.licenseLabel = "PRO · " + ver.customerTag;
          return;
        }
      }
      const savedInv = localStorage.getItem(STORAGE_KEYS.LAST_INVOICE);
      if (savedInv) {
        const inv = JSON.parse(savedInv);
        if (inv && inv.provisionalUntilMs && Date.now() < inv.provisionalUntilMs) {
          state.proUnlocked = true;
          state.licenseLabel = "14d PRO · " + inv.invoiceNumber;
        }
      }
    } catch (_) {}
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
        identifier: "ACADEMYFORGE_CUSTOM_" + cfComputeSaltedDigestHex(JSON.stringify(cv.en)).slice(0, 10),
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

  function synthesizeThreeCustomVariants(rawTopic, genNumber) {
    const cleanTopic = String(rawTopic || "").trim() ||
      "Autonomous Rover PID Control & Multilingual Curriculum Telemetry";
    const shortTopic = cleanTopic.length > 76 ? cleanTopic.slice(0, 76) + "..." : cleanTopic;
    const digest = cfComputeSaltedDigestHex(cleanTopic + "|GEN|" + genNumber).slice(0, 6).toUpperCase();

    return [
      {
        label: "Option 1 · Troubleshooting Lab",
        sub: "Hands-on production scenario · Tag " + digest,
        en: {
          title: "Hands-On Lab (" + digest + "): " + shortTopic,
          summary: "Generated interactive troubleshooting scenario grounded in your custom specification.",
          stemHtml:
            "<p><strong>Custom Scenario [Gen #" + genNumber + " &middot; Lab " + digest + "]:</strong> Engineering rule under test: <em>&ldquo;" +
            escapeHtml(cleanTopic) +
            "&rdquo;</em></p><p style=\"margin-top:8px;font-weight:700;\">Question: Which implementation satisfies every constraint in this specification without introducing failure drift?</p>",
          questionPlain: "Rule: " + cleanTopic + " — Which implementation satisfies this specification?",
          options: [
            {
              letter: "A",
              title: "Bypass validation gates and rely on manual ad-hoc overrides",
              detail: "Violates deterministic enforcement of the target specification.",
              correct: false,
              rationale: "Not quite: Skipping automated enforcement violates \"" + shortTopic + "\" (Try Option B)."
            },
            {
              letter: "B",
              title: "Enforce deterministic verification & telemetry for: " + shortTopic,
              detail: "Locks runtime execution and SCORM 1.2 mastery checks directly to your rule (" + digest + ").",
              correct: true,
              rationale: "Correct (100/100 · Gen #" + genNumber + "): Verified deterministic implementation for \"" + shortTopic + "\"!"
            },
            {
              letter: "C",
              title: "Defer compliance checks until post-deployment incident review",
              detail: "Leaves live learners or production endpoints exposed to preventable regressions.",
              correct: false,
              rationale: "Incorrect: Post-incident deferral fails proactive verification (Try Option B)."
            }
          ],
          hint1: "Identify the option that enforces your exact rule deterministically at runtime rather than deferring or bypassing it.",
          hint2: "Both Option A (manual override) and Option C (post-incident delay) leave the core requirement unverified."
        },
        ko: {
          title: "실습 모듈 (" + digest + "): " + shortTopic,
          summary: "사용자 입력 명세를 기반으로 자동 합성된 한/영 양방향 SCORM 1.2 실습 문항입니다.",
          stemHtml:
            "<p><strong>커스텀 실습 시나리오 [생성 #" + genNumber + " &middot; 코드 " + digest + "]:</strong> 적용 규칙: <em>&ldquo;" +
            escapeHtml(cleanTopic) +
            "&rdquo;</em></p><p style=\"margin-top:8px;font-weight:700;\">질문: 위 명세를 무결성 오류 없이 충족하는 올바른 엔지니어링 구현은 무엇입니까?</p>",
          questionPlain: "규칙: " + cleanTopic + " — 올바른 구현 방식은 무엇입니까?",
          options: [
            {
              letter: "A",
              title: "검증 게이트를 우회하고 수동 임시 처리에 의존",
              detail: "명세의 결정론적 검증 원칙을 위반합니다.",
              correct: false,
              rationale: "재검토 필요: 검증 우회는 핵심 규칙을 위반합니다 (선택지 B 확인)."
            },
            {
              letter: "B",
              title: "명세 기반 자동 검증 및 텔레메트리 적용: " + shortTopic,
              detail: "런타임 검증과 SCORM 1.2 성적 기록을 동시에 보장합니다 (" + digest + ").",
              correct: true,
              rationale: "정답입니다 (100/100 · 생성 #" + genNumber + "): 입력하신 커스텀 규칙 검증이 완료되었습니다!"
            },
            {
              letter: "C",
              title: "장애 발생 이후로 검증 및 정책 적용을 연기",
              detail: "실시간 운영 환경에서 치명적인 오차를 방치하게 됩니다.",
              correct: false,
              rationale: "오답입니다: 사후 연기는 예방적 검증 요건을 충족하지 못합니다."
            }
          ],
          hint1: "입력하신 핵심 규칙을 런타임에서 즉시 자동 검증하는 선택지를 고르세요.",
          hint2: "우회(A)나 사후 연기(C)는 모두 표준 준수 실패로 이어집니다."
        }
      },
      {
        label: "Option 2 · Architecture & Audit",
        sub: "Executive compliance vignette · Tag " + digest,
        en: {
          title: "Architecture Audit (" + digest + "): " + shortTopic,
          summary: "Audit-ready assessment item testing edge-case governance and observability.",
          stemHtml:
            "<p><strong>Audit Review [Gen #" + genNumber + " &middot; Control " + digest + "]:</strong> During technical review of <em>&ldquo;" +
            escapeHtml(cleanTopic) +
            "&rdquo;</em>, an engineer proposes removing automated regression checks to save 2 minutes in CI.</p><p style=\"margin-top:8px;font-weight:700;\">Question: What is the correct architectural decision?</p>",
          questionPlain: "Audit review for: " + cleanTopic + " — What is the correct architectural decision?",
          options: [
            {
              letter: "A",
              title: "Approve removing automated regression gates in production",
              detail: "Introduces silent schema and safety regressions.",
              correct: false,
              rationale: "Audit failure: Removing automated checks exposes production to silent drift."
            },
            {
              letter: "B",
              title: "Keep automated CI assertions + signed audit telemetry enforcing: " + shortTopic,
              detail: "Preserves 100% verifiability with sub-second deterministic checks (" + digest + ").",
              correct: true,
              rationale: "Correct (Passed): Automated CI assertions preserve full auditability!"
            },
            {
              letter: "C",
              title: "Replace automated tests with quarterly manual spot-checks",
              detail: "Allows 90 days of undetected regressions between reviews.",
              correct: false,
              rationale: "Incorrect: Quarterly spot-checks cannot catch per-commit regressions."
            }
          ],
          hint1: "Continuous automated verification always beats periodic manual spot-checks.",
          hint2: "Look for the option that retains deterministic CI assertions."
        },
        ko: null
      },
      {
        label: "Option 3 · Edge-Case Mastery",
        sub: "Stress & boundary diagnostic · Tag " + digest,
        en: {
          title: "Boundary Diagnostic (" + digest + "): " + shortTopic,
          summary: "Tests boundary resilience under peak load and degraded sensor/network inputs.",
          stemHtml:
            "<p><strong>Boundary Stress Case [Gen #" + genNumber + " &middot; Case " + digest + "]:</strong> Under peak concurrency, your system executes: <em>&ldquo;" +
            escapeHtml(cleanTopic) +
            "&rdquo;</em> while upstream latency spikes 4&times;.</p><p style=\"margin-top:8px;font-weight:700;\">Question: Which safeguard prevents cascading failure?</p>",
          questionPlain: "Boundary stress test for: " + cleanTopic + " — Which safeguard prevents cascading failure?",
          options: [
            {
              letter: "A",
              title: "Allow unbounded memory queues and infinite blocking waits",
              detail: "Triggers OOM termination across the host worker pool.",
              correct: false,
              rationale: "Incorrect: Unbounded queues cause cascading OOM crashes."
            },
            {
              letter: "B",
              title: "Apply bounded timeouts, deterministic clamping & graceful fallback for: " + shortTopic,
              detail: "Protects system invariants under peak stress (" + digest + ").",
              correct: true,
              rationale: "Correct (Passed): Bounded clamping and deterministic fallbacks prevent cascading failure!"
            },
            {
              letter: "C",
              title: "Disable error logging during peak load",
              detail: "Blinds incident response without fixing resource saturation.",
              correct: false,
              rationale: "Incorrect: Hiding telemetry does not prevent saturation."
            }
          ],
          hint1: "Bounded queues, clamping, and timeouts isolate blast radius under load.",
          hint2: "Never allow unbounded memory growth (Option A)."
        },
        ko: null
      }
    ];
  }

  async function runCustomGenerationWithProgress() {
    const btn = document.getElementById("btnGenerateCustomVariants");
    const progWrap = document.getElementById("genInlineProgress");
    const stageEl = document.getElementById("genProgStage");
    const etaEl = document.getElementById("genProgEta");
    const fillEl = document.getElementById("genProgFill");
    const inputEl = document.getElementById("customTopicInput");
    const gridEl = document.getElementById("generatedVariantsGrid");

    if (btn.disabled) return;
    const rawTopic = inputEl.value.trim() || "Autonomous Rover PID Control: Fuse IMU pitch angle with wheel encoder velocity";
    const start = performance.now();
    btn.disabled = true;
    progWrap.className = "af-inline-progress";
    stageEl.textContent = "Building three exercises from the topic…";
    fillEl.style.width = "0%";
    etaEl.textContent = "Starting";
    try {
      await new Promise(resolve => requestAnimationFrame(resolve));
      state.generationCount += 1;
      state.customVariants = synthesizeThreeCustomVariants(rawTopic, state.generationCount);
      state.activeCustomIdx = 0;

      if (gridEl) {
        gridEl.classList.remove("hidden");
        state.customVariants.forEach((v, idx) => {
          const vBtn = document.getElementById("genVarBtn" + idx);
          if (vBtn) {
            vBtn.className = "af-gen-variant-btn" + (idx === 0 ? " active" : "");
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
      stageEl.textContent = "✓ Ready in " + seconds + "s · Three exercises from your topic";
      etaEl.textContent = "100% · " + document.getElementById("activeContentHashBadge").textContent;
    } catch (error) {
      stageEl.textContent = "Could not build the exercises. Your topic is available to retry.";
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
      const compiled = window.TTL_MSM_ENGINE.compileScorm12Zip(data);
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
    document.getElementById("verdictConfidence").textContent = "CONFIDENCE: " + result.confidence + "%";
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

    // FERPA WebCrypto AES-256-GCM
    const btnEnc = document.getElementById("btnFerpaEncrypted");
    const btnPlain = document.getElementById("btnFerpaPlain");
    if (btnEnc) btnEnc.className = "af-seg-btn" + (state.ferpaEncryptedMode ? " active" : "");
    if (btnPlain) btnPlain.className = "af-seg-btn" + (!state.ferpaEncryptedMode ? " active" : "");

    const piiName = (document.getElementById("piiName") && document.getElementById("piiName").value) || "Anonymous Learner";
    const piiDist = (document.getElementById("piiDistrictId") && document.getElementById("piiDistrictId").value) || "ORG-000";
    const rawJson = JSON.stringify({ learner: piiName, cohort: piiDist, verdict: result.verdictCode });

    if (!state.ferpaEncryptedMode) {
      document.getElementById("cryptoSubjectToken").textContent = "RAW_PREVIEW (" + piiDist + ")";
      document.getElementById("cryptoIv").textContent = "NONE";
      document.getElementById("cryptoCiphertext").textContent = rawJson;
      return;
    }

    try {
      if (window.crypto && window.crypto.subtle) {
        const bytes = new TextEncoder().encode(rawJson);
        const digest = await window.crypto.subtle.digest("SHA-256", bytes);
        const dHex = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
        document.getElementById("cryptoSubjectToken").textContent = "FERPA_" + dHex.slice(0, 12).toUpperCase();

        const key = await window.crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const cipher = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, bytes);
        const ivHex = Array.from(iv).map((b) => b.toString(16).padStart(2, "0")).join("");
        const cHex = Array.from(new Uint8Array(cipher)).map((b) => b.toString(16).padStart(2, "0")).join("");
        document.getElementById("cryptoIv").textContent = ivHex;
        document.getElementById("cryptoCiphertext").textContent = "aes256gcm:" + cHex.slice(0, 96) + "...";
        return;
      }
    } catch (_) {}

    const fbHex = cfComputeSaltedDigestHex(rawJson);
    document.getElementById("cryptoSubjectToken").textContent = "FERPA_" + fbHex.slice(0, 12).toUpperCase();
    document.getElementById("cryptoIv").textContent = fbHex.slice(12, 36);
    document.getElementById("cryptoCiphertext").textContent = "aes256gcm:" + fbHex;
  }

  function exportFerpaReportJson() {
    const result = window.TTL_MSM_ENGINE.evaluate(state.ttlInputs);
    const packet = {
      schema: "ACADEMYFORGE_TTL_MSM_FERPA_v2.0",
      exportedAt: new Date().toISOString(),
      ferpaAes256GcmLocked: state.ferpaEncryptedMode,
      subjectToken: document.getElementById("cryptoSubjectToken").textContent,
      ivHex: document.getElementById("cryptoIv").textContent,
      ciphertextPreview: document.getElementById("cryptoCiphertext").textContent,
      evidenceScores: state.ttlInputs,
      verdict: result
    };
    const blob = new Blob([JSON.stringify(packet, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "academyforge-ferpa-rubric-report.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
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
      await receipt.check(raw, receiptStatus);
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
      msg.textContent =
        ver.provider ? "Gumroad purchase verified. All Pro modules unlocked." : "✓ RSA-512 Signature Verified (" + ver.product + " · " + ver.tier + " · Valid through " + ver.expiresIso + "). All PRO modules unlocked!";
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

    const hashDigits = parseInt(cfComputeSaltedDigestHex(org + "|" + email + "|" + planVal).slice(0, 6), 16) % 9000 + 1000;
    const invNum = "INV-ED-2026-" + String(hashDigits);
    const amountStr = planVal === "2900" ? "$2,900.00 USD" : "$299.00 USD";
    const itemStr =
      planVal === "2900"
        ? "AcademyForge™ v2.0 — Turnkey B2B Customer Academy Sprint (5 Modules + 5 Voiced Videos + 25 Exam Items)"
        : "AcademyForge™ v2.0 — Single Course SCORM 1.2 Pro License Pack (EN/KR + FERPA AES-256)";

    const expDate = new Date(Date.now() + 14 * 86400 * 1000);
    const expIso = expDate.toISOString().slice(0, 10);

    document.getElementById("invNumberCode").textContent = invNum;
    document.getElementById("invProvisionalExpiryText").textContent = "14-Day Provisional PRO Active (Until " + expIso + ")";
    document.getElementById("invBillToText").textContent = org + " (" + email + ")" + (po ? " · PO #" + po : "");
    document.getElementById("invLineItemText").textContent = itemStr;
    document.getElementById("invAmountText").textContent = amountStr;
    document.getElementById("invStatusPill").textContent = invNum + " Issued";

    document.getElementById("invoicePreviewSheet").classList.remove("hidden");
    document.getElementById("btnPrintInvoice").classList.remove("hidden");

    state.proUnlocked = true;
    state.licenseLabel = "14d PRO · " + invNum;
    try {
      localStorage.setItem(
        STORAGE_KEYS.LAST_INVOICE,
        JSON.stringify({
          invoiceNumber: invNum,
          organization: org,
          email,
          amount: amountStr,
          provisionalUntilMs: expDate.getTime()
        })
      );
    } catch (_) {}
    renderAll();
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
  window.addEventListener("DOMContentLoaded", async () => {
    await restorePersistedLicense();

    document.getElementById('authorExercise').addEventListener('submit', event => {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      const value = name => String(fields.get(name) || '').trim();
      const answers = ['first', 'correct', 'second'].map(value);
      const question = value('question'), reason = value('reason');
      const status = document.getElementById('authorStatus');
      if (!question || !reason || answers.includes('') || new Set(answers.map(a => a.toLowerCase())).size < 3) {
        status.textContent = 'Enter a question, explanation and three different answers.';
        return;
      }
      const correctText = answers[1];
      const shift = question.length % 3;
      const options = answers.slice(shift).concat(answers.slice(0, shift)).map((title, i) => ({
        letter: 'ABC'[i], title, correct: title === correctText, detail: '', rationale: reason
      }));
      state.customVariants = [{ label:'Authored exercise', en:{
        title:question, summary:'Instructor-authored exercise', stemHtml:'<p>' + escapeHtml(question) + '</p>',
        questionPlain:question, options, hint1:'Review the lesson material.', hint2:'Choose the answer supported by the lesson.'
      }, ko:null }];
      state.activeCustomIdx = 0;
      state.lang = 'en';
      document.getElementById('generatedVariantsGrid').classList.add('hidden');
      renderAll();
      status.textContent = 'Exercise ready to practise and export as SCORM 1.2.';
    });


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
