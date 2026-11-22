/**
 * CodeDrill™ CBT Simulator — Core Application Architecture
 * 1:1 Pearson VUE Split-Screen Simulator + 90s Citation-Speed Drill + Readiness Analytics
 * Swiss Editorial & Tactile Industrial Precision | Pure Vanilla ES6+ JavaScript
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. COMPREHENSIVE FALLBACK DATASET (IF window.CODEDRILL_DATA IS ISOLATED)
     ========================================================================== */
  const FALLBACK_CODEDRILL_DATA = {
    meta: {
      productName: 'CodeDrill™ CBT Simulator',
      examTrack: 'U.S. Customs Broker License Examination (CBLE — 19 CFR / HTSUS)',
      secondaryTracks: ['IRS Enrolled Agent (31 CFR Part 10 Circular 230)'],
      version: '2026.4 Enterprise',
      examDurationSeconds: 16200, // 4 hours 30 minutes
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
                id: '19-cfr-111-23',
                citation: '19 CFR § 111.23',
                title: 'Retention of records',
                breadcrumb: 'Title 19 > Chapter I > Part 111 > Subpart C > § 111.23',
                examFrequency: 'Very High (92%)',
                keywords: ['recordkeeping', '5 years', 'retention period', 'original records', 'U.S. customs territory'],
                crossRefs: ['19 CFR § 111.32', '19 CFR § 163.4'],
                text: `(a) Place of retention. A licensed customs broker must maintain originals of the records referred to in this part, including any records stored in electronic formats, within the customs territory of the United States and in accordance with the provisions of this part and part 163 of this chapter.\n(b) Period of retention. The records described in this section, other than powers of attorney, must be retained for at least 5 years after the date of entry. Powers of attorney must be retained until revoked, and revoked powers of attorney and letters of revocation must be retained for 5 years after the date of revocation or for 5 years after the date the client ceases to be an "active client" as defined in § 111.29(b)(2)(ii), whichever period is later.`
              },
              {
                id: '19-cfr-111-32',
                citation: '19 CFR § 111.32',
                title: 'False information and duty to report noncompliance',
                breadcrumb: 'Title 19 > Chapter I > Part 111 > Subpart C > § 111.32',
                examFrequency: 'Extreme (98%)',
                keywords: ['false information', 'client noncompliance', 'error', 'omission', 'written record', 'separation from client'],
                crossRefs: ['19 CFR § 111.23', '19 CFR § 111.53'],
                text: `A broker must not file or procure or assist in the filing of any claim, or of any document, affidavit, or other papers, known by such broker to be false. In addition, a broker must not give, or solicit or procure the giving of, any information or testimony in any matter pending before the Department of Homeland Security or any representative of the Department of Homeland Security known by such broker to be false.\nA broker must also document and report to CBP when the broker separates from or cancels representation of a client as a result of determining that the client is intentionally attempting to use the broker to defraud the U.S. Government or commit any criminal act through the U.S. Customs laws.`
              },
              {
                id: '19-cfr-111-36',
                citation: '19 CFR § 111.36',
                title: 'Relations with unlicensed persons (Freight Forwarders)',
                breadcrumb: 'Title 19 > Chapter I > Part 111 > Subpart C > § 111.36',
                examFrequency: 'High (84%)',
                keywords: ['unlicensed person', 'freight forwarder', 'power of attorney', 'direct billing', 'compensation'],
                crossRefs: ['19 CFR § 111.23', '19 CFR § 141.32'],
                text: `(a) Employment by unlicensed person other than importer. When a broker is employed for the transaction of customs business by an unlicensed person who is not the actual importer, the broker must transmit to the actual importer either a copy of his bill for services rendered or a copy of the entry, unless the merchandise was purchased on a delivered duty-paid basis or unless the importer has in writing waived transmittal of the copy of the entry or bill for services rendered.\n(c) Execution of power of attorney. A customs broker must not execute a customs transaction through an unlicensed freight forwarder without obtaining a valid power of attorney directly from the principal party in interest, and the broker must not forbid or prevent direct communication between the importer of record and the broker.`
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
                breadcrumb: 'Title 19 > Chapter I > Part 141 > Subpart F > § 141.86',
                examFrequency: 'High (81%)',
                keywords: ['commercial invoice', 'port of entry', 'currency', 'country of origin', 'English language'],
                crossRefs: ['19 CFR § 142.3', '19 CFR § 152.103'],
                text: `(a) General requirements. Every commercial invoice required for the entry of merchandise into the customs territory of the United States must set forth:\n(1) The port of entry to which the merchandise is destined;\n(2) The time when, the place where, and the person by whom and the person to whom the merchandise is sold or agreed to be sold;\n(3) A detailed description of the merchandise, including the commercial name by which each item is known, the grade or quality, and the marks, numbers, and symbols under which sold by the seller or manufacturer to the trade in the country of exportation;\n(4) The quantities in the weights and measures of the country or place from which the merchandise is shipped, or in the weights and measures of the United States;\n(5) The purchase price of each item in the currency of the purchase, and all charges upon the merchandise, itemized by name and amount, including freight, insurance, commission, cases, containers, coverings, and cost of packing; and\n(6) The country of origin of the merchandise.`
              },
              {
                id: '19-cfr-142-12',
                citation: '19 CFR § 142.12',
                title: 'Time for filing entry summary (10 Working Days)',
                breadcrumb: 'Title 19 > Chapter I > Part 142 > Subpart B > § 142.12',
                examFrequency: 'Very High (94%)',
                keywords: ['entry summary', 'CBP Form 7501', '10 working days', 'release of merchandise', 'estimated duties'],
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
                breadcrumb: 'Title 19 > Chapter I > Part 152 > Subpart E > § 152.102',
                examFrequency: 'Extreme (99%)',
                keywords: ['assist', 'tools dies molds', 'engineering undertaken outside US', 'free of charge', 'reduced cost'],
                crossRefs: ['19 CFR § 152.103', '19 CFR § 141.86'],
                text: `(a) Assist. (1) "Assist" means any of the following if supplied directly or indirectly, and free of charge or at reduced cost, by the buyer of imported merchandise for use in connection with the production or the sale for export to the United States of the merchandise:\n(i) Materials, components, parts, and similar items incorporated in the imported merchandise;\n(ii) Tools, dies, molds, and similar items used in the production of the imported merchandise;\n(iii) Merchandise consumed in the production of the imported merchandise; and\n(iv) Engineering, development, artwork, design work, and plans and sketches that are undertaken elsewhere than in the United States and are necessary for the production of the imported merchandise.\n(2) Exclusion: No service or work to which paragraph (a)(1)(iv) of this section applies will be treated as an assist if the service or work is performed by a person domiciled within the United States, is performed while that person is acting as an employee or agent of the buyer, and is incidental to other engineering, development, artwork, design work, or plans or sketches undertaken within the United States.`
              },
              {
                id: '19-cfr-152-103',
                citation: '19 CFR § 152.103',
                title: 'Transaction value — Additions and Exclusions',
                breadcrumb: 'Title 19 > Chapter I > Part 152 > Subpart E > § 152.103',
                examFrequency: 'Extreme (99%)',
                keywords: ['transaction value', 'price actually paid or payable', 'selling commission', 'buying commission', 'international freight', 'royalties'],
                crossRefs: ['19 CFR § 152.102', '19 CFR § 141.86'],
                text: `(a) Price actually paid or payable. The transaction value of imported merchandise is the price actually paid or payable for the merchandise when sold for exportation to the United States, plus amounts equal to:\n(1) The packing costs incurred by the buyer with respect to the imported merchandise;\n(2) Any selling commission incurred by the buyer with respect to the imported merchandise;\n(3) The value, apportioned as appropriate, of any assist;\n(4) Any royalty or license fee related to the imported merchandise that the buyer is required to pay, directly or indirectly, as a condition of the sale of the imported merchandise for exportation to the United States; and\n(5) The proceeds of any subsequent resale, disposal, or use of the imported merchandise that accrue, directly or indirectly, to the seller.\n(i) Exclusions from transaction value: The transaction value of imported merchandise does not include any of the following, if identified separately from the price actually paid or payable: (1) Any reasonable cost or charge that is incurred for the construction, erection, assembly, or maintenance of, or the technical assistance provided with respect to, the merchandise after its importation into the United States; (2) The customs duties and other Federal taxes currently payable on the imported merchandise by reason of its importation; or (3) Actual international freight and marine insurance costs from the country of exportation to the United States.`
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
                breadcrumb: 'Title 19 > Chapter I > Part 190 > Subpart C > § 190.32',
                examFrequency: 'Very High (90%)',
                keywords: ['drawback', 'TFTEA', '8-digit HTSUS subheading', '99 percent refund', '5 years', 'lesser of principle'],
                crossRefs: ['19 CFR § 111.23'],
                text: `(a) General provision. Under 19 U.S.C. 1313(j)(2), as amended by the Trade Facilitation and Trade Enforcement Act of 2015 (TFTEA), if imported merchandise on which was paid any duty, tax, or fee imposed under Federal law traits as imported is substituted with merchandise classified under the same 8-digit HTSUS subheading description (and not beginning with the term "other"), 99 percent of the amount of such duty, tax, or fee is refundable as drawback.\n(b) Time limitation (5-Year Rule). The exported or destroyed substituted merchandise must be exported or destroyed under CBP supervision before the close of the 5-year period beginning on the date of importation of the imported merchandise and before the drawback claim is filed.`
              }
            ]
          }
        ]
      },
      {
        id: 'htsus-gri',
        code: 'HTSUS / GRI',
        title: 'HTSUS General Rules of Interpretation (GRI 1–6)',
        parts: [
          {
            id: 'part-gri',
            code: 'GRI 1–6',
            title: 'General Rules of Interpretation of the Harmonized Tariff Schedule',
            sections: [
              {
                id: 'htsus-gri-1',
                citation: 'HTSUS GRI 1 & GRI 2',
                title: 'GRI 1 (Terms of Headings & Section/Chapter Notes) and GRI 2 (Incomplete/Unassembled)',
                breadcrumb: 'HTSUS > General Rules of Interpretation > GRI 1 & GRI 2',
                examFrequency: 'Extreme (96%)',
                keywords: ['GRI 1', 'terms of the headings', 'section or chapter notes', 'GRI 2(a)', 'incomplete or unfinished', 'essential character'],
                crossRefs: ['HTSUS GRI 3', '19 CFR § 152.103'],
                text: `GRI 1: The table of contents, alphabetical index, and titles of sections, chapters and sub-chapters are provided for ease of reference only; for legal purposes, classification shall be determined according to the terms of the headings and any relative section or chapter notes and, provided such headings or notes do not otherwise require, according to the following provisions.\nGRI 2(a): Any reference in a heading to an article shall be taken to include a reference to that article incomplete or unfinished, provided that, as entered, the incomplete or unfinished article has the essential character of the complete or finished article. It shall also include a reference to that article complete or finished (or falling to be classified as complete or finished by virtue of this rule), entered unassembled or disassembled.`
              },
              {
                id: 'htsus-gri-3',
                citation: 'HTSUS GRI 3',
                title: 'GRI 3(a) Most Specific, GRI 3(b) Essential Character & Retail Sets, GRI 3(c) Last in Numerical Order',
                breadcrumb: 'HTSUS > General Rules of Interpretation > GRI 3',
                examFrequency: 'Extreme (99%)',
                keywords: ['GRI 3(a)', 'relative specificity', 'GRI 3(b)', 'essential character', 'goods put up in sets for retail sale', 'GRI 3(c)', 'last in numerical order'],
                crossRefs: ['HTSUS GRI 1 & GRI 2'],
                text: `When, by application of rule 2(b) or for any other reason, goods are, prima facie, classifiable under two or more headings, classification shall be effected as follows:\n(a) Specific over General (GRI 3(a)): The heading which provides the most specific description shall be preferred to headings providing a more general description. However, when two or more headings each refer to part only of the materials or substances contained in mixed or composite goods or to part only of the items in a set put up for retail sale, those headings are to be regarded as equally specific in relation to those goods, even if one of them gives a more complete or precise description of the goods.\n(b) Essential Character (GRI 3(b)): Mixtures, composite goods consisting of different materials or made up of different components, and goods put up in sets for retail sale, which cannot be classified by reference to 3(a), shall be classified as if they consisted of the material or component which gives them their essential character, insofar as this criterion is applicable.\n(c) Last in Numerical Order (GRI 3(c)): When goods cannot be classified by reference to 3(a) or 3(b), they shall be classified under the heading which occurs last in numerical order among those which equally merit consideration.`
              }
            ]
          }
        ]
      },
      {
        id: '31-cfr-cir230',
        code: '31 CFR Part 10',
        title: '31 CFR Part 10 — IRS Circular 230 (Enrolled Agent Preview)',
        parts: [
          {
            id: 'part-10-subpart-b',
            code: 'Subpart B',
            title: '31 CFR Part 10 Subpart B — Duties and Restrictions Relating to Practice Before the IRS',
            sections: [
              {
                id: '31-cfr-10-21',
                citation: '31 CFR § 10.21',
                title: 'Knowledge of client’s omission (Circular 230)',
                breadcrumb: 'Title 31 > Subtitle A > Part 10 > Subpart B > § 10.21',
                examFrequency: 'Extreme (97% on SEE Part 3)',
                keywords: ['client omission', 'error', 'noncompliance', 'advise promptly', 'consequences under Internal Revenue Code'],
                crossRefs: ['31 CFR § 10.22', '19 CFR § 111.32'],
                text: `A practitioner who, having been retained by a client with respect to a matter administered by the Internal Revenue Service, knows that the client has not complied with the revenue laws of the United States or has made an error in or omission from any return, document, affidavit, or other paper which the client submitted or executed under the revenue laws of the United States, must advise the client promptly of the fact of such noncompliance, error, or omission. The practitioner must advise the client of the consequences as provided under the Code and regulations of such noncompliance, error, or omission.`
              },
              {
                id: '31-cfr-10-22',
                citation: '31 CFR § 10.22',
                title: 'Diligence as to accuracy and reliance on others',
                breadcrumb: 'Title 31 > Subtitle A > Part 10 > Subpart B > § 10.22',
                examFrequency: 'Very High (93% on SEE Part 3)',
                keywords: ['due diligence', 'accuracy', 'reliance on work product', 'reasonable care', 'oral or written representations'],
                crossRefs: ['31 CFR § 10.21'],
                text: `(a) In general. A practitioner must exercise due diligence:\n(1) In preparing or assisting in the preparation of, approving, and filing tax returns, documents, affidavits, and other papers relating to Internal Revenue Service matters;\n(2) In determining the correctness of oral or written representations made by the practitioner to the Department of the Treasury; and\n(3) In determining the correctness of oral or written representations made by the practitioner to clients with reference to any matter administered by the Internal Revenue Service.\n(b) Reliance on others. Except as modified by §§ 10.34 and 10.37, a practitioner will be presumed to have exercised due diligence for purposes of this section if the practitioner relies on the work product of another person and the practitioner used reasonable care in engaging, supervising, training, and evaluating the person, taking proper account of the nature of the relationship between the practitioner and the person.`
              }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        id: 'q-cble-1',
        number: 1,
        track: 'US Customs Broker (CBLE - 19 CFR / HTSUS)',
        category: '19 CFR Part 152 — Customs Valuation & Assists',
        difficulty: 'Hard',
        targetLookupSeconds: 45,
        stem: `Apex Imports LLC (located in Dallas, TX) purchases 10,000 injection-molded automotive sensor housings from an unrelated manufacturer in Stuttgart, Germany, at an FOB Hamburg invoice price of $80,000. In addition to the invoice amount, Apex incurs the following costs not included on the seller's commercial invoice:\n• $6,000 for specialized steel injection molds produced in Milan, Italy, which Apex purchased and shipped free of charge to the German factory.\n• $4,500 for schematic engineering and CAD design work performed in Austin, Texas, by U.S.-domiciled engineers and emailed free of charge to the German factory.\n• $2,000 paid to Apex's bona fide buying agent in Munich for locating the supplier.\n• $3,800 for ocean freight and marine cargo insurance from Hamburg to Houston.\n\nUnder 19 CFR Part 152, what is the correct appraised Transaction Value of the imported shipment?`,
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
        goldenQuote: '“Engineering, development, artwork, design work, and plans and sketches that are undertaken elsewhere than in the United States and are necessary for the production of the imported merchandise [constitute an assist].” (19 CFR § 152.102(a)(1)(iv))',
        shortestPathHint: '19 CFR Tab → Part 152 → § 152.102(a)(1)(ii) & (iv) (or search "assist" / "undertaken elsewhere than in the United States")',
        socraticHints: [
          'Level 1 (Regulatory Domain): This is an appraisement calculation under Transaction Value. You must determine which buyer-supplied items qualify as dutiable "Assists" versus statutory exclusions.',
          'Level 2 (CFR Part): Navigate to 19 CFR Part 152 (Subpart E — Valuation). Compare the definition of an "Assist" in § 152.102(a)(1) with the statutory additions in § 152.103(b).',
          'Level 3 (Exact Section & Distractor Trap): Check § 152.102(a)(1)(iv) carefully: engineering/design work is ONLY a dutiable assist if undertaken OUTSIDE the United States! Buying commissions and international ocean freight are also excluded.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 152.103(b), Transaction Value begins with the FOB price actually paid or payable ($80,000) plus the value of any statutory assist defined in 19 CFR § 152.102(a)(1). The $6,000 Italian steel molds provided free of charge are a dutiable assist under § 152.102(a)(1)(ii) ($80,000 + $6,000 = $86,000). The $4,500 U.S. engineering is excluded under § 152.102(a)(1)(iv) because it was undertaken inside the United States. Bona fide buying commissions ($2,000) and international ocean freight/insurance ($3,800) are excluded from Transaction Value.',
          distractors: {
            A: 'Incorrect ($80,000): Fails to add the $6,000 Italian molds supplied free of charge by the buyer, which are mandatory dutiable assists under 19 CFR § 152.102(a)(1)(ii).',
            B: 'CORRECT ($86,000): Base FOB price ($80,000) + Foreign-produced molds provided free of charge ($6,000) = $86,000. U.S. engineering ($4,500), buying commissions ($2,000), and ocean freight ($3,800) are legally excluded.',
            C: 'Incorrect ($90,500): Erroneously adds the $4,500 engineering performed in Austin, TX. Under 19 CFR § 152.102(a)(1)(iv), engineering undertaken inside the U.S. is NOT a dutiable assist.',
            D: 'Incorrect ($92,500): Erroneously adds both the U.S. engineering ($4,500) and the non-dutiable bona fide buying agent commission ($2,000).',
            E: 'Incorrect ($96,300): Classic exam trap that adds every dollar amount in the stem, including excluded international ocean freight and marine insurance ($3,800).'
          }
        }
      },
      {
        id: 'q-cble-2',
        number: 2,
        track: 'US Customs Broker (CBLE - 19 CFR / HTSUS)',
        category: '19 CFR Part 111 — Broker Compliance & Ethics',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: `Licensed customs broker Elena Vance discovers that a corporate client is intentionally altering country-of-origin certificates on steel pipe shipments to evade Section 301 and antidumping duties. When Elena confronts the client's VP of Logistics, the client refuses to correct the documentation and instructs Elena to file the entry as presented. Elena immediately terminates representation of the client.\n\nUnder modernized 19 CFR Part 111, what is Elena's mandatory regulatory obligation regarding this separation?`,
        options: [
          { letter: 'A', text: 'Simply retain the termination letter in her internal files for 5 years; she owes a strict duty of confidentiality and may not notify CBP.' },
          { letter: 'B', text: 'Refuse to file the entry, document the facts, and affirmatively report the separation and client fraud attempt to CBP.' },
          { letter: 'C', text: 'File the entry under protest and submit a Prior Disclosure on the client’s behalf within 30 calendar days.' },
          { letter: 'D', text: 'Report the client to the Federal Maritime Commission within 90 days of account closure.' },
          { letter: 'E', text: 'Transfer the client’s Power of Attorney to an unlicensed freight forwarder without notifying CBP.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-111-32',
        targetCitation: '19 CFR § 111.32',
        goldenQuote: '“A broker must also document and report to CBP when the broker separates from or cancels representation of a client as a result of determining that the client is intentionally attempting to use the broker to defraud the U.S. Government...” (19 CFR § 111.32)',
        shortestPathHint: '19 CFR Tab → Part 111 → § 111.32 (or search "separates from" / "false information")',
        socraticHints: [
          'Level 1 (Regulatory Domain): This tests the modernized Part 111 broker ethical obligations when a client attempts intentional customs fraud.',
          'Level 2 (CFR Part): Open 19 CFR Part 111 Subpart C (Duties and Responsibilities of Customs Brokers).',
          'Level 3 (Exact Section & Distractor Trap): Look at 19 CFR § 111.32 (False information). Notice the modernized second paragraph governing mandatory reporting to CBP upon separating from a fraudulent client.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 111.32, a broker must never file any document known to be false, AND under the modernized Part 111 rules, when a broker separates from or cancels representation of a client because the client is intentionally attempting to use the broker to defraud the U.S. Government, the broker must document and report that separation to CBP.',
          distractors: {
            A: 'Incorrect: Under the pre-2022 legacy regulations, brokers often believed confidentiality prevented reporting, but modernized 19 CFR § 111.32 explicitly mandates reporting the separation to CBP.',
            B: 'CORRECT: 19 CFR § 111.32 requires the broker to refuse to file false documents AND document and report to CBP when terminating a client attempting intentional customs fraud.',
            C: 'Incorrect: Filing a document known to be false is a direct violation of 19 CFR § 111.32 and subjects the broker license to revocation under § 111.53.',
            D: 'Incorrect: Jurisdiction lies with U.S. Customs and Border Protection (CBP), not the Federal Maritime Commission.',
            E: 'Incorrect: Transferring customs business to an unlicensed person or aiding evasion violates 19 CFR § 111.32 and § 111.36.'
          }
        }
      },
      {
        id: 'q-cble-3',
        number: 3,
        track: 'US Customs Broker (CBLE - 19 CFR / HTSUS)',
        category: 'HTSUS & GRI 1–6 — Tariff Classification',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: `An importer enters a shrink-wrapped "Backcountry Espresso Retail Kit" packaged ready for direct retail sale to consumers without repacking. The kit contains:\n1. A portable hand-pumped stainless steel espresso maker (Heading 8419 — value $42.00);\n2. Two double-walled borosilicate glass espresso cups (Heading 7013 — value $8.00);\n3. A nylon carrying pouch fitted to hold the components (Heading 4202 — value $4.50); and\n4. A 100-gram tin of roasted arabica coffee beans (Heading 0901 — value $3.50).\n\nNo single heading in the HTSUS specifically describes the entire retail kit by name. Under which General Rule of Interpretation (GRI) is the entire retail set classified under Heading 8419?`,
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
        goldenQuote: '“Mixtures, composite goods consisting of different materials or made up of different components, and goods put up in sets for retail sale, which cannot be classified by reference to 3(a), shall be classified as if they consisted of the material or component which gives them their essential character...” (HTSUS GRI 3(b))',
        shortestPathHint: 'HTSUS / GRI Tab → GRI 1–6 → HTSUS GRI 3 (paragraph (a) second sentence & paragraph (b))',
        socraticHints: [
          'Level 1 (Regulatory Domain): Multiple distinct articles packaged together for retail sale to meet a specific activity (making espresso) invoke the General Rules of Interpretation for Retail Sets.',
          'Level 2 (HTSUS Rule): Check HTSUS GRI 3. Why can’t GRI 3(a) (relative specificity) resolve a retail set where each heading refers to only part of the items?',
          'Level 3 (Exact Section & Distractor Trap): Read the second sentence of GRI 3(a) ("those headings are to be regarded as equally specific"), which forces you directly to GRI 3(b) (Essential Character)!'
        ],
        explanation: {
          correctReasoning: 'Under GRI 3(a), when two or more headings each refer to part only of the items in a set put up for retail sale, those headings are regarded as equally specific. Therefore, classification moves sequentially to GRI 3(b), which governs "goods put up in sets for retail sale" and classifies the entire set according to the component that imparts its "essential character" (here, the portable espresso maker of Heading 8419). You only reach GRI 3(c) if essential character cannot be determined.',
          distractors: {
            A: 'Incorrect (GRI 1): GRI 1 cannot classify a multi-item retail set when no single heading or section/chapter note covers the combination.',
            B: 'Incorrect (GRI 2(a)): GRI 2(a) applies to a single complete article entered unassembled/disassembled, not a retail set of distinct articles (coffee, glasses, pouch, maker).',
            C: 'Incorrect (GRI 3(a)): Crucial trap! The second sentence of GRI 3(a) explicitly states that when headings refer to part only of the items in a retail set, they are deemed equally specific, barring GRI 3(a).',
            D: 'CORRECT (GRI 3(b)): Classifies retail sets by the component imparting essential character (the espresso maker).',
            E: 'Incorrect (GRI 3(c)): Even though 8419 happens to be last numerically, GRI 3 is strictly hierarchical—you may only apply GRI 3(c) when goods CANNOT be classified by GRI 3(b) essential character.'
          }
        }
      },
      {
        id: 'q-cble-4',
        number: 4,
        track: 'US Customs Broker (CBLE - 19 CFR / HTSUS)',
        category: '19 CFR Part 142 — Entry Summary & Deadlines',
        difficulty: 'Medium',
        targetLookupSeconds: 30,
        stem: `Merchandise arrives at the Port of Los Angeles/Long Beach and is released under an immediate delivery / entry release (CBP Form 3461) on Monday, October 5. No federal holidays occur during the month of October.\n\nAssuming the entry summary documentation (CBP Form 7501) was not required at the time of entry, within what statutory timeframe must the importer or broker file the Entry Summary with estimated duties attached under 19 CFR § 142.12?`,
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
        goldenQuote: '“...the entry summary documentation (CBP Form 7501 or electronic equivalent) must be filed, with estimated duties attached, within 10 working days after the time of entry and release of the merchandise.” (19 CFR § 142.12(b))',
        shortestPathHint: '19 CFR Tab → Part 141 / 142 → § 142.12(b) (or search "10 working days" / "entry summary")',
        socraticHints: [
          'Level 1 (Regulatory Domain): Distinguish between the 15-calendar-day window to make initial entry after carrier arrival vs. the post-release window to file the Entry Summary (CBP Form 7501).',
          'Level 2 (CFR Part): Navigate to 19 CFR Part 142 Subpart B (Entry Summary Documentation).',
          'Level 3 (Exact Section & Distractor Trap): Look at 19 CFR § 142.12(b). Watch out for the "calendar days" vs. "working days" distractor trap!'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 142.12(b), when entry summary documentation is not required at the time of entry, the entry summary (CBP Form 7501) with estimated duties attached must be filed within 10 WORKING days after the time of entry and release of the merchandise.',
          distractors: {
            A: 'Incorrect (5 working days): Confuses the 10-working-day entry summary rule with other port protest or carnets timelines.',
            B: 'Incorrect (10 calendar days): Double trap—uses "calendar days" instead of "working days" and measures from carrier arrival instead of release.',
            C: 'CORRECT (10 working days after entry and release): Exact requirement of 19 CFR § 142.12(b).',
            D: 'Incorrect (15 calendar days): Under § 142.12(a) and § 141.5, 15 calendar days after carrier arrival is the deadline to file initial entry (or when entry summary serves as both entry and entry summary prior to release).',
            E: 'Incorrect (30 calendar days): Not the statutory timeframe for CBP Form 7501 entry summary filing.'
          }
        }
      },
      {
        id: 'q-cble-5',
        number: 5,
        track: 'US Customs Broker (CBLE - 19 CFR / HTSUS)',
        category: '19 CFR Part 190 — Modernized Drawback (TFTEA)',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: `Under the Trade Facilitation and Trade Enforcement Act (TFTEA) Modernized Drawback regulations in 19 CFR Part 190, an importer seeks to file a Substitution Unused Merchandise Drawback claim under 19 U.S.C. 1313(j)(2).\n\nWhich of the following accurately states both the tariff classification matching standard for substituted merchandise and the statutory time window from importation to exportation/destruction?`,
        options: [
          { letter: 'A', text: 'Commercially interchangeable standard; exported within 3 years from the date of importation.' },
          { letter: 'B', text: 'Same 8-digit HTSUS subheading (not beginning with "other"); exported or destroyed within 5 years beginning on the date of importation (99% refund).' },
          { letter: 'C', text: 'Same 6-digit Harmonized System heading; exported within 5 years from the date of liquidation (100% refund).' },
          { letter: 'D', text: 'Same 10-digit statistical reporting number; exported within 3 years from the date of entry summary.' },
          { letter: 'E', text: 'Same 4-digit HTSUS heading; exported within 7 years from the date of exportation.' }
        ],
        correctOption: 'B',
        targetSectionId: '19-cfr-190-32',
        targetCitation: '19 CFR § 190.32(a) & (b)',
        goldenQuote: '“...if imported merchandise on which was paid any duty, tax, or fee... is substituted with merchandise classified under the same 8-digit HTSUS subheading description (and not beginning with the term "other"), 99 percent of the amount of such duty, tax, or fee is refundable as drawback... before the close of the 5-year period beginning on the date of importation...” (19 CFR § 190.32)',
        shortestPathHint: '19 CFR Tab → Part 190 → § 190.32 (or search "8-digit HTSUS" / "190.32")',
        socraticHints: [
          'Level 1 (Regulatory Domain): TFTEA (19 CFR Part 190) replaced legacy Part 191 rules for substitution drawback.',
          'Level 2 (CFR Part): Open 19 CFR Part 190 Subpart C (Unused Merchandise Drawback) → § 190.32.',
          'Level 3 (Exact Section & Distractor Trap): Don’t fall for legacy Part 191 rules ("commercially interchangeable" and "3 years"). Modernized Part 190 uses the 8-digit HTSUS subheading standard and a 5-year window from importation!'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 190.32(a) and (b), TFTEA Modernized Substitution Unused Merchandise Drawback requires the substituted merchandise to be classified under the same 8-digit HTSUS subheading (when the 8-digit description does not begin with "other"), refunds 99% of duties/taxes/fees (subject to the lesser-of rule), and provides a 5-year period beginning on the date of importation to export or destroy the substituted merchandise.',
          distractors: {
            A: 'Incorrect: "Commercially interchangeable" and "3 years" were the legacy pre-TFTEA Part 191 standards, frequently tested as a trap against candidates using outdated study binders.',
            B: 'CORRECT: Same 8-digit HTSUS subheading (not starting with "other"), 99% refund, and 5-year period from the date of importation per 19 CFR § 190.32.',
            C: 'Incorrect: Uses 6-digit HS instead of 8-digit HTSUS, measures from liquidation instead of importation, and states 100% instead of 99%.',
            D: 'Incorrect: 10-digit statistical suffix is only used if the 8-digit subheading begins with "other", and the time limit is 5 years, not 3 years.',
            E: 'Incorrect: Neither 4-digit heading nor 7-year timeframe exists in Part 190.'
          }
        }
      },
      {
        id: 'q-cble-6',
        number: 6,
        track: 'US Customs Broker (CBLE - 19 CFR / HTSUS)',
        category: '19 CFR Part 111 — Recordkeeping & Unlicensed Forwarders',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: `A licensed customs broker is hired by an unlicensed ocean freight forwarder to clear a shipment for the actual importer of record (who did not purchase on a Delivered Duty Paid basis and has not signed any waiver). Additionally, the broker recently had a long-time client revoke its Power of Attorney (POA).\n\nUnder 19 CFR § 111.36 and § 111.23, what must the broker transmit to the actual importer, and how long must the broker retain the revoked Power of Attorney?`,
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
        goldenQuote: '“When a broker is employed for the transaction of customs business by an unlicensed person who is not the actual importer, the broker must transmit to the actual importer either a copy of his bill for services rendered or a copy of the entry...” (19 CFR § 111.36(a))',
        shortestPathHint: '19 CFR Tab → Part 111 → § 111.36(a) & cross-reference § 111.23(b)',
        socraticHints: [
          'Level 1 (Regulatory Domain): This tests broker dealings with unlicensed freight forwarders and the special retention rule for revoked Powers of Attorney.',
          'Level 2 (CFR Part): Check 19 CFR Part 111 → § 111.36 (Relations with unlicensed persons) and § 111.23 (Retention of records).',
          'Level 3 (Exact Section & Distractor Trap): Under § 111.36(a), unless DDP or waived in writing, the broker must send the importer a copy of the bill or entry. Under § 111.23(b), revoked POAs are kept 5 years after revocation or after ceasing to be an active client, whichever is later.'
        ],
        explanation: {
          correctReasoning: 'Under 19 CFR § 111.36(a), when employed by an unlicensed person (such as a freight forwarder) who is not the actual importer, the broker must transmit to the actual importer either a copy of the bill for services rendered or a copy of the entry (unless DDP or waived in writing). Under 19 CFR § 111.23(b), revoked powers of attorney must be retained for 5 years after the date of revocation or 5 years after the client ceases to be an active client, whichever period is later.',
          distractors: {
            A: 'Incorrect: Violates § 111.36(a) transparency rules and states a 3-year retention period instead of 5 years.',
            B: 'CORRECT: Satisfies both 19 CFR § 111.36(a) and 19 CFR § 111.23(b).',
            C: 'Incorrect: Neither permanent retention nor profit margin disclosure to CBP is required.',
            D: 'Incorrect: Retention of a revoked POA runs from the date of revocation (or ceasing to be an active client), not initial execution.',
            E: 'Incorrect: Under § 111.36(c), the POA must be executed directly by the principal party in interest (importer), and retention is 5 years, not 1 year.'
          }
        }
      },
      {
        id: 'q-ea-1',
        number: 7,
        track: 'IRS Enrolled Agent (31 CFR Part 10 Preview)',
        category: '31 CFR Part 10 — IRS Circular 230 Ethics',
        difficulty: 'Medium',
        targetLookupSeconds: 35,
        stem: `Marcus Chen, an Enrolled Agent practicing before the Internal Revenue Service, is retained by a new corporate client to represent the company in an IRS examination of its prior-year Form 1120. While reviewing the client's general ledger, Marcus discovers that the client omitted $140,000 of taxable gross receipts from the filed return.\n\nUnder 31 CFR § 10.21 (Treasury Department Circular 230), what is Marcus's specific regulatory duty upon discovering this omission?`,
        options: [
          { letter: 'A', text: 'Immediately notify the IRS Criminal Investigation Division in writing within 10 business days without informing the client.' },
          { letter: 'B', text: 'Promptly advise the client of the fact of such noncompliance, error, or omission, AND advise the client of the consequences as provided under the Internal Revenue Code and regulations.' },
          { letter: 'C', text: 'Prepare and sign an amended Form 1120X and file it with the IRS even if the client refuses to authorize the filing.' },
          { letter: 'D', text: 'Impound the client’s original accounting records until the client pays the additional tax liability.' },
          { letter: 'E', text: 'Take no action because the return was prepared by a previous CPA firm rather than by Marcus.' }
        ],
        correctOption: 'B',
        targetSectionId: '31-cfr-10-21',
        targetCitation: '31 CFR § 10.21',
        goldenQuote: '“...must advise the client promptly of the fact of such noncompliance, error, or omission. The practitioner must advise the client of the consequences as provided under the Code and regulations of such noncompliance, error, or omission.” (31 CFR § 10.21)',
        shortestPathHint: '31 CFR Part 10 Tab → Subpart B → § 10.21 (or search "omission" / "10.21")',
        socraticHints: [
          'Level 1 (Regulatory Domain): This tests Circular 230 Subpart B duties when a practitioner discovers an error or omission on a client’s prior return.',
          'Level 2 (CFR Part): Switch to the "31 CFR Part 10" corpus tab in the right panel and select § 10.21.',
          'Level 3 (Exact Section & Distractor Trap): Notice the two-part requirement in 31 CFR § 10.21: (1) promptly advise the client of the error/omission, and (2) advise the client of the Code/regulatory consequences. Contrast this with 19 CFR § 111.32 for customs brokers!'
        ],
        explanation: {
          correctReasoning: 'Under 31 CFR § 10.21 (Knowledge of client’s omission), an Enrolled Agent or Circular 230 practitioner who knows a client has made an error in or omission from any return or document submitted under U.S. revenue laws must: (1) promptly advise the client of the noncompliance, error, or omission, and (2) advise the client of the consequences under the Internal Revenue Code and regulations.',
          distractors: {
            A: 'Incorrect: Unlike modernized 19 CFR § 111.32 for customs brokers separating from a fraudulent client, Circular 230 § 10.21 directs the practitioner to advise the client rather than unilaterally reporting the client to IRS CI.',
            B: 'CORRECT: Tracks the exact two-pronged mandate of 31 CFR § 10.21.',
            C: 'Incorrect: A practitioner cannot file an amended tax return without the taxpayer’s authorization.',
            D: 'Incorrect: Under 31 CFR § 10.28, a practitioner must return client records upon request even if a dispute exists.',
            E: 'Incorrect: § 10.21 applies regardless of who prepared the prior return once the practitioner is retained on the matter and discovers the omission.'
          }
        }
      },
      {
        id: 'q-ea-2',
        number: 8,
        track: 'IRS Enrolled Agent (31 CFR Part 10 Preview)',
        category: '31 CFR Part 10 — Due Diligence & Reliance on Others',
        difficulty: 'Hard',
        targetLookupSeconds: 40,
        stem: `Sarah Jenkins, an Enrolled Agent, engages a third-party valuation specialist and a junior tax associate to compile R&D credit schedules for a client submission to the IRS. The submission contains an unintended calculation error originating from the specialist's worksheet.\n\nUnder 31 CFR § 10.22(b) (Circular 230 — Diligence as to accuracy), under what condition will Sarah be presumed to have exercised due diligence when relying on the work product of another person?`,
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
        goldenQuote: '“...a practitioner will be presumed to have exercised due diligence for purposes of this section if the practitioner relies on the work product of another person and the practitioner used reasonable care in engaging, supervising, training, and evaluating the person, taking proper account of the nature of the relationship between the practitioner and the person.” (31 CFR § 10.22(b))',
        shortestPathHint: '31 CFR Part 10 Tab → Subpart B → § 10.22(b) (or search "reliance on others" / "reasonable care")',
        socraticHints: [
          'Level 1 (Regulatory Domain): This tests Circular 230 due diligence standards and the safe harbor for relying on another person’s work product.',
          'Level 2 (CFR Part): Open 31 CFR Part 10 → § 10.22 (Diligence as to accuracy).',
          'Level 3 (Exact Section & Distractor Trap): Read paragraph (b) "Reliance on others"—look for the four verbs following "reasonable care in...": engaging, supervising, training, and evaluating.'
        ],
        explanation: {
          correctReasoning: 'Under 31 CFR § 10.22(b), except as modified by §§ 10.34 and 10.37, a practitioner is presumed to have exercised due diligence when relying on the work product of another person if the practitioner used reasonable care in engaging, supervising, training, and evaluating the person, taking proper account of the nature of the relationship between the practitioner and that person.',
          distractors: {
            A: 'Incorrect: § 10.22(b) explicitly provides a presumption of due diligence when reasonable care is used.',
            B: 'Incorrect: Private indemnification does not substitute for Circular 230 reasonable care in engaging, supervising, training, and evaluating.',
            C: 'CORRECT: Verbatim standard from 31 CFR § 10.22(b).',
            D: 'Incorrect: Circular 230 does not restrict reliance solely to same-state CPAs.',
            E: 'Incorrect: There is no $10,000 threshold in § 10.22(b).'
          }
        }
      }
    ]
  };

  /* ==========================================================================
     2. DATASET NORMALIZATION & MERGING WITH window.CODEDRILL_DATA
     ========================================================================== */
  function buildNormalizedDataset() {
    const ext = (typeof window !== 'undefined' && window.CODEDRILL_DATA && typeof window.CODEDRILL_DATA === 'object')
      ? window.CODEDRILL_DATA
      : null;

    const meta = Object.assign({}, FALLBACK_CODEDRILL_DATA.meta, ext && ext.meta ? ext.meta : {});

    // Merge or normalize corpora
    let rawCorpora = (ext && Array.isArray(ext.corpora) && ext.corpora.length > 0)
      ? JSON.parse(JSON.stringify(ext.corpora))
      : JSON.parse(JSON.stringify(FALLBACK_CODEDRILL_DATA.corpora));

    // Ensure 31 CFR Part 10 corpus exists for the IRS Enrolled Agent track filter
    const has31Cfr = rawCorpora.some(c =>
      /31\s*cfr|circular\s*230|enrolled\s*agent/i.test(`${c.id || ''} ${c.code || ''} ${c.title || ''}`)
    );
    if (!has31Cfr) {
      const fallbackEaCorpus = FALLBACK_CODEDRILL_DATA.corpora.find(c => c.id === '31-cfr-cir230');
      if (fallbackEaCorpus) {
        rawCorpora.push(JSON.parse(JSON.stringify(fallbackEaCorpus)));
      }
    }

    // Build flat lookup map of all sections
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

    // Merge or normalize questions
    let rawQuestions = (ext && Array.isArray(ext.questions) && ext.questions.length > 0)
      ? JSON.parse(JSON.stringify(ext.questions))
      : JSON.parse(JSON.stringify(FALLBACK_CODEDRILL_DATA.questions));

    // Check if there are any EA / 31 CFR questions; if not, append fallback EA questions
    const hasEaQuestions = rawQuestions.some(q =>
      /31\s*cfr|circular\s*230|enrolled\s*agent|\bea\b|\birs\b/i.test(`${q.track || ''} ${q.category || ''} ${q.targetCitation || ''}`)
    );
    if (!hasEaQuestions) {
      const fallbackEaQuestions = FALLBACK_CODEDRILL_DATA.questions.filter(q =>
        /31\s*cfr|enrolled\s*agent/i.test(q.track)
      );
      fallbackEaQuestions.forEach((eq, idx) => {
        const copy = JSON.parse(JSON.stringify(eq));
        copy.number = rawQuestions.length + idx + 1;
        rawQuestions.push(copy);
      });
    }

    // Normalize each question
    const questions = rawQuestions.map((q, index) => {
      const combinedTrackStr = `${q.track || ''} ${q.category || ''} ${q.targetCitation || ''}`;
      const isEa = /31\s*cfr|circular\s*230|enrolled\s*agent|\bea\b|\birs\b/i.test(combinedTrackStr);
      const trackCode = isEa ? 'EA' : 'CBLE';

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
        track: q.track || (trackCode === 'EA' ? 'IRS Enrolled Agent (31 CFR Part 10 Preview)' : 'US Customs Broker (CBLE - 19 CFR / HTSUS)'),
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
     3. PERSISTENT LOCALSTORAGE STATE MANAGEMENT
     ========================================================================== */
  const STORAGE_KEY = 'CODEDRILL_CBT_STATE_V2026';

  function getDefaultUserState() {
    return {
      activeMode: 'cbt', // 'cbt' | 'drill' | 'analytics'
      selectedTrack: 'CBLE', // 'CBLE' | 'EA' | 'ALL'
      currentQuestionId: DATASET.questions[0] ? DATASET.questions[0].id : null,
      activeCorpusId: DATASET.corpora[0] ? DATASET.corpora[0].id : null,
      activeSectionId: DATASET.allSections[0] ? DATASET.allSections[0].id : null,
      cbtTimerRemainingSec: DATASET.meta.examDurationSeconds || 16200,
      cbtTimerPaused: false,
      highlightCursorMode: false,
      strikethroughClickMode: false,
      splitRatio: '50-50',
      treeCollapsed: false,
      questionWork: {},
      drillStats: {
        attempts: 0,
        correctCount: 0,
        streak: 0,
        lookupTimes: []
      },
      scratchpadText: `=== CODEDRILL™ CANDIDATE EXAM SCRATCHPAD ===\n• 19 CFR § 152.103 Transaction Value = Price Paid/Payable + Packing + Selling Commissions + Assists + Royalties.\n• Non-dutiable if separately identified: Buying commissions, Int'l Freight & Marine Insurance, U.S.-performed engineering.\n• Modernized Part 190 Substitution Drawback: 8-digit HTSUS match, 5-year window from importation, 99% refund.\n`,
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

  /* ==========================================================================
     4. RUNTIME TIMERS & LOOKUP STOPWATCH STATE
     ========================================================================== */
  let cbtTimerInterval = null;
  let questionLookupStartMs = Date.now();
  let questionElapsedTimerInterval = null;

  // 90-Second Citation-Speed Drill Sprint Clock
  const DRILL_MAX_SECONDS = 90.0;
  let drillRemainingSeconds = DRILL_MAX_SECONDS;
  let drillLookupElapsedSeconds = 0.0;
  let drillCitationLocked = false;
  let drillPaused = false;
  let drillInterval = null;

  /* ==========================================================================
     5. HELPER UTILITIES (SECTION MATCHING, FUZZY CROSS-REFS, FORMATTING)
     ========================================================================== */
  function getFilteredQuestions() {
    if (STATE.selectedTrack === 'ALL') {
      return DATASET.questions;
    }
    const filtered = DATASET.questions.filter(q => q.trackCode === STATE.selectedTrack);
    return filtered.length > 0 ? filtered : DATASET.questions;
  }

  function getCurrentQuestion() {
    const pool = getFilteredQuestions();
    let found = pool.find(q => q.id === STATE.currentQuestionId);
    if (!found) {
      found = pool[0] || DATASET.questions[0];
      if (found) STATE.currentQuestionId = found.id;
    }
    return found;
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
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeHighlightedStemHtml(rawHtml) {
    const temp = document.createElement('div');
    temp.innerHTML = String(rawHtml || '');
    const cleanParagraphs = [];
    temp.querySelectorAll('p').forEach(p => {
      let pHtml = '';
      p.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          pHtml += escapeHtml(node.textContent);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'MARK') {
          pHtml += `<mark class="user-highlight" title="Click to remove highlight">${escapeHtml(node.textContent)}</mark>`;
        } else {
          pHtml += escapeHtml(node.textContent);
        }
      });
      cleanParagraphs.push(`<p>${pHtml}</p>`);
    });
    return cleanParagraphs.join('');
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

  function getUserAverageLookupSeconds() {
    const times = [];
    if (Array.isArray(STATE.drillStats.lookupTimes)) {
      STATE.drillStats.lookupTimes.forEach(t => {
        if (typeof t === 'number' && t > 0) times.push(t);
      });
    }
    Object.values(STATE.questionWork).forEach(w => {
      if (typeof w.lookupSeconds === 'number' && w.lookupSeconds > 0) {
        times.push(w.lookupSeconds);
      }
    });
    if (times.length === 0) return 38.4;
    const sum = times.reduce((a, b) => a + b, 0);
    return Number((sum / times.length).toFixed(1));
  }

  function calculatePassProbability() {
    const allWork = Object.values(STATE.questionWork);
    const checkedWork = allWork.filter(w => w.checked);
    const avgLookup = getUserAverageLookupSeconds();

    if (checkedWork.length === 0 && STATE.drillStats.attempts === 0) {
      return 72;
    }

    let correct = 0;
    let total = 0;
    DATASET.questions.forEach(q => {
      const w = STATE.questionWork[q.id];
      if (w && w.checked) {
        total++;
        if (w.selectedOption === q.correctOption) correct++;
      }
    });

    const accRatio = total > 0 ? (correct / total) : 0.75;
    const speedBonus = avgLookup <= 45 ? 12 : avgLookup <= 65 ? 4 : -8;
    const rawProb = Math.round(accRatio * 82 + speedBonus);
    return Math.max(18, Math.min(98, rawProb));
  }

  /* ==========================================================================
     6. TOP GLOBAL BAR & MODE SWITCHING (MODE 1 CBT | MODE 2 DRILL | MODE 3 ANALYTICS)
     ========================================================================== */
  function renderGlobalBarTelemetry() {
    const avgSec = getUserAverageLookupSeconds();
    const passProb = calculatePassProbability();

    const avgEl = document.getElementById('globalAvgLookupVal');
    if (avgEl) avgEl.textContent = `${avgSec.toFixed(1)}s`;

    const probBadge = document.getElementById('globalPassProbBadge');
    if (probBadge) probBadge.textContent = `${passProb}% PASS PROB`;

    const trackSelect = document.getElementById('examTrackSelect');
    if (trackSelect && trackSelect.value !== STATE.selectedTrack) {
      trackSelect.value = STATE.selectedTrack;
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
     7. LEFT PANE: QUESTION WORKSPACE, OPTIONS A-E, STRIKETHROUGH, SOCRATIC EXAMINER
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
    const qIndex = pool.findIndex(item => item.id === q.id);
    const posNum = qIndex >= 0 ? qIndex + 1 : 1;
    const work = getQuestionWork(q.id);

    // 1. Update Pearson VUE Header Info
    const examTitleEl = document.getElementById('pvueExamTitle');
    if (examTitleEl) {
      examTitleEl.textContent = q.trackCode === 'EA'
        ? 'IRS Special Enrollment Examination (Part 3 — 31 CFR Part 10 Circular 230) — Pearson VUE CBT'
        : 'U.S. Customs Broker License Examination (19 CFR / HTSUS) — Pearson VUE CBT Delivery';
    }

    const posEl = document.getElementById('pvueQuestionPosition');
    if (posEl) posEl.textContent = `Question ${posNum} of ${pool.length}`;

    const verifyPill = document.getElementById('pvueCitationVerifyPill');
    if (verifyPill) {
      if (work.attachedCitation) {
        verifyPill.textContent = `[VERIFIED: ${work.attachedCitation}]`;
        verifyPill.classList.add('verified');
      } else {
        verifyPill.textContent = 'Citation Unverified';
        verifyPill.classList.remove('verified');
      }
    }

    // Update Flag Button in Pearson VUE Toolbar
    const btnFlag = document.getElementById('btnFlagForReview');
    const flagText = document.getElementById('flagToolText');
    if (btnFlag && flagText) {
      btnFlag.classList.toggle('flagged-active', !!work.flagged);
      flagText.textContent = work.flagged ? '[FLAGGED FOR REVIEW]' : 'Flag for Review';
    }

    // Update Navigator badge count
    const answeredCount = pool.filter(item => {
      const w = STATE.questionWork[item.id];
      return w && w.selectedOption;
    }).length;
    const navBadge = document.getElementById('navAnsweredCountBadge');
    if (navBadge) navBadge.textContent = `${answeredCount}/${pool.length}`;

    // 2. Question Metadata Strip
    document.getElementById('qMetaNumberBadge').textContent = `Q${String(posNum).padStart(2, '0')}`;
    document.getElementById('qMetaTrackBadge').textContent = q.trackCode === 'EA' ? 'IRS EA // 31 CFR' : 'CBLE // 19 CFR & HTSUS';
    document.getElementById('qMetaCategoryBadge').textContent = q.category;
    document.getElementById('qMetaDifficultyBadge').textContent = q.difficulty;
    document.getElementById('qMetaTargetTimeBadge').textContent = `TARGET LOOKUP: <= ${q.targetLookupSeconds}s`;

    // 3. Speed Drill 2-Step Checklist Status
    renderDrillChecklistState(q, work);

    // 4. Question Stem (with persisted yellow highlights if present, sanitized against DOM XSS)
    const stemEl = document.getElementById('qStemContent');
    if (work.highlightedStemHtml) {
      const sanitized = sanitizeHighlightedStemHtml(work.highlightedStemHtml);
      if (sanitized) {
        stemEl.innerHTML = sanitized;
      } else {
        const paragraphs = String(q.stem).split('\n').filter(Boolean);
        stemEl.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
      }
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
          ${isStruck ? '[RESTORE]' : '[STRIKE]'}
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

    // 7. Socratic Code-Path Examiner Panel
    renderSocraticTutorPanel(q, work);

    // 8. Official Legal Explanation Panel (Visible when checked)
    renderExplanationPanel(q, work);

    // 9. Prev/Next button states
    const btnPrev = document.getElementById('btnPrevQuestion');
    const btnNext = document.getElementById('btnNextQuestion');
    if (btnPrev) btnPrev.disabled = (posNum <= 1);
    if (btnNext) btnNext.disabled = (posNum >= pool.length);
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
      citeText.textContent = 'None attached yet — open governing regulation on the right & click “[LOCK IN / ATTACH CITATION AS PROOF]”';
      jumpBtn.classList.add('hidden');
      return;
    }

    bar.classList.add('has-proof');
    const lookupTag = typeof work.lookupSeconds === 'number' ? ` (Locked in ${work.lookupSeconds.toFixed(1)}s)` : '';
    citeText.textContent = `${work.attachedCitation}${lookupTag}`;
    jumpBtn.classList.remove('hidden');

    const matched = isCitationProofMatch(q, work.attachedSectionId);
    matchBadge.classList.remove('hidden');

    if (matched) {
      bar.classList.add('proof-matched');
      matchBadge.classList.add('match-ok');
      matchBadge.textContent = '[VERIFIED: EXACT GOVERNING CITATION]';
    } else {
      bar.classList.add('proof-mismatch');
      matchBadge.classList.add('match-warn');
      matchBadge.textContent = work.checked
        ? `[MISMATCH // EXPECTED: ${q.targetCitation}]`
        : '[ATTACHED // VERIFY ON CHECK]';
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
      showToast(`[RESTORED] Option ${letter}`);
    } else {
      work.struckOptions.push(letter);
      showToast(`[STRIKE] Eliminated distractor Option ${letter}`);
    }
    saveUserState();
    renderQuestionWorkspace();
  }

  function verifyCurrentQuestionAnswer() {
    const q = getCurrentQuestion();
    if (!q) return;
    const work = getQuestionWork(q.id);

    if (!work.selectedOption) {
      showToast('Please select an answer choice (A–E) before verifying your determination.');
      return;
    }

    const wasAlreadyChecked = work.checked;
    work.checked = true;

    if (typeof work.lookupSeconds !== 'number' || work.lookupSeconds <= 0) {
      work.lookupSeconds = Number(((Date.now() - questionLookupStartMs) / 1000).toFixed(1));
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
      titleEl.textContent = `[VERIFIED // CORRECT LEGAL DETERMINATION: OPTION ${q.correctOption}]`;
    } else {
      titleEl.textContent = `[INCORRECT // SELECTED OPTION ${work.selectedOption} — OFFICIAL RULING: OPTION ${q.correctOption}]`;
    }

    const timeStr = typeof work.lookupSeconds === 'number' ? `${work.lookupSeconds.toFixed(1)}s` : '--s';
    const proofStr = proofMatched ? '[CITATION PROOF VERIFIED]' : '[CITATION PROOF UNLOCKED]';
    metaEl.textContent = `Lookup Time: ${timeStr} (Target <= ${q.targetLookupSeconds}s) // ${proofStr}`;

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
          <strong>Option ${escapeHtml(letter)} ${isRightLetter ? '[CORRECT]' : '[DISTRACTOR]'}:</strong>
          ${escapeHtml(reasonText)}
        </div>
      `;
      distList.appendChild(item);
    });
  }

  /* ==========================================================================
     8. SOCRATIC CODE-PATH EXAMINER LOGIC
     ========================================================================== */
  function renderSocraticTutorPanel(q, work) {
    const refSpan = document.getElementById('socraticActiveQRef');
    if (refSpan) refSpan.textContent = `Question #${q.number} (${q.category})`;

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
      btnPath.textContent = '[JUMP TO SECTION IN CODE READER →]';
    } else {
      pathText.classList.add('hidden');
      btnPath.textContent = 'Reveal Optimal Lookup Path';
    }
  }

  function generateSocraticExaminerResponse(promptType, customQuery) {
    const q = getCurrentQuestion();
    if (!q) return;

    const responseBox = document.getElementById('socraticAiResponseBox');
    let replyHtml = '';

    if (promptType === 'trap') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>[RULE-GATE TRAP ANALYSIS // ${escapeHtml(q.category)}]:</strong><br/>
          On this question, most examinees lose points by failing to verify the exact statutory exception in <code>${escapeHtml(q.targetCitation)}</code>.
          <br/>• <strong>Core Clue:</strong> ${escapeHtml(q.socraticHints[2])}
          <br/>• <strong>Action:</strong> Use right-click <em>Strikethrough</em> to eliminate options that ignore this exception.
        </div>
      `;
    } else if (promptType === 'keywords') {
      const targetSec = resolveSectionByRef(q.targetSectionId) || resolveSectionByRef(q.targetCitation);
      const kwList = (targetSec && targetSec.keywords && targetSec.keywords.length > 0)
        ? targetSec.keywords.slice(0, 5).join('", "')
        : q.targetCitation;
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>[FASTEST eCFR SEARCH KEYWORDS // SUB-45S TARGET]:</strong><br/>
          Type any of these high-signal terms into the Instant eCFR Search bar on the right:
          <code>"${escapeHtml(kwList)}"</code>.<br/>
          • <strong>Shortest Tree Path:</strong> ${escapeHtml(q.shortestPathHint)}
        </div>
      `;
    } else if (promptType === 'valuation_gri') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>[REGULATORY HIERARCHY BREAKDOWN]:</strong><br/>
          ${escapeHtml(q.socraticHints[0])} ${escapeHtml(q.socraticHints[1])}<br/>
          • <strong>Verbatim Statutory Anchor:</strong> <em>${escapeHtml(q.goldenQuote)}</em>
        </div>
      `;
    } else if (promptType === 'deadline_penalty') {
      replyHtml = `
        <div class="socratic-ai-msg">
          <strong>[STATUTORY RULE &amp; COMPLIANCE STANDARD // ${escapeHtml(q.targetCitation)}]:</strong><br/>
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
            <strong>[SOCRATIC EXAMINER AUDIT // OPTION ${letter} ON Q#${q.number}]:</strong><br/>
            ${escapeHtml(optReason)}<br/>
            <em>Governing Citation: ${escapeHtml(q.targetCitation)}</em>
          </div>
        `;
      } else if (qLower.includes('gri') || qLower.includes('essential character') || qLower.includes('3(a)') || qLower.includes('3(b)')) {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>[HTSUS GRI 3(a) VS. GRI 3(b) DISTINCTION]:</strong><br/>
            Under <code>HTSUS GRI 3(a)</code>, the heading with the most specific description wins—<strong>EXCEPT</strong> when two or more headings each refer to only part of the materials in composite goods or part of the items in a <em>retail set</em>. In that case, GRI 3(a) deems them equally specific, forcing you to <code>GRI 3(b) (Essential Character)</code>. Only if essential character cannot be determined do you fall back to <code>GRI 3(c) (last in numerical order)</code>.
          </div>
        `;
      } else if (qLower.includes('assist') || qLower.includes('transaction value') || qLower.includes('152')) {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>[19 CFR § 152.102 &amp; § 152.103 TRANSACTION VALUE RULES]:</strong><br/>
            Transaction Value = Price Actually Paid or Payable + Packing + Selling Commissions + Apportioned Assists + Dutiable Royalties + Subsequent Proceeds.
            <br/><strong>Key Exam Exclusions:</strong> Buying commissions, international freight/insurance, and engineering/design work performed <em>inside the United States</em> are excluded!
          </div>
        `;
      } else {
        replyHtml = `
          <div class="socratic-ai-msg">
            <strong>[SOCRATIC EXAMINER RESPONSE // "${escapeHtml(customQuery)}"]:</strong><br/>
            For Question #${q.number}, focus on <code>${escapeHtml(q.targetCitation)}</code> (${escapeHtml(q.shortestPathHint)}).<br/>
            • <strong>Key Clue:</strong> ${escapeHtml(q.socraticHints[1])}<br/>
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
     9. RIGHT PANE: INTEGRATED ELECTRONIC REFERENCE LIBRARY (eCFR / HTSUS / 31 CFR)
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

  function renderReferenceLibrary() {
    const activeCorpus = getActiveCorpus();
    const activeSection = getActiveSection();
    const query = currentSearchQuery.trim();

    // 1. Render Corpus Switcher Tabs
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
      const badgeLabel = query ? `${hitCount} HITS` : `${secCount} SECS`;
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

    // 2. Compute Global Search Matches Across All Corpora & Update Search Badge
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
      matchBadge.textContent = `${totalMatches} MATCHES // ${matchingSections} SECS`;
      matchBadge.classList.add('has-matches');
    } else {
      clearBtn.classList.add('hidden');
      matchBadge.textContent = `${DATASET.allSections.length} SECTIONS INDEXED`;
      matchBadge.classList.remove('has-matches');
    }

    // 3. Render Collapsible Code Hierarchy Tree Sidebar
    const treeSidebar = document.getElementById('refTreeSidebar');
    const btnToggleTree = document.getElementById('btnToggleCodeTree');
    treeSidebar.classList.toggle('hidden', !!STATE.treeCollapsed);
    if (btnToggleTree) {
      btnToggleTree.textContent = STATE.treeCollapsed ? '[SHOW TREE]' : '[HIDE TREE]';
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
        <span>${isCollapsed ? '[+]' : '[-]'} ${isExternalCorpus ? `[${escapeHtml(corpusCode)}] ` : ''}${escapeHtml(part.title || part.code)}</span>
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
              <span class="ref-sec-freq">${matchCount > 0 ? `${matchCount} HITS` : escapeHtml(sec.examFrequency.split(' ')[0])}</span>
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

    // 4. Render Active Document Reader
    if (!activeSection) return;

    document.getElementById('refDocBreadcrumb').textContent = activeSection.breadcrumb;
    document.getElementById('refDocFreqBadge').textContent = `FREQ // ${activeSection.examFrequency}`;
    document.getElementById('refDocCitationCode').innerHTML = highlightTextWithSearchQuery(activeSection.citation, query);
    document.getElementById('refDocSectionTitle').innerHTML = highlightTextWithSearchQuery(activeSection.title, query);

    const currentQ = getCurrentQuestion();
    const lockBtn = document.getElementById('btnLockCitationProof');
    if (lockBtn && currentQ) {
      const work = getQuestionWork(currentQ.id);
      const isAlreadyLockedHere = (work.attachedSectionId === activeSection.id);
      if (isAlreadyLockedHere) {
        lockBtn.textContent = `[LOCKED AS PROOF FOR Q#${currentQ.number}: ${activeSection.citation}]`;
      } else if (STATE.activeMode === 'drill') {
        lockBtn.textContent = `[LOCK IN CITATION AS PROOF FOR Q#${currentQ.number} // STOP CLOCK]`;
      } else {
        lockBtn.textContent = `[ATTACH ${activeSection.citation} AS PROOF TO QUESTION #${currentQ.number}]`;
      }
    }

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
            showToast(`Jumped to cross-reference: ${resolved.citation}`);
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
     10. LOCK IN CITATION PROOF & COPY CITATION TO SCRATCHPAD
     ========================================================================== */
  function lockInActiveSectionAsProof() {
    const q = getCurrentQuestion();
    const sec = getActiveSection();
    if (!q || !sec) return;

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
        showToast(`[VERIFIED] Exact Governing Citation Locked in ${work.lookupSeconds.toFixed(1)}s! Now select Option A–E.`);
      } else {
        showToast(`[LOCKED] ${sec.citation} (${work.lookupSeconds.toFixed(1)}s). Note: check if a more specific section applies.`);
      }
    } else {
      showToast(`[PROOF ATTACHED] ${sec.citation} linked to Question #${q.number} (${work.lookupSeconds.toFixed(1)}s)`);
    }
  }

  function copyActiveCitationToScratchpad() {
    const sec = getActiveSection();
    const q = getCurrentQuestion();
    if (!sec) return;

    const firstSentence = String(sec.text || '').split('\n')[0];
    const formattedSnippet = `[${sec.citation} — ${sec.title} (Q#${q ? q.number : ''})]: "${firstSentence}"`;

    STATE.scratchpadText = (STATE.scratchpadText ? STATE.scratchpadText.trim() + '\n\n' : '') + formattedSnippet;
    STATE.savedCitations = Array.isArray(STATE.savedCitations) ? STATE.savedCitations : [];
    STATE.savedCitations.unshift({
      citation: sec.citation,
      title: sec.title,
      sectionId: sec.id,
      questionNumber: q ? q.number : 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    STATE.savedCitations = STATE.savedCitations.slice(0, 20);

    saveUserState();
    updateScratchpadBadge();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formattedSnippet).catch(() => {});
    }

    showToast(`[COPIED] ${sec.citation} copied to clipboard & saved to Candidate Scratchpad.`);
  }

  function updateScratchpadBadge() {
    const badge = document.getElementById('scratchpadCountBadge');
    if (badge) {
      const count = Array.isArray(STATE.savedCitations) ? STATE.savedCitations.length : 0;
      badge.textContent = String(count);
    }
  }

  /* ==========================================================================
     11. MODE 2: 90-SECOND CITATION-SPEED DRILL TIMER & TELEMETRY
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
    if (btnPause) btnPause.textContent = '[PAUSE]';

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
        showToast('[TIME EXPIRED] 90-Second Sprint Complete. Inspect the Socratic Shortest Navigation Path below.');
        currentWork.shortestPathRevealed = true;
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
      step1Status.textContent = `[LOCKED: ${secStr}]`;
    } else {
      step1Card.classList.remove('completed');
      step1Status.textContent = '[PENDING LOOKUP]';
    }

    if (work.checked) {
      step2Card.classList.add('completed');
      step2Status.textContent = work.selectedOption === q.correctOption ? `[PASS: ${q.correctOption}]` : `[REVIEWED: ${q.correctOption}]`;
    } else if (work.selectedOption) {
      step2Card.classList.add('completed');
      step2Status.textContent = `[SELECTED ${work.selectedOption}]`;
    } else {
      step2Card.classList.remove('completed');
      step2Status.textContent = '[SELECT A–E]';
    }
  }

  function updateDrillHudMetrics() {
    const q = getCurrentQuestion();
    if (!q) return;
    const work = getQuestionWork(q.id);

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
    if (avgEl) avgEl.textContent = `${getUserAverageLookupSeconds().toFixed(1)}s`;

    const attempts = STATE.drillStats.attempts || 0;
    const correct = STATE.drillStats.correctCount || 0;
    const accPct = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

    const accEl = document.getElementById('drillAccuracyMetric');
    const solvedSub = document.getElementById('drillSolvedCountSub');
    const streakEl = document.getElementById('drillStreakMetric');

    if (accEl) accEl.textContent = attempts > 0 ? `${accPct}%` : '75% est';
    if (solvedSub) solvedSub.textContent = `${attempts} graded`;
    if (streakEl) streakEl.textContent = `${STATE.drillStats.streak || 0} [STREAK]`;

    renderDrillChecklistState(q, work);
  }

  /* ==========================================================================
     12. YELLOW MARKER HIGHLIGHT TOOL (PEARSON VUE HIGHLIGHTER)
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
      showToast('[HIGHLIGHT] Marked selected text (click mark to remove)');
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
        showToast('[HIGHLIGHT] Marked selected text');
        return true;
      }
    }
    return false;
  }

  /* ==========================================================================
     13. MODE 3: READINESS ANALYTICS DASHBOARD & B2C/B2B LICENSING PAYWALL
     ========================================================================== */
  function renderAnalyticsDashboard() {
    const passProb = calculatePassProbability();
    const avgLookup = getUserAverageLookupSeconds();

    const probValEl = document.getElementById('anPassProbabilityValue');
    const probBarEl = document.getElementById('anPassProbabilityBar');
    if (probValEl) probValEl.textContent = `${passProb}%`;
    if (probBarEl) probBarEl.style.width = `${passProb}%`;

    let answeredCount = 0;
    let gradedCount = 0;
    let correctCount = 0;
    let verifiedProofCount = 0;

    DATASET.questions.forEach(q => {
      const w = STATE.questionWork[q.id];
      if (!w) return;
      if (w.selectedOption) answeredCount++;
      if (w.checked) {
        gradedCount++;
        if (w.selectedOption === q.correctOption) correctCount++;
      }
      if (w.attachedSectionId && isCitationProofMatch(q, w.attachedSectionId)) {
        verifiedProofCount++;
      }
    });

    document.getElementById('anKpiAvgLookup').textContent = `${avgLookup.toFixed(1)}s`;
    document.getElementById('anKpiAnsweredCount').textContent = `${answeredCount} / ${DATASET.questions.length}`;
    const accStr = gradedCount > 0 ? `${Math.round((correctCount / gradedCount) * 100)}% (${correctCount}/${gradedCount})` : '75% Baseline';
    document.getElementById('anKpiAccuracySub').innerHTML = `Graded Accuracy: <strong>${escapeHtml(accStr)}</strong>`;
    document.getElementById('anKpiVerifiedCitations').textContent = String(verifiedProofCount);

    const secSavedPerQ = Math.max(15, 145 - avgLookup);
    const totalMinSaved = Math.round((secSavedPerQ * 80) / 60);
    const hrs = Math.floor(totalMinSaved / 60);
    const mins = totalMinSaved % 60;
    document.getElementById('anKpiTimeSaved').textContent = `+${hrs}h ${mins}m`;

    const domainSpecs = [
      { key: '111', label: '19 CFR Part 111 — Customs Brokers & Ethics', baseLookup: 31.5, baseAcc: 84, color: '#1A5638' },
      { key: '141|142', label: '19 CFR Parts 141 / 142 — Entry & Release Deadlines', baseLookup: 29.0, baseAcc: 82, color: '#1A5638' },
      { key: '152|Valuation', label: '19 CFR Part 152 — Customs Valuation & Assists', baseLookup: 43.2, baseAcc: 76, color: '#1B365D' },
      { key: '177|190|Drawback', label: '19 CFR Parts 177 / 190 — Rulings & Modernized Drawback', baseLookup: 46.8, baseAcc: 71, color: '#9C5A08' },
      { key: 'HTSUS|GRI', label: 'HTSUS & GRI 1–6 — Classification & Essential Character', baseLookup: 41.0, baseAcc: 78, color: '#1B365D' },
      { key: '31 CFR|Part 10|Circular 230', label: '31 CFR Part 10 — IRS Circular 230 (Enrolled Agent Track)', baseLookup: 34.2, baseAcc: 86, color: '#1A5638' }
    ];

    const heatmapContainer = document.getElementById('anDomainHeatmapList');
    heatmapContainer.innerHTML = '';

    domainSpecs.forEach(dom => {
      const regex = new RegExp(dom.key, 'i');
      const matchingQs = DATASET.questions.filter(q => regex.test(`${q.category} ${q.targetCitation}`));
      let domLookups = [];
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

      const avgDomLookup = domLookups.length > 0
        ? (domLookups.reduce((a, b) => a + b, 0) / domLookups.length).toFixed(1)
        : dom.baseLookup.toFixed(1);

      const domAcc = domGraded > 0
        ? Math.round((domCorrect / domGraded) * 100)
        : dom.baseAcc;

      const statusBadge = domAcc >= 75 && avgDomLookup <= 45
        ? '[STATUS: EXAM READY]'
        : '[STATUS: DRILL RECOMMENDED]';

      const row = document.createElement('div');
      row.className = 'heatmap-row';
      row.innerHTML = `
        <div class="heatmap-row-top">
          <span class="heatmap-domain-name">${escapeHtml(dom.label)}</span>
          <div class="heatmap-metrics-right">
            <span>LOOKUP: <strong>${avgDomLookup}s</strong></span>
            <span>//</span>
            <span>MASTERY: <strong>${domAcc}%</strong></span>
            <span>//</span>
            <span>${statusBadge}</span>
          </div>
        </div>
        <div class="heatmap-bar-bg">
          <div class="heatmap-bar-fill" style="width: ${domAcc}%; background: ${dom.color};"></div>
        </div>
      `;
      heatmapContainer.appendChild(row);
    });

    const solvedContainer = document.getElementById('anSolvedQuestionsLog');
    solvedContainer.innerHTML = '';

    DATASET.questions.forEach(q => {
      const w = STATE.questionWork[q.id];
      const hasActivity = w && (w.selectedOption || w.attachedCitation || w.flagged);
      const item = document.createElement('div');
      item.className = 'an-log-item';

      const statusText = !hasActivity
        ? 'Not Attempted Yet — Click to Practice'
        : w.checked
          ? (w.selectedOption === q.correctOption ? `[PASS: ${w.selectedOption}]` : `[FAIL: Chose ${w.selectedOption}, Official: ${q.correctOption}]`)
          : `[IN PROGRESS // Selected: ${w.selectedOption || 'None'}]`;

      const timeBadge = (w && typeof w.lookupSeconds === 'number') ? `${w.lookupSeconds.toFixed(1)}s` : `${q.targetLookupSeconds}s target`;

      item.innerHTML = `
        <div>
          <strong>Q#${q.number}: ${escapeHtml(q.category)}</strong>
          <div style="font-size:11px;color:#78756D;">${escapeHtml(statusText)} // Proof: ${escapeHtml((w && w.attachedCitation) || q.targetCitation)}</div>
        </div>
        <span style="font-family:var(--font-mono);font-size:11.5px;font-weight:600;color:#141413;">${escapeHtml(timeBadge)} →</span>
      `;
      item.addEventListener('click', () => {
        STATE.currentQuestionId = q.id;
        switchMode('cbt');
      });
      solvedContainer.appendChild(item);
    });

    const savedCiteContainer = document.getElementById('anSavedCitationsLog');
    savedCiteContainer.innerHTML = '';

    const citationsList = (Array.isArray(STATE.savedCitations) && STATE.savedCitations.length > 0)
      ? STATE.savedCitations
      : [
          { citation: '19 CFR § 152.102', title: 'Definitions — Assist (Foreign vs. U.S. Engineering)', sectionId: '19-cfr-152-102', questionNumber: 1 },
          { citation: '19 CFR § 111.32', title: 'False information & mandatory CBP fraud separation report', sectionId: '19-cfr-111-32', questionNumber: 2 },
          { citation: 'HTSUS GRI 3(b)', title: 'Essential Character & Goods Put Up in Sets for Retail Sale', sectionId: 'htsus-gri-3', questionNumber: 3 }
        ];

    citationsList.forEach(entry => {
      const row = document.createElement('div');
      row.className = 'an-log-item';
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(entry.citation)}</strong> — ${escapeHtml(entry.title)}
          <div style="font-size:11px;color:#78756D;">Linked to Question #${entry.questionNumber || 1}</div>
        </div>
        <span style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:#C8431F;">Inspect in eCFR →</span>
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

  /* ==========================================================================
     14. MODALS: QUESTION NAVIGATOR, CALCULATOR/SCRATCHPAD, SCORE REPORT, CHECKOUT
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
      const w = getQuestionWork(q.id);
      if (w.selectedOption) answered++; else unanswered++;
      if (w.flagged) flagged++;
      if (w.attachedSectionId) verified++;

      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = `nav-q-tile ${q.id === STATE.currentQuestionId ? 'current' : ''} ${w.selectedOption ? 'answered' : ''}`;
      tile.innerHTML = `
        <div class="nav-q-tile-top">
          <span>QUESTION ${String(idx + 1).padStart(2, '0')}</span>
          <span>${w.flagged ? '[FLAG]' : ''} ${w.attachedSectionId ? '[PROOF]' : ''}</span>
        </div>
        <div style="font-size:11px;color:#4A4842;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
          ${escapeHtml(q.category)}
        </div>
        <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:${w.selectedOption ? '#141413' : '#78756D'};">
          ${w.selectedOption ? `Selected: ${w.selectedOption}` : 'Unanswered'}
          ${w.checked ? (w.selectedOption === q.correctOption ? ' [OK]' : ' [ERR]') : ''}
        </div>
      `;
      tile.addEventListener('click', () => {
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

  function openScratchpadModal() {
    const backdrop = document.getElementById('scratchpadModalBackdrop');
    const textarea = document.getElementById('candidateScratchpadTextarea');
    if (!backdrop || !textarea) return;

    textarea.value = STATE.scratchpadText || '';
    updateCustomsValuationCalculator();
    backdrop.classList.remove('hidden');
  }

  function openOfficialScoreReportModal() {
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

    const scorePct = pool.length > 0 ? Math.round((correct / pool.length) * 100) : 0;
    const passed = scorePct >= (DATASET.meta.passingScorePercent || 75);
    const avgLookup = getUserAverageLookupSeconds();

    body.innerHTML = `
      <div style="padding:16px;border-radius:0px;margin-bottom:16px;background:${passed ? '#EDF5F0' : '#FDF2EE'};border:1.5px solid ${passed ? '#1A5638' : '#C8431F'};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:${passed ? '#1A5638' : '#C8431F'};">
            OFFICIAL PEARSON VUE / CBP DETERMINATION (75% THRESHOLD)
          </div>
          <h3 style="font-family:var(--font-display);font-size:26px;font-weight:400;color:#141413;margin-top:4px;">
            ${passed ? '[STATUS: PASS] — Qualified for Broker License Application' : '[STATUS: BELOW 75% THRESHOLD] — Citation-Speed Drill Required'}
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
          <div style="font-family:var(--font-mono);font-size:20px;font-weight:600;color:#141413;">${avgLookup.toFixed(1)}s</div>
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#1A5638;">Target Benchmark: <= 45.0s</div>
        </div>
        <div style="background:#F6F4EF;border:1px solid #C9C4B8;padding:12px;border-radius:0px;">
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#78756D;font-weight:600;">VERIFIED CITATION PROOFS</div>
          <div style="font-family:var(--font-mono);font-size:20px;font-weight:600;color:#141413;">${verifiedProofs} / ${pool.length}</div>
          <div style="font-family:var(--font-mono);font-size:10.5px;color:#4A4842;">Exact eCFR / HTSUS Section Locked</div>
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
          const w = getQuestionWork(q.id);
          const isRight = w.selectedOption === q.correctOption;
          return `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#F6F4EF;border:1px solid #C9C4B8;border-left:4px solid ${isRight ? '#1A5638' : '#C8431F'};border-radius:0px;font-size:12px;">
              <div>
                <strong>Q#${idx + 1} (${escapeHtml(q.category)})</strong> — Governing Authority: <code>${escapeHtml(q.targetCitation)}</code>
              </div>
              <div style="font-family:var(--font-mono);font-weight:600;">
                Your Ans: ${w.selectedOption || 'None'} // Correct: ${q.correctOption} ${isRight ? '[PASS]' : '[FAIL]'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    backdrop.classList.remove('hidden');
  }

  /* ==========================================================================
     15. EVENT LISTENERS & INITIALIZATION
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

    const trackSelect = document.getElementById('examTrackSelect');
    if (trackSelect) {
      trackSelect.addEventListener('change', () => {
        STATE.selectedTrack = trackSelect.value;
        const pool = getFilteredQuestions();
        if (pool[0]) STATE.currentQuestionId = pool[0].id;

        if (STATE.selectedTrack === 'EA') {
          const eaCorpus = DATASET.corpora.find(c => /31\s*cfr|circular\s*230/i.test(`${c.id} ${c.code} ${c.title}`));
          if (eaCorpus) {
            STATE.activeCorpusId = eaCorpus.id;
            if (eaCorpus.parts[0] && eaCorpus.parts[0].sections[0]) {
              STATE.activeSectionId = eaCorpus.parts[0].sections[0].id;
            }
          }
        } else {
          const cbleCorpus = DATASET.corpora[0];
          if (cbleCorpus) {
            STATE.activeCorpusId = cbleCorpus.id;
            if (cbleCorpus.parts[0] && cbleCorpus.parts[0].sections[0]) {
              STATE.activeSectionId = cbleCorpus.parts[0].sections[0].id;
            }
          }
        }

        resetPerQuestionLookupStopwatch();
        saveUserState();
        renderQuestionWorkspace();
        renderReferenceLibrary();
        renderGlobalBarTelemetry();
        if (STATE.activeMode === 'drill') {
          startDrillSprintForCurrentQuestion(false);
        }
        showToast(`Switched Exam Track to: ${trackSelect.options[trackSelect.selectedIndex].text}`);
      });
    }

    const btnResetDemo = document.getElementById('btnResetDemoData');
    if (btnResetDemo) {
      btnResetDemo.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        STATE = getDefaultUserState();
        currentSearchQuery = '';
        const searchInput = document.getElementById('ecfrSearchInput');
        if (searchInput) searchInput.value = '';
        resetPerQuestionLookupStopwatch();
        saveUserState();
        switchMode('cbt');
        updateScratchpadBadge();
        showToast('[RESET] Demo data, timers, and saved citations restored to fresh state.');
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
        showToast('[CLOCK RESET] Exam timer restored to 04:30:00');
      });
    }

    document.getElementById('btnFlagForReview').addEventListener('click', () => {
      const q = getCurrentQuestion();
      if (!q) return;
      const work = getQuestionWork(q.id);
      work.flagged = !work.flagged;
      saveUserState();
      renderQuestionWorkspace();
      showToast(work.flagged ? `[FLAGGED] Question #${q.number} marked for review` : `[UNFLAGGED] Question #${q.number}`);
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
            ? '[HIGHLIGHT MODE ACTIVE]: Select any text in Question or Code to mark'
            : 'Select text + click Highlight (or enable Highlight Mode)';
        }
        showToast(STATE.highlightCursorMode
          ? '[HIGHLIGHT MODE ON] Select any text with your mouse to mark it'
          : '[HIGHLIGHT MODE OFF]');
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
        ? '[STRIKE MODE ON] Click any option A–E (or Right-Click anytime) to cross out distractors'
        : '[STRIKE MODE OFF] Right-Click any option A–E or click [STRIKE] anytime');
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

    document.getElementById('btnNextQuestion').addEventListener('click', () => {
      const pool = getFilteredQuestions();
      const idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
      if (idx >= 0 && idx < pool.length - 1) {
        STATE.currentQuestionId = pool[idx + 1].id;
        resetPerQuestionLookupStopwatch();
        saveUserState();
        renderQuestionWorkspace();
        if (STATE.activeMode === 'drill') startDrillSprintForCurrentQuestion(false);
      }
    });

    document.getElementById('btnSwitchToDrillFromCbt').addEventListener('click', () => {
      switchMode('drill');
      showToast('[MODE-02] Launched 90-Second Citation-Speed Drill Sprint');
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
      showToast('[RESTARTED] 90-Second Citation-Speed Sprint');
    });

    document.getElementById('btnDrillPauseSprint').addEventListener('click', (e) => {
      drillPaused = !drillPaused;
      e.currentTarget.textContent = drillPaused ? '[RESUME]' : '[PAUSE]';
    });

    document.getElementById('btnDrillNextQuestion').addEventListener('click', () => {
      const pool = getFilteredQuestions();
      const idx = pool.findIndex(q => q.id === STATE.currentQuestionId);
      const nextIdx = (idx + 1) % pool.length;
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
          renderSocraticTutorPanel(q, work);
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
        renderSocraticTutorPanel(q, work);
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
      const note = `\n[19 CFR § 152.103 Valuation Calc]: Appraised Transaction Value = ${res.transactionVal} | Duty (${res.ratePct}%) = ${res.baseDuty} | MPF+HMF = ${res.mpfHmf} | Total CBP Deposit = ${res.totalDeposit}`;
      const textarea = document.getElementById('candidateScratchpadTextarea');
      textarea.value = (textarea.value.trim() + '\n' + note).trim();
      STATE.scratchpadText = textarea.value;
      saveUserState();
      showToast('[INSERTED] Transaction Value calculation appended to Scratchpad');
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
      showToast('Cleared Scratchpad notes');
    });

    const closeScore = () => document.getElementById('scoreReportModalBackdrop').classList.add('hidden');
    document.getElementById('btnCloseScoreReportModal').addEventListener('click', closeScore);
    document.getElementById('btnScoreReviewQuestions').addEventListener('click', closeScore);
    document.getElementById('btnScoreOpenAnalytics').addEventListener('click', () => {
      closeScore();
      switchMode('analytics');
    });

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
        b2cPeriod.textContent = '/ month // cancel anytime';
        btnCheckoutB2C.textContent = 'Unlock Candidate Pro — $79/mo →';
        btnCheckoutB2C.setAttribute('data-plan', 'Candidate Pro ($79/month)');
      });
      btnPass.addEventListener('click', () => {
        btnPass.classList.add('active');
        btnMonthly.classList.remove('active');
        b2cAmount.textContent = '$199';
        b2cPeriod.textContent = '/ 6-month CBP exam cycle pass';
        btnCheckoutB2C.textContent = 'Unlock Exam Cycle Pass — $199 →';
        btnCheckoutB2C.setAttribute('data-plan', 'Candidate Pro — Exam Cycle Pass ($199 One-Time)');
      });
    }

    const openCheckout = (planTitle) => {
      document.getElementById('checkoutSelectedPlanName').textContent = planTitle;
      document.getElementById('stripeCheckoutForm').classList.remove('hidden');
      document.getElementById('checkoutSuccessBox').classList.add('hidden');
      document.getElementById('checkoutModalBackdrop').classList.remove('hidden');
    };

    if (btnCheckoutB2C) {
      btnCheckoutB2C.addEventListener('click', () => {
        openCheckout(btnCheckoutB2C.getAttribute('data-plan') || 'Candidate Pro ($79/month)');
      });
    }
    const btnCheckoutB2B = document.getElementById('btnCheckoutB2B');
    if (btnCheckoutB2B) {
      btnCheckoutB2B.addEventListener('click', () => {
        openCheckout(btnCheckoutB2B.getAttribute('data-plan') || 'Freight Forwarder & Brokerage Team ($499/month — 10 Seats)');
      });
    }

    document.getElementById('btnCloseCheckoutModal').addEventListener('click', () => {
      document.getElementById('checkoutModalBackdrop').classList.add('hidden');
    });

    document.getElementById('stripeCheckoutForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('checkoutEmailInput').value;
      const plan = document.getElementById('checkoutSelectedPlanName').textContent;
      document.getElementById('stripeCheckoutForm').classList.add('hidden');
      const successBox = document.getElementById('checkoutSuccessBox');
      document.getElementById('checkoutSuccessMessage').textContent =
        `Provisioned "${plan}" for ${email}. Full 1:1 Pearson VUE Split-Screen eCFR/HTSUS bank and unlimited 90-second Citation-Speed drills are now active.`;
      successBox.classList.remove('hidden');
      showToast(`[LICENSE ACTIVE] Provisioned ${plan}`);
    });
  }

  /* ==========================================================================
     16. GLOBAL TIMERS & APPLICATION BOOTSTRAP
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
      verBadge.textContent = `SPEC // CBT-${String(DATASET.meta.version).replace(/^v/i, '')}`;
    }

    initEventListeners();
    updateScratchpadBadge();
    resetPerQuestionLookupStopwatch();
    startGlobalClocks();
    switchMode(STATE.activeMode || 'cbt');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
