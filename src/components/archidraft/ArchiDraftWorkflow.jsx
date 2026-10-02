import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Create a New Project',
    description: 'Start a fresh project or choose from professional architectural templates to accelerate your workflow.',
  },
  {
    num: '02',
    title: 'Draft Your Design',
    description: 'Use precision drafting tools — draw walls, dimensions, annotations, and architectural elements with ease.',
  },
  {
    num: '03',
    title: 'Organize with Layers',
    description: 'Structure your drawing using layers for different building systems — electrical, plumbing, structural, and more.',
  },
  {
    num: '04',
    title: 'Review & Annotate',
    description: 'Add notes, mark revisions, and collaborate with your team by sharing annotated project files.',
  },
  {
    num: '05',
    title: 'Export & Deliver',
    description: 'Export final drawings in standard formats, ready for client presentations, contractor handoff, or permit submission.',
  },
];

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ArchiDraftWorkflow = () => {
  return (
    <section className="ad-section" id="ad-workflow" aria-label="How Archi Draft Works">
      <div className="ad-section-inner">
        <p className="ad-section-label">How It Works</p>
        <h2 className="ad-section-title">From Concept to Construction Documents</h2>
        <div className="ad-divider" aria-hidden="true" />
        <p className="ad-section-desc">
          Archi Draft streamlines the entire drafting process into five intuitive steps.
        </p>

        <div className="ad-workflow-steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="ad-workflow-step"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stepVariants}
            >
              <div className="ad-workflow-step-num" aria-label={`Step ${step.num}`}>
                {step.num}
              </div>
              <div className="ad-workflow-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchiDraftWorkflow;
