/**
 * DocuShield™ — ISO 14289-1 (PDF/UA-1), Matterhorn Protocol 1.1, WCAG 2.2 AA & EAA Remediation Studio
 * Deterministic AST Tagging, Matterhorn 31-Checkpoint Rule-Gate Verifier & VPAT 2.5 INT Generator
 * Version: 2026.11-ISO14289
 */

(function (root) {
  "use strict";

  const DOCUSHIELD_DATA = {
    meta: {
      productName: "DocuShield™ PDF/UA & EAA Remediation Studio",
      version: "2026.11-ISO14289",
      standards: [
        "ISO 14289-1 (PDF/UA-1)",
        "Matterhorn Protocol 1.1 (31 Checkpoints)",
        "WCAG 2.2 Level AA",
        "EU Directive 2019/882 (European Accessibility Act — EAA)",
        "U.S. Section 508 & ADA Title II / Title III",
        "VPAT 2.5 INT (EN 301 549)"
      ],
      freePacketIds: ["EDTECH-01", "ECOM-02"],
      validLicenseKeyDigests: [
        "5c05bd2d1eefa08f19b1e300aee51240b6cd33480b25f34e7011693e7bbc2e67",
        "5024e6a49ca7dcaba7f95addc2165f6439777dc972830f609cabbf97b8082eb2"
      ]
    },

    packets: [
      // =======================================================================
      // PACKET 1 (FREE): EDTECH-01 — UNIVERSITY STEM & CLINICAL COURSE SYLLABUS
      // =======================================================================
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
        riskLevel: "NON-COMPLIANT — HIGH ADA TITLE II & SECTION 508 AUDIT RISK",
        remediatedStatus: "100% ISO 14289-1 (PDF/UA-1) & WCAG 2.2 AA VERIFIED",
        summary: "Exported from desktop publishing software as an untagged two-column PDF lacking a /StructTreeRoot dictionary, /Lang (en-US) catalog declaration, and XMP pdfuaid:part=1 metadata stream. Contains 4 clinical grading rubric and reagent hazard tables missing <TH> /Scope attributes, 6 enzyme kinetics and spectrophotometry apparatus diagrams missing <Figure> /Alt descriptions, skipped heading levels (<H1> jumping directly to <H4>), and safety callout boxes failing WCAG 2.2 AA contrast at 2.8:1.",
        metadata: {
          before: {
            pdfuaid: "MISSING (No pdfuaid:part or pdfuaid:amd in XMP /Metadata)",
            markInfo: "<< /Marked false >> (Untagged content stream)",
            lang: "MISSING (No /Lang key on /Catalog dictionary)",
            displayDocTitle: "false (/ViewerPreferences displays raw filename)",
            structTreeRoot: "NULL (0 tagged structure elements across 28 pages)",
            tabOrder: "/R (Row order — breaks two-column reading sequence)",
            contrastRatio: "2.8:1 FAIL (Amber warning text #B8860B on #F8F5EE callout)"
          },
          after: {
            pdfuaid: "pdfuaid:part=1 (ISO 14289-1:2014 XMP packet verified)",
            markInfo: "<< /Marked true /Suspects false >>",
            lang: "(en-US) declared on /Catalog + /Span << /Lang (la) >> for binomials",
            displayDocTitle: "true (dc:title = 'CHEM-304 Clinical Biochemistry Lab Manual')",
            structTreeRoot: "412 semantic nodes (<Document>, <Part>, <Sect>, <H1>-<H3>, <Table>, <Figure>)",
            tabOrder: "/S (Structure order enforced across all 28 page dictionaries)",
            contrastRatio: "7.4:1 PASS (Remediated to #5C2804 on #F6F4EF — WCAG 2.2 AA/AAA)"
          }
        },
        visualRegions: [
          {
            id: "EDTECH-01-REG-1",
            checkpointId: "14-003",
            tagType: "H1",
            page: 1,
            bbox: { top: 6, left: 6, width: 88, height: 14 },
            label: "Course Banner & Skipped Heading Hierarchy",
            previewText: "CHEM-304: Clinical Biochemistry & Spectrophotometric Assay Laboratory — Fall 2026 Syllabus",
            issueSummary: "Visual title rendered as 22pt bold raw text operator (BT /F1 22 Tf) followed immediately by an <H4> sub-banner, violating ISO 14289-1 Clause 7.4.2 strict sequential heading nesting.",
            beforeTag: "Untagged BT /F1 22 Tf -> <H4> (Skipped <H1>, <H2>, <H3>)",
            afterTag: "<H1 id=\"sec-title\"> -> <H2 id=\"sec-overview\"> (Sequential Nesting)"
          },
          {
            id: "EDTECH-01-REG-2",
            checkpointId: "09-003",
            tagType: "Sect",
            page: 1,
            bbox: { top: 23, left: 6, width: 42, height: 26 },
            label: "Two-Column Prerequisite & Biosafety Callout",
            previewText: "Section 1.1: Biosafety Level 2 (BSL-2) PPE Mandate & Prerequisite Verification...",
            issueSummary: "Two-column layout lacks a logical structure tree reading order; screen readers read horizontally across Column 1 and Column 2 lines simultaneously.",
            beforeTag: "Content Stream Order (Interleaved Col 1 / Col 2 lines; /Tabs /R)",
            afterTag: "<Sect><H2><P>Col 1 Flow</P><P>Col 2 Flow</P></Sect> (/Tabs /S)"
          },
          {
            id: "EDTECH-01-REG-3",
            checkpointId: "13-004",
            tagType: "Figure",
            page: 4,
            bbox: { top: 23, left: 52, width: 42, height: 26 },
            label: "Figure 1.2: Michaelis-Menten Enzyme Kinetics Curve",
            previewText: "[Vector Path Diagram: Reaction velocity V0 vs. Substrate concentration [S] showing Vmax and Km asymptotes]",
            issueSummary: "642 raw PostScript vector bezier paths rendered inline without a <Figure> structure enclosure or /Alt attribute, causing assistive technologies to skip the diagram or read raw coordinate noise.",
            beforeTag: "Untagged Vector Path Stream (No <Figure>, /Alt: NULL)",
            afterTag: "<Figure BBox=[312 490 558 642] /Alt (Michaelis-Menten hyperbolic plot showing initial velocity V0 versus substrate concentration [S], with Km marked at 0.5 Vmax and asymptotic Vmax plateau at 120 micromoles/min.)>"
          },
          {
            id: "EDTECH-01-REG-4",
            checkpointId: "15-002",
            tagType: "Table",
            page: 7,
            bbox: { top: 53, left: 6, width: 88, height: 24 },
            label: "Table 2.1: Clinical Lab Grading Rubric & Competency Weights",
            previewText: "Assessment Component | Lab Practicum Hours | Minimum Passing Threshold | Final Grade Weight (%)",
            issueSummary: "Grid lines drawn with raw path operators (re S) and data cells tagged as flat <P> paragraphs without <Table>, <TR>, <TH /Scope /Column>, or <TD> associations.",
            beforeTag: "Flat <P> Paragraphs + Raw Vector Grid Lines (No <Table> or <TH>)",
            afterTag: "<Table><THead><TR><TH Scope=\"Column\">...</TH></TR></THead><TBody>...</TBody></Table>"
          },
          {
            id: "EDTECH-01-REG-5",
            checkpointId: "28-001",
            tagType: "Annot",
            page: 12,
            bbox: { top: 80, left: 6, width: 88, height: 14 },
            label: "BSL-2 Emergency Spill Protocol & Student Attestation Form",
            previewText: "WARNING: Phenol-Chloroform Extraction Hazard — Student Digital Acknowledgment Signature Field",
            issueSummary: "Amber hazard warning fails WCAG 2.2 SC 1.4.3 minimum contrast (2.8:1), and interactive AcroForm signature/ID fields lack /TU accessible tooltip descriptions and <Form> OBJR bindings.",
            beforeTag: "Contrast 2.8:1 FAIL + Unbound /Widget << /FT /Tx /TU null >>",
            afterTag: "Contrast 7.4:1 PASS + <Form><OBJR /TU (Enter 8-Digit Student University ID Number) /></Form>"
          }
        ],
        structTreeBefore: `%PDF-1.7
% [BEFORE REMEDIATION — RAW UNTAGGED COS DICTIONARY & BROKEN CONTENT STREAM]
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  % ERROR [Matterhorn 11-001]: Missing /Lang (en-US) natural language declaration
  % ERROR [Matterhorn 01-006]: Missing /MarkInfo << /Marked true >>
  % ERROR [Matterhorn 01-006]: Missing /StructTreeRoot semantic tag hierarchy
  % ERROR [Matterhorn 06-001]: Missing /Metadata XMP stream with pdfuaid:part=1
  /ViewerPreferences << /DisplayDocTitle false >>
>>
endobj

4 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  % ERROR [Matterhorn 09-003]: Missing /Tabs /S (keyboard focus follows raw /R row geometry)
  /Contents 5 0 R
>>
endobj

5 0 obj
<< /Length 1420 >>
stream
  % Unmarked running header mixed into primary reading stream (Not marked as /Artifact)
  BT /F1 9 Tf 36 756 Td (CHEM-304 Fall 2026 Syllabus - Page 1 of 28) Tj ET
  % Visual H1 title emitted as raw font size change with no <H1> structure tag
  BT /F2 22 Tf 36 710 Td (CHEM-304: Clinical Biochemistry & Assay Lab) Tj ET
  % Skipped heading level: jumps directly to H4 styling
  /H4 << /MCID 0 >> BDC
    BT /F2 12 Tf 36 680 Td (Biosafety Level 2 Mandate & Grading Rubric) Tj ET
  EMC
  % Unenclosed vector paths for Figure 1.2 (Enzyme Kinetics Plot) — 0 /Alt attributes
  312 490 m 345 580 420 635 558 640 c S
endstream
endobj`,
        structTreeAfter: `%PDF-1.7
% [AFTER REMEDIATION — ISO 14289-1 (PDF/UA-1) & WCAG 2.2 AA VERIFIED AST]
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  /Lang (en-US)
  /MarkInfo << /Marked true /Suspects false >>
  /ViewerPreferences << /DisplayDocTitle true >>
  /Metadata 10 0 R
  /StructTreeRoot 20 0 R
>>
endobj

10 0 obj
<< /Type /Metadata /Subtype /XML /Length 842 >>
stream
<?xpacket begin="" id="W5M0MpWins"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/"
      xmlns:dc="http://purl.org/dc/elements/1.1/">
      <pdfuaid:part>1</pdfuaid:part>
      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">CHEM-304: Clinical Biochemistry &amp; Spectrophotometric Assay Laboratory — Fall 2026 Syllabus</rdf:li></rdf:Alt></dc:title>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
endstream
endobj

20 0 obj
<<
  /Type /StructTreeRoot
  /RoleMap << /TitleBanner /H1 /CalloutBox /Sect >>
  /K [
    <<
      /Type /StructElem
      /S /Document
      /Lang (en-US)
      /K [
        << /Type /StructElem /S /H1 /T (Course Title) /K [0] >>
        << /Type /StructElem /S /H2 /T (Section 1.1 Biosafety Level 2 Mandate) /K [1] >>
        <<
          /Type /StructElem
          /S /Figure
          /Alt (Michaelis-Menten hyperbolic plot showing initial velocity V0 versus substrate concentration [S], with Km marked at 0.5 Vmax and asymptotic Vmax plateau at 120 micromoles/min.)
          /A << /O /Layout /BBox [312 490 558 642] /Placement /Block >>
          /K [2]
        >>
        <<
          /Type /StructElem
          /S /Table
          /Summary (Grading rubric detailing practicum hours, minimum competency thresholds, and final percentage weights across four assessment modules.)
          /K [ 30 0 R 31 0 R ]
        >>
      ]
    >>
  ]
>>
endobj`,
        tables: [
          {
            id: "EDTECH-01-TBL-1",
            title: "Table 2.1: Clinical Lab Grading Rubric & Competency Weights",
            page: 7,
            summaryIssue: "Untagged visual table grid converted to semantic <Table> with <THead>/<TBody> and explicit <TH Scope=\"Column\"> and <TH Scope=\"Row\"> attributes (Matterhorn 15-002).",
            headers: [
              "Assessment Module",
              "Practicum Hours",
              "Minimum Competency Gate",
              "Final Grade Weight"
            ],
            rows: [
              ["Spectrophotometric UV-Vis Calibration & Beer-Lambert Assay", "12 hrs", "R-squared >= 0.995 Curve Fit", "25%"],
              ["Michaelis-Menten Enzyme Kinetics & Inhibitor Titration", "16 hrs", "Km / Vmax Error <= 4.0%", "30%"],
              ["SDS-PAGE Protein Electrophoresis & Western Blot Analysis", "14 hrs", "Zero Cross-Well Contamination", "25%"],
              ["BSL-2 Clinical Safety Audit & Electronic Lab Notebook", "10 hrs", "100% GHS / OSHA Compliance", "20%"]
            ],
            beforeMarkup: `<P>Assessment Module Practicum Hours Minimum Competency Gate Final Grade Weight</P>
<P>Spectrophotometric UV-Vis Calibration & Beer-Lambert Assay 12 hrs R-squared >= 0.995 Curve Fit 25%</P>
<P>Michaelis-Menten Enzyme Kinetics & Inhibitor Titration 16 hrs Km / Vmax Error <= 4.0% 30%</P>`,
            afterMarkup: `<Table Summary="Clinical biochemistry grading rubric mapping 4 laboratory modules to practicum hours, minimum competency gates, and final grade weights.">
  <THead>
    <TR>
      <TH Scope="Column" ID="th_mod">Assessment Module</TH>
      <TH Scope="Column" ID="th_hrs">Practicum Hours</TH>
      <TH Scope="Column" ID="th_gate">Minimum Competency Gate</TH>
      <TH Scope="Column" ID="th_wt">Final Grade Weight</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TH Scope="Row" ID="th_r1" Headers="th_mod">Spectrophotometric UV-Vis Calibration &amp; Beer-Lambert Assay</TH>
      <TD Headers="th_r1 th_hrs">12 hrs</TD>
      <TD Headers="th_r1 th_gate">R-squared &gt;= 0.995 Curve Fit</TD>
      <TD Headers="th_r1 th_wt">25%</TD>
    </TR>
  </TBody>
</Table>`
          },
          {
            id: "EDTECH-01-TBL-2",
            title: "Table 3.4: Clinical Titration Reagent GHS Hazard & PPE Schedule",
            page: 11,
            summaryIssue: "Multi-column chemical safety schedule remediated with row and column header bindings so screen readers announce the reagent name before every PPE and disposal cell.",
            headers: [
              "Chemical Reagent",
              "CAS Registry No.",
              "GHS Signal & Hazard Class",
              "Mandatory Containment & PPE"
            ],
            rows: [
              ["Phenol-Chloroform-Isoamyl Alcohol (25:24:1)", "108-95-2 / 67-66-3", "DANGER — Acute Toxicity & Skin Corrosion (Cat 1B)", "Certified Fume Hood + Nitrile Double-Glove + Face Shield"],
              ["Acrylamide / Bis-Acrylamide 30% Stock Solution", "79-06-1", "DANGER — Neurotoxin & Germ Cell Mutagen (Cat 1B)", "Weigh in Negative-Pressure Hood + Pre-Polymerized Gel Handling"],
              ["Ethidium Bromide Intercalating Stain (10 mg/mL)", "1239-45-8", "WARNING — Suspected Mutagen & UV Transilluminator Risk", "Dedicated Staining Bench + Activated Charcoal Filtrate Disposal"]
            ],
            beforeMarkup: `<P>Chemical Reagent CAS Registry No. GHS Signal & Hazard Class Mandatory Containment & PPE</P>
<P>Phenol-Chloroform-Isoamyl Alcohol (25:24:1) 108-95-2 / 67-66-3 DANGER Fume Hood</P>`,
            afterMarkup: `<Table Summary="GHS hazard classification, CAS numbers, and mandatory PPE containment protocols for 3 clinical laboratory reagents.">
  <THead>
    <TR>
      <TH Scope="Column" ID="th_chem">Chemical Reagent</TH>
      <TH Scope="Column" ID="th_cas">CAS Registry No.</TH>
      <TH Scope="Column" ID="th_ghs">GHS Signal &amp; Hazard Class</TH>
      <TH Scope="Column" ID="th_ppe">Mandatory Containment &amp; PPE</TH>
    </TR>
  </THead>
</Table>`
          }
        ],
        figures: [
          {
            id: "EDTECH-01-FIG-1",
            title: "Figure 1.2: Michaelis-Menten & Competitive Inhibition Kinetics Plot",
            page: 4,
            bboxLabel: "Page 4 // BBox [312, 490, 558, 642]",
            beforeAlt: "MISSING (/Alt attribute absent on unenclosed vector path stream)",
            afterAlt: "Michaelis-Menten hyperbolic plot showing initial reaction velocity V0 (micromoles/min) on the vertical axis versus substrate concentration [S] (millimolar) on the horizontal axis. The uninhibited curve reaches Vmax at 120 micromoles/min with Km = 2.4 mM, while the competitive inhibitor curve shifts apparent Km to 5.8 mM without altering Vmax."
          },
          {
            id: "EDTECH-01-FIG-2",
            title: "Figure 2.4: Double-Beam UV-Vis Spectrophotometer Optical Path",
            page: 8,
            bboxLabel: "Page 8 // BBox [48, 310, 564, 485]",
            beforeAlt: "image_02_spectrophotometer_final_v3.eps (Raw filename exposed as /Alt)",
            afterAlt: "Schematic block diagram of a double-beam UV-Vis spectrophotometer: deuterium and tungsten lamps feed a diffraction grating monochromator, passing through a rotating beam splitter into a matched 1 cm quartz reference cuvette and sample cuvette before reaching dual silicon photodiode detectors."
          },
          {
            id: "EDTECH-01-FIG-3",
            title: "Figure 4.1: Vertical SDS-PAGE Gel Electrophoresis Chamber Assembly",
            page: 16,
            bboxLabel: "Page 16 // BBox [64, 215, 540, 410]",
            beforeAlt: "MISSING (Raster image XObject /Im3 untagged)",
            afterAlt: "Cross-sectional diagram of a vertical polyacrylamide gel electrophoresis (SDS-PAGE) apparatus showing negatively charged SDS-denatured proteins migrating downward from the top cathode buffer chamber (pH 6.8 stacking gel) through the pH 8.8 resolving gel toward the bottom anode chamber."
          }
        ],
        checkpoints: [
          {
            id: "01-006",
            clause: "ISO 14289-1 Clause 7.1",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Artifact vs. Real Content Tagging",
            title: "All real content tagged in /StructTreeRoot; running headers & decorative rules marked as /Artifact",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "28 running headers/footers and 14 decorative divider lines emitted inside unmarked content streams; /MarkInfo is false.",
            evidenceAfter: "All 412 real content objects enclosed in semantic structure elements; 56 pagination headers/footers wrapped in /Artifact << /Type /Pagination /Subtype /Header >> BDC."
          },
          {
            id: "06-001",
            clause: "ISO 14289-1 Clause 5 & 7.1",
            wcag: "EN 301 549 Clause 10.2",
            category: "XMP Metadata Stream",
            title: "Document XMP metadata stream contains pdfuaid:part=1 and dc:title with /DisplayDocTitle true",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "No XMP /Metadata stream attached to Catalog; /ViewerPreferences displays raw filename CHEM-304_Biochemistry_Clinical_Lab_Syllabus_Fall2026.pdf.",
            evidenceAfter: "XMP packet injected at Object 10 0 R declaring xmlns:pdfuaid='http://www.aiim.org/pdfua/ns/id/' with <pdfuaid:part>1</pdfuaid:part> and /DisplayDocTitle true."
          },
          {
            id: "09-003",
            clause: "ISO 14289-1 Clause 7.2 & 7.18.3",
            wcag: "WCAG 2.2 SC 1.3.2 & 2.4.3",
            category: "Logical Reading & Tab Order",
            title: "Structure tree reading order matches logical multi-column flow; every Page dictionary specifies /Tabs /S",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "Pages 1–6 interleave left and right column lines horizontally; all 28 page dictionaries default to /Tabs /R (row geometry).",
            evidenceAfter: "Structure tree re-ordered into sequential column blocks (<Sect> Col 1 -> Col 2); /Tabs /S set on all 28 Page dictionaries."
          },
          {
            id: "11-001",
            clause: "ISO 14289-1 Clause 7.2",
            wcag: "WCAG 2.2 SC 3.1.1 & 3.1.2",
            category: "Natural Language Declaration",
            title: "Document /Catalog declares primary BCP-47 language /Lang (en-US) and inline Latin binomial spans",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "/Catalog dictionary lacks /Lang entry; screen readers fail to select English pronunciation rules.",
            evidenceAfter: "/Lang (en-US) declared on /Catalog (Object 1 0 R) and /Span << /Lang (la) >> applied to Escherichia coli and Saccharomyces cerevisiae terms."
          },
          {
            id: "13-004",
            clause: "ISO 14289-1 Clause 7.3",
            wcag: "WCAG 2.2 SC 1.1.1",
            category: "Graphics & Figure Alternative Text",
            title: "All informative figures and vector scientific diagrams enclosed in <Figure> with descriptive /Alt and /BBox",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "6 laboratory diagrams (including Figure 1.2 enzyme kinetics curve) lack <Figure> tags, /BBox layout attributes, or /Alt strings.",
            evidenceAfter: "All 6 figures enclosed in <Figure> tags with validated bounding boxes and domain-accurate scientific /Alt descriptions."
          },
          {
            id: "14-003",
            clause: "ISO 14289-1 Clause 7.4.2",
            wcag: "WCAG 2.2 SC 1.3.1 & 2.4.6",
            category: "Numbered Heading Hierarchy",
            title: "Strictly nested heading hierarchy (<H1> through <H3>) with zero skipped heading levels",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "Document title is untagged text followed immediately by <H4> on Page 1, skipping <H1>, <H2>, and <H3>.",
            evidenceAfter: "Normalized 34 headings into a strict <H1> (Course Title) -> <H2> (Module Sections) -> <H3> (Lab Sub-Procedures) hierarchy synchronized with /Outlines bookmarks."
          },
          {
            id: "15-002",
            clause: "ISO 14289-1 Clause 7.5",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Table Headers & Scope Bindings",
            title: "All data tables contain <TH> header cells with explicit /Scope (/Column or /Row) or /Headers ID arrays",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "4 grading rubric and chemical hazard tables encoded as untagged text lines with zero <Table>, <TR>, <TH>, or /Scope attributes.",
            evidenceAfter: "All 4 tables reconstructed with <THead>/<TBody>, explicit <TH Scope=\"Column\"> and <TH Scope=\"Row\"> attributes, and /Summary descriptions."
          },
          {
            id: "28-001",
            clause: "ISO 14289-1 Clause 7.18.1",
            wcag: "WCAG 2.2 SC 1.4.3 & 3.3.2",
            category: "Interactive AcroForms & Visual Contrast",
            title: "Interactive form fields bound to <Form> OBJR with /TU tooltips; callout contrast >= 4.5:1",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "BSL-2 student attestation AcroForm fields lack /TU tooltip keys; amber safety callout text contrast is 2.8:1 (below 4.5:1 AA threshold).",
            evidenceAfter: "All 8 student attestation fields bound to <Form> OBJR with descriptive /TU strings; callout text darkened to #5C2804 achieving 7.4:1 contrast."
          }
        ]
      },

      // =======================================================================
      // PACKET 2 (FREE): ECOM-02 — EU CONSUMER ELECTRONICS USER MANUAL & GPSR
      // =======================================================================
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
        riskLevel: "NON-COMPLIANT — EAA DIRECTIVE 2019/882 & GPSR MARKET SURVEILLANCE RISK",
        remediatedStatus: "100% ISO 14289-1 (PDF/UA-1) & WCAG 2.2 AA VERIFIED",
        summary: "Multilingual European consumer hardware manual and General Product Safety Regulation (GPSR) compliance dossier failing EU Directive 2019/882 (EAA) e-commerce documentation mandates. Missing /Lang switching for English, German, and French regulatory warnings, 11 CE/WEEE/High-Voltage vector safety icons lacking <Figure> /Alt attributes, 3 technical RF specification tables lacking <TH> /Scope attributes, and low-contrast serial-number warranty links.",
        metadata: {
          before: {
            pdfuaid: "MISSING (Fails EN 301 549 Clause 10.2 PDF/UA-1 metadata check)",
            markInfo: "<< /Marked false >> (InDesign export without structure tags)",
            lang: "MISSING (EN/DE/FR paragraphs mixed without /Lang tags)",
            displayDocTitle: "false (Raw CAD/DTP filename displayed in title bar)",
            structTreeRoot: "Partial / corrupt (18 orphaned <Div> nodes, 0 semantic headings)",
            tabOrder: "/R (Scrambles 3-column multilingual safety instructions)",
            contrastRatio: "2.6:1 FAIL (Cool gray #9498A1 specs text on #FFFFFF)"
          },
          after: {
            pdfuaid: "pdfuaid:part=1 (ISO 14289-1:2014 & EN 301 549 v3.2.1 verified)",
            markInfo: "<< /Marked true /Suspects false >>",
            lang: "Root /Lang (en-GB) + inline /Span << /Lang (de-DE) >> & << /Lang (fr-FR) >>",
            displayDocTitle: "true (dc:title = 'AeroPulse Pro 3000 — EU User Manual & GPSR Safety Dossier')",
            structTreeRoot: "628 semantic nodes (<Document>, <Sect>, <H1>-<H3>, <Table>, <Figure>, <Link>)",
            tabOrder: "/S (Structure order synchronized across all 42 pages)",
            contrastRatio: "8.2:1 PASS (Remediated to #232528 on #FFFFFF — WCAG 2.2 AA/AAA)"
          }
        },
        visualRegions: [
          {
            id: "ECOM-02-REG-1",
            checkpointId: "11-001",
            tagType: "Span",
            page: 2,
            bbox: { top: 7, left: 6, width: 88, height: 18 },
            label: "Multilingual EU Declaration of Conformity (EN / DE / FR)",
            previewText: "EN: EU Declaration of Conformity (RED 2014/53/EU) // DE: EU-Konformitaetserklaerung // FR: Declaration UE de conformite",
            issueSummary: "Parallel English, German, and French statutory declarations lack catalog /Lang (en-GB) and child /Span language attributes, causing screen readers to mispronounce German and French safety text with English phonetics.",
            beforeTag: "<P>Untagged EN/DE/FR text with no /Lang dictionary keys</P>",
            afterTag: "<P Lang=\"en-GB\">...</P><P Lang=\"de-DE\">...</P><P Lang=\"fr-FR\">...</P>"
          },
          {
            id: "ECOM-02-REG-2",
            checkpointId: "13-004",
            tagType: "Figure",
            page: 5,
            bbox: { top: 28, left: 6, width: 42, height: 24 },
            label: "CE, WEEE Crossed-Out Wheeled Bin & Class II Double-Insulation Symbols",
            previewText: "[Vector Safety Pictograms: CE Mark, Directive 2012/19/EU WEEE Disposal Icon, IEC 60417-5172 Class II Symbol]",
            issueSummary: "Mandatory European regulatory hazard and disposal pictograms drawn as ungrouped vector outlines with zero <Figure> tags or /Alt text, violating EAA Annex I Section I(1)(b).",
            beforeTag: "Raw Vector Paths (142 curve segments, /Alt: NULL)",
            afterTag: "<Figure BBox=[36 420 280 545] /Alt (Mandatory EU regulatory markings: CE Conformity mark, WEEE Directive 2012/19/EU crossed-out wheeled bin indicating separate electronic waste collection, and IEC Class II double-insulated appliance symbol requiring no earth ground.)>"
          },
          {
            id: "ECOM-02-REG-3",
            checkpointId: "09-003",
            tagType: "Sect",
            page: 9,
            bbox: { top: 28, left: 52, width: 42, height: 24 },
            label: "Exploded Chassis Assembly & Filter Replacement Callout Steps (1-4)",
            previewText: "Step 1: Disconnect 230V AC Mains -> Step 2: Release HEPA Latch -> Step 3: Seat Carbon Cartridge -> Step 4: Reset Hall Sensor",
            issueSummary: "Clockwise circular callout numbers around the hardware diagram are stored in reverse creation order (Step 4 -> Step 2 -> Step 1 -> Step 3) in the PDF content stream.",
            beforeTag: "Stream Order: Step 4 -> Step 2 -> Step 1 -> Step 3 (/Tabs /R)",
            afterTag: "<L><LI><Lbl>1.</Lbl><LBody>...</LBody></LI>...</L> (Sequential 1->2->3->4, /Tabs /S)"
          },
          {
            id: "ECOM-02-REG-4",
            checkpointId: "15-002",
            tagType: "Table",
            page: 18,
            bbox: { top: 55, left: 6, width: 88, height: 22 },
            label: "Table 4.2: Radio Equipment Directive (RED) RF Frequency & EIRP Limits",
            previewText: "Wireless Interface | Operating Frequency Band | Max Transmit Power (EIRP) | EU Harmonized Standard",
            issueSummary: "Technical RF compliance table lacks <TH> header cells and /Scope attributes, preventing blind consumers and market surveillance auditors from correlating frequency bands with EIRP limits.",
            beforeTag: "Untagged Tab-Delimited Text Block (0 <TH> cells)",
            afterTag: "<Table><THead><TR><TH Scope=\"Column\">...</TH></TR></THead><TBody>...</TBody></Table>"
          },
          {
            id: "ECOM-02-REG-5",
            checkpointId: "28-001",
            tagType: "Link",
            page: 40,
            bbox: { top: 80, left: 6, width: 88, height: 14 },
            label: "EU Warranty Registration Hyperlink & Support Portal Footer",
            previewText: "Register your 24-month EU statutory warranty at https://support.aeropulse.eu/warranty-claim",
            issueSummary: "URI link annotation (/Subtype /Link) is not wrapped in a <Link> structure element with <OBJR> and lacks a /Contents description, while fine-print contrast is 2.6:1.",
            beforeTag: "Untagged /Annot /Subtype /Link (/Contents null, Contrast 2.6:1)",
            afterTag: "<Link><OBJR /Contents (Activate 24-Month EU Statutory Warranty Portal at support.aeropulse.eu) /></Link> (Contrast 8.2:1)"
          }
        ],
        structTreeBefore: `%PDF-1.7
% [BEFORE REMEDIATION — CORRUPT DTP EXPORT FAILING EU DIRECTIVE 2019/882 (EAA)]
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  % ERROR [Matterhorn 11-001]: Missing /Lang on root Catalog; multilingual EN/DE/FR unlabelled
  % ERROR [Matterhorn 06-001]: No XMP pdfuaid:part=1 compliance declaration
  /MarkInfo << /Marked false >>
>>
endobj

8 0 obj
<< /Length 1610 >>
stream
  % Unmarked multilingual warnings concatenated in raw text stream
  BT /F1 10 Tf 36 720 Td (WARNING: Risk of electric shock. Do not open chassis.) Tj ET
  BT /F1 10 Tf 36 704 Td (WARNUNG: Stromschlaggefahr. Gehaeuse nicht oeffnen.) Tj ET
  BT /F1 10 Tf 36 688 Td (AVERTISSEMENT: Risque de choc electrique. Ne pas ouvrir.) Tj ET
  % CE and WEEE disposal vector icons with zero <Figure> or /Alt metadata
  42 510 m 68 510 l 68 538 l 42 538 l h S
  % Hardware assembly steps stored in clockwise DTP layer order (4 -> 2 -> 1 -> 3)
  BT /F2 11 Tf 320 480 Td (Step 4: Reset Hall Sensor) Tj ET
  BT /F2 11 Tf 320 520 Td (Step 2: Release HEPA Latch) Tj ET
  BT /F2 11 Tf 110 520 Td (Step 1: Disconnect 230V AC Mains) Tj ET
endstream
endobj`,
        structTreeAfter: `%PDF-1.7
% [AFTER REMEDIATION — EN 301 549 & ISO 14289-1 (PDF/UA-1) MULTILINGUAL AST]
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  /Lang (en-GB)
  /MarkInfo << /Marked true /Suspects false >>
  /ViewerPreferences << /DisplayDocTitle true >>
  /Metadata 12 0 R
  /StructTreeRoot 25 0 R
>>
endobj

25 0 obj
<<
  /Type /StructTreeRoot
  /K [
    <<
      /Type /StructElem
      /S /Document
      /Lang (en-GB)
      /K [
        << /Type /StructElem /S /H1 /T (EU Safety & GPSR Compliance Manual) /K [0] >>
        << /Type /StructElem /S /P /Lang (en-GB) /K [1] >>
        << /Type /StructElem /S /P /Lang (de-DE) /K [2] >>
        << /Type /StructElem /S /P /Lang (fr-FR) /K [3] >>
        <<
          /Type /StructElem
          /S /Figure
          /Alt (Mandatory EU regulatory markings: CE Conformity mark, WEEE Directive 2012/19/EU crossed-out wheeled bin indicating separate electronic waste collection, and IEC Class II double-insulated appliance symbol requiring no earth ground.)
          /A << /O /Layout /BBox [36 420 280 545] >>
          /K [4]
        >>
        <<
          /Type /StructElem
          /S /L
          /K [
            << /Type /StructElem /S /LI /K [ << /S /Lbl /K [5] >> << /S /LBody /K [6] >> ] >>
            << /Type /StructElem /S /LI /K [ << /S /Lbl /K [7] >> << /S /LBody /K [8] >> ] >>
          ]
        >>
      ]
    >>
  ]
>>
endobj`,
        tables: [
          {
            id: "ECOM-02-TBL-1",
            title: "Table 4.2: Radio Equipment Directive (2014/53/EU) RF & EIRP Specifications",
            page: 18,
            summaryIssue: "Remediated untagged hardware specification matrix into a semantic <Table> with explicit <TH Scope=\"Column\"> and <TH Scope=\"Row\"> bindings for EN 301 549 compliance.",
            headers: [
              "Wireless Transceiver Module",
              "Operating Frequency Band",
              "Max Conducted EIRP",
              "Harmonized EN Standard"
            ],
            rows: [
              ["Wi-Fi 6E Tri-Band MIMO (IEEE 802.11ax)", "2400–2483.5 MHz / 5150–5350 MHz", "< 20.0 dBm (100 mW)", "EN 300 328 v2.2.2 / EN 301 893"],
              ["Bluetooth Low Energy 5.4 (BLE Mesh)", "2402–2480 MHz (40 Channels)", "< 10.0 dBm (10 mW)", "EN 300 328 v2.2.2 Clause 4.3"],
              ["NFC Proximity Pairing Coil (ISO/IEC 14443)", "13.56 MHz +/- 7 kHz", "< 42 dBuA/m at 10m", "EN 300 330 v2.1.1"]
            ],
            beforeMarkup: `<P>Wireless Transceiver Module Operating Frequency Band Max Conducted EIRP Harmonized EN Standard</P>
<P>Wi-Fi 6E Tri-Band MIMO 2400-2483.5 MHz < 20.0 dBm EN 300 328 v2.2.2</P>`,
            afterMarkup: `<Table Summary="Radio Equipment Directive 2014/53/EU RF operating frequency bands, maximum EIRP power limits, and harmonized European standards.">
  <THead>
    <TR>
      <TH Scope="Column" ID="th_rf_mod">Wireless Transceiver Module</TH>
      <TH Scope="Column" ID="th_rf_band">Operating Frequency Band</TH>
      <TH Scope="Column" ID="th_rf_eirp">Max Conducted EIRP</TH>
      <TH Scope="Column" ID="th_rf_std">Harmonized EN Standard</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TH Scope="Row" ID="th_rf_r1" Headers="th_rf_mod">Wi-Fi 6E Tri-Band MIMO (IEEE 802.11ax)</TH>
      <TD Headers="th_rf_r1 th_rf_band">2400–2483.5 MHz / 5150–5350 MHz</TD>
      <TD Headers="th_rf_r1 th_rf_eirp">&lt; 20.0 dBm (100 mW)</TD>
      <TD Headers="th_rf_r1 th_rf_std">EN 300 328 v2.2.2 / EN 301 893</TD>
    </TR>
  </TBody>
</Table>`
          }
        ],
        figures: [
          {
            id: "ECOM-02-FIG-1",
            title: "Figure 1.1: EU Regulatory Markings (CE, WEEE 2012/19/EU & Class II Insulation)",
            page: 5,
            bboxLabel: "Page 5 // BBox [36, 420, 280, 545]",
            beforeAlt: "MISSING (142 ungrouped vector paths with no <Figure> tag)",
            afterAlt: "Mandatory EU regulatory markings: CE Conformity mark, WEEE Directive 2012/19/EU crossed-out wheeled bin indicating separate electronic waste collection, and IEC Class II double-insulated appliance symbol requiring no earth ground."
          },
          {
            id: "ECOM-02-FIG-2",
            title: "Figure 2.3: AeroPulse Pro 3000 Exploded HEPA & Carbon Filter Cartridge Assembly",
            page: 9,
            bboxLabel: "Page 9 // BBox [295, 380, 565, 590]",
            beforeAlt: "exploded_view_v4_outlined.ai",
            afterAlt: "Exploded isometric diagram of the AeroPulse Pro 3000 chassis showing the 4-stage maintenance sequence: (1) rear 230V AC mains disconnect socket, (2) dual side release latches, (3) cylindrical H13 HEPA and activated carbon filter drum, and (4) magnetic Hall-effect lid interlock sensor."
          }
        ],
        checkpoints: [
          {
            id: "01-006",
            clause: "ISO 14289-1 Clause 7.1",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Artifact vs. Real Content Tagging",
            title: "Decorative bleed borders, crop marks, and running page numbers demoted to /Artifact",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "84 printer crop marks and running footer bars left inside primary content stream, interrupting screen reader flow on every page turn.",
            evidenceAfter: "All 84 printer marks and running footers enclosed in /Artifact << /Type /Pagination >> and /Artifact << /Type /PrinterMark >> containers."
          },
          {
            id: "06-001",
            clause: "ISO 14289-1 Clause 5 & 7.1",
            wcag: "EN 301 549 Clause 10.2",
            category: "XMP Metadata Stream",
            title: "XMP metadata stream declares pdfuaid:part=1 and Dublin Core title for EAA conformity",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "XMP packet contains only legacy Adobe creation timestamps; pdfuaid namespace is absent.",
            evidenceAfter: "Injected valid ISO 14289-1 XMP metadata stream with <pdfuaid:part>1</pdfuaid:part> and /DisplayDocTitle true."
          },
          {
            id: "09-003",
            clause: "ISO 14289-1 Clause 7.2 & 7.18.3",
            wcag: "WCAG 2.2 SC 1.3.2 & 2.4.3",
            category: "Logical Reading & Tab Order",
            title: "Hardware assembly callouts ordered sequentially (Steps 1->4) and /Tabs /S set on all 42 pages",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "Filter replacement steps read out of order (Step 4 -> Step 2 -> Step 1 -> Step 3) due to raw CAD layer export.",
            evidenceAfter: "Restructured assembly callouts into an ordered list <L> with sequential <LI> items 1 through 4 and enforced /Tabs /S."
          },
          {
            id: "11-001",
            clause: "ISO 14289-1 Clause 7.2",
            wcag: "WCAG 2.2 SC 3.1.1 & 3.1.2",
            category: "Multilingual /Lang Attributes",
            title: "Primary /Lang (en-GB) on Catalog plus /Lang (de-DE) and /Lang (fr-FR) on translated safety blocks",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "English, German, and French safety warnings share untagged paragraphs with zero BCP-47 language codes.",
            evidenceAfter: "Assigned /Lang (en-GB) on /Catalog and explicit /Lang (de-DE) and /Lang (fr-FR) attributes on all 64 translated warning paragraphs."
          },
          {
            id: "13-004",
            clause: "ISO 14289-1 Clause 7.3",
            wcag: "WCAG 2.2 SC 1.1.1",
            category: "Safety Pictogram Alternative Text",
            title: "All 11 CE, WEEE, and IEC hazard pictograms wrapped in <Figure> with statutory /Alt text",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "11 regulatory vector symbols (CE, WEEE wheeled bin, Class II double insulation) lack <Figure> tags and /Alt text.",
            evidenceAfter: "Grouped each regulatory symbol into a <Figure> structure element with complete statutory /Alt descriptions and /BBox coordinates."
          },
          {
            id: "14-003",
            clause: "ISO 14289-1 Clause 7.4.2",
            wcag: "WCAG 2.2 SC 1.3.1 & 2.4.6",
            category: "Numbered Heading Hierarchy",
            title: "Orphaned <Div> section titles converted to strict <H1>–<H3> hierarchy",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "18 chapter and troubleshooting headings exported as generic <Div> tags with zero heading semantics.",
            evidenceAfter: "Mapped all 48 headings to <H1>, <H2>, and <H3> tags with zero skipped levels and generated a synchronized PDF /Outlines tree."
          },
          {
            id: "15-002",
            clause: "ISO 14289-1 Clause 7.5",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Table Headers & Scope Bindings",
            title: "RF EIRP and power consumption tables tagged with <TH Scope=\"Column\"> and <TH Scope=\"Row\">",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "3 technical specification tables formatted with tab stops instead of <Table>/<TR>/<TH>/<TD> nodes.",
            evidenceAfter: "Constructed semantic <Table> trees for all 3 specification tables with explicit /Scope and /Headers bindings."
          },
          {
            id: "28-001",
            clause: "ISO 14289-1 Clause 7.18.5",
            wcag: "WCAG 2.2 SC 1.4.3 & 2.4.4",
            category: "Hyperlink Annotations & Contrast",
            title: "Warranty URLs wrapped in <Link><OBJR> with /Contents; fine-print contrast raised from 2.6:1 to 8.2:1",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "12 support links lack <Link> OBJR wrappers and /Contents keys; light-gray technical footnotes fail contrast at 2.6:1.",
            evidenceAfter: "Wrapped all 12 URI annotations in <Link><OBJR> with descriptive /Contents; updated footnote ink to #232528 (8.2:1 contrast)."
          }
        ]
      },

      // =======================================================================
      // PACKET 3 (PRO): FIN-03 — ANNUAL RETAIL BANKING FEE SCHEDULE & TILA
      // =======================================================================
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
        riskLevel: "NON-COMPLIANT — CRITICAL ADA TITLE III & EAA FINANCIAL SERVICES PENALTY RISK",
        remediatedStatus: "100% ISO 14289-1 (PDF/UA-1) & WCAG 2.2 AA VERIFIED",
        summary: "High-density 64-page retail banking Truth in Lending Act (TILA) Schumer Box and fee schedule failing Matterhorn Protocol 15-002 due to complex multi-level merged table headers (ColSpan/RowSpan) lacking /Headers ID arrays. Also contains 24 superscript disclosure footnotes disconnected from their <Note> targets, diagonal 'MEMBER FDIC' background watermarks interrupting paragraph streams, and an interactive wire-transfer dispute AcroForm missing /TU tooltips.",
        metadata: {
          before: {
            pdfuaid: "MISSING (Fails automated EAA banking portal ingestion gate)",
            markInfo: "<< /Marked true /Suspects true >> (Corrupt legacy banking print-stream tags)",
            lang: "MISSING (No /Lang attribute on /Catalog)",
            displayDocTitle: "false",
            structTreeRoot: "Broken table cell tree (Merged ColSpan cells lack /Headers arrays)",
            tabOrder: "/R (Jumps across Schumer Box APR columns and footnote callouts)",
            contrastRatio: "2.9:1 FAIL (Muted slate #8C939E fee waiver fine print on #F4F6F9)"
          },
          after: {
            pdfuaid: "pdfuaid:part=1 (ISO 14289-1:2014 certified for financial disclosures)",
            markInfo: "<< /Marked true /Suspects false >>",
            lang: "(en-US) declared on /Catalog",
            displayDocTitle: "true (dc:title = '2026 Retail Banking Fee Schedule & Regulation Z TILA Disclosure')",
            structTreeRoot: "1,184 semantic nodes with full /Headers [ID1 ID2] matrix on all spanned cells",
            tabOrder: "/S (Structure order linking <Reference> superscripts directly to <Note> bodies)",
            contrastRatio: "9.1:1 PASS (Remediated to #141413 on #F6F4EF — WCAG 2.2 AA/AAA)"
          }
        },
        visualRegions: [
          {
            id: "FIN-03-REG-1",
            checkpointId: "15-002",
            tagType: "Table",
            page: 3,
            bbox: { top: 8, left: 6, width: 88, height: 32 },
            label: "TILA Regulation Z Schumer Box (Multi-Tier ColSpan / RowSpan APR Matrix)",
            previewText: "Interest Rates & Interest Charges | Annual Percentage Rate (APR) for Purchases: 18.24% to 26.99% Variable",
            issueSummary: "Complex financial table uses ColSpan=3 and RowSpan=2 merged headers without unique /ID strings or /Headers [ ... ] cell arrays, violating ISO 14289-1 Clause 7.5.",
            beforeTag: "<TD>18.24% - 26.99%</TD> (Orphaned cell under ColSpan=3 with no /Headers array)",
            afterTag: "<TD Headers=[\"th_rates_grp\" \"th_purch_apr\" \"th_tier_plat\"]>18.24% Variable</TD>"
          },
          {
            id: "FIN-03-REG-2",
            checkpointId: "01-006",
            tagType: "Artifact",
            page: 3,
            bbox: { top: 43, left: 20, width: 60, height: 15 },
            label: "Diagonal Background Watermark ('MEMBER FDIC // EQUAL HOUSING LENDER')",
            previewText: "[45-Degree Vector Watermark Stamp Behind Fee Table Text]",
            issueSummary: "Repeating diagonal watermark stamp is tagged as an inline <P> paragraph in the middle of a sentence on all 64 pages, slicing sentences in half for screen reader users.",
            beforeTag: "<P>MEMBER FDIC EQUAL HOUSING LENDER</P> (Injected mid-sentence)",
            afterTag: "/Artifact << /Type /Background /Subtype /Watermark >> BDC ... EMC"
          },
          {
            id: "FIN-03-REG-3",
            checkpointId: "09-003",
            tagType: "Note",
            page: 14,
            bbox: { top: 61, left: 6, width: 88, height: 16 },
            label: "Regulation E Overdraft & Foreign Wire Footnote References ([1]–[24])",
            previewText: "[1] Variable APR tied to U.S. Prime Rate + Margin. [2] Foreign wire fee waived for Private Client tier.",
            issueSummary: "Superscript footnote numbers are plain text glyphs placed at the bottom of the page in visual geometry order rather than semantic <Reference> / <Note> pairs.",
            beforeTag: "Plain Superscript Glyph + Bottom-of-Page <P> (/Tabs /R)",
            afterTag: "<Reference><Link>1</Link></Reference> -> <Note ID=\"fn_1\">...</Note> (/Tabs /S)"
          },
          {
            id: "FIN-03-REG-4",
            checkpointId: "28-001",
            tagType: "Form",
            page: 58,
            bbox: { top: 80, left: 6, width: 88, height: 14 },
            label: "Regulation E Unauthorized Electronic Fund Transfer Dispute Form",
            previewText: "Account Number [____] | Disputed Transaction Amount ($) [____] | Date of Wire Transfer [____]",
            issueSummary: "14 fillable AcroForm text and checkbox widgets lack /TU tooltip descriptions and are unlinked from the structure tree; fine-print waiver contrast is 2.9:1.",
            beforeTag: "/Widget << /FT /Tx /T (acct_num) /TU null >> (Contrast 2.9:1)",
            afterTag: "<Form><OBJR /T (acct_num) /TU (Enter 12-Digit Retail Checking Account Number) /></Form> (Contrast 9.1:1)"
          }
        ],
        structTreeBefore: `%PDF-1.7
% [BEFORE REMEDIATION — BROKEN MERGED-CELL SCHUMER BOX & INLINE WATERMARKS]
30 0 obj
<<
  /Type /StructElem
  /S /Table
  % ERROR [Matterhorn 15-002]: Spanned headers (/ColSpan 3) lack /ID and child <TD> cells lack /Headers array
  /K [
    << /Type /StructElem /S /TR /K [
      << /Type /StructElem /S /TD /A << /O /Table /ColSpan 3 >> /K [0] >>
    ] >>
    << /Type /StructElem /S /TR /K [
      << /Type /StructElem /S /TD /K [1] >>
      << /Type /StructElem /S /TD /K [2] >>
      % ERROR [Matterhorn 01-006]: Watermark tagged as <P> inside table row!
      << /Type /StructElem /S /P /K [99] >>
    ] >>
  ]
>>
endobj`,
        structTreeAfter: `%PDF-1.7
% [AFTER REMEDIATION — ISO 14289-1 CLAUSE 7.5 MULTI-TIER TABLE /HEADERS MATRIX]
30 0 obj
<<
  /Type /StructElem
  /S /Table
  /Summary (Regulation Z TILA Schumer Box comparing Purchase APR, Balance Transfer APR, Cash Advance APR, and Foreign Transaction Fees across Core, Preferred, and Private Client account tiers.)
  /K [
    << /Type /StructElem /S /THead /K [
      << /Type /StructElem /S /TR /K [
        << /Type /StructElem /S /TH /ID (th_grp_rates) /A << /O /Table /ColSpan 3 /Scope /Column >> /K [0] >>
      ] >>
      << /Type /StructElem /S /TR /K [
        << /Type /StructElem /S /TH /ID (th_metric) /A << /O /Table /Scope /Column /Headers [(th_grp_rates)] >> /K [1] >>
        << /Type /StructElem /S /TH /ID (th_core) /A << /O /Table /Scope /Column /Headers [(th_grp_rates)] >> /K [2] >>
        << /Type /StructElem /S /TH /ID (th_priv) /A << /O /Table /Scope /Column /Headers [(th_grp_rates)] >> /K [3] >>
      ] >>
    ] >>
    << /Type /StructElem /S /TBody /K [
      << /Type /StructElem /S /TR /K [
        << /Type /StructElem /S /TH /ID (th_r_apr) /A << /O /Table /Scope /Row /Headers [(th_grp_rates) (th_metric)] >> /K [4] >>
        << /Type /StructElem /S /TD /A << /O /Table /Headers [(th_grp_rates) (th_core) (th_r_apr)] >> /K [5] >>
        << /Type /StructElem /S /TD /A << /O /Table /Headers [(th_grp_rates) (th_priv) (th_r_apr)] >> /K [6] >>
      ] >>
    ] >>
  ]
>>
endobj`,
        tables: [
          {
            id: "FIN-03-TBL-1",
            title: "Table 1.1: Regulation Z TILA Schumer Box — Multi-Tier APR & Fee Schedule",
            page: 3,
            summaryIssue: "Complex table containing ColSpan=3 banner headers and RowSpan=2 fee categories remediated by assigning unique cell /ID strings and explicit /Headers [ID1, ID2, ID3] arrays to every <TD> cell (Matterhorn 15-002).",
            headers: [
              "Disclosure Category / Fee Metric",
              "Core Everyday Checking & Card",
              "Preferred Rewards Tier",
              "Private Client Wealth Tier"
            ],
            rows: [
              ["Purchase Annual Percentage Rate (APR) [Note 1]", "24.99% Variable (Prime + 16.49%)", "20.24% Variable (Prime + 11.74%)", "18.24% Variable (Prime + 9.74%)"],
              ["Cash Advance & Wire Overdraft APR", "29.99% Variable (Min $10.00 Fee)", "27.49% Variable (Min $10.00 Fee)", "22.99% Variable ($0 Cash Advance Fee)"],
              ["Outgoing International SWIFT Wire Transfer", "$45.00 per wire + 2.5% FX Markup", "$25.00 per wire + 1.0% FX Markup", "$0.00 Waived (0.0% FX Markup) [Note 2]"],
              ["Foreign Point-of-Sale Transaction Fee", "3.0% of U.S. Dollar transaction amount", "1.5% of U.S. Dollar transaction amount", "$0.00 None"]
            ],
            beforeMarkup: `<Table>
  <TR><TD ColSpan="4">Interest Rates, APRs &amp; International Wire Fee Schedule</TD></TR>
  <TR><TD>Purchase Annual Percentage Rate (APR)</TD><TD>24.99% Variable</TD><TD>20.24% Variable</TD><TD>18.24% Variable</TD></TR>
</Table>`,
            afterMarkup: `<Table Summary="Regulation Z Schumer Box comparing variable APRs and international SWIFT wire fees across Core, Preferred, and Private Client banking tiers.">
  <THead>
    <TR>
      <TH ID="th_banner" ColSpan="4" Scope="Column">Interest Rates, APRs &amp; International Wire Fee Schedule</TH>
    </TR>
    <TR>
      <TH ID="th_cat" Scope="Column" Headers="th_banner">Disclosure Category / Fee Metric</TH>
      <TH ID="th_t1" Scope="Column" Headers="th_banner">Core Everyday Checking &amp; Card</TH>
      <TH ID="th_t2" Scope="Column" Headers="th_banner">Preferred Rewards Tier</TH>
      <TH ID="th_t3" Scope="Column" Headers="th_banner">Private Client Wealth Tier</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TH ID="th_row_apr" Scope="Row" Headers="th_banner th_cat">Purchase Annual Percentage Rate (APR)</TH>
      <TD Headers="th_banner th_t1 th_row_apr">24.99% Variable (Prime + 16.49%)</TD>
      <TD Headers="th_banner th_t2 th_row_apr">20.24% Variable (Prime + 11.74%)</TD>
      <TD Headers="th_banner th_t3 th_row_apr">18.24% Variable (Prime + 9.74%)</TD>
    </TR>
  </TBody>
</Table>`
          }
        ],
        figures: [
          {
            id: "FIN-03-FIG-1",
            title: "Figure 3.1: Daily Compounding Interest & Minimum Payment Amortization Chart",
            page: 19,
            bboxLabel: "Page 19 // BBox [42, 340, 570, 520]",
            beforeAlt: "MISSING (Vector bar chart untagged)",
            afterAlt: "Comparative bar chart illustrating total interest paid on a $5,000 balance at 24.99% APR: making only the 2% minimum monthly payment requires 17 years and $11,420 in total interest, whereas paying a fixed $185 monthly installment retires the balance in 36 months with $1,660 in total interest."
          },
          {
            id: "FIN-03-FIG-2",
            title: "Figure 5.2: SEPA & SWIFT Cross-Border Wire Settlement Timeline Diagram",
            page: 38,
            bboxLabel: "Page 38 // BBox [42, 210, 570, 365]",
            beforeAlt: "swift_flow_v2.pdf",
            afterAlt: "Four-stage process diagram of an international SWIFT gpi wire transfer: (1) Originator initiation before 16:00 EST cutoff, (2) Automated OFAC/AML screening and FX conversion, (3) Intermediary correspondent bank clearing (T+1 business day), and (4) Beneficiary account credit notification."
          }
        ],
        checkpoints: [
          {
            id: "01-006",
            clause: "ISO 14289-1 Clause 7.1",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Watermark & Pagination Artifacts",
            title: "64 diagonal 'MEMBER FDIC' background watermarks removed from <P> tags and marked as /Artifact",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "Repeating diagonal background watermarks tagged as <P> elements mid-sentence across all 64 pages.",
            evidenceAfter: "All 64 watermark instances and 128 running headers/footers re-tagged as /Artifact << /Type /Background /Subtype /Watermark >>."
          },
          {
            id: "06-001",
            clause: "ISO 14289-1 Clause 5 & 7.1",
            wcag: "EN 301 549 Clause 10.2",
            category: "XMP Metadata Stream",
            title: "XMP metadata packet declares pdfuaid:part=1 and Regulation Z document title",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "Legacy print-stream PDF lacks XMP pdfuaid declaration and sets /DisplayDocTitle false.",
            evidenceAfter: "Valid XMP metadata stream attached with <pdfuaid:part>1</pdfuaid:part> and /DisplayDocTitle true."
          },
          {
            id: "09-003",
            clause: "ISO 14289-1 Clause 7.2 & 7.9",
            wcag: "WCAG 2.2 SC 1.3.2 & 2.4.3",
            category: "Footnote Reading & Tab Order",
            title: "24 TILA/Reg E superscript footnotes linked via semantic <Reference> and <Note ID> pairs with /Tabs /S",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "Footnotes read disconnected at the bottom of each page after unrelated paragraphs; page dictionaries use /Tabs /R.",
            evidenceAfter: "All 24 footnotes structured as <Reference> -> <Note ID=\"fn_1..24\"> with bidirectional keyboard focus and /Tabs /S on all 64 pages."
          },
          {
            id: "11-001",
            clause: "ISO 14289-1 Clause 7.2",
            wcag: "WCAG 2.2 SC 3.1.1",
            category: "Natural Language Declaration",
            title: "Primary document language /Lang (en-US) declared on /Catalog dictionary",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "/Catalog dictionary omits /Lang entry.",
            evidenceAfter: "/Lang (en-US) declared on root /Catalog object."
          },
          {
            id: "13-004",
            clause: "ISO 14289-1 Clause 7.3",
            wcag: "WCAG 2.2 SC 1.1.1",
            category: "Financial Chart Alternative Text",
            title: "Amortization bar charts and SWIFT clearing diagrams enclosed in <Figure> with quantitative /Alt text",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "5 financial charts and fee comparison graphs lack <Figure> tags or expose raw .pdf/.eps filenames.",
            evidenceAfter: "All 5 financial charts wrapped in <Figure> tags with complete quantitative /Alt summaries and /BBox attributes."
          },
          {
            id: "14-003",
            clause: "ISO 14289-1 Clause 7.4.2",
            wcag: "WCAG 2.2 SC 1.3.1 & 2.4.6",
            category: "Numbered Heading Hierarchy",
            title: "72 regulatory disclosure sections structured into a strict <H1>–<H4> hierarchy",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "Disclosure headings styled with all-caps bold fonts without <H1>–<H4> tags; skips from <H1> to <H3> on Page 12.",
            evidenceAfter: "Rebuilt all 72 headings into a continuous <H1>–<H4> tree with zero level skips."
          },
          {
            id: "15-002",
            clause: "ISO 14289-1 Clause 7.5",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Complex Spanned Table /Headers Arrays",
            title: "All ColSpan and RowSpan cells in Schumer Box and fee tables mapped via explicit /ID and /Headers arrays",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "11 multi-tier financial tables contain 68 ColSpan/RowSpan merged cells with zero /ID or /Headers attributes (Matterhorn 15-002 failure).",
            evidenceAfter: "Assigned unique /ID strings to all 94 header cells and explicit /Headers [ID1 ID2 ...] arrays to all 412 data cells."
          },
          {
            id: "28-001",
            clause: "ISO 14289-1 Clause 7.18.1",
            wcag: "WCAG 2.2 SC 1.4.3 & 3.3.2",
            category: "Dispute AcroForm /TU & Fine-Print Contrast",
            title: "14 Reg E dispute AcroForm fields bound to <Form> with /TU tooltips; fine-print contrast raised to 9.1:1",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "14 fillable dispute fields on Pages 58–62 lack /TU tooltips; slate-gray fee waiver fine print fails WCAG AA at 2.9:1.",
            evidenceAfter: "Bound all 14 widgets to <Form><OBJR> with /TU tooltips and remediated fine-print ink to #141413 (9.1:1 contrast)."
          }
        ]
      },
      // =======================================================================
      // PACKET 4 (PRO): MED-04 — PATIENT INTAKE, INFORMED CONSENT & DISCHARGE
      // =======================================================================
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
        riskLevel: "NON-COMPLIANT — HHS SECTION 504 & HIPAA CLINICAL ACCESSIBILITY RISK",
        remediatedStatus: "100% ISO 14289-1 (PDF/UA-1) & WCAG 2.2 AA VERIFIED",
        summary: "Interactive 18-page clinical patient intake, anesthesia informed consent, and post-operative discharge packet subject to the U.S. Department of Health and Human Services (HHS) Section 504 WCAG 2.1/2.2 AA Rule. Contains 34 interactive AcroForm fields (text inputs, allergy radio groups, consent checkboxes, and digital signature blocks) missing /TU accessible tooltip descriptions and <Form> OBJR structure bindings, 2 post-operative analgesic dosage tables lacking <TH> /Scope attributes, and anatomical pain-scale diagrams missing <Figure> /Alt text.",
        metadata: {
          before: {
            pdfuaid: "MISSING (Fails HHS Section 504 patient portal accessibility check)",
            markInfo: "<< /Marked false >>",
            lang: "MISSING (No /Lang key on /Catalog)",
            displayDocTitle: "false",
            structTreeRoot: "NULL (34 AcroForm widgets floating outside structure tree)",
            tabOrder: "/C (Column geometry — skips across allergy Yes/No radio buttons out of sequence)",
            contrastRatio: "3.0:1 FAIL (Teal clinical subheadings #4FA3A5 on #FFFFFF)"
          },
          after: {
            pdfuaid: "pdfuaid:part=1 (ISO 14289-1:2014 & HHS Section 504 certified)",
            markInfo: "<< /Marked true /Suspects false >>",
            lang: "(en-US) on /Catalog + /Span << /Lang (es-US) >> on bilingual discharge warnings",
            displayDocTitle: "true (dc:title = 'Patient Clinical Intake, Informed Consent & Post-Op Discharge Packet')",
            structTreeRoot: "318 semantic nodes including 34 <Form><OBJR> widget bindings",
            tabOrder: "/S (Structure order matching clinical intake questionnaire flow)",
            contrastRatio: "7.8:1 PASS (Remediated to #0E4D4F on #FFFFFF — WCAG 2.2 AA/AAA)"
          }
        },
        visualRegions: [
          {
            id: "MED-04-REG-1",
            checkpointId: "28-001",
            tagType: "Form",
            page: 2,
            bbox: { top: 8, left: 6, width: 88, height: 24 },
            label: "Patient Demographics & Penicillin/Latex Allergy AcroForm Matrix",
            previewText: "Patient Legal Name [____] | Date of Birth [____] | Known Drug Allergies: ( ) Yes ( ) No | Specify Reaction [____]",
            issueSummary: "34 interactive AcroForm widgets (/Subtype /Widget) have raw developer variable names (/T (fld_allergy_rad_01)) with null /TU tooltip attributes and zero <Form> structure nodes.",
            beforeTag: "/Annot /Subtype /Widget /FT /Btn /T (fld_allergy_rad_01) /TU null",
            afterTag: "<Form><OBJR /T (fld_allergy_rad_01) /TU (Select Yes if patient has a documented history of severe anaphylaxis or drug allergy to Penicillin, Latex, or Iodinated Contrast) /></Form>"
          },
          {
            id: "MED-04-REG-2",
            checkpointId: "13-004",
            tagType: "Figure",
            page: 6,
            bbox: { top: 35, left: 6, width: 42, height: 24 },
            label: "Figure 2.1: Wong-Baker FACES & 0-10 Numeric Pain Assessment Scale",
            previewText: "[Anatomical Anterior/Posterior Dermatome Map & 0-10 Visual Analog Pain Scale]",
            issueSummary: "Clinical pain scale and anterior/posterior body dermatome diagram lack <Figure> tags and /Alt descriptions, preventing blind or low-vision patients from completing self-reported pain intake.",
            beforeTag: "Untagged Image XObject /Im_PainScale (/Alt: NULL)",
            afterTag: "<Figure BBox=[36 360 285 510] /Alt (Numeric 0 to 10 Clinical Pain Assessment Scale paired with anterior and posterior anatomical body map: 0 indicates No Pain, 1-3 Mild Pain, 4-6 Moderate Pain interfering with concentration, 7-9 Severe Pain, and 10 Worst Possible Emergency Pain.)>"
          },
          {
            id: "MED-04-REG-3",
            checkpointId: "15-002",
            tagType: "Table",
            page: 14,
            bbox: { top: 35, left: 52, width: 42, height: 24 },
            label: "Table 4.1: Post-Operative Analgesic & Anticoagulant Dosing Schedule",
            previewText: "Medication & Strength | Route & Frequency | Maximum 24-Hour Limit | Critical Contraindication Warning",
            issueSummary: "Discharge medication table lacks <TH> header tags and /Scope bindings; if read linearly without column headers, dosage intervals and 24-hour maximum limits can be dangerously misassociated.",
            beforeTag: "Untagged Text Rows (No <Table> or <TH Scope=\"Column\">)",
            afterTag: "<Table><THead><TR><TH Scope=\"Column\">...</TH></TR></THead><TBody>...</TBody></Table>"
          },
          {
            id: "MED-04-REG-4",
            checkpointId: "09-003",
            tagType: "Sect",
            page: 17,
            bbox: { top: 64, left: 6, width: 88, height: 26 },
            label: "Surgical Anesthesia Informed Consent & Digital Signature Attestation",
            previewText: "I acknowledge explanation of general anesthesia risks... Patient / Legal Guardian Signature [____] Date [____]",
            issueSummary: "Keyboard tab order (/Tabs /C) jumps from the Patient Name field on the left directly to the Physician Witness field at the bottom, skipping the Informed Consent checkboxes.",
            beforeTag: "/Page << /Tabs /C >> (Focus skips consent checkboxes 3 through 7)",
            afterTag: "/Page << /Tabs /S >> (Sequential structure tabbing through all consent clauses)"
          }
        ],
        structTreeBefore: `%PDF-1.7
% [BEFORE REMEDIATION — UNBOUND ACROFORM WIDGETS FAILING ISO 14289-1 CLAUSE 7.18.1]
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  /AcroForm <<
    /Fields [ 40 0 R 41 0 R 42 0 R ]
    % ERROR [Matterhorn 28-001]: AcroForm fields are not referenced via <Form> OBJR in /StructTreeRoot
  >>
>>
endobj

40 0 obj
<<
  /Type /Annot
  /Subtype /Widget
  /FT /Tx
  /T (pt_dob_mmddyyyy)
  % ERROR [Matterhorn 28-001]: Missing /TU accessible user-facing tooltip description
  /Rect [180 640 310 662]
>>
endobj`,
        structTreeAfter: `%PDF-1.7
% [AFTER REMEDIATION — ISO 14289-1 CLAUSE 7.18.1 ACCESSIBLE ACROFORM AST]
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  /Lang (en-US)
  /MarkInfo << /Marked true /Suspects false >>
  /ViewerPreferences << /DisplayDocTitle true >>
  /Metadata 10 0 R
  /StructTreeRoot 20 0 R
  /AcroForm << /Fields [ 40 0 R 41 0 R 42 0 R ] /NeedAppearances false >>
>>
endobj

40 0 obj
<<
  /Type /Annot
  /Subtype /Widget
  /FT /Tx
  /T (pt_dob_mmddyyyy)
  /TU (Enter Patient Date of Birth in MM/DD/YYYY format)
  /StructParent 1
  /Rect [180 640 310 662]
>>
endobj

50 0 obj
<<
  /Type /StructElem
  /S /Form
  /P 21 0 R
  /A << /O /PrintField /Role /Tv >>
  /K << /Type /OBJR /Obj 40 0 R /Pg 4 0 R >>
>>
endobj`,
        tables: [
          {
            id: "MED-04-TBL-1",
            title: "Table 4.1: Post-Operative Discharge Medication & Maximum 24-Hour Dosing Schedule",
            page: 14,
            summaryIssue: "Remediated clinical discharge dosing schedule with <TH Scope=\"Column\"> and <TH Scope=\"Row\"> bindings so assistive technology announces the exact medication name prior to each dosage limit and contraindication cell.",
            headers: [
              "Medication & Strength",
              "Route & Dosing Interval",
              "Maximum 24-Hour Cumulative Limit",
              "Critical Clinical Contraindication"
            ],
            rows: [
              ["Acetaminophen (Tylenol) 500 mg Tablet", "Oral — 1 to 2 tablets every 6 hours as needed", "3,000 mg (6 tablets) per 24 hours", "Avoid all concurrent OTC cold/flu products containing acetaminophen (hepatic toxicity risk)"],
              ["Ibuprofen (NSAID) 400 mg Tablet", "Oral — 1 tablet every 8 hours with food", "1,200 mg (3 tablets) per 24 hours", "Hold if taking oral anticoagulants or if eGFR < 45 mL/min; monitor for GI bleeding"],
              ["Enoxaparin Sodium (Lovenox) 40 mg/0.4 mL", "Subcutaneous abdominal injection once daily at 09:00", "40 mg (1 prefilled syringe) per 24 hours", "Do not expel air bubble prior to injection; report sudden hematoma or gingival bleeding immediately"]
            ],
            beforeMarkup: `<P>Medication & Strength Route & Dosing Interval Maximum 24-Hour Cumulative Limit Critical Clinical Contraindication</P>
<P>Acetaminophen 500 mg Tablet Oral every 6 hours 3,000 mg per 24 hours Avoid concurrent acetaminophen</P>`,
            afterMarkup: `<Table Summary="Post-operative discharge medication schedule specifying route, dosing interval, maximum 24-hour cumulative limit, and clinical contraindications.">
  <THead>
    <TR>
      <TH Scope="Column" ID="th_med">Medication &amp; Strength</TH>
      <TH Scope="Column" ID="th_route">Route &amp; Dosing Interval</TH>
      <TH Scope="Column" ID="th_max24">Maximum 24-Hour Cumulative Limit</TH>
      <TH Scope="Column" ID="th_contra">Critical Clinical Contraindication</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TH Scope="Row" ID="th_med_r1" Headers="th_med">Acetaminophen (Tylenol) 500 mg Tablet</TH>
      <TD Headers="th_med_r1 th_route">Oral — 1 to 2 tablets every 6 hours as needed</TD>
      <TD Headers="th_med_r1 th_max24">3,000 mg (6 tablets) per 24 hours</TD>
      <TD Headers="th_med_r1 th_contra">Avoid all concurrent OTC cold/flu products containing acetaminophen</TD>
    </TR>
  </TBody>
</Table>`
          }
        ],
        figures: [
          {
            id: "MED-04-FIG-1",
            title: "Figure 2.1: Clinical 0–10 Numeric & Visual Analog Pain Assessment Scale",
            page: 6,
            bboxLabel: "Page 6 // BBox [36, 360, 285, 510]",
            beforeAlt: "MISSING (Raster XObject /Im_PainScale untagged)",
            afterAlt: "Numeric 0 to 10 Clinical Pain Assessment Scale paired with anterior and posterior anatomical body map: 0 indicates No Pain, 1-3 Mild Pain, 4-6 Moderate Pain interfering with concentration, 7-9 Severe Pain, and 10 Worst Possible Emergency Pain."
          },
          {
            id: "MED-04-FIG-2",
            title: "Figure 4.3: Subcutaneous Lovenox Abdominal Injection Zone Diagram",
            page: 15,
            bboxLabel: "Page 15 // BBox [60, 220, 540, 395]",
            beforeAlt: "subq_abdomen_diagram.jpg",
            afterAlt: "Anatomical diagram of the anterior abdomen showing shaded left and right anterolateral subcutaneous injection zones located at least 2 inches (5 cm) laterally away from the umbilicus (navel) and away from surgical incision scars."
          }
        ],
        checkpoints: [
          {
            id: "01-006",
            clause: "ISO 14289-1 Clause 7.1",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Artifact vs. Real Content Tagging",
            title: "Hospital barcode wristbands, decorative borders, and page footers marked as /Artifact",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "18 repeating Code-128 margin barcodes and page footers emitted as untagged vector paths inside the reading stream.",
            evidenceAfter: "All 18 margin barcodes and pagination footers enclosed in /Artifact << /Type /Pagination >> containers."
          },
          {
            id: "06-001",
            clause: "ISO 14289-1 Clause 5 & 7.1",
            wcag: "EN 301 549 Clause 10.2",
            category: "XMP Metadata Stream",
            title: "XMP metadata stream declares pdfuaid:part=1 and clinical intake title",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "No XMP pdfuaid metadata stream; /DisplayDocTitle is false.",
            evidenceAfter: "XMP metadata stream injected with <pdfuaid:part>1</pdfuaid:part> and /DisplayDocTitle true."
          },
          {
            id: "09-003",
            clause: "ISO 14289-1 Clause 7.2 & 7.18.3",
            wcag: "WCAG 2.2 SC 1.3.2 & 2.4.3",
            category: "Form Tab & Reading Order",
            title: "All 18 pages enforce /Tabs /S so keyboard tabbing follows the clinical questionnaire sequence",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "/Tabs /C causes keyboard focus to jump across Yes/No radio columns out of question order.",
            evidenceAfter: "Set /Tabs /S on all 18 Page dictionaries and aligned /StructParents widget array with questionnaire order."
          },
          {
            id: "11-001",
            clause: "ISO 14289-1 Clause 7.2",
            wcag: "WCAG 2.2 SC 3.1.1 & 3.1.2",
            category: "Natural Language Declaration",
            title: "Root /Lang (en-US) declared plus /Span << /Lang (es-US) >> on bilingual emergency warnings",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "Missing root /Lang (en-US) and untagged Spanish emergency Room instructions on Page 18.",
            evidenceAfter: "Declared /Lang (en-US) on /Catalog and wrapped Spanish discharge block in /Span << /Lang (es-US) >>."
          },
          {
            id: "13-004",
            clause: "ISO 14289-1 Clause 7.3",
            wcag: "WCAG 2.2 SC 1.1.1",
            category: "Clinical Diagram Alternative Text",
            title: "Pain assessment scale and subcutaneous injection diagrams wrapped in <Figure> with clinical /Alt",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "3 clinical anatomical diagrams lack <Figure> tags and /Alt text.",
            evidenceAfter: "Enclosed all 3 anatomical diagrams in <Figure> tags with clinician-reviewed /Alt descriptions."
          },
          {
            id: "14-003",
            clause: "ISO 14289-1 Clause 7.4.2",
            wcag: "WCAG 2.2 SC 1.3.1 & 2.4.6",
            category: "Numbered Heading Hierarchy",
            title: "Intake, Consent, and Discharge sections structured as sequential <H1>–<H3> headings",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "Section banners formatted as raw colored rectangles with untagged white text.",
            evidenceAfter: "Tagged all 26 clinical section headers as sequential <H1>, <H2>, and <H3> elements."
          },
          {
            id: "15-002",
            clause: "ISO 14289-1 Clause 7.5",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Medication Table Header Scope",
            title: "Post-operative analgesic and anticoagulant tables tagged with <TH Scope=\"Column\"> and <TH Scope=\"Row\">",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "2 medication dosage schedules lack <Table> and <TH> tags, creating severe patient dosing ambiguity.",
            evidenceAfter: "Built full <Table>/<THead>/<TBody> trees with <TH Scope=\"Column\"> and <TH Scope=\"Row\"> bindings."
          },
          {
            id: "28-001",
            clause: "ISO 14289-1 Clause 7.18.1",
            wcag: "WCAG 2.2 SC 1.4.3, 3.3.2 & 4.1.2",
            category: "AcroForm /TU Tooltips & Contrast",
            title: "All 34 interactive AcroForm fields bound to <Form><OBJR> with /TU tooltips; teal header contrast raised to 7.8:1",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "34 AcroForm fields lack /TU tooltips and <Form> structure nodes; teal clinical subheadings fail contrast at 3.0:1.",
            evidenceAfter: "Populated explicit /TU tooltips and <Form><OBJR> bindings on all 34 widgets; darkened teal ink to #0E4D4F (7.8:1)."
          }
        ]
      },

      // =======================================================================
      // PACKET 5 (PRO): EDTECH-05 — K-12 & CERTIFICATION DIGITAL TEXTBOOK
      // =======================================================================
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
        riskLevel: "NON-COMPLIANT — STATE ADOPTION & SECTION 508 PROCUREMENT DISQUALIFICATION RISK",
        remediatedStatus: "100% ISO 14289-1 (PDF/UA-1) & WCAG 2.2 AA VERIFIED",
        summary: "96-page STEM digital textbook chapter on Electromagnetic Induction and Maxwell's Equations failing state Department of Education and university LMS adoption gates. Contains 48 inline and block mathematical equations rendered as shattered Type-3 glyph bitmaps without <Formula> tags or /ActualText spoken math strings, 14 vector circuit and magnetic flux diagrams lacking <Figure> /Alt descriptions, floating 'Key Concept' margin sidebars spliced mid-paragraph, and end-of-chapter QTI/SCORM assessment matrices lacking <TH> /Scope bindings.",
        metadata: {
          before: {
            pdfuaid: "MISSING (Rejected by Canvas / Blackboard Ally LMS accessibility scanner)",
            markInfo: "<< /Marked true /Suspects true >>",
            lang: "MISSING (No /Lang attribute on /Catalog)",
            displayDocTitle: "false",
            structTreeRoot: "48 math formulas emitted as untagged Type-3 font glyph fragments",
            tabOrder: "/R (Interleaves margin 'Historical Sidebar' text into main derivation paragraphs)",
            contrastRatio: "2.7:1 FAIL (Light blue #6CA6CD equation callout labels on #F7FAFC)"
          },
          after: {
            pdfuaid: "pdfuaid:part=1 (ISO 14289-1 & Canvas/Blackboard Ally 100% score)",
            markInfo: "<< /Marked true /Suspects false >>",
            lang: "(en-US) declared on /Catalog",
            displayDocTitle: "true (dc:title = 'Chapter 8: Electromagnetic Induction, Faraday Law & Maxwell Equations')",
            structTreeRoot: "1,840 semantic nodes including 48 <Formula> nodes with MathML /ActualText",
            tabOrder: "/S (Main derivation flow completes before entering <Aside> margin sidebars)",
            contrastRatio: "8.4:1 PASS (Remediated to #0F3552 on #F6F4EF — WCAG 2.2 AA/AAA)"
          }
        },
        visualRegions: [
          {
            id: "EDTECH-05-REG-1",
            checkpointId: "13-004",
            tagType: "Formula",
            page: 4,
            bbox: { top: 8, left: 6, width: 88, height: 18 },
            label: "Equation 8.4: Faraday-Lenz Law of Electromagnetic Induction (<Formula>)",
            previewText: "emf = - N * (d Phi_B / dt) = - N * d/dt [ Integral (B . dA) ]",
            issueSummary: "48 mathematical formulas are encoded as fragmented symbol font glyphs without a <Formula> structure element or /ActualText spoken math string, reading aloud as gibberish ('minus N times partial derivative glyph').",
            beforeTag: "Fragmented Symbol Font Glyphs (No <Formula>, /ActualText: NULL)",
            afterTag: "<Formula /Alt (Faraday-Lenz Law of Induction: Induced electromotive force epsilon equals negative N times the time derivative d Phi B over dt, which equals negative N times the derivative with respect to time of the surface integral of magnetic field B dot dA.) /ActualText (epsilon = -N d(Phi_B)/dt)>"
          },
          {
            id: "EDTECH-05-REG-2",
            checkpointId: "09-003",
            tagType: "Aside",
            page: 11,
            bbox: { top: 29, left: 6, width: 34, height: 28 },
            label: "Margin Sidebar: 'Michael Faraday's 1831 Iron Ring Experiment'",
            previewText: "[Historical Callout Box in Left Margin Parallel to Primary Derivation Column]",
            issueSummary: "Floating margin sidebar is interleaved line-by-line with the primary physics derivation in the content stream, breaking sentence continuity.",
            beforeTag: "Interleaved Left-Margin / Main-Column Text Lines (/Tabs /R)",
            afterTag: "<Aside /Placement /Block><H3>Historical Sidebar</H3><P>...</P></Aside> (/Tabs /S)"
          },
          {
            id: "EDTECH-05-REG-3",
            checkpointId: "13-004",
            tagType: "Figure",
            page: 11,
            bbox: { top: 29, left: 44, width: 50, height: 28 },
            label: "Figure 8.7: Motional EMF in a Conducting Rail Sliding Through Uniform B-Field",
            previewText: "[Vector Circuit Diagram: Conducting bar of length L moving at velocity v rightwards across rails in into-page B-field]",
            issueSummary: "Vector physics schematic with right-hand-rule magnetic force vectors and induced counter-clockwise current arrows lacks a <Figure> wrapper and /Alt description.",
            beforeTag: "Untagged Vector Lines & Arrowheads (/Alt: NULL)",
            afterTag: "<Figure BBox=[268 380 572 560] /Alt (Diagram of motional EMF: a vertical conducting rod of length L slides rightwards at velocity v along parallel horizontal rails connected to resistance R inside a uniform magnetic field B directed into the page, inducing a counter-clockwise current I = B L v / R and a leftward magnetic braking force F_B = I L B.)>"
          },
          {
            id: "EDTECH-05-REG-4",
            checkpointId: "15-002",
            tagType: "Table",
            page: 42,
            bbox: { top: 61, left: 6, width: 88, height: 26 },
            label: "Table 8.3: Maxwell's Four Equations in Differential & Integral Form",
            previewText: "Physical Law | Integral Form | Differential Form (SI Units) | Physical Meaning & Boundary Condition",
            issueSummary: "Summary reference table of Maxwell's Four Equations lacks <TH Scope=\"Column\"> and <TH Scope=\"Row\"> headers and embeds untagged math symbols inside cells.",
            beforeTag: "Untagged Visual Grid + Raw Math Glyphs (0 <TH> cells)",
            afterTag: "<Table><THead><TR><TH Scope=\"Column\">...</TH></TR></THead><TBody>...</TBody></Table>"
          }
        ],
        structTreeBefore: `%PDF-2.0
% [BEFORE REMEDIATION — FRAGMENTED TYPE-3 MATH GLYPHS & INTERLEAVED SIDEBARS]
14 0 obj
<< /Length 980 >>
stream
  % Equation 8.4 emitted as disconnected Symbol font character codes with no <Formula> tag
  BT /F_Sym 14 Tf 120 680 Td (<0025 003D 002D 004E 00D6 0046>) Tj ET
  % Margin sidebar line spliced directly into the middle of main body paragraph
  BT /F_Body 10 Tf 36 620 Td ( Sidebar: In 1831 Faraday wrapped two insulated coils... ) Tj ET
  BT /F_Body 11 Tf 220 620 Td (...substituting magnetic flux Phi_B into Equation 8.3 yields...) Tj ET
endstream
endobj`,
        structTreeAfter: `%PDF-2.0
% [AFTER REMEDIATION — ISO 14289-1 <FORMULA> /ACTUALTEXT & <ASIDE> AST]
20 0 obj
<<
  /Type /StructTreeRoot
  /K [
    <<
      /Type /StructElem
      /S /Document
      /Lang (en-US)
      /K [
        << /Type /StructElem /S /H1 /T (Chapter 8: Electromagnetic Induction) /K [0] >>
        <<
          /Type /StructElem
          /S /Formula
          /Alt (Faraday-Lenz Law of Induction: Induced electromotive force epsilon equals negative N times the time derivative d Phi B over dt, which equals negative N times the derivative with respect to time of the surface integral of magnetic field B dot dA.)
          /ActualText (epsilon = -N * d(Phi_B)/dt = -N * d/dt [integral(B . dA)])
          /A << /O /Layout /BBox [115 668 480 702] /Placement /Block >>
          /K [1]
        >>
        <<
          /Type /StructElem
          /S /Aside
          /T (Historical Sidebar: Faraday 1831 Iron Ring Experiment)
          /K [ << /Type /StructElem /S /H3 /K [2] >> << /Type /StructElem /S /P /K [3] >> ]
        >>
      ]
    >>
  ]
>>
endobj`,
        tables: [
          {
            id: "EDTECH-05-TBL-1",
            title: "Table 8.3: Maxwell's Four Equations of Electromagnetism (SI Units)",
            page: 42,
            summaryIssue: "Remediated capstone physics reference table with <TH Scope=\"Column\"> and <TH Scope=\"Row\"> headers and embedded <Formula /ActualText> nodes for every integral and differential equation.",
            headers: [
              "Fundamental Law",
              "Integral Formulation (SI)",
              "Differential Formulation (SI)",
              "Physical Interpretation"
            ],
            rows: [
              ["1. Gauss's Law for Electricity", "Closed Surface Integral (E . dA) = Q_enc / epsilon_0", "div(E) = rho / epsilon_0", "Electric flux through any closed surface is proportional to enclosed net electric charge"],
              ["2. Gauss's Law for Magnetism", "Closed Surface Integral (B . dA) = 0", "div(B) = 0", "Isolated magnetic monopoles do not exist; magnetic field lines form continuous closed loops"],
              ["3. Faraday's Law of Induction", "Closed Line Integral (E . ds) = - d(Phi_B) / dt", "curl(E) = - dB / dt", "A time-varying magnetic flux induces a non-conservative circulating electric field"],
              ["4. Ampere-Maxwell Law", "Closed Line Integral (B . ds) = mu_0 * I_enc + mu_0 * epsilon_0 * d(Phi_E)/dt", "curl(B) = mu_0 * J + mu_0 * epsilon_0 * dE/dt", "Magnetic fields are generated by both conduction currents and time-varying electric displacement flux"]
            ],
            beforeMarkup: `<P>Fundamental Law Integral Formulation Differential Formulation Physical Interpretation</P>
<P>Gauss's Law for Electricity Integral(E.dA) = Q/eps0 div(E) = rho/eps0 Electric flux proportional to charge</P>`,
            afterMarkup: `<Table Summary="Maxwell's Four Equations of Electromagnetism comparing integral form, differential form, and physical interpretation in SI units.">
  <THead>
    <TR>
      <TH Scope="Column" ID="th_law">Fundamental Law</TH>
      <TH Scope="Column" ID="th_int">Integral Formulation (SI)</TH>
      <TH Scope="Column" ID="th_diff">Differential Formulation (SI)</TH>
      <TH Scope="Column" ID="th_phys">Physical Interpretation</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TH Scope="Row" ID="th_law_1" Headers="th_law">1. Gauss's Law for Electricity</TH>
      <TD Headers="th_law_1 th_int"><Formula Alt="Closed surface integral of E dot dA equals enclosed charge Q divided by vacuum permittivity epsilon naught">Closed Surface Integral (E . dA) = Q_enc / epsilon_0</Formula></TD>
      <TD Headers="th_law_1 th_diff"><Formula Alt="Divergence of E equals volume charge density rho divided by epsilon naught">div(E) = rho / epsilon_0</Formula></TD>
      <TD Headers="th_law_1 th_phys">Electric flux through any closed surface is proportional to enclosed net electric charge</TD>
    </TR>
  </TBody>
</Table>`
          }
        ],
        figures: [
          {
            id: "EDTECH-05-FIG-1",
            title: "Figure 8.7: Motional Electromotive Force & Magnetic Braking on Parallel Rails",
            page: 11,
            bboxLabel: "Page 11 // BBox [268, 380, 572, 560]",
            beforeAlt: "MISSING (Vector circuit and force vectors untagged)",
            afterAlt: "Diagram of motional EMF: a vertical conducting rod of length L slides rightwards at velocity v along parallel horizontal rails connected to resistance R inside a uniform magnetic field B directed into the page, inducing a counter-clockwise current I = B L v / R and a leftward magnetic braking force F_B = I L B."
          },
          {
            id: "EDTECH-05-FIG-2",
            title: "Figure 8.14: RLC Series Resonance & Inductive/Capacitive Reactance Phasor Diagram",
            page: 54,
            bboxLabel: "Page 54 // BBox [48, 290, 560, 470]",
            beforeAlt: "fig8_14_phasor.eps",
            afterAlt: "Phasor vector diagram for a driven series RLC alternating-current circuit showing current I along the positive horizontal axis, resistor voltage V_R in phase with I, inductor voltage V_L leading current by +90 degrees, capacitor voltage V_C lagging current by -90 degrees, and net impedance phase angle phi = arctan((X_L - X_C) / R)."
          }
        ],
        checkpoints: [
          {
            id: "01-006",
            clause: "ISO 14289-1 Clause 7.1",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Artifact vs. Real Content Tagging",
            title: "96 chapter running headers, page folios, and decorative margin bars marked as /Artifact",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "192 running headers/footers and decorative color bars emitted as real content inside textbook paragraphs.",
            evidenceAfter: "Enclosed all 192 pagination headers/footers and decorative bars in /Artifact << /Type /Pagination >>."
          },
          {
            id: "06-001",
            clause: "ISO 14289-1 Clause 5 & 7.1",
            wcag: "EN 301 549 Clause 10.2",
            category: "XMP Metadata Stream",
            title: "XMP metadata packet declares pdfuaid:part=1 for LMS Ally 100% ingestion",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "Missing pdfuaid:part=1 in XMP stream; Canvas/Blackboard Ally flags textbook as non-compliant.",
            evidenceAfter: "Injected valid ISO 14289-1 XMP metadata stream with <pdfuaid:part>1</pdfuaid:part> and /DisplayDocTitle true."
          },
          {
            id: "09-003",
            clause: "ISO 14289-1 Clause 7.2 & 7.18.3",
            wcag: "WCAG 2.2 SC 1.3.2 & 2.4.3",
            category: "Sidebar Reading & Tab Order",
            title: "22 margin 'Historical & Lab Sidebars' isolated into <Aside> containers with /Tabs /S",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "Margin sidebars spliced line-by-line into primary physics derivations; /Tabs /R scrambles problem sets.",
            evidenceAfter: "Wrapped all 22 sidebars in semantic <Aside> blocks positioned after the parent paragraph and set /Tabs /S on all 96 pages."
          },
          {
            id: "11-001",
            clause: "ISO 14289-1 Clause 7.2",
            wcag: "WCAG 2.2 SC 3.1.1",
            category: "Natural Language Declaration",
            title: "Document /Catalog declares /Lang (en-US)",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "/Catalog dictionary lacks /Lang key.",
            evidenceAfter: "Declared /Lang (en-US) on root /Catalog object."
          },
          {
            id: "13-004",
            clause: "ISO 14289-1 Clause 7.3 & 7.8",
            wcag: "WCAG 2.2 SC 1.1.1",
            category: "<Formula> Spoken Math & <Figure> Alt-Text",
            title: "All 48 equations tagged as <Formula> with spoken /Alt & /ActualText; 14 circuit diagrams tagged as <Figure>",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "48 equations rendered as shattered Type-3 font glyphs; 14 vector circuit diagrams lack <Figure> tags and /Alt text.",
            evidenceAfter: "Tagged all 48 equations as <Formula> with spoken math /Alt and /ActualText strings, and all 14 diagrams as <Figure>."
          },
          {
            id: "14-003",
            clause: "ISO 14289-1 Clause 7.4.2",
            wcag: "WCAG 2.2 SC 1.3.1 & 2.4.6",
            category: "Numbered Heading Hierarchy",
            title: "Chapter sections, worked examples, and problem sets organized into strict <H1>–<H4> hierarchy",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "'Worked Example 8.1' callouts tagged as <H5> directly under <H2>, skipping <H3> and <H4>.",
            evidenceAfter: "Normalized all 114 headings into a continuous <H1>–<H4> hierarchy with zero skipped levels."
          },
          {
            id: "15-002",
            clause: "ISO 14289-1 Clause 7.5",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Table Headers & Scope Bindings",
            title: "Maxwell Equations summary table and 6 lab data tables tagged with <TH Scope=\"Column\"> and <TH Scope=\"Row\">",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "7 textbook reference and experimental data tables lack <Table> and <TH> /Scope attributes.",
            evidenceAfter: "Reconstructed all 7 tables with semantic <THead>/<TBody> and explicit <TH Scope=\"Column\"> and <TH Scope=\"Row\"> tags."
          },
          {
            id: "28-001",
            clause: "ISO 14289-1 Clause 7.18.1",
            wcag: "WCAG 2.2 SC 1.4.3 & 2.4.4",
            category: "End-of-Chapter Quiz Links & Contrast",
            title: "End-of-chapter QTI/SCORM answer links bound to <Link><OBJR>; callout contrast raised from 2.7:1 to 8.4:1",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "30 end-of-chapter solution hyperlinks lack <Link><OBJR> wrappers; light-blue equation badges fail contrast at 2.7:1.",
            evidenceAfter: "Bound all 30 internal/external links to <Link><OBJR> with /Contents and darkened callout ink to #0F3552 (8.4:1 contrast)."
          }
        ]
      },

      // =======================================================================
      // PACKET 6 (PRO): GOV-06 — MUNICIPAL INFRASTRUCTURE RFP & PROCUREMENT SPEC
      // =======================================================================
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
        riskLevel: "NON-COMPLIANT — MANDATORY PUBLIC SECTOR PORTAL REJECTION (SECTION 508 / EN 301 549)",
        remediatedStatus: "100% ISO 14289-1 (PDF/UA-1) & WCAG 2.2 AA VERIFIED",
        summary: "112-page municipal transit electrification Request for Proposals (RFP) and technical engineering specification blocked from publication on federal/municipal e-Procurement portals due to Section 508 and EN 301 549 Clause 10.2 violations. Features 224 legal Bates-number margin stamps and line-number gutters mixed into body paragraphs, 9 civil/electrical substation CAD single-line diagrams lacking <Figure> /Alt text, 14 vendor Bill of Quantities (BoQ) pricing tables lacking <TH> /Scope attributes, and missing PDF /Outlines navigation bookmarks required for documents exceeding 20 pages.",
        metadata: {
          before: {
            pdfuaid: "MISSING (Hard-blocked by municipal e-Procurement upload validator)",
            markInfo: "<< /Marked false >>",
            lang: "MISSING (No /Lang key on /Catalog)",
            displayDocTitle: "false",
            structTreeRoot: "NULL (112 pages of untagged Word + AutoCAD merged plates)",
            tabOrder: "/R (Scrambles multi-column legal clauses with margin line numbers 1-28)",
            contrastRatio: "2.5:1 FAIL (Gray #9E9E9E CAD title-block annotations on #FFFFFF)"
          },
          after: {
            pdfuaid: "pdfuaid:part=1 (ISO 14289-1:2014 & Section 508 / EN 301 549 certified)",
            markInfo: "<< /Marked true /Suspects false >>",
            lang: "(en-US) declared on /Catalog",
            displayDocTitle: "true (dc:title = 'RFP-2026-089: Metropolitan Transit Traction Power Grid Modernization')",
            structTreeRoot: "2,410 semantic nodes + complete /Outlines bookmark hierarchy",
            tabOrder: "/S (Structure order across all 112 specification and bid-form pages)",
            contrastRatio: "9.6:1 PASS (Remediated to #1B1C1E on #FFFFFF — WCAG 2.2 AA/AAA)"
          }
        },
        visualRegions: [
          {
            id: "GOV-06-REG-1",
            checkpointId: "01-006",
            tagType: "Artifact",
            page: 1,
            bbox: { top: 6, left: 6, width: 88, height: 12 },
            label: "Bates Stamp Header & Left-Margin Legal Line Numbers (1–28)",
            previewText: "BATES-RFP-2026-0001 // [Margin Line Numbers 1..28 Spliced Into Every Legal Sentence]",
            issueSummary: "Left-margin pleading line numbers (1 through 28) and top Bates stamps are merged directly into the text stream of every contract sentence ('14 The Contractor shall furnish 15 all switchgear...').",
            beforeTag: "Inline Text: '...shall furnish 15 all traction switchgear...'",
            afterTag: "/Artifact << /Type /Pagination /Subtype /Header >> BDC (Bates & Line Numbers) EMC"
          },
          {
            id: "GOV-06-REG-2",
            checkpointId: "13-004",
            tagType: "Figure",
            page: 24,
            bbox: { top: 22, left: 6, width: 88, height: 28 },
            label: "Plate E-104: 25 kV AC to 1500V DC Traction Substation Single-Line CAD Diagram",
            previewText: "[AutoCAD Vector Plate: Dual 25 kV Incoming Utility Feeders, SF6 Vacuum Circuit Breakers & 12-Pulse Transformer-Rectifier]",
            issueSummary: "Merged AutoCAD vector engineering plate contains 4,200 line segments and ungrouped callout text boxes with zero <Figure> tags or /Alt engineering summary.",
            beforeTag: "4,200 Raw AutoCAD Vector Paths (No <Figure>, /Alt: NULL)",
            afterTag: "<Figure BBox=[36 410 576 635] /Alt (Engineering Single-Line Diagram Plate E-104: Dual redundant 25 kV AC utility feeders enter through SF6 gas-insulated vacuum circuit breakers 52-1 and 52-2 into a 4.5 MVA 12-pulse cast-resin rectifier transformer, outputting 1500V DC to positive traction busbar and overhead catenary feeder breakers.)>"
          },
          {
            id: "GOV-06-REG-3",
            checkpointId: "15-002",
            tagType: "Table",
            page: 68,
            bbox: { top: 53, left: 6, width: 88, height: 24 },
            label: "Schedule B-2: Vendor Bill of Quantities (BoQ) & Unit Bid Pricing Schedule",
            previewText: "CSI MasterFormat Item | Technical Spec Section | Estimated Quantity & Unit | Bidder Unit Price ($) | Extended Total ($)",
            issueSummary: "14 procurement Bill of Quantities tables lack <Table> and <TH> /Scope attributes, preventing screen-reader-using contractors from submitting compliant public bids.",
            beforeTag: "Untagged Bid Schedule Grid (0 <TH> cells)",
            afterTag: "<Table><THead><TR><TH Scope=\"Column\">...</TH></TR></THead><TBody>...</TBody></Table>"
          },
          {
            id: "GOV-06-REG-4",
            checkpointId: "28-001",
            tagType: "Form",
            page: 104,
            bbox: { top: 80, left: 6, width: 88, height: 14 },
            label: "Vendor Non-Collusion Affidavit, DBE Certification & Bid Bond AcroForm",
            previewText: "UEI / SAM.gov Registration No. [____] | Bid Bond Surety Company [____] | Authorized Officer Signature [____]",
            issueSummary: "22 mandatory vendor bid submission AcroForm fields lack /TU accessible tooltips and <Form><OBJR> bindings; CAD title-block notes fail contrast at 2.5:1.",
            beforeTag: "/Widget << /FT /Tx /T (vendor_uei) /TU null >> (Contrast 2.5:1)",
            afterTag: "<Form><OBJR /T (vendor_uei) /TU (Enter 12-Character Federal SAM.gov Unique Entity Identifier UEI) /></Form> (Contrast 9.6:1)"
          }
        ],
        structTreeBefore: `%PDF-1.7
% [BEFORE REMEDIATION — UNTAGGED WORD + AUTOCAD MERGED RFP FAILING SECTION 508]
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  % ERROR [Matterhorn 01-006]: Untagged 112-page specification (/MarkInfo missing)
  % ERROR [Matterhorn 14-003]: No /Outlines bookmarks for 112-page procurement document
>>
endobj

19 0 obj
<< /Length 1350 >>
stream
  % Legal margin line numbers 1..28 and Bates numbers concatenated into contract clauses
  BT /F1 9 Tf 18 700 Td (14) Tj 36 700 Td (The Contractor shall furnish and test) Tj ET
  BT /F1 9 Tf 18 686 Td (15) Tj 36 686 Td (all 1500V DC traction power switchgear.) Tj ET
  % 4,200 ungrouped AutoCAD vector lines on Plate E-104 with no <Figure> wrapper
  36 410 m 576 410 l 576 635 l 36 635 l h S
endstream
endobj`,
        structTreeAfter: `%PDF-1.7
% [AFTER REMEDIATION — SECTION 508 & EN 301 549 CERTIFIED PROCUREMENT AST]
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
  /Lang (en-US)
  /MarkInfo << /Marked true /Suspects false >>
  /ViewerPreferences << /DisplayDocTitle true >>
  /PageMode /UseOutlines
  /Outlines 15 0 R
  /Metadata 10 0 R
  /StructTreeRoot 20 0 R
>>
endobj

20 0 obj
<<
  /Type /StructTreeRoot
  /K [
    <<
      /Type /StructElem
      /S /Document
      /Lang (en-US)
      /K [
        << /Type /StructElem /S /H1 /T (Division 01: General Procurement Conditions) /K [0] >>
        << /Type /StructElem /S /H2 /T (Section 26 12 19: Traction Power Transformer-Rectifiers) /K [1] >>
        <<
          /Type /StructElem
          /S /Figure
          /Alt (Engineering Single-Line Diagram Plate E-104: Dual redundant 25 kV AC utility feeders enter through SF6 gas-insulated vacuum circuit breakers 52-1 and 52-2 into a 4.5 MVA 12-pulse cast-resin rectifier transformer, outputting 1500V DC to positive traction busbar and overhead catenary feeder breakers.)
          /A << /O /Layout /BBox [36 410 576 635] >>
          /K [2]
        >>
      ]
    >>
  ]
>>
endobj`,
        tables: [
          {
            id: "GOV-06-TBL-1",
            title: "Schedule B-2: Bill of Quantities (BoQ) — Division 26 Traction Power Equipment",
            page: 68,
            summaryIssue: "Remediated 14 procurement pricing schedules with <TH Scope=\"Column\"> and <TH Scope=\"Row\"> headers and bound interactive unit-price AcroForm cells to <Form><OBJR> tags.",
            headers: [
              "CSI MasterFormat Code",
              "Equipment & Work Description",
              "Quantity & Unit",
              "Engineer Baseline Estimate ($)"
            ],
            rows: [
              ["26 12 19.13", "4.5 MVA 12-Pulse Cast-Resin Traction Rectifier Transformer (25 kV AC / 1500V DC)", "4 Assemblies (EA)", "$1,840,000.00"],
              ["26 13 16.00", "Medium-Voltage 25 kV SF6 Gas-Insulated Vacuum Circuit Breaker Switchgear Lineup", "2 Lineups (LS)", "$1,120,000.00"],
              ["26 33 53.00", "Substation Class 125V DC Nickel-Cadmium Control Battery Bank & Dual Chargers", "4 Systems (EA)", "$360,000.00"],
              ["26 09 13.00", "IEC 61850 Fiber-Optic SCADA Telemetry & Protective Relaying Integration", "1 Lump Sum (LS)", "$690,000.00"]
            ],
            beforeMarkup: `<P>CSI MasterFormat Code Equipment & Work Description Quantity & Unit Engineer Baseline Estimate</P>
<P>26 12 19.13 4.5 MVA 12-Pulse Cast-Resin Traction Rectifier Transformer 4 Assemblies $1,840,000.00</P>`,
            afterMarkup: `<Table Summary="Schedule B-2 Bill of Quantities for Division 26 Traction Power Equipment listing CSI MasterFormat codes, item descriptions, quantities, and baseline estimates.">
  <THead>
    <TR>
      <TH Scope="Column" ID="th_csi">CSI MasterFormat Code</TH>
      <TH Scope="Column" ID="th_desc">Equipment &amp; Work Description</TH>
      <TH Scope="Column" ID="th_qty">Quantity &amp; Unit</TH>
      <TH Scope="Column" ID="th_est">Engineer Baseline Estimate ($)</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TH Scope="Row" ID="th_csi_1" Headers="th_csi">26 12 19.13</TH>
      <TD Headers="th_csi_1 th_desc">4.5 MVA 12-Pulse Cast-Resin Traction Rectifier Transformer (25 kV AC / 1500V DC)</TD>
      <TD Headers="th_csi_1 th_qty">4 Assemblies (EA)</TD>
      <TD Headers="th_csi_1 th_est">$1,840,000.00</TD>
    </TR>
  </TBody>
</Table>`
          }
        ],
        figures: [
          {
            id: "GOV-06-FIG-1",
            title: "Plate E-104: 25 kV AC / 1500V DC Traction Substation Single-Line Schematic",
            page: 24,
            bboxLabel: "Page 24 // BBox [36, 410, 576, 635]",
            beforeAlt: "MISSING (4,200 ungrouped AutoCAD vector lines)",
            afterAlt: "Engineering Single-Line Diagram Plate E-104: Dual redundant 25 kV AC utility feeders enter through SF6 gas-insulated vacuum circuit breakers 52-1 and 52-2 into a 4.5 MVA 12-pulse cast-resin rectifier transformer, outputting 1500V DC to positive traction busbar and overhead catenary feeder breakers."
          },
          {
            id: "GOV-06-FIG-2",
            title: "Plate C-201: Underground Duct Bank Cross-Section & Stray Current Grounding Grid",
            page: 51,
            bboxLabel: "Page 51 // BBox [36, 280, 576, 540]",
            beforeAlt: "duct_bank_detail_revC.dwg",
            afterAlt: "Civil cross-sectional drawing Plate C-201 of a reinforced concrete underground electrical duct bank showing six 150 mm Schedule-80 PVC power conduits encased in 3,000 psi red-dyed concrete at a minimum burial depth of 915 mm below rail grade, bonded to a #4/0 AWG bare copper stray-current mitigation ground mat."
          }
        ],
        checkpoints: [
          {
            id: "01-006",
            clause: "ISO 14289-1 Clause 7.1",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Bates Stamps & Margin Line Artifacts",
            title: "224 Bates stamps and 3,136 margin line numbers (1–28) stripped from sentences and marked as /Artifact",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "Left-margin legal line numbers 1–28 and top Bates stamps read aloud inside the middle of every contract sentence across 112 pages.",
            evidenceAfter: "Isolated all 3,136 margin line numbers and 224 Bates headers into /Artifact << /Type /Pagination >> containers."
          },
          {
            id: "06-001",
            clause: "ISO 14289-1 Clause 5 & 7.1",
            wcag: "EN 301 549 Clause 10.2",
            category: "XMP Metadata Stream",
            title: "XMP metadata packet declares pdfuaid:part=1 to pass municipal e-Procurement upload gate",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "Merged Word/AutoCAD PDF lacks pdfuaid XMP declaration; rejected by public procurement portal.",
            evidenceAfter: "Injected valid ISO 14289-1 XMP stream with <pdfuaid:part>1</pdfuaid:part> and /DisplayDocTitle true."
          },
          {
            id: "09-003",
            clause: "ISO 14289-1 Clause 7.2 & 7.18.3",
            wcag: "WCAG 2.2 SC 1.3.2 & 2.4.3",
            category: "CAD Callout & Bid Form Tab Order",
            title: "CAD plate title blocks and multi-column CSI specifications ordered logically with /Tabs /S",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "CAD drawing notes read in random layer-export sequence; all 112 pages use /Tabs /R.",
            evidenceAfter: "Ordered all CAD plate notes sequentially and set /Tabs /S on all 112 Page dictionaries."
          },
          {
            id: "11-001",
            clause: "ISO 14289-1 Clause 7.2",
            wcag: "WCAG 2.2 SC 3.1.1",
            category: "Natural Language Declaration",
            title: "Document /Catalog declares /Lang (en-US)",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "/Catalog dictionary omits /Lang entry.",
            evidenceAfter: "Declared /Lang (en-US) on root /Catalog object."
          },
          {
            id: "13-004",
            clause: "ISO 14289-1 Clause 7.3",
            wcag: "WCAG 2.2 SC 1.1.1",
            category: "Engineering CAD Plate Alternative Text",
            title: "All 9 AutoCAD single-line and civil cross-section plates enclosed in <Figure> with engineering /Alt",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "9 merged AutoCAD vector plates contain thousands of ungrouped paths with zero <Figure> tags or /Alt text.",
            evidenceAfter: "Grouped each of the 9 AutoCAD plates into a single <Figure> element with comprehensive PE-reviewed /Alt descriptions."
          },
          {
            id: "14-003",
            clause: "ISO 14289-1 Clause 7.4.2 & 7.10",
            wcag: "WCAG 2.2 SC 1.3.1 & 2.4.5",
            category: "CSI Heading Hierarchy & /Outlines Bookmarks",
            title: "148 CSI MasterFormat Divisions/Sections tagged as <H1>–<H4> and mirrored to PDF /Outlines bookmarks",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "112-page RFP has zero <H1>–<H4> tags and zero PDF bookmarks (/Outlines), failing Section 508 navigation rules.",
            evidenceAfter: "Tagged all 148 CSI MasterFormat headings (<H1>–<H4>) and generated a 3-level interactive /Outlines bookmark tree."
          },
          {
            id: "15-002",
            clause: "ISO 14289-1 Clause 7.5",
            wcag: "WCAG 2.2 SC 1.3.1",
            category: "Bill of Quantities Table Scope",
            title: "14 Bill of Quantities (BoQ) and milestone tables tagged with <TH Scope=\"Column\"> and <TH Scope=\"Row\">",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "CRITICAL",
            evidenceBefore: "14 procurement pricing tables lack <Table> and <TH> tags.",
            evidenceAfter: "Reconstructed all 14 BoQ pricing schedules into semantic <Table> structures with explicit /Scope and /Headers bindings."
          },
          {
            id: "28-001",
            clause: "ISO 14289-1 Clause 7.18.1",
            wcag: "WCAG 2.2 SC 1.4.3 & 3.3.2",
            category: "Vendor Bid AcroForms & CAD Contrast",
            title: "22 vendor affidavit/bond AcroForm fields bound to <Form><OBJR> with /TU; CAD note contrast raised to 9.6:1",
            statusBefore: "FAIL",
            statusAfter: "PASS",
            severity: "HIGH",
            evidenceBefore: "22 fillable bidder certification fields lack /TU tooltips; gray CAD title-block annotations fail contrast at 2.5:1.",
            evidenceAfter: "Bound all 22 bidder fields to <Form><OBJR> with /TU descriptions and darkened CAD annotations to #1B1C1E (9.6:1 contrast)."
          }
        ]
      }
    ]
  };

  if (typeof window !== "undefined") {
    window.DOCUSHIELD_DATA = DOCUSHIELD_DATA;
  }
  if (typeof root !== "undefined") {
    root.DOCUSHIELD_DATA = DOCUSHIELD_DATA;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = DOCUSHIELD_DATA;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
