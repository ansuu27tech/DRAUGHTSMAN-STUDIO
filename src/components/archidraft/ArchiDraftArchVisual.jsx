import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Ruler, Shield, Layers } from 'lucide-react';

const ArchiDraftArchVisual = () => {
  return (
    <section className="ad-arch-visual" aria-label="Technical Drafting Standard">
      <div className="ad-arch-visual-bg">
        <div className="ad-arch-visual-blueprint-layer" />
        <div className="ad-arch-visual-overlay" />
      </div>

      <div className="ad-arch-visual-inner">
        {/* Engineering Title Block */}
        <div className="ad-visual-spec-bar">
          <div className="ad-spec-bar-item">
            <span className="ad-spec-key">DRAFTING PROTOCOL:</span>
            <span className="ad-spec-val">ISO 13567-2 / AIA CAD</span>
          </div>
          <div className="ad-spec-bar-item">
            <span className="ad-spec-key">BASE SCALE:</span>
            <span className="ad-spec-val">1:50 @ A1 PLOT</span>
          </div>
          <div className="ad-spec-bar-item">
            <span className="ad-spec-key">TOLERANCE:</span>
            <span className="ad-spec-val">±0.50mm STRICT</span>
          </div>
          <div className="ad-spec-bar-item">
            <span className="ad-spec-key">INTEGRITY:</span>
            <span className="ad-spec-val text-success">CRYPTOGRAPHIC AFC</span>
          </div>
        </div>

        <motion.div
          className="ad-arch-visual-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="ad-arch-visual-tag">
            <Compass size={14} />
            <span>THE DRAFTING STANDARD</span>
          </div>

          <h2 className="ad-arch-visual-headline">
            Stop Managing Disconnected Files.<br />
            <em>Start Directing Architectural Workflow.</em>
          </h2>

          <p className="ad-arch-visual-subtext">
            From the first survey point to the final structural erection, precision is non-negotiable. 
            Archi Draft delivers the clarity, accountability, and speed required for the world's most demanding architectural undertakings.
          </p>

          <div className="ad-arch-visual-badges">
            <div className="ad-visual-badge">
              <Ruler size={13} />
              <span>Millimeter Geometry</span>
            </div>
            <div className="ad-visual-badge">
              <Layers size={13} />
              <span>Multi-Sheet Coordination</span>
            </div>
            <div className="ad-visual-badge">
              <Shield size={13} />
              <span>Licensed Sign-Offs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchiDraftArchVisual;
