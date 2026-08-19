import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const skills = [
    "Architecture", "Interior Design", "Facade Design",
    "3D Visualization", "Project Management", "Sustainable Design"
];

const tools = [
    "AutoCAD", "Revit", "SketchUp", "Lumion", "Adobe Creative Suite"
];

const Skills = () => {
    return (
        <SectionWrapper id="skills" title="Expertise" subtitle="capabilities">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                {/* Services */}
                <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem', color: 'var(--color-accent)' }}>
                        Core Services
                    </h3>
                    <ul style={{ listStyle: 'none' }}>
                        {skills.map((skill, index) => (
                            <motion.li
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    padding: '1rem 0',
                                    borderBottom: '1px solid var(--grid-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '1.1rem'
                                }}
                            >
                                <span style={{ marginRight: '1rem', color: 'var(--color-accent)' }}>0{index + 1}.</span>
                                {skill}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Tools */}
                <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem', color: 'var(--color-accent)' }}>
                        Tools & Technologies
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {tools.map((tool, index) => (
                            <motion.span
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    border: '1px solid var(--btn-border-secondary)',
                                    background: 'var(--grid-color)',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-primary)'
                                }}
                            >
                                {tool}
                            </motion.span>
                        ))}
                    </div>
                </div>

            </div>
        </SectionWrapper>
    );
};

export default Skills;
