import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Folder, Users, Mail } from 'lucide-react';

const navItems = [
    { id: 'hero', icon: null, label: 'Home', image: '/draughtsmanstudio.jpg' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Folder, label: 'Projects' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'contact', icon: Mail, label: 'Contact' }
];

const CommandBar = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                translateX: '-50%',
                zIndex: 100,
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(12px)',
                borderRadius: '50px',
                padding: '0.8rem 1.5rem',
                display: 'flex',
                gap: '1.5rem',
                border: '1px solid var(--btn-border-secondary)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
        >
            {navItems.map((item) => (
                <NavItem key={item.id} item={item} onClick={() => scrollToSection(item.id)} />
            ))}
        </motion.div>
    );
};

const NavItem = ({ item, onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover="hover"
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                position: 'relative',
                padding: '5px'
            }}
        >
            <motion.div
                variants={{
                    hover: { y: -5, color: 'var(--color-text-primary)' }
                }}
            >
                {item.image ? (
                    <img
                        src={item.image}
                        alt="Home"
                        style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                ) : (
                    <item.icon size={20} />
                )}
            </motion.div>

            {/* Architectural Line Hover Effect */}
            <motion.div
                variants={{
                    hover: { height: '100%', opacity: 1 }
                }}
                initial={{ height: '0%', opacity: 0 }}
                style={{
                    position: 'absolute',
                    bottom: '-25px',
                    width: '1px',
                    background: 'var(--color-accent)',
                    left: '50%'
                }}
            />

            <motion.span
                variants={{
                    hover: { opacity: 1, y: 0 }
                }}
                initial={{ opacity: 0, y: 10 }}
                style={{
                    position: 'absolute',
                    top: '-30px',
                    background: 'var(--color-accent)',
                    color: 'black',
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                }}
            >
                {item.label}
            </motion.span>
        </motion.button>
    );
};

export default CommandBar;
