// Shared BagIQ components used across landing variations.
// Now matches the real product UI captured from app screenshots.

const SAMPLE_DISCS = [
  // x = speed (1-14), y = stability (-3..+3). Matches the real Chaos bag screenshot.
  { id: 'aviar',  initial: 'A',     cat: 'putter',   speed: 2.5, stab:  0.0, locked: true, warn: false },
  { id: 'omega',  initial: 'O',     cat: 'putter',   speed: 2.5, stab: -0.5, locked: true, warn: false },
  { id: 'zone',   initial: 'ZONE',  cat: 'midrange', speed: 4,   stab:  2.6, locked: false, warn: true,  sub: 'OS APP' },
  { id: 'glitch', initial: 'G',     cat: 'midrange', speed: 4.6, stab:  2.4, locked: true, warn: true },
  { id: 'cc',     initial: 'CC',    cat: 'midrange', speed: 5,   stab:  0.2, locked: false, warn: false },
  { id: 'c',      initial: 'C',     cat: 'fairway',  speed: 6,   stab:  0.0, locked: false, warn: true },
  { id: 'l',      initial: 'L',     cat: 'fairway',  speed: 6.2, stab: -0.6, locked: false, warn: false },
  { id: 'tb',     initial: 'TB',    cat: 'fairway',  speed: 7,   stab:  1.8, locked: true, warn: true },
  { id: 'xxx',    initial: 'XXX',   cat: 'fairway',  speed: 7,   stab:  2.6, locked: false, warn: false },
  { id: 'w',      initial: 'W',     cat: 'driver',   speed: 10.6, stab: 1.7, locked: false, warn: false },
];

const CAT_COLOR = {
  putter:   { fill: '#27AE60', text: '#fff' },
  midrange: { fill: '#3498DB', text: '#fff' },
  fairway:  { fill: '#E67E22', text: '#fff' },
  driver:   { fill: '#7C0236', text: '#fff' },
};

// Gap "+" markers (dashed circle with label)
const SAMPLE_GAPS = [
  { speed: 7.5, stab:  2.3, label: 'OS FW', sub: 'overstable fairway' },
  { speed: 9.5, stab: -1.5, label: 'US DRV', sub: 'understable driver' },
];

window.SAMPLE_DISCS = SAMPLE_DISCS;
window.SAMPLE_GAPS = SAMPLE_GAPS;

// ===========================================================================
// BagMap — accurate to the real Chaos bag screenshot
// ===========================================================================
function BagMap({
  discs = SAMPLE_DISCS,
  gaps = SAMPLE_GAPS,
  width = 620,
  height = 460,
  showFilters = true,
  showLegend = true,
  highlightGap = null, // {speed, stab} to add an extra pulsing ring
  compact = false,
}) {
  const [filter, setFilter] = React.useState('all');
  const W = width;
  const H = height;
  const PAD = { l: 64, r: 32, t: compact ? 36 : 56, b: 56 };

  const xMin = 1, xMax = 14;
  const yMin = -3, yMax = 3;

  const xScale = (s) => PAD.l + ((s - xMin) / (xMax - xMin)) * (W - PAD.l - PAD.r);
  const yScale = (y) => PAD.t + ((yMax - y) / (yMax - yMin)) * (H - PAD.t - PAD.b);

  const xTicks = [1, 4, 7, 10, 14];
  const yTicks = [3, 1, 0, -1, -3];

  const visible = (d) => filter === 'all' || d.cat === filter;
  const filteredDiscs = discs.filter(visible);

  const baseSize = compact ? 22 : 30;

  return (
    <div className="b-bag-map" style={{ width: '100%' }}>
      {showFilters && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 16, color: '#111' }}>Bag Map</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[['all', 'All', '#111'], ['putter', 'Putter', '#27AE60'], ['midrange', 'Midrange', '#3498DB'], ['fairway', 'Fairway', '#E67E22'], ['driver', 'Driver', '#7C0236']].map(([k, label, dot]) => (
              <button key={k} onClick={() => setFilter(k)} style={{
                padding: '4px 10px 4px 8px',
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 999,
                background: filter === k ? '#7C0236' : '#FBF7F0',
                color: filter === k ? '#fff' : '#4A4842',
                border: filter === k ? '1px solid #7C0236' : '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: dot, opacity: filter === k ? 1 : 1 }} />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', background: '#FBF7F0', borderRadius: 14, border: '1px solid var(--border)' }}>
        {/* gridlines */}
        {xTicks.map((t, i) => (
          <line key={'gv' + i} x1={xScale(t)} y1={PAD.t} x2={xScale(t)} y2={H - PAD.b} stroke="#ECE0CC" strokeWidth="1" strokeDasharray="2 3" />
        ))}
        {yTicks.map((t, i) => (
          <line key={'gh' + i} x1={PAD.l} y1={yScale(t)} x2={W - PAD.r} y2={yScale(t)} stroke={t === 0 ? '#D9CCB8' : '#ECE0CC'} strokeWidth="1" strokeDasharray={t === 0 ? '0' : '2 3'} />
        ))}

        {/* axis labels */}
        {xTicks.map((t, i) => (
          <text key={'xt' + i} x={xScale(t)} y={H - PAD.b + 20} fill="#8A8478" fontSize="13" textAnchor="middle" fontFamily="Inter" fontWeight="500">{t}</text>
        ))}
        {yTicks.map((t, i) => {
          if (t === 0 || t === 1) return null;
          return <text key={'yt' + i} x={PAD.l - 14} y={yScale(t) + 5} fill="#8A8478" fontSize="13" textAnchor="end" fontFamily="Inter" fontWeight="500">{t > 0 ? '+' + t : t}</text>;
        })}

        {/* axis title */}
        <text x={PAD.l - 36} y={(PAD.t + H - PAD.b) / 2} fill="#4A4842" fontSize="11" fontWeight="800" letterSpacing="0.14em" textAnchor="middle" fontFamily="Inter" transform={`rotate(-90, ${PAD.l - 36}, ${(PAD.t + H - PAD.b) / 2})`}>STABILITY</text>
        <text x={(PAD.l + W - PAD.r) / 2} y={H - 14} fill="#4A4842" fontSize="11" fontWeight="800" letterSpacing="0.14em" textAnchor="middle" fontFamily="Inter">SPEED →</text>

        {/* gap "+" markers */}
        {gaps.map((g, i) => {
          const cx = xScale(g.speed);
          const cy = yScale(g.stab);
          return (
            <g key={'gap' + i}>
              <circle cx={cx} cy={cy} r={baseSize + 8} fill="rgba(211,47,47,0.05)" stroke="#D32F2F" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
              <circle cx={cx} cy={cy} r={baseSize} fill="rgba(211,47,47,0.07)" stroke="rgba(211,47,47,0.35)" strokeWidth="1" strokeDasharray="3 3" />
              <text x={cx} y={cy - 2} fill="#B12A2A" fontSize={compact ? 14 : 20} fontWeight="600" textAnchor="middle" fontFamily="Inter">+</text>
              <text x={cx} y={cy + 12} fill="#B12A2A" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="Inter" letterSpacing="0.06em">{g.label}</text>
            </g>
          );
        })}

        {/* discs */}
        {filteredDiscs.map((d) => {
          const cx = xScale(d.speed);
          const cy = yScale(d.stab);
          const c = CAT_COLOR[d.cat];
          const r = baseSize;
          const labelSize = d.initial.length > 2 ? 11 : 14;
          return (
            <g key={d.id}>
              {/* warning bubble — small grey circle above */}
              {d.warn && !compact && (
                <g>
                  <circle cx={cx} cy={cy - r - 6} r="8" fill="#8A8478" />
                  <text x={cx} y={cy - r - 3} fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="Inter">!</text>
                </g>
              )}
              {/* lock badge */}
              {d.locked && !compact && (
                <g>
                  <circle cx={cx + r - 4} cy={cy + r - 4} r="9" fill="#27AE60" stroke="#fff" strokeWidth="1.5" />
                  <path d={`M ${cx + r - 8} ${cy + r - 5} v -2 a 4 4 0 0 1 8 0 v 2`} fill="none" stroke="#fff" strokeWidth="1.2" />
                  <rect x={cx + r - 8} y={cy + r - 5} width="8" height="6" rx="1.5" fill="#fff" />
                </g>
              )}
              <circle cx={cx} cy={cy} r={r} fill={c.fill} stroke="#fff" strokeWidth="2.5" className="b-shot-dot" />
              <text x={cx} y={cy + (labelSize === 11 ? 4 : 5)} fill={c.text} fontSize={labelSize} fontWeight="800" textAnchor="middle" fontFamily="Manrope" letterSpacing="-0.01em">{d.initial}</text>
              {d.sub && !compact && <text x={cx} y={cy + r + 12} fill="#7C0236" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="Inter" letterSpacing="0.04em">{d.sub}</text>}
            </g>
          );
        })}
      </svg>

      {showLegend && (
        <div style={{ marginTop: 10, fontSize: 12, color: '#8A8478', textAlign: 'center' }}>
          Tap <span style={{ color: '#B12A2A', fontWeight: 800 }}>+</span> zones to see recommendations. Big discs are the ones you trust and use.
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// BagIdentityBanner — maroon gradient with coverage progress bar
// ===========================================================================
function BagIdentityBanner({ name = 'Chaos bag', tagline = 'There are useful discs in here, but too many are arguing for the same job.', coverage = 78 }) {
  return (
    <div style={{
      background: 'linear-gradient(95deg, #7C0236 0%, #A8174F 100%)',
      color: '#fff',
      padding: '18px 22px 20px',
      borderRadius: 14,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 22, position: 'relative' }}>{name}</div>
      <div style={{ marginTop: 4, fontSize: 13, opacity: 0.86, position: 'relative' }}>{tagline}</div>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.9 }}>
        <span>Coverage</span>
        <span>{coverage}%</span>
      </div>
      <div style={{ marginTop: 6, height: 8, background: 'rgba(255,255,255,0.18)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${coverage}%`, background: '#fff', borderRadius: 999 }} />
      </div>
    </div>
  );
}

// ===========================================================================
// StatsRow — Coverage / Gaps / Overlap / Bag tiles
// ===========================================================================
function StatsRow({ coverage = 78, gaps = 3, overlap = 4, bag = 11, compact = false }) {
  const items = [
    { k: 'Coverage', v: coverage + '%', sub: 'Functional slots covered', accent: true },
    { k: 'Gaps',     v: gaps,           sub: 'Shots missing' },
    { k: 'Overlap',  v: overlap,        sub: 'Maybe too many cooks' },
    { k: 'Bag',      v: bag,            sub: 'Discs saved locally' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: compact ? '10px 12px' : '14px 16px',
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 12,
        }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#8A8478', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{it.k}</div>
          <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: compact ? 22 : 28, color: it.accent ? '#7C0236' : '#111', marginTop: 2, letterSpacing: '-0.02em' }}>{it.v}</div>
          {!compact && <div style={{ fontSize: 11, color: '#8A8478', marginTop: 2 }}>{it.sub}</div>}
        </div>
      ))}
    </div>
  );
}

// ===========================================================================
// FlightChips — Speed/Glide/Turn/Fade colored squares as in app
// ===========================================================================
function FlightChips({ speed = 4, glide = 3, turn = 0, fade = 3 }) {
  const items = [
    { k: 'SPEED', v: speed, bg: '#E67E22' },
    { k: 'GLIDE', v: glide, bg: '#3498DB' },
    { k: 'TURN',  v: turn,  bg: '#9B59B6' },
    { k: 'FADE',  v: fade,  bg: '#27AE60' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          background: it.bg,
          color: '#fff',
          borderRadius: 8,
          padding: '6px 4px 8px',
          textAlign: 'center',
          boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15)',
        }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', opacity: 0.92 }}>{it.k}</div>
          <div style={{ fontFamily: 'Manrope', fontSize: 18, fontWeight: 800, lineHeight: 1.1, marginTop: 1 }}>{it.v}</div>
        </div>
      ))}
    </div>
  );
}

// ===========================================================================
// RecommendationCard — matches the right sidebar in the real app
// ===========================================================================
function RecommendationCard({
  initial = 'ZO',
  brand = 'Discraft',
  name = 'Zone',
  category = 'Midrange',
  stability = 'overstable',
  flight = { speed: 4, glide: 3, turn: 0, fade: 3 },
  body = 'This gives you a safer forehand option in wind.',
  discListNo = '#16',
  tags = ['Assured Fade', 'Headwind Safe', 'Utility Fade'],
  cta = true,
}) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
      {/* hero panel with stability tag */}
      <div style={{
        background: 'linear-gradient(180deg, #DBEAF5 0%, #BDD9EE 100%)',
        padding: '14px 16px 18px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          fontSize: 10, fontWeight: 800, color: '#1F6FA8', letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>{stability}</div>
        <div style={{
          width: 76, height: 76, borderRadius: 999,
          background: '#fff', color: '#3498DB',
          margin: '8px auto 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Manrope', fontWeight: 800, fontSize: initial.length > 2 ? 22 : 28,
          boxShadow: '0 6px 14px rgba(31,111,168,0.18)',
        }}>{initial}</div>
        <div style={{ fontSize: 11, color: '#4A4842', fontWeight: 600 }}>{brand}</div>
        <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 22, marginTop: 2 }}>{name}</div>
        <div style={{ fontSize: 12, color: '#4A4842', marginTop: 1 }}>{category}</div>
      </div>

      <div style={{ padding: '14px 14px 16px' }}>
        <FlightChips {...flight} />
        <p style={{ fontSize: 13, color: '#4A4842', marginTop: 12, lineHeight: 1.5 }}>{body}</p>

        <a href="#" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginTop: 10,
          padding: '5px 10px',
          background: '#F7F1E8',
          border: '1px solid var(--border)',
          borderRadius: 8,
          fontSize: 12, color: '#7C0236', fontWeight: 700,
        }}>DiscList {discListNo} →</a>

        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tags.map((t, i) => (
            <span key={i} style={{
              padding: '4px 10px', borderRadius: 6,
              border: '1px solid var(--border)',
              fontSize: 11, fontWeight: 700, color: '#4A4842',
            }}>{t}</span>
          ))}
          <span style={{
            padding: '4px 8px', borderRadius: 6,
            border: '1px solid var(--border)',
            fontSize: 11, fontWeight: 700, color: '#8A8478',
          }}>?</span>
        </div>

        {cta && (
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="b-pill b-pill-p" style={{ width: '100%', height: 44, fontSize: 14 }}>Where to buy</button>
            <button className="b-pill b-pill-o" style={{ width: '100%', height: 44, fontSize: 14 }}>+ Add to bag</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ===========================================================================
// GapCallout / OverlapCallout — pink and orange callout bars under the map
// ===========================================================================
function GapCallout({ title, body }) {
  return (
    <div style={{
      padding: '12px 16px 14px',
      background: 'rgba(211,47,47,0.06)',
      border: '1px solid rgba(211,47,47,0.18)',
      borderLeft: '4px solid #D32F2F',
      borderRadius: 10,
    }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: '#B12A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Gap</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{title}</div>
      <div style={{ fontSize: 13, color: '#4A4842', marginTop: 3 }}>{body}</div>
    </div>
  );
}

function OverlapCallout({ title, body }) {
  return (
    <div style={{
      padding: '12px 16px 14px',
      background: 'rgba(230,126,34,0.08)',
      border: '1px solid rgba(230,126,34,0.22)',
      borderLeft: '4px solid #E67E22',
      borderRadius: 10,
    }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: '#C66510', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Overlap</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{title}</div>
      <div style={{ fontSize: 13, color: '#4A4842', marginTop: 3 }}>{body}</div>
    </div>
  );
}

// ===========================================================================
// DetoxCard — single disc card with Keep / Remove / Lock buttons
// ===========================================================================
function DetoxCard({ initial, name, brand, note, flight, isKeep, isRemove }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: '#E67E22', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Manrope', fontWeight: 800, fontSize: 13,
        }}>{initial}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 17 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#4A4842', marginTop: 1 }}>{note}</div>
        </div>
      </div>
      <FlightChips {...flight} />
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <button style={{
          height: 36, borderRadius: 999,
          border: `1.5px solid ${isKeep ? '#27AE60' : 'var(--border)'}`,
          background: isKeep ? 'rgba(39,174,96,0.08)' : '#fff',
          color: isKeep ? '#1B7B40' : '#4A4842',
          fontWeight: 700, fontSize: 13,
        }}>Keep</button>
        <button style={{
          height: 36, borderRadius: 999,
          border: `1.5px solid ${isRemove ? '#D32F2F' : 'var(--border)'}`,
          background: isRemove ? 'rgba(211,47,47,0.08)' : '#fff',
          color: isRemove ? '#B12A2A' : '#4A4842',
          fontWeight: 700, fontSize: 13,
        }}>Remove</button>
        <button style={{
          height: 36, borderRadius: 999,
          border: '1.5px solid var(--border)', background: '#fff',
          color: '#4A4842', fontWeight: 700, fontSize: 13,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 5 V 3.5 a 3 3 0 0 1 6 0 V 5" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2.5" y="5" width="7" height="5.2" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
          Lock
        </button>
      </div>
    </div>
  );
}

// ===========================================================================
// BagIdentityChip — animated chip cycling through identity strings
// ===========================================================================
function BagIdentityChip({ phrases, interval = 2400 }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % phrases.length), interval);
    return () => clearInterval(id);
  }, [phrases, interval]);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '7px 16px 7px 14px',
      background: 'rgba(124, 2, 54, 0.08)',
      color: '#7C0236',
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '-0.005em',
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: 999, background: '#7C0236',
        animation: 'b-pulse 1.6s ease-out infinite',
      }} />
      <span key={idx} style={{ animation: 'b-fade-in .35s ease' }}>{phrases[idx]}</span>
      <style>{`
        @keyframes b-pulse { 0%{box-shadow:0 0 0 0 rgba(124,2,54,0.5)} 70%{box-shadow:0 0 0 8px rgba(124,2,54,0)} 100%{box-shadow:0 0 0 0 rgba(124,2,54,0)} }
        @keyframes b-fade-in { from{opacity:0;transform:translateY(2px)} to{opacity:1;transform:none} }
      `}</style>
    </span>
  );
}

// ===========================================================================
// Footer — shared product footer
// ===========================================================================
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 0',
      background: '#fff',
    }}>
      <div className="b-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontSize: 13, color: '#4A4842' }}>
          Powered by <a href="#" style={{ color: '#7C0236', fontWeight: 700, borderBottom: '1px solid currentColor' }}>DiscList™</a> data. Built by <a href="#" style={{ color: '#7C0236', fontWeight: 700, borderBottom: '1px solid currentColor' }}>Golf With Discs</a>.
        </div>
        <div style={{ fontSize: 13, color: '#8A8478', display: 'flex', gap: 18 }}>
          <a href="#">Licensing</a>
          <a href="#">Privacy</a>
          <a href="#">hello@bagiq.app</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  BagMap, BagIdentityBanner, StatsRow, FlightChips, RecommendationCard,
  GapCallout, OverlapCallout, DetoxCard, BagIdentityChip, Footer,
});
