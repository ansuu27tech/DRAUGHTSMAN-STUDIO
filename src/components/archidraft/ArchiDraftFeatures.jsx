import React from 'react';
import { motion } from 'framer-motion';
import { FEATURE_STORIES } from './archidraft.config';
import { Layers, FolderGit2, CheckCheck, Users, Shield, Award } from 'lucide-react';

const featureIcons = [
  Layers,
  FolderGit2,
  CheckCheck,
  Users,
  Shield,
  Award
];

const ArchiDraftFeatures = () => {
  return (
    <section className="ad-features" id="ad-features" aria-label="Platform Capabilities">
      <div className="ad-features-inner">
        {/* Header */}
        <div className="ad-features-header">
          <div>
            <div className="ad-section-eyebrow" aria-hidden="true">
              <span className="ad-eyebrow-num">08</span>
              <span className="ad-eyebrow-sep">//</span>
              <span className="ad-eyebrow-text">ENGINEERED CAPABILITIES</span>
            </div>

            <h2 className="ad-features-title">
              Built for Absolute<br />
              Drafting Rigor.
            </h2>
          </div>
          <div className="ad-features-header-meta">
            <span className="ad-features-meta-pill">06 FOUNDATIONAL PILLARS</span>
            <p className="ad-features-meta-desc">
              Every feature exists to eliminate drawing ambiguities, enforce dimensional precision, and streamline team throughput.
            </p>
          </div>
        </div>

        {/* 6-Card Editorial Grid */}
        <div className="ad-features-grid">
          {FEATURE_STORIES.map((feature, idx) => {
            const Icon = featureIcons[idx] || Layers;
            return (
              <motion.div
                key={feature.num}
                className="ad-feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="ad-feature-card-top">
                  <span className="ad-feature-num">{feature.num}</span>
                  <div className="ad-feature-icon-box">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="ad-feature-tag">{feature.tag}</div>
                <h3 className="ad-feature-title">{feature.title}</h3>
                <p className="ad-feature-desc">{feature.desc}</p>
                <p className="ad-feature-detail">{feature.detail}</p>

                <div className="ad-feature-card-footer">
                  <span className="ad-feature-metric-label">PERFORMANCE BENCHMARK:</span>
                  <span className="ad-feature-metric-value">{feature.metric}</span>
                </div>
                <div className="ad-feature-card-accent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftFeatures;
