// Projects section — 3 featured BI dashboard cards only
import ChurnCard from './ChurnCard';
import SupermartCard from './SupermartCard';
import InternshipCard from './InternshipCard';

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="section-divider" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div style={{ marginBottom: 48, marginTop: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span className="section-eyebrow">// SELECTED WORK</span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#333',
              background: '#0f0f0f', border: '1px solid #1a1a1a',
              padding: '2px 8px', borderRadius: 4,
            }}>
              3 projects
            </span>
          </div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            color: '#e8e8e8',
            marginBottom: 8,
          }}>
            Project Dashboard
          </h2>
          <p style={{ color: '#555', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', maxWidth: 500 }}>
            &gt; Each project rendered as a live BI dashboard — filter, explore, interact.
          </p>
        </div>

        {/* ── Customer Churn Analysis ── */}
        <div style={{ marginBottom: 20 }}>
          <ChurnCard />
        </div>

        {/* ── Supermarket Sales Analysis ── */}
        <div style={{ marginBottom: 20 }}>
          <SupermartCard />
        </div>

        {/* ── Student Internship Research ── */}
        <div style={{ marginBottom: 20 }}>
          <InternshipCard />
        </div>

      </div>
    </section>
  );
}
