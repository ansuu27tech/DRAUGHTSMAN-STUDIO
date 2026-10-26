import React from 'react';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { 
    Building2, 
    Layers, 
    FileCheck, 
    Cpu, 
    Compass,
    Box,
    ArrowUpRight, 
    CheckCircle2 
} from 'lucide-react';

const studioCapabilities = [
    {
        id: 'cap-structural',
        icon: Building2,
        title: "Structural Detailing & Analysis",
        category: "Discipline 01 // Structural",
        badge: "IS & BIS Codes",
        description: "Comprehensive RCC reinforcement detailing, bar bending schedules (BBS), and structural steel connection plans ensuring load path stability and zero-clash constructability.",
        deliverables: [
            "Column & Beam Framing Schedules",
            "Foundation & Raft Detailing",
            "Shear Wall & Core Reinforcement",
            "Steel Truss & Connection CAD Sets"
        ],
        metrics: "Sub-millimeter Drafting Accuracy"
    },
    {
        id: 'cap-architectural',
        icon: Layers,
        title: "Architectural GFC Documentation",
        category: "Discipline 02 // Architectural",
        badge: "Construction Ready",
        description: "Execution-ready Good-For-Construction (GFC) drawing packages that translate architectural vision into unequivocal on-site instructions for contractors and site engineers.",
        deliverables: [
            "Comprehensive Floor & Roof Plans",
            "Building Cross-Sections & Elevations",
            "Interior Millwork & Joinery Details",
            "Reflected Ceiling & Layout Drawings"
        ],
        metrics: "Verified Layer Standards (AIA/ISO)"
    },
    {
        id: 'cap-sanction',
        icon: FileCheck,
        title: "Municipal Sanctions & Compliance",
        category: "Discipline 03 // Statutory",
        badge: "100% Bylaw Compliance",
        description: "Regulatory submission blueprints strictly aligned with DTCP, CMDA, and local municipality bylaws, eliminating bureaucratic rework and accelerating building approval timelines.",
        deliverables: [
            "Statutory Sanction Submission Sets",
            "FSI / FAR & Coverage Calculations",
            "Setback & Access Road Clearances",
            "Rainwater & Parking Layout Schematics"
        ],
        metrics: "Expedited Authority Review"
    },
    {
        id: 'cap-mep',
        icon: Compass,
        title: "MEP & Services Coordination",
        category: "Discipline 04 // Services",
        badge: "Clash Detection",
        description: "Interdisciplinary building services coordination integrating electrical, plumbing, drainage, and HVAC runs directly into architectural sets to eliminate on-site spatial collisions.",
        deliverables: [
            "HVAC Ducting & Plant Room Layouts",
            "Water Supply & Sanitary CAD Routes",
            "Electrical Distribution & Conduit Paths",
            "Combined Services Clearance Drawings"
        ],
        metrics: "Zero-Clash Spatial Routing"
    },
    {
        id: 'cap-bim',
        icon: Box,
        title: "BIM & 3D Massing Coordination",
        category: "Discipline 05 // Modeling",
        badge: "LOD 300 / 400",
        description: "Parametric building information models and 3D architectural massing delivering millimeter-accurate spatial analysis, quantity take-offs, and constructability previews.",
        deliverables: [
            "Revit / ArchiCAD Discipline Models",
            "LOD 300/400 Detailing Sets",
            "Geometric Clash Detection Matrices",
            "Visual Construction Sequencing"
        ],
        metrics: "Parametric Asset Intelligence"
    },
    {
        id: 'cap-workflow',
        icon: Cpu,
        title: "Archi Draft Digital Ecosystem",
        category: "Discipline 06 // Workflow",
        badge: "Proprietary Platform",
        description: "Proprietary digital workflow platform synchronizing engineers, studio administrators, and certified draughtsmen with structured revision clouds, activity trails, and version control.",
        deliverables: [
            "7-Stage Immutable Project Lifecycle",
            "Real-Time Redline Annotations",
            "Encrypted Client Collaboration Hub",
            "Cryptographic Drawing Sign-Offs"
        ],
        metrics: "Zero-Loss Version Tracking"
    }
];

const Team = () => {
    return (
        <SectionWrapper 
            id="team" 
            title="Technical Capabilities" 
            subtitle="Engineering & Drafting Solutions"
        >
            <div style={{
                maxWidth: '1240px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Capabilities Overview Header Note */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '820px',
                    margin: '0 auto'
                }}>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'clamp(0.95rem, 1.25vw, 1.1rem)',
                        lineHeight: '1.8',
                        margin: 0,
                        fontFamily: 'var(--font-body)'
                    }}>
                        Draughtsman Studio operates as a high-precision drafting atelier. We provide comprehensive technical disciplines across structural engineering, architectural GFC delivery, statutory approval sets, MEP coordination, and digital workflow management.
                    </p>
                </div>

                {/* Balanced 3-Column Responsive Grid on Desktop */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                    gap: '1.75rem',
                    alignItems: 'stretch'
                }}>
                    {studioCapabilities.map((cap, index) => {
                        const IconComponent = cap.icon;
                        return (
                            <motion.div
                                key={cap.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                                style={{
                                    background: 'rgba(12, 16, 20, 0.92)',
                                    border: '1px solid rgba(198, 169, 105, 0.18)',
                                    borderRadius: '16px',
                                    padding: '2.25rem 1.85rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    boxShadow: '0 15px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(198, 169, 105, 0.04)',
                                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
                                }}
                                whileHover={{
                                    y: -4,
                                    borderColor: 'rgba(198, 169, 105, 0.45)',
                                    boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 30px rgba(198, 169, 105, 0.1)'
                                }}
                            >
                                {/* Top Category & Status Badge */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1.25rem',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap'
                                }}>
                                    <span style={{
                                        fontFamily: 'var(--font-mono, monospace)',
                                        fontSize: '0.72rem',
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase',
                                        color: '#C6A969',
                                        fontWeight: 600
                                    }}>
                                        {cap.category}
                                    </span>
                                    <span style={{
                                        fontSize: '0.66rem',
                                        fontWeight: 600,
                                        fontFamily: 'var(--font-mono, monospace)',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        padding: '4px 10px',
                                        borderRadius: '100px',
                                        background: 'rgba(198, 169, 105, 0.08)',
                                        border: '1px solid rgba(198, 169, 105, 0.25)',
                                        color: '#C6A969'
                                    }}>
                                        {cap.badge}
                                    </span>
                                </div>

                                {/* Icon & Title */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '10px',
                                        background: 'rgba(198, 169, 105, 0.1)',
                                        border: '1px solid rgba(198, 169, 105, 0.25)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#C6A969',
                                        flexShrink: 0
                                    }}>
                                        <IconComponent size={20} strokeWidth={1.8} />
                                    </div>
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: 'var(--color-text-primary)',
                                        margin: 0,
                                        lineHeight: 1.3
                                    }}>
                                        {cap.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.88rem',
                                    lineHeight: '1.65',
                                    marginBottom: '1.5rem',
                                    flex: 1
                                }}>
                                    {cap.description}
                                </p>

                                {/* Key Deliverables List */}
                                <div style={{
                                    background: 'rgba(0, 0, 0, 0.35)',
                                    borderRadius: '10px',
                                    padding: '1.1rem 1.25rem',
                                    marginBottom: '1.25rem',
                                    border: '1px solid rgba(255, 255, 255, 0.04)'
                                }}>
                                    <div style={{
                                        fontFamily: 'var(--font-mono, monospace)',
                                        fontSize: '0.66rem',
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase',
                                        color: 'var(--color-text-secondary)',
                                        marginBottom: '0.65rem',
                                        opacity: 0.85
                                    }}>
                                        Core Technical Deliverables:
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                                        {cap.deliverables.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-text-primary)' }}>
                                                <CheckCircle2 size={13} color="#C6A969" style={{ flexShrink: 0 }} />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Metric Indicator */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderTop: '1px solid rgba(198, 169, 105, 0.12)',
                                    paddingTop: '0.85rem',
                                    marginTop: 'auto'
                                }}>
                                    <span style={{
                                        fontFamily: 'var(--font-mono, monospace)',
                                        fontSize: '0.72rem',
                                        color: '#C6A969',
                                        letterSpacing: '1px',
                                        fontWeight: 600
                                    }}>
                                        {cap.metrics}
                                    </span>
                                    <ArrowUpRight size={15} color="#C6A969" style={{ opacity: 0.8 }} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Team;
