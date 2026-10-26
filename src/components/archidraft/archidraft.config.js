/**
 * Archi Draft — Centralized configuration & architectural workflow constants.
 * Developed by PixelMint Studio MVS for Draughtsman Studio.
 */

// Google Play Store URL
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.draughtsmanstudio.archidraft';

// Verified support & contact details
export const SUPPORT_EMAIL = 'support@draughtsmanstudio.com';
export const STUDIO_WEBSITE = 'https://draughtsmanstudio.com';
export const APP_VERSION = '1.0.0';

// Navigation items
export const NAV_ITEMS = [
  { id: 'ad-workflow', label: '9-Stage Workflow' },
  { id: 'ad-system', label: 'Role Console' },
  { id: 'ad-interface', label: 'Workstation' },
  { id: 'ad-versions', label: 'Revision Control' },
  { id: 'ad-features', label: 'Capabilities' },
  { id: 'ad-mobile', label: 'Mobile App' },
  { id: 'ad-download', label: 'Download' },
  { id: 'ad-faq', label: 'FAQ' },
];

// Legal pages accessible from hash
export const LEGAL_PAGES = {
  privacy: 'archi-draft-privacy',
  terms: 'archi-draft-terms',
  deletion: 'archi-draft-deletion',
};

// Verified 9-Stage Workflow with engineering metadata
export const WORKFLOW_STAGES = [
  {
    num: '01',
    title: 'CREATE',
    phase: 'INITIATION',
    role: 'ENGINEER',
    desc: 'Engineer creates the project with scope requirements, architectural sketches, and CAD standards.',
    deliverable: 'Scope Specification & Base Survey (.DWG / .PDF)',
    action: 'Specification Definition',
    cadence: 'Stage 1 of 9',
    badge: 'INPUT GATE'
  },
  {
    num: '02',
    title: 'REVIEW',
    phase: 'ADMINISTRATION',
    role: 'ADMIN',
    desc: 'Admin receives, inspects, and validates the submittal against studio drafting standards.',
    deliverable: 'Compliance Verification & Resource Allocation',
    action: 'Quality Gate 1',
    cadence: 'Stage 2 of 9',
    badge: 'ADMIN AUDIT'
  },
  {
    num: '03',
    title: 'ASSIGN',
    phase: 'ADMINISTRATION',
    role: 'ADMIN',
    desc: 'Admin assigns a qualified structural or architectural draughtsman based on discipline and availability.',
    deliverable: 'Assignment Order & Task Lock',
    action: 'Workforce Dispatch',
    cadence: 'Stage 3 of 9',
    badge: 'ROUTING'
  },
  {
    num: '04',
    title: 'ACCEPT',
    phase: 'PRODUCTION',
    role: 'DRAUGHTSMAN',
    desc: 'Draughtsman reviews parameters, acknowledges delivery timeline, and formally accepts the assignment.',
    deliverable: 'Acknowledgement & Work Session Initialized',
    action: 'Production Lock',
    cadence: 'Stage 4 of 9',
    badge: 'COMMITMENT'
  },
  {
    num: '05',
    title: 'DRAFT',
    phase: 'PRODUCTION',
    role: 'DRAUGHTSMAN',
    desc: 'Initial architectural and structural drawings are drafted to strict precision layering standards.',
    deliverable: 'Draft Package Rev-01 (CAD Sheets & PDF Plot)',
    action: 'Primary Drafting',
    cadence: 'Stage 5 of 9',
    badge: 'CAD GENERATION'
  },
  {
    num: '06',
    title: 'REVIEW',
    phase: 'VERIFICATION',
    role: 'ENGINEER',
    desc: 'Engineer inspects the submitted sheet package for dimensional accuracy, structural load lines, and code conformance.',
    deliverable: 'Engineering Inspection Report & Redline Markup',
    action: 'Cross-Check Audit',
    cadence: 'Stage 6 of 9',
    badge: 'REDLINE STAGE'
  },
  {
    num: '07',
    title: 'REFINE',
    phase: 'REVISION',
    role: 'DRAUGHTSMAN',
    desc: 'Draughtsman integrates engineering redlines, resolves coordinate discrepancies, and produces Rev-02.',
    deliverable: 'Corrected Sheet Package with Audit History',
    action: 'Redline Resolution',
    cadence: 'Stage 7 of 9',
    badge: 'ITERATION'
  },
  {
    num: '08',
    title: 'APPROVE',
    phase: 'VERIFICATION',
    role: 'ENGINEER',
    desc: 'Final architectural approval is formally executed with digital signature and engineer stamp.',
    deliverable: 'Certified Construction-Ready Package (AFC)',
    action: 'Final Sign-Off',
    cadence: 'Stage 8 of 9',
    badge: 'ENGINEERING STAMP'
  },
  {
    num: '09',
    title: 'COMPLETE',
    phase: 'HANDOFF',
    role: 'SYSTEM',
    desc: 'Project artifacts are cryptographically signed, compiled into client deliverables, and permanently archived.',
    deliverable: 'Immutable Archive & Verification Hash Generation',
    action: 'Cryptographic Close',
    cadence: 'Stage 9 of 9',
    badge: 'SYSTEM SEALED'
  },
];

// System roles with console capabilities
export const SYSTEM_ROLES = [
  {
    id: 'engineer',
    title: 'ENGINEER',
    roleName: 'Project Engineer / Architect',
    tagline: 'Defines specifications, structural parameters, and holds final sign-off authority.',
    clearance: 'Tier 1 — Approval Authority',
    capabilities: [
      'Create project briefs & dimensional parameters',
      'Upload CAD requirements and BIM standards',
      'Conduct multi-sheet redline markup sessions',
      'Issue formal engineering approvals and digital stamps'
    ],
    toolset: ['CAD Spec Engine', 'Redline Pen v2', 'Batch Sheet Viewer', 'Digital Signature Key']
  },
  {
    id: 'admin',
    title: 'ADMIN',
    roleName: 'Studio Director / Dispatcher',
    tagline: 'Orchestrates capacity, evaluates incoming engineering briefs, and assigns talent.',
    clearance: 'Tier 0 — Executive Control',
    capabilities: [
      'Complete studio pipeline and capacity oversight',
      'Audit incoming project scopes and SLA milestones',
      'Assign certified draughtsmen by specialization',
      'Manage deliverables, invoicing, and certification logs'
    ],
    toolset: ['Studio Pipeline Matrix', 'Resource Dispatcher', 'SLA Watchdog', 'Audit Ledger']
  },
  {
    id: 'draughtsman',
    title: 'DRAUGHTSMAN',
    roleName: 'Lead Architectural Draughtsman',
    tagline: 'Translates engineering concepts into millimeter-accurate DWG/BIM drawings.',
    clearance: 'Tier 2 — Production Access',
    capabilities: [
      'Acknowledge and accept dispatched project orders',
      'Generate construction-ready plans, sections, and elevations',
      'Upload structured revision sheets with change notes',
      'Address engineering redlines with visual delta tracking'
    ],
    toolset: ['Sheet Uploader', 'Redline Resolve Tab', 'Version Compare', 'DWG Validation Check']
  },
  {
    id: 'student',
    title: 'STUDENT',
    roleName: 'Academic / Apprentice Guild',
    tagline: 'Trains on real-world studio standards, receives peer reviews, and builds verified portfolios.',
    clearance: 'Tier 3 — Academic Sandbox',
    capabilities: [
      'Access studio-standard project templates and benchmarks',
      'Submit mock submittals for automated CAD audit',
      'Review senior draughtsman critique and redlines',
      'Earn cryptographically verified guild certificates'
    ],
    toolset: ['Apprentice Sandbox', 'Standard Library', 'Grading Feedback', 'Certificate Vault']
  },
];

// Feature pillars
export const FEATURE_STORIES = [
  {
    num: '01',
    title: 'PROJECT CONTROL',
    tag: 'ARCHITECTURE & SCOPE',
    desc: 'Structured project definitions replace fragmented loose files.',
    detail: 'Engineers define boundary limits, drawing scales, and submittal deadlines with strict schema validation. Every project maintains an immutable timeline from ground survey to final execution.',
    metric: '100% Traceability'
  },
  {
    num: '02',
    title: 'DRAWING REGISTRY',
    tag: 'CAD & BIM ASSETS',
    desc: 'Drawings remain perpetually tied to verified project milestones.',
    detail: 'Upload and organize DWG, DXF, and vectorized PDF sheet sets. Automatic layer indexing ensures every plan, elevation, and structural detail is cataloged with coordinate metadata.',
    metric: 'Zero Lost Sheets'
  },
  {
    num: '03',
    title: 'REVISION INTEGRITY',
    tag: 'REDLINE AUDIT',
    desc: 'Every redline iteration preserves full contextual history.',
    detail: 'Track sheet revisions across structured review cycles. Visual side-by-side comparison highlights geometry delta, markup notes, and author sign-offs with cryptographic integrity.',
    metric: 'Max 3 Revision Cycles'
  },
  {
    num: '04',
    title: 'CONNECTED ROLES',
    tag: 'CROSS-DISCIPLINARY',
    desc: 'Engineers, Admins, and Draughtsmen work in synchronous lockstep.',
    detail: 'Automated stage notifications, inline coordinate annotations, and role-based action gates eliminate communication silos and unverified WhatsApp/email handoffs.',
    metric: 'Real-Time Sync'
  },
  {
    num: '05',
    title: 'ROLE ISOLATION',
    tag: 'GOVERNANCE & PRIVACY',
    desc: 'Four dedicated interfaces tailored to specific responsibilities.',
    detail: 'Engineers see review queues; Draughtsmen see production tasks; Admins monitor allocation; Students work within safe sandbox environments without cross-contamination.',
    metric: '4 Dedicated Consoles'
  },
  {
    num: '06',
    title: 'FORMAL SIGN-OFF',
    tag: 'CONSTRUCTION READY',
    desc: 'Structured approval cycles yield verified construction blueprints.',
    detail: 'No ambiguity over drawing status. Clear Approved-For-Construction (AFC) states ensure contractors on site never build against preliminary or superseded drawing versions.',
    metric: 'AFC Certified'
  },
];

// FAQ items with categories
export const FAQ_ITEMS = [
  {
    category: 'Platform',
    q: 'What is Archi Draft?',
    a: 'Archi Draft is an architectural workflow and project management platform developed by PixelMint Studio MVS for Draughtsman Studio. It connects engineers, administrators, draughtsmen, and apprentices through a disciplined 9-stage drawing lifecycle.',
  },
  {
    category: 'Platform',
    q: 'Who is Archi Draft designed for?',
    a: 'Archi Draft is engineered for architectural and structural engineering firms, drafting consultancies, independent architects, and academic drafting apprentices who demand millimeter precision and rigorous revision control.',
  },
  {
    category: 'Roles & Workflow',
    q: 'What roles does Archi Draft support?',
    a: 'Four dedicated roles: Engineer (specifies requirements, reviews redlines, signs off), Admin (validates brief, assigns talent, monitors throughput), Draughtsman (drafts CAD/BIM sheets, addresses corrections), and Student (apprentice training & certification).',
  },
  {
    category: 'Roles & Workflow',
    q: 'How does project assignment and dispatch work?',
    a: 'When an engineer submits a project brief, administrators audit the scope and match the project to a vetted draughtsman specializing in that architectural or structural domain. The draughtsman must formally accept the assignment before drafting commences.',
  },
  {
    category: 'Roles & Workflow',
    q: 'How does the revision and redline cycle work?',
    a: 'Drawings go through structured review cycles. The engineer reviews submitted sheets, adds redline annotations, and specifies required corrections. The draughtsman refines the drawings up to 3 structured rounds before final approval.',
  },
  {
    category: 'Platform',
    q: 'What drawing formats does Archi Draft support?',
    a: 'Archi Draft natively supports AutoCAD DWG, DXF, vectorized multi-sheet PDF blueprints, IFC/BIM files, and companion high-resolution raster sheets up to 50MB per individual drawing.',
  },
  {
    category: 'Mobile & Cloud',
    q: 'Is Archi Draft available on mobile devices?',
    a: 'Yes. The Archi Draft mobile application is built specifically for Android and is available on Google Play, providing on-site drawing inspection, review notifications, and project tracking on the go.',
  },
  {
    category: 'Certification & Trust',
    q: 'How does digital certificate verification work?',
    a: 'Every credential issued by Draughtsman Studio and the Archi Draft Guild contains an immutable, cryptographically verifiable token. Third parties, employers, and clients can verify credentials online at #verify.',
  },
  {
    category: 'AI Guidance',
    q: 'What is PIXMINT AI BOT and what is its role?',
    a: 'PIXMINT BOT is our intelligent assistant designed to assist users with platform workflows, CAD standards, submission rules, and documentation. It operates in strict privacy isolation and never exposes proprietary project drawings.',
  },
  {
    category: 'Support & Privacy',
    q: 'How can users contact support or request account deletion?',
    a: 'Users can contact our technical engineering team at support@draughtsmanstudio.com or call +91 91765 61515. Account and data deletion requests can be submitted via email and are processed within 7 business days per our privacy policy.',
  },
];
