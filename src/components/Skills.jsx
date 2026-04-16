// Skills section — radar / bar charts + timeline
import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { SKILLS, TIMELINE } from '../data/portfolioData';

function SkillBar({ name, level, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888' }}>{name}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color }}>
          {level}%
        </span>
      </div>
      <div style={{ background: '#111', borderRadius: 3, height: 4, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: 3,
            transition: 'width 1s ease',
            boxShadow: `0 0 8px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}

const RADAR_DATA = [
  { subject: 'Python', value: 95 },
  { subject: 'SQL', value: 92 },
  { subject: 'ML', value: 85 },
  { subject: 'BI Tools', value: 90 },
  { subject: 'Cloud', value: 78 },
  { subject: 'NLP', value: 80 },
  { subject: 'Statistics', value: 88 },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);

  const displayed = activeCategory
    ? SKILLS.filter(s => s.category === activeCategory)
    : SKILLS;

  return (
    <section id="skills" style={{ padding: '80px 0', position: 'relative', background: '#0a0a0a' }}>
      <div className="section-divider" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', marginTop: 60 }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00ffaa', letterSpacing: '0.15em' }}>
              03 /
            </span>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#e8e8e8' }}>
              Skills & Stack
            </h2>
          </div>
          <p style={{ color: '#555', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>
            &gt; Proficiency mapped across all 4 axes of a modern data team.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 32, marginBottom: 48 }}>
          {/* Radar chart */}
          <div className="dashboard-card" style={{ padding: 20 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 12, letterSpacing: '0.1em' }}>
              SKILL RADAR OVERVIEW
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#1e1e1e" />
                <PolarAngleAxis dataKey="subject"
                  tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#666' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Proficiency" dataKey="value" stroke="#00ffaa" strokeWidth={2}
                  fill="#00ffaa" fillOpacity={0.12} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill bars grid */}
          <div>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveCategory(null)}
                style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10, padding: '4px 12px',
                  borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                  border: `1px solid ${!activeCategory ? '#00ffaa66' : '#1e1e1e'}`,
                  background: !activeCategory ? '#00ffaa15' : 'transparent',
                  color: !activeCategory ? '#00ffaa' : '#555',
                }}
              >
                All
              </button>
              {SKILLS.map(s => (
                <button
                  key={s.category}
                  onClick={() => setActiveCategory(s.category === activeCategory ? null : s.category)}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10, padding: '4px 12px',
                    borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                    border: `1px solid ${activeCategory === s.category ? s.color + '66' : '#1e1e1e'}`,
                    background: activeCategory === s.category ? s.color + '15' : 'transparent',
                    color: activeCategory === s.category ? s.color : '#555',
                  }}
                >
                  {s.icon} {s.category}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {displayed.map(skillGroup => (
                <div key={skillGroup.category} className="dashboard-card" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <span style={{ color: skillGroup.color, fontSize: 14 }}>{skillGroup.icon}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', letterSpacing: '0.1em' }}>
                      {skillGroup.category.toUpperCase()}
                    </span>
                  </div>
                  {skillGroup.items.map(item => (
                    <SkillBar key={item.name} name={item.name} level={item.level} color={skillGroup.color} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#555', marginBottom: 20, letterSpacing: '0.1em' }}>
            CAREER TIMELINE
          </div>
          <div style={{ position: 'relative' }}>
            {/* vertical line */}
            <div style={{
              position: 'absolute', left: 50, top: 0, bottom: 0,
              width: 1, background: 'linear-gradient(180deg, #00ffaa44, transparent)',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', paddingLeft: 8 }}>
                  <div style={{ width: 88, flexShrink: 0, textAlign: 'right' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#00ffaa', fontWeight: 700 }}>
                      {item.year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div style={{ position: 'relative', flexShrink: 0, marginTop: 4 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: '#00ffaa', boxShadow: '0 0 8px #00ffaa',
                    }} />
                  </div>
                  <div className="dashboard-card" style={{ padding: '12px 16px', flex: 1 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: '#e8e8e8' }}>
                        {item.role}
                      </span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00ffaa' }}>
                        @ {item.company}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
