import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import ArchiDraftShowcase from './components/ArchiDraftShowcase';

// Lazy-load Archi Draft — only fetched when navigating to #archi-draft
const ArchiDraft = lazy(() => import('./components/archidraft/ArchiDraft'));
// Lazy-load Certificate Verification
const CertificateVerification = lazy(() => import('./components/CertificateVerification'));
import PixmintBot from './components/pixmint/PixmintBot';

/**
 * Resolve the current hash into a view name.
 * Defaults to 'home' when there is no hash or an unrecognized hash.
 */
function getViewFromHash() {
  const rawHash = window.location.hash.replace('#', '').toLowerCase();
  const hash = rawHash.split('?')[0]; // strip query params
  if (!hash || hash === 'home') return 'home';
  if (hash === 'verify' || hash === 'certificate' || hash === 'certificate-verification') return 'verify';
  if (hash === 'download' || hash === 'downloads' || hash === 'get-archidraft') return 'archi-draft-download';
  if (hash === 'privacy') return 'archi-draft-privacy';
  if (hash === 'terms' || hash === 'legal') return 'archi-draft-terms';
  if (hash === 'deletion') return 'archi-draft-deletion';
  if (hash === 'verification-policy') return 'archi-draft-verification-policy';
  if (hash === 'ai-disclaimer') return 'archi-draft-ai-disclaimer';
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

  // Navigate helper passed to Archi Draft & components
  const navigate = (view) => {
    window.location.hash = view;
  };

  const isHome = currentView === 'home';
  const isArchiDraft = currentView.startsWith('archi-draft');
  const isVerify = currentView === 'verify';
  const isLegal = currentView === 'legal';

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {/* Home view — existing website + ArchiDraftShowcase */}
        {isHome && (
          <motion.div 
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.8, ease: 'easeInOut' } }}
          >
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
                    <ArchiDraftShowcase />
                    <Testimonials />
                    <Contact />
                    <Footer />
                  </main>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Certificate Verification view — lazy loaded */}
        {isVerify && (
          <motion.div
            key="verify-view"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
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
                Loading Registry…
              </div>
            }>
              <CertificateVerification onNavigate={navigate} />
            </Suspense>
          </motion.div>
        )}

        {/* Legal Center direct view */}
        {isLegal && (
          <motion.div
            key="legal-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <Suspense fallback={
              <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-secondary)',
                fontSize: '0.85rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                Loading Policies…
              </div>
            }>
              <ArchiDraft currentView="archi-draft-terms" onNavigate={navigate} />
            </Suspense>
          </motion.div>
        )}

        {/* Archi Draft product view — lazy loaded */}
        {isArchiDraft && (
          <motion.div
            key="archidraft-view"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeInOut', delay: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
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
                Loading Archi Draft…
              </div>
            }>
              <ArchiDraft currentView={currentView} onNavigate={navigate} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global PIXMINT AI BOT Assistant Available Across All Views */}
      <PixmintBot />

      <style>{`
        @keyframes fadeIn {
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
