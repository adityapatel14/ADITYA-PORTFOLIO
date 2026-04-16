// ── Terminal.jsx ──────────────────────────────────────────────────────────────
// Fully interactive CLI — type commands, press Enter, get real output
import { useState, useRef, useEffect } from 'react';

const CV_URL       = 'https://drive.google.com/file/d/1OrcIPihckosaWd-u7rlbgnEaeU1usrzI/view?usp=sharing';
const GITHUB_URL   = 'https://github.com/adityapatel14/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/aditya-kaushik-patel/';
const PROMPT       = 'visitor@portfolio:~$';

// ── Welcome banner (shown on mount) ──────────────────────────────────────────
const WELCOME = [
  { type: 'accent', content: '  Aditya Patel — Portfolio Terminal v1.0' },
  { type: 'divider' },
  { type: 'muted',  content: '  Type  help  to see all commands.' },
  { type: 'blank' },
];

// ── Command processor ─────────────────────────────────────────────────────────
function processCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const [cmd, ...rest] = trimmed.split(/\s+/);
  const args = rest.join(' ');

  switch (cmd.toLowerCase()) {

    case 'help':
      return [
        { type: 'label', content: 'AVAILABLE COMMANDS' },
        { type: 'row', key: 'about',    val: 'Short intro about me' },
        { type: 'row', key: 'skills',   val: 'Tech stack & proficiency levels' },
        { type: 'row', key: 'projects', val: 'My 3 real-world projects' },
        { type: 'row', key: 'github',   val: 'GitHub profile link' },
        { type: 'row', key: 'linkedin', val: 'LinkedIn profile link' },
        { type: 'row', key: 'resume',   val: 'Download my CV' },
        { type: 'row', key: 'hire',     val: "Let's work together" },
        { type: 'row', key: 'whoami',   val: 'Who is the visitor?' },
        { type: 'row', key: 'echo',     val: 'Echo back your text' },
        { type: 'row', key: 'clear',    val: 'Clear the terminal' },
        { type: 'blank' },
        { type: 'muted', content: '  ↑ / ↓  to navigate command history' },
      ];

    case 'about':
      return [
        { type: 'accent',  content: '  Aditya Patel' },
        { type: 'text',    content: '  Junior Data Analyst · Mumbai, India' },
        { type: 'blank' },
        { type: 'text',    content: '  "21-year-old data analyst from Mumbai.' },
        { type: 'text',    content: '   I care about one thing: making sure the' },
        { type: 'text',    content: '   analysis actually changes a decision."' },
        { type: 'blank' },
        { type: 'muted',   content: '  Python · SQL · Power BI · Pandas · Statistics · Excel' },
      ];

    case 'skills':
      return [
        { type: 'label', content: 'TECHNICAL STACK' },
        { type: 'bar', skill: 'SQL',        pct: 92, level: 'ADVANCED'  },
        { type: 'bar', skill: 'Excel',      pct: 88, level: 'ADVANCED'  },
        { type: 'bar', skill: 'Power BI',   pct: 85, level: 'ADVANCED'  },
        { type: 'bar', skill: 'Python',     pct: 80, level: 'PROFICIENT'},
        { type: 'bar', skill: 'Pandas',     pct: 78, level: 'PROFICIENT'},
        { type: 'bar', skill: 'Statistics', pct: 75, level: 'PROFICIENT'},
      ];

    case 'projects':
      return [
        { type: 'label', content: 'PROJECTS (3)' },
        { type: 'project', num: '01', title: 'Customer Churn Analysis',
          desc: 'Telco dataset · 7,043 customers · 26.5% churn rate identified' },
        { type: 'project', num: '02', title: 'Supermarket Sales Analysis',
          desc: '9,994 transactions · 4 years · 3 product categories tracked' },
        { type: 'project', num: '03', title: 'Student Internship Research',
          desc: '2,004 records · 7 academic years · CS dept. trend analysis' },
        { type: 'muted', content: '  Scroll up to explore live dashboards for each ↑' },
      ];

    case 'github':
      return [
        { type: 'link', content: '  ⌥  github.com/adityapatel14', href: GITHUB_URL },
      ];

    case 'linkedin':
      return [
        { type: 'link', content: '  ◈  linkedin.com/in/aditya-kaushik-patel', href: LINKEDIN_URL },
      ];

    case 'resume':
      return [
        { type: 'text', content: '  CV is ready to view / download —' },
        { type: 'link', content: '  📄  Open Resume on Google Drive', href: CV_URL },
      ];

    case 'hire':
      return [
        { type: 'accent', content: '  Great choice. 🤝' },
        { type: 'blank' },
        { type: 'text',   content: '  Two ways to get started:' },
        { type: 'link',   content: '  →  Connect on LinkedIn', href: LINKEDIN_URL },
        { type: 'link',   content: '  →  Download my Resume',  href: CV_URL },
        { type: 'blank' },
        { type: 'muted',  content: '  Open to full-time & contract roles.' },
        { type: 'muted',  content: '  Remote / Hybrid · Mumbai' },
      ];

    case 'whoami':
      return [
        { type: 'accent', content: '  Aspiring Data Analyst | Junior Data Analyst' },
        { type: 'blank' },
        { type: 'text',   content: '  You are: visitor — welcome to the portfolio.' },
        { type: 'muted',  content: '  Pro tip: type "hire" to get in touch.' },
      ];

    case 'echo':
      if (!args) return [{ type: 'error', content: '  Usage: echo <text>' }];
      return [{ type: 'text', content: `  ${args}` }];

    case 'clear':
      return [{ type: '__clear__' }];

    default:
      return [
        { type: 'error', content: `  bash: ${cmd}: command not found` },
        { type: 'muted', content: '  Type "help" for available commands.' },
      ];
  }
}

// ── Line renderer ─────────────────────────────────────────────────────────────
function OutputLine({ line, idx }) {
  const base = { fontFamily: 'JetBrains Mono, monospace', fontSize: 11, lineHeight: 1.75 };

  switch (line.type) {
    case 'accent':
      return <div style={{ ...base, color: '#00ffaa', fontWeight: 700 }}>{line.content}</div>;

    case 'text':
      return <div style={{ ...base, color: '#ccc' }}>{line.content}</div>;

    case 'muted':
      return <div style={{ ...base, color: '#555' }}>{line.content}</div>;

    case 'error':
      return <div style={{ ...base, color: '#ff4466' }}>{line.content}</div>;

    case 'blank':
      return <div style={{ height: 5 }} />;

    case 'divider':
      return <div style={{ ...base, color: '#222', userSelect: 'none' }}>
        {'─'.repeat(44)}
      </div>;

    case 'label':
      return <div style={{
        ...base, color: '#00ffaa', fontSize: 9,
        letterSpacing: '0.15em', marginTop: 2, marginBottom: 2,
      }}>
        {line.content}
      </div>;

    case 'row':
      return (
        <div style={{ ...base, display: 'flex' }}>
          <span style={{ color: '#00ffaa', minWidth: 82 }}>{line.key}</span>
          <span style={{ color: '#444' }}>— </span>
          <span style={{ color: '#666' }}>{line.val}</span>
        </div>
      );

    case 'bar': {
      const filled = Math.round(line.pct / 10);
      const empty  = 10 - filled;
      const isAdv  = line.level === 'ADVANCED';
      return (
        <div style={{ ...base, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#555', display: 'inline-block', width: 74 }}>
            {line.skill}
          </span>
          <span style={{ color: isAdv ? '#00ffaa' : '#4488ff', letterSpacing: 1 }}>
            {'▓'.repeat(filled)}
          </span>
          <span style={{ color: '#1e1e1e', letterSpacing: 1 }}>
            {'░'.repeat(empty)}
          </span>
          <span style={{ color: '#666' }}>{line.pct}%</span>
          <span style={{
            color: isAdv ? '#00ffaa55' : '#4488ff55',
            fontSize: 8, letterSpacing: '0.08em',
          }}>
            {line.level}
          </span>
        </div>
      );
    }

    case 'project':
      return (
        <div style={{ marginBottom: 6 }}>
          <div style={{ ...base, display: 'flex', gap: 8 }}>
            <span style={{ color: '#00ffaa' }}>[{line.num}]</span>
            <span style={{ color: '#e8e8e8', fontWeight: 600 }}>{line.title}</span>
          </div>
          <div style={{ ...base, color: '#555', paddingLeft: 36 }}>{line.desc}</div>
        </div>
      );

    case 'link':
      return (
        <a
          href={line.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...base,
            display: 'block',
            color: '#4488ff',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#66aaff'}
          onMouseLeave={e => e.currentTarget.style.color = '#4488ff'}
        >
          {line.content}
        </a>
      );

    default:
      return null;
  }
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Terminal() {
  const [history,    setHistory]    = useState([{ input: null, output: WELCOME }]);
  const [input,      setInput]      = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef    = useRef(null);
  const containerRef = useRef(null);

  // Scroll ONLY the terminal container — never the page
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = () => {
    const raw    = input.trim();
    const output = processCommand(raw);

    if (output[0]?.type === '__clear__') {
      setHistory([{ input: null, output: WELCOME }]);
      setInput('');
      setHistoryIdx(-1);
      return;
    }

    setHistory(prev => [...prev, { input: raw, output }]);
    if (raw) setCmdHistory(prev => [raw, ...prev]);
    setHistoryIdx(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Capture Enter — prevent ANY page scroll or form submit
      e.preventDefault();
      e.stopPropagation();
      runCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    }
  };

  return (
    <div
      className="dashboard-card"
      style={{ padding: 0, overflow: 'hidden', animation: 'fadeInUp 0.8s 0.2s ease both' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Window chrome ──────────────────────────────────────────────── */}
      <div style={{
        background: '#111', padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid #1e1e1e',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff4466' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffcc00' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ffaa' }} />
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
          color: '#444', marginLeft: 8, flex: 1,
        }}>
          visitor@portfolio:~
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
          color: '#2a2a2a', letterSpacing: '0.08em',
        }}>
          INTERACTIVE
        </span>
      </div>

      {/* ── Output area (scrolls internally only) ───────────────────── */}
      <div
        ref={containerRef}
        style={{
          padding: '14px 18px',
          minHeight: 280,
          maxHeight: 360,
          overflowY: 'auto',
          background: '#080808',
          cursor: 'text',
          scrollbarWidth: 'thin',
          scrollbarColor: '#00ffaa22 transparent',
        }}
      >
        {history.map((entry, ei) => (
          <div key={ei} style={{ marginBottom: entry.output.length ? 6 : 0 }}>
            {/* Typed command echo */}
            {entry.input !== null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11, color: '#00ffaa', flexShrink: 0,
                }}>
                  {PROMPT}
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11, color: '#e8e8e8',
                }}>
                  {entry.input}
                </span>
              </div>
            )}
            {entry.output.map((line, li) => (
              <OutputLine key={li} line={line} idx={li} />
            ))}
          </div>
        ))}

        {/* ── Input row — NO <form> wrapper to avoid submit/scroll side effects ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, color: '#00ffaa', flexShrink: 0,
          }}>
            {PROMPT}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            style={{
              background: 'transparent',
              border:     'none',
              outline:    'none',
              color:      '#e8e8e8',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize:   11,
              flex:       1,
              caretColor: '#00ffaa',
              width:      '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
}
