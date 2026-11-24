/**
 * ContentForge™ — Multi-Format B2B, EdTech & Technical Content Generation Studio
 * Citation-Gated Document Extraction, Ground-Truth Evaluation Harness & n8n / SCORM 1.2 Dispatch
 * Version: 2026.11-ENT
 */

(function (root) {
  "use strict";

  const CONTENTFORGE_DATA = {
    meta: {
      productName: "ContentForge™ — Multi-Format B2B, EdTech & Technical Content Generation Studio",
      version: "2026.11-ENT",
      architecture: "Citation-Gated AST Extraction + Multi-Model Structured JSON Output + n8n / FastAPI / SCORM 1.2 Dispatch",
      defaultPresetId: "n8n-pipeline",
      freePresetIds: ["n8n-pipeline", "eval-harness"],
      validLicenseKeyDigests: [
        "2081216b02af5cc9a81d3bd81d5371e6287df9bd5f059b759706a5f203f67ccf",
        "dfead5f6340733438ee01620308c1bd16661a131bfa488f5a333e321484dd321",
        "4c121399b298f07cd2d61cf1dfe2736df5ab9ac24dd8f7df4253fd06962b7924",
        "aa368e25aced9f219906f8cfb603966c65f4edfa2baf81d1ace7665f42e83f3b",
        "0219f433cd945512924e9061d2d097efe7a79d80818f582d96282b3111b323c0"
      ]
    },

    presets: [
      // =======================================================================
      // PRESET 1: n8n + MULTI-MODEL DOCUMENT & CONTENT AUTOMATION PIPELINE
      // =======================================================================
      {
        id: "n8n-pipeline",
        badge: "Workflow payload example",
        title: "n8n & Multi-Model Document Extraction -> Multi-Channel Content Pipeline",
        sector: "B2B Revenue & Content Operations (n8n / Make.com / REST Webhooks)",
        hallucinationRate: "0.0%",
        citationPrecision: "100.0%",
        avgLatencyMs: 380,
        costPerRunUsd: "$0.014",
        webhookEndpoint: "https://n8n.caliberfoundry-staging.io/webhook/v2/content-ingest-dispatch",
        sourceTitle: "SEC Form 10-K & Enterprise SaaS Security Compliance Dossier (2026-Q3)",
        sourceText: `[Clause 1.1] Vanguard Cloud Infrastructure Corp. (VCIC) reported Fiscal Q3 2026 Annual Recurring Revenue (ARR) of $148.6 million, representing a 34.2% year-over-year expansion across regulated enterprise accounts. [Clause 2.4] Net Dollar Retention (NDR) reached 126.8% for enterprise cohorts with annual contract values (ACV) exceeding $100,000, up from 119.4% in Fiscal Q3 2025. [Table 3, Row 4] Gross margin on core multi-region ingestion workloads improved by 410 basis points to 81.6% following the migration from third-party OCR APIs to deterministic Rust/WASM PDF AST parsing nodes. [Table 3, Row 7] Median document-to-webhook pipeline latency dropped from 4,820 milliseconds to 380 milliseconds per 50-page filing while reducing inference token expenditure by 72.5% ($0.014 per full multi-channel run). [Clause 4.2] Under SOC 2 Type II and ISO/IEC 27001:2022 controls, 100.0% of synthesized customer-facing claims must be cryptographically anchored to an immutable source span ID (SHA-256 content hash) prior to outbound n8n webhook dispatch. [Clause 4.5] Any generated statement lacking a verified bounding-box or clause pointer is automatically quarantined by the pre-flight Citation Gate and routed to a Dead-Letter Queue (DLQ) in PostgreSQL. [Section 6.2] Enterprise customers deploying the n8n multi-channel connector automated 1,420 weekly technical monographs, HubSpot CRM deal briefs, LinkedIn executive carousels, and customer onboarding modules with zero factual regressions across 90 consecutive days. [Section 8.1] Customer Acquisition Cost (CAC) payback period compressed from 19.2 months to 11.4 months across Fortune 1000 financial and healthcare verticals.`,
        schemaTemplate: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "n8nCitationGatedContentContract_v2",
  "type": "object",
  "required": ["workflowId", "sourceChecksumSha256", "citationGatePassed", "extractedClaims", "channels"],
  "properties": {
    "workflowId": { "type": "string", "const": "wf_n8n_doc_to_multichannel_v2" },
    "sourceChecksumSha256": { "type": "string", "pattern": "^[a-f0-9]{64}$" },
    "citationGatePassed": { "type": "boolean", "const": true },
    "extractedClaims": {
      "type": "array",
      "minItems": 6,
      "items": {
        "type": "object",
        "required": ["claimId", "sourceClause", "verbatimQuote", "numericMetric"],
        "properties": {
          "claimId": { "type": "string" },
          "sourceClause": { "type": "string" },
          "verbatimQuote": { "type": "string" },
          "numericMetric": { "type": "string" }
        }
      }
    },
    "channels": {
      "type": "object",
      "required": ["editorialMonograph", "xThreadCards", "remotionStoryboard", "scormQuizItem"]
    }
  }
}`,
        pipelineStages: [
          {
            step: "01",
            name: "Ingestion & AST Span Indexing",
            tech: "n8n Webhook Node + Deterministic PDF/Text Span Tokenizer",
            latency: "58ms",
            status: "VERIFIED",
            detail: "Segments raw Form 10-K / technical dossier into immutable clause anchors ([Clause 1.1]..[Section 8.1]) with SHA-256 span hashes."
          },
          {
            step: "02",
            name: "Structured Claim & Metric Extraction",
            tech: "Strict JSON-Schema Parser + Regex Numeric Invariant Guard",
            latency: "112ms",
            status: "VERIFIED",
            detail: "Extracts exact financial and operational metrics ($148.6M ARR, 126.8% NDR, 380ms latency, $0.014/run) bound to source clause IDs."
          },
          {
            step: "03",
            name: "Deterministic Citation Gate & DLQ Check",
            tech: "Zero-Hallucination Substring & Numeric Verifier",
            latency: "44ms",
            status: "VERIFIED",
            detail: "Cross-verifies every generated number and assertion against source spans; quarantines unanchored claims before channel synthesis."
          },
          {
            step: "04",
            name: "Multi-Format Asset Synthesis",
            tech: "Parallel Channel Compiler (Monograph + SCORM + Social + Video)",
            latency: "118ms",
            status: "VERIFIED",
            detail: "Compiles long-form B2B technical monograph, 5-option certification quiz item, 6-card X thread, and 5-scene Remotion storyboard."
          },
          {
            step: "05",
            name: "n8n / Make.com / Webhook Dispatch",
            tech: "Signed HMAC-SHA256 REST Webhook + PostgreSQL Audit Log",
            latency: "48ms",
            status: "VERIFIED",
            detail: "Dispatches validated JSON payload to HubSpot, Webflow CMS, LMS SCORM endpoint, and Slack editorial review channel."
          }
        ],
        monograph: {
          headline: "Eliminating Enterprise Content Hallucinations: How Citation-Gated n8n Pipelines Cut Latency by 92% and Compress CAC Payback to 11.4 Months",
          subtitle: "Architectural Benchmark Report on Deterministic AST Parsing, Schema-Constrained Synthesis, and Multi-Channel Webhook Orchestration",
          executiveSummary: "Enterprise revenue and technical documentation teams face an acute bottleneck: unstructured regulatory filings, engineering dossiers, and quarterly financial disclosures must be transformed into customer-facing monographs, training modules, and social campaigns without introducing a single fabricated metric. In Fiscal Q3 2026, Vanguard Cloud Infrastructure Corp. ($148.6M ARR, +34.2% YoY) demonstrated that replacing fragile prompt chains with a deterministic n8n + AST span-anchoring pipeline reduced end-to-end processing latency from 4,820ms to 380ms while enforcing 100.0% citation precision across 1,420 weekly deliverables.",
          sections: [
            {
              heading: "1. Unit Economics & Gross Margin Expansion via Deterministic AST Parsing",
              body: "Legacy content workflows rely on monolithic third-party OCR APIs and unconstrained text generation that inflate token consumption and require hours of manual legal review. By migrating document ingestion to deterministic Rust/WASM PDF AST parsing nodes inside an automated n8n workflow, gross margin on core multi-region ingestion workloads expanded by 410 basis points to 81.6%, while per-run compute cost dropped by 72.5% to $0.014 per full multi-channel package.",
              citationRef: "[Table 3, Row 4 & Row 7]"
            },
            {
              heading: "2. Cryptographic Citation Gates & Dead-Letter Queue Quarantine",
              body: "To satisfy SOC 2 Type II and ISO/IEC 27001:2022 audit trails, every synthesized sentence in the outbound monograph, quiz bank, or social sequence must carry a cryptographic pointer to its originating clause span. The pre-flight Citation Gate verifies exact numeric and substring alignment against the source document; any unanchored claim is intercepted in 44ms and routed to a PostgreSQL Dead-Letter Queue (DLQ) rather than reaching production.",
              citationRef: "[Clause 4.2 & Clause 4.5]"
            },
            {
              heading: "3. Commercial Velocity: 126.8% Net Dollar Retention & 11.4-Month CAC Payback",
              body: "Across enterprise cohorts with annual contract values exceeding $100,000, automated delivery of verified technical monographs, HubSpot deal briefs, and SCORM onboarding modules drove Net Dollar Retention to 126.8% (up from 119.4% YoY) and compressed Customer Acquisition Cost payback from 19.2 months to 11.4 months across Fortune 1000 financial and healthcare customers.",
              citationRef: "[Clause 2.4, Section 6.2 & Section 8.1]"
            }
          ],
          svgDiagramTitle: "Deterministic n8n + Citation-Gated Multi-Channel Pipeline Architecture (380ms E2E)",
          keyTakeaways: [
            "$148.6M Fiscal Q3 2026 ARR (+34.2% YoY) with 126.8% Net Dollar Retention in >$100K ACV accounts [Clause 1.1, Clause 2.4]",
            "380ms median 50-page pipeline latency (down from 4,820ms) and 81.6% gross margin (+410 bps) at $0.014/run [Table 3, Row 4 & Row 7]",
            "100.0% cryptographic span anchoring under SOC 2 Type II / ISO 27001 with automated PostgreSQL DLQ quarantine [Clause 4.2, Clause 4.5]"
          ]
        },
        evalCases: [
          {
            id: "EVAL-01",
            sourceRef: "Clause 1.1 (p. 2)",
            groundTruth: "Fiscal Q3 2026 ARR of $148.6 million (+34.2% YoY)",
            generatedClaim: "VCIC achieved $148.6M ARR in Fiscal Q3 2026, up 34.2% YoY.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "42ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-02",
            sourceRef: "Clause 2.4 (p. 5)",
            groundTruth: "NDR reached 126.8% for ACV > $100,000 (up from 119.4%)",
            generatedClaim: "Enterprise NDR (> $100K ACV) expanded from 119.4% to 126.8%.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "38ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-03",
            sourceRef: "Table 3, Row 4 (p. 9)",
            groundTruth: "Gross margin improved by 410 bps to 81.6% via Rust/WASM AST",
            generatedClaim: "Core ingestion gross margin rose 410 basis points to 81.6%.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "51ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-04",
            sourceRef: "Table 3, Row 7 (p. 9)",
            groundTruth: "Latency dropped from 4,820ms to 380ms; token cost -72.5% ($0.014)",
            generatedClaim: "Median pipeline latency fell from 4,820ms to 380ms at $0.014/run.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "49ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-05",
            sourceRef: "Clause 4.2 & 4.5 (p. 14)",
            groundTruth: "100% SHA-256 span anchoring; unanchored claims routed to PostgreSQL DLQ",
            generatedClaim: "Unanchored statements are quarantined to PostgreSQL DLQ under SOC 2 controls.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "44ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-06",
            sourceRef: "Section 8.1 (p. 22)",
            groundTruth: "CAC payback compressed from 19.2 months to 11.4 months",
            generatedClaim: "Enterprise CAC payback period compressed from 19.2 to 11.4 months.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "36ms",
            cost: "$0.002",
            status: "PASS"
          }
        ],
        webhookPayload: {
          workflowId: "wf_n8n_doc_to_multichannel_v2",
          executionId: "exec_20261122_994182a",
          timestampUtc: "2026-11-22T20:45:00Z",
          webhookDestination: "https://n8n.caliberfoundry-staging.io/webhook/v2/content-ingest-dispatch",
          citationGatePassed: true,
          hallucinationScore: 0.0,
          citationPrecisionScore: 1.0,
          checksumSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          extractedEntities: {
            company: "Vanguard Cloud Infrastructure Corp. (VCIC)",
            period: "Fiscal Q3 2026",
            arrUsd: 148600000,
            arrGrowthYoYPercent: 34.2,
            ndrEnterprisePercent: 126.8,
            grossMarginPercent: 81.6,
            pipelineLatencyMs: 380,
            costPerRunUsd: 0.014,
            cacPaybackMonths: 11.4
          },
          synthesizedAssets: {
            monographSlug: "vcic-q3-2026-citation-gated-n8n-architecture",
            scormPackageId: "SCORM12-VCIC-SOC2-DLQ-01",
            xThreadCardCount: 6,
            remotionStoryboardScenes: 5,
            hubspotDealBriefSynced: true
          }
        },
        courseModule: {
          moduleTitle: "Module 4: SOC 2 Type II Citation Gates & Dead-Letter Queue Architecture in n8n Pipelines",
          objective: "Verify how deterministic AST span hashing prevents unanchored claims from reaching outbound enterprise webhooks.",
          quizStem: "During an automated n8n execution processing Vanguard Cloud Infrastructure Corp.'s Fiscal Q3 2026 filing, a downstream synthesis node generates a sentence stating that 'Gross margin reached 85.0% and CAC payback fell to 9.0 months.' Under [Table 3, Row 4], [Clause 4.2], [Clause 4.5], and [Section 8.1] of the governing dossier, how must the pre-flight Citation Gate handle this payload, and what are the true verified metrics?",
          options: [
            {
              letter: "A",
              text: "Dispatch the webhook immediately and log a warning afterwards, because 85.0% is within a 5% tolerance band of 81.6%.",
              isCorrect: false,
              rationale: "Violates [Clause 4.2] and [Clause 4.5], which require 100.0% cryptographic span anchoring and zero tolerance for unverified numeric claims prior to outbound n8n dispatch."
            },
            {
              letter: "B",
              text: "Automatically quarantine the payload before outbound n8n webhook dispatch and route it to the PostgreSQL Dead-Letter Queue (DLQ), because the verified source metrics are 81.6% gross margin (+410 bps) under [Table 3, Row 4] and 11.4 months CAC payback (down from 19.2 months) under [Section 8.1].",
              isCorrect: true,
              rationale: "CORRECT: [Clause 4.2] and [Clause 4.5] mandate pre-flight quarantine to the PostgreSQL DLQ for any claim lacking an exact verified span match, while [Table 3, Row 4] and [Section 8.1] establish 81.6% gross margin and 11.4 months CAC payback."
            },
            {
              letter: "C",
              text: "Quarantine the payload to the Dead-Letter Queue, because the true gross margin is 72.5% and the true CAC payback period is 19.2 months.",
              isCorrect: false,
              rationale: "72.5% is the token expenditure reduction ([Table 3, Row 7]) and 19.2 months was the prior baseline CAC payback before compression to 11.4 months ([Section 8.1])."
            },
            {
              letter: "D",
              text: "Strip all numeric metrics from the monograph and publish an unquantified summary to Webflow CMS without running the SHA-256 span verifier.",
              isCorrect: false,
              rationale: "Bypassing the SHA-256 span verifier violates SOC 2 Type II and ISO/IEC 27001:2022 controls specified in [Clause 4.2]."
            },
            {
              letter: "E",
              text: "Fallback to third-party OCR APIs at 4,820ms latency whenever a numeric mismatch occurs.",
              isCorrect: false,
              rationale: "4,820ms was the legacy pipeline latency prior to the Rust/WASM AST migration described in [Table 3, Row 4 & Row 7]."
            }
          ],
          goldenQuote: "[Clause 4.5] Any generated statement lacking a verified bounding-box or clause pointer is automatically quarantined by the pre-flight Citation Gate and routed to a Dead-Letter Queue (DLQ) in PostgreSQL."
        },
        socialAndVideo: {
          threadCards: [
            {
              index: "01/06",
              hook: "Why 90% of B2B content automation pipelines fail enterprise security reviews:",
              body: "Unconstrained prompt chains invent metrics. Here is how we engineered a deterministic n8n + Rust/WASM AST pipeline that cut 50-page processing latency from 4,820ms to 380ms with 0.0% hallucination.",
              metricTag: "380ms E2E // 0.0% HALLUCINATION"
            },
            {
              index: "02/06",
              hook: "Step 1: Stop treating PDFs as flat text blobs.",
              body: "Before any synthesis node runs, our ingestion parser indexes every paragraph and table cell into immutable clause spans ([Clause 1.1], [Table 3, Row 4]) with SHA-256 content hashes.",
              metricTag: "SHA-256 AST SPAN INDEXING"
            },
            {
              index: "03/06",
              hook: "Step 2: Schema-constrained JSON extraction + Pre-Flight Citation Gate.",
              body: "Under SOC 2 Type II and ISO 27001 controls ([Clause 4.2]), 100% of outbound claims must resolve to a verified source span ID. Unanchored numbers are quarantined to a PostgreSQL Dead-Letter Queue in 44ms.",
              metricTag: "100.0% CITATION PRECISION"
            },
            {
              index: "04/06",
              hook: "Step 3: The unit economics of deterministic parsing.",
              body: "Replacing third-party OCR APIs with Rust/WASM AST nodes expanded core ingestion gross margin by +410 bps to 81.6% and slashed per-run compute cost by 72.5% to $0.014.",
              metricTag: "81.6% GROSS MARGIN // $0.014/RUN"
            },
            {
              index: "05/06",
              hook: "Step 4: One source dossier -> Four synchronized enterprise channels.",
              body: "A single n8n webhook trigger compiles: (1) an executive monograph, (2) a ground-truth evaluation matrix, (3) a 5-option SCORM certification quiz, and (4) a 60fps Remotion video storyboard.",
              metricTag: "1,420 WEEKLY DELIVERABLES"
            },
            {
              index: "06/06",
              hook: "The commercial outcome across regulated Fortune 1000 accounts:",
              body: "$148.6M ARR (+34.2% YoY), 126.8% Net Dollar Retention in >$100K ACV cohorts, and CAC payback compressed from 19.2 months to 11.4 months. Inspect the live architecture below.",
              metricTag: "126.8% NDR // 11.4MO CAC PAYBACK"
            }
          ],
          storyboard: [
            {
              scene: "Scene 01 (00:00–00:08)",
              visual: "Split-screen kinetic typography: Legacy 4,820ms OCR pipeline flashing red hallucination warnings vs. ContentForge 380ms deterministic AST pipeline locking green SHA-256 clause badges.",
              voiceover: "Enterprise technical and financial teams cannot afford a single hallucinated number in customer-facing publications.",
              dataOverlay: "LATENCY: 4,820ms -> 380ms (-92.1%) // COST: $0.014/RUN"
            },
            {
              scene: "Scene 02 (00:08–00:17)",
              visual: "Zoom into SEC Form 10-K document canvas as [Clause 1.1], [Table 3, Row 4], and [Clause 4.2] highlight in warm amber and snap into a strict JSON Schema contract.",
              voiceover: "ContentForge parses complex filings into cryptographic span anchors before a single downstream channel asset is synthesized.",
              dataOverlay: "AST TOKENIZER: 58ms // 100.0% SPAN COVERAGE"
            },
            {
              scene: "Scene 03 (00:17–00:26)",
              visual: "Animated Citation Gate firewall intercepting an unanchored claim and routing it into a PostgreSQL Dead-Letter Queue while verified claims pass through at 44ms.",
              voiceover: "Every claim passes through a deterministic Citation Gate. If a number does not match the ground-truth table cell, it is quarantined automatically.",
              dataOverlay: "SOC 2 TYPE II & ISO 27001 GATE // 0.0% HALLUCINATION"
            },
            {
              scene: "Scene 04 (00:26–00:35)",
              visual: "Four-quadrant n8n dispatch fan-out: B2B Editorial Monograph, Ground-Truth Evaluation Matrix, SCORM 1.2 Quiz Module, and 6-Card Social Carousel rendering simultaneously.",
              voiceover: "From one verified payload, n8n dispatches long-form monographs, LMS certification quizzes, CRM briefs, and social threads in under 400 milliseconds.",
              dataOverlay: "1,420 WEEKLY ASSETS // 81.6% GROSS MARGIN (+410 BPS)"
            },
            {
              scene: "Scene 05 (00:35–00:45)",
              visual: "Executive telemetry dashboard displaying $148.6M ARR, 126.8% Net Dollar Retention, and CAC payback compression from 19.2 to 11.4 months.",
              voiceover: "Deterministic content engineering turns regulatory complexity into commercial velocity. Deploy ContentForge on your n8n infrastructure today.",
              dataOverlay: "$148.6M ARR (+34.2% YoY) // 11.4-MONTH CAC PAYBACK"
            }
          ]
        }
      },

      // =======================================================================
      // PRESET 2: DOCUMENT EXTRACTION & GROUND-TRUTH EVALUATION HARNESS
      // =======================================================================
      {
        id: "eval-harness",
        badge: "Document evaluation example",
        title: "Production Document Extraction & Ground-Truth Evaluation Harness",
        sector: "Enterprise Document Engineering & Automated Quality Gate (Python / FastAPI / TypeScript)",
        hallucinationRate: "0.0%",
        citationPrecision: "100.0%",
        avgLatencyMs: 410,
        costPerRunUsd: "$0.018",
        webhookEndpoint: "https://eval-api.caliberfoundry-staging.io/v1/harness/verify-extraction",
        sourceTitle: "Senior Secured Credit Agreement & Syndicated Covenant Compliance Memorandum (FY2026)",
        sourceText: `[Article I, Section 1.01] Under the Senior Secured Revolving Credit Facility dated October 15, 2026 among Meridian Industrial Holdings Inc. (Borrower) and JPMorgan Chase Bank, N.A. (Administrative Agent), Total Aggregate Commitments equal $325,000,000 with a maturity date of October 15, 2031. [Article II, Section 2.08] The Applicable Margin on Term SOFR Advances is 275 basis points (2.75%) per annum when the Consolidated Net Leverage Ratio is less than 2.50 to 1.00, stepping up to 325 basis points (3.25%) when Consolidated Net Leverage is equal to or greater than 2.50 to 1.00. [Schedule 5.12, Table 1, Cell D4] For the trailing twelve months (TTM) ended September 30, 2026, Consolidated Adjusted EBITDA was $84,400,000 on Net Revenue of $412,000,000 (20.49% Adjusted EBITDA margin). [Schedule 5.12, Table 1, Cell F8] Total Funded Senior Debt stood at $189,900,000 less Unrestricted Cash of $21,100,000, yielding Consolidated Net Debt of $168,800,000 and a certified Consolidated Net Leverage Ratio of 2.00 to 1.00. [Article VII, Section 7.11(a)] The Maximum Consolidated Net Leverage Covenant requires the Borrower to maintain a ratio not to exceed 3.50 to 1.00 at the end of any fiscal quarter, stepping down to 3.25 to 1.00 commencing December 31, 2027. [Article VII, Section 7.11(b)] The Minimum Consolidated Interest Coverage Ratio covenant requires Adjusted EBITDA to Cash Interest Expense ($14,066,667 TTM) to be at least 3.00 to 1.00; actual certified coverage for Q3 2026 is 6.00 to 1.00. [Appendix B, Benchmark Note 9] Production extraction pipelines audited by the Ground-Truth Evaluation Harness must achieve a Table Cell F1 score of at least 99.4% and 100.0% numeric covenant exact-match accuracy across 250 multi-page credit agreements before promotion to production.`,
        schemaTemplate: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "CreditAgreementEvalHarnessContract_v1",
  "type": "object",
  "required": ["facilityCommitmentUsd", "pricingGridBps", "ttmMetrics", "covenantCompliance", "evalTelemetry"],
  "properties": {
    "facilityCommitmentUsd": { "type": "integer", "const": 325000000 },
    "pricingGridBps": {
      "type": "object",
      "required": ["tier1Below2_50xBps", "tier2AtOrAbove2_50xBps"],
      "properties": {
        "tier1Below2_50xBps": { "type": "integer", "const": 275 },
        "tier2AtOrAbove2_50xBps": { "type": "integer", "const": 325 }
      }
    },
    "ttmMetrics": {
      "type": "object",
      "required": ["adjustedEbitdaUsd", "netDebtUsd", "netLeverageRatio", "interestCoverageRatio"]
    },
    "covenantCompliance": {
      "type": "object",
      "required": ["maxAllowedNetLeverage", "minAllowedInterestCoverage", "inCompliance"]
    },
    "evalTelemetry": {
      "type": "object",
      "required": ["tableCellF1Percent", "numericExactMatchPercent", "hallucinationRatePercent"]
    }
  }
}`,
        pipelineStages: [
          {
            step: "01",
            name: "Multi-Page PDF Table & Clause Decomposition",
            tech: "FastAPI + Coordinate Bounding-Box Table Reconstructor",
            latency: "78ms",
            status: "VERIFIED",
            detail: "Parses 140-page credit agreement and Schedule 5.12 financial tables into addressable cell coordinates ([Table 1, Cell D4], [Cell F8])."
          },
          {
            step: "02",
            name: "Deterministic Financial Arithmetic Cross-Check",
            tech: "Python Decimal Invariant Engine (Debt - Cash / EBITDA)",
            latency: "64ms",
            status: "VERIFIED",
            detail: "Verifies $189.9M Funded Debt - $21.1M Unrestricted Cash = $168.8M Net Debt / $84.4M EBITDA = 2.00x Net Leverage."
          },
          {
            step: "03",
            name: "Ground-Truth Golden Dataset Diffing",
            tech: "Automated Cell-Level F1 & Exact-Match Harness (250 Docs)",
            latency: "92ms",
            status: "VERIFIED",
            detail: "Scores extracted JSON fields against human-annotated golden credit agreements, achieving 99.4% Table Cell F1 and 100.0% numeric precision."
          },
          {
            step: "04",
            name: "Credit Committee Monograph & Risk Matrix Synthesis",
            tech: "Citation-Locked Financial Memo & Covenant Generator",
            latency: "124ms",
            status: "VERIFIED",
            detail: "Generates syndicated credit committee memorandum, interactive covenant audit quiz, and executive briefing cards."
          },
          {
            step: "05",
            name: "CI/CD Quality Gate & Production Webhook Promotion",
            tech: "GitHub Actions Regression Gate + Signed REST Payload",
            latency: "52ms",
            status: "VERIFIED",
            detail: "Blocks deployment if any numeric covenant drifts by >0.00%; promotes verified extraction bundle to portfolio risk database."
          }
        ],
        monograph: {
          headline: "Production-Grade Document Extraction: Engineering a 99.4% Table-Cell F1 Evaluation Harness for Syndicated Credit Agreements",
          subtitle: "Deterministic Arithmetic Verification and Zero-Regression CI/CD Quality Gates for Complex Financial & Legal Filings",
          executiveSummary: "In institutional credit underwriting and enterprise document engineering, a single misread basis point or shifted table column in a 140-page Senior Secured Credit Agreement creates millions of dollars in exposure. By pairing coordinate-aware table reconstruction with an automated Ground-Truth Evaluation Harness across 250 benchmark agreements, our production pipeline enforces 100.0% numeric exact-match precision and 99.4% Table Cell F1 before any extracted covenant or credit committee memorandum enters downstream portfolio systems.",
          sections: [
            {
              heading: "1. Coordinate-Locked Table Extraction & Decimal Arithmetic Verification",
              body: "Standard text chunkers destroy the spatial relationship between pricing grid tiers and financial schedule cells. Our pipeline indexes exact table coordinates—such as Schedule 5.12, Table 1, Cell D4 ($84,400,000 TTM Adjusted EBITDA) and Cell F8 ($168,800,000 Consolidated Net Debt after deducting $21,100,000 Unrestricted Cash from $189,900,000 Total Funded Debt)—and runs deterministic decimal arithmetic to verify the resulting 2.00 to 1.00 Consolidated Net Leverage Ratio.",
              citationRef: "[Schedule 5.12, Table 1, Cell D4 & Cell F8]"
            },
            {
              heading: "2. Pricing Grid Tier Resolution & Covenant Headroom Analysis",
              body: "Because Meridian Industrial Holdings Inc.'s certified Net Leverage Ratio of 2.00x is below the 2.50x threshold in Article II, Section 2.08, the harness deterministically resolves the Applicable Margin on Term SOFR Advances to 275 basis points (rather than the 325 bps step-up tier). Simultaneously, it verifies 1.50 turns of headroom under the 3.50x Maximum Net Leverage Covenant and 6.00x actual Interest Coverage against the 3.00x minimum covenant.",
              citationRef: "[Article II, Section 2.08 & Article VII, Section 7.11(a)-(b)]"
            },
            {
              heading: "3. Continuous Regression Gating Across 250 Golden Filings",
              body: "Every parser or prompt template modification is benchmarked automatically against 250 human-verified filings prior to production release. Promotion requires passing a hard CI/CD threshold of >= 99.4% Table Cell F1 and 0.0% numeric hallucination at an average latency of 410ms per document package.",
              citationRef: "[Appendix B, Benchmark Note 9]"
            }
          ],
          svgDiagramTitle: "Ground-Truth Document Extraction & CI/CD Evaluation Harness Architecture (99.4% Table F1)",
          keyTakeaways: [
            "$325.0M Senior Secured Revolving Credit Facility maturing October 15, 2031 at Term SOFR + 275 bps [Article I, Sec 1.01; Article II, Sec 2.08]",
            "$84.4M TTM Adjusted EBITDA (20.49% margin) and $168.8M Net Debt yielding 2.00x Net Leverage vs. 3.50x max covenant [Schedule 5.12; Article VII, Sec 7.11(a)]",
            "6.00x actual Interest Coverage ($84.4M EBITDA / $14.07M Cash Interest) vs. 3.00x min covenant, verified at 99.4% Table Cell F1 [Article VII, Sec 7.11(b); Appendix B]"
          ]
        },
        evalCases: [
          {
            id: "EVAL-01",
            sourceRef: "Article I, Sec 1.01",
            groundTruth: "Total Aggregate Commitments: $325,000,000 (Maturity Oct 15, 2031)",
            generatedClaim: "Senior Secured Revolving Facility commitment is $325,000,000 maturing Oct 15, 2031.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "62ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-02",
            sourceRef: "Article II, Sec 2.08",
            groundTruth: "Term SOFR + 275 bps (< 2.50x leverage) or + 325 bps (>= 2.50x)",
            generatedClaim: "Applicable Margin resolves to 275 bps at 2.00x Net Leverage (< 2.50x threshold).",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "68ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-03",
            sourceRef: "Schedule 5.12, Cell D4",
            groundTruth: "TTM Consolidated Adjusted EBITDA: $84,400,000 on $412,000,000 Revenue",
            generatedClaim: "TTM Adjusted EBITDA equals $84,400,000 (20.49% margin on $412.0M revenue).",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "71ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-04",
            sourceRef: "Schedule 5.12, Cell F8",
            groundTruth: "$189.9M Debt - $21.1M Cash = $168.8M Net Debt (2.00x Net Leverage)",
            generatedClaim: "Consolidated Net Debt is $168,800,000, yielding 2.00 to 1.00 Net Leverage.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "74ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-05",
            sourceRef: "Article VII, Sec 7.11(a)",
            groundTruth: "Max Net Leverage: 3.50x (stepping down to 3.25x on Dec 31, 2027)",
            generatedClaim: "Quarterly Maximum Net Leverage Covenant is 3.50x (step-down to 3.25x Dec 31, 2027).",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "66ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-06",
            sourceRef: "Article VII, Sec 7.11(b)",
            groundTruth: "Min Interest Coverage: 3.00x; Actual: 6.00x ($84.4M / $14.067M)",
            generatedClaim: "Certified Interest Coverage Ratio is 6.00 to 1.00 vs. 3.00 to 1.00 minimum requirement.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "69ms",
            cost: "$0.003",
            status: "PASS"
          }
        ],
        webhookPayload: {
          workflowId: "wf_eval_harness_credit_covenant_v1",
          executionId: "eval_20261122_773104b",
          timestampUtc: "2026-11-22T20:46:00Z",
          webhookDestination: "https://eval-api.caliberfoundry-staging.io/v1/harness/verify-extraction",
          citationGatePassed: true,
          tableCellF1Score: 0.994,
          numericExactMatchScore: 1.0,
          hallucinationScore: 0.0,
          checksumSha256: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
          extractedEntities: {
            borrower: "Meridian Industrial Holdings Inc.",
            administrativeAgent: "JPMorgan Chase Bank, N.A.",
            commitmentUsd: 325000000,
            maturityDate: "2031-10-15",
            ttmRevenueUsd: 412000000,
            ttmAdjustedEbitdaUsd: 84400000,
            totalFundedDebtUsd: 189900000,
            unrestrictedCashUsd: 21100000,
            consolidatedNetDebtUsd: 168800000,
            netLeverageRatio: 2.0,
            applicableMarginSofrBps: 275,
            maxNetLeverageCovenant: 3.5,
            actualInterestCoverageRatio: 6.0,
            minInterestCoverageCovenant: 3.0
          },
          synthesizedAssets: {
            creditMemoId: "MEMO-MERIDIAN-2026Q3",
            goldenDatasetSuite: "250_SYNDICATED_CREDIT_AGREEMENTS",
            ciCdPromotionStatus: "APPROVED_FOR_PRODUCTION"
          }
        },
        courseModule: {
          moduleTitle: "Module 2: Syndicated Credit Covenant Extraction & Pricing Grid Resolution",
          objective: "Calculate Consolidated Net Leverage and Applicable Term SOFR Margin from extracted credit agreement schedules.",
          quizStem: "Based on [Article II, Section 2.08], [Schedule 5.12, Table 1, Cell D4 & Cell F8], and [Article VII, Section 7.11(a)] of Meridian Industrial Holdings Inc.'s Senior Secured Credit Agreement, what are Meridian's certified Consolidated Net Debt, Consolidated Net Leverage Ratio, Applicable Margin on Term SOFR Advances, and covenant compliance status for Q3 2026?",
          options: [
            {
              letter: "A",
              text: "Consolidated Net Debt is $189,900,000; Net Leverage Ratio is 2.25 to 1.00; Applicable Margin is 325 bps; in compliance with the 3.50x covenant.",
              isCorrect: false,
              rationale: "Fails to deduct $21,100,000 of Unrestricted Cash from Total Funded Debt ($189,900,000) under [Schedule 5.12, Table 1, Cell F8] and selects the wrong pricing tier."
            },
            {
              letter: "B",
              text: "Consolidated Net Debt is $168,800,000 ($189.9M Funded Debt minus $21.1M Unrestricted Cash); Consolidated Net Leverage Ratio is 2.00 to 1.00 ($168.8M / $84.4M Adjusted EBITDA); Applicable Margin on Term SOFR Advances is 275 basis points (because 2.00x is less than 2.50x); and the Borrower is in full compliance with the 3.50 to 1.00 Maximum Net Leverage Covenant.",
              isCorrect: true,
              rationale: "CORRECT: Matches every exact cell and pricing tier in [Schedule 5.12, Table 1, Cell D4 & Cell F8], [Article II, Section 2.08], and [Article VII, Section 7.11(a)]."
            },
            {
              letter: "C",
              text: "Consolidated Net Debt is $168,800,000; Net Leverage Ratio is 2.00 to 1.00; Applicable Margin is 325 basis points; and the Borrower is in breach of the 3.25x step-down covenant.",
              isCorrect: false,
              rationale: "325 bps applies only when Net Leverage is >= 2.50x ([Article II, Section 2.08]), and 2.00x is well below both the 3.50x current covenant and the 3.25x December 2027 step-down."
            },
            {
              letter: "D",
              text: "Consolidated Net Debt is $211,000,000 (adding Unrestricted Cash to Funded Debt); Net Leverage Ratio is 2.50 to 1.00; Applicable Margin is 325 basis points.",
              isCorrect: false,
              rationale: "Erroneously adds Unrestricted Cash to Total Funded Debt instead of subtracting it under [Schedule 5.12, Table 1, Cell F8]."
            },
            {
              letter: "E",
              text: "Consolidated Net Debt is $168,800,000; Net Leverage Ratio is 6.00 to 1.00; and the Borrower is in default under [Article VII, Section 7.11(a)].",
              isCorrect: false,
              rationale: "Confuses the 6.00 to 1.00 Interest Coverage Ratio ([Article VII, Section 7.11(b)]) with the 2.00 to 1.00 Net Leverage Ratio."
            }
          ],
          goldenQuote: "[Schedule 5.12, Table 1, Cell F8] Total Funded Senior Debt stood at $189,900,000 less Unrestricted Cash of $21,100,000, yielding Consolidated Net Debt of $168,800,000 and a certified Consolidated Net Leverage Ratio of 2.00 to 1.00."
        },
        socialAndVideo: {
          threadCards: [
            {
              index: "01/06",
              hook: "If you do not have an automated evaluation harness, you do not have a production document extraction pipeline.",
              body: "Here is how we built a Ground-Truth Evaluation Harness across 250 complex syndicated credit agreements achieving 99.4% Table Cell F1 and 100.0% numeric exact-match precision.",
              metricTag: "99.4% TABLE F1 // 250 BENCHMARK DOCS"
            },
            {
              index: "02/06",
              hook: "Why naive chunking breaks on financial filings:",
              body: "When a credit agreement defines pricing tiers in Article II and reports TTM EBITDA in Schedule 5.12, flat text splitters lose cell coordinates. We preserve exact row/column bounding boxes ([Table 1, Cell D4]).",
              metricTag: "COORDINATE-AWARE TABLE AST"
            },
            {
              index: "03/06",
              hook: "Deterministic decimal cross-checks catch extraction drift immediately:",
              body: "Our Python/TypeScript invariant engine verifies arithmetic relationships in 64ms: $189.9M Funded Debt - $21.1M Cash = $168.8M Net Debt / $84.4M EBITDA = 2.00x Net Leverage.",
              metricTag: "64ms ARITHMETIC INVARIANT CHECK"
            },
            {
              index: "04/06",
              hook: "Automated multi-clause reasoning with zero guesswork:",
              body: "Once 2.00x Net Leverage is verified, the rule engine resolves Article II Section 2.08 (<2.50x tier -> Term SOFR + 275 bps) and confirms 1.50x headroom under the 3.50x covenant.",
              metricTag: "100.0% COVENANT RESOLUTION"
            },
            {
              index: "05/06",
              hook: "Every parser change runs through a CI/CD regression gate:",
              body: "Before any update merges to production, GitHub Actions diffs extracted JSON outputs against 250 human-annotated golden agreements. Any numeric drift >0.00% fails the build.",
              metricTag: "ZERO-REGRESSION CI/CD GATE"
            },
            {
              index: "06/06",
              hook: "Ready to move your document pipeline from fragile prototype to production?",
              body: "Inspect our live Ground-Truth Evaluation Harness, side-by-side clause verifier, and JSON contract exporter in ContentForge Studio.",
              metricTag: "410ms LATENCY // $0.018/RUN"
            }
          ],
          storyboard: [
            {
              scene: "Scene 01 (00:00–00:08)",
              visual: "High-contrast technical blueprint of a 140-page Senior Secured Credit Agreement decomposing into structured JSON nodes and table cell coordinates.",
              voiceover: "In institutional finance and legal tech, 95% extraction accuracy is a failed deployment. Production requires a deterministic evaluation harness.",
              dataOverlay: "BENCHMARK SUITE: 250 FILINGS // TABLE CELL F1: 99.4%"
            },
            {
              scene: "Scene 02 (00:08–00:17)",
              visual: "Spotlight on Schedule 5.12 Table 1: Cell D4 ($84.4M EBITDA) and Cell F8 ($168.8M Net Debt) locking into a Python Decimal arithmetic equation.",
              voiceover: "Our coordinate parser extracts exact table cells and runs deterministic arithmetic checks to verify that Net Debt divided by EBITDA equals 2.00x.",
              dataOverlay: "$168.8M NET DEBT / $84.4M EBITDA = 2.00x VERIFIED"
            },
            {
              scene: "Scene 03 (00:17–00:26)",
              visual: "Pricing grid decision tree highlighting the <2.50x leverage branch and locking in Term SOFR + 275 bps while verifying 3.50x covenant compliance.",
              voiceover: "Cross-referencing Article II and Article VII resolves the 275 basis point Term SOFR margin and certifies full covenant compliance automatically.",
              dataOverlay: "TERM SOFR + 275 BPS // 6.00x INTEREST COVERAGE"
            },
            {
              scene: "Scene 04 (00:26–00:35)",
              visual: "6-row Ground-Truth Evaluation Matrix scrolling with 100.0% Exact Match badges and 0.0% Hallucination scores across every clause.",
              voiceover: "Every extracted claim is diffed against human-verified ground truth in under 100 milliseconds before promotion to downstream systems.",
              dataOverlay: "NUMERIC EXACT MATCH: 100.0% // HALLUCINATION: 0.0%"
            },
            {
              scene: "Scene 05 (00:35–00:45)",
              visual: "CI/CD terminal badge turning Archival Pine Green: 'APPROVED FOR PRODUCTION — 410ms E2E — $0.018/run'.",
              voiceover: "Ship document extraction pipelines you can audit down to the single cell. Explore the evaluation harness live.",
              dataOverlay: "CI/CD QUALITY GATE PASSED // 410ms E2E"
            }
          ]
        }
      },
      // =======================================================================
      // PRESET 3: EDTECH COURSEWARE, REGULATORY LESSON & SCORM/QUIZ GENERATOR
      // =======================================================================
      {
        id: "edtech-courseware",
        badge: "EDTECH & SCORM 1.2 CURRICULUM ENGINE",
        title: "Regulatory & Clinical Curriculum, Case Vignette & SCORM 1.2 Assessment Generator",
        sector: "Professional Certification, Higher Ed & Corporate Compliance Training",
        hallucinationRate: "0.0%",
        citationPrecision: "100.0%",
        avgLatencyMs: 350,
        costPerRunUsd: "$0.012",
        webhookEndpoint: "https://lms-bridge.caliberfoundry-staging.io/v2/scorm-qti/publish",
        sourceTitle: "19 CFR Part 152 & Part 190 Customs Valuation & Modernized Drawback Statutory Directive",
        sourceText: `[19 CFR 152.103(a)(1)] The transaction value of imported merchandise is the price actually paid or payable (PAPP) for the merchandise when sold for exportation to the United States, plus the five statutory additions enumerated in paragraph (b), and exclusive of international freight, marine cargo insurance, and other CIF charges incident to international shipment from the country of exportation to the United States. [19 CFR 152.102(a)(1)] An "assist" includes materials, components, tools, dies, molds, and foreign-undertaken engineering or design work supplied free of charge or at reduced cost by the buyer for use in production of the imported merchandise, plus the cost of transporting the assist to the foreign plant. [19 CFR 152.102(a)(2)] Engineering, development, artwork, and design work undertaken within the United States by individuals domiciled in the United States is strictly excluded from dutiable assists. [19 CFR 152.103(b)(1)(ii)] Selling commissions incurred by the buyer are added to transaction value, whereas bona fide buying commissions paid to the buyer's own purchasing agent are excluded. [19 CFR 190.32(a)-(c)] Under TFTEA Modernized Drawback (19 U.S.C. 1313(j)(2)), unused merchandise substitution drawback is permitted for merchandise classified under the same 8-digit HTSUS subheading (when the 8-digit description does not begin with "Other") exported within 5 years of importation, capped at 99% of the LESSER of the duties, taxes, and fees paid on the designated imported merchandise or those that would apply to the substituted exported merchandise. [19 CFR 190.51(e)-(f)] Complete drawback claims must be filed in ACE within 5 years from the date of importation, and supporting drawback records must be retained for 3 years after liquidation of the drawback claim.`,
        schemaTemplate: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "SCORM12_QTI21_CurriculumPackageContract",
  "type": "object",
  "required": ["manifestId", "scormVersion", "governingCitations", "lessonMonograph", "qtiAssessmentItem"],
  "properties": {
    "manifestId": { "type": "string", "const": "IMS-SCORM12-CBLE-152-190" },
    "scormVersion": { "type": "string", "const": "1.2" },
    "governingCitations": {
      "type": "array",
      "items": { "type": "string" }
    },
    "qtiAssessmentItem": {
      "type": "object",
      "required": ["itemId", "stem", "optionsFive", "correctLetter", "distractorRationales", "verbatimProofQuote"],
      "properties": {
        "optionsFive": { "type": "array", "minItems": 5, "maxItems": 5 }
      }
    }
  }
}`,
        pipelineStages: [
          {
            step: "01",
            name: "Statutory Corpus & eCFR Clause Parsing",
            tech: "Hierarchical CFR / HTSUS Section & Paragraph AST Indexer",
            latency: "52ms",
            status: "VERIFIED",
            detail: "Indexes 19 CFR Part 152 and Part 190 paragraphs into addressable statutory citations ([19 CFR 152.102(a)(2)], [19 CFR 190.32(a)-(c)])."
          },
          {
            step: "02",
            name: "Psychometric Case Vignette & Distractor Synthesis",
            tech: "5-Option (A-E) Exam Item Compiler + Trap Taxonomy Engine",
            latency: "104ms",
            status: "VERIFIED",
            detail: "Constructs multi-variable numerical customs case vignettes where each distractor (A-E) isolates a specific statutory misconception."
          },
          {
            step: "03",
            name: "Verbatim Golden-Quote & Arithmetic Proof Gate",
            tech: "Exact Substring Matcher + Valuation/Drawback Math Solver",
            latency: "41ms",
            status: "VERIFIED",
            detail: "Verifies 100.0% exact substring match of the proof quote against the CFR text and validates the numerical answer key."
          },
          {
            step: "04",
            name: "SCORM 1.2 & QTI 2.1 Package Compilation",
            tech: "IMS Manifest XML + QTI Assessment Item JSON Serializer",
            latency: "98ms",
            status: "VERIFIED",
            detail: "Compiles LMS-ready SCORM 1.2 lesson monograph, interactive Socratic hint sequence, and 5-option graded assessment."
          },
          {
            step: "05",
            name: "Canvas / Blackboard / Cornerstone LMS Webhook Sync",
            tech: "LTI 1.3 & REST Courseware Dispatch Endpoint",
            latency: "55ms",
            status: "VERIFIED",
            detail: "Publishes verified curriculum package directly to enterprise LMS catalogs and candidate readiness analytics."
          }
        ],
        monograph: {
          headline: "Deterministic EdTech Courseware Engineering: Compiling Zero-Hallucination SCORM 1.2 Modules & 5-Option Psychometric Assessments from Federal Statutes",
          subtitle: "How Citation-Locked Curriculum Synthesis Eliminates SME Review Bottlenecks in High-Stakes Licensing (CBLE, IRS EA, Medical Boards)",
          executiveSummary: "In high-stakes professional certification and corporate compliance training, generic question generators fail because they produce plausible-sounding legal errors and four-option trivia instead of rigorous five-option (A–E) board-style case vignettes. By anchoring every instructional section and distractor rationale directly to parsed eCFR statutory clauses (19 CFR Parts 152 and 190), ContentForge compiles LMS-ready SCORM 1.2 study monographs and QTI 2.1 assessments in 350ms with 100.0% statutory citation fidelity.",
          sections: [
            {
              heading: "1. Statutory Boundary Precision: Transaction Value Additions vs. Exclusions",
              body: "Under 19 CFR 152.103(a)(1) and (b)(1), customs valuation requires strict separation between dutiable additions and non-dutiable exclusions. While foreign-sourced molds, incorporated components, freight to deliver an assist to the foreign factory, and selling commissions must be added to the Price Actually Paid or Payable (PAPP), bona fide buying commissions, separately itemized CIF international freight/insurance, and engineering or design work undertaken inside the United States by U.S.-domiciled personnel are statutorily excluded.",
              citationRef: "[19 CFR 152.102(a)(1)-(2) & 19 CFR 152.103(a)-(b)]"
            },
            {
              heading: "2. TFTEA Modernized Drawback: The 8-Digit Substitution Standard & 'Lesser Of' Cap",
              body: "Under 19 CFR 190.32(a)-(c) (19 U.S.C. 1313(j)(2)), unused merchandise substitution drawback allows domestic or imported goods sharing the same 8-digit HTSUS subheading (provided the 8-digit description does not begin with 'Other') to be exported within 5 years of importation. Crucially, the refund is capped at 99% of the LESSER of the duties, taxes, and fees paid on the designated imported merchandise or those that would apply to the lower-valued substituted exported merchandise.",
              citationRef: "[19 CFR 190.32(a)-(c)]"
            },
            {
              heading: "3. Automated Distractor Engineering & SCORM 1.2 / QTI 2.1 Serialization",
              body: "Every generated assessment item maps each of the four wrong options (distractors) to a documented candidate error—such as forgetting the 1% CBP retention on drawback, failing to exclude U.S. engineering from assists, or confusing the 5-year drawback filing window from importation with the 3-year post-liquidation record retention period under 19 CFR 190.51(e)-(f).",
              citationRef: "[19 CFR 190.51(e)-(f)]"
            }
          ],
          svgDiagramTitle: "Statutory AST -> Psychometric Case Vignette -> SCORM 1.2 / QTI 2.1 LMS Compiler (350ms)",
          keyTakeaways: [
            "U.S.-undertaken engineering/design work and bona fide buying commissions are strictly excluded from Transaction Value [19 CFR 152.102(a)(2), 152.103(b)(1)(ii)]",
            "Unused substitution drawback (19 U.S.C. 1313(j)(2)) is capped at 99% of the LESSER of imported vs. substituted export duty [19 CFR 190.32(a)-(c)]",
            "Drawback claims must be filed in ACE within 5 years of importation; records must be kept 3 years after drawback liquidation [19 CFR 190.51(e)-(f)]"
          ]
        },
        evalCases: [
          {
            id: "EVAL-01",
            sourceRef: "19 CFR 152.103(a)(1)",
            groundTruth: "Exclude separately itemized international freight & marine insurance from CIF PAPP",
            generatedClaim: "International ocean freight and marine insurance are deducted from CIF price to establish PAPP.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "38ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-02",
            sourceRef: "19 CFR 152.102(a)(1)",
            groundTruth: "Assist value includes acquisition/production cost PLUS freight to foreign plant",
            generatedClaim: "Freight to transport a buyer-supplied mold to the foreign factory is part of the dutiable assist.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "35ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-03",
            sourceRef: "19 CFR 152.102(a)(2)",
            groundTruth: "Engineering/design work undertaken inside the U.S. by U.S. domiciliaries is excluded",
            generatedClaim: "U.S.-based engineering sketches created by U.S.-domiciled staff are excluded from assists.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "34ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-04",
            sourceRef: "19 CFR 152.103(b)(1)(ii)",
            groundTruth: "Selling commissions are added; bona fide buying commissions are excluded",
            generatedClaim: "Bona fide buying agent commissions are excluded from transaction value.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "37ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-05",
            sourceRef: "19 CFR 190.32(a)-(c)",
            groundTruth: "Unused substitution drawback capped at 99% of LESSER of imported vs. substituted duty",
            generatedClaim: "TFTEA 1313(j)(2) refund equals 99% of the lesser duty applicable to imported or substituted goods.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "42ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-06",
            sourceRef: "19 CFR 190.51(e)-(f)",
            groundTruth: "5-year filing limit from importation; 3-year record retention after drawback liquidation",
            generatedClaim: "Complete claim due within 5 years of importation; records retained 3 years post-liquidation.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "36ms",
            cost: "$0.002",
            status: "PASS"
          }
        ],
        webhookPayload: {
          workflowId: "wf_edtech_scorm12_qti21_compiler",
          executionId: "scorm_20261122_551209c",
          timestampUtc: "2026-11-22T20:47:00Z",
          webhookDestination: "https://lms-bridge.caliberfoundry-staging.io/v2/scorm-qti/publish",
          citationGatePassed: true,
          hallucinationScore: 0.0,
          citationPrecisionScore: 1.0,
          checksumSha256: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
          extractedEntities: {
            scormStandard: "IMS SCORM 1.2 / QTI 2.1",
            examTrack: "U.S. Customs Broker License Exam (CBLE)",
            statutoryParts: ["19 CFR Part 152", "19 CFR Part 190"],
            drawbackFilingWindowYears: 5,
            drawbackRecordRetentionYearsAfterLiquidation: 3,
            drawbackRefundCapPercent: 99
          },
          synthesizedAssets: {
            imsManifestXml: "imsmanifest.xml (SCORM 1.2 Validated)",
            qtiAssessmentItemsCount: 1,
            distractorRationalesVerified: 5,
            lmsCompatibility: ["Canvas", "Blackboard", "Moodle", "Cornerstone OnDemand"]
          }
        },
        courseModule: {
          moduleTitle: "Module 7: Integrated Customs Valuation (19 CFR 152) & TFTEA Unused Substitution Drawback (19 CFR 190)",
          objective: "Apply the U.S. engineering assist exclusion and the TFTEA 'Lesser Of' substitution drawback cap in a single multi-step problem.",
          quizStem: "Cascade Precision Inc. imports 1,000 industrial optical sensors at an FOB invoice price of $100,000 (paying a 5% duty rate), after providing the foreign factory with $10,000 in foreign-manufactured lens molds (plus $1,000 freight to ship the molds to the factory), $15,000 in U.S.-based engineering work performed by U.S.-domiciled staff, and paying a $3,000 bona fide buying commission. Two years later, Cascade exports 1,000 unused domestic optical sensors of the same non-'Other' 8-digit HTSUS subheading valued at $80,000 and files an unused merchandise substitution drawback claim under [19 CFR 190.32(a)-(c)]. What was the correct Transaction Value of the imported sensors, and what is the maximum drawback refund allowable on the exported sensors?",
          options: [
            {
              letter: "A",
              text: "Transaction Value is $129,000; Maximum Drawback Refund is $6,385.50.",
              isCorrect: false,
              rationale: "Erroneously includes the $15,000 U.S. engineering work ([19 CFR 152.102(a)(2)]) and $3,000 buying commission ([19 CFR 152.103(b)(1)(ii)]), and ignores the 'Lesser Of' rule on drawback."
            },
            {
              letter: "B",
              text: "Transaction Value is $111,000 ($100,000 FOB + $10,000 foreign mold assist + $1,000 mold freight, excluding U.S. engineering and buying commission); Maximum Drawback Refund is $3,960.00 (99% of the LESSER duty: $80,000 substituted export value x 5% = $4,000.00 x 99% = $3,960.00, rather than 99% of the $5,550.00 import duty paid).",
              isCorrect: true,
              rationale: "CORRECT: Under [19 CFR 152.102(a)(1)-(2)] and [19 CFR 152.103(b)(1)(ii)], Transaction Value is $100,000 + $10,000 + $1,000 = $111,000 (5% duty paid = $5,550). Under [19 CFR 190.32(a)-(c)], drawback is 99% of the lesser duty ($80,000 x 5% = $4,000 x 99% = $3,960.00)."
            },
            {
              letter: "C",
              text: "Transaction Value is $111,000; Maximum Drawback Refund is $5,494.50 (99% of the $5,550.00 import duty paid).",
              isCorrect: false,
              rationale: "Calculates Transaction Value ($111,000) correctly, but forgets to apply the mandatory 'Lesser Of' cap in [19 CFR 190.32(c)] when the substituted exported goods have a lower value ($80,000)."
            },
            {
              letter: "D",
              text: "Transaction Value is $111,000; Maximum Drawback Refund is $4,000.00 (100% of the lesser duty).",
              isCorrect: false,
              rationale: "Applies the 'Lesser Of' cap ($80,000 x 5% = $4,000.00) but forgets the 99% statutory drawback limit (1% CBP retention) under [19 CFR 190.32(c)]."
            },
            {
              letter: "E",
              text: "Transaction Value is $110,000 (omitting the $1,000 freight to transport the mold assist); Maximum Drawback Refund is $3,960.00.",
              isCorrect: false,
              rationale: "Under [19 CFR 152.102(a)(1)], the value of an assist includes the cost of transporting the assist to the foreign place of production ($1,000)."
            }
          ],
          goldenQuote: "[19 CFR 190.32(a)-(c)] Under TFTEA Modernized Drawback (19 U.S.C. 1313(j)(2)), unused merchandise substitution drawback is permitted for merchandise classified under the same 8-digit HTSUS subheading (when the 8-digit description does not begin with \"Other\") exported within 5 years of importation, capped at 99% of the LESSER of the duties, taxes, and fees paid on the designated imported merchandise or those that would apply to the substituted exported merchandise."
        },
        socialAndVideo: {
          threadCards: [
            {
              index: "01/06",
              hook: "Why generic quiz generators fail in high-stakes licensing (Customs Broker, CPA, Enrolled Agent, Medical Boards):",
              body: "They generate 4-option surface trivia and hallucinate statutory exceptions. Here is how ContentForge compiles 5-option (A-E) board-grade vignettes and SCORM 1.2 modules with 100.0% eCFR citation fidelity.",
              metricTag: "SCORM 1.2 & QTI 2.1 // 100% CITATION FIDELITY"
            },
            {
              index: "02/06",
              hook: "Rule 1: Every distractor (A-E) must map to a real statutory trap.",
              body: "In our 19 CFR Part 152 + Part 190 vignette, Option C tests whether the candidate forgets the TFTEA 'Lesser Of' rule, Option D tests the 1% CBP retention, and Option E tests assist transport costs.",
              metricTag: "PSYCHOMETRIC DISTRACTOR TAXONOMY"
            },
            {
              index: "03/06",
              hook: "Rule 2: Verbatim Golden-Quote verification.",
              body: "Before any QTI 2.1 assessment item compiles, our pre-flight gate verifies that the explanation's Golden Quote is a 100.0% exact substring of the governing eCFR section.",
              metricTag: "0.0% STATUTORY HALLUCINATION"
            },
            {
              index: "04/06",
              hook: "Rule 3: Deterministic multi-step arithmetic solver.",
              body: "Our math engine verifies both steps simultaneously: Transaction Value ($100K FOB + $11K mold assist = $111K) and Unused Substitution Drawback ($80K x 5% x 99% = $3,960.00).",
              metricTag: "41ms ARITHMETIC PROOF GATE"
            },
            {
              index: "05/06",
              hook: "Rule 4: Instant SCORM 1.2 & QTI 2.1 serialization.",
              body: "One click exports an IMS-compliant SCORM 1.2 package (imsmanifest.xml + lesson monograph + Socratic hints + graded 5-option quiz) ready for Canvas, Blackboard, or Cornerstone.",
              metricTag: "350ms E2E // $0.012/MODULE"
            },
            {
              index: "06/06",
              hook: "Cut curriculum development time from 14 hours per module to 350 milliseconds:",
              body: "Test the live EdTech Courseware & SCORM 1.2 Assessment Generator inside ContentForge Studio.",
              metricTag: "LIVE EDTECH STUDIO"
            }
          ],
          storyboard: [
            {
              scene: "Scene 01 (00:00–00:08)",
              visual: "Split-screen of Title 19 CFR eCFR regulations (Part 152 & Part 190) transforming into an interactive SCORM 1.2 learning module and 5-option exam workbench.",
              voiceover: "High-stakes professional certification demands 100% statutory precision—not generic multiple-choice trivia.",
              dataOverlay: "19 CFR PARTS 152 & 190 -> SCORM 1.2 & QTI 2.1 (350ms)"
            },
            {
              scene: "Scene 02 (00:08–00:17)",
              visual: "Animated breakdown of the 5 answer choices (A through E), showing each wrong choice bound to a specific regulatory trap (U.S. engineering assist, buying commission, 'Lesser Of' rule).",
              voiceover: "ContentForge engineers authentic five-option case vignettes where every distractor diagnoses a specific statutory misconception.",
              dataOverlay: "5-OPTION (A-E) DISTRACTOR DIAGNOSTIC ENGINE"
            },
            {
              scene: "Scene 03 (00:17–00:26)",
              visual: "Step-by-step math verification overlay: $111,000 Transaction Value ($5,550 duty paid) compared against $80,000 substituted export ($4,000 duty x 99% = $3,960.00 refund).",
              voiceover: "Our deterministic arithmetic solver verifies every valuation and drawback calculation before locking the official answer key.",
              dataOverlay: "VERIFIED ANSWER KEY: OPTION B ($111,000 // $3,960.00)"
            },
            {
              scene: "Scene 04 (00:26–00:35)",
              visual: "Verbatim Golden Quote callout snapping directly onto [19 CFR 190.32(a)-(c)] with a 100.0% Exact Substring Match badge.",
              voiceover: "Every rationale is locked to a verbatim Golden Quote from the source regulation, guaranteeing zero legal hallucinations.",
              dataOverlay: "GOLDEN QUOTE MATCH: 100.0% // HALLUCINATION: 0.0%"
            },
            {
              scene: "Scene 05 (00:35–00:45)",
              visual: "SCORM 1.2 imsmanifest.xml and QTI 2.1 JSON bundle syncing into Canvas, Blackboard, and Cornerstone LMS dashboards.",
              voiceover: "Export production-ready SCORM 1.2 and QTI 2.1 courseware in 350 milliseconds with ContentForge Studio.",
              dataOverlay: "LMS-READY EXPORT // CANVAS · BLACKBOARD · CORNERSTONE"
            }
          ]
        }
      },

      // =======================================================================
      // PRESET 4: FINTECH & COMPUTE INFRASTRUCTURE MONOGRAPH & STORYBOARD ENGINE
      // =======================================================================
      {
        id: "fintech-monograph",
        badge: "FINTECH & INFRASTRUCTURE CONTENT ENGINE",
        title: "Cross-Border Settlement & Decentralized GPU Compute Monograph & Storyboard Engine",
        sector: "Global Fintech Settlement (Raenest) & Decentralized Compute Grids (Nosana)",
        hallucinationRate: "0.0%",
        citationPrecision: "100.0%",
        avgLatencyMs: 395,
        costPerRunUsd: "$0.016",
        webhookEndpoint: "https://growth-engine.caliberfoundry-staging.io/v2/fintech-infra/dispatch",
        sourceTitle: "Q3 2026 Cross-Border Multi-Currency Settlement & Decentralized GPU Compute Telemetry Report",
        sourceText: `[Section 1.2] Across emerging-market cross-border payment corridors (USD/EUR/GBP to NGN/KES/ZAR), legacy correspondent banking chains impose an average settlement delay of 72 to 120 hours and a blended foreign-exchange plus intermediary wire cost of 4.65% per B2B invoice. [Section 2.1] By routing inbound USD ACH, Fedwire, and EUR SEPA Instant flows through programmable FBO (For Benefit Of) virtual treasury accounts paired with automated stablecoin liquidity bridges, Raenest Enterprise Treasury reduced median cross-border settlement latency to 118 seconds (a 99.95% reduction in settlement time) while compressing total all-in FX and settlement spread to 0.68% (68 basis points). [Table 2, Row 3] Treasury API webhook reconciliation achieved 99.98% automated ledger matching across $420.0 million in Q3 2026 annualized payment volume, eliminating 14.5 hours per week of manual finance team CSV reconciliation. [Section 4.1] On the compute infrastructure layer, centralized cloud providers charge $3.40 to $4.20 per GPU-hour for NVIDIA A100 (80GB) inference nodes with 12-month reserved contract lock-ins. [Table 4, Row 6] By dispatching containerized inference and rendering workloads across the Nosana decentralized Solana-settled GPU grid, engineering teams achieved an average effective compute cost of $0.82 per A100-equivalent GPU-hour (a 78.4% unit cost reduction compared to $3.80 centralized cloud baseline) across 18,400 completed container jobs. [Section 5.3] Cryptographic proof-of-compute verification and deterministic container health checks maintained a 99.42% job completion SLA with zero cold-start queue stalls exceeding 4.2 seconds.`,
        schemaTemplate: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "FintechAndComputeMonographContract_v2",
  "type": "object",
  "required": ["fintechTelemetry", "computeGridTelemetry", "citationGatePassed", "assets"],
  "properties": {
    "fintechTelemetry": {
      "type": "object",
      "required": ["legacySettlementHours", "programmableSettlementSeconds", "allInSpreadBps", "annualizedVolumeUsd"],
      "properties": {
        "programmableSettlementSeconds": { "type": "integer", "const": 118 },
        "allInSpreadBps": { "type": "integer", "const": 68 },
        "annualizedVolumeUsd": { "type": "integer", "const": 420000000 }
      }
    },
    "computeGridTelemetry": {
      "type": "object",
      "required": ["centralizedBaselineUsdPerHr", "decentralizedGridUsdPerHr", "costReductionPercent", "jobCompletionSlaPercent"],
      "properties": {
        "decentralizedGridUsdPerHr": { "type": "number", "const": 0.82 },
        "costReductionPercent": { "type": "number", "const": 78.4 },
        "jobCompletionSlaPercent": { "type": "number", "const": 99.42 }
      }
    },
    "citationGatePassed": { "type": "boolean", "const": true }
  }
}`,
        pipelineStages: [
          {
            step: "01",
            name: "Telemetry Log & Financial Table Ingestion",
            tech: "JSON/Markdown Telemetry Parser + Span Hash Registry",
            latency: "61ms",
            status: "VERIFIED",
            detail: "Indexes payment corridor latency/FX benchmarks ([Section 1.2], [Section 2.1]) and decentralized GPU cluster telemetry ([Table 4, Row 6])."
          },
          {
            step: "02",
            name: "Basis-Point & Cost-Delta Invariant Verification",
            tech: "Deterministic Unit-Economics Calculator",
            latency: "54ms",
            status: "VERIFIED",
            detail: "Verifies 4.65% (465 bps) -> 0.68% (68 bps) FX spread compression and $3.80/hr -> $0.82/hr (-78.4%) GPU unit cost delta."
          },
          {
            step: "03",
            name: "Editorial Monograph & SVG Architecture Compilation",
            tech: "Swiss Editorial Layout Engine + Vector Topology Generator",
            latency: "115ms",
            status: "VERIFIED",
            detail: "Compiles institutional research monograph with embedded FBO settlement and decentralized GPU node topology specs."
          },
          {
            step: "04",
            name: "6-Card X/LinkedIn Thread & Remotion 60fps Storyboard",
            tech: "Multi-Format Growth Asset Compiler",
            latency: "108ms",
            status: "VERIFIED",
            detail: "Synthesizes 6 metric-anchored social cards and a 5-scene Remotion video storyboard with exact kinetic data overlays."
          },
          {
            step: "05",
            name: "CMS, Developer Docs & Social Scheduler Dispatch",
            tech: "REST Webhook Fan-Out (Ghost / Webflow / Typefully / Remotion)",
            latency: "57ms",
            status: "VERIFIED",
            detail: "Pushes verified technical monograph and video render manifest to production growth channels with zero manual copy-pasting."
          }
        ],
        monograph: {
          headline: "The New Infrastructure Stack: 118-Second Cross-Border Treasury Settlement at 68 bps and $0.82/Hr Decentralized GPU Compute Grids",
          subtitle: "Quantitative Q3 2026 Telemetry Analysis of Programmable FBO Payment Corridors and Containerized Solana-Settled Compute Networks",
          executiveSummary: "Global technology operators scaling across borderless talent and high-throughput compute workloads face two structural taxes: a 4.65% correspondent banking FX/wire toll with 72–120 hour settlement delays, and a $3.40–$4.20 per GPU-hour centralized cloud oligopoly tax. Q3 2026 production telemetry demonstrates that combining programmable FBO multi-currency settlement rails (Raenest Enterprise Treasury) with decentralized containerized GPU compute grids (Nosana) compresses cross-border settlement to 118 seconds at 0.68% spread while cutting A100-equivalent GPU expenditure by 78.4% to $0.82/hour.",
          sections: [
            {
              heading: "1. Programmable FBO Treasury Rails: From 120 Hours & 465 bps to 118 Seconds & 68 bps",
              body: "Traditional USD/EUR/GBP to emerging-market (NGN/KES/ZAR) B2B payouts traverse three to four correspondent banks, locking working capital for 72 to 120 hours at an average cost of 4.65%. By terminating inbound USD ACH/Fedwire and EUR SEPA Instant directly into programmable FBO accounts bridged via automated liquidity pools, median settlement time dropped by 99.95% to 118 seconds at a 0.68% all-in spread across $420.0M in annualized volume.",
              citationRef: "[Section 1.2, Section 2.1 & Table 2, Row 3]"
            },
            {
              heading: "2. Automated Ledger Reconciliation & Finance Ops Velocity",
              body: "Beyond raw basis-point savings, deterministic webhook settlement notifications achieved a 99.98% automated ledger reconciliation match rate across enterprise ERPs, eliminating 14.5 hours per week of manual CSV reconciliation for corporate finance teams.",
              citationRef: "[Table 2, Row 3]"
            },
            {
              heading: "3. Decentralized GPU Compute Economics: $0.82/Hr A100-Equivalent at 99.42% SLA",
              body: "On the infrastructure side, migrating containerized inference and rendering pipelines from centralized cloud providers ($3.80/hr blended A100 baseline) to the Nosana decentralized GPU grid delivered an effective rate of $0.82 per GPU-hour (-78.4%) across 18,400 completed jobs, while cryptographic proof-of-compute verification sustained a 99.42% job completion SLA with cold-start queues under 4.2 seconds.",
              citationRef: "[Section 4.1, Table 4, Row 6 & Section 5.3]"
            }
          ],
          svgDiagramTitle: "Programmable FBO Settlement Rail (118s / 68 bps) + Decentralized GPU Compute Grid ($0.82/hr)",
          keyTakeaways: [
            "118-second cross-border settlement (down from 72–120 hrs) and 0.68% all-in FX spread (down from 4.65%) across $420M annualized volume [Section 1.2, Section 2.1, Table 2]",
            "99.98% automated ERP webhook reconciliation saving 14.5 hours/week of manual finance operations [Table 2, Row 3]",
            "$0.82/hr A100-equivalent decentralized GPU compute (-78.4% vs. $3.80 centralized baseline) across 18,400 jobs at 99.42% SLA [Table 4, Row 6, Section 5.3]"
          ]
        },
        evalCases: [
          {
            id: "EVAL-01",
            sourceRef: "Section 1.2",
            groundTruth: "Legacy correspondent settlement: 72–120 hours at 4.65% blended FX/wire cost",
            generatedClaim: "Correspondent banking chains require 72 to 120 hours and charge 4.65% per B2B invoice.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "40ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-02",
            sourceRef: "Section 2.1",
            groundTruth: "Programmable FBO settlement: 118 seconds (-99.95%) at 0.68% (68 bps) spread",
            generatedClaim: "Raenest FBO rails settle in 118 seconds (-99.95%) at an all-in spread of 0.68% (68 bps).",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "43ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-03",
            sourceRef: "Table 2, Row 3",
            groundTruth: "99.98% automated ledger match across $420.0M volume; saves 14.5 hrs/week",
            generatedClaim: "Webhook reconciliation hit 99.98% across $420.0M volume, saving 14.5 hours/week.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "45ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-04",
            sourceRef: "Section 4.1",
            groundTruth: "Centralized cloud A100 (80GB) pricing: $3.40 to $4.20/hr with 12-month lock-in",
            generatedClaim: "Centralized cloud providers charge $3.40–$4.20 per A100 GPU-hour with 12-month lock-ins.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "39ms",
            cost: "$0.002",
            status: "PASS"
          },
          {
            id: "EVAL-05",
            sourceRef: "Table 4, Row 6",
            groundTruth: "Nosana decentralized GPU grid: $0.82/hr (-78.4% vs. $3.80 baseline) across 18,400 jobs",
            generatedClaim: "Decentralized GPU compute averaged $0.82/hr (-78.4% unit cost) across 18,400 jobs.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "46ms",
            cost: "$0.003",
            status: "PASS"
          },
          {
            id: "EVAL-06",
            sourceRef: "Section 5.3",
            groundTruth: "99.42% job completion SLA; zero cold-start queue stalls > 4.2 seconds",
            generatedClaim: "Proof-of-compute health checks maintained 99.42% SLA with cold starts <= 4.2s.",
            exactMatch: "100.0%",
            hallucination: "0.0%",
            latency: "41ms",
            cost: "$0.003",
            status: "PASS"
          }
        ],
        webhookPayload: {
          workflowId: "wf_fintech_compute_growth_monograph_v2",
          executionId: "fin_20261122_339012d",
          timestampUtc: "2026-11-22T20:48:00Z",
          webhookDestination: "https://growth-engine.caliberfoundry-staging.io/v2/fintech-infra/dispatch",
          citationGatePassed: true,
          hallucinationScore: 0.0,
          citationPrecisionScore: 1.0,
          checksumSha256: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
          extractedEntities: {
            fintechSettlementLatencySeconds: 118,
            fintechFxSpreadBps: 68,
            legacyCorrespondentSpreadBps: 465,
            annualizedPaymentVolumeUsd: 420000000,
            reconciliationMatchRatePercent: 99.98,
            decentralizedGpuCostPerHourUsd: 0.82,
            centralizedGpuBaselineUsd: 3.80,
            gpuCostReductionPercent: 78.4,
            completedContainerJobs: 18400,
            computeSlaPercent: 99.42
          },
          synthesizedAssets: {
            monographSlug: "q3-2026-programmable-fbo-settlement-and-decentralized-gpu-telemetry",
            remotionCompositionId: "FintechComputeTelemetry60fps",
            xThreadCardsReady: 6
          }
        },
        courseModule: {
          moduleTitle: "Module 5: Cross-Border Treasury Basis-Point Economics & Decentralized Compute SLAs",
          objective: "Quantify annual treasury savings and GPU infrastructure cost reductions from verified Q3 2026 telemetry.",
          quizStem: "According to [Section 1.2], [Section 2.1], [Table 2, Row 3], [Table 4, Row 6], and [Section 5.3] of the Q3 2026 Telemetry Report, how do programmable FBO settlement rails and the Nosana decentralized GPU grid compare against legacy correspondent banking and centralized cloud baselines?",
          options: [
            {
              letter: "A",
              text: "Programmable FBO rails reduce settlement time from 72–120 hours to 24 hours at a 2.50% spread, while decentralized GPU compute costs $3.40/hour at a 95.0% SLA.",
              isCorrect: false,
              rationale: "Understates both breakthroughs: FBO settlement drops to 118 seconds at 0.68% ([Section 2.1]), and decentralized GPU cost is $0.82/hr at a 99.42% SLA ([Table 4, Row 6; Section 5.3])."
            },
            {
              letter: "B",
              text: "Programmable FBO treasury rails compress cross-border settlement latency from 72–120 hours down to 118 seconds (-99.95%) and cut all-in FX/wire spread from 4.65% to 0.68% (68 bps) with 99.98% automated ledger matching across $420.0M annualized volume; simultaneously, decentralized GPU compute cuts A100-equivalent hourly cost by 78.4% from a $3.80 centralized baseline to $0.82/hour across 18,400 jobs at a 99.42% completion SLA.",
              isCorrect: true,
              rationale: "CORRECT: Matches every verified metric across [Section 1.2], [Section 2.1], [Table 2, Row 3], [Table 4, Row 6], and [Section 5.3]."
            },
            {
              letter: "C",
              text: "Programmable FBO rails settle in 118 seconds at a 4.65% spread, while decentralized GPU compute costs $0.68/hour across 420,000 jobs.",
              isCorrect: false,
              rationale: "4.65% is the legacy correspondent banking cost ([Section 1.2]), 0.68% is the FBO FX spread (not GPU cost, which is $0.82/hr), and $420.0M is payment volume (completed GPU jobs = 18,400)."
            },
            {
              letter: "D",
              text: "Programmable FBO rails require 14.5 hours of manual CSV reconciliation per week and require 12-month reserved contract lock-ins.",
              isCorrect: false,
              rationale: "Programmable FBO webhooks ELIMINATED 14.5 hours/week of manual CSV reconciliation ([Table 2, Row 3]), and 12-month lock-ins apply to centralized cloud providers ([Section 4.1])."
            },
            {
              letter: "E",
              text: "Decentralized GPU compute reduces hourly cost to $0.82/hour but suffers from cold-start queue stalls averaging 72 hours.",
              isCorrect: false,
              rationale: "Under [Section 5.3], zero cold-start queue stalls exceeded 4.2 seconds (72–120 hours is the legacy correspondent banking wire delay in [Section 1.2])."
            }
          ],
          goldenQuote: "[Section 2.1] By routing inbound USD ACH, Fedwire, and EUR SEPA Instant flows through programmable FBO (For Benefit Of) virtual treasury accounts paired with automated stablecoin liquidity bridges, Raenest Enterprise Treasury reduced median cross-border settlement latency to 118 seconds (a 99.95% reduction in settlement time) while compressing total all-in FX and settlement spread to 0.68% (68 basis points)."
        },
        socialAndVideo: {
          threadCards: [
            {
              index: "01/06",
              hook: "Two structural taxes are quietly draining global B2B tech companies in 2026:",
              body: "(1) The 4.65% correspondent banking FX & wire toll (with 72–120 hour settlement delays), and (2) the $3.80/hr centralized cloud GPU tax. Here is what Q3 2026 production telemetry shows when you replace both.",
              metricTag: "Q3 2026 INFRASTRUCTURE TELEMETRY"
            },
            {
              index: "02/06",
              hook: "1. Cross-Border Treasury: 120 hours -> 118 seconds.",
              body: "By terminating USD ACH/Fedwire and EUR SEPA Instant into programmable FBO accounts with automated liquidity bridges, median cross-border settlement dropped 99.95% to 118 seconds.",
              metricTag: "118s SETTLEMENT (-99.95%)"
            },
            {
              index: "03/06",
              hook: "2. Compressing FX & Wire Spreads from 465 bps to 68 bps:",
              body: "Across $420.0M in annualized payment volume, all-in FX and settlement cost compressed from 4.65% to 0.68%—while webhook ledger matching hit 99.98% and saved 14.5 hrs/week of manual CSV ops.",
              metricTag: "0.68% SPREAD // 99.98% LEDGER MATCH"
            },
            {
              index: "04/06",
              hook: "3. Decentralized GPU Compute: $3.80/hr -> $0.82/hr (-78.4%).",
              body: "Across 18,400 containerized jobs dispatched to the Nosana Solana-settled GPU grid, A100-equivalent compute averaged $0.82/hr with zero 12-month cloud contract lock-ins.",
              metricTag: "$0.82/HR A100-EQUIV (-78.4%)"
            },
            {
              index: "05/06",
              hook: "4. Enterprise reliability on decentralized nodes:",
              body: "Cryptographic proof-of-compute verification and deterministic container health checks sustained a 99.42% job completion SLA with cold-start queues capped at <= 4.2 seconds.",
              metricTag: "99.42% SLA // <= 4.2s COLD START"
            },
            {
              index: "06/06",
              hook: "How we turn raw engineering telemetry into monographs, threads & 60fps Remotion videos in 395ms:",
              body: "Explore the live Fintech & Compute Infrastructure Monograph & Storyboard Engine inside ContentForge Studio.",
              metricTag: "395ms E2E // 0.0% HALLUCINATION"
            }
          ],
          storyboard: [
            {
              scene: "Scene 01 (00:00–00:08)",
              visual: "World map comparing a 120-hour 4-hop correspondent banking wire (4.65% fee) against a direct 118-second programmable FBO settlement arc (0.68% spread).",
              voiceover: "Legacy cross-border banking locks up capital for five days and takes nearly five percent of every invoice.",
              dataOverlay: "SETTLEMENT: 120 HRS -> 118 SECONDS // SPREAD: 4.65% -> 0.68%"
            },
            {
              scene: "Scene 02 (00:08–00:17)",
              visual: "Real-time Treasury API ledger streaming $420.0M annualized volume with 99.98% automated webhook reconciliation ticks.",
              voiceover: "Programmable FBO accounts settle in 118 seconds at 68 basis points while automating 99.98 percent of ERP reconciliation.",
              dataOverlay: "$420.0M VOLUME // 99.98% AUTO-RECONCILIATION (-14.5 HRS/WK)"
            },
            {
              scene: "Scene 03 (00:17–00:26)",
              visual: "3D isometric GPU cluster grid comparing $3.80/hr centralized cloud racks against $0.82/hr decentralized Nosana container nodes.",
              voiceover: "On the compute layer, dispatching containerized workloads to decentralized GPU grids slashes A100-equivalent cost by 78.4 percent to 82 cents an hour.",
              dataOverlay: "GPU COMPUTE: $3.80/HR -> $0.82/HR (-78.4% UNIT COST)"
            },
            {
              scene: "Scene 04 (00:26–00:35)",
              visual: "Telemetry gauge locking at 99.42% Job Completion SLA across 18,400 container jobs with a 4.2-second maximum cold-start bar.",
              voiceover: "Cryptographic proof-of-compute health checks maintain a 99.42 percent completion SLA across 18,400 production container runs.",
              dataOverlay: "18,400 JOBS // 99.42% SLA // <= 4.2s COLD START"
            },
            {
              scene: "Scene 05 (00:35–00:45)",
              visual: "ContentForge Studio compiling the telemetry dossier into an editorial monograph, 6-card thread, and 60fps Remotion render manifest.",
              voiceover: "Turn your infrastructure telemetry into citation-verified monographs and video storyboards in under 400 milliseconds with ContentForge.",
              dataOverlay: "CONTENTFORGE STUDIO // 100.0% CITATION PRECISION"
            }
          ]
        }
      }
    ]
  };

  if (typeof window !== "undefined") {
    window.CONTENTFORGE_DATA = CONTENTFORGE_DATA;
  }
  if (typeof root !== "undefined") {
    root.CONTENTFORGE_DATA = CONTENTFORGE_DATA;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CONTENTFORGE_DATA;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
