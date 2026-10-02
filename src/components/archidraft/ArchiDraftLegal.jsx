import React from 'react';
import { SUPPORT_EMAIL, STUDIO_WEBSITE } from './archidraft.config';

/**
 * Legal content pages for Archi Draft.
 * 
 * PLACEHOLDER: All legal text below is placeholder/template content.
 * Replace with actual legal documents reviewed by a legal professional
 * before publishing.
 */

export const ArchiDraftPrivacy = () => (
  <div className="ad-legal" role="main" aria-label="Archi Draft Privacy Policy">
    <div className="ad-legal-inner">
      <p className="ad-section-label">Legal</p>
      <h1>Privacy Policy</h1>
      <p className="ad-legal-updated">Archi Draft — by Draughtsman Studio</p>

      <div className="ad-legal-placeholder">
        <p>⚠ PLACEHOLDER: This privacy policy is a template. Replace with your actual privacy policy reviewed by a legal professional before publishing.</p>
      </div>

      <h2>1. Introduction</h2>
      <p>
        This Privacy Policy describes how Draughtsman Studio ("we", "us", or "our")
        collects, uses, and protects your information when you use the Archi Draft
        mobile application ("the App").
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>Account information (name, email address) when you create an account</li>
        <li>Project data and drawings you create within the App</li>
        <li>Device information and usage analytics to improve the App experience</li>
        <li>Crash reports and performance data</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>Your information is used to:</p>
      <ul>
        <li>Provide and maintain the App's functionality</li>
        <li>Improve user experience and App performance</li>
        <li>Respond to support requests</li>
        <li>Send important product updates (with your consent)</li>
      </ul>

      <h2>4. Data Storage & Security</h2>
      <p>
        Your project data is stored locally on your device. We implement
        industry-standard security measures to protect any data transmitted
        to our servers.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>
        The App may use third-party services for analytics and crash reporting.
        These services have their own privacy policies governing the use of
        your information.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data.
        You may also request a copy of your data or opt out of analytics collection.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        For privacy-related questions, contact us at{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </div>
  </div>
);

export const ArchiDraftTerms = () => (
  <div className="ad-legal" role="main" aria-label="Archi Draft Terms of Service">
    <div className="ad-legal-inner">
      <p className="ad-section-label">Legal</p>
      <h1>Terms of Service</h1>
      <p className="ad-legal-updated">Archi Draft — by Draughtsman Studio</p>

      <div className="ad-legal-placeholder">
        <p>⚠ PLACEHOLDER: These terms of service are a template. Replace with your actual terms reviewed by a legal professional before publishing.</p>
      </div>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By downloading, installing, or using Archi Draft ("the App"), you agree
        to be bound by these Terms of Service. If you do not agree, do not
        use the App.
      </p>

      <h2>2. License</h2>
      <p>
        Draughtsman Studio grants you a limited, non-exclusive, non-transferable,
        revocable license to use the App for personal and professional architectural
        drafting purposes.
      </p>

      <h2>3. User Content</h2>
      <p>
        You retain ownership of all drawings, designs, and project files you create
        using the App. We do not claim any intellectual property rights over your content.
      </p>

      <h2>4. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Reverse-engineer, decompile, or disassemble the App</li>
        <li>Use the App for any unlawful purpose</li>
        <li>Redistribute or resell the App or its components</li>
        <li>Attempt to gain unauthorized access to our systems</li>
      </ul>

      <h2>5. Limitation of Liability</h2>
      <p>
        The App is provided "as is" without warranty of any kind. Draughtsman Studio
        shall not be liable for any indirect, incidental, or consequential damages
        arising from your use of the App.
      </p>

      <h2>6. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the App after
        changes constitutes acceptance of the revised Terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        For questions about these Terms, contact us at{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </div>
  </div>
);

export const ArchiDraftDeletion = () => (
  <div className="ad-legal" role="main" aria-label="Archi Draft Account and Data Deletion">
    <div className="ad-legal-inner">
      <p className="ad-section-label">Legal</p>
      <h1>Account &amp; Data Deletion</h1>
      <p className="ad-legal-updated">Archi Draft — by Draughtsman Studio</p>

      <div className="ad-legal-placeholder">
        <p>⚠ PLACEHOLDER: Update this page with your actual data deletion process and timelines before publishing.</p>
      </div>

      <h2>Request Account Deletion</h2>
      <p>
        You have the right to request the deletion of your Archi Draft account
        and all associated data. We are committed to honoring your data privacy rights.
      </p>

      <h2>How to Delete Your Account</h2>
      <p>To request account and data deletion:</p>
      <ul>
        <li>
          <strong>Email:</strong> Send a deletion request to{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with
          the subject line "Account Deletion Request"
        </li>
        <li>
          <strong>In-App:</strong> Navigate to Settings → Account → Delete Account
        </li>
      </ul>

      <h2>What Gets Deleted</h2>
      <p>Upon account deletion, the following data will be permanently removed:</p>
      <ul>
        <li>Your account profile and credentials</li>
        <li>Any cloud-synced project data</li>
        <li>Usage analytics associated with your account</li>
        <li>Support ticket history</li>
      </ul>

      <h2>Processing Time</h2>
      <p>
        Deletion requests are typically processed within 30 days. You will
        receive a confirmation email once the deletion is complete.
      </p>

      <h2>Data Retained Locally</h2>
      <p>
        Projects stored only on your device are not affected by account deletion.
        To remove local data, uninstall the App from your device.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about data deletion, contact{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </div>
  </div>
);
