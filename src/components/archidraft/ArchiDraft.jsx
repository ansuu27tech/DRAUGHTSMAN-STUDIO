import React, { useEffect } from 'react';
import './ArchiDraft.css';

// Components
import ArchiDraftNav from './ArchiDraftNav';
import ArchiDraftHero from './ArchiDraftHero';
import ArchiDraftReveal from './ArchiDraftReveal';
import ArchiDraftProblem from './ArchiDraftProblem';
import ArchiDraftSystem from './ArchiDraftSystem';
import ArchiDraftWorkflow from './ArchiDraftWorkflow';
import ArchiDraftInterface from './ArchiDraftInterface';
import ArchiDraftVersions from './ArchiDraftVersions';
import ArchiDraftFeatures from './ArchiDraftFeatures';
import ArchiDraftArchVisual from './ArchiDraftArchVisual';
import ArchiDraftMobile from './ArchiDraftMobile';
import ArchiDraftStudio from './ArchiDraftStudio';
import ArchiDraftFAQ from './ArchiDraftFAQ';
import ArchiDraftCTA from './ArchiDraftCTA';
import ArchiDraftFooter from './ArchiDraftFooter';

import ArchiDraftDownload from './ArchiDraftDownload';
import ArchiDraftLegal from './ArchiDraftLegal';

const ArchiDraft = ({ currentView, onNavigate }) => {
  const isDownloadPage = currentView === 'archi-draft-download' || currentView === 'download';
  const isLegalPage = !isDownloadPage && currentView !== 'archi-draft';

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Update document title and meta description
    if (isDownloadPage) {
      document.title = 'Download Archi Draft — Multi-Platform CAD Workspace | Draughtsman Studio';
    } else if (isLegalPage) {
      document.title = 'Archi Draft Legal & Policies | Draughtsman Studio';
    } else {
      document.title = 'Archi Draft — Architectural CAD & Drawing Workflow | Draughtsman Studio';
    }
    
    // Add specific class to body for global scoping if needed
    document.body.classList.add('archidraft-active');
    
    return () => {
      document.body.classList.remove('archidraft-active');
      document.title = 'Draughtsman Studio';
    };
  }, [currentView, isDownloadPage, isLegalPage]);

  return (
    <div className="archidraft">
      <ArchiDraftNav onNavigate={onNavigate} />
      
      <main>
        {isDownloadPage ? (
          <ArchiDraftDownload isStandalone onNavigate={onNavigate} />
        ) : isLegalPage ? (
          <ArchiDraftLegal currentView={currentView} onNavigate={onNavigate} />
        ) : (
          <>
            <ArchiDraftHero />
            <ArchiDraftReveal />
            <ArchiDraftProblem />
            <ArchiDraftSystem />
            <ArchiDraftWorkflow />
            <ArchiDraftInterface />
            <ArchiDraftVersions />
            <ArchiDraftFeatures />
            <ArchiDraftArchVisual />
            <ArchiDraftMobile />
            <ArchiDraftStudio />
            <ArchiDraftFAQ />
            <ArchiDraftCTA />
          </>
        )}
      </main>

      <ArchiDraftFooter onNavigate={onNavigate} />
    </div>
  );
};

export default ArchiDraft;
