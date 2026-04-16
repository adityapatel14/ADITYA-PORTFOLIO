// Navbar component
import { useState, useEffect } from 'react';

const CV_URL       = 'https://drive.google.com/file/d/1o-znboQuIjtPvOgKPgs5D4RxrzuO4738/view';
const LINKEDIN_URL = 'https://www.linkedin.com/in/aditya-kaushik-patel/';
const GITHUB_URL   = 'https://github.com/adityapatel14/';

const NAV_ITEMS = [
  { id: 'hero',     label: '~/home'     },
  { id: 'projects', label: '~/projects' },
  { id: 'skills',   label: '~/skills'   },
];

// ── Hire modal ────────────────────────────────────────────────────────────────
function HireModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const links = [
    {
      href:  CV_URL,
      icon:  '📄',
      label: 'View Resume',
      sub:   'Opens in Google Drive',
      color: '#00ffaa',
    },
    {
      href:  LINKEDIN_URL,
      icon:  '◈',
      label: 'Connect on LinkedIn',
      sub:   'linkedin.com/in/aditya-kaushik-patel',
      color: '#4488ff',
    },
    {
      href:  GITHUB_URL,
      icon:  '⌥',
      label: 'View GitHub',
      sub:   'github.com/adityapatel14',
      color: '#aa44ff',
    },
  ];

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'fadeIn 0.15s ease',
      }}
    >
      {/* Card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d0d0d',
          border: '1px solid #00ffaa33',
          borderRadius: 12,
          padding: '32px 36px',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 0 60px #00ffaa11, 0 24px 48px rgba(0,0,0,0.6)',
          animation: 'slideUp 0.2s ease',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'transparent', border: '1px solid #1e1e1e',
            color: '#555', borderRadius: 4, padding: '2px 8px',
            cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12, transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#555'; }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
            color: '#00ffaa', letterSpacing: '0.2em', marginBottom: 10,
          }}>
            // GET IN TOUCH
          </div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontSize: 22,
            fontWeight: 700, color: '#e8e8e8', marginBottom: 6,
          }}>
            Let's work together
          </h2>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: '#555', lineHeight: 1.6,
          }}>
            Open to full-time &amp; contract roles · Remote / Hybrid · Mumbai
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.map(({ href, icon, label, sub, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: '#111', border: `1px solid ${color}22`,
                borderRadius: 8, padding: '14px 18px',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${color}0d`;
                e.currentTarget.style.borderColor = `${color}55`;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#111';
                e.currentTarget.style.borderColor = `${color}22`;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  fontWeight: 600, color: '#e8e8e8',
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
                  color: '#555', marginTop: 2,
                }}>
                  {sub}
                </div>
              </div>
              <span style={{
                marginLeft: 'auto', color: color,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              }}>
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: 20, paddingTop: 16,
          borderTop: '1px solid #1a1a1a',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, color: '#333', textAlign: 'center',
        }}>
          Press Esc to close
        </div>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [active,    setActive]    = useState('hero');
  const [scrolled,  setScrolled]  = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'rgba(8,8,8,0.7)',
        borderBottom: '1px solid #1e1e1e',
        backdropFilter: 'blur(16px)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#00ffaa', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700 }}>
              AP
            </span>
            <span style={{ color: '#1e1e1e', fontSize: 18, lineHeight: 1 }}>│</span>
            <span style={{ color: '#888', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
              data_analyst.exe
            </span>
            <span className="cursor-blink" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }} />
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: active === item.id ? '#00ffaa11' : 'transparent',
                  border: `1px solid ${active === item.id ? '#00ffaa44' : 'transparent'}`,
                  color: active === item.id ? '#00ffaa' : '#888',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11, padding: '5px 12px',
                  borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.color = '#ccc'; }}
                onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.color = '#888'; }}
              >
                {item.label}
              </button>
            ))}

            {/* Download CV — ghost button */}
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent', color: '#00ffaa',
                border: '1px solid #00ffaa44',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11, fontWeight: 700,
                padding: '5px 14px', borderRadius: 4,
                marginLeft: 8, textDecoration: 'none', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#00ffaa11'; e.currentTarget.style.borderColor = '#00ffaa88'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#00ffaa44'; }}
            >
              Download CV ↗
            </a>

            {/* Hire Me — opens modal */}
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: '#00ffaa', color: '#080808',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11, fontWeight: 700,
                padding: '5px 14px', borderRadius: 4,
                marginLeft: 8, border: 'none',
                cursor: 'pointer', transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              HIRE ME →
            </button>
          </div>
        </div>
      </nav>

      {/* Hire modal */}
      {showModal && <HireModal onClose={() => setShowModal(false)} />}
    </>
  );
}
