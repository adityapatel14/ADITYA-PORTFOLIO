// Chart components for each project type
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, FunnelChart, Funnel,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LabelList,
} from 'recharts';

import {
  REVENUE_MONTHLY, REVENUE_CHANNEL, CART_FUNNEL,
  HEALTH_WEEKS, HEALTH_FEATURE_IMPORTANCE,
  SUPPLY_MONTHLY, SUPPLY_DISRUPTION,
  SENTIMENT_HOURLY, BRAND_SENTIMENT, PLATFORM_VOLUME,
} from '../data/portfolioData';

// ── Shared styles ────────────────────────────────────────────────────────────
const CHART_COLORS = {
  accent: '#00ffaa',
  blue: '#4488ff',
  yellow: '#ffcc00',
  red: '#ff4466',
  purple: '#aa44ff',
  dim: '#ffffff22',
};

const tooltipStyle = {
  background: '#111',
  border: '1px solid #00ffaa33',
  borderRadius: 6,
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 11,
  color: '#e8e8e8',
};

const axisStyle = {
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 10,
  fill: '#555',
};

const gridStyle = { stroke: '#1a1a1a', strokeDasharray: '3 3' };

// ── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ color: '#00ffaa', marginBottom: 6, borderBottom: '1px solid #1e1e1e', paddingBottom: 4 }}>
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 2 }}>
          <span style={{ color: '#888' }}>{p.name}:</span>
          <span style={{ color: p.color, fontWeight: 700 }}>
            {formatter ? formatter(p.value, p.name) : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── REVENUE CHARTS ─────────────────────────────────────────────────────────────
function RevenueArea({ filter }) {
  const data = filter === 'h2'
    ? REVENUE_MONTHLY.slice(6)
    : filter === 'h1'
    ? REVENUE_MONTHLY.slice(0, 6)
    : REVENUE_MONTHLY;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00ffaa" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00ffaa" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4488ff" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#4488ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false}
          tickFormatter={v => v >= 1000 ? `$${v/1000}K` : `$${v}`} />
        <Tooltip content={<CustomTooltip formatter={(v) => `$${(v/1000).toFixed(0)}K`} />} />
        <Area type="monotone" dataKey="revenue" stroke="#00ffaa" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function RevenueDonut({ filter }) {
  const data = REVENUE_CHANNEL;
  const COLORS = ['#00ffaa', '#4488ff', '#ffcc00', '#ff4466', '#aa44ff'];
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
          dataKey="value" nameKey="name" stroke="none">
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} opacity={0.85} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#888' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RevenueCharts({ filter }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          MONTHLY REVENUE TREND
        </div>
        <RevenueArea filter={filter} />
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          CHANNEL MIX
        </div>
        <RevenueDonut filter={filter} />
      </div>
    </div>
  );
}

// ── HEALTH CHARTS ──────────────────────────────────────────────────────────────
export function HealthCharts({ filter }) {
  const data = filter === 'dropout'
    ? HEALTH_WEEKS
    : HEALTH_FEATURE_IMPORTANCE;

  if (filter === 'features') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
            FEATURE IMPORTANCE (SHAP VALUES)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={HEALTH_FEATURE_IMPORTANCE} layout="vertical" margin={{ top: 0, right: 20, left: 60, bottom: 0 }}>
              <CartesianGrid {...gridStyle} horizontal={false} />
              <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false}
                tickFormatter={v => v.toFixed(2)} domain={[0, 0.25]} />
              <YAxis type="category" dataKey="feature" tick={{ ...axisStyle, fill: '#888' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={v => v.toFixed(3)} />
              <Bar dataKey="importance" radius={[0, 3, 3, 0]}>
                {HEALTH_FEATURE_IMPORTANCE.map((_, i) => (
                  <Cell key={i}
                    fill={i === 0 ? '#00ffaa' : i < 3 ? '#4488ff' : '#4488ff66'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          TRIAL COHORT RETENTION
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={HEALTH_WEEKS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4488ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4488ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} domain={[540, 690]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="active" stroke="#4488ff" strokeWidth={2} fill="url(#activeGrad)" name="Active" />
            <Line type="monotone" dataKey="dropout" stroke="#ff4466" strokeWidth={1.5} dot={false} strokeDasharray="4 2" name="Dropout" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          DROPOUT RATE / WEEK
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={HEALTH_WEEKS} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid {...gridStyle} horizontal={true} vertical={false} />
            <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="dropout" fill="#ff446666" stroke="#ff4466" strokeWidth={1} radius={[2, 2, 0, 0]} name="Dropout" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── SUPPLY CHAIN CHARTS ────────────────────────────────────────────────────────
export function SupplyCharts({ filter }) {
  if (filter === 'risk') {
    return (
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          DISRUPTION RISK MATRIX (Probability × Impact)
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <ScatterChart margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="probability" type="number" name="Probability" tick={axisStyle} axisLine={false}
              tickLine={false} domain={[0, 0.8]} tickFormatter={v => `${Math.round(v*100)}%`} label={{ value: 'Probability →', position: 'insideBottom', offset: -5, fill: '#555', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }} />
            <YAxis dataKey="impact" type="number" name="Impact ($M)" tick={axisStyle} axisLine={false}
              tickLine={false} label={{ value: 'Impact ($M)', angle: -90, position: 'insideLeft', fill: '#555', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }} />
            <Tooltip
              contentStyle={tooltipStyle}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = SUPPLY_DISRUPTION.find(x => x.probability === payload[0]?.value);
                return (
                  <div style={tooltipStyle}>
                    <div style={{ color: '#ffcc00', marginBottom: 4 }}>{payload[0]?.payload?.scenario}</div>
                    <div style={{ color: '#888' }}>Probability: <span style={{ color: '#e8e8e8' }}>{(payload[0]?.payload?.probability * 100).toFixed(0)}%</span></div>
                    <div style={{ color: '#888' }}>Impact: <span style={{ color: '#ff4466' }}>${payload[0]?.payload?.impact}M</span></div>
                  </div>
                );
              }}
            />
            <Scatter data={SUPPLY_DISRUPTION} fill="#ffcc00">
              {SUPPLY_DISRUPTION.map((d, i) => (
                <Cell key={i}
                  fill={d.impact > 6 ? '#ff4466' : d.probability > 0.5 ? '#ffcc00' : '#00ffaa'}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          FORECAST vs ACTUAL DEMAND
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={SUPPLY_MONTHLY} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false}
              tickFormatter={v => `${(v/1000).toFixed(1)}K`} />
            <Tooltip content={<CustomTooltip formatter={v => v.toLocaleString() + ' units'} />} />
            <Line type="monotone" dataKey="forecast" stroke="#555" strokeWidth={1.5} dot={false} strokeDasharray="5 3" name="Forecast" />
            <Line type="monotone" dataKey="actual" stroke="#00ffaa" strokeWidth={2} dot={false} name="Actual" />
            <Legend wrapperStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#888' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          BUFFER INVENTORY
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={SUPPLY_MONTHLY} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#aa44ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#aa44ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={v => `${v} units`} />
            <Area type="monotone" dataKey="inventory" stroke="#aa44ff" strokeWidth={2} fill="url(#invGrad)" name="Inventory" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── SENTIMENT CHARTS ───────────────────────────────────────────────────────────
export function SentimentCharts({ filter }) {
  if (filter === 'brands') {
    return (
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          BRAND SENTIMENT SCORE (0-100)
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={BRAND_SENTIMENT} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid {...gridStyle} horizontal={true} vertical={false} />
            <XAxis dataKey="brand" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => n === 'score' ? v + '/100' : v.toLocaleString()} />
            <Bar dataKey="score" radius={[3, 3, 0, 0]} name="Score">
              {BRAND_SENTIMENT.map((d, i) => (
                <Cell key={i} fill={d.score >= 70 ? '#00ffaa' : d.score >= 50 ? '#ffcc00' : '#ff4466'} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Default — hourly sentiment stream
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          HOURLY SENTIMENT STREAM (24H)
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={SENTIMENT_HOURLY} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ffaa" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#00ffaa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="negGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4466" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#ff4466" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="hour" tick={axisStyle} axisLine={false} tickLine={false}
              interval={3} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip formatter={v => v + '%'} />} />
            <Area type="monotone" dataKey="positive" stroke="#00ffaa" strokeWidth={1.5} fill="url(#posGrad)" name="Positive" />
            <Area type="monotone" dataKey="negative" stroke="#ff4466" strokeWidth={1.5} fill="url(#negGrad)" name="Negative" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>
          PLATFORM VOLUME SPLIT
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={PLATFORM_VOLUME} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
              dataKey="value" nameKey="name" stroke="none">
              {PLATFORM_VOLUME.map((_, i) => (
                <Cell key={i} fill={['#00ffaa', '#4488ff', '#ffcc00', '#aa44ff'][i]} opacity={0.85} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} formatter={v => `${v}%`} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#888' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
