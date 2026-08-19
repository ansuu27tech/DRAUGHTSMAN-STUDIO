import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fetchAPI } from '../lib/api';

const AboutStudio = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data } = await fetchAPI('/about');
            if (data && !data.error) {
                setAboutData(data);
            }
            setLoading(false);
        })();
    }, []);

    return (
        <SectionWrapper id="about">
            {/* Subtle Wireframe Building Illustration (After Team Section) */}
            <div style={{
                position: 'absolute',
                top: '-150px',
                left: 0,
                width: '100%',
                height: '300px',
                opacity: 0.05,
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end'
            }}>
                <svg width="100%" height="100%" viewBox="0 0 1200 300" preserveAspectRatio="none">
                    <path
                        d="M0,300 L0,250 L50,250 L50,150 L100,150 L100,280 L150,280 L150,100 L250,100 L250,280 L300,280 L300,50 L400,50 L400,280 L450,280 L450,120 L550,120 L550,280 L600,280 L600,80 L700,80 L700,280 L750,280 L750,180 L850,180 L850,280 L900,280 L900,220 L1000,220 L1000,280 L1050,280 L1050,260 L1200,260 L1200,300 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        style={{ color: 'var(--color-text-primary)' }}
                    />
                    <path
                        d="M50,160 L50,240 M100,160 L100,270 M150,110 L150,270 M250,110 L250,270 M300,60 L300,270 M400,60 L400,270 M450,130 L450,270 M550,130 L550,270 M600,90 L600,270 M700,90 L700,270 M750,190 L750,270 M850,190 L850,270"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
                    />
                </svg>
            </div>

            {/* Loading State */}
            {loading && (
                <div style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    borderRadius: '24px',
                    padding: '4rem 3rem',
                    height: '350px',
                    background: 'linear-gradient(110deg, rgba(210,180,140,0.3) 30%, rgba(210,180,140,0.5) 50%, rgba(210,180,140,0.3) 70%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                }}>
                    <style>{`
                        @keyframes shimmer {
                            0% { background-position: 200% 0; }
                            100% { background-position: -200% 0; }
                        }
                    `}</style>
                </div>
            )}

            {!loading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        background: '#D2B48C',
                        borderRadius: '24px',
                        padding: '4rem 3rem',
                        textAlign: 'center',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        position: 'relative',
                        overflow: 'hidden',
                        color: '#1a1a1a'
                    }}
                >
                    <div style={{
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <h2 style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            marginBottom: '1rem',
                            color: '#1a1a1a',
                            letterSpacing: '-1px',
                            lineHeight: '1.1'
                        }}>
                            {aboutData?.title || aboutData?.headline || "ABOUT DRAUGHTSMAN STUDIO"}
                        </h2>

                        <h3 style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            marginBottom: '2.5rem',
                            color: '#4a4a4a',
                            borderTop: '1px solid rgba(0,0,0,0.1)',
                            borderBottom: '1px solid rgba(0,0,0,0.1)',
                            padding: '1rem 0',
                            display: 'inline-block'
                        }}>
                            {aboutData?.stats || "12+ Years of Architectural Drafting Excellence"}
                        </h3>

                        <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.15rem',
                            lineHeight: '1.8',
                            color: '#2a2a2a',
                            maxWidth: '750px',
                            margin: '0 auto'
                        }}>
                            {(aboutData?.content || aboutData?.body_html) ? (
                                <div className="prose prose-sm md:prose-base mx-auto text-[#2a2a2a]" dangerouslySetInnerHTML={{ __html: aboutData.content || aboutData.body_html }} />
                            ) : (
                                <>
                                    <p style={{ marginBottom: '1.5rem' }}>
                                        We are a premier drafting studio dedicated to transforming architectural concepts into precise, execution-ready realities. With over a decade of experience, we bridge the gap between creative vision and on-site engineering, ensuring every line drawn serves a purpose.
                                    </p>
                                    <p style={{ marginBottom: 0 }}>
                                        From complex high-rise structures to detailed residential interiors, our work defines precision. We specialize in GFCs and approval drawings that streamline construction and compliance, supporting architects and developers with unwavering reliability.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Subtle Grain Overlay for Texture */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.05,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        zIndex: 0,
                        pointerEvents: 'none'
                    }} />

                </motion.div>
            )}
        </SectionWrapper>
    );
};

export default AboutStudio;
