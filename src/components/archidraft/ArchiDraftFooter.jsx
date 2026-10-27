import React from 'react';
import { NAV_ITEMS, SUPPORT_EMAIL } from './archidraft.config';
import { ShieldCheck, ArrowRight, ExternalLink, Shield, FileText, Award, Bot, UserX, Lock } from 'lucide-react';
import ArchiDraftWordmark from './ArchiDraftWordmark';

const LEGAL_LINKS = [
  { id: 'privacy', label: 'Privacy Policy', hash: 'privacy', icon: Shield },
  { id: 'terms', label: 'Terms of Service', hash: 'terms', icon: FileText },
  { id: 'deletion', label: 'Account & Data Erasure', hash: 'deletion', icon: UserX },
  { id: 'verification-policy', label: 'Certificate Verification Policy', hash: 'verification-policy', icon: Award },
  { id: 'ai-disclaimer', label: 'AI Usage & PIXMINT Disclaimer', hash: 'ai-disclaimer', icon: Bot },
  { id: 'ip-policy', label: 'Drawing IP & Copyright', hash: 'archi-draft-ip-policy', icon: Lock },
];

const PLATFORM_LINKS = [
  { label: 'Download Center', hash: 'download', badge: 'v1.0' },
  { label: 'Verify Certificate', hash: 'verify', badge: 'Verifiable' },
  { label: 'Studio Heritage', hash: 'ad-studio' },
  { label: 'Account Deletion Protocol', hash: 'deletion' },
];

const ArchiDraftFooter = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNavigate = (e, targetHash) => {
    // If it's an internal section anchor scroll
    if (targetHash.startsWith('ad-')) {
      e.preventDefault();
      const el = document.getElementById(targetHash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // Allow open in new tab
    e.preventDefault();

    if (onNavigate) {
      onNavigate(targetHash);
    } else if (targetHash === 'home' || targetHash === 'hero') {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        window.location.hash = '';
      }
    } else {
      window.location.assign('#' + targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="ad-footer" role="contentinfo" aria-label="Archi Draft Platform & Legal Information">
      <div className="ad-footer-inner">
        {/* Top Multi-Column Grid */}
        <div className="ad-footer-top">
          {/* Brand Column */}
          <div className="ad-footer-brand">
            <div className="ad-footer-brand-header">
              <img 
                src="/archidraft/logo-mark-white.png" 
                alt="Archi Draft Mark" 
                className="ad-footer-logo"
              />
              <div className="ad-footer-brand-titles">
                <ArchiDraftWordmark variant="compact" />
                <span className="ad-footer-byline">BY DRAUGHTSMAN STUDIO</span>
              </div>
            </div>

            <p className="ad-footer-brand-desc">
              Cryptographic architectural workflow & project lifecycle platform for the built world. Connecting structural engineers, studio administrators, and certified draughtsmen.
            </p>

            <div className="ad-footer-trust-pills">
              <span className="ad-trust-pill">
                <ShieldCheck size={12} className="ad-trust-icon" />
                <span>CRYPTOGRAPHIC AUDIT TRAIL</span>
              </span>
              <span className="ad-trust-pill">
                <Award size={12} className="ad-trust-icon" />
                <span>VERIFIABLE CREDENTIALS</span>
              </span>
            </div>

            <div className="ad-footer-lineage">
              <span>DRAUGHTSMAN STUDIO</span>
              <span className="ad-lineage-sub">CHENNAI, INDIA // EST. 2026</span>
            </div>
          </div>
          
          {/* Workflow & Sections Column */}
          <div className="ad-footer-col">
            <h4>Architecture</h4>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="ad-footer-link"
                    onClick={(e) => handleNavigate(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Platform Services Column */}
          <div className="ad-footer-col">
            <h4>Platform Services</h4>
            <ul>
              {PLATFORM_LINKS.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`#${link.hash}`}
                    className="ad-footer-link"
                    onClick={(e) => handleNavigate(e, link.hash)}
                  >
                    <span>{link.label}</span>
                    {link.badge && <span className="ad-link-badge">{link.badge}</span>}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="ad-footer-link">
                  <span>Direct Support Desk</span>
                  <ExternalLink size={11} style={{ opacity: 0.6 }} />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal & Compliance Column */}
          <div className="ad-footer-col">
            <h4>Legal & Policies</h4>
            <ul>
              {LEGAL_LINKS.map((doc) => {
                const IconComponent = doc.icon;
                return (
                  <li key={doc.id}>
                    <a
                      href={`#${doc.hash}`}
                      className="ad-footer-link ad-footer-link--legal"
                      onClick={(e) => handleNavigate(e, doc.hash)}
                    >
                      <IconComponent size={13} className="ad-legal-icon" />
                      <span>{doc.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Dedicated Horizontal Policy Strip */}
        <div className="ad-footer-legal-strip" aria-label="Legal & Governance Quick Links">
          <div className="ad-legal-strip-label">POLICIES & GOVERNANCE:</div>
          <div className="ad-legal-strip-links">
            <a href="#privacy" className="ad-strip-link" onClick={(e) => handleNavigate(e, 'privacy')}>Privacy Policy</a>
            <span className="ad-strip-sep" aria-hidden="true">•</span>
            <a href="#terms" className="ad-strip-link" onClick={(e) => handleNavigate(e, 'terms')}>Terms of Service</a>
            <span className="ad-strip-sep" aria-hidden="true">•</span>
            <a href="#verification-policy" className="ad-strip-link" onClick={(e) => handleNavigate(e, 'verification-policy')}>Certificate Policy</a>
            <span className="ad-strip-sep" aria-hidden="true">•</span>
            <a href="#ai-disclaimer" className="ad-strip-link" onClick={(e) => handleNavigate(e, 'ai-disclaimer')}>AI Guidance Disclaimer</a>
            <span className="ad-strip-sep" aria-hidden="true">•</span>
            <a href="#deletion" className="ad-strip-link" onClick={(e) => handleNavigate(e, 'deletion')}>Account Deletion</a>
            <span className="ad-strip-sep" aria-hidden="true">•</span>
            <a href="#legal" className="ad-strip-link ad-strip-link--accent" onClick={(e) => handleNavigate(e, 'legal')}>
              <span>Legal Center Hub</span>
              <ArrowRight size={11} />
            </a>
          </div>
        </div>
        
        {/* Bottom Copyright & Navigation Bar */}
        <div className="ad-footer-bottom">
          <div className="ad-footer-copy">
            &copy; {currentYear} Draughtsman Studio. All rights reserved. Registered architectural practice & software systems.
          </div>
          <a
            href="/"
            className="ad-footer-studio-link"
            onClick={(e) => handleNavigate(e, 'home')}
            aria-label="Return to Draughtsman Studio Homepage"
          >
            <span>RETURN TO DRAUGHTSMAN STUDIO</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default ArchiDraftFooter;
