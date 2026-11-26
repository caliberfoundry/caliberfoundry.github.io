/**
 * AcademyForge™ (EdTech Studio v2.0) — SCORM 1.2 Binary Packager & TTL-MSM Engine
 * ===============================================================================
 * - 100% Client-Side Binary PKZIP (PK\x03\x04 + IEEE 802.3 CRC-32, Zero External CDNs)
 * - Standards-Compliant ADL SCORM 1.2 Manifest + Runtime Wrapper (LMSInitialize..LMSFinish)
 * - Bilingual EN / 한국어 Self-Contained SCO Compiler (STEMinnoKey & Global EdTech Ready)
 * - Deterministic 4-Gate TTL-MSM Clinical & Educational Rubric Engine
 */
(function (root) {
  "use strict";

  function xmlEscape(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function htmlEscape(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Precompute IEEE 802.3 CRC-32 lookup table
  const CRC32_TABLE = (function () {
    const tbl = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      tbl[i] = c >>> 0;
    }
    return tbl;
  })();

  function computeCrc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function toUtf8Bytes(input) {
    if (input instanceof Uint8Array) return input;
    if (typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(String(input == null ? "" : input));
    }
    const str = unescape(encodeURIComponent(String(input == null ? "" : input)));
    const arr = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
    return arr;
  }

  function getDosDateTime(dateObj) {
    const d = dateObj || new Date();
    const year = Math.max(1980, d.getUTCFullYear());
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const hours = d.getUTCHours();
    const mins = d.getUTCMinutes();
    const secs = Math.floor(d.getUTCSeconds() / 2);
    const dosTime = ((hours & 0x1f) << 11) | ((mins & 0x3f) << 5) | (secs & 0x1f);
    const dosDate = (((year - 1980) & 0x7f) << 9) | ((month & 0x0f) << 5) | (day & 0x1f);
    return { dosTime, dosDate };
  }

  /**
   * Builds a valid binary PKZIP archive (PK\x03\x04 store mode + UTF-8 flag + CRC-32)
   * with zero external dependencies.
   */
  function createBinaryZip(entries) {
    const { dosTime, dosDate } = getDosDateTime(new Date());
    const localChunks = [];
    const centralChunks = [];
    let localOffset = 0;

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const nameBytes = toUtf8Bytes(entry.name);
      const dataBytes = toUtf8Bytes(entry.content);
      const crc = computeCrc32(dataBytes);
      const size = dataBytes.length;

      // Local File Header (30 bytes + filename)
      const localHeader = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(localHeader.buffer);
      lv.setUint32(0, 0x04034b50, true);  // PK\x03\x04
      lv.setUint16(4, 20, true);          // Version needed (2.0)
      lv.setUint16(6, 0x0800, true);      // General purpose bit flag: UTF-8
      lv.setUint16(8, 0, true);           // Compression: 0 (STORE)
      lv.setUint16(10, dosTime, true);
      lv.setUint16(12, dosDate, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, size, true);
      lv.setUint32(22, size, true);
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true);
      localHeader.set(nameBytes, 30);

      localChunks.push(localHeader, dataBytes);

      // Central Directory Header (46 bytes + filename)
      const centralHeader = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(centralHeader.buffer);
      cv.setUint32(0, 0x02014b50, true);  // PK\x01\x02
      cv.setUint16(4, 20, true);          // Version made by
      cv.setUint16(6, 20, true);          // Version needed
      cv.setUint16(8, 0x0800, true);      // UTF-8 flag
      cv.setUint16(10, 0, true);          // Compression: 0 (STORE)
      cv.setUint16(12, dosTime, true);
      cv.setUint16(14, dosDate, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, size, true);
      cv.setUint32(24, size, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, localOffset, true);
      centralHeader.set(nameBytes, 46);

      centralChunks.push(centralHeader);
      localOffset += localHeader.length + size;
    }

    let centralSize = 0;
    for (let i = 0; i < centralChunks.length; i++) centralSize += centralChunks[i].length;

    // End of Central Directory Record (22 bytes)
    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);    // PK\x05\x06
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, entries.length, true);
    ev.setUint16(10, entries.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, localOffset, true);
    ev.setUint16(20, 0, true);

    const totalLen = localOffset + centralSize + eocd.length;
    const output = new Uint8Array(totalLen);
    let pos = 0;
    for (let i = 0; i < localChunks.length; i++) {
      output.set(localChunks[i], pos);
      pos += localChunks[i].length;
    }
    for (let i = 0; i < centralChunks.length; i++) {
      output.set(centralChunks[i], pos);
      pos += centralChunks[i].length;
    }
    output.set(eocd, pos);
    return output;
  }

  // This function also runs as a standalone script inside the exported course.
  function installScormRuntime(window) {
    var api = null;
    var initialized = false;
    var log = [];

    function findApi(frame) {
      for (var depth = 0; frame && depth < 12; depth++) {
        try {
          if (frame.API) return frame.API;
          if (frame.parent === frame) break;
          frame = frame.parent;
        } catch (error) {
          break; // A cross-origin ancestor cannot expose its SCORM adapter.
        }
      }
      return null;
    }

    function call(method, args) {
      var result = 'standalone';
      if (api) {
        try {
          result = initialized || method === 'LMSInitialize'
            ? String(api[method].apply(api, args))
            : 'not initialized';
        } catch (error) {
          result = 'LMS error';
        }
      }
      var entry = method + '(' + args.map(function (arg) { return JSON.stringify(arg); }).join(', ') + ')';
      log.push({ at: new Date().toISOString(), call: entry, result: result });
      if (typeof window.onScormWrapperEvent === 'function') window.onScormWrapperEvent(entry, result, log);
      return result === 'true';
    }

    window.AcademyForgeSCORM = {
      initialize: function () {
        if (initialized) return true;
        api = findApi(window) || findApi(window.opener);
        initialized = call('LMSInitialize', ['']);
        if (initialized) {
          this.setValue('cmi.core.score.min', '0');
          this.setValue('cmi.core.score.max', '100');
        }
        return initialized;
      },
      previous: function () {
        if (!initialized) return null;
        try {var status = api.LMSGetValue('cmi.core.lesson_status');
          return ['passed','failed','completed'].includes(status) ? {status:status,score:api.LMSGetValue('cmi.core.score.raw')} : null;} catch {return null;}
      },
      setValue: function (key, value) { return call('LMSSetValue', [String(key), String(value)]); },
      commit: function () { return call('LMSCommit', ['']); },
      reportScore: function (rawScore, masteryScore) {
        var score = Math.max(0, Math.min(100, Math.round(Number(rawScore) || 0)));
        var status = score >= (Number(masteryScore) || 80) ? 'passed' : 'failed';
        var scoreSaved = this.setValue('cmi.core.score.raw', score);
        var statusSaved = this.setValue('cmi.core.lesson_status', status);
        var committed = this.commit();
        return { score: score, status: status, connected: !!api, saved: scoreSaved && statusSaved && committed };
      },
      finish: function () {
        if (!initialized) return false;
        var ok = call('LMSFinish', ['']);
        if (ok) initialized = false;
        return ok;
      },
      getLogs: function () { return log.slice(); }
    };
    window.addEventListener('beforeunload', function () { window.AcademyForgeSCORM.finish(); });
  }

  function generateScormApiWrapperJs() {
    return '(' + installScormRuntime.toString() + ')(window);';
  }

  function generateScormManifest(courseMeta) {
    const meta = courseMeta || {};
    const id = xmlEscape(meta.identifier || "ACADEMYFORGE_SCORM12_2026");
    const title = xmlEscape(meta.title || "AcademyForge Interactive Certification Module (SCORM 1.2)");
    const itemTitle = xmlEscape(meta.itemTitle || (meta.title ? meta.title + " — Interactive SCO" : "Module 1: Interactive Scenario & Assessment"));
    const mastery = Math.max(50, Math.min(100, Number(meta.masteryScore) || 80));

    return [
      '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>',
      '<manifest identifier="' + id + '" version="1.2"',
      '          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"',
      '          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"',
      '          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
      '          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">',
      '  <metadata>',
      '    <schema>ADL SCORM</schema>',
      '    <schemaversion>1.2</schemaversion>',
      '  </metadata>',
      '  <organizations default="ORG_ACADEMYFORGE_01">',
      '    <organization identifier="ORG_ACADEMYFORGE_01">',
      '      <title>' + title + '</title>',
      '      <item identifier="ITEM_SCO_01" identifierref="RES_SCO_01" isvisible="true">',
      '        <title>' + itemTitle + '</title>',
      '        <adlcp:masteryscore>' + mastery + '</adlcp:masteryscore>',
      '      </item>',
      '    </organization>',
      '  </organizations>',
      '  <resources>',
      '    <resource identifier="RES_SCO_01" type="webcontent" adlcp:scormtype="sco" href="index.html">',
      '      <file href="index.html"/>',
      '      <file href="scorm_api_wrapper.js"/>',
      '    </resource>',
      '  </resources>',
      '</manifest>',
      ''
    ].join("\n");
  }

  function generateStandaloneScoHtml(courseData) {
    const dataJson = JSON.stringify(courseData).replace(/<\//g, "<\\/");
    return [
      "<!DOCTYPE html>",
      '<html lang="en">',
      "<head>",
      '  <meta charset="UTF-8" />',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      "  <title>" + htmlEscape(courseData.title || "AcademyForge SCORM 1.2 Lesson") + "</title>",
      '  <script src="./scorm_api_wrapper.js"></script>',
      "  <style>",
      "    * { box-sizing: border-box; margin: 0; padding: 0; }",
      "    body { background:#efedf9; color:#2c233f; font:16px/1.5 system-ui,sans-serif; padding:clamp(12px,4vw,56px) 12px; }",
      "    .shell { max-width:790px; margin:auto; padding:clamp(18px,5vw,60px); background:#fffefd; border:1px solid #c8bfdc; border-left:6px solid #7867a8; border-radius:7px 19px 19px 7px; box-shadow:4px 4px 0 #e3dced; }",
      "    .top,.lang-switch { display:flex; align-items:center; flex-wrap:wrap; gap:6px; }",
      "    .top { justify-content:space-between; margin-bottom:22px; color:#574376; font-weight:700; }",
      "    .lang-btn { border:1px solid #d5cce4; background:white; color:#514560; border-radius:18px; padding:7px 12px; cursor:pointer; }",
      "    .lang-btn.active { background:#4b3871; color:white; }",
      "    .body { display:grid; gap:16px; }",
      "    h1 { font:500 clamp(26px,4vw,40px)/1.15 Georgia,serif; letter-spacing:-.035em; overflow-wrap:anywhere; }",
      "    .opts { display:grid; gap:9px; }",
      "    .opt-btn { text-align:left; background:white; color:#302940; border:1px solid #cfc8df; border-radius:10px; padding:12px; cursor:pointer; display:flex; gap:12px; align-items:center; font:inherit; }",
      "    .opt-btn:hover { border-color:#725499; background:#f7f4fb; }",
      "    .opt-btn.correct { border-color:#216246; background:#eff8f2; }",
      "    .opt-btn.wrong { border-color:#9b5922; background:#fff7e8; }",
      "    .letter { font-size:13px; font-weight:600; width:29px; height:29px; border-radius:50%; background:#ede8f5; display:grid; place-items:center; flex:none; }",
      "    .feedback { padding:12px 16px; border-radius:8px; background:#eee9f7; }",
      "    summary { cursor:pointer; color:#4e3e6e; font-size:15px; padding:6px 0; }",
      "    .log { background:#30283e; color:white; font:12px/1.5 ui-monospace,monospace; padding:12px; overflow-wrap:anywhere; }",
      "    :focus-visible { outline:3px solid #58418f; outline-offset:3px; }",
      "    [hidden] { display:none!important; }",
      "  </style>",
      "</head>",
      "<body>",
      '  <div class="shell">',
      '    <div class="top">',
      '      <strong>AcademyForge</strong>',
      '      <div class="lang-switch" id="langSwitchWrap">',
      '        <button type="button" class="lang-btn active" id="scoLangEn">EN</button>',
      '        <button type="button" class="lang-btn" id="scoLangKo">한국어</button>',
      "      </div>",
      "    </div>",
      '    <div class="body">',
      '      <h1 id="scoQuestionStem"></h1>',
      '      <div class="opts" id="scoOptions" role="group" aria-labelledby="scoQuestionStem"></div>',
      '      <div class="feedback" id="scoFeedback" role="status" hidden></div>',
      '      <details><summary id="scoDetailLabel">Lesson details</summary><strong id="scoTitle"></strong><p id="scoSummary"></p></details>',
      '      <details><summary id="scoLogLabel">Learning system record</summary><div class="log" id="scoLog"></div></details>',
      "    </div>",
      "  </div>",
      "  <script>",
      "    var COURSE = " + dataJson + ";",
      "    var lastAttempt = null, previousGrade = null;",
      "    var currentLang = COURSE.defaultLang || 'en';",
      "    window.onScormWrapperEvent = function(callStr, res) {",
      "      var el = document.getElementById('scoLog');",
      "      if (!el) return;",
      "      var line = document.createElement('div');",
      "      line.textContent = callStr + ' -> ' + res;",
      "      el.appendChild(line);",
      "      el.scrollTop = el.scrollHeight;",
      "    };",
      "    function getActivePack() {",
      "      if (currentLang === 'ko' && COURSE.ko) return COURSE.ko;",
      "      return COURSE.en;",
      "    }",
      "    function renderSco() {",
      "      var p = getActivePack();",
      "      document.documentElement.lang = currentLang;",
      "      document.getElementById('scoDetailLabel').textContent = currentLang === 'ko' ? '수업 정보' : 'Lesson details';",
      "      document.getElementById('scoLogLabel').textContent = currentLang === 'ko' ? '학습 시스템 기록' : 'Learning system record';",
      "      document.getElementById('scoTitle').textContent = p.title;",
      "      document.getElementById('scoSummary').textContent = p.summary;",
      "      document.getElementById('scoQuestionStem').textContent = p.question;",
      "      var wrap = document.getElementById('langSwitchWrap');",
      "      if (!COURSE.ko) { wrap.style.display = 'none'; }",
      "      document.getElementById('scoLangEn').className = 'lang-btn' + (currentLang === 'en' ? ' active' : '');",
      "      document.getElementById('scoLangKo').className = 'lang-btn' + (currentLang === 'ko' ? ' active' : '');",
      "      var optsEl = document.getElementById('scoOptions');",
      "      var feedback = document.getElementById('scoFeedback');",
      "      optsEl.after(feedback);",
      "      optsEl.innerHTML = '';",
      "      if(previousGrade){feedback.hidden=false;feedback.textContent='Recorded attempt: '+previousGrade.status+' · '+previousGrade.score+'/100';}",
      "      p.options.forEach(function(o) {",
      "        var b = document.createElement('button');",
      "        b.type = 'button';",
      "        b.disabled = !!previousGrade || !!(lastAttempt && lastAttempt.result.connected && (lastAttempt.result.saved || lastAttempt.letter !== o.letter));",
      "        var selected = lastAttempt && lastAttempt.letter === o.letter;",
      "        b.className = selected ? 'opt-btn ' + (o.correct ? 'correct' : 'wrong') : 'opt-btn';",
      "        b.setAttribute('aria-pressed', String(!!selected));",
      "        if (selected) {",
      "          var result = lastAttempt.result;",
      "          var label = currentLang === 'ko' ? (result.saved ? 'LMS에 저장됨' : result.connected ? 'LMS 저장 실패' : '로컬 연습') : (result.saved ? 'Saved to LMS' : result.connected ? 'LMS could not save this attempt' : 'Local practice');",
      "          document.getElementById('scoFeedback').textContent = result.score + '/100 · ' + o.rationale + ' · ' + label;",
      "        }",
      "        var l = document.createElement('span'); l.className = 'letter'; l.textContent = o.letter;",
      "        var txt = document.createElement('div');",
      "        var st = document.createElement('strong'); st.textContent = o.title;",
      "        txt.appendChild(st);",
      "        b.appendChild(l); b.appendChild(txt);",
      "        b.addEventListener('click', function() {",
      "          lastAttempt = { letter: o.letter, result: window.AcademyForgeSCORM.reportScore(o.correct ? 100 : 0, COURSE.masteryScore) };",
      "          renderSco();",
      "          optsEl.querySelector('[aria-pressed=true]').focus();",
      "        });",
      "        optsEl.appendChild(b);",
      "        if (selected) { feedback.hidden = false; b.after(feedback); }",
      "      });",
      "    }",
      "    document.getElementById('scoLangEn').addEventListener('click', function() { currentLang = 'en'; renderSco(); });",
      "    document.getElementById('scoLangKo').addEventListener('click', function() { if (COURSE.ko) { currentLang = 'ko'; renderSco(); } });",
      "    window.AcademyForgeSCORM.initialize();",
      "    previousGrade = window.AcademyForgeSCORM.previous();",
      "    renderSco();",
      "  </script>",
      "</body>",
      "</html>",
      ""
    ].join("\n");
  }

  function compileScorm12Zip(courseData, schemaFiles = []) {
    const manifestXml = generateScormManifest({
      identifier: courseData.identifier,
      title: (courseData.en && courseData.en.title) || courseData.title,
      masteryScore: courseData.masteryScore || 80
    });
    const wrapperJs = generateScormApiWrapperJs();
    const indexHtml = generateStandaloneScoHtml(courseData);

    const entries = [
      { name: "imsmanifest.xml", content: manifestXml },
      { name: "scorm_api_wrapper.js", content: wrapperJs },
      { name: "index.html", content: indexHtml },
      ...schemaFiles
    ];

    const zipBytes = createBinaryZip(entries);
    return {
      zipBytes,
      byteLength: zipBytes.length,
      manifestXml,
      wrapperJs,
      indexHtml,
      crc32Manifest: computeCrc32(toUtf8Bytes(manifestXml))
    };
  }

  const TTL_MSM_ENGINE = {
    evaluate: function (inputs) {
      const labels={parentL1:"Home language",teacherObs:"Classroom observation",languageSample:"Narrative sample",dynamicAssessment:"Response to teaching"};
      const trace=Object.entries(labels).map(([key,name],index)=>{
        const rating=Number(inputs[key]);if(![0,1,2].includes(rating))throw Error("Choose a rating of 0, 1 or 2.");
        return {gate:"Observation "+(index+1),name,inputVal:rating+"/2",outcome:["Lower observed rating","Intermediate observed rating","Higher observed rating"][rating],rating,passed:rating>=1};
      });
      const totalScore=trace.reduce((sum,item)=>sum+item.rating,0);
      return {verdictCode:"OBSERVATIONS",verdictTitle:"Recorded observations",verdictColor:"emerald",totalScore,maxScore:8,
        clinicalSummary:trace.map(item=>item.name+" "+item.inputVal).join(" · ")+". Use this classroom record to discuss what additional evidence to collect.",trace};
    },
    generateScormManifest: generateScormManifest,
    generateScormApiWrapperJs: generateScormApiWrapperJs,
    compileScorm12Zip: compileScorm12Zip,
    createBinaryZip: createBinaryZip,
    computeCrc32: computeCrc32
  };

  root.TTL_MSM_ENGINE = TTL_MSM_ENGINE;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = TTL_MSM_ENGINE;
  }
})(typeof window !== "undefined" ? window : globalThis);
