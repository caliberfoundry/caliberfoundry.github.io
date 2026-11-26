/* Editable public sample templates. */
window.CONTENTFORGE_DATA={
  "meta": {
    "productName": "ContentForge™ — Multi-Format B2B, EdTech & Technical Content Generation Studio",
    "version": "2026.11-ENT",
    "architecture": "Citation-Gated AST Extraction + Multi-Model Structured JSON Output + n8n / FastAPI / SCORM 1.2 Dispatch",
    "defaultPresetId": "n8n-pipeline",
    "freePresetIds": [
      "n8n-pipeline",
      "eval-harness"
    ],
    "validLicenseKeyDigests": [
      "2081216b02af5cc9a81d3bd81d5371e6287df9bd5f059b759706a5f203f67ccf",
      "dfead5f6340733438ee01620308c1bd16661a131bfa488f5a333e321484dd321",
      "4c121399b298f07cd2d61cf1dfe2736df5ab9ac24dd8f7df4253fd06962b7924",
      "aa368e25aced9f219906f8cfb603966c65f4edfa2baf81d1ace7665f42e83f3b",
      "0219f433cd945512924e9061d2d097efe7a79d80818f582d96282b3111b323c0"
    ]
  },
  "presets": [
    {
      "id": "n8n-pipeline",
      "badge": "Workflow payload example",
      "title": "n8n & Multi-Model Document Extraction -> Multi-Channel Content Pipeline",
      "sector": "B2B Revenue & Content Operations (n8n / Make.com / REST Webhooks)",
      "hallucinationRate": "0.0%",
      "citationPrecision": "100.0%",
      "avgLatencyMs": 380,
      "costPerRunUsd": "$0.014",
      "webhookEndpoint": "https://n8n.caliberfoundry-staging.io/webhook/v2/content-ingest-dispatch",
      "sourceTitle": "SEC Form 10-K & Enterprise SaaS Security Compliance Dossier (2026-Q3)",
      "sourceText": "[Clause 1.1] Vanguard Cloud Infrastructure Corp. (VCIC) reported Fiscal Q3 2026 Annual Recurring Revenue (ARR) of $148.6 million, representing a 34.2% year-over-year expansion across regulated enterprise accounts. [Clause 2.4] Net Dollar Retention (NDR) reached 126.8% for enterprise cohorts with annual contract values (ACV) exceeding $100,000, up from 119.4% in Fiscal Q3 2025. [Table 3, Row 4] Gross margin on core multi-region ingestion workloads improved by 410 basis points to 81.6% following the migration from third-party OCR APIs to deterministic Rust/WASM PDF AST parsing nodes. [Table 3, Row 7] Median document-to-webhook pipeline latency dropped from 4,820 milliseconds to 380 milliseconds per 50-page filing while reducing inference token expenditure by 72.5% ($0.014 per full multi-channel run). [Clause 4.2] Under SOC 2 Type II and ISO/IEC 27001:2022 controls, 100.0% of synthesized customer-facing claims must be cryptographically anchored to an immutable source span ID (SHA-256 content hash) prior to outbound n8n webhook dispatch. [Clause 4.5] Any generated statement lacking a verified bounding-box or clause pointer is automatically quarantined by the pre-flight Citation Gate and routed to a Dead-Letter Queue (DLQ) in PostgreSQL. [Section 6.2] Enterprise customers deploying the n8n multi-channel connector automated 1,420 weekly technical monographs, HubSpot CRM deal briefs, LinkedIn executive carousels, and customer onboarding modules with zero factual regressions across 90 consecutive days. [Section 8.1] Customer Acquisition Cost (CAC) payback period compressed from 19.2 months to 11.4 months across Fortune 1000 financial and healthcare verticals.",
      "schemaTemplate": "{\n  \"$schema\": \"https://json-schema.org/draft/2020-12/schema\",\n  \"title\": \"n8nCitationGatedContentContract_v2\",\n  \"type\": \"object\",\n  \"required\": [\"workflowId\", \"sourceChecksumSha256\", \"citationGatePassed\", \"extractedClaims\", \"channels\"],\n  \"properties\": {\n    \"workflowId\": { \"type\": \"string\", \"const\": \"wf_n8n_doc_to_multichannel_v2\" },\n    \"sourceChecksumSha256\": { \"type\": \"string\", \"pattern\": \"^[a-f0-9]{64}$\" },\n    \"citationGatePassed\": { \"type\": \"boolean\", \"const\": true },\n    \"extractedClaims\": {\n      \"type\": \"array\",\n      \"minItems\": 6,\n      \"items\": {\n        \"type\": \"object\",\n        \"required\": [\"claimId\", \"sourceClause\", \"verbatimQuote\", \"numericMetric\"],\n        \"properties\": {\n          \"claimId\": { \"type\": \"string\" },\n          \"sourceClause\": { \"type\": \"string\" },\n          \"verbatimQuote\": { \"type\": \"string\" },\n          \"numericMetric\": { \"type\": \"string\" }\n        }\n      }\n    },\n    \"channels\": {\n      \"type\": \"object\",\n      \"required\": [\"editorialMonograph\", \"xThreadCards\", \"remotionStoryboard\", \"scormQuizItem\"]\n    }\n  }\n}",
      "pipelineStages": [
        {
          "step": "01",
          "name": "Ingestion & AST Span Indexing",
          "tech": "n8n Webhook Node + Deterministic PDF/Text Span Tokenizer",
          "latency": "58ms",
          "status": "VERIFIED",
          "detail": "Segments raw Form 10-K / technical dossier into immutable clause anchors ([Clause 1.1]..[Section 8.1]) with SHA-256 span hashes."
        },
        {
          "step": "02",
          "name": "Structured Claim & Metric Extraction",
          "tech": "Strict JSON-Schema Parser + Regex Numeric Invariant Guard",
          "latency": "112ms",
          "status": "VERIFIED",
          "detail": "Extracts exact financial and operational metrics ($148.6M ARR, 126.8% NDR, 380ms latency, $0.014/run) bound to source clause IDs."
        },
        {
          "step": "03",
          "name": "Deterministic Citation Gate & DLQ Check",
          "tech": "Zero-Hallucination Substring & Numeric Verifier",
          "latency": "44ms",
          "status": "VERIFIED",
          "detail": "Cross-verifies every generated number and assertion against source spans; quarantines unanchored claims before channel synthesis."
        },
        {
          "step": "04",
          "name": "Multi-Format Asset Synthesis",
          "tech": "Parallel Channel Compiler (Monograph + SCORM + Social + Video)",
          "latency": "118ms",
          "status": "VERIFIED",
          "detail": "Compiles long-form B2B technical monograph, 5-option certification quiz item, 6-card X thread, and 5-scene Remotion storyboard."
        },
        {
          "step": "05",
          "name": "n8n / Make.com / Webhook Dispatch",
          "tech": "Signed HMAC-SHA256 REST Webhook + PostgreSQL Audit Log",
          "latency": "48ms",
          "status": "VERIFIED",
          "detail": "Dispatches validated JSON payload to HubSpot, Webflow CMS, LMS SCORM endpoint, and Slack editorial review channel."
        }
      ],
      "monograph": {
        "headline": "Eliminating Enterprise Content Hallucinations: How Citation-Gated n8n Pipelines Cut Latency by 92% and Compress CAC Payback to 11.4 Months",
        "subtitle": "Architectural Benchmark Report on Deterministic AST Parsing, Schema-Constrained Synthesis, and Multi-Channel Webhook Orchestration",
        "executiveSummary": "Enterprise revenue and technical documentation teams face an acute bottleneck: unstructured regulatory filings, engineering dossiers, and quarterly financial disclosures must be transformed into customer-facing monographs, training modules, and social campaigns without introducing a single fabricated metric. In Fiscal Q3 2026, Vanguard Cloud Infrastructure Corp. ($148.6M ARR, +34.2% YoY) demonstrated that replacing fragile prompt chains with a deterministic n8n + AST span-anchoring pipeline reduced end-to-end processing latency from 4,820ms to 380ms while enforcing 100.0% citation precision across 1,420 weekly deliverables.",
        "sections": [
          {
            "heading": "1. Unit Economics & Gross Margin Expansion via Deterministic AST Parsing",
            "body": "Legacy content workflows rely on monolithic third-party OCR APIs and unconstrained text generation that inflate token consumption and require hours of manual legal review. By migrating document ingestion to deterministic Rust/WASM PDF AST parsing nodes inside an automated n8n workflow, gross margin on core multi-region ingestion workloads expanded by 410 basis points to 81.6%, while per-run compute cost dropped by 72.5% to $0.014 per full multi-channel package.",
            "citationRef": "[Table 3, Row 4 & Row 7]"
          },
          {
            "heading": "2. Cryptographic Citation Gates & Dead-Letter Queue Quarantine",
            "body": "To satisfy SOC 2 Type II and ISO/IEC 27001:2022 audit trails, every synthesized sentence in the outbound monograph, quiz bank, or social sequence must carry a cryptographic pointer to its originating clause span. The pre-flight Citation Gate verifies exact numeric and substring alignment against the source document; any unanchored claim is intercepted in 44ms and routed to a PostgreSQL Dead-Letter Queue (DLQ) rather than reaching production.",
            "citationRef": "[Clause 4.2 & Clause 4.5]"
          },
          {
            "heading": "3. Commercial Velocity: 126.8% Net Dollar Retention & 11.4-Month CAC Payback",
            "body": "Across enterprise cohorts with annual contract values exceeding $100,000, automated delivery of verified technical monographs, HubSpot deal briefs, and SCORM onboarding modules drove Net Dollar Retention to 126.8% (up from 119.4% YoY) and compressed Customer Acquisition Cost payback from 19.2 months to 11.4 months across Fortune 1000 financial and healthcare customers.",
            "citationRef": "[Clause 2.4, Section 6.2 & Section 8.1]"
          }
        ],
        "svgDiagramTitle": "Deterministic n8n + Citation-Gated Multi-Channel Pipeline Architecture (380ms E2E)",
        "keyTakeaways": [
          "$148.6M Fiscal Q3 2026 ARR (+34.2% YoY) with 126.8% Net Dollar Retention in >$100K ACV accounts [Clause 1.1, Clause 2.4]",
          "380ms median 50-page pipeline latency (down from 4,820ms) and 81.6% gross margin (+410 bps) at $0.014/run [Table 3, Row 4 & Row 7]",
          "100.0% cryptographic span anchoring under SOC 2 Type II / ISO 27001 with automated PostgreSQL DLQ quarantine [Clause 4.2, Clause 4.5]"
        ]
      },
      "evalCases": [
        {
          "id": "EVAL-01",
          "sourceRef": "Clause 1.1 (p. 2)",
          "groundTruth": "Fiscal Q3 2026 ARR of $148.6 million (+34.2% YoY)",
          "generatedClaim": "VCIC achieved $148.6M ARR in Fiscal Q3 2026, up 34.2% YoY.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "42ms",
          "cost": "$0.002",
          "status": "PASS"
        },
        {
          "id": "EVAL-02",
          "sourceRef": "Clause 2.4 (p. 5)",
          "groundTruth": "NDR reached 126.8% for ACV > $100,000 (up from 119.4%)",
          "generatedClaim": "Enterprise NDR (> $100K ACV) expanded from 119.4% to 126.8%.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "38ms",
          "cost": "$0.002",
          "status": "PASS"
        },
        {
          "id": "EVAL-03",
          "sourceRef": "Table 3, Row 4 (p. 9)",
          "groundTruth": "Gross margin improved by 410 bps to 81.6% via Rust/WASM AST",
          "generatedClaim": "Core ingestion gross margin rose 410 basis points to 81.6%.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "51ms",
          "cost": "$0.003",
          "status": "PASS"
        },
        {
          "id": "EVAL-04",
          "sourceRef": "Table 3, Row 7 (p. 9)",
          "groundTruth": "Latency dropped from 4,820ms to 380ms; token cost -72.5% ($0.014)",
          "generatedClaim": "Median pipeline latency fell from 4,820ms to 380ms at $0.014/run.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "49ms",
          "cost": "$0.002",
          "status": "PASS"
        },
        {
          "id": "EVAL-05",
          "sourceRef": "Clause 4.2 & 4.5 (p. 14)",
          "groundTruth": "100% SHA-256 span anchoring; unanchored claims routed to PostgreSQL DLQ",
          "generatedClaim": "Unanchored statements are quarantined to PostgreSQL DLQ under SOC 2 controls.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "44ms",
          "cost": "$0.003",
          "status": "PASS"
        },
        {
          "id": "EVAL-06",
          "sourceRef": "Section 8.1 (p. 22)",
          "groundTruth": "CAC payback compressed from 19.2 months to 11.4 months",
          "generatedClaim": "Enterprise CAC payback period compressed from 19.2 to 11.4 months.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "36ms",
          "cost": "$0.002",
          "status": "PASS"
        }
      ],
      "webhookPayload": {
        "workflowId": "wf_n8n_doc_to_multichannel_v2",
        "executionId": "exec_20261122_994182a",
        "timestampUtc": "2026-11-22T20:45:00Z",
        "webhookDestination": "https://n8n.caliberfoundry-staging.io/webhook/v2/content-ingest-dispatch",
        "citationGatePassed": true,
        "hallucinationScore": 0,
        "citationPrecisionScore": 1,
        "checksumSha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "extractedEntities": {
          "company": "Vanguard Cloud Infrastructure Corp. (VCIC)",
          "period": "Fiscal Q3 2026",
          "arrUsd": 148600000,
          "arrGrowthYoYPercent": 34.2,
          "ndrEnterprisePercent": 126.8,
          "grossMarginPercent": 81.6,
          "pipelineLatencyMs": 380,
          "costPerRunUsd": 0.014,
          "cacPaybackMonths": 11.4
        },
        "synthesizedAssets": {
          "monographSlug": "vcic-q3-2026-citation-gated-n8n-architecture",
          "scormPackageId": "SCORM12-VCIC-SOC2-DLQ-01",
          "xThreadCardCount": 6,
          "remotionStoryboardScenes": 5,
          "hubspotDealBriefSynced": true
        }
      },
      "courseModule": {
        "moduleTitle": "Module 4: SOC 2 Type II Citation Gates & Dead-Letter Queue Architecture in n8n Pipelines",
        "objective": "Verify how deterministic AST span hashing prevents unanchored claims from reaching outbound enterprise webhooks.",
        "quizStem": "During an automated n8n execution processing Vanguard Cloud Infrastructure Corp.'s Fiscal Q3 2026 filing, a downstream synthesis node generates a sentence stating that 'Gross margin reached 85.0% and CAC payback fell to 9.0 months.' Under [Table 3, Row 4], [Clause 4.2], [Clause 4.5], and [Section 8.1] of the governing dossier, how must the pre-flight Citation Gate handle this payload, and what are the true verified metrics?",
        "options": [
          {
            "letter": "A",
            "text": "Dispatch the webhook immediately and log a warning afterwards, because 85.0% is within a 5% tolerance band of 81.6%.",
            "isCorrect": false,
            "rationale": "Violates [Clause 4.2] and [Clause 4.5], which require 100.0% cryptographic span anchoring and zero tolerance for unverified numeric claims prior to outbound n8n dispatch."
          },
          {
            "letter": "B",
            "text": "Automatically quarantine the payload before outbound n8n webhook dispatch and route it to the PostgreSQL Dead-Letter Queue (DLQ), because the verified source metrics are 81.6% gross margin (+410 bps) under [Table 3, Row 4] and 11.4 months CAC payback (down from 19.2 months) under [Section 8.1].",
            "isCorrect": true,
            "rationale": "CORRECT: [Clause 4.2] and [Clause 4.5] mandate pre-flight quarantine to the PostgreSQL DLQ for any claim lacking an exact verified span match, while [Table 3, Row 4] and [Section 8.1] establish 81.6% gross margin and 11.4 months CAC payback."
          },
          {
            "letter": "C",
            "text": "Quarantine the payload to the Dead-Letter Queue, because the true gross margin is 72.5% and the true CAC payback period is 19.2 months.",
            "isCorrect": false,
            "rationale": "72.5% is the token expenditure reduction ([Table 3, Row 7]) and 19.2 months was the prior baseline CAC payback before compression to 11.4 months ([Section 8.1])."
          },
          {
            "letter": "D",
            "text": "Strip all numeric metrics from the monograph and publish an unquantified summary to Webflow CMS without running the SHA-256 span verifier.",
            "isCorrect": false,
            "rationale": "Bypassing the SHA-256 span verifier violates SOC 2 Type II and ISO/IEC 27001:2022 controls specified in [Clause 4.2]."
          },
          {
            "letter": "E",
            "text": "Fallback to third-party OCR APIs at 4,820ms latency whenever a numeric mismatch occurs.",
            "isCorrect": false,
            "rationale": "4,820ms was the legacy pipeline latency prior to the Rust/WASM AST migration described in [Table 3, Row 4 & Row 7]."
          }
        ],
        "goldenQuote": "[Clause 4.5] Any generated statement lacking a verified bounding-box or clause pointer is automatically quarantined by the pre-flight Citation Gate and routed to a Dead-Letter Queue (DLQ) in PostgreSQL."
      },
      "socialAndVideo": {
        "threadCards": [
          {
            "index": "01/06",
            "hook": "Why 90% of B2B content automation pipelines fail enterprise security reviews:",
            "body": "Unconstrained prompt chains invent metrics. Here is how we engineered a deterministic n8n + Rust/WASM AST pipeline that cut 50-page processing latency from 4,820ms to 380ms with 0.0% hallucination.",
            "metricTag": "380ms E2E // 0.0% HALLUCINATION"
          },
          {
            "index": "02/06",
            "hook": "Step 1: Stop treating PDFs as flat text blobs.",
            "body": "Before any synthesis node runs, our ingestion parser indexes every paragraph and table cell into immutable clause spans ([Clause 1.1], [Table 3, Row 4]) with SHA-256 content hashes.",
            "metricTag": "SHA-256 AST SPAN INDEXING"
          },
          {
            "index": "03/06",
            "hook": "Step 2: Schema-constrained JSON extraction + Pre-Flight Citation Gate.",
            "body": "Under SOC 2 Type II and ISO 27001 controls ([Clause 4.2]), 100% of outbound claims must resolve to a verified source span ID. Unanchored numbers are quarantined to a PostgreSQL Dead-Letter Queue in 44ms.",
            "metricTag": "100.0% CITATION PRECISION"
          },
          {
            "index": "04/06",
            "hook": "Step 3: The unit economics of deterministic parsing.",
            "body": "Replacing third-party OCR APIs with Rust/WASM AST nodes expanded core ingestion gross margin by +410 bps to 81.6% and slashed per-run compute cost by 72.5% to $0.014.",
            "metricTag": "81.6% GROSS MARGIN // $0.014/RUN"
          },
          {
            "index": "05/06",
            "hook": "Step 4: One source dossier -> Four synchronized enterprise channels.",
            "body": "A single n8n webhook trigger compiles: (1) an executive monograph, (2) a ground-truth evaluation matrix, (3) a 5-option SCORM certification quiz, and (4) a 60fps Remotion video storyboard.",
            "metricTag": "1,420 WEEKLY DELIVERABLES"
          },
          {
            "index": "06/06",
            "hook": "The commercial outcome across regulated Fortune 1000 accounts:",
            "body": "$148.6M ARR (+34.2% YoY), 126.8% Net Dollar Retention in >$100K ACV cohorts, and CAC payback compressed from 19.2 months to 11.4 months. Inspect the live architecture below.",
            "metricTag": "126.8% NDR // 11.4MO CAC PAYBACK"
          }
        ],
        "storyboard": [
          {
            "scene": "Scene 01 (00:00–00:08)",
            "visual": "Split-screen kinetic typography: Legacy 4,820ms OCR pipeline flashing red hallucination warnings vs. ContentForge 380ms deterministic AST pipeline locking green SHA-256 clause badges.",
            "voiceover": "Enterprise technical and financial teams cannot afford a single hallucinated number in customer-facing publications.",
            "dataOverlay": "LATENCY: 4,820ms -> 380ms (-92.1%) // COST: $0.014/RUN"
          },
          {
            "scene": "Scene 02 (00:08–00:17)",
            "visual": "Zoom into SEC Form 10-K document canvas as [Clause 1.1], [Table 3, Row 4], and [Clause 4.2] highlight in warm amber and snap into a strict JSON Schema contract.",
            "voiceover": "ContentForge parses complex filings into cryptographic span anchors before a single downstream channel asset is synthesized.",
            "dataOverlay": "AST TOKENIZER: 58ms // 100.0% SPAN COVERAGE"
          },
          {
            "scene": "Scene 03 (00:17–00:26)",
            "visual": "Animated Citation Gate firewall intercepting an unanchored claim and routing it into a PostgreSQL Dead-Letter Queue while verified claims pass through at 44ms.",
            "voiceover": "Every claim passes through a deterministic Citation Gate. If a number does not match the ground-truth table cell, it is quarantined automatically.",
            "dataOverlay": "SOC 2 TYPE II & ISO 27001 GATE // 0.0% HALLUCINATION"
          },
          {
            "scene": "Scene 04 (00:26–00:35)",
            "visual": "Four-quadrant n8n dispatch fan-out: B2B Editorial Monograph, Ground-Truth Evaluation Matrix, SCORM 1.2 Quiz Module, and 6-Card Social Carousel rendering simultaneously.",
            "voiceover": "From one verified payload, n8n dispatches long-form monographs, LMS certification quizzes, CRM briefs, and social threads in under 400 milliseconds.",
            "dataOverlay": "1,420 WEEKLY ASSETS // 81.6% GROSS MARGIN (+410 BPS)"
          },
          {
            "scene": "Scene 05 (00:35–00:45)",
            "visual": "Executive telemetry dashboard displaying $148.6M ARR, 126.8% Net Dollar Retention, and CAC payback compression from 19.2 to 11.4 months.",
            "voiceover": "Deterministic content engineering turns regulatory complexity into commercial velocity. Deploy ContentForge on your n8n infrastructure today.",
            "dataOverlay": "$148.6M ARR (+34.2% YoY) // 11.4-MONTH CAC PAYBACK"
          }
        ]
      }
    },
    {
      "id": "eval-harness",
      "badge": "Document evaluation example",
      "title": "Production Document Extraction & Ground-Truth Evaluation Harness",
      "sector": "Enterprise Document Engineering & Automated Quality Gate (Python / FastAPI / TypeScript)",
      "hallucinationRate": "0.0%",
      "citationPrecision": "100.0%",
      "avgLatencyMs": 410,
      "costPerRunUsd": "$0.018",
      "webhookEndpoint": "https://eval-api.caliberfoundry-staging.io/v1/harness/verify-extraction",
      "sourceTitle": "Senior Secured Credit Agreement & Syndicated Covenant Compliance Memorandum (FY2026)",
      "sourceText": "[Article I, Section 1.01] Under the Senior Secured Revolving Credit Facility dated October 15, 2026 among Meridian Industrial Holdings Inc. (Borrower) and JPMorgan Chase Bank, N.A. (Administrative Agent), Total Aggregate Commitments equal $325,000,000 with a maturity date of October 15, 2031. [Article II, Section 2.08] The Applicable Margin on Term SOFR Advances is 275 basis points (2.75%) per annum when the Consolidated Net Leverage Ratio is less than 2.50 to 1.00, stepping up to 325 basis points (3.25%) when Consolidated Net Leverage is equal to or greater than 2.50 to 1.00. [Schedule 5.12, Table 1, Cell D4] For the trailing twelve months (TTM) ended September 30, 2026, Consolidated Adjusted EBITDA was $84,400,000 on Net Revenue of $412,000,000 (20.49% Adjusted EBITDA margin). [Schedule 5.12, Table 1, Cell F8] Total Funded Senior Debt stood at $189,900,000 less Unrestricted Cash of $21,100,000, yielding Consolidated Net Debt of $168,800,000 and a certified Consolidated Net Leverage Ratio of 2.00 to 1.00. [Article VII, Section 7.11(a)] The Maximum Consolidated Net Leverage Covenant requires the Borrower to maintain a ratio not to exceed 3.50 to 1.00 at the end of any fiscal quarter, stepping down to 3.25 to 1.00 commencing December 31, 2027. [Article VII, Section 7.11(b)] The Minimum Consolidated Interest Coverage Ratio covenant requires Adjusted EBITDA to Cash Interest Expense ($14,066,667 TTM) to be at least 3.00 to 1.00; actual certified coverage for Q3 2026 is 6.00 to 1.00. [Appendix B, Benchmark Note 9] Production extraction pipelines audited by the Ground-Truth Evaluation Harness must achieve a Table Cell F1 score of at least 99.4% and 100.0% numeric covenant exact-match accuracy across 250 multi-page credit agreements before promotion to production.",
      "schemaTemplate": "{\n  \"$schema\": \"https://json-schema.org/draft/2020-12/schema\",\n  \"title\": \"CreditAgreementEvalHarnessContract_v1\",\n  \"type\": \"object\",\n  \"required\": [\"facilityCommitmentUsd\", \"pricingGridBps\", \"ttmMetrics\", \"covenantCompliance\", \"evalTelemetry\"],\n  \"properties\": {\n    \"facilityCommitmentUsd\": { \"type\": \"integer\", \"const\": 325000000 },\n    \"pricingGridBps\": {\n      \"type\": \"object\",\n      \"required\": [\"tier1Below2_50xBps\", \"tier2AtOrAbove2_50xBps\"],\n      \"properties\": {\n        \"tier1Below2_50xBps\": { \"type\": \"integer\", \"const\": 275 },\n        \"tier2AtOrAbove2_50xBps\": { \"type\": \"integer\", \"const\": 325 }\n      }\n    },\n    \"ttmMetrics\": {\n      \"type\": \"object\",\n      \"required\": [\"adjustedEbitdaUsd\", \"netDebtUsd\", \"netLeverageRatio\", \"interestCoverageRatio\"]\n    },\n    \"covenantCompliance\": {\n      \"type\": \"object\",\n      \"required\": [\"maxAllowedNetLeverage\", \"minAllowedInterestCoverage\", \"inCompliance\"]\n    },\n    \"evalTelemetry\": {\n      \"type\": \"object\",\n      \"required\": [\"tableCellF1Percent\", \"numericExactMatchPercent\", \"hallucinationRatePercent\"]\n    }\n  }\n}",
      "pipelineStages": [
        {
          "step": "01",
          "name": "Multi-Page PDF Table & Clause Decomposition",
          "tech": "FastAPI + Coordinate Bounding-Box Table Reconstructor",
          "latency": "78ms",
          "status": "VERIFIED",
          "detail": "Parses 140-page credit agreement and Schedule 5.12 financial tables into addressable cell coordinates ([Table 1, Cell D4], [Cell F8])."
        },
        {
          "step": "02",
          "name": "Deterministic Financial Arithmetic Cross-Check",
          "tech": "Python Decimal Invariant Engine (Debt - Cash / EBITDA)",
          "latency": "64ms",
          "status": "VERIFIED",
          "detail": "Verifies $189.9M Funded Debt - $21.1M Unrestricted Cash = $168.8M Net Debt / $84.4M EBITDA = 2.00x Net Leverage."
        },
        {
          "step": "03",
          "name": "Ground-Truth Golden Dataset Diffing",
          "tech": "Automated Cell-Level F1 & Exact-Match Harness (250 Docs)",
          "latency": "92ms",
          "status": "VERIFIED",
          "detail": "Scores extracted JSON fields against human-annotated golden credit agreements, achieving 99.4% Table Cell F1 and 100.0% numeric precision."
        },
        {
          "step": "04",
          "name": "Credit Committee Monograph & Risk Matrix Synthesis",
          "tech": "Citation-Locked Financial Memo & Covenant Generator",
          "latency": "124ms",
          "status": "VERIFIED",
          "detail": "Generates syndicated credit committee memorandum, interactive covenant audit quiz, and executive briefing cards."
        },
        {
          "step": "05",
          "name": "CI/CD Quality Gate & Production Webhook Promotion",
          "tech": "GitHub Actions Regression Gate + Signed REST Payload",
          "latency": "52ms",
          "status": "VERIFIED",
          "detail": "Blocks deployment if any numeric covenant drifts by >0.00%; promotes verified extraction bundle to portfolio risk database."
        }
      ],
      "monograph": {
        "headline": "Production-Grade Document Extraction: Engineering a 99.4% Table-Cell F1 Evaluation Harness for Syndicated Credit Agreements",
        "subtitle": "Deterministic Arithmetic Verification and Zero-Regression CI/CD Quality Gates for Complex Financial & Legal Filings",
        "executiveSummary": "In institutional credit underwriting and enterprise document engineering, a single misread basis point or shifted table column in a 140-page Senior Secured Credit Agreement creates millions of dollars in exposure. By pairing coordinate-aware table reconstruction with an automated Ground-Truth Evaluation Harness across 250 benchmark agreements, our production pipeline enforces 100.0% numeric exact-match precision and 99.4% Table Cell F1 before any extracted covenant or credit committee memorandum enters downstream portfolio systems.",
        "sections": [
          {
            "heading": "1. Coordinate-Locked Table Extraction & Decimal Arithmetic Verification",
            "body": "Standard text chunkers destroy the spatial relationship between pricing grid tiers and financial schedule cells. Our pipeline indexes exact table coordinates—such as Schedule 5.12, Table 1, Cell D4 ($84,400,000 TTM Adjusted EBITDA) and Cell F8 ($168,800,000 Consolidated Net Debt after deducting $21,100,000 Unrestricted Cash from $189,900,000 Total Funded Debt)—and runs deterministic decimal arithmetic to verify the resulting 2.00 to 1.00 Consolidated Net Leverage Ratio.",
            "citationRef": "[Schedule 5.12, Table 1, Cell D4 & Cell F8]"
          },
          {
            "heading": "2. Pricing Grid Tier Resolution & Covenant Headroom Analysis",
            "body": "Because Meridian Industrial Holdings Inc.'s certified Net Leverage Ratio of 2.00x is below the 2.50x threshold in Article II, Section 2.08, the harness deterministically resolves the Applicable Margin on Term SOFR Advances to 275 basis points (rather than the 325 bps step-up tier). Simultaneously, it verifies 1.50 turns of headroom under the 3.50x Maximum Net Leverage Covenant and 6.00x actual Interest Coverage against the 3.00x minimum covenant.",
            "citationRef": "[Article II, Section 2.08 & Article VII, Section 7.11(a)-(b)]"
          },
          {
            "heading": "3. Continuous Regression Gating Across 250 Golden Filings",
            "body": "Every parser or prompt template modification is benchmarked automatically against 250 human-verified filings prior to production release. Promotion requires passing a hard CI/CD threshold of >= 99.4% Table Cell F1 and 0.0% numeric hallucination at an average latency of 410ms per document package.",
            "citationRef": "[Appendix B, Benchmark Note 9]"
          }
        ],
        "svgDiagramTitle": "Ground-Truth Document Extraction & CI/CD Evaluation Harness Architecture (99.4% Table F1)",
        "keyTakeaways": [
          "$325.0M Senior Secured Revolving Credit Facility maturing October 15, 2031 at Term SOFR + 275 bps [Article I, Sec 1.01; Article II, Sec 2.08]",
          "$84.4M TTM Adjusted EBITDA (20.49% margin) and $168.8M Net Debt yielding 2.00x Net Leverage vs. 3.50x max covenant [Schedule 5.12; Article VII, Sec 7.11(a)]",
          "6.00x actual Interest Coverage ($84.4M EBITDA / $14.07M Cash Interest) vs. 3.00x min covenant, verified at 99.4% Table Cell F1 [Article VII, Sec 7.11(b); Appendix B]"
        ]
      },
      "evalCases": [
        {
          "id": "EVAL-01",
          "sourceRef": "Article I, Sec 1.01",
          "groundTruth": "Total Aggregate Commitments: $325,000,000 (Maturity Oct 15, 2031)",
          "generatedClaim": "Senior Secured Revolving Facility commitment is $325,000,000 maturing Oct 15, 2031.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "62ms",
          "cost": "$0.003",
          "status": "PASS"
        },
        {
          "id": "EVAL-02",
          "sourceRef": "Article II, Sec 2.08",
          "groundTruth": "Term SOFR + 275 bps (< 2.50x leverage) or + 325 bps (>= 2.50x)",
          "generatedClaim": "Applicable Margin resolves to 275 bps at 2.00x Net Leverage (< 2.50x threshold).",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "68ms",
          "cost": "$0.003",
          "status": "PASS"
        },
        {
          "id": "EVAL-03",
          "sourceRef": "Schedule 5.12, Cell D4",
          "groundTruth": "TTM Consolidated Adjusted EBITDA: $84,400,000 on $412,000,000 Revenue",
          "generatedClaim": "TTM Adjusted EBITDA equals $84,400,000 (20.49% margin on $412.0M revenue).",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "71ms",
          "cost": "$0.003",
          "status": "PASS"
        },
        {
          "id": "EVAL-04",
          "sourceRef": "Schedule 5.12, Cell F8",
          "groundTruth": "$189.9M Debt - $21.1M Cash = $168.8M Net Debt (2.00x Net Leverage)",
          "generatedClaim": "Consolidated Net Debt is $168,800,000, yielding 2.00 to 1.00 Net Leverage.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "74ms",
          "cost": "$0.003",
          "status": "PASS"
        },
        {
          "id": "EVAL-05",
          "sourceRef": "Article VII, Sec 7.11(a)",
          "groundTruth": "Max Net Leverage: 3.50x (stepping down to 3.25x on Dec 31, 2027)",
          "generatedClaim": "Quarterly Maximum Net Leverage Covenant is 3.50x (step-down to 3.25x Dec 31, 2027).",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "66ms",
          "cost": "$0.003",
          "status": "PASS"
        },
        {
          "id": "EVAL-06",
          "sourceRef": "Article VII, Sec 7.11(b)",
          "groundTruth": "Min Interest Coverage: 3.00x; Actual: 6.00x ($84.4M / $14.067M)",
          "generatedClaim": "Certified Interest Coverage Ratio is 6.00 to 1.00 vs. 3.00 to 1.00 minimum requirement.",
          "exactMatch": "100.0%",
          "hallucination": "0.0%",
          "latency": "69ms",
          "cost": "$0.003",
          "status": "PASS"
        }
      ],
      "webhookPayload": {
        "workflowId": "wf_eval_harness_credit_covenant_v1",
        "executionId": "eval_20261122_773104b",
        "timestampUtc": "2026-11-22T20:46:00Z",
        "webhookDestination": "https://eval-api.caliberfoundry-staging.io/v1/harness/verify-extraction",
        "citationGatePassed": true,
        "tableCellF1Score": 0.994,
        "numericExactMatchScore": 1,
        "hallucinationScore": 0,
        "checksumSha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
        "extractedEntities": {
          "borrower": "Meridian Industrial Holdings Inc.",
          "administrativeAgent": "JPMorgan Chase Bank, N.A.",
          "commitmentUsd": 325000000,
          "maturityDate": "2031-10-15",
          "ttmRevenueUsd": 412000000,
          "ttmAdjustedEbitdaUsd": 84400000,
          "totalFundedDebtUsd": 189900000,
          "unrestrictedCashUsd": 21100000,
          "consolidatedNetDebtUsd": 168800000,
          "netLeverageRatio": 2,
          "applicableMarginSofrBps": 275,
          "maxNetLeverageCovenant": 3.5,
          "actualInterestCoverageRatio": 6,
          "minInterestCoverageCovenant": 3
        },
        "synthesizedAssets": {
          "creditMemoId": "MEMO-MERIDIAN-2026Q3",
          "goldenDatasetSuite": "250_SYNDICATED_CREDIT_AGREEMENTS",
          "ciCdPromotionStatus": "APPROVED_FOR_PRODUCTION"
        }
      },
      "courseModule": {
        "moduleTitle": "Module 2: Syndicated Credit Covenant Extraction & Pricing Grid Resolution",
        "objective": "Calculate Consolidated Net Leverage and Applicable Term SOFR Margin from extracted credit agreement schedules.",
        "quizStem": "Based on [Article II, Section 2.08], [Schedule 5.12, Table 1, Cell D4 & Cell F8], and [Article VII, Section 7.11(a)] of Meridian Industrial Holdings Inc.'s Senior Secured Credit Agreement, what are Meridian's certified Consolidated Net Debt, Consolidated Net Leverage Ratio, Applicable Margin on Term SOFR Advances, and covenant compliance status for Q3 2026?",
        "options": [
          {
            "letter": "A",
            "text": "Consolidated Net Debt is $189,900,000; Net Leverage Ratio is 2.25 to 1.00; Applicable Margin is 325 bps; in compliance with the 3.50x covenant.",
            "isCorrect": false,
            "rationale": "Fails to deduct $21,100,000 of Unrestricted Cash from Total Funded Debt ($189,900,000) under [Schedule 5.12, Table 1, Cell F8] and selects the wrong pricing tier."
          },
          {
            "letter": "B",
            "text": "Consolidated Net Debt is $168,800,000 ($189.9M Funded Debt minus $21.1M Unrestricted Cash); Consolidated Net Leverage Ratio is 2.00 to 1.00 ($168.8M / $84.4M Adjusted EBITDA); Applicable Margin on Term SOFR Advances is 275 basis points (because 2.00x is less than 2.50x); and the Borrower is in full compliance with the 3.50 to 1.00 Maximum Net Leverage Covenant.",
            "isCorrect": true,
            "rationale": "CORRECT: Matches every exact cell and pricing tier in [Schedule 5.12, Table 1, Cell D4 & Cell F8], [Article II, Section 2.08], and [Article VII, Section 7.11(a)]."
          },
          {
            "letter": "C",
            "text": "Consolidated Net Debt is $168,800,000; Net Leverage Ratio is 2.00 to 1.00; Applicable Margin is 325 basis points; and the Borrower is in breach of the 3.25x step-down covenant.",
            "isCorrect": false,
            "rationale": "325 bps applies only when Net Leverage is >= 2.50x ([Article II, Section 2.08]), and 2.00x is well below both the 3.50x current covenant and the 3.25x December 2027 step-down."
          },
          {
            "letter": "D",
            "text": "Consolidated Net Debt is $211,000,000 (adding Unrestricted Cash to Funded Debt); Net Leverage Ratio is 2.50 to 1.00; Applicable Margin is 325 basis points.",
            "isCorrect": false,
            "rationale": "Erroneously adds Unrestricted Cash to Total Funded Debt instead of subtracting it under [Schedule 5.12, Table 1, Cell F8]."
          },
          {
            "letter": "E",
            "text": "Consolidated Net Debt is $168,800,000; Net Leverage Ratio is 6.00 to 1.00; and the Borrower is in default under [Article VII, Section 7.11(a)].",
            "isCorrect": false,
            "rationale": "Confuses the 6.00 to 1.00 Interest Coverage Ratio ([Article VII, Section 7.11(b)]) with the 2.00 to 1.00 Net Leverage Ratio."
          }
        ],
        "goldenQuote": "[Schedule 5.12, Table 1, Cell F8] Total Funded Senior Debt stood at $189,900,000 less Unrestricted Cash of $21,100,000, yielding Consolidated Net Debt of $168,800,000 and a certified Consolidated Net Leverage Ratio of 2.00 to 1.00."
      },
      "socialAndVideo": {
        "threadCards": [
          {
            "index": "01/06",
            "hook": "If you do not have an automated evaluation harness, you do not have a production document extraction pipeline.",
            "body": "Here is how we built a Ground-Truth Evaluation Harness across 250 complex syndicated credit agreements achieving 99.4% Table Cell F1 and 100.0% numeric exact-match precision.",
            "metricTag": "99.4% TABLE F1 // 250 BENCHMARK DOCS"
          },
          {
            "index": "02/06",
            "hook": "Why naive chunking breaks on financial filings:",
            "body": "When a credit agreement defines pricing tiers in Article II and reports TTM EBITDA in Schedule 5.12, flat text splitters lose cell coordinates. We preserve exact row/column bounding boxes ([Table 1, Cell D4]).",
            "metricTag": "COORDINATE-AWARE TABLE AST"
          },
          {
            "index": "03/06",
            "hook": "Deterministic decimal cross-checks catch extraction drift immediately:",
            "body": "Our Python/TypeScript invariant engine verifies arithmetic relationships in 64ms: $189.9M Funded Debt - $21.1M Cash = $168.8M Net Debt / $84.4M EBITDA = 2.00x Net Leverage.",
            "metricTag": "64ms ARITHMETIC INVARIANT CHECK"
          },
          {
            "index": "04/06",
            "hook": "Automated multi-clause reasoning with zero guesswork:",
            "body": "Once 2.00x Net Leverage is verified, the rule engine resolves Article II Section 2.08 (<2.50x tier -> Term SOFR + 275 bps) and confirms 1.50x headroom under the 3.50x covenant.",
            "metricTag": "100.0% COVENANT RESOLUTION"
          },
          {
            "index": "05/06",
            "hook": "Every parser change runs through a CI/CD regression gate:",
            "body": "Before any update merges to production, GitHub Actions diffs extracted JSON outputs against 250 human-annotated golden agreements. Any numeric drift >0.00% fails the build.",
            "metricTag": "ZERO-REGRESSION CI/CD GATE"
          },
          {
            "index": "06/06",
            "hook": "Ready to move your document pipeline from fragile prototype to production?",
            "body": "Inspect our live Ground-Truth Evaluation Harness, side-by-side clause verifier, and JSON contract exporter in ContentForge Studio.",
            "metricTag": "410ms LATENCY // $0.018/RUN"
          }
        ],
        "storyboard": [
          {
            "scene": "Scene 01 (00:00–00:08)",
            "visual": "High-contrast technical blueprint of a 140-page Senior Secured Credit Agreement decomposing into structured JSON nodes and table cell coordinates.",
            "voiceover": "In institutional finance and legal tech, 95% extraction accuracy is a failed deployment. Production requires a deterministic evaluation harness.",
            "dataOverlay": "BENCHMARK SUITE: 250 FILINGS // TABLE CELL F1: 99.4%"
          },
          {
            "scene": "Scene 02 (00:08–00:17)",
            "visual": "Spotlight on Schedule 5.12 Table 1: Cell D4 ($84.4M EBITDA) and Cell F8 ($168.8M Net Debt) locking into a Python Decimal arithmetic equation.",
            "voiceover": "Our coordinate parser extracts exact table cells and runs deterministic arithmetic checks to verify that Net Debt divided by EBITDA equals 2.00x.",
            "dataOverlay": "$168.8M NET DEBT / $84.4M EBITDA = 2.00x VERIFIED"
          },
          {
            "scene": "Scene 03 (00:17–00:26)",
            "visual": "Pricing grid decision tree highlighting the <2.50x leverage branch and locking in Term SOFR + 275 bps while verifying 3.50x covenant compliance.",
            "voiceover": "Cross-referencing Article II and Article VII resolves the 275 basis point Term SOFR margin and certifies full covenant compliance automatically.",
            "dataOverlay": "TERM SOFR + 275 BPS // 6.00x INTEREST COVERAGE"
          },
          {
            "scene": "Scene 04 (00:26–00:35)",
            "visual": "6-row Ground-Truth Evaluation Matrix scrolling with 100.0% Exact Match badges and 0.0% Hallucination scores across every clause.",
            "voiceover": "Every extracted claim is diffed against human-verified ground truth in under 100 milliseconds before promotion to downstream systems.",
            "dataOverlay": "NUMERIC EXACT MATCH: 100.0% // HALLUCINATION: 0.0%"
          },
          {
            "scene": "Scene 05 (00:35–00:45)",
            "visual": "CI/CD terminal badge turning Archival Pine Green: 'APPROVED FOR PRODUCTION — 410ms E2E — $0.018/run'.",
            "voiceover": "Ship document extraction pipelines you can audit down to the single cell. Explore the evaluation harness live.",
            "dataOverlay": "CI/CD QUALITY GATE PASSED // 410ms E2E"
          }
        ]
      }
    }
  ]
};
