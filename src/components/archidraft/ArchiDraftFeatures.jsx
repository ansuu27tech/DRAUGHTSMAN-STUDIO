import React from 'react';
import { motion } from 'framer-motion';

/**
 * Feature items for Archi Draft.
 * These are neutral placeholder descriptions. 
 * PLACEHOLDER: Replace with actual implemented feature descriptions
 * once the Archi Draft app capabilities are confirmed.
 */
const features = [
  {
    num: '01',
    title: '2D Drafting Engine',
    description: 'Draw precise architectural plans with snap-to-grid, dimension lines, and industry-standard annotation tools.',
  },
  {
    num: '02',
    title: 'Layer Management',
    description: 'Organize complex drawings using a layered system — toggle visibility, lock layers, and manage element hierarchy effortlessly.',
  },
  {
    num: '03',
    title: 'Template Library',
    description: 'Start projects faster with pre-built architectural templates for floor plans, elevations, sections, and site plans.',
  },
  {
    num: '04',
    title: 'Export & Share',
    description: 'Export your work in industry-standard formats for seamless collaboration with clients, contractors, and engineering teams.',
  },
  {
    num: '05',
    title: 'Touch-Optimized Interface',
    description: 'Designed for mobile and tablet use — intuitive gesture controls that feel natural for on-site reviews and field sketching.',
  },
  {
    num: '06',
    title: 'Offline Capability',
    description: 'Work without an internet connection. Your projects save locally and sync when you reconnect — perfect for site visits.',
  },
];

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ArchiDraftFeatures = () => {
  return (
    <section className="ad-section" id="ad-features" aria-label="Archi Draft Features">
      <div className="ad-section-inner">
        <p className="ad-section-label">Features</p>
        <h2 className="ad-section-title">Professional Tools, Portable Precision</h2>
        <div className="ad-divider" aria-hidden="true" />
        <p className="ad-section-desc">
          Every feature in Archi Draft is built to support the workflows that
          architects and engineers rely on daily.
        </p>

        <div className="ad-features-grid">
          {features.map((feat, i) => (
            <motion.div
              key={feat.num}
              className="ad-feature-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={featureVariants}
            >
              <span className="ad-feature-num">{feat.num}</span>
              <div className="ad-feature-content">
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftFeatures;
