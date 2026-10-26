/**
 * PIXMINT BOT — Grounded Knowledge & Intent Resolution Engine (Web Adapter)
 * 
 * Based directly on authoritative Archi Draft & PIXMINT BOT specifications:
 * - pixelmint-studio-mvs/PIXMINT-BOT (worker/src/knowledge/embedded_knowledge.ts)
 * - pixelmint-studio-mvs/PIXMINT-BOT (lib/src/domain/engine/pixmint_knowledge_engine.dart)
 * - pixelmint-studio-mvs/Archidraft (docs/01_project/CORE_WORKFLOW.md, USER_ROLES.md)
 */

export const BOT_ROLES = [
  { id: 'guest', label: 'Visitor / Client', icon: 'UserCheck', description: 'Explore studio services, downloads, verification & general info' },
  { id: 'engineer', label: 'Engineer', icon: 'Compass', description: 'Project submission, redline review & drawing approval workflows' },
  { id: 'draughtsman', label: 'Draughtsman', icon: 'PenTool', description: 'Assignment acceptance, drawing uploads & revision standards' },
  { id: 'student', label: 'Student / Trainee', icon: 'GraduationCap', description: 'CAD practicum modules, submissions & certificate validation' },
  { id: 'admin', label: 'Studio Admin', icon: 'Shield', description: 'Discipline dispatch, capacity management & audit registries' },
];

export const SUGGESTION_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'app', label: 'ArchiDraft App' },
  { id: 'verify', label: 'Verification' },
  { id: 'services', label: 'Studio Services' },
  { id: 'workflow', label: 'CAD & Workflow' },
  { id: 'download', label: 'Downloads' },
];

export const ROLE_SUGGESTIONS = {
  guest: [
    { text: 'What is Archi Draft and how does it work with Draughtsman Studio?', category: 'app' },
    { text: 'Where can I download Archi Draft for Android or Windows?', category: 'download' },
    { text: 'How do I verify a student or professional certificate?', category: 'verify' },
    { text: 'What architectural design and 3D visualization services are offered?', category: 'services' },
    { text: 'How do I schedule an architectural consultation or inquiry?', category: 'services' },
    { text: 'How many correction rounds are included per project milestone?', category: 'workflow' },
    { text: 'What CAD and BIM drawing formats are supported (DWG, DXF, PDF)?', category: 'workflow' },
    { text: 'How does Draughtsman Studio protect client drawings and privacy?', category: 'services' },
    { text: 'How does the 9-stage project lifecycle work from start to finish?', category: 'workflow' },
    { text: 'Can I view completed residential and commercial portfolio projects?', category: 'services' },
  ],
  engineer: [
    { text: 'Is Archi Draft available for Windows Desktop?', category: 'download' },
    { text: 'What are the hardware and system requirements for Archi Draft?', category: 'download' },
    { text: 'How do I create and submit a new architectural project brief?', category: 'workflow' },
    { text: 'How do I review CAD drawings and apply redline corrections?', category: 'workflow' },
    { text: 'How many correction rounds are permitted before final approval?', category: 'workflow' },
    { text: 'How do I track drawing revisions and compare version snapshots?', category: 'app' },
    { text: 'What drawing scale, layer, and dimension standards are enforced?', category: 'workflow' },
    { text: 'How do I grant final sign-off and approval on completed sheets?', category: 'workflow' },
    { text: 'Can I export reviewed DWG and PDF packages directly from the portal?', category: 'app' },
    { text: 'How does role-based access control (RBAC) protect my project files?', category: 'app' },
  ],
  draughtsman: [
    { text: 'How do I receive, review, and accept incoming drawing assignments?', category: 'workflow' },
    { text: 'Which drawing formats and file size limits are supported for uploads?', category: 'workflow' },
    { text: 'How do I upload new revisions and address redline corrections?', category: 'workflow' },
    { text: 'What happens if a project milestone exceeds the 3 revision rounds?', category: 'workflow' },
    { text: 'How is draughtsman capacity and active workload managed?', category: 'app' },
    { text: 'Can I archive approved drawings for my professional portfolio?', category: 'services' },
    { text: 'How do I view client revision notes and annotated drawing sheets?', category: 'app' },
    { text: 'What are the drafting guidelines for residential vs commercial plans?', category: 'workflow' },
    { text: 'How do milestone approvals trigger payment and completion records?', category: 'app' },
    { text: 'What should I do if an uploaded drawing sheet is rejected by admin?', category: 'workflow' },
  ],
  student: [
    { text: 'What architectural training programs and CAD practicums are available?', category: 'services' },
    { text: 'How do I submit drawings for mentor review and redline feedback?', category: 'workflow' },
    { text: 'How are student certificates verified on the website?', category: 'verify' },
    { text: 'Where can I find sample CAD blueprints and reference drawings?', category: 'workflow' },
    { text: 'How do I track my training milestones and module progress?', category: 'app' },
    { text: 'What CAD software skills are covered (AutoCAD, Revit, SketchUp)?', category: 'services' },
    { text: 'How long does it take to receive evaluation feedback on submissions?', category: 'workflow' },
    { text: 'Are student certificates tamper-evident and cryptographically signed?', category: 'verify' },
    { text: 'Can I download practice project briefs for 2D drafting and 3D modeling?', category: 'workflow' },
    { text: 'What are the eligibility criteria for a professional studio internship?', category: 'services' },
  ],
  admin: [
    { text: 'How do admins review and triage incoming client project briefs?', category: 'workflow' },
    { text: 'How is Draughtsman workload and discipline allocation managed?', category: 'app' },
    { text: 'Where can I inspect system audit trails and immutable activity logs?', category: 'app' },
    { text: 'How are milestone payments and project escrow statuses verified?', category: 'services' },
    { text: 'How is role-based access control (RBAC) configured and maintained?', category: 'app' },
    { text: 'How do admins handle dispute resolution or milestone scope extensions?', category: 'workflow' },
    { text: 'Where do I issue and register student verification certificate tokens?', category: 'verify' },
    { text: 'How does the platform ensure zero cross-tenant drawing exposure?', category: 'app' },
    { text: 'What telemetry and performance metrics are monitored on the server?', category: 'app' },
    { text: 'How do I revoke or reassign a draughtsman allocation if inactive?', category: 'workflow' },
  ],
};

const KNOWLEDGE_BASE = [
  // ─── 1. STUDIO OVERVIEW & BRAND ───
  {
    keywords: ['what is draughtsman studio', 'about draughtsman studio', 'who are you', 'studio', 'firm', 'practice', 'draughtsman studio background'],
    title: 'About Draughtsman Studio',
    docRef: 'Draughtsman Studio Overview',
    answer:
      '**Draughtsman Studio** is a premier architectural and interior design firm specializing in luxury residential architecture, commercial developments, 3D photorealistic visualization, structural engineering drafting, and master planning.\n\nFounded on principles of structural honesty, craftsmanship, and digital precision, our team transforms complex design ideas into buildable, compliant architectural drawings. **Archi Draft** is our proprietary workflow platform engineered to streamline multi-disciplinary architectural coordination.',
  },
  {
    keywords: ['what is archi draft', 'archidraft', 'platform', 'about archi draft', 'system', 'the app', 'what is the app'],
    title: 'Archi Draft Platform Overview',
    docRef: 'docs/01_project/PROJECT_OVERVIEW.md',
    answer:
      '**Archi Draft** is the proprietary architectural workflow ecosystem developed for Draughtsman Studio. It unites four specialized portals:\n\n1. **Engineer / Client Portal**: Define briefs, upload site surveys, inspect drawing sheets, flag redline corrections, and approve milestones.\n2. **Draughtsman Portal**: Receive discipline-matched assignments, upload CAD revisions, and resolve client redlines.\n3. **Student / Trainee Portal**: Complete structured CAD practicum projects, submit drafting sheets, and earn verifiable credentials.\n4. **Studio Admin Portal**: Oversee project dispatch, capacity quotas, escrow milestones, and audit trails.\n\nAccess the product overview anytime at [#archi-draft](#archi-draft).',
  },

  // ─── 2. CERTIFICATE VERIFICATION ───
  {
    keywords: ['verify', 'certificate', 'credential', 'token', 'student certificate', 'authenticity', 'check certificate', 'validate certificate'],
    title: 'Digital Certificate Verification System',
    docRef: 'docs/01_project/CORE_WORKFLOW.md #Certificates',
    answer:
      'Draughtsman Studio issues **tamper-evident, cryptographically verifiable certificates** to students and professionals who successfully complete certified training programs or project practicums.\n\n**How to Verify:**\n1. Navigate to our official [Certificate Verification Portal](#verify).\n2. Enter the unique Certificate Token printed on the credential (e.g., `DS-2026-ENG-8492` or `DS-STU-7721-ARCH`).\n3. The system instantly cross-references our immutable registry, displaying the recipient name, issue date, credential discipline, syllabus hours, and verification status.\n\nAll verified credentials contain cryptographic hash signatures to prevent unauthorized alterations.',
  },
  {
    keywords: ['tamper evident', 'cryptographic token', 'fake certificate', 'fraudulent certificate', 'verification security'],
    title: 'Certificate Security & Cryptographic Integrity',
    docRef: 'docs/03_security/CREDENTIAL_STANDARDS.md',
    answer:
      'Every official Draughtsman Studio credential contains an immutable SHA-256 registry hash generated at the time of issue and signed by studio administration.\n\nIf a token is invalid, expired, or modified, the verification portal flags the credential as unverified. For assistance validating historical credentials or international transcripts, contact verify@draughtsmanstudio.com.',
  },

  // ─── 3. CORE WORKFLOW & 9-STAGE LIFECYCLE ───
  {
    keywords: ['workflow', 'stages', 'steps', 'process', 'lifecycle', 'how it works', '9-stage', 'nine stages'],
    title: '9-Stage Core Project Lifecycle',
    docRef: 'docs/01_project/CORE_WORKFLOW.md',
    answer:
      'Archi Draft enforces an exact, non-bypassable 9-stage architectural lifecycle:\n\n1. **CREATE**: Client or Engineer submits project specifications, site surveys, and scope documents.\n2. **REVIEW**: Studio Admin triages technical requirements and confirms feasibility.\n3. **ASSIGN**: Admin allocates the project to a specialized Draughtsman based on capacity.\n4. **ACCEPT**: Draughtsman reviews the brief and formally accepts the timeline.\n5. **DRAFT**: Initial architectural CAD drawing package is drafted and uploaded.\n6. **REVIEW**: Client/Engineer inspects drawing sheets and logs structured redline notes.\n7. **REFINE**: Draughtsman resolves all redline marks and uploads the revision snapshot.\n8. **APPROVE**: Final drawing sign-off is granted by the Client/Engineer.\n9. **COMPLETE**: Final drawing sheets are sealed, watermarked, and archived with tamper-evident audit history.',
  },
  {
    keywords: ['correction', 'revisions', 'rounds', 'redline', 'how many corrections', 'correction rounds', 'revision limit'],
    title: 'Correction Cycles & Scope Guardrails',
    docRef: 'docs/01_project/USER_ROLES.md #Corrections',
    answer:
      'To maintain strict delivery schedules and prevent unbounded scope creep, Archi Draft enforces a **maximum of 3 formal correction rounds** per milestone.\n\n- **Structured Redlines**: Every revision request requires pinned annotations or coordinate callouts on the drawing sheet.\n- **Version Snapshots**: Every revision creates an immutable version tag (`v1.0`, `v1.1`, `v1.2`).\n- **Scope Extensions**: If changes fundamentally alter project scope (e.g., adding an unannounced floor or structural relocation), the studio administrator issues a formal scope extension rather than consuming standard revision rounds.',
  },
  {
    keywords: ['redlines', 'annotate', 'markup', 'how to review drawings', 'drawings review'],
    title: 'Drawing Review & In-App Redline Standards',
    docRef: 'docs/01_project/REDLINE_GUIDELINES.md',
    answer:
      'Archi Draft provides built-in redline markup tools directly inside the viewport:\n\n- **Pin Callouts**: Place numbered marker pins at specific sheet coordinates.\n- **Correction Tags**: Categorize notes under Architectural, Structural, MEP, or Dimensioning.\n- **Side-by-Side Diff**: Compare the current revision with the previous version sheet in transparent onion-skin overlay or split slider.\n- **Audit Confirmation**: Draughtsmen must individually toggle each redline pin as "Resolved" before the updated sheet can be uploaded for client inspection.',
  },

  // ─── 4. SUPPORTED CAD FORMATS & TECHNICAL SPECS ───
  {
    keywords: ['formats', 'drawing formats', 'dwg', 'dxf', 'pdf', 'files', 'upload', 'supported files', 'cad formats'],
    title: 'Supported CAD, BIM & Drawing Formats',
    docRef: 'docs/02_architecture/DATA_ARCHITECTURE.md',
    answer:
      'Archi Draft supports industry-standard architectural and engineering file formats:\n\n- **AutoCAD DWG & DXF**: 2013 through 2026 format compatibility.\n- **Vector PDF Blueprints**: High-DPI scaled sheets (A0, A1, A2, A3, ARCH D/E) with layer preservation.\n- **BIM / IFC**: Industry Foundation Classes (IFC 2x3 & IFC 4) for model coordination.\n- **Raster Reference Imagery**: High-res JPEG, PNG, TIFF, and WebP for site surveys and finishes.\n- **File Size Cap**: Up to 50MB per individual sheet upload with automatic WebAssembly geometric verification.',
  },
  {
    keywords: ['drawing scale', 'layers', 'dimension standards', 'drafting standards', 'layer standards'],
    title: 'Architectural Drafting & Layer Conventions',
    docRef: 'docs/02_architecture/CAD_STANDARDS.md',
    answer:
      'All drawing sheets produced in Archi Draft must adhere to standardized AIA/ISO layer conventions:\n\n- `A-WALL` (Exterior & interior wall boundaries)\n- `A-DOOR` / `A-GLAZ` (Doors, glazing & fenestration)\n- `S-COLS` / `S-BEAM` (Structural columns and load-bearing framing)\n- `A-ANNO-DIMS` (Dimensions, architectural scales, elevation tags)\n- Scales: 1:50 & 1:100 for floor layouts; 1:20 & 1:10 for construction details; 1:200 for site masterplans.',
  },

  // ─── 5. USER ROLES & PERMISSIONS ───
  {
    keywords: ['roles', 'permissions', 'who can use', 'access control', 'rbac', 'role-based'],
    title: 'Role-Based Access Control (RBAC) Architecture',
    docRef: 'docs/01_project/USER_ROLES.md',
    answer:
      'Archi Draft enforces strict multi-tenant Role-Based Access Control (RBAC):\n\n- **CLIENT / ENGINEER**: Submit briefs, review drawings, pin redlines (max 3 rounds), and sign off on completion.\n- **DRAUGHTSMAN**: Accept allocated discipline assignments, submit versioned CAD sheets, and resolve redlines.\n- **STUDENT / TRAINEE**: Access curated CAD practice modules, submit coursework, and obtain verifiable digital certificates.\n- **STUDIO ADMIN**: Triage briefs, allocate draughtsmen based on workload capacity, manage escrow, and inspect SHA-256 audit logs.',
  },
  {
    keywords: ['engineer role', 'how do engineers use', 'engineer portal'],
    title: 'Engineer & Client Workflow Guide',
    docRef: 'docs/01_project/USER_ROLES.md #Engineer',
    answer:
      'In the **Engineer Portal**, clients and structural engineers can:\n1. Upload initial brief documentation, survey coordinates, and zoning parameters.\n2. Receive live notifications when initial drafts and revised sheets are posted.\n3. Utilize in-browser pan/zoom vector inspection tools with 1:1 scale accuracy.\n4. Apply revision callout pins directly onto sheets.\n5. Issue final digital approvals to unlock production-ready DWG/PDF release packages.',
  },
  {
    keywords: ['draughtsman role', 'how do draughtsmen use', 'draughtsman portal', 'receive assignments'],
    title: 'Draughtsman Portal Guide',
    docRef: 'docs/01_project/USER_ROLES.md #Draughtsman',
    answer:
      'In the **Draughtsman Portal**, drafting professionals can:\n1. Browse dispatched assignments matched to their specific discipline (Architectural, Structural, MEP).\n2. Review project deadlines, briefing sheets, and reference files before accepting.\n3. Upload DWG, DXF, or PDF deliverables directly with automatic layer validation.\n4. View interactive client redline pins and mark each item as resolved.\n5. Build a verified portfolio record upon client milestone sign-off.',
  },
  {
    keywords: ['student role', 'student portal', 'training modules', 'cad practicum', 'mock projects'],
    title: 'Student & Trainee Practicum Modules',
    docRef: 'docs/01_project/STUDENT_PORTAL.md',
    answer:
      'The **Student Portal** offers hands-on architectural CAD training:\n\n- **Structured Practicums**: Practice residential plan drafting, stair detailing, structural framing, and elevation rendering.\n- **Sample CAD Blueprints**: Download industry-standard reference DWG drawings and study title blocks.\n- **Mentor Review**: Submit assignments to receive redline feedback from experienced Draughtsman Studio mentors.\n- **Digital Credentials**: Pass practicum milestones to receive a cryptographically verifiable certificate accessible on [#verify](#verify).',
  },
  {
    keywords: ['admin role', 'admin portal', 'dispatch', 'assign project', 'capacity management'],
    title: 'Studio Administration & Dispatch Policies',
    docRef: 'docs/01_project/ADMIN_WORKFLOW.md',
    answer:
      'In the **Studio Admin Portal**, studio managers:\n1. Triage new client briefs within 24 hours of submission.\n2. Balance draughtsman workloads across Architectural, Structural, and MEP disciplines.\n3. Monitor milestone escrow releases and project deadlines.\n4. Issue official verifiable student certificates.\n5. Maintain immutable system audit logs for compliance.',
  },

  // ─── 6. MULTI-PLATFORM DOWNLOAD CENTER & AVAILABILITY ───
  {
    keywords: ['download', 'where can i download', 'get app', 'get archidraft', 'download center', 'install archidraft'],
    title: 'Archi Draft Multi-Platform Download Center',
    docRef: 'Official Download Center (#download)',
    answer:
      'You can access the official **Archi Draft Multi-Platform Download Center** directly at [#download](#download).\n\n**Current Platform Statuses:**\n- **Android**: Closed Private Beta (v1.0.0 Build 1). Google Play Store compliance review is underway. Request an invite to our Internal Testing track.\n- **Windows Desktop**: Active development (.msi / .exe packaging with direct GPU DirectX 11 pipeline targeted for early 2027). Waitlist open.\n- **Web Workstation**: Staging preview running WebAssembly & WebGL CanvasKit in modern desktop browsers.\n- **iOS & iPadOS**: TestFlight pipeline planned following Android general availability.\n\nVisit [#download](#download) to reserve beta access or join official waitlists.',
  },
  {
    keywords: ['install on android', 'how to install on android', 'android apk', 'play store', 'google play', 'android download'],
    title: 'Android App Installation & Testing Track Status',
    docRef: 'download.config.js #Android',
    answer:
      '**Archi Draft for Android** (Package: `com.draughtsmanstudio.archi_draft`, v1.0.0 Build 1) is currently distributed via Google Play Console Closed Testing.\n\nTo install the app on your Android device:\n1. Head to [#download](#download) and submit your Google Play account email under "Request Beta Access".\n2. You will receive an invitation link to the **Google Play Internal Testing Track**.\n3. Accept the invitation to download and receive automatic OTA updates directly from Google Play.\n\n*Security Note: Draughtsman Studio does not distribute unsigned APKs through third-party mirrors.*',
  },
  {
    keywords: ['windows', 'is archi draft available for windows', 'windows download', 'pc', 'desktop', 'windows app'],
    title: 'Windows Desktop Release Roadmap',
    docRef: 'docs/04_development/TECH_STACK.md #Windows',
    answer:
      '**Archi Draft Windows Desktop** is currently in active development. As detailed in our technical stack, the mobile Android client was completed first, and the Windows desktop client (.msi / Inno Setup installer) is scheduled next.\n\nThe desktop release will feature multi-monitor CAD drafting, native DirectX 11 GPU acceleration, and hardware digitizer stylus support. Join the official Windows waitlist at [#download](#download) to receive early beta builds.',
  },
  {
    keywords: ['system requirements', 'requirements', 'specs', 'minimum requirements', 'hardware specs', 'pc requirements'],
    title: 'Hardware & System Requirements',
    docRef: 'download.config.js #Requirements',
    answer:
      '**Hardware & System Requirements:**\n\n- **Android Mobile**: Android 8.0 (API 26) or higher, 2GB RAM minimum (4GB recommended for multi-sheet DWG plotting), 150MB storage.\n- **Windows Desktop (Upcoming)**: Windows 10/11 64-bit, Intel Core i5 / AMD Ryzen 5, 8GB RAM, DirectX 11 GPU, 500MB free SSD space.\n- **Web Workstation**: Modern desktop browser (Google Chrome 110+, Microsoft Edge 110+, Firefox 115+, Safari 16+) with WebGL 2.0 and hardware acceleration enabled.',
  },
  {
    keywords: ['updates', 'how do i update', 'new version', 'upgrade app', 'app update'],
    title: 'Application Updates & Release Tracking',
    docRef: 'download.config.js #Updates',
    answer:
      'Once officially listed on Google Play, Android updates will install automatically. Beta testers currently receive over-the-air (OTA) updates through the Google Play Internal Test channel.\n\nYou can verify your installed version number under `Settings > About Archi Draft` against the official release log published at [#download](#download).',
  },
  {
    keywords: ['download unavailable', 'why is my download unavailable', 'unavailable', 'cant download', 'download problem'],
    title: 'Download Availability & Security Policy',
    docRef: 'download.config.js #Security',
    answer:
      'Draughtsman Studio maintains strict software integrity standards: we **never publish placeholder download buttons, third-party mirrors, or unverified binaries**.\n\nIf a platform is listed as "Private Beta" or "In Development", it means code-signing or store review is underway. Request verified beta access at [#download](#download) or email beta@draughtsmanstudio.com.',
  },

  // ─── 7. SECURITY, PRIVACY & CLIENT CONFIDENTIALITY ───
  {
    keywords: ['security', 'privacy', 'gdpr', 'data', 'safe', 'confidentiality', 'protect drawings', 'data isolation'],
    title: 'Data Security & Intellectual Property Protection',
    docRef: 'docs/03_security/SECURITY_ARCHITECTURE.md',
    answer:
      'All architectural drawings, site surveys, and project specifications submitted through Draughtsman Studio and Archi Draft are safeguarded by enterprise-grade protections:\n\n- **Encrypted Storage**: AES-256 encryption at rest and TLS 1.3 encryption in transit.\n- **Data Isolation**: Strict multi-tenant Firestore security rules prevent cross-client drawing visibility.\n- **Exclusive Client Ownership**: Intellectual property of approved drawings belongs solely to the client.\n- **AI Isolation**: PIXMINT BOT never exposes confidential drawing files or proprietary client data to external models or other users.',
  },
  {
    keywords: ['audit', 'logs', 'activity log', 'history', 'timestamp', 'audit trail'],
    title: 'System Audit Logs & Cryptographic Immutability',
    docRef: 'docs/03_security/SECURITY_ARCHITECTURE.md #Audit',
    answer:
      'Every state transition across the 9-stage lifecycle generates an immutable, append-only audit event tagged with an SHA-256 cryptographic hash, authenticated user ID, and timestamp.\n\nThis guarantees a tamper-evident chain of custody from initial brief creation to final drawing approval.',
  },

  // ─── 8. SERVICES, PRICING & CONTACT ───
  {
    keywords: ['services', 'architectural services', 'what do you do', 'interior design', '3d visualization', 'commercial design', 'residential'],
    title: 'Architectural & Engineering Services',
    docRef: 'Draughtsman Studio Services',
    answer:
      'Draughtsman Studio provides end-to-end architectural and drafting solutions:\n\n1. **Luxury Residential Architecture**: Bespoke villas, sustainable residences, and contemporary estates.\n2. **Commercial & Workplace Design**: Corporate offices, retail spaces, and mixed-use commercial developments.\n3. **3D Architectural Visualization**: Photorealistic CGI renderings, interior fly-throughs, and exterior cinematic walkthroughs.\n4. **Structural & MEP CAD Drafting**: Municipal permit drawings, structural framing plans, and mechanical layouts.\n5. **BIM Model Coordination**: Multi-disciplinary clash detection and Revit coordination.',
  },
  {
    keywords: ['contact', 'email', 'phone', 'consultation', 'inquiry', 'schedule', 'book', 'location', 'reach us'],
    title: 'Studio Consultations & Contact Information',
    docRef: 'Draughtsman Studio Contact',
    answer:
      'We welcome architectural inquiries and project partnerships:\n\n- **Email**: contact@draughtsmanstudio.com\n- **Phone**: +91 91765 61515\n- **Consultations**: Scheduled via appointment for residential, commercial, or structural drafting commissions.\n- **Online Inquiry**: Submit a project brief directly through our website contact portal or via Archi Draft (#archi-draft).',
  },
  {
    keywords: ['pricing', 'cost', 'quotation', 'fees', 'estimate', 'how much'],
    title: 'Project Pricing & Quotation Policy',
    docRef: 'docs/01_project/COMMERCIAL_TERMS.md',
    answer:
      'Architectural drafting and design fees are tailored to project typology, square footage, structural complexity, and required deliverable stages.\n\n- **Residential & Commercial**: Fixed milestone-based schedules (Advance, Preliminary Layout, Detailed Working Drawings, Completion).\n- **Consultation Estimates**: Share your project location and brief with us at contact@draughtsmanstudio.com for a detailed scope and fee estimate within 48 business hours.',
  },
  {
    keywords: ['portfolio', 'projects', 'completed work', 'residential projects', 'commercial projects', 'gallery'],
    title: 'Studio Portfolio & Featured Projects',
    docRef: 'Draughtsman Studio Portfolio',
    answer:
      'You can explore our featured architectural projects directly on the homepage:\n\n- **Villas & Luxury Residences**: Minimalist modern homes with seamless indoor-outdoor living.\n- **Commercial High-Rises**: Efficient structural layouts and modern glass facades.\n- **Interior Architecture**: Custom joinery, ambient lighting, and bespoke materiality.\n\nScroll to the **Projects** section on our main page to view high-resolution photography and design narratives.',
  },

  // ─── 9. STUDENT TRAINING, INTERNSHIPS & SYLLABUS ───
  {
    keywords: ['internship', 'intern', 'eligibility', 'apply for internship', 'studio internship'],
    title: 'Architectural & CAD Internship Programs',
    docRef: 'docs/01_project/STUDENT_PORTAL.md #Internships',
    answer:
      'Draughtsman Studio offers selective internships for architecture and civil engineering students:\n\n- **Eligibility**: Open to 3rd, 4th, or final-year B.Arch, D.Arch, or B.Tech/Civil students with working knowledge of AutoCAD.\n- **Hands-on Exposure**: Work directly on real-world drafting packages, municipal submission sheets, and BIM coordination under senior mentors.\n- **Verification**: Interns receive an authenticated credential with verifiable hours accessible at [#verify](#verify).\n- **Applications**: Send your portfolio and resume to careers@draughtsmanstudio.com.',
  },
  {
    keywords: ['software covered', 'autocad', 'revit', 'sketchup', 'cad software', 'training tools'],
    title: 'Training Software & Technical Tools Covered',
    docRef: 'docs/01_project/STUDENT_PORTAL.md #Curriculum',
    answer:
      'Our architectural practicum covers core industry tools:\n\n- **AutoCAD 2D**: Precision orthographic drafting, dynamic blocks, layer management, and A0-A4 sheet layouts.\n- **Autodesk Revit**: Parametric 3D BIM modeling, schedules, and structural coordination.\n- **SketchUp & Lumion/V-Ray**: Spatial conceptualization, realistic texturing, and client rendering.\n- **Archi Draft**: Digital redline resolution and professional cloud revision workflows.',
  },
];

/**
 * Normalizes query string for matching
 */
function cleanQuery(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Resolves a prompt using local grounded knowledge or remote worker API
 */
export async function queryPixmintBot({ prompt, role = 'guest', _history = [] }) {
  const workerApiUrl = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env.VITE_PIXMINT_BOT_API : undefined;

  // 1. Try remote Cloudflare Worker if configured
  if (workerApiUrl) {
    try {
      const response = await fetch(`${workerApiUrl}/api/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'web_' + (window.sessionStorage.getItem('pixmint_session_id') || 'guest'),
          message: prompt,
          role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          answer: data.content || data.reply,
          sources: data.sources || [{ title: 'Archi Draft Worker API', docRef: 'Live Cloudflare Service' }],
          isLiveModel: true,
        };
      }
    } catch (err) {
      console.warn('PIXMINT BOT remote worker unreachable, falling back to local grounded knowledge:', err);
    }
  }

  // 2. Local Grounded Knowledge Engine Fallback
  const cleaned = cleanQuery(prompt);

  // Greeting check
  if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|start|namaste)\b/.test(cleaned)) {
    const roleGreeting = {
      guest: "Hello! I am **PIXMINT BOT**, your intelligent companion for **Draughtsman Studio** and the **Archi Draft** platform.\n\nI can assist you with architectural services, downloads, project lifecycles, and certificate verification. What would you like to explore today?",
      engineer: "Greetings, Engineer! I am **PIXMINT BOT**.\n\nI can assist you with project brief submissions, in-app redline tools, revision limits, drawing scale standards, and final milestone sign-offs. How can I support your project?",
      draughtsman: "Hello, Draughtsman! **PIXMINT BOT** standing by.\n\nNeed guidance on accepting assignments, supported CAD formats (DWG/DXF/PDF), resolving client redlines, or managing your active workload? Let me know!",
      student: "Welcome, Student! **PIXMINT BOT** is here to support your architectural drafting practicum.\n\nAsk me about training modules, drawing submissions, mentor redline feedback, or verifying your digital completion certificate.",
      admin: "Studio Admin session active. **PIXMINT BOT** ready to assist with project dispatch policies, draughtsman capacity management, escrow milestones, and immutable audit logs.",
    }[role] || "Hello! How can I assist you with Draughtsman Studio and the Archi Draft platform today?";

    return {
      answer: roleGreeting,
      sources: [{ title: 'PIXMINT BOT Official Guide', docRef: 'docs/01_project/USER_ROLES.md' }],
      isLiveModel: false,
    };
  }

  // Security guardrails check
  if (/(hack|bypass|drop table|delete project|steal|reveal password|admin secret|modify role|sql injection|ignore previous)/i.test(cleaned)) {
    return {
      answer: "I cannot perform or discuss unauthorized security actions. **PIXMINT BOT** operates strictly within authorized architectural guidance protocols and immutable Role-Based Access Control (RBAC) boundaries.",
      sources: [{ title: 'Security Architecture', docRef: 'docs/03_security/SECURITY_ARCHITECTURE.md' }],
      isLiveModel: false,
    };
  }

  // Score matching against knowledge base
  let bestMatch = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      const cleanKw = cleanQuery(kw);
      if (cleaned.includes(cleanKw)) {
        score += cleanKw.length * 2;
      } else {
        // Word-level partial match
        const kwWords = cleanKw.split(' ');
        const matchingWords = kwWords.filter(w => w.length > 2 && cleaned.includes(w));
        if (matchingWords.length > 0 && matchingWords.length === kwWords.length) {
          score += cleanKw.length;
        } else if (matchingWords.length >= 2) {
          score += matchingWords.length * 4;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 4) {
    return {
      answer: bestMatch.answer,
      sources: [{ title: bestMatch.title, docRef: bestMatch.docRef }],
      isLiveModel: false,
    };
  }

  // General fallback with helpful contextual routing
  return {
    answer: `I am grounded in official **Draughtsman Studio** and **Archi Draft** documentation.\n\nI can answer questions regarding:\n- **Archi Draft Platform**: 9-stage workflow, 3-round revision limit, in-app redlines\n- **Downloads**: Android Beta testing track, Windows Desktop roadmap ([#download](#download))\n- **Credential Verification**: Instant validation of student & trainee certificates ([#verify](#verify))\n- **CAD Specifications**: DWG, DXF, IFC, and vector PDF standards\n- **Studio Services**: Luxury residential, commercial architecture, and 3D visualization\n\nTry selecting one of the suggested questions above, or reach our team directly at **contact@draughtsmanstudio.com**.`,
    sources: [{ title: 'Platform Knowledge Base', docRef: 'docs/08_legal_privacy/FAQ_CONTENT.md' }],
    isLiveModel: false,
  };
}
