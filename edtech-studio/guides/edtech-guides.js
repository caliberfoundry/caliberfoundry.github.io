/**
 * Caliber Foundry — EdTech Engineering & Procurement Interactive Engine (PLAN-37)
 * Strict CSP compliant (script-src 'self'), zero inline handlers, deterministic math,
 * ADR-023 3-Option Presets, ADR-024 Inline Progress/ETA, and JSON Specification Export.
 */
(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function fmtInt(n) {
    return Math.round(Number(n) || 0).toLocaleString("en-US");
  }

  function fmtUsd(n) {
    return "$" + Math.round(Number(n) || 0).toLocaleString("en-US");
  }

  function clamp(val, min, max) {
    var num = Number(val);
    if (Number.isNaN(num)) return min;
    return Math.min(max, Math.max(min, num));
  }

  function getNum(id, fallback) {
    var el = document.getElementById(id);
    if (!el) return fallback;
    var v = parseFloat(el.value);
    return Number.isNaN(v) ? fallback : v;
  }

  function getStr(id, fallback) {
    var el = document.getElementById(id);
    return el ? String(el.value) : fallback;
  }

  function setVal(id, val) {
    var el = document.getElementById(id);
    if (!el) return;
    el.value = String(val);
    var out = document.getElementById(id + "Val");
    if (out) out.textContent = String(val);
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = String(text);
  }

  function setStatusPill(id, level, label) {
    var el = document.getElementById(id);
    if (!el) return;
    el.className = "eg-status-pill status-" + level;
    el.textContent = label;
  }

  function renderBreakdownRows(tbodyId, rows) {
    var tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    var html = "";
    for (var i = 0; i < rows.length; i++) {
      html +=
        "<tr><td>" +
        escapeHtml(rows[i].label) +
        "</td><td class=\"val\">" +
        escapeHtml(rows[i].value) +
        "</td></tr>";
    }
    tbody.innerHTML = html;
  }

  /* ========================================================================
     PAGE MODELS: PRESETS + DETERMINISTIC CALCULATORS
     ======================================================================== */
  var PAGE_MODELS = {
    "hub-index": {
      presets: [
        { inpModules: 5, inpQuestions: 25, inpVideos: 5, selCompliance: "scorm", selLocales: "1" },
        { inpModules: 8, inpQuestions: 48, inpVideos: 8, selCompliance: "hecvat-vpat", selLocales: "2" },
        { inpModules: 14, inpQuestions: 90, inpVideos: 12, selCompliance: "full-ada-pdfua", selLocales: "3" }
      ],
      compute: function () {
        var modules = clamp(getNum("inpModules", 5), 1, 60);
        var questions = clamp(getNum("inpQuestions", 25), 5, 400);
        var videos = clamp(getNum("inpVideos", 5), 0, 60);
        var compliance = getStr("selCompliance", "scorm");
        var locales = clamp(parseInt(getStr("selLocales", "1"), 10), 1, 5);

        var baseCourseCost = modules * 380 + questions * 24 + videos * 140;
        var localeMultiplier = 1 + (locales - 1) * 0.34;
        var complianceAddon =
          compliance === "full-ada-pdfua" ? 1450 :
          compliance === "hecvat-vpat" ? 790 : 0;

        var totalEstimate = Math.round(baseCourseCost * localeMultiplier + complianceAddon);
        var deliveryDays = Math.max(4, Math.ceil((modules * 1.1 + videos * 0.45 + questions * 0.06) * (1 + (locales - 1) * 0.25) + (complianceAddon > 0 ? 2 : 0)));
        var selfServeFit = modules <= 5 && locales <= 2 && compliance === "scorm";

        return {
          kpis: [
            { value: fmtUsd(totalEstimate), note: selfServeFit ? "Or $299 self-serve pack" : "Turnkey engineering sprint" },
            { value: deliveryDays + " business days", note: "100% async staging delivery" },
            { value: fmtInt(questions * locales) + " items", note: locales + " locale(s) · 4-choice stems" },
            { value: compliance === "scorm" ? "SCORM 1.2 ZIP" : compliance === "hecvat-vpat" ? "SCORM + HECVAT/VPAT" : "SCORM + ADA + PDF/UA", note: "Verified LMS & procurement pack" }
          ],
          statusLevel: selfServeFit ? "pass" : compliance === "full-ada-pdfua" ? "warn" : "pass",
          statusLabel: selfServeFit ? "FITS $2,900 ACADEMY SPRINT" : "CUSTOM ENTERPRISE SCOPE",
          headline: fmtUsd(totalEstimate) + " · " + deliveryDays + " Days",
          summary:
            modules + " interactive modules, " + questions + " psychometric items, and " + videos +
            " 30s voiced walkthroughs across " + locales + " language(s).",
          rows: [
            { label: "Courseware & SCORM 1.2 Packaging (" + modules + " modules)", value: fmtUsd(modules * 380) },
            { label: "Psychometric Item Bank (" + questions + " calibrated items)", value: fmtUsd(questions * 24) },
            { label: "30fps Voiced Video Walkthroughs (" + videos + " clips)", value: fmtUsd(videos * 140) },
            { label: "Multilingual Adaptation Multiplier (" + locales + "x locale factor)", value: localeMultiplier.toFixed(2) + "x" },
            { label: "Vendor Compliance Dossier Add-On", value: fmtUsd(complianceAddon) }
          ],
          recommendation: selfServeFit
            ? "Recommended route: Start with the $299 AcademyForge self-serve SCORM 1.2 pack or book the $2,900 5-module Customer Academy-in-a-Box sprint."
            : "Recommended route: Combine AcademyForge SCORM 1.2 delivery with DealShield (HECVAT/VPAT 2.5) and DocuShield (ISO 14289-1 PDF/UA) in one staged milestone plan.",
          payload: {
            tool: "Caliber Foundry EdTech Scope Estimator",
            modules: modules,
            questions: questions,
            videos: videos,
            locales: locales,
            complianceTier: compliance,
            estimatedBudgetUsd: totalEstimate,
            estimatedBusinessDays: deliveryDays
          }
        };
      }
    },

    "scorm-1-2": {
      presets: [
        { inpSlides: 18, inpQuestions: 10, inpBookmarkBytes: 28, selEncoding: "compact", selMasteryMode: "passed-incomplete" },
        { inpSlides: 45, inpQuestions: 30, inpBookmarkBytes: 75, selEncoding: "json", selMasteryMode: "completed-passed" },
        { inpSlides: 65, inpQuestions: 45, inpBookmarkBytes: 96, selEncoding: "verbose-json", selMasteryMode: "raw-only" }
      ],
      compute: function () {
        var slides = clamp(getNum("inpSlides", 18), 3, 150);
        var questions = clamp(getNum("inpQuestions", 10), 1, 120);
        var bytesPerItem = clamp(getNum("inpBookmarkBytes", 28), 8, 220);
        var encoding = getStr("selEncoding", "compact");
        var masteryMode = getStr("selMasteryMode", "passed-incomplete");

        var encFactor = encoding === "compact" ? 0.52 : encoding === "json" ? 1.0 : 1.55;
        var baseHeaderChars = encoding === "compact" ? 64 : 180;
        var slideTrackChars = Math.ceil(slides * (encoding === "compact" ? 2.5 : 14));
        var itemTrackChars = Math.ceil(questions * bytesPerItem * encFactor);
        var suspendChars = baseHeaderChars + slideTrackChars + itemTrackChars;
        var spmLimit = 4096;
        var pctUsed = Math.round((suspendChars / spmLimit) * 1000) / 10;
        var remaining = spmLimit - suspendChars;

        var statusRisk = masteryMode === "raw-only" ? 1 : 0;
        var level = "pass";
        var pill = "SAFE · " + pctUsed.toFixed(1) + "% OF 4,096 SPM";
        if (suspendChars > spmLimit) {
          level = "fail";
          pill = "OVERFLOW · LMS ERROR 405 RISK";
        } else if (suspendChars > 3200 || statusRisk) {
          level = "warn";
          pill = statusRisk ? "WARN · STATUS REPORTING TRAP" : "NEAR 4,096-CHAR SPM CEILING";
        }

        var packageBuildUsd = Math.round(299 + Math.max(0, slides - 15) * 22 + questions * 14);

        return {
          kpis: [
            { value: fmtInt(suspendChars) + " / 4,096", note: "cmi.suspend_data chars (" + pctUsed.toFixed(1) + "%)" },
            { value: remaining >= 0 ? "+" + fmtInt(remaining) + " chars" : fmtInt(remaining) + " chars", note: remaining >= 0 ? "Headroom under ADL SPM" : "Exceeds SCORM 1.2 minimum" },
            { value: masteryMode === "passed-incomplete" ? "passed / incomplete" : masteryMode === "completed-passed" ? "completed + score" : "unmapped status", note: "cmi.core.lesson_status pair" },
            { value: fmtUsd(packageBuildUsd), note: "Estimated turnkey SCORM build" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: fmtInt(suspendChars) + " chars (" + pctUsed.toFixed(1) + "% of SPM)",
          summary:
            suspendChars > spmLimit
              ? "Payload exceeds the 4,096-character ADL SCORM 1.2 Smallest Permitted Maximum by " + fmtInt(Math.abs(remaining)) + " characters. Strict LMS runtimes (Moodle, Cornerstone, SuccessFactors) truncate resume state or raise API Error 405."
              : "Payload fits inside the mandatory 4,096-character cmi.suspend_data ceiling with " + fmtInt(remaining) + " characters of safety margin across Moodle, Canvas, Docebo, and TalentLMS.",
          rows: [
            { label: "Envelope & Schema Header (" + encoding + ")", value: fmtInt(baseHeaderChars) + " chars" },
            { label: "Slide Completion Bitmap / Array (" + slides + " screens)", value: fmtInt(slideTrackChars) + " chars" },
            { label: "Quiz Attempt & Rationale State (" + questions + " items)", value: fmtInt(itemTrackChars) + " chars" },
            { label: "ADL SCORM 1.2 SPM Limit (cmi.suspend_data)", value: "4,096 chars" },
            { label: "Turnkey SCORM 1.2 Package Estimate", value: fmtUsd(packageBuildUsd) }
          ],
          recommendation:
            suspendChars > spmLimit
              ? "Switch state serialization to bitpacked/base64 index strings ('Compact Bitpack' option) or split the course into multiple SCOs inside imsmanifest.xml so each SCO stays below 3,200 characters."
              : masteryMode === "raw-only"
              ? "Warning: Writing cmi.core.score.raw without setting cmi.core.lesson_status leaves legacy LMS gradebooks stuck in 'incomplete' or 'browsed'. Pair score writes with 'passed'/'incomplete' and LMSCommit('')."
              : "Architecture ready: Commit state on every question submission via LMSCommit('') and verify imsmanifest.xml + API discovery in AcademyForge.",
          payload: {
            standard: "ADL SCORM 1.2 Run-Time Environment",
            slides: slides,
            questions: questions,
            bytesPerItem: bytesPerItem,
            encoding: encoding,
            masteryMode: masteryMode,
            suspendDataChars: suspendChars,
            spmLimitChars: spmLimit,
            conformanceStatus: level,
            estimatedPackageUsd: packageBuildUsd
          }
        };
      }
    },

    "psychometric-items": {
      presets: [
        { inpGroupSize: 100, inpUpperCorrect: 78, inpLowerCorrect: 42, inpNonFuncDistractors: 0, selStemFlaw: "none" },
        { inpGroupSize: 100, inpUpperCorrect: 94, inpLowerCorrect: 88, inpNonFuncDistractors: 2, selStemFlaw: "all-above" },
        { inpGroupSize: 100, inpUpperCorrect: 36, inpLowerCorrect: 48, inpNonFuncDistractors: 1, selStemFlaw: "negative" }
      ],
      compute: function () {
        var n = clamp(getNum("inpGroupSize", 100), 20, 2000);
        var upper = clamp(getNum("inpUpperCorrect", 78), 0, n);
        var lower = clamp(getNum("inpLowerCorrect", 42), 0, n);
        var nonFunc = clamp(getNum("inpNonFuncDistractors", 0), 0, 3);
        var stemFlaw = getStr("selStemFlaw", "none");

        var pVal = (upper + lower) / (2 * n);
        var dIndex = (upper - lower) / n;
        var flawPenalty = stemFlaw === "none" ? 0 : stemFlaw === "negative" ? 15 : 24;
        var distractorPenalty = nonFunc * 12;
        var qualityScore = clamp(
          Math.round(
            100 -
              (pVal < 0.30 || pVal > 0.88 ? 22 : 0) -
              (dIndex < 0.20 ? 38 : dIndex < 0.30 ? 12 : 0) -
              flawPenalty -
              distractorPenalty
          ),
          0,
          100
        );

        var level = "pass";
        var pill = "RETAIN ITEM · PSYCHOMETRICALLY SOUND";
        if (dIndex < 0 || qualityScore < 55) {
          level = "fail";
          pill = dIndex < 0 ? "REJECT · NEGATIVE DISCRIMINATION" : "REWRITE REQUIRED · FLAWED ITEM";
        } else if (dIndex < 0.25 || nonFunc >= 1 || stemFlaw !== "none" || pVal > 0.88 || pVal < 0.30) {
          level = "warn";
          pill = "REVISE DISTRACTORS OR STEM";
        }

        var difficultyBand =
          pVal > 0.85 ? "Too Easy (p > 0.85)" :
          pVal < 0.30 ? "Too Hard (p < 0.30)" : "Optimal Target (0.30–0.85)";

        return {
          kpis: [
            { value: pVal.toFixed(2), note: difficultyBand },
            { value: (dIndex >= 0 ? "+" : "") + dIndex.toFixed(2), note: "Discrimination D (target >= +0.30)" },
            { value: (3 - nonFunc) + " / 3 active", note: "Distractors selected by >= 5%" },
            { value: qualityScore + " / 100", note: "NBME Item Quality Index" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: "p = " + pVal.toFixed(2) + " · D = " + (dIndex >= 0 ? "+" : "") + dIndex.toFixed(2),
          summary:
            dIndex < 0
              ? "High-scoring examinees missed this item more often than low-scoring examinees (D < 0). Check for a miskeyed answer or an ambiguous double-negative stem."
              : "Item difficulty is " + (pVal * 100).toFixed(1) + "% with upper-lower discrimination D = " + dIndex.toFixed(2) + " and " + nonFunc + " non-functioning distractor(s) (<5% selection rate).",
          rows: [
            { label: "Upper 27% Cohort Correct (U / N)", value: upper + " / " + n + " (" + Math.round((upper / n) * 100) + "%)" },
            { label: "Lower 27% Cohort Correct (L / N)", value: lower + " / " + n + " (" + Math.round((lower / n) * 100) + "%)" },
            { label: "Item Difficulty Index p = (U + L) / 2N", value: pVal.toFixed(3) },
            { label: "Discrimination Index D = (U - L) / N", value: dIndex.toFixed(3) },
            { label: "Construct-Irrelevant Variance Penalty", value: "-" + (flawPenalty + distractorPenalty) + " pts" }
          ],
          recommendation:
            dIndex < 0
              ? "Audit the answer key immediately. Negative discrimination indicates top performers are attracted to a plausible distractor due to an unstated edge case in the stem."
              : nonFunc > 0 || stemFlaw !== "none"
              ? "Replace 'All/None of the above' and implausible distractors (<5% endorsement) with 3-option functional misconceptions grounded in real learner errors (Haladyna & Rodriguez standard)."
              : "Item meets high-stakes certification bank criteria (0.30 <= p <= 0.85, D >= 0.30, zero cueing flaws). Ready for QTI 3.0 / SCORM 1.2 export.",
          payload: {
            standard: "NBME & Psychometric Classical Test Theory (CTT)",
            cohortGroupSize: n,
            upperCorrect: upper,
            lowerCorrect: lower,
            difficultyP: Number(pVal.toFixed(3)),
            discriminationD: Number(dIndex.toFixed(3)),
            nonFunctioningDistractors: nonFunc,
            stemFlaw: stemFlaw,
            itemQualityScore: qualityScore
          }
        };
      }
    },

    "hecvat-vendor": {
      presets: [
        { selDataTier: "pii-ferpa", selSso: "saml-oidc", selEncryption: "both-kms", inpAuditCoverage: 92, inpUnanswered: 4 },
        { selDataTier: "pii-ferpa", selSso: "password-only", selEncryption: "tls-only", inpAuditCoverage: 58, inpUnanswered: 29 },
        { selDataTier: "public-catalog", selSso: "saml-oidc", selEncryption: "both-kms", inpAuditCoverage: 96, inpUnanswered: 2 }
      ],
      compute: function () {
        var dataTier = getStr("selDataTier", "pii-ferpa");
        var sso = getStr("selSso", "saml-oidc");
        var enc = getStr("selEncryption", "both-kms");
        var auditPct = clamp(getNum("inpAuditCoverage", 92), 0, 100);
        var unanswered = clamp(getNum("inpUnanswered", 4), 0, 120);

        var requiredSheet = "HECVAT 4 workbook";
        var ssoPts = sso === "saml-oidc" ? 25 : sso === "oauth-social" ? 14 : 4;
        var encPts = enc === "both-kms" ? 25 : enc === "tls-aes" ? 20 : 6;
        var auditPts = Math.round(auditPct * 0.30);
        var gapPenalty = Math.min(35, unanswered * 1.4);
        var readiness = clamp(Math.round(ssoPts + encPts + auditPts + 20 - gapPenalty), 0, 100);

        var reviewWeeks = Math.max(2, Math.round(10 - readiness * 0.07 + (unanswered > 15 ? 4 : 0)));
        var level = readiness >= 82 && sso === "saml-oidc" && enc !== "tls-only" ? "pass" : readiness >= 60 ? "warn" : "fail";
        var pill =
          level === "pass" ? "READY FOR CISO CAMPUS REVIEW" :
          level === "warn" ? "CONDITIONAL · REQUIRES REMEDIATION PLAN" :
          "HIGH RISK · BLOCKED BY HIGHER-ED IAM/CRYPTO GATE";

        return {
          kpis: [
            { value: readiness + " / 100", note: "Illustrative worksheet index" },
            { value: requiredSheet, note: "Single EDUCAUSE workbook" },
            { value: reviewWeeks + " weeks", note: "Est. university security review" },
            { value: fmtInt(unanswered) + " gaps", note: "Unanchored questionnaire rows" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: readiness + "/100 Readiness · " + requiredSheet,
          summary:
            "Based on " + (dataTier === "public-catalog" ? "non-PII instructional content" : "FERPA student records / institutional PII") +
            ", the procurement team can review " + requiredSheet + " with citation-locked SOC 2 / policy evidence.",
          rows: [
            { label: "Current EDUCAUSE workbook", value: requiredSheet },
            { label: "InCommon / SAML 2.0 / OIDC SSO Posture", value: ssoPts + " / 25 pts" },
            { label: "Transit (TLS 1.3) & At-Rest (AES-256) Controls", value: encPts + " / 25 pts" },
            { label: "Policy & SOC 2 Citation Coverage (" + auditPct + "%)", value: auditPts + " / 30 pts" },
            { label: "Unanswered / Unverified Claim Penalty (" + unanswered + " rows)", value: "-" + gapPenalty.toFixed(1) + " pts" }
          ],
          recommendation:
            sso === "password-only"
              ? "Blocker: Almost all R1/R2 US universities mandate SAML 2.0 / OIDC federation (Shibboleth, Entra ID, Okta) whenever student PII is stored. Implement OIDC/SAML or document an explicit roadmap milestone before submitting HECVAT Full."
              : unanswered > 8
              ? "Import your HECVAT spreadsheet into DealShield (?preset=hecvat-3) to bind each blank row to exact SOC 2 Type II and security policy clauses before sending to university procurement."
              : "Strong posture: Package your completed HECVAT workbook alongside your ITI VPAT 2.5Rev ACR so campus IT Security and Disability Services can approve in parallel.",
          payload: {
            standard: "EDUCAUSE HECVAT (v3.04 / v4)",
            dataSensitivity: dataTier,
            recommendedWorkbook: requiredSheet,
            ssoMode: sso,
            encryptionMode: enc,
            citationCoveragePct: auditPct,
            unansweredRows: unanswered,
            readinessScore: readiness,
            estimatedCampusReviewWeeks: reviewWeeks
          }
        };
      }
    },

    "vpat-2-5": {
      presets: [
        { inpSupports: 44, inpPartial: 5, inpDoesNotSupport: 1, selEdition: "int", selBlockerTrap: "none" },
        { inpSupports: 31, inpPartial: 14, inpDoesNotSupport: 5, selEdition: "508", selBlockerTrap: "keyboard-trap" },
        { inpSupports: 48, inpPartial: 2, inpDoesNotSupport: 0, selEdition: "wcag", selBlockerTrap: "none" }
      ],
      compute: function () {
        var supports = clamp(getNum("inpSupports", 44), 0, 55);
        var partial = clamp(getNum("inpPartial", 5), 0, 55);
        var dns = clamp(getNum("inpDoesNotSupport", 1), 0, 55);
        var edition = getStr("selEdition", "int");
        var trap = getStr("selBlockerTrap", "none");

        var totalCriteria = Math.max(1, supports + partial + dns);
        var weightedScore = Math.round(((supports * 1.0 + partial * 0.5) / totalCriteria) * 100);
        if (trap !== "none") weightedScore = Math.max(0, weightedScore - 22);

        var editionName =
          edition === "int" ? "VPAT 2.5Rev INT (WCAG 2.2 + 508 + EN 301 549)" :
          edition === "508" ? "VPAT 2.5Rev Revised Section 508" :
          edition === "eu" ? "VPAT 2.5Rev EN 301 549 (EU EAA)" : "VPAT 2.5Rev WCAG 2.2 AA";

        var remediateHours = partial * 5 + dns * 14 + (trap !== "none" ? 18 : 0);
        var level = dns === 0 && trap === "none" && partial <= 4 ? "pass" : dns <= 2 && trap === "none" ? "warn" : "fail";
        var pill =
          level === "pass" ? "PROCUREMENT READY · ACR VERIFIED" :
          level === "warn" ? "REQUIRES EEA / ROADMAP ADDENDUM" :
          "PROCUREMENT HOLD · CRITICAL WCAG AA DEFECTS";

        return {
          kpis: [
            { value: weightedScore + "%", note: "ACR Conformance Readiness" },
            { value: supports + " / " + totalCriteria, note: "'Supports' criteria count" },
            { value: fmtInt(remediateHours) + " hrs", note: "Est. engineering remediation" },
            { value: edition.toUpperCase() + " 2.5Rev", note: "Selected ITI VPAT template" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: weightedScore + "% Conformance · " + fmtInt(remediateHours) + "h Backlog",
          summary:
            "Evaluated across " + totalCriteria + " WCAG 2.2 Level A/AA criteria for " + editionName +
            ": " + supports + " Supports, " + partial + " Partially Supports, " + dns + " Does Not Support.",
          rows: [
            { label: "Target ITI Template Edition", value: editionName },
            { label: "'Supports' Criteria", value: supports + " criteria" },
            { label: "'Partially Supports' (Requires Remarks)", value: partial + " criteria" },
            { label: "'Does Not Support' (Requires EEA Workaround)", value: dns + " criteria" },
            { label: "Estimated Engineering Fix Effort", value: fmtInt(remediateHours) + " hours" }
          ],
          recommendation:
            trap !== "none"
              ? "Critical blocker: WCAG 2.1.2 (No Keyboard Trap) or missing captions on instructional media triggers immediate rejection by university accessibility offices. Remediate keyboard focus / captions first before issuing the ACR."
              : partial > 0 || dns > 0
              ? "In ITI VPAT 2.5Rev, every 'Partially Supports' or 'Does Not Support' cell MUST include specific component-level 'Remarks and Explanations'—blank or generic remarks are rejected in university RFPs."
              : "ACR ready for signature: Export the formatted Accessibility Conformance Report in DealShield (?preset=vpat-25).",
          payload: {
            standard: "ITI VPAT 2.5Rev (WCAG 2.2 AA / Section 508 / EN 301 549)",
            edition: editionName,
            supportsCount: supports,
            partiallySupportsCount: partial,
            doesNotSupportCount: dns,
            criticalBlocker: trap,
            conformanceIndexPct: weightedScore,
            remediationHours: remediateHours
          }
        };
      }
    },

    "lti-1-3": {
      presets: [
        { inpLmsTargets: 2, selServices: "ags-dl", selTenancy: "multi-tenant", inpAssessments: 12 },
        { inpLmsTargets: 4, selServices: "full-advantage", selTenancy: "multi-tenant", inpAssessments: 40 },
        { inpLmsTargets: 1, selServices: "launch-only", selTenancy: "single-tenant", inpAssessments: 5 }
      ],
      compute: function () {
        var lmsCount = clamp(getNum("inpLmsTargets", 2), 1, 8);
        var services = getStr("selServices", "ags-dl");
        var tenancy = getStr("selTenancy", "multi-tenant");
        var assessments = clamp(getNum("inpAssessments", 12), 1, 200);

        var coreHours = tenancy === "multi-tenant" ? 36 : 22;
        var serviceHours =
          services === "launch-only" ? 0 :
          services === "ags-only" ? 22 :
          services === "ags-dl" ? 38 : 54;
        var lmsMatrixHours = (lmsCount - 1) * 11 + 10;
        var itemMappingHours = Math.ceil(assessments * 0.35);
        var totalHours = coreHours + serviceHours + lmsMatrixHours + itemMappingHours;
        var sprintCost = Math.round(totalHours * 115);

        var level = services === "launch-only" && assessments > 5 ? "warn" : "pass";
        var pill =
          services === "launch-only" && assessments > 5
            ? "WARN · NO GRADEBOOK PASSBACK (AGS 2.0)"
            : "1EDTECH LTI 1.3 ADVANTAGE ARCHITECTURE";

        return {
          kpis: [
            { value: fmtInt(totalHours) + " hrs", note: "Total engineering & QA effort" },
            { value: fmtUsd(sprintCost), note: "Estimated fixed-scope sprint" },
            { value: lmsCount + " LMS platforms", note: "Canvas, Moodle, Blackboard, D2L" },
            { value: services === "full-advantage" ? "OIDC + AGS + DL + NRPS" : services === "ags-dl" ? "OIDC + AGS 2.0 + DL 2.0" : services === "ags-only" ? "OIDC + AGS 2.0" : "OIDC Launch Only", note: "1EdTech specification stack" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: fmtInt(totalHours) + " Eng Hours · " + fmtUsd(sprintCost),
          summary:
            "LTI 1.3 OIDC Third-Party Initiated Login + RS256 JWKS key rotation across " + lmsCount +
            " LMS target(s) (" + tenancy + " deployment registration model).",
          rows: [
            { label: "OIDC Login, State/Nonce & RS256 JWKS Core (" + tenancy + ")", value: coreHours + " hrs" },
            { label: "LTI Advantage Services (" + services + ")", value: serviceHours + " hrs" },
            { label: "LMS Interoperability Matrix (" + lmsCount + " LMS sandboxes)", value: lmsMatrixHours + " hrs" },
            { label: "LineItem Mapping (" + assessments + " graded activities)", value: itemMappingHours + " hrs" },
            { label: "Estimated Turnkey Integration Budget", value: fmtUsd(sprintCost) }
          ],
          recommendation:
            services === "launch-only" && assessments > 5
              ? "Enable Assignment and Grade Services (AGS v2.0) alongside Deep Linking v2.0 so instructors can pick individual modules inside Canvas/Moodle and automatically sync scores to the LMS gradebook."
              : "Store issuer + client_id + deployment_id composite keys per tenant and expose a rotating public JWKS endpoint (never static shared OAuth 1.0a secrets from deprecated LTI 1.1).",
          payload: {
            standard: "1EdTech LTI 1.3 & LTI Advantage (AGS 2.0, NRPS 2.0, Deep Linking 2.0)",
            targetLmsCount: lmsCount,
            advantageServices: services,
            tenancyModel: tenancy,
            gradedActivities: assessments,
            engineeringHours: totalHours,
            estimatedBudgetUsd: sprintCost
          }
        };
      }
    },

    "qti-3-0": {
      presets: [
        { inpTotalItems: 250, inpComplexPct: 15, selSourceFormat: "csv-json", selMathAccessibility: "mathml" },
        { inpTotalItems: 1200, inpComplexPct: 35, selSourceFormat: "qti-1-2", selMathAccessibility: "latex-img" },
        { inpTotalItems: 600, inpComplexPct: 20, selSourceFormat: "qti-2-1", selMathAccessibility: "mathml" }
      ],
      compute: function () {
        var totalItems = clamp(getNum("inpTotalItems", 250), 10, 20000);
        var complexPct = clamp(getNum("inpComplexPct", 15), 0, 100);
        var srcFmt = getStr("selSourceFormat", "csv-json");
        var mathMode = getStr("selMathAccessibility", "mathml");

        var complexItems = Math.round((totalItems * complexPct) / 100);
        var standardItems = totalItems - complexItems;

        var parserHours = srcFmt === "qti-2-1" ? 14 : srcFmt === "csv-json" ? 18 : 28;
        var itemQA = Math.ceil(standardItems * 0.025 + complexItems * 0.14);
        var mathHours = mathMode === "latex-img" ? Math.ceil(totalItems * 0.03) : 4;
        var totalHours = parserHours + itemQA + mathHours;
        var migrationCost = Math.round(totalHours * 105);

        var level = mathMode === "latex-img" ? "warn" : "pass";
        var pill = mathMode === "latex-img" ? "WARN · RASTER EQUATIONS FAIL WCAG / QTI 3.0" : "VALID QTI 3.0 XML & RESPONSE DECLARATION";

        return {
          kpis: [
            { value: fmtInt(totalItems) + " items", note: complexItems + " TEI / hotspot / multi-part" },
            { value: fmtInt(totalHours) + " hrs", note: "Automated transform + XSD QA" },
            { value: fmtUsd(migrationCost), note: "Turnkey QTI 3.0 migration" },
            { value: mathMode === "mathml" ? "MathML + ARIA" : "Needs MathML upgrade", note: "STEM screen-reader layer" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: fmtInt(totalItems) + " Items → QTI 3.0 (" + fmtUsd(migrationCost) + ")",
          summary:
            "Transforming " + fmtInt(standardItems) + " standard choice items and " + fmtInt(complexItems) +
            " technology-enhanced items from " + srcFmt.toUpperCase() + " into XSD-validated 1EdTech QTI 3.0 packages.",
          rows: [
            { label: "Source Parser & QTI 3.0 XSD Mapper (" + srcFmt + ")", value: parserHours + " hrs" },
            { label: "Standard Choice Items (" + fmtInt(standardItems) + " items)", value: Math.ceil(standardItems * 0.025) + " hrs" },
            { label: "Complex / TEI / Partial-Credit Scoring (" + fmtInt(complexItems) + " items)", value: Math.ceil(complexItems * 0.14) + " hrs" },
            { label: "MathML & Alt-Text Accessibility Pass", value: mathHours + " hrs" },
            { label: "Total QTI 3.0 Package Conversion Estimate", value: fmtUsd(migrationCost) }
          ],
          recommendation:
            mathMode === "latex-img"
              ? "Convert rasterized LaTeX PNG equations into native MathML + spoken descriptions inside qti-assessment-item so STEM items pass WCAG 1.1.1 and QTI 3.0 PNP (Personal Needs & Preferences) accommodations."
              : "Validate every qti-assessment-item and imsmanifest.xml against official 1EdTech QTI 3.0 XSD schemas and test match_correct / map_response scoring rules on edge-case responses.",
          payload: {
            standard: "1EdTech QTI 3.0 (Question & Test Interoperability)",
            totalItems: totalItems,
            complexItemPercent: complexPct,
            sourceFormat: srcFmt,
            mathRepresentation: mathMode,
            estimatedHours: totalHours,
            estimatedCostUsd: migrationCost
          }
        };
      }
    },

    "ada-title-ii": {
      presets: [
        { selEntityTier: "large-2027", inpPdfDocs: 180, inpVideos: 45, inpWeeklyCapacity: 18 },
        { selEntityTier: "large-2027", inpPdfDocs: 850, inpVideos: 220, inpWeeklyCapacity: 12 },
        { selEntityTier: "small-2028", inpPdfDocs: 140, inpVideos: 30, inpWeeklyCapacity: 15 }
      ],
      compute: function () {
        var tier = getStr("selEntityTier", "large-2027");
        var pdfs = clamp(getNum("inpPdfDocs", 180), 0, 20000);
        var videos = clamp(getNum("inpVideos", 45), 0, 5000);
        var weeklyHours = clamp(getNum("inpWeeklyCapacity", 18), 2, 400);

        var deadline = Date.UTC(tier === "large-2027" ? 2027 : 2028, 3, 26);
        var today = new Date();
        var midnight=Date.UTC(today.getFullYear(),today.getMonth(),today.getDate());
        var weeksRemaining=Math.max(0,(deadline-midnight)/604800000);
        var deadlineLabel = tier === "large-2027" ? "April 26, 2027 (>=50k pop. IFR)" : "April 26, 2028 (<50k pop. IFR)";

        var pdfHours = Math.ceil(pdfs * 0.65);
        var videoHours = Math.ceil(videos * 0.75);
        var lmsAuditHours = 24;
        var totalHours = pdfHours + videoHours + lmsAuditHours;
        var requiredPerWeek = weeksRemaining ? Math.round((totalHours / weeksRemaining) * 10) / 10 : 0;
        var capacityGap = Math.round((requiredPerWeek - weeklyHours) * 10) / 10;

        var level = weeksRemaining === 0 ? "fail" : capacityGap <= 0 ? "pass" : capacityGap <= 10 ? "warn" : "fail";
        var pill =
          weeksRemaining === 0 ? "DEADLINE REACHED · REVIEW REMAINING WORK" : level === "pass" ? "CAPACITY MEETS PROJECTED WORK" :
          level === "warn" ? "CAPACITY DEFICIT · AUTOMATION NEEDED" :
          "DEADLINE AT RISK · BACKLOG EXCEEDS TEAM VELOCITY";

        return {
          kpis: [
            { value: weeksRemaining.toFixed(1) + " weeks", note: "Until " + deadlineLabel },
            { value: fmtInt(totalHours) + " hrs", note: "Total WCAG 2.1 AA courseware work" },
            { value: requiredPerWeek.toFixed(1) + " hrs/wk", note: "Required velocity vs " + weeklyHours + "h/wk" },
            { value: capacityGap <= 0 ? "0h deficit" : "+" + capacityGap.toFixed(1) + "h/wk gap", note: capacityGap <= 0 ? "Team capacity sufficient" : "Extra weekly capacity needed" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: (weeksRemaining ? requiredPerWeek.toFixed(1) + " hrs/wk Required (" : "Deadline reached (") + weeksRemaining.toFixed(1) + " Wks Left)",
          summary:
            "To remediate " + fmtInt(pdfs) + " course PDFs and " + fmtInt(videos) +
            " instructional videos before " + deadlineLabel + " under DOJ 28 CFR Part 35 (WCAG 2.1 Level AA).",
          rows: [
            { label: "DOJ Title II Compliance Deadline (2026 IFR)", value: deadlineLabel },
            { label: "Course PDFs & Syllabi Tagging (" + fmtInt(pdfs) + " files)", value: fmtInt(pdfHours) + " hrs" },
            { label: "Instructional Video Captions & Audio Desc (" + fmtInt(videos) + " videos)", value: fmtInt(videoHours) + " hrs" },
            { label: "LMS Shell & Interactive Quiz WCAG 2.1 AA Audit", value: lmsAuditHours + " hrs" },
            { label: "Weekly Team Capacity Balance", value: (capacityGap <= 0 ? "+" + Math.abs(capacityGap).toFixed(1) : "-" + capacityGap.toFixed(1)) + " hrs/wk" }
          ],
          recommendation:
            capacityGap > 0
              ? "Archive legacy unused course shells under DOJ preexisting-content exceptions where eligible, and run active course PDFs through DocuShield PDF/UA batch remediation to cut manual tagging hours by ~60%."
              : "Velocity is on track: Prioritize high-enrollment core courses and disability-accommodated sections first, and attach a PDF/UA + WCAG 2.1 AA verification receipt to each syllabus.",
          payload: {
            standard: "US DOJ ADA Title II Web & Mobile Rule (28 CFR Part 35 · WCAG 2.1 AA)",
            entityTier: tier,
            complianceDeadline: deadlineLabel,
            weeksRemaining: Number(weeksRemaining.toFixed(2)),
            coursePdfs: pdfs,
            instructionalVideos: videos,
            totalRemediationHours: totalHours,
            requiredWeeklyHours: requiredPerWeek,
            teamWeeklyHours: weeklyHours
          }
        };
      }
    },

    "pdf-ua-matterhorn": {
      presets: [
        { inpPages: 28, inpTables: 6, inpFigures: 9, selScanState: "born-digital" },
        { inpPages: 96, inpTables: 24, inpFigures: 32, selScanState: "untagged-export" },
        { inpPages: 64, inpTables: 14, inpFigures: 18, selScanState: "scanned-ocr" }
      ],
      compute: function () {
        var pages = clamp(getNum("inpPages", 28), 1, 1200);
        var tables = clamp(getNum("inpTables", 6), 0, 300);
        var figures = clamp(getNum("inpFigures", 9), 0, 500);
        var scanState = getStr("selScanState", "born-digital");

        var baseMinPerPage = scanState === "born-digital" ? 2.2 : scanState === "untagged-export" ? 4.5 : 8.0;
        var totalMinutes = Math.round(pages * baseMinPerPage + tables * 9 + figures * 3.5 + 15);
        var hours = Math.round((totalMinutes / 60) * 10) / 10;
        var estCost = Math.max(199, Math.round(pages * (scanState === "scanned-ocr" ? 6.5 : 4.2) + tables * 12 + figures * 4));

        var failedCheckpoints =
          (scanState === "scanned-ocr" ? 9 : scanState === "untagged-export" ? 6 : 2) +
          (tables > 0 ? 2 : 0) +
          (figures > 0 ? 1 : 0);

        var level = scanState === "scanned-ocr" ? "fail" : scanState === "untagged-export" ? "warn" : "pass";
        var pill =
          level === "fail" ? "FAILS MATTERHORN CP 01 · OCR + TAGGING REQUIRED" :
          level === "warn" ? "UNTAGGED /StructTreeRoot · " + failedCheckpoints + " CHECKPOINTS FLAGGED" :
          "STRUCTURED SOURCE · READY FOR FINAL QA";

        return {
          kpis: [
            { value: failedCheckpoints + " / 31", note: "Matterhorn checkpoints at risk" },
            { value: hours.toFixed(1) + " hrs", note: fmtInt(totalMinutes) + " mins remediation + human QA" },
            { value: fmtUsd(estCost), note: "Turnkey ISO 14289-1 remediation" },
            { value: tables + " TH / " + figures + " Alt", note: "Table headers & figure alt-text" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: hours.toFixed(1) + " Hours · " + fmtUsd(estCost) + " (" + pages + " pp)",
          summary:
            pages + "-page academic packet (" + scanState.replace("-", " ") + ") with " + tables +
            " data table(s) and " + figures + " figure(s) evaluated against ISO 14289-1 (PDF/UA-1) & Matterhorn Protocol 1.1.",
          rows: [
            { label: "Reading Order & /StructTreeRoot Tagging (" + pages + " pp)", value: Math.round(pages * baseMinPerPage) + " mins" },
            { label: "Table <TH scope='col|row'> Binding (" + tables + " tables)", value: (tables * 9) + " mins" },
            { label: "Human-Authored <Figure> Alt-Text (" + figures + " figures)", value: Math.round(figures * 3.5) + " mins" },
            { label: "Metadata (/Lang, /DisplayDocTitle, Tab Order /S)", value: "15 mins" },
            { label: "DocuShield Turnkey Packet Estimate", value: fmtUsd(estCost) }
          ],
          recommendation:
            "Remember Matterhorn Protocol 1.1 splits 136 failure conditions across machine-checkable rules (e.g., /MarkInfo, /Lang, font embedding) and mandatory human-judgment checks (meaningful reading order, accurate STEM figure alt-text, and complex table header scopes). Inspect local PDFs directly in DocuShield.",
          payload: {
            standard: "ISO 14289-1 (PDF/UA-1) & PDF Association Matterhorn Protocol 1.1",
            pageCount: pages,
            tableCount: tables,
            figureCount: figures,
            sourceCondition: scanState,
            flaggedCheckpointsOf31: failedCheckpoints,
            estimatedHours: hours,
            estimatedCostUsd: estCost
          }
        };
      }
    },

    "ferpa-34-cfr-99": {
      presets: [
        { selRoleBasis: "school-official-dpa", selModelTraining: "prohibited", selPiiCrypto: "tokenized-aes", inpRetentionDays: 30 },
        { selRoleBasis: "clickwrap-tos", selModelTraining: "opt-out-default", selPiiCrypto: "raw-db", inpRetentionDays: 365 },
        { selRoleBasis: "written-consent", selModelTraining: "prohibited", selPiiCrypto: "tokenized-aes", inpRetentionDays: 60 }
      ],
      compute: function () {
        var basis = getStr("selRoleBasis", "school-official-dpa");
        var training = getStr("selModelTraining", "prohibited");
        var crypto = getStr("selPiiCrypto", "tokenized-aes");
        var retention = clamp(getNum("inpRetentionDays", 30), 1, 1825);

        var basisPts = basis === "school-official-dpa" || basis === "written-consent" ? 35 : 5;
        var trainPts = training === "prohibited" ? 30 : 0;
        var cryptoPts = crypto === "tokenized-aes" ? 25 : crypto === "encrypted-pii" ? 16 : 4;
        var retPts = retention <= 60 ? 10 : retention <= 180 ? 6 : 1;
        var score = basisPts + trainPts + cryptoPts + retPts;

        var level = score >= 85 && training === "prohibited" && basis !== "clickwrap-tos" ? "pass" : score >= 60 ? "warn" : "fail";
        var pill =
          level === "pass" ? "SELECTED CONTROLS PRESENT" :
          level === "warn" ? "REVIEW DPA RETENTION & REDISCLOSURE CLAUSES" :
          "REVIEW AUTHORIZATION AND SECONDARY USE";

        return {
          kpis: [
            { value: score + " / 100", note: "Illustrative control index" },
            { value: basis === "clickwrap-tos" ? "Review terms" : "Basis selected", note: "34 CFR § 99.30 / § 99.31" },
            { value: training === "prohibited" ? "Training excluded" : "Review training use", note: "34 CFR § 99.33(a) limit" },
            { value: retention + " days", note: "Post-termination purge SLA" }
          ],
          statusLevel: level,
          statusLabel: pill,
          headline: score + "/100 FERPA Posture · " + retention + "-Day Purge",
          summary:
            "This worksheet scores selected controls. Eligibility for a FERPA exception depends on the actual arrangement and handling of records.",
          rows: [
            { label: "Legal Authorization Basis (" + basis + ")", value: basisPts + " / 35 pts" },
            { label: "34 CFR § 99.33 Secondary Use / Training Prohibition", value: trainPts + " / 30 pts" },
            { label: "Zero-PII Tokenization & AES-256-GCM Storage", value: cryptoPts + " / 25 pts" },
            { label: "De-Identification / Deletion Window (" + retention + "d)", value: retPts + " / 10 pts" }
          ],
          recommendation:
            basis === "clickwrap-tos" || training !== "prohibited"
              ? "Review the intended use, authorization and safeguards with the institution before disclosing identifiable education records."
              : "Verify direct control, permitted purposes, access and the agreed deletion schedule against the institution’s actual arrangements.",
          payload: {
            standard: "US FERPA 34 CFR Part 99 (§ 99.31 School Official & § 99.33 Redisclosure)",
            legalBasis: basis,
            modelTrainingPolicy: training,
            piiStorageMode: crypto,
            postContractPurgeDays: retention,
            worksheetScore: score,
            status: level
          }
        };
      }
    },

    "xapi-cmi5": {
      presets: [
        { inpLearners: 2500, inpStatementsPerLearner: 45, selEnvironment: "lms-browser", selOfflineMobile: "no" },
        { inpLearners: 15000, inpStatementsPerLearner: 180, selEnvironment: "sim-vr-mobile", selOfflineMobile: "yes" },
        { inpLearners: 6000, inpStatementsPerLearner: 90, selEnvironment: "lms-plus-analytics", selOfflineMobile: "no" }
      ],
      compute: function () {
        var learners = clamp(getNum("inpLearners", 2500), 50, 500000);
        var stmtsPerLearner = clamp(getNum("inpStatementsPerLearner", 45), 5, 2000);
        var env = getStr("selEnvironment", "lms-browser");
        var offline = getStr("selOfflineMobile", "no");

        var annualStatements = learners * stmtsPerLearner;
        /* Average signed JSON xAPI statement + index overhead ~ 2.4 KB */
        var storageGb = Math.round(((annualStatements * 2.4) / (1024 * 1024)) * 100) / 100;

        var recSpec = "SCORM 1.2";
        var rationale = "Browser-hosted LMS modules without offline mobile or cross-domain simulation requirements deploy fastest as zero-LRS SCORM 1.2 ZIP packages.";
        if (env === "sim-vr-mobile" || offline === "yes") {
          recSpec = "xAPI (IEEE 9274.1.1) + LRS";
          rationale = "Mobile offline queuing or external Unity/WebGL/CLI labs outside an LMS iframe require stateless xAPI Actor-Verb-Object statements posted to an LRS.";
        } else if (env === "lms-plus-analytics") {
          recSpec = "cmi5 (LMS Launch + xAPI)";
          rationale = "cmi5 combines structured LMS package launch & gradebook satisfaction rules ('MoveOn') with rich xAPI statement telemetry.";
        }

        var infraCostYear = recSpec === "SCORM 1.2" ? 0 : Math.round(600 + storageGb * 48 + (annualStatements / 100000) * 85);

        return {
          kpis: [
            { value: recSpec, note: "Recommended specification" },
            { value: fmtInt(annualStatements), note: "Annual telemetry events" },
            { value: storageGb.toFixed(2) + " GB/yr", note: "Indexed LRS JSON volume" },
            { value: fmtUsd(infraCostYear) + "/yr", note: recSpec === "SCORM 1.2" ? "Zero external LRS needed" : "Est. LRS hosting overhead" }
          ],
          statusLevel: "pass",
          statusLabel: "RECOMMENDED: " + recSpec.toUpperCase(),
          headline: recSpec + " · " + fmtInt(annualStatements) + " Events/Yr",
          summary: rationale,
          rows: [
            { label: "Active Annual Learners", value: fmtInt(learners) },
            { label: "Telemetry Statements per Learner", value: fmtInt(stmtsPerLearner) + " events" },
            { label: "Annual xAPI Statement Volume", value: fmtInt(annualStatements) },
            { label: "Projected LRS Storage (~2.4 KB/statement)", value: storageGb.toFixed(2) + " GB/yr" },
            { label: "Additional LRS Infrastructure Cost", value: fmtUsd(infraCostYear) + "/yr" }
          ],
          recommendation:
            recSpec === "SCORM 1.2"
              ? "Avoid unnecessary LRS procurement overhead: 90%+ of corporate and university LMS platforms (Canvas, Moodle, Docebo, Cornerstone) accept SCORM 1.2 natively out of the box."
              : "Emit dual-mode packages: keep a SCORM 1.2 wrapper for legacy LMS buyers while forwarding granular lab events via xAPI/cmi5 when an LRS endpoint is configured.",
          payload: {
            standard: "ADL SCORM 1.2 vs. cmi5 vs. IEEE 9274.1.1-2023 (xAPI)",
            learners: learners,
            statementsPerLearner: stmtsPerLearner,
            deliveryEnvironment: env,
            offlineMobileRequired: offline,
            recommendedStandard: recSpec,
            annualStatements: annualStatements,
            projectedLrsStorageGb: storageGb,
            estimatedAnnualLrsUsd: infraCostYear
          }
        };
      }
    }
  };

  /* ========================================================================
     PAGE INITIALIZATION: CALCULATOR, PRESETS, PROGRESS BAR, QUIZ & EXPORT
     ======================================================================== */
  function initPage() {
    var root = document.body;
    var pageId = root ? root.getAttribute("data-page-id") : "";
    var model = PAGE_MODELS[pageId];
    var latestPayload = null;
    var runGeneration = 0;

    function updateCalculatedView() {
      if (!model) return null;
      var out = model.compute();
      latestPayload = Object.assign({basis:"Illustrative planning worksheet based on the values entered"},out.payload);

      for (var i = 0; i < out.kpis.length; i++) {
        setText("kpiVal" + (i + 1), out.kpis[i].value);
        setText("kpiNote" + (i + 1), out.kpis[i].note);
      }
      setStatusPill("resultStatusPill", out.statusLevel, out.statusLabel);
      setText("resultHeadline", out.headline);
      setText("resultSummary", out.summary);
      renderBreakdownRows("resultBreakdownBody", out.rows);
      setText("resultRecommendation", out.recommendation);
      return out;
    }

    /* ADR-024 Inline Progress & Stage Transparency */
    function runProgressFeedback(actionLabel) {
      var box = document.getElementById("calcProgressBox");
      var stageEl = document.getElementById("calcProgStage");
      var etaEl = document.getElementById("calcProgEta");
      var fillEl = document.getElementById("calcProgFill");
      if (!box || !stageEl || !etaEl || !fillEl) {
        updateCalculatedView();
        return;
      }

      runGeneration += 1;
      var currentGen = runGeneration;
      var t0 = performance.now();

      box.classList.remove("hidden", "is-complete");
      fillEl.style.width = "38%";
      stageEl.textContent = "Stage 1/2: Validating inputs & recalculating model (" + actionLabel + ")...";
      etaEl.textContent = "~0.2s remaining (38%)";

      window.setTimeout(function () {
        if (currentGen !== runGeneration) return;
        fillEl.style.width = "78%";
        stageEl.textContent = "Stage 2/2: Updating breakdown table & conformance status...";
        etaEl.textContent = "~0.1s remaining (78%)";
      }, 90);

      window.setTimeout(function () {
        if (currentGen !== runGeneration) return;
        var res = updateCalculatedView();
        var elapsed = ((performance.now() - t0) / 1000).toFixed(2);
        box.classList.add("is-complete");
        fillEl.style.width = "100%";
        stageEl.textContent = "Verified in " + elapsed + "s — " + (res ? res.headline : "Updated");
        etaEl.textContent = "100% complete";
      }, 180);
    }

    /* Wire 3-Option Scenario Presets (ADR-023) */
    var presetBtns = document.querySelectorAll("[data-preset-idx]");
    for (var p = 0; p < presetBtns.length; p++) {
      presetBtns[p].addEventListener("click", function (ev) {
        var btn = ev.currentTarget;
        var idx = parseInt(btn.getAttribute("data-preset-idx"), 10);
        if (!model || !model.presets[idx]) return;

        for (var j = 0; j < presetBtns.length; j++) {
          presetBtns[j].classList.toggle("is-selected", presetBtns[j] === btn);
          presetBtns[j].setAttribute("aria-pressed", presetBtns[j] === btn ? "true" : "false");
        }

        var vals = model.presets[idx];
        var keys = Object.keys(vals);
        for (var k = 0; k < keys.length; k++) {
          setVal(keys[k], vals[keys[k]]);
        }
        updateCalculatedView();
        runProgressFeedback("Option " + (idx + 1) + " preset");
      });
    }

    /* Wire Live Calculator Inputs (instant recalculation on any change) */
    var calcControls = document.querySelectorAll("[data-calc-input]");
    for (var c = 0; c < calcControls.length; c++) {
      var handler = function (ev) {
        var target = ev.currentTarget;
        var valBadge = document.getElementById(target.id + "Val");
        if (valBadge) valBadge.textContent = String(target.value);
        updateCalculatedView();
      };
      calcControls[c].addEventListener("input", handler);
      calcControls[c].addEventListener("change", handler);
    }

    /* Wire Primary Recalculate Button */
    var btnRunCalc = document.getElementById("btnRunCalc");
    if (btnRunCalc) {
      btnRunCalc.addEventListener("click", function () {
        updateCalculatedView();
        runProgressFeedback("Manual verification");
      });
    }

    /* Wire JSON Specification Export (reflects live inputs) */
    var btnExportBrief = document.getElementById("btnExportBrief");
    if (btnExportBrief) {
      btnExportBrief.addEventListener("click", function () {
        var res = updateCalculatedView();
        var data = {
          generatedAt: new Date().toISOString(),
          sourceUrl: window.location.href,
          publisher: "Caliber Foundry (https://caliberfoundry.com/)",
          headline: res ? res.headline : "",
          status: res ? res.statusLabel : "",
          recommendation: res ? res.recommendation : "",
          inputsAndMetrics: latestPayload || {}
        };
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "caliberfoundry-" + (pageId || "edtech") + "-brief.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 1500);
        runProgressFeedback("Exported JSON brief");
      });
    }

    /* Wire Hub Category Filter Buttons (on index.html) */
    var filterBtns = document.querySelectorAll("[data-hub-filter]");
    var guideCards = document.querySelectorAll("[data-guide-cat]");
    if (filterBtns.length > 0 && guideCards.length > 0) {
      for (var f = 0; f < filterBtns.length; f++) {
        filterBtns[f].addEventListener("click", function (ev) {
          var btn = ev.currentTarget;
          var cat = btn.getAttribute("data-hub-filter");
          var shown = 0;
          for (var b = 0; b < filterBtns.length; b++) {
            var active = filterBtns[b] === btn;
            filterBtns[b].classList.toggle("is-active", active);
            filterBtns[b].setAttribute("aria-pressed", active ? "true" : "false");
          }
          for (var g = 0; g < guideCards.length; g++) {
            var cardCat = guideCards[g].getAttribute("data-guide-cat");
            var match = cat === "all" || cardCat === cat;
            guideCards[g].classList.toggle("hidden", !match);
            if (match) shown += 1;
          }
          setText("hubVisibleCount", shown + " of " + guideCards.length + " guides shown");
        });
      }
    }

    /* Wire 3-Question Scored Practice Mini-Test */
    var quizState = {};
    var quizCards = document.querySelectorAll("[data-quiz-q]");
    function updateQuizScore() {
      if (quizCards.length === 0) return;
      var answered = 0;
      var correct = 0;
      for (var q = 0; q < quizCards.length; q++) {
        var qid = quizCards[q].getAttribute("data-quiz-q");
        if (quizState[qid]) {
          answered += 1;
          if (quizState[qid].correct) correct += 1;
        }
      }
      var badge = document.getElementById("quizScoreBadge");
      if (badge) {
        badge.textContent = "Score: " + correct + " / " + quizCards.length + " (" + answered + " answered)";
        badge.className =
          "eg-status-pill " +
          (answered === 0 ? "" : correct === quizCards.length ? "status-pass" : correct >= 2 ? "status-warn" : "status-fail");
      }
    }

    for (var q = 0; q < quizCards.length; q++) {
      (function (card) {
        var qid = card.getAttribute("data-quiz-q");
        var choices = card.querySelectorAll("[data-choice-correct]");
        var fb = card.querySelector("[data-quiz-feedback]");

        for (var i = 0; i < choices.length; i++) {
          choices[i].addEventListener("click", function (ev) {
            var clicked = ev.currentTarget;
            var isRight = clicked.getAttribute("data-choice-correct") === "true";
            var rationale = clicked.getAttribute("data-choice-rationale") || "";

            for (var m = 0; m < choices.length; m++) {
              choices[m].classList.remove("is-correct", "is-wrong");
              if (choices[m] === clicked) {
                choices[m].classList.add(isRight ? "is-correct" : "is-wrong");
              } else if (!isRight && choices[m].getAttribute("data-choice-correct") === "true") {
                choices[m].classList.add("is-correct");
              }
            }

            quizState[qid] = { answered: true, correct: isRight };
            if (fb) {
              fb.className = "eg-quiz-feedback " + (isRight ? "fb-pass" : "fb-fail");
              fb.textContent = (isRight ? "Correct — " : "Not quite — ") + rationale;
              fb.classList.remove("hidden");
            }
            updateQuizScore();
          });
        }
      })(quizCards[q]);
    }

    var btnResetQuiz = document.getElementById("btnResetQuiz");
    if (btnResetQuiz) {
      btnResetQuiz.addEventListener("click", function () {
        quizState = {};
        for (var q2 = 0; q2 < quizCards.length; q2++) {
          var choices2 = quizCards[q2].querySelectorAll("[data-choice-correct]");
          for (var m2 = 0; m2 < choices2.length; m2++) {
            choices2[m2].classList.remove("is-correct", "is-wrong");
          }
          var fb2 = quizCards[q2].querySelector("[data-quiz-feedback]");
          if (fb2) {
            fb2.classList.add("hidden");
            fb2.textContent = "";
          }
        }
        updateQuizScore();
      });
    }

    /* Initial calculation on load */
    if (model) {
      updateCalculatedView();
    }
    updateQuizScore();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();
