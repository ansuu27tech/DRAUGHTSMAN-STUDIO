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
/**
 * Resolve the current view from either hash or pathname.
 * Supports both traditional hash navigation (#verify, #download, #archi-draft)
 * and direct path navigation (/verify, /download, /archidraft, /legal, /contact).
 */
function resolveCurrentView() {
  // 1. Check hash first for backward compatibility
  const rawHash = (window.location.hash || '').replace('#', '').trim();
  const [hashPart, hashQuery] = rawHash.split('?');
  const hash = hashPart ? hashPart.toLowerCase() : '';

  // 2. Check pathname
  const rawPath = (window.location.pathname || '').replace(/^\/+|\/+$/g, '').trim().toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = hashQuery ? new URLSearchParams(hashQuery) : null;

  const docParam = (hashParams?.get('doc') || searchParams.get('doc') || '').toLowerCase();
  if (docParam) {
    if (docParam === 'privacy') return 'archi-draft-privacy';
    if (docParam === 'terms' || docParam === 'legal') return 'archi-draft-terms';
    if (docParam === 'deletion') return 'archi-draft-deletion';
    if (docParam === 'verification-policy' || docParam === 'verification') return 'archi-draft-verification-policy';
    if (docParam === 'ai-disclaimer' || docParam === 'ai') return 'archi-draft-ai-disclaimer';
    if (docParam === 'ip-policy' || docParam === 'ip' || docParam === 'copyright') return 'archi-draft-ip-policy';
  }

  // Explicit home request via hash (e.g. #home or #hero)
  if (hash === 'home' || hash === 'hero') {
    // If browser is on a secondary pathname (e.g. /verify#home), normalize address bar to /
    if (typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== '') {
      try {
        window.history.replaceState(null, '', '/');
      } catch (err) {
        void err;
      }
    }
    return 'home';
  }

  // Determine active identifier (hash takes precedence if non-empty and not 'home', else pathname)
  const activeToken = hash ? hash : rawPath;

  if (!activeToken || activeToken === 'home') return 'home';
  if (activeToken === 'verify' || activeToken === 'certificate' || activeToken === 'certificate-verification') return 'verify';
  if (activeToken === 'download' || activeToken === 'downloads' || activeToken === 'get-archidraft') return 'archi-draft-download';
  if (activeToken === 'privacy') return 'archi-draft-privacy';
  if (activeToken === 'terms' || activeToken === 'legal') return 'archi-draft-terms';
  if (activeToken === 'deletion') return 'archi-draft-deletion';
  if (activeToken === 'verification-policy') return 'archi-draft-verification-policy';
  if (activeToken === 'ai-disclaimer') return 'archi-draft-ai-disclaimer';
  if (activeToken === 'ip-policy' || activeToken === 'copyright' || activeToken === 'archi-draft-ip-policy') return 'archi-draft-ip-policy';
  if (activeToken === 'archi-draft' || activeToken === 'archidraft') return 'archi-draft';
  if (activeToken.startsWith('archi-draft')) return activeToken;

  return 'home';
}

function markIntroViewed() {
  try {
    sessionStorage.setItem('ds_intro_viewed', 'true');
  } catch (err) {
    void err;
  }
}

function hasViewedIntro() {
  try {
    return sessionStorage.getItem('ds_intro_viewed') === 'true';
  } catch (err) {
    void err;
    return false;
  }
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro on initial cold visit if user is at root or #home AND hasn't seen it yet this session
    if (hasViewedIntro()) {
      return false;
    }
    const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
    const isColdHome = (!rawHash || rawHash === 'home') && (!rawPath || rawPath === 'home');
    if (!isColdHome) {
      markIntroViewed();
    }
    return isColdHome;
  });
  const [currentView, setCurrentView] = useState(resolveCurrentView);

  const dismissIntro = () => {
    markIntroViewed();
    setShowIntro(false);
  };

  // Listen for hash and pathname popstate changes (browser back/forward or internal link clicks)
  useEffect(() => {
    const handleRouteChange = () => {
      const view = resolveCurrentView();
      setCurrentView(view);

      const rawHash = window.location.hash.replace('#', '').trim();
      const hashOnly = rawHash.split('?')[0].toLowerCase();
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
      const activeToken = (hashOnly && hashOnly !== 'home') ? hashOnly : rawPath;

      if (view === 'home') {
        // Navigating back to home: never show intro again
        setShowIntro(false);
        markIntroViewed();

        const targetId = (!hashOnly || hashOnly === 'home' || hashOnly === 'hero') ? 'hero' : hashOnly;
        // Instant top reset so user doesn't land halfway down the home page
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        if (targetId && targetId !== 'hero' && targetId !== 'home') {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 80);
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Intro timer — only applies to initial cold home load
  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => {
      dismissIntro();
    }, 3200);
    return () => clearTimeout(timer);
  }, [showIntro]);

  // When intro ends, if an anchor or section path was in the URL, scroll to it
  useEffect(() => {
    if (!showIntro) {
      const rawHash = window.location.hash.replace('#', '').trim().split('?')[0].toLowerCase();
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
      const target = (rawHash && rawHash !== 'home') ? rawHash : rawPath;
      if (target && target !== 'home' && target !== 'hero') {
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [showIntro]);

  // Navigate helper passed to Archi Draft, Certificate Verification & sub-components
  const navigate = (view) => {
    const target = (view || '').replace(/^#/, '').trim().toLowerCase();

    if (!target || target === 'home' || target === 'hero') {
      setShowIntro(false);
      markIntroViewed();

      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', '/');
      } else if (window.location.hash) {
        window.history.pushState(null, '', '/');
      }

      setCurrentView('home');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target === 'verify' || target === 'certificate') {
      if (window.location.pathname !== '/verify') {
        window.history.pushState(null, '', '/verify');
      }
      setCurrentView('verify');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target === 'download' || target === 'downloads' || target === 'archi-draft-download') {
      if (window.location.pathname !== '/download') {
        window.history.pushState(null, '', '/download');
      }
      setCurrentView('archi-draft-download');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target === 'archi-draft' || target === 'archidraft') {
      if (window.location.pathname !== '/archidraft') {
        window.history.pushState(null, '', '/archidraft');
      }
      setCurrentView('archi-draft');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target === 'legal' || target === 'terms' || target === 'archi-draft-terms') {
      if (window.location.pathname !== '/legal') {
        window.history.pushState(null, '', '/legal');
      }
      setCurrentView('archi-draft-terms');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target.startsWith('archi-draft-') || target === 'privacy' || target === 'deletion') {
      window.location.hash = target;
      setCurrentView(resolveCurrentView());
      return;
    }

    // Anchor on homepage (e.g. #about, #projects, #contact)
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState(null, '', '/#' + target);
      setCurrentView('home');
      setShowIntro(false);
      markIntroViewed();
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.location.hash = target;
    }
  };

  const isHome = currentView === 'home';
  const isArchiDraft = currentView.startsWith('archi-draft');
  const isVerify = currentView === 'verify';

  return (
    <div className="app-container">
      {/* Home view — existing website + ArchiDraftShowcase */}
      {isHome && (
        <motion.div 
          key="home-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <SEO />
          {showIntro && (
            <Intro key="intro" onDismiss={dismissIntro} />
          )}
          <ThemeToggle />
          <ArchitecturalLayout />
          <Scene3D />
          <CommandBar />
          <main id="main-content">
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
        </motion.div>
      )}

      {/* Certificate Verification view — lazy loaded */}
      {isVerify && (
        <motion.div
          key="verify-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
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

      {/* Archi Draft product, legal, & download views — lazy loaded */}
      {isArchiDraft && (
        <motion.div
          key="archidraft-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
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

      {/* Global PIXMINT AI BOT Assistant Available Across All Views */}
      <PixmintBot />
    </div>
  );
}

export default App;
