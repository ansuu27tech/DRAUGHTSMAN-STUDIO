import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, PenTool, Layers } from 'lucide-react';

const overviewItems = [
  {
    icon: Ruler,
    title: 'Precision Drafting',
    description: 'Create accurate architectural drawings with professional-grade tools designed for real-world construction documentation.',
  },
  {
    icon: PenTool,
    title: 'Design Tools',
    description: 'Access a comprehensive suite of design instruments tailored for architectural professionals and engineering workflows.',
  },
  {
    icon: Layers,
    title: 'Project Management',
    description: 'Organize drawings, manage project files, and maintain revision history — all within a single unified workspace.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ArchiDraftOverview = () => {
  return (
    <section className="ad-section" id="ad-overview" aria-label="Archi Draft Overview">
      <div className="ad-section-inner">
        <p className="ad-section-label">Product</p>
        <h2 className="ad-section-title">Built for Architecture</h2>
        <div className="ad-divider" aria-hidden="true" />
        <p className="ad-section-desc">
          Archi Draft brings professional architectural drafting capabilities
          to your fingertips — empowering you to design, draft, and deliver with confidence.
        </p>

        <div className="ad-overview-grid">
          {overviewItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="ad-overview-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="ad-overview-icon" aria-hidden="true">
                <item.icon size={22} strokeWidth={1.5} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftOverview;
