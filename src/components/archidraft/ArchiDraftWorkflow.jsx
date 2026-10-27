import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORKFLOW_STAGES } from './archidraft.config';
import { 
  FilePlus, 
  Search, 
  UserCheck, 
  CheckSquare, 
  PenTool, 
  AlertCircle, 
  RefreshCw, 
  Award, 
  Archive,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Layers
} from 'lucide-react';

const stageIcons = [
  FilePlus,
  Search,
  UserCheck,
  CheckSquare,
  PenTool,
  AlertCircle,
  RefreshCw,
  Award,
  Archive
];

const ArchiDraftWorkflow = () => {
  const [activeStage, setActiveStage] = useState(0); // Start at Stage 01 CREATE
  const [isPaused, setIsPaused] = useState(false);

  // Automated assembly line flow: continuously advances through the 9 stages
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % WORKFLOW_STAGES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPaused, activeStage]);

  const current = WORKFLOW_STAGES[activeStage];
  const IconComponent = stageIcons[activeStage] || PenTool;

  const handlePrev = () => {
    setActiveStage((prev) => (prev === 0 ? WORKFLOW_STAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStage((prev) => (prev + 1) % WORKFLOW_STAGES.length);
  };

  return (
    <section className="ad-workflow" id="ad-workflow" aria-label="Nine-Stage Architectural Workflow">
      <div className="ad-workflow-bg-blueprint" />
      
      <div className="ad-workflow-inner">
        {/* Section Header */}
        <div className="ad-workflow-header">
          <div className="ad-section-eyebrow" aria-hidden="true">
            <span className="ad-eyebrow-num">04</span>
            <span className="ad-eyebrow-sep">//</span>
            <span className="ad-eyebrow-text">TECHNICAL SCHEMATIC</span>
          </div>

          <h2 className="ad-workflow-title">
            The Nine-Stage Drafting Assembly Line.
          </h2>
          <p className="ad-workflow-subhead">
            A verified sequential QA pipeline connecting initial brief to final construction approval. 
            No stage can be bypassed; every handoff leaves an immutable cryptographic audit record.
          </p>
        </div>

        {/* Desktop & Tablet Interactive Pipeline Track */}
        <div className="ad-pipeline-track-wrapper">
          <div className="ad-pipeline-track" role="tablist" aria-label="Workflow Stages">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const isActive = idx === activeStage;
              const isPassed = idx < activeStage;

              return (
                <button
                  key={stage.num}
                  className={`ad-pipeline-node ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                  onClick={() => setActiveStage(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Stage ${stage.num}: ${stage.title} (${stage.role})`}
                >
                  <div className="ad-node-indicator">
                    {isActive && (
                      <motion.div
                        layoutId="pipelineActiveGlow"
                        className="ad-node-active-glow"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                    <div className="ad-node-indicator-dot">
                      {isPassed ? (
                        <CheckCircle2 size={11} className="ad-node-check" />
                      ) : (
                        <span className="ad-node-num">{stage.num}</span>
                      )}
                    </div>
                    {idx < WORKFLOW_STAGES.length - 1 && (
                      <div className={`ad-node-connector ${isPassed ? 'passed' : ''}`} />
                    )}
                  </div>

                  <div className="ad-node-meta">
                    <span className="ad-node-title">{stage.title}</span>
                    <span className="ad-node-role">{stage.role}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Responsive Stage Progress Bar (Instant tap navigation on mobile) */}
        <div className="ad-mobile-stage-bar" aria-label="Mobile Workflow Stage Selector">
          <div className="ad-mobile-stage-header">
            <span className="ad-mobile-stage-counter">STAGE 0{activeStage + 1} // 09</span>
            <span className="ad-mobile-stage-role">{current.role}</span>
          </div>
          <div className="ad-mobile-stage-dots" role="tablist">
            {WORKFLOW_STAGES.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                className={`ad-mobile-dot ${idx === activeStage ? 'active' : ''} ${idx < activeStage ? 'passed' : ''}`}
                onClick={() => setActiveStage(idx)}
                role="tab"
                aria-selected={idx === activeStage}
                aria-label={`Stage ${s.num}: ${s.title}`}
              >
                <span>{s.num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Detailed Workstation Console (Apple Spring Transition) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            className="ad-stage-console"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            {/* Left Console: Stage Specs & Responsibilities */}
            <div className="ad-stage-info-deck">
              <div className="ad-stage-top-meta">
                <span className="ad-stage-phase-tag">{current.phase}</span>
                <span className="ad-stage-badge">{current.badge}</span>
                <span className="ad-stage-cadence">{current.cadence}</span>
              </div>

              <div className="ad-stage-title-row">
                <div className="ad-stage-icon-box">
                  <IconComponent size={24} className="ad-stage-icon" />
                </div>
                <div>
                  <h3 className="ad-stage-name">
                    STAGE {current.num} // {current.title}
                  </h3>
                  <div className="ad-stage-owner">
                    <span className="ad-owner-label">PRIMARY ROLE:</span>
                    <span className="ad-owner-badge">{current.role}</span>
                  </div>
                </div>
              </div>

              <p className="ad-stage-description">
                {current.desc}
              </p>

              {/* Technical Deliverable Specification Box */}
              <div className="ad-stage-deliverable-box">
                <div className="ad-deliverable-title">
                  <Layers size={13} />
                  <span>FORMAL STAGE DELIVERABLE</span>
                </div>
                <div className="ad-deliverable-content">
                  {current.deliverable}
                </div>
                <div className="ad-deliverable-action">
                  <span>MANDATORY ACTION:</span> <strong>{current.action}</strong>
                </div>
              </div>

              {/* Stage Navigation & Automated Cadence Indicator (No Play Button) */}
              <div className="ad-stage-controls">
                <button
                  className="ad-stage-nav-btn"
                  onClick={handlePrev}
                  aria-label="Previous Workflow Stage"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <button
                  className="ad-stage-nav-btn ad-stage-nav-btn--primary"
                  onClick={handleNext}
                  aria-label="Next Workflow Stage"
                >
                  <span>Next Stage</span>
                  <ChevronRight size={16} />
                </button>

                <div
                  className="ad-stage-auto-indicator"
                  title="Automated 9-stage architectural drafting pipeline"
                  aria-label="Auto-advance status"
                >
                  <span className="ad-auto-pulse-dot" aria-hidden="true" />
                  <span>{isPaused ? 'Paused on Hover' : 'Automated Flow'}</span>
                </div>
              </div>
            </div>

            {/* Right Console: Quality Gate & Blueprint Schematic */}
            <div className="ad-stage-schematic-deck">
              <div className="ad-schematic-header">
                <div className="ad-schematic-header-left">
                  <ShieldCheck size={14} className="ad-schematic-shield" />
                  <span>STAGE VERIFICATION GATE</span>
                </div>
                <div className="ad-schematic-id">
                  DS-GATE-0{activeStage + 1}
                </div>
              </div>

              <div className="ad-schematic-checklist">
                <div className="ad-check-row">
                  <div className="ad-check-dot passed" />
                  <div className="ad-check-text">
                    <strong>Identity Verification:</strong> Certified {current.role} session authenticated.
                  </div>
                </div>
                <div className="ad-check-row">
                  <div className="ad-check-dot passed" />
                  <div className="ad-check-text">
                    <strong>CAD Layer Conformance:</strong> Architectural units set to millimeters; line weights locked.
                  </div>
                </div>
                <div className="ad-check-row">
                  <div className="ad-check-dot active" />
                  <div className="ad-check-text">
                    <strong>Milestone Status:</strong> {current.badge} active and awaiting sign-off.
                  </div>
                </div>
              </div>

              {/* Drawing Preview Tile */}
              <div className="ad-schematic-visual-container">
                <img
                  src={activeStage % 2 === 0 ? "/archidraft/blueprint.jpg" : "/archidraft/version-comparison.jpg"}
                  alt="Stage Drawing Preview"
                  className="ad-schematic-img"
                />
                <div className="ad-schematic-overlay-lines" />
                <div className="ad-schematic-stamp-watermark">
                  <span>STAGE {current.num}</span>
                  <span className="ad-stamp-sub">{current.title}</span>
                </div>
              </div>

              <div className="ad-schematic-footer">
                <span>AUDIT RECORD: IMMUTABLE TIMESTAMP</span>
                <span>SHA-256 SIGNED</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ArchiDraftWorkflow;
