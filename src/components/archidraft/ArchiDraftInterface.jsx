import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart3, Layers, CheckCircle2, Maximize2 } from 'lucide-react';

const hotspots = [
  {
    id: 1,
    title: 'Projects & CAD Review Suite',
    icon: Search,
    coord: { top: '12%', left: '26%' },
    desc: 'Central command suite for engineers. Tracks active structural CAD drawing submissions, version revisions, and milestone review gates.'
  },
  {
    id: 2,
    title: 'Submit New Project Portal',
    icon: Layers,
    coord: { top: '18%', left: '26%' },
    desc: 'Instant brief initiation for engineers to define drawing specifications, upload architectural reference files, and request drafting assignments.'
  },
  {
    id: 3,
    title: 'Milestone & Drawing Counters',
    icon: BarChart3,
    coord: { top: '32%', left: '48%' },
    desc: 'Live counters tracking Active DWG (4 in progress), Pending Review (0), and Completed deliverables (11 all phases) with tamper-evident status.'
  },
  {
    id: 4,
    title: 'Active Technical Deliverables',
    icon: CheckCircle2,
    coord: { top: '55%', left: '50%' },
    desc: 'Project cards with verified completion badges, project locations (e.g., Metro Tech Park Core & Shell), and direct drawing version drill-downs.'
  }
];

const ArchiDraftInterface = () => {
  const [activeHotspot, setActiveHotspot] = useState(hotspots[0]);

  return (
    <section className="ad-interface" id="ad-interface" aria-label="Interface Showcase">
      <div className="ad-interface-inner">
        {/* Header */}
        <div className="ad-interface-header">
          <div className="ad-section-eyebrow" aria-hidden="true">
            <span className="ad-eyebrow-num">06</span>
            <span className="ad-eyebrow-sep">//</span>
            <span className="ad-eyebrow-text">ENGINEERING WORKSTATION</span>
          </div>

          <h2 className="ad-interface-title">
            Designed for Architectural Information Density.
          </h2>
          <p className="ad-interface-subtitle">
            A purpose-built interface that balances deep technical data with effortless visual clarity. 
            Engineers and draughtsmen track sheets, revisions, and approvals without losing context.
          </p>
        </div>

        {/* Workstation Frame with Hotspots */}
        <div className="ad-interface-frame-wrapper">
          <div className="ad-interface-frame">
            {/* Window Chrome */}
            <div className="ad-interface-chrome">
              <div className="ad-chrome-dots">
                <span className="ad-dot ad-dot--red" />
                <span className="ad-dot ad-dot--yellow" />
                <span className="ad-dot ad-dot--green" />
              </div>
              <div className="ad-chrome-url">
                <span>archidraft.internal.draughtsmanstudio.com/workstation/admin</span>
              </div>
              <div className="ad-chrome-actions">
                <Maximize2 size={13} className="ad-chrome-icon" />
              </div>
            </div>

            {/* Screen Image with Hotspots */}
            <div className="ad-interface-screen">
              <img
                src="/archidraft/eng-dashboard.png"
                alt="Archi Draft Real Engineer Dashboard Interface Screenshot"
                className="ad-interface-screenshot"
              />

              {/* Hotspot Markers */}
              {hotspots.map((spot) => {
                const isActive = activeHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    className={`ad-hotspot-pin ${isActive ? 'active' : ''}`}
                    style={{ top: spot.coord.top, left: spot.coord.left }}
                    onClick={() => setActiveHotspot(spot)}
                    aria-label={`Inspect ${spot.title}`}
                  >
                    <span className="ad-hotspot-pulse" />
                    <span className="ad-hotspot-number">0{spot.id}</span>
                  </button>
                );
              })}

              {/* Active Hotspot In-Situ Callout Banner */}
              <AnimatePresence mode="wait">
                {activeHotspot && (
                  <motion.div
                    key={activeHotspot.id}
                    className="ad-hotspot-floating-callout"
                    initial={{ opacity: 0, scale: 0.95, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 4 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    aria-live="polite"
                  >
                    <div className="ad-callout-header">
                      <span className="ad-callout-pill">FEATURE 0{activeHotspot.id}</span>
                      <strong className="ad-callout-title">{activeHotspot.title}</strong>
                    </div>
                    <p className="ad-callout-body">{activeHotspot.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Interactive Hotspot Feature Cards */}
        <div className="ad-interface-hotspots-grid">
          {hotspots.map((spot) => {
            const isActive = activeHotspot.id === spot.id;
            const Icon = spot.icon;
            return (
              <button
                key={spot.id}
                className={`ad-interface-hotspot-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveHotspot(spot)}
              >
                <div className="ad-hotspot-card-top">
                  <span className="ad-hotspot-card-num">0{spot.id}</span>
                  <Icon size={16} className="ad-hotspot-card-icon" />
                </div>
                <h3 className="ad-hotspot-card-title">{spot.title}</h3>
                <p className="ad-hotspot-card-desc">{spot.desc}</p>
                <div className="ad-hotspot-card-accent" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftInterface;
