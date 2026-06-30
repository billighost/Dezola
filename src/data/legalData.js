// src/data/legalData.js
// Structured legal content — shared source for on-screen rendering (LegalPage.jsx)
// and PDF export (utils/generateLegalPDF.js). Keep paragraph arrays plain strings
// (no JSX) so the same content can be measured/wrapped by jsPDF.

export const TERMS_CONTENT = {
  slug: 'terms',
  label: 'Terms & Conditions',
  kicker: '[ Legal ]',
  title: 'Terms &',
  titleEm: 'Conditions',
  subtitle: 'The agreement that governs every project, proposal, and engagement between Dezola Studio and our clients.',
  effectiveDate: '1 July 2026',
  meta: 'Client Service Agreement — Oyo, Nigeria',
  sections: [
    {
      id: 'introduction',
      num: '01',
      title: 'Introduction & Acceptance',
      paragraphs: [
        'These Terms & Conditions ("Terms") govern every project, proposal, and engagement between Dezola Studio ("Dezola," "we," "us") and the client commissioning work ("Client," "you"), based in Oyo, Nigeria. By approving a written proposal, paying a deposit, or instructing Dezola to begin work, the Client confirms they have read, understood, and agreed to these Terms in full.',
        'Where a signed proposal or scope-of-work document conflicts with these Terms, the signed proposal takes precedence only for the specific point in conflict — all other clauses here still apply.'
      ]
    },
    {
      id: 'scope',
      num: '02',
      title: 'Scope of Services',
      paragraphs: [
        'Dezola provides branding & identity, web & UI/UX design and development, motion & animation, digital marketing, and SEO & analytics services. The exact deliverables, page count, features, and package inclusions for a project are defined in the written proposal or quote issued before work begins.',
        'Any request outside that written scope is treated as additional work and will be quoted and agreed separately before Dezola begins it.'
      ]
    },
    {
      id: 'payment',
      num: '03',
      title: 'Payment Terms',
      subsections: [
        {
          heading: '3.1 Deposit & Balance',
          paragraphs: [
            'A 50% deposit of the agreed project fee is required before any design or development work begins. The remaining 50% balance is due in full before final handover — meaning before source files, hosting credentials, or the live site are transferred to the Client. Dezola reserves the right to pause work at any stage if payment milestones are not met.'
          ]
        },
        {
          heading: '3.2 Payment Method',
          paragraphs: [
            'Payment is accepted via bank transfer only. A receipt is issued for every payment made. Dezola does not begin or resume work on the basis of a verbal or unconfirmed promise of payment.'
          ]
        },
        {
          heading: '3.3 Late Payment',
          paragraphs: [
            'If the final balance is not paid within 14 days of the project being marked ready for handover, Dezola reserves the right to: (a) suspend access to any staging link or preview of the work, (b) charge a late payment fee of 5% of the outstanding balance for every 30 days the payment remains overdue, and/or (c) withhold final source files and login credentials until payment is received in full. The Client remains responsible for the full balance regardless of these measures.'
          ]
        },
        {
          heading: '3.4 Scope Changes',
          paragraphs: [
            'Any change to the agreed scope after work has begun — additional pages, new features, or a materially different direction — will be quoted in writing and is payable separately from the original project fee.'
          ]
        }
      ]
    },
    {
      id: 'process',
      num: '04',
      title: 'Design & Development Process',
      subsections: [
        {
          heading: '4.1 Revision Rounds',
          paragraphs: [
            'Each package includes a defined number of design revision rounds, as stated in the proposal. A "revision" means refining or adjusting work that is already aligned with the agreed creative direction — colors, copy edits, layout tweaks, image swaps, and similar feedback. Revision rounds beyond what is included in the package are billed at ₦15,000 – ₦25,000 per additional round, depending on complexity, and must be paid before the additional round is started.'
          ]
        },
        {
          heading: '4.2 Direction Changes ("Restarts")',
          paragraphs: [
            'A direction change is different from a revision: it means asking Dezola to abandon the agreed creative direction and begin again from a substantially different concept. The Client may request up to three (3) direction changes at any point during a single project, at no additional cost beyond the original project fee. From the fourth direction change onward, each further restart is treated as a new project phase and will be quoted and invoiced as additional work before Dezola begins it.'
          ]
        },
        {
          heading: '4.3 Client Responsibilities',
          paragraphs: [
            'Provide all required content — text, images, logos, and brand assets — in a timely manner. Delays in content delivery may delay the project timeline accordingly, through no fault of Dezola.',
            'Respond to requests for feedback or approval within 5 business days where possible, to keep the project on schedule.',
            'Designate a single point of contact authorized to approve work and request changes on the Client\u2019s behalf.'
          ]
        }
      ]
    },
    {
      id: 'acceptance',
      num: '05',
      title: 'Project Acceptance & Sign-Off',
      paragraphs: [
        'When the Client formally approves the final delivered website or design ("Acceptance"), whether in writing, by email, or by making the final payment, the project is considered complete and accepted as delivered. Acceptance confirms the Client is satisfied the deliverable matches the agreed scope.'
      ]
    },
    {
      id: 'support',
      num: '06',
      title: 'Post-Launch Support & Edits',
      subsections: [
        {
          heading: '6.1 Free Support Window',
          paragraphs: [
            'Following Acceptance, Dezola provides 30 days of free post-launch support. During this window, the Client may request reasonable edits to the delivered site — such as text updates, minor styling adjustments, image swaps, or fixing small layout issues — at no additional charge, provided the request stays within the original scope and does not introduce new pages, features, or sections.'
          ]
        },
        {
          heading: '6.2 Paid Edits After 30 Days',
          paragraphs: [
            'Once the 30-day window has passed, any further edit request is billed at ₦15,000 – ₦25,000 per edit request, depending on complexity, payable before the edit is made. An "edit request" covers one bundled set of related changes submitted together. Clients who anticipate needing ongoing changes are encouraged to ask about a Maintenance Retainer, which covers recurring updates at a fixed monthly rate.'
          ]
        },
        {
          heading: '6.3 Bug Fixes Are Always Free',
          paragraphs: [
            'A bug — something Dezola built that is broken, malfunctioning, or not working as specified in the agreed scope — is corrected free of charge at any time after launch, with no time limit, as part of Dezola\u2019s standard quality warranty. Bug fixes are not billed as edits. If there is any uncertainty about whether a request is a bug or a billable edit, Dezola will assess it in good faith and explain its reasoning to the Client before proceeding.'
          ]
        }
      ]
    },
    {
      id: 'ownership',
      num: '07',
      title: 'Ownership & Intellectual Property',
      subsections: [
        {
          heading: '7.1 Transfer of Ownership',
          paragraphs: [
            'Upon receipt of full and final payment, ownership of the final delivered files (website code, design files, and brand assets created specifically for the Client) transfers to the Client. Dezola retains no claim over the finished, paid-for deliverable beyond what is described below.'
          ]
        },
        {
          heading: '7.2 Portfolio & Promotional Use',
          paragraphs: [
            'Dezola retains the right to display completed projects — including screenshots, designs, and a description of the work — in its portfolio, website, social media, and marketing materials, even after ownership has transferred to the Client. Clients who do not want their project featured may request this in writing prior to or at project completion, and Dezola will exclude that project from public portfolio use accordingly.'
          ]
        },
        {
          heading: '7.3 Third-Party Assets',
          paragraphs: [
            'Where a project uses licensed stock photography, fonts, plugins, or other third-party assets, those assets remain subject to their original license terms and are not owned outright by either party. The Client is responsible for renewing any such licenses after handover if required.'
          ]
        }
      ]
    },
    {
      id: 'third-party-costs',
      num: '08',
      title: 'Third-Party Costs',
      paragraphs: [
        'Unless explicitly included in the proposal, the following are the Client\u2019s responsibility and are not covered by the project fee: domain name registration and renewal, web hosting fees, third-party software or plugin license fees, payment gateway charges, and paid advertising spend. Dezola can advise on or manage these on the Client\u2019s behalf where agreed in writing, but the underlying costs are passed through to the Client.'
      ]
    },
    {
      id: 'cancellation',
      num: '09',
      title: 'Cancellation & Refunds',
      paragraphs: [
        'Either party may cancel a project in writing before completion. If the Client cancels after work has begun, refund of the deposit is assessed case by case, taking into account the stage of work completed, time already invested, and any third-party costs already incurred on the Client\u2019s behalf. Any refund issued will reflect the portion of work not yet delivered; the deposit is not automatically refundable in full once design or development work has started.'
      ]
    },
    {
      id: 'confidentiality',
      num: '10',
      title: 'Confidentiality',
      paragraphs: [
        'Both parties agree to keep confidential any non-public business information shared during the course of the project — including but not limited to business plans, pricing, and unreleased branding — and not to disclose it to third parties without written consent, except as required by law.'
      ]
    },
    {
      id: 'liability',
      num: '11',
      title: 'Limitation of Liability',
      paragraphs: [
        'Dezola will perform all services with reasonable skill and care. However, Dezola is not liable for any indirect, incidental, or consequential loss — including loss of revenue, data, or business opportunity — arising from the use of the delivered website or materials. Dezola\u2019s total liability for any claim arising from a project is limited to the total fees paid by the Client for that specific project.',
        'Dezola is not responsible for downtime, data loss, or security issues caused by third-party hosting providers, plugins, or the Client\u2019s own actions after handover.'
      ]
    },
    {
      id: 'force-majeure',
      num: '12',
      title: 'Force Majeure',
      paragraphs: [
        'Neither party is liable for delays or failure to perform obligations caused by circumstances beyond reasonable control, including power or internet outages, natural disasters, civil unrest, or government action. Affected timelines will be extended by a reasonable period to reflect the delay.'
      ]
    },
    {
      id: 'governing-law',
      num: '13',
      title: 'Governing Law & Dispute Resolution',
      paragraphs: [
        'These Terms are governed by the laws of the Federal Republic of Nigeria. Both parties agree to first attempt to resolve any dispute informally and in good faith. If a resolution cannot be reached within 30 days, the dispute may be referred to mediation or the appropriate courts within Nigeria.'
      ]
    },
    {
      id: 'amendments',
      num: '14',
      title: 'Amendments',
      paragraphs: [
        'Dezola may update these Terms from time to time. The version in effect at the time a proposal is signed or a deposit is paid is the version that applies to that project. The current version is always available at dezolastudio.name.ng.'
      ]
    },
    {
      id: 'contact',
      num: '15',
      title: 'Contact',
      paragraphs: [
        'Questions about these Terms can be directed to Dezola Studio at bb2010ng@gmail.com or +234 904 842 8304. We\u2019re based in Oyo, Nigeria and respond to enquiries within 24 hours.'
      ]
    }
  ],
  footnote: 'This document is a standard service agreement template for general client work and does not constitute formal legal advice. For high-value or unusually structured engagements, both parties are encouraged to have this agreement reviewed by independent legal counsel before signing.'
}

export const PRIVACY_CONTENT = {
  slug: 'privacy',
  label: 'Privacy Policy',
  kicker: '[ Legal ]',
  title: 'Privacy',
  titleEm: 'Policy',
  subtitle: 'How Dezola Studio collects, uses, and protects the information shared with us by clients and website visitors.',
  effectiveDate: '1 July 2026',
  meta: 'Data & Privacy Notice — Oyo, Nigeria',
  sections: [
    {
      id: 'introduction',
      num: '01',
      title: 'Introduction',
      paragraphs: [
        'Dezola Studio ("Dezola," "we," "us") respects the privacy of everyone who visits our website or engages us for creative, web, or marketing services. This Privacy Policy explains what information we collect, why we collect it, how it is used, and the choices available to you.',
        'This policy applies to visitors of dezolastudio.name.ng and to clients who engage Dezola for project work. By using our website or instructing us to begin work, you agree to the practices described here, consistent with the Nigeria Data Protection Act (NDPA) 2023 and its implementing regulations.'
      ]
    },
    {
      id: 'information-we-collect',
      num: '02',
      title: 'Information We Collect',
      subsections: [
        {
          heading: '2.1 Information You Provide Directly',
          paragraphs: [
            'When you fill in our contact form, request a quote, or commission a project, we collect details such as your full name, email address, phone number, company or business name, project budget range, service of interest, and any project details, files, or assets you share with us.'
          ]
        },
        {
          heading: '2.2 Information Collected Automatically',
          paragraphs: [
            'When you browse our website, we may automatically collect technical information such as your IP address, browser type, device type, pages visited, and time spent on the site, through standard analytics tools, to help us understand how our site is used and improve it.'
          ]
        },
        {
          heading: '2.3 Project & Brand Information',
          paragraphs: [
            'In the course of delivering branding, web, or marketing work, we may receive sensitive business information such as business plans, pricing strategy, and unreleased brand assets. This information is treated as confidential under the Confidentiality clause of our Terms & Conditions.'
          ]
        }
      ]
    },
    {
      id: 'how-we-use',
      num: '03',
      title: 'How We Use Your Information',
      paragraphs: [
        'We use the information we collect to: respond to enquiries and prepare proposals or quotes; deliver, manage, and communicate about a commissioned project; issue invoices and process payments; provide post-launch support as outlined in our Terms & Conditions; send project updates or, with your consent, occasional studio news; and improve our website, services, and client experience.',
        'We do not use Client project information for any purpose beyond delivering the agreed engagement, except where the Client has separately agreed to be featured in our portfolio or marketing materials.'
      ]
    },
    {
      id: 'legal-basis',
      num: '04',
      title: 'Legal Basis for Processing',
      paragraphs: [
        'We process personal data on one or more of the following bases: performance of a contract (delivering a project you have commissioned), consent (such as opting in to receive studio updates), and legitimate interest (such as maintaining the security and performance of our website). Where we rely on consent, you may withdraw it at any time by contacting us.'
      ]
    },
    {
      id: 'sharing',
      num: '05',
      title: 'How Information Is Shared',
      paragraphs: [
        'Dezola does not sell, rent, or trade personal information to third parties. We may share information only in the following limited circumstances: with trusted service providers who support our operations (such as hosting providers, payment processors, or email tools) and who are bound to protect your information; where required by law, regulation, or a valid legal process; or with your explicit consent, such as when a testimonial or project is approved for public display.'
      ]
    },
    {
      id: 'portfolio-display',
      num: '06',
      title: 'Portfolio & Testimonial Display',
      paragraphs: [
        'As described in our Terms & Conditions, Dezola may display completed projects — including screenshots, designs, and a general description of the work — in our portfolio, website, and marketing materials. Client or company names are only published with permission. Clients who prefer their project not be featured may request exclusion in writing at any point before or at project completion.'
      ]
    },
    {
      id: 'cookies',
      num: '07',
      title: 'Cookies & Tracking',
      paragraphs: [
        'Our website may use cookies and similar technologies to remember preferences and understand site usage through analytics. You can disable cookies through your browser settings; doing so may affect some site functionality, but will not prevent you from contacting us or viewing our work.'
      ]
    },
    {
      id: 'data-retention',
      num: '08',
      title: 'Data Retention',
      paragraphs: [
        'We retain client and project information for as long as necessary to deliver the engagement, fulfil our legal and accounting obligations, and maintain a record of past work. Contact form submissions that do not result in a project are retained only as long as needed to respond, and are deleted or anonymised thereafter unless you have asked to remain on our mailing list.'
      ]
    },
    {
      id: 'data-security',
      num: '09',
      title: 'Data Security',
      paragraphs: [
        'We take reasonable technical and organisational measures to protect personal and business information shared with us, including restricted access to project files and secure handling of payment records. However, no method of electronic storage or transmission is completely secure, and we cannot guarantee absolute security.'
      ]
    },
    {
      id: 'your-rights',
      num: '10',
      title: 'Your Rights',
      paragraphs: [
        'Subject to applicable Nigerian data protection law, you have the right to: request access to the personal information we hold about you; request correction of inaccurate information; request deletion of your information, where we are not required to retain it for legal or contractual reasons; withdraw consent to marketing communications at any time; and lodge a complaint with the Nigeria Data Protection Commission (NDPC) if you believe your information has been mishandled.',
        'To exercise any of these rights, contact us using the details below. We aim to respond within 24 hours.'
      ]
    },
    {
      id: 'childrens-privacy',
      num: '11',
      title: "Children's Privacy",
      paragraphs: [
        'Our services are intended for businesses and individuals capable of entering into a commercial agreement. We do not knowingly collect personal information from children, and our website is not directed at children.'
      ]
    },
    {
      id: 'third-party-links',
      num: '12',
      title: 'Third-Party Links',
      paragraphs: [
        'Our website may contain links to third-party sites — including social platforms, hosting providers, or client websites we have built. We are not responsible for the privacy practices of those external sites, and we encourage you to review their own privacy policies.'
      ]
    },
    {
      id: 'policy-updates',
      num: '13',
      title: 'Updates to This Policy',
      paragraphs: [
        'Dezola may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. The version in effect at the time you engage with our website or services is the version that applies. The current version is always available at dezolastudio.name.ng.'
      ]
    },
    {
      id: 'contact',
      num: '14',
      title: 'Contact',
      paragraphs: [
        'Questions about this Privacy Policy or requests regarding your personal information can be directed to Dezola Studio at bb2010ng@gmail.com or +234 904 842 8304. We\u2019re based in Oyo, Nigeria and respond to enquiries within 24 hours.'
      ]
    }
  ],
  footnote: 'This document is a general privacy notice for client and website use and does not constitute formal legal advice. For unusually structured engagements involving sensitive data, both parties are encouraged to seek independent legal counsel.'
}
