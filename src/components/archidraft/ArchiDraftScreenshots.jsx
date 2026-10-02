import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

/**
 * Screenshot placeholders — designed to accept real Archi Draft screenshots later.
 * PLACEHOLDER: Replace placeholder labels with actual screenshot images.
 */
const screenshotSlots = [
  { id: 1, label: 'Dashboard' },
  { id: 2, label: 'Drafting Canvas' },
  { id: 3, label: 'Layer Panel' },
  { id: 4, label: 'Export View' },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ArchiDraftScreenshots = () => {
  return (
    <section className="ad-section" id="ad-screenshots" aria-label="Archi Draft Screenshots">
      <div className="ad-section-inner">
        <p className="ad-section-label">Screenshots</p>
        <h2 className="ad-section-title">See It in Action</h2>
        <div className="ad-divider" aria-hidden="true" />
        <p className="ad-section-desc">
          A closer look at the Archi Draft interface — built for clarity,
          speed, and architectural precision.
        </p>

        <div className="ad-screenshots-grid">
          {screenshotSlots.map((slot, i) => (
            <motion.div
              key={slot.id}
              className="ad-screenshot-placeholder"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              role="img"
              aria-label={`${slot.label} screenshot placeholder`}
            >
              <div className="ad-screenshot-placeholder-icon" aria-hidden="true">
                <Smartphone size={22} strokeWidth={1.5} />
              </div>
              <span>{slot.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftScreenshots;
