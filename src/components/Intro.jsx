import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Intro = () => {
    // Logo SVG Path (Abstract DS Cube/Architectural shape)
    const logoPath = "M50 20 L90 40 L90 90 L50 110 L10 90 L10 40 Z M50 20 L50 70 M10 40 L50 70 L90 40 M50 70 L50 110";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.3,
            transition: { duration: 1, delay: 0.2 }
        }
    };

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 0.2 }
            }
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

    const shineVariants = {
        hidden: { rotate: 45, x: -100, opacity: 0 },
        visible: {
            x: 200,
            opacity: [0, 1, 0],
            transition: { delay: 2.5, duration: 1, ease: "linear" }
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

        </motion.div>
    );
};

export default Intro;
