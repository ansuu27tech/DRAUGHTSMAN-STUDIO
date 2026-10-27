import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onDismiss }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                onDismiss?.();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onDismiss]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            filter: "blur(8px)",
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.3,
            transition: { duration: 1, delay: 0.2 }
        }
    };

    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { delay: 2.2, duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="intro-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'var(--color-bg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                overflow: 'hidden'
            }}
        >
            {/* Background Blueprint Grid */}
            <motion.div
                variants={gridVariants}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `
                        linear-gradient(var(--grid-color) 1px, transparent 1px),
                        linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    pointerEvents: 'none'
                }}
            />

            {/* Logo Animation */}
            <div style={{ position: 'relative', width: 120, height: 130, marginBottom: 40 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ width: '150px', height: '150px' }}
                >
                    <img
                        src="/draughtsmanstudio.jpg"
                        alt="Draughtsman Studio Logo"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </motion.div>
            </div>

            {/* Text Reveal */}
            <motion.h1
                variants={textVariants}
                style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    letterSpacing: '0.2em',
                    color: 'var(--color-text-primary)',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    position: 'relative'
                }}
            >
                Draughtsman Studio
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: -10,
                        left: '50%',
                        x: '-50%',
                        width: '100%',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
                        opacity: 0.5
                    }}
                />
            </motion.h1>

            {/* Skip Intro Button */}
            <motion.button
                onClick={onDismiss}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    color: 'var(--color-text-secondary)',
                    padding: '0.4rem 1.2rem',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    backdropFilter: 'blur(8px)',
                    zIndex: 10
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C5A059';
                    e.currentTarget.style.borderColor = '#C5A059';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.3)';
                }}
            >
                Skip Intro [ESC]
            </motion.button>
        </motion.div>

    );
};

export default Intro;
