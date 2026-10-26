import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from './archidraft.config';
import { ChevronDown, HelpCircle } from 'lucide-react';

const categories = ['All', 'Platform', 'Roles & Workflow', 'Certification & Trust', 'Support & Privacy'];

const ArchiDraftFAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0); // Open the first question by default

  const filteredItems = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === activeCategory);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="ad-faq" id="ad-faq" aria-label="Frequently Asked Questions">
      <div className="ad-faq-inner">
        {/* Header */}
        <div className="ad-faq-header">
          <div className="ad-section-eyebrow" aria-hidden="true">
            <span className="ad-eyebrow-num">11</span>
            <span className="ad-eyebrow-sep">//</span>
            <span className="ad-eyebrow-text">TECHNICAL INQUIRIES</span>
          </div>

          <h2 className="ad-faq-title">
            Frequently Asked Questions.
          </h2>
          <p className="ad-faq-subtitle">
            Essential specifications regarding the Archi Draft platform, CAD format compatibility, 9-stage review mechanics, and certificate verification.
          </p>
        </div>

        {/* Category Filter Pills (Apple Fluid Segmented Indicator) */}
        <div className="ad-faq-categories" role="tablist" aria-label="FAQ Categories">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                className={`ad-faq-category-btn ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                role="tab"
                aria-selected={isSelected}
              >
                {isSelected && (
                  <motion.div
                    layoutId="faqActivePill"
                    className="ad-faq-category-pill-indicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="ad-faq-category-text">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List with Physical Spring Expansion */}
        <div className="ad-faq-accordion-list">
          {filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`ad-faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="ad-faq-question-btn"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItem(idx);
                    }
                  }}
                >
                  <span className="ad-faq-q-text">{item.q}</span>
                  <div className={`ad-faq-chevron ${isOpen ? 'open' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      className="ad-faq-answer-container"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    >
                      <div className="ad-faq-answer-inner">
                        <p>{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftFAQ;
