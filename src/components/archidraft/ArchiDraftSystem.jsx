import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSTEM_ROLES } from './archidraft.config';
import { Shield, Check, Terminal, Users, Compass, GraduationCap, ChevronRight } from 'lucide-react';

const roleIcons = {
  engineer: Compass,
  admin: Users,
  draughtsman: Terminal,
  student: GraduationCap
};

const ArchiDraftSystem = () => {
  const [activeRoleId, setActiveRoleId] = useState('engineer');
  const activeRole = SYSTEM_ROLES.find(r => r.id === activeRoleId) || SYSTEM_ROLES[0];
  const Icon = roleIcons[activeRole.id] || Compass;

  return (
    <section className="ad-system" id="ad-system" aria-label="Role-Based Architectural Governance">
      <div className="ad-system-inner">
        {/* Header */}
        <div className="ad-system-header">
          <div className="ad-section-eyebrow" aria-hidden="true">
            <span className="ad-eyebrow-num">05</span>
            <span className="ad-eyebrow-sep">//</span>
            <span className="ad-eyebrow-text">ROLE CONSOLES</span>
          </div>

          <h2 className="ad-system-title">
            Four Dedicated Workstations.<br />
            Zero Permeability.
          </h2>
          <p className="ad-system-subtitle">
            Every architectural discipline works inside a purpose-built console. 
            Engineers review and stamp; Draughtsmen produce drawings; Admins orchestrate throughput; Apprentices train in sandboxes.
          </p>
        </div>

        {/* Role Selector Tabs (Apple-Style Fluid Segmented Control) */}
        <div className="ad-system-tabs" role="tablist" aria-label="System Roles">
          {SYSTEM_ROLES.map((role) => {
            const TabIcon = roleIcons[role.id];
            const isSelected = role.id === activeRoleId;

            return (
              <button
                key={role.id}
                className={`ad-system-tab ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveRoleId(role.id)}
                role="tab"
                aria-selected={isSelected}
              >
                {isSelected && (
                  <motion.div
                    layoutId="roleActiveIndicator"
                    className="ad-system-tab-active-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="ad-system-tab-content">
                  <TabIcon size={16} className="ad-tab-icon" />
                  <span className="ad-tab-label">{role.title}</span>
                  <span className="ad-tab-badge">{role.clearance.split('—')[0].trim()}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Console Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole.id}
            className="ad-system-console"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Left Console Deck */}
            <div className="ad-role-spec-deck">
              <div className="ad-role-top-meta">
                <span className="ad-role-clearance">
                  <Shield size={12} />
                  {activeRole.clearance}
                </span>
                <span className="ad-role-id-tag">CONSOLE ID: DS-ROLE-{activeRole.id.toUpperCase()}</span>
              </div>

              <div className="ad-role-brand-row">
                <div className="ad-role-icon-box">
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="ad-role-title">{activeRole.roleName}</h3>
                  <p className="ad-role-tagline">{activeRole.tagline}</p>
                </div>
              </div>

              {/* Core Capabilities */}
              <div className="ad-role-capabilities">
                <h4 className="ad-capabilities-title">MANDATED ROLE POWERS</h4>
                <div className="ad-capabilities-list">
                  {activeRole.capabilities.map((cap, i) => (
                    <div key={i} className="ad-capability-item">
                      <div className="ad-capability-check">
                        <Check size={12} />
                      </div>
                      <span className="ad-capability-text">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toolset Badges */}
              <div className="ad-role-toolset">
                <span className="ad-toolset-label">ACTIVE MODULES:</span>
                <div className="ad-toolset-tags">
                  {activeRole.toolset.map((tool, i) => (
                    <span key={i} className="ad-toolset-pill">{tool}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Simulator Preview */}
            <div className="ad-role-simulator-deck">
              <div className="ad-simulator-frame">
                <div className="ad-simulator-bar">
                  <span className="ad-simulator-title">ARCHI DRAFT // {activeRole.title} WORKSTATION</span>
                  <span className="ad-simulator-status">PERMISSION: GRANTED</span>
                </div>

                <div className="ad-simulator-screen">
                  {activeRole.id === 'engineer' && (
                    <div className="ad-sim-view ad-sim-view--engineer">
                      <div className="ad-sim-card">
                        <div className="ad-sim-card-header">
                          <span>PENDING ENGINEERING REVIEWS (3)</span>
                          <span className="ad-sim-tag-gold">ACTION REQUIRED</span>
                        </div>
                        <div className="ad-sim-row">
                          <span>#DS-108: Structural Diagrid Rev 02</span>
                          <span className="ad-sim-btn">Open Redline Tool →</span>
                        </div>
                        <div className="ad-sim-row">
                          <span>#DS-112: Core Elevator Shaft Sections</span>
                          <span className="ad-sim-btn">Open Redline Tool →</span>
                        </div>
                      </div>
                      <div className="ad-sim-stamp-preview">
                        <div className="ad-sim-stamp-box">
                          <span>DIGITAL ENGINEERING STAMP READY</span>
                          <strong>VERIFIED REGISTRATION: #TN-ARCH-8492</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeRole.id === 'admin' && (
                    <div className="ad-sim-view ad-sim-view--admin">
                      <div className="ad-sim-metrics-grid">
                        <div className="ad-sim-metric">
                          <span className="ad-sim-metric-val">14</span>
                          <span className="ad-sim-metric-lbl">ACTIVE PROJECTS</span>
                        </div>
                        <div className="ad-sim-metric">
                          <span className="ad-sim-metric-val">100%</span>
                          <span className="ad-sim-metric-lbl">SLA COMPLIANCE</span>
                        </div>
                        <div className="ad-sim-metric">
                          <span className="ad-sim-metric-val">8</span>
                          <span className="ad-sim-metric-lbl">DRAUGHTSMEN ON DUTY</span>
                        </div>
                      </div>
                      <div className="ad-sim-card" style={{ marginTop: '1rem' }}>
                        <div className="ad-sim-card-header">
                          <span>DISPATCH MATRIX</span>
                          <span className="ad-sim-tag-green">ALL ASSIGNED</span>
                        </div>
                        <div className="ad-sim-row">
                          <span>Kudoos Malik (Lead) → Cantilever Civic Center</span>
                          <span className="text-muted">STAGE 05 (DRAFT)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeRole.id === 'draughtsman' && (
                    <div className="ad-sim-view ad-sim-view--draughtsman">
                      <div className="ad-sim-card">
                        <div className="ad-sim-card-header">
                          <span>ACTIVE CAD DRAFTING TASK</span>
                          <span className="ad-sim-tag-gold">IN PROGRESS</span>
                        </div>
                        <div className="ad-sim-sheet-meta">
                          <div><strong>SHEET:</strong> S-204 (Column Layout)</div>
                          <div><strong>CAD STANDARD:</strong> BS EN ISO 13567</div>
                          <div><strong>LAST REDLINE:</strong> Grid line 4 offset by +150mm</div>
                        </div>
                        <div className="ad-sim-upload-box">
                          <span>Drop DWG Package or PDF Plot to commit Rev-02</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeRole.id === 'student' && (
                    <div className="ad-sim-view ad-sim-view--student">
                      <div className="ad-sim-card">
                        <div className="ad-sim-card-header">
                          <span>APPRENTICE GUILD SANDBOX</span>
                          <span className="ad-sim-tag-blue">TRAINING MODE</span>
                        </div>
                        <div className="ad-sim-row">
                          <span>Project: Residential Villa Sectional Study</span>
                          <span className="ad-sim-btn">Download Starter DWG →</span>
                        </div>
                        <div className="ad-sim-row">
                          <span>Feedback: Redlines reviewed by Lead Draughtsman</span>
                          <span className="text-success">Score: 94/100</span>
                        </div>
                      </div>
                      <div className="ad-sim-cert-banner">
                        <Shield size={14} />
                        <span>Eligible for Draughtsman Guild Verification Token upon completion</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ArchiDraftSystem;
