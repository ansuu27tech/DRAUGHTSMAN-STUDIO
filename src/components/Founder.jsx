import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';

const socialIconStyle = {
    color: 'var(--color-text-secondary)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const Founder = () => {
    return (
        <SectionWrapper id="founder" title="The Draughts Man" subtitle="Leadership">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '2rem'
            }}>
                {/* Profile Image Container */}
                <div style={{ position: 'relative', width: '250px', height: '250px' }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid var(--color-accent)',
                            boxShadow: '0 0 30px rgba(197, 160, 89, 0.2)',
                            background: 'var(--color-surface)' // Placeholder background
                        }}
                    >
                        <img
                            src="/founder.jpg"
                            alt="Mohammed Mosin S"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    {/* Decorative rotating circle */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            top: '-15px',
                            left: '-15px',
                            right: '-15px',
                            bottom: '-15px',
                            border: '1px dashed var(--grid-color)',
                            borderRadius: '50%',
                            zIndex: -1
                        }}
                    />
                </div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    style={{ maxWidth: '800px' }}
                >
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        marginBottom: '0.5rem'
                    }}>
                        MOHAMMED MOSIN S
                    </h3>
                    <p style={{
                        color: 'var(--color-accent)',
                        letterSpacing: '2px',
                        marginBottom: '2rem',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem'
                    }}>
                        CHIEF DRAUGHT MAN
                    </p>
                    <p style={{ lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                        "Architecture is not just about buildings; it's about creating environments that enhance the human experience.
                        My vision for Draughtsman Studio is to merge technical precision with artistic expression, delivering spaces that are both functional and emotionally resonant."
                    </p>

                    {/* Social Media Icons */}
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <a href="https://www.linkedin.com/in/mohammed-mosin-6b9b213a2" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                            <Linkedin size={24} />
                        </a>
                        <a href="https://www.instagram.com/draughtsmanthe?igsh=ZGUyc2l6c2d6Z2x5" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                            <Instagram size={24} />
                        </a>
                    </div>

                    <style>{`
                        a:hover svg {
                            transform: scale(1.1);
                            filter: drop-shadow(0 0 8px rgba(197, 160, 89, 0.6));
                            color: var(--color-accent);
                        }
                    `}</style>
                </motion.div>
            </div>
        </SectionWrapper >
    );
};

export default Founder;
