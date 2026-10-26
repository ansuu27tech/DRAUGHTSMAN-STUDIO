import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ROTATING_WORD_LINES = [
  'Architecture. Engineered. Delivered.',
  'Cryptographic CAD Drawing Management',
  'Collaborative Workflows for Built World',
  'Integrated with PIXMINT AI Assistant',
  'Immutable 9-Stage Deliverable Pipeline'
];

const ArchiDraftHero = () => {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % ROTATING_WORD_LINES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="ad-hero" id="ad-hero" aria-label="Archi Draft Hero">
      {/* Restrained architectural background atmosphere */}
      <div className="ad-hero-bg" aria-hidden="true">
        <motion.div
          className="ad-hero-bg-image"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 0.22 }}
          transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
        />
        <div className="ad-hero-bg-overlay" />
        <div className="ad-hero-bg-grid" />
      </div>

      {/* Two-Column Master Hero Container (~50% / 50%) */}
      <div className="ad-hero-container">
        {/* Left Column: Big Oversized Typography & Single Primary CTA */}
        <motion.div
          className="ad-hero-content"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Two-line Oversized Brand Title */}
          <h1 className="ad-hero-brand-title">
            <span className="ad-brand-line ad-brand--archi">ARCHI</span>
            <span className="ad-brand-line ad-brand--draft">DRAFT</span>
          </h1>

          {/* Rotating Word Lines Animation */}
          <div className="ad-hero-word-rotator" aria-live="polite">
            <span className="ad-rotator-dot" aria-hidden="true" />
            <div className="ad-rotator-viewport">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lineIndex}
                  initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="ad-rotator-line"
                >
                  {ROTATING_WORD_LINES[lineIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Minimalist Single Primary CTA */}
          <div className="ad-hero-actions">
            <button
              className="ad-btn ad-btn--champagne ad-btn--hero"
              onClick={() => scrollToSection('ad-workflow')}
              aria-label="Explore ArchiDraft"
            >
              <span>Explore ArchiDraft</span>
              <ArrowRight size={16} className="ad-btn-arrow" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Large App Logo with Restrained Architectural Halo */}
        <motion.div
          className="ad-hero-logo-col"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="ad-logo-stage">
            {/* Ambient champagne gold illumination */}
            <div className="ad-logo-ambient-glow" aria-hidden="true" />

            {/* Subtle, restrained architectural framing rings */}
            <div className="ad-logo-ring ad-logo-ring--outer" aria-hidden="true" />
            <div className="ad-logo-ring ad-logo-ring--inner" aria-hidden="true" />

            {/* Large Official ArchiDraft App Logo */}
            <img
              src="/archidraft/logo-mark-white.png"
              alt="ArchiDraft Official App Logo"
              className="ad-hero-large-logo"
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="ad-hero-scroll" aria-hidden="true">
        <div className="ad-hero-scroll-line" />
        <span>SCROLL DOWN</span>
      </div>
    </section>
  );
};

export default ArchiDraftHero;
