// ── InternshipCard.jsx ────────────────────────────────────────────────────
// Student Internship Research — 2,004 records, 7 academic years (CS dept.)
import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  BarChart, Bar, Cell, LabelList,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';

// ── Data ──────────────────────────────────────────────────────────────────────
const YEAR_DATA = [
  { year: '18-19', count: 182, external:  64, inhouse: 118, paidPct:  4.4 },
  { year: '19-20', count: 263, external: 110, inhouse: 153, paidPct:  9.9 },
  { year: '20-21', count: 466, external: 233, inhouse: 233, paidPct: 15.9 },
  { year: '21-22', count: 389, external: 214, inhouse: 175, paidPct: 23.9 },
  { year: '22-23', count: 327, external: 190, inhouse: 137, paidPct: 22.9 },
  { year: '23-24', count: 279, external: 170, inhouse: 109, paidPct: 17.2 },
  { year: '24-25', count:  98, external:  61, inhouse:  37, paidPct: 10.2 },
];

const PEAK_YEAR = '20-21';

// Filter-derived counts for solo bar chart (Chart 1)
// "External Only" → count = external, "In-house Only" → count = inhouse
const getCountData = (filter) =>
  YEAR_DATA.map((d) => ({
    year: d.year,
    count:
      filter === 'external' ? d.external :
      filter === 'inhouse'  ? d.inhouse  :
      d.count,
  }));

// ── Shared styles ──────────────────────────────────────────────────────────────
const tooltipStyle = {
  background: '#0d0d0d',
  border: '1px solid #aa44ff33',
  borderRadius: 6,
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 11,
  color: '#e8e8e8',
  padding: '8px 12px',
};
const labelStyle = { color: '#aa44ff', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 };
const axisStyle  = { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#555' };
const gridStyle  = { stroke: '#1a1a1a', strokeDasharray: '3 3' };

const SmallDot = (props) => {
  const { cx, cy, stroke } = props;
  return <circle cx={cx} cy={cy} r={3} fill={stroke} stroke="none" />;
};

// ── Filter config ──────────────────────────────────────────────────────────────
const FILTERS = [
  { id: 'all',      label: 'All Years' },
  { id: 'external', label: 'External Only' },
  { id: 'inhouse',  label: 'In-house Only' },
];

// ── Metric strip data (static) ────────────────────────────────────────────────
const METRICS = [
  { label: 'TOTAL RECORDS',    value: '2,004',   color: '#e8e8e8' },
  { label: 'PAID INTERNSHIPS', value: '16.7%',   color: '#00ffaa' },
  { label: 'PEAK YEAR',        value: '2020-21', color: '#aa44ff' },
  { label: 'AVG STIPEND',      value: '₹17,702', color: '#4488ff' },
];

// ── Main component ─────────────────────────────────────────────────────────────
export default function InternshipCard() {
  const [filter, setFilter] = useState('all');
  const [chartRef, chartVisible] = useInView(0.15);

  const countData   = getCountData(filter);
  const extOpacity  = filter === 'inhouse'  ? 0.18 : 0.9;
  const inhOpacity  = filter === 'external' ? 0.18 : 0.6;

  return (
    <div
      className="dashboard-card"
      style={{
        gridColumn: '1 / -1',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#aa44ff', boxShadow: '0 0 6px #aa44ff', flexShrink: 0,
            }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#555', letterSpacing: '0.12em' }}>
              CS DEPARTMENT DATASET · 2,004 RECORDS · 2018–2025
            </span>
          </div>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 700, color: '#e8e8e8' }}>
            Student Internship Research
          </h3>
        </div>

        {/* GitHub button */}
        <a
          href="https://github.com/adityapatel14/students_internship_research"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'transparent', border: '1px solid #333',
            color: '#888', borderRadius: 6, padding: '6px 14px',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            textDecoration: 'none', transition: 'all 0.2s', flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#aa44ff55'; e.currentTarget.style.color = '#aa44ff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#333';      e.currentTarget.style.color = '#888'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34C7.15 16.19 4.76 15.31 4.76 11.37c0-1.16.42-2.11 1.1-2.85-.11-.27-.48-1.35.1-2.82 0 0 .9-.29 2.94 1.1A10.2 10.2 0 0 1 12 6.84a10.2 10.2 0 0 1 2.68.36c2.04-1.39 2.93-1.1 2.93-1.1.59 1.47.22 2.55.11 2.82.69.74 1.1 1.69 1.1 2.85 0 3.95-2.4 4.82-4.69 5.07.37.32.7.94.7 1.9l-.01 2.8c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>
          </svg>
          View on GitHub ↗
        </a>
      </div>

      {/* ── Metric strip ───────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{
            background: '#0a0a0a', border: '1px solid #1a1a1a',
            borderRadius: 6, padding: '12px 14px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 18, fontWeight: 700,
              color: m.color, marginBottom: 4,
            }}>
              {m.value}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.08em' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em' }}>
          SEGMENT:
        </span>
        {FILTERS.map(f => {
          const active = filter === f.id;
          const accent =
            f.id === 'external' ? '#00ffaa' :
            f.id === 'inhouse'  ? '#4488ff' : '#aa44ff';
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                padding: '5px 14px', borderRadius: 4, cursor: 'pointer',
                transition: 'all 0.15s',
                border:     `1px solid ${active ? accent + '88' : '#1e1e1e'}`,
                background: active ? accent + '18' : 'transparent',
                color:      active ? accent : '#555',
                fontWeight: active ? 700 : 400,
              }}
            >
              {f.id === 'external' ? '◈ ' : f.id === 'inhouse' ? '⬡ ' : '∷ '}{f.label}
            </button>
          );
        })}
        {/* live dot */}
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%',
            background: '#aa44ff', boxShadow: '0 0 6px #aa44ff', display: 'inline-block',
          }} />
          INTERACTIVE
        </span>
      </div>

      {/* ── Charts row ──────────────────────────────────────────────────── */}
      <div ref={chartRef} className="chart-area" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 16 }}>

        {/* 1 — Internship count by year */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 8px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            {filter === 'external' ? 'EXTERNAL' : filter === 'inhouse' ? 'IN-HOUSE' : 'TOTAL'}{' '}INTERNSHIPS BY YEAR
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={countData} margin={{ top: 20, right: 10, left: -10, bottom: 4 }}>
              <CartesianGrid {...gridStyle} vertical={false} />
              <XAxis dataKey="year" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 'auto']} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                formatter={v => [v.toLocaleString(), 'Internships']}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={38} isAnimationActive={chartVisible} animationDuration={500}>
                {countData.map((d) => (
                  <Cell
                    key={d.year}
                    fill={d.year === PEAK_YEAR ? '#00ffaa' : '#aa44ff'}
                    opacity={d.year === PEAK_YEAR ? 0.95 : 0.55}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  position="top"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fill: '#666' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* peak label */}
          <div style={{ textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#00ffaa', marginTop: 2 }}>
            ▲ PEAK: 2020-21 (466)
          </div>
        </div>

        {/* 2 — % Paid internships trend */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 8px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            % PAID INTERNSHIPS TREND
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={YEAR_DATA} margin={{ top: 16, right: 16, left: -8, bottom: 4 }}>
              <defs>
                <linearGradient id="paidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#aa44ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#aa44ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="year" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis
                tick={axisStyle} axisLine={false} tickLine={false}
                tickFormatter={v => `${v}%`} domain={[0, 28]}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                formatter={v => [`${v}%`, 'Paid Pct']}
              />
              {/* Reference annotation at peak */}
              <Line
                type="monotone" dataKey="paidPct"
                stroke="#aa44ff" strokeWidth={2.5}
                dot={(p) => {
                  const isPeak = p.payload.paidPct === 23.9;
                  return (
                    <circle
                      key={p.index}
                      cx={p.cx} cy={p.cy} r={isPeak ? 6 : 3}
                      fill={isPeak ? '#aa44ff' : '#aa44ff'}
                      stroke={isPeak ? '#e8e8e8' : 'none'}
                      strokeWidth={isPeak ? 1.5 : 0}
                    />
                  );
                }}
                activeDot={{ r: 5, fill: '#aa44ff' }}
                isAnimationActive={chartVisible} animationDuration={600}
              />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#aa44ff', marginTop: 2 }}>
            ● PEAK 23.9% in 2021-22
          </div>
        </div>

        {/* 3 — Grouped bar: External vs In-house */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 8px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            EXTERNAL vs IN-HOUSE BY YEAR
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={YEAR_DATA} margin={{ top: 8, right: 10, left: -10, bottom: 4 }} barGap={2} barCategoryGap="25%">
              <CartesianGrid {...gridStyle} vertical={false} />
              <XAxis dataKey="year" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                formatter={(v, name) => [v, name === 'external' ? 'External' : 'In-house']}
              />
              <Legend
                wrapperStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#666' }}
                formatter={name => name === 'external' ? 'External' : 'In-house'}
              />
              <Bar dataKey="external" name="external" fill="#00ffaa" opacity={extOpacity}
                radius={[3, 3, 0, 0]} maxBarSize={18} isAnimationActive={chartVisible} animationDuration={500} />
              <Bar dataKey="inhouse"  name="inhouse"  fill="#4488ff" opacity={inhOpacity}
                radius={[3, 3, 0, 0]} maxBarSize={18} isAnimationActive={chartVisible} animationDuration={600} />
            </BarChart>
          </ResponsiveContainer>
          {/* breakdown callout */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 20, marginTop: 2,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
          }}>
            <span style={{ color: '#00ffaa' }}>◈ External 62%</span>
            <span style={{ color: '#4488ff' }}>◈ In-house 38%</span>
          </div>
        </div>
      </div>

      {/* ── Insight box ─────────────────────────────────────────────────── */}
      <div style={{
        background: '#0a0a0a',
        border: '1px solid #aa44ff33',
        borderLeft: '3px solid #aa44ff',
        borderRadius: 6,
        padding: '12px 16px',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        <span style={{ color: '#aa44ff', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, flexShrink: 0, marginTop: 1 }}>
          ◈ INSIGHT
        </span>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888', lineHeight: 1.7, margin: 0 }}>
          Paid internship rates rose{' '}
          <span style={{ color: '#aa44ff', fontWeight: 700 }}>5×</span>{' '}
          between 2018-19 and 2021-22, peaking at{' '}
          <span style={{ color: '#aa44ff', fontWeight: 700 }}>23.9%</span>.{' '}
          External internships now account for{' '}
          <span style={{ color: '#00ffaa', fontWeight: 700 }}>62%</span>{' '}
          of all placements, up from{' '}
          <span style={{ color: '#00ffaa' }}>35%</span>{' '}
          in 2018.
        </p>
      </div>

      {/* ── Tags ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['Python', 'Pandas', 'NumPy', 'Data Wrangling', 'EDA', 'Academic Research', 'Statistical Analysis'].map(tag => (
          <span key={tag} className="tag" style={{
            background: '#aa44ff10', borderColor: '#aa44ff33', color: '#aa44ff88',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
