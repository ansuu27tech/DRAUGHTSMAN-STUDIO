import { useState, useRef, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { fetchAPI } from '../lib/api';

/* ─── Global CSS injected once ─── */
const globalCSS = `
  /* Card shell */
  .project-card {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
  }

  /* Image fills the card */
  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  .project-card:hover .project-image {
    transform: scale(1.04);
  }

  /* ONE overlay, always bottom-left, inside the card */
  .project-overlay {
    position: absolute;
    bottom: 24px;
    left: 24px;
    max-width: 70%;
    z-index: 5;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    padding: 18px 22px;
    border-radius: 14px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  /* Light mode override */
  .light .project-overlay {
    background: rgba(255,255,255,0.65);
  }

  /* Text elements — static, no stray transforms */
  .project-category,
  .project-title,
  .project-description {
    position: static !important;
    transform: none !important;
    margin: 0;
    display: block;
    filter: none !important;
    opacity: 1 !important;
  }

  .project-category {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #f4c27a;
    margin-bottom: 6px;
  }

  .project-title {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.25;
    margin-bottom: 8px;
  }

  .project-description {
    font-size: 13px;
    color: #dddddd;
    line-height: 1.5;
  }

  /* Light mode text */
  .light .project-title      { color: #111111; }
  .light .project-description { color: #444444; }

  /* "View" badge that slides up on hover */
  .project-view-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 5;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    border: 1px solid rgba(255,255,255,0.6);
    padding: 0.6rem 1.2rem;
    border-radius: 100px;
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(4px);
  }
  .project-card:hover .project-view-badge {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ─── Gradient edge fades ─── */
const GradientEdges = () => (
    <>
        <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            width: '120px',
            background: 'linear-gradient(to right, var(--color-bg), transparent)',
            zIndex: 10, pointerEvents: 'none'
        }} />
        <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0,
            width: '120px',
            background: 'linear-gradient(to left, var(--color-bg), transparent)',
            zIndex: 10, pointerEvents: 'none'
        }} />
    </>
);

/* ─── Single unified project card ─── */
const ProjectCard = ({ project, index, onClick }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    /* scroll-based parallax only on the image layer */
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1]);

    return (
        <motion.div
            ref={ref}
            onClick={() => onClick(project)}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            style={{
                aspectRatio: '16/9',
                width: '100%',
            }}
        >
            {/* IMAGE LAYER — scale via motion, stays below overlay */}
            <motion.div
                style={{
                    scale: imageScale,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    inset: 0,
                }}
            >
                <img
                    className="project-image"
                    src={project.image}
                    alt={project.title}
                />
            </motion.div>

            {/* Dark gradient scrim so overlay is always readable */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 55%)',
                borderRadius: 'inherit',
                pointerEvents: 'none',
                zIndex: 2,
            }} />

            {/* ── THE ONE OVERLAY – bottom-left of every card ── */}
            <div className="project-overlay">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
            </div>

            {/* Hover badge – top-right */}
            <span className="project-view-badge">
                View <Maximize2 size={12} />
            </span>
        </motion.div>
    );
};

/* ─── Loading Skeleton ─── */
const ProjectSkeleton = () => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
        gap: '2rem',
    }}>
        {[1, 2, 3].map(i => (
            <div key={i} style={{
                aspectRatio: '16/9',
                borderRadius: '8px',
                background: 'linear-gradient(110deg, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 70%)',
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

/* ─── Main Projects section ─── */
const Projects = () => {
    const { theme } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [lightboxProject, setLightboxProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [dynamicCategories, setDynamicCategories] = useState(["All"]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProjects = async () => {
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await fetchAPI('/portfolio');

        if (data && Array.isArray(data) && data.length > 0) {
            const mappedData = data.map(item => ({
                id: item.id,
                title: item.title,
                category: item.category,
                image: item.url,
                description: item.description,
                tool: item.tags ? item.tags.join(', ') : ""
            }));
            setProjects(mappedData);
            const cats = new Set(mappedData.map(item => item.category).filter(Boolean));
            setDynamicCategories(["All", ...Array.from(cats)]);
        } else if (fetchError) {
            setError(fetchError);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const filteredProjects = selectedCategory === "All"
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    const openLightbox = (project) => setLightboxProject(project);
    const closeLightbox = () => setLightboxProject(null);

    const nextProject = (e) => {
        e.stopPropagation();
        const currentIndex = filteredProjects.findIndex(p => p.id === lightboxProject.id);
        setLightboxProject(filteredProjects[(currentIndex + 1) % filteredProjects.length]);
    };

    const prevProject = (e) => {
        e.stopPropagation();
        const currentIndex = filteredProjects.findIndex(p => p.id === lightboxProject.id);
        setLightboxProject(filteredProjects[(currentIndex - 1 + filteredProjects.length) % filteredProjects.length]);
    };

    return (
        <SectionWrapper id="projects" title="Selected Works" subtitle="Portfolio">
            <style>{globalCSS}</style>

            <GradientEdges />

            {/* ── Filter Bar ── */}
            {!loading && projects.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        marginBottom: '3rem',
                        flexWrap: 'wrap'
                    }}
                >
                    {dynamicCategories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    background: isActive ? 'var(--color-accent)' : 'transparent',
                                    color: isActive ? '#000' : 'var(--color-text-primary)',
                                    border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--btn-border-secondary, rgba(150,150,150,0.4))'}`,
                                    borderRadius: '100px',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.85rem',
                                    fontWeight: isActive ? 600 : 400,
                                    letterSpacing: '0.5px',
                                    transition: 'all 0.25s ease',
                                    outline: 'none',
                                }}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </motion.div>
            )}

            {/* ── Loading State ── */}
            {loading && <ProjectSkeleton />}

            {/* ── Error State ── */}
            {error && !loading && (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: 'var(--color-text-secondary)'
                }}>
                    <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                        Unable to load projects
                    </p>
                    <button
                        onClick={loadProjects}
                        style={{
                            padding: '0.8rem 2rem',
                            background: 'var(--color-accent)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                        }}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* ── Empty State ── */}
            {!loading && !error && projects.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: 'var(--color-text-secondary)',
                    fontSize: '1.1rem',
                }}>
                    Projects coming soon.
                </div>
            )}

            {/* ── Project Grid ── */}
            {!loading && !error && projects.length > 0 && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
                            gap: '2rem',
                        }}
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={openLightbox}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightboxProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.95)',
                            zIndex: 2000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={closeLightbox}
                    >
                        {/* Close */}
                        <button onClick={closeLightbox} style={{
                            position: 'absolute', top: '2rem', right: '2rem',
                            background: 'none', border: 'none', color: '#fff',
                            cursor: 'pointer', zIndex: 2010
                        }}>
                            <X size={32} />
                        </button>

                        {/* Prev */}
                        <button onClick={prevProject} style={{
                            position: 'absolute', left: '2rem',
                            background: 'rgba(255,255,255,0.1)', border: 'none',
                            color: '#fff', cursor: 'pointer', padding: '1rem',
                            borderRadius: '50%', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', zIndex: 2010
                        }}>
                            <ChevronLeft size={32} />
                        </button>

                        {/* Next */}
                        <button onClick={nextProject} style={{
                            position: 'absolute', right: '2rem',
                            background: 'rgba(255,255,255,0.1)', border: 'none',
                            color: '#fff', cursor: 'pointer', padding: '1rem',
                            borderRadius: '50%', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', zIndex: 2010
                        }}>
                            <ChevronRight size={32} />
                        </button>

                        {/* Image & Info */}
                        <div
                            style={{
                                maxWidth: '90%', maxHeight: '90%', position: 'relative',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: '1rem'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={lightboxProject.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                src={lightboxProject.image}
                                alt={lightboxProject.title}
                                style={{
                                    maxWidth: '100%', maxHeight: '75vh',
                                    objectFit: 'contain',
                                    boxShadow: '0 0 60px rgba(0,0,0,0.6)',
                                    borderRadius: '8px',
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{ textAlign: 'center', color: '#fff' }}
                            >
                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.5rem',
                                    marginBottom: '0.4rem'
                                }}>
                                    {lightboxProject.title}
                                </h2>
                                <p style={{
                                    color: 'var(--color-accent)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontSize: '0.85rem'
                                }}>
                                    {lightboxProject.category}
                                    {lightboxProject.tool && (
                                        <span style={{ color: '#aaa', marginLeft: '0.5rem' }}>
                                            | {lightboxProject.tool}
                                        </span>
                                    )}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </SectionWrapper>
    );
};

export default Projects;
