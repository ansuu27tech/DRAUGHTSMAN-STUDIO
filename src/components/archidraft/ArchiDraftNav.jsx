import React, { useState } from 'react';
import { NAV_ITEMS } from './archidraft.config';

const ArchiDraftNav = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
    <nav className="ad-nav" role="navigation" aria-label="Archi Draft Navigation">
      <div className="ad-nav-inner">
        {/* Brand */}
        <button
          className="ad-nav-brand"
          onClick={() => scrollToSection('ad-hero')}
          aria-label="Archi Draft Home"
        >
          <div className="ad-nav-brand-icon" aria-hidden="true">AD</div>
          <span className="ad-nav-brand-text">Archi Draft</span>
        </button>

        {/* Desktop links */}
        <ul className={`ad-nav-links${menuOpen ? ' ad-nav-open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                className="ad-nav-link-btn"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <button className="ad-nav-back" onClick={goHome}>
              ← Studio
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="ad-nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default ArchiDraftNav;
