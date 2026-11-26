/**
 * Caliber Foundry — Universal Product & Visitor Telemetry Engine (ADR-015)
 * Captures:
 *   - Visitor Session & Returning Visitor ID
 *   - Country, Region, City, ASN/Org (via GeoJS / ipwho.is + Timezone/Locale fallback)
 *   - Product & Page Path, Query Preset (?preset=...), Referrer, Viewport & Device Type
 *   - Interactive Clicks (Buttons, Tabs, Links, Presets, Paywall & Checkout triggers)
 *   - Active Dwell Time (seconds on site) & Max Scroll Depth (%)
 */
(function () {
  "use strict";

  if (window.__CF_TELEMETRY_ACTIVE__) return;
  window.__CF_TELEMETRY_ACTIVE__ = true;

  var CLOUD_TOPIC = "cf_prod_tele_7e9a4c12b8d04f63a5e1";
  var CLOUD_ENDPOINT = "https://ntfy.sh/" + CLOUD_TOPIC;
  var LOCAL_ENDPOINT = "http://localhost:4173/api/web-telemetry";

  var localWorkspace = ["localhost", "127.0.0.1"].indexOf(window.location.hostname) !== -1;

  // Operator pages expose only local API timing in the browser's Performance panel.
  // Keep task text, pairing links and credentials out of product visitor telemetry.
  if (localWorkspace && document.documentElement.hasAttribute("data-cf-operator")) {
    if (typeof PerformanceObserver === "function") {
      new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          if (entry.name.startsWith(window.location.origin + "/api/")) {
            performance.clearMeasures("cf.operator.last-api");
            performance.measure("cf.operator.last-api", {start: entry.startTime, duration: entry.duration});
          }
        });
      }).observe({type: "resource", buffered: true});
    }
    return;
  }

  var STORAGE_VISITOR = "cf_tele_visitor_id_v1";
  var STORAGE_SESSION = "cf_tele_session_id_v1";
  var STORAGE_GEO = "cf_tele_geo_cache_v1";

  function randomId(prefix) {
    return (
      prefix +
      "_" +
      Math.random().toString(36).slice(2, 10) +
      Date.now().toString(36).slice(-4)
    );
  }

  function getVisitorId() {
    try {
      var v = localStorage.getItem(STORAGE_VISITOR);
      if (!v) {
        v = randomId("vis");
        localStorage.setItem(STORAGE_VISITOR, v);
      }
      return v;
    } catch (_) {
      return randomId("vis");
    }
  }

  function getSessionId() {
    try {
      var s = sessionStorage.getItem(STORAGE_SESSION);
      if (!s) {
        s = randomId("sess");
        sessionStorage.setItem(STORAGE_SESSION, s);
      }
      return s;
    } catch (_) {
      return randomId("sess");
    }
  }

  function detectProduct(pathname) {
    var p = String(pathname || "/").toLowerCase();
    if (p.indexOf("/dealshield") !== -1) return "DealShield™ DDQ & VPAT 2.5";
    if (p.indexOf("/content-studio") !== -1) return "ContentForge™ Studio";
    if (p.indexOf("/docushield") !== -1) return "DocuShield™ PDF/UA";
    if (p.indexOf("/codedrill-cbt/seo-pages") !== -1) return "CodeDrill™ 19 CFR pSEO Hub";
    if (p.indexOf("/codedrill-cbt") !== -1) return "CodeDrill™ CBT Simulator";
    if (p.indexOf("/stealthflow") !== -1) return "StealthFlow™ Data Hub";
    if (p.indexOf("/finopsguard") !== -1) return "FinOpsGuard™ Cloud & LLM Auditor";
    if (p.indexOf("/omnirag") !== -1) return "OmniRAG™ Verifier";
    if (p.indexOf("/edtech-studio/guides") !== -1) return "AcademyForge™ EdTech pSEO Guides";
    if (p.indexOf("/edtech-studio") !== -1) return "EdTech & SCORM Studio";
    if (p.indexOf("/oobe-agent") !== -1) return "OOBE Sentinel Console";
    if (p.indexOf("/work/") !== -1) return "Case Study (" + p.split("/").pop() + ")";
    if (p.indexOf("/insights/") !== -1) return "Insights Monograph (" + p.split("/").pop() + ")";
    return "Main Landing (caliberfoundry.com)";
  }

  function detectDeviceType() {
    var w = window.innerWidth || 1440;
    if (w < 600) return "Mobile (" + w + "x" + (window.innerHeight || 844) + ")";
    if (w < 1024) return "Tablet (" + w + "x" + (window.innerHeight || 900) + ")";
    return "Desktop (" + w + "x" + (window.innerHeight || 900) + ")";
  }

  var visitorId = getVisitorId();
  var sessionId = getSessionId();
  var pageStartMs = Date.now();
  var activeDwellSec = 0;
  var lastTickMs = Date.now();
  var maxScrollPct = 0;
  var clickCount = 0;

  var tz = "UTC";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch (_) {}

  var geoData = {
    country: "Resolving...",
    countryCode: "--",
    region: tz.split("/")[0] || "",
    city: tz.split("/")[1] ? tz.split("/")[1].replace(/_/g, " ") : "",
    org: ""
  };

  var isPublicSite = ["caliberfoundry.com", "www.caliberfoundry.com"].includes(location.hostname);
  var isTestSession = navigator.webdriver || new URLSearchParams(location.search).get("qa") === "1";

  function resolveGeo(callback) {
    if (!isPublicSite || isTestSession) return callback(geoData);
    try {
      var cached = sessionStorage.getItem(STORAGE_GEO);
      if (cached) {
        geoData = JSON.parse(cached);
        return callback(geoData);
      }
    } catch (_) {}

    var done = false;
    var timer = setTimeout(function () {
      if (!done) {
        done = true;
        callback(geoData);
      }
    }, 900);

    fetch("https://get.geojs.io/v1/ip/geo.json", { method: "GET", mode: "cors" })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (d && d.country) {
          geoData = {
            country: String(d.country || "Unknown").slice(0, 48),
            countryCode: String(d.country_code || "--").slice(0, 4),
            region: String(d.region || d.city || "").slice(0, 48),
            city: String(d.city || "").slice(0, 48),
            org: String(d.organization_name || "").slice(0, 64)
          };
          try {
            sessionStorage.setItem(STORAGE_GEO, JSON.stringify(geoData));
          } catch (_) {}
        }
        if (!done) {
          done = true;
          clearTimeout(timer);
          callback(geoData);
        }
      })
      .catch(function () {
        if (!done) {
          done = true;
          clearTimeout(timer);
          callback(geoData);
        }
      });
  }

  function updateDwellAndScroll() {
    var now = Date.now();
    if (document.visibilityState !== "hidden") {
      var delta = Math.round((now - lastTickMs) / 1000);
      if (delta > 0 && delta < 120) {
        activeDwellSec += delta;
      }
    }
    lastTickMs = now;

    try {
      var docEl = document.documentElement;
      var scrollTop = window.pageYOffset || docEl.scrollTop || 0;
      var winH = window.innerHeight || 900;
      var fullH = Math.max(docEl.scrollHeight || 900, winH);
      var pct = Math.min(100, Math.round(((scrollTop + winH) / fullH) * 100));
      if (pct > maxScrollPct) maxScrollPct = pct;
    } catch (_) {}
  }

  setInterval(updateDwellAndScroll, 2000);
  window.addEventListener("scroll", updateDwellAndScroll, { passive: true });

  function dispatchEvent(eventType, detailObj) {
    var explicitMessage = eventType === "product_feedback" || eventType === "direct_contact_message";
    if ((!isPublicSite || isTestSession) && !explicitMessage && !window.__CF_FORCE_CLOUD_TELEMETRY__) return;
    updateDwellAndScroll();
    var payload = {
      v: 1,
      ev: eventType,
      qa: isTestSession,
      ts: new Date().toISOString(),
      visitorId: visitorId,
      sessionId: sessionId,
      host: window.location.hostname || "caliberfoundry.com",
      path: window.location.pathname || "/",
      product: detectProduct(window.location.pathname),
      referrer: document.referrer ? new URL(document.referrer).origin : "direct",
      country: geoData.country,
      countryCode: geoData.countryCode,
      region: geoData.region,
      city: geoData.city,
      org: geoData.org,
      tz: tz,
      lang: (navigator.language || "en").slice(0, 12),
      device: detectDeviceType(),
      dwellSec: activeDwellSec,
      scrollPct: maxScrollPct,
      clicks: clickCount,
      detail: detailObj || {}
    };

    var jsonStr = JSON.stringify(payload);

    if (explicitMessage) {
      if (!localWorkspace) return Promise.resolve(false);
      return fetch(LOCAL_ENDPOINT, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: jsonStr, mode: "cors"
      }).then(async function (response) {
        return response.ok && (await response.json()).ok === true;
      }).catch(function () { return false; });
    }

    // 2. Send to cloud relay (ntfy.sh) so remote production visitors on caliberfoundry.com stream to Founder dashboard
    if ((isPublicSite && !isTestSession) || window.__CF_FORCE_CLOUD_TELEMETRY__) {
      try {
        fetch(CLOUD_ENDPOINT, {
          method: "POST",
          body: jsonStr,
          keepalive: true,
          mode: "cors"
        }).catch(function () {});
      } catch (_) {}
    }
  }

  // Initial page_view after Geo resolution
  resolveGeo(function () {
    dispatchEvent("page_view", {
      title: (document.title || "").slice(0, 90)
    });
  });

  // Track all interactive clicks (buttons, links, tabs, presets, modals)
  document.addEventListener(
    "click",
    function (e) {
      var target = e.target && e.target.closest
        ? e.target.closest("button, a, [role='tab'], summary, [data-Select-Plan], .js-ddq-row, .work-card")
        : null;
      if (!target) return;

      clickCount++;
      var tag = (target.tagName || "").toLowerCase();
      var id = target.id || "";
      var label = (
        target.getAttribute("data-Select-Plan") ||
        target.getAttribute("aria-label") ||
        target.innerText ||
        target.textContent ||
        ""
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 72);

      var evType = "click";
      if (id === "btnOpenPaywall" || id === "btnCompleteCheckout" || id === "btnGenerateCorporateInvoice" || id === "btnSubmitCardPayment" || target.hasAttribute("data-Select-Plan") || /unlock|paywall|checkout|invoice/i.test(id + label)) {
        evType = "paywall_action";
      } else if (target.getAttribute("role") === "tab" || target.hasAttribute("data-tab")) {
        evType = "tab_switch";
      }

      // Only fixed control identifiers are needed to count product actions.
      dispatchEvent(evType, {tag: tag, id: id});
    },
    true
  );

  window.addEventListener("cf:workflow", function (event) {
    var stage = event.detail && event.detail.stage;
    if (["sample_selected", "result_ready", "export_ready"].includes(stage)) dispatchEvent(stage, {});
  });
  document.addEventListener("click", function (event) {
    if (event.target.closest && event.target.closest('[data-cf-stage="sample_selected"]')) dispatchEvent("sample_selected", {});
  });

  // Track preset / dropdown / file input changes
  document.addEventListener(
    "change",
    function (e) {
      var el = e.target;
      if (!el) return;
      var tag = (el.tagName || "").toLowerCase();
      if (tag === "select") dispatchEvent("preset_change", {id: el.id || ""});
      else if (tag === "input" && el.type === "file" && el.files && el.files.length)
        dispatchEvent("file_upload", {id: el.id || ""});
    },
    true
  );

  // Periodic dwell heartbeats (15s, 45s, 120s) + exit beacon
  setTimeout(function () {
    dispatchEvent("dwell_heartbeat", { checkpoint: "15s" });
  }, 15000);
  setTimeout(function () {
    dispatchEvent("dwell_heartbeat", { checkpoint: "45s" });
  }, 45000);
  setTimeout(function () {
    dispatchEvent("dwell_heartbeat", { checkpoint: "120s" });
  }, 120000);

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      dispatchEvent("page_exit", { reason: "visibility_hidden" });
    }
  });

  window.addEventListener("pagehide", function () {
    dispatchEvent("page_exit", { reason: "pagehide" });
  });

  // =========================================================================
  // UNIVERSAL PRODUCT BUG REPORT & FEATURE REQUEST WIDGET (SWISS EDITORIAL)
  // =========================================================================
  function escapeHtmlSafe(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function mountFeedbackWidget() {
    if (document.documentElement.hasAttribute("data-cf-no-feedback")) return;
    if (!document.body || document.getElementById("cfFeedbackDockRoot")) return;

    var styleEl = document.createElement("style");
    styleEl.id = "cfFeedbackWidgetStyles";
    styleEl.textContent = [
      "@media print { #cfFeedbackDockRoot, #cfFeedbackModalBackdrop, #cfContactModalBackdrop { display: none !important; } }",
      "#cfFeedbackDockRoot { position: fixed; bottom: 14px; right: 14px; z-index: 9990; font-family: 'IBM Plex Mono', monospace; }",
      "#cfFeedbackDockRoot.cf-fb-in-header { position: static; display: inline-flex; align-items: center; }",
      ".cf-fb-trigger-btn { background: #141413; color: #F6F4EF; border: 1px solid #3F3F46; border-left: 3px solid #C8431F; border-radius: 5px; padding: 6px 11px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.03em; cursor: pointer; box-shadow: 0 1px 2px rgba(17,17,19,0.12); transition: all 0.14s ease; }",
      "#cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn { background: #1E1E22; color: #F6F4EF; border: 1px solid #3F3F46; border-left: 3px solid #C8431F; padding: 4px 9px; font-size: 10.5px; box-shadow: none; white-space: nowrap; }",
      ".masthead-inner #cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn, .top-bar #cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn { background: #1E1E22; color: #F6F4EF; border: 1px solid #3F3F46; border-left: 3px solid #C8431F; padding: 4px 9px; }",
      ".cf-fb-trigger-btn:hover, #cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn:hover { background: #C8431F !important; border-color: #A33418 !important; color: #FFFFFF !important; }",
      "#cfFeedbackModalBackdrop, #cfContactModalBackdrop { position: fixed; inset: 0; background: rgba(17,17,19,0.55); backdrop-filter: blur(2px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px; }",
      "#cfFeedbackModalBackdrop.cf-fb-hidden, #cfContactModalBackdrop.cf-fb-hidden { display: none !important; }",
      ".cf-fb-modal { background: #F6F4EF; color: #141413; border: 1px solid #D4D1C8; border-radius: 8px; box-shadow: 0 20px 44px -8px rgba(17,17,19,0.22); width: 100%; max-width: 540px; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; max-height: 92vh; overflow-y: auto; }",
      ".cf-fb-header { background: #141413; color: #F6F4EF; padding: 14px 18px; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; border-radius: 7px 7px 0 0; }",
      ".cf-fb-kicker { font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 600; color: #818CF8; text-transform: uppercase; letter-spacing: 0.08em; display: block; }",
      ".cf-fb-title { font-family: 'Instrument Serif', Georgia, serif; font-size: 22px; font-weight: 400; margin: 2px 0 0; color: #F6F4EF; }",
      ".cf-fb-close { background: transparent; border: 1px solid #3F3F46; border-radius: 4px; color: #F6F4EF; width: 28px; height: 28px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; cursor: pointer; flex-shrink: 0; }",
      "#cfFeedbackDockRoot.cf-fb-product-footer { position:static; z-index:auto; display:inline-block; margin:8px 12px; }",
      "#cfFeedbackDockRoot.cf-fb-product-footer .cf-fb-trigger-btn { background:transparent; color:inherit; border:0; box-shadow:none; padding:6px; font:inherit; font-size:12px; text-decoration:underline; text-underline-offset:3px; }",
      ".cf-fb-close:hover { background: #C8431F; border-color: #C8431F; color: #FFFFFF; }",
      ".cf-fb-body { padding: 18px; }",
      ".cf-fb-context-bar { background: #ECE9E1; border: 1px solid #E4E2DD; border-radius: 5px; padding: 8px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #52514E; margin-bottom: 12px; display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; }",
      ".cf-contact-copy-banner { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; padding: 10px 12px; margin-bottom: 14px; display: flex; flex-direction: column; gap: 8px; }",
      ".cf-contact-copy-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: #1A5638; font-weight: 600; }",
      ".cf-contact-quick-btns { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }",
      ".cf-contact-quick-btn { background: #FFFFFF; color: #141413; border: 1px solid #D4D1C8; border-radius: 4px; padding: 5px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600; text-decoration: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }",
      ".cf-contact-quick-btn:hover { background: #C8431F; border-color: #C8431F; color: #FFFFFF; }",
      ".cf-fb-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }",
      "@media (max-width: 520px) { .cf-fb-row { grid-template-columns: 1fr; } }",
      ".cf-fb-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }",
      ".cf-fb-label { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600; text-transform: uppercase; color: #141413; }",
      ".cf-fb-input, .cf-fb-select, .cf-fb-textarea { background: #FFFFFF; border: 1px solid #D4D1C8; border-radius: 5px; padding: 8px 10px; font-family: inherit; font-size: 12.5px; color: #141413; width: 100%; box-sizing: border-box; }",
      ".cf-fb-input:focus, .cf-fb-select:focus, .cf-fb-textarea:focus { outline: 2px solid #C8431F; border-color: #C8431F; }",
      ".cf-fb-textarea { min-height: 88px; resize: vertical; line-height: 1.45; }",
      ".cf-fb-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 12px; flex-wrap: wrap; }",
      ".cf-fb-submit { background: #C8431F; color: #FFFFFF; border: 1px solid #A33418; border-radius: 5px; padding: 10px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; font-weight: 600; cursor: pointer; flex: 1; }",
      ".cf-fb-submit:hover { background: #A33418; }",
      ".cf-fb-success { background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; color: #141413; padding: 12px; margin-top: 12px; font-size: 12px; line-height: 1.5; }",
      ".cf-fb-success.cf-fb-hidden { display: none !important; }"
    ].join("\n");
    document.head.appendChild(styleEl);

    var productDesign = document.documentElement.hasAttribute("data-product-design");
    var feedbackFooter = document.querySelector("[data-product-feedback]");
    var headerMountTarget = productDesign || feedbackFooter ? null : document.querySelector(
      ".cf-account-cluster, .ds-account-cluster, .cd-global-controls, .cf-top-actions, .masthead-inner"
    );
    var dock = document.createElement("div");
    dock.id = "cfFeedbackDockRoot";
    if (headerMountTarget) {
      dock.className = "cf-fb-in-header";
    }
    dock.innerHTML =
      '<button type="button" class="cf-fb-trigger-btn" id="cfFeedbackDockBtn" title="Report a software bug or request a feature improvement (Alt+F)">' +
      "Report Bug" +
      "</button>";
    if (headerMountTarget) {
      headerMountTarget.appendChild(dock);
    } else if (productDesign || feedbackFooter) {
      var utilityArea = feedbackFooter || document.querySelector("footer");
      if (!utilityArea) {
        utilityArea = document.createElement("footer");
        document.body.appendChild(utilityArea);
      }
      dock.className = "cf-fb-product-footer";
      utilityArea.appendChild(dock);
    } else {
      document.body.appendChild(dock);
    }

    var prodName = detectProduct(window.location.pathname);
    var modalBackdrop = document.createElement("div");
    modalBackdrop.id = "cfFeedbackModalBackdrop";
    modalBackdrop.className = "cf-fb-hidden";
    modalBackdrop.setAttribute("role", "dialog");
    modalBackdrop.setAttribute("aria-modal", "true");
    modalBackdrop.setAttribute("aria-labelledby", "cfFbModalTitle");
    modalBackdrop.innerHTML =
      '<div class="cf-fb-modal">' +
      '<div class="cf-fb-header">' +
      "<div>" +
      '<span class="cf-fb-kicker">PRODUCT ENGINEERING FEEDBACK &amp; DEFECT LEDGER</span>' +
      '<h2 class="cf-fb-title" id="cfFbModalTitle">Report a Bug or Suggest an Improvement</h2>' +
      "</div>" +
      '<button type="button" class="cf-fb-close" id="cfFbCloseBtn" aria-label="Close Feedback Modal">X</button>' +
      "</div>" +
      '<div class="cf-fb-body">' +
      '<div class="cf-fb-context-bar">' +
      "<span>Product: <strong id=\"cfFbProductLabel\">" +
      escapeHtmlSafe(prodName) +
      "</strong></span>" +
      "<span>Page: <code id=\"cfFbPagePathLabel\">" +
      escapeHtmlSafe(window.location.pathname || "/") +
      "</code></span>" +
      "</div>" +
      '<form id="cfFeedbackForm">' +
      '<div class="cf-fb-row">' +
      '<div class="cf-fb-field" style="margin-bottom:0;">' +
      '<label class="cf-fb-label" for="cfFbCategorySelect">Report Type</label>' +
      '<select class="cf-fb-select" id="cfFbCategorySelect">' +
      '<option value="FEATURE_IMPROVEMENT">Feature Request / Product Improvement</option>' +
      '<option value="BUG_REPORT">Bug Report (UI / Calculation / Export Defect)</option>' +
      '<option value="CONTENT_CORPUS">Regulatory Corpus / Exam Question / Courseware Addition</option>' +
      '<option value="ENTERPRISE_CUSTOM">Enterprise Integration / Custom Requirement</option>' +
      "</select>" +
      "</div>" +
      '<div class="cf-fb-field" style="margin-bottom:0;">' +
      '<label class="cf-fb-label" for="cfFbSeveritySelect">Priority / Impact</label>' +
      '<select class="cf-fb-select" id="cfFbSeveritySelect">' +
      '<option value="Normal">Normal — Usability or Enhancement</option>' +
      '<option value="High">High — Blocking Workflow</option>' +
      '<option value="Low">Low — Minor Visual / Copy</option>' +
      "</select>" +
      "</div>" +
      "</div>" +
      '<div class="cf-fb-field">' +
      '<label class="cf-fb-label" for="cfFbMessageInput">What should we fix or improve?</label>' +
      '<textarea class="cf-fb-textarea" id="cfFbMessageInput" required placeholder="Describe the bug (what happened vs. expected) or the feature/content improvement you want us to add..."></textarea>' +
      "</div>" +
      '<div class="cf-fb-field" style="margin-bottom:4px;">' +
      '<label class="cf-fb-label" for="cfFbEmailInput">Your Email (Optional — for status updates when deployed)</label>' +
      '<input type="email" class="cf-fb-input" id="cfFbEmailInput" placeholder="engineer@company.com" />' +
      "</div>" +
      '<div class="cf-fb-actions">' +
      '<button type="submit" class="cf-fb-submit" id="cfFbSubmitBtn">' + (localWorkspace ? "Save feedback to local queue" : "Prepare feedback email") + '</button>' +
      "</div>" +
      "</form>" +
      '<div class="cf-fb-success cf-fb-hidden" id="cfFbSuccessBox" role="status"></div>' +
      "</div>" +
      "</div>";
    document.body.appendChild(modalBackdrop);

    var feedbackOpener;
    var contactOpener;

    function openFbModal(defaultType) {
      feedbackOpener = document.activeElement;
      var catEl = document.getElementById("cfFbCategorySelect");
      if (catEl && defaultType) catEl.value = defaultType;
      var sucEl = document.getElementById("cfFbSuccessBox");
      if (sucEl) sucEl.classList.add("cf-fb-hidden");
      modalBackdrop.classList.remove("cf-fb-hidden");
      var msgEl = document.getElementById("cfFbMessageInput");
      if (msgEl) setTimeout(function () { msgEl.focus(); }, 40);
    }

    function closeFbModal() {
      modalBackdrop.classList.add("cf-fb-hidden");
      if (feedbackOpener && feedbackOpener.isConnected) feedbackOpener.focus();
    }

    document.getElementById("cfFeedbackDockBtn").addEventListener("click", function () {
      openFbModal();
    });

    document.getElementById("cfFbCloseBtn").addEventListener("click", closeFbModal);
    modalBackdrop.addEventListener("click", function (ev) {
      if (ev.target === modalBackdrop) closeFbModal();
    });

    window.addEventListener("keydown", function (ev) {
      if (ev.altKey && (ev.key === "f" || ev.key === "F")) {
        ev.preventDefault();
        openFbModal();
      } else if (ev.key === "Escape" && !modalBackdrop.classList.contains("cf-fb-hidden")) {
        closeFbModal();
      }
    });

    function messageReference(form, prefix) {
      var signature = Array.from(form.elements).map(function (element) { return element.value; }).join("\n");
      if (form.cfMessageSignature !== signature) {
        form.cfMessageSignature = signature;
        form.cfMessageId = randomId(prefix);
      }
      return form.cfMessageId;
    }

    function setMessageResult(box, text, subject, body) {
      box.style.backgroundColor = "";
      box.style.borderColor = "";
      box.textContent = text;
      if (subject) {
        var link = document.createElement("a");
        link.href = "mailto:engineering@caliberfoundry.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        link.setAttribute("data-native-mailto", "1");
        link.textContent = "Open email draft";
        box.append(" ", link);
      }
      box.classList.remove("cf-fb-hidden");
    }

    async function submitMessage(eventType, payload, button, box, input, subject, body, ref) {
      if (!localWorkspace) {
        setMessageResult(box, "Your draft is ready. Send it from your mail app.", subject, body);
        return;
      }
      if (button.disabled) return;
      button.disabled = true;
      input.readOnly = true;
      setMessageResult(box, "Saving to the local engineering queue…");
      try {
        if (await dispatchEvent(eventType, payload)) {
          setMessageResult(box, "Saved to the local engineering queue · " + ref);
          input.form.cfMessageSignature = null;
          input.value = "";
        } else {
          setMessageResult(box, "Could not save. Retry or send the draft by email.", subject, body);
          box.style.backgroundColor = "#fff7ed";
          box.style.borderColor = "#bb762c";
        }
      } finally {
        input.readOnly = false;
        button.disabled = false;
      }
    }

    document.getElementById("cfFeedbackForm").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var cat = document.getElementById("cfFbCategorySelect").value;
      var sev = document.getElementById("cfFbSeveritySelect").value;
      var msg = document.getElementById("cfFbMessageInput").value.trim();
      var email = document.getElementById("cfFbEmailInput").value.trim();
      if (!msg) return;

      var ticketId = messageReference(ev.currentTarget, "FB");
      var fbPayload = {
        feedbackId: ticketId,
        category: cat,
        severity: sev,
        message: msg.slice(0, 1200),
        email: email.slice(0, 120),
        product: prodName,
        pageUrl: window.location.href.slice(0, 220)
      };

      var subject = "[" + ticketId + "] " + cat + " · " + prodName;
      var body = "Page: " + window.location.href + "\nPriority: " + sev + (email ? "\nReply to: " + email : "") + "\n\n" + msg;
      submitMessage("product_feedback", fbPayload, document.getElementById("cfFbSubmitBtn"),
        document.getElementById("cfFbSuccessBox"), document.getElementById("cfFbMessageInput"), subject, body, ticketId);
    });

    // =========================================================================
    // UNIVERSAL MAILTO INTERCEPTOR & DIRECT ENGINEERING CONTACT MODAL
    // Solves silent failure of <a href="mailto:..."> when no OS desktop mail app is set
    // =========================================================================
    var contactModal = document.createElement("div");
    contactModal.id = "cfContactModalBackdrop";
    contactModal.className = "cf-fb-hidden";
    contactModal.setAttribute("role", "dialog");
    contactModal.setAttribute("aria-modal", "true");
    contactModal.setAttribute("aria-labelledby", "cfContactModalTitle");
    contactModal.innerHTML =
      '<div class="cf-fb-modal">' +
      '<div class="cf-fb-header">' +
      "<div>" +
      '<span class="cf-fb-kicker">100% ASYNCHRONOUS ENGINEERING &amp; CUSTOM SPRINT INTAKE</span>' +
      '<h2 class="cf-fb-title" id="cfContactModalTitle">Contact Caliber Foundry Engineering</h2>' +
      "</div>" +
      '<button type="button" class="cf-fb-close" id="cfContactCloseBtn" aria-label="Close Contact Modal">X</button>' +
      "</div>" +
      '<div class="cf-fb-body">' +
      '<div class="cf-contact-copy-banner">' +
      '<div class="cf-contact-copy-top">' +
      '<span id="cfContactCopyStatusText">Email: <strong>engineering@caliberfoundry.com</strong></span>' +
      "</div>" +
      '<div class="cf-contact-quick-btns">' +
      '<button type="button" class="cf-contact-quick-btn" id="cfContactCopyAgainBtn">Copy Email Address</button>' +
      '<a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=engineering@caliberfoundry.com" target="_blank" rel="noopener noreferrer" class="cf-contact-quick-btn" id="cfContactGmailWebLink">Open in Gmail Web &#8599;</a>' +
      '<a href="mailto:engineering@caliberfoundry.com" data-native-mailto="1" class="cf-contact-quick-btn" id="cfContactNativeMailLink">Open Desktop Mail App</a>' +
      "</div>" +
      "</div>" +
      '<form id="cfDirectContactForm">' +
      '<div style="font-size:12px;color:#4A4842;margin-bottom:10px;line-height:1.45;">' +
      (localWorkspace ? "Write a message for your local engineering queue." : "Prepare an email for engineering@caliberfoundry.com.") +
      "</div>" +
      '<div class="cf-fb-row">' +
      '<div class="cf-fb-field" style="margin-bottom:0;">' +
      '<label class="cf-fb-label" for="cfContactNameInput">Your Name / Company</label>' +
      '<input type="text" class="cf-fb-input" id="cfContactNameInput" placeholder="Alex Rivera · Acme Corp" />' +
      "</div>" +
      '<div class="cf-fb-field" style="margin-bottom:0;">' +
      '<label class="cf-fb-label" for="cfContactEmailInput">Your Work Email *</label>' +
      '<input type="email" class="cf-fb-input" id="cfContactEmailInput" required placeholder="alex@company.com" />' +
      "</div>" +
      "</div>" +
      '<div class="cf-fb-field">' +
      '<label class="cf-fb-label" for="cfContactSubjectInput">Subject / Scope</label>' +
      '<input type="text" class="cf-fb-input" id="cfContactSubjectInput" required value="' +
      escapeHtmlSafe("Engineering Inquiry — " + prodName) +
      '" />' +
      "</div>" +
      '<div class="cf-fb-field" style="margin-bottom:4px;">' +
      '<label class="cf-fb-label" for="cfContactMessageInput">Message, Specification, or Purchase Order Request *</label>' +
      '<textarea class="cf-fb-textarea" id="cfContactMessageInput" required placeholder="Tell us what you want built, customized, or licensed (e.g., custom document pipeline, scraper target, SCORM courseware, or enterprise license)..."></textarea>' +
      "</div>" +
      '<div class="cf-fb-actions">' +
      '<button type="submit" class="cf-fb-submit" id="cfContactSubmitBtn">' + (localWorkspace ? "Save message to local queue" : "Prepare email") + '</button>' +
      "</div>" +
      "</form>" +
      '<div class="cf-fb-success cf-fb-hidden" id="cfContactSuccessBox" role="status"></div>' +
      "</div>" +
      "</div>";
    document.body.appendChild(contactModal);

    function copyTextToClipboard(text, cb) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          if (cb) cb(true);
        }).catch(function () {
          fallbackCopy(text, cb);
        });
      } else {
        fallbackCopy(text, cb);
      }
    }

    function fallbackCopy(text, cb) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        var copied = document.execCommand("copy");
        document.body.removeChild(ta);
        if (cb) cb(copied);
      } catch (_) {
        if (cb) cb(false);
      }
    }

    function parseMailtoHref(href) {
      var raw = String(href || "").replace(/^mailto:/i, "");
      var parts = raw.split("?");
      var emailAddr = (parts[0] || "engineering@caliberfoundry.com").trim() || "engineering@caliberfoundry.com";
      var subject = "";
      var body = "";
      if (parts[1]) {
        try {
          var q = new URLSearchParams(parts[1]);
          subject = q.get("subject") || "";
          body = q.get("body") || "";
        } catch (_) {}
      }
      return { email: emailAddr, subject: subject, body: body };
    }

    function openContactModal(mailtoHref) {
      contactOpener = document.activeElement;
      var parsed = parseMailtoHref(mailtoHref || "mailto:engineering@caliberfoundry.com");
      var subjEl = document.getElementById("cfContactSubjectInput");
      var msgEl = document.getElementById("cfContactMessageInput");
      var sucEl = document.getElementById("cfContactSuccessBox");
      var statusEl = document.getElementById("cfContactCopyStatusText");
      var gmailLink = document.getElementById("cfContactGmailWebLink");
      var nativeLink = document.getElementById("cfContactNativeMailLink");

      if (sucEl) sucEl.classList.add("cf-fb-hidden");
      if (subjEl) {
        subjEl.value = parsed.subject || ("Engineering Inquiry — " + prodName);
      }
      if (msgEl && parsed.body) {
        msgEl.value = parsed.body;
      }

      var encSubj = encodeURIComponent(subjEl ? subjEl.value : ("Engineering Inquiry — " + prodName));
      var encBody = encodeURIComponent(msgEl ? msgEl.value : "");
      if (gmailLink) {
        gmailLink.href =
          "https://mail.google.com/mail/?view=cm&fs=1&to=" +
          encodeURIComponent(parsed.email) +
          "&su=" +
          encSubj +
          (encBody ? "&body=" + encBody : "");
      }
      if (nativeLink) {
        nativeLink.href =
          "mailto:" +
          parsed.email +
          "?subject=" +
          encSubj +
          (encBody ? "&body=" + encBody : "");
      }

      if (statusEl) statusEl.textContent = "Email: " + parsed.email;

      contactModal.classList.remove("cf-fb-hidden");
      var emailInp = document.getElementById("cfContactEmailInput");
      if (emailInp) setTimeout(function () { emailInp.focus(); }, 40);
    }

    function closeContactModal() {
      contactModal.classList.add("cf-fb-hidden");
      if (contactOpener && contactOpener.isConnected) contactOpener.focus();
    }

    window.addEventListener("keydown", function (event) {
      var dialog = !contactModal.classList.contains("cf-fb-hidden") ? contactModal :
        !modalBackdrop.classList.contains("cf-fb-hidden") ? modalBackdrop : null;
      if (!dialog) return;
      if (event.key === "Escape" && dialog === contactModal) { closeContactModal(); return; }
      if (event.key !== "Tab") return;
      var elements = Array.from(dialog.querySelectorAll("button, a[href], input, textarea, select")).filter(function (element) {
        return !element.disabled && element.getClientRects().length > 0;
      });
      var first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });

    document.getElementById("cfContactCloseBtn").addEventListener("click", closeContactModal);
    contactModal.addEventListener("click", function (ev) {
      if (ev.target === contactModal) closeContactModal();
    });

    document.getElementById("cfContactCopyAgainBtn").addEventListener("click", function () {
      var btn = document.getElementById("cfContactCopyAgainBtn");
      copyTextToClipboard("engineering@caliberfoundry.com", function (copied) {
        if (btn) {
          var orig = btn.textContent;
          btn.textContent = copied ? "Email address copied" : "Could not copy · select the address above";
          setTimeout(function () { btn.textContent = orig; }, 2200);
        }
      });
    });

    document.getElementById("cfDirectContactForm").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var nameVal = document.getElementById("cfContactNameInput").value.trim();
      var emailVal = document.getElementById("cfContactEmailInput").value.trim();
      var subjVal = document.getElementById("cfContactSubjectInput").value.trim();
      var msgVal = document.getElementById("cfContactMessageInput").value.trim();
      if (!emailVal || !msgVal) return;

      var refId = messageReference(ev.currentTarget, "MSG");
      var msgPayload = {
        messageId: refId,
        senderName: nameVal.slice(0, 120),
        senderEmail: emailVal.slice(0, 120),
        subject: subjVal.slice(0, 180),
        message: msgVal.slice(0, 1800),
        product: prodName,
        pageUrl: window.location.href.slice(0, 220),
        buyerFields: {
          name: nameVal.slice(0, 120),
          email: emailVal.slice(0, 120),
          subject: subjVal.slice(0, 180)
        }
      };

      var body = (nameVal ? nameVal + "\n" : "") + "Reply to: " + emailVal + "\n\n" + msgVal;
      submitMessage("direct_contact_message", msgPayload, document.getElementById("cfContactSubmitBtn"),
        document.getElementById("cfContactSuccessBox"), document.getElementById("cfContactMessageInput"),
        subjVal || "Engineering inquiry", body, refId);
    });

    // Global capture listener for any <a href="mailto:...">, [data-mailto], or [data-cf-proxy-click] button on the page
    document.addEventListener(
      "click",
      function (ev) {
        var proxyBtn = ev.target && ev.target.closest
          ? ev.target.closest("[data-cf-proxy-click]")
          : null;
        if (proxyBtn) {
          var sel = proxyBtn.getAttribute("data-cf-proxy-click");
          var targetEl = sel ? document.querySelector(sel) : null;
          if (targetEl) {
            if (targetEl.tagName === "SELECT" || targetEl.tagName === "INPUT") {
              targetEl.focus();
            } else {
              targetEl.click();
            }
          }
          return;
        }
        var link = ev.target && ev.target.closest
          ? ev.target.closest('a[href^="mailto:"], button[data-mailto]')
          : null;
        if (!link) return;
        if (link.getAttribute("data-native-mailto") === "1") return;
        ev.preventDefault();
        var href = link.getAttribute("href") || link.getAttribute("data-mailto") || "mailto:engineering@caliberfoundry.com";
        openContactModal(href);
      },
      false
    );

    window.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !contactModal.classList.contains("cf-fb-hidden")) {
        closeContactModal();
      }
    });

    window.CaliberFeedback = {
      open: openFbModal,
      close: closeFbModal,
      openContact: openContactModal,
      closeContact: closeContactModal
    };

    if (!productDesign) mountWorkbenchTheme();
  }

  function mountWorkbenchTheme() {
    if (!document.getElementById("cfVisualThemeUpgrade")) {
      var themeStyle = document.createElement("style");
      themeStyle.id = "cfVisualThemeUpgrade";
      themeStyle.textContent = [
      "/* Caliber Foundry shared reading surfaces and controls */",
      ":root {",
      "  --cf-bg-paper: #F6F4EF !important;",
      "  --cf-bg-stone: #ECE9E1 !important;",
      "  --cf-bg-surface: #FFFFFF !important;",
      "  --cf-bg-ink-panel: #141413 !important;",
      "  --cf-ink-primary: #141413 !important;",
      "  --cf-ink-secondary: #52514E !important;",
      "  --cf-ink-muted: #65625D !important;",
      "  --cf-ink-on-dark: #F6F4EF !important;",
      "  --cf-rule-strong: #D4D1C8 !important;",
      "  --cf-rule-mid: #E4E2DD !important;",
      "  --cf-rule-subtle: #EFECE6 !important;",
      "  --cf-accent-primary: #C8431F !important;",
      "  --cf-accent-hover: #A33418 !important;",
      "  --cf-accent-tint: #FBEBE4 !important;",
      "  --cf-navy-authority: #1E293B !important;",
      "  --cf-navy-tint: #F1F5F9 !important;",
      "  --cf-forest-pass: #1A5638 !important;",
      "  --cf-forest-tint: #F0FDF4 !important;",
      "  --cf-brass-warn: #B45309 !important;",
      "  --cf-brass-tint: #FFFBEB !important;",
      "  --cf-highlight-mark: #FEF08A !important;",
      "}",
      "/* 1. Never lock html/body or reading panes into tiny scroll cages */",
      "html, body {",
      "  background-color: #F6F4EF !important;",
      "  color: #141413 !important;",
      "  min-height: 100vh !important;",
      "  height: auto !important;",
      "  overflow-x: hidden !important;",
      "  overflow-y: auto !important;",
      "}",
      ".ds-split-workbench, .ds-left-pane, .ds-right-pane, .ds-left-scroll, .ds-checkpoints-scroll, .ds-visual-canvas, .ds-tree-code,",
      ".codedrill-main-container, .workspace-view, .pvue-split-workspace, .pvue-left-pane, .pvue-right-pane, .pvue-pane-scroll, .ref-library-body, .ref-doc-reader-wrap, .ref-doc-article, .analytics-page-scroll {",
      "  height: auto !important;",
      "  max-height: none !important;",
      "  overflow: visible !important;",
      "}",
      "@media (min-width: 861px) {",
      "  .ds-split-workbench { display: grid !important; grid-template-columns: minmax(0, 1.24fr) minmax(0, 0.76fr) !important; align-items: start !important; }",
      "}",
      "/* 2. Compact product headers and card dividers */",
      ".masthead, .ds-global-header, .codedrill-global-bar, .cf-global-header {",
      "  flex-shrink: 0 !important;",
      "  z-index: 450 !important;",
      "  background: #141413 !important;",
      "  color: #F6F4EF !important;",
      "  border-bottom: 1px solid #27272A !important;",
      "  box-shadow: 0 1px 2px rgba(17,17,19,0.08) !important;",
      "}",
      ".masthead-inner { padding: 8px 16px !important; gap: 10px !important; }",
      ".masthead .app-title { color: #F6F4EF !important; font-size: 20px !important; margin-top: 2px !important; }",
      ".masthead div[style*='max-width:740px'] { font-size: 11.5px !important; line-height: 1.3 !important; margin-top: 2px !important; }",
      ".masthead .spec-label, .masthead .status-tag { background: #1E1E22 !important; border: 1px solid #3F3F46 !important; color: #E4E4E7 !important; border-radius: 4px !important; }",
      ".masthead div[style*='color:var(--cf-ink-secondary)'] { color: #A1A1AA !important; }",
      ".masthead .back-link, .ds-back-link, .cd-back-link { background: #1E1E22 !important; border: 1px solid #3F3F46 !important; color: #F4F4F5 !important; border-radius: 4px !important; }",
      ".masthead .back-link:hover, .ds-back-link:hover, .cd-back-link:hover { background: #27272A !important; border-color: #71717A !important; }",
      ".ds-logo-mark, .cd-logo-mark { background: #C8431F !important; border-color: #C8431F !important; border-radius: 5px !important; color: #FFFFFF !important; }",
      "/* Keep control elevation subtle */",
      ".tactile-btn, .ds-tool-btn, .pvue-tool-btn, .ds-export-btn, .q-nav-btn, .q-action-primary, .q-action-secondary, .drill-ctrl-btn {",
      "  border-radius: 5px !important;",
      "  box-shadow: 0 1px 2px rgba(17,17,19,0.06) !important;",
      "}",
      ".tactile-btn-vermilion, .ds-btn-accent, .pvue-btn-grade-exam, #runRemediationBtn, .ds-btn-remediate, #btnCheckCurrentAnswer, .pvue-btn-check {",
      "  background: #C8431F !important;",
      "  color: #FFFFFF !important;",
      "  border: 1px solid #A33418 !important;",
      "  border-radius: 5px !important;",
      "  box-shadow: 0 1px 2px rgba(120,48,28,0.15) !important;",
      "}",
      ".tactile-btn-vermilion:hover, .ds-btn-accent:hover, .pvue-btn-grade-exam:hover, #runRemediationBtn:hover, .ds-btn-remediate:hover, #btnCheckCurrentAnswer:hover, .pvue-btn-check:hover {",
      "  background: #A33418 !important;",
      "}",
      ".ds-page-sheet-frame, .ds-node-inspector-card, .ds-editor-section, .ds-tree-col, .ds-ledger-box, .q-stem-card, .an-panel-card, .an-hero-banner {",
      "  border: 1px solid #E4E2DD !important;",
      "  border-radius: 6px !important;",
      "  box-shadow: 0 1px 3px rgba(17,17,19,0.04) !important;",
      "}",
      ":focus-visible { outline: 3px solid #C8431F; outline-offset: 3px; }"
      ].join("\n");
      document.head.appendChild(themeStyle);
    }
  }

  // Preserve existing inbound links. Each product owns its current view and result.
  function openRequestedStep() {
    var step = new URLSearchParams(window.location.search).get("autoProof");
    if (/^[123]$/.test(step || "")) {
      window.dispatchEvent(new CustomEvent("cf:open-step", { detail: { step: Number(step) } }));
    }
  }
  if (document.readyState === "complete") openRequestedStep();
  else window.addEventListener("load", openRequestedStep, { once: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountFeedbackWidget);
  } else {
    mountFeedbackWidget();
  }
})();
