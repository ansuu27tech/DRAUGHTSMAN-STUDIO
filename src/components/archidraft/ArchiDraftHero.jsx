import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import { PLAY_STORE_URL } from './archidraft.config';

const ArchiDraftHero = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="ad-hero" id="ad-hero" aria-label="Archi Draft Hero">
      {/* Background layers */}
      <div className="ad-hero-bg" aria-hidden="true">
        <div className="ad-hero-bg-grid" />
        <div className="ad-hero-bg-gradient" />
      </div>

      <motion.div
        className="ad-hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="ad-hero-badge">
          <span className="ad-hero-badge-dot" aria-hidden="true" />
          By Draughtsman Studio
        </div>

        <h1>
          Archi<span className="ad-gold"> Draft</span>
        </h1>

        <p className="ad-hero-sub">
          Professional architectural drafting and design tools — built for architects,
          engineers, and design professionals who demand precision on every project.
        </p>

        <div className="ad-hero-actions">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ad-btn-primary"
            aria-label="Download Archi Draft on Google Play"
          >
            <Play size={18} />
            Download on Google Play
          </a>
          <button
            className="ad-btn-secondary"
            onClick={() => scrollToSection('ad-features')}
            aria-label="Explore Archi Draft Features"
          >
            Explore Features
            <ChevronDown size={16} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ArchiDraftHero;
