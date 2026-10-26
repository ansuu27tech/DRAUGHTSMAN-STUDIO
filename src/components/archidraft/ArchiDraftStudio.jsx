import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Building2, Code2, ArrowUpRight } from 'lucide-react';

const ArchiDraftStudio = () => {
  const capabilities = [
    {
      title: 'Architectural Engineering',
      desc: 'Decades of combined structural drafting, BIM coordination, and precision engineering expertise.'
    },
    {
      title: 'Proprietary Software Systems',
      desc: 'Built by PixelMint Studio MVS to solve the exact operational bottlenecks faced by working architects.'
    },
    {
      title: 'Academic Guild & Apprenticeship',
      desc: 'Training the next generation of certified draughtsmen through rigorous real-world standards.'
    },
    {
      title: 'Cryptographic Credentialing',
      desc: 'Every certificate and milestone approval is cryptographically logged and verifiable online.'
    }
  ];

  return (
    <section className="ad-studio" id="ad-studio" aria-label="Studio Heritage and Guild Credentials">
      <div className="ad-studio-inner">
        {/* Left Column */}
        <motion.div
          className="ad-studio-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="ad-section-eyebrow" aria-hidden="true">
            <span className="ad-eyebrow-num">10</span>
            <span className="ad-eyebrow-sep">//</span>
            <span className="ad-eyebrow-text">STUDIO HERITAGE</span>
          </div>

          <div className="ad-studio-brand-header">
            <h2 className="ad-studio-title">
              PIXELMINT STUDIO MVS
            </h2>
            <div className="ad-studio-sub">
              THE TECHNOLOGY ARM OF DRAUGHTSMAN STUDIO
            </div>
          </div>

          <p className="ad-studio-desc">
            Archi Draft was not conceived in a generic tech incubator. It was designed, engineered, and battle-tested inside active architectural drafting rooms by working engineers who demanded zero compromise on precision.
          </p>

          <div className="ad-studio-action-row">
            <a
              href="#verify"
              className="ad-studio-verify-btn"
              aria-label="Access Certificate Verification Portal"
            >
              <ShieldCheck size={16} />
              <span>Verify Guild Certificate (#verify)</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Capabilities & Credentials */}
        <motion.div
          className="ad-studio-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          {capabilities.map((cap, i) => (
            <div key={i} className="ad-studio-cap-card">
              <div className="ad-studio-cap-header">
                <span className="ad-cap-index">0{i + 1}</span>
                <h3 className="ad-studio-cap-title">{cap.title}</h3>
              </div>
              <p className="ad-studio-cap-desc">{cap.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArchiDraftStudio;
