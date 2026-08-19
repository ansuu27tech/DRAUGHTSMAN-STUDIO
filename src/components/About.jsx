import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <SectionWrapper id="about">
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'center'
            }}>
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span style={{
                        display: 'block',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-accent)',
                        fontSize: '0.9rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        marginBottom: '1rem'
                    }}>
                        Where technical excellence meets timeless design.
                    </span>

                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        marginBottom: '2rem',
                        color: 'var(--color-text-primary)'
                    }}>
                        12+ Years of Crafting Architecture with Precision & Purpose
                    </h2>

                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        <p>
                            With over <strong>12+ years of hands-on experience</strong>, Draughtsman Studio has been deeply involved in shaping residential, commercial, and high-rise developments across diverse scales. Our expertise lies in translating architectural vision into accurate, build-ready drawings, ensuring clarity, compliance, and constructability at every stage.
                        </p>
                        <p>
                            From concept development to <strong>Good For Construction (GFC)</strong> drawings, we collaborate closely with architects, engineers, and consultants to deliver technically sound, detail-driven solutions. Our approach balances creativity with precision, allowing projects to move seamlessly from paper to reality.
                        </p>
                        <p style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '1rem', fontStyle: 'italic', color: 'var(--color-text-primary)' }}>
                            At Draughtsman Studio, every line drawn carries responsibility — towards functionality, sustainability, and long-term value.
                        </p>
                    </div>
                </motion.div>

                {/* Visual - Person Image with Architectural Frame */}
                <div style={{
                    position: 'relative',
                    height: '500px',
                    border: '1px solid var(--grid-color)',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Image */}
                    <motion.img
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src="/about-image.jpg"
                        alt="Architectural Leader"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center', // Focus on face
                            filter: 'grayscale(20%) contrast(110%)'
                        }}
                    />

                    {/* Overlay architectural lines */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        pointerEvents: 'none',
                        zIndex: 1
                    }}>
                        <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
                            <motion.path
                                d="M0 0 L20 0 M0 0 L0 20  M100 100 L80 100 M100 100 L100 80"
                                stroke="var(--color-accent)"
                                strokeWidth="0.5"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default About;
