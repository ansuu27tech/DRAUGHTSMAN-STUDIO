import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Play, 
  Sparkles, 
  MessageSquare, 
  Compass, 
  Shield, 
  FileCheck2, 
  HelpCircle,
  Users
} from 'lucide-react';
import ArchiDraftWordmark from './archidraft/ArchiDraftWordmark';

/**
 * ArchiDraftShowcase — Premium Cinematic Product Showcase
 * 
 * Features:
 * 1. Prominent, bold ARCHI DRAFT brand header with architectural construction lines.
 * 2. Cinematic 16:9 product-film stage with CAD building wireframe, animated drafting scan,
 *    central brandmark illumination, and understated play cue.
 * 3. Future-proof video support: pass `videoSrc` and `posterSrc` to activate live playback.
 * 4. Three coordinated primary CTA buttons navigating to existing site sections:
 *    - Explore Platform (#archi-draft)
 *    - Download Center (#download)
 *    - Verify Certificate (#verify)
 * 5. Full, prestigious PIXMINT BOT Architectural Assistant showcase on the main page.
 */
const ArchiDraftShowcase = ({ 
  videoSrc = null, 
  posterSrc = '/archidraft/blueprint.jpg' 
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.98, 1, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.65, 1, 1, 0.65]);

  const handleLinkClick = (targetHash) => () => {
    if (window.location.hash === targetHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = targetHash;
    }
  };

  const handleOpenBot = (initialQuestion = null, role = 'guest') => () => {
    window.dispatchEvent(new CustomEvent('open-pixmint-bot', { 
      detail: { role, initialQuestion } 
    }));
  };

  return (
    <section 
      id="archidraft-showcase" 
      style={{ 
        padding: 'clamp(4.5rem, 7vw, 6.5rem) 1.5rem clamp(5rem, 8vw, 7.5rem)', 
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 5
      }}
      ref={containerRef}
      aria-label="ArchiDraft Product Film and Platform Navigation"
    >
      {/* ─── CINEMATIC ARCHITECTURAL BACKGROUND ─── */}
      {/* Ambient Blueprint Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(198, 169, 105, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(198, 169, 105, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        opacity: 0.8,
        pointerEvents: 'none'
      }} />

      {/* Atmospheric Radial Halo behind Video Stage */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(400px, 80vw, 1100px)',
        height: 'clamp(350px, 60vh, 750px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(198, 169, 105, 0.07) 0%, rgba(198, 169, 105, 0.015) 50%, transparent 75%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Subtle Vertical Plumb Lines on Section Margins */}
      <div style={{
        position: 'absolute',
        top: '10%',
        bottom: '10%',
        left: 'clamp(1rem, 4vw, 4rem)',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(198, 169, 105, 0.15) 30%, rgba(198, 169, 105, 0.15) 70%, transparent)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '10%',
        bottom: '10%',
        right: 'clamp(1rem, 4vw, 4rem)',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(198, 169, 105, 0.15) 30%, rgba(198, 169, 105, 0.15) 70%, transparent)',
        pointerEvents: 'none'
      }} />

      <motion.div 
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          scale,
          opacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* ─── 1. STRONG BRAND HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1080px',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)'
          }}
        >
          {/* Left Architectural Construction Line */}
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(198, 169, 105, 0.4))',
            maxWidth: '160px'
          }} />

          {/* Prominent Large Wordmark */}
          <div style={{
            maxWidth: 'clamp(440px, 62vw, 680px)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            filter: 'drop-shadow(0 4px 20px rgba(198, 169, 105, 0.15))'
          }}>
            <ArchiDraftWordmark variant="showcase" showMetadata={false} />
          </div>

          {/* Right Architectural Construction Line */}
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(198, 169, 105, 0.4), transparent)',
            maxWidth: '160px'
          }} />
        </motion.div>

        {/* ─── 2. CINEMATIC 16:9 PRODUCT-FILM STAGE ─── */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: '18px',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 50% 45%, #0f131a 0%, #07090d 65%, #040507 100%)',
          border: '1px solid rgba(198, 169, 105, 0.28)',
          boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(198, 169, 105, 0.35), 0 0 40px rgba(198, 169, 105, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {videoSrc ? (
            /* Live Production Video Element (When real video asset is supplied) */
            <video
              src={videoSrc}
              poster={posterSrc}
              controls
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              aria-label="ArchiDraft Product Film"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            /* Premium Architectural Video Placeholder Composition */
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {/* Internal Subtle CAD Blueprint Grid */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(to right, rgba(198, 169, 105, 0.04) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(198, 169, 105, 0.04) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
              }} />

              {/* Faint Architectural Wireframe / CAD Building Visualization */}
              <svg
                viewBox="0 0 1200 675"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  opacity: 0.22
                }}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="cad-gold-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C6A969" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C6A969" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="cad-beam-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C6A969" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#C6A969" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#C6A969" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Ground Level Axis Line */}
                <line x1="80" y1="580" x2="1120" y2="580" stroke="url(#cad-beam-grad)" strokeWidth="1.5" />
                <line x1="80" y1="588" x2="1120" y2="588" stroke="#C6A969" strokeWidth="0.5" strokeDasharray="3 9" opacity="0.4" />

                {/* Main Structural Frame (High-Rise Elevation Wireframe) */}
                {/* Primary Tower Columns */}
                <line x1="380" y1="120" x2="380" y2="580" stroke="url(#cad-gold-grad)" strokeWidth="1.2" />
                <line x1="480" y1="100" x2="480" y2="580" stroke="url(#cad-gold-grad)" strokeWidth="1.2" />
                <line x1="600" y1="80" x2="600" y2="580" stroke="url(#cad-gold-grad)" strokeWidth="1.5" />
                <line x1="720" y1="100" x2="720" y2="580" stroke="url(#cad-gold-grad)" strokeWidth="1.2" />
                <line x1="820" y1="120" x2="820" y2="580" stroke="url(#cad-gold-grad)" strokeWidth="1.2" />

                {/* Flanking Low-Rise Wings */}
                <line x1="260" y1="300" x2="260" y2="580" stroke="url(#cad-gold-grad)" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="940" y1="300" x2="940" y2="580" stroke="url(#cad-gold-grad)" strokeWidth="0.8" strokeDasharray="4 4" />

                {/* Horizontal Floor Slabs */}
                {[140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540].map((y, idx) => (
                  <g key={y}>
                    <line 
                      x1={y < 300 ? 380 : 260} 
                      y1={y} 
                      x2={y < 300 ? 820 : 940} 
                      y2={y} 
                      stroke="#C6A969" 
                      strokeWidth={idx % 3 === 0 ? "1.2" : "0.6"} 
                      opacity={idx % 2 === 0 ? 0.7 : 0.4} 
                    />
                    {/* Floor Level Datum Tick */}
                    <circle cx={y < 300 ? 380 : 260} cy={y} r="1.5" fill="#C6A969" opacity="0.6" />
                    <circle cx={y < 300 ? 820 : 940} cy={y} r="1.5" fill="#C6A969" opacity="0.6" />
                  </g>
                ))}

                {/* Structural Cross-Bracing Struts (Wind Bracing) */}
                <line x1="380" y1="340" x2="480" y2="420" stroke="#C6A969" strokeWidth="0.7" opacity="0.35" />
                <line x1="480" y1="340" x2="380" y2="420" stroke="#C6A969" strokeWidth="0.7" opacity="0.35" />
                <line x1="720" y1="340" x2="820" y2="420" stroke="#C6A969" strokeWidth="0.7" opacity="0.35" />
                <line x1="820" y1="340" x2="720" y2="420" stroke="#C6A969" strokeWidth="0.7" opacity="0.35" />
                <line x1="380" y1="420" x2="480" y2="500" stroke="#C6A969" strokeWidth="0.7" opacity="0.35" />
                <line x1="480" y1="420" x2="380" y2="500" stroke="#C6A969" strokeWidth="0.7" opacity="0.35" />
                <line x1="720" y1="420" x2="820" y2="500" stroke="#C6A969" strokeWidth="0.7" opacity="0.35" />
                <line x1="820" y1="420" x2="720" y2="500" stroke="#C6A969" strokeWidth="0.7" opacity="0.35" />

                {/* Crown Spire & Penthouse Geometry */}
                <polygon points="480,100 600,60 720,100" stroke="#C6A969" strokeWidth="1" fill="none" opacity="0.6" />
                <line x1="600" y1="30" x2="600" y2="60" stroke="#C6A969" strokeWidth="1.5" />
                <circle cx="600" cy="30" r="2" fill="#C6A969" />

                {/* Radial Perspective Guide Rays from Spire */}
                <line x1="600" y1="30" x2="160" y2="580" stroke="#C6A969" strokeWidth="0.4" strokeDasharray="2 8" opacity="0.25" />
                <line x1="600" y1="30" x2="1040" y2="580" stroke="#C6A969" strokeWidth="0.4" strokeDasharray="2 8" opacity="0.25" />
              </svg>

              {/* Restrained Animated Drafting Line (Slow Horizontal Scan) */}
              <motion.div
                animate={{ x: ['-20%', '120%'], opacity: [0, 0.45, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '80px',
                  background: 'linear-gradient(90deg, transparent, rgba(198, 169, 105, 0.12), transparent)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />

              {/* Corner Registration Crosshairs */}
              <span style={{ position: 'absolute', top: '16px', left: '18px', fontFamily: 'monospace', fontSize: '0.66rem', color: 'rgba(198, 169, 105, 0.45)', pointerEvents: 'none' }}>+ 16:9 // 4K STAGE</span>
              <span style={{ position: 'absolute', top: '16px', right: '18px', fontFamily: 'monospace', fontSize: '0.66rem', color: 'rgba(198, 169, 105, 0.45)', pointerEvents: 'none' }}>CAD WIREFRAME +</span>
              <span style={{ position: 'absolute', bottom: '16px', left: '18px', fontFamily: 'monospace', fontSize: '0.66rem', color: 'rgba(198, 169, 105, 0.45)', pointerEvents: 'none' }}>+ ARCHI DRAFT</span>
              <span style={{ position: 'absolute', bottom: '16px', right: '18px', fontFamily: 'monospace', fontSize: '0.66rem', color: 'rgba(198, 169, 105, 0.45)', pointerEvents: 'none' }}>STUDIO ATELIER +</span>

              {/* ─── CENTERPIECE COMPOSITION ─── */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                position: 'relative',
                zIndex: 3
              }}>
                {/* Brandmark Disc with Rotating Precision Calibration Ring */}
                <div style={{
                  position: 'relative',
                  width: 'clamp(84px, 9vw, 110px)',
                  height: 'clamp(84px, 9vw, 110px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Outer Pulsing Amber Glow */}
                  <motion.div
                    animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.6, 0.35] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(198, 169, 105, 0.35) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                      zIndex: 0
                    }}
                  />

                  {/* Rotating Precision Drafting Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      left: '-6px',
                      right: '-6px',
                      bottom: '-6px',
                      borderRadius: '50%',
                      border: '1px dashed rgba(198, 169, 105, 0.35)',
                      pointerEvents: 'none',
                      zIndex: 1
                    }}
                  />

                  {/* Core Brandmark Disc */}
                  <div style={{
                    width: '85%',
                    height: '85%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 30%, #1a1e27 0%, #0d1017 75%, #05070a 100%)',
                    border: '1.5px solid #C6A969',
                    boxShadow: '0 0 25px rgba(198, 169, 105, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    padding: '14px'
                  }}>
                    <img
                      src="/archidraft/logo-mark-white.png"
                      alt="ArchiDraft Official Brand Mark"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))'
                      }}
                    />
                  </div>
                </div>

                {/* Subtle Play Cue Visual Indicator */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: 'rgba(198, 169, 105, 0.08)',
                  border: '1px solid rgba(198, 169, 105, 0.25)',
                  color: '#C6A969'
                }}>
                  <Play size={10} fill="#C6A969" color="#C6A969" />
                  <span style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.62rem',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontWeight: 600
                  }}>
                    FILM PREVIEW
                  </span>
                </div>

                {/* Tasteful Label */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 'clamp(0.82rem, 1.3vw, 1.02rem)',
                    letterSpacing: '3.5px',
                    textTransform: 'uppercase',
                    color: '#C6A969',
                    fontWeight: 700,
                    margin: '0 0 4px 0'
                  }}>
                    ARCHIDRAFT // PRODUCT FILM
                  </h3>
                  <div style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '2px',
                    color: 'rgba(255, 255, 255, 0.45)',
                    textTransform: 'uppercase'
                  }}>
                    OFFICIAL WORKSPACE MOTION GRAPHIC
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── 3. THREE POLISHED CTA BUTTONS BENEATH THE VIDEO ─── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
          marginTop: 'clamp(2rem, 3.5vw, 3rem)',
          width: '100%'
        }}>
          {/* Button 1: Explore Platform (Primary Champagne Gold) */}
          <a 
            href="#archi-draft"
            onClick={handleLinkClick('#archi-draft')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              minHeight: '50px',
              padding: '0.9rem 2rem',
              background: '#C6A969',
              color: '#080a0d',
              border: '1px solid #C6A969',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(198, 169, 105, 0.35)',
              transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#DFCAA0';
              e.currentTarget.style.borderColor = '#DFCAA0';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(198, 169, 105, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#C6A969';
              e.currentTarget.style.borderColor = '#C6A969';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(198, 169, 105, 0.35)';
            }}
          >
            <span>Explore Platform</span>
            <ArrowRight size={16} />
          </a>

          {/* Button 2: Download Center (Dark Surface with Refined Gold Border) */}
          <a 
            href="#download"
            onClick={handleLinkClick('#download')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              minHeight: '50px',
              padding: '0.9rem 2rem',
              background: 'rgba(14, 18, 24, 0.9)',
              color: '#C6A969',
              border: '1px solid rgba(198, 169, 105, 0.45)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.84rem',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(198, 169, 105, 0.15)';
              e.currentTarget.style.borderColor = '#C6A969';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(198, 169, 105, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(14, 18, 24, 0.9)';
              e.currentTarget.style.borderColor = 'rgba(198, 169, 105, 0.45)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Download size={16} />
            <span>Download Center</span>
          </a>

          {/* Button 3: Verify Certificate (Dark Surface with Subtle Border & Verification Icon) */}
          <a 
            href="#verify"
            onClick={handleLinkClick('#verify')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              minHeight: '50px',
              padding: '0.9rem 2rem',
              background: 'rgba(14, 18, 24, 0.9)',
              color: 'var(--color-text-secondary)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.84rem',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(198, 169, 105, 0.6)';
              e.currentTarget.style.color = '#C6A969';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(198, 169, 105, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ShieldCheck size={16} />
            <span>Verify Certificate</span>
          </a>
        </div>

        {/* ─── 4. PIXMINT BOT ARCHITECTURAL ASSISTANT SHOWCASE ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{
            width: '100%',
            maxWidth: '1200px',
            background: 'radial-gradient(ellipse at 80% 30%, rgba(16, 185, 129, 0.08) 0%, rgba(10, 16, 24, 0.98) 65%, #050811 100%)',
            border: '1px solid rgba(16, 185, 129, 0.32)',
            borderRadius: '18px',
            padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            marginTop: 'clamp(3rem, 5vw, 4.5rem)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.75), 0 0 35px rgba(16, 185, 129, 0.09)'
          }}
        >
          {/* Subtle Emerald Grid Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.035) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            pointerEvents: 'none'
          }} />

          {/* Top Banner Row: Mascot + Identity + Launch CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.75rem',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.07)'
          }}>
            {/* Left: Mascot & Headline */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
              {/* Authentic Mascot Frame */}
              <div style={{
                position: 'relative',
                width: '92px',
                height: '92px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Emerald Glow Pulse Ring */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 70%)',
                    filter: 'blur(16px)',
                    zIndex: 0
                  }}
                />

                {/* Rotating Dashed Calibration Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '-4px',
                    right: '-4px',
                    bottom: '-4px',
                    borderRadius: '50%',
                    border: '1px dashed rgba(16, 185, 129, 0.4)',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                />

                {/* Circular Mascot Thumbnail */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #10B981',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.35)',
                  position: 'relative',
                  zIndex: 2,
                  background: '#040d09'
                }}>
                  <img
                    src="/archidraft/pixmint-mascot.jpg"
                    alt="PIXMINT BOT Mascot"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              </div>

              {/* Headings */}
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#34D399'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
                    <span>ARCHITECTURAL INTELLIGENCE // ASSISTANT</span>
                  </span>

                  <span style={{
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    background: 'rgba(16, 185, 129, 0.16)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    color: '#34D399',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '1px'
                  }}>
                    ONLINE • GROUNDED
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.15rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0 0 0.35rem 0',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase'
                }}>
                  MEET PIXMINT BOT
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.94rem',
                  color: '#CBD5E1',
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: '560px'
                }}>
                  Your intelligent companion for Draughtsman Studio and the Archi Draft platform — supporting 9-stage drawing coordination, CAD format validation, and digital certificate verification.
                </p>
              </div>
            </div>

            {/* Right: Functional Launch CTA Button */}
            <div>
              <button
                onClick={handleOpenBot()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0.9rem 1.8rem',
                  borderRadius: '8px',
                  background: '#10B981',
                  color: '#020617',
                  border: 'none',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 4px 22px rgba(16, 185, 129, 0.38)',
                  transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 28px rgba(16, 185, 129, 0.55)';
                  e.currentTarget.style.background = '#34D399';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 22px rgba(16, 185, 129, 0.38)';
                  e.currentTarget.style.background = '#10B981';
                }}
              >
                <MessageSquare size={16} />
                <span>Interact with PIXMINT BOT</span>
              </button>
            </div>
          </div>

          {/* Middle Row: 4 Architectural Capability Highlight Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            margin: '1.5rem 0',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Card 1 */}
            <div style={{
              background: 'rgba(5, 10, 20, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '1rem 1.15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
                <Users size={16} />
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Multi-Role Guidance
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.45 }}>
                Tailored perspectives for Engineers, Draughtsmen, Students, and Studio Administrators.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              background: 'rgba(5, 10, 20, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '1rem 1.15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C6A969' }}>
                <Compass size={16} />
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Grounded CAD Rules
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.45 }}>
                Official DWG/DXF/IFC layer standards, 3-round revision limits, and drawing lifecycle checks.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{
              background: 'rgba(5, 10, 20, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '1rem 1.15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8' }}>
                <FileCheck2 size={16} />
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Token Verification
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.45 }}>
                Cryptographic token cross-referencing for authenticated student credentials.
              </p>
            </div>

            {/* Card 4 */}
            <div style={{
              background: 'rgba(5, 10, 20, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '1rem 1.15rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A855F7' }}>
                <Shield size={16} />
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Strict Data Isolation
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.45 }}>
                AES-256 cloud encryption with zero cross-tenant drawing exposure or external data leakage.
              </p>
            </div>
          </div>

          {/* Bottom Row: Predefined One-Click Interactive Starter Questions */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            paddingTop: '0.5rem'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.7rem',
              color: '#C6A969',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <Sparkles size={13} />
              <span>Ask Directly:</span>
            </span>

            {[
              { label: 'What is Archi Draft?', q: 'What is Archi Draft and how does it work with Draughtsman Studio?' },
              { label: 'How to verify certificate?', q: 'How do I verify a student or professional certificate?' },
              { label: 'Where to download app?', q: 'Where can I download Archi Draft for Android or Windows?' },
              { label: 'How many revisions allowed?', q: 'How many correction rounds are included per project milestone?' }
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={handleOpenBot(chip.q)}
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '9999px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.74rem',
                  color: '#E2E8F0',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10B981';
                  e.currentTarget.style.color = '#34D399';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                  e.currentTarget.style.color = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)';
                }}
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ArchiDraftShowcase;
