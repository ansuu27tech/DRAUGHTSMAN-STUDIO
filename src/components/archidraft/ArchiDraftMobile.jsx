import React from 'react';
import { motion } from 'framer-motion';
import { PLAY_STORE_URL } from './archidraft.config';
import { Smartphone, Check, ExternalLink, Download, Bell, WifiOff, Eye } from 'lucide-react';

const ArchiDraftMobile = () => {
  const mobileHighlights = [
    {
      icon: Eye,
      title: 'High-Resolution Sheet Inspector',
      desc: 'Pinch, pan, and inspect multi-sheet DWG/PDF drawings with millimeter accuracy directly on construction sites.'
    },
    {
      icon: Bell,
      title: 'Instant Redline Alerts',
      desc: 'Receive immediate push notifications when an engineer leaves redline annotations or grants final approval.'
    },
    {
      icon: WifiOff,
      title: 'Offline Drawing Cache',
      desc: 'Access verified construction drawings even in sub-grade basements or remote build sites with zero cellular connectivity.'
    },
    {
      icon: Smartphone,
      title: 'Native Android Architecture',
      desc: 'Engineered specifically for Android with fluid 120Hz gesture response, hardware acceleration, and role isolation.'
    }
  ];

  return (
    <section className="ad-mobile" id="ad-mobile" aria-label="Android Mobile Workstation">
      <div className="ad-mobile-inner">
        {/* Left Column: Mobile Details */}
        <motion.div
          className="ad-mobile-content"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="ad-section-eyebrow" aria-hidden="true">
            <span className="ad-eyebrow-num">09</span>
            <span className="ad-eyebrow-sep">//</span>
            <span className="ad-eyebrow-text">FIELD MOBILITY</span>
          </div>

          <h2 className="ad-mobile-title">
            The Entire Studio.<br />
            In the Palm of Your Hand.
          </h2>

          <p className="ad-mobile-lead">
            The power of the entire 9-stage drafting lifecycle, accessible directly from the construction site or drafting table. Designed specifically for the Android ecosystem.
          </p>

          <div className="ad-mobile-features-grid">
            {mobileHighlights.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="ad-mobile-feature-box">
                  <div className="ad-mobile-feature-icon">
                    <Icon size={16} />
                  </div>
                  <div>
                    <h3 className="ad-mobile-feature-title">{feat.title}</h3>
                    <p className="ad-mobile-feature-desc">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ad-mobile-action-deck">
            <a
              href="#download"
              className="ad-btn ad-btn--champagne"
              aria-label="Access Archi Draft Multi-Platform Download Center"
            >
              <Download size={16} />
              <span>Download Center (#download)</span>
            </a>
            <span className="ad-mobile-version-note">ANDROID v1.0.0 (BETA) • TABLETS & PHONES</span>
          </div>
        </motion.div>

        {/* Right Column: Framed Device Mockup */}
        <motion.div
          className="ad-mobile-visual-wrapper"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="ad-mobile-device-chassis">
            <div className="ad-device-glow" />
            <div className="ad-device-screen-container">
              <img
                src="/archidraft/app-welcome.png"
                alt="Archi Draft Welcome & Project Submission Portal running on Android"
                className="ad-mobile-screen-img"
              />
              <div className="ad-device-watermark">
                <span>ARCHI DRAFT MOBILE // ACTIVE SESSION</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchiDraftMobile;
