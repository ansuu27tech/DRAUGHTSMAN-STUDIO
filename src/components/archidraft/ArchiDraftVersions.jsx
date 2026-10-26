import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, CheckCircle2, AlertOctagon, FileCheck, Layers, ArrowRight } from 'lucide-react';

const revisions = [
  {
    rev: 'REV 01',
    status: 'INITIAL SUBMITTAL',
    badgeClass: 'ad-rev-badge--draft',
    date: '2026-03-12 10:45 AM',
    author: 'Certified Lead Draughtsman',
    description: 'Initial structural framing submittal generated from architectural schematics. Column lines A to G established.',
    changes: [
      'Base grid layout generated from architectural IFC model',
      'Structural steel section profiles specified',
      'Preliminary dimension strings set'
    ],
    gateState: 'Submitted for Engineering Audit',
    deltaCount: '+42 Layers • 0 Redlines'
  },
  {
    rev: 'REV 02',
    status: 'REDLINES APPLIED',
    badgeClass: 'ad-rev-badge--warning',
    date: '2026-03-14 04:20 PM',
    author: 'S. Chen, PE (Principal Structural Engineer)',
    description: 'Redline review completed. Identified coordinate clash at Grid Line 4 elevator core and requested beam depth enlargement.',
    changes: [
      'Revision cloud added around elevator core shaft (+150mm offset required)',
      'W24x68 steel beams updated to W27x84 for deflection compliance',
      'Staircase headroom clearance checked and noted'
    ],
    gateState: 'In Draughtsman Revision Cycle',
    deltaCount: '3 Redline Clouds • 2 Dimensions Flagged'
  },
  {
    rev: 'REV 03',
    status: 'APPROVED FOR CONSTRUCTION',
    badgeClass: 'ad-rev-badge--approved',
    date: '2026-03-16 02:15 PM',
    author: 'S. Chen, PE & Draughtsman Studio QA',
    description: 'All engineering redlines resolved and verified against ISO 13567. Formal AFC stamp applied. Drawing package locked and certified.',
    changes: [
      'Elevator core clash resolved with confirmed contractor clearance',
      'Deflection calculations cross-verified and stamped',
      'Digital cryptographic signature key applied to sheet metadata'
    ],
    gateState: 'Construction Ready (AFC Locked)',
    deltaCount: 'Zero Outstanding Issues • Sealed'
  }
];

const ArchiDraftVersions = () => {
  const [activeRevIndex, setActiveRevIndex] = useState(1); // Default to REV 02 (most interesting redline view)
  const currentRev = revisions[activeRevIndex];

  return (
    <section className="ad-versions" id="ad-versions" aria-label="Version Control and Redline Audit">
      <div className="ad-versions-inner">
        {/* Header */}
        <div className="ad-versions-header">
          <div className="ad-section-eyebrow" aria-hidden="true">
            <span className="ad-eyebrow-num">07</span>
            <span className="ad-eyebrow-sep">//</span>
            <span className="ad-eyebrow-text">REVISION SOVEREIGNTY</span>
          </div>

          <h2 className="ad-versions-title">
            Every Coordinate Change.<br />
            Contextually Preserved.
          </h2>
          <p className="ad-versions-subtitle">
            Drawing revisions are never overwritten or lost in translation. 
            Archi Draft tracks the exact delta between submittals, keeping engineers and draughtsmen aligned through structured redline cycles.
          </p>
        </div>

        {/* Interactive Revision Switcher Bar (Apple Fluid Segmented Indicator) */}
        <div className="ad-versions-timeline-bar" role="tablist" aria-label="Drawing Revisions">
          {revisions.map((rev, idx) => {
            const isActive = idx === activeRevIndex;
            return (
              <button
                key={rev.rev}
                className={`ad-rev-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveRevIndex(idx)}
                role="tab"
                aria-selected={isActive}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRevIndicator"
                    className="ad-rev-tab-active-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <div className="ad-rev-tab-content">
                  <div className="ad-rev-tab-top">
                    <span className="ad-rev-tab-num">{rev.rev}</span>
                    <span className={`ad-rev-tab-status ${rev.badgeClass}`}>{rev.status}</span>
                  </div>
                  <div className="ad-rev-tab-date">{rev.date}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Revision Comparison Studio */}
        <div className="ad-versions-studio-grid">
          {/* Visual Drawing Frame */}
          <div className="ad-versions-viewport-wrapper">
            <div className="ad-versions-viewport-frame">
              <div className="ad-viewport-meta-bar">
                <span className="ad-viewport-meta-title">SHEET S-201 // ELEVATION & GRID REDLINE</span>
                <span className={`ad-viewport-status-pill ${currentRev.badgeClass}`}>
                  {currentRev.status}
                </span>
              </div>

              <div className="ad-versions-image-container">
                <img
                  src="/archidraft/version-comparison.jpg"
                  alt={`Version Comparison showing ${currentRev.rev}`}
                  className="ad-versions-img"
                />

                {/* Dynamic Visual Overlays based on active revision */}
                {activeRevIndex === 0 && (
                  <div className="ad-overlay-annotation ad-overlay--rev1">
                    <span className="ad-anno-badge">REV 01: INITIAL SCHEME</span>
                    <p className="ad-anno-text">All elements drafted to preliminary architectural baseline.</p>
                  </div>
                )}

                {activeRevIndex === 1 && (
                  <div className="ad-overlay-annotation ad-overlay--rev2">
                    <span className="ad-anno-badge ad-anno-badge--redline">REDLINE MARKUP #04</span>
                    <p className="ad-anno-text">Beam depth enlarged to W27x84. Relocate core duct 150mm East.</p>
                  </div>
                )}

                {activeRevIndex === 2 && (
                  <div className="ad-overlay-annotation ad-overlay--rev3">
                    <span className="ad-anno-badge ad-anno-badge--afc">CERTIFIED AFC STAMP</span>
                    <p className="ad-anno-text">Draughtsman Studio QA Approved. Ready for on-site construction.</p>
                  </div>
                )}
              </div>

              <div className="ad-viewport-footer">
                <span>DELTA METRICS: {currentRev.deltaCount}</span>
                <span>SHA-256 INTEGRITY: VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Revision Ledger Info Panel */}
          <div className="ad-versions-ledger-deck">
            <div className="ad-ledger-header">
              <GitCommit size={16} className="ad-ledger-icon" />
              <span>REVISION AUDIT LEDGER</span>
            </div>

            <div className="ad-ledger-body">
              <div className="ad-ledger-stage-row">
                <span className="ad-ledger-rev-tag">{currentRev.rev}</span>
                <span className="ad-ledger-gate">{currentRev.gateState}</span>
              </div>

              <div className="ad-ledger-author-box">
                <div className="ad-author-label">AUTHORIZED SIGN-OFF:</div>
                <div className="ad-author-name">{currentRev.author}</div>
                <div className="ad-author-time">{currentRev.date}</div>
              </div>

              <p className="ad-ledger-desc">
                {currentRev.description}
              </p>

              <div className="ad-ledger-changes-list">
                <div className="ad-changes-title">RECORDED SHEET MODIFICATIONS:</div>
                {currentRev.changes.map((change, i) => (
                  <div key={i} className="ad-change-item">
                    <div className="ad-change-bullet">▸</div>
                    <span>{change}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ad-ledger-footer">
              <CheckCircle2 size={14} className="text-success" />
              <span>Immutable cryptographic hash registered to project record</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftVersions;
