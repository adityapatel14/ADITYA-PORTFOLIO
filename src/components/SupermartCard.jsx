// ── SupermartCard.jsx ─────────────────────────────────────────────────────
// Supermarket Sales Analysis — 9,994 transactions, 2014-2017
import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  LineChart, Line,
  BarChart, Bar, Cell, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';

// ── Data ──────────────────────────────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const YEAR_DATA = {
  '2017': [
    { month: 'Jan', tech: 28, office: 10, furniture:  6 },
    { month: 'Feb', tech:  8, office:  8, furniture:  4 },
    { month: 'Mar', tech: 19, office: 28, furniture: 12 },
    { month: 'Apr', tech: 12, office: 15, furniture: 10 },
    { month: 'May', tech: 14, office: 18, furniture: 12 },
    { month: 'Jun', tech: 17, office: 22, furniture: 14 },
    { month: 'Jul', tech: 15, office: 19, furniture: 11 },
    { month: 'Aug', tech: 21, office: 27, furniture: 15 },
    { month: 'Sep', tech: 29, office: 37, furniture: 22 },
    { month: 'Oct', tech: 26, office: 33, furniture: 19 },
    { month: 'Nov', tech: 39, office: 50, furniture: 30 },
    { month: 'Dec', tech: 28, office: 35, furniture: 21 },
  ],
  '2016': [
    { month: 'Jan', tech: 22, office:  8, furniture:  5 },
    { month: 'Feb', tech:  7, office:  7, furniture:  3 },
    { month: 'Mar', tech: 16, office: 23, furniture: 10 },
    { month: 'Apr', tech: 10, office: 12, furniture:  8 },
    { month: 'May', tech: 12, office: 15, furniture: 10 },
    { month: 'Jun', tech: 14, office: 18, furniture: 11 },
    { month: 'Jul', tech: 13, office: 16, furniture:  9 },
    { month: 'Aug', tech: 18, office: 22, furniture: 13 },
    { month: 'Sep', tech: 24, office: 30, furniture: 18 },
    { month: 'Oct', tech: 21, office: 27, furniture: 15 },
    { month: 'Nov', tech: 32, office: 41, furniture: 24 },
    { month: 'Dec', tech: 23, office: 28, furniture: 17 },
  ],
  '2015': [
    { month: 'Jan', tech: 18, office:  7, furniture:  4 },
    { month: 'Feb', tech:  6, office:  6, furniture:  3 },
    { month: 'Mar', tech: 13, office: 19, furniture:  8 },
    { month: 'Apr', tech:  8, office: 10, furniture:  6 },
    { month: 'May', tech: 10, office: 12, furniture:  8 },
    { month: 'Jun', tech: 11, office: 14, furniture:  9 },
    { month: 'Jul', tech: 10, office: 13, furniture:  7 },
    { month: 'Aug', tech: 15, office: 18, furniture: 10 },
    { month: 'Sep', tech: 19, office: 24, furniture: 14 },
    { month: 'Oct', tech: 17, office: 22, furniture: 12 },
    { month: 'Nov', tech: 26, office: 33, furniture: 19 },
    { month: 'Dec', tech: 19, office: 23, furniture: 14 },
  ],
  '2014': [
    { month: 'Jan', tech: 14, office:  5, furniture:  3 },
    { month: 'Feb', tech:  4, office:  4, furniture:  2 },
    { month: 'Mar', tech: 10, office: 14, furniture:  6 },
    { month: 'Apr', tech:  6, office:  8, furniture:  5 },
    { month: 'May', tech:  8, office:  9, furniture:  6 },
    { month: 'Jun', tech:  9, office: 11, furniture:  7 },
    { month: 'Jul', tech:  8, office: 10, furniture:  5 },
    { month: 'Aug', tech: 11, office: 14, furniture:  8 },
    { month: 'Sep', tech: 15, office: 18, furniture: 10 },
    { month: 'Oct', tech: 13, office: 16, furniture:  9 },
    { month: 'Nov', tech: 20, office: 25, furniture: 14 },
    { month: 'Dec', tech: 14, office: 17, furniture: 10 },
  ],
};

const PROFIT_DATA = [
  { category: 'Technology',      margin: 17.4 },
  { category: 'Office Supplies', margin: 17.0 },
  { category: 'Furniture',       margin:  2.5 },
];

const REGION_DATA = [
  { region: 'West',    sales: 725458 },
  { region: 'East',   sales: 678781 },
  { region: 'Central',sales: 501240 },
  { region: 'South',  sales: 391722 },
];

const METRICS_BY_YEAR = {
  '2017': { revenue: '$2.30M', profit: '$286K', topCat: 'Technology', worst: 'Furniture (2.5%)' },
  '2016': { revenue: '$1.97M', profit: '$248K', topCat: 'Technology', worst: 'Furniture (2.3%)' },
  '2015': { revenue: '$1.64M', profit: '$203K', topCat: 'Technology', worst: 'Furniture (2.1%)' },
  '2014': { revenue: '$1.24M', profit: '$155K', topCat: 'Technology', worst: 'Furniture (1.9%)' },
};

const YEARS = ['2014', '2015', '2016', '2017'];

// ── Shared tooltip/axis styles ─────────────────────────────────────────────────
const tooltipStyle = {
  background: '#0d0d0d',
  border: '1px solid #00ffaa22',
  borderRadius: 6,
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 11,
  color: '#e8e8e8',
  padding: '8px 12px',
};
const labelStyle  = { color: '#00ffaa', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 };
const axisStyle   = { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#555' };
const gridStyle   = { stroke: '#1a1a1a', strokeDasharray: '3 3' };

// Category colours
const CAT_COLOR = {
  tech:      '#00ffaa',
  office:    '#4488ff',
  furniture: '#ffaa00',
};

// ── Custom dot for active year line ───────────────────────────────────────────
const SmallDot = (props) => {
  const { cx, cy, stroke } = props;
  return <circle cx={cx} cy={cy} r={3} fill={stroke} stroke="none" />;
};

// ── Region colour mapping ──────────────────────────────────────────────────────
const REGION_COLORS = ['#00ffaa', '#4488ff', '#ffaa00', '#aa44ff'];

// ── Custom legend ─────────────────────────────────────────────────────────────
const renderLegend = () => (
  <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 6 }}>
    {[
      { key: 'tech',      label: 'Technology',      color: CAT_COLOR.tech },
      { key: 'office',    label: 'Office Supplies',  color: CAT_COLOR.office },
      { key: 'furniture', label: 'Furniture',         color: CAT_COLOR.furniture },
    ].map(({ key, label, color }) => (
      <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 5,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#666' }}>
        <span style={{ width: 20, height: 2, background: color, display: 'inline-block', borderRadius: 1 }} />
        {label}
      </span>
    ))}
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────────
export default function SupermartCard() {
  const [year, setYear] = useState('2017');
  const [chartRef, chartVisible] = useInView(0.15);
  const metrics = METRICS_BY_YEAR[year];
  const lineData = YEAR_DATA[year];

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
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffaa00',
              boxShadow: '0 0 6px #ffaa00', flexShrink: 0 }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#555', letterSpacing: '0.12em' }}>
              SUPERSTORE DATASET · 9,994 TRANSACTIONS · 2014–2017
            </span>
          </div>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 700, color: '#e8e8e8' }}>
            Supermarket Sales Analysis
          </h3>
        </div>

        {/* GitHub button */}
        <a
          href="https://github.com/adityapatel14/Supermart"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'transparent', border: '1px solid #333',
            color: '#888', borderRadius: 6, padding: '6px 14px',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            textDecoration: 'none', transition: 'all 0.2s', flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ffaa44'; e.currentTarget.style.color = '#00ffaa'; }}
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
        {[
          { label: 'TOTAL REVENUE',    value: metrics.revenue,  color: '#00ffaa' },
          { label: 'TOTAL PROFIT',     value: metrics.profit,   color: '#4488ff' },
          { label: 'TOP CATEGORY',     value: metrics.topCat,   color: '#e8e8e8' },
          { label: 'WORST MARGIN',     value: metrics.worst,    color: '#ff4444' },
        ].map((m, i) => (
          <div key={i} style={{
            background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 6,
            padding: '12px 14px', textAlign: 'center',
            transition: 'border-color 0.2s',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: i >= 2 ? 13 : 18,
              fontWeight: 700,
              color: m.color,
              marginBottom: 4,
              lineHeight: 1.2,
            }}>
              {m.value}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.08em' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Year filter tabs ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em' }}>
          YEAR:
        </span>
        {YEARS.map(y => {
          const active = year === y;
          return (
            <button
              key={y}
              onClick={() => setYear(y)}
              style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                padding: '4px 16px', borderRadius: 4, cursor: 'pointer',
                transition: 'all 0.15s',
                border:     `1px solid ${active ? '#00ffaa66' : '#1e1e1e'}`,
                background: active ? '#00ffaa18' : 'transparent',
                color:      active ? '#00ffaa'   : '#555',
                fontWeight: active ? 700 : 400,
              }}
            >
              {y}
            </button>
          );
        })}
        {/* live indicator */}
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ffaa',
            boxShadow: '0 0 6px #00ffaa', display: 'inline-block' }} />
          LIVE FILTER ACTIVE
        </span>
      </div>

      {/* ── Charts row ──────────────────────────────────────────────────── */}
      <div ref={chartRef} className="chart-area" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr', gap: 16 }}>

        {/* 1 — Line chart: monthly sales by category */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 4px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444',
            letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            MONTHLY SALES BY CATEGORY — {year} ($K)
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={lineData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis
                tick={axisStyle} axisLine={false} tickLine={false}
                tickFormatter={v => `$${v}k`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                formatter={(v, name) => {
                  const labels = { tech: 'Technology', office: 'Office Supplies', furniture: 'Furniture' };
                  return [`$${v}k`, labels[name] || name];
                }}
              />
              <Line type="monotone" dataKey="tech"
                stroke={CAT_COLOR.tech} strokeWidth={2}
                dot={<SmallDot />} activeDot={{ r: 5, fill: CAT_COLOR.tech }}
                isAnimationActive={chartVisible} animationDuration={500} />
              <Line type="monotone" dataKey="office"
                stroke={CAT_COLOR.office} strokeWidth={2}
                dot={<SmallDot />} activeDot={{ r: 5, fill: CAT_COLOR.office }}
                isAnimationActive={chartVisible} animationDuration={600} />
              <Line type="monotone" dataKey="furniture"
                stroke={CAT_COLOR.furniture} strokeWidth={2}
                dot={<SmallDot />} activeDot={{ r: 5, fill: CAT_COLOR.furniture }}
                isAnimationActive={chartVisible} animationDuration={700} />
            </LineChart>
          </ResponsiveContainer>
          {renderLegend()}
        </div>

        {/* 2 — Profit margin by category */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 8px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444',
            letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            PROFIT MARGIN BY CATEGORY (%)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={PROFIT_DATA}
              margin={{ top: 16, right: 16, left: -14, bottom: 16 }}
            >
              <CartesianGrid {...gridStyle} vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ ...axisStyle, fontSize: 9 }}
                axisLine={false} tickLine={false}
                interval={0}
                angle={-10}
                textAnchor="end"
                height={36}
              />
              <YAxis
                tick={axisStyle} axisLine={false} tickLine={false}
                domain={[0, 22]} tickFormatter={v => `${v}%`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                formatter={v => [`${v}%`, 'Profit Margin']}
              />
              <Bar dataKey="margin" radius={[4, 4, 0, 0]} maxBarSize={44} isAnimationActive={chartVisible} animationDuration={500}>
                {PROFIT_DATA.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.category === 'Technology'      ? '#00ffaa' :
                      d.category === 'Office Supplies' ? '#4488ff' :
                      '#ff6644'
                    }
                    opacity={d.category === 'Furniture' ? 0.75 : 0.9}
                  />
                ))}
                <LabelList
                  dataKey="margin"
                  position="top"
                  formatter={v => `${v}%`}
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#777' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3 — Sales by Region (horizontal) */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 8px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444',
            letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            TOTAL SALES BY REGION ($)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={REGION_DATA}
              layout="vertical"
              margin={{ top: 8, right: 56, left: 8, bottom: 4 }}
            >
              <CartesianGrid {...gridStyle} horizontal={false} />
              <XAxis
                type="number"
                tick={axisStyle} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}K`}
              />
              <YAxis
                type="category" dataKey="region"
                tick={{ ...axisStyle, fill: '#666' }}
                axisLine={false} tickLine={false}
                width={52}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                formatter={v => [`$${v.toLocaleString()}`, 'Sales']}
              />
              <Bar dataKey="sales" radius={[0, 4, 4, 0]} maxBarSize={26} isAnimationActive={chartVisible} animationDuration={500}>
                {REGION_DATA.map((_, i) => (
                  <Cell key={i} fill={REGION_COLORS[i]} opacity={i === 0 ? 0.9 : 0.65} />
                ))}
                <LabelList
                  dataKey="sales"
                  position="right"
                  formatter={v => `$${(v / 1000).toFixed(0)}K`}
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#666' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Insight box ─────────────────────────────────────────────────── */}
      <div style={{
        background: '#0a0a0a',
        border: '1px solid #ffaa0033',
        borderLeft: '3px solid #ffaa00',
        borderRadius: 6,
        padding: '12px 16px',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        <span style={{
          color: '#ffaa00', fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12, flexShrink: 0, marginTop: 1,
        }}>
          ▲ INSIGHT
        </span>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888', lineHeight: 1.7, margin: 0 }}>
          <span style={{ color: '#ffaa00', fontWeight: 700 }}>Furniture</span>{' '}
          generates{' '}
          <span style={{ color: '#ffaa00', fontWeight: 700 }}>32%</span>{' '}
          of revenue but only{' '}
          <span style={{ color: '#ff4444', fontWeight: 700 }}>6%</span>{' '}
          of profit. Discounts above{' '}
          <span style={{ color: '#ff4444' }}>20%</span>{' '}
          flip profit negative —{' '}
          high-discount orders average a{' '}
          <span style={{ color: '#ff4444', fontWeight: 700 }}>loss of $77</span>{' '}
          per transaction.
        </p>
      </div>

      {/* ── Tags ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'EDA', 'Regression Analysis', 'Power BI'].map(tag => (
          <span key={tag} className="tag" style={{
            background: '#ffaa0010', borderColor: '#ffaa0033', color: '#ffaa0088',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
