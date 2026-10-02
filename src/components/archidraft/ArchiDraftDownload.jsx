import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { PLAY_STORE_URL } from './archidraft.config';

const ArchiDraftDownload = () => {
  return (
    <section className="ad-section ad-download" id="ad-download" aria-label="Download Archi Draft">
      <div className="ad-download-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
        >
          <p className="ad-section-label">Download</p>
          <h2 className="ad-section-title" style={{ textAlign: 'center' }}>
            Get Archi Draft
          </h2>
          <div className="ad-divider" aria-hidden="true" />
          <p className="ad-section-desc" style={{ textAlign: 'center' }}>
            Available on Google Play. Download Archi Draft and start drafting
            your next architectural project today.
          </p>

          {/* Google Play badge */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ad-download-badge"
            aria-label="Get it on Google Play"
          >
            <div className="ad-download-badge-icon" aria-hidden="true">
              <Play size={24} strokeWidth={1.5} />
            </div>
            <div className="ad-download-badge-text">
              <small>Get it on</small>
              <strong>Google Play</strong>
            </div>
          </a>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem',
            color: 'var(--color-text-secondary)',
            opacity: 0.5,
            marginTop: '0.5rem',
          }}>
            Requires Android 8.0 or higher
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchiDraftDownload;
