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
      "@media print { #cfFeedbackDockRoot, #cfFeedbackModalBackdrop { display: none !important; } }",
      "#cfFeedbackDockRoot { position: fixed; bottom: 14px; right: 14px; z-index: 9990; font-family: 'IBM Plex Mono', monospace; }",
      "#cfFeedbackDockRoot.cf-fb-in-header { position: static; display: inline-flex; align-items: center; }",
      ".cf-fb-trigger-btn { background: #141413; color: #F6F4EF; border: 1.5px solid #141413; border-left: 4px solid #C8431F; padding: 7px 12px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; box-shadow: 2px 2px 0 rgba(20,20,19,0.18); transition: background 0.15s ease; }",
      "#cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn { background: transparent; color: #F6F4EF; border: 1px solid #4A4842; border-left: 3px solid #C8431F; padding: 4px 9px; font-size: 10.5px; box-shadow: none; white-space: nowrap; }",
      ".masthead-inner #cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn { background: #FFFFFF; color: #141413; border: 1px solid #141413; border-left: 3px solid #C8431F; }",
      ".cf-fb-trigger-btn:hover, #cfFeedbackDockRoot.cf-fb-in-header .cf-fb-trigger-btn:hover { background: #C8431F !important; border-color: #141413 !important; color: #FFFFFF !important; }",
      "#cfFeedbackModalBackdrop { position: fixed; inset: 0; background: rgba(20,20,19,0.62); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px; }",
      "#cfFeedbackModalBackdrop.cf-fb-hidden { display: none !important; }",
      ".cf-fb-modal { background: #F6F4EF; color: #141413; border: 2px solid #141413; box-shadow: 6px 6px 0 #141413; width: 100%; max-width: 520px; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }",
      ".cf-fb-header { background: #141413; color: #F6F4EF; padding: 14px 18px; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }",
      ".cf-fb-kicker { font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 600; color: #C8431F; text-transform: uppercase; letter-spacing: 0.08em; display: block; }",
      ".cf-fb-title { font-family: 'Instrument Serif', Georgia, serif; font-size: 22px; font-weight: 400; margin: 2px 0 0; color: #F6F4EF; }",
      ".cf-fb-close { background: transparent; border: 1px solid #78756D; color: #F6F4EF; width: 26px; height: 26px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; cursor: pointer; }",
      ".cf-fb-body { padding: 18px; }",
      ".cf-fb-context-bar { background: #ECE9E1; border: 1px solid #C9C4B8; padding: 8px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #4A4842; margin-bottom: 12px; display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; }",
      ".cf-fb-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }",
      "@media (max-width: 520px) { .cf-fb-row { grid-template-columns: 1fr; } }",
      ".cf-fb-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }",
      ".cf-fb-label { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 600; text-transform: uppercase; color: #141413; }",
      ".cf-fb-input, .cf-fb-select, .cf-fb-textarea { background: #FFFFFF; border: 1.5px solid #141413; padding: 8px 10px; font-family: inherit; font-size: 12.5px; color: #141413; width: 100%; border-radius: 0; }",
      ".cf-fb-textarea { min-height: 88px; resize: vertical; line-height: 1.45; }",
      ".cf-fb-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 12px; flex-wrap: wrap; }",
      ".cf-fb-submit { background: #C8431F; color: #FFFFFF; border: 1.5px solid #141413; padding: 9px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; font-weight: 600; cursor: pointer; flex: 1; }",
      ".cf-fb-submit:hover { background: #A63415; }",
      ".cf-fb-success { background: #EDF5F0; border: 1.5px solid #1A5638; color: #141413; padding: 12px; margin-top: 12px; font-size: 12px; line-height: 1.5; }",
      ".cf-fb-success.cf-fb-hidden { display: none !important; }"
    ].join("\n");
    document.head.appendChild(styleEl);

    var headerMountTarget = document.querySelector(
      ".cf-account-cluster, .ds-account-cluster, .cd-global-controls, .masthead-inner"
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

    window.CaliberFeedback = {
      open: openFbModal,
      close: closeFbModal
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountFeedbackWidget);
  } else {
    mountFeedbackWidget();
  }
})();
