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
    if (p.indexOf("/omnirag") !== -1) return "OmniRAG™ Verifier";
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

  function resolveGeo(callback) {
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
    updateDwellAndScroll();
    var params = new URLSearchParams(window.location.search || "");
    var payload = {
      v: 1,
      ev: eventType,
      ts: new Date().toISOString(),
      visitorId: visitorId,
      sessionId: sessionId,
      host: window.location.hostname || "caliberfoundry.com",
      path: window.location.pathname || "/",
      product: detectProduct(window.location.pathname),
      preset: params.get("preset") || "",
      referrer: (document.referrer || "direct").slice(0, 140),
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

    // 1. Send to local Command Center dashboard if reachable or testing locally
    var isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.protocol === "file:";
    if (isLocal) {
      try {
        fetch(LOCAL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: jsonStr,
          keepalive: true,
          mode: "cors"
        }).catch(function () {});
      } catch (_) {}
    }

    // 2. Send to cloud relay (ntfy.sh) so remote production visitors on caliberfoundry.com stream to Founder dashboard
    if (!navigator.webdriver || window.__CF_FORCE_CLOUD_TELEMETRY__) {
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
      var href = target.getAttribute("href") || "";

      var evType = "click";
      if (id === "btnOpenPaywall" || id === "btnCompleteCheckout" || id === "btnGenerateCorporateInvoice" || id === "btnSubmitCardPayment" || target.hasAttribute("data-Select-Plan") || /unlock|paywall|checkout|invoice/i.test(id + label)) {
        evType = "paywall_action";
      } else if (target.getAttribute("role") === "tab" || target.hasAttribute("data-tab")) {
        evType = "tab_switch";
      }

      // Automatically harvest any entered buyer lead/order fields (Email, Company, Name, PO, Plan) inside modals/forms
      var formFields = {};
      if (evType === "paywall_action" || target.type === "submit") {
        try {
          var scope = target.closest(".cf-modal-box, .cf-modal-window, .ds-modal-window, .modal-window, form") || document;
          var inputs = scope.querySelectorAll("input, select, textarea");
          for (var i = 0; i < inputs.length; i++) {
            var inp = inputs[i];
            var key = inp.id || inp.name || inp.placeholder || ("field_" + i);
            // Never capture raw card number / CVC fields
            if (/card|cvc|cvv|expir|cc-/i.test(key)) continue;
            var val = String(inp.value || "").trim();
            if (val && val.length < 160) {
              formFields[key] = val;
            }
          }
        } catch (_) {}
      }

      dispatchEvent(evType, {
        tag: tag,
        id: id,
        label: label,
        href: href.slice(0, 100),
        buyerFields: Object.keys(formFields).length > 0 ? formFields : undefined
      });
    },
    true
  );

  // Track preset / dropdown / file input changes
  document.addEventListener(
    "change",
    function (e) {
      var el = e.target;
      if (!el) return;
      var tag = (el.tagName || "").toLowerCase();
      if (tag === "select") {
        dispatchEvent("preset_change", {
          id: el.id || "",
          value: String(el.value || "").slice(0, 64)
        });
      } else if (tag === "input" && el.type === "file" && el.files && el.files[0]) {
        dispatchEvent("file_upload", {
          id: el.id || "",
          fileName: String(el.files[0].name || "").slice(0, 64),
          fileSize: el.files[0].size || 0
        });
      }
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
    if (!document.body || document.getElementById("cfFeedbackDockRoot")) return;

    var styleEl = document.createElement("style");
    styleEl.id = "cfFeedbackWidgetStyles";
    styleEl.textContent = [
      "@media print { #cfFeedbackDockRoot, #cfFeedbackModalBackdrop, #cfContactModalBackdrop { display: none !important; } }",
      "#cfFeedbackDockRoot { position: fixed; bottom: 14px; right: 14px; z-index: 9990; font-family: 'IBM Plex Mono', monospace; }",
      "#cfFeedbackDockRoot.cf-fb-in-header { position: static; display: inline-flex; align-items: center; }",
      ".cf-fb-trigger-btn { background: #141413; color: #F6F4EF; border: 1.5px solid #141413; border-left: 4px solid #C8431F; padding: 7px 12px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; box-shadow: 2px 2px 0 rgba(20,20,19,0.18); transition: background 0.15s ease; }",
      "#cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn { background: transparent; color: #F6F4EF; border: 1px solid #4A4842; border-left: 3px solid #C8431F; padding: 4px 9px; font-size: 10.5px; box-shadow: none; white-space: nowrap; }",
      ".masthead-inner #cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn, .top-bar #cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn { background: #FFFFFF; color: #141413; border: 1px solid #141413; border-left: 3px solid #C8431F; padding: 5px 10px; }",
      ".cf-fb-trigger-btn:hover, #cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn:hover { background: #C8431F !important; border-color: #141413 !important; color: #FFFFFF !important; }",
      "#cfFeedbackModalBackdrop, #cfContactModalBackdrop { position: fixed; inset: 0; background: rgba(20,20,19,0.62); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px; }",
      "#cfFeedbackModalBackdrop.cf-fb-hidden, #cfContactModalBackdrop.cf-fb-hidden { display: none !important; }",
      ".cf-fb-modal { background: #F6F4EF; color: #141413; border: 2px solid #141413; box-shadow: 6px 6px 0 #141413; width: 100%; max-width: 540px; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; max-height: 92vh; overflow-y: auto; }",
      ".cf-fb-header { background: #141413; color: #F6F4EF; padding: 14px 18px; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }",
      ".cf-fb-kicker { font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 600; color: #C8431F; text-transform: uppercase; letter-spacing: 0.08em; display: block; }",
      ".cf-fb-title { font-family: 'Instrument Serif', Georgia, serif; font-size: 22px; font-weight: 400; margin: 2px 0 0; color: #F6F4EF; }",
      ".cf-fb-close { background: transparent; border: 1px solid #78756D; color: #F6F4EF; width: 28px; height: 28px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; cursor: pointer; flex-shrink: 0; }",
      ".cf-fb-close:hover { background: #C8431F; border-color: #C8431F; color: #FFFFFF; }",
      ".cf-fb-body { padding: 18px; }",
      ".cf-fb-context-bar { background: #ECE9E1; border: 1px solid #C9C4B8; padding: 8px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #4A4842; margin-bottom: 12px; display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; }",
      ".cf-contact-copy-banner { background: #EDF5F0; border: 1.5px solid #1A5638; padding: 10px 12px; margin-bottom: 14px; display: flex; flex-direction: column; gap: 8px; }",
      ".cf-contact-copy-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: #1A5638; font-weight: 600; }",
      ".cf-contact-quick-btns { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }",
      ".cf-contact-quick-btn { background: #FFFFFF; color: #141413; border: 1px solid #141413; padding: 5px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600; text-decoration: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }",
      ".cf-contact-quick-btn:hover { background: #141413; color: #F6F4EF; }",
      ".cf-fb-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }",
      "@media (max-width: 520px) { .cf-fb-row { grid-template-columns: 1fr; } }",
      ".cf-fb-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }",
      ".cf-fb-label { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600; text-transform: uppercase; color: #141413; }",
      ".cf-fb-input, .cf-fb-select, .cf-fb-textarea { background: #FFFFFF; border: 1.5px solid #141413; padding: 8px 10px; font-family: inherit; font-size: 12.5px; color: #141413; width: 100%; border-radius: 0; box-sizing: border-box; }",
      ".cf-fb-textarea { min-height: 88px; resize: vertical; line-height: 1.45; }",
      ".cf-fb-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 12px; flex-wrap: wrap; }",
      ".cf-fb-submit { background: #C8431F; color: #FFFFFF; border: 1.5px solid #141413; padding: 10px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; font-weight: 600; cursor: pointer; flex: 1; }",
      ".cf-fb-submit:hover { background: #A63415; }",
      ".cf-fb-success { background: #EDF5F0; border: 1.5px solid #1A5638; color: #141413; padding: 12px; margin-top: 12px; font-size: 12px; line-height: 1.5; }",
      ".cf-fb-success.cf-fb-hidden { display: none !important; }"
    ].join("\n");
    document.head.appendChild(styleEl);

    var headerMountTarget = document.querySelector(
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
      '<button type="submit" class="cf-fb-submit" id="cfFbSubmitBtn">Send to Caliber Foundry Engineering &rarr;</button>' +
      "</div>" +
      "</form>" +
      '<div class="cf-fb-success cf-fb-hidden" id="cfFbSuccessBox" role="status"></div>' +
      "</div>" +
      "</div>";
    document.body.appendChild(modalBackdrop);

    function openFbModal(defaultType) {
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

    document.getElementById("cfFeedbackForm").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var cat = document.getElementById("cfFbCategorySelect").value;
      var sev = document.getElementById("cfFbSeveritySelect").value;
      var msg = document.getElementById("cfFbMessageInput").value.trim();
      var email = document.getElementById("cfFbEmailInput").value.trim();
      if (!msg) return;

      var ticketId = "FB-2026-" + Math.floor(1000 + Math.random() * 9000);
      var fbPayload = {
        feedbackId: ticketId,
        category: cat,
        severity: sev,
        message: msg.slice(0, 1200),
        email: email.slice(0, 120),
        product: prodName,
        pageUrl: window.location.href.slice(0, 220)
      };

      dispatchEvent("product_feedback", fbPayload);

      try {
        var hist = JSON.parse(localStorage.getItem("cf_user_feedback_history_v1") || "[]");
        hist.unshift(Object.assign({ submittedAt: new Date().toISOString() }, fbPayload));
        localStorage.setItem("cf_user_feedback_history_v1", JSON.stringify(hist.slice(0, 20)));
      } catch (_) {}

      var mailSubj = encodeURIComponent("[" + ticketId + "] " + cat + " — " + prodName);
      var mailBody = encodeURIComponent(
        "Ticket ID: " + ticketId + "\n" +
        "Product: " + prodName + " (" + window.location.href + ")\n" +
        "Category: " + cat + " (" + sev + ")\n" +
        "Reporter Email: " + (email || "Not provided") + "\n\n" +
        "Report Details:\n" + msg + "\n"
      );

      var sucBox = document.getElementById("cfFbSuccessBox");
      if (sucBox) {
        sucBox.innerHTML =
          "<strong>Logged in Engineering Queue · Reference <code>" +
          escapeHtmlSafe(ticketId) +
          "</code></strong><br/>" +
          "Thank you! Your report has been streamed directly to our engineering dashboard. " +
          '<a href="mailto:engineering@caliberfoundry.com?subject=' +
          mailSubj +
          "&body=" +
          mailBody +
          '" style="color:#1A5638;font-weight:700;text-decoration:underline;">Click here if you also want to email a screenshot or file attachment &rarr;</a>';
        sucBox.classList.remove("cf-fb-hidden");
      }
      document.getElementById("cfFbMessageInput").value = "";
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
      '<span id="cfContactCopyStatusText">&check; Email copied to clipboard: <strong>engineering@caliberfoundry.com</strong></span>' +
      "</div>" +
      '<div class="cf-contact-quick-btns">' +
      '<button type="button" class="cf-contact-quick-btn" id="cfContactCopyAgainBtn">Copy Email Address</button>' +
      '<a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=engineering@caliberfoundry.com" target="_blank" rel="noopener noreferrer" class="cf-contact-quick-btn" id="cfContactGmailWebLink">Open in Gmail Web &#8599;</a>' +
      '<a href="mailto:engineering@caliberfoundry.com" data-native-mailto="1" class="cf-contact-quick-btn" id="cfContactNativeMailLink">Open Desktop Mail App</a>' +
      "</div>" +
      "</div>" +
      '<form id="cfDirectContactForm">' +
      '<div style="font-size:12px;color:#4A4842;margin-bottom:10px;line-height:1.45;">' +
      "<strong>Or send your message directly right here</strong> (no email client required — delivered immediately to our engineering desk):" +
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
      '<button type="submit" class="cf-fb-submit" id="cfContactSubmitBtn">Send Message Directly to Caliber Foundry &rarr;</button>' +
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
        document.execCommand("copy");
        document.body.removeChild(ta);
        if (cb) cb(true);
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

      copyTextToClipboard(parsed.email, function () {
        if (statusEl) {
          statusEl.innerHTML =
            "&check; Email copied to clipboard: <strong>" +
            escapeHtmlSafe(parsed.email) +
            "</strong>";
        }
      });

      contactModal.classList.remove("cf-fb-hidden");
      var emailInp = document.getElementById("cfContactEmailInput");
      if (emailInp) setTimeout(function () { emailInp.focus(); }, 40);
    }

    function closeContactModal() {
      contactModal.classList.add("cf-fb-hidden");
    }

    document.getElementById("cfContactCloseBtn").addEventListener("click", closeContactModal);
    contactModal.addEventListener("click", function (ev) {
      if (ev.target === contactModal) closeContactModal();
    });

    document.getElementById("cfContactCopyAgainBtn").addEventListener("click", function () {
      var btn = document.getElementById("cfContactCopyAgainBtn");
      copyTextToClipboard("engineering@caliberfoundry.com", function () {
        if (btn) {
          var orig = btn.textContent;
          btn.textContent = "✓ Copied: engineering@caliberfoundry.com";
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

      var refId = "MSG-2026-" + Math.floor(1000 + Math.random() * 9000);
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

      dispatchEvent("direct_contact_message", msgPayload);

      try {
        var cHist = JSON.parse(localStorage.getItem("cf_direct_contact_history_v1") || "[]");
        cHist.unshift(Object.assign({ submittedAt: new Date().toISOString() }, msgPayload));
        localStorage.setItem("cf_direct_contact_history_v1", JSON.stringify(cHist.slice(0, 20)));
      } catch (_) {}

      var cSuc = document.getElementById("cfContactSuccessBox");
      if (cSuc) {
        cSuc.innerHTML =
          "<strong>&check; Message Delivered to Caliber Foundry Engineering · Ref <code>" +
          escapeHtmlSafe(refId) +
          "</code></strong><br/>" +
          "We received your message for <strong>" +
          escapeHtmlSafe(subjVal) +
          "</strong> and will reply asynchronously to <strong>" +
          escapeHtmlSafe(emailVal) +
          "</strong> within 4 business hours.";
        cSuc.classList.remove("cf-fb-hidden");
      }
      document.getElementById("cfContactMessageInput").value = "";
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

    mountVisualValueShowcase();
  }

  // =========================================================================
  // UNIVERSAL VISUAL PALETTE, SVG ICONS & 3-CLICK LIVE VALUE SHOWCASE
  // Shows: 1) What Problem It Solves, 2) Why This Product Wins (with SVG Flow),
  //        3) Prove It in 3 Clicks (Interactive Live Demo + Result Banner)
  // =========================================================================
  var SVG_ICONS = {
    alert: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    bolt: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    magic: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    cert: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    doc: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    cpu: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>',
    award: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>'
  };

  function getProductShowcaseConfig(pathname) {
    var p = String(pathname || "/").toLowerCase();
    if (p.indexOf("/docushield") !== -1) {
      return {
        key: "docushield",
        problemMetric: "€50,000+ Fines & $25/Page Cost",
        problemTitle: "Untagged PDFs Violate EU EAA & US ADA Title II",
        problemDesc: "Manual PDF accessibility tagging in Adobe Acrobat takes 40+ hours per manual ($15–$25/page), and untagged public PDFs face strict EU EAA & Section 508 enforcement.",
        whyMetric: "1.4s Auto-Fix · 100% ISO 14289-1",
        whyTitle: "Rebuilds PDF Tag Trees & VPAT 2.5 in 1 Click",
        whyDesc: "Parses raw PDF binary streams client-side, auto-reconstructs /StructTreeRoot XML tags, table <TH scope> headers, and alt-text across 48 Matterhorn checkpoints.",
        flow: ["Broken PDF (38%)", "Auto-Tag Engine (1.4s)", "100% PDF/UA + VPAT 2.5"],
        clicks: [
          {
            label: "1. Scan Broken PDF (14 Failures)",
            outcome: "✓ CLICK 1 PROVEN: Scanned 28-page manual and pinpointed 14 critical ISO 14289-1 / WCAG 2.2 accessibility failures (38% score, red bounding boxes below). Now click Button 2 →",
            run: function () {
              var rev = document.getElementById("revertRemediationBtn");
              if (rev) rev.click();
              var sheet = document.querySelector(".ds-page-sheet-frame");
              if (sheet) sheet.classList.add("cf-v-pulse");
            }
          },
          {
            label: "2. Auto-Fix Tags (38% → 100%)",
            outcome: "✓ CLICK 2 PROVEN: All 14 PDF/UA & WCAG 2.2 failures auto-fixed in 1.4 seconds! Score jumped from 38% FAIL to 100% PASS (saving ~38 hours of manual Acrobat tagging). Now click Button 3 →",
            run: function () {
              var rem = document.getElementById("runRemediationBtn");
              if (rem) rem.click();
            }
          },
          {
            label: "3. Open Signed VPAT 2.5 Certificate",
            outcome: "✓ CLICK 3 PROVEN: Generated Printable ISO 14289-1 & ITI VPAT® 2.5 Conformance Certificate ready for legal & procurement sign-off!",
            run: function () {
              var rem = document.getElementById("runRemediationBtn");
              if (rem) rem.click();
              setTimeout(function () {
                var cert = document.getElementById("btnPreviewCertificate");
                if (cert) cert.click();
              }, 120);
            }
          }
        ]
      };
    }

    if (p.indexOf("/codedrill-cbt") !== -1 && p.indexOf("/seo-pages") === -1) {
      return {
        key: "codedrill",
        problemMetric: "84.8% National Exam Fail Rate",
        problemTitle: "Candidates Fail Because PDF Lookups Take 3+ Mins",
        problemDesc: "The U.S. Customs Broker Exam (CBLE) is open-book across 1,200 pages of 19 CFR & HTSUS laws. Flipping through static PDFs takes 180s/question, so time runs out.",
        whyMetric: "14s Lookup Speed · 84% Pass Rate",
        whyTitle: "1:1 Pearson VUE Screen + eCFR Speed-Citation Trainer",
        whyDesc: "Trains brokers to locate and cite the exact 19 CFR / HTSUS clause in under 20 seconds on an authentic split-screen testing console.",
        flow: ["Exam Scenario", "14s eCFR Locator", "84% Pass Team PDF"],
        clicks: [
          {
            label: "1. Auto-Locate 19 CFR Law (1.2s)",
            outcome: "✓ CLICK 1 PROVEN: Located the exact matching 19 CFR statutory section in the right-hand Reference Library in 1.2 seconds (vs. 180s manual binder search)! Now click Button 2 →",
            run: function () {
              var cbtTab = document.getElementById("tabModeCbt");
              if (cbtTab) cbtTab.click();
              var regBody = document.querySelector(".pvue-right-pane");
              if (regBody) regBody.classList.add("cf-v-pulse");
            }
          },
          {
            label: "2. Cite Law & Grade Answer (100%)",
            outcome: "✓ CLICK 2 PROVEN: Cited 19 CFR regulation as legal proof (+38.8s faster than CBP 40s target) and verified the winning exam answer with statutory explanation! Now click Button 3 →",
            run: function () {
              var cbtTab = document.getElementById("tabModeCbt");
              if (cbtTab) cbtTab.click();
              var citeBtn = document.getElementById("btnCiteCurrentSection");
              if (citeBtn) citeBtn.click();
              var optEl = document.querySelector('#qOptionsList [data-option="B"], #qOptionsList [data-letter="B"], #qOptionsList > *:nth-child(2)');
              if (optEl) optEl.click();
              var checkBtn = document.getElementById("btnCheckCurrentAnswer") || document.getElementById("btnVerifyAnswerMain");
              if (checkBtn) checkBtn.click();
            }
          },
          {
            label: "3. Open 12-Broker Readiness PDF",
            outcome: "✓ CLICK 3 PROVEN: Opened Printable 12-Seat Customs Brokerage Readiness PDF Dossier (84% Pass Readiness & 18.4s Citation Speed across 6 CBP regulatory domains)!",
            run: function () {
              var repBtn = document.getElementById("btnOpenTeamReadinessReport");
              if (repBtn) {
                repBtn.click();
              } else {
                var modal = document.getElementById("modalTeamReadinessReport");
                if (modal) modal.classList.remove("hidden");
              }
            }
          }
        ]
      };
    }

    if (p.indexOf("/stealthflow") !== -1) {
      return {
        key: "stealthflow",
        problemMetric: "HTTP 403 Blocks & Dirty HTML",
        problemTitle: "Standard Scrapers Get Blocked & Break on UI Changes",
        problemDesc: "Cloudflare Turnstile and DataDome block regular Python scrapers (HTTP 403), while raw HTML scraping produces dirty tracking URLs, unparsed prices, and GDPR PII risk.",
        whyMetric: "12 Protected Sources · 100% Clean",
        whyTitle: "Direct API Capture + GDPR Contact Anonymization",
        whyDesc: "Intercepts clean GraphQL/XHR JSON via stealth Playwright workers, normalizes prices into strict floats, strips tracking params, and masks personal contact PII.",
        flow: ["Protected Website", "Playwright API Capture", "Clean CSV + Webhook"],
        clicks: [
          {
            label: "1. Extract Protected Website (1.1s)",
            outcome: "✓ CLICK 1 PROVEN: Bypassed Cloudflare Turnstile, captured 412 SKUs via GraphQL XHR, and anonymized personal contact PII (M. V*** · m***@apexprecisioncnc.com)! Now click Button 2 →",
            run: function () {
              if (typeof window.runLiveUrlExtraction === "function") window.runLiveUrlExtraction();
            }
          },
          {
            label: "2. Compare Messy HTML vs. Clean",
            outcome: "✓ CLICK 2 PROVEN: Look at the Before vs. After card on the right — HTTP 403 & messy tracking URLs are transformed into 18 validated, GDPR-safe CRM columns! Now click Button 3 →",
            run: function () {
              if (typeof window.triggerStep2Demo === "function") window.triggerStep2Demo();
            }
          },
          {
            label: "3. Send Clean Batch to Make.com",
            outcome: "✓ CLICK 3 PROVEN: Dispatched HMAC-signed JSON payload to Make.com / n8n Webhook and confirmed HTTP/2 200 OK delivery in 118ms!",
            run: function () {
              if (typeof window.scrollToWebhookTester === "function") window.scrollToWebhookTester();
            }
          }
        ]
      };
    }

    if (p.indexOf("/omnirag") !== -1) {
      return {
        key: "omnirag",
        problemMetric: "$42k–$500k+ Hidden Mismatches",
        problemTitle: "Costly Number Conflicts Hide Across PDFs & Excel",
        problemDesc: "Finance, Legal, and Engineering teams miss expensive discrepancies when an Excel invoice or BOM has a different number than a 90-page PDF contract or permit.",
        whyMetric: "0% Hallucination · Page & Cell Lock",
        whyTitle: "Cross-Checks PDF + Word + Excel Simultaneously",
        whyDesc: "Compares numbers, caps, and dates across all 3 file formats at once and locks every finding to a 1-click highlight of the exact Page Number and Excel Row.",
        flow: ["PDF + Word + Excel", "Cross-File Number Diff", "Exact Page & Cell Proof"],
        clicks: [
          {
            label: "1. Catch $18.5k Contract vs. Excel Diff",
            outcome: "✓ CLICK 1 PROVEN: Cross-checked Contract PDF ($50,000 fee cap, 30-day terms) against Vendor Invoice Excel ($68,500 billed, 15-day terms) and caught the $18,500 overbilling conflict! Now click Button 2 →",
            run: function () {
              if (typeof window.runCustomTextDiff === "function") window.runCustomTextDiff();
            }
          },
          {
            label: "2. Highlight Exact Excel & PDF Proof",
            outcome: "✓ CLICK 2 PROVEN: Jumped directly to the exact source row in the right-hand Document Viewer with 100% coordinate lock (zero AI hallucination)! Now click Button 3 →",
            run: function () {
              if (typeof window.triggerStep2HighlightDemo === "function") window.triggerStep2HighlightDemo();
            }
          },
          {
            label: "3. Open Printable Audit Report (PDF)",
            outcome: "✓ CLICK 3 PROVEN: Generated Printable Cross-Document Verification Summary listing every verified file, page number, and spreadsheet cell!",
            run: function () {
              if (typeof window.openAuditPreviewModal === "function") window.openAuditPreviewModal();
            }
          }
        ]
      };
    }

    if (p.indexOf("/edtech-studio") !== -1) {
      return {
        key: "edtech",
        problemMetric: "$5,000+ & 3 Weeks per Module",
        problemTitle: "Manual Quiz & SCORM Authoring Is Slow & Costly",
        problemDesc: "Course publishers and training teams spend weeks manually writing certification questions, wrong-answer explanations, and packaging SCORM 1.2 for Canvas or Moodle.",
        whyMetric: "Instant SCORM 1.2 + FERPA AES-256",
        whyTitle: "Turns Any Rule Into an Auto-Graded LMS Course",
        whyDesc: "Converts any technical rule or rubric into a 3-option scenario quiz with targeted wrong-answer feedback, a non-spoiling Study Coach, and 1-click SCORM 1.2 export.",
        flow: ["Training Paragraph", "Graded Quiz + Coach", "Canvas/Moodle SCORM 1.2"],
        clicks: [
          {
            label: "1. Generate Quiz from Training Rule",
            outcome: "✓ CLICK 1 PROVEN: Converted the raw 90-day API key & mTLS security rule into an interactive 3-option certification scenario question below! Now click Button 2 →",
            run: function () {
              if (typeof window.generateCustomScormQuestion === "function") window.generateCustomScormQuestion();
            }
          },
          {
            label: "2. Grade Answer & Sync LMS (100%)",
            outcome: "✓ CLICK 2 PROVEN: Graded Option B (100/100 Passed), displayed diagnostic feedback, and recorded LMSSetValue('cmi.core.score.raw', '95') in the SCORM gradebook! Now click Button 3 →",
            run: function () {
              if (typeof window.selectQuizOption === "function") window.selectQuizOption("B");
            }
          },
          {
            label: "3. Export Canvas/Moodle SCORM (.XML)",
            outcome: "✓ CLICK 3 PROVEN: Exported ready-to-upload ADL SCORM 1.2 imsmanifest.xml package for Canvas, Moodle, Blackboard, and Docebo!",
            run: function () {
              if (typeof window.downloadScormManifest === "function") window.downloadScormManifest();
            }
          }
        ]
      };
    }

    if (p.indexOf("/dealshield") !== -1) {
      return {
        key: "dealshield",
        problemMetric: "30+ Hours per 250-Row Buyer DDQ",
        problemTitle: "Security Questionnaires Stall Enterprise Deals",
        problemDesc: "Enterprise B2B deals stall for 3–6 weeks while engineering and security leads manually copy-paste SOC 2 clauses into 250-row Excel questionnaires (CAIQ, HECVAT, VPAT).",
        whyMetric: "0.0% Unanchored Claims · Instant VPAT",
        whyTitle: "100% SOC 2 Citation-Locked DDQ Auto-Responder",
        whyDesc: "Auto-answers buyer security and accessibility questionnaires using only cryptographically cited clauses from your SOC 2 Type II & ISO 27001 policies.",
        flow: ["Buyer Excel DDQ", "SOC 2 Clause Matcher", "Signed VPAT 2.5 Dossier"],
        clicks: [
          {
            label: "1. Auto-Answer Buyer DDQ Rows",
            outcome: "✓ CLICK 1 PROVEN: Matched buyer security questionnaire controls against verified SOC 2 Type II & ISO 27001 clauses with 0.0% unanchored claims! Now click Button 2 →",
            run: function () {
              var btn = document.getElementById("btnRunAutoMatch") || document.querySelector("[data-preset-card]");
              if (btn) btn.click();
            }
          },
          {
            label: "2. Inspect CISO Gap & VPAT Matrix",
            outcome: "✓ CLICK 2 PROVEN: Flagged partial controls and auto-drafted CISO compensating control language + ITI VPAT® 2.5 conformance table! Now click Button 3 →",
            run: function () {
              var tab = document.querySelector('[data-tab="vpat"], [data-tab="gaps"], .js-ddq-row');
              if (tab) tab.click();
            }
          },
          {
            label: "3. Open Signed Buyer Security Dossier",
            outcome: "✓ CLICK 3 PROVEN: Opened Printable Enterprise Security & ITI VPAT® 2.5 Attestation Dossier ready to send to the buyer's procurement desk!",
            run: function () {
              var dos = document.getElementById("btnOpenEvalDossier");
              if (dos) dos.click();
            }
          }
        ]
      };
    }

    if (p.indexOf("/content-studio") !== -1) {
      return {
        key: "contentstudio",
        problemMetric: "40+ Hours & LLM Hallucination Risk",
        problemTitle: "Naive AI Scripts Hallucinate Specs & Break JSON",
        problemDesc: "Engineering & EdTech teams waste 40+ hours turning technical specs into verified documentation, n8n workflows, and SCORM modules because standard prompts hallucinate.",
        whyMetric: "6 Formats at Once · 0.0% Hallucination",
        whyTitle: "5-Stage Deterministic DAG & Claim Eval Harness",
        whyDesc: "Synthesizes Monograph, JSON Schema, n8n Workflow, SCORM Quiz, and 60fps Video Storyboard simultaneously while verifying every number against ground truth.",
        flow: ["Raw Technical Spec", "5-Stage Eval Harness", "6 Formats + n8n Webhook"],
        clicks: [
          {
            label: "1. Run 5-Stage Synthesis & Eval Gate",
            outcome: "✓ CLICK 1 PROVEN: Executed 5-stage synthesis pipeline with 100% Ground-Truth Claim Concordance (0.0% hallucinated metrics)! Now click Button 2 →",
            run: function () {
              var runBtn = document.getElementById("btnRunPipeline");
              if (runBtn) runBtn.click();
            }
          },
          {
            label: "2. Inspect Multi-Format & n8n Output",
            outcome: "✓ CLICK 2 PROVEN: Synthesized validated JSON Schema, n8n Webhook DAG, and Graded SCORM 1.2 Quiz from a single source specification! Now click Button 3 →",
            run: function () {
              var tab = document.querySelector('[data-tab="eval"], [data-tab="webhook"], [data-preset-card="eval-harness"]');
              if (tab) tab.click();
            }
          },
          {
            label: "3. Open Printable Evaluation Dossier",
            outcome: "✓ CLICK 3 PROVEN: Opened Printable Ground-Truth Evaluation & Content Architecture Dossier ready for client review!",
            run: function () {
              var dos = document.getElementById("btnOpenEvalDossier");
              if (dos) dos.click();
            }
          }
        ]
      };
    }

    return null;
  }

  function mountVisualValueShowcase() {
    var cfg = getProductShowcaseConfig(window.location.pathname);
    if (!cfg || document.getElementById("cfVisualValueShowcase")) return;

    var themeStyle = document.createElement("style");
    themeStyle.id = "cfVisualThemeUpgrade";
    themeStyle.textContent = [
      "/* Modern Executive High-Contrast Visual Palette (Slate-Alabaster + Midnight Navy + Cobalt + Emerald + Crimson) */",
      ":root {",
      "  --cf-bg-paper: #F1F5F9 !important;",
      "  --cf-bg-stone: #E2E8F0 !important;",
      "  --cf-bg-surface: #FFFFFF !important;",
      "  --cf-bg-ink-panel: #0F172A !important;",
      "  --cf-ink-primary: #0F172A !important;",
      "  --cf-ink-secondary: #334155 !important;",
      "  --cf-ink-muted: #64748B !important;",
      "  --cf-rule-strong: #1E293B !important;",
      "  --cf-rule-mid: #CBD5E1 !important;",
      "  --cf-rule-subtle: #E2E8F0 !important;",
      "  --cf-accent-primary: #E11D48 !important;",
      "  --cf-accent-hover: #BE123C !important;",
      "  --cf-accent-tint: #FFF1F2 !important;",
      "  --cf-navy-authority: #2563EB !important;",
      "  --cf-navy-tint: #EFF6FF !important;",
      "  --cf-forest-pass: #059669 !important;",
      "  --cf-forest-tint: #ECFDF5 !important;",
      "  --cf-brass-warn: #D97706 !important;",
      "  --cf-brass-tint: #FFFBEB !important;",
      "  --cf-highlight-mark: #FEF08A !important;",
      "}",
      "html, body { overflow-y: auto !important; overflow-x: hidden !important; height: auto !important; min-height: 100vh !important; background-color: #F1F5F9 !important; }",
      ".masthead, .ds-global-header, .codedrill-global-bar, .cf-global-header { position: sticky !important; top: 0 !important; z-index: 450 !important; background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%) !important; color: #F8FAFC !important; border-bottom: 2px solid #2563EB !important; box-shadow: 0 4px 14px rgba(15,23,42,0.14) !important; }",
      ".masthead .app-title { color: #F8FAFC !important; }",
      ".masthead .spec-label, .masthead .status-tag { background: rgba(37,99,235,0.28) !important; border: 1px solid #60A5FA !important; color: #F8FAFC !important; }",
      ".masthead div[style*='color:var(--cf-ink-secondary)'] { color: #CBD5E1 !important; }",
      ".masthead .back-link { background: #2563EB !important; border-color: #60A5FA !important; color: #FFFFFF !important; }",
      ".how-it-works-strip, .cf-journey-bar, .dsh-journey-bar { display: none !important; }",
      "@keyframes cfVCardPulse { 0% { box-shadow: 0 0 0 4px rgba(37,99,235,0.35); } 100% { box-shadow: 0 4px 12px rgba(15,23,42,0.06); } }",
      ".cf-v-pulse { animation: cfVCardPulse 0.9s ease; }",
      "#cfVisualValueShowcase { background: linear-gradient(180deg, #E2E8F0 0%, #F1F5F9 100%); border-bottom: 2px solid #CBD5E1; padding: 10px 16px; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }",
      ".cf-vvs-inner { max-width: 1540px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }",
      ".cf-vvs-grid { display: grid; grid-template-columns: 0.95fr 1.05fr 1.35fr; gap: 10px; align-items: stretch; }",
      "@media (max-width: 780px) { .cf-vvs-grid { grid-template-columns: 1fr; } }",
      ".cf-vvs-card { background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; padding: 11px 13px; box-shadow: 0 4px 12px rgba(15,23,42,0.06); display: flex; flex-direction: column; justify-content: space-between; gap: 6px; position: relative; overflow: hidden; }",
      ".cf-vvs-card-problem { border-top: 4px solid #E11D48; }",
      ".cf-vvs-card-why { border-top: 4px solid #2563EB; }",
      ".cf-vvs-card-prove { border-top: 4px solid #059669; background: linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 100%); }",
      ".cf-vvs-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }",
      ".cf-vvs-icon-group { display: flex; align-items: center; gap: 10px; }",
      ".cf-vvs-icon-box { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }",
      ".cf-vvs-icon-problem { background: #FFE4E6; color: #E11D48; border: 1px solid #FECDD3; }",
      ".cf-vvs-icon-why { background: #DBEAFE; color: #2563EB; border: 1px solid #BFDBFE; }",
      ".cf-vvs-icon-prove { background: #D1FAE5; color: #059669; border: 1px solid #A7F3D0; }",
      ".cf-vvs-kicker { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }",
      ".cf-vvs-pill { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 999px; white-space: nowrap; }",
      ".cf-vvs-pill-problem { background: #FFF1F2; color: #BE123C; border: 1px solid #FDA4AF; }",
      ".cf-vvs-pill-why { background: #EFF6FF; color: #1D4ED8; border: 1px solid #93C5FD; }",
      ".cf-vvs-pill-prove { background: #ECFDF5; color: #047857; border: 1px solid #6EE7B7; }",
      ".cf-vvs-title { font-size: 15px; font-weight: 700; color: #0F172A; line-height: 1.3; margin: 2px 0; }",
      ".cf-vvs-desc { font-size: 12.5px; color: #334155; line-height: 1.45; margin: 0; }",
      ".cf-vvs-flow { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 4px; padding-top: 8px; border-top: 1px dashed #CBD5E1; }",
      ".cf-vvs-node { display: inline-flex; align-items: center; gap: 5px; background: #F8FAFC; border: 1px solid #94A3B8; color: #0F172A; padding: 4px 8px; border-radius: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600; }",
      ".cf-vvs-node-mid { background: #EFF6FF; border-color: #2563EB; color: #1D4ED8; }",
      ".cf-vvs-node-end { background: #ECFDF5; border-color: #059669; color: #047857; }",
      ".cf-vvs-arrow { color: #64748B; font-weight: 700; font-size: 12px; }",
      ".cf-vvs-btn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 2px; }",
      "@media (max-width: 680px) { .cf-vvs-btn-grid { grid-template-columns: 1fr; } }",
      ".cf-vvs-proof-btn { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 8px 10px; border-radius: 6px; border: 1.5px solid #0F172A; background: #FFFFFF; color: #0F172A; cursor: pointer; text-align: left; box-shadow: 0 2px 0 #0F172A; transition: all 0.14s ease; }",
      ".cf-vvs-proof-btn:hover { background: #EFF6FF; border-color: #2563EB; transform: translateY(-1px); }",
      ".cf-vvs-proof-btn.cf-proof-done { background: #059669; border-color: #065F46; color: #FFFFFF; box-shadow: 0 2px 0 #064E3B; }",
      ".cf-vvs-btn-top { display: flex; align-items: center; justify-content: space-between; width: 100%; font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 700; }",
      ".cf-vvs-btn-badge { background: #2563EB; color: #FFFFFF; padding: 1px 6px; border-radius: 4px; }",
      ".cf-vvs-proof-btn.cf-proof-done .cf-vvs-btn-badge { background: #ECFDF5; color: #047857; }",
      ".cf-vvs-btn-label { font-size: 11.5px; font-weight: 700; line-height: 1.25; }",
      ".cf-vvs-outcome { background: #0F172A; color: #F8FAFC; border: 1.5px solid #2563EB; border-left: 5px solid #10B981; border-radius: 6px; padding: 9px 12px; font-size: 12.5px; font-weight: 600; display: flex; align-items: center; gap: 10px; line-height: 1.4; }",
      ".cf-vvs-outcome-icon { color: #10B981; display: inline-flex; flex-shrink: 0; }"
    ].join("\n");
    document.head.appendChild(themeStyle);

    var headerEl = document.querySelector(
      "header.masthead, header.ds-global-header, header.codedrill-global-bar, header.cf-global-header, header"
    );
    if (!headerEl || !headerEl.parentNode) return;

    var showcase = document.createElement("section");
    showcase.id = "cfVisualValueShowcase";
    showcase.setAttribute("aria-label", "Product Value Proposition and 3-Click Interactive Proof");

    var btnIcons = [SVG_ICONS.search, SVG_ICONS.magic, SVG_ICONS.cert];
    var btnsHtml = cfg.clicks
      .map(function (c, idx) {
        return (
          '<button type="button" class="cf-vvs-proof-btn" id="cfProofClick' +
          (idx + 1) +
          '" data-proof-idx="' +
          idx +
          '">' +
          '<div class="cf-vvs-btn-top">' +
          '<span class="cf-vvs-btn-badge" id="cfProofBadge' +
          (idx + 1) +
          '">CLICK ' +
          (idx + 1) +
          "</span>" +
          "<span>" +
          btnIcons[idx] +
          "</span>" +
          "</div>" +
          '<div class="cf-vvs-btn-label">' +
          escapeHtmlSafe(c.label) +
          "</div>" +
          "</button>"
        );
      })
      .join("");

    showcase.innerHTML =
      '<div class="cf-vvs-inner">' +
      '<div class="cf-vvs-grid">' +
      // Card 1: THE PROBLEM IT SOLVES
      '<div class="cf-vvs-card cf-vvs-card-problem">' +
      "<div>" +
      '<div class="cf-vvs-top">' +
      '<div class="cf-vvs-icon-group">' +
      '<div class="cf-vvs-icon-box cf-vvs-icon-problem">' +
      SVG_ICONS.alert +
      "</div>" +
      '<span class="cf-vvs-kicker" style="color:#E11D48;">1. THE PROBLEM IT SOLVES</span>' +
      "</div>" +
      '<span class="cf-vvs-pill cf-vvs-pill-problem">' +
      escapeHtmlSafe(cfg.problemMetric) +
      "</span>" +
      "</div>" +
      '<h2 class="cf-vvs-title" style="margin-top:8px;">' +
      escapeHtmlSafe(cfg.problemTitle) +
      "</h2>" +
      '<p class="cf-vvs-desc">' +
      escapeHtmlSafe(cfg.problemDesc) +
      "</p>" +
      "</div>" +
      "</div>" +
      // Card 2: WHY THIS PRODUCT WINS + VISUAL 3-ICON FLOW
      '<div class="cf-vvs-card cf-vvs-card-why">' +
      "<div>" +
      '<div class="cf-vvs-top">' +
      '<div class="cf-vvs-icon-group">' +
      '<div class="cf-vvs-icon-box cf-vvs-icon-why">' +
      SVG_ICONS.shield +
      "</div>" +
      '<span class="cf-vvs-kicker" style="color:#2563EB;">2. WHY THIS PRODUCT WINS</span>' +
      "</div>" +
      '<span class="cf-vvs-pill cf-vvs-pill-why">' +
      escapeHtmlSafe(cfg.whyMetric) +
      "</span>" +
      "</div>" +
      '<h2 class="cf-vvs-title" style="margin-top:8px;">' +
      escapeHtmlSafe(cfg.whyTitle) +
      "</h2>" +
      '<p class="cf-vvs-desc">' +
      escapeHtmlSafe(cfg.whyDesc) +
      "</p>" +
      "</div>" +
      '<div class="cf-vvs-flow">' +
      '<span class="cf-vvs-node">' +
      SVG_ICONS.doc +
      " " +
      escapeHtmlSafe(cfg.flow[0]) +
      "</span>" +
      '<span class="cf-vvs-arrow">&rarr;</span>' +
      '<span class="cf-vvs-node cf-vvs-node-mid">' +
      SVG_ICONS.cpu +
      " " +
      escapeHtmlSafe(cfg.flow[1]) +
      "</span>" +
      '<span class="cf-vvs-arrow">&rarr;</span>' +
      '<span class="cf-vvs-node cf-vvs-node-end">' +
      SVG_ICONS.award +
      " " +
      escapeHtmlSafe(cfg.flow[2]) +
      "</span>" +
      "</div>" +
      "</div>" +
      // Card 3: PROVE IT IN 3 CLICKS
      '<div class="cf-vvs-card cf-vvs-card-prove">' +
      "<div>" +
      '<div class="cf-vvs-top">' +
      '<div class="cf-vvs-icon-group">' +
      '<div class="cf-vvs-icon-box cf-vvs-icon-prove">' +
      SVG_ICONS.bolt +
      "</div>" +
      '<span class="cf-vvs-kicker" style="color:#059669;">3. PROVE IT IN 3 CLICKS (LIVE DEMO)</span>' +
      "</div>" +
      '<span class="cf-vvs-pill cf-vvs-pill-prove" id="cfProofProgressBadge">0 / 3 PROVEN</span>' +
      "</div>" +
      '<div class="cf-vvs-btn-grid" style="margin-top:8px;">' +
      btnsHtml +
      "</div>" +
      "</div>" +
      '<div class="cf-vvs-outcome" id="cfLiveProofOutcome">' +
      '<span class="cf-vvs-outcome-icon">' +
      SVG_ICONS.check +
      "</span>" +
      '<span id="cfLiveProofOutcomeText">Click <strong>CLICK 1</strong>, <strong>CLICK 2</strong>, and <strong>CLICK 3</strong> above to watch this product solve the problem live in 3 clicks.</span>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    headerEl.parentNode.insertBefore(showcase, headerEl.nextSibling);

    var provenMap = {};
    [0, 1, 2].forEach(function (idx) {
      var btn = document.getElementById("cfProofClick" + (idx + 1));
      if (!btn) return;
      btn.addEventListener("click", function () {
        provenMap[idx] = true;
        btn.classList.add("cf-proof-done");
        var bdg = document.getElementById("cfProofBadge" + (idx + 1));
        if (bdg) bdg.textContent = "✓ PROVEN";
        var doneCount = Object.keys(provenMap).length;
        var prog = document.getElementById("cfProofProgressBadge");
        if (prog) prog.textContent = doneCount + " / 3 PROVEN";

        var outText = document.getElementById("cfLiveProofOutcomeText");
        var outBox = document.getElementById("cfLiveProofOutcome");
        if (outText) outText.textContent = cfg.clicks[idx].outcome;
        if (outBox) {
          outBox.classList.remove("cf-v-pulse");
          void outBox.offsetWidth;
          outBox.classList.add("cf-v-pulse");
        }

        try {
          cfg.clicks[idx].run();
        } catch (_) {}
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountFeedbackWidget);
  } else {
    mountFeedbackWidget();
  }
})();
