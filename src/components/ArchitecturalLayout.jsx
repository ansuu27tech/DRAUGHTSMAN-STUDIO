import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ArchitecturalLayout = () => {
    const { scrollY } = useScroll();
    const { theme } = useTheme();

    // Parallax Effect for Big Text
    const y1 = useTransform(scrollY, [0, 5000], [0, 1000]);
    const opacity = useTransform(scrollY, [0, 500], [0.05, 0.02]);

    // Background Color Shift
    const darkColors = ['#0a0a0a', '#1a1a1a', '#0a0a0a', '#1a1a1a', '#0a0a0a'];
    const lightColors = ['#F6F1E6', '#E6E1D8', '#F6F1E6', '#E6E1D8', '#F6F1E6'];

    // Note: The original code had specific hexes '#f5f5f5' etc. I am mapping them to semantic theme colors to ensure consistency.
    // If we want to keep the exact original behavior for Dark Mode, we should use the exact original hex codes for darkColors.
    // Original: ['#050505', '#f5f5f5', '#0f0f0f', '#f5f5f5', '#050505']
    // User said: "Keep existing Dark Theme completely unchanged."
    // So for Dark Mode, I MUST use the original values.

    const darkThemeOriginalColors = ['#050505', '#f5f5f5', '#0f0f0f', '#f5f5f5', '#050505'];
    // Wait, '#f5f5f5' is widely used in the original dark mode trace? 
    // If the original site flashed white on scroll, then I should keep it.
    // Use the original array for dark mode.

    const activeColors = theme === 'light' ? lightColors : darkThemeOriginalColors;

    const bgColor = useTransform(
        scrollY,
        [0, 1000, 2000, 3000, 4000],
        activeColors
    );

    // Smooth color transition
    const smoothColor = useSpring(bgColor, { stiffness: 50, damping: 20 });

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -10,
                backgroundColor: smoothColor,
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
