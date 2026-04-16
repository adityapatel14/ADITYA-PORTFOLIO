// ── BottomSection.jsx ─────────────────────────────────────────────────────
// Two-column terminal layout: Skills (left) + About & Contact (right)
import { useState, useEffect, useRef } from 'react';

// ── Skills data ────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: 'SQL',        pct: 92, level: 'ADVANCED'   },
  { name: 'Python',     pct: 80, level: 'PROFICIENT'  },
  { name: 'Power BI',   pct: 85, level: 'ADVANCED'   },
  { name: 'Pandas',     pct: 78, level: 'PROFICIENT'  },
  { name: 'Excel',      pct: 88, level: 'ADVANCED'   },
  { name: 'Statistics', pct: 75, level: 'PROFICIENT'  },
];

const CONTACT_ROWS = [
  {
    label: 'Email',
    value: 'akp2k4@email.com',
    href:  'mailto:akp2k4@email.com',
    icon:  '⊕',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/aditya-kaushik-patel',
    href:  'https://www.linkedin.com/in/aditya-kaushik-patel/',
    icon:  '◈',
  },
  {
    label: 'GitHub',
    value: 'github.com/adityapatel14',
    href:  'https://github.com/adityapatel14/',
    icon:  '⌥',
  },
];

// ── Animated skill bar ─────────────────────────────────────────────────────────
function SkillRow({ name, pct, level, index, animate }) {
  const isAdvanced = level === 'ADVANCED';
  const barColor   = isAdvanced ? '#00ffaa' : '#4488ff';

  return (
    <div
      style={{
        padding: '10px 0',
        borderBottom: '1px solid #111',
        opacity: animate ? 1 : 0,
        transform: animate ? 'none' : 'translateX(-12px)',
        transition: `opacity 0.4s ${index * 0.08}s ease, transform 0.4s ${index * 0.08}s ease`,
      }}
    >
      {/* Name row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* terminal prompt */}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00ffaa' }}>$</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#e8e8e8' }}>
            {name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* percentage */}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: barColor, fontWeight: 700 }}>
            {pct}%
          </span>
          {/* level badge */}
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9,
            letterSpacing: '0.1em',
            padding: '2px 7px',
            borderRadius: 3,
            border: `1px solid ${barColor}44`,
            background: `${barColor}12`,
            color: barColor,
          }}>
            {level}
          </span>
        </div>
      </div>

      {/* Thin progress bar */}
      <div style={{ background: '#111', borderRadius: 2, height: 3, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: animate ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${barColor}66, ${barColor})`,
            borderRadius: 2,
            boxShadow: `0 0 6px ${barColor}44`,
            transition: `width 0.9s ${index * 0.1 + 0.2}s cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function BottomSection() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  // Trigger bar animation when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Main two-column section ──────────────────────────────────── */}
      <section
        id="skills"
        ref={ref}
        style={{
          padding: '80px 0 0',
          position: 'relative',
          background: '#0a0a0a',
        }}
      >
        <div style={{ borderTop: '1px solid #1a1a1a' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 0' }}>
          {/* Section heading row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 48 }}>
            <span className="section-eyebrow">// CORE STACK &amp; CONTACT</span>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#e8e8e8' }}>
              Skills &amp; Contact
            </h2>
          </div>

          {/* Two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, paddingBottom: 64 }}>

            {/* ── LEFT — Terminal skill list ─────────────────────────── */}
            <div>
              {/* Terminal chrome */}
              <div style={{
                background: '#111',
                padding: '10px 16px',
                borderRadius: '8px 8px 0 0',
                borderBottom: '1px solid #1e1e1e',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff4466' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffcc00' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#00ffaa' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#444', marginLeft: 8 }}>
                  skills.sh — proficiency map
                </span>
              </div>

              {/* Terminal body */}
              <div style={{
                background: '#080808',
                border: '1px solid #1a1a1a',
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                padding: '6px 20px 10px',
              }}>
                {/* Header comment */}
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  color: '#333',
                  padding: '10px 0 2px',
                  letterSpacing: '0.04em',
                }}>
                  # core_stack — sorted by proficiency
                </div>

                {SKILLS.map((s, i) => (
                  <SkillRow key={s.name} {...s} index={i} animate={animate} />
                ))}

                {/* Blinking cursor at the end */}
                <div style={{ paddingTop: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#00ffaa' }}>
                  <span style={{ color: '#00ffaa' }}>$ </span>
                  <span className="cursor-blink" />
                </div>
              </div>
            </div>

            {/* ── RIGHT — About + Contact ────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

              {/* Bio card */}
              <div style={{
                background: '#080808',
                border: '1px solid #1a1a1a',
                borderRadius: 8,
                padding: '24px 24px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Top glow line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, #00ffaa33, transparent)',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00ffaa22, #00ffaa44)',
                    border: '1px solid #00ffaa33',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#00ffaa',
                    flexShrink: 0,
                  }}>
                    AP
                  </span>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#e8e8e8' }}>
                      Aditya Patel
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555' }}>
                      Mumbai · Data Analyst
                    </div>
                  </div>
                </div>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  color: '#888',
                  lineHeight: 1.75,
                  borderLeft: '2px solid #00ffaa33',
                  paddingLeft: 14,
                  margin: 0,
                }}>
                  21-year-old data analyst from Mumbai. I care about one thing:{' '}
                  <span style={{ color: '#00ffaa' }}>making sure the analysis actually changes a decision.</span>
                </p>
              </div>

              {/* Contact table */}
              <div style={{
                background: '#080808',
                border: '1px solid #1a1a1a',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
                {/* Header */}
                <div style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid #111',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  color: '#444',
                  letterSpacing: '0.12em',
                  background: '#0a0a0a',
                }}>
                  CONTACT LINKS
                </div>

                {CONTACT_ROWS.map((row, i) => (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr 20px',
                        alignItems: 'center',
                        padding: '13px 20px',
                        borderBottom: i < CONTACT_ROWS.length - 1 ? '1px solid #0f0f0f' : 'none',
                        transition: 'background 0.15s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#00ffaa08'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      {/* Label */}
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 10,
                        color: '#444',
                        letterSpacing: '0.08em',
                      }}>
                        {row.icon}{'  '}{row.label}
                      </span>

                      {/* Value */}
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        color: '#00ffaa',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {row.value}
                      </span>

                      {/* Arrow */}
                      <span style={{ color: '#333', fontSize: 11, textAlign: 'right' }}>↗</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Status row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                background: '#00ffaa08',
                border: '1px solid #00ffaa22',
                borderRadius: 6,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#00ffaa', boxShadow: '0 0 8px #00ffaa',
                  animation: 'pulse-glow 1.8s ease-in-out infinite',
                  flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00ffaa' }}>
                  STATUS: OPEN TO WORK
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#444', marginLeft: 4 }}>
                  · Remote / Hybrid · Mumbai
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid #111',
          background: '#080808',
        }}>
          <div style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
          }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#2e2e2e' }}>
              © 2025 Aditya Patel — Built with data in mind
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#2e2e2e', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#00ffaa', fontSize: 8 }}>●</span> Systems nominal · v2.4.1
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
