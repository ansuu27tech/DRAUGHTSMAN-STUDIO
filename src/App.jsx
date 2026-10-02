import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import SEO from './components/SEO';
import Intro from './components/Intro';
import Hero from './components/Hero';
import AboutStudio from './components/AboutStudio';
import Services from './components/Services';
import Team from './components/Team';
import Founder from './components/Founder';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

import CommandBar from './components/CommandBar';
import ArchitecturalLayout from './components/ArchitecturalLayout';
import Scene3D from './components/3d/Scene3D';
import ThemeToggle from './components/ThemeToggle';

// Lazy-load Archi Draft — only fetched when navigating to #archi-draft
const ArchiDraft = lazy(() => import('./components/archidraft/ArchiDraft'));

/**
 * Resolve the current hash into a view name.
 * Defaults to 'home' when there is no hash or an unrecognized hash.
 */
function getViewFromHash() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (!hash || hash === 'home') return 'home';
  // All archi-draft views start with 'archi-draft'
  if (hash.startsWith('archi-draft')) return hash;
  return 'home';
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro for the home view on initial load
    return getViewFromHash() === 'home';
  });
  const [currentView, setCurrentView] = useState(getViewFromHash);

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const onHashChange = () => {
      const view = getViewFromHash();
      setCurrentView(view);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Intro timer — only applies to home view
  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, [showIntro]);

  // Navigate helper passed to Archi Draft
  const navigate = (view) => {
    window.location.hash = view;
  };

  const isHome = currentView === 'home';
  const isArchiDraft = currentView.startsWith('archi-draft');

  return (
    <div className="app-container">
      {/* Home view — completely unmodified existing website */}
      {isHome && (
        <>
          <SEO />
          <AnimatePresence mode="wait">
            {showIntro ? (
              <Intro key="intro" />
            ) : (
              <>
                <ThemeToggle />
                <ArchitecturalLayout />
                <Scene3D />
                <CommandBar />
                <main key="main-content" style={{ opacity: 0, animation: 'fadeIn 1s forwards' }}>
                  <Hero />
                  <Projects />
                  <Founder />
                  <Team />
                  <AboutStudio />
                  <Services />
                  <Testimonials />
                  <Contact />
                  <Footer />
                </main>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Archi Draft view — lazy loaded */}
      {isArchiDraft && (
        <Suspense fallback={
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Loading…
          </div>
        }>
          <ArchiDraft currentView={currentView} onNavigate={navigate} />
        </Suspense>
      )}

      <style>{`
        @keyframes fadeIn {
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
