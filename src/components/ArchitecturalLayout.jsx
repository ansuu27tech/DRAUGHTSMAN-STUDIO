import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ArchitecturalLayout = () => {
    const { scrollY } = useScroll();
    const { theme } = useTheme();

    // Background Color Shift
    const darkColors = ['#0a0a0a', '#111215', '#0a0a0a', '#121316', '#0a0a0a'];
    const lightColors = ['#F9F8F6', '#EDE8DF', '#F5F2EA', '#EDE8DF', '#F9F8F6'];

    const activeColors = theme === 'light' ? lightColors : darkColors;

    const bgColor = useTransform(
        scrollY,
        [0, 1000, 2000, 3000, 4000],
        activeColors
    );

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -10,
                backgroundColor: bgColor,
                overflow: 'hidden'
            }}
        >
            {/* Grid overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px),
                                 linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
                backgroundSize: '100px 100px',
                pointerEvents: 'none'
            }} />


        </motion.div>
    );
};

export default ArchitecturalLayout;
