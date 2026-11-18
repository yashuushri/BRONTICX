/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LegalSubsection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: LegalSubsection[];
}

export interface LegalDocumentData {
  id: "privacy" | "terms";
  eyebrow: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  readingTime: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY_DOC: LegalDocumentData = {
  id: "privacy",
  eyebrow: "LEGAL DOCUMENTATION",
  title: "Privacy Policy",
  subtitle:
    "This Privacy Policy explains how BRONTICX Studio collects, processes, stores, transfers, protects, and deletes personal data and creator production materials across our websites, strategy booking workflows, and post-production client workspaces.",
  effectiveDate: "January 1, 2026",
  lastUpdated: "November 1, 2026",
  version: "v4.2",
  readingTime: "45+ min read",
  sections: [
    {
      id: "pp-overview",
      number: "01",
      title: "Introduction, Scope, and Definitions",
      paragraphs: [
        "BRONTICX Studio (referred to throughout this document as 'BRONTICX', 'the Studio', 'we', 'us', or 'our') operates a specialized digital media post-production, creative packaging, thumbnail graphic design, and YouTube growth consulting practice serving independent creators, media networks, and talent management agencies worldwide.",
        "This Privacy Policy applies to all personal information processed by BRONTICX when you visit our web properties, submit a strategy call booking request, upload footage or channel materials for a retention review, communicate with our team via email, Discord, Slack, Telegram, or Frame.io, or enter into an active monthly or project-based production engagement.",
        "By accessing our website or sharing production assets with our team, you acknowledge that you have read and understood the practices described in this Policy. Where required by applicable law, we obtain your explicit, affirmative consent prior to processing sensitive categories of information or deploying non-essential storage mechanisms."
      ],
      bullets: [
        "Controller: The legal entity determining the purposes and means of processing personal data collected through our public website, marketing channels, and intake forms.",
        "Processor: The role assumed by BRONTICX when editing, storing, or analyzing raw creator footage, audio tracks, project timelines, and private channel analytics strictly on behalf of an active Creator Client or Agency Partner.",
        "Creator Assets: Raw video files, B-roll recordings, multi-track audio stems, camera originals, Premiere/DaVinci project files, font licenses, brand guidelines, custom PSD thumbnail templates, and unreleased titles.",
        "Personal Data: Any information relating to an identified or identifiable natural person, including legal names, creator pseudonyms linked to real identities, email addresses, billing records, IP addresses, and account handles."
      ]
    },
    {
      id: "pp-data-collected",
      number: "02",
      title: "Categories of Personal Data We Collect",
      paragraphs: [
        "We collect information in three primary ways: directly from you when you interact with our forms or onboarding workspaces; automatically through technical telemetry necessary for security and page delivery; and from authorized third-party talent agencies or collaboration platforms when a creator is onboarded through a management roster."
      ],
      subsections: [
        {
          id: "pp-direct-data",
          title: "2.1 Information You Provide Directly",
          paragraphs: [
            "When you book a free strategy call, request a video retention review, or send us a direct inquiry, we collect the specific fields required to evaluate your channel and coordinate a session."
          ],
          bullets: [
            "Identity and Contact Details: Full name, preferred creator or channel name, primary email address, Discord handle, Slack workspace identifier, or Telegram username.",
            "Channel Profile Metrics: Public YouTube channel URL, approximate subscriber count, upload cadence, primary content niche, and self-reported retention or click-through bottlenecks.",
            "Selected Service Tier and Preferences: Preferred call date and time zone, chosen production tier (Starter, Growth, Partner, or custom volume), and notes regarding your workflow.",
            "Video Review Submissions: Unlisted or public YouTube video links submitted through our review modal, along with selected retention drop-off areas (Intro/Hook, Middle Pacing, Storytelling, or Ending/Outro)."
          ]
        },
        {
          id: "pp-production-data",
          title: "2.2 Production Assets and Channel Analytics",
          paragraphs: [
            "Once you become an active client of BRONTICX Studio, our creative, editorial, and strategy teams process deeper operational datasets strictly to produce, package, and optimize your uploads."
          ],
          bullets: [
            "Raw Audio-Visual Media: Unedited webcam recordings, screen captures, facecam feeds, multi-POV gaming footage, IRL vlogs, and voiceover tracks uploaded to shared Google Drive, Frame.io, or Dropbox folders.",
            "YouTube Studio Performance Exports: Audience retention graphs, relative retention benchmarks, click-through rate (CTR) impression curves, A/B thumbnail test outcomes, traffic source breakdowns, and demographic summaries shared via screenshots or read-only Studio Manager permissions.",
            "Voice and Likeness Materials: High-resolution facial cutouts, photography packs, and brand color swatches used by our graphic designers to craft high-CTR thumbnails.",
            "Revision Feedback and Notes: Timecoded comments in Frame.io, Slack threads, Loom walkthroughs, and Discord feedback messages referencing specific edits or packaging iterations."
          ]
        },
        {
          id: "pp-technical-data",
          title: "2.3 Automatically Collected Technical Data",
          paragraphs: [
            "Our hosting infrastructure and web application automatically process minimal technical logs required to serve pages reliably, prevent automated abuse, and preserve session preferences inside your browser."
          ],
          bullets: [
            "Network and Device Metadata: Truncated IP address, browser user-agent string, viewport dimensions, referring URL, and HTTP request timestamps.",
            "Local Browser Storage: Client-side state stored in localStorage for booking confirmations, review submission records, and interface state without cross-site advertising trackers."
          ]
        }
      ]
    },
    {
      id: "pp-legal-bases",
      number: "03",
      title: "Legal Bases for Processing (GDPR, UK GDPR, and Global Standards)",
      paragraphs: [
        "For individuals located in the European Economic Area (EEA), the United Kingdom, Switzerland, and jurisdictions with comprehensive data protection frameworks, BRONTICX relies on clearly defined lawful bases for every processing activity."
      ],
      bullets: [
        "Contractual Necessity: Processing contact details, raw footage, project files, and billing information to deliver edited videos, thumbnails, scripts, and consulting deliverables under an executed service order or monthly retainer.",
        "Pre-Contractual Steps at Your Request: Reviewing your channel link, analyzing submitted retention screenshots, and scheduling a strategy consultation prior to any paid commitment.",
        "Legitimate Interests: Maintaining infrastructure security, preventing spam or fraudulent bookings, improving turnaround workflows, and verifying authorized agency referrals, provided such interests do not override your fundamental privacy rights.",
        "Legal Obligations: Retaining tax invoices, accounting ledgers, anti-fraud logs, and dispute records required by statutory financial and commercial regulations.",
        "Affirmative Consent: Featuring approved public portfolio clips, creator testimonials, or before-and-after thumbnail case studies when expressly authorized in writing by the creator or their authorized representative."
      ]
    },
    {
      id: "pp-how-we-use",
      number: "04",
      title: "How We Use Collected Information",
      paragraphs: [
        "We never sell personal data, rent creator contact lists, or monetize raw client footage for external training datasets. Every item collected serves a direct operational purpose within our studio workflow."
      ],
      subsections: [
        {
          id: "pp-use-production",
          title: "4.1 Post-Production, Graphic Design, and Creative Strategy",
          paragraphs: [
            "Your footage, brand guidelines, and historical upload metrics allow our editors, sound designers, motion artists, and thumbnail designers to maintain consistent creative quality across episodes."
          ],
          bullets: [
            "Structuring narrative arcs, cold opens, and intro hooks tailored to your audience pacing.",
            "Designing bespoke thumbnails with A/B variants aligned to your video titles and niche psychology.",
            "Tracking post-publish CTR and 30-second retention curves to refine future edits and packaging directions.",
            "Managing two structured revision rounds per deliverable inside shared review channels."
          ]
        },
        {
          id: "pp-use-comms",
          title: "4.2 Scheduling, Support, and Client Operations",
          paragraphs: [
            "Contact identifiers are used to dispatch Zoom invitations, confirm 48-hour or 72-hour delivery windows, deliver retention review breakdowns, and respond to direct email or Discord inquiries."
          ]
        },
        {
          id: "pp-use-ai",
          title: "4.3 Strict Prohibition on Unauthorized AI Model Training",
          paragraphs: [
            "BRONTICX Studio does NOT use your raw footage, voice recordings, likenesses, scripts, unreleased video ideas, or private YouTube analytics to train public or proprietary generative artificial intelligence models. Client raw assets remain strictly isolated within dedicated project workspaces."
          ]
        }
      ]
    },
    {
      id: "pp-footage-security",
      number: "05",
      title: "Handling of Unreleased Footage, Pre-Release Embargoes, and NDAs",
      paragraphs: [
        "We understand that unreleased creator videos, sponsorship integrations, game studio review keys, and talent collaborations are highly confidential prior to publication. Leaks can jeopardize brand deals, embargo agreements, and channel revenue."
      ],
      bullets: [
        "Compartmentalized Access: Raw footage folders and project timelines are accessible solely to the assigned pod (lead editor, assistant editor, thumbnail designer, and creative director) working on your channel.",
        "Watermarked Review Links: Draft cuts shared via Frame.io or unlisted review links restrict public indexing and disable unauthorized external downloads where configured.",
        "Sponsor and Game Embargo Compliance: Creators may flag embargoed segments during brief intake; all team members bound to those folders operate under strict internal confidentiality and non-disclosure obligations.",
        "Zero Unauthorized Redistribution: Raw camera files, outtakes, and rejected thumbnail concepts are never published, leaked, or shared with competing creators."
      ]
    },
    {
      id: "pp-sharing-disclosure",
      number: "06",
      title: "Data Sharing, Agency Collaborations, and Sub-Processors",
      paragraphs: [
        "We share personal data and project assets only with trusted operational sub-processors or explicitly authorized collaborators necessary to execute your production pipeline."
      ],
      subsections: [
        {
          id: "pp-agency-collab",
          title: "6.1 Talent Management and Partner Agencies",
          paragraphs: [
            "Where a creator works with an external talent agency or management company (including agency partners whose creators collaborate with our studio) and instructs us to coordinate billing, scheduling, or content calendars with their manager, we share relevant production status updates, turnaround timelines, and deliverables with those designated representatives."
          ]
        },
        {
          id: "pp-subprocessors",
          title: "6.2 Infrastructure and Workflow Sub-Processors",
          paragraphs: [
            "All third-party SaaS platforms utilized by BRONTICX are evaluated for encryption standards, access controls, and data protection commitments:"
          ],
          bullets: [
            "Cloud File Storage and Transfer: Google Workspace (Google Drive) and Frame.io for raw footage ingestion, timeline proxies, and 4K master delivery.",
            "Client Communication: Slack and Discord for dedicated creator production channels and rapid revision coordination.",
            "Video Conferencing: Zoom for live 30-minute strategy sessions and monthly growth reviews.",
            "Billing and Invoicing: PCI-DSS compliant payment processors (such as Stripe or Wise) for month-to-month retainers. BRONTICX never stores raw credit card numbers on its own servers.",
            "Web Hosting and Edge Delivery: Cloud hosting infrastructure providing TLS encryption, DDoS mitigation, and static asset delivery."
          ]
        },
        {
          id: "pp-legal-disclosure",
          title: "6.3 Compelled Legal Disclosures",
          paragraphs: [
            "We may disclose specific records if required to comply with a valid subpoena, court order, or binding governmental request, or when necessary to protect against imminent fraud, intellectual property theft, or physical harm. Where legally permitted, we notify affected creators prior to disclosure."
          ]
        }
      ]
    },
    {
      id: "pp-retention",
      number: "07",
      title: "Data Retention and Asset Lifecycle Schedules",
      paragraphs: [
        "Video production generates substantial file volumes. To protect your privacy and manage storage responsibly, BRONTICX enforces clear retention timelines across all asset categories."
      ],
      bullets: [
        "Raw Footage and Uncompressed Proxies: Retained in active editing storage during production and for 30 days following final master approval and publication, after which raw source files are purged unless the client maintains an active archival add-on.",
        "Project Files and Thumbnail Masters: Premiere Pro/DaVinci timelines, After Effects comps, and layered PSD thumbnail files for active monthly clients are retained for the duration of the engagement plus 60 days post-offboarding so recurring assets remain reusable.",
        "Booking and Consultation Records: Strategy call intake details and email correspondence are retained for up to 24 months to preserve context for returning creators, unless earlier deletion is requested.",
        "Financial and Tax Records: Invoices, receipts, and transaction confirmations are retained for 7 years (or the statutory minimum in the applicable jurisdiction) for audit and accounting compliance."
      ]
    },
    {
      id: "pp-cookies",
      number: "08",
      title: "Cookies, Local Storage, and Browser Telemetry",
      paragraphs: [
        "BRONTICX Studio maintains a deliberately minimal client-side footprint. We do not embed invasive cross-site behavioral ad networks, retargeting pixels, or third-party data broker scripts on our site."
      ],
      bullets: [
        "Essential Local Storage: Used solely to preserve booking request states, video review form submissions, and basic interface preferences within your browser.",
        "Zero Third-Party Ad Tracking: We do not sell browsing histories or participate in real-time advertising bidding networks.",
        "Managing Browser Storage: You can clear localStorage and site data at any time through your browser privacy settings without impairing access to our public informational pages."
      ]
    },
    {
      id: "pp-international",
      number: "09",
      title: "International Data Transfers",
      paragraphs: [
        "BRONTICX operates with a distributed global production team and serves creators across North America, Europe, the United Kingdom, Asia-Pacific, and Latin America. Consequently, personal data and media assets may be processed in jurisdictions outside your country of residence.",
        "Whenever personal data is transferred from the EEA, UK, or Switzerland to jurisdictions without an adequacy decision, we rely on recognized transfer safeguards including Standard Contractual Clauses (SCCs), the UK International Data Transfer Addendum, and strict technical access controls such as encryption in transit (TLS 1.3) and at rest (AES-256)."
      ]
    },
    {
      id: "pp-security",
      number: "10",
      title: "Technical and Organizational Security Safeguards",
      paragraphs: [
        "Protecting creator channels, unreleased footage, and personal contact records is fundamental to our operations. We enforce layered administrative, technical, and physical safeguards across every production workstation and cloud repository."
      ],
      bullets: [
        "Mandatory Multi-Factor Authentication (MFA) across all studio email, Drive, Frame.io, Slack, and administrative portals.",
        "Role-Based Access Control (RBAC) enforcing least-privilege folder permissions per creator channel.",
        "Encrypted endpoint storage with automatic screen locks and immediate credential revocation upon contractor or staff offboarding.",
        "Regular security audits of shared drive permissions to ensure stale external links are expired."
      ]
    },
    {
      id: "pp-rights",
      number: "11",
      title: "Your Privacy Rights Worldwide",
      paragraphs: [
        "Regardless of where you reside, BRONTICX respects your control over your personal data. Depending on your jurisdiction (including GDPR, UK GDPR, California CCPA/CPRA, Virginia VCDPA, and India DPDP Act), you may exercise the following rights:"
      ],
      bullets: [
        "Right of Access: Request confirmation of whether we process your personal data and obtain a copy of that data in a portable format.",
        "Right to Rectification: Correct inaccurate contact information, channel handles, or billing metadata.",
        "Right to Erasure ('Right to be Forgotten'): Request immediate deletion of your personal records, review submissions, and remaining raw video files, subject to statutory financial retention exceptions.",
        "Right to Restrict or Object to Processing: Object to processing based on legitimate interests or request temporary restriction during a dispute.",
        "Right to Non-Discrimination: We will never penalize, degrade service quality, or charge differential pricing because you exercised a statutory privacy right."
      ]
    },
    {
      id: "pp-ccpa",
      number: "12",
      title: "Additional Disclosures for California Residents (CCPA / CPRA)",
      paragraphs: [
        "Under the California Consumer Privacy Act as amended by the California Privacy Rights Act (CPRA), California residents have specific rights regarding 'personal information' collected over the preceding 12 months.",
        "BRONTICX Studio does NOT 'sell' personal information for monetary or other valuable consideration, nor do we 'share' personal information for cross-context behavioral advertising. Categories collected are limited to identifiers (name, email, social handles), commercial engagement records (chosen service plan), and user-provided audio-visual content.",
        "Authorized agents may submit verified deletion or access requests on behalf of a California creator by providing signed written authorization from the creator and verifying their identity directly with our privacy team."
      ]
    },
    {
      id: "pp-children",
      number: "13",
      title: "Children's and Youth Creator Privacy",
      paragraphs: [
        "Our services are directed strictly to adult creators (18 years or older), corporate entities, and legal parents or guardians managing youth or family channels. We do not knowingly enter into direct contracts with or collect personal data directly from individuals under 16 years of age (or 13 in the United States) without verifiable parental or legal guardian consent.",
        "Where BRONTICX provides thumbnail design or post-production support for family-oriented channels featuring minors, all contractual instructions, asset uploads, approvals, and communications are conducted exclusively through the adult channel owner, parent, legal guardian, or authorized talent agency."
      ]
    },
    {
      id: "pp-youtube-api",
      number: "14",
      title: "Third-Party Platforms and YouTube Studio Access",
      paragraphs: [
        "If you grant BRONTICX Studio limited role-based access (such as Editor or Viewer Analytics permissions) inside YouTube Studio to review retention graphs, upload drafts, or run A/B thumbnail tests, our team accesses only the analytical and publishing features required to perform those tasks.",
        "We never request your primary Google account password, never alter channel payout or AdSense banking settings, and recommend revoking role-based YouTube Studio permissions immediately upon concluding an engagement. Your use of Google, YouTube, Discord, Gab, CounterSocial, or Frame.io remains governed by each respective platform's privacy policy."
      ]
    },
    {
      id: "pp-breach",
      number: "15",
      title: "Security Incident Response and Notification",
      paragraphs: [
        "In the event of a confirmed security breach affecting unencrypted personal data or unreleased creator media under our control, BRONTICX will initiate immediate containment, revoke affected access tokens, preserve forensic logs, and notify impacted creators and relevant supervisory authorities within applicable statutory deadlines (including within 72 hours where required under GDPR)."
      ]
    },
    {
      id: "pp-changes",
      number: "16",
      title: "Updates to This Privacy Policy",
      paragraphs: [
        "We may update this Privacy Policy periodically to reflect new production workflows, regulatory developments, or sub-processor changes. The 'Last Updated' date and version number at the top of this page indicate when the most recent revisions took effect. Material changes affecting active monthly retainers will be communicated directly via email or your primary client Slack/Discord channel."
      ]
    },
    {
      id: "pp-contact",
      number: "17",
      title: "Contact Information and Data Protection Inquiries",
      paragraphs: [
        "If you have questions about this Privacy Policy, wish to request immediate deletion of raw footage, or want to exercise any statutory privacy right, please reach out through our official channels:"
      ],
      bullets: [
        "Studio Entity: BRONTICX Studio",
        "Direct Contact: Use the Email modal in our website footer or message your dedicated client support lead on Discord.",
        "Response SLA: Verified privacy and data deletion requests are acknowledged within 5 business days and fulfilled within 30 calendar days."
      ]
    }
  ]
};

export const TERMS_OF_SERVICE_DOC: LegalDocumentData = {
  id: "terms",
  eyebrow: "LEGAL DOCUMENTATION",
  title: "Terms of Service",
  subtitle:
    "These Terms of Service govern your access to the BRONTICX Studio website, free strategy consultations, retention reviews, and all post-production, graphic design, scripting, and YouTube growth retainers provided by BRONTICX Studio.",
  effectiveDate: "January 1, 2026",
  lastUpdated: "November 1, 2026",
  version: "v5.1",
  readingTime: "55+ min read",
  sections: [
    {
      id: "tos-acceptance",
      number: "01",
      title: "Acceptance of Terms and Contractual Relationship",
      paragraphs: [
        "These Terms of Service ('Terms') constitute a legally binding agreement between you (whether acting as an individual content creator, corporate media entity, or authorized talent management agency, referred to as 'Client' or 'you') and BRONTICX Studio ('BRONTICX', 'Studio', 'we', 'us', or 'our').",
        "By browsing our website, booking a strategy session, submitting a video for a free retention review, or subscribing to any production tier (Starter, Growth, Partner, or custom enterprise volume), you confirm that you are at least 18 years of age (or the age of majority in your jurisdiction), possess full legal authority to bind yourself or your represented channel, and agree to comply with these Terms.",
        "Where a separate Statement of Work (SOW), Master Services Agreement (MSA), or custom agency addendum is executed in writing between BRONTICX and a Client, the specific commercial terms of that signed agreement prevail over conflicting provisions in these general Terms."
      ]
    },
    {
      id: "tos-scope",
      number: "02",
      title: "Scope of Studio Services and Deliverables",
      paragraphs: [
        "BRONTICX Studio provides end-to-end YouTube and short-form post-production, packaging, and channel growth systems. Exact monthly deliverable counts, maximum video durations, and turnaround priorities correspond strictly to the tier selected at onboarding."
      ],
      subsections: [
        {
          id: "tos-tiers",
          title: "2.1 Monthly Production Tiers",
          paragraphs: [
            "Unless otherwise specified in a custom agreement, standard monthly plans operate under the following capacity baselines:"
          ],
          bullets: [
            "Starter (Edit Only): Up to 4 long-form videos per billing cycle (up to 15 minutes final runtime each), 72-hour standard turnaround per edit, 2 revision rounds per video, with thumbnails available as an add-on.",
            "Growth (Full Production): Up to 4 long-form videos (up to 20 minutes final runtime each), 8 vertical Shorts/Reels, priority 48-hour turnaround, 2 revision rounds per video, 1 custom thumbnail plus title packaging per long-form video, and 1 monthly strategy call.",
            "Partner (Content Partner): Up to 4 long-form videos (up to 30 minutes final runtime each), 12 vertical Shorts/Reels, priority 48-hour turnaround, 2 revision rounds per video, 2 thumbnail concepts per video plus title optimization, and 2 monthly strategy calls covering ideation and scripting."
          ]
        },
        {
          id: "tos-free-reviews",
          title: "2.2 Free Strategy Calls and Retention Reviews",
          paragraphs: [
            "Complimentary 30-minute strategy sessions and free video retention reviews are provided purely for diagnostic and educational evaluation. Booking a free call creates zero financial obligation and does not establish an agency-client retainer until a paid plan is activated."
          ]
        },
        {
          id: "tos-rollover",
          title: "2.3 Deliverable Cadence and Unused Monthly Quota",
          paragraphs: [
            "Monthly production capacity is reserved specifically for your channel's dedicated editing pod. To prevent end-of-month production bottlenecks, Clients are encouraged to submit raw footage evenly across the 4 weeks of each billing cycle. Unused monthly video slots do not automatically roll over into subsequent months unless a written pause or rollover exception is approved in advance due to verified illness, travel, or sponsor rescheduling."
          ]
        }
      ]
    },
    {
      id: "tos-onboarding",
      number: "03",
      title: "Client Responsibilities, Footage Intake, and Creative Briefs",
      paragraphs: [
        "Speed and consistency rely on clear, timely handoffs. Turnaround clocks begin only once BRONTICX receives complete, uncorrupted raw materials and a clear creative brief."
      ],
      bullets: [
        "Footage Quality and Integrity: Clients must upload complete camera recordings, synchronized audio tracks, and necessary game/screen captures in standard playable formats (MP4, MOV, MKV, WAV) to the designated shared Google Drive or Frame.io folder.",
        "Brief Submission: Each upload must include the intended video concept, working title, sponsorship read timestamps (if applicable), music/SFX exclusions, and any mandatory sponsor talking points.",
        "Excessive Raw Footage Ratio: Standard turnarounds assume reasonable raw footage ratios (typically up to 4:1 to 6:1 relative to final runtime, or pre-marked multi-POV highlights for gaming shoots). Unlogged 30+ hour multi-day streams without timestamps may require a pre-agreed logging fee or extended turnaround window.",
        "Single Point of Final Approval: Where an agency or multi-host channel is involved, Client must designate one authoritative approver to consolidate feedback so contradictory revision requests do not stall delivery."
      ]
    },
    {
      id: "tos-turnaround",
      number: "04",
      title: "Turnaround Windows, Delays, and Priority Queues",
      paragraphs: [
        "BRONTICX targets ~48-hour delivery on Priority plans (Growth and Partner) and ~72-hour delivery on Starter edits, measured in business hours from confirmed receipt of complete raw footage and brief.",
        "Turnaround estimates exclude Sundays, major statutory holidays, and delays caused by corrupted uploads, missing audio tracks, unbriefed mid-edit concept pivots, or Client response delays exceeding 48 hours between drafts. For complex documentary cuts, heavy 3D motion sequences, or videos exceeding the tier's maximum length cap, our producer will notify you upfront of any adjusted timeline before work begins."
      ]
    },
    {
      id: "tos-revisions",
      number: "05",
      title: "Revision Policy and Scope Boundaries",
      paragraphs: [
        "Every long-form video, short-form clip, and thumbnail deliverable includes two (2) structured rounds of revisions at no additional charge."
      ],
      bullets: [
        "Consolidated Timecoded Notes: Clients must submit all notes for a given revision round together in one consolidated list (via Frame.io timestamps, Discord, or Slack) before the editor begins the revision pass.",
        "What Counts as a Revision: Adjustments to pacing, cut timing, color grade balance, caption styling, music volume dipping, sound effects, B-roll swaps, or thumbnail text/color tweaks based on the original brief.",
        "Out-of-Scope Re-Edits: Completely changing the video topic after rough-cut approval, uploading entirely new replacement raw footage after assembly, or requesting a third full narrative restructuring constitutes a new scope item and may incur an additional editing fee or count toward an extra slot.",
        "Deemed Acceptance: If a delivered draft receives no feedback within 7 calendar days of submission, the deliverable is deemed approved so the pod can advance to your next queued upload."
      ]
    },
    {
      id: "tos-billing",
      number: "06",
      title: "Fees, Month-to-Month Billing, and Cancellation",
      paragraphs: [
        "BRONTICX Studio operates on a transparent month-to-month model with no long-term lock-in contracts. You stay because your channel grows, not because of paperwork."
      ],
      subsections: [
        {
          id: "tos-payment-terms",
          title: "6.1 Billing Cycle and Payment Methods",
          paragraphs: [
            "All monthly retainers are billed in advance at the start of each 30-day service period in United States Dollars (USD) via approved payment links, credit/debit card, ACH, or wire transfer. Production begins once initial payment clears."
          ]
        },
        {
          id: "tos-cancellation",
          title: "6.2 Cancellation and Pausing",
          paragraphs: [
            "You may cancel your subscription at any time prior to your next renewal billing date by notifying your producer via Slack, Discord, or email at least 48 hours before the upcoming charge. Upon cancellation, no future recurring invoices will be issued, and BRONTICX will complete any active in-progress deliverables paid for within the current billing cycle."
          ]
        },
        {
          id: "tos-refunds",
          title: "6.3 Refund Policy and Chargebacks",
          paragraphs: [
            "Because creative labor and dedicated editing pod capacity are allocated immediately upon subscription activation, fees for completed or actively in-production billing cycles are generally non-refundable once production work has commenced. If a Client has not yet submitted any footage or initiated onboarding within 7 days of initial signup and requests cancellation, BRONTICX may issue a full or prorated courtesy refund at its reasonable discretion. Initiating an unjustified payment chargeback without first attempting good-faith resolution with our billing team constitutes a material breach of these Terms and suspends all license grants to unpaid deliverables."
          ]
        }
      ]
    },
    {
      id: "tos-ip",
      number: "07",
      title: "Intellectual Property Ownership and Licensing",
      paragraphs: [
        "Clear ownership of your content and channel assets is non-negotiable. BRONTICX operates strictly on a work-made-for-hire / full assignment basis for paid final deliverables."
      ],
      subsections: [
        {
          id: "tos-client-ip",
          title: "7.1 Client Ownership of Raw Assets and Paid Deliverables",
          paragraphs: [
            "You retain 100% ownership of all raw footage, voice recordings, likenesses, scripts, channel branding, and trademarks provided to us. Upon full payment for the applicable billing cycle, BRONTICX assigns to you all right, title, and interest in the final exported 4K video masters, Shorts cuts, and final PNG/JPG thumbnails created exclusively for your channel."
          ]
        },
        {
          id: "tos-studio-tools",
          title: "7.2 Studio Templates, Presets, and Working Project Files",
          paragraphs: [
            "BRONTICX retains ownership of its proprietary editing presets, animation rigs, sound-effect libraries, LUTs, and internal workflow tooling used to accelerate your edits. Where a custom Premiere Pro or After Effects working project file (.prproj / .aep) transfer is included or requested, you receive a perpetual, non-exclusive license to use those bundled project structures for your own channel, without reselling BRONTICX's underlying proprietary preset packs to third parties."
          ]
        },
        {
          id: "tos-licensed-assets",
          title: "7.3 Stock Footage, Music, and Fonts",
          paragraphs: [
            "Where BRONTICX incorporates licensed stock music, sound effects, or B-roll from platforms such as Epidemic Sound, Artlist, Motion Array, or Storyblocks, Client must either maintain an active channel-linked license (for YouTube Content ID whitelisting) or notify us in advance of your preferred licensed music library so zero copyright claims occur upon upload. Client warrants that any third-party clips, memes, or music Client explicitly directs us to include are either properly licensed or fall within lawful fair use / commentary tolerances for which Client assumes full responsibility."
          ]
        }
      ]
    },
    {
      id: "tos-portfolio",
      number: "08",
      title: "Portfolio Display Rights and Confidentiality",
      paragraphs: [
        "We respect creator privacy and never reveal confidential channel performance or unreleased material."
      ],
      bullets: [
        "Public Showcase: Unless a strict white-label or NDA restriction is agreed in writing, BRONTICX may display short excerpts of publicly released videos, publicly visible thumbnails, and channel names/subscriber counts as examples of our work on our website and pitch decks, strictly after the Client has published the video publicly.",
        "Opt-Out Right: Any Client or agency partner may opt out of public portfolio showcasing at any time by informing their producer in writing, and we will promptly remove any featured clips or references.",
        "Mutual Confidentiality: Both parties agree to keep pricing terms, private retention metrics, unreleased content roadmaps, sponsor contracts, and internal workflow briefs strictly confidential for at least three (3) years following termination of the relationship."
      ]
    },
    {
      id: "tos-acceptable-use",
      number: "09",
      title: "Content Standards and Prohibited Materials",
      paragraphs: [
        "BRONTICX Studio reserves the right to refuse or immediately terminate production on any footage or thumbnail request that violates applicable law, YouTube Community Guidelines, or basic safety standards."
      ],
      bullets: [
        "Child sexual exploitation, non-consensual intimate imagery, or exploitation of minors.",
        "Terrorism promotion, credible incitement to physical violence, doxxing, or illegal harassment.",
        "Malware distribution, financial scams, counterfeit fraud, or deliberate copyright piracy.",
        "Abusive, threatening, or discriminatory treatment toward BRONTICX editors, designers, or producers."
      ]
    },
    {
      id: "tos-performance-disclaimer",
      number: "10",
      title: "No Guarantee of Specific Algorithm, View, or Revenue Outcomes",
      paragraphs: [
        "While our retention-engineered editing, packaging psychology, and strategy frameworks have helped partner channels achieve substantial view velocity and CTR improvements, YouTube, TikTok, and Instagram algorithms are controlled entirely by third-party platforms and shifting viewer behavior.",
        "Accordingly, BRONTICX Studio makes no binding contractual guarantee of exact view counts, subscriber milestones, AdSense CPMs, viral impressions, or sponsorship revenue. Case studies and historical metrics displayed on our site reflect past client experiences and are not a promise of identical future performance."
      ]
    },
    {
      id: "tos-warranties",
      number: "11",
      title: "Disclaimer of Warranties",
      paragraphs: [
        "EXCEPT AS EXPRESSLY SET FORTH IN AN EXECUTED WRITTEN AGREEMENT, THE WEBSITE, FREE CONSULTATIONS, AND ALL STUDIO SERVICES ARE PROVIDED ON AN 'AS IS' AND 'AS AVAILABLE' BASIS. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BRONTICX STUDIO DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT REGARDING THIRD-PARTY PLATFORM COMPATIBILITY OR ALGORITHM OUTCOMES."
      ]
    },
    {
      id: "tos-liability",
      number: "12",
      title: "Limitation of Liability",
      paragraphs: [
        "TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL BRONTICX STUDIO, ITS FOUNDERS, EMPLOYEES, CONTRACTORS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING LOSS OF AD REVENUE, LOSS OF SPONSORSHIP DEALS, CHANNEL DEMONETIZATION, DATA LOSS BEYOND REASONABLE BACKUP OBLIGATIONS, OR REPUTATIONAL HARM, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
        "IN ALL CASES, BRONTICX STUDIO'S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS OR ANY DELIVERABLE SHALL NOT EXCEED THE TOTAL SERVICE FEES ACTUALLY PAID BY THE CLIENT TO BRONTICX DURING THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM (OR USD $500 FOR FREE CONSULTATION USERS)."
      ]
    },
    {
      id: "tos-indemnification",
      number: "13",
      title: "Indemnification",
      paragraphs: [
        "You agree to defend, indemnify, and hold harmless BRONTICX Studio and its personnel from and against any third-party claims, damages, copyright strikes, defamation assertions, regulatory fines, and reasonable legal fees arising out of: (a) raw footage, scripts, audio, or third-party assets supplied by you; (b) your violation of any sponsor embargo, platform policy, or third-party intellectual property right; or (c) your breach of these Terms."
      ]
    },
    {
      id: "tos-force-majeure",
      number: "14",
      title: "Force Majeure and Service Continuity",
      paragraphs: [
        "Neither party shall be liable for delays or failure to perform obligations (excluding payment obligations for completed work) caused by events beyond reasonable control, including widespread cloud provider outages (Google Drive, AWS, Frame.io), severe natural disasters, power grid failures, cyberattacks against third-party backbone infrastructure, war, or governmental restrictions. Affected timelines will be extended equitably for the duration of the disruption."
      ]
    },
    {
      id: "tos-non-solicitation",
      number: "15",
      title: "Non-Solicitation of Studio Talent",
      paragraphs: [
        "BRONTICX invests significant resources recruiting, training, and retaining elite editors, motion designers, sound specialists, and thumbnail artists. During the term of your active engagement and for twelve (12) months following termination, you agree not to directly or indirectly solicit, poach, or contract independently with any BRONTICX editor, designer, or strategist assigned to your channel to bypass the Studio, unless a mutually agreed buyout fee is arranged in writing with BRONTICX leadership."
      ]
    },
    {
      id: "tos-disputes",
      number: "16",
      title: "Governing Law and Dispute Resolution",
      paragraphs: [
        "Before initiating any formal legal or arbitration proceeding, both parties agree to first attempt in good faith to resolve any billing, creative, or contractual dispute informally by sending a written notice describing the issue and participating in a senior leadership resolution call within 15 business days.",
        "If unresolved after informal negotiation, disputes shall be governed by applicable commercial contract principles without regard to conflict-of-law rules, and resolved through binding individual arbitration or a court of competent jurisdiction as designated in the applicable client invoice or Master Services Agreement. Class-action or representative consolidated proceedings are waived to the extent permitted by law."
      ]
    },
    {
      id: "tos-general",
      number: "17",
      title: "General Provisions, Severability, and Entire Agreement",
      paragraphs: [
        "Independent Contractors: BRONTICX Studio acts strictly as an independent contractor. Nothing in these Terms creates an employment, partnership, joint venture, or fiduciary agency relationship.",
        "Severability: If any provision of these Terms is held invalid or unenforceable by a court or arbitrator, the remaining provisions shall remain in full force and effect.",
        "Assignment: Clients may not assign their retainer rights to another unrelated YouTube channel without BRONTICX's prior written consent. BRONTICX may assign its rights in connection with a corporate reorganization or acquisition provided service continuity is preserved.",
        "Updates to Terms: We may revise these Terms periodically by posting an updated version with a new Effective Date. Continued use of our services after the updated Terms take effect constitutes acceptance of the revised Terms."
      ]
    }
  ]
};
