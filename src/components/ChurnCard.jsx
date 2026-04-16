// ── ChurnCard.jsx ─────────────────────────────────────────────────────────
// Customer Churn Analysis — Telco dataset, 7,043 customers
import { useState, useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, LabelList,
} from 'recharts';

// ── Static data ───────────────────────────────────────────────────────────────
const CONTRACT_DATA = [
  { contract: 'Month-to-month', churnRate: 42.7, key: 'mtm' },
  { contract: 'One year',       churnRate: 11.3, key: 'one' },
  { contract: 'Two year',       churnRate:  2.8, key: 'two' },
];

const PAYMENT_DATA = [
  { method: 'Electronic check', churnRate: 45.3 },
  { method: 'Mailed check',     churnRate: 19.1 },
  { method: 'Bank transfer',    churnRate: 16.7 },
  { method: 'Credit card',      churnRate: 15.2 },
];

// Donut data keyed by filter
const DONUT_DATA = {
  all:  [{ name: 'Retained', value: 5174 }, { name: 'Churned', value: 1869 }],
  high: [{ name: 'Retained', value: 2222 }, { name: 'Churned', value: 1653 }],
  low:  [{ name: 'Retained', value: 1648 }, { name: 'Churned', value:   47 }],
};

const METRICS = {
  all:  { customers: '7,043', churnRate: '26.5%', tenure: '18 mo', bill: '₹74.44' },
  high: { customers: '3,875', churnRate: '42.7%', tenure: '14 mo', bill: '₹79.65' },
  low:  { customers: '1,695', churnRate:  '2.8%', tenure: '55 mo', bill: '₹60.22' },
};

const FILTERS = [
  { id: 'all',  label: 'All Customers' },
  { id: 'high', label: 'High Risk (Month-to-month)' },
  { id: 'low',  label: 'Low Risk (2yr Contract)' },
];

// ── Shared chart styles ───────────────────────────────────────────────────────
const tooltipStyle = {
  background: '#0d0d0d',
  border: '1px solid #00ffaa33',
  borderRadius: 6,
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 11,
  color: '#e8e8e8',
  padding: '8px 12px',
};

const axisStyle = {
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 10,
  fill: '#555',
};

const gridStyle = { stroke: '#1a1a1a', strokeDasharray: '3 3' };

// ── Custom label in donut centre ──────────────────────────────────────────────
function DonutCenterLabel({ viewBox, filter }) {
  const { cx, cy } = viewBox;
  const data = DONUT_DATA[filter];
  const total = data[0].value + data[1].value;
  const rate = ((data[1].value / total) * 100).toFixed(1);
  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#ff4444"
        fontFamily="JetBrains Mono, monospace" fontSize={22} fontWeight={700}>
        {rate}%
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#555"
        fontFamily="JetBrains Mono, monospace" fontSize={10}>
        churn rate
      </text>
    </g>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimCount({ value, duration = 800 }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return;
    const numTarget = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    const numStart  = parseFloat(String(prev.current).replace(/[^0-9.]/g, ''));
    if (isNaN(numTarget) || isNaN(numStart)) { setDisplay(value); prev.current = value; return; }
    const steps = 20;
    const step = (numTarget - numStart) / steps;
    let current = numStart;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      current += step;
      if (count >= steps) { clearInterval(timer); setDisplay(value); prev.current = value; }
      else {
        const formatted = String(value).replace(/[\d.]+/, () =>
          Number.isInteger(numTarget) ? Math.round(current).toLocaleString() : current.toFixed(1)
        );
        setDisplay(formatted);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{display}</span>;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ChurnCard() {
  const [filter, setFilter] = useState('all');
  const [chartRef, chartVisible] = useInView(0.15);

  const donutData   = DONUT_DATA[filter];
  const metrics     = METRICS[filter];
  const highlightMtm = filter === 'high';
  const highlightTwo = filter === 'low';

  // colour each contract bar depending on active filter
  const contractBarColor = (key) => {
    if (filter === 'all')  return '#4488ff';
    if (filter === 'high') return key === 'mtm' ? '#ff4444' : '#4488ff44';
    if (filter === 'low')  return key === 'two' ? '#00ffaa' : '#4488ff44';
    return '#4488ff';
  };

  return (
    <div
      className="dashboard-card"
      style={{
        gridColumn: '1 / -1',   // span full width of the 2-col grid
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* ── Header row ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4444', boxShadow: '0 0 6px #ff4444', flexShrink: 0 }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#555', letterSpacing: '0.12em' }}>
              TELCO DATASET · 7,043 CUSTOMERS · BINARY CLASSIFICATION
            </span>
          </div>
          <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 700, color: '#e8e8e8' }}>
            Customer Churn Analysis
          </h3>
        </div>

        {/* GitHub button */}
        <a
          href="https://github.com/adityapatel14/CUSTOMER_CHURN"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'transparent', border: '1px solid #333',
            color: '#888', borderRadius: 6, padding: '6px 14px',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            textDecoration: 'none', transition: 'all 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ffaa44'; e.currentTarget.style.color = '#00ffaa'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888'; }}
        >
          {/* GitHub SVG icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34C7.15 16.19 4.76 15.31 4.76 11.37c0-1.16.42-2.11 1.1-2.85-.11-.27-.48-1.35.1-2.82 0 0 .9-.29 2.94 1.1A10.2 10.2 0 0 1 12 6.84a10.2 10.2 0 0 1 2.68.36c2.04-1.39 2.93-1.1 2.93-1.1.59 1.47.22 2.55.11 2.82.69.74 1.1 1.69 1.1 2.85 0 3.95-2.4 4.82-4.69 5.07.37.32.7.94.7 1.9l-.01 2.8c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>
          </svg>
          View on GitHub ↗
        </a>
      </div>

      {/* ── Metric strip ───────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          { label: 'TOTAL CUSTOMERS',         value: metrics.customers, color: '#e8e8e8' },
          { label: 'CHURN RATE',               value: metrics.churnRate, color: '#ff4444' },
          { label: 'AVG TENURE (CHURNED)',     value: metrics.tenure,    color: '#ffcc00' },
          { label: 'AVG MONTHLY BILL (CHURN)', value: metrics.bill,      color: '#4488ff' },
        ].map((m, i) => (
          <div key={i} style={{
            background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 6,
            padding: '12px 14px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700,
              color: m.color, marginBottom: 4,
            }}>
              <AnimCount value={m.value} />
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.08em' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em' }}>
          SEGMENT:
        </span>
        {FILTERS.map(f => {
          const active = filter === f.id;
          const accentColor = f.id === 'high' ? '#ff4444' : f.id === 'low' ? '#00ffaa' : '#4488ff';
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11, padding: '5px 14px',
                borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                border: `1px solid ${active ? accentColor + '88' : '#1e1e1e'}`,
                background: active ? accentColor + '18' : 'transparent',
                color: active ? accentColor : '#555',
                fontWeight: active ? 700 : 400,
              }}
            >
              {f.id === 'high' && '⚠ '}{f.id === 'low' && '✓ '}{f.label}
            </button>
          );
        })}
      </div>

      {/* ── Charts row ──────────────────────────────────────────────────── */}
      <div ref={chartRef} className="chart-area" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr 1.1fr', gap: 16 }}>

        {/* 1 — Donut */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 8px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            CHURN SPLIT (CUSTOMERS)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%" cy="50%"
                innerRadius={58} outerRadius={82}
                startAngle={90} endAngle={-270}
                dataKey="value"
                stroke="none"
                isAnimationActive={chartVisible}
                animationDuration={500}
              >
                <Cell fill="#00ffaa" opacity={0.9} />
                <Cell fill="#ff4444" opacity={0.9} />
                <LabelList
                  dataKey="value"
                  content={({ viewBox }) =>
                    <DonutCenterLabel viewBox={viewBox} filter={filter} />
                  }
                />
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(val, name) => [val.toLocaleString(), name]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 4 }}>
            {[['#00ffaa', 'Retained'], ['#ff4444', 'Churned']].map(([c, l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#666' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* 2 — Contract bar chart */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 8px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            CHURN RATE BY CONTRACT TYPE
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              data={CONTRACT_DATA}
              margin={{ top: 8, right: 16, left: -10, bottom: 24 }}
            >
              <CartesianGrid {...gridStyle} horizontal vertical={false} />
              <XAxis
                dataKey="contract"
                tick={{ ...axisStyle, fill: '#555' }}
                axisLine={false} tickLine={false}
                interval={0}
                angle={-12}
                textAnchor="end"
                height={40}
              />
              <YAxis
                tick={axisStyle} axisLine={false} tickLine={false}
                domain={[0, 50]} tickFormatter={v => `${v}%`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={v => [`${v}%`, 'Churn Rate']}
                labelStyle={{ color: '#00ffaa', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
              />
              <Bar dataKey="churnRate" radius={[4, 4, 0, 0]} maxBarSize={50} isAnimationActive={chartVisible} animationDuration={500}>
                {CONTRACT_DATA.map((d) => (
                  <Cell key={d.key} fill={contractBarColor(d.key)} />
                ))}
                <LabelList
                  dataKey="churnRate"
                  position="top"
                  formatter={v => `${v}%`}
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#777' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3 — Payment method bar chart */}
        <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 8, padding: '14px 8px 8px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#444', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>
            CHURN RATE BY PAYMENT METHOD
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              data={PAYMENT_DATA}
              layout="vertical"
              margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
            >
              <CartesianGrid {...gridStyle} horizontal={false} />
              <XAxis
                type="number" tick={axisStyle} axisLine={false} tickLine={false}
                domain={[0, 50]} tickFormatter={v => `${v}%`}
              />
              <YAxis
                type="category" dataKey="method"
                tick={{ ...axisStyle, fill: '#666', fontSize: 9 }}
                axisLine={false} tickLine={false}
                width={90}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={v => [`${v}%`, 'Churn Rate']}
                labelStyle={{ color: '#ffcc00', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
              />
              <Bar dataKey="churnRate" radius={[0, 4, 4, 0]} maxBarSize={22} isAnimationActive={chartVisible} animationDuration={500}>
                {PAYMENT_DATA.map((d, i) => (
                  <Cell
                    key={i}
                    fill={i === 0 ? '#ff4444' : i === 1 ? '#ffcc00' : '#4488ff'}
                    opacity={i === 0 ? 0.9 : 0.65}
                  />
                ))}
                <LabelList
                  dataKey="churnRate"
                  position="right"
                  formatter={v => `${v}%`}
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
        border: '1px solid #ff444433',
        borderLeft: '3px solid #ff4444',
        borderRadius: 6,
        padding: '12px 16px',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        <span style={{ color: '#ff4444', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, flexShrink: 0, marginTop: 1 }}>
          ⚠ INSIGHT
        </span>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888', lineHeight: 1.7, margin: 0 }}>
          Customers on{' '}
          <span style={{ color: '#ff4444', fontWeight: 700 }}>month-to-month contracts</span>{' '}
          churn at{' '}
          <span style={{ color: '#ff4444', fontWeight: 700 }}>15×</span>{' '}
          the rate of two-year contract holders.{' '}
          <span style={{ color: '#ffcc00' }}>Electronic check</span>{' '}
          users are the highest-risk payment segment at{' '}
          <span style={{ color: '#ffcc00', fontWeight: 700 }}>45.3%</span>.
        </p>
      </div>

      {/* ── Tags ──────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'Logistic Regression', 'Feature Engineering'].map(tag => (
          <span key={tag} className="tag" style={{
            background: '#00ffaa0d', borderColor: '#00ffaa33', color: '#00ffaa88',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
