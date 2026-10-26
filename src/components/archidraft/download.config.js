/**
 * Archi Draft — Official Multi-Platform Release & Download Configuration
 * 
 * Authoritative single source of truth for platform availability, verified build versions,
 * system requirements, distribution destinations, and cryptographic integrity hashes.
 * 
 * Grounded in:
 * - pixelmint-studio-mvs/Archidraft (COMPLETED-INTERGRATION branch)
 * - Android Application ID: com.draughtsmanstudio.archi_draft
 * - Engine: Flutter 3.13+ / Dart 3.13+ / Firebase & Cloudflare Worker API
 */

export const RELEASE_METADATA = {
  currentVersion: '1.0.0',
  buildNumber: '1',
  releaseCycle: 'v1.0.0-qa.1',
  lastAuditDate: 'October 2026',
  repositoryUrl: 'https://github.com/pixelmint-studio-mvs/Archidraft',
  developerOrganization: 'PixelMint Studio MVS for Draughtsman Studio',
  publisher: 'Draughtsman Studio',
  supportEmail: 'support@draughtsmanstudio.com',
  betaProgramEmail: 'beta@draughtsmanstudio.com',
  documentationUrl: 'https://github.com/pixelmint-studio-mvs/Archidraft/tree/COMPLETED-INTERGRATION/docs',
};

export const PLATFORM_DOWNLOADS = [
  {
    id: 'android',
    name: 'Android',
    category: 'mobile',
    iconName: 'Smartphone',
    tagline: 'On-site technical drawing inspection, redlines, and project tracking.',
    availability: 'private_beta', // 'available' | 'private_beta' | 'coming_soon' | 'unavailable'
    availabilityLabel: 'Private Beta (QA)',
    availabilityBadgeColor: 'accent', // 'emerald' | 'accent' | 'blue' | 'neutral'
    version: '1.0.0 (Build 1)',
    releaseDate: 'October 2026',
    packageIdentifier: 'com.draughtsmanstudio.archi_draft',
    architecture: 'ARM64-v8a / armeabi-v7a / x86_64',
    distributionType: 'google_play_and_apk',
    
    // Status breakdown
    storeStatus: {
      type: 'google_play',
      label: 'Google Play Store',
      status: 'review_pending',
      statusNote: 'Store listing submitted and undergoing initial Google Play Console review. Not yet indexed publicly.',
      url: null, // No fake operational links
    },
    directApkStatus: {
      type: 'direct_apk',
      label: 'Direct APK (Internal Track)',
      status: 'authorized_beta',
      statusNote: 'Signed internal test APKs are distributed to vetted studio draughtsmen and client beta testers via closed distribution.',
      downloadUrl: null, // Production signed APK will be linked upon release tagging
      checksum: null,
      checksumStatus: 'pending_release',
      checksumNote: 'Cryptographic SHA-256 hash will be calculated and published upon production signed binary release.',
    },

    systemRequirements: {
      minOS: 'Android 8.0 (Oreo, API level 26) or higher',
      recommendedOS: 'Android 12.0+ with 120Hz display',
      ram: '2 GB minimum (4 GB recommended for dense DWG sheets)',
      storage: '150 MB for app bundle + CAD drawing cache',
      screen: 'Phones and tablets (320px minimum viewport)',
      permissions: 'Storage (for offline CAD/PDF exports), Camera (optional, for site survey photos)',
    },

    installationGuide: [
      {
        step: 1,
        title: 'Join the Beta Guild',
        desc: 'Request beta authorization by providing your Draughtsman Studio account email or student enrollment token.',
      },
      {
        step: 2,
        title: 'Accept Play Console Invitation',
        desc: 'Once approved, you will receive an official Google Play Internal Test track invitation link.',
      },
      {
        step: 3,
        title: 'Install & Authorize',
        desc: 'Download the app securely via Google Play Protect. Log in using your assigned role credentials.',
      },
    ],

    securityNotes: [
      'Google Play Protect verifies every APK before installation.',
      'No root permissions or invasive system privileges required.',
      'All drawing synchronization is encrypted via TLS 1.3 to Firebase & Cloudflare R2.',
    ],
  },

  {
    id: 'windows',
    name: 'Windows Desktop',
    category: 'desktop',
    iconName: 'Monitor',
    tagline: 'High-throughput studio workstation for multi-monitor drafting & sheet production.',
    availability: 'coming_soon',
    availabilityLabel: 'In Active Development',
    availabilityBadgeColor: 'blue',
    version: 'v1.1.0-alpha (Target)',
    releaseDate: 'Q1 2027 (Roadmap)',
    packageIdentifier: 'DraughtsmanStudio.ArchiDraft.Desktop',
    architecture: 'x64 (64-bit Windows)',
    distributionType: 'installer',

    installerDetails: {
      format: '.msi / .exe (Inno Setup & MSIX Package)',
      publisher: 'Draughtsman Studio LLC',
      digitalSignatureStatus: 'Code-Signing Certificate Procurement in Progress (Authenticode)',
      downloadUrl: null, // Honest: no fake installer file
    },

    systemRequirements: {
      minOS: 'Windows 10 64-bit (Version 2004 or later) or Windows 11',
      processor: 'Intel Core i5 (8th Gen+) / AMD Ryzen 5 or higher',
      ram: '8 GB minimum (16 GB recommended for multi-sheet BIM sets)',
      graphics: 'DirectX 11 / OpenGL 3.3 compatible GPU with 2GB VRAM',
      storage: '500 MB free SSD space',
      display: '1920 × 1080 minimum resolution (Dual-monitor supported)',
    },

    installationGuide: [
      {
        step: 1,
        title: 'Download Verified Installer',
        desc: 'Once published, download the official ArchiDraft-Setup-x64.exe installer directly from draughtsmanstudio.com.',
      },
      {
        step: 2,
        title: 'Verify SHA-256 Checksum',
        desc: 'Run `certutil -hashfile ArchiDraft-Setup-x64.exe SHA256` in PowerShell to ensure binary integrity.',
      },
      {
        step: 3,
        title: 'Execute Installation',
        desc: 'Run the setup wizard. SmartScreen will verify the Draughtsman Studio Authenticode publisher signature.',
      },
    ],

    securityNotes: [
      'Installer builds will be digitally signed with a verified EV Code-Signing certificate.',
      'SmartScreen reputation building ensures tamper-free delivery.',
      'Zero background telemetry or unauthorized file-system crawling.',
    ],
  },

  {
    id: 'web',
    name: 'Web Workstation',
    category: 'web',
    iconName: 'Globe',
    tagline: 'Zero-install browser portal for client reviews, redlines, and quick drawing verification.',
    availability: 'private_beta',
    availabilityLabel: 'Staging Preview',
    availabilityBadgeColor: 'accent',
    version: 'v1.0.0-web.preview',
    releaseDate: 'Continuous Deployment',
    packageIdentifier: 'https://app.draughtsmanstudio.com (Staging)',
    architecture: 'WebAssembly (Wasm) + WebGL 2.0 CanvasKit',
    distributionType: 'cloud_app',

    webAccessDetails: {
      stagingUrl: null, // Kept internal to prevent unauthorized portal access
      targetDomain: 'app.draughtsmanstudio.com',
      launchButtonText: 'Access Web Preview',
      isPubliclyLaunched: false,
    },

    systemRequirements: {
      minOS: 'Any modern desktop OS (Windows, macOS, Linux, ChromeOS)',
      browsers: 'Google Chrome 110+, Microsoft Edge 110+, Mozilla Firefox 115+, Apple Safari 16+',
      hardwareAcceleration: 'GPU Hardware Acceleration recommended in browser flags',
      network: 'Broadband internet connection (10 Mbps+ recommended for dense DWG plots)',
    },

    installationGuide: [
      {
        step: 1,
        title: 'Open Verified Domain',
        desc: 'Access the authenticated web workstation using modern desktop web browsers.',
      },
      {
        step: 2,
        title: 'Role-Based Sign-In',
        desc: 'Authenticate via email magic link or secure Google workspace credentials.',
      },
      {
        step: 3,
        title: 'Interactive Drawing Viewer',
        desc: 'Pan, zoom, layer-toggle, and review PDF/DWG revisions without installing local CAD software.',
      },
    ],

    securityNotes: [
      'Served with HSTS, CSP (Content Security Policy), and Cross-Origin Isolation headers.',
      'Drawings render in a sandboxed WebAssembly canvas context.',
      'No browser extensions or third-party plugins required.',
    ],
  },

  {
    id: 'ios',
    name: 'Apple iOS & iPadOS',
    category: 'mobile',
    iconName: 'Apple',
    tagline: 'Field drawing review optimized for iPhone and Apple Pencil on iPad Pro.',
    availability: 'coming_soon',
    availabilityLabel: 'Upcoming (Roadmap)',
    availabilityBadgeColor: 'neutral',
    version: 'v1.1.0 (Planned)',
    releaseDate: 'H1 2027',
    packageIdentifier: 'com.draughtsmanstudio.archidraft.ios',
    architecture: 'Apple Silicon (A12 Bionic and newer / M1-M4)',
    distributionType: 'app_store',

    storeStatus: {
      type: 'apple_app_store',
      label: 'Apple App Store & TestFlight',
      status: 'in_pipeline',
      statusNote: 'iOS build target configured in Flutter. Awaiting Apple Developer Program provisioning profile and TestFlight staging.',
      url: null,
    },

    systemRequirements: {
      minOS: 'iOS 16.0 / iPadOS 16.0 or higher',
      devices: 'iPhone 11 or newer, iPad (9th gen+), iPad Air (4th gen+), iPad Pro (All Apple Silicon models)',
      accessories: 'Apple Pencil (1st, 2nd gen, USB-C, Pro) supported for precision redlines',
    },

    installationGuide: [
      {
        step: 1,
        title: 'Apple TestFlight Invitation',
        desc: 'iOS beta testing will be conducted through Apple TestFlight for registered Draughtsman Studio partners.',
      },
      {
        step: 2,
        title: 'App Store Public Launch',
        desc: 'Official public release will be listed directly in the Apple App Store globally upon certification.',
      },
    ],

    securityNotes: [
      'Sandboxed according to Apple iOS App Store guidelines.',
      'Face ID / Touch ID biometric authentication for confidential drawing sheets.',
    ],
  },

  {
    id: 'macos',
    name: 'Apple macOS',
    category: 'desktop',
    iconName: 'Terminal',
    tagline: 'Native desktop drafting manager for Apple Silicon architecture.',
    availability: 'coming_soon',
    availabilityLabel: 'Planned Roadmap',
    availabilityBadgeColor: 'neutral',
    version: 'Future Target',
    releaseDate: '2027',
    packageIdentifier: 'com.draughtsmanstudio.archidraft.macos',
    architecture: 'Universal Binary (Apple Silicon M-Series & Intel x86_64)',
    distributionType: 'dmg_and_app_store',

    systemRequirements: {
      minOS: 'macOS 13.0 (Ventura) or macOS 14.0 (Sonoma) / macOS 15.0 (Sequoia)',
      hardware: 'Apple M1/M2/M3/M4 or Intel Core i7 with Metal GPU support',
      ram: '8 GB unified memory minimum',
    },

    installationGuide: [
      {
        step: 1,
        title: 'Roadmap Milestone',
        desc: 'macOS desktop compilation follows the Windows desktop deployment.',
      },
    ],

    securityNotes: [
      'Notarized by Apple Gatekeeper with hardened runtime.',
    ],
  },
];

export const DOWNLOAD_SECURITY_PILLARS = [
  {
    title: 'HTTPS & TLS 1.3 Transport',
    desc: 'All official downloads and drawing data streams travel exclusively over encrypted connections with strict transport security.',
  },
  {
    title: 'Official Provenance',
    desc: 'Downloads are delivered exclusively through verified channels (Google Play, Apple TestFlight, and Draughtsman Studio verified endpoints). Never download from unauthorized third-party mirror sites.',
  },
  {
    title: 'Cryptographic Verification',
    desc: 'Every production binary release is published with an authoritative SHA-256 checksum so administrators can independently verify package integrity.',
  },
  {
    title: 'Zero Malware & Privacy First',
    desc: 'Archi Draft binaries contain zero bundled adware, bloatware, or hidden data miners. Your CAD assets remain strictly within private studio boundaries.',
  },
];
