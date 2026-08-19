import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const teamMembers = [
    {
        name: "Kudoos Malik",
        role: "Chief Draughtsman – Structural",
        image: "/kudoos malick.jpg.jpeg",
        skills: ["Structural Drawings", "Detailing", "Project Coordination"]
    },
    {
        name: "Mohammed Anas",
        role: "Digital Marketing Strategist",
        image: "/mohammed anas.jpeg",
        imageStyle: { objectPosition: 'top' },
        skills: ["Brand Growth", "Performance Ads", "Content Strategy"],
        highlight: {
            text: "FOUNDER OF PIXELMINT STUDIO",
            link: "https://anasbio.vercel.app/"
        }
    },
    {
        name: "Irfan Ahamed",
        role: "Admin Head",
        image: "/Irfan Ahamed.jpg.jpeg",
        skills: ["Operations", "Team Coordination", "Workflow Management"]
    }
];

const Team = () => {
    return (
        <SectionWrapper id="team" title="Our Core Team" subtitle="The minds behind our success">
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2.5rem',
                justifyContent: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '3rem 2rem', // Increased padding
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                            height: '100%',
                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
                        }}
                        whileHover={{
                            y: -5,
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                            borderColor: 'var(--color-accent)'
                        }}
                    >
                        {/* Profile Image - Size Increased */}
                        <div style={{
                            width: '180px', // Increased from 140px
                            height: '180px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            marginBottom: '1.5rem',
                            border: '2px solid var(--color-accent)',
                            boxShadow: '0 0 25px rgba(203, 167, 108, 0.3)'
                        }}>
                            <img
                                src={member.image}
                                alt={member.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease',
                                    ...member.imageStyle
                                }}
                            />
                        </div>

                        {/* Name */}
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            marginBottom: '0.3rem',
                            color: 'var(--color-text-primary)'
                        }}>
                            {member.name}
                        </h3>

                        {/* Role */}
                        <p style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: member.highlight ? '0.5rem' : '1.5rem',
                            fontWeight: 500
                        }}>
                            {member.role}
                        </p>

                        {/* Special Glowing Highlight (Founder Link) */}
                        {member.highlight && (
                            <a
                                href={member.highlight.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.5px',
                                    color: '#00eaff', // Cyan/Blue Neon
                                    textDecoration: 'none',
                                    marginBottom: '1.5rem',
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    background: 'rgba(0, 234, 255, 0.05)',
                                    border: '1px solid rgba(0, 234, 255, 0.2)',
                                    boxShadow: '0 0 10px rgba(0, 234, 255, 0.3)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.boxShadow = '0 0 20px rgba(0, 234, 255, 0.6)';
                                    e.target.style.background = 'rgba(0, 234, 255, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.boxShadow = '0 0 10px rgba(0, 234, 255, 0.3)';
                                    e.target.style.background = 'rgba(0, 234, 255, 0.05)';
                                }}
                            >
                                {member.highlight.text}
                            </a>
                        )}

                        {/* Divider - Only show if not highlighted (cleaner look) or consistent */}
                        {!member.highlight && (
                            <div style={{
                                width: '40px',
                                height: '2px',
                                background: 'var(--color-text-secondary)',
                                opacity: 0.3,
                                marginBottom: '1.5rem'
                            }} />
                        )}
                        {member.highlight && <div style={{ marginBottom: '1.5rem' }}></div>}


                        {/* Skills Bullets */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            width: '100%'
                        }}>
                            {member.skills.map((skill, i) => (
                                <p key={i} style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--color-text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    <span style={{
                                        width: '4px',
                                        height: '4px',
                                        background: 'var(--color-accent)',
                                        borderRadius: '50%'
                                    }} />
                                    {skill}
                                </p>
                            ))}
                        </div>

                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Team;
