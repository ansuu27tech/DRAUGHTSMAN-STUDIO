import { motion } from 'framer-motion';
import ArchitecturalTitle from './ArchitecturalTitle';

const SectionWrapper = ({ children, id, title, subtitle, className = "" }) => {
    return (
        <section
            id={id}
            className={`section-wrapper ${className}`}
            style={{
                padding: '100px 20px',
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative'
            }}
        >
            {/* Building Assembly Animation (Background) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                opacity: 0.1
            }}>
                <svg width="100%" height="100%" preserveAspectRatio="none">
                    <motion.path
                        d="M0,0 L100,0 L100,100 L0,100 Z" // Simplified placeholder, ideally dynamic
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Architectural Section Header */}
                {(title || subtitle) && (
                    <ArchitecturalTitle title={title} subtitle={subtitle} />
                )}

                {/* Content */}
                {children}
            </motion.div>
        </section>
    );
};

export default SectionWrapper;
