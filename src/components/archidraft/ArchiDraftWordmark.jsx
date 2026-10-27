import React from 'react';
import './ArchiDraftWordmark.css';

/**
 * ArchiDraftWordmark
 * 
 * Recreates the authentic "Archi Draft — THE APP" architectural wordmark
 * from reference `archi draft fonts.jpg`.
 * 
 * Distinctive Architectural Details:
 * 1. Lettering in 'Syne' 800 extra-bold geometric display typography.
 * 2. Capital 'A' featuring 3 rising vertical golden column spires inside the triangular pediment.
 * 3. Lowercase / capital 'I' accented with a 45° angled champagne-gold diamond prism tittle and vertical drafting guide.
 * 4. Capital 'D' with a 45° diagonal champagne-gold structural cross-brace strut in the lower-left counter.
 * 5. Widely tracked "THE APP" in 'Space Grotesk' flanked by horizontal champagne-gold drafting guide lines with crosshair ticks.
 * 6. Responsive SVG vector rendering with no clipping, blur, or raster distortion.
 */
const ArchiDraftWordmark = ({
  variant = 'hero',       // 'hero' | 'showcase' | 'compact' | 'vellum'
  theme = 'dark',         // 'dark' | 'ivory' | 'auto'
  className = '',
  style = {},
  showDraftingGuides = true,
  showMetadata = true,
  onClick,
  animated = true
}) => {
  const isCompact = variant === 'compact';
  const isVellum = variant === 'vellum' || theme === 'ivory';

  // Palette tokens
  const textColor = isVellum ? '#0d0f12' : '#f5f2eb';
  const goldPrimary = '#c8a96e';
  const goldLight = '#dfc58d';
  const goldDark = '#9e7b35';
  const guideColor = isVellum ? 'rgba(200, 169, 110, 0.45)' : 'rgba(200, 169, 110, 0.28)';

  if (isCompact) {
    return (
      <div 
        className={`ad-wordmark ad-wordmark--compact ${isVellum ? 'ad-wordmark--vellum' : ''} ${className}`}
        style={style}
        onClick={onClick}
        role="img"
        aria-label="ARCHI DRAFT — THE APP"
      >
        <svg
          viewBox="0 0 320 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ad-wordmark-svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ad-gold-comp" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={goldLight} />
              <stop offset="50%" stopColor={goldPrimary} />
              <stop offset="100%" stopColor={goldDark} />
            </linearGradient>
          </defs>

          {/* Registration ticks */}
          <line x1="2" y1="2" x2="8" y2="2" stroke={guideColor} strokeWidth="0.8" />
          <line x1="2" y1="2" x2="2" y2="8" stroke={guideColor} strokeWidth="0.8" />
          <line x1="318" y1="2" x2="312" y2="2" stroke={guideColor} strokeWidth="0.8" />
          <line x1="318" y1="2" x2="318" y2="8" stroke={guideColor} strokeWidth="0.8" />

          {/* Main Title: ARCHI DRAFT */}
          <text
            x="6"
            y="26"
            className="ad-wordmark-text ad-wordmark-text--compact"
            fill={textColor}
          >
            ARCHI DRAFT
          </text>

          {/* Architectural 'A' Column Spires (left) */}
          <g className="ad-wordmark-spires" fill="url(#ad-gold-comp)">
            <rect x="15" y="15" width="1.2" height="6" rx="0.5" />
            <rect x="17.2" y="13" width="1.2" height="8" rx="0.5" />
            <rect x="19.4" y="15" width="1.2" height="6" rx="0.5" />
          </g>

          {/* 'I' Diamond prism accent */}
          <polygon
            points="106,7 108.5,9.5 106,12 103.5,9.5"
            fill="url(#ad-gold-comp)"
          />

          {/* 'D' Diagonal cross-brace strut */}
          <line
            x1="126"
            y1="23"
            x2="134"
            y2="15"
            stroke="url(#ad-gold-comp)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Supporting label: THE APP with flanking drafting guide lines */}
          <g className="ad-wordmark-sub-row">
            <line x1="6" y1="38" x2="98" y2="38" stroke={goldPrimary} strokeWidth="0.8" strokeOpacity="0.65" />
            <circle cx="98" cy="38" r="1.2" fill={goldLight} />
            
            <text
              x="160"
              y="40.5"
              className="ad-wordmark-sub ad-wordmark-sub--compact"
              fill={goldLight}
              textAnchor="middle"
            >
              THE APP
            </text>
            
            <circle cx="222" cy="38" r="1.2" fill={goldLight} />
            <line x1="222" y1="38" x2="314" y2="38" stroke={goldPrimary} strokeWidth="0.8" strokeOpacity="0.65" />
          </g>
        </svg>
      </div>
    );
  }

  // Hero / Showcase / Vellum Variant
  return (
    <div 
      className={`ad-wordmark ad-wordmark--${variant} ${isVellum ? 'ad-wordmark--vellum' : ''} ${animated ? 'ad-wordmark--animated' : ''} ${className}`}
      style={style}
      onClick={onClick}
      role="img"
      aria-label="ARCHI DRAFT — THE APP. Architecture. Engineered. Delivered."
    >
      <svg
        viewBox="0 0 660 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ad-wordmark-svg"
        aria-hidden="true"
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id="ad-gold-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={goldLight} />
            <stop offset="45%" stopColor={goldPrimary} />
            <stop offset="100%" stopColor={goldDark} />
          </linearGradient>

          {/* Subtle text gradient */}
          <linearGradient id="ad-text-main" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={textColor} />
            <stop offset="100%" stopColor={isVellum ? '#1a1f28' : '#e6e2d8'} />
          </linearGradient>

          {/* Gold Shimmer Filter */}
          <filter id="ad-gold-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* ============================================================
            ARCHITECTURAL DRAFTING GUIDES & REGISTRATION MARKS
            ============================================================ */}
        {showDraftingGuides && (
          <g className="ad-drafting-guides" opacity="0.65">
            {/* Corner Registration Crosshairs */}
            <g stroke={guideColor} strokeWidth="0.8">
              {/* Top-Left */}
              <line x1="12" y1="4" x2="12" y2="16" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <circle cx="12" cy="12" r="1.5" fill="none" />

              {/* Top-Right */}
              <line x1="648" y1="4" x2="648" y2="16" />
              <line x1="640" y1="12" x2="652" y2="12" />
              <circle cx="648" cy="12" r="1.5" fill="none" />

              {/* Bottom-Left */}
              <line x1="12" y1="134" x2="12" y2="146" />
              <line x1="4" y1="140" x2="16" y2="140" />
              <circle cx="12" cy="140" r="1.5" fill="none" />

              {/* Bottom-Right */}
              <line x1="648" y1="134" x2="648" y2="146" />
              <line x1="640" y1="140" x2="652" y2="140" />
              <circle cx="648" cy="140" r="1.5" fill="none" />
            </g>

            {/* Baseline and Cap-Height Guidelines */}
            <line 
              x1="24" y1="82" x2="636" y2="82" 
              stroke={guideColor} 
              strokeWidth="0.6" 
              strokeDasharray="4 8" 
            />
            <line 
              x1="24" y1="28" x2="636" y2="28" 
              stroke={guideColor} 
              strokeWidth="0.6" 
              strokeDasharray="2 12" 
            />

            {/* Technical Metadata Coordinate Tag */}
            {showMetadata && (
              <>
                <text
                  x="28"
                  y="18"
                  className="ad-metadata-tag"
                  fill={goldPrimary}
                  opacity="0.75"
                >
                  SEC. 01 // ARCHITECTURAL WORDMARK & CAD GRID
                </text>

                <text
                  x="632"
                  y="18"
                  className="ad-metadata-tag"
                  fill={goldPrimary}
                  opacity="0.75"
                  textAnchor="end"
                >
                  SCALE 1:1 • AFC VERIFIED
                </text>
              </>
            )}
          </g>
        )}

        {/* ============================================================
            PRIMARY ARCHITECTURAL LETTERING: ARCHI DRAFT
            ============================================================ */}
        <g className="ad-wordmark-title-group">
          {/* Main SVG Text in Syne 800 ExtraBold */}
          <text
            x="24"
            y="80"
            className="ad-wordmark-text ad-wordmark-text--hero"
            fill="url(#ad-text-main)"
          >
            ARCHI DRAFT
          </text>

          {/* ============================================================
              BESPOKE ARCHITECTURAL ACCENTS FROM REFERENCE IMAGE
              ============================================================ */}
          
          {/* 1. THREE GOLDEN COLUMN SPIRES IN CAPITAL 'A' (PEDIMENT) */}
          <g 
            className="ad-wordmark-spires" 
            fill="url(#ad-gold-main)" 
            filter="url(#ad-gold-glow)"
          >
            {/* Left Column */}
            <rect x="42.5" y="47" width="2.4" height="15" rx="1" />
            {/* Center Tallest Column */}
            <rect x="47" y="39" width="2.6" height="23" rx="1" />
            {/* Right Column */}
            <rect x="51.5" y="47" width="2.4" height="15" rx="1" />
            {/* Base Pediment Runner */}
            <line x1="39" y1="63" x2="57" y2="63" stroke="url(#ad-gold-main)" strokeWidth="1.2" />
          </g>

          {/* 2. 45° ANGLED GOLD PRISM TITTLE & DRAFTING AXIS ON 'I' */}
          <g className="ad-wordmark-i-prism">
            {/* Vertical drafting guideline through axis */}
            <line 
              x1="228" y1="20" x2="228" y2="84" 
              stroke={goldLight} 
              strokeWidth="0.8" 
              strokeDasharray="2 2" 
              opacity="0.8"
            />
            {/* 45° Angled Diamond Prism */}
            <polygon
              points="228,21 233,26 228,31 223,26"
              fill="url(#ad-gold-main)"
              filter="url(#ad-gold-glow)"
            />
            {/* Crosshair Tick */}
            <path d="M 224 26 L 232 26" stroke={textColor} strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* 3. 45° DIAGONAL STRUCTURAL CROSS-BRACE STRUT IN CAPITAL 'D' */}
          <g className="ad-wordmark-d-brace">
            {/* Structural diagonal cross brace in lower-left counter of D */}
            <line
              x1="272"
              y1="75"
              x2="294"
              y2="53"
              stroke="url(#ad-gold-main)"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#ad-gold-glow)"
            />
            {/* Corner Gusset Pin */}
            <circle cx="272" cy="75" r="1.8" fill={goldLight} />
            <circle cx="294" cy="53" r="1.8" fill={goldLight} />
          </g>
        </g>

        {/* ============================================================
            SUPPORTING LABEL: — THE APP — WITH DRAFTING GUIDE RULES
            ============================================================ */}
        <g className="ad-wordmark-sub-lockup">
          {/* Left Drafting Rule with Diamond and Metric Crosshairs */}
          <line 
            x1="26" y1="120" x2="238" y2="120" 
            stroke="url(#ad-gold-main)" 
            strokeWidth="1.2" 
            strokeOpacity="0.75" 
          />
          {/* Left Mid-point Metric Crosshair */}
          <line x1="132" y1="115" x2="132" y2="125" stroke={goldLight} strokeWidth="1" />
          <line x1="128" y1="120" x2="136" y2="120" stroke={goldLight} strokeWidth="1" />
          {/* Left Diamond Terminal */}
          <polygon
            points="234,120 238,116 242,120 238,124"
            fill={goldLight}
          />

          {/* Center Label: THE APP */}
          <text
            x="330"
            y="125.5"
            className="ad-wordmark-sub ad-wordmark-sub--hero"
            fill="url(#ad-gold-main)"
            textAnchor="middle"
          >
            THE APP
          </text>

          {/* Right Diamond Terminal */}
          <polygon
            points="418,120 422,116 426,120 422,124"
            fill={goldLight}
          />
          {/* Right Mid-point Metric Crosshair */}
          <line x1="528" y1="115" x2="528" y2="125" stroke={goldLight} strokeWidth="1" />
          <line x1="524" y1="120" x2="532" y2="120" stroke={goldLight} strokeWidth="1" />
          {/* Right Drafting Rule */}
          <line 
            x1="422" y1="120" x2="634" y2="120" 
            stroke="url(#ad-gold-main)" 
            strokeWidth="1.2" 
            strokeOpacity="0.75" 
          />
        </g>
      </svg>
    </div>
  );
};

export default ArchiDraftWordmark;
