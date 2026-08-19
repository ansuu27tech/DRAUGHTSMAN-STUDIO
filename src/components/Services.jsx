import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { fetchAPI } from '../lib/api';

const beigeAccent = '#D2B48C'; // Sand/Beige

/* ─── Default Services (shown when no data from admin panel) ─── */
const DEFAULT_SERVICES = [
    {
        id: 'default-1',
        icon: 'Ruler',
        title: 'Architectural Design',
        description: 'Comprehensive architectural solutions from conceptual design to construction documentation, ensuring every detail meets the highest standards of precision and creativity.',
        items: ['Floor Plans & Layouts', 'Building Elevations', 'Section Drawings', 'Construction Documents', 'Building Permits & Approvals']
    },
    {
        id: 'default-2',
        icon: 'Palette',
        title: 'Interior Design',
        description: 'Creating sophisticated interior spaces that blend aesthetics with functionality, delivering environments that inspire and elevate everyday living.',
        items: ['Space Planning', 'Material Selection', 'Furniture Layouts', 'Lighting Design', 'Color Consultancy']
    },
    {
        id: 'default-3',
        icon: 'Box',
        title: '3D Visualization',
        description: 'Photorealistic 3D renders and walkthroughs that bring your project to life before construction begins, enabling better decision-making and client communication.',
        items: ['3D Exterior Renders', '3D Interior Renders', 'Virtual Walkthroughs', 'Aerial View Renders', 'Material Visualization']
    },
    {
        id: 'default-4',
        icon: 'Building2',
        title: 'Structural Engineering',
        description: 'Robust structural design and engineering solutions that ensure safety, stability, and compliance with building codes for all types of construction.',
        items: ['Structural Analysis', 'RCC Design & Detailing', 'Steel Structure Design', 'Foundation Design', 'Structural Audits']
    },
    {
        id: 'default-5',
        icon: 'Home',
        title: 'Residential Design',
        description: 'Tailored residential design services from individual homes to luxury villas, focusing on comfort, aesthetics, and sustainable living solutions.',
        items: ['Custom Home Design', 'Villa & Bungalow Design', 'Apartment Layouts', 'Renovation & Remodeling', 'Landscape Integration']
    },
];

/* ─── Loading Skeleton ─── */
const ServiceSkeleton = () => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem',
    }}>
        {[1, 2, 3].map(i => (
            <div key={i} style={{
                borderRadius: '16px',
                border: `1px solid ${beigeAccent}20`,
                padding: '2.5rem',
                height: '320px',
                background: 'linear-gradient(110deg, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 70%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
            }} />
        ))}
        <style>{`
            @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `}</style>
    </div>
);

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadServices = async () => {
        setLoading(true);
        const { data } = await fetchAPI('/services');

        if (data && Array.isArray(data) && data.length > 0) {
            setServices(data);
        } else {
            // Use default services when no data from admin panel
            setServices(DEFAULT_SERVICES);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadServices();
    }, []);

    return (
        <SectionWrapper id="services" title="Our Services" subtitle="Technical Design Excellence">

            {/* Loading State */}
            {loading && <ServiceSkeleton />}

            {/* Main Grid: Service Cards */}
            {!loading && services.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '3rem',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            style={{
                                background: 'var(--card-bg, rgba(255,255,255,0.03))',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                border: `1px solid ${beigeAccent}40`,
                                padding: '2.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            whileHover={{
                                y: -8,
                                boxShadow: `0 20px 40px -10px ${beigeAccent}20`,
                                borderColor: beigeAccent
                            }}
                        >
                            {/* Top Accent Line */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '4px',
                                background: beigeAccent
                            }} />

                            {/* Minimal Gold Icon */}
                            <div style={{
                                marginBottom: '1.5rem',
                                padding: '12px',
                                borderRadius: '12px',
                                background: `${beigeAccent}15`,
                                width: 'fit-content',
                                border: `1px solid ${beigeAccent}30`
                            }}>
                                {(() => {
                                    const IconComp = typeof service.icon === 'string' 
                                        ? LucideIcons[service.icon] || LucideIcons.Building2 
                                        : service.icon || LucideIcons.Building2;
                                    return <IconComp size={28} color={beigeAccent} strokeWidth={1.5} />;
                                })()}
                            </div>

                            {/* Bold Serif Heading */}
                            <h3 style={{
                                fontFamily: '"Playfair Display", serif',
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                marginBottom: '0.8rem',
                                color: 'var(--color-text-primary)'
                            }}>
                                {service.title}
                            </h3>

                            {/* Short Description */}
                            <p style={{
                                fontSize: '0.95rem',
                                color: 'var(--color-text-secondary)',
                                marginBottom: '1.5rem',
                                lineHeight: '1.5',
                                opacity: 0.9
                            }}>
                                {service.description}
                            </p>

                            {/* Bullet List */}
                            {service.items && service.items.length > 0 && (
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    marginTop: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.6rem'
                                }}>
                                    {service.items.map((item, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            fontSize: '0.9rem',
                                            color: 'var(--color-text-primary)',
                                            opacity: 0.85
                                        }}>
                                            <span style={{
                                                width: '6px',
                                                height: '6px',
                                                background: beigeAccent,
                                                borderRadius: '50%'
                                            }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

        </SectionWrapper>
    );
};

export default Services;

