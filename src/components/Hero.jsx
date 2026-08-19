import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fetchAPI } from '../lib/api';

const defaultHeadlines = [
    "DESIGNING LEGACIES.",
    "CRAFTING EXTRAORDINARY SPACES.",
    "ARCHITECTURE REDEFINED.",
    "SPACES THAT INSPIRE.",
    "SHAPING TOMORROW.",
    "VISION. DESIGN. IMPACT."
];

const Hero = () => {
    const { scrollY } = useScroll();
    // Subtle parallax for background
    const yBg = useTransform(scrollY, [0, 1000], [0, 150]);
    // Even more subtle parallax for content
    const yContent = useTransform(scrollY, [0, 1000], [0, 50]);

    const [heroData, setHeroData] = useState(null);
    const [headlineIndex, setHeadlineIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch hero data from admin panel API
    useEffect(() => {
        (async () => {
            const { data } = await fetchAPI('/hero');
            if (data && !data.error) {
                setHeroData(data);
            }
            setLoading(false);
        })();
    }, []);

    // Build headlines array — use dynamic headline if available
    const headlines = heroData?.headline
        ? [heroData.headline, ...defaultHeadlines.slice(1)]
        : defaultHeadlines;

    // Rotating headline effect (4-second pause)
    useEffect(() => {
        const interval = setInterval(() => {
            setHeadlineIndex((prev) => (prev + 1) % headlines.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [headlines.length]);

    const fadeSlideAnim = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { y: -30, opacity: 0, transition: { duration: 0.6, ease: "easeIn" } }
    };

    // Dynamic description from API or fallback
    const description = heroData?.subheadline ||
        "Creating timeless environments through precision, innovation, and exceptional design excellence.";

    // Dynamic CTA
    const ctaText = heroData?.cta_text || "VIEW PROJECTS";
    const ctaLink = heroData?.cta_link || "#projects";

    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxSizing: 'border-box'
        }}>
            {/* Parallax Background Image */}
            <motion.div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '115%',
                zIndex: -3, y: yBg
            }}>
                <img
                    src={heroData?.bg_image_url || "/home page.jpg.jpeg"}
                    alt="Luxury Architectural Interior"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </motion.div>

            {/* Dark Cinematic Overlay */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(5, 5, 8, 0.85)',
                zIndex: -2,
            }} />

            {/* Content Container - Strict Vertical Hierarchy */}
            <motion.div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '1200px',
                    width: '100%',
                    zIndex: 1,
                    y: yContent
                }}
            >
                {/* 1. Large Logo (250-300% increase) with architectural accents */}
                <div style={{
                    position: 'relative',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Subtle outer architectural rings */}
                    <div style={{
                        position: 'absolute',
                        width: '280px', height: '280px',
                        border: '1px solid rgba(197, 160, 89, 0.1)',
                        borderRadius: '50%',
                        zIndex: -1
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: '240px', height: '240px',
                        border: '1px dashed rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        zIndex: -1
                    }} />
                    
                    <img
                        src="/draughtsmanstudio.jpg"
                        alt="Draughtsman Studio Logo"
                        style={{ 
                            width: '200px', 
                            height: '200px', 
                            objectFit: 'cover', 
                            borderRadius: '50%',
                            border: '2px solid var(--color-accent)',
                            boxShadow: '0 0 50px rgba(197, 160, 89, 0.2)'
                        }}
                    />
                </div>

                {/* 2. DRAUGHTSMAN STUDIO Branding */}
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
                    fontWeight: 800,
                    letterSpacing: '14px',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    margin: '0 0 3rem 0',
                    lineHeight: 1.2
                }}>
                    DRAUGHTSMAN STUDIO
                </h2>

                {/* 3. Hero Headline (Fixed height to prevent layout shifts) */}
                <div style={{ 
                    height: 'auto', 
                    minHeight: 'clamp(120px, 20vw, 240px)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '2rem', 
                    width: '100%',
                    position: 'relative'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={headlineIndex}
                            variants={fadeSlideAnim}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{
                                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                                fontFamily: 'var(--font-heading)',
                                lineHeight: 1.1,
                                fontWeight: 900,
                                color: 'var(--color-accent)',
                                textTransform: 'uppercase',
                                textShadow: '0 10px 40px rgba(0,0,0,0.9)',
                                margin: 0,
                                position: 'absolute',
                                width: '100%',
                                maxWidth: '1200px'
                            }}
                        >
                            {headlines[headlineIndex]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                {/* 4. Services */}
                <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.7rem, 1.8vw, 0.95rem)',
                    fontWeight: 700,
                    letterSpacing: '6px',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    opacity: 0.9,
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                }}>
                    ARCHITECTURE <span style={{ color: 'var(--color-accent)', margin: '0 1vw' }}>•</span> 
                    INTERIORS <span style={{ color: 'var(--color-accent)', margin: '0 1vw' }}>•</span> 
                    FACADE <span style={{ color: 'var(--color-accent)', margin: '0 1vw' }}>•</span> 
                    STRUCTURAL DESIGN
                </div>

                {/* 5. Description — Dynamic from API */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.2rem',
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: '#E0E0E0',
                    maxWidth: '700px',
                    margin: '0 0 40px 0'
                }}>
                    {description}
                </p>

                {/* 6. CTA Buttons */}
                <div style={{ 
                    display: 'flex', 
                    gap: '2rem', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center',
                    marginBottom: '40px'
                }}>
                    {/* Primary Button — Dynamic CTA */}
                    <button
                        onClick={() => {
                            if (ctaLink.startsWith('#')) {
                                document.getElementById(ctaLink.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.open(ctaLink, '_blank');
                            }
                        }}
                        style={{
                            background: 'var(--color-accent)',
                            color: '#000000',
                            padding: '1.2rem 3rem',
                            border: '1px solid var(--color-accent)',
                            borderRadius: '0px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            letterSpacing: '3px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            minWidth: '240px',
                            transition: 'all 0.4s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--color-accent)';
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                        }}
                    >
                        {ctaText}
                    </button>

                    {/* Secondary Button */}
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            background: 'transparent',
                            color: '#FFFFFF',
                            padding: '1.2rem 3rem',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            borderRadius: '0px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            letterSpacing: '3px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            minWidth: '240px',
                            transition: 'all 0.4s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        }}
                    >
                        BOOK CONSULTATION
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
