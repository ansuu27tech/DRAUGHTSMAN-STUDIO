import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, Shield, GitBranch, ArrowRight } from 'lucide-react';

const ArchiDraftReveal = () => {
  const pillars = [
    {
      icon: FileCode,
      title: 'Unified CAD Ledger',
      subtitle: 'Zero Sheet Drift',
      desc: 'All DWG, DXF, and PDF sets remain tied directly to project milestones. No missing coordinate links or outdated local copies.'
    },
    {
      icon: GitBranch,
      title: 'Cryptographic Versioning',
      subtitle: 'Structured Redline History',
      desc: 'Track every revision from initial scheme to Approved-For-Construction with engineer annotations and timestamped delta audits.'
    },
    {
      icon: Shield,
      title: 'Four-Role Governance',
      subtitle: 'Permission Isolation',
      desc: 'Engineers define parameters and approvals. Draughtsmen produce drawings. Admins oversee dispatch. Students train within a secure sandbox.'
    }
  ];

  return (
    <section className="ad-reveal" id="ad-reveal" aria-label="Product Manifesto">
      <div className="ad-reveal-inner">
        <div className="ad-section-eyebrow" aria-hidden="true">
          <span className="ad-eyebrow-num">02</span>
          <span className="ad-eyebrow-sep">//</span>
          <span className="ad-eyebrow-text">THE DRAFTING PROTOCOL</span>
        </div>

        <motion.div
          className="ad-reveal-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="ad-reveal-headline">
            One Single Project. <em>Every Stakeholder.</em><br />
            An Unbroken Chain of Custody.
          </h2>
          <p className="ad-reveal-subheadline">
            Buildings fail when communication breaks down between the design desk and the drafting table. 
            Archi Draft transforms loose file exchanges into an engineered, milestone-driven workflow.
          </p>
        </motion.div>

        {/* 3 Core Architecture Pillars */}
        <div className="ad-reveal-pillars-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="ad-reveal-pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="ad-pillar-top">
                  <div className="ad-pillar-icon-box">
                    <Icon size={20} className="ad-pillar-icon" />
                  </div>
                  <span className="ad-pillar-index">0{idx + 1}</span>
                </div>
                <div className="ad-pillar-meta">
                  <span className="ad-pillar-subtitle">{pillar.subtitle}</span>
                  <h3 className="ad-pillar-title">{pillar.title}</h3>
                </div>
                <p className="ad-pillar-desc">{pillar.desc}</p>
                <div className="ad-pillar-border-accent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftReveal;
