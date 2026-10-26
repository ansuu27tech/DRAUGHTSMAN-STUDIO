import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, AlertTriangle, Search, CheckCircle2, XCircle, Clock, ArrowLeft, RefreshCw, Award } from 'lucide-react';
import { WORKER_API_CONFIG } from '../lib/api';
import './CertificateVerification.css';

// Synthetic demo credentials for development & QA testing (clearly marked)
const SYNTHETIC_CREDENTIALS = {
  'DEMO-CERT-2026-ENG': {
    id: 'DEMO-CERT-2026-ENG',
    status: 'valid',
    title: 'Certified Architectural Draughtsman & BIM Workflow Specialist',
    recipientName: 'Arun K. (Verified Participant)',
    issuingAuthority: 'Draughtsman Studio & Archi Draft Academic Guild',
    issueDate: 'October 14, 2026',
    expiryDate: 'Perpetual / No Expiry',
    accreditationCode: 'DS-AD-BIM-8841',
    projectScope: 'Advanced AutoCAD Drafting, Multi-Round Redline Revision, and Team Coordination Protocol',
  },
  'DEMO-CERT-REVOKED': {
    id: 'DEMO-CERT-REVOKED',
    status: 'revoked',
    title: 'Architectural Technician Accreditation',
    recipientName: 'Sample Candidate (Revoked)',
    issuingAuthority: 'Draughtsman Studio',
    issueDate: 'January 10, 2026',
    revocationDate: 'March 02, 2026',
    revocationReason: 'Credential superseded by administrative update.',
  },
  'DEMO-CERT-EXP': {
    id: 'DEMO-CERT-EXP',
    status: 'expired',
    title: 'Student Provisional CAD Drafting Practicum',
    recipientName: 'Priya M. (Provisional)',
    issuingAuthority: 'Archi Draft Student Training Program',
    issueDate: 'October 01, 2025',
    expiryDate: 'October 01, 2026',
    notes: 'Provisional practicum eligibility period has concluded.',
  },
};

export default function CertificateVerification({ onNavigate }) {
  const [tokenInput, setTokenInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | valid | invalid | revoked | expired | not_found | error
  const [credentialData, setCredentialData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);


  const handleVerifyToken = async (overrideToken) => {
    const rawToken = (overrideToken || tokenInput).trim();
    if (!rawToken) {
      setErrorMessage('Please enter a valid certificate ID or token.');
      setStatus('invalid');
      return;
    }

    // Rate limiting guardrail
    if (attempts >= 10) {
      setStatus('error');
      setErrorMessage('Verification rate limit reached. Please wait a moment before trying again.');
      return;
    }

    setAttempts((prev) => prev + 1);
    setStatus('loading');
    setErrorMessage('');
    setCredentialData(null);

    // 1. Check for synthetic development test tokens (only in development environment)
    if (Boolean(import.meta.env?.DEV) && SYNTHETIC_CREDENTIALS[rawToken]) {
      setTimeout(() => {
        const item = SYNTHETIC_CREDENTIALS[rawToken];
        setCredentialData({ ...item, isDemo: true });
        setStatus(item.status);
      }, 250);
      return;
    }

    // 2. Query Authoritative Backend API (Cloudflare Worker D1 registry)
    const rawBaseUrl = WORKER_API_CONFIG?.baseUrl || ((typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env.VITE_WORKER_API_URL || '' : '');
    const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, '');
    if (!cleanBaseUrl) {
      setStatus('error');
      setErrorMessage('Authoritative certificate registry service is currently unconfigured (VITE_WORKER_API_URL missing). Please contact support.');
      return;
    }

    // Ensure we don't duplicate '/api' if base URL already includes it
    const verifyEndpoint = cleanBaseUrl.endsWith('/api')
      ? `${cleanBaseUrl}/public/credentials/verify/${encodeURIComponent(rawToken)}`
      : `${cleanBaseUrl}/api/public/credentials/verify/${encodeURIComponent(rawToken)}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(verifyEndpoint, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timer);

      if (response.status === 200) {
        const data = await response.json();
        const cred = data?.credential || {};
        const backendStatus = (data?.status || '').toUpperCase();

        if (backendStatus === 'REVOKED' || cred.revokedAt || cred.revoked) {
          setStatus('revoked');
          setCredentialData({
            id: cred.id || rawToken,
            title: cred.title || 'Architectural Credential',
            recipientName: cred.recipientName || 'Verified Holder',
            issuingAuthority: 'Draughtsman Studio & Archi Draft',
            issueDate: cred.issuedAt ? new Date(cred.issuedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recorded',
            revocationDate: cred.revokedAt ? new Date(cred.revokedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recorded',
            revocationReason: cred.revocationReason || 'Formal revocation issued by administrative authority.',
            isDemo: false
          });
        } else if (backendStatus === 'EXPIRED' || (cred.expiresAt && new Date(cred.expiresAt) < new Date())) {
          setStatus('expired');
          setCredentialData({
            id: cred.id || rawToken,
            title: cred.title || 'Architectural Credential',
            recipientName: cred.recipientName || 'Verified Holder',
            issuingAuthority: 'Draughtsman Studio & Archi Draft',
            issueDate: cred.issuedAt ? new Date(cred.issuedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recorded',
            expiryDate: cred.expiresAt ? new Date(cred.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Expired',
            isDemo: false
          });
        } else if (backendStatus === 'VALID' || data?.valid === true) {
          setStatus('valid');
          setCredentialData({
            id: cred.id || rawToken,
            title: cred.title || 'Certified Architectural Specialist',
            recipientName: cred.recipientName || 'Verified Holder',
            issuingAuthority: 'Draughtsman Studio & Archi Draft',
            issueDate: cred.issuedAt ? new Date(cred.issuedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recorded',
            expiryDate: cred.expiresAt ? new Date(cred.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Active / Perpetual',
            projectScope: cred.description || cred.type || '',
            pdfKey: cred.pdfKey,
            downloadUrl: cred.downloadUrl,
            isDemo: false
          });
        } else {
          setStatus('invalid');
          setErrorMessage(data?.message || 'Certificate record is invalid or unverified in the live registry.');
        }
      } else if (response.status === 404) {
        setStatus('not_found');
        setErrorMessage(`No matching certificate found in the authoritative Draughtsman Studio registry for "${rawToken}".`);
      } else {
        setStatus('error');
        setErrorMessage(`Authoritative verification service returned HTTP ${response.status}. The registry may be undergoing maintenance.`);
      }
    } catch (err) {
      clearTimeout(timer);
      const isTimeout = err.name === 'AbortError';
      console.warn('Certificate verification backend unreachable:', isTimeout ? 'Timeout' : err.message);
      setStatus('error');
      setErrorMessage(
        isTimeout
          ? 'Authoritative registry connection timed out. Live registry backend is currently unresponsive.'
          : 'Unable to reach the authoritative verification registry. Please check your network connection.'
      );
    }
  };

  // Check URL hash/query on mount for direct verify links (e.g., #verify?token=XYZ)
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/token=([a-zA-Z0-9_-]+)/i);
    if (match && match[1]) {
      setTokenInput(match[1]);
      handleVerifyToken(match[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = () => {
    setTokenInput('');
    setStatus('idle');
    setCredentialData(null);
    setErrorMessage('');
  };

  return (
    <div className="cert-verify-container">
      {/* Background Accent Grid */}
      <div className="cert-verify-bg-grid" />

      <div className="cert-verify-inner">
        {/* Navigation Return */}
        <div className="cert-verify-topbar">
          <button
            type="button"
            className="cert-back-btn"
            onClick={() => onNavigate ? onNavigate('home') : (window.location.hash = '#home')}
          >
            <ArrowLeft size={16} />
            <span>RETURN TO STUDIO</span>
          </button>
          <div className="cert-sys-tag">DRAUGHTSMAN STUDIO REGISTRY</div>
        </div>

        {/* Header */}
        <div className="cert-header">
          <div className="cert-badge">
            <Award size={14} className="cert-badge-icon" />
            <span>DIGITAL CREDENTIAL AUTHENTICATION</span>
          </div>
          <h1 className="cert-title">Certificate Verification</h1>
          <p className="cert-lead">
            Authenticate genuine certifications, training completions, and technical credentials issued by Draughtsman Studio and the Archi Draft platform.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="cert-input-card">
          <form
            className="cert-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyToken();
            }}
          >
            <div className="cert-input-wrapper">
              <Search size={20} className="cert-search-icon" />
              <input
                type="text"
                className="cert-input"
                placeholder="Enter Certificate ID or Cryptographic Token (e.g. DS-AD-BIM-8841)"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                maxLength={80}
                autoFocus
              />
              {tokenInput && (
                <button
                  type="button"
                  className="cert-clear-btn"
                  onClick={handleClear}
                  aria-label="Clear input"
                >
                  <RefreshCw size={14} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="cert-submit-btn"
              disabled={status === 'loading' || !tokenInput.trim()}
            >
              {status === 'loading' ? 'VERIFYING…' : 'VERIFY CREDENTIAL'}
            </button>
          </form>

          {/* Test/Demo Helper Chips for QA (Development only) */}
          {Boolean(import.meta.env?.DEV) && (
            <div className="cert-demo-helper">
              <span className="cert-demo-label">DEV TEST TOKENS:</span>
              <button
                type="button"
                className="cert-demo-chip is-valid"
                onClick={() => {
                  setTokenInput('DEMO-CERT-2026-ENG');
                  handleVerifyToken('DEMO-CERT-2026-ENG');
                }}
              >
                Demo: Valid
              </button>
              <button
                type="button"
                className="cert-demo-chip is-revoked"
                onClick={() => {
                  setTokenInput('DEMO-CERT-REVOKED');
                  handleVerifyToken('DEMO-CERT-REVOKED');
                }}
              >
                Demo: Revoked
              </button>
              <button
                type="button"
                className="cert-demo-chip is-expired"
                onClick={() => {
                  setTokenInput('DEMO-CERT-EXP');
                  handleVerifyToken('DEMO-CERT-EXP');
                }}
              >
                Demo: Expired
              </button>
            </div>
          )}
        </div>

        {/* Result Render Area */}
        <AnimatePresence mode="wait">
          {/* 1. VALID STATUS */}
          {status === 'valid' && credentialData && (
            <motion.div
              key="valid"
              className="cert-result-card is-valid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="cert-result-header">
                <div className="cert-status-badge is-valid">
                  <CheckCircle2 size={16} />
                  <span>AUTHENTIC CERTIFICATE VERIFIED</span>
                </div>
                <div className="cert-id-tag">ID: {credentialData.id}</div>
              </div>

              {credentialData.isDemo && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  margin: '12px 20px 0 20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertTriangle size={16} />
                  <span>DEMONSTRATION RECORD — NOT AN AUTHENTIC PRODUCTION CREDENTIAL</span>
                </div>
              )}

              <div className="cert-result-body">
                <h2 className="cert-cred-title">{credentialData.title}</h2>
                <div className="cert-grid-info">
                  <div className="cert-info-item">
                    <span className="cert-info-label">RECIPIENT</span>
                    <span className="cert-info-val">{credentialData.recipientName || 'Verified Holder'}</span>
                  </div>
                  <div className="cert-info-item">
                    <span className="cert-info-label">ISSUING ENTITY</span>
                    <span className="cert-info-val">{credentialData.issuingAuthority || 'Draughtsman Studio'}</span>
                  </div>
                  <div className="cert-info-item">
                    <span className="cert-info-label">DATE OF ISSUANCE</span>
                    <span className="cert-info-val">{credentialData.issueDate || 'Recorded'}</span>
                  </div>
                  <div className="cert-info-item">
                    <span className="cert-info-label">EXPIRY STATUS</span>
                    <span className="cert-info-val">{credentialData.expiryDate || 'Active / Perpetual'}</span>
                  </div>
                </div>

                {credentialData.projectScope && (
                  <div className="cert-scope-box">
                    <span className="cert-info-label">VERIFIED ACCREDITATION SCOPE</span>
                    <p className="cert-scope-text">{credentialData.projectScope}</p>
                  </div>
                )}
              </div>

              <div className="cert-result-footer">
                {credentialData.isDemo ? (
                  <>
                    <AlertTriangle size={16} className="cert-footer-shield text-warning" />
                    <span>
                      <strong>[QA DEMO RECORD]</strong> Validated via local test suite. Live verification requires authoritative Draughtsman Studio database connection.
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} className="cert-footer-shield" />
                    <span>
                      Authoritative cryptographic record confirmed against the official Draughtsman Studio registry.
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* 2. REVOKED STATUS */}
          {status === 'revoked' && (
            <motion.div
              key="revoked"
              className="cert-result-card is-revoked"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="cert-result-header">
                <div className="cert-status-badge is-revoked">
                  <ShieldAlert size={16} />
                  <span>CERTIFICATE REVOKED</span>
                </div>
                <div className="cert-id-tag">ID: {credentialData?.id || tokenInput}</div>
              </div>

              <div className="cert-result-body">
                <h2 className="cert-cred-title">{credentialData?.title || 'Credential Record'}</h2>
                <p className="cert-revoked-desc">
                  This certificate has been formally revoked by the issuing authority and is no longer valid for professional or academic accreditation.
                </p>
                {credentialData?.revocationReason && (
                  <div className="cert-alert-box">
                    <strong>Reason for Revocation:</strong> {credentialData.revocationReason}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 3. EXPIRED STATUS */}
          {status === 'expired' && (
            <motion.div
              key="expired"
              className="cert-result-card is-expired"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="cert-result-header">
                <div className="cert-status-badge is-expired">
                  <Clock size={16} />
                  <span>CREDENTIAL EXPIRED</span>
                </div>
                <div className="cert-id-tag">ID: {credentialData?.id || tokenInput}</div>
              </div>

              <div className="cert-result-body">
                <h2 className="cert-cred-title">{credentialData?.title || 'Credential Record'}</h2>
                <p className="cert-revoked-desc">
                  This credential reached its authorized expiration date and must be renewed to confirm active currency.
                </p>
              </div>
            </motion.div>
          )}

          {/* 4. NOT FOUND STATUS */}
          {status === 'not_found' && (
            <motion.div
              key="not_found"
              className="cert-result-card is-not-found"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="cert-result-header">
                <div className="cert-status-badge is-not-found">
                  <XCircle size={16} />
                  <span>CERTIFICATE NOT FOUND</span>
                </div>
              </div>
              <div className="cert-result-body">
                <p className="cert-result-msg">
                  {errorMessage || 'No certificate matching this identifier was located in our verified registry.'}
                </p>
                <div className="cert-tips-box">
                  <strong>Verification tips:</strong>
                  <ul>
                    <li>Check for typographical errors in the certificate ID or hash.</li>
                    <li>Ensure you are using the full token printed on your official document.</li>
                    <li>If you believe this is an error, contact our administrative verification desk at <a href="mailto:support@draughtsmanstudio.com">support@draughtsmanstudio.com</a>.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. ERROR STATUS */}
          {status === 'error' && (
            <motion.div
              key="error"
              className="cert-result-card is-error"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="cert-result-header">
                <div className="cert-status-badge is-error">
                  <AlertTriangle size={16} />
                  <span>VERIFICATION SERVICE NOTICE</span>
                </div>
              </div>
              <div className="cert-result-body">
                <p className="cert-result-msg">{errorMessage}</p>
                <button
                  type="button"
                  className="cert-retry-btn"
                  onClick={() => handleVerifyToken()}
                >
                  RETRY VERIFICATION
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security & Verification Policy Notice */}
        <div className="cert-security-footer">
          <ShieldCheck size={18} className="cert-sec-icon" />
          <div className="cert-sec-text">
            <strong>Authoritative Registry Protection:</strong> All Draughtsman Studio and Archi Draft credentials are validated using server-authoritative registries. Client-supplied tampering is rejected. To inspect the full verification protocol, visit our <a href="#legal?doc=verification-policy">Certificate Verification Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
