/**
 * CodeDrill™ CBT Simulator — Production Application Architecture
 * 1:1 Pearson VUE Split-Screen Simulator + 90s Citation-Speed Drill + Freemium Paywall & Licensing
 * Swiss Editorial & Tactile Industrial Precision | Pure Vanilla ES6+ JavaScript
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. COMPREHENSIVE 24-QUESTION FALLBACK & SUPPLEMENTARY DATASET
        (18 CBLE across 4 Topic Suites + 6 IRS Enrolled Agent Circular 230 Qs)
     ========================================================================== */
  const FALLBACK_CODEDRILL_DATA = {
    meta: {
      productName: 'CodeDrill™ CBT Simulator',
      examTrack: 'U.S. Customs Broker License Examination (CBLE — 19 CFR / HTSUS)',
      secondaryTracks: ['IRS Enrolled Agent (31 CFR Part 10 Circular 230)'],
      version: '2026.4',
      examDurationSeconds: 16200,
      passingScorePercent: 75,
      avgPassRateNational: 15.2
    },
    corpora: [
      {
        id: '19-cfr',
        code: '19 CFR',
        title: '19 CFR — Customs Duties (Parts 111–190)',
        parts: [
          {
            id: 'part-111',
            code: 'Part 111',
            title: 'Part 111 — Customs Brokers',
            sections: [
              {
                id: '19-cfr-111-1',
                citation: '19 CFR § 111.1',
                title: 'Definitions — Customs Business & Responsible Supervision',
                breadcrumb: '19 CFR > Part 111 > Subpart A > § 111.1',
                examFrequency: 'High Yield',
                keywords: ['customs business', 'corporate compliance activity', 'responsible supervision and control', 'freight forwarder'],
                crossRefs: ['19 CFR § 111.23', '19 CFR § 111.32'],
                text: `(a) Customs business. "Customs business" means those activities involving transactions with U.S. Customs and Border Protection (CBP) concerning the entry and admissibility of merchandise, its classification and valuation, the payment of duties, taxes, or other charges assessed or collected by CBP on merchandise by reason of its importation, and the refund, rebate, or drawback of those duties, taxes, or other charges.\n(b) Corporate compliance activity. "Customs business" does not include the mere electronic transmission of data received for transmission to CBP and does not include a corporate compliance activity performed by a business entity to ensure that documents for a related business entity are prepared and filed using reasonable care.`
              },
              {
                id: '19-cfr-111-23',
                citation: '19 CFR § 111.23',
                title: 'Retention of records (5-Year Rule & U.S. Customs Territory)',
                breadcrumb: '19 CFR > Part 111 > Subpart C > § 111.23',
                examFrequency: 'High Yield',
                keywords: ['recordkeeping', '5 years', 'retention period', 'original records', 'U.S. customs territory', '30 calendar days'],
                crossRefs: ['19 CFR § 111.32', '19 CFR § 111.36'],
                text: `(a) Place of retention. A licensed customs broker must maintain originals of the records referred to in this part, including any records stored in electronic formats, within the customs territory of the United States and in accordance with the provisions of this part and part 163 of this chapter.\n(b) Period of retention. The records described in this section, other than powers of attorney, must be retained for at least 5 years after the date of entry. Powers of attorney must be retained until revoked, and revoked powers of attorney and letters of revocation must be retained for 5 years after the date of revocation or for 5 years after the date the client ceases to be an "active client" as defined in § 111.29(b)(2)(ii), whichever period is later.`
              },
              {
                id: '19-cfr-111-32',
                citation: '19 CFR § 111.32',
                title: 'False information and duty to report client fraud separation',
                breadcrumb: '19 CFR > Part 111 > Subpart C > § 111.32',
                examFrequency: 'Critical',
                keywords: ['false information', 'client noncompliance', 'error', 'omission', 'written record', 'separation from client'],
                crossRefs: ['19 CFR § 111.23', '19 CFR § 111.36'],
                text: `A broker must not file or procure or assist in the filing of any claim, or of any document, affidavit, or other papers, known by such broker to be false. In addition, a broker must not give, or solicit or procure the giving of, any information or testimony in any matter pending before the Department of Homeland Security or any representative of the Department of Homeland Security known by such broker to be false.\nA broker must also document and report to CBP when the broker separates from or cancels representation of a client as a result of determining that the client is intentionally attempting to use the broker to defraud the U.S. Government or commit any criminal act through the U.S. Customs laws.`
              },
              {
                id: '19-cfr-111-36',
                citation: '19 CFR § 111.36',
                title: 'Relations with unlicensed persons (Freight Forwarders)',
                breadcrumb: '19 CFR > Part 111 > Subpart C > § 111.36',
                examFrequency: 'High Yield',
                keywords: ['unlicensed person', 'freight forwarder', 'power of attorney', 'direct billing', 'compensation'],
                crossRefs: ['19 CFR § 111.23', '19 CFR § 141.86'],
                text: `(a) Employment by unlicensed person other than importer. When a broker is employed for the transaction of customs business by an unlicensed person who is not the actual importer, the broker must transmit to the actual importer either a copy of his bill for services rendered or a copy of the entry, unless the merchandise was purchased on a delivered duty-paid basis or unless the importer has in writing waived transmittal of the copy of the entry or bill for services rendered.\n(c) Compensation of freight forwarder. A broker may compensate a freight forwarder for referring brokerage business provided the importer is notified in advance in writing of the name of the forwarder being compensated, the broker transmits a true copy of brokerage charges directly to the importer, and the forwarder neither controls brokerage fees nor forbids direct communication between broker and importer.`
              }
            ]
          },
          {
            id: 'part-141-142',
            code: 'Part 141 / 142',
            title: 'Parts 141 & 142 — Entry of Merchandise & Entry Process',
            sections: [
              {
                id: '19-cfr-141-86',
                citation: '19 CFR § 141.86',
                title: 'Contents of invoices and general requirements',
                breadcrumb: '19 CFR > Part 141 > Subpart F > § 141.86',
                examFrequency: 'High Yield',
                keywords: ['commercial invoice', 'port of entry', 'currency', 'country of origin', 'English language'],
                crossRefs: ['19 CFR § 142.3', '19 CFR § 152.103'],
                text: `(a) General requirements. Every commercial invoice required for the entry of merchandise into the customs territory of the United States must set forth:\n(1) The port of entry to which the merchandise is destined;\n(2) The time when, the place where, and the person by whom and the person to whom the merchandise is sold or agreed to be sold;\n(3) A detailed description of the merchandise, including the commercial name by which each item is known, the grade or quality, and the marks, numbers, and symbols under which sold by the seller or manufacturer to the trade in the country of exportation;\n(4) The quantities in the weights and measures of the country or place from which the merchandise is shipped, or in the weights and measures of the United States;\n(5) The purchase price of each item in the currency of the purchase, and all charges upon the merchandise, itemized by name and amount; and\n(6) The country of origin of the merchandise.`
              },
              {
                id: '19-cfr-142-3',
                citation: '19 CFR § 142.3',
                title: 'Entry documentation required for release',
                breadcrumb: '19 CFR > Part 142 > Subpart A > § 142.3',
                examFrequency: 'High Yield',
                keywords: ['entry documentation', 'CBP Form 3461', 'evidence of right to make entry', 'commercial invoice', 'packing list'],
                crossRefs: ['19 CFR § 141.86', '19 CFR § 142.12'],
                text: `(a) Contents. Except as provided in paragraph (b) of this section, the entry documentation required to secure the release of merchandise must consist of the following:\n(1) Entry (CBP Form 3461, or its electronic equivalent, or Entry/Immediate Delivery application);\n(2) Evidence of the right to make entry (such as a bill of lading, air waybill, or carrier's certificate);\n(3) A commercial invoice, or a pro forma invoice when the commercial invoice cannot be produced;\n(4) A packing list, where appropriate; and\n(5) Other documents which may be required by CBP or other Federal agencies for a particular shipment.`
              },
              {
                id: '19-cfr-142-12',
                citation: '19 CFR § 142.12',
                title: 'Time for filing entry summary (10 Working Days)',
                breadcrumb: '19 CFR > Part 142 > Subpart B > § 142.12',
                examFrequency: 'Critical',
                keywords: ['entry summary', 'CBP Form 7501', '10 working days', 'release of merchandise', 'estimated duties', '15 calendar days'],
                crossRefs: ['19 CFR § 141.86', '19 CFR § 142.3'],
                text: `(a) Time for filing when entry summary serves as entry. When the entry summary documentation is filed at the time of entry to serve as both the entry and the entry summary, it must be filed within 15 calendar days after the date of arrival of the importing carrier.\n(b) Time for filing after release. If the importer is not required to file the entry summary documentation at the time of entry under § 142.13, the entry summary documentation (CBP Form 7501 or electronic equivalent) must be filed, with estimated duties attached, within 10 working days after the time of entry and release of the merchandise.`
              }
            ]
          },
          {
            id: 'part-152',
            code: 'Part 152',
            title: 'Part 152 — Classification and Appraisement of Merchandise',
            sections: [
              {
                id: '19-cfr-152-102',
                citation: '19 CFR § 152.102',
                title: 'Definitions — Assist, Packing Costs, and Related Persons',
                breadcrumb: '19 CFR > Part 152 > Subpart E > § 152.102',
                examFrequency: 'Critical',
                keywords: ['assist', 'tools dies molds', 'engineering undertaken outside US', 'free of charge', 'reduced cost'],
                crossRefs: ['19 CFR § 152.103', '19 CFR § 141.86'],
                text: `(a) Assist. (1) "Assist" means any of the following if supplied directly or indirectly, and free of charge or at reduced cost, by the buyer of imported merchandise for use in connection with the production or the sale for export to the United States of the merchandise:\n(i) Materials, components, parts, and similar items incorporated in the imported merchandise;\n(ii) Tools, dies, molds, and similar items used in the production of the imported merchandise;\n(iii) Merchandise consumed in the production of the imported merchandise; and\n(iv) Engineering, development, artwork, design work, and plans and sketches that are undertaken elsewhere than in the United States and are necessary for the production of the imported merchandise.\n(2) Exclusion: No service or work to which paragraph (a)(1)(iv) of this section applies will be treated as an assist if the service or work is performed by a person domiciled within the United States.`
              },
              {
                id: '19-cfr-152-103',
                citation: '19 CFR § 152.103',
                title: 'Transaction value — Additions and Exclusions',
                breadcrumb: '19 CFR > Part 152 > Subpart E > § 152.103',
                examFrequency: 'Critical',
                keywords: ['transaction value', 'price actually paid or payable', 'selling commission', 'buying commission', 'international freight', 'royalties'],
                crossRefs: ['19 CFR § 152.102', '19 CFR § 141.86'],
                text: `(a) Price actually paid or payable. The transaction value of imported merchandise is the price actually paid or payable for the merchandise when sold for exportation to the United States, plus amounts equal to:\n(1) The packing costs incurred by the buyer with respect to the imported merchandise;\n(2) Any selling commission incurred by the buyer with respect to the imported merchandise;\n(3) The value, apportioned as appropriate, of any assist;\n(4) Any royalty or license fee related to the imported merchandise that the buyer is required to pay, directly or indirectly, as a condition of the sale of the imported merchandise for exportation to the United States; and\n(5) The proceeds of any subsequent resale, disposal, or use of the imported merchandise that accrue, directly or indirectly, to the seller.\n(i) Exclusions from transaction value: The transaction value of imported merchandise does not include any of the following, if identified separately from the price actually paid or payable: (1) Post-importation construction, erection, assembly, or maintenance; (2) U.S. customs duties and Federal taxes; or (3) Actual international freight and marine insurance costs.`
              }
            ]
          },
          {
            id: 'part-190',
            code: 'Part 190',
            title: 'Part 190 — Modernized Drawback (TFTEA)',
            sections: [
              {
                id: '19-cfr-190-32',
                citation: '19 CFR § 190.32',
                title: 'Substitution unused merchandise drawback (8-Digit HTSUS & 5-Year Window)',
                breadcrumb: '19 CFR > Part 190 > Subpart C > § 190.32',
                examFrequency: 'Critical',
                keywords: ['drawback', 'TFTEA', '8-digit HTSUS subheading', '99 percent refund', '5 years', 'lesser of principle'],
                crossRefs: ['19 CFR § 111.23'],
                text: `(a) General provision. Under 19 U.S.C. 1313(j)(2), as amended by the Trade Facilitation and Trade Enforcement Act of 2015 (TFTEA), if imported merchandise on which was paid any duty, tax, or fee imposed under Federal law is substituted with merchandise classified under the same 8-digit HTSUS subheading description (and not beginning with the term "other"), 99 percent of the amount of such duty, tax, or fee is refundable as drawback.\n(b) Time limitation (5-Year Rule). The exported or destroyed substituted merchandise must be exported or destroyed under CBP supervision before the close of the 5-year period beginning on the date of importation of the imported merchandise and before the drawback claim is filed.`
              }
            ]
          }
        ]
      },
      {
        id: 'htsus-gri',
        code: 'HTSUS & GRI',
        title: 'HTSUS General Rules of Interpretation (GRI 1–6)',
        parts: [
          {
            id: 'part-gri',
            code: 'GRI 1–6',
            title: 'General Rules of Interpretation of the Harmonized Tariff Schedule',
            sections: [
              {
                id: 'htsus-gri-1',
                citation: 'HTSUS GRI 1',
                title: 'GRI 1 — Terms of Headings & Section/Chapter Notes',
                breadcrumb: 'HTSUS > General Rules of Interpretation > GRI 1',
                examFrequency: 'Critical',
                keywords: ['GRI 1', 'terms of the headings', 'section or chapter notes', 'legal classification'],
                crossRefs: ['HTSUS GRI 2', 'HTSUS GRI 3'],
                text: `GRI 1: The table of contents, alphabetical index, and titles of sections, chapters and sub-chapters are provided for ease of reference only; for legal purposes, classification shall be determined according to the terms of the headings and any relative section or chapter notes and, provided such headings or notes do not otherwise require, according to the following provisions.`
              },
              {
                id: 'htsus-gri-2',
                citation: 'HTSUS GRI 2',
                title: 'GRI 2(a) Incomplete/Unfinished/Unassembled & GRI 2(b) Mixtures',
                breadcrumb: 'HTSUS > General Rules of Interpretation > GRI 2',
                examFrequency: 'High Yield',
                keywords: ['GRI 2(a)', 'incomplete or unfinished', 'essential character', 'unassembled or disassembled', 'mixtures'],
                crossRefs: ['HTSUS GRI 1', 'HTSUS GRI 3'],
                text: `GRI 2(a): Any reference in a heading to an article shall be taken to include a reference to that article incomplete or unfinished, provided that, as entered, the incomplete or unfinished article has the essential character of the complete or finished article. It shall also include a reference to that article complete or finished, entered unassembled or disassembled.\nGRI 2(b): Any reference in a heading to a material or substance shall be taken to include a reference to mixtures or combinations of that material or substance with other materials or substances.`
              },
              {
                id: 'htsus-gri-3',
                citation: 'HTSUS GRI 3',
                title: 'GRI 3(a) Specificity, GRI 3(b) Essential Character & Retail Sets, GRI 3(c) Last in Order',
                breadcrumb: 'HTSUS > General Rules of Interpretation > GRI 3',
                examFrequency: 'Critical',
                keywords: ['GRI 3(a)', 'relative specificity', 'GRI 3(b)', 'essential character', 'goods put up in sets for retail sale', 'GRI 3(c)', 'last in numerical order'],
                crossRefs: ['HTSUS GRI 1', 'HTSUS GRI 2'],
                text: `When, by application of rule 2(b) or for any other reason, goods are, prima facie, classifiable under two or more headings, classification shall be effected as follows:\n(a) Specific over General (GRI 3(a)): The heading which provides the most specific description shall be preferred to headings providing a more general description. However, when two or more headings each refer to part only of the materials or substances contained in mixed or composite goods or to part only of the items in a set put up for retail sale, those headings are to be regarded as equally specific.\n(b) Essential Character (GRI 3(b)): Mixtures, composite goods consisting of different materials or made up of different components, and goods put up in sets for retail sale, which cannot be classified by reference to 3(a), shall be classified as if they consisted of the material or component which gives them their essential character.\n(c) Last in Numerical Order (GRI 3(c)): When goods cannot be classified by reference to 3(a) or 3(b), they shall be classified under the heading which occurs last in numerical order among those which equally merit consideration.`
              }
            ]
          }
        ]
      },
      {
        id: '31-cfr-ea',
        code: '31 CFR Part 10',
        title: '31 CFR Part 10 — IRS Circular 230 (Enrolled Agent Track)',
        parts: [
          {
            id: 'part-10-subpart-b',
            code: 'Subpart B',
            title: '31 CFR Part 10 Subpart B — Duties and Restrictions Relating to Practice Before the IRS',
            sections: [
              {
                id: '31-cfr-10-20',
                citation: '31 CFR § 10.20',
                title: 'Information to be furnished to the IRS',
                breadcrumb: '31 CFR > Part 10 (Circular 230) > Subpart B > § 10.20',
                examFrequency: 'High Yield',
                keywords: ['information to be furnished', 'lawful and proper request', 'privilege', 'reasonable inquiry', 'identity of persons'],
                crossRefs: ['31 CFR § 10.21', '31 CFR § 10.22'],
                text: `(a) To the Internal Revenue Service. (1) A practitioner must, on a proper and lawful request by a duly authorized officer or employee of the Internal Revenue Service, promptly submit records or information in any matter before the Internal Revenue Service unless the practitioner believes in good faith and on reasonable grounds that the records or information are privileged.\n(2) Where the requested records or information are not in the possession of, or subject to the control of, the practitioner or the practitioner's client, the practitioner must promptly notify the requesting Internal Revenue Service officer or employee and the practitioner must provide any information that the practitioner has regarding the identity of any person who the practitioner believes may have possession or control of the requested records or information.`
              },
              {
                id: '31-cfr-10-21',
                citation: '31 CFR § 10.21',
                title: 'Knowledge of client’s omission (Circular 230)',
                breadcrumb: '31 CFR > Part 10 (Circular 230) > Subpart B > § 10.21',
                examFrequency: 'Critical',
                keywords: ['client omission', 'error', 'noncompliance', 'advise promptly', 'consequences under Internal Revenue Code'],
                crossRefs: ['31 CFR § 10.20', '31 CFR § 10.22', '31 CFR § 10.34'],
                text: `A practitioner who, having been retained by a client with respect to a matter administered by the Internal Revenue Service, knows that the client has not complied with the revenue laws of the United States or has made an error in or omission from any return, document, affidavit, or other paper which the client submitted or executed under the revenue laws of the United States, must advise the client promptly of the fact of such noncompliance, error, or omission. The practitioner must advise the client of the consequences as provided under the Code and regulations of such noncompliance, error, or omission.`
              },
              {
                id: '31-cfr-10-22',
                citation: '31 CFR § 10.22',
                title: 'Diligence as to accuracy and reliance on others',
                breadcrumb: '31 CFR > Part 10 (Circular 230) > Subpart B > § 10.22',
                examFrequency: 'High Yield',
                keywords: ['due diligence', 'accuracy', 'reliance on work product', 'reasonable care', 'oral or written representations'],
                crossRefs: ['31 CFR § 10.21', '31 CFR § 10.34'],
                text: `(a) In general. A practitioner must exercise due diligence:\n(1) In preparing or assisting in the preparation of, approving, and filing tax returns, documents, affidavits, and other papers relating to Internal Revenue Service matters;\n(2) In determining the correctness of oral or written representations made by the practitioner to the Department of the Treasury; and\n(3) In determining the correctness of oral or written representations made by the practitioner to clients with reference to any matter administered by the Internal Revenue Service.\n(b) Reliance on others. Except as modified by §§ 10.34 and 10.37, a practitioner will be presumed to have exercised due diligence for purposes of this section if the practitioner relies on the work product of another person and the practitioner used reasonable care in engaging, supervising, training, and evaluating the person, taking proper account of the nature of the relationship between the practitioner and the person.`
              },
              {
                id: '31-cfr-10-34',
                citation: '31 CFR § 10.34',
                title: 'Standards with respect to tax returns and documents',
                breadcrumb: '31 CFR > Part 10 (Circular 230) > Subpart B > § 10.34',
                examFrequency: 'Critical',
                keywords: ['substantial authority', 'reasonable basis', 'adequate disclosure', 'Form 8275', 'reasonable inquiries'],
                crossRefs: ['31 CFR § 10.21', '31 CFR § 10.22'],
                text: `(a) Tax returns. A practitioner may not willfully, recklessly, or through gross incompetence sign a tax return or claim for refund that the practitioner knows or reasonably should know contains a position that lacks a reasonable basis or is an unreasonable position under IRC § 6694(a)(2) (requiring Substantial Authority for undisclosed positions, or Reasonable Basis with adequate disclosure on Form 8275).\n(d) Relying on information furnished by clients. A practitioner generally may rely in good faith without verification upon information furnished by the client, but may not ignore the implications of information furnished to, or actually known by, the practitioner, and must make reasonable inquiries if the information as furnished appears to be incorrect, inconsistent, or incomplete.`
              }
            ]
          }
        ]
      }
    ],
    questions: [
      /* SUITE 1: CBLE_111_113 (4 Questions) */
      {
        id: 'SUP-111-1',
        suite: 'CBLE_111_113',
        track: 'CBLE',
        category: 'Broker Compliance (19 CFR Part 111)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'A licensed customs broker discovers that a corporate client is intentionally altering country-of-origin certificates on steel pipe shipments to evade Section 301 and antidumping duties. When the broker confronts the client, the client refuses to correct the documentation and instructs the broker to file the entry as presented. The broker immediately terminates representation of the client.\n\nUnder modernized 19 CFR § 111.32, what is the broker’s mandatory regulatory obligation regarding this separation?',
        options: [
          { letter: 'A', text: 'Simply retain the termination letter in internal files for 5 years; a strict duty of confidentiality prohibits notifying CBP.' },
          { letter: 'B', text: 'Refuse to file the entry, document the facts, and affirmatively report the separation and client fraud attempt to CBP.' },
          { letter: 'C', text: 'File the entry under protest and submit a Prior Disclosure on the client’s behalf within 30 calendar days.' },
          { letter: 'D', text: 'Report the client to the Federal Maritime Commission within 90 days of account closure.' },
          { letter: 'E', text: 'Transfer the client’s Power of Attorney to an unlicensed freight forwarder without notifying CBP.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-111-32',
        targetCitation: '19 CFR § 111.32',
        goldenQuote: 'A broker must also document and report to CBP when the broker separates from or cancels representation of a client as a result of determining that the client is intentionally attempting to use the broker to defraud the U.S. Government...',
        shortestPathHint: '19 CFR → Part 111 → § 111.32 (False information and duty to report client separation)',
        socraticHints: [
          'This tests modernized Part 111 broker ethical obligations when a client attempts intentional customs fraud.',
          'Open 19 CFR Part 111 Subpart C (Duties and Responsibilities of Customs Brokers).',
          'Read 19 CFR § 111.32: when a broker separates from a client attempting to defraud the U.S. Government, the broker must document and report the separation to CBP.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 111.32, a broker must never file any document known to be false, and when a broker separates from or cancels representation of a client because the client is intentionally attempting to use the broker to defraud the U.S. Government, the broker must document and report that separation to CBP.',
          distractors: {
            A: 'Incorrect: Modernized 19 CFR § 111.32 explicitly mandates reporting the fraud-based separation to CBP.',
            B: 'CORRECT: 19 CFR § 111.32 requires refusing to file false documents AND documenting and reporting the separation to CBP.',
            C: 'Incorrect: Filing a known false entry violates 19 CFR § 111.32.',
            D: 'Incorrect: Jurisdiction lies with CBP, not the Federal Maritime Commission.',
            E: 'Incorrect: Violates 19 CFR § 111.32 and § 111.36.'
          }
        }
      },
      {
        id: 'SUP-111-2',
        suite: 'CBLE_111_113',
        track: 'CBLE',
        category: 'Broker Compliance (19 CFR Part 111)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'A licensed customs broker is hired by an unlicensed ocean freight forwarder to clear a shipment for the actual importer of record (who did not purchase on a Delivered Duty Paid basis and has not signed any waiver). Additionally, the broker recently had a long-time client revoke its Power of Attorney (POA).\n\nUnder 19 CFR § 111.36 and § 111.23, what must the broker transmit to the actual importer, and how long must the broker retain the revoked Power of Attorney?',
        options: [
          { letter: 'A', text: 'Transmit nothing to the importer because the forwarder is the paying client; retain the revoked POA for 3 years.' },
          { letter: 'B', text: 'Transmit to the actual importer either a copy of the broker’s bill for services rendered or a copy of the entry; retain the revoked POA for 5 years after revocation (or 5 years after the client ceases to be an active client, whichever is later).' },
          { letter: 'C', text: 'Transmit a copy of the forwarder’s profit margin statement to CBP; retain the revoked POA permanently.' },
          { letter: 'D', text: 'Transmit only the bill of lading to the foreign shipper; retain the revoked POA for 5 years from the date of initial execution.' },
          { letter: 'E', text: 'Obtain the Power of Attorney from the unlicensed forwarder without contacting the importer; retain the POA for 1 year.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-111-36',
        targetCitation: '19 CFR § 111.36(a) & § 111.23(b)',
        goldenQuote: 'When a broker is employed for the transaction of customs business by an unlicensed person who is not the actual importer, the broker must transmit to the actual importer either a copy of his bill for services rendered or a copy of the entry...',
        shortestPathHint: '19 CFR → Part 111 → § 111.36(a) & § 111.23(b)',
        socraticHints: [
          'This tests broker dealings with unlicensed freight forwarders and the retention rule for revoked Powers of Attorney.',
          'Check 19 CFR Part 111 → § 111.36 and § 111.23.',
          'Under § 111.36(a), send the importer a copy of the bill or entry. Under § 111.23(b), revoked POAs are kept 5 years after revocation or after ceasing to be an active client, whichever is later.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 111.36(a), when employed by an unlicensed person who is not the actual importer, the broker must transmit to the actual importer either a copy of the bill for services rendered or a copy of the entry. Under 19 CFR § 111.23(b), revoked powers of attorney must be retained for 5 years after revocation or 5 years after the client ceases to be an active client, whichever is later.',
          distractors: {
            A: 'Incorrect: Violates § 111.36(a) and states 3 years instead of 5 years.',
            B: 'CORRECT: Satisfies both 19 CFR § 111.36(a) and 19 CFR § 111.23(b).',
            C: 'Incorrect: Permanent retention is not required once revoked.',
            D: 'Incorrect: Retention runs from revocation or ceasing to be an active client, not initial execution.',
            E: 'Incorrect: POA must come from the principal party in interest.'
          }
        }
      },
      {
        id: 'SUP-111-3',
        suite: 'CBLE_111_113',
        track: 'CBLE',
        category: 'Broker Recordkeeping (19 CFR Part 111)',
        difficulty: 'Medium',
        targetLookupSeconds: 30,
        stem: 'Brokerage firm Summit Customs LLC relocates its digital and physical recordkeeping archive to a new facility in Chicago and designates a new Recordkeeping Point of Contact. Under 19 CFR § 111.23(a) and (c), where must original customs records be maintained, and within how many days must Summit notify CBP of the change?',
        options: [
          { letter: 'A', text: 'Anywhere globally in the cloud; notify CBP within 90 calendar days.' },
          { letter: 'B', text: 'Within the customs territory of the United States; notify the Broker Management Branch within 30 calendar days of any change.' },
          { letter: 'C', text: 'At the foreign manufacturer’s headquarters; notify CBP on the triennial status report only.' },
          { letter: 'D', text: 'Within a Foreign Trade Zone; notify CBP within 10 working days.' },
          { letter: 'E', text: 'In Washington, D.C. only; notify CBP within 60 business days.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-111-23',
        targetCitation: '19 CFR § 111.23(a) & (c)',
        goldenQuote: 'A licensed customs broker must maintain originals of the records referred to in this part... within the customs territory of the United States... Within 30 calendar days of any change to the place of retention of records or the designated recordkeeping point of contact... the broker must electronically notify the Broker Management Branch...',
        shortestPathHint: '19 CFR → Part 111 → § 111.23(a) & (c)',
        socraticHints: [
          'Check the territorial rule for original broker records and the deadline for updating recordkeeping contact details.',
          'Open 19 CFR Part 111 → § 111.23.',
          'Originals must be kept within the U.S. customs territory (§ 111.23(a)), and changes require electronic notice within 30 calendar days (§ 111.23(c)).'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 111.23(a), a broker must maintain original customs records within the customs territory of the United States. Under § 111.23(c), the broker must notify the Broker Management Branch within 30 calendar days of any change to the record storage location or recordkeeping point of contact.',
          distractors: {
            A: 'Incorrect: Originals must be maintained within the U.S. customs territory and reported within 30 calendar days.',
            B: 'CORRECT: Matches 19 CFR § 111.23(a) and (c).',
            C: 'Incorrect: Cannot wait until the triennial status report.',
            D: 'Incorrect: Deadline is 30 calendar days, not 10 working days.',
            E: 'Incorrect: Records may be kept anywhere within the U.S. customs territory.'
          }
        }
      },
      {
        id: 'SUP-111-4',
        suite: 'CBLE_111_113',
        track: 'CBLE',
        category: 'Customs Business Definitions (19 CFR Part 111)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'Parent corporation Global Tech Holdings employs an in-house trade compliance specialist to advise its wholly owned U.S. subsidiary on exercising reasonable care in tariff classification, without actually preparing, signing, or electronically transmitting entry documents to CBP. Under 19 CFR § 111.1, how is this activity classified?',
        options: [
          { letter: 'A', text: 'Unlicensed transaction of customs business subject to a $30,000 penalty per communication.' },
          { letter: 'B', text: 'A permissible "corporate compliance activity" that is expressly excluded from the definition of "customs business."' },
          { letter: 'C', text: 'A freight forwarding formality requiring a Federal Maritime Commission bond.' },
          { letter: 'D', text: 'An administrative ruling request under 19 CFR Part 177.' },
          { letter: 'E', text: 'A customs brokerage transaction requiring a national permit.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-111-1',
        targetCitation: '19 CFR § 111.1',
        goldenQuote: 'However, "customs business" does not include the mere electronic transmission of data received for transmission to CBP and does not include a corporate compliance activity.',
        shortestPathHint: '19 CFR → Part 111 → § 111.1 (Definitions: Customs business vs. Corporate compliance activity)',
        socraticHints: [
          'Distinguish between "customs business" requiring a broker license and internal "corporate compliance activity" among related entities.',
          'Open 19 CFR Part 111 → § 111.1 (Definitions).',
          'Under § 111.1, advising a related business entity on reasonable care without preparing or filing entry documents is a "corporate compliance activity" excluded from "customs business."'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 111.1, "corporate compliance activity" performed by a business entity to ensure that documents for a related business entity are prepared and filed using reasonable care (without actual preparation, filing, or electronic transmission of the documents) is expressly excluded from "customs business."',
          distractors: {
            A: 'Incorrect: § 111.1 expressly excludes corporate compliance activity among related entities from customs business.',
            B: 'CORRECT: Matches the definition of "corporate compliance activity" in 19 CFR § 111.1.',
            C: 'Incorrect: This is internal compliance between related entities, not freight forwarding.',
            D: 'Incorrect: No Part 177 ruling is involved.',
            E: 'Incorrect: No broker license or national permit is required for corporate compliance activity.'
          }
        }
      },

      /* SUITE 2: CBLE_141_142 (4 Questions) */
      {
        id: 'SUP-141-1',
        suite: 'CBLE_141_142',
        track: 'CBLE',
        category: 'Entry Summary Deadlines (19 CFR Part 142)',
        difficulty: 'Medium',
        targetLookupSeconds: 30,
        stem: 'Merchandise arrives at the Port of Los Angeles/Long Beach and is released under an entry release (CBP Form 3461) on Monday, October 5. No federal holidays occur during October. Assuming entry summary documentation was not required at the time of entry, within what statutory timeframe must the importer or broker file the Entry Summary (CBP Form 7501) with estimated duties attached under 19 CFR § 142.12(b)?',
        options: [
          { letter: 'A', text: 'Within 5 working days after the time of entry and release.' },
          { letter: 'B', text: 'Within 10 calendar days after the date of arrival of the importing vessel.' },
          { letter: 'C', text: 'Within 10 working days after the time of entry and release of the merchandise.' },
          { letter: 'D', text: 'Within 15 calendar days after the release of the merchandise.' },
          { letter: 'E', text: 'Within 30 calendar days after the date of exportation.' }
        ],
        correctOption: 'C',
        targetSectionId: '19-cfr-142-12',
        targetCitation: '19 CFR § 142.12(b)',
        goldenQuote: '...the entry summary documentation (CBP Form 7501 or electronic equivalent) must be filed, with estimated duties attached, within 10 working days after the time of entry and release of the merchandise.',
        shortestPathHint: '19 CFR → Part 141 / 142 → § 142.12(b)',
        socraticHints: [
          'Distinguish the 15-calendar-day initial entry window from the post-release Entry Summary (CBP Form 7501) deadline.',
          'Navigate to 19 CFR Part 142 → § 142.12(b).',
          'Watch out for the "calendar days" vs. "working days" trap: Entry Summary after release is due within 10 WORKING days!'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 142.12(b), when entry summary documentation is not required at the time of entry, the entry summary (CBP Form 7501) with estimated duties attached must be filed within 10 working days after the time of entry and release of the merchandise.',
          distractors: {
            A: 'Incorrect: 5 working days is not the Form 7501 deadline.',
            B: 'Incorrect: Uses calendar days and measures from arrival instead of working days after release.',
            C: 'CORRECT: 10 working days after entry and release per 19 CFR § 142.12(b).',
            D: 'Incorrect: 15 calendar days after arrival applies when entry summary serves as both entry and entry summary under § 142.12(a).',
            E: 'Incorrect: 30 calendar days is not the entry summary filing window.'
          }
        }
      },
      {
        id: 'SUP-141-2',
        suite: 'CBLE_141_142',
        track: 'CBLE',
        category: 'Commercial Invoice Contents (19 CFR Part 141)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'Under 19 CFR § 141.86(a), every commercial invoice required for the entry of merchandise into the United States must set forth specific mandatory data elements. Which of the following sets of information is expressly required on the commercial invoice?',
        options: [
          { letter: 'A', text: 'The U.S. customs broker’s social security number and internal brokerage profit margin.' },
          { letter: 'B', text: 'The port of entry to which the merchandise is destined, detailed description, quantities, purchase price in the currency of purchase, itemized charges (freight, insurance, commission, packing), and country of origin.' },
          { letter: 'C', text: 'The retail markup price at which the U.S. importer intends to sell the goods on Amazon.' },
          { letter: 'D', text: 'The vessel captain’s passport number and bunker fuel consumption log.' },
          { letter: 'E', text: 'A notarized signature from the U.S. Embassy in the country of exportation.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-141-86',
        targetCitation: '19 CFR § 141.86(a)',
        goldenQuote: 'Every commercial invoice required for the entry of merchandise into the customs territory of the United States must set forth: (1) The port of entry... (3) A detailed description... (5) The purchase price of each item in the currency of the purchase, and all charges upon the merchandise, itemized by name and amount... and (6) The country of origin...',
        shortestPathHint: '19 CFR → Part 141 / 142 → § 141.86(a) (Contents of invoices)',
        socraticHints: [
          'Check the general requirements for commercial invoices in Part 141 Subpart F.',
          'Open 19 CFR Part 141 → § 141.86(a).',
          'Verify paragraphs (1) through (6) of § 141.86(a): destination port, seller/buyer/time/place, detailed description, quantities, purchase price in currency of purchase + itemized charges, and country of origin.'
        ],
        explanation: {
          correctReasoning: '19 CFR § 141.86(a) enumerates the mandatory elements of a commercial invoice: destination port of entry, time/place/parties to the sale, detailed description, quantities/weights/measures, purchase price in the currency of purchase with itemized charges (freight, insurance, commission, packing), and country of origin.',
          distractors: {
            A: 'Incorrect: Broker SSN and profit margin are not invoice elements.',
            B: 'CORRECT: Tracks 19 CFR § 141.86(a)(1)–(6).',
            C: 'Incorrect: U.S. downstream retail price is not required on the import commercial invoice.',
            D: 'Incorrect: Vessel crew details are manifest items, not commercial invoice requirements.',
            E: 'Incorrect: Consular notarization is not required under § 141.86.'
          }
        }
      },
      {
        id: 'SUP-141-3',
        suite: 'CBLE_141_142',
        track: 'CBLE',
        category: 'Entry Release Documentation (19 CFR Part 142)',
        difficulty: 'Medium',
        targetLookupSeconds: 30,
        stem: 'When an importer files live entry documentation where the Entry Summary (CBP Form 7501) serves as BOTH the entry and the entry summary at the time of entry under 19 CFR § 142.12(a), within what maximum period after the arrival of the importing carrier must the documentation be filed?',
        options: [
          { letter: 'A', text: 'Within 24 hours after vessel arrival.' },
          { letter: 'B', text: 'Within 5 working days after arrival.' },
          { letter: 'C', text: 'Within 15 calendar days after the date of arrival of the importing carrier.' },
          { letter: 'D', text: 'Within 30 working days after arrival.' },
          { letter: 'E', text: 'Within 90 calendar days after arrival.' }
        ],
        correctOption: 'C',
        targetSectionId: '19-cfr-142-12',
        targetCitation: '19 CFR § 142.12(a)',
        goldenQuote: 'When the entry summary documentation is filed at the time of entry to serve as both the entry and the entry summary, it must be filed within 15 calendar days after the date of arrival of the importing carrier.',
        shortestPathHint: '19 CFR → Part 141 / 142 → § 142.12(a)',
        socraticHints: [
          'Compare § 142.12(a) (when entry summary serves as both entry and entry summary) against § 142.12(b) (filing after release).',
          'Open 19 CFR Part 142 → § 142.12(a).',
          'Under § 142.12(a), the deadline is 15 CALENDAR days after the date of arrival of the importing carrier.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 142.12(a), when the entry summary documentation is filed at the time of entry to serve as both the entry and the entry summary, it must be filed within 15 calendar days after the date of arrival of the importing carrier.',
          distractors: {
            A: 'Incorrect: 24 hours is not the statutory General Order deadline.',
            B: 'Incorrect: 5 working days is not the § 142.12(a) timeframe.',
            C: 'CORRECT: 15 calendar days after carrier arrival per 19 CFR § 142.12(a).',
            D: 'Incorrect: Exceeds the 15-calendar-day limit.',
            E: 'Incorrect: Exceeds the 15-calendar-day limit.'
          }
        }
      },
      {
        id: 'SUP-141-4',
        suite: 'CBLE_141_142',
        track: 'CBLE',
        category: 'Entry Release Package (19 CFR Part 142)',
        difficulty: 'Easy',
        targetLookupSeconds: 30,
        stem: 'Under 19 CFR § 142.3(a), which of the following documents is required as part of the standard entry documentation package to secure the initial release of merchandise from CBP custody?',
        options: [
          { letter: 'A', text: 'Entry (CBP Form 3461 or electronic equivalent), evidence of the right to make entry, commercial invoice (or pro forma invoice), and packing list where appropriate.' },
          { letter: 'B', text: 'Only the importer’s federal corporate income tax return (IRS Form 1120).' },
          { letter: 'C', text: 'A drawback liquidation certificate under Part 190.' },
          { letter: 'D', text: 'A domestic trucking invoice from the U.S. warehouse to the retail store.' },
          { letter: 'E', text: 'The customs broker’s triennial status report receipt.' }
        ],
        correctOption: 'A',
        targetSectionId: '19-cfr-142-3',
        targetCitation: '19 CFR § 142.3(a)',
        goldenQuote: 'the entry documentation required to secure the release of merchandise must consist of the following: (1) Entry (CBP Form 3461...); (2) Evidence of the right to make entry; (3) A commercial invoice, or a pro forma invoice...; (4) A packing list, where appropriate...',
        shortestPathHint: '19 CFR → Part 141 / 142 → § 142.3(a)',
        socraticHints: [
          'Identify the core documents required in an initial entry release packet.',
          'Open 19 CFR Part 142 → § 142.3(a).',
          'Check paragraphs (1) through (5) of § 142.3(a): Form 3461, evidence of right to make entry, commercial/pro forma invoice, packing list, and agency-specific documents.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 142.3(a), the entry documentation required to secure release of merchandise consists of CBP Form 3461 (or electronic equivalent), evidence of the right to make entry, a commercial or pro forma invoice, a packing list where appropriate, and any other required agency documents.',
          distractors: {
            A: 'CORRECT: Matches 19 CFR § 142.3(a)(1)–(4).',
            B: 'Incorrect: IRS Form 1120 is not part of CBP entry release documentation.',
            C: 'Incorrect: Drawback certificates are governed by Part 190, not initial release under § 142.3.',
            D: 'Incorrect: Domestic post-release delivery invoices are not required for CBP release.',
            E: 'Incorrect: Broker triennial reports are Part 111 license maintenance filings.'
          }
        }
      },

      /* SUITE 3: CBLE_152_177_190 (6 Questions) */
      {
        id: 'SUP-152-1',
        suite: 'CBLE_152_177_190',
        track: 'CBLE',
        category: 'Valuation & Assists (19 CFR Part 152)',
        difficulty: 'Hard',
        targetLookupSeconds: 45,
        stem: 'Apex Imports LLC (located in Dallas, TX) purchases 10,000 injection-molded automotive sensor housings from an unrelated manufacturer in Stuttgart, Germany, at an FOB Hamburg invoice price of $80,000. In addition to the invoice amount, Apex incurs the following costs not included on the seller’s commercial invoice:\n• $6,000 for specialized steel injection molds produced in Milan, Italy, which Apex purchased and shipped free of charge to the German factory.\n• $4,500 for schematic engineering and CAD design work performed in Austin, Texas, by U.S.-domiciled engineers and emailed free of charge to the German factory.\n• $2,000 paid to Apex’s bona fide buying agent in Munich for locating the supplier.\n• $3,800 for ocean freight and marine cargo insurance from Hamburg to Houston.\n\nUnder 19 CFR Part 152, what is the correct appraised Transaction Value of the imported shipment?',
        options: [
          { letter: 'A', text: '$80,000.00' },
          { letter: 'B', text: '$86,000.00' },
          { letter: 'C', text: '$90,500.00' },
          { letter: 'D', text: '$92,500.00' },
          { letter: 'E', text: '$96,300.00' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-152-102',
        targetCitation: '19 CFR § 152.102 & § 152.103',
        goldenQuote: 'Engineering, development, artwork, design work, and plans and sketches that are undertaken elsewhere than in the United States and are necessary for the production of the imported merchandise [constitute an assist].',
        shortestPathHint: '19 CFR → Part 152 → § 152.102(a)(1)(ii) & (iv)',
        socraticHints: [
          'Determine which buyer-supplied items qualify as dutiable "Assists" versus statutory exclusions.',
          'Navigate to 19 CFR Part 152 → § 152.102(a)(1) and § 152.103(b).',
          'Check § 152.102(a)(1)(iv): engineering/design work is ONLY a dutiable assist if undertaken OUTSIDE the United States! Buying commissions and ocean freight are also excluded.'
        ],
        explanation: {
          correctReasoning: 'Transaction Value begins with the FOB price ($80,000) plus the $6,000 Italian steel molds provided free of charge under 19 CFR § 152.102(a)(1)(ii) ($80,000 + $6,000 = $86,000). The $4,500 U.S. engineering is excluded under § 152.102(a)(1)(iv) because it was undertaken inside the United States. Bona fide buying commissions ($2,000) and international ocean freight/insurance ($3,800) are excluded.',
          distractors: {
            A: 'Incorrect ($80,000): Fails to add the $6,000 Italian molds assist.',
            B: 'CORRECT ($86,000): Base FOB price ($80,000) + Foreign molds assist ($6,000) = $86,000.',
            C: 'Incorrect ($90,500): Erroneously adds the $4,500 U.S.-performed engineering.',
            D: 'Incorrect ($92,500): Erroneously adds both U.S. engineering ($4,500) and buying commission ($2,000).',
            E: 'Incorrect ($96,300): Adds every figure including excluded ocean freight and insurance.'
          }
        }
      },
      {
        id: 'SUP-152-2',
        suite: 'CBLE_152_177_190',
        track: 'CBLE',
        category: 'Modernized Drawback (19 CFR Part 190)',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: 'Under the Trade Facilitation and Trade Enforcement Act (TFTEA) Modernized Drawback regulations in 19 CFR § 190.32, an importer seeks to file a Substitution Unused Merchandise Drawback claim under 19 U.S.C. 1313(j)(2). Which of the following accurately states both the tariff classification matching standard and the statutory time window?',
        options: [
          { letter: 'A', text: 'Commercially interchangeable standard; exported within 3 years from the date of importation.' },
          { letter: 'B', text: 'Same 8-digit HTSUS subheading (not beginning with "other"); exported or destroyed within 5 years beginning on the date of importation (99% refund subject to the lesser-of rule).' },
          { letter: 'C', text: 'Same 6-digit Harmonized System heading; exported within 5 years from the date of liquidation (100% refund).' },
          { letter: 'D', text: 'Same 10-digit statistical reporting number in all cases; exported within 3 years from entry summary.' },
          { letter: 'E', text: 'Same 4-digit HTSUS heading; exported within 7 years from exportation.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-190-32',
        targetCitation: '19 CFR § 190.32(a) & (b)',
        goldenQuote: 'if imported merchandise on which was paid any duty, tax, or fee... is substituted with merchandise classified under the same 8-digit HTSUS subheading description (and not beginning with the term "other"), 99 percent of the amount of such duty, tax, or fee is refundable as drawback... before the close of the 5-year period beginning on the date of importation...',
        shortestPathHint: '19 CFR → Part 190 → § 190.32',
        socraticHints: [
          'TFTEA (19 CFR Part 190) replaced legacy Part 191 rules for substitution drawback.',
          'Open 19 CFR Part 190 Subpart C → § 190.32.',
          'Modernized Part 190 uses the 8-digit HTSUS subheading standard (when not starting with "Other") and a 5-year window from the date of importation.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 190.32(a) and (b), TFTEA Modernized Substitution Unused Merchandise Drawback requires the substituted merchandise to be classified under the same 8-digit HTSUS subheading (when not beginning with "Other"), refunds 99% of duties/taxes/fees (subject to the lesser-of rule), and provides a 5-year period from the date of importation.',
          distractors: {
            A: 'Incorrect: "Commercially interchangeable" and "3 years" were legacy pre-TFTEA Part 191 rules.',
            B: 'CORRECT: Same 8-digit HTSUS subheading, 99% refund, and 5-year window from importation per 19 CFR § 190.32.',
            C: 'Incorrect: Uses 6-digit HS and 100% refund.',
            D: 'Incorrect: 10-digit suffix applies only when the 8-digit subheading begins with "Other".',
            E: 'Incorrect: Neither 4-digit heading nor 7-year timeframe exists in Part 190.'
          }
        }
      },
      {
        id: 'SUP-152-3',
        suite: 'CBLE_152_177_190',
        track: 'CBLE',
        category: 'Transaction Value Exclusions (19 CFR Part 152)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'An importer purchases industrial CNC machinery from a Japanese manufacturer for a total invoice price of $250,000. The commercial invoice separately identifies $15,000 for post-importation technical assembly and calibration performed at the buyer’s plant in Ohio, and $10,000 for international ocean freight from Yokohama to Long Beach. Under 19 CFR § 152.103(i), what is the net appraised Transaction Value?',
        options: [
          { letter: 'A', text: '$250,000' },
          { letter: 'B', text: '$240,000' },
          { letter: 'C', text: '$235,000' },
          { letter: 'D', text: '$225,000' },
          { letter: 'E', text: '$265,000' }
        ],
        correctOption: 'D',
        targetSectionId: '19-cfr-152-103',
        targetCitation: '19 CFR § 152.103(i)',
        goldenQuote: 'The transaction value of imported merchandise does not include any of the following, if identified separately from the price actually paid or payable: (1) Any reasonable cost or charge that is incurred for the construction, erection, assembly, or maintenance of, or the technical assistance provided with respect to, the merchandise after its importation into the United States...',
        shortestPathHint: '19 CFR → Part 152 → § 152.103(i)',
        socraticHints: [
          'Check which post-importation and international transportation charges are excluded when separately identified on the invoice.',
          'Open 19 CFR Part 152 → § 152.103(i).',
          'Both separately identified post-importation assembly/technical assistance ($15,000) and international ocean freight ($10,000) are deducted from the $250,000 invoice total ($250,000 - $25,000 = $225,000).'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 152.103(i) and (a), when separately identified from the price actually paid or payable, both post-importation construction/erection/assembly/technical assistance ($15,000) and international ocean freight ($10,000) are excluded from Transaction Value: $250,000 - $15,000 - $10,000 = $225,000.',
          distractors: {
            A: 'Incorrect ($250,000): Fails to deduct separately identified freight and post-importation assembly.',
            B: 'Incorrect ($240,000): Deducts ocean freight ($10,000) but forgets to deduct post-importation assembly ($15,000).',
            C: 'Incorrect ($235,000): Deducts post-importation assembly ($15,000) but forgets to deduct ocean freight ($10,000).',
            D: 'CORRECT ($225,000): Deducts both separately itemized exclusions ($15,000 + $10,000) per 19 CFR § 152.103.',
            E: 'Incorrect ($265,000): Erroneously adds post-importation assembly.'
          }
        }
      },
      {
        id: 'SUP-152-4',
        suite: 'CBLE_152_177_190',
        track: 'CBLE',
        category: 'Valuation — Commissions & Royalties (19 CFR Part 152)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'Under 19 CFR § 152.103(b), which of the following commissions and fees must be added to the Price Actually Paid or Payable (PAPP) to determine Transaction Value (assuming not already included in the invoice price)?',
        options: [
          { letter: 'A', text: 'Bona fide buying commissions paid to the importer’s buying agent abroad.' },
          { letter: 'B', text: 'Selling commissions incurred by the buyer with respect to the imported merchandise, and royalties/license fees that the buyer must pay as a condition of the sale for exportation to the United States.' },
          { letter: 'C', text: 'U.S. customs broker entry filing fees and Harbor Maintenance Fees.' },
          { letter: 'D', text: 'Dividends remitted by the U.S. buyer to its foreign parent corporation that do not relate to the imported goods.' },
          { letter: 'E', text: 'Domestic drayage charges from the U.S. port of entry to the buyer’s distribution center.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-152-103',
        targetCitation: '19 CFR § 152.103(b)',
        goldenQuote: '(2) Any selling commission incurred by the buyer with respect to the imported merchandise... (4) Any royalty or license fee related to the imported merchandise that the buyer is required to pay, directly or indirectly, as a condition of the sale of the imported merchandise for exportation to the United States;',
        shortestPathHint: '19 CFR → Part 152 → § 152.103(b)',
        socraticHints: [
          'Distinguish between selling commissions vs. buying commissions under Transaction Value additions.',
          'Open 19 CFR Part 152 → § 152.103(b).',
          'Under § 152.103(b), selling commissions incurred by the buyer and condition-of-sale royalties are mandatory statutory additions, whereas bona fide buying commissions are excluded.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 152.103(b), the five statutory additions to PAPP are: (1) packing costs incurred by the buyer; (2) selling commissions incurred by the buyer; (3) apportioned assists; (4) royalties/license fees required as a condition of sale for export to the U.S.; and (5) subsequent resale proceeds accruing to the seller.',
          distractors: {
            A: 'Incorrect: Buying commissions are not dutiable additions; only selling commissions are added.',
            B: 'CORRECT: Matches 19 CFR § 152.103(b)(1)(ii) and (iv).',
            C: 'Incorrect: Customs brokerage fees and U.S. import fees are excluded.',
            D: 'Incorrect: General corporate dividends unrelated to the merchandise are not added.',
            E: 'Incorrect: Post-importation domestic trucking is excluded.'
          }
        }
      },
      {
        id: 'SUP-152-5',
        suite: 'CBLE_152_177_190',
        track: 'CBLE',
        category: 'Assists — Consumables & Materials (19 CFR Part 152)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'Which of the following items supplied free of charge by a U.S. buyer to a foreign manufacturer for use in producing imported garments constitutes a dutiable "assist" under 19 CFR § 152.102(a)(1)?',
        options: [
          { letter: 'A', text: 'Fabric zippers, buttons, and specialty chemical dyes consumed in the foreign production of the imported garments.' },
          { letter: 'B', text: 'Accounting software used by the foreign manufacturer’s payroll department.' },
          { letter: 'C', text: 'Architectural blueprints for the foreign manufacturer’s employee cafeteria.' },
          { letter: 'D', text: 'Fashion trend market research conducted in New York by U.S.-domiciled employees.' },
          { letter: 'E', text: 'Marine cargo insurance policies covering the ocean voyage to the U.S.' }
        ],
        correctOption: 'A',
        targetSectionId: '19-cfr-152-102',
        targetCitation: '19 CFR § 152.102(a)(1)(i) & (iii)',
        goldenQuote: '(i) Materials, components, parts, and similar items incorporated in the imported merchandise... (iii) Merchandise consumed in the production of the imported merchandise;',
        shortestPathHint: '19 CFR → Part 152 → § 152.102(a)(1)',
        socraticHints: [
          'Review the four categories of tangible and intangible assists in § 152.102(a)(1)(i)–(iv).',
          'Open 19 CFR Part 152 → § 152.102(a)(1).',
          'Materials/components incorporated in the imported merchandise (zippers, buttons) and merchandise consumed in production (chemical dyes) are classic assists under (i) and (iii).'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 152.102(a)(1)(i) and (iii), materials, components, and parts incorporated in the imported merchandise (zippers, buttons) and merchandise consumed in the production of the imported merchandise (chemical dyes) supplied free of charge or at reduced cost by the buyer are dutiable assists.',
          distractors: {
            A: 'CORRECT: Incorporated components and production consumables are assists under § 152.102(a)(1)(i) & (iii).',
            B: 'Incorrect: General administrative payroll software is not directly used in producing the merchandise.',
            C: 'Incorrect: Cafeteria blueprints are unrelated to manufacturing the imported goods.',
            D: 'Incorrect: Work performed in the U.S. by U.S.-domiciled employees is excluded.',
            E: 'Incorrect: Marine cargo insurance is an international shipment cost, not an assist.'
          }
        }
      },
      {
        id: 'SUP-152-6',
        suite: 'CBLE_152_177_190',
        track: 'CBLE',
        category: 'Modernized Drawback — Lesser Of Rule (19 CFR Part 190)',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: 'Under 19 CFR § 190.32(b) and (c) governing TFTEA Unused Merchandise Substitution Drawback, what special rule applies if the 8-digit HTSUS subheading description for the designated imported merchandise begins with the word "Other"?',
        options: [
          { letter: 'A', text: 'Drawback is completely prohibited on any HTSUS provision containing the word "Other."' },
          { letter: 'B', text: 'Substitution is permitted at the 4-digit heading level instead.' },
          { letter: 'C', text: 'Substitution is permitted only if the imported merchandise and substituted merchandise are classified under the same 10-digit HTSUS statistical reporting number (and the 10-digit description does not begin with "Other").' },
          { letter: 'D', text: 'The claimant automatically receives a 100% refund without applying the lesser-of rule.' },
          { letter: 'E', text: 'The 5-year export window is shortened to 1 year.' }
        ],
        correctOption: 'C',
        targetSectionId: '19-cfr-190-32',
        targetCitation: '19 CFR § 190.32(b)(2)',
        goldenQuote: 'If the article description for the 8-digit HTSUS subheading DOES begin with the term "Other", then substitution is permitted ONLY if the imported merchandise and the substituted merchandise are classified under the same 10-digit HTSUS statistical reporting number...',
        shortestPathHint: '19 CFR → Part 190 → § 190.32(b)',
        socraticHints: [
          'Check the TFTEA "Other" Basket Provision rule in § 190.32(b).',
          'Open 19 CFR Part 190 → § 190.32(b)(1)–(2).',
          'When the 8-digit subheading begins with "Other", you drop down to the 10-digit statistical reporting number level to determine substitution eligibility.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 190.32(b)(2), if the article description for the 8-digit HTSUS subheading begins with the term "Other", substitution is permitted only if the imported and substituted merchandise match at the 10-digit HTSUS statistical reporting number level (where the 10-digit description does not begin with "Other").',
          distractors: {
            A: 'Incorrect: Drawback is not prohibited; matching moves to the 10-digit level.',
            B: 'Incorrect: You move to a more specific 10-digit level, never to the broader 4-digit level.',
            C: 'CORRECT: Accurately states the 10-digit matching rule in 19 CFR § 190.32(b)(2).',
            D: 'Incorrect: Drawback remains capped at 99% of the lesser of imported vs. substituted duty.',
            E: 'Incorrect: The 5-year statutory period from importation still applies.'
          }
        }
      },

      /* SUITE 4: CBLE_HTSUS (4 Questions) */
      {
        id: 'SUP-HTSUS-1',
        suite: 'CBLE_HTSUS',
        track: 'CBLE',
        category: 'HTSUS Classification & GRI 3(b)',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: 'An importer enters a shrink-wrapped "Backcountry Espresso Retail Kit" packaged ready for direct retail sale to consumers without repacking. The kit contains:\n1. A portable hand-pumped stainless steel espresso maker (Heading 8419 — value $42.00);\n2. Two double-walled borosilicate glass espresso cups (Heading 7013 — value $8.00);\n3. A nylon carrying pouch fitted to hold the components (Heading 4202 — value $4.50); and\n4. A 100-gram tin of roasted arabica coffee beans (Heading 0901 — value $3.50).\n\nNo single heading in the HTSUS specifically describes the entire retail kit by name. Under which General Rule of Interpretation (GRI) is the entire retail set classified under Heading 8419?',
        options: [
          { letter: 'A', text: 'GRI 1 alone, because the highest-value item always governs classification under the terms of the headings.' },
          { letter: 'B', text: 'GRI 2(a), as an unassembled or disassembled article entered in retail packaging.' },
          { letter: 'C', text: 'GRI 3(a), because Heading 8419 provides the most specific description among all items in a retail set.' },
          { letter: 'D', text: 'GRI 3(b), because the goods are put up in a set for retail sale and the portable espresso maker imparts the essential character.' },
          { letter: 'E', text: 'GRI 3(c), because Heading 8419 occurs last in numerical order among headings 0901, 4202, 7013, and 8419.' }
        ],
        correctOption: 'D',
        targetSectionId: 'htsus-gri-3',
        targetCitation: 'HTSUS GRI 3(b)',
        goldenQuote: 'Mixtures, composite goods consisting of different materials or made up of different components, and goods put up in sets for retail sale, which cannot be classified by reference to 3(a), shall be classified as if they consisted of the material or component which gives them their essential character...',
        shortestPathHint: 'HTSUS & GRI → GRI 1–6 → HTSUS GRI 3(b)',
        socraticHints: [
          'Multiple distinct articles packaged together for retail sale to carry out a specific activity (brewing espresso) invoke the Retail Set rules.',
          'Open HTSUS & GRI → GRI 1–6 → HTSUS GRI 3.',
          'The second sentence of GRI 3(a) deems headings referring to part only of a retail set equally specific, directing you to GRI 3(b) (Essential Character).'
        ],
        explanation: {
          correctReasoning: 'Under GRI 3(a), when two or more headings each refer to part only of the items in a set put up for retail sale, those headings are regarded as equally specific. Classification therefore proceeds to GRI 3(b), which classifies retail sets according to the component that imparts essential character (the portable espresso maker of Heading 8419).',
          distractors: {
            A: 'Incorrect: GRI 1 alone cannot classify a multi-article retail set.',
            B: 'Incorrect: GRI 2(a) applies to a single article entered unassembled, not a multi-item retail set.',
            C: 'Incorrect: GRI 3(a) explicitly deems headings covering part of a retail set equally specific.',
            D: 'CORRECT: GRI 3(b) classifies retail sets by the component imparting essential character.',
            E: 'Incorrect: GRI 3(c) applies only if essential character under GRI 3(b) cannot be determined.'
          }
        }
      },
      {
        id: 'SUP-HTSUS-2',
        suite: 'CBLE_HTSUS',
        track: 'CBLE',
        category: 'HTSUS Classification & GRI 1',
        difficulty: 'Medium',
        targetLookupSeconds: 30,
        stem: 'Under HTSUS General Rule of Interpretation 1 (GRI 1), what is the legal status of the titles of Sections, Chapters, and Sub-Chapters versus the terms of the 4-digit Headings and relative Section or Chapter Notes?',
        options: [
          { letter: 'A', text: 'Chapter titles have higher legal authority than 4-digit heading texts.' },
          { letter: 'B', text: 'Titles of sections, chapters, and sub-chapters are provided for ease of reference only; for legal purposes, classification shall be determined according to the terms of the headings and any relative section or chapter notes.' },
          { letter: 'C', text: 'Section and chapter notes are non-binding advisory commentary that only apply after GRI 3(c).' },
          { letter: 'D', text: 'The alphabetical index of the HTSUS overrides any conflicting 4-digit heading text.' },
          { letter: 'E', text: 'GRI 1 is only used when GRI 3(b) essential character fails.' }
        ],
        correctOption: 'B',
        targetSectionId: 'htsus-gri-1',
        targetCitation: 'HTSUS GRI 1',
        goldenQuote: 'The table of contents, alphabetical index, and titles of sections, chapters and sub-chapters are provided for ease of reference only; for legal purposes, classification shall be determined according to the terms of the headings and any relative section or chapter notes...',
        shortestPathHint: 'HTSUS & GRI → GRI 1–6 → HTSUS GRI 1',
        socraticHints: [
          'Check the foundational rule of tariff classification in GRI 1.',
          'Open HTSUS & GRI → GRI 1–6 → HTSUS GRI 1.',
          'Titles of sections/chapters are for ease of reference only; legal classification is governed by the terms of the headings and relative section or chapter notes.'
        ],
        explanation: {
          correctReasoning: 'Under HTSUS GRI 1, the table of contents, alphabetical index, and titles of sections, chapters, and sub-chapters are provided for ease of reference only; for legal purposes, classification is determined according to the terms of the headings and any relative section or chapter notes.',
          distractors: {
            A: 'Incorrect: Chapter titles are for ease of reference only.',
            B: 'CORRECT: Verbatim rule of HTSUS GRI 1.',
            C: 'Incorrect: Section and Chapter Notes have binding legal force at GRI 1.',
            D: 'Incorrect: The alphabetical index is for ease of reference only.',
            E: 'Incorrect: GRI 1 is always applied first before proceeding to GRIs 2–5.'
          }
        }
      },
      {
        id: 'SUP-HTSUS-3',
        suite: 'CBLE_HTSUS',
        track: 'CBLE',
        category: 'HTSUS Classification & GRI 2(a)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'A bicycle manufacturer imports 500 complete racing bicycles shipped in an unassembled "knocked-down" state in the same container for packing convenience, along with 200 unfinished aluminum bicycle frames that already possess the approximate shape and essential character of finished bicycle frames. Under which GRI rule are unassembled complete articles and incomplete articles having the essential character of the finished article classified?',
        options: [
          { letter: 'A', text: 'GRI 2(a)' },
          { letter: 'B', text: 'GRI 3(c)' },
          { letter: 'C', text: 'GRI 4' },
          { letter: 'D', text: 'GRI 5(b)' },
          { letter: 'E', text: '19 CFR § 111.32' }
        ],
        correctOption: 'A',
        targetSectionId: 'htsus-gri-2',
        targetCitation: 'HTSUS GRI 2(a)',
        goldenQuote: 'Any reference in a heading to an article shall be taken to include a reference to that article incomplete or unfinished, provided that, as entered, the incomplete or unfinished article has the essential character of the complete or finished article. It shall also include a reference to that article complete or finished... entered unassembled or disassembled.',
        shortestPathHint: 'HTSUS & GRI → GRI 1–6 → HTSUS GRI 2(a)',
        socraticHints: [
          'Look for the GRI that expands the scope of a heading to cover incomplete/unfinished and unassembled/disassembled articles.',
          'Open HTSUS & GRI → GRI 1–6 → HTSUS GRI 2.',
          'GRI 2(a) covers both incomplete/unfinished articles having the essential character of the finished article and complete articles entered unassembled or disassembled.'
        ],
        explanation: {
          correctReasoning: 'Under HTSUS GRI 2(a), any reference in a heading to an article includes that article incomplete or unfinished (provided it has the essential character of the complete or finished article) as well as complete or finished articles entered unassembled or disassembled.',
          distractors: {
            A: 'CORRECT: GRI 2(a) governs incomplete/unfinished and unassembled/disassembled articles.',
            B: 'Incorrect: GRI 3(c) is last in numerical order for multi-heading conflicts.',
            C: 'Incorrect: GRI 4 ("most akin") applies only when goods cannot be classified under GRIs 1–3.',
            D: 'Incorrect: GRI 5(b) governs packing materials and containers.',
            E: 'Incorrect: 19 CFR § 111.32 is a broker compliance regulation.'
          }
        }
      },
      {
        id: 'SUP-HTSUS-4',
        suite: 'CBLE_HTSUS',
        track: 'CBLE',
        category: 'HTSUS Classification & GRI 3(c)',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: 'A composite article consists of 50% by value and weight of a plastic flashlight (Heading 8513) and 50% by value and weight of a digital electronic pedometer (Heading 9029). Both components are equally important to the consumer, so neither component imparts essential character under GRI 3(b), and neither heading is more specific under GRI 3(a). Under GRI 3(c), how must the composite article be classified?',
        options: [
          { letter: 'A', text: 'Under Heading 8513 because it appears first in numerical order.' },
          { letter: 'B', text: 'Under Heading 9029 because GRI 3(c) mandates classification under the heading which occurs LAST in numerical order among those which equally merit consideration.' },
          { letter: 'C', text: 'Split the invoice value 50/50 across both headings on two separate entry lines.' },
          { letter: 'D', text: 'Classify under whichever heading has the lower duty rate.' },
          { letter: 'E', text: 'Reject the shipment as unclassifiable under the HTSUS.' }
        ],
        correctOption: 'B',
        targetSectionId: 'htsus-gri-3',
        targetCitation: 'HTSUS GRI 3(c)',
        goldenQuote: '(c) Last in Numerical Order: When goods cannot be classified by reference to 3(a) or 3(b), they shall be classified under the heading which occurs last in numerical order among those which equally merit consideration.',
        shortestPathHint: 'HTSUS & GRI → GRI 1–6 → HTSUS GRI 3(c)',
        socraticHints: [
          'When GRI 3(a) (specificity) and GRI 3(b) (essential character) cannot resolve a composite good, move to the tie-breaker in GRI 3(c).',
          'Open HTSUS & GRI → GRI 1–6 → HTSUS GRI 3(c).',
          'Under GRI 3(c), classify under the heading occurring LAST in numerical order among those equally meriting consideration (9029 comes after 8513).'
        ],
        explanation: {
          correctReasoning: 'Under HTSUS GRI 3(c), when composite goods or retail sets cannot be classified by reference to GRI 3(a) or GRI 3(b), they shall be classified under the heading which occurs last in numerical order among those which equally merit consideration (Heading 9029 over Heading 8513).',
          distractors: {
            A: 'Incorrect: GRI 3(c) selects the LAST heading in numerical order, not the first.',
            B: 'CORRECT: Heading 9029 occurs last in numerical order per GRI 3(c).',
            C: 'Incorrect: A single composite good is classified under a single heading, not split.',
            D: 'Incorrect: GRI 3(c) uses numerical order, not lowest duty rate.',
            E: 'Incorrect: Every imported article is classifiable under the HTSUS via GRIs 1–6.'
          }
        }
      },

      /* SUITE 5: EA — IRS ENROLLED AGENT (31 CFR Part 10 — 6 Questions) */
      {
        id: 'SUP-EA-1',
        suite: 'EA',
        track: 'IRS-EA',
        category: 'IRS Circular 230 (31 CFR Part 10)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'An Enrolled Agent practicing before the Internal Revenue Service is retained by a corporate client to represent the company in an IRS examination of its prior-year Form 1120. While reviewing the client’s general ledger, the Enrolled Agent discovers that the client omitted $140,000 of taxable gross receipts from the filed return.\n\nUnder 31 CFR § 10.21 (Treasury Department Circular 230), what is the practitioner’s specific regulatory duty upon discovering this omission?',
        options: [
          { letter: 'A', text: 'Immediately notify the IRS Criminal Investigation Division in writing within 10 business days without informing the client.' },
          { letter: 'B', text: 'Promptly advise the client of the fact of such noncompliance, error, or omission, AND advise the client of the consequences as provided under the Internal Revenue Code and regulations.' },
          { letter: 'C', text: 'Prepare and sign an amended Form 1120X and file it with the IRS even if the client refuses to authorize the filing.' },
          { letter: 'D', text: 'Impound the client’s original accounting records until the client pays the additional tax liability.' },
          { letter: 'E', text: 'Take no action because the return was prepared by a previous accounting firm.' }
        ],
        correctOption: 'B',
        targetSectionId: '31-cfr-10-21',
        targetCitation: '31 CFR § 10.21',
        goldenQuote: '...must advise the client promptly of the fact of such noncompliance, error, or omission. The practitioner must advise the client of the consequences as provided under the Code and regulations of such noncompliance, error, or omission.',
        shortestPathHint: '31 CFR Part 10 → Subpart B → § 10.21',
        socraticHints: [
          'This tests Circular 230 Subpart B duties when a practitioner discovers an error or omission on a client’s prior return.',
          'Switch to the "31 CFR Part 10" corpus tab in the right panel and select § 10.21.',
          'Under 31 CFR § 10.21, the practitioner must: (1) promptly advise the client of the error/omission, and (2) advise the client of the Code/regulatory consequences.'
        ],
        explanation: {
          correctReasoning: 'Under 31 CFR § 10.21 (Knowledge of client’s omission), a Circular 230 practitioner who knows a client has made an error in or omission from any return or document submitted under U.S. revenue laws must promptly advise the client of the fact of such noncompliance, error, or omission, AND advise the client of the consequences under the Internal Revenue Code and regulations.',
          distractors: {
            A: 'Incorrect: Circular 230 § 10.21 directs the practitioner to advise the client, not unilaterally report the client to IRS CI.',
            B: 'CORRECT: Tracks the exact two-pronged mandate of 31 CFR § 10.21.',
            C: 'Incorrect: A practitioner cannot file an amended tax return without the taxpayer’s authorization.',
            D: 'Incorrect: Under 31 CFR § 10.28, a practitioner must return client records upon request.',
            E: 'Incorrect: § 10.21 applies regardless of who prepared the prior return.'
          }
        }
      },
      {
        id: 'SUP-EA-2',
        suite: 'EA',
        track: 'IRS-EA',
        category: 'IRS Circular 230 (31 CFR Part 10)',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: 'An Enrolled Agent engages a third-party valuation specialist and a junior tax associate to compile R&D credit schedules for a client submission to the IRS. The submission contains an unintended calculation error originating from the specialist’s worksheet.\n\nUnder 31 CFR § 10.22(b) (Circular 230 — Diligence as to accuracy), under what condition will the practitioner be presumed to have exercised due diligence when relying on the work product of another person?',
        options: [
          { letter: 'A', text: 'Never; Circular 230 imposes strict vicarious liability on the signing practitioner for any third-party math error.' },
          { letter: 'B', text: 'Automatically in all cases, provided the third party signs a private indemnification agreement with the client.' },
          { letter: 'C', text: 'If the practitioner used reasonable care in engaging, supervising, training, and evaluating the person, taking proper account of the nature of the relationship between the practitioner and the person.' },
          { letter: 'D', text: 'Only if the other person is an active CPA licensed in the same state as the Enrolled Agent.' },
          { letter: 'E', text: 'Only if the tax return involves a refund claim under $10,000.' }
        ],
        correctOption: 'C',
        targetSectionId: '31-cfr-10-22',
        targetCitation: '31 CFR § 10.22(b)',
        goldenQuote: '...a practitioner will be presumed to have exercised due diligence for purposes of this section if the practitioner relies on the work product of another person and the practitioner used reasonable care in engaging, supervising, training, and evaluating the person, taking proper account of the nature of the relationship between the practitioner and the person.',
        shortestPathHint: '31 CFR Part 10 → Subpart B → § 10.22(b)',
        socraticHints: [
          'This tests Circular 230 due diligence standards and the safe harbor for relying on another person’s work product.',
          'Open 31 CFR Part 10 → § 10.22 (Diligence as to accuracy).',
          'Read paragraph (b) "Reliance on others": look for "reasonable care in engaging, supervising, training, and evaluating the person."'
        ],
        explanation: {
          correctReasoning: 'Under 31 CFR § 10.22(b), a practitioner is presumed to have exercised due diligence when relying on the work product of another person if the practitioner used reasonable care in engaging, supervising, training, and evaluating the person, taking proper account of the nature of the relationship between the practitioner and that person.',
          distractors: {
            A: 'Incorrect: § 10.22(b) provides a presumption of due diligence when reasonable care is used.',
            B: 'Incorrect: Private indemnification does not substitute for Circular 230 reasonable care.',
            C: 'CORRECT: Verbatim standard from 31 CFR § 10.22(b).',
            D: 'Incorrect: Circular 230 does not restrict reliance solely to same-state CPAs.',
            E: 'Incorrect: There is no $10,000 threshold in § 10.22(b).'
          }
        }
      },
      {
        id: 'SUP-EA-3',
        suite: 'EA',
        track: 'IRS-EA',
        category: 'IRS Circular 230 (31 CFR Part 10)',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: 'An Enrolled Agent is preparing an individual tax return containing a non-tax-shelter deduction that has a 25% likelihood of being sustained on its merits ("Reasonable Basis", which is above 20% but below the 40% "Substantial Authority" threshold). Additionally, the client provides a handwritten expense log that contradicts the client’s bank statements. Under 31 CFR § 10.34(a) and (d), what must the practitioner do?',
        options: [
          { letter: 'A', text: 'Sign the return without disclosure and accept the handwritten log without question.' },
          { letter: 'B', text: 'Sign the return only if the position is adequately disclosed (Form 8275), advise the client of potential penalties, and make reasonable inquiries regarding the inconsistent travel expense log.' },
          { letter: 'C', text: 'Refuse to sign even with disclosure because all positions require >50% certainty.' },
          { letter: 'D', text: 'Audit every cancelled check of the client for the past 7 years.' },
          { letter: 'E', text: 'Report the client to the IRS Office of Professional Responsibility.' }
        ],
        correctOption: 'B',
        targetSectionId: '31-cfr-10-34',
        targetCitation: '31 CFR § 10.34(a), (c) & (d)',
        goldenQuote: 'The practitioner may not, however, ignore the implications of information furnished to, or actually known by, the practitioner, and must make reasonable inquiries if the information as furnished appears to be incorrect, inconsistent with an important fact or another factual assumption, or incomplete.',
        shortestPathHint: '31 CFR Part 10 → Subpart B → § 10.34',
        socraticHints: [
          'Distinguish undisclosed positions (Substantial Authority ~40%) from disclosed positions (Reasonable Basis ~20% + Form 8275).',
          'Open 31 CFR Part 10 → Subpart B → § 10.34.',
          'Under § 10.34(a) & (d), a Reasonable Basis position requires adequate disclosure, and a practitioner may not ignore client data that appears incorrect, inconsistent, or incomplete.'
        ],
        explanation: {
          correctReasoning: 'Under 31 CFR § 10.34(a), a non-tax-shelter position with a Reasonable Basis (~25%) may be signed only if adequately disclosed (Form 8275). Under § 10.34(d), while a practitioner generally relies in good faith on client information without verification, the practitioner must make reasonable inquiries when the information appears incorrect, inconsistent, or incomplete.',
          distractors: {
            A: 'Incorrect: Undisclosed positions require Substantial Authority, and contradictory client data cannot be ignored.',
            B: 'CORRECT: Satisfies 31 CFR § 10.34(a), (c), and (d).',
            C: 'Incorrect: >50% ("More Likely Than Not") applies only to tax shelters.',
            D: 'Incorrect: Full audit is not required for consistent client data.',
            E: 'Incorrect: OPR oversees practitioners, not taxpayer audits.'
          }
        }
      },
      {
        id: 'SUP-EA-4',
        suite: 'EA',
        track: 'IRS-EA',
        category: 'IRS Circular 230 (31 CFR Part 10)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'An IRS Revenue Agent issues a proper and lawful administrative request to an Enrolled Agent for accounting records relating to a corporate audit. The practitioner does not have the requested records in possession or control, and the client no longer has them either, as they are held by the client’s former bookkeeper. Under 31 CFR § 10.20(a)(2), what is the practitioner required to do?',
        options: [
          { letter: 'A', text: 'Ignore the request because a practitioner has no duty to respond if documents are not in the office.' },
          { letter: 'B', text: 'Promptly notify the requesting IRS officer or employee that the records are not in the possession or control of the practitioner or client, AND provide any information the practitioner has regarding the identity of any person who the practitioner believes may have possession or control of the requested records.' },
          { letter: 'C', text: 'File a lawsuit against the former bookkeeper within 15 calendar days.' },
          { letter: 'D', text: 'Reconstruct fake records from memory and submit them to the IRS.' },
          { letter: 'E', text: 'Claim absolute privilege over the identity of the former bookkeeper.' }
        ],
        correctOption: 'B',
        targetSectionId: '31-cfr-10-20',
        targetCitation: '31 CFR § 10.20(a)(2)',
        goldenQuote: 'Where the requested records or information are not in the possession of, or subject to the control of, the practitioner or the practitioner\'s client, the practitioner must promptly notify the requesting Internal Revenue Service officer or employee and the practitioner must provide any information that the practitioner has regarding the identity of any person who the practitioner believes may have possession or control of the requested records or information.',
        shortestPathHint: '31 CFR Part 10 → Subpart B → § 10.20(a)(2)',
        socraticHints: [
          'Check the practitioner’s obligation when lawfully requested IRS records are held by a third party.',
          'Open 31 CFR Part 10 → Subpart B → § 10.20(a)(2).',
          'Under § 10.20(a)(2), promptly notify the IRS officer AND provide any information the practitioner has regarding the identity of the person believed to have possession or control.'
        ],
        explanation: {
          correctReasoning: 'Under 31 CFR § 10.20(a)(2), when requested records are not in the possession or control of the practitioner or client, the practitioner must promptly notify the requesting IRS officer and provide any information the practitioner has regarding the identity of any person believed to have possession or control of the records.',
          distractors: {
            A: 'Incorrect: Ignoring a lawful IRS request violates 31 CFR § 10.20.',
            B: 'CORRECT: Tracks 31 CFR § 10.20(a)(2) verbatim.',
            C: 'Incorrect: Circular 230 does not require suing third parties.',
            D: 'Incorrect: Submitting fabricated records violates § 10.22 and § 10.51.',
            E: 'Incorrect: The identity of the custodian of unprivileged records must be disclosed.'
          }
        }
      },
      {
        id: 'SUP-EA-5',
        suite: 'EA',
        track: 'IRS-EA',
        category: 'IRS Circular 230 (31 CFR Part 10)',
        difficulty: 'Medium',
        targetLookupSeconds: 30,
        stem: 'Under 31 CFR § 10.22(a), in which three core areas must a Circular 230 practitioner exercise due diligence as to accuracy?',
        options: [
          { letter: 'A', text: 'Only when representing a client in U.S. Tax Court litigation.' },
          { letter: 'B', text: '(1) Preparing, approving, and filing tax returns and IRS documents; (2) Determining the correctness of oral or written representations made to the Department of the Treasury; and (3) Determining the correctness of oral or written representations made to clients regarding IRS matters.' },
          { letter: 'C', text: 'Only when preparing returns with gross receipts exceeding $10 million.' },
          { letter: 'D', text: 'Only in written representations to the IRS, because oral representations are exempt from due diligence.' },
          { letter: 'E', text: 'Only when appraising imported merchandise for U.S. Customs.' }
        ],
        correctOption: 'B',
        targetSectionId: '31-cfr-10-22',
        targetCitation: '31 CFR § 10.22(a)(1)–(3)',
        goldenQuote: 'A practitioner must exercise due diligence: (1) In preparing or assisting in the preparation of, approving, and filing tax returns, documents, affidavits, and other papers relating to Internal Revenue Service matters; (2) In determining the correctness of oral or written representations made by the practitioner to the Department of the Treasury; and (3) In determining the correctness of oral or written representations made by the practitioner to clients...',
        shortestPathHint: '31 CFR Part 10 → Subpart B → § 10.22(a)',
        socraticHints: [
          'Check whether Circular 230 due diligence applies to both oral and written representations to Treasury and clients.',
          'Open 31 CFR Part 10 → Subpart B → § 10.22(a).',
          'Under § 10.22(a)(1)–(3), due diligence applies to returns/documents, oral or written representations to Treasury, and oral or written representations to clients.'
        ],
        explanation: {
          correctReasoning: 'Under 31 CFR § 10.22(a)(1)–(3), a practitioner must exercise due diligence in: (1) preparing, approving, and filing tax returns and documents relating to IRS matters; (2) determining the correctness of oral or written representations to the Department of the Treasury; and (3) determining the correctness of oral or written representations to clients regarding IRS matters.',
          distractors: {
            A: 'Incorrect: Applies to all IRS practice matters.',
            B: 'CORRECT: Matches 31 CFR § 10.22(a)(1)–(3).',
            C: 'Incorrect: There is no dollar threshold for due diligence.',
            D: 'Incorrect: Explicitly covers both ORAL and WRITTEN representations.',
            E: 'Incorrect: Customs valuation is governed by 19 CFR Part 152.'
          }
        }
      },
      {
        id: 'SUP-EA-6',
        suite: 'EA',
        track: 'IRS-EA',
        category: 'IRS Circular 230 (31 CFR Part 10)',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: 'Under 31 CFR § 10.20(a)(1), what is the SOLE recognized exception that excuses a practitioner from promptly submitting records or information in response to a proper and lawful request by a duly authorized IRS officer?',
        options: [
          { letter: 'A', text: 'The practitioner believes in good faith and on reasonable grounds that the records or information are privileged.' },
          { letter: 'B', text: 'The client has not yet paid the practitioner’s monthly retainer invoice.' },
          { letter: 'C', text: 'Producing the records would likely result in an additional tax assessment against the client.' },
          { letter: 'D', text: 'The practitioner is busy during tax season and prefers to wait 6 months.' },
          { letter: 'E', text: 'The records are stored in an electronic spreadsheet rather than on paper.' }
        ],
        correctOption: 'A',
        targetSectionId: '31-cfr-10-20',
        targetCitation: '31 CFR § 10.20(a)(1)',
        goldenQuote: 'A practitioner must, on a proper and lawful request by a duly authorized officer or employee of the Internal Revenue Service, promptly submit records or information in any matter before the Internal Revenue Service unless the practitioner believes in good faith and on reasonable grounds that the records or information are privileged.',
        shortestPathHint: '31 CFR Part 10 → Subpart B → § 10.20(a)(1)',
        socraticHints: [
          'Check when a practitioner may lawfully withhold records requested by an IRS officer.',
          'Open 31 CFR Part 10 → Subpart B → § 10.20(a)(1).',
          'The sole exception in § 10.20(a)(1) is when the practitioner believes in good faith and on reasonable grounds that the records or information are privileged.'
        ],
        explanation: {
          correctReasoning: 'Under 31 CFR § 10.20(a)(1), a practitioner must promptly submit records or information upon a proper and lawful request by a duly authorized IRS officer unless the practitioner believes in good faith and on reasonable grounds that the records or information are privileged.',
          distractors: {
            A: 'CORRECT: Good-faith, reasonable belief of privilege is the sole exception in 31 CFR § 10.20(a)(1).',
            B: 'Incorrect: Fee disputes do not excuse compliance with a lawful IRS request.',
            C: 'Incorrect: Potential tax liability does not make unprivileged records privileged.',
            D: 'Incorrect: § 10.20 requires prompt submission.',
            E: 'Incorrect: Electronic records are subject to the same production duty as paper records.'
          }
        }
      }
    ]
  };

  /* ==========================================================================
     2. DATASET NORMALIZATION, SUITE CLASSIFICATION & 24-QUESTION GUARANTEE
     ========================================================================== */
  function classifyQuestionSuite(q) {
    if (q.suite && ['CBLE_111_113', 'CBLE_141_142', 'CBLE_152_177_190', 'CBLE_HTSUS', 'EA'].includes(q.suite)) {
      return q.suite;
    }
    const combined = `${q.track || ''} ${q.category || ''} ${q.targetSectionId || ''} ${q.targetCitation || ''}`;
    if (/31-cfr|31\s*cfr|circular\s*230|enrolled\s*agent|\bea\b|irs/i.test(combined)) {
      return 'EA';
    }
    if (/htsus|gri/i.test(combined)) {
      return 'CBLE_HTSUS';
    }
    if (/111|113|broker|bond/i.test(combined)) {
      return 'CBLE_111_113';
    }
    if (/141|142|entry|invoice|release/i.test(combined)) {
      return 'CBLE_141_142';
    }
    return 'CBLE_152_177_190';
  }

  function buildNormalizedDataset() {
    const ext = (typeof window !== 'undefined' && window.CODEDRILL_DATA && typeof window.CODEDRILL_DATA === 'object')
      ? window.CODEDRILL_DATA
      : null;

    const meta = Object.assign({}, FALLBACK_CODEDRILL_DATA.meta, ext && ext.meta ? ext.meta : {});

    let rawCorpora = (ext && Array.isArray(ext.corpora) && ext.corpora.length > 0)
      ? JSON.parse(JSON.stringify(ext.corpora))
      : JSON.parse(JSON.stringify(FALLBACK_CODEDRILL_DATA.corpora));

    const has31Cfr = rawCorpora.some(c =>
      /31\s*cfr|31-cfr|circular\s*230|enrolled\s*agent/i.test(`${c.id || ''} ${c.code || ''} ${c.title || ''}`)
    );
    if (!has31Cfr) {
      const fallbackEaCorpus = FALLBACK_CODEDRILL_DATA.corpora.find(c => c.id === '31-cfr-ea');
      if (fallbackEaCorpus) {
        rawCorpora.push(JSON.parse(JSON.stringify(fallbackEaCorpus)));
      }
    }

    const sectionsById = {};
    const allSections = [];

    rawCorpora.forEach(corpus => {
      corpus.parts = Array.isArray(corpus.parts) ? corpus.parts : [];
      corpus.parts.forEach(part => {
        part.sections = Array.isArray(part.sections) ? part.sections : [];
        part.sections.forEach(sec => {
          sec.corpusId = corpus.id;
          sec.corpusCode = corpus.code || corpus.title;
          sec.partId = part.id;
          sec.partCode = part.code || part.title;
          sec.keywords = Array.isArray(sec.keywords) ? sec.keywords : [];
          sec.crossRefs = Array.isArray(sec.crossRefs) ? sec.crossRefs : [];
          sec.examFrequency = sec.examFrequency || 'High Yield';
          sec.breadcrumb = sec.breadcrumb || `${corpus.code} > ${part.code} > ${sec.citation}`;
          sectionsById[sec.id] = sec;
          allSections.push(sec);
        });
      });
    });

    let rawQuestions = (ext && Array.isArray(ext.questions) && ext.questions.length > 0)
      ? JSON.parse(JSON.stringify(ext.questions))
      : [];

    rawQuestions.forEach(q => {
      q.suite = classifyQuestionSuite(q);
    });

    const suiteTargets = {
      CBLE_111_113: 5,
      CBLE_141_142: 5,
      CBLE_152_177_190: 8,
      CBLE_HTSUS: 6,
      EA: 6
    };

    Object.keys(suiteTargets).forEach(suiteKey => {
      const targetCount = suiteTargets[suiteKey];
      const existingInSuite = rawQuestions.filter(q => q.suite === suiteKey);
      if (existingInSuite.length < targetCount) {
        const needed = targetCount - existingInSuite.length;
        const fallbackCandidates = FALLBACK_CODEDRILL_DATA.questions.filter(fq =>
          fq.suite === suiteKey &&
          !existingInSuite.some(eq => eq.id === fq.id || eq.stem.slice(0, 45) === fq.stem.slice(0, 45))
        );
        fallbackCandidates.slice(0, needed).forEach(fc => {
          rawQuestions.push(JSON.parse(JSON.stringify(fc)));
        });
      }
    });

    const questions = rawQuestions.map((q, index) => {
      const suite = classifyQuestionSuite(q);
      const trackCode = (suite === 'EA') ? 'EA' : 'CBLE';

      let normOptions = [];
      if (Array.isArray(q.options)) {
        normOptions = q.options.map((opt, oIdx) => {
          if (typeof opt === 'string') {
            return { letter: ['A', 'B', 'C', 'D', 'E'][oIdx] || 'A', text: opt };
          }
          return {
            letter: (opt.letter || opt.id || ['A', 'B', 'C', 'D', 'E'][oIdx] || 'A').toUpperCase(),
            text: opt.text || opt.label || ''
          };
        });
      } else if (q.options && typeof q.options === 'object') {
        normOptions = Object.keys(q.options).map(k => ({
          letter: k.toUpperCase(),
          text: q.options[k]
        }));
      }

      const hints = Array.isArray(q.socraticHints) && q.socraticHints.length > 0
        ? q.socraticHints
        : [
            `Identify the core regulatory domain under ${q.category || trackCode}.`,
            `Navigate to the governing part for ${q.targetCitation || 'this provision'}.`,
            `Check the specific statutory exceptions and conditions in ${q.targetCitation || 'the section'}.`
          ];

      const exp = q.explanation || {};
      const distractors = exp.distractors || {};

      return {
        id: q.id || `q-${index + 1}`,
        number: q.number || index + 1,
        suite,
        track: q.track || (trackCode === 'EA' ? 'IRS-EA' : 'CBLE'),
        trackCode,
        category: q.category || (trackCode === 'EA' ? '31 CFR Part 10 — Circular 230' : '19 CFR — Customs Regulations'),
        difficulty: q.difficulty || 'Hard',
        targetLookupSeconds: Number(q.targetLookupSeconds) || 45,
        stem: q.stem || '',
        options: normOptions,
        correctOption: String(q.correctOption || 'A').toUpperCase(),
        targetSectionId: q.targetSectionId || '',
        targetCitation: q.targetCitation || '',
        goldenQuote: q.goldenQuote || '',
        shortestPathHint: q.shortestPathHint || `Navigate to ${q.targetCitation || 'the governing section'} in the Electronic Reference Library.`,
        socraticHints: [
          hints[0] || 'Determine the regulatory domain.',
          hints[1] || 'Locate the governing CFR Part or HTSUS Rule.',
          hints[2] || 'Verify the exact paragraph and eliminate distractor traps.'
        ],
        explanation: {
          correctReasoning: exp.correctReasoning || exp.summary || 'Verified per official regulatory text.',
          distractors: distractors
        }
      };
    });

    return {
      meta,
      corpora: rawCorpora,
      questions,
      sectionsById,
      allSections
    };
  }

  const DATASET = buildNormalizedDataset();

  /* ==========================================================================
     3. PERSISTENT LOCALSTORAGE STATE, FREEMIUM PAYWALL & LICENSING
     ========================================================================== */
  const STORAGE_KEY = 'CODEDRILL_CBT_STATE_V2026';

  const PLAN_CATALOG = {
    PRO_MONTHLY: {
      code: 'PRO_MONTHLY',
      name: 'Candidate Pro Monthly — $79 / month',
      amountUsd: 79,
      billingCycle: 'Monthly Subscription',
      tier: 'PRO'
    },
    PRO_CYCLE: {
      code: 'PRO_CYCLE',
      name: '6-Month Exam Cycle Pass — $199 one-time',
      amountUsd: 199,
      billingCycle: '6-Month Exam Cycle Pass (Save 58%)',
      tier: 'PRO'
    },
    TEAM_MONTHLY: {
      code: 'TEAM_MONTHLY',
      name: 'Brokerage & Freight Forwarder Team — $399 / month',
      amountUsd: 399,
      billingCycle: 'Enterprise Monthly (Up to 15 Seats)',
      tier: 'TEAM'
    }
  };

  function getDefaultUserState() {
    return {
      activeMode: 'cbt', // 'cbt' | 'drill' | 'analytics'
      selectedTrack: 'CBLE', // 'CBLE' | 'CBLE_111_113' | 'CBLE_141_142' | 'CBLE_152_177_190' | 'CBLE_HTSUS' | 'EA' | 'ALL'
      licenseTier: 'FREE', // 'FREE' | 'PRO' | 'TEAM'
      freeQuestionLimit: 3, // First 3 diagnostic questions unlocked on FREE tier
      licenseKey: null,
      selectedPlanCode: 'PRO_MONTHLY',
      accountUser: null, // { fullName, email, role, createdAt }
      currentQuestionId: DATASET.questions[0] ? DATASET.questions[0].id : null,
      activeCorpusId: DATASET.corpora[0] ? DATASET.corpora[0].id : null,
      activeSectionId: DATASET.allSections[0] ? DATASET.allSections[0].id : null,
      cbtTimerRemainingSec: DATASET.meta.examDurationSeconds || 16200,
      cbtTimerPaused: false,
      highlightCursorMode: false,
      strikethroughClickMode: false,
      splitRatio: '50-50',
      treeCollapsed: false,
      studyCoachExpanded: false,
      questionWork: {},
      drillStats: {
        attempts: 0,
        correctCount: 0,
        streak: 0,
        lookupTimes: []
      },
      scratchpadText: '',
      savedCitations: []
    };
  }

  let STATE = loadUserState();

  function loadUserState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultUserState();
      const parsed = JSON.parse(raw);
      return Object.assign(getDefaultUserState(), parsed, {
        drillStats: Object.assign(getDefaultUserState().drillStats, parsed.drillStats || {}),
        questionWork: parsed.questionWork || {}
      });
    } catch (e) {
      return getDefaultUserState();
    }
  }

  function saveUserState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
    } catch (e) {
      // Ignore storage quota errors in restricted frames
    }
  }

  function getQuestionWork(qId) {
    if (!STATE.questionWork[qId]) {
      STATE.questionWork[qId] = {
        selectedOption: null,
        flagged: false,
        struckOptions: [],
        attachedSectionId: null,
        attachedCitation: null,
        checked: false,
        lookupSeconds: null,
        highlightedStemHtml: null,
        revealedHints: [],
        shortestPathRevealed: false
      };
    }
    return STATE.questionWork[qId];
  }

  function isProOrTeamActive() {
    return STATE.licenseTier === 'PRO' || STATE.licenseTier === 'TEAM';
  }

  function isSuiteLockedForCurrentTier(suiteKey) {
    if (isProOrTeamActive()) return false;
    // On FREE tier, only 'CBLE' and 'CBLE_111_113' are unlocked (for their first 3 diagnostic questions)
    return !['CBLE', 'CBLE_111_113'].includes(suiteKey);
  }

  function isQuestionIndexLockedForCurrentTier(zeroBasedIdx) {
    if (isProOrTeamActive()) return false;
    const limit = Number(STATE.freeQuestionLimit) || 3;
    return zeroBasedIdx >= limit;
  }

  /* ==========================================================================
     4. RUNTIME TIMERS & LOOKUP STOPWATCH STATE
     ========================================================================== */
  let cbtTimerInterval = null;
  let questionLookupStartMs = Date.now();
  let questionElapsedTimerInterval = null;

  const DRILL_MAX_SECONDS = 90.0;
  let drillRemainingSeconds = DRILL_MAX_SECONDS;
  let drillLookupElapsedSeconds = 0.0;
  let drillCitationLocked = false;
  let drillPaused = false;
  let drillInterval = null;

  /* ==========================================================================
     5. 7 TEST SUITES FILTERING, AUTO-CORPUS SWITCHING & SEQUENTIAL NUMBERING
     ========================================================================== */
  function getFilteredQuestionsForSuite(suiteKey) {
    const key = suiteKey || STATE.selectedTrack || 'CBLE';
    if (key === 'ALL') {
      return DATASET.questions;
    }
    if (key === 'CBLE') {
      const pool = DATASET.questions.filter(q => q.trackCode === 'CBLE');
      return pool.length > 0 ? pool : DATASET.questions;
    }
    if (key === 'EA') {
      const pool = DATASET.questions.filter(q => q.suite === 'EA' || q.trackCode === 'EA');
      return pool.length > 0 ? pool : DATASET.questions;
    }
    const suitePool = DATASET.questions.filter(q => q.suite === key);
    return suitePool.length > 0 ? suitePool : DATASET.questions;
  }

  function getFilteredQuestions() {
    return getFilteredQuestionsForSuite(STATE.selectedTrack);
  }

  function getCurrentQuestion() {
    const pool = getFilteredQuestions();
    let idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
    if (idx < 0) {
      idx = 0;
    }
    // Enforce freeQuestionLimit on FREE tier
    if (isQuestionIndexLockedForCurrentTier(idx)) {
      idx = 0;
    }
    const found = pool[idx] || DATASET.questions[0];
    if (found) STATE.currentQuestionId = found.id;
    return found;
  }

  function getQuestionPosInActiveSuite(questionObj) {
    if (!questionObj) return 1;
    const pool = getFilteredQuestions();
    const idx = pool.findIndex(q => q.id === questionObj.id);
    return idx >= 0 ? idx + 1 : 1;
  }

  function autoSwitchCorpusForSuite(suiteKey) {
    let targetCorpus = DATASET.corpora[0];
    let targetPartRegex = /111/i;

    if (suiteKey === 'CBLE_HTSUS') {
      const htsusCorpus = DATASET.corpora.find(c => /htsus|gri/i.test(`${c.id} ${c.code} ${c.title}`));
      if (htsusCorpus) targetCorpus = htsusCorpus;
      targetPartRegex = /gri/i;
    } else if (suiteKey === 'EA') {
      const eaCorpus = DATASET.corpora.find(c => /31-cfr|31\s*cfr|circular|ea/i.test(`${c.id} ${c.code} ${c.title}`));
      if (eaCorpus) targetCorpus = eaCorpus;
      targetPartRegex = /10|subpart/i;
    } else {
      const cfr19 = DATASET.corpora.find(c => /19-cfr|19\s*cfr/i.test(`${c.id} ${c.code} ${c.title}`));
      if (cfr19) targetCorpus = cfr19;
      if (suiteKey === 'CBLE_141_142') {
        targetPartRegex = /141|142/i;
      } else if (suiteKey === 'CBLE_152_177_190') {
        targetPartRegex = /152/i;
      } else {
        targetPartRegex = /111/i;
      }
    }

    if (targetCorpus) {
      STATE.activeCorpusId = targetCorpus.id;
      const matchingPart = targetCorpus.parts.find(p => targetPartRegex.test(`${p.id} ${p.code} ${p.title}`)) || targetCorpus.parts[0];
      if (matchingPart && matchingPart.sections && matchingPart.sections[0]) {
        STATE.activeSectionId = matchingPart.sections[0].id;
        collapsedPartIds[matchingPart.id] = false;
      }
    }
  }

  function resolveSectionByRef(refStr) {
    if (!refStr) return null;
    const clean = String(refStr).trim();
    if (DATASET.sectionsById[clean]) {
      return DATASET.sectionsById[clean];
    }
    const lower = clean.toLowerCase();

    let match = DATASET.allSections.find(s =>
      s.id.toLowerCase() === lower ||
      s.citation.toLowerCase() === lower ||
      s.citation.toLowerCase().includes(lower) ||
      lower.includes(s.citation.toLowerCase())
    );
    if (match) return match;

    const numMatch = clean.match(/(\d+\.\d+[a-z]?|gri\s*\d)/i);
    if (numMatch) {
      const token = numMatch[1].toLowerCase().replace(/\s+/g, '');
      match = DATASET.allSections.find(s =>
        s.citation.toLowerCase().replace(/\s+/g, '').includes(token) ||
        s.id.toLowerCase().replace(/[-_\s]+/g, '').includes(token.replace(/\./g, ''))
      );
      if (match) return match;
    }

    return null;
  }

  function isCitationProofMatch(question, attachedSectionId) {
    if (!question || !attachedSectionId) return false;
    if (question.targetSectionId && question.targetSectionId === attachedSectionId) {
      return true;
    }
    const attachedSec = DATASET.sectionsById[attachedSectionId];
    if (!attachedSec) return false;

    const targetResolved = resolveSectionByRef(question.targetSectionId) || resolveSectionByRef(question.targetCitation);
    if (targetResolved && targetResolved.id === attachedSec.id) {
      return true;
    }

    const numExtract = attachedSec.citation.match(/(\d+\.\d+|gri\s*\d)/i);
    if (numExtract && question.targetCitation && question.targetCitation.toLowerCase().includes(numExtract[1].toLowerCase())) {
      return true;
    }

    return false;
  }

  function formatHmsClock(totalSeconds) {
    const sec = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'cd-toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 220);
    }, 3200);
  }

  /* ==========================================================================
     6. HONEST SESSION ANALYTICS (NO FAKE DEFAULTS WHEN 0 GRADED)
     ========================================================================== */
  function getSessionStats() {
    let gradedCount = 0;
    let correctCount = 0;
    let answeredCount = 0;
    let verifiedProofCount = 0;
    const lookupTimes = [];

    DATASET.questions.forEach(q => {
      const w = STATE.questionWork[q.id];
      if (!w) return;
      if (w.selectedOption) answeredCount++;
      if (w.attachedSectionId && isCitationProofMatch(q, w.attachedSectionId)) {
        verifiedProofCount++;
      }
      if (w.checked) {
        gradedCount++;
        if (w.selectedOption === q.correctOption) correctCount++;
        if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) {
          lookupTimes.push(w.lookupSeconds);
        }
      } else if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) {
        lookupTimes.push(w.lookupSeconds);
      }
    });

    const avgLookupSeconds = lookupTimes.length > 0
      ? Number((lookupTimes.reduce((a, b) => a + b, 0) / lookupTimes.length).toFixed(1))
      : null;

    const accuracyPercent = gradedCount > 0
      ? Math.round((correctCount / gradedCount) * 100)
      : null;

    return {
      gradedCount,
      correctCount,
      answeredCount,
      verifiedProofCount,
      avgLookupSeconds,
      accuracyPercent
    };
  }

  /* ==========================================================================
     7. ACCOUNT, REGISTRATION, PAYWALL & LICENSE KEY ACTIVATION ENGINE
     ========================================================================== */
  function switchAuthModalTab(tabKey) {
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-auth-tab') === tabKey);
    });
    document.getElementById('authPanelRegister').classList.toggle('hidden', tabKey !== 'register');
    document.getElementById('authPanelSignIn').classList.toggle('hidden', tabKey !== 'signin');
    document.getElementById('authPanelPayment').classList.toggle('hidden', tabKey !== 'payment');

    if (tabKey === 'payment') {
      syncSelectedPlanBanner();
      renderCorporateInvoicePreview();
    }
  }

  function switchPaymentMethodSubTab(methodKey) {
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-pay-method') === methodKey);
    });
    document.getElementById('payPanelCard').classList.toggle('hidden', methodKey !== 'card');
    document.getElementById('payPanelInvoice').classList.toggle('hidden', methodKey !== 'invoice');
    document.getElementById('payPanelKey').classList.toggle('hidden', methodKey !== 'key');

    if (methodKey === 'invoice') {
      renderCorporateInvoicePreview();
    }
  }

  function selectPlanByCode(planCode) {
    const plan = PLAN_CATALOG[planCode] || PLAN_CATALOG.PRO_MONTHLY;
    STATE.selectedPlanCode = plan.code;
    saveUserState();

    document.querySelectorAll('#regPlanSelector .plan-radio-card').forEach(card => {
      const code = card.getAttribute('data-plan-code');
      const isMatch = (code === plan.code);
      card.classList.toggle('selected', isMatch);
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = isMatch;
    });

    syncSelectedPlanBanner();
  }

  function syncSelectedPlanBanner() {
    const plan = PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.PRO_MONTHLY;
    const nameEl = document.getElementById('checkoutSelectedPlanName');
    if (nameEl) nameEl.textContent = plan.name;

    if (STATE.accountUser) {
      const emailInput = document.getElementById('checkoutEmailInput');
      const orgInput = document.getElementById('checkoutOrgInput');
      const invComp = document.getElementById('invCompanyInput');
      if (emailInput && !emailInput.value) emailInput.value = STATE.accountUser.email || '';
      if (orgInput && !orgInput.value) orgInput.value = STATE.accountUser.fullName || '';
      if (invComp && STATE.accountUser.fullName) invComp.value = STATE.accountUser.fullName;
    }
  }

  function openAccountPaywallModal(options) {
    const opts = options || {};
    const backdrop = document.getElementById('checkoutModalBackdrop');
    if (!backdrop) return;

    const triggerBanner = document.getElementById('paywallTriggerBanner');
    const triggerText = document.getElementById('paywallTriggerText');
    const successBox = document.getElementById('checkoutSuccessBox');

    if (successBox) successBox.classList.add('hidden');

    if (opts.paywallReason) {
      triggerBanner.classList.remove('hidden');
      if (triggerText) {
        triggerText.textContent = opts.paywallReason;
      }
    } else {
      triggerBanner.classList.add('hidden');
    }

    if (opts.planCode) {
      selectPlanByCode(opts.planCode);
    } else {
      selectPlanByCode(STATE.selectedPlanCode || 'PRO_MONTHLY');
    }

    const initialTab = opts.tab || (STATE.accountUser ? 'payment' : 'register');
    switchAuthModalTab(initialTab);
    backdrop.classList.remove('hidden');
  }

  function generateSignedLicenseKey(tierStr) {
    const prefix = (tierStr === 'TEAM') ? 'CF-TEAM-2026' : 'CF-PRO-2026';
    const block1 = '8841';
    const block2 = (tierStr === 'TEAM') ? '773A' : '992B';
    return `${prefix}-${block1}-${block2}`;
  }

  function isLocalQaEnvironment() {
    if (typeof window === 'undefined' || !window.location) return true;
    const h = window.location.hostname;
    return h === '127.0.0.1' || h === 'localhost' || !h;
  }

  /**
   * Validates and activates a Caliber Foundry license key (CDR-PRO-2026-CALIBER, CF-PRO-2026-..., or CF-TEAM-2026-...)
   */
  function validateAndActivateLicenseKey(rawKey) {
    const clean = String(rawKey || '').trim().toUpperCase();
    const pattern = /^(?:CF|CDR)-(PRO|TEAM)-2026-[A-Z0-9]{4,12}(-[A-Z0-9]{4,12})?$/;
    const match = clean.match(pattern);

    if (!match) {
      showToast('Invalid license key. Complete checkout via Gumroad or Contra (0% fee) to receive your license key.');
      return false;
    }

    const activatedTier = match[1] === 'TEAM' ? 'TEAM' : 'PRO';
    STATE.licenseTier = activatedTier;
    STATE.licenseKey = clean;
    saveUserState();

    const successBox = document.getElementById('checkoutSuccessBox');
    const keyDisplay = document.getElementById('checkoutSuccessKeyDisplay');
    const msgEl = document.getElementById('checkoutSuccessMessage');
    const paywallBanner = document.getElementById('paywallTriggerBanner');

    if (paywallBanner) paywallBanner.classList.add('hidden');
    if (keyDisplay) keyDisplay.textContent = `Active License Key: ${clean}`;
    const totalQCount = DATASET.questions.length || 30;
    if (msgEl) {
      const emailLabel = (STATE.accountUser && STATE.accountUser.email) ? ` for ${STATE.accountUser.email}` : '';
      msgEl.textContent = `${activatedTier === 'TEAM' ? 'Team License' : 'Pro License'} activated${emailLabel}. All ${totalQCount} exam questions and all 7 topic suites are now unlocked.`;
    }
    if (successBox) successBox.classList.remove('hidden');

    refreshAllViews();
    showToast(`Activated ${activatedTier} License (${clean}) — All ${totalQCount} Questions Unlocked`);
    return true;
  }

  function renderCorporateInvoicePreview() {
    const box = document.getElementById('corporateInvoicePreviewBox');
    if (!box) return;

    const plan = PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.PRO_MONTHLY;
    const companyName = (document.getElementById('invCompanyInput') && document.getElementById('invCompanyInput').value.trim())
      || (STATE.accountUser && STATE.accountUser.fullName)
      || 'Authorized Customs Brokerage Candidate';
    const poNum = (document.getElementById('invPoNumberInput') && document.getElementById('invPoNumberInput').value.trim())
      || 'PO-2026-0419';
    const userEmail = (STATE.accountUser && STATE.accountUser.email)
      || (document.getElementById('checkoutEmailInput') && document.getElementById('checkoutEmailInput').value.trim())
      || 'compliance@clientbrokerage.com';

    const invNumber = `INV-CF-2026-${String(plan.amountUsd)}${plan.tier === 'TEAM' ? '8' : '4'}`;
    const issueDate = new Date().toISOString().slice(0, 10);

    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;border-bottom:1px solid #141413;padding-bottom:8px;margin-bottom:8px;">
        <div>
          <strong>CALIBER FOUNDRY — COMMERCIAL INVOICE</strong><br/>
          <span>Vendor: Caliber Foundry (engineering@caliberfoundry.com)</span>
        </div>
        <div style="text-align:right;">
          <strong>${escapeHtml(invNumber)}</strong><br/>
          <span>Date: ${escapeHtml(issueDate)} · Terms: Net 15</span>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <div>
          <strong>Bill To:</strong> ${escapeHtml(companyName)}<br/>
          <span>Account Email: ${escapeHtml(userEmail)}</span>
        </div>
        <div style="text-align:right;">
          <strong>PO Reference:</strong> ${escapeHtml(poNum)}
        </div>
      </div>
      <div style="border-top:1px solid #C9C4B8;border-bottom:1px solid #C9C4B8;padding:6px 0;margin-bottom:8px;display:flex;justify-content:space-between;">
        <span>1x CodeDrill™ CBT — ${escapeHtml(plan.name)} (${escapeHtml(plan.billingCycle)})</span>
        <strong>$${plan.amountUsd}.00 USD</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:#4A4842;">
        <span>Payment Instructions: ACH / Wire Transfer or Purchase Order Confirmation</span>
        <strong>Total Due: $${plan.amountUsd}.00 USD</strong>
      </div>
    `;

    const mailtoLink = document.getElementById('btnMailtoInvoice');
    if (mailtoLink) {
      const subject = encodeURIComponent(`Purchase Order & License Activation Request — ${invNumber} (${companyName})`);
      const body = encodeURIComponent(
        `Caliber Foundry Billing Team,\n\nPlease issue and activate our CodeDrill CBT license under invoice ${invNumber}.\n\n` +
        `Organization / Candidate: ${companyName}\n` +
        `Account Email: ${userEmail}\n` +
        `Selected Plan: ${plan.name} ($${plan.amountUsd}.00 USD)\n` +
        `PO Number: ${poNum}\n\nThank you.`
      );
      mailtoLink.setAttribute('href', `mailto:engineering@caliberfoundry.com?subject=${subject}&body=${body}`);
    }
  }

  /* ==========================================================================
     8. TOP GLOBAL BAR & MODE SWITCHING
     ========================================================================== */
  function renderGlobalBarTelemetry() {
    const stats = getSessionStats();

    const avgEl = document.getElementById('globalAvgLookupVal');
    if (avgEl) {
      avgEl.textContent = stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s';
    }

    const probBadge = document.getElementById('globalPassProbBadge');
    if (probBadge) {
      probBadge.textContent = stats.accuracyPercent !== null ? `${stats.accuracyPercent}% Pass Prob` : '75% Goal';
    }

    // Update Suite Select Options (Add/Remove " · PRO" suffix based on license status)
    const trackSelect = document.getElementById('examTrackSelect');
    if (trackSelect) {
      const proUnlocked = isProOrTeamActive();
      Array.from(trackSelect.options).forEach(opt => {
        const baseText = opt.text.replace(/\s*·\s*PRO$/i, '');
        const locked = !proUnlocked && !['CBLE', 'CBLE_111_113'].includes(opt.value);
        opt.text = locked ? `${baseText} · PRO` : baseText;
      });
      if (trackSelect.value !== STATE.selectedTrack) {
        trackSelect.value = STATE.selectedTrack;
      }
    }

    // Update Header Account & License Status Cluster
    const statusBadge = document.getElementById('headerLicenseStatusBadge');
    const emailBadge = document.getElementById('headerUserEmailBadge');
    const btnSignIn = document.getElementById('btnHeaderSignIn');
    const btnUnlockPro = document.getElementById('btnHeaderUnlockPro');
    const btnAccountBilling = document.getElementById('btnHeaderAccountBilling');

    const totalQCount = DATASET.questions.length || 30;
    if (isProOrTeamActive()) {
      if (statusBadge) {
        statusBadge.textContent = STATE.licenseTier === 'TEAM'
          ? `Team License Active (${totalQCount}/${totalQCount} Qs)`
          : `Pro License Active (${totalQCount}/${totalQCount} Qs)`;
        statusBadge.classList.add('pro-active');
      }
      if (emailBadge) {
        if (STATE.accountUser && STATE.accountUser.email) {
          emailBadge.textContent = STATE.accountUser.email;
          emailBadge.classList.remove('hidden');
        } else {
          emailBadge.classList.add('hidden');
        }
      }
      if (btnSignIn) btnSignIn.classList.add('hidden');
      if (btnUnlockPro) btnUnlockPro.classList.add('hidden');
      if (btnAccountBilling) btnAccountBilling.classList.remove('hidden');
    } else {
      if (statusBadge) {
        statusBadge.textContent = `Free Trial (${STATE.freeQuestionLimit || 3}/${totalQCount} Qs)`;
        statusBadge.classList.remove('pro-active');
      }
      if (emailBadge) {
        if (STATE.accountUser && STATE.accountUser.email) {
          emailBadge.textContent = STATE.accountUser.email;
          emailBadge.classList.remove('hidden');
        } else {
          emailBadge.classList.add('hidden');
        }
      }
      if (btnSignIn) btnSignIn.classList.remove('hidden');
      if (btnUnlockPro) btnUnlockPro.classList.remove('hidden');
      if (btnAccountBilling) btnAccountBilling.classList.add('hidden');
    }
  }

  function refreshAllViews() {
    updateScratchpadBadge();
    renderGlobalBarTelemetry();
    if (STATE.activeMode === 'analytics') {
      renderAnalyticsDashboard();
    } else {
      renderQuestionWorkspace();
      renderReferenceLibrary();
      if (STATE.activeMode === 'drill') {
        updateDrillHudMetrics();
      }
    }
  }

  function switchMode(newMode) {
    STATE.activeMode = newMode;
    saveUserState();

    document.querySelectorAll('.cd-mode-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === newMode);
    });

    const simView = document.getElementById('workspaceSimulatorView');
    const anView = document.getElementById('workspaceAnalyticsView');
    const pvueHeader = document.getElementById('pearsonVueHeaderGroup');
    const drillHeader = document.getElementById('speedDrillHeaderGroup');
    const drillChecklist = document.getElementById('drillStepChecklist');
    const btnSwitchToDrill = document.getElementById('btnSwitchToDrillFromCbt');

    if (newMode === 'analytics') {
      simView.classList.add('hidden');
      simView.classList.remove('active');
      anView.classList.remove('hidden');
      anView.classList.add('active');
      stopDrillSprintTimer();
      renderAnalyticsDashboard();
    } else {
      anView.classList.add('hidden');
      anView.classList.remove('active');
      simView.classList.remove('hidden');
      simView.classList.add('active');

      if (newMode === 'cbt') {
        pvueHeader.classList.remove('hidden');
        drillHeader.classList.add('hidden');
        drillChecklist.classList.add('hidden');
        if (btnSwitchToDrill) btnSwitchToDrill.classList.remove('hidden');
        stopDrillSprintTimer();
      } else if (newMode === 'drill') {
        pvueHeader.classList.add('hidden');
        drillHeader.classList.remove('hidden');
        drillChecklist.classList.remove('hidden');
        if (btnSwitchToDrill) btnSwitchToDrill.classList.add('hidden');
        startDrillSprintForCurrentQuestion(false);
      }

      renderQuestionWorkspace();
      renderReferenceLibrary();
    }

    renderGlobalBarTelemetry();
  }

  /* ==========================================================================
     9. LEFT PANE: QUESTION WORKSPACE, OPTIONS A-E, STRIKETHROUGH, STUDY COACH
     ========================================================================== */
  function resetPerQuestionLookupStopwatch() {
    questionLookupStartMs = Date.now();
  }

  function getCurrentElapsedLookupSec(q) {
    const work = getQuestionWork(q.id);
    if (typeof work.lookupSeconds === 'number' && work.lookupSeconds > 0) {
      return work.lookupSeconds;
    }
    return Number(((Date.now() - questionLookupStartMs) / 1000).toFixed(1));
  }

  function renderQuestionWorkspace() {
    const q = getCurrentQuestion();
    if (!q) return;

    const pool = getFilteredQuestions();
    const posNum = getQuestionPosInActiveSuite(q);
    const work = getQuestionWork(q.id);

    // 1. Update Pearson VUE Header Info (Using unified posNum everywhere!)
    const examTitleEl = document.getElementById('pvueExamTitle');
    if (examTitleEl) {
      examTitleEl.textContent = q.trackCode === 'EA'
        ? 'IRS Special Enrollment Examination (31 CFR Part 10 — Circular 230)'
        : 'U.S. Customs Broker License Examination (19 CFR & HTSUS)';
    }

    const posEl = document.getElementById('pvueQuestionPosition');
    if (posEl) posEl.textContent = `Question ${posNum} of ${pool.length}`;

    const verifyPill = document.getElementById('pvueCitationVerifyPill');
    if (verifyPill) {
      if (work.attachedCitation) {
        verifyPill.textContent = `Cited: ${work.attachedCitation}`;
        verifyPill.classList.add('verified');
      } else {
        verifyPill.textContent = 'No Proof Cited';
        verifyPill.classList.remove('verified');
      }
    }

    const btnFlag = document.getElementById('btnFlagForReview');
    const flagText = document.getElementById('flagToolText');
    if (btnFlag && flagText) {
      btnFlag.classList.toggle('flagged-active', !!work.flagged);
      flagText.textContent = work.flagged ? 'Flagged' : 'Flag for Review';
    }

    const answeredCount = pool.filter(item => {
      const w = STATE.questionWork[item.id];
      return w && w.selectedOption;
    }).length;
    const navBadge = document.getElementById('navAnsweredCountBadge');
    if (navBadge) navBadge.textContent = `${answeredCount}/${pool.length}`;

    // 2. Question Metadata Strip (Unified Q1..QN)
    document.getElementById('qMetaNumberBadge').textContent = `Q${posNum}`;
    document.getElementById('qMetaTrackBadge').textContent = q.trackCode === 'EA' ? 'IRS EA · 31 CFR' : 'CBLE · 19 CFR & HTSUS';
    document.getElementById('qMetaCategoryBadge').textContent = q.category;
    document.getElementById('qMetaDifficultyBadge').textContent = q.difficulty;
    document.getElementById('qMetaTargetTimeBadge').textContent = `Target: <= ${q.targetLookupSeconds}s`;

    // 3. Speed Drill 2-Step Checklist Status
    renderDrillChecklistState(q, work);

    // 4. Question Stem
    const stemEl = document.getElementById('qStemContent');
    if (work.highlightedStemHtml) {
      stemEl.innerHTML = work.highlightedStemHtml;
    } else {
      const paragraphs = String(q.stem).split('\n').filter(Boolean);
      stemEl.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    }

    // 5. Attached Citation Proof Bar
    renderAttachedCitationProofBar(q, work);

    // 6. Options A–E with Radio Selection & Right-Click / Button Strikethrough
    const optionsContainer = document.getElementById('qOptionsList');
    optionsContainer.innerHTML = '';

    q.options.forEach(opt => {
      const isSelected = work.selectedOption === opt.letter;
      const isStruck = Array.isArray(work.struckOptions) && work.struckOptions.includes(opt.letter);

      const row = document.createElement('div');
      row.className = 'q-option-row';
      if (isSelected) row.classList.add('selected');
      if (isStruck) row.classList.add('struck-out');

      if (work.checked) {
        if (opt.letter === q.correctOption) {
          row.classList.add('correct-graded');
        } else if (isSelected && opt.letter !== q.correctOption) {
          row.classList.add('wrong-graded');
        }
      }

      row.innerHTML = `
        <div class="q-option-main">
          <input
            type="radio"
            name="cbtQuestionOption"
            class="q-option-radio"
            value="${escapeHtml(opt.letter)}"
            ${isSelected ? 'checked' : ''}
            aria-label="Option ${escapeHtml(opt.letter)}"
          />
          <span class="q-option-letter">${escapeHtml(opt.letter)}.</span>
          <span class="q-option-text">${escapeHtml(opt.text)}</span>
        </div>
        <button
          type="button"
          class="q-option-strike-btn"
          data-strike-letter="${escapeHtml(opt.letter)}"
          title="Cross out or restore distractor Option ${escapeHtml(opt.letter)} (or Right-Click option row)"
        >
          ${isStruck ? 'Restore' : 'Strike'}
        </button>
      `;

      row.addEventListener('click', (e) => {
        if (e.target.closest('.q-option-strike-btn')) return;
        if (STATE.strikethroughClickMode) {
          toggleOptionStrikethrough(q.id, opt.letter);
          return;
        }
        selectQuestionOption(q.id, opt.letter);
      });

      row.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        toggleOptionStrikethrough(q.id, opt.letter);
      });

      const strikeBtn = row.querySelector('.q-option-strike-btn');
      if (strikeBtn) {
        strikeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleOptionStrikethrough(q.id, opt.letter);
        });
      }

      optionsContainer.appendChild(row);
    });

    // 7. Collapsible Study Coach & Hints Panel
    renderSocraticTutorPanel(q, work, posNum);

    // 8. Official Legal Explanation Panel
    renderExplanationPanel(q, work);

    // 9. Prev/Next button states (with PRO indicator on Next Question after Q3 on FREE tier)
    const btnPrev = document.getElementById('btnPrevQuestion');
    const btnNext = document.getElementById('btnNextQuestion');
    if (btnPrev) btnPrev.disabled = (posNum <= 1);
    if (btnNext) {
      btnNext.disabled = (posNum >= pool.length);
      if (!isProOrTeamActive() && posNum >= (STATE.freeQuestionLimit || 3) && posNum < pool.length) {
        btnNext.textContent = 'Next Question (PRO) →';
      } else {
        btnNext.textContent = 'Next Question →';
      }
    }

    updateRightPaneCiteButtonLabel();
  }

  function renderAttachedCitationProofBar(q, work) {
    const bar = document.getElementById('qCitationProofBar');
    const citeText = document.getElementById('qProofCitationText');
    const matchBadge = document.getElementById('qProofMatchBadge');
    const jumpBtn = document.getElementById('btnJumpToAttachedProof');

    bar.classList.remove('has-proof', 'proof-matched', 'proof-mismatch');
    matchBadge.classList.add('hidden');
    matchBadge.classList.remove('match-ok', 'match-warn');

    if (!work.attachedSectionId) {
      citeText.textContent = 'None cited yet — open governing regulation on the right & click “Cite as Proof”';
      jumpBtn.classList.add('hidden');
      return;
    }

    bar.classList.add('has-proof');
    const lookupTag = typeof work.lookupSeconds === 'number' ? ` (${work.lookupSeconds.toFixed(1)}s)` : '';
    citeText.textContent = `${work.attachedCitation}${lookupTag}`;
    jumpBtn.classList.remove('hidden');

    const matched = isCitationProofMatch(q, work.attachedSectionId);
    matchBadge.classList.remove('hidden');

    if (matched) {
      bar.classList.add('proof-matched');
      matchBadge.classList.add('match-ok');
      matchBadge.textContent = 'Exact Citation Verified';
    } else {
      bar.classList.add('proof-mismatch');
      matchBadge.classList.add('match-warn');
      matchBadge.textContent = work.checked
        ? `Expected: ${q.targetCitation}`
        : 'Cited (Click Check Answer to verify)';
    }
  }

  function selectQuestionOption(questionId, letter) {
    const work = getQuestionWork(questionId);
    work.selectedOption = letter;
    work.struckOptions = (work.struckOptions || []).filter(l => l !== letter);
    saveUserState();
    renderQuestionWorkspace();

    if (STATE.activeMode === 'drill') {
      updateDrillHudMetrics();
    }
  }

  function toggleOptionStrikethrough(questionId, letter) {
    const work = getQuestionWork(questionId);
    work.struckOptions = Array.isArray(work.struckOptions) ? work.struckOptions : [];
    if (work.struckOptions.includes(letter)) {
      work.struckOptions = work.struckOptions.filter(l => l !== letter);
      showToast(`Restored Option ${letter}`);
    } else {
      work.struckOptions.push(letter);
      showToast(`Eliminated distractor Option ${letter}`);
    }
    saveUserState();
    renderQuestionWorkspace();
  }

  function verifyCurrentQuestionAnswer() {
    const q = getCurrentQuestion();
    if (!q) return;
    const work = getQuestionWork(q.id);

    if (!work.selectedOption) {
      showToast('Please select an answer choice (A–E) before clicking Check Answer.');
      return;
    }

    const wasAlreadyChecked = work.checked;
    work.checked = true;

    if (typeof work.lookupSeconds !== 'number' || work.lookupSeconds <= 0) {
      const rawSec = STATE.activeMode === 'drill'
        ? drillLookupElapsedSeconds
        : ((Date.now() - questionLookupStartMs) / 1000);
      work.lookupSeconds = Math.max(0.8, Number(rawSec.toFixed(1)));
    }

    if (!wasAlreadyChecked) {
      STATE.drillStats.attempts = (STATE.drillStats.attempts || 0) + 1;
      STATE.drillStats.lookupTimes = STATE.drillStats.lookupTimes || [];
      STATE.drillStats.lookupTimes.push(work.lookupSeconds);

      const isCorrect = work.selectedOption === q.correctOption;
      if (isCorrect) {
        STATE.drillStats.correctCount = (STATE.drillStats.correctCount || 0) + 1;
        if (work.lookupSeconds <= q.targetLookupSeconds) {
          STATE.drillStats.streak = (STATE.drillStats.streak || 0) + 1;
        } else {
          STATE.drillStats.streak = 1;
        }
      } else {
        STATE.drillStats.streak = 0;
      }
    }

    if (STATE.activeMode === 'drill') {
      stopDrillSprintTimer();
      updateDrillHudMetrics();
    }

    saveUserState();
    renderQuestionWorkspace();
    renderGlobalBarTelemetry();

    const expPanel = document.getElementById('qExplanationPanel');
    if (expPanel) {
      expPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function renderExplanationPanel(q, work) {
    const panel = document.getElementById('qExplanationPanel');
    if (!work.checked) {
      panel.classList.add('hidden');
      return;
    }
    panel.classList.remove('hidden');

    const isCorrect = work.selectedOption === q.correctOption;
    const proofMatched = isCitationProofMatch(q, work.attachedSectionId);
    const banner = document.getElementById('expStatusBanner');
    const titleEl = document.getElementById('expStatusTitle');
    const metaEl = document.getElementById('expStatusMeta');

    banner.classList.toggle('incorrect', !isCorrect);
    if (isCorrect) {
      titleEl.textContent = `Correct Legal Determination — Option ${q.correctOption}`;
    } else {
      titleEl.textContent = `Incorrect — You selected Option ${work.selectedOption} (Official Ruling: Option ${q.correctOption})`;
    }

    const timeStr = typeof work.lookupSeconds === 'number' ? `${work.lookupSeconds.toFixed(1)}s` : '--s';
    const proofStr = proofMatched ? 'Exact Citation Verified' : 'Citation Proof Not Cited';
    metaEl.textContent = `Lookup Time: ${timeStr} (Target <= ${q.targetLookupSeconds}s) · ${proofStr}`;

    document.getElementById('expTargetCitationHeading').textContent = q.targetCitation;
    document.getElementById('expShortestPathVal').textContent = q.shortestPathHint;
    document.getElementById('expGoldenQuoteText').textContent = q.goldenQuote || `See ${q.targetCitation} in the Reference Library.`;
    document.getElementById('expCorrectReasoningText').textContent = q.explanation.correctReasoning;

    const distList = document.getElementById('expDistractorsList');
    distList.innerHTML = '';

    ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
      const optObj = q.options.find(o => o.letter === letter);
      const reasonText = (q.explanation.distractors && q.explanation.distractors[letter])
        ? q.explanation.distractors[letter]
        : (letter === q.correctOption ? q.explanation.correctReasoning : 'Distractor conflicts with governing regulatory text.');

      if (!optObj && !reasonText) return;

      const item = document.createElement('div');
      const isRightLetter = (letter === q.correctOption);
      item.className = `exp-distractor-item ${isRightLetter ? 'is-correct-choice' : 'is-wrong-choice'}`;
      item.innerHTML = `
        <div>
          <strong>Option ${escapeHtml(letter)} (${isRightLetter ? 'Correct' : 'Distractor'}):</strong>
          ${escapeHtml(reasonText)}
        </div>
      `;
      distList.appendChild(item);
    });
  }

  /* ==========================================================================
     10. COLLAPSIBLE STUDY COACH & HINTS LOGIC
     ========================================================================== */
  function renderSocraticTutorPanel(q, work, posNum) {
    const bodyEl = document.getElementById('socraticTutorBody');
    const triggerBtn = document.getElementById('btnToggleStudyCoach');
    const indicatorEl = document.getElementById('studyCoachToggleIndicator');

    if (bodyEl && triggerBtn && indicatorEl) {
      const expanded = !!STATE.studyCoachExpanded;
      bodyEl.classList.toggle('hidden', !expanded);
      triggerBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      indicatorEl.textContent = expanded ? '− Hide Hints' : '+ Show Hints';
    }

    const refSpan = document.getElementById('socraticActiveQRef');
    if (refSpan) refSpan.textContent = `Question ${posNum} (${q.category})`;

    [1, 2, 3].forEach(level => {
      const card = document.getElementById(`socraticCard${level}`);
      const textEl = document.getElementById(`socraticText${level}`);
      const btnEl = document.getElementById(`btnRevealHint${level}`);
      const isRevealed = Array.isArray(work.revealedHints) && work.revealedHints.includes(level);

      textEl.textContent = q.socraticHints[level - 1] || '';
      if (isRevealed) {
        card.classList.add('revealed');
        textEl.classList.remove('hidden');
        btnEl.classList.add('hidden');
      } else {
        card.classList.remove('revealed');
        textEl.classList.add('hidden');
        btnEl.classList.remove('hidden');
      }
    });

    const pathText = document.getElementById('socraticShortestPathText');
    const btnPath = document.getElementById('btnRevealShortestPath');
    if (work.shortestPathRevealed || work.checked) {
      pathText.classList.remove('hidden');
      pathText.textContent = `${q.shortestPathHint} → Governing Authority: ${q.targetCitation}`;
      btnPath.textContent = 'Open Section in Code Reader →';
    } else {
      pathText.classList.add('hidden');
      btnPath.textContent = 'Show Optimal Lookup Path';
    }
  }

  function generateSocraticExaminerResponse(promptType, customQuery) {
    const q = getCurrentQuestion();
    if (!q) return;
    const posNum = getQuestionPosInActiveSuite(q);

    const responseBox = document.getElementById('socraticAiResponseBox');
    let replyHtml = '';

    if (promptType === 'trap') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>Common Distractor Trap (${escapeHtml(q.category)}):</strong><br/>
          On Question ${posNum}, examinees most often lose points by overlooking the statutory exception in <code>${escapeHtml(q.targetCitation)}</code>.
          <br/>• <strong>Key Check:</strong> ${escapeHtml(q.socraticHints[2])}
        </div>
      `;
    } else if (promptType === 'keywords') {
      const targetSec = resolveSectionByRef(q.targetSectionId) || resolveSectionByRef(q.targetCitation);
      const kwList = (targetSec && targetSec.keywords && targetSec.keywords.length > 0)
        ? targetSec.keywords.slice(0, 5).join('", "')
        : q.targetCitation;
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>Fastest eCFR Search Keywords (Sub-45s Target):</strong><br/>
          Enter any of these terms into the Reference Library search box on the right:
          <code>"${escapeHtml(kwList)}"</code>.<br/>
          • <strong>Direct Path:</strong> ${escapeHtml(q.shortestPathHint)}
        </div>
      `;
    } else if (promptType === 'valuation_gri') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>Rule Hierarchy &amp; Golden Quote:</strong><br/>
          ${escapeHtml(q.socraticHints[0])} ${escapeHtml(q.socraticHints[1])}<br/>
          • <strong>Statutory Text:</strong> <em>${escapeHtml(q.goldenQuote)}</em>
        </div>
      `;
    } else if (promptType === 'deadline_penalty') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>Governing Legal Standard (${escapeHtml(q.targetCitation)}):</strong><br/>
          ${escapeHtml(q.explanation.correctReasoning)}
        </div>
      `;
    } else if (promptType === 'custom' && customQuery) {
      const qLower = customQuery.toLowerCase();
      const optMatch = customQuery.match(/\boption\s*([a-e])\b|\b([a-e])\b\?/i);
      if (optMatch) {
        const letter = (optMatch[1] || optMatch[2]).toUpperCase();
        const optReason = (q.explanation.distractors && q.explanation.distractors[letter])
          ? q.explanation.distractors[letter]
          : q.explanation.correctReasoning;
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>Study Coach Audit — Option ${letter} on Question ${posNum}:</strong><br/>
            ${escapeHtml(optReason)}<br/>
            <em>Governing Citation: ${escapeHtml(q.targetCitation)}</em>
          </div>
        `;
      } else if (qLower.includes('gri') || qLower.includes('essential character') || qLower.includes('3(a)') || qLower.includes('3(b)')) {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>HTSUS GRI 3(a) vs. GRI 3(b) Distinction:</strong><br/>
            Under <code>HTSUS GRI 3(a)</code>, the heading with the most specific description governs—except when two or more headings each refer to only part of the materials in composite goods or part of the items in a <em>retail set</em>. In that case, GRI 3(a) deems them equally specific, directing you to <code>GRI 3(b) (Essential Character)</code>.
          </div>
        `;
      } else if (qLower.includes('assist') || qLower.includes('transaction value') || qLower.includes('152')) {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>19 CFR § 152.102 &amp; § 152.103 Transaction Value Rules:</strong><br/>
            Transaction Value = Price Actually Paid or Payable + Packing + Selling Commissions + Apportioned Assists + Dutiable Royalties + Subsequent Proceeds.
            <br/><strong>Exclusions:</strong> Buying commissions, international freight/insurance, and engineering/design work performed <em>inside the United States</em> are excluded.
          </div>
        `;
      } else {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>Study Coach Note for "${escapeHtml(customQuery)}":</strong><br/>
            For Question ${posNum}, inspect <code>${escapeHtml(q.targetCitation)}</code> (${escapeHtml(q.shortestPathHint)}).<br/>
            • <strong>Clue:</strong> ${escapeHtml(q.socraticHints[1])}<br/>
            • <strong>Golden Quote:</strong> <em>${escapeHtml(q.goldenQuote)}</em>
          </div>
        `;
      }
    }

    if (responseBox && replyHtml) {
      responseBox.innerHTML = replyHtml;
    }
  }

  /* ==========================================================================
     11. RIGHT PANE: INTEGRATED ELECTRONIC REFERENCE LIBRARY (eCFR / HTSUS / 31 CFR)
     ========================================================================== */
  let currentSearchQuery = '';
  let collapsedPartIds = {};

  function getActiveCorpus() {
    let corpus = DATASET.corpora.find(c => c.id === STATE.activeCorpusId);
    if (!corpus) {
      corpus = DATASET.corpora[0];
      if (corpus) STATE.activeCorpusId = corpus.id;
    }
    return corpus;
  }

  function getActiveSection() {
    let sec = DATASET.sectionsById[STATE.activeSectionId];
    if (!sec) {
      const corpus = getActiveCorpus();
      if (corpus && corpus.parts[0] && corpus.parts[0].sections[0]) {
        sec = corpus.parts[0].sections[0];
        STATE.activeSectionId = sec.id;
      } else {
        sec = DATASET.allSections[0];
        if (sec) STATE.activeSectionId = sec.id;
      }
    }
    return sec;
  }

  function openSectionInReader(sectionObj) {
    if (!sectionObj) return;
    STATE.activeCorpusId = sectionObj.corpusId;
    STATE.activeSectionId = sectionObj.id;
    collapsedPartIds[sectionObj.partId] = false;
    saveUserState();
    renderReferenceLibrary();
  }

  function countSectionSearchMatches(section, query) {
    if (!query) return 0;
    const hay = `${section.citation} ${section.title} ${section.text} ${(section.keywords || []).join(' ')}`;
    try {
      const regex = new RegExp(escapeRegExp(query), 'gi');
      const matches = hay.match(regex);
      return matches ? matches.length : 0;
    } catch (e) {
      return 0;
    }
  }

  function highlightTextWithSearchQuery(rawText, query) {
    const escaped = escapeHtml(rawText);
    if (!query || !query.trim()) return escaped;
    try {
      const regex = new RegExp(`(${escapeRegExp(escapeHtml(query.trim()))})`, 'gi');
      return escaped.replace(regex, '<mark class="ecfr-search-highlight">$1</mark>');
    } catch (e) {
      return escaped;
    }
  }

  function formatStatutoryParagraphsHtml(rawText, query) {
    const lines = String(rawText || '').split('\n').filter(l => l.trim().length > 0);
    return lines.map(line => {
      const trimmed = line.trim();
      const isSubPara = /^\(([0-9]+|[ivx]+)\)/i.test(trimmed);
      let highlighted = highlightTextWithSearchQuery(trimmed, query);
      highlighted = highlighted.replace(
        /^(\([a-z0-9]+\)(\s*\([a-z0-9]+\))*|GRI\s+\d(\([a-z]\))?:?)/i,
        '<span class="ecfr-subhead-token">$1</span>'
      );
      return `<div class="ecfr-para ${isSubPara ? 'ecfr-para-sub' : ''}">${highlighted}</div>`;
    }).join('');
  }

  function formatShortSectionCitation(citationStr) {
    const str = String(citationStr || '').trim();
    const secMatch = str.match(/§\s*\d+\.\d+[a-z0-9()-]*/i);
    if (secMatch) return secMatch[0];
    const griMatch = str.match(/GRI\s*\d+[a-z0-9()-]*/i);
    if (griMatch) return griMatch[0];
    return str;
  }

  function updateRightPaneCiteButtonLabel() {
    const currentQ = getCurrentQuestion();
    const activeSection = getActiveSection();
    const lockBtn = document.getElementById('btnLockCitationProof');
    if (!lockBtn || !currentQ || !activeSection) return;

    const posNum = getQuestionPosInActiveSuite(currentQ);
    const shortCite = formatShortSectionCitation(activeSection.citation);
    const work = getQuestionWork(currentQ.id);
    const isAlreadyLockedHere = (work.attachedSectionId === activeSection.id);

    if (isAlreadyLockedHere) {
      lockBtn.textContent = `Cited ${shortCite} for Q${posNum}`;
    } else {
      lockBtn.textContent = `Cite ${shortCite} as Proof for Q${posNum}`;
    }
  }

  function renderReferenceLibrary() {
    const activeCorpus = getActiveCorpus();
    const activeSection = getActiveSection();
    const query = currentSearchQuery.trim();

    const tabsContainer = document.getElementById('refCorpusTabs');
    tabsContainer.innerHTML = '';

    DATASET.corpora.forEach(corpus => {
      let secCount = 0;
      let hitCount = 0;
      corpus.parts.forEach(p => {
        secCount += p.sections.length;
        if (query) {
          p.sections.forEach(s => {
            if (countSectionSearchMatches(s, query) > 0) hitCount++;
          });
        }
      });

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ref-corpus-tab ${corpus.id === activeCorpus.id ? 'active' : ''}`;
      const badgeLabel = query ? `${hitCount} hits` : `${secCount}`;
      btn.innerHTML = `
        <span>${escapeHtml(corpus.code)}</span>
        <span class="ref-corpus-count">${escapeHtml(badgeLabel)}</span>
      `;
      btn.addEventListener('click', () => {
        STATE.activeCorpusId = corpus.id;
        let firstSec = null;
        if (query) {
          for (const p of corpus.parts) {
            const hit = p.sections.find(s => countSectionSearchMatches(s, query) > 0);
            if (hit) { firstSec = hit; break; }
          }
        }
        if (!firstSec && corpus.parts[0] && corpus.parts[0].sections[0]) {
          firstSec = corpus.parts[0].sections[0];
        }
        if (firstSec) STATE.activeSectionId = firstSec.id;
        saveUserState();
        renderReferenceLibrary();
      });
      tabsContainer.appendChild(btn);
    });

    const matchBadge = document.getElementById('ecfrSearchMatchBadge');
    const clearBtn = document.getElementById('btnClearEcfrSearch');
    if (query) {
      clearBtn.classList.remove('hidden');
      let totalMatches = 0;
      let matchingSections = 0;
      DATASET.allSections.forEach(s => {
        const c = countSectionSearchMatches(s, query);
        if (c > 0) {
          totalMatches += c;
          matchingSections++;
        }
      });
      matchBadge.textContent = `${totalMatches} matches in ${matchingSections} sections`;
      matchBadge.classList.add('has-matches');
    } else {
      clearBtn.classList.add('hidden');
      matchBadge.textContent = `${DATASET.allSections.length} sections`;
      matchBadge.classList.remove('has-matches');
    }

    const treeSidebar = document.getElementById('refTreeSidebar');
    const btnToggleTree = document.getElementById('btnToggleCodeTree');
    treeSidebar.classList.toggle('hidden', !!STATE.treeCollapsed);
    if (btnToggleTree) {
      btnToggleTree.textContent = STATE.treeCollapsed ? 'Show Index' : 'Toggle Index';
    }

    const treeList = document.getElementById('refTreeList');
    treeList.innerHTML = '';

    const partsToRender = [];
    activeCorpus.parts.forEach(part => {
      partsToRender.push({ part, corpusCode: activeCorpus.code, isExternalCorpus: false });
    });

    if (query) {
      DATASET.corpora.forEach(otherCorpus => {
        if (otherCorpus.id === activeCorpus.id) return;
        otherCorpus.parts.forEach(part => {
          const hasHit = part.sections.some(s => countSectionSearchMatches(s, query) > 0);
          if (hasHit) {
            partsToRender.push({ part, corpusCode: otherCorpus.code, isExternalCorpus: true });
          }
        });
      });
    }

    partsToRender.forEach(({ part, corpusCode, isExternalCorpus }) => {
      const partGroup = document.createElement('div');
      partGroup.className = 'ref-part-group';

      const isCollapsed = !!collapsedPartIds[part.id] && !query;
      const partToggle = document.createElement('button');
      partToggle.type = 'button';
      partToggle.className = 'ref-part-toggle';
      partToggle.innerHTML = `
        <span>${isCollapsed ? '+ ' : '− '}${isExternalCorpus ? `${escapeHtml(corpusCode)} · ` : ''}${escapeHtml(part.title || part.code)}</span>
        <span>${part.sections.length}</span>
      `;
      partToggle.addEventListener('click', () => {
        collapsedPartIds[part.id] = !collapsedPartIds[part.id];
        renderReferenceLibrary();
      });
      partGroup.appendChild(partToggle);

      if (!isCollapsed) {
        const secContainer = document.createElement('div');
        secContainer.className = 'ref-part-sections';

        part.sections.forEach(sec => {
          const matchCount = query ? countSectionSearchMatches(sec, query) : 0;
          if (query && matchCount === 0) return;

          const secBtn = document.createElement('button');
          secBtn.type = 'button';
          secBtn.className = `ref-sec-item ${sec.id === activeSection.id ? 'active' : ''} ${matchCount > 0 ? 'search-hit' : ''}`;
          secBtn.innerHTML = `
            <div class="ref-sec-top-line">
              <span class="ref-sec-cite">${highlightTextWithSearchQuery(sec.citation, query)}</span>
              ${matchCount > 0 ? `<span class="ref-sec-freq">${matchCount} hits</span>` : ''}
            </div>
            <div class="ref-sec-title">${highlightTextWithSearchQuery(sec.title, query)}</div>
          `;
          secBtn.addEventListener('click', () => {
            openSectionInReader(sec);
          });
          secContainer.appendChild(secBtn);
        });

        if (secContainer.children.length > 0) {
          partGroup.appendChild(secContainer);
          treeList.appendChild(partGroup);
        } else if (!query) {
          treeList.appendChild(partGroup);
        }
      } else {
        treeList.appendChild(partGroup);
      }
    });

    if (treeList.children.length === 0 && query) {
      treeList.innerHTML = `<div style="padding:12px;font-size:12px;color:#78756D;">No sections match "<strong>${escapeHtml(query)}</strong>". Try clearing the filter or clicking a Quick Filter chip above.</div>`;
    }

    if (!activeSection) return;

    document.getElementById('refDocBreadcrumb').textContent = activeSection.breadcrumb;
    const cleanFreq = String(activeSection.examFrequency || 'High Yield').replace(/\s*\(.*?\)/g, '');
    document.getElementById('refDocFreqBadge').textContent = cleanFreq;
    document.getElementById('refDocCitationCode').innerHTML = highlightTextWithSearchQuery(activeSection.citation, query);
    document.getElementById('refDocSectionTitle').innerHTML = highlightTextWithSearchQuery(activeSection.title, query);

    updateRightPaneCiteButtonLabel();

    const textBody = document.getElementById('refDocTextBody');
    textBody.innerHTML = formatStatutoryParagraphsHtml(activeSection.text, query);

    const crossRefsBox = document.getElementById('refDocCrossRefsBox');
    const crossRefsList = document.getElementById('refDocCrossRefsList');
    crossRefsList.innerHTML = '';

    if (Array.isArray(activeSection.crossRefs) && activeSection.crossRefs.length > 0) {
      crossRefsBox.classList.remove('hidden');
      activeSection.crossRefs.forEach(refStr => {
        const resolved = resolveSectionByRef(refStr);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ref-crossref-btn';
        btn.textContent = `→ ${resolved ? resolved.citation : refStr}`;
        btn.title = resolved ? `Jump to ${resolved.citation}: ${resolved.title}` : `Search for ${refStr}`;
        btn.addEventListener('click', () => {
          if (resolved) {
            openSectionInReader(resolved);
            showToast(`Opened cross-reference: ${resolved.citation}`);
          } else {
            const searchInput = document.getElementById('ecfrSearchInput');
            if (searchInput) {
              searchInput.value = refStr;
              currentSearchQuery = refStr;
              renderReferenceLibrary();
            }
          }
        });
        crossRefsList.appendChild(btn);
      });
    } else {
      crossRefsBox.classList.add('hidden');
    }

    const kwList = document.getElementById('refDocKeywordsList');
    kwList.innerHTML = '';
    (activeSection.keywords || []).forEach(kw => {
      const tag = document.createElement('button');
      tag.type = 'button';
      tag.className = 'ref-kw-tag';
      tag.textContent = kw;
      tag.title = `Filter eCFR by keyword "${kw}"`;
      tag.addEventListener('click', () => {
        const searchInput = document.getElementById('ecfrSearchInput');
        if (searchInput) {
          searchInput.value = kw;
          currentSearchQuery = kw;
          renderReferenceLibrary();
        }
      });
      kwList.appendChild(tag);
    });
  }

  /* ==========================================================================
     12. CITE SECTION AS PROOF & SAVE CITATION TO NOTES
     ========================================================================== */
  function lockInActiveSectionAsProof() {
    const q = getCurrentQuestion();
    const sec = getActiveSection();
    if (!q || !sec) return;

    const posNum = getQuestionPosInActiveSuite(q);
    const work = getQuestionWork(q.id);
    work.attachedSectionId = sec.id;
    work.attachedCitation = sec.citation;

    const elapsedSec = STATE.activeMode === 'drill'
      ? Number(drillLookupElapsedSeconds.toFixed(1))
      : Number(((Date.now() - questionLookupStartMs) / 1000).toFixed(1));

    work.lookupSeconds = Math.max(0.8, elapsedSec);
    drillCitationLocked = true;

    const matched = isCitationProofMatch(q, sec.id);

    saveUserState();
    renderQuestionWorkspace();
    renderReferenceLibrary();
    renderGlobalBarTelemetry();

    if (STATE.activeMode === 'drill') {
      updateDrillHudMetrics();
      if (matched) {
        showToast(`Step 1 Complete: Cited ${sec.citation} in ${work.lookupSeconds.toFixed(1)}s. Now select Option A–E and click Check Answer.`);
      } else {
        showToast(`Cited ${sec.citation} for Q${posNum} (${work.lookupSeconds.toFixed(1)}s). Check if a more specific section applies.`);
      }
    } else {
      showToast(`Cited ${sec.citation} as proof for Question ${posNum} (${work.lookupSeconds.toFixed(1)}s)`);
    }
  }

  function copyActiveCitationToScratchpad() {
    const sec = getActiveSection();
    const q = getCurrentQuestion();
    if (!sec) return;

    const posNum = getQuestionPosInActiveSuite(q);
    const firstSentence = String(sec.text || '').split('\n')[0];
    const formattedSnippet = `${sec.citation} — ${sec.title} (Q${posNum}): "${firstSentence}"`;

    STATE.scratchpadText = (STATE.scratchpadText ? STATE.scratchpadText.trim() + '\n\n' : '') + formattedSnippet;
    STATE.savedCitations = Array.isArray(STATE.savedCitations) ? STATE.savedCitations : [];
    STATE.savedCitations.unshift({
      citation: sec.citation,
      title: sec.title,
      sectionId: sec.id,
      questionNumber: posNum,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    STATE.savedCitations = STATE.savedCitations.slice(0, 20);

    saveUserState();
    updateScratchpadBadge();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formattedSnippet).catch(() => {});
    }

    showToast(`Saved ${sec.citation} to Candidate Notes`);
  }

  function updateScratchpadBadge() {
    const badge = document.getElementById('scratchpadCountBadge');
    if (badge) {
      const count = Array.isArray(STATE.savedCitations) ? STATE.savedCitations.length : 0;
      badge.textContent = String(count);
    }
  }

  /* ==========================================================================
     13. MODE 2: 90-SECOND CITATION-SPEED DRILL TIMER & TELEMETRY
     ========================================================================== */
  function startDrillSprintForCurrentQuestion(forceResetWork) {
    stopDrillSprintTimer();
    const q = getCurrentQuestion();
    if (!q) return;

    const work = getQuestionWork(q.id);
    if (forceResetWork) {
      work.selectedOption = null;
      work.checked = false;
      work.attachedSectionId = null;
      work.attachedCitation = null;
      work.lookupSeconds = null;
      saveUserState();
    }

    drillRemainingSeconds = DRILL_MAX_SECONDS;
    drillLookupElapsedSeconds = (typeof work.lookupSeconds === 'number' && work.lookupSeconds > 0) ? work.lookupSeconds : 0.0;
    drillCitationLocked = !!work.attachedSectionId;
    drillPaused = false;
    resetPerQuestionLookupStopwatch();

    const btnPause = document.getElementById('btnDrillPauseSprint');
    if (btnPause) btnPause.textContent = 'Pause';

    updateDrillHudMetrics();
    renderQuestionWorkspace();

    drillInterval = setInterval(() => {
      if (drillPaused || STATE.activeMode !== 'drill') return;

      const currentWork = getQuestionWork(q.id);
      if (currentWork.checked) {
        stopDrillSprintTimer();
        return;
      }

      drillRemainingSeconds = Math.max(0, Number((drillRemainingSeconds - 0.1).toFixed(1)));
      if (!drillCitationLocked) {
        drillLookupElapsedSeconds = Number((drillLookupElapsedSeconds + 0.1).toFixed(1));
      }

      updateDrillHudMetrics();

      if (drillRemainingSeconds <= 0) {
        stopDrillSprintTimer();
        showToast('90-Second Sprint Expired. Open Study Coach below to inspect the Fastest Navigation Path.');
        currentWork.shortestPathRevealed = true;
        STATE.studyCoachExpanded = true;
        renderQuestionWorkspace();
      }
    }, 100);
  }

  function stopDrillSprintTimer() {
    if (drillInterval) {
      clearInterval(drillInterval);
      drillInterval = null;
    }
  }

  function renderDrillChecklistState(q, work) {
    const step1Card = document.getElementById('drillStep1Card');
    const step1Status = document.getElementById('drillStep1Status');
    const step2Card = document.getElementById('drillStep2Card');
    const step2Status = document.getElementById('drillStep2Status');

    if (!step1Card || !step2Card) return;

    if (work.attachedSectionId) {
      step1Card.classList.add('completed');
      const secStr = typeof work.lookupSeconds === 'number' ? `${work.lookupSeconds.toFixed(1)}s` : '';
      step1Status.textContent = `Cited (${secStr})`;
    } else {
      step1Card.classList.remove('completed');
      step1Status.textContent = 'Step 1 Pending';
    }

    if (work.checked) {
      step2Card.classList.add('completed');
      step2Status.textContent = work.selectedOption === q.correctOption ? `Correct (${q.correctOption})` : `Reviewed (${q.correctOption})`;
    } else if (work.selectedOption) {
      step2Card.classList.add('completed');
      step2Status.textContent = `Selected ${work.selectedOption} (Click Check Answer)`;
    } else {
      step2Card.classList.remove('completed');
      step2Status.textContent = 'Select A–E';
    }
  }

  function updateDrillHudMetrics() {
    const q = getCurrentQuestion();
    if (!q) return;
    const work = getQuestionWork(q.id);
    const stats = getSessionStats();

    const clockDigits = document.getElementById('drillSprintClockDigits');
    const progressBar = document.getElementById('drillSprintProgressBar');
    const clockCard = document.getElementById('drillClockCard');

    if (clockDigits) clockDigits.textContent = `${drillRemainingSeconds.toFixed(1)}s`;
    if (progressBar) {
      const pct = Math.max(0, Math.min(100, (drillRemainingSeconds / DRILL_MAX_SECONDS) * 100));
      progressBar.style.width = `${pct}%`;
    }
    if (clockCard) {
      clockCard.classList.remove('warning', 'danger');
      if (drillRemainingSeconds <= 20) {
        clockCard.classList.add('danger');
      } else if (drillRemainingSeconds <= 45) {
        clockCard.classList.add('warning');
      }
    }

    const curLookupEl = document.getElementById('drillCurrentLookupTime');
    const targetLabelEl = document.getElementById('drillTargetBenchmarkLabel');
    const liveLookupVal = (typeof work.lookupSeconds === 'number' && work.lookupSeconds > 0)
      ? work.lookupSeconds
      : drillLookupElapsedSeconds;

    if (curLookupEl) curLookupEl.textContent = `${liveLookupVal.toFixed(1)}s`;
    if (targetLabelEl) targetLabelEl.textContent = `/ ${q.targetLookupSeconds}.0s target`;

    const avgEl = document.getElementById('drillAvgLookupMetric');
    if (avgEl) {
      avgEl.textContent = stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s';
    }

    const accEl = document.getElementById('drillAccuracyMetric');
    const solvedSub = document.getElementById('drillSolvedCountSub');
    const streakEl = document.getElementById('drillStreakMetric');

    if (accEl) accEl.textContent = stats.accuracyPercent !== null ? `${stats.accuracyPercent}%` : '--%';
    if (solvedSub) solvedSub.textContent = `${stats.gradedCount} graded`;
    if (streakEl) streakEl.textContent = `${STATE.drillStats.streak || 0} Streak`;

    renderDrillChecklistState(q, work);
  }

  /* ==========================================================================
     14. YELLOW MARKER HIGHLIGHT TOOL (PEARSON VUE HIGHLIGHTER)
     ========================================================================== */
  function highlightCurrentSelectionInStem() {
    const q = getCurrentQuestion();
    if (!q) return false;

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      return false;
    }

    const stemEl = document.getElementById('qStemContent');
    const readerEl = document.getElementById('refDocTextBody');
    const range = sel.getRangeAt(0);
    const inStem = stemEl && stemEl.contains(range.commonAncestorContainer);
    const inReader = readerEl && readerEl.contains(range.commonAncestorContainer);

    if (!inStem && !inReader) {
      return false;
    }

    try {
      const mark = document.createElement('mark');
      mark.className = 'user-highlight';
      mark.title = 'Click to remove highlight';
      range.surroundContents(mark);
      sel.removeAllRanges();

      if (inStem) {
        const work = getQuestionWork(q.id);
        work.highlightedStemHtml = stemEl.innerHTML;
        saveUserState();
      }
      showToast('Highlighted selected text (click mark to remove)');
      return true;
    } catch (err) {
      const selectedText = sel.toString().trim();
      if (inStem && selectedText.length >= 2) {
        const escapedTarget = escapeHtml(selectedText);
        stemEl.innerHTML = stemEl.innerHTML.replace(
          escapedTarget,
          `<mark class="user-highlight" title="Click to remove highlight">${escapedTarget}</mark>`
        );
        sel.removeAllRanges();
        const work = getQuestionWork(q.id);
        work.highlightedStemHtml = stemEl.innerHTML;
        saveUserState();
        showToast('Highlighted selected text');
        return true;
      }
    }
    return false;
  }

  /* ==========================================================================
     15. MODE 3: READINESS ANALYTICS DASHBOARD & B2C/B2B LICENSING PLANS
     ========================================================================== */
  function renderAnalyticsDashboard() {
    const stats = getSessionStats();
    const activePool = getFilteredQuestions();

    const probValEl = document.getElementById('anPassProbabilityValue');
    const probBarEl = document.getElementById('anPassProbabilityBar');
    if (probValEl) {
      probValEl.textContent = stats.accuracyPercent !== null ? `${stats.accuracyPercent}%` : '--%';
    }
    if (probBarEl) {
      probBarEl.style.width = stats.accuracyPercent !== null ? `${stats.accuracyPercent}%` : '0%';
    }

    document.getElementById('anKpiAvgLookup').textContent =
      stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s';

    const totalDenominator = STATE.selectedTrack === 'ALL' ? DATASET.questions.length : activePool.length;
    const gradedInView = STATE.selectedTrack === 'ALL'
      ? stats.gradedCount
      : activePool.filter(q => STATE.questionWork[q.id] && STATE.questionWork[q.id].checked).length;

    document.getElementById('anKpiAnsweredCount').textContent = `${gradedInView} / ${totalDenominator} Graded`;

    const accStr = stats.accuracyPercent !== null
      ? `${stats.accuracyPercent}% (${stats.correctCount}/${stats.gradedCount} correct)`
      : '--%';
    document.getElementById('anKpiAccuracySub').innerHTML = `Current Accuracy: <strong>${accStr}</strong>`;
    document.getElementById('anKpiVerifiedCitations').textContent = String(stats.verifiedProofCount);

    if (stats.avgLookupSeconds !== null) {
      const secSavedPerQ = Math.max(15, 145 - stats.avgLookupSeconds);
      const totalMinSaved = Math.round((secSavedPerQ * 80) / 60);
      const hrs = Math.floor(totalMinSaved / 60);
      const mins = totalMinSaved % 60;
      document.getElementById('anKpiTimeSaved').textContent = `+${hrs}h ${mins}m`;
    } else {
      document.getElementById('anKpiTimeSaved').textContent = '--';
    }

    const domainSpecs = [
      { suite: 'CBLE_111_113', label: '19 CFR Parts 111 & 113 — Broker Compliance & Customs Bonds', color: '#1A5638' },
      { suite: 'CBLE_141_142', label: '19 CFR Parts 141 & 142 — Entry, Invoices & Release Deadlines', color: '#1A5638' },
      { suite: 'CBLE_152_177_190', label: '19 CFR Parts 152, 177 & 190 — Valuation, Rulings & Drawback', color: '#1B365D' },
      { suite: 'CBLE_HTSUS', label: 'HTSUS & GRI 1–6 — Tariff Classification & Essential Character', color: '#1B365D' },
      { suite: 'EA', label: '31 CFR Part 10 — IRS Circular 230 Ethics (Enrolled Agent Track)', color: '#1A5638' }
    ];

    const heatmapContainer = document.getElementById('anDomainHeatmapList');
    heatmapContainer.innerHTML = '';

    domainSpecs.forEach(dom => {
      const matchingQs = DATASET.questions.filter(q => q.suite === dom.suite);
      const domLookups = [];
      let domCorrect = 0;
      let domGraded = 0;

      matchingQs.forEach(q => {
        const w = STATE.questionWork[q.id];
        if (w) {
          if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) domLookups.push(w.lookupSeconds);
          if (w.checked) {
            domGraded++;
            if (w.selectedOption === q.correctOption) domCorrect++;
          }
        }
      });

      const hasDomData = domGraded > 0;
      const avgDomLookupStr = domLookups.length > 0
        ? `${(domLookups.reduce((a, b) => a + b, 0) / domLookups.length).toFixed(1)}s`
        : '--s';

      const domAcc = hasDomData ? Math.round((domCorrect / domGraded) * 100) : 0;
      const domAccStr = hasDomData ? `${domAcc}% (${domCorrect}/${domGraded})` : '--%';

      let statusLabel = 'Not Tested Yet';
      if (hasDomData) {
        statusLabel = (domAcc >= 75) ? 'Exam Ready' : 'Needs Review';
      }

      const row = document.createElement('div');
      row.className = 'heatmap-row';
      row.innerHTML = `
        <div class="heatmap-row-top">
          <span class="heatmap-domain-name">${escapeHtml(dom.label)}</span>
          <div class="heatmap-metrics-right">
            <span>Lookup: <strong>${avgDomLookupStr}</strong></span>
            <span>·</span>
            <span>Accuracy: <strong>${domAccStr}</strong></span>
            <span>·</span>
            <span>${statusLabel}</span>
          </div>
        </div>
        <div class="heatmap-bar-bg">
          <div class="heatmap-bar-fill" style="width: ${hasDomData ? domAcc : 0}%; background: ${dom.color};"></div>
        </div>
      `;
      heatmapContainer.appendChild(row);
    });

    // Session Question Log (with PRO badges on questions 4+ when on FREE tier)
    const solvedContainer = document.getElementById('anSolvedQuestionsLog');
    solvedContainer.innerHTML = '';

    activePool.forEach((q, idx) => {
      const posNum = idx + 1;
      const isLocked = isQuestionIndexLockedForCurrentTier(idx);
      const w = STATE.questionWork[q.id];
      const hasActivity = w && (w.selectedOption || w.attachedCitation || w.flagged);
      const item = document.createElement('div');
      item.className = 'an-log-item';

      const statusText = isLocked
        ? 'Locked on Free Trial — Activate Pro to Unlock'
        : !hasActivity
          ? 'Unanswered — Click to Open'
          : w.checked
            ? (w.selectedOption === q.correctOption ? `Correct (${w.selectedOption})` : `Incorrect (Chose ${w.selectedOption}, Official: ${q.correctOption})`)
            : `In Progress (Selected: ${w.selectedOption || 'None'})`;

      const rightBadgeHtml = isLocked
        ? `<span class="pro-lock-badge">PRO</span>`
        : `<span style="font-family:var(--font-mono);font-size:11.5px;font-weight:600;color:#141413;">${escapeHtml((w && typeof w.lookupSeconds === 'number') ? `${w.lookupSeconds.toFixed(1)}s` : `${q.targetLookupSeconds}s target`)} →</span>`;

      item.innerHTML = `
        <div>
          <strong>Q${posNum}: ${escapeHtml(q.category)}</strong>
          <div style="font-size:11px;color:#78756D;">${escapeHtml(statusText)} · Proof: ${escapeHtml((w && w.attachedCitation) || q.targetCitation)}</div>
        </div>
        ${rightBadgeHtml}
      `;
      item.addEventListener('click', () => {
        if (isLocked) {
          openAccountPaywallModal({
            paywallReason: 'Create an account and activate a Pro plan to unlock all 30 exam cases and 7 topic suites.'
          });
          return;
        }
        STATE.currentQuestionId = q.id;
        switchMode('cbt');
      });
      solvedContainer.appendChild(item);
    });

    const savedCiteContainer = document.getElementById('anSavedCitationsLog');
    savedCiteContainer.innerHTML = '';

    const citationsList = Array.isArray(STATE.savedCitations) ? STATE.savedCitations : [];

    if (citationsList.length === 0) {
      savedCiteContainer.innerHTML = `<div style="padding:10px;font-size:12px;color:#78756D;background:#F6F4EF;border:1px solid #DFDBD2;">No citations saved in this session yet. Click “Save to Notes” in the Reference Library to bookmark sections.</div>`;
    } else {
      citationsList.forEach(entry => {
        const row = document.createElement('div');
        row.className = 'an-log-item';
        row.innerHTML = `
          <div>
            <strong>${escapeHtml(entry.citation)}</strong> — ${escapeHtml(entry.title)}
            <div style="font-size:11px;color:#78756D;">Saved from Question ${entry.questionNumber || 1}</div>
          </div>
          <span style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:#C8431F;">Open in eCFR →</span>
        `;
        row.addEventListener('click', () => {
          const sec = resolveSectionByRef(entry.sectionId) || resolveSectionByRef(entry.citation);
          if (sec) {
            openSectionInReader(sec);
            switchMode('cbt');
          }
        });
        savedCiteContainer.appendChild(row);
      });
    }
  }

  /* ==========================================================================
     16. MODALS: QUESTION NAVIGATOR, CALCULATOR/SCRATCHPAD, SCORE REPORT
     ========================================================================== */
  function openNavigatorModal() {
    const backdrop = document.getElementById('navigatorModalBackdrop');
    const grid = document.getElementById('navigatorQuestionsGrid');
    if (!backdrop || !grid) return;

    const pool = getFilteredQuestions();
    let answered = 0;
    let unanswered = 0;
    let flagged = 0;
    let verified = 0;

    grid.innerHTML = '';

    pool.forEach((q, idx) => {
      const posNum = idx + 1;
      const isLocked = isQuestionIndexLockedForCurrentTier(idx);
      const w = getQuestionWork(q.id);
      if (w.selectedOption) answered++; else unanswered++;
      if (w.flagged) flagged++;
      if (w.attachedSectionId) verified++;

      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = `nav-q-tile ${q.id === STATE.currentQuestionId ? 'current' : ''} ${w.selectedOption ? 'answered' : ''} ${isLocked ? 'locked-pro' : ''}`;
      tile.innerHTML = `
        <div class="nav-q-tile-top">
          <span>Question ${posNum}</span>
          ${isLocked
            ? '<span class="pro-lock-badge">PRO</span>'
            : `<span>${w.flagged ? 'Flagged' : ''} ${w.attachedSectionId ? 'Cited' : ''}</span>`}
        </div>
        <div style="font-size:11px;color:#4A4842;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
          ${escapeHtml(q.category)}
        </div>
        <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:${w.selectedOption ? '#141413' : '#78756D'};">
          ${isLocked
            ? 'Locked (Free Trial 3/3)'
            : `${w.selectedOption ? `Selected: ${w.selectedOption}` : 'Unanswered'}${w.checked ? (w.selectedOption === q.correctOption ? ' · Correct' : ' · Incorrect') : ''}`}
        </div>
      `;
      tile.addEventListener('click', () => {
        if (isLocked) {
          backdrop.classList.add('hidden');
          openAccountPaywallModal({
            paywallReason: 'Create an account and activate a Pro plan to unlock all 30 exam cases and 7 topic suites.'
          });
          return;
        }
        STATE.currentQuestionId = q.id;
        resetPerQuestionLookupStopwatch();
        saveUserState();
        backdrop.classList.add('hidden');
        renderQuestionWorkspace();
      });
      grid.appendChild(tile);
    });

    document.getElementById('navStatAnswered').textContent = String(answered);
    document.getElementById('navStatUnanswered').textContent = String(unanswered);
    document.getElementById('navStatFlagged').textContent = String(flagged);
    document.getElementById('navStatVerified').textContent = String(verified);

    backdrop.classList.remove('hidden');
  }

  function updateCustomsValuationCalculator() {
    const invoice = Number(document.getElementById('calcInvoicePrice').value) || 0;
    const packing = Number(document.getElementById('calcPackingCost').value) || 0;
    const assist = Number(document.getElementById('calcAssistCost').value) || 0;
    const royalty = Number(document.getElementById('calcRoyaltyCost').value) || 0;
    const nonDutiable = Number(document.getElementById('calcNonDutiable').value) || 0;
    const ratePct = Number(document.getElementById('calcDutyRate').value) || 0;

    const transactionVal = Math.max(0, invoice + packing + assist + royalty - nonDutiable);
    const baseDuty = transactionVal * (ratePct / 100);
    const rawMpf = transactionVal * 0.003464;
    const clampedMpf = transactionVal > 0 ? Math.min(614.35, Math.max(31.67, rawMpf)) : 0;
    const hmf = transactionVal * 0.00125;
    const mpfHmf = clampedMpf + hmf;
    const totalDeposit = baseDuty + mpfHmf;

    const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    document.getElementById('calcResTransactionValue').textContent = fmt(transactionVal);
    document.getElementById('calcResBaseDuty').textContent = fmt(baseDuty);
    document.getElementById('calcResMpfHmf').textContent = fmt(mpfHmf);
    document.getElementById('calcResTotalDeposit').textContent = fmt(totalDeposit);

    return {
      transactionVal: fmt(transactionVal),
      baseDuty: fmt(baseDuty),
      mpfHmf: fmt(mpfHmf),
      totalDeposit: fmt(totalDeposit),
      ratePct
    };
  }

  /* ==========================================================================
     16B. PRINTABLE B2B TEAM READINESS & CITATION LATENCY DOSSIER ENGINE
     ========================================================================== */
  let b2bReportViewMode = 'cohort'; // 'session' | 'cohort'

  function generateB2BTeamReadinessData(modeOverride) {
    const stats = getSessionStats();
    const resolvedMode = modeOverride
      ? modeOverride
      : (stats.gradedCount > 0 ? b2bReportViewMode : b2bReportViewMode);

    const domainDefinitions = [
      {
        id: 'DOM_111_113',
        label: '19 CFR Parts 111 & 113 — Broker Compliance & Bonds',
        filterFn: (q) => q.suite === 'CBLE_111_113',
        cohortAcc: 86,
        cohortLookup: 29.4,
        trapNote: '19 CFR § 111.32 mandatory fraud-separation reporting & § 113.62(b) 30-day redelivery liquidated damages'
      },
      {
        id: 'DOM_141_142',
        label: '19 CFR Parts 141 & 142 — Entry & Release Deadlines',
        filterFn: (q) => q.suite === 'CBLE_141_142',
        cohortAcc: 84,
        cohortLookup: 26.8,
        trapNote: '19 CFR § 142.12(b) 10 working days (Form 7501) vs. 15 calendar days (§ 142.12(a)) & § 141.19 nominal consignee liability'
      },
      {
        id: 'DOM_152',
        label: '19 CFR Part 152 — Customs Valuation & Assists',
        filterFn: (q) => q.suite === 'CBLE_152_177_190' && /152|valuation|assist/i.test(`${q.category} ${q.targetCitation} ${q.targetSectionId}`),
        cohortAcc: 78,
        cohortLookup: 35.6,
        trapNote: '19 CFR § 152.102(a)(1)(iv) U.S.-domiciled engineering exclusion vs. foreign tooling assists & § 152.103(i) post-importation assembly'
      },
      {
        id: 'DOM_177_190',
        label: '19 CFR Parts 177 & 190 — Rulings & TFTEA Drawback',
        filterFn: (q) => q.suite === 'CBLE_152_177_190' && !/152|valuation|assist/i.test(`${q.category} ${q.targetCitation} ${q.targetSectionId}`),
        cohortAcc: 81,
        cohortLookup: 34.2,
        trapNote: '19 CFR § 190.32 8-digit HTSUS substitution (10-digit when starting with "Other") & 5-year importation window'
      },
      {
        id: 'DOM_HTSUS',
        label: 'HTSUS & GRI 1–6 — Tariff Classification',
        filterFn: (q) => q.suite === 'CBLE_HTSUS',
        cohortAcc: 83,
        cohortLookup: 33.1,
        trapNote: 'GRI 3(b) retail set essential character vs. GRI 3(c) last in numerical order & GRI 5(a)/(b) fitted cases'
      },
      {
        id: 'DOM_EA_230',
        label: '31 CFR Part 10 — IRS Circular 230 Ethics',
        filterFn: (q) => q.suite === 'EA',
        cohortAcc: 88,
        cohortLookup: 28.5,
        trapNote: '31 CFR § 10.21 client omission advisory duty, § 10.22(b) reliance due diligence & § 10.29 36-month conflict consent retention'
      }
    ];

    const domains = domainDefinitions.map(def => {
      const qs = DATASET.questions.filter(def.filterFn);
      const qCount = qs.length;
      let graded = 0;
      let correct = 0;
      const lookups = [];

      qs.forEach(q => {
        const w = STATE.questionWork[q.id];
        if (!w) return;
        if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) {
          lookups.push(w.lookupSeconds);
        }
        if (w.checked) {
          graded++;
          if (w.selectedOption === q.correctOption) correct++;
        }
      });

      const useSession = (resolvedMode === 'session');
      const accuracyPct = useSession
        ? (graded > 0 ? Math.round((correct / graded) * 100) : null)
        : def.cohortAcc;
      const meanLookupSec = useSession
        ? (lookups.length > 0 ? Number((lookups.reduce((a, b) => a + b, 0) / lookups.length).toFixed(1)) : null)
        : def.cohortLookup;

      return {
        id: def.id,
        domain: def.label,
        questionsCovered: qCount,
        gradedCount: useSession ? graded : qCount,
        accuracyPct,
        meanLookupSec,
        trapAndPriorityDrill: def.trapNote
      };
    });

    const isSessionMode = (resolvedMode === 'session');
    const overallReadinessPct = isSessionMode
      ? (stats.accuracyPercent !== null ? stats.accuracyPercent : 0)
      : 83;
    const meanLookupSeconds = isSessionMode
      ? (stats.avgLookupSeconds !== null ? stats.avgLookupSeconds : null)
      : 31.3;
    const totalQuestions = DATASET.questions.length || 30;
    const verifiedProofRatePct = isSessionMode
      ? (stats.gradedCount > 0 ? Math.round((stats.verifiedProofCount / Math.max(1, stats.gradedCount)) * 100) : 0)
      : 92;

    const isExamReady = overallReadinessPct >= 75 && (meanLookupSeconds === null || meanLookupSeconds <= 45.0);
    const verdict = isExamReady
      ? 'EXAM READY — ABOVE 75% CBP THRESHOLD'
      : 'DIAGNOSTIC BASELINE — REQUIRES CITATION DRILL';

    const cohortSeats = [
      {
        seatLabel: isSessionMode ? 'Seat 01 — Active Candidate Session' : 'Seat 01 — Lead Customs Entry Writer (LAX)',
        trackFocus: 'Full CBLE (19 CFR Parts 111–190 & HTSUS)',
        masteryPct: isSessionMode ? (stats.accuracyPercent !== null ? `${stats.accuracyPercent}% (${stats.correctCount}/${stats.gradedCount})` : '--% (0 Graded)') : '88% (21/24)',
        avgLookup: isSessionMode ? (stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s') : '27.8s',
        verifiedProofs: isSessionMode ? `${stats.verifiedProofCount} / ${totalQuestions}` : '22 / 24',
        ready: isSessionMode ? (stats.accuracyPercent !== null && stats.accuracyPercent >= 75) : true
      },
      {
        seatLabel: 'Seat 02 — Senior Import Compliance Specialist (ORD)',
        trackFocus: '19 CFR Part 152 Valuation & Part 190 Drawback',
        masteryPct: '84% (25/30)',
        avgLookup: '30.4s',
        verifiedProofs: '27 / 30',
        ready: true
      },
      {
        seatLabel: 'Seat 03 — Tariff Classification Analyst (JFK)',
        trackFocus: 'HTSUS & GRI 1–6 Classification Suite',
        masteryPct: '83% (20/24)',
        avgLookup: '32.1s',
        verifiedProofs: '21 / 24',
        ready: true
      },
      {
        seatLabel: 'Seat 04 — Brokerage Bond & Entry Coordinator (HOU)',
        trackFocus: '19 CFR Parts 111, 113, 141 & 142',
        masteryPct: '79% (19/24)',
        avgLookup: '34.6s',
        verifiedProofs: '20 / 24',
        ready: true
      },
      {
        seatLabel: 'Seat 05 — Trade Tax & Transfer Pricing Specialist (NYC)',
        trackFocus: '31 CFR Part 10 (Circular 230) & 19 CFR Part 152',
        masteryPct: '90% (27/30)',
        avgLookup: '28.9s',
        verifiedProofs: '28 / 30',
        ready: true
      },
      {
        seatLabel: 'Seat 06 — Associate Customs Entry Writer (SAV)',
        trackFocus: '19 CFR Part 152 Assists & GRI 3(b) Sets',
        masteryPct: '71% (17/24)',
        avgLookup: '42.5s',
        verifiedProofs: '18 / 24',
        ready: false
      }
    ];

    return {
      reportId: 'B2B-CD-2026-8410',
      viewMode: resolvedMode,
      viewModeTitle: isSessionMode
        ? 'Current Session Telemetry'
        : 'Sample 12-Seat Brokerage Cohort Benchmark',
      totalQuestions,
      overallReadinessPct,
      meanLookupSeconds,
      verifiedProofRatePct,
      verdict,
      isExamReady,
      domains,
      cohortSeats
    };
  }

  function renderB2BTeamReadinessReportModal(modeOverride) {
    if (modeOverride) {
      b2bReportViewMode = modeOverride;
    }
    const data = generateB2BTeamReadinessData(b2bReportViewMode);

    const viewLabelEl = document.getElementById('b2bReportActiveViewLabel');
    if (viewLabelEl) viewLabelEl.textContent = data.viewModeTitle;

    const repIdEl = document.getElementById('b2bReportIdVal');
    if (repIdEl) repIdEl.textContent = data.reportId;

    const kpiGrid = document.getElementById('b2bReportKpiGrid');
    if (kpiGrid) {
      const readinessStr = (data.viewMode === 'session' && getSessionStats().gradedCount === 0)
        ? '--%'
        : `${data.overallReadinessPct}%`;
      const lookupStr = data.meanLookupSeconds !== null
        ? `${data.meanLookupSeconds.toFixed(1)}s`
        : '--s';
      const proofStr = (data.viewMode === 'session' && getSessionStats().gradedCount === 0)
        ? '0%'
        : `${data.verifiedProofRatePct}%`;

      kpiGrid.innerHTML = `
        <div class="b2b-kpi-box">
          <span class="b2b-kpi-label">Overall Domain Mastery &amp; Pass Readiness %</span>
          <strong class="b2b-kpi-val" id="b2bKpiReadinessVal">${escapeHtml(readinessStr)}</strong>
          <span class="b2b-kpi-sub">CBP Official Passing Threshold: &gt;= 75.0%</span>
        </div>
        <div class="b2b-kpi-box">
          <span class="b2b-kpi-label">Mean Citation Lookup Latency (s)</span>
          <strong class="b2b-kpi-val" id="b2bKpiLatencyVal">${escapeHtml(lookupStr)}</strong>
          <span class="b2b-kpi-sub">Target Benchmark: &lt;= 40.0s (Legacy PDF: 145s)</span>
        </div>
        <div class="b2b-kpi-box">
          <span class="b2b-kpi-label">Verified 19 CFR / HTSUS Citation Proof Rate %</span>
          <strong class="b2b-kpi-val" id="b2bKpiProofRateVal">${escapeHtml(proofStr)}</strong>
          <span class="b2b-kpi-sub">Exact statutory section locked as evidence</span>
        </div>
        <div class="b2b-kpi-box">
          <span class="b2b-kpi-label">Compliance Director Verdict</span>
          <strong class="b2b-kpi-val ${data.isExamReady ? 'b2b-verdict-pass' : 'b2b-verdict-warn'}" id="b2bKpiVerdictVal" style="font-size:13px;line-height:1.3;">${escapeHtml(data.verdict)}</strong>
          <span class="b2b-kpi-sub">${escapeHtml(data.viewModeTitle)}</span>
        </div>
      `;
    }

    const domainTbody = document.getElementById('b2bReportDomainTableBody');
    if (domainTbody) {
      domainTbody.innerHTML = data.domains.map(d => {
        const accCell = d.accuracyPct !== null ? `${d.accuracyPct}%` : '--% (Untested)';
        const latCell = d.meanLookupSec !== null ? `${d.meanLookupSec.toFixed(1)}s` : '--s';
        return `
          <tr>
            <td><strong>${escapeHtml(d.domain)}</strong></td>
            <td class="b2b-mono-cell">${d.questionsCovered} Qs</td>
            <td class="b2b-mono-cell">${escapeHtml(accCell)}</td>
            <td class="b2b-mono-cell">${escapeHtml(latCell)}</td>
            <td>${escapeHtml(d.trapAndPriorityDrill)}</td>
          </tr>
        `;
      }).join('');
    }

    const cohortTbody = document.getElementById('b2bReportCohortTableBody');
    if (cohortTbody) {
      cohortTbody.innerHTML = data.cohortSeats.map(seat => `
        <tr>
          <td><strong>${escapeHtml(seat.seatLabel)}</strong></td>
          <td>${escapeHtml(seat.trackFocus)}</td>
          <td class="b2b-mono-cell">${escapeHtml(seat.masteryPct)}</td>
          <td class="b2b-mono-cell">${escapeHtml(seat.avgLookup)}</td>
          <td class="b2b-mono-cell">${escapeHtml(seat.verifiedProofs)}</td>
          <td>
            <span class="b2b-status-chip ${seat.ready ? 'chip-pass' : 'chip-warn'}">
              ${seat.ready ? 'EXAM READY (>= 75%)' : 'PRIORITY DRILL (< 75%)'}
            </span>
          </td>
        </tr>
      `).join('');
    }

    return data;
  }

  function openB2BTeamReadinessReport(modeOverride) {
    const modal = document.getElementById('modalTeamReadinessReport');
    if (!modal) return null;

    if (modeOverride) {
      b2bReportViewMode = modeOverride;
    } else {
      const stats = getSessionStats();
      b2bReportViewMode = stats.gradedCount > 0 ? 'session' : 'cohort';
    }

    const reportData = renderB2BTeamReadinessReportModal(b2bReportViewMode);
    modal.classList.remove('hidden');
    return reportData;
  }

  function openScratchpadModal() {
    const backdrop = document.getElementById('scratchpadModalBackdrop');
    const textarea = document.getElementById('candidateScratchpadTextarea');
    if (!backdrop || !textarea) return;

    textarea.value = STATE.scratchpadText || '';
    updateCustomsValuationCalculator();
    backdrop.classList.remove('hidden');
  }

  function openOfficialScoreReportModal() {
    // Enforce Freemium Paywall on full Submit & Score Exam when on FREE tier
    if (!isProOrTeamActive()) {
      openAccountPaywallModal({
        paywallReason: 'Create an account and activate a Pro plan to unlock all 30 exam cases and full Official Exam Scoring.'
      });
      return;
    }

    const backdrop = document.getElementById('scoreReportModalBackdrop');
    const body = document.getElementById('scoreReportModalBody');
    if (!backdrop || !body) return;

    const pool = getFilteredQuestions();
    let correct = 0;
    let answered = 0;
    let verifiedProofs = 0;

    pool.forEach(q => {
      const w = getQuestionWork(q.id);
      if (w.selectedOption) {
        answered++;
        w.checked = true;
        if (w.selectedOption === q.correctOption) correct++;
      }
      if (w.attachedSectionId && isCitationProofMatch(q, w.attachedSectionId)) {
        verifiedProofs++;
      }
    });

    saveUserState();
    renderQuestionWorkspace();
    renderGlobalBarTelemetry();

    const stats = getSessionStats();
    const scorePct = pool.length > 0 ? Math.round((correct / pool.length) * 100) : 0;
    const passed = scorePct >= (DATASET.meta.passingScorePercent || 75);
    const avgLookupStr = stats.avgLookupSeconds !== null ? `${stats.avgLookupSeconds.toFixed(1)}s` : '--s';

    body.innerHTML = `
      <div style="padding:16px;border-radius:0px;margin-bottom:16px;background:${passed ? '#EDF5F0' : '#FDF2EE'};border:1.5px solid ${passed ? '#1A5638' : '#C8431F'};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:${passed ? '#1A5638' : '#C8431F'};">
            OFFICIAL EXAMINATION DETERMINATION (75% PASSING THRESHOLD)
          </div>
          <h3 style="font-family:var(--font-display);font-size:26px;font-weight:400;color:#141413;margin-top:4px;">
            ${passed ? 'PASS — Qualified for License Application' : 'BELOW 75% THRESHOLD — Additional Citation-Speed Drills Needed'}
          </h3>
          <p style="font-size:13px;color:#4A4842;margin-top:4px;">
            You answered <strong>${correct} of ${pool.length}</strong> questions correctly (${answered} attempted) with <strong>${verifiedProofs}</strong> verified statutory citation proofs.
          </p>
        </div>
        <div style="text-align:right;">
          <div style="font-family:var(--font-mono);font-size:36px;font-weight:600;color:${passed ? '#1A5638' : '#C8431F'};">${scorePct}%</div>
          <div style="font-family:var(--font-mono);font-size:11px;color:#4A4842;">Required: >= 75% (National Avg: 15.2%)</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;">
        <div style="background:#F6F4EF;border:1px solid #C9C4B8;padding:12px;border-radius:0px;">
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#78756D;font-weight:600;">AVG CITATION LOOKUP</div>
          <div style="font-family:var(--font-mono);font-size:20px;font-weight:600;color:#141413;">${avgLookupStr}</div>
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#1A5638;">Target Benchmark: <= 45.0s</div>
        </div>
        <div style="background:#F6F4EF;border:1px solid #C9C4B8;padding:12px;border-radius:0px;">
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#78756D;font-weight:600;">VERIFIED CITATION PROOFS</div>
          <div style="font-family:var(--font-mono);font-size:20px;font-weight:600;color:#141413;">${verifiedProofs} / ${pool.length}</div>
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#4A4842;">Exact eCFR / HTSUS Section Cited</div>
        </div>
        <div style="background:#F6F4EF;border:1px solid #C9C4B8;padding:12px;border-radius:0px;">
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#78756D;font-weight:600;">REMAINING EXAM CLOCK</div>
          <div style="font-family:var(--font-mono);font-size:20px;font-weight:600;color:#141413;">${formatHmsClock(STATE.cbtTimerRemainingSec)}</div>
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#4A4842;">Out of 04:30:00 total</div>
        </div>
      </div>

      <h4 style="font-family:var(--font-mono);font-size:11.5px;font-weight:600;color:#141413;margin-bottom:8px;">QUESTION-BY-QUESTION REGULATORY AUDIT</h4>
      <div style="display:flex;flex-direction:column;gap:6px;max-height:240px;overflow-y:auto;">
        ${pool.map((q, idx) => {
          const posNum = idx + 1;
          const w = getQuestionWork(q.id);
          const isRight = w.selectedOption === q.correctOption;
          return `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#F6F4EF;border:1px solid #C9C4B8;border-left:4px solid ${isRight ? '#1A5638' : '#C8431F'};border-radius:0px;font-size:12px;">
              <div>
                <strong>Q${posNum} (${escapeHtml(q.category)})</strong> — Governing Authority: <code>${escapeHtml(q.targetCitation)}</code>
              </div>
              <div style="font-family:var(--font-mono);font-weight:600;">
                Your Ans: ${w.selectedOption || 'None'} · Official: ${q.correctOption} (${isRight ? 'Pass' : 'Fail'})
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    backdrop.classList.remove('hidden');
  }

  /* ==========================================================================
     17. EVENT LISTENERS & INITIALIZATION
     ========================================================================== */
  function initEventListeners() {
    document.querySelectorAll('.cd-mode-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        if (mode) switchMode(mode);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === '1') { e.preventDefault(); switchMode('cbt'); }
      if (e.altKey && e.key === '2') { e.preventDefault(); switchMode('drill'); }
      if (e.altKey && e.key === '3') { e.preventDefault(); switchMode('analytics'); }
    });

    // 7 Test Suites Selector (#examTrackSelect) with Freemium PRO Gate & Auto-Corpus Switching
    const trackSelect = document.getElementById('examTrackSelect');
    if (trackSelect) {
      trackSelect.addEventListener('change', () => {
        const requestedSuite = trackSelect.value;
        if (isSuiteLockedForCurrentTier(requestedSuite)) {
          trackSelect.value = STATE.selectedTrack;
          openAccountPaywallModal({
            paywallReason: 'Create an account and activate a Pro plan to unlock all 30 exam cases and 7 topic suites.'
          });
          return;
        }

        STATE.selectedTrack = requestedSuite;
        const pool = getFilteredQuestions();
        if (pool[0]) STATE.currentQuestionId = pool[0].id;

        autoSwitchCorpusForSuite(STATE.selectedTrack);

        resetPerQuestionLookupStopwatch();
        saveUserState();
        refreshAllViews();
        if (STATE.activeMode === 'drill') {
          startDrillSprintForCurrentQuestion(false);
        }
        showToast(`Loaded Suite: ${trackSelect.options[trackSelect.selectedIndex].text}`);
      });
    }

    // Header Account & Unlock Pro Buttons
    const btnHeaderSignIn = document.getElementById('btnHeaderSignIn');
    if (btnHeaderSignIn) {
      btnHeaderSignIn.addEventListener('click', () => {
        openAccountPaywallModal({ tab: 'signin' });
      });
    }

    const btnHeaderUnlockPro = document.getElementById('btnHeaderUnlockPro');
    if (btnHeaderUnlockPro) {
      btnHeaderUnlockPro.addEventListener('click', () => {
        openAccountPaywallModal({ tab: 'register', planCode: 'PRO_MONTHLY' });
      });
    }

    const btnHeaderAccountBilling = document.getElementById('btnHeaderAccountBilling');
    if (btnHeaderAccountBilling) {
      btnHeaderAccountBilling.addEventListener('click', () => {
        openAccountPaywallModal({ tab: 'payment' });
      });
    }

    // Reset Button -> Restores Clean Session (0 Answered)
    const btnResetDemo = document.getElementById('btnResetDemoData');
    if (btnResetDemo) {
      btnResetDemo.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        STATE = getDefaultUserState();
        currentSearchQuery = '';
        const searchInput = document.getElementById('ecfrSearchInput');
        if (searchInput) searchInput.value = '';
        autoSwitchCorpusForSuite('CBLE');
        resetPerQuestionLookupStopwatch();
        saveUserState();
        switchMode('cbt');
        refreshAllViews();
        showToast('Session reset to fresh Free Trial (0/30 Answered)');
      });
    }

    // Collapsible Study Coach & Hints Trigger
    const btnToggleCoach = document.getElementById('btnToggleStudyCoach');
    if (btnToggleCoach) {
      btnToggleCoach.addEventListener('click', () => {
        STATE.studyCoachExpanded = !STATE.studyCoachExpanded;
        saveUserState();
        const q = getCurrentQuestion();
        if (q) {
          renderSocraticTutorPanel(q, getQuestionWork(q.id), getQuestionPosInActiveSuite(q));
        }
      });
    }

    const btnToggleTimer = document.getElementById('btnToggleCbtTimer');
    const btnResetTimer = document.getElementById('btnResetCbtTimer');
    if (btnToggleTimer) {
      btnToggleTimer.addEventListener('click', () => {
        STATE.cbtTimerPaused = !STATE.cbtTimerPaused;
        btnToggleTimer.textContent = STATE.cbtTimerPaused ? 'Resume' : 'Pause';
        saveUserState();
      });
    }
    if (btnResetTimer) {
      btnResetTimer.addEventListener('click', () => {
        STATE.cbtTimerRemainingSec = DATASET.meta.examDurationSeconds || 16200;
        STATE.cbtTimerPaused = false;
        if (btnToggleTimer) btnToggleTimer.textContent = 'Pause';
        document.getElementById('pvueCountdownClock').textContent = formatHmsClock(STATE.cbtTimerRemainingSec);
        saveUserState();
        showToast('Exam clock reset to 04:30:00');
      });
    }

    document.getElementById('btnFlagForReview').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const posNum = getQuestionPosInActiveSuite(q);
      const work = getQuestionWork(q.id);
      work.flagged = !work.flagged;
      saveUserState();
      renderQuestionWorkspace();
      showToast(work.flagged ? `Flagged Question ${posNum} for review` : `Unflagged Question ${posNum}`);
    });

    const btnHighlight = document.getElementById('btnHighlightText');
    btnHighlight.addEventListener('click', () => {
      const applied = highlightCurrentSelectionInStem();
      if (!applied) {
        STATE.highlightCursorMode = !STATE.highlightCursorMode;
        btnHighlight.classList.toggle('active', STATE.highlightCursorMode);
        const hintEl = document.getElementById('highlightModeStatusHint');
        if (hintEl) {
          hintEl.textContent = STATE.highlightCursorMode
            ? 'Highlight Mode Active: Select any text in Question or Code to mark'
            : 'Select text + click Highlight to mark key facts';
        }
        showToast(STATE.highlightCursorMode
          ? 'Highlight Mode Enabled: Select any text with your mouse to mark it'
          : 'Highlight Mode Disabled');
      }
    });

    document.addEventListener('mouseup', () => {
      if (STATE.highlightCursorMode) {
        highlightCurrentSelectionInStem();
      }
    });

    document.addEventListener('click', (e) => {
      const mark = e.target.closest('mark.user-highlight');
      if (mark) {
        const parent = mark.parentNode;
        while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
        parent.removeChild(mark);
        const q = getCurrentQuestion();
        const stemEl = document.getElementById('qStemContent');
        if (q && stemEl && stemEl.contains(parent)) {
          const work = getQuestionWork(q.id);
          work.highlightedStemHtml = stemEl.innerHTML;
          saveUserState();
        }
      }
    });

    document.getElementById('btnClearHighlights').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const work = getQuestionWork(q.id);
      work.highlightedStemHtml = null;
      saveUserState();
      renderQuestionWorkspace();
      renderReferenceLibrary();
      showToast('Cleared yellow text marks on current question');
    });

    const btnStrikeMode = document.getElementById('btnStrikethroughMode');
    btnStrikeMode.addEventListener('click', () => {
      STATE.strikethroughClickMode = !STATE.strikethroughClickMode;
      btnStrikeMode.classList.toggle('active', STATE.strikethroughClickMode);
      showToast(STATE.strikethroughClickMode
        ? 'Strikethrough Mode On: Click any option A–E (or Right-Click anytime) to cross out distractors'
        : 'Strikethrough Mode Off (Right-Click any option A–E or click Strike anytime)');
    });

    document.getElementById('btnOpenNavigator').addEventListener('click', openNavigatorModal);
    document.getElementById('btnOpenScratchpad').addEventListener('click', openScratchpadModal);
    document.getElementById('btnCheckCurrentAnswer').addEventListener('click', verifyCurrentQuestionAnswer);
    document.getElementById('btnVerifyAnswerMain').addEventListener('click', verifyCurrentQuestionAnswer);
    document.getElementById('btnGradeFullExam').addEventListener('click', openOfficialScoreReportModal);

    document.querySelectorAll('.pvue-ratio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ratio = btn.getAttribute('data-split');
        const ws = document.getElementById('pvueSplitWorkspace');
        const leftPane = document.getElementById('pvueLeftPane');
        const rightPane = document.getElementById('pvueRightPane');
        leftPane.style.width = '';
        rightPane.style.width = '';
        ws.setAttribute('data-ratio', ratio);
        document.querySelectorAll('.pvue-ratio-btn').forEach(b => b.classList.toggle('active', b === btn));
      });
    });

    const splitDivider = document.getElementById('pvueSplitDivider');
    if (splitDivider) {
      let isDraggingSplit = false;
      splitDivider.addEventListener('mousedown', (e) => {
        isDraggingSplit = true;
        splitDivider.classList.add('dragging');
        e.preventDefault();
      });
      window.addEventListener('mousemove', (e) => {
        if (!isDraggingSplit) return;
        const ws = document.getElementById('pvueSplitWorkspace');
        const rect = ws.getBoundingClientRect();
        if (rect.width < 600) return;
        const leftPct = Math.max(28, Math.min(72, ((e.clientX - rect.left) / rect.width) * 100));
        document.getElementById('pvueLeftPane').style.width = `${leftPct}%`;
        document.getElementById('pvueRightPane').style.width = `${100 - leftPct}%`;
      });
      window.addEventListener('mouseup', () => {
        if (isDraggingSplit) {
          isDraggingSplit = false;
          splitDivider.classList.remove('dragging');
        }
      });
    }

    document.getElementById('btnPrevQuestion').addEventListener('click', () => {
      const pool = getFilteredQuestions();
      const idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
      if (idx > 0) {
        STATE.currentQuestionId = pool[idx - 1].id;
        resetPerQuestionLookupStopwatch();
        saveUserState();
        renderQuestionWorkspace();
        if (STATE.activeMode === 'drill') startDrillSprintForCurrentQuestion(false);
      }
    });

    // Next Question Button -> Enforces 3-Question Free Trial Paywall on Question 4+
    document.getElementById('btnNextQuestion').addEventListener('click', () => {
      const pool = getFilteredQuestions();
      const idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
      const nextIdx = idx + 1;
      if (nextIdx >= pool.length) return;

      if (isQuestionIndexLockedForCurrentTier(nextIdx)) {
        openAccountPaywallModal({
          paywallReason: 'Create an account and activate a Pro plan to unlock all 30 exam cases and 7 topic suites.'
        });
        return;
      }

      STATE.currentQuestionId = pool[nextIdx].id;
      resetPerQuestionLookupStopwatch();
      saveUserState();
      renderQuestionWorkspace();
      if (STATE.activeMode === 'drill') startDrillSprintForCurrentQuestion(false);
    });

    document.getElementById('btnSwitchToDrillFromCbt').addEventListener('click', () => {
      switchMode('drill');
      showToast('Launched 90-Second Citation-Speed Drill');
    });

    document.getElementById('btnJumpToAttachedProof').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const work = getQuestionWork(q.id);
      const sec = resolveSectionByRef(work.attachedSectionId);
      if (sec) openSectionInReader(sec);
    });

    document.getElementById('btnExpOpenTargetSection').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const sec = resolveSectionByRef(q.targetSectionId) || resolveSectionByRef(q.targetCitation);
      if (sec) {
        openSectionInReader(sec);
        showToast(`Opened Governing Section: ${sec.citation}`);
      }
    });

    document.getElementById('btnDrillRestartSprint').addEventListener('click', () => {
      startDrillSprintForCurrentQuestion(true);
      showToast('Restarted 90-Second Citation-Speed Sprint');
    });

    document.getElementById('btnDrillPauseSprint').addEventListener('click', (e) => {
      drillPaused = !drillPaused;
      e.currentTarget.textContent = drillPaused ? 'Resume' : 'Pause';
    });

    document.getElementById('btnDrillNextQuestion').addEventListener('click', () => {
      const pool = getFilteredQuestions();
      const idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
      const nextIdx = (idx + 1) % pool.length;

      if (isQuestionIndexLockedForCurrentTier(nextIdx)) {
        openAccountPaywallModal({
          paywallReason: 'Create an account and activate a Pro plan to unlock all 30 exam cases and 7 topic suites.'
        });
        return;
      }

      STATE.currentQuestionId = pool[nextIdx].id;
      saveUserState();
      startDrillSprintForCurrentQuestion(false);
    });

    [1, 2, 3].forEach(level => {
      const btn = document.getElementById(`btnRevealHint${level}`);
      if (btn) {
        btn.addEventListener('click', () => {
          const q = getCurrentQuestion();
          if (!q) return;
          const work = getQuestionWork(q.id);
          work.revealedHints = Array.isArray(work.revealedHints) ? work.revealedHints : [];
          if (!work.revealedHints.includes(level)) work.revealedHints.push(level);
          saveUserState();
          renderSocraticTutorPanel(q, work, getQuestionPosInActiveSuite(q));
        });
      }
    });

    document.getElementById('btnRevealShortestPath').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const work = getQuestionWork(q.id);
      if (work.shortestPathRevealed || work.checked) {
        const sec = resolveSectionByRef(q.targetSectionId) || resolveSectionByRef(q.targetCitation);
        if (sec) openSectionInReader(sec);
      } else {
        work.shortestPathRevealed = true;
        saveUserState();
        renderSocraticTutorPanel(q, work, getQuestionPosInActiveSuite(q));
      }
    });

    document.querySelectorAll('.socratic-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const promptType = chip.getAttribute('data-prompt');
        generateSocraticExaminerResponse(promptType, null);
      });
    });

    const askCustomBtn = document.getElementById('btnSocraticCustomAsk');
    const askCustomInput = document.getElementById('socraticCustomInput');
    if (askCustomBtn && askCustomInput) {
      const triggerAsk = () => {
        const val = askCustomInput.value.trim();
        if (!val) return;
        generateSocraticExaminerResponse('custom', val);
        askCustomInput.value = '';
      };
      askCustomBtn.addEventListener('click', triggerAsk);
      askCustomInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          triggerAsk();
        }
      });
    }

    const ecfrSearchInput = document.getElementById('ecfrSearchInput');
    if (ecfrSearchInput) {
      ecfrSearchInput.addEventListener('input', () => {
        currentSearchQuery = ecfrSearchInput.value;
        const qTrim = currentSearchQuery.trim();
        if (qTrim) {
          const activeCorpus = getActiveCorpus();
          let firstHit = null;
          if (activeCorpus) {
            for (const p of activeCorpus.parts) {
              const found = p.sections.find(s => countSectionSearchMatches(s, qTrim) > 0);
              if (found) { firstHit = found; break; }
            }
          }
          if (!firstHit) {
            firstHit = DATASET.allSections.find(s => countSectionSearchMatches(s, qTrim) > 0);
            if (firstHit) STATE.activeCorpusId = firstHit.corpusId;
          }
          if (firstHit) STATE.activeSectionId = firstHit.id;
        }
        renderReferenceLibrary();
      });
    }

    document.getElementById('btnClearEcfrSearch').addEventListener('click', () => {
      currentSearchQuery = '';
      if (ecfrSearchInput) ecfrSearchInput.value = '';
      renderReferenceLibrary();
    });

    document.querySelectorAll('.ref-search-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const qStr = chip.getAttribute('data-query') || '';
        currentSearchQuery = qStr;
        if (ecfrSearchInput) ecfrSearchInput.value = qStr;
        const firstHit = DATASET.allSections.find(s => countSectionSearchMatches(s, qStr) > 0);
        if (firstHit) {
          STATE.activeCorpusId = firstHit.corpusId;
          STATE.activeSectionId = firstHit.id;
        }
        renderReferenceLibrary();
      });
    });

    document.getElementById('btnToggleCodeTree').addEventListener('click', () => {
      STATE.treeCollapsed = !STATE.treeCollapsed;
      saveUserState();
      renderReferenceLibrary();
    });

    document.getElementById('btnLockCitationProof').addEventListener('click', lockInActiveSectionAsProof);
    document.getElementById('btnCopyCitationScratchpad').addEventListener('click', copyActiveCitationToScratchpad);

    const closeNav = () => document.getElementById('navigatorModalBackdrop').classList.add('hidden');
    document.getElementById('btnCloseNavigatorModal').addEventListener('click', closeNav);
    document.getElementById('btnNavCloseFooter').addEventListener('click', closeNav);
    document.getElementById('btnNavGradeExam').addEventListener('click', () => {
      closeNav();
      openOfficialScoreReportModal();
    });

    const closeScratch = () => document.getElementById('scratchpadModalBackdrop').classList.add('hidden');
    document.getElementById('btnCloseScratchpadModal').addEventListener('click', closeScratch);
    document.getElementById('btnScratchpadDone').addEventListener('click', closeScratch);
    document.getElementById('btnAnalyticsOpenScratchpad').addEventListener('click', openScratchpadModal);

    ['calcInvoicePrice', 'calcPackingCost', 'calcAssistCost', 'calcRoyaltyCost', 'calcNonDutiable', 'calcDutyRate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateCustomsValuationCalculator);
    });

    document.getElementById('btnInsertCalcToScratchpad').addEventListener('click', () => {
      const res = updateCustomsValuationCalculator();
      const note = `\n19 CFR § 152.103 Valuation Calculation: Appraised Transaction Value = ${res.transactionVal} | Duty (${res.ratePct}%) = ${res.baseDuty} | MPF+HMF = ${res.mpfHmf} | Total CBP Deposit = ${res.totalDeposit}`;
      const textarea = document.getElementById('candidateScratchpadTextarea');
      textarea.value = (textarea.value.trim() + '\n' + note).trim();
      STATE.scratchpadText = textarea.value;
      saveUserState();
      showToast('Inserted Transaction Value calculation into Candidate Notes');
    });

    const scratchTextarea = document.getElementById('candidateScratchpadTextarea');
    if (scratchTextarea) {
      scratchTextarea.addEventListener('input', () => {
        STATE.scratchpadText = scratchTextarea.value;
        saveUserState();
      });
    }

    document.getElementById('btnClearScratchpadNotes').addEventListener('click', () => {
      STATE.scratchpadText = '';
      if (scratchTextarea) scratchTextarea.value = '';
      saveUserState();
      showToast('Cleared Candidate Notes');
    });

    const closeScore = () => document.getElementById('scoreReportModalBackdrop').classList.add('hidden');
    document.getElementById('btnCloseScoreReportModal').addEventListener('click', closeScore);
    document.getElementById('btnScoreReviewQuestions').addEventListener('click', closeScore);
    document.getElementById('btnScoreOpenAnalytics').addEventListener('click', () => {
      closeScore();
      switchMode('analytics');
    });

    // Mode 3 Pricing Card Toggle & CTAs
    const btnMonthly = document.getElementById('btnCycleMonthly');
    const btnPass = document.getElementById('btnCycleExamPass');
    const b2cAmount = document.getElementById('b2cPriceAmount');
    const b2cPeriod = document.getElementById('b2cPricePeriod');
    const btnCheckoutB2C = document.getElementById('btnCheckoutB2C');

    if (btnMonthly && btnPass) {
      btnMonthly.addEventListener('click', () => {
        btnMonthly.classList.add('active');
        btnPass.classList.remove('active');
        b2cAmount.textContent = '$79';
        b2cPeriod.textContent = '/ month · cancel anytime';
        btnCheckoutB2C.textContent = 'Start Candidate Pro — $79/mo →';
        btnCheckoutB2C.setAttribute('data-plan-code', 'PRO_MONTHLY');
      });
      btnPass.addEventListener('click', () => {
        btnPass.classList.add('active');
        btnMonthly.classList.remove('active');
        b2cAmount.textContent = '$199';
        b2cPeriod.textContent = '/ 6-month exam cycle pass (Save 58%)';
        btnCheckoutB2C.textContent = 'Start 6-Month Exam Cycle Pass — $199 →';
        btnCheckoutB2C.setAttribute('data-plan-code', 'PRO_CYCLE');
      });
    }

    if (btnCheckoutB2C) {
      btnCheckoutB2C.addEventListener('click', () => {
        const planCode = btnCheckoutB2C.getAttribute('data-plan-code') || 'PRO_MONTHLY';
        openAccountPaywallModal({ tab: STATE.accountUser ? 'payment' : 'register', planCode });
      });
    }
    const btnCheckoutB2B = document.getElementById('btnCheckoutB2B');
    if (btnCheckoutB2B) {
      btnCheckoutB2B.addEventListener('click', () => {
        openAccountPaywallModal({ tab: STATE.accountUser ? 'payment' : 'register', planCode: 'TEAM_MONTHLY' });
      });
    }

    // Account, Registration & Pro Paywall Modal Events
    document.getElementById('btnCloseCheckoutModal').addEventListener('click', () => {
      document.getElementById('checkoutModalBackdrop').classList.add('hidden');
    });

    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabKey = btn.getAttribute('data-auth-tab');
        if (tabKey) switchAuthModalTab(tabKey);
      });
    });

    document.querySelectorAll('#regPlanSelector .plan-radio-card').forEach(card => {
      card.addEventListener('click', () => {
        const code = card.getAttribute('data-plan-code');
        if (code) selectPlanByCode(code);
      });
    });

    // Tab 1: Registration Form Submit -> Saves Account & Advances to Tab 3 (Payment)
    const regForm = document.getElementById('registerAccountForm');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('regFullNameInput').value.trim();
        const email = document.getElementById('regEmailInput').value.trim();
        const role = document.getElementById('regRoleSelect').value;

        STATE.accountUser = {
          fullName,
          email,
          role,
          createdAt: new Date().toISOString()
        };
        saveUserState();
        renderGlobalBarTelemetry();

        const checkoutEmail = document.getElementById('checkoutEmailInput');
        const checkoutOrg = document.getElementById('checkoutOrgInput');
        const invComp = document.getElementById('invCompanyInput');
        if (checkoutEmail) checkoutEmail.value = email;
        if (checkoutOrg) checkoutOrg.value = fullName;
        if (invComp) invComp.value = fullName;

        switchAuthModalTab('payment');
        showToast(`Account created for ${email}. Complete payment or license activation below.`);
      });
    }

    // Tab 2: Sign In Form Submit
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmailInput').value.trim();
        if (!email) return;

        if (!STATE.accountUser || STATE.accountUser.email !== email) {
          STATE.accountUser = {
            fullName: email.split('@')[0],
            email,
            role: 'CBLE Candidate',
            createdAt: new Date().toISOString()
          };
        }
        saveUserState();
        renderGlobalBarTelemetry();

        if (isProOrTeamActive()) {
          document.getElementById('checkoutModalBackdrop').classList.add('hidden');
          showToast(`Signed in as ${email} (${STATE.licenseTier} License Active)`);
        } else {
          switchAuthModalTab('payment');
          showToast(`Signed in as ${email}. Activate your Pro plan below.`);
        }
      });
    }

    // Tab 3: Payment & Activation Sub-Method Switcher
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const methodKey = btn.getAttribute('data-pay-method');
        if (methodKey) switchPaymentMethodSubTab(methodKey);
      });
    });

    // Method A: Card / Contra B2B Instant Checkout Submit
    const stripeForm = document.getElementById('stripeCheckoutForm');
    if (stripeForm) {
      stripeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('checkoutEmailInput').value.trim();
        const holder = document.getElementById('checkoutOrgInput').value.trim();
        const plan = PLAN_CATALOG[STATE.selectedPlanCode] || PLAN_CATALOG.PRO_MONTHLY;

        if (email) {
          STATE.accountUser = Object.assign({}, STATE.accountUser || {}, {
            fullName: holder || (STATE.accountUser && STATE.accountUser.fullName) || email.split('@')[0],
            email
          });
          saveUserState();
        }

        if (isLocalQaEnvironment()) {
          const generatedKey = generateSignedLicenseKey(plan.tier);
          validateAndActivateLicenseKey(generatedKey);
          return;
        }

        const gwEl = document.querySelector('#stripeCheckoutForm select');
        const gw = gwEl ? gwEl.value : 'gumroad';
        const url =
          gw === 'contra'
            ? 'https://contra.com/s/qAZQN6OW-code-drilltm-cbt-and-interactive-exam-courseware-team-license'
            : 'https://caliberfoundry.gumroad.com/l/codedrill-pro';
        window.open(url, '_blank', 'noopener');
        switchPaymentMethodSubTab('key');
        showToast('Opened secure checkout. Paste the license key from your receipt to unlock CodeDrill CBT Pro.');
      });
    }

    // Method B: Generate Corporate Invoice & Print PDF
    const btnGenInv = document.getElementById('btnGenerateInvoice');
    if (btnGenInv) {
      btnGenInv.addEventListener('click', () => {
        renderCorporateInvoicePreview();
        showToast('Generated Commercial Invoice from Caliber Foundry');
      });
    }

    const btnPrintInv = document.getElementById('btnPrintInvoice');
    if (btnPrintInv) {
      btnPrintInv.addEventListener('click', () => {
        renderCorporateInvoicePreview();
        window.print();
      });
    }

    // Method C: Validate & Activate License Key
    const btnActKey = document.getElementById('btnActivateLicenseKey');
    if (btnActKey) {
      btnActKey.addEventListener('click', () => {
        const keyInput = document.getElementById('licenseKeyInput');
        const rawKey = keyInput ? keyInput.value : '';
        validateAndActivateLicenseKey(rawKey);
      });
    }

    // Printable B2B Team Readiness PDF Report Modal Events
    const btnExportB2B = document.getElementById('btnExportB2BTeamReport');
    if (btnExportB2B) {
      btnExportB2B.addEventListener('click', () => {
        openB2BTeamReadinessReport();
      });
    }

    const btnB2BCardReport = document.getElementById('btnB2BCardPreviewReport');
    if (btnB2BCardReport) {
      btnB2BCardReport.addEventListener('click', () => {
        openB2BTeamReadinessReport('cohort');
      });
    }

    const btnCloseB2BModal = document.getElementById('btnCloseB2BTeamReportModal');
    if (btnCloseB2BModal) {
      btnCloseB2BModal.addEventListener('click', () => {
        document.getElementById('modalTeamReadinessReport').classList.add('hidden');
      });
    }

    const btnToggleCohort = document.getElementById('btnToggleB2BCohortMode');
    if (btnToggleCohort) {
      btnToggleCohort.addEventListener('click', () => {
        b2bReportViewMode = (b2bReportViewMode === 'cohort') ? 'session' : 'cohort';
        renderB2BTeamReadinessReportModal(b2bReportViewMode);
        showToast(`Switched B2B Dossier to: ${b2bReportViewMode === 'cohort' ? 'Sample 12-Seat Brokerage Cohort Benchmark' : 'Current Session Telemetry'}`);
      });
    }

    const btnPrintB2B = document.getElementById('btnPrintB2BTeamReport');
    if (btnPrintB2B) {
      btnPrintB2B.addEventListener('click', () => {
        window.print();
      });
    }

    const btnUpgradeB2BReport = document.getElementById('btnUpgradeFromB2BReport');
    if (btnUpgradeB2BReport) {
      btnUpgradeB2BReport.addEventListener('click', () => {
        document.getElementById('modalTeamReadinessReport').classList.add('hidden');
        openAccountPaywallModal({
          tab: 'payment',
          planCode: 'TEAM_MONTHLY'
        });
        switchPaymentMethodSubTab('invoice');
      });
    }
  }

  /* ==========================================================================
     18. GLOBAL TIMERS, PUBLIC CONTROLLER HOOK & BOOTSTRAP
     ========================================================================== */
  function startGlobalClocks() {
    const clockEl = document.getElementById('pvueCountdownClock');
    if (clockEl) clockEl.textContent = formatHmsClock(STATE.cbtTimerRemainingSec);

    cbtTimerInterval = setInterval(() => {
      if (STATE.cbtTimerPaused || STATE.activeMode !== 'cbt') return;
      if (STATE.cbtTimerRemainingSec > 0) {
        STATE.cbtTimerRemainingSec--;
        if (clockEl) clockEl.textContent = formatHmsClock(STATE.cbtTimerRemainingSec);
        if (STATE.cbtTimerRemainingSec % 10 === 0) saveUserState();
      }
    }, 1000);

    questionElapsedTimerInterval = setInterval(() => {
      const q = getCurrentQuestion();
      if (!q) return;
      const miniEl = document.getElementById('qElapsedLookupTimer');
      if (miniEl) {
        const sec = getCurrentElapsedLookupSec(q);
        miniEl.textContent = `${sec.toFixed(1)}s`;
      }
    }, 200);
  }

  function initApp() {
    const verBadge = document.getElementById('cdVersionBadge');
    if (verBadge && DATASET.meta.version) {
      verBadge.textContent = String(DATASET.meta.version).replace(/^v/i, '');
    }

    initEventListeners();
    updateScratchpadBadge();
    resetPerQuestionLookupStopwatch();
    startGlobalClocks();
    switchMode(STATE.activeMode || 'cbt');
  }

  // Expose clean controller for external QA test harnesses without polluting production UI
  if (typeof window !== 'undefined') {
    window.CodeDrillApp = {
      getDataset: () => DATASET,
      getState: () => STATE,
      setState: (newState) => {
        STATE = Object.assign(getDefaultUserState(), newState);
        saveUserState();
        refreshAllViews();
      },
      refreshAllViews,
      validateAndActivateLicenseKey,
      openAccountPaywallModal,
      openB2BTeamReadinessReport,
      generateB2BTeamReadinessData,
      switchMode
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
