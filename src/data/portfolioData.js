// ── data/portfolioData.js ──────────────────────────────────────────────────
// All mock data for charts and project dashboards

export const PROJECTS = [
  {
    id: 'ecom',
    title: 'E-Commerce Revenue Engine',
    subtitle: 'Sales Analytics · 2024',
    description: 'Built a KPI dashboard for a D2C brand processing $4.2M/yr GMV, identifying a 23% revenue leak via abandoned-cart attribution models.',
    tags: ['Python', 'SQL', 'Tableau', 'Pandas'],
    kpis: [
      { label: 'GMV Uplift', value: '+23%', delta: '+23%', positive: true },
      { label: 'Churn Reduced', value: '−18%', delta: '−18%', positive: true },
      { label: 'Data Points', value: '4.2M', delta: null, positive: null },
      { label: 'Insight → Action', value: '3 days', delta: null, positive: null },
    ],
    chartType: 'revenue',  // which chart family to render
  },
  {
    id: 'health',
    title: 'Clinical Trial Outcome Predictor',
    subtitle: 'Healthcare Analytics · 2023',
    description: 'Designed an ML pipeline for predicting patient dropout in Phase-II trials with 91% recall, reducing trial extension costs by $280K.',
    tags: ['Python', 'scikit-learn', 'Plotly', 'PostgreSQL'],
    kpis: [
      { label: 'Recall Score', value: '91%', delta: '+12%', positive: true },
      { label: 'Cost Saved', value: '$280K', delta: null, positive: null },
      { label: 'Features Used', value: '142', delta: null, positive: null },
      { label: 'Patients', value: '6,800', delta: null, positive: null },
    ],
    chartType: 'health',
  },
  {
    id: 'supply',
    title: 'Supply Chain Stress-Test',
    subtitle: 'Operations Analytics · 2023',
    description: 'Modelled disruption scenarios for a Tier-1 automotive supplier, cutting forecast error by 34% and boosting on-time delivery by 19%.',
    tags: ['R', 'Power BI', 'DAX', 'Azure'],
    kpis: [
      { label: 'Forecast Error', value: '−34%', delta: '−34%', positive: true },
      { label: 'OTD Boost', value: '+19%', delta: '+19%', positive: true },
      { label: 'SKUs Modelled', value: '8,400', delta: null, positive: null },
      { label: 'Lead-time Cut', value: '−6 days', delta: null, positive: null },
    ],
    chartType: 'supply',
  },
  {
    id: 'social',
    title: 'Social Sentiment Tracker',
    subtitle: 'NLP Analytics · 2024',
    description: 'Real-time Twitter/Reddit sentiment pipeline for 12 consumer brands; surfaced a PR crisis 72 hrs before mainstream media pickup.',
    tags: ['Python', 'NLP', 'Kafka', 'Elasticsearch'],
    kpis: [
      { label: 'Brands Tracked', value: '12', delta: null, positive: null },
      { label: 'Posts/Day', value: '180K', delta: null, positive: null },
      { label: 'Alert Lead-time', value: '72h', delta: null, positive: null },
      { label: 'Accuracy', value: '87%', delta: '+5%', positive: true },
    ],
    chartType: 'social',
  },
];

// ── Revenue chart data ──────────────────────────────────────────────────────
export const REVENUE_MONTHLY = [
  { month: 'Jan', revenue: 290000, orders: 3100, aov: 93 },
  { month: 'Feb', revenue: 310000, orders: 3400, aov: 91 },
  { month: 'Mar', revenue: 345000, orders: 3700, aov: 93 },
  { month: 'Apr', revenue: 320000, orders: 3350, aov: 95 },
  { month: 'May', revenue: 378000, orders: 3900, aov: 97 },
  { month: 'Jun', revenue: 412000, orders: 4200, aov: 98 },
  { month: 'Jul', revenue: 395000, orders: 4050, aov: 97 },
  { month: 'Aug', revenue: 438000, orders: 4400, aov: 99 },
  { month: 'Sep', revenue: 461000, orders: 4600, aov: 100 },
  { month: 'Oct', revenue: 490000, orders: 4850, aov: 101 },
  { month: 'Nov', revenue: 538000, orders: 5300, aov: 102 },
  { month: 'Dec', revenue: 620000, orders: 6100, aov: 102 },
];

export const REVENUE_CHANNEL = [
  { name: 'Direct', value: 38 },
  { name: 'Organic', value: 24 },
  { name: 'Paid Ads', value: 20 },
  { name: 'Referral', value: 11 },
  { name: 'Email', value: 7 },
];

export const CART_FUNNEL = [
  { stage: 'Landing', users: 100000 },
  { stage: 'Product', users: 62000 },
  { stage: 'Cart', users: 28000 },
  { stage: 'Checkout', users: 14000 },
  { stage: 'Purchase', users: 9800 },
];

// ── Health chart data ───────────────────────────────────────────────────────
export const HEALTH_WEEKS = [
  { week: 'W1', enrolled: 680, active: 672, dropout: 8 },
  { week: 'W2', enrolled: 672, active: 660, dropout: 12 },
  { week: 'W3', enrolled: 660, active: 645, dropout: 15 },
  { week: 'W4', enrolled: 645, active: 628, dropout: 17 },
  { week: 'W5', enrolled: 628, active: 610, dropout: 18 },
  { week: 'W6', enrolled: 610, active: 595, dropout: 15 },
  { week: 'W7', enrolled: 595, active: 582, dropout: 13 },
  { week: 'W8', enrolled: 582, active: 571, dropout: 11 },
  { week: 'W9', enrolled: 571, active: 563, dropout: 8 },
  { week: 'W10', enrolled: 563, active: 558, dropout: 5 },
];

export const HEALTH_FEATURE_IMPORTANCE = [
  { feature: 'Age', importance: 0.22 },
  { feature: 'Comorbidity', importance: 0.19 },
  { feature: 'Distance', importance: 0.15 },
  { feature: 'Prior trial', importance: 0.13 },
  { feature: 'Income', importance: 0.11 },
  { feature: 'Side effect', importance: 0.09 },
  { feature: 'Engagement', importance: 0.07 },
  { feature: 'Insurance', importance: 0.04 },
];

// ── Supply chain data ───────────────────────────────────────────────────────
export const SUPPLY_MONTHLY = [
  { month: 'Jan', forecast: 4200, actual: 4100, inventory: 820 },
  { month: 'Feb', forecast: 4350, actual: 4500, inventory: 670 },
  { month: 'Mar', forecast: 4800, actual: 4600, inventory: 870 },
  { month: 'Apr', forecast: 4500, actual: 4750, inventory: 620 },
  { month: 'May', forecast: 5000, actual: 4800, inventory: 820 },
  { month: 'Jun', forecast: 5200, actual: 5300, inventory: 720 },
  { month: 'Jul', forecast: 4800, actual: 4650, inventory: 870 },
  { month: 'Aug', forecast: 5100, actual: 5050, inventory: 820 },
  { month: 'Sep', forecast: 5400, actual: 5500, inventory: 720 },
  { month: 'Oct', forecast: 5600, actual: 5450, inventory: 870 },
  { month: 'Nov', forecast: 6000, actual: 6200, inventory: 670 },
  { month: 'Dec', forecast: 6500, actual: 6300, inventory: 870 },
];

export const SUPPLY_DISRUPTION = [
  { scenario: 'Port Strike', probability: 0.35, impact: 4.2 },
  { scenario: 'Chip Shortage', probability: 0.52, impact: 7.8 },
  { scenario: 'Fuel Spike', probability: 0.68, impact: 3.1 },
  { scenario: 'Geo-political', probability: 0.28, impact: 8.5 },
  { scenario: 'Weather', probability: 0.44, impact: 2.4 },
];

// ── Sentiment data ──────────────────────────────────────────────────────────
export const SENTIMENT_HOURLY = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  positive: Math.floor(40 + Math.sin(i * 0.4) * 20 + Math.random() * 10),
  neutral: Math.floor(35 + Math.cos(i * 0.3) * 10 + Math.random() * 8),
  negative: Math.floor(15 + Math.sin(i * 0.6 + 1) * 10 + Math.random() * 8),
}));

export const BRAND_SENTIMENT = [
  { brand: 'Brand A', score: 72, posts: 28000 },
  { brand: 'Brand B', score: 58, posts: 19000 },
  { brand: 'Brand C', score: 84, posts: 14000 },
  { brand: 'Brand D', score: 41, posts: 32000 },
  { brand: 'Brand E', score: 67, posts: 11000 },
];

export const PLATFORM_VOLUME = [
  { name: 'Twitter', value: 55 },
  { name: 'Reddit', value: 28 },
  { name: 'News', value: 12 },
  { name: 'Forums', value: 5 },
];

// ── Skills data ─────────────────────────────────────────────────────────────
export const SKILLS = [
  {
    category: 'Languages',
    icon: '{ }',
    color: '#00ffaa',
    items: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 92 },
      { name: 'R', level: 78 },
      { name: 'Scala', level: 60 },
    ],
  },
  {
    category: 'Analytics',
    icon: '▲',
    color: '#4488ff',
    items: [
      { name: 'Pandas/NumPy', level: 94 },
      { name: 'scikit-learn', level: 88 },
      { name: 'TensorFlow', level: 72 },
      { name: 'statsmodels', level: 85 },
    ],
  },
  {
    category: 'Visualization',
    icon: '◈',
    color: '#ffcc00',
    items: [
      { name: 'Tableau', level: 90 },
      { name: 'Power BI', level: 85 },
      { name: 'Plotly/Dash', level: 88 },
      { name: 'D3.js', level: 70 },
    ],
  },
  {
    category: 'Infrastructure',
    icon: '⬡',
    color: '#aa44ff',
    items: [
      { name: 'AWS/GCP', level: 78 },
      { name: 'Spark/Hadoop', level: 72 },
      { name: 'Airflow', level: 80 },
      { name: 'Docker/K8s', level: 68 },
    ],
  },
];

// ── Timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE = [
  { year: '2024', role: 'Senior Data Analyst', company: 'FinTech Ventures', desc: 'Led a squad of 4 analysts; built real-time fraud detection pipeline.' },
  { year: '2023', role: 'Data Analyst', company: 'HealthCorp Inc.', desc: 'Clinical trial analytics, ML-assisted cohort selection.' },
  { year: '2022', role: 'Junior Analyst', company: 'Retail Dynamics', desc: 'Owned ETL pipelines and monthly exec reporting suite.' },
  { year: '2021', role: 'Analytics Intern', company: 'StartupX', desc: 'Built first Tableau dashboard tracking 200K MAU behavioural funnel.' },
];
