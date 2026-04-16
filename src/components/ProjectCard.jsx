// ProjectCard — individual project mini-dashboard with filters
import { useState } from 'react';
import { RevenueCharts, HealthCharts, SupplyCharts, SentimentCharts } from './Charts';

const FILTER_MAP = {
  ecom: [
    { id: 'full', label: 'Full Year' },
    { id: 'h1', label: 'H1' },
    { id: 'h2', label: 'H2' },
  ],
  health: [
    { id: 'retention', label: 'Retention' },
    { id: 'dropout', label: 'Dropout' },
    { id: 'features', label: 'Features' },
  ],
  supply: [
    { id: 'forecast', label: 'Forecast' },
    { id: 'risk', label: 'Risk Matrix' },
  ],
  social: [
    { id: 'stream', label: 'Live Stream' },
    { id: 'brands', label: 'Brands' },
  ],
};

const TAG_COLORS = {
  Python: { bg: '#4488ff15', border: '#4488ff44', text: '#4488ff' },
  SQL: { bg: '#ffcc0015', border: '#ffcc0044', text: '#ffcc00' },
  R: { bg: '#aa44ff15', border: '#aa44ff44', text: '#aa44ff' },
  Scala: { bg: '#ff446615', border: '#ff446644', text: '#ff4466' },
  Tableau: { bg: '#00ffaa15', border: '#00ffaa44', text: '#00ffaa' },
  'Power BI': { bg: '#ffcc0015', border: '#ffcc0044', text: '#ffcc00' },
  Plotly: { bg: '#4488ff15', border: '#4488ff44', text: '#4488ff' },
  PostgreSQL: { bg: '#aa44ff15', border: '#aa44ff44', text: '#aa44ff' },
  Pandas: { bg: '#00ffaa15', border: '#00ffaa44', text: '#00ffaa' },
  DAX: { bg: '#ffcc0015', border: '#ffcc0044', text: '#ffcc00' },
  Azure: { bg: '#4488ff15', border: '#4488ff44', text: '#4488ff' },
  NLP: { bg: '#ff446615', border: '#ff446644', text: '#ff4466' },
  Kafka: { bg: '#00ffaa15', border: '#00ffaa44', text: '#00ffaa' },
  Elasticsearch: { bg: '#ffcc0015', border: '#ffcc0044', text: '#ffcc00' },
  default: { bg: '#ffffff10', border: '#ffffff22', text: '#888' },
};

function chartForProject(id, filter) {
  switch (id) {
    case 'ecom':    return <RevenueCharts filter={filter} />;
    case 'health':  return <HealthCharts filter={filter} />;
    case 'supply':  return <SupplyCharts filter={filter} />;
    case 'social':  return <SentimentCharts filter={filter} />;
    default:        return null;
  }
}

export default function ProjectCard({ project, index }) {
  const filters = FILTER_MAP[project.id] || [];
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id);

  const tagColor = (tag) => TAG_COLORS[tag] || TAG_COLORS.default;

  return (
    <div
      className="dashboard-card animate-fade-up"
      style={{
        padding: 20,
        animationDelay: `${index * 0.1}s`,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#00ffaa',
              boxShadow: '0 0 6px #00ffaa', flexShrink: 0,
            }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#555', letterSpacing: '0.12em' }}>
              {project.subtitle.toUpperCase()}
            </span>
          </div>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#e8e8e8', lineHeight: 1.3 }}>
            {project.title}
          </h3>
        </div>
        {/* Index badge */}
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#333',
          background: '#111', border: '1px solid #1e1e1e', padding: '2px 8px', borderRadius: 4,
        }}>
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ── KPI strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {project.kpis.map((kpi, i) => (
          <div key={i} style={{
            background: '#111', border: '1px solid #1e1e1e', borderRadius: 6,
            padding: '8px 10px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 14,
              fontWeight: 700,
              color: kpi.positive === true ? '#00ffaa' : kpi.positive === false ? '#ff4466' : '#e8e8e8',
              marginBottom: 2,
            }}>
              {kpi.value}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#555', letterSpacing: '0.08em' }}>
              {kpi.label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ── */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em', marginRight: 4 }}>
          VIEW:
        </span>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              padding: '3px 10px',
              borderRadius: 4,
              cursor: 'pointer',
              transition: 'all 0.15s',
              border: `1px solid ${activeFilter === f.id ? '#00ffaa66' : '#1e1e1e'}`,
              background: activeFilter === f.id ? '#00ffaa15' : 'transparent',
              color: activeFilter === f.id ? '#00ffaa' : '#555',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Chart area ── */}
      <div className="chart-area" style={{ background: '#080808', borderRadius: 6, border: '1px solid #111', padding: '12px 4px 4px 4px' }}>
        {chartForProject(project.id, activeFilter)}
      </div>

      {/* ── Description + Tags ── */}
      <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>
        {project.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tags.map(tag => {
          const c = tagColor(tag);
          return (
            <span key={tag} className="tag" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
