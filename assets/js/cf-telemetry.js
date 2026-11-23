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
})();
