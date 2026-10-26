import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const ArchiDraftProblem = () => {
  const legacyIssues = [
    { title: 'Drawing Drift & Misplaced DWGs', detail: 'Revisions scattered across WhatsApp chats, personal emails, and unversioned folders.' },
    { title: 'Ambiguous Redline Feedback', detail: 'Handwritten scans and verbal phone notes leading to inaccurate CAD adjustments.' },
    { title: 'No Role Accountability', detail: 'Unclear milestone ownership between structural engineers, admins, and draughtsmen.' },
    { title: 'Accidental Outdated Builds', detail: 'Contractors on site constructing against superseded preliminary drawing sheets.' }
  ];

  const protocolSolutions = [
    { title: 'Single Milestone-Bound Repository', detail: 'Every drawing sheet remains strictly indexed to its verified project milestone.' },
    { title: 'Structured Redline Resolution', detail: 'Visual delta markups with explicit author notes and mandatory resolution checks.' },
    { title: 'Strict Four-Role Gatekeeper', detail: 'Clear sign-off gates: only certified draughtsmen draft, and only licensed engineers approve.' },
    { title: 'Approved-For-Construction (AFC) Stamp', detail: 'Cryptographically signed final packages preventing unauthorized site execution.' }
  ];

  return (
    <section className="ad-problem" id="ad-problem" aria-label="Problem and Solution">
      <div className="ad-problem-inner">
        <div className="ad-section-eyebrow" aria-hidden="true">
          <span className="ad-eyebrow-num">03</span>
          <span className="ad-eyebrow-sep">//</span>
          <span className="ad-eyebrow-text">STRUCTURAL REALITY</span>
        </div>

        <motion.div
          className="ad-problem-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="ad-problem-headline">
            Architectural Projects Aren't Failed by Design.<br />
            They Are Failed by Coordination.
          </h2>
          <p className="ad-problem-subheadline">
            When thousands of dimensions and load lines move between remote teams without a rigid workflow protocol, errors are inevitable. Archi Draft replaces ad-hoc file exchanges with an engineered assembly line.
          </p>
        </motion.div>

        {/* Comparative Architecture Grid */}
        <div className="ad-problem-comparison-grid">
          {/* Legacy Side */}
          <motion.div
            className="ad-comparison-card ad-comparison-card--legacy"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="ad-comparison-badge ad-comparison-badge--danger">
              <AlertTriangle size={13} />
              <span>THE FRAGMENTED LEGACY PRACTICE</span>
            </div>
            <h3 className="ad-comparison-title">The Cost of Disconnected Handoffs</h3>
            <div className="ad-comparison-list">
              {legacyIssues.map((item, idx) => (
                <div key={idx} className="ad-comparison-item">
                  <div className="ad-comparison-marker ad-comparison-marker--danger">×</div>
                  <div>
                    <h4 className="ad-comparison-item-title">{item.title}</h4>
                    <p className="ad-comparison-item-desc">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Archi Draft Solution Side */}
          <motion.div
            className="ad-comparison-card ad-comparison-card--protocol"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="ad-comparison-badge ad-comparison-badge--success">
              <CheckCircle size={13} />
              <span>THE ARCHI DRAFT PROTOCOL</span>
            </div>
            <h3 className="ad-comparison-title">Precision-Engineered Milestone Execution</h3>
            <div className="ad-comparison-list">
              {protocolSolutions.map((item, idx) => (
                <div key={idx} className="ad-comparison-item">
                  <div className="ad-comparison-marker ad-comparison-marker--success">✓</div>
                  <div>
                    <h4 className="ad-comparison-item-title">{item.title}</h4>
                    <p className="ad-comparison-item-desc">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftProblem;
