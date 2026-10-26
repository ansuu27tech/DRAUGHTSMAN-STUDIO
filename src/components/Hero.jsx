import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fetchAPI } from '../lib/api';

const defaultHeadlines = [
    "DESIGNING LEGACIES.",
    "WHERE ARCHITECTURAL IDEAS BECOME ORGANIZED WORKFLOWS.",
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

    // Fetch hero data from admin panel API with graceful fallback
    useEffect(() => {
        let isMounted = true;
        (async () => {
            const { data, isLive } = await fetchAPI('/hero');
            if (isMounted && data && !data.error) {
                setHeroData(data);
                if (import.meta.env?.DEV && isLive) {
                    console.info('[Hero] Displaying live API headline.');
                }
            }
        })();
        return () => { isMounted = false; };
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
            paddingTop: 'clamp(4.5rem, 8vh, 6.5rem)',
            paddingBottom: 'clamp(7.5rem, 15vh, 10rem)',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
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

            {/* Content Container - Strict Clean Hierarchy */}
            <motion.div
                data-testid="hero-content"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '1100px',
                    width: '100%',
                    zIndex: 1,
                    y: yContent,
                    margin: 'auto 0'
                }}
            >
                {/* 1. Studio Logo with Proportional Architectural Accent Rings */}
                <div 
                    data-testid="hero-logo-container"
                    style={{
                        position: 'relative',
                        marginBottom: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* Concentric subtle architectural rings safely bounded to logo dimensions */}
                    <div style={{
                        position: 'absolute',
                        inset: '-12px',
                        border: '1px solid rgba(197, 160, 89, 0.25)',
                        borderRadius: '50%',
                        pointerEvents: 'none'
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: '-6px',
                        border: '1px dashed rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        pointerEvents: 'none'
                    }} />

                    <img
                        src="/draughtsmanstudio.jpg"
                        alt="Draughtsman Studio Logo"
                        style={{ 
                            width: 'clamp(68px, 10vw, 100px)', 
                            height: 'clamp(68px, 10vw, 100px)', 
                            objectFit: 'cover', 
                            borderRadius: '50%',
                            border: '2px solid var(--color-accent)',
                            boxShadow: '0 0 28px rgba(197, 160, 89, 0.25)',
                            display: 'block'
                        }}
                    />
                </div>

                {/* 2. DRAUGHTSMAN STUDIO Brand Wordmark */}
                <h2 
                    data-testid="hero-wordmark"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(0.82rem, 1.8vw, 1.45rem)',
                        fontWeight: 700,
                        letterSpacing: 'clamp(2.5px, 0.5vw, 6.5px)',
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        margin: '0 0 1rem 0',
                        lineHeight: 1.25,
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                        textAlign: 'center'
                    }}
                >
                    DRAUGHTSMAN STUDIO
                </h2>

                {/* 3. Hero Rotating Headline — Clean Document Flow Container */}
                <div 
                    data-testid="hero-headline-container"
                    style={{ 
                        minHeight: 'clamp(54px, 10vw, 110px)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginBottom: '1rem', 
                        width: '100%',
                        maxWidth: '1040px',
                        position: 'relative'
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={headlineIndex}
                            data-testid="hero-headline"
                            variants={fadeSlideAnim}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{
                                fontSize: 'clamp(1.4rem, 3.4vw, 3.1rem)',
                                fontFamily: 'var(--font-heading)',
                                lineHeight: 1.18,
                                fontWeight: 900,
                                color: 'var(--color-accent)',
                                textTransform: 'uppercase',
                                textShadow: '0 8px 30px rgba(0,0,0,0.85)',
                                margin: 0,
                                width: '100%',
                                maxWidth: '1040px',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                                letterSpacing: 'clamp(0.5px, 0.2vw, 1.5px)',
                                textAlign: 'center'
                            }}
                        >
                            {headlines[headlineIndex]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                {/* 4. Category Disciplines */}
                <div 
                    data-testid="hero-categories"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem 0.65rem',
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(0.62rem, 1vw, 0.8rem)',
                        fontWeight: 700,
                        letterSpacing: 'clamp(1.5px, 0.3vw, 3px)',
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        opacity: 0.9,
                        maxWidth: '850px',
                        width: '100%',
                        marginBottom: '1rem',
                        padding: '0 0.5rem'
                    }}
                >
                    <span>ARCHITECTURE</span>
                    <span style={{ color: 'var(--color-accent)', opacity: 0.8 }}>•</span> 
                    <span>INTERIORS</span>
                    <span style={{ color: 'var(--color-accent)', opacity: 0.8 }}>•</span> 
                    <span>FACADE</span>
                    <span style={{ color: 'var(--color-accent)', opacity: 0.8 }}>•</span> 
                    <span>STRUCTURAL DESIGN</span>
                </div>

                {/* 5. Supporting Description */}
                <p 
                    data-testid="hero-description"
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.88rem, 1.2vw, 1.05rem)',
                        fontWeight: 300,
                        lineHeight: 1.6,
                        color: 'rgba(235, 235, 235, 0.85)',
                        maxWidth: '640px',
                        width: '100%',
                        margin: '0 0 1.5rem 0',
                        padding: '0 0.5rem'
                    }}
                >
                    {description}
                </p>

                {/* 6. CTA Action Buttons */}
                <div 
                    data-testid="hero-cta-group"
                    style={{ 
                        display: 'flex', 
                        gap: 'clamp(0.6rem, 1.2vw, 1.25rem)', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '960px',
                        marginBottom: '0.5rem'
                    }}
                >
                    {/* Primary Button — Dynamic CTA */}
                    <button
                        data-testid="hero-btn-primary"
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
                            padding: 'clamp(0.7rem, 1.2vw, 0.95rem) clamp(1rem, 1.8vw, 1.75rem)',
                            border: '1px solid var(--color-accent)',
                            borderRadius: '0px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            letterSpacing: '1.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                            textTransform: 'uppercase',
                            minWidth: 'clamp(130px, 16vw, 175px)',
                            transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.2s ease'
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

                    {/* Archi Draft Platform CTA */}
                    <button
                        data-testid="hero-btn-archidraft"
                        onClick={() => { window.location.hash = '#archi-draft'; }}
                        style={{
                            background: 'rgba(198, 169, 105, 0.15)',
                            color: '#C6A969',
                            padding: 'clamp(0.7rem, 1.2vw, 0.95rem) clamp(1rem, 1.8vw, 1.75rem)',
                            border: '1px solid #C6A969',
                            borderRadius: '0px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            letterSpacing: '1.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                            textTransform: 'uppercase',
                            minWidth: 'clamp(130px, 16vw, 175px)',
                            transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#C6A969';
                            e.currentTarget.style.color = '#000000';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(198, 169, 105, 0.15)';
                            e.currentTarget.style.color = '#C6A969';
                        }}
                    >
                        EXPLORE ARCHI DRAFT ↗
                    </button>

                    {/* Secondary Button */}
                    <button
                        data-testid="hero-btn-secondary"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            background: 'transparent',
                            color: '#FFFFFF',
                            padding: 'clamp(0.7rem, 1.2vw, 0.95rem) clamp(1rem, 1.8vw, 1.75rem)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            borderRadius: '0px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            letterSpacing: '1.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                            textTransform: 'uppercase',
                            minWidth: 'clamp(130px, 16vw, 175px)',
                            transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.2s ease'
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
