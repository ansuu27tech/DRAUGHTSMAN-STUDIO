import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Folder, Users, Mail, Layers, Award, Download } from 'lucide-react';

const navItems = [
    { id: 'hero', icon: null, label: 'Home', image: '/draughtsmanstudio.jpg' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'projects', icon: Folder, label: 'Projects' },
    { id: 'archidraft', icon: Layers, label: 'Archi Draft', link: '#archi-draft' },
    { id: 'download', icon: Download, label: 'Get App', link: '#download' },
    { id: 'verify', icon: Award, label: 'Verify Cert', link: '#verify' },
    { id: 'contact', icon: Mail, label: 'Contact' }
];

function navigateToHash(hash) {
    window.location.hash = hash;
}

const CommandBar = () => {
    const handleClick = (item) => {
        if (item.link) {
            navigateToHash(item.link);
            return;
        }
        if (item.id === 'hero') {
            const element = document.getElementById('hero');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigateToHash('#home');
            }
            return;
        }
        const element = document.getElementById(item.id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If on another view (e.g. ArchiDraft or Verify), switch to home view with this section anchor
            navigateToHash('#' + item.id);
        }
    };

    return (
        <motion.div
            className="command-bar-dock"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
            style={{
                position: 'fixed',
                bottom: '1.75rem',
                left: '50%',
                translateX: '-50%',
                zIndex: 90,
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(12px)',
                borderRadius: '50px',
                padding: '0.6rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 1.8vw, 1.5rem)',
                border: '1px solid var(--btn-border-secondary)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                maxWidth: 'calc(100vw - 1.5rem)',
                boxSizing: 'border-box'
            }}
        >
            {navItems.map((item) => (
                <NavItem key={item.id} item={item} onClick={() => handleClick(item)} />
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
                gap: '3px',
                position: 'relative',
                padding: 'clamp(3px, 0.8vw, 6px)'
            }}
        >
            <motion.div
                variants={{
                    hover: { y: -4, color: 'var(--color-text-primary)' }
                }}
            >
                {item.image ? (
                    <img
                        src={item.image}
                        alt="Home"
                        style={{ width: 'clamp(20px, 4vw, 26px)', height: 'clamp(20px, 4vw, 26px)', objectFit: 'cover', borderRadius: '50%' }}
                    />
                ) : (
                    <item.icon size={18} />
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
