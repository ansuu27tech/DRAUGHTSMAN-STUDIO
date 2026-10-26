import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  RotateCcw, 
  Shield, 
  Sparkles, 
  ChevronDown, 
  Copy, 
  Check, 
  UserCheck, 
  Compass, 
  PenTool, 
  GraduationCap, 
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';
import { 
  BOT_ROLES, 
  ROLE_SUGGESTIONS, 
  SUGGESTION_CATEGORIES, 
  queryPixmintBot 
} from './pixmintEngine';
import './PixmintBot.css';

/**
 * PixelMint Mascot Vector Renderer
 * Faithfully depicts the official mascot: white chassis, obsidian visor, emerald eyes, leaf badge.
 */
export const PixmintMascot = ({ size = 36, isAnimated = true }) => {
  return (
    <div
      className={`pixmint-mascot ${isAnimated ? 'is-animated' : ''}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '1.5px solid #10B981',
        boxShadow: '0 0 12px rgba(16, 185, 129, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#040d09',
        flexShrink: 0
      }}
      aria-label="PIXMINT BOT Mascot"
    >
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
  );
};

// Map role IDs to Lucide icons
const ROLE_ICONS = {
  guest: UserCheck,
  engineer: Compass,
  draughtsman: PenTool,
  student: GraduationCap,
  admin: Shield,
};

/**
 * Lightweight Markdown Parser for Bot Messages
 * Handles bolding (**text**), bullet points, numbers, code tags (`code`), and markdown links [text](url/#hash)
 */
const FormattedMessage = ({ text, onLinkClick }) => {
  if (!text) return null;

  // Split lines
  const lines = text.split('\n');

  return (
    <div className="pixmint-formatted-text">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="pixmint-empty-line" />;
        }

        // Bullet point
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ');
        // Numbered list
        const isNumbered = /^\d+\.\s/.test(trimmed);

        const content = isBullet ? trimmed.slice(2) : isNumbered ? trimmed.replace(/^\d+\.\s/, '') : line;

        // Parse inline bold, code, and links
        const parsed = parseInlineMarkdown(content, onLinkClick);

        if (isBullet) {
          return (
            <div key={lineIdx} className="pixmint-bullet-item">
              <span className="pixmint-bullet-dot" />
              <span>{parsed}</span>
            </div>
          );
        }

        if (isNumbered) {
          const match = trimmed.match(/^(\d+)\.\s/);
          return (
            <div key={lineIdx} className="pixmint-numbered-item">
              <span className="pixmint-item-num">{match ? match[1] + '.' : '•'}</span>
              <span>{parsed}</span>
            </div>
          );
        }

        return <p key={lineIdx} className="pixmint-para">{parsed}</p>;
      })}
    </div>
  );
};

function parseInlineMarkdown(text, onLinkClick) {
  // Regex to match markdown links [text](url), bold **text**, and code `code`
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    // Text before token
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // Link [text](url)
      const linkText = match[2];
      const linkUrl = match[3];
      const isInternal = linkUrl.startsWith('#');
      elements.push(
        <a
          key={match.index}
          href={linkUrl}
          className="pixmint-inline-link"
          onClick={(e) => {
            if (isInternal && onLinkClick) {
              e.preventDefault();
              onLinkClick(linkUrl);
            }
          }}
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
        >
          <span>{linkText}</span>
          <ArrowUpRight size={11} className="pixmint-link-arrow" />
        </a>
      );
    } else if (match[4]) {
      // Bold **text**
      elements.push(<strong key={match.index} className="pixmint-bold">{match[4]}</strong>);
    } else if (match[5]) {
      // Inline code `code`
      elements.push(<code key={match.index} className="pixmint-code">{match[5]}</code>);
    }

    lastIndex = match.index + match[0].length;
  }

  // Trailing text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

export default function PixmintBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('guest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      content:
        "Welcome to Draughtsman Studio. I am **PIXMINT BOT**, your intelligent companion for our architectural practice and the **Archi Draft** platform.\n\nSelect any predefined question below or type your inquiry to get instant, grounded guidance.",
      timestamp: new Date(),
      sources: [{ title: 'Draughtsman Studio & Archi Draft', docRef: 'Official Documentation' }],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message and focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  // Keyboard accessibility: Escape to close assistant
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // External trigger listener (e.g. from ArchiDraftShowcase "Interact with PIXMINT BOT")
  useEffect(() => {
    const handleExternalOpen = (e) => {
      setIsOpen(true);
      if (e.detail?.role) {
        setSelectedRole(e.detail.role);
      }
      if (e.detail?.initialQuestion) {
        // Automatically ask question if supplied
        setTimeout(() => {
          handleSend(e.detail.initialQuestion);
        }, 150);
      }
    };
    window.addEventListener('open-pixmint-bot', handleExternalOpen);
    return () => window.removeEventListener('open-pixmint-bot', handleExternalOpen);
  }, []);

  const handleSend = async (textToSend) => {
    const prompt = (textToSend || inputMessage).trim();
    if (!prompt || isLoading) return;

    const userMsg = {
      id: 'user_' + Date.now(),
      sender: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await queryPixmintBot({
        prompt,
        role: selectedRole,
        history: messages,
      });

      const botMsg = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        content: response.answer,
        sources: response.sources,
        isLiveModel: response.isLiveModel,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'bot',
          content: 'I encountered a brief connection issue. Please try again or reach our studio directly at **contact@draughtsmanstudio.com**.',
          isError: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const roleGreeting = {
      guest: "Hello! How can I assist you with Draughtsman Studio and ArchiDraft today?",
      engineer: "Greetings, Engineer! How can I assist with your drawings or project review today?",
      draughtsman: "Hello, Draughtsman! What drafting standards or assignments can I help you with?",
      student: "Welcome! What would you like to explore in your architectural training today?",
      admin: "Hello Admin. What studio operations or project records can I assist you with?",
    }[selectedRole] || "Hello! How can I assist you with Draughtsman Studio and ArchiDraft today?";

    setMessages([
      {
        id: 'welcome_reset',
        sender: 'bot',
        content: roleGreeting,
        timestamp: new Date(),
        sources: [],
      },
    ]);
  };

  const handleCopyMessage = (msgId, text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleInternalLink = (hash) => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    // On small screens, close the bot drawer so user sees target view
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const currentRoleObj = BOT_ROLES.find((r) => r.id === selectedRole) || BOT_ROLES[0];
  const allSuggestions = ROLE_SUGGESTIONS[selectedRole] || ROLE_SUGGESTIONS.guest;

  // Filter suggestions by active category
  const filteredSuggestions = selectedCategory === 'all'
    ? allSuggestions
    : allSuggestions.filter((s) => s.category === selectedCategory);

  const CurrentRoleIcon = ROLE_ICONS[selectedRole] || UserCheck;

  return (
    <div className="pixmint-container" aria-label="PIXMINT AI Assistant System">
      {/* Main Conversational Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="pixmint-dialog"
            className="pixmint-window"
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pixmint-title"
          >
            {/* Ambient Blueprint Grid Background */}
            <div className="pixmint-window-grid-bg" aria-hidden="true" />

            {/* Header */}
            <div className="pixmint-header">
              <div className="pixmint-header-info">
                <PixmintMascot size={36} />
                <div>
                  <div className="pixmint-title-row">
                    <h3 id="pixmint-title" className="pixmint-title">
                      PIXMINT BOT
                    </h3>
                    <span className="pixmint-status-pill">
                      <span className="pixmint-pulse-dot" />
                      <span>ONLINE // GROUNDED</span>
                    </span>
                  </div>
                  <p className="pixmint-subtitle">
                    ArchiDraft & Draughtsman Studio Intelligent Companion
                  </p>
                </div>
              </div>

              <div className="pixmint-header-actions">
                <button
                  type="button"
                  className="pixmint-btn-icon"
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  className="pixmint-btn-icon is-close"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  aria-label="Close assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Perspective / Role Selector Bar */}
            <div className="pixmint-role-bar">
              <div className="pixmint-role-prefix">
                <CurrentRoleIcon size={13} className="pixmint-role-icon" />
                <span className="pixmint-role-label">GUIDANCE ROLE:</span>
              </div>

              <div className="pixmint-role-dropdown-wrap">
                <button
                  type="button"
                  className="pixmint-role-trigger"
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  aria-expanded={isRoleDropdownOpen}
                >
                  <span>{currentRoleObj.label}</span>
                  <ChevronDown size={14} className={isRoleDropdownOpen ? 'is-flipped' : ''} />
                </button>

                {isRoleDropdownOpen && (
                  <div className="pixmint-role-menu">
                    <div className="pixmint-role-disclaimer">
                      Tailors predefined questions and domain responses. Does not bypass backend authentication.
                    </div>
                    {BOT_ROLES.map((role) => {
                      const Icon = ROLE_ICONS[role.id] || UserCheck;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          className={`pixmint-role-item ${role.id === selectedRole ? 'is-active' : ''}`}
                          onClick={() => {
                            setSelectedRole(role.id);
                            setIsRoleDropdownOpen(false);
                            const greeting = {
                              guest: "Hello! How can I assist you with Draughtsman Studio and ArchiDraft today?",
                              engineer: "Greetings, Engineer! How can I assist with your drawings or project review today?",
                              draughtsman: "Hello, Draughtsman! What drafting standards or assignments can I help you with?",
                              student: "Welcome! What would you like to explore in your architectural training today?",
                              admin: "Hello Admin. What studio operations or project records can I assist you with?",
                            }[role.id] || "Hello! How can I assist you today?";

                            setMessages([
                              {
                                id: 'role_' + Date.now(),
                                sender: 'bot',
                                content: greeting,
                                timestamp: new Date(),
                                sources: [],
                              },
                            ]);
                          }}
                        >
                          <div className="pixmint-role-item-main">
                            <Icon size={14} />
                            <span className="pixmint-role-item-name">{role.label}</span>
                          </div>
                          <span className="pixmint-role-item-desc">{role.description}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="pixmint-messages">
              {/* Starter Hero Card when only welcome message exists */}
              {messages.length === 1 && (
                <div className="pixmint-welcome-card">
                  <div className="pixmint-welcome-header">
                    <Sparkles size={16} className="pixmint-sparkle-gold" />
                    <span>FREQUENTLY ASKED QUESTIONS</span>
                  </div>
                  <p className="pixmint-welcome-text">
                    Select any question below or type your inquiry to get instant guidance:
                  </p>

                  {/* Category Pills */}
                  <div className="pixmint-cat-filters">
                    {SUGGESTION_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        className={`pixmint-cat-btn ${selectedCategory === cat.id ? 'is-active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* 8-10 Predefined Suggestion Cards Grid */}
                  <div className="pixmint-predefined-grid">
                    {filteredSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="pixmint-predefined-card"
                        onClick={() => handleSend(item.text)}
                        disabled={isLoading}
                      >
                        <span className="pixmint-q-number">{idx + 1}.</span>
                        <span className="pixmint-q-text">{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Rows */}
              {messages.map((msg) => (
                <div key={msg.id} className={`pixmint-message-row is-${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="pixmint-avatar-col">
                      <PixmintMascot size={28} isAnimated={false} />
                    </div>
                  )}

                  <div className="pixmint-bubble">
                    <div className="pixmint-bubble-content">
                      <FormattedMessage text={msg.content} onLinkClick={handleInternalLink} />
                    </div>

                    {/* Sources Card */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="pixmint-sources-box">
                        <div className="pixmint-sources-title">
                          <Shield size={11} />
                          <span>GROUNDED SPECIFICATION SOURCE</span>
                        </div>
                        {msg.sources.map((src, i) => (
                          <div key={i} className="pixmint-source-item">
                            <span className="pixmint-source-name">{src.title}</span>
                            {src.docRef && <span className="pixmint-source-ref">({src.docRef})</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom Metadata Bar */}
                    <div className="pixmint-bubble-footer">
                      <span className="pixmint-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>

                      {msg.sender === 'bot' && (
                        <button
                          type="button"
                          className="pixmint-copy-btn"
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          title="Copy response to clipboard"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check size={11} className="pixmint-copy-check" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="pixmint-message-row is-bot">
                  <div className="pixmint-avatar-col">
                    <PixmintMascot size={28} />
                  </div>
                  <div className="pixmint-bubble is-loading">
                    <span className="pixmint-dot" />
                    <span className="pixmint-dot" />
                    <span className="pixmint-dot" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Horizontal Suggestion Rail (Always available above input) */}
            <div className="pixmint-suggestions">
              <div className="pixmint-suggestions-scroll">
                {allSuggestions.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className="pixmint-chip"
                    onClick={() => handleSend(item.text)}
                    disabled={isLoading}
                    title={item.text}
                  >
                    <Sparkles size={11} className="pixmint-chip-icon" />
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              className="pixmint-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="pixmint-input"
                placeholder={`Ask PIXMINT BOT as ${currentRoleObj.label}…`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                maxLength={600}
                disabled={isLoading}
                aria-label="Message input"
              />
              <button
                type="submit"
                className="pixmint-send-btn"
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>

            {/* Guardrails Footer Notice */}
            <div className="pixmint-footer-notice">
              <span>Grounded in official Archi Draft & Draughtsman Studio documentation.</span>
              <span className="pixmint-notice-divider">•</span>
              <a href="#verify" onClick={() => handleInternalLink('#verify')}>Verify Credentials</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button (Circular, Icon-Only) */}
      <div className="pixmint-fab-wrapper">
        <motion.button
          type="button"
          className={`pixmint-fab ${isOpen ? 'is-open' : ''} ${isLoading ? 'is-loading' : ''} ${hasUnread && !isOpen ? 'has-unread' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="pixmint-dialog"
          aria-label={isOpen ? 'Close PIXMINT assistant' : 'Open PIXMINT assistant'}
          aria-describedby={!isOpen ? 'pixmint-tooltip' : undefined}
        >
          {/* Subtle Ambient Breathing Glow */}
          <div className="pixmint-fab-ambient-glow" aria-hidden="true" />

          {/* Orbital Spinner when Processing/Loading */}
          {isLoading && <div className="pixmint-fab-orbit" aria-hidden="true" />}

          {/* Icon Presentation: Crossfade between Mascot and Close icon */}
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close-icon"
                className="pixmint-fab-icon-wrap"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <X size={22} className="pixmint-fab-x" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="mascot-icon"
                className="pixmint-fab-icon-wrap"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <PixmintMascot size={38} isAnimated={!isLoading} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Small Status Indicator Pip */}
          {!isOpen && (
            <span
              className={`pixmint-fab-indicator ${hasUnread ? 'is-unread' : ''}`}
              aria-hidden="true"
            />
          )}

          {/* Tooltip on Hover/Focus */}
          <span id="pixmint-tooltip" className="pixmint-fab-tooltip" role="tooltip">
            {isOpen ? 'Close assistant' : hasUnread ? 'New response available' : 'Ask PIXMINT BOT'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
