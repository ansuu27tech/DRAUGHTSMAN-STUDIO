import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Monitor,
  Globe,
  Apple,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowLeft,
  X,
  Send,
  Lock,
  Layers,
  FileCheck
} from 'lucide-react';
import {
  RELEASE_METADATA,
  PLATFORM_DOWNLOADS,
  DOWNLOAD_SECURITY_PILLARS,
} from './download.config';
import './ArchiDraftDownload.css';

const ICON_MAP = {
  Smartphone,
  Monitor,
  Globe,
  Apple,
  Terminal,
};

export default function ArchiDraftDownload({ isStandalone = false, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'mobile' | 'desktop' | 'web'
  const [expandedGuidance, setExpandedGuidance] = useState({}); // { [platformId]: boolean }
  const [modalPlatform, setModalPlatform] = useState(null); // platform object when waitlist modal is open
  const [copiedHash, setCopiedHash] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'client', notes: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalPlatform) {
        setModalPlatform(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalPlatform]);

  const toggleGuidance = (id) => {
    setExpandedGuidance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyChecksum = (hash, id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(hash);
      setCopiedHash(id);
      setTimeout(() => setCopiedHash(null), 2500);
    }
  };


  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    // Record submission into session storage for persistence during demo
    try {
      const waitlist = JSON.parse(sessionStorage.getItem('archidraft_beta_waitlist') || '[]');
      waitlist.push({
        platform: modalPlatform?.name || 'General',
        ...formData,
        timestamp: new Date().toISOString(),
      });
      sessionStorage.setItem('archidraft_beta_waitlist', JSON.stringify(waitlist));
    } catch {
      // Storage fallback
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setModalPlatform(null);
      setFormData({ name: '', email: '', role: 'client', notes: '' });
    }, 2800);
  };

  const filteredPlatforms = PLATFORM_DOWNLOADS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section
      className={`ad-download-root ${isStandalone ? 'ad-download-root--standalone' : ''}`}
      id="ad-download"
      aria-label="Archi Draft Multi-Platform Download Center"
    >
      <div className="ad-download-bg-grid" aria-hidden="true" />
      <div className="ad-download-radial-glow" aria-hidden="true" />

      <div className="ad-download-container">
        {/* Navigation Bar & Telemetry Status */}
        <div className="ad-download-nav-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="ad-download-back-btn"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('home');
                } else if (window.location.pathname !== '/' && window.location.pathname !== '') {
                  window.history.pushState(null, '', '/');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                } else {
                  window.location.hash = '';
                }
              }}
              aria-label="Return to Draughtsman Studio Homepage"
            >
              <ArrowLeft size={14} />
              <span>RETURN TO STUDIO</span>
            </button>
            {isStandalone && (
              <button
                type="button"
                className="ad-download-back-btn"
                style={{ opacity: 0.85 }}
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('archi-draft');
                  } else {
                    window.location.hash = 'archi-draft';
                  }
                }}
                aria-label="Return to Archi Draft Product Overview"
              >
                <span>Product Overview</span>
              </button>
            )}
          </div>

          <div className="ad-download-audit-badge">
            <span className="ad-live-dot" aria-hidden="true" />
            <span>Official Build Registry // v{RELEASE_METADATA.currentVersion} (Build {RELEASE_METADATA.buildNumber})</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="ad-download-hero">
          <div className="ad-download-eyebrow">
            <span>OFFICIAL DISTRIBUTION GATEWAY</span>
            <span>//</span>
            <span>MULTI-PLATFORM ECOSYSTEM</span>
          </div>

          <h1 className="ad-download-title">
            ARCHI DRAFT — YOUR WORKSPACE, EVERYWHERE.
          </h1>

          <p className="ad-download-lead">
            Discover the Archi Draft architectural platform and access your technical drawing lifecycle from supported devices. Review revisions, verify CAD sheets, and coordinate with studio draughtsmen.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="ad-download-filters-bar" role="tablist" aria-label="Filter platforms">
          {[
            { id: 'all', label: 'All Platforms (5)' },
            { id: 'mobile', label: 'Mobile (Android & iOS)' },
            { id: 'desktop', label: 'Desktop (Windows & macOS)' },
            { id: 'web', label: 'Web Workstation' },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeCategory === tab.id}
              className={`ad-filter-btn ${activeCategory === tab.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Supported Platform Cards Grid */}
        <div className="ad-platform-cards-grid">
          {filteredPlatforms.map((platform) => {
            const Icon = ICON_MAP[platform.iconName] || Smartphone;
            const isExpanded = !!expandedGuidance[platform.id];

            return (
              <motion.article
                key={platform.id}
                className={`ad-platform-card ${platform.id === 'android' ? 'ad-platform-card--featured' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="ad-card-header">
                  <div className="ad-platform-icon-wrap" aria-hidden="true">
                    <Icon size={24} />
                  </div>

                  <span className={`ad-status-pill ad-status-pill--${platform.availabilityBadgeColor}`}>
                    {platform.availabilityLabel}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="ad-card-platform-name">{platform.name}</h3>
                <p className="ad-card-tagline">{platform.tagline}</p>

                {/* Metadata List */}
                <div className="ad-card-meta-list">
                  <div className="ad-meta-row">
                    <span className="ad-meta-label">Version</span>
                    <span className="ad-meta-value">{platform.version}</span>
                  </div>
                  <div className="ad-meta-row">
                    <span className="ad-meta-label">Architecture</span>
                    <span className="ad-meta-value">{platform.architecture}</span>
                  </div>
                  <div className="ad-meta-row">
                    <span className="ad-meta-label">Identifier</span>
                    <span className="ad-meta-value ad-meta-value--identifier">
                      {platform.packageIdentifier}
                    </span>
                  </div>
                </div>

                {/* Status Notice */}
                {platform.id === 'android' && (
                  <div className="ad-card-status-notice">
                    <strong>Distribution Status:</strong> Internal QA Beta build. Google Play Store listing is undergoing review. Closed internal test track APKs are available for vetted testers.
                  </div>
                )}

                {platform.id === 'windows' && (
                  <div className="ad-card-status-notice">
                    <strong>Desktop Architecture:</strong> Packaging pipeline for x64 Windows installer (.msi / .exe via Inno Setup) is in active development. Authentic code signing will be applied prior to public release.
                  </div>
                )}

                {platform.id === 'web' && (
                  <div className="ad-card-status-notice">
                    <strong>Browser Engine:</strong> Running in private staging preview with WebAssembly & WebGL acceleration. Zero local installation required.
                  </div>
                )}

                {platform.id === 'ios' && (
                  <div className="ad-card-status-notice">
                    <strong>Apple Pipeline:</strong> iOS & iPadOS target configured in Flutter repository. Awaiting Apple Developer Program TestFlight rollout.
                  </div>
                )}

                {platform.id === 'macos' && (
                  <div className="ad-card-status-notice">
                    <strong>macOS Roadmap:</strong> Universal binary compilation scheduled following the Windows desktop release cycle.
                  </div>
                )}

                {/* Action Buttons — Honest & Direct */}
                <div className="ad-card-actions">
                  {platform.id === 'android' && (
                    <>
                      <button
                        className="ad-primary-action-btn"
                        onClick={() => setModalPlatform(platform)}
                        aria-label="Request Android Beta Access"
                      >
                        <Download size={16} />
                        <span>Request Beta APK Access</span>
                      </button>

                      <button
                        className="ad-disabled-action-btn"
                        disabled
                        title="Google Play Store review is currently in progress."
                        aria-disabled="true"
                      >
                        <ExternalLink size={14} />
                        <span>Google Play Store (Review Pending)</span>
                      </button>
                    </>
                  )}

                  {platform.id === 'windows' && (
                    <>
                      <button
                        className="ad-primary-action-btn"
                        onClick={() => setModalPlatform(platform)}
                        aria-label="Join Windows Desktop Waitlist"
                      >
                        <Monitor size={16} />
                        <span>Join Windows Waitlist</span>
                      </button>

                      <button
                        className="ad-disabled-action-btn"
                        disabled
                        title="Desktop installer is currently in development."
                        aria-disabled="true"
                      >
                        <span>Installer .exe / .msi (In Development)</span>
                      </button>
                    </>
                  )}

                  {platform.id === 'web' && (
                    <button
                      className="ad-secondary-action-btn"
                      onClick={() => {
                        const el = document.getElementById('ad-interface');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          if (onNavigate) onNavigate('archi-draft');
                          else window.location.hash = 'archi-draft';
                          setTimeout(() => {
                            document.getElementById('ad-interface')?.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }
                      }}
                      aria-label="Explore Web Workstation Interface"
                    >
                      <Layers size={15} />
                      <span>Explore Workstation Interface</span>
                    </button>
                  )}

                  {platform.id === 'ios' && (
                    <button
                      className="ad-secondary-action-btn"
                      onClick={() => setModalPlatform(platform)}
                      aria-label="Join Apple TestFlight Waitlist"
                    >
                      <Apple size={15} />
                      <span>Join TestFlight Waitlist</span>
                    </button>
                  )}

                  {platform.id === 'macos' && (
                    <button
                      className="ad-disabled-action-btn"
                      disabled
                      aria-disabled="true"
                    >
                      <Terminal size={14} />
                      <span>Roadmap Target (2027)</span>
                    </button>
                  )}

                  {/* Expand Guidance Button */}
                  <button
                    className="ad-guidance-toggle-btn"
                    onClick={() => toggleGuidance(platform.id)}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Hide Specs & Guide' : 'System Specs & Guide'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                {/* Expandable Drawer: System Specs & Step-by-Step Guide */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="ad-card-drawer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Requirements */}
                      <div className="ad-drawer-section-title">
                        <FileCheck size={14} />
                        <span>System Requirements</span>
                      </div>
                      <div className="ad-req-list">
                        <div className="ad-req-item">
                          <strong>Operating System:</strong> {platform.systemRequirements.minOS}
                        </div>
                        {platform.systemRequirements.ram && (
                          <div className="ad-req-item">
                            <strong>Memory (RAM):</strong> {platform.systemRequirements.ram}
                          </div>
                        )}
                        {platform.systemRequirements.storage && (
                          <div className="ad-req-item">
                            <strong>Local Storage:</strong> {platform.systemRequirements.storage}
                          </div>
                        )}
                        {platform.systemRequirements.permissions && (
                          <div className="ad-req-item">
                            <strong>Permissions:</strong> {platform.systemRequirements.permissions}
                          </div>
                        )}
                      </div>

                      {/* Installation Guide */}
                      {platform.installationGuide && platform.installationGuide.length > 0 && (
                        <>
                          <div className="ad-drawer-section-title" style={{ marginTop: '1rem' }}>
                            <Clock size={14} />
                            <span>Installation Guidance</span>
                          </div>
                          <div className="ad-step-list">
                            {platform.installationGuide.map((step) => (
                              <div key={step.step} className="ad-step-item">
                                <div className="ad-step-num">{step.step}</div>
                                <div className="ad-step-content">
                                  <h5>{step.title}</h5>
                                  <p>{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* SHA-256 Checksum Info for Android / Windows */}
                      {platform.directApkStatus?.checksum ? (
                        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <small style={{ fontFamily: 'var(--ad-font-mono)', fontSize: '0.65rem', color: '#7A7870', textTransform: 'uppercase' }}>
                            Authoritative Release Checksum (SHA-256)
                          </small>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
                            <code style={{ fontSize: '0.65rem', color: '#C5A059', wordBreak: 'break-all', background: 'rgba(0,0,0,0.5)', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>
                              {platform.directApkStatus.checksum.slice(0, 32)}...
                            </code>
                            <button
                              onClick={() => copyChecksum(platform.directApkStatus.checksum, platform.id)}
                              style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '0.3rem' }}
                              title="Copy SHA-256 Checksum"
                              aria-label="Copy SHA-256 Checksum"
                            >
                              {copiedHash === platform.id ? <Check size={14} color="#C5A059" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      ) : platform.directApkStatus?.checksumStatus === 'pending_release' ? (
                        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <small style={{ fontFamily: 'var(--ad-font-mono)', fontSize: '0.65rem', color: '#7A7870', textTransform: 'uppercase' }}>
                            Binary Checksum (SHA-256)
                          </small>
                          <div style={{ marginTop: '0.35rem', fontSize: '0.7rem', color: '#9E9C94', fontStyle: 'italic' }}>
                            {platform.directApkStatus.checksumNote || 'Pending official release build tagging.'}
                          </div>
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* Security & Integrity Architecture Section */}
        <div className="ad-download-security-section">
          <div className="ad-security-header">
            <h2 className="ad-security-title">Distribution Security & Integrity</h2>
            <p className="ad-security-lead">
              Architectural blueprints contain sensitive structural and client data. We enforce strict cryptographic provenance across all distribution endpoints.
            </p>
          </div>

          <div className="ad-security-pillars-grid">
            {DOWNLOAD_SECURITY_PILLARS.map((pillar, idx) => (
              <div key={idx} className="ad-pillar-card">
                <div className="ad-pillar-icon" aria-hidden="true">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="ad-pillar-title">{pillar.title}</h4>
                <p className="ad-pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beta Access & Preview Waitlist Modal */}
      <AnimatePresence>
        {modalPlatform && (
          <div className="ad-modal-backdrop" onClick={() => setModalPlatform(null)}>
            <motion.div
              className="ad-modal-dialog"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
            >
              <button
                className="ad-modal-close-btn"
                onClick={() => setModalPlatform(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span className="ad-status-pill ad-status-pill--accent">AUTHORIZED BETA PROGRAM</span>
              </div>

              <h3 className="ad-modal-title">
                {modalPlatform.name} — Early Access
              </h3>

              <p className="ad-modal-desc">
                Submit your credentials to receive an invitation to the official Draughtsman Studio closed testing track.
              </p>

              {formSubmitted ? (
                <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--color-accent, #C5A059)' }}>
                  <CheckCircle2 size={42} style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ color: '#FFF', marginBottom: '0.5rem' }}>Invitation Request Received</h4>
                  <p style={{ fontSize: '0.85rem', color: '#A09E96', lineHeight: 1.5 }}>
                    Your request has been logged. Our engineering dispatch team will verify your role and transmit an authorized build link to <strong>{formData.email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit}>
                  <div className="ad-form-field">
                    <label className="ad-form-label" htmlFor="beta-name">Your Full Name</label>
                    <input
                      id="beta-name"
                      type="text"
                      required
                      placeholder="e.g. Ar. Rajesh Kumar"
                      className="ad-form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="ad-form-field">
                    <label className="ad-form-label" htmlFor="beta-email">Work / Studio Email</label>
                    <input
                      id="beta-email"
                      type="email"
                      required
                      placeholder="name@studio.com"
                      className="ad-form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="ad-form-field">
                    <label className="ad-form-label" htmlFor="beta-role">Ecosystem Role</label>
                    <select
                      id="beta-role"
                      className="ad-form-select"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="client">Client / Project Engineer (Approvals & Redlines)</option>
                      <option value="draughtsman">Architectural Draughtsman (DWG Production)</option>
                      <option value="student">Student / Apprentice Guild (Training)</option>
                      <option value="admin">Studio Administrator</option>
                    </select>
                  </div>

                  <div className="ad-form-field">
                    <label className="ad-form-label" htmlFor="beta-device">Device Model / OS Version</label>
                    <input
                      id="beta-device"
                      type="text"
                      placeholder="e.g. Samsung Galaxy Tab S9 (Android 14) / ThinkPad X1 (Win 11)"
                      className="ad-form-input"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="ad-modal-submit-btn">
                    <Send size={15} style={{ display: 'inline', marginRight: '6px' }} />
                    <span>Submit Beta Request</span>
                  </button>

                  <p style={{ fontSize: '0.7rem', color: '#6A6860', textAlign: 'center', marginTop: '1rem', lineHeight: 1.4 }}>
                    By submitting, you agree to report software issues directly to support@draughtsmanstudio.com under confidentiality.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
