import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArchiDraftNav from './ArchiDraftNav';
import ArchiDraftHero from './ArchiDraftHero';
import ArchiDraftOverview from './ArchiDraftOverview';
import ArchiDraftFeatures from './ArchiDraftFeatures';
import ArchiDraftWorkflow from './ArchiDraftWorkflow';
import ArchiDraftScreenshots from './ArchiDraftScreenshots';
import ArchiDraftAudience from './ArchiDraftAudience';
import ArchiDraftDownload from './ArchiDraftDownload';
import ArchiDraftSupport from './ArchiDraftSupport';
import ArchiDraftFooter from './ArchiDraftFooter';
import { ArchiDraftPrivacy, ArchiDraftTerms, ArchiDraftDeletion } from './ArchiDraftLegal';
import { LEGAL_PAGES } from './archidraft.config';

import './ArchiDraft.css';

/**
 * Main Archi Draft experience container.
 * Handles the product landing page and legal sub-pages.
 * 
 * @param {string} currentView - The current hash-based view
 * @param {function} onNavigate - Callback to switch views
 */
const ArchiDraft = ({ currentView, onNavigate }) => {
  // Determine if we're on a legal sub-page
  const isPrivacy = currentView === LEGAL_PAGES.privacy;
  const isTerms = currentView === LEGAL_PAGES.terms;
  const isDeletion = currentView === LEGAL_PAGES.deletion;
  const isLegalPage = isPrivacy || isTerms || isDeletion;

  const seoTitle = isPrivacy
    ? 'Privacy Policy | Archi Draft'
    : isTerms
      ? 'Terms of Service | Archi Draft'
      : isDeletion
        ? 'Account & Data Deletion | Archi Draft'
        : 'Archi Draft | Professional Architectural Drafting';

  const seoDescription = isLegalPage
    ? 'Archi Draft legal information — by Draughtsman Studio.'
    : 'Archi Draft — professional architectural drafting and design tools by Draughtsman Studio. Available on Google Play.';

  return (
    <div className="archidraft">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
      </Helmet>

      <ArchiDraftNav onNavigate={onNavigate} />

      {isPrivacy && <ArchiDraftPrivacy />}
      {isTerms && <ArchiDraftTerms />}
      {isDeletion && <ArchiDraftDeletion />}

      {!isLegalPage && (
        <main>
          <ArchiDraftHero />
          <ArchiDraftOverview />
          <ArchiDraftFeatures />
          <ArchiDraftWorkflow />
          <ArchiDraftScreenshots />
          <ArchiDraftAudience />
          <ArchiDraftDownload />
          <ArchiDraftSupport />
        </main>
      )}

      <ArchiDraftFooter onNavigate={onNavigate} />
    </div>
  );
};

export default ArchiDraft;
