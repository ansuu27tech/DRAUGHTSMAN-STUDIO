import SectionWrapper from './SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, Users, Building2, MapPin } from 'lucide-react';
import { fetchAPI } from '../lib/api';

const goldAccent = '#C5A059'; // Matched with site's exact --color-accent
const darkBg = 'transparent'; // Inherits var(--color-bg) to match exact site background

/* ─── Static Fallback Testimonials ─── */
const STATIC_TESTIMONIALS = [
    {
        id: 1,
        name: 'Mohammed Imtiyaz',
        project: 'Residential Architecture Design',
        rating: 5,
        quote: 'Draughtsman Studio transformed our vision into reality. The planning, detailing, and execution support were exceptional.',
    },
    {
        id: 2,
        name: 'Ashok Kumar',
        project: 'Home Interior Design',
        rating: 5,
        quote: 'The interior concepts were modern, elegant, and highly functional. Excellent communication throughout the project.',
    },
    {
        id: 3,
        name: 'Abdul Rahman',
        project: 'Structural Design',
        rating: 5,
        quote: 'Professional structural planning with accurate calculations and clear documentation. Highly recommended.',
    },
    {
        id: 4,
        name: 'Praveen Raj',
        project: 'Commercial Building Design',
        rating: 5,
        quote: 'The team delivered innovative designs while maintaining practical construction requirements.',
    },
    {
        id: 5,
        name: 'Sadiq Ahmed',
        project: 'Villa Elevation Design',
        rating: 5,
        quote: 'Outstanding elevation concepts and realistic visualizations. The final result exceeded our expectations.',
    },
    {
        id: 6,
        name: 'Hameed Khan',
        project: 'Architectural Consultation',
        rating: 5,
        quote: 'Very knowledgeable team with excellent attention to detail and client satisfaction.',
    },
    {
        id: 7,
        name: 'Nazeer Ahmed',
        project: 'Facade Design',
        rating: 5,
        quote: 'Beautiful facade design that gave our building a premium and modern appearance.',
    },
    {
        id: 8,
        name: 'Junaid Ali',
        project: 'Residential Planning',
        rating: 5,
        quote: 'Every space was planned efficiently. The team understood our requirements perfectly.',
    },
    {
        id: 9,
        name: 'Faizan Hussain',
        project: 'Interior Renovation',
        rating: 5,
        quote: 'Creative ideas, quality design solutions, and timely project support from start to finish.',
    },
    {
        id: 10,
        name: 'Imran Basha',
        project: 'Complete Design Package',
        rating: 5,
        quote: 'One of the best architecture firms we\'ve worked with. Professional, reliable, and highly skilled.',
    },
];

/* ─── Get Initials ─── */
const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
};

/* ─── Star Rating ─── */
const StarRating = ({ rating = 5, size = 18 }) => (
    <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map(star => (
            <Star
                key={star}
                size={size}
                fill={star <= rating ? goldAccent : 'transparent'}
                color={star <= rating ? goldAccent : 'rgba(255,255,255,0.15)'}
                strokeWidth={1.5}
            />
        ))}
    </div>
);

/* ─── Stat Card ─── */
const StatItem = ({ icon: Icon, value, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 24px',
            background: 'rgba(212, 175, 55, 0.06)',
            borderRadius: '14px',
            border: '1px solid rgba(212, 175, 55, 0.12)',
            backdropFilter: 'blur(10px)',
            minWidth: '200px',
        }}
    >
        <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${goldAccent}20, ${goldAccent}08)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        }}>
            <Icon size={22} color={goldAccent} strokeWidth={1.5} />
        </div>
        <div>
            <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: goldAccent,
                lineHeight: 1.2,
            }}>
                {value}
            </div>
            <div style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.5px',
                marginTop: '2px',
            }}>
                {label}
            </div>
        </div>
    </motion.div>
);

/* ─── Loading Skeleton ─── */
const TestimonialSkeleton = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        marginTop: '3rem',
        flexWrap: 'wrap',
    }}>
        {[1, 2, 3].map(i => (
            <div key={i} style={{
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '2.5rem',
                height: '340px',
                width: '360px',
                background: 'linear-gradient(110deg, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 70%)',
                backgroundSize: '200% 100%',
                animation: 'testimonial-shimmer 1.5s infinite',
            }} />
        ))}
        <style>{`
            @keyframes testimonial-shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `}</style>
    </div>
);

/* ─── Testimonial Card ─── */
const TestimonialCard = ({ testimonial }) => (
    <div
        className="testimonial-card"
        style={{
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: `1px solid rgba(255,255,255,0.06)`,
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            width: '420px',
            minHeight: '340px',
            cursor: 'default',
            transition: 'all 0.3s ease',
            flexShrink: 0,
        }}
    >
        {/* Gold gradient accent line at top */}
        <div className="card-glow-line" style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${goldAccent}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
        }} />

        {/* Background glow */}
        <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${goldAccent}08, transparent)`,
            pointerEvents: 'none',
        }} />

        {/* Quote Icon */}
        <Quote
            size={40}
            color={goldAccent}
            style={{
                opacity: 0.12,
                position: 'absolute',
                top: '24px',
                right: '24px',
            }}
            strokeWidth={1}
        />

        {/* Star Rating */}
        <StarRating rating={testimonial.rating} />

        {/* Quote Text */}
        <p style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic',
            marginTop: '1rem',
            marginBottom: '1.5rem',
            flex: 1,
            letterSpacing: '0.2px',
        }}>
            &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author Info + Verified Badge */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid rgba(255,255,255,0.06)`,
            paddingTop: '1.5rem',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
            }}>
                {/* Initials Avatar */}
                <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${goldAccent}25, ${goldAccent}10)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: goldAccent,
                    border: `1.5px solid ${goldAccent}30`,
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '1px',
                    flexShrink: 0,
                }}>
                    {getInitials(testimonial.name)}
                </div>

                <div>
                    <h4 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginBottom: '3px',
                        letterSpacing: '0.5px',
                    }}>
                        {testimonial.name}
                    </h4>
                    <p style={{
                        fontSize: '0.75rem',
                        color: goldAccent,
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        fontWeight: 500,
                    }}>
                        {testimonial.project || testimonial.company}
                    </p>
                </div>
            </div>

            {/* Verified Badge */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                background: `${goldAccent}10`,
                borderRadius: '100px',
                border: `1px solid ${goldAccent}20`,
                flexShrink: 0,
            }}>
                <BadgeCheck size={14} color={goldAccent} strokeWidth={2} />
                <span style={{
                    fontSize: '0.65rem',
                    color: goldAccent,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    Verified
                </span>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    /* Fetch from API, fallback to static */
    const loadTestimonials = async () => {
        setLoading(true);
        const { data } = await fetchAPI('/testimonials');

        if (data && Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
        } else {
            // Fallback to static testimonials
            setTestimonials(STATIC_TESTIMONIALS);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadTestimonials();
    }, []);



    return (
        <section
            id="testimonials"
            style={{
                background: darkBg,
                padding: '100px 20px',
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Subtle background patterns */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
                    radial-gradient(ellipse 600px 400px at 20% 20%, ${goldAccent}06, transparent),
                    radial-gradient(ellipse 500px 300px at 80% 80%, ${goldAccent}04, transparent)
                `,
                pointerEvents: 'none',
            }} />

            {/* Grid overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                pointerEvents: 'none',
                opacity: 0.4,
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
            }}>

                {/* ─── Section Header ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    {/* Small Text */}
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: '2px' }}
                        whileInView={{ opacity: 1, letterSpacing: '6px' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{
                            fontSize: '0.75rem',
                            color: goldAccent,
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            marginBottom: '16px',
                            fontFamily: 'var(--font-body)',
                        }}
                    >
                        What Our Clients Say
                    </motion.p>

                    {/* Main Heading */}
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        marginBottom: '16px',
                        letterSpacing: '3px',
                        lineHeight: 1.2,
                    }}>
                        CLIENT{' '}
                        <span style={{
                            background: `linear-gradient(135deg, ${goldAccent}, #F5E6B8, ${goldAccent})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            TESTIMONIALS
                        </span>
                    </h2>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${goldAccent}, transparent)`,
                            margin: '0 auto 20px',
                        }}
                    />

                    {/* Subheading */}
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                        letterSpacing: '0.3px',
                    }}>
                        Trusted by homeowners, builders, and commercial clients across multiple successful projects.
                    </p>
                </motion.div>

                {/* ─── Statistics Row ─── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '4rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <StatItem icon={Star} value="5.0" label="Average Rating" delay={0.1} />
                    <StatItem icon={Users} value="100+" label="Happy Clients" delay={0.2} />
                    <StatItem icon={Building2} value="150+" label="Projects Completed" delay={0.3} />
                    <StatItem icon={MapPin} value="CHENNAI" label="Tamil Nadu" delay={0.4} />
                </motion.div>

                {/* ─── Loading ─── */}
                {loading && <TestimonialSkeleton />}

                {/* ─── Carousel ─── */}
                {!loading && testimonials.length > 0 && (
                    <>
                        {/* Marquee Container */}
                        <div className="marquee-container">
                            <div className="marquee-track">
                                {/* First set of cards */}
                                {testimonials.map((testimonial, idx) => (
                                    <TestimonialCard
                                        key={`set1-${testimonial.id || idx}`}
                                        testimonial={testimonial}
                                    />
                                ))}
                                {/* Duplicated set of cards for infinite loop */}
                                {testimonials.map((testimonial, idx) => (
                                    <TestimonialCard
                                        key={`set2-${testimonial.id || idx}`}
                                        testimonial={testimonial}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* ─── Responsive & Marquee Styles ─── */}
            <style>{`
                .marquee-container {
                    overflow: hidden;
                    width: 100vw;
                    margin-left: calc(-50vw + 50%);
                    display: flex;
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    padding: 2rem 0;
                }
                
                .marquee-track {
                    display: flex;
                    gap: 24px;
                    width: max-content;
                    animation: scroll-marquee 40s linear infinite;
                }
                
                .marquee-container:hover .marquee-track {
                    animation-play-state: paused;
                }
                
                @keyframes scroll-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 12px)); }
                }

                .testimonial-card:hover {
                    transform: translateY(-8px);
                    border-color: ${goldAccent}60 !important;
                    box-shadow: 0 30px 60px -12px rgba(0,0,0,0.5), 0 0 40px ${goldAccent}15;
                }
                
                .testimonial-card:hover .card-glow-line {
                    opacity: 0.6 !important;
                }

                @media (max-width: 640px) {
                    .marquee-container {
                        mask-image: none;
                        -webkit-mask-image: none;
                    }
                    .testimonial-card {
                        width: 85vw;
                    }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
