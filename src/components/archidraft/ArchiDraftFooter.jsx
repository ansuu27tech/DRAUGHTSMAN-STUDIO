import React from 'react';
import { PLAY_STORE_URL, SUPPORT_EMAIL, LEGAL_PAGES } from './archidraft.config';

const ArchiDraftFooter = ({ onNavigate }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const goToLegal = (page) => {
    window.location.hash = page;
  };

  const goHome = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.hash = 'home';
    }
  };

  return (
    <footer className="ad-footer" role="contentinfo" aria-label="Archi Draft Footer">
      <div className="ad-footer-inner">
        {/* Top grid */}
        <div className="ad-footer-top">
          {/* Brand column */}
          <div className="ad-footer-brand">
            <h3>Archi Draft</h3>
            <p>By Draughtsman Studio</p>
            <p className="ad-footer-brand-desc">
              Professional architectural drafting tools — designed for
              architects, engineers, and design professionals.
            </p>
          </div>

          {/* Product column */}
          <div className="ad-footer-col">
            <h4>Product</h4>
            <ul>
              <li>
                <button
                  className="ad-footer-link-btn"
                  onClick={() => scrollToSection('ad-features')}
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  className="ad-footer-link-btn"
                  onClick={() => scrollToSection('ad-workflow')}
                >
                  How It Works
                </button>
              </li>
              <li>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="ad-footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <button
                  className="ad-footer-link-btn"
                  onClick={() => goToLegal(LEGAL_PAGES.privacy)}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className="ad-footer-link-btn"
                  onClick={() => goToLegal(LEGAL_PAGES.terms)}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  className="ad-footer-link-btn"
                  onClick={() => goToLegal(LEGAL_PAGES.deletion)}
                >
                  Account / Data Deletion
                </button>
              </li>
            </ul>
          </div>

          {/* Support column */}
          <div className="ad-footer-col">
            <h4>Support</h4>
            <ul>
              <li>
                <a href={`mailto:${SUPPORT_EMAIL}`}>Contact Support</a>
              </li>
              <li>
                <button
                  className="ad-footer-link-btn"
                  onClick={goHome}
                >
                  Back to Draughtsman Studio
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ad-footer-bottom">
          <p className="ad-footer-copy">
            &copy; {new Date().getFullYear()} Draughtsman Studio. All rights reserved.
          </p>
          <button
            className="ad-footer-studio-link"
            onClick={goHome}
          >
            ← Back to Draughtsman Studio
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ArchiDraftFooter;
