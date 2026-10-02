import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Building2, HardHat } from 'lucide-react';

const audiences = [
  {
    icon: Compass,
    title: 'Architects',
    description: 'Create precise floor plans, elevations, and sections — from concept design through construction documentation.',
  },
  {
    icon: Building2,
    title: 'Interior Designers',
    description: 'Draft spatial layouts, furniture arrangements, and detailed interior specifications with professional accuracy.',
  },
  {
    icon: HardHat,
    title: 'Engineers & Contractors',
    description: 'Review, annotate, and collaborate on technical drawings — on-site or in the office.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ArchiDraftAudience = () => {
  return (
    <section className="ad-section" id="ad-audience" aria-label="Who Uses Archi Draft">
      <div className="ad-section-inner">
        <p className="ad-section-label">Who It's For</p>
        <h2 className="ad-section-title">Designed for Professionals</h2>
        <div className="ad-divider" aria-hidden="true" />
        <p className="ad-section-desc">
          Archi Draft is purpose-built for the professionals who shape the built environment.
        </p>

        <div className="ad-audience-grid">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              className="ad-audience-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="ad-audience-icon" aria-hidden="true">
                <item.icon size={24} strokeWidth={1.5} />
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

export default ArchiDraftAudience;
