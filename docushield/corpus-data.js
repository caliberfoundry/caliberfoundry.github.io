/**
 * DocuShield™ — Sample Document Corpus (Isolated Working Copy for PLAN-34)
 * 6 Sample Document Packets (EDTECH-01, ECOM-02, FIN-03, MED-04, EDTECH-05, GOV-06) · 48 Matterhorn Checkpoints
 * Note: Draft statuses explicitly indicate that manual human verification is required before claiming conformance.
 */
(function (root) {
  "use strict";

  function makeStandardCheckpoints(overrides) {
    const base = [
      { id: "01-006", clause: "ISO 14289-1 Clause 7.1", wcag: "WCAG 2.2 SC 1.3.1", category: "Artifact vs. Real Content Tagging", title: "Real content tagged in /StructTreeRoot; running headers & decorative rules marked as /Artifact", statusBefore: "FAIL", statusAfter: "PASS", severity: "CRITICAL", evidenceBefore: "Running headers/footers and decorative rules emitted inside unmarked content streams; /MarkInfo is false.", evidenceAfter: "Draft structure tags proposed; confirm real content vs. /Artifact manually." },
      { id: "06-001", clause: "ISO 14289-1 Clause 5 & 7.1", wcag: "EN 301 549 Clause 10.2", category: "XMP Metadata Stream", title: "XMP metadata stream contains pdfuaid:part=1 and dc:title with /DisplayDocTitle true", statusBefore: "FAIL", statusAfter: "PASS", severity: "CRITICAL", evidenceBefore: "No XMP /Metadata stream with pdfuaid:part=1 attached to Catalog; /DisplayDocTitle is false.", evidenceAfter: "Draft XMP packet prepared; confirm title accuracy and full PDF/UA-1 compliance manually." },
      { id: "09-003", clause: "ISO 14289-1 Clause 7.2 & 7.18.3", wcag: "WCAG 2.2 SC 1.3.2 & 2.4.3", category: "Logical Reading & Tab Order", title: "Structure tree reading order matches logical multi-column flow; every Page dictionary specifies /Tabs /S", statusBefore: "FAIL", statusAfter: "PASS", severity: "CRITICAL", evidenceBefore: "Multi-column lines interleaved horizontally; page dictionaries default to /Tabs /R.", evidenceAfter: "Draft sequential column order and /Tabs /S prepared; verify reading order in a screen reader." },
      { id: "11-001", clause: "ISO 14289-1 Clause 7.2", wcag: "WCAG 2.2 SC 3.1.1 & 3.1.2", category: "Natural Language Declaration", title: "Document /Catalog declares primary BCP-47 language /Lang and inline language spans", statusBefore: "FAIL", statusAfter: "PASS", severity: "HIGH", evidenceBefore: "/Catalog dictionary lacks /Lang entry.", evidenceAfter: "Draft /Lang declared on /Catalog; verify inline foreign phrases manually." },
      { id: "13-004", clause: "ISO 14289-1 Clause 7.3", wcag: "WCAG 2.2 SC 1.1.1", category: "Graphics & Figure Alternative Text", title: "Informative figures and scientific diagrams enclosed in <Figure> with descriptive /Alt and /BBox", statusBefore: "FAIL", statusAfter: "PASS", severity: "CRITICAL", evidenceBefore: "Informative diagrams lack <Figure> tags, /BBox attributes, or /Alt strings.", evidenceAfter: "Draft /Alt descriptions attached; subject-matter reviewer must confirm accuracy." },
      { id: "14-003", clause: "ISO 14289-1 Clause 7.4.2", wcag: "WCAG 2.2 SC 1.3.1 & 2.4.6", category: "Numbered Heading Hierarchy", title: "Strictly nested heading hierarchy (<H1> through <H4>) with zero skipped heading levels", statusBefore: "FAIL", statusAfter: "PASS", severity: "HIGH", evidenceBefore: "Visual title is untagged text followed by skipped heading levels.", evidenceAfter: "Draft sequential <H1>-<H3> hierarchy prepared; confirm outline semantics manually." },
      { id: "15-002", clause: "ISO 14289-1 Clause 7.5", wcag: "WCAG 2.2 SC 1.3.1", category: "Table Headers & Scope Bindings", title: "Data tables contain <TH> header cells with explicit /Scope or /Headers ID arrays", statusBefore: "FAIL", statusAfter: "PASS", severity: "CRITICAL", evidenceBefore: "Data tables encoded as flat text or <TD>-only grids with zero <TH> or /Scope attributes.", evidenceAfter: "Draft <TH Scope> and /Headers bindings prepared; verify cell associations manually." },
      { id: "28-001", clause: "ISO 14289-1 Clause 7.18.1", wcag: "WCAG 2.2 SC 1.4.3 & 3.3.2", category: "Interactive Forms, Links & Contrast", title: "Interactive widgets bound to <Form> OBJR with /TU tooltips; callout contrast verified >= 4.5:1", statusBefore: "FAIL", statusAfter: "PASS", severity: "HIGH", evidenceBefore: "Interactive widgets/links lack /TU or /Contents; visual callout contrast fails 4.5:1.", evidenceAfter: "Draft <Form>/<Link> bindings prepared; measure final rendered color contrast manually." }
    ];
    return base.map(cp => Object.assign({}, cp, (overrides && overrides[cp.id]) || {}));
  }

  const DOCUSHIELD_DATA = {
    meta: {
      productName: "DocuShield™ PDF/UA & Educational PDF Pre-Check Studio",
      version: "2026.11-PLAN34",
      standards: [
        "ISO 14289-1 (PDF/UA-1)",
        "Matterhorn Protocol 1.1 (31 Checkpoints: 87 Machine / 47 Human / 2 N/A)",
        "WCAG 2.2 Level AA",
        "EU Directive 2019/882 (European Accessibility Act — EAA)",
        "U.S. Section 508 & ADA Title II / Title III"
      ],
      freePacketIds: ["EDTECH-01", "ECOM-02"],
      validLicenseKeyDigests: [
        "5c05bd2d1eefa08f19b1e300aee51240b6cd33480b25f34e7011693e7bbc2e67",
        "5024e6a49ca7dcaba7f95addc2165f6439777dc972830f609cabbf97b8082eb2"
      ]
    },
    packets: [
      {
        id: "EDTECH-01",
        tier: "FREE",
        code: "EDTECH-01",
        title: "University STEM & Clinical Course Syllabus & Lab Manual",
        sector: "Higher Education & Clinical EdTech",
        pages: 28,
        regulation: "U.S. Section 508 & ADA Title II",
        fileName: "CHEM-304_Biochemistry_Clinical_Lab_Syllabus_Fall2026.pdf",
        fileSizeKB: 4280,
        pdfVersion: "%PDF-1.7",
        initialScore: 34,
        remediatedScore: 100,
        riskLevel: "Sample document — source findings",
        remediatedStatus: "Tag-tree draft prepared (manual verification required)",
        summary: "Untagged two-column course syllabus lacking /StructTreeRoot, /Lang (en-US), and XMP pdfuaid:part=1 metadata. Includes grading rubrics, enzyme kinetics diagrams, and BSL-2 lab forms requiring both structural tagging and manual accessibility review.",
        metadata: {
          before: {
            pdfuaid: "MISSING (No pdfuaid:part in XMP /Metadata)",
            markInfo: "<< /Marked false >> (Untagged content stream)",
            lang: "MISSING (No /Lang key on /Catalog)",
            displayDocTitle: "false (/ViewerPreferences displays raw filename)",
            structTreeRoot: "NULL (0 tagged structure elements across 28 pages)",
            tabOrder: "/R (Row order — breaks two-column reading sequence)",
            contrastRatio: "2.8:1 FAIL (Sample amber warning callout; verify manually)"
          },
          after: {
            pdfuaid: "Draft XMP: pdfuaid:part=1 template",
            markInfo: "Draft: << /Marked true /Suspects false >>",
            lang: "Draft: (en-US) on /Catalog + inline Latin spans",
            displayDocTitle: "Draft: true (dc:title = 'CHEM-304 Clinical Biochemistry Lab Manual')",
            structTreeRoot: "Draft: 412 semantic nodes (manual reading-order check required)",
            tabOrder: "Draft: /S across 28 page dictionaries",
            contrastRatio: "Manual measurement required (target >= 4.5:1)"
          }
        },
        visualRegions: [
          { id: "EDTECH-01-REG-1", checkpointId: "14-003", tagType: "H1", page: 1, label: "Course Banner & Skipped Heading Hierarchy", previewText: "CHEM-304: Clinical Biochemistry & Spectrophotometric Assay Laboratory — Fall 2026 Syllabus", issueSummary: "Visual title rendered as raw text operator followed by <H4>, skipping <H1>-<H3>.", beforeTag: "Untagged BT /F1 22 Tf -> <H4>", afterTag: "<H1 id=\"sec-title\"> -> <H2 id=\"sec-overview\"> (Confirm outline manually)" },
          { id: "EDTECH-01-REG-2", checkpointId: "09-003", tagType: "Sect", page: 1, label: "Two-Column Prerequisite & Biosafety Callout", previewText: "Section 1.1: Biosafety Level 2 (BSL-2) PPE Mandate & Prerequisite Verification...", issueSummary: "Two-column layout interleaves left and right lines; /Tabs /R.", beforeTag: "Interleaved Col 1 / Col 2 lines; /Tabs /R", afterTag: "<Sect> Col 1 -> Col 2 (/Tabs /S — test in screen reader)" },
          { id: "EDTECH-01-REG-3", checkpointId: "13-004", tagType: "Figure", page: 4, label: "Figure 1.2: Michaelis-Menten Enzyme Kinetics Curve", previewText: "[Vector Path Diagram: Reaction velocity V0 vs. Substrate concentration [S] showing Vmax and Km]", issueSummary: "Vector diagram lacks <Figure> wrapper and /Alt description.", beforeTag: "Untagged Vector Path Stream (/Alt: NULL)", afterTag: "<Figure /Alt (Michaelis-Menten curve showing V0 vs [S], Km=2.4 mM, Vmax=120 umol/min.)>" },
          { id: "EDTECH-01-REG-4", checkpointId: "15-002", tagType: "Table", page: 7, label: "Table 2.1: Clinical Lab Grading Rubric & Competency Weights", previewText: "Assessment Component | Lab Practicum Hours | Minimum Passing Threshold | Final Grade Weight (%)", issueSummary: "Rubric cells tagged as flat <P> paragraphs without <Table> or <TH Scope>.", beforeTag: "Flat <P> Paragraphs (0 <TH> cells)", afterTag: "<Table><THead><TR><TH Scope=\"Column\">...</TH></TR></THead></Table>" },
          { id: "EDTECH-01-REG-5", checkpointId: "28-001", tagType: "Annot", page: 12, label: "BSL-2 Emergency Spill Protocol & Student Attestation Form", previewText: "WARNING: Phenol-Chloroform Extraction Hazard — Student Digital Acknowledgment Signature Field", issueSummary: "Callout fails WCAG contrast (2.8:1) and AcroForm widget lacks /TU tooltip.", beforeTag: "Contrast 2.8:1 + /Widget /TU null", afterTag: "Target contrast >= 4.5:1 + <Form><OBJR /TU (Enter 8-Digit Student University ID) /></Form>" }
        ],
        structTreeBefore: "%PDF-1.7\n1 0 obj << /Type /Catalog /Pages 2 0 R /ViewerPreferences << /DisplayDocTitle false >> >> endobj\n4 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >> endobj",
        structTreeAfter: "%PDF-1.7\n% Draft structure template — manual QA required before publication\n1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-US) /MarkInfo << /Marked true /Suspects false >> /ViewerPreferences << /DisplayDocTitle true >> /Metadata 10 0 R /StructTreeRoot 20 0 R >> endobj",
        tables: [
          {
            id: "EDTECH-01-TBL-1",
            title: "Table 2.1: Clinical Lab Grading Rubric & Competency Weights",
            page: 7,
            summaryIssue: "Draft semantic <Table> with <TH Scope=\"Column\"> and <TH Scope=\"Row\"> bindings (Matterhorn 15-002).",
            headers: ["Assessment Module", "Practicum Hours", "Minimum Competency Gate", "Final Grade Weight"],
            rows: [
              ["Spectrophotometric UV-Vis Calibration & Beer-Lambert Assay", "12 hrs", "R-squared >= 0.995 Curve Fit", "25%"],
              ["Michaelis-Menten Enzyme Kinetics & Inhibitor Titration", "16 hrs", "Km / Vmax Error <= 4.0%", "30%"],
              ["SDS-PAGE Protein Electrophoresis & Western Blot Analysis", "14 hrs", "Zero Cross-Well Contamination", "25%"],
              ["BSL-2 Clinical Safety Audit & Electronic Lab Notebook", "10 hrs", "100% GHS / OSHA Compliance", "20%"]
            ],
            beforeMarkup: "<P>Assessment Module Practicum Hours Minimum Competency Gate Final Grade Weight</P>",
            afterMarkup: "<Table><THead><TR><TH Scope=\"Column\" ID=\"th_mod\">Assessment Module</TH></TR></THead></Table>"
          }
        ],
        figures: [
          {
            id: "EDTECH-01-FIG-1",
            title: "Figure 1.2: Michaelis-Menten & Competitive Inhibition Kinetics Plot",
            page: 4,
            bboxLabel: "Page 4 // BBox [312, 490, 558, 642]",
            beforeAlt: "MISSING (/Alt attribute absent on unenclosed vector path stream)",
            afterAlt: "Michaelis-Menten hyperbolic plot showing initial reaction velocity V0 (micromoles/min) versus substrate concentration [S] (millimolar), with Vmax at 120 micromoles/min and Km shifting from 2.4 mM to 5.8 mM under competitive inhibition."
          }
        ],
        checkpoints: makeStandardCheckpoints({
          "01-006": { evidenceBefore: "28 running headers/footers and 14 decorative dividers unmarked; /MarkInfo is false." },
          "13-004": { evidenceBefore: "6 laboratory diagrams (including Figure 1.2 enzyme kinetics curve) lack <Figure> tags and /Alt text." },
          "15-002": { evidenceBefore: "4 grading rubric and chemical hazard tables encoded as untagged text lines with zero <TH> or /Scope." }
        })
      },
      {
        id: "ECOM-02",
        tier: "FREE",
        code: "ECOM-02",
        title: "EU Consumer Electronics User Manual & GPSR Safety Dossier",
        sector: "EU E-Commerce & Consumer Hardware",
        pages: 42,
        regulation: "EU Directive 2019/882 (EAA) & EN 301 549",
        fileName: "AeroPulse_Pro_3000_EU_Multilingual_Safety_Manual_GPSR.pdf",
        fileSizeKB: 6840,
        pdfVersion: "%PDF-1.7",
        initialScore: 38,
        remediatedScore: 100,
        riskLevel: "Sample document — source findings",
        remediatedStatus: "Tag-tree draft prepared (manual verification required)",
        summary: "Multilingual EU hardware manual missing /Lang switching for EN/DE/FR warnings, safety pictogram /Alt text, and RF specification table headers.",
        metadata: {
          before: {
            pdfuaid: "MISSING (Fails EN 301 549 Clause 10.2 metadata check)",
            markInfo: "<< /Marked false >>",
            lang: "MISSING (EN/DE/FR paragraphs unlabelled)",
            displayDocTitle: "false",
            structTreeRoot: "Partial / corrupt (18 orphaned <Div> nodes)",
            tabOrder: "/R",
            contrastRatio: "2.6:1 FAIL (Sample gray footnotes; verify manually)"
          },
          after: {
            pdfuaid: "Draft XMP: pdfuaid:part=1 template",
            markInfo: "Draft: << /Marked true /Suspects false >>",
            lang: "Draft: Root (en-GB) + /Span (de-DE) & (fr-FR)",
            displayDocTitle: "Draft: true",
            structTreeRoot: "Draft: 628 semantic nodes (manual check required)",
            tabOrder: "Draft: /S across 42 pages",
            contrastRatio: "Manual measurement required (target >= 4.5:1)"
          }
        },
        visualRegions: [
          { id: "ECOM-02-REG-1", checkpointId: "11-001", tagType: "Span", page: 2, label: "Multilingual EU Declaration of Conformity (EN / DE / FR)", previewText: "EN: EU Declaration of Conformity // DE: EU-Konformitaetserklaerung // FR: Declaration UE", issueSummary: "Parallel EN/DE/FR declarations lack /Lang attributes.", beforeTag: "<P>Untagged EN/DE/FR text</P>", afterTag: "<P Lang=\"en-GB\">...</P><P Lang=\"de-DE\">...</P><P Lang=\"fr-FR\">...</P>" },
          { id: "ECOM-02-REG-2", checkpointId: "13-004", tagType: "Figure", page: 5, label: "CE, WEEE & Class II Safety Pictograms", previewText: "[Vector Safety Pictograms: CE Mark, WEEE Crossed-Out Wheeled Bin, Class II]", issueSummary: "Regulatory pictograms drawn as raw vector outlines with no /Alt.", beforeTag: "Raw Vector Paths (/Alt: NULL)", afterTag: "<Figure /Alt (CE mark, WEEE separate electronic waste collection bin, Class II double insulation.)>" }
        ],
        structTreeBefore: "%PDF-1.7\n1 0 obj << /Type /Catalog /Pages 2 0 R /MarkInfo << /Marked false >> >> endobj",
        structTreeAfter: "%PDF-1.7\n1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-GB) /MarkInfo << /Marked true /Suspects false >> /ViewerPreferences << /DisplayDocTitle true >> /Metadata 12 0 R /StructTreeRoot 25 0 R >> endobj",
        tables: [
          {
            id: "ECOM-02-TBL-1",
            title: "Table 4.2: Radio Equipment Directive (2014/53/EU) RF & EIRP Specifications",
            page: 18,
            summaryIssue: "Draft semantic <Table> with explicit <TH Scope> bindings.",
            headers: ["Wireless Transceiver Module", "Operating Frequency Band", "Max Conducted EIRP", "Harmonized EN Standard"],
            rows: [
              ["Wi-Fi 6E Tri-Band MIMO (IEEE 802.11ax)", "2400–2483.5 MHz", "< 20.0 dBm", "EN 300 328 v2.2.2"],
              ["Bluetooth Low Energy 5.4", "2402–2480 MHz", "< 10.0 dBm", "EN 300 328 v2.2.2"]
            ],
            beforeMarkup: "<P>Wi-Fi 6E 2400-2483.5 MHz < 20.0 dBm</P>",
            afterMarkup: "<Table><THead><TR><TH Scope=\"Column\">Wireless Transceiver Module</TH></TR></THead></Table>"
          }
        ],
        figures: [
          { id: "ECOM-02-FIG-1", title: "Figure 1.1: EU Regulatory Markings (CE, WEEE & Class II)", page: 5, bboxLabel: "Page 5", beforeAlt: "MISSING", afterAlt: "CE Conformity mark, WEEE Directive 2012/19/EU crossed-out wheeled bin, and IEC Class II double-insulated symbol." }
        ],
        checkpoints: makeStandardCheckpoints({
          "11-001": { evidenceBefore: "English, German, and French safety warnings share untagged paragraphs with zero BCP-47 language codes." }
        })
      },
      {
        id: "FIN-03",
        tier: "PRO",
        code: "FIN-03",
        title: "Annual Retail Banking Fee Schedule & TILA Disclosure",
        sector: "Retail Banking & FinTech",
        pages: 64,
        regulation: "EAA & ADA Title III Financial Mandate",
        fileName: "Vanguard_Retail_Banking_TILA_Schumer_Box_Fee_Schedule_2026.pdf",
        fileSizeKB: 5190,
        pdfVersion: "%PDF-1.7",
        initialScore: 29,
        remediatedScore: 100,
        riskLevel: "Sample document — source findings",
        remediatedStatus: "Tag-tree draft prepared (manual verification required)",
        summary: "64-page TILA Schumer Box fee schedule with ColSpan/RowSpan merged table headers missing /Headers ID arrays and diagonal watermarks tagged as body paragraphs.",
        metadata: {
          before: { pdfuaid: "MISSING", markInfo: "<< /Marked true /Suspects true >>", lang: "MISSING", displayDocTitle: "false", structTreeRoot: "Merged ColSpan cells lack /Headers arrays", tabOrder: "/R", contrastRatio: "2.9:1 FAIL (Sample fine print)" },
          after: { pdfuaid: "Draft: pdfuaid:part=1", markInfo: "Draft: << /Marked true /Suspects false >>", lang: "Draft: (en-US)", displayDocTitle: "Draft: true", structTreeRoot: "Draft: /Headers ID arrays prepared", tabOrder: "Draft: /S", contrastRatio: "Manual check required" }
        },
        visualRegions: [
          { id: "FIN-03-REG-1", checkpointId: "15-002", tagType: "Table", page: 3, label: "TILA Regulation Z Schumer Box (ColSpan / RowSpan Matrix)", previewText: "Interest Rates & Interest Charges | APR for Purchases: 18.24% to 26.99% Variable", issueSummary: "Merged headers lack unique /ID and /Headers arrays.", beforeTag: "<TD ColSpan=3> without /Headers", afterTag: "<TD Headers=[\"th_rates_grp\" \"th_purch_apr\"]>18.24%</TD>" }
        ],
        structTreeBefore: "%PDF-1.7\n30 0 obj << /Type /StructElem /S /Table /K [] >> endobj",
        structTreeAfter: "%PDF-1.7\n30 0 obj << /Type /StructElem /S /Table /Summary (TILA Schumer Box) >> endobj",
        tables: [
          { id: "FIN-03-TBL-1", title: "Table 1.1: TILA Schumer Box APR & Fee Schedule", page: 3, summaryIssue: "Spanned headers mapped to /ID and /Headers arrays.", headers: ["Metric", "Core Tier", "Preferred Tier", "Private Tier"], rows: [["Purchase APR", "24.99%", "20.24%", "18.24%"]], beforeMarkup: "<TD>24.99%</TD>", afterMarkup: "<TD Headers=\"th_cat th_t1\">24.99%</TD>" }
        ],
        figures: [
          { id: "FIN-03-FIG-1", title: "Figure 3.1: Amortization Bar Chart", page: 19, bboxLabel: "Page 19", beforeAlt: "MISSING", afterAlt: "Bar chart comparing minimum monthly payments versus fixed $185 monthly installment on a $5,000 balance at 24.99% APR." }
        ],
        checkpoints: makeStandardCheckpoints()
      },
      {
        id: "MED-04",
        tier: "PRO",
        code: "MED-04",
        title: "Patient Intake, Informed Consent & Clinical Discharge Packet",
        sector: "Healthcare & Clinical Intake",
        pages: 18,
        regulation: "HHS Section 504 & WCAG 2.2 AA",
        fileName: "StJude_Clinical_Intake_Informed_Consent_AcroForm_Packet.pdf",
        fileSizeKB: 2940,
        pdfVersion: "%PDF-1.7",
        initialScore: 41,
        remediatedScore: 100,
        riskLevel: "Sample document — source findings",
        remediatedStatus: "Tag-tree draft prepared (manual verification required)",
        summary: "18-page interactive clinical intake packet with 34 AcroForm widgets lacking /TU tooltips and <Form> OBJR bindings.",
        metadata: {
          before: { pdfuaid: "MISSING", markInfo: "<< /Marked false >>", lang: "MISSING", displayDocTitle: "false", structTreeRoot: "NULL (34 unbound widgets)", tabOrder: "/C", contrastRatio: "3.0:1 FAIL (Sample teal headers)" },
          after: { pdfuaid: "Draft: pdfuaid:part=1", markInfo: "Draft: << /Marked true /Suspects false >>", lang: "Draft: (en-US) + (es-US)", displayDocTitle: "Draft: true", structTreeRoot: "Draft: 34 <Form><OBJR> bindings", tabOrder: "Draft: /S", contrastRatio: "Manual check required" }
        },
        visualRegions: [
          { id: "MED-04-REG-1", checkpointId: "28-001", tagType: "Form", page: 2, label: "Patient Demographics & Allergy AcroForm Matrix", previewText: "Patient Legal Name [____] | Known Drug Allergies: ( ) Yes ( ) No", issueSummary: "34 widgets have null /TU tooltip attributes.", beforeTag: "/Widget /T (fld_allergy_rad_01) /TU null", afterTag: "<Form><OBJR /TU (Select Yes if patient has severe drug allergy history) /></Form>" }
        ],
        structTreeBefore: "%PDF-1.7\n1 0 obj << /Type /Catalog /AcroForm << /Fields [40 0 R] >> >> endobj",
        structTreeAfter: "%PDF-1.7\n40 0 obj << /Type /Annot /Subtype /Widget /TU (Enter Patient Date of Birth MM/DD/YYYY) >> endobj",
        tables: [
          { id: "MED-04-TBL-1", title: "Table 4.1: Post-Op Dosing Schedule", page: 14, summaryIssue: "Medication table tagged with row and column <TH Scope>.", headers: ["Medication", "Interval", "24h Max", "Contraindication"], rows: [["Acetaminophen 500 mg", "Every 6 hours", "3,000 mg", "Avoid concurrent acetaminophen"]], beforeMarkup: "<P>Acetaminophen 500 mg</P>", afterMarkup: "<TH Scope=\"Row\">Acetaminophen 500 mg</TH>" }
        ],
        figures: [
          { id: "MED-04-FIG-1", title: "Figure 2.1: 0–10 Numeric Pain Assessment Scale", page: 6, bboxLabel: "Page 6", beforeAlt: "MISSING", afterAlt: "Numeric 0 to 10 Clinical Pain Scale: 0 No Pain, 1-3 Mild, 4-6 Moderate, 7-9 Severe, 10 Worst Possible." }
        ],
        checkpoints: makeStandardCheckpoints()
      },
      {
        id: "EDTECH-05",
        tier: "PRO",
        code: "EDTECH-05",
        title: "K-12 & Professional Certification Digital Textbook Chapter",
        sector: "K-12 & Certification Publishing",
        pages: 96,
        regulation: "WCAG 2.2 AA & QTI/SCORM 1.2",
        fileName: "AP_Physics_Electromagnetism_Chapter08_Courseware_Master.pdf",
        fileSizeKB: 14620,
        pdfVersion: "%PDF-2.0",
        initialScore: 31,
        remediatedScore: 100,
        riskLevel: "Sample document — source findings",
        remediatedStatus: "Tag-tree draft prepared (manual verification required)",
        summary: "96-page STEM digital textbook chapter containing 48 equations missing <Formula>/ActualText, 14 circuit diagrams missing /Alt, and margin sidebars interleaved with body derivations.",
        metadata: {
          before: { pdfuaid: "MISSING", markInfo: "<< /Marked true /Suspects true >>", lang: "MISSING", displayDocTitle: "false", structTreeRoot: "48 untagged math formulas", tabOrder: "/R", contrastRatio: "2.7:1 FAIL (Sample callouts)" },
          after: { pdfuaid: "Draft: pdfuaid:part=1", markInfo: "Draft: << /Marked true /Suspects false >>", lang: "Draft: (en-US)", displayDocTitle: "Draft: true", structTreeRoot: "Draft: <Formula> & <Aside> nodes (manual math QA required)", tabOrder: "Draft: /S", contrastRatio: "Manual check required" }
        },
        visualRegions: [
          { id: "EDTECH-05-REG-1", checkpointId: "13-004", tagType: "Formula", page: 4, label: "Equation 8.4: Faraday-Lenz Law (<Formula>)", previewText: "emf = - N * (d Phi_B / dt)", issueSummary: "48 mathematical formulas lack <Formula> and /ActualText spoken math.", beforeTag: "Fragmented Symbol Font Glyphs (/ActualText: NULL)", afterTag: "<Formula /Alt (Faraday-Lenz Law: induced emf equals negative N times d Phi_B over dt)>" }
        ],
        structTreeBefore: "%PDF-2.0\n14 0 obj << /Length 980 >> stream BT /F_Sym 14 Tf (<0025>) Tj ET endstream endobj",
        structTreeAfter: "%PDF-2.0\n20 0 obj << /Type /StructTreeRoot /K [ << /S /Formula /ActualText (epsilon = -N * d(Phi_B)/dt) >> ] >> endobj",
        tables: [
          { id: "EDTECH-05-TBL-1", title: "Table 8.3: Maxwell's Four Equations (SI Units)", page: 42, summaryIssue: "Physics summary table tagged with <TH Scope> and formula annotations.", headers: ["Law", "Integral Form", "Differential Form", "Interpretation"], rows: [["Faraday's Law", "Integral(E.ds) = -dPhi_B/dt", "curl(E) = -dB/dt", "Changing magnetic flux induces electric field"]], beforeMarkup: "<P>Faraday's Law</P>", afterMarkup: "<TH Scope=\"Row\">Faraday's Law</TH>" }
        ],
        figures: [
          { id: "EDTECH-05-FIG-1", title: "Figure 8.7: Motional EMF Conducting Rail Diagram", page: 11, bboxLabel: "Page 11", beforeAlt: "MISSING", afterAlt: "Conducting rod of length L sliding rightwards at velocity v across parallel rails in a uniform into-page magnetic field B." }
        ],
        checkpoints: makeStandardCheckpoints()
      },
      {
        id: "GOV-06",
        tier: "PRO",
        code: "GOV-06",
        title: "Municipal Infrastructure RFP & Procurement Specification",
        sector: "Public Sector & Municipal Procurement",
        pages: 112,
        regulation: "EN 301 549 & Section 508 ICT",
        fileName: "RFP-2026-089_Metropolitan_Transit_Grid_Modernization_Spec.pdf",
        fileSizeKB: 18450,
        pdfVersion: "%PDF-1.7",
        initialScore: 26,
        remediatedScore: 100,
        riskLevel: "Sample document — source findings",
        remediatedStatus: "Tag-tree draft prepared (manual verification required)",
        summary: "112-page municipal RFP mixing margin line numbers into paragraphs, lacking /Outlines bookmarks, and containing CAD plates without /Alt descriptions.",
        metadata: {
          before: { pdfuaid: "MISSING", markInfo: "<< /Marked false >>", lang: "MISSING", displayDocTitle: "false", structTreeRoot: "NULL (112 untagged pages)", tabOrder: "/R", contrastRatio: "2.5:1 FAIL (Sample CAD notes)" },
          after: { pdfuaid: "Draft: pdfuaid:part=1", markInfo: "Draft: << /Marked true /Suspects false >>", lang: "Draft: (en-US)", displayDocTitle: "Draft: true", structTreeRoot: "Draft: /StructTreeRoot + /Outlines", tabOrder: "Draft: /S", contrastRatio: "Manual check required" }
        },
        visualRegions: [
          { id: "GOV-06-REG-1", checkpointId: "01-006", tagType: "Artifact", page: 1, label: "Bates Stamp Header & Left-Margin Legal Line Numbers (1–28)", previewText: "BATES-RFP-2026-0001 // Margin Line Numbers Spliced Into Sentences", issueSummary: "Margin line numbers read aloud mid-sentence.", beforeTag: "Inline Text: '...shall furnish 15 all switchgear...'", afterTag: "/Artifact << /Type /Pagination >> BDC (Line Numbers) EMC" }
        ],
        structTreeBefore: "%PDF-1.7\n1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
        structTreeAfter: "%PDF-1.7\n1 0 obj << /Type /Catalog /Pages 2 0 R /Lang (en-US) /PageMode /UseOutlines /Outlines 15 0 R /StructTreeRoot 20 0 R >> endobj",
        tables: [
          { id: "GOV-06-TBL-1", title: "Schedule B-2: Bill of Quantities (BoQ)", page: 68, summaryIssue: "Procurement pricing table tagged with <TH Scope>.", headers: ["CSI Code", "Description", "Quantity", "Estimate"], rows: [["26 12 19.13", "4.5 MVA Rectifier Transformer", "4 EA", "$1,840,000.00"]], beforeMarkup: "<P>26 12 19.13</P>", afterMarkup: "<TH Scope=\"Row\">26 12 19.13</TH>" }
        ],
        figures: [
          { id: "GOV-06-FIG-1", title: "Plate E-104: 25 kV AC / 1500V DC Traction Substation Single-Line Schematic", page: 24, bboxLabel: "Page 24", beforeAlt: "MISSING", afterAlt: "Single-line diagram showing dual 25 kV AC utility feeders through vacuum circuit breakers into a 4.5 MVA 12-pulse rectifier transformer outputting 1500V DC." }
        ],
        checkpoints: makeStandardCheckpoints()
      }
    ]
  };

  if (typeof window !== "undefined") window.DOCUSHIELD_DATA = DOCUSHIELD_DATA;
  if (typeof root !== "undefined") root.DOCUSHIELD_DATA = DOCUSHIELD_DATA;
  if (typeof module !== "undefined" && module.exports) module.exports = DOCUSHIELD_DATA;
})(typeof globalThis !== "undefined" ? globalThis : this);
