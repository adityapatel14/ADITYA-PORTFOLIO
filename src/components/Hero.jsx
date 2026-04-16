// Hero section — KPI strip + interactive terminal
import { useState, useEffect } from 'react';
import Terminal from './Terminal';

const CV_URL = 'https://drive.google.com/file/d/1OrcIPihckosaWd-u7rlbgnEaeU1usrzI/view?usp=sharing';

const GLOBAL_KPI = [
  { label: 'Projects Completed',  value: '6+',   icon: '◈' },
  { label: 'Data Points Analyzed',value: '50K+', icon: '▲' },
  { label: 'Domains Explored',    value: '3',    icon: '⬡' },
  { label: 'Avg Model Accuracy',  value: '85%',  icon: '∿' },
  { label: 'Years Experience',    value: '1+',   icon: '⊕' },
];

function AnimatedNumber({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return;
    let start = 0;
    const duration = 1200, step = 16;
    const increment = num / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) { setVal(num); clearInterval(timer); }
      else setVal(Math.floor(start * 10) / 10);
    }, step);
    return () => clearInterval(timer);
  }, [target]);
  const formatted = target.replace(/[\d.]+/, () => {
    if (target.includes('.')) return val.toFixed(1);
    return Math.round(val);
  });
  return <span>{formatted}</span>;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="grid-bg scanlines dot-grid"
      style={{
        minHeight: '100vh',
        paddingTop: 56,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%', width: 400, height: 400,
        background: 'radial-gradient(circle, #00ffaa08 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '15%', width: 300, height: 300,
        background: 'radial-gradient(circle, #4488ff08 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

          {/* ── Left — headline ─────────────────────────────────────────── */}
          <div style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#00ffaa', display: 'inline-block', boxShadow: '0 0 8px #00ffaa',
              }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00ffaa', letterSpacing: '0.15em' }}>
                OPEN TO WORK · Portfolio v1.0
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.05, marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
              <span style={{ color: '#e8e8e8' }}>Aditya</span>{' '}
              <span style={{ color: '#00ffaa', textShadow: '0 0 30px #00ffaa55' }}>Patel</span>
            </h1>

            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: '#888', marginBottom: 24 }}>
              <span style={{ color: '#00ffaa' }}>function</span>{' '}
              <span style={{ color: '#4488ff' }}>transformData</span>
              <span style={{ color: '#888' }}>({'{'} raw {'}'}) {'{'}</span>
              <br />
              <span style={{ paddingLeft: 24, color: '#e8e8e8' }}>return <span style={{ color: '#ffcc00' }}>insights</span> + <span style={{ color: '#ff4466' }}>impact</span>;</span>
              <br />
              <span style={{ color: '#888' }}>{'}'}</span>
            </div>

            <p style={{ color: '#aaa', fontSize: 15, lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>
              Junior data analyst turning messy datasets into{' '}
              <span style={{ color: '#00ffaa' }}>actionable insights</span>. Focused on Python, SQL, Power BI, and statistical analysis.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: '#00ffaa', color: '#080808', border: 'none',
                  padding: '10px 24px', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 0 20px #00ffaa33',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px #00ffaa66'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px #00ffaa33'; e.currentTarget.style.transform = 'none'; }}
              >
                VIEW DASHBOARD ↓
              </button>

              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'transparent', color: '#00ffaa',
                  border: '1px solid #00ffaa44', padding: '10px 24px', borderRadius: 6,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#00ffaa11'; e.currentTarget.style.borderColor = '#00ffaa88'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#00ffaa44'; }}
              >
                DOWNLOAD CV →
              </a>
            </div>
          </div>

          {/* ── Right — interactive terminal ─────────────────────────────── */}
          <Terminal />

        </div>

        {/* ── KPI strip ───────────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 12,
          marginTop: 60,
          animation: 'fadeInUp 0.8s 0.5s ease both',
        }}>
          {GLOBAL_KPI.map((kpi, i) => (
            <div
              key={kpi.label}
              className="dashboard-card"
              style={{ padding: '16px 20px', textAlign: 'center', animationDelay: `${i * 0.08}s` }}
            >
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, color: '#00ffaa', fontWeight: 700, marginBottom: 4 }}>
                {mounted ? <AnimatedNumber target={kpi.value} /> : kpi.value}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', letterSpacing: '0.08em' }}>
                {kpi.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
