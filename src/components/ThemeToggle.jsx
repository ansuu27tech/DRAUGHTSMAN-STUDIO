import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
                position: 'fixed',
                top: '2rem',
                right: '2rem',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-accent-glow)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 9999,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                outline: 'none'
            }}
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'light' ? 0 : 180 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
                {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
