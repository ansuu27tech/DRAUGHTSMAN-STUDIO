import { Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchAPI } from '../lib/api';

const Footer = () => {
    const [socials, setSocials] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await fetchAPI('/about');
            if (data && !data.error) {
                // Parse socials_json if available
                if (data.socials_json) {
                    try {
                        const parsed = typeof data.socials_json === 'string'
                            ? JSON.parse(data.socials_json)
                            : data.socials_json;
                        setSocials(parsed);
                    } catch (e) {
                        console.warn('Failed to parse socials_json:', e);
                    }
                }
            }
        })();
    }, []);

    // Dynamic social links with fallbacks
    const linkedinUrl = socials?.linkedin || "https://www.linkedin.com/in/mohammed-mosin-6b9b213a2";
    const instagramUrl = socials?.instagram || "https://www.instagram.com/draughtsmanthe?igsh=ZGUyc2l6c2d6Z2x5";

    return (
        <footer style={{
            background: 'var(--color-bg)',
            padding: '6rem 2rem 8rem',
            borderTop: '1px solid var(--grid-color)',
            marginTop: '4rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Subtle Textured Background Overlay for Depth */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.03,
                backgroundImage: 'radial-gradient(circle at center, var(--color-text-primary) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                pointerEvents: 'none'
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo Image - Larger with Glow */}
                <div style={{
                    position: 'relative',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(198, 169, 105, 0.4) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                        zIndex: -1
                    }} />
                    <img
                        src="/draughtsmanstudio.jpg"
                        alt="Draughtsman Studio"
                        style={{
                            width: '110px',
                            height: '110px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '1px solid rgba(198, 169, 105, 0.3)',
                            boxShadow: '0 0 20px rgba(0,0,0,0.2)'
                        }}
                    />
                </div>

                {/* Brand Name - Big, Bold, Uppercase */}
                <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 700,
                    letterSpacing: '-1px',
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    lineHeight: 1
                }}>
                    DRAUGHTSMAN STUDIO
                </h2>

                {/* Specialty line */}
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#C6A969',
                    marginBottom: '0.6rem',
                    opacity: 0.9
                }}>
                    Architectural&nbsp;&bull;&nbsp;Interiors&nbsp;&bull;&nbsp;Facade&nbsp;&bull;&nbsp;Structural
                </p>


                {/* Social Icons — Dynamic */}
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem' }}>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <Linkedin size={24} strokeWidth={1.5} />
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <Instagram size={24} strokeWidth={1.5} />
                    </a>
                </div>

                {/* Horizontal Divider */}
                <div style={{
                    width: '100px',
                    height: '1px',
                    background: '#C6A969',
                    opacity: 0.5,
                    marginBottom: '3rem'
                }}></div>

                {/* Copyright */}
                <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.85rem',
                    marginBottom: '0.8rem',
                    opacity: 0.6
                }}>
                    © 2026 DRAUGHTSMAN Studio. All rights reserved.
                </p>

                {/* Designer Credit */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '2rem'
                }}>
                    <span>Designed by</span>
                    <a
                        href="https://anasbio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixelmint-link"
                        style={{
                            color: '#C6A969',
                            textDecoration: 'none',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            fontSize: '1.2rem',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                            padding: '4px 6px'
                        }}
                    >
                        PIXELMINT STUDIO MVS
                    </a>
                </div>
            </div>

            <style>{`
                .social-icon {
                    color: var(--color-text-secondary);
                    transition: all 0.4s ease;
                    padding: 10px;
                    border-radius: 50%;
                    background: transparent;
                    border: 1px solid transparent;
                }
                .social-icon:hover {
                    color: #C6A969;
                    background: rgba(198, 169, 105, 0.1);
                    border-color: rgba(198, 169, 105, 0.3);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(198, 169, 105, 0.15);
                }

                .pixelmint-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 1px;
                    bottom: 0px;
                    left: 50%;
                    background-color: #C6A969;
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }
                
                .pixelmint-link:hover {
                    text-shadow: 0 0 10px rgba(198, 169, 105, 0.6);
                    letter-spacing: 1px;
                }
                
                .pixelmint-link:hover::after {
                    width: 100%;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
