import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ArchitecturalTitle = ({ title, subtitle, align = "center" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Stretch effect based on scroll
    const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
    const smoothScale = useSpring(scaleX, { stiffness: 100, damping: 20 });

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9]
            }
        })
    };

    return (
        <div ref={ref} style={{ marginBottom: '60px', textAlign: align, position: 'relative' }}>
            {/* Subtitle with architectural line */}
            {subtitle && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: align === 'center' ? 'center' : 'flex-start',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '40px' }}
                        transition={{ duration: 0.8 }}
                        style={{ height: '1px', background: 'var(--color-accent)' }}
                    />
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-accent)',
                        fontSize: '0.8rem',
                        letterSpacing: '4px',
                        textTransform: 'uppercase'
                    }}>
                        {subtitle}
                    </span>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '40px' }}
                        transition={{ duration: 0.8 }}
                        style={{ height: '1px', background: 'var(--color-accent)' }}
                    />
                </div>
            )}

            {/* Title with letter stagger and stretch */}
            <motion.h2
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    textTransform: 'uppercase',
                    position: 'relative',
                    display: 'inline-block',
                    scaleX: smoothScale, // Subtle stretch
                    transformOrigin: align === 'center' ? 'center' : 'left'
                }}
            >
                {title.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        custom={index}
                        variants={letterVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ display: 'inline-block', minWidth: char === ' ' ? '0.5em' : 'auto' }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.h2>
        </div>
    );
};

export default ArchitecturalTitle;
