import React, { useEffect } from 'react';
import { ArrowLeft, Shield, FileText, UserX, Award, Bot, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import { SUPPORT_EMAIL, STUDIO_WEBSITE } from './archidraft.config';

const LEGAL_DOCS = [
  {
    id: 'terms',
    title: 'Terms of Service',
    icon: FileText,
    summary: 'Governing the use of Draughtsman Studio services and the Archi Draft platform.',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: Shield,
    summary: 'How client information, project data, and cookies are collected, processed, and safeguarded.',
  },
  {
    id: 'deletion',
    title: 'Account & Data Deletion',
    icon: UserX,
    summary: 'User rights, project data retention schedules, and account erasure protocols.',
  },
  {
    id: 'verification-policy',
    title: 'Certificate Verification Policy',
    icon: Award,
    summary: 'Issuance, integrity verification, and revocation rules for digital credentials.',
  },
  {
    id: 'ai-disclaimer',
    title: 'AI Usage & PIXMINT BOT Disclaimer',
    icon: Bot,
    summary: 'Scope, limitations, and safety boundaries of built-in automated guidance.',
  },
  {
    id: 'ip-policy',
    title: 'Intellectual Property & Drawing Ownership',
    icon: Lock,
    summary: 'Copyright, ownership of submitted briefs, and final architectural drawing rights.',
  },
];

export default function ArchiDraftLegal({ currentView, onNavigate }) {
  const resolveDocId = (view) => {
    if (view === 'archi-draft-privacy' || view === 'privacy') return 'privacy';
    if (view === 'archi-draft-deletion' || view === 'deletion') return 'deletion';
    if (view === 'archi-draft-terms' || view === 'terms') return 'terms';
    if (view === 'archi-draft-verification-policy' || view === 'verification-policy') return 'verification-policy';
    if (view === 'archi-draft-ai-disclaimer' || view === 'ai-disclaimer') return 'ai-disclaimer';
    if (view === 'archi-draft-ip-policy' || view === 'ip-policy') return 'ip-policy';
    return 'terms';
  };

  const activeDoc = resolveDocId(currentView);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleSelectDoc = (docId) => {
    if (onNavigate) {
      onNavigate(`archi-draft-${docId}`);
    } else {
      window.history.pushState(null, '', `#archi-draft-${docId}`);
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  return (
    <div className="ad-legal-page" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg, #0B0D11)',
      color: 'var(--color-text-primary, #F8FAFC)',
      padding: '4rem 1.5rem 8rem',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Top Return Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1rem',
        }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate('home') : (window.location.hash = '#home')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#C6A969',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            <ArrowLeft size={16} />
            <span>RETURN TO STUDIO</span>
          </button>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'monospace' }}>
            GOVERNANCE & POLICY CENTER
          </span>
        </div>

        {/* Legal Review Warning Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          background: 'rgba(198, 169, 105, 0.08)',
          border: '1px solid rgba(198, 169, 105, 0.3)',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginBottom: '2.5rem',
          fontSize: '0.82rem',
          color: '#E2E8F0',
          lineHeight: 1.5,
        }}>
          <AlertTriangle size={18} style={{ color: '#C6A969', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: '#C6A969' }}>LEGAL NOTICE & COMPLIANCE POSTURE:</strong>
            {' '}The policies below are documented operational drafts reflecting the verified service workflows, role boundaries, and security architecture of Draughtsman Studio and the Archi Draft platform. Prior to commercial deployment, formal review and sign-off by qualified legal counsel is required. Draughtsman Studio does not assert unverified statutory certifications.
          </div>
        </div>

        {/* Tabbed Navigation + Content Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}>
          
          {/* Left Column: Document Switcher */}
          <div style={{
            background: '#14171D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: '#64748B',
              marginBottom: '0.5rem',
              paddingLeft: '0.5rem',
            }}>
              AVAILABLE POLICIES
            </div>

            {LEGAL_DOCS.map((doc) => {
              const IconComp = doc.icon;
              const isActive = activeDoc === doc.id;
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => handleSelectDoc(doc.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    border: isActive ? '1px solid #C6A969' : '1px solid transparent',
                    background: isActive ? 'rgba(198, 169, 105, 0.12)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <IconComp size={18} style={{ color: isActive ? '#C6A969' : '#64748B', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: isActive ? 700 : 500 }}>
                      {doc.title}
                    </div>
                  </div>
                </button>
              );
            })}

            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              fontSize: '0.75rem',
              color: '#64748B',
              paddingLeft: '0.5rem',
            }}>
              Direct inquiries to:{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: '#C6A969', textDecoration: 'none' }}>
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          {/* Right Column: Active Document Content */}
          <div style={{
            background: '#14171D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '2.5rem',
            minHeight: '500px',
            gridColumn: 'span 2',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '1rem',
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#C6A969', fontWeight: 700, letterSpacing: '2px' }}>
                  LEGAL INSTRUMENT
                </span>
                <h1 style={{
                  fontFamily: 'var(--font-heading, "Playfair Display", serif)',
                  fontSize: '2rem',
                  margin: '0.25rem 0 0 0',
                  color: '#FFFFFF',
                }}>
                  {LEGAL_DOCS.find((d) => d.id === activeDoc)?.title}
                </h1>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'monospace' }}>
                Effective: October 2026
              </span>
            </div>

            {/* DOCUMENT 1: TERMS OF SERVICE */}
            {activeDoc === 'terms' && (
              <div style={{ lineHeight: 1.7, fontSize: '0.92rem', color: '#CBD5E1' }}>
                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>1. Scope of Agreement</h2>
                <p>
                  These Terms of Service govern your access to and use of architectural services provided by <strong>Draughtsman Studio</strong> and the <strong>Archi Draft</strong> collaborative software platform (accessible via web, mobile, and authenticated application endpoints). By creating an account, commissioning drafting projects, or participating in the workflow, you agree to comply with these terms.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>2. User Roles & Account Responsibilities</h2>
                <p>
                  Archi Draft enforces strict Role-Based Access Control (RBAC). Users may register under authorized role profiles:
                </p>
                <ul style={{ paddingLeft: '1.25rem' }}>
                  <li><strong>Client / Engineer:</strong> Authorized to create projects, upload design briefs, inspect CAD submissions, request up to three (3) formal correction rounds, and provide final sign-off.</li>
                  <li><strong>Draughtsman:</strong> Independent or studio-affiliated drafting professional responsible for executing technical drawings to submitted specifications.</li>
                  <li><strong>Studio Admin:</strong> Manages assignment distribution, platform health, and system-wide verification registries.</li>
                  <li><strong>Student / Trainee:</strong> Accesses educational drafting modules and verifiable skills training.</li>
                </ul>
                <p>
                  Users are strictly responsible for maintaining credential secrecy. Any unauthorized activity under your credentials must be reported immediately to <code>{SUPPORT_EMAIL}</code>.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>3. Project Lifecycle & Milestone Sign-Off</h2>
                <p>
                  Every project progresses through Archi Draft's 9-stage state machine (CREATE → REVIEW → ASSIGN → ACCEPT → DRAFT → REVIEW → REFINE → APPROVE → COMPLETE). Final drawing approval by the Client/Engineer constitutes completion of the milestone. Revisions exceeding the 3-round standard require explicit written agreement.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>4. Service Availability & Limitations</h2>
                <p>
                  While Draughtsman Studio strives for continuous uptime, services are provided on an "as-is" basis. Scheduled maintenance, third-party network outages, and force majeure events may cause temporary unavailability. Draughtsman Studio disclaims liability for indirect, incidental, or consequential damages resulting from platform downtime.
                </p>
              </div>
            )}

            {/* DOCUMENT 2: PRIVACY POLICY */}
            {activeDoc === 'privacy' && (
              <div style={{ lineHeight: 1.7, fontSize: '0.92rem', color: '#CBD5E1' }}>
                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>1. Data Collection & Purpose</h2>
                <p>
                  Draughtsman Studio collects minimal information strictly necessary to provide architectural drafting and project management services:
                </p>
                <ul style={{ paddingLeft: '1.25rem' }}>
                  <li><strong>Account Identity:</strong> Full name, professional title, email address, phone number, and authenticated role profile.</li>
                  <li><strong>Project Content:</strong> Site plans, brief specifications, CAD files (DWG, DXF, PDF), redline annotations, and revision history.</li>
                  <li><strong>Technical Telemetry:</strong> Anonymized session logs, browser user-agent, and error reports for service reliability.</li>
                </ul>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>2. Data Isolation & Confidentiality</h2>
                <p>
                  All project files are segregated in role-protected cloud storage. Draughtsmen can only view projects explicitly assigned to them by studio administration. Clients cannot view other clients' projects. We do not sell, rent, or monetize client project information to third parties.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>3. Cookie & Local Storage Usage</h2>
                <p>
                  We utilize essential browser local storage and session tokens strictly to preserve authentication state, theme preferences (light/dark), and PIXMINT BOT session persistence. No third-party behavioral tracking cookies are deployed without explicit consent.
                </p>
              </div>
            )}

            {/* DOCUMENT 3: ACCOUNT & DATA DELETION */}
            {activeDoc === 'deletion' && (
              <div style={{ lineHeight: 1.7, fontSize: '0.92rem', color: '#CBD5E1' }}>
                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>1. Right to Erasure</h2>
                <p>
                  In compliance with modern digital privacy frameworks, any registered user has the right to request the complete deletion of their account profile, personal contact records, and active credentials from our production databases.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>2. Deletion Protocol & Timeline</h2>
                <p>
                  To request complete erasure:
                </p>
                <ol style={{ paddingLeft: '1.25rem' }}>
                  <li>Send an email from your registered account address to <strong>{SUPPORT_EMAIL}</strong> with the subject line <code>Account Deletion Request</code>.</li>
                  <li>State your full name and registered phone number for identity validation.</li>
                  <li>Our compliance team will acknowledge receipt within 48 hours and process complete deletion within seven (7) business days.</li>
                </ol>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>3. Archival Exceptions</h2>
                <p>
                  Financial invoices, tax receipts, and completed contract deliverables are retained for statutory retention periods mandated by applicable commercial law.
                </p>
              </div>
            )}

            {/* DOCUMENT 4: CERTIFICATE VERIFICATION POLICY */}
            {activeDoc === 'verification-policy' && (
              <div style={{ lineHeight: 1.7, fontSize: '0.92rem', color: '#CBD5E1' }}>
                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>1. Authoritative Verification Standard</h2>
                <p>
                  Draughtsman Studio issues cryptographic digital certificates for student training completions and professional drafting accreditations. Every eligible credential contains a unique identifier registered in our server-authoritative database.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>2. Privacy in Verification</h2>
                <p>
                  Public verification is privacy-aware. Querying a certificate token displays only the verified title, issuing organization, issuance date, validity status, and truncated/authorized recipient name. Internal financial records, contact numbers, and confidential drawings are never disclosed via the public verification portal.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>3. Revocation & Expiration</h2>
                <p>
                  Draughtsman Studio reserves the sole authority to revoke credentials issued in error, superseded by newer standards, or compromised by academic misconduct.
                </p>
              </div>
            )}

            {/* DOCUMENT 5: AI USAGE DISCLAIMER */}
            {activeDoc === 'ai-disclaimer' && (
              <div style={{ lineHeight: 1.7, fontSize: '0.92rem', color: '#CBD5E1' }}>
                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>1. Nature of Automated Guidance</h2>
                <p>
                  <strong>PIXMINT BOT</strong> is an automated conversational assistant designed to help users navigate platform workflows, understand role expectations, and review architectural standards grounded in official studio documentation.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>2. Technical Boundaries & Professional Advice</h2>
                <p>
                  PIXMINT BOT does not perform structural calculations, statutory building approval reviews, or licensed engineering certifications. AI-provided guidance is informational only and does not supersede professional architectural advice provided by licensed practitioners.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>3. Data Isolation Guarantee</h2>
                <p>
                  PIXMINT BOT is strictly isolated from user project storage. It cannot access, read, or reveal private drawings or client briefs to other users.
                </p>
              </div>
            )}

            {/* DOCUMENT 6: IP & DRAWING OWNERSHIP */}
            {activeDoc === 'ip-policy' && (
              <div style={{ lineHeight: 1.7, fontSize: '0.92rem', color: '#CBD5E1' }}>
                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>1. Ownership of Client Inputs</h2>
                <p>
                  All initial sketches, surveys, site briefs, and reference materials uploaded by the Client/Engineer remain the exclusive intellectual property of the client.
                </p>

                <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginTop: '1.5rem' }}>2. Final Deliverables & Rights Transfer</h2>
                <p>
                  Upon full payment of agreed milestone fees, complete ownership and commercial usage rights for approved final architectural CAD drawings are transferred to the client. Draughtsman Studio retains non-exclusive portfolio display rights unless an NDA is executed.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
