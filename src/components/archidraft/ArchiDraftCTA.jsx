import React from 'react';
import { motion } from 'framer-motion';
import { PLAY_STORE_URL } from './archidraft.config';
import { Download, ShieldCheck, ArrowRight, Compass } from 'lucide-react';

const ArchiDraftCTA = () => {
  return (
    <section className="ad-cta-final" aria-label="Call to Action">
      <div className="ad-cta-final-inner">
        <motion.div
          className="ad-cta-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Engineering Stamp Badge */}
          <div className="ad-cta-badge">
            <Compass size={14} />
            <span>ARCHITECTURAL SPECIFICATION COMPLETE</span>
          </div>

          <h2 className="ad-cta-title">
            Architectural Precision.<br />
            From Sketch to Structure.
          </h2>

          <p className="ad-cta-subtext">
            Join the forward-thinking architectural and engineering studios standardizing their drawing handoffs, redline revisions, and contractor approvals with Archi Draft.
          </p>

          <div className="ad-cta-actions">
            <a
              href="#download"
              className="ad-btn ad-btn--champagne ad-btn--large"
              aria-label="Open Official Multi-Platform Download Center"
            >
              <Download size={18} />
              <span>Official Download Center</span>
            </a>

            <a
              href="#verify"
              className="ad-btn ad-btn--ghost ad-btn--large"
              aria-label="Verify Certificate"
            >
              <ShieldCheck size={18} />
              <span>Verify Certificate</span>
            </a>

            <a
              href="#home"
              className="ad-btn ad-btn--link"
              aria-label="Return to Draughtsman Studio Home"
            >
              <span>Return to Draughtsman Studio</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="ad-cta-footer-telemetry">
            <span>DRAUGHTSMAN STUDIO • PIXELMINT STUDIO MVS</span>
            <span>BUILD VERIFIED: 2026.1 // PRODUCTION</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchiDraftCTA;
