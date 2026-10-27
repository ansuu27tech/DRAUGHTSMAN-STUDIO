import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from './archidraft.config';
import { ArrowLeft, Menu, X, ShieldCheck, Download } from 'lucide-react';
import ArchiDraftWordmark from './ArchiDraftWordmark';

const ArchiDraftNav = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 220) {
          setActiveSection(NAV_ITEMS[i].id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (id === 'ad-download') {
      if (onNavigate) {
        onNavigate('archi-draft-download');
      } else {
        window.location.hash = 'download';
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If currently on standalone download or legal page, transition back to archi-draft
      if (onNavigate) {
        onNavigate('archi-draft');
      } else {
        window.location.hash = 'archi-draft';
      }
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const goHome = () => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.hash = 'home';
    }
  };

  return (
    <nav
      className={`ad-nav ${scrolled ? 'ad-nav--scrolled' : ''}`}
      role="navigation"
      aria-label="Archi Draft Navigation"
    >
      <div className="ad-nav-inner">
        {/* Brand Brandmark & Wordmark */}
        <button
          className="ad-nav-brand"
          onClick={() => scrollToSection('ad-hero')}
          aria-label="Archi Draft Home"
        >
          <img
            src="/archidraft/logo-mark-white.png"
            alt="Archi Draft Mark"
            className="ad-nav-brand-mark-img"
          />
          <ArchiDraftWordmark variant="compact" />
        </button>

        {/* Desktop Navigation Links */}
        <div className="ad-nav-desktop-menu">
          <button className="ad-nav-back-btn" onClick={goHome}>
            <ArrowLeft size={13} />
            <span>Studio</span>
          </button>

          <div className="ad-nav-links-divider" />

          <ul className="ad-nav-links-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`ad-nav-link-btn ${isActive ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="ad-nav-links-divider" />

          <button
            className="ad-nav-verify-pill"
            style={{
              background: 'rgba(197, 160, 89, 0.15)',
              borderColor: 'var(--color-accent, #C5A059)',
              color: 'var(--color-accent, #C5A059)'
            }}
            onClick={() => onNavigate ? onNavigate('archi-draft-download') : (window.location.hash = 'download')}
            aria-label="Archi Draft Multi-Platform Download Center"
          >
            <Download size={13} />
            <span>Download</span>
          </button>

          <button
            className="ad-nav-verify-pill"
            onClick={() => onNavigate ? onNavigate('verify') : (window.location.hash = 'verify')}
            aria-label="Certificate Verification Portal"
          >
            <ShieldCheck size={13} />
            <span>Verify</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`ad-nav-toggle-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="ad-nav-mobile-drawer">
          <button className="ad-nav-mobile-back" onClick={goHome}>
            <ArrowLeft size={15} />
            <span>Return to Draughtsman Studio</span>
          </button>

          <div className="ad-nav-mobile-links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`ad-nav-mobile-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              className="ad-nav-mobile-item"
              style={{
                color: 'var(--color-accent, #C5A059)',
                borderBottom: '1px solid rgba(197, 160, 89, 0.2)'
              }}
              onClick={() => {
                setMenuOpen(false);
                if (onNavigate) onNavigate('archi-draft-download');
                else window.location.hash = 'download';
              }}
            >
              <Download size={16} />
              <span>Download Center (#download)</span>
            </button>
            <button
              className="ad-nav-mobile-item ad-nav-mobile-verify"
              onClick={() => {
                setMenuOpen(false);
                if (onNavigate) onNavigate('verify');
                else window.location.hash = 'verify';
              }}
            >
              <ShieldCheck size={16} />
              <span>Verify Certificate (#verify)</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ArchiDraftNav;
