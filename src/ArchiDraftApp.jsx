import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchiDraft from './components/archidraft/ArchiDraft';
import PixmintBot from './components/pixmint/PixmintBot';

/**
 * Resolve current view for standalone Archi Draft deployment
 */
function resolveArchiDraftView() {
  const rawHash = (typeof window !== 'undefined' ? window.location.hash || '' : '').replace('#', '').trim();
  const [hashPart, hashQuery] = rawHash.split('?');
  const hash = hashPart ? hashPart.toLowerCase() : '';

  const rawPath = (typeof window !== 'undefined' ? window.location.pathname || '' : '').replace(/^\/+|\/+$/g, '').trim().toLowerCase();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
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

  const activeToken = hash ? hash : rawPath;

  if (!activeToken || activeToken === 'home' || activeToken === 'archidraft' || activeToken === 'archi-draft') {
    return 'archi-draft';
  }
  if (activeToken === 'download' || activeToken === 'downloads' || activeToken === 'get-archidraft') {
    return 'archi-draft-download';
  }
  if (activeToken === 'privacy') return 'archi-draft-privacy';
  if (activeToken === 'terms' || activeToken === 'legal') return 'archi-draft-terms';
  if (activeToken === 'deletion') return 'archi-draft-deletion';
  if (activeToken === 'verification-policy') return 'archi-draft-verification-policy';
  if (activeToken === 'ai-disclaimer') return 'archi-draft-ai-disclaimer';
  if (activeToken === 'ip-policy' || activeToken === 'copyright' || activeToken === 'archi-draft-ip-policy') return 'archi-draft-ip-policy';
  if (activeToken.startsWith('archi-draft')) return activeToken;

  return 'archi-draft';
}

export default function ArchiDraftApp() {
  const [currentView, setCurrentView] = useState(resolveArchiDraftView);

  useEffect(() => {
    const handleRouteChange = () => {
      const view = resolveArchiDraftView();
      setCurrentView(view);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const navigate = (view) => {
    const target = (view || '').replace(/^#/, '').trim().toLowerCase();

    // Studio homepage external navigation
    if (target === 'studio' || target === 'home' || target === 'hero') {
      window.location.href = 'https://www.draughtsmanstudio.com/';
      return;
    }

    // Certificate verification navigation
    if (target === 'verify' || target === 'certificate') {
      window.location.href = 'https://www.draughtsmanstudio.com/verify';
      return;
    }

    // Download Center
    if (target === 'download' || target === 'downloads' || target === 'archi-draft-download') {
      if (window.location.pathname !== '/download') {
        window.history.pushState(null, '', '/download');
      }
      setCurrentView('archi-draft-download');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    // Root Product Landing Page
    if (target === 'archi-draft' || target === 'archidraft') {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', '/');
      }
      setCurrentView('archi-draft');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    // Legal Documents
    if (target === 'legal' || target === 'terms' || target === 'archi-draft-terms') {
      if (window.location.pathname !== '/terms') {
        window.history.pushState(null, '', '/terms');
      }
      setCurrentView('archi-draft-terms');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target === 'privacy' || target === 'archi-draft-privacy') {
      if (window.location.pathname !== '/privacy') {
        window.history.pushState(null, '', '/privacy');
      }
      setCurrentView('archi-draft-privacy');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target === 'deletion' || target === 'archi-draft-deletion') {
      if (window.location.pathname !== '/deletion') {
        window.history.pushState(null, '', '/deletion');
      }
      setCurrentView('archi-draft-deletion');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target.startsWith('archi-draft-')) {
      window.location.hash = target;
      setCurrentView(resolveArchiDraftView());
      return;
    }

    // Section anchor scroll on product landing page
    if (currentView !== 'archi-draft') {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', '/#' + target);
      } else {
        window.location.hash = target;
      }
      setCurrentView('archi-draft');
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = target;
      }
    }
  };

  return (
    <div className="archidraft-isolated-app">
      <motion.div
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <ArchiDraft currentView={currentView} onNavigate={navigate} />
      </motion.div>

      {/* Global Embedded PIXMINT BOT Assistant */}
      <PixmintBot />
    </div>
  );
}
