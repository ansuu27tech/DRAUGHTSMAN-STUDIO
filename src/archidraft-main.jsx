import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import ArchiDraftApp from './ArchiDraftApp.jsx';

createRoot(document.getElementById('archidraft-root')).render(
  <StrictMode>
    <HelmetProvider>
      <ArchiDraftApp />
    </HelmetProvider>
  </StrictMode>
);
