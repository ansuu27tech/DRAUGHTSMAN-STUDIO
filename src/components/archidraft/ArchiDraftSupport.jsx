import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, MessageCircle } from 'lucide-react';
import { SUPPORT_EMAIL, STUDIO_WEBSITE } from './archidraft.config';

const supportItems = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Reach our support team for technical assistance, bug reports, or feature requests.',
    action: (
      <a href={`mailto:${SUPPORT_EMAIL}`}>
        {SUPPORT_EMAIL}
      </a>
    ),
  },
  {
    icon: Globe,
    title: 'Draughtsman Studio',
    description: 'Visit the Draughtsman Studio website for more about our architectural design services.',
    action: (
      <a href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer">
        draughtsmanstudio.com
      </a>
    ),
  },
  {
    icon: MessageCircle,
    title: 'FAQ & Troubleshooting',
    description: 'Having issues? Check common solutions or contact us directly for personalized help.',
    action: (
      <a href={`mailto:${SUPPORT_EMAIL}`}>
        Get Help
      </a>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ArchiDraftSupport = () => {
  return (
    <section className="ad-section" id="ad-support" aria-label="Archi Draft Support">
      <div className="ad-section-inner">
        <p className="ad-section-label">Support</p>
        <h2 className="ad-section-title">We're Here to Help</h2>
        <div className="ad-divider" aria-hidden="true" />
        <p className="ad-section-desc">
          Need assistance with Archi Draft? Our team is ready to help you
          get the most out of your drafting experience.
        </p>

        <div className="ad-support-grid">
          {supportItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="ad-support-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="ad-support-icon" aria-hidden="true">
                <item.icon size={22} strokeWidth={1.5} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.action}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftSupport;
