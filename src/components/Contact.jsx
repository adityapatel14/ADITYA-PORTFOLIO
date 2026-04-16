// Contact section — terminal-style form + availability status
import { useState } from 'react';

const SOCIAL_LINKS = [
  { label: 'GitHub', handle: 'github.com/aditya-patel', icon: '⌥', href: 'https://github.com' },
  { label: 'LinkedIn', handle: 'linkedin.com/in/aditya-patel', icon: '◈', href: 'https://linkedin.com' },
  { label: 'Kaggle', handle: 'kaggle.com/adityapatel', icon: '▲', href: 'https://kaggle.com' },
  { label: 'Email', handle: 'aditya@datacraft.io', icon: '⊕', href: 'mailto:aditya@datacraft.io' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = (field) => ({
    background: focused === field ? '#0f0f0f' : '#0a0a0a',
    border: `1px solid ${focused === field ? '#00ffaa44' : '#1e1e1e'}`,
    borderRadius: 6,
    padding: '10px 14px',
    color: '#e8e8e8',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 12,
    width: '100%',
    outline: 'none',
    transition: 'all 0.2s',
    boxShadow: focused === field ? '0 0 12px #00ffaa11' : 'none',
  });

  return (
    <section id="contact" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="section-divider" />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', marginTop: 60 }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00ffaa', letterSpacing: '0.15em' }}>
              04 /
            </span>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#e8e8e8' }}>
              Contact
            </h2>
          </div>
          <p style={{ color: '#555', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>
            &gt; Available for full-time roles, freelance contracts, and speaking engagements.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Left — links + status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Availability card */}
            <div className="dashboard-card animate-pulse-glow" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ffaa', boxShadow: '0 0 10px #00ffaa', animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#00ffaa', fontWeight: 700 }}>
                    STATUS: OPEN TO WORK
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginTop: 2 }}>
                    Available from May 2025 · Remote / Hybrid preferred
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="dashboard-card"
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#00ffaa44';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#1e1e1e';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <span style={{ color: '#00ffaa', fontSize: 16, width: 20, textAlign: 'center' }}>
                      {link.icon}
                    </span>
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888', marginBottom: 1 }}>
                        {link.label}
                      </div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00ffaa' }}>
                        {link.handle}
                      </div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: '#444', fontSize: 12 }}>↗</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick stats */}
            <div className="dashboard-card" style={{ padding: '16px 20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 12, letterSpacing: '0.1em' }}>
                RESPONSE METRICS
              </div>
              {[
                { label: 'Avg. Response Time', value: '< 4 hours' },
                { label: 'Interview → Offer Rate', value: '68%' },
                { label: 'Preferred Location', value: 'Remote / Hybrid' },
                { label: 'Notice Period', value: '30 days' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '6px 0',
                  borderBottom: i < 3 ? '1px solid #111' : 'none',
                }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#555' }}>{item.label}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00ffaa' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div className="dashboard-card" style={{ padding: 24 }}>
            {!sent ? (
              <>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 20, letterSpacing: '0.1em' }}>
                  SEND A MESSAGE
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', display: 'block', marginBottom: 6 }}>
                      NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Recruiter"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', display: 'block', marginBottom: 6 }}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      style={inputStyle('email')}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', display: 'block', marginBottom: 6 }}>
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Hi Aditya, we have an opening for..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      style={{ ...inputStyle('message'), resize: 'none' }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      background: '#00ffaa',
                      color: '#080808',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: 6,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 0 20px #00ffaa33',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
                  >
                    TRANSMIT MESSAGE →
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: '#00ffaa', marginBottom: 8, fontWeight: 700 }}>
                  MESSAGE RECEIVED
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#555' }}>
                  Aditya will respond within 4 hours.
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  style={{
                    marginTop: 20, background: 'transparent', border: '1px solid #00ffaa44',
                    color: '#00ffaa', fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                    padding: '6px 16px', borderRadius: 4, cursor: 'pointer',
                  }}
                >
                  SEND ANOTHER
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 60, paddingTop: 24, borderTop: '1px solid #111',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#333' }}>
            © 2025 Aditya Patel · Built with React + Recharts
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#333' }}>
            v2.4.1 · <span style={{ color: '#00ffaa' }}>●</span> Systems nominal
          </span>
        </div>
      </div>
    </section>
  );
}
