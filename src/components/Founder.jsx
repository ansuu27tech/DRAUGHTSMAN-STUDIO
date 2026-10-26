import React from 'react';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { Instagram, Compass, Layers, ShieldCheck } from 'lucide-react';

const Leadership = () => {
    return (
        <SectionWrapper id="founder" title="TheDraughtsMan" subtitle="Leadership">
            <div style={{
                maxWidth: '1080px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Executive Founder Presentation Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                        background: 'radial-gradient(ellipse at 20% 50%, rgba(198, 169, 105, 0.05) 0%, rgba(13, 16, 20, 0.94) 60%, rgba(8, 10, 13, 0.98) 100%)',
                        border: '1px solid rgba(198, 169, 105, 0.22)',
                        borderRadius: '20px',
                        padding: 'clamp(2rem, 4vw, 3.5rem)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(198, 169, 105, 0.05)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Architectural Blueprint Grid Pattern in Card */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                            linear-gradient(to right, rgba(198, 169, 105, 0.035) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(198, 169, 105, 0.035) 1px, transparent 1px)
                        `,
                        backgroundSize: '24px 24px',
                        pointerEvents: 'none',
                        opacity: 0.8
                    }} />

                    {/* Deliberate 2-Column Responsive Layout */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: 'clamp(2rem, 4vw, 3.5rem)',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        {/* Column 1: Dedicated Space for Circular 'MM' Monogram Emblem */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem 0'
                        }}>
                            <div style={{
                                position: 'relative',
                                width: 'clamp(210px, 24vw, 250px)',
                                height: 'clamp(210px, 24vw, 250px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {/* Outer Rotating Drafting Coordinate Ring */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: '50%',
                                        border: '1px dashed rgba(198, 169, 105, 0.35)',
                                        pointerEvents: 'none'
                                    }}
                                />

                                {/* Secondary Precision Coordinate Ring */}
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    right: '12px',
                                    bottom: '12px',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(198, 169, 105, 0.18)',
                                    pointerEvents: 'none'
                                }} />

                                {/* Core Architectural Monogram Disc */}
                                <div style={{
                                    width: '78%',
                                    height: '78%',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle at 35% 30%, #1e1e24 0%, #101014 70%, #08080a 100%)',
                                    border: '1.5px solid #C6A969',
                                    boxShadow: '0 0 35px rgba(198, 169, 105, 0.25), inset 0 0 25px rgba(0, 0, 0, 0.85)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {/* Architectural Grid Background Texture */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundImage: `
                                            linear-gradient(to right, rgba(198, 169, 105, 0.1) 1px, transparent 1px),
                                            linear-gradient(to bottom, rgba(198, 169, 105, 0.1) 1px, transparent 1px)
                                        `,
                                        backgroundSize: '14px 14px',
                                        opacity: 0.7,
                                        pointerEvents: 'none'
                                    }} />

                                    {/* Drafting Crosshairs */}
                                    <div style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(198, 169, 105, 0.35), transparent)',
                                        top: '50%',
                                        pointerEvents: 'none'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: '1px',
                                        background: 'linear-gradient(180deg, transparent, rgba(198, 169, 105, 0.35), transparent)',
                                        left: '50%',
                                        pointerEvents: 'none'
                                    }} />

                                    {/* Approved Monogram 'MM' */}
                                    <div style={{
                                        fontFamily: '"Playfair Display", "Cinzel", "Didot", serif',
                                        fontSize: 'clamp(2.6rem, 4.5vw, 3.4rem)',
                                        fontWeight: 700,
                                        letterSpacing: '4px',
                                        lineHeight: 1,
                                        background: 'linear-gradient(135deg, #FFFFFF 0%, #E8D5A3 45%, #C6A969 80%, #9A7B38 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textShadow: '0 2px 18px rgba(198, 169, 105, 0.4)',
                                        position: 'relative',
                                        zIndex: 2,
                                        marginLeft: '4px'
                                    }}>
                                        MM
                                    </div>

                                    {/* Studio Subtitle Inside Emblem */}
                                    <span style={{
                                        fontFamily: 'var(--font-mono, monospace)',
                                        fontSize: '0.52rem',
                                        letterSpacing: '3px',
                                        color: '#C6A969',
                                        textTransform: 'uppercase',
                                        marginTop: '4px',
                                        opacity: 0.9,
                                        position: 'relative',
                                        zIndex: 2,
                                        fontWeight: 600
                                    }}>
                                        STUDIO LEAD
                                    </span>
                                </div>

                                {/* Cardinal Precision Marks */}
                                <span style={{ position: 'absolute', top: '-6px', fontSize: '0.62rem', color: '#C6A969', fontFamily: 'monospace', opacity: 0.65 }}>00°</span>
                                <span style={{ position: 'absolute', right: '-12px', fontSize: '0.62rem', color: '#C6A969', fontFamily: 'monospace', opacity: 0.65 }}>90°</span>
                                <span style={{ position: 'absolute', bottom: '-6px', fontSize: '0.62rem', color: '#C6A969', fontFamily: 'monospace', opacity: 0.65 }}>180°</span>
                                <span style={{ position: 'absolute', left: '-16px', fontSize: '0.62rem', color: '#C6A969', fontFamily: 'monospace', opacity: 0.65 }}>270°</span>
                            </div>
                        </div>

                        {/* Column 2: Founder Role, Approved Philosophy & Credentials */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem',
                            textAlign: 'left'
                        }}>
                            {/* Governance Badge */}
                            <div>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '5px 14px',
                                    borderRadius: '100px',
                                    background: 'rgba(198, 169, 105, 0.08)',
                                    border: '1px solid rgba(198, 169, 105, 0.25)',
                                    marginBottom: '0.75rem'
                                }}>
                                    <ShieldCheck size={13} color="#C6A969" />
                                    <span style={{
                                        fontFamily: 'var(--font-mono, monospace)',
                                        fontSize: '0.72rem',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        color: '#C6A969',
                                        fontWeight: 600
                                    }}>
                                        EXECUTIVE ARCHITECTURAL PRACTICE
                                    </span>
                                </div>

                                <div style={{
                                    fontFamily: 'var(--font-mono, monospace)',
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    letterSpacing: '2.5px',
                                    textTransform: 'uppercase',
                                    color: 'var(--color-accent)'
                                }}>
                                    FOUNDER & PRINCIPAL LEAD // MM
                                </div>
                            </div>

                            {/* Philosophy Quote Plate */}
                            <div style={{
                                background: 'rgba(0, 0, 0, 0.35)',
                                border: '1px solid rgba(198, 169, 105, 0.15)',
                                borderRadius: '12px',
                                padding: '1.35rem 1.6rem',
                                position: 'relative'
                            }}>
                                <p style={{
                                    lineHeight: 1.8,
                                    color: 'var(--color-text-secondary)',
                                    fontSize: 'clamp(0.92rem, 1.2vw, 1.02rem)',
                                    margin: 0,
                                    fontStyle: 'italic',
                                    fontFamily: 'var(--font-body)'
                                }}>
                                    &ldquo;Architecture is an exact discipline where creative vision must be grounded in structural truth. At Draughtsman Studio, every line drawn carries responsibility—balancing structural integrity, geometric clarity, and timeless execution for the built environment.&rdquo;
                                </p>
                            </div>

                            {/* Architectural Discipline Pillars */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    background: 'rgba(198, 169, 105, 0.04)',
                                    border: '1px solid rgba(198, 169, 105, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: 'rgba(198, 169, 105, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#C6A969',
                                        flexShrink: 0
                                    }}>
                                        <Compass size={18} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>
                                            Technical Precision
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                                            Millimeter tolerance
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    background: 'rgba(198, 169, 105, 0.04)',
                                    border: '1px solid rgba(198, 169, 105, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: 'rgba(198, 169, 105, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#C6A969',
                                        flexShrink: 0
                                    }}>
                                        <Layers size={18} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>
                                            GFC Integrity
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                                            Construction-ready sets
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Studio Social Connection */}
                            <div>
                                <a
                                    href="https://www.instagram.com/draughtsmanthe?igsh=ZGUyc2l6c2d6Z2x5"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Draughtsman Studio on Instagram"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        transition: 'all 0.3s ease',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        textDecoration: 'none',
                                        fontSize: '0.78rem',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        padding: '7px 16px',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(198, 169, 105, 0.25)',
                                        background: 'rgba(255, 255, 255, 0.02)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#C6A969';
                                        e.currentTarget.style.borderColor = '#C6A969';
                                        e.currentTarget.style.boxShadow = '0 0 15px rgba(198, 169, 105, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                                        e.currentTarget.style.borderColor = 'rgba(198, 169, 105, 0.25)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <Instagram size={15} />
                                    <span>@draughtsmanthe</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default Leadership;
