// bagiq.app — Variation 4: Combined (V1 hero + V2 features + Detox + Powered by DiscList + V1 how-it-works)
// Built per spec: hero & trust pill from V1, three-question section from V2 with accurate
// mini visuals (gap markers, overlaps, DiscList picks list), then Detox, DiscList split,
// then the V1 "Three steps. Two minutes." block.

function BagiqV4() {
  return (
    <div className="bagiq-page" style={{ background: '#FDF9F4' }}>
      {/* nav */}
      <nav style={{
        padding: '22px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: 1280, margin: '0 auto',
      }}>
        <img src="assets/logo.png" alt="BagIQ" style={{ height: 36 }} />
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', fontSize: 14, fontWeight: 500 }}>
          <a href="#bagmap" style={{ color: '#4A4842' }}>The Bag Map</a>
          <a href="#detox" style={{ color: '#4A4842' }}>Disc Detox</a>
          <a href="#how" style={{ color: '#4A4842' }}>How it works</a>
          <a href="#faq" style={{ color: '#4A4842' }}>FAQ</a>
          <button className="b-pill b-pill-p b-pill-sm">Launch BagIQ →</button>
        </div>
      </nav>

      {/* HERO — V1 — centered */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="b-container-narrow" style={{ textAlign: 'center' }}>
          <BagIdentityChip phrases={[
            'Overstable-heavy bag missing a reliable straight flyer',
            'Putter-heavy bag with no controlled fairway',
            'Backhand-only bag missing a forehand line',
            'Distance-loaded bag with no touch upshot',
          ]} />

          <h1 style={{ fontSize: 84, marginTop: 22, letterSpacing: '-0.035em', lineHeight: 0.95 }}>
            Fix your bag<br />in under a minute.
          </h1>

          <p style={{ fontSize: 20, color: '#4A4842', maxWidth: 600, margin: '24px auto 0', lineHeight: 1.45 }}>
            BagIQ spots gaps, overlap, and the exact disc that fixes it.
            Based on how you actually throw, not what the disc says it should do.
          </p>

          <div style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="b-pill b-pill-p">Launch BagIQ →</button>
            <button className="b-pill b-pill-o">See a sample bag</button>
          </div>

          <div style={{ marginTop: 32, display: 'inline-flex', justifyContent: 'center', gap: 0, flexWrap: 'wrap', padding: '12px 22px', background: '#fff', border: '1px solid var(--border)', borderRadius: 999, boxShadow: '0 2px 6px rgba(20,10,0,0.04)' }}>
            {[['Free', 'forever'], ['No account', 'no signup'], ['Any device', 'mobile, tablet, desktop']].map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px', borderLeft: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: '#27AE60', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 14, color: '#111', fontWeight: 700 }}>{k}</span>
                <span style={{ fontSize: 12, color: '#8A8478' }}>· {v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Centered product preview */}
        <div id="bagmap" style={{ maxWidth: 1080, margin: '64px auto 0', padding: '0 40px' }}>
          <div style={{
            background: '#fff', border: '1px solid var(--border)', borderRadius: 22,
            padding: 24,
            boxShadow: '0 30px 80px rgba(20,10,0,0.10), 0 4px 12px rgba(20,10,0,0.04)',
            display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 22,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <BagIdentityBanner />
              <BagMap width={620} height={400} />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#7C0236', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Fill the gap</div>
              <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 18, color: '#111', marginBottom: 4 }}>safe forehand approach</div>
              <p style={{ fontSize: 13, color: '#4A4842', marginBottom: 14, lineHeight: 1.5 }}>This stops you trying to force a touchy disc into a windy approach. Closest option is the Omega, but you do not fully trust it for this job.</p>
              <RecommendationCard />
            </div>
          </div>
        </div>
      </section>

      <hr className="b-hr" />

      {/* THREE CORE FEATURES — from V2 */}
      <section style={{ padding: '110px 0' }}>
        <div className="b-container">
          <div style={{ marginBottom: 56, maxWidth: 760 }}>
            <p className="b-eyebrow">Decision engine, not inventory tracker</p>
            <h2 style={{ fontSize: 52, marginTop: 12 }}>BagIQ answers three questions every disc golfer asks.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
            <V4FeatureCard
              tag="Gap analysis" tagClass="b-flight-gap"
              title="What's missing?"
              body="Your bag has shots you cannot reliably make. BagIQ tells you which slot is empty and what kind of disc fills it."
              visual={<MissingMapVisual />}
              caption="Pink + markers show shots your bag can't cover."
            />
            <V4FeatureCard
              tag="Overlap" tagClass="b-flight-speed"
              title="What's redundant?"
              body="Two discs doing the same job? Disc Detox compares them side by side so you know which one to keep."
              visual={<OverlapMapVisual />}
              caption="Two discs in the same slot get flagged for Detox."
            />
            <V4FeatureCard
              tag="Next disc" tagClass="b-flight-fade"
              title="What should I buy?"
              body="DiscList™ picks based on how you actually throw — with live retailer stock and price."
              visual={<DiscListPicksVisual />}
              caption="One disc per gap, sourced from DiscList rankings."
            />
          </div>
        </div>
      </section>

      {/* DISC DETOX SECTION — from V2 */}
      <section id="detox" style={{ background: '#111', color: '#fff', padding: '110px 0' }}>
        <div className="b-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F9447D' }}>Disc Detox</p>
              <h2 style={{ fontSize: 56, marginTop: 14, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                Two discs.<br />One slot.
              </h2>
              <p style={{ marginTop: 24, fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 460 }}>
                Carrying two discs that do the same job is the most common bag mistake.
                Disc Detox stacks any pair side by side — same flight class, same stability — so you can decide which one earns its place, and which one rides the bench.
              </p>

              <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '14px 18px', maxWidth: 480 }}>
                {[
                  ['◐', 'Conservative mode', 'Only nudges obvious duplicates and protects trusted discs.'],
                  ['◑', 'Aggressive mode',   'Tightens further — flags anything that looks like a near-duplicate.'],
                  ['◒', 'Lock favourites',   'Mark the disc you will never drop; Detox works around it.'],
                ].map(([ic, t, d], i) => (
                  <React.Fragment key={i}>
                    <div style={{ color: '#F9447D', fontSize: 18, lineHeight: '24px' }}>{ic}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{t}</div>
                      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{d}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Detox mock */}
            <div style={{ background: '#FBF7F0', borderRadius: 22, padding: 22, boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
              <div style={{ color: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <h3 style={{ fontSize: 26, color: '#111' }}>Disc Detox</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ padding: '4px 12px', borderRadius: 999, background: '#7C0236', color: '#fff', fontSize: 12, fontWeight: 700 }}>Conservative</span>
                  <span style={{ padding: '4px 12px', borderRadius: 999, background: '#fff', color: '#4A4842', fontSize: 12, fontWeight: 700, border: '1px solid var(--border)' }}>Aggressive</span>
                </div>
              </div>
              <div style={{ color: '#4A4842', fontSize: 13, marginBottom: 14 }}>These discs do the same job.</div>

              <OverlapCallout title="These discs overlap" body="You marked both for similar jobs, and they land in the same part of the map. You probably do not need both." />

              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <DetoxCard
                  initial="TB"
                  name="TeeBird"
                  note="You trust this one more"
                  flight={{ speed: 7, glide: 5, turn: 0, fade: 2 }}
                  isKeep
                />
                <DetoxCard
                  initial="L"
                  name="Leopard"
                  note="This one rarely gets used"
                  flight={{ speed: 7, glide: 5, turn: 0, fade: 2 }}
                  isRemove
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POWERED BY DISCLIST — from V2 */}
      <section style={{ background: '#F7F1E8', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '110px 0' }}>
        <div className="b-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <p className="b-eyebrow">Built on real data</p>
            <h2 style={{ fontSize: 44, marginTop: 12 }}>Powered by DiscList™.</h2>
            <p style={{ marginTop: 22, color: '#4A4842', fontSize: 16, lineHeight: 1.6 }}>
              BagIQ is powered by DiscList, the same data behind The DiscList weekly rankings. Recommendations are based on flight classification, capability tags, and real player data. Not guesswork. Not paid placements.
            </p>
            <p style={{ marginTop: 16, fontSize: 13, color: '#8A8478', maxWidth: 460 }}>
              The affiliate star (★) shows when we earn a small commission. It never affects which disc we recommend.
            </p>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#8A8478', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Top fixes for your Speed 9 gap</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <V4FixRow rank="01" badge="★ TOP" brand="Latitude 64" name="River" classification="True Flight" classClr="#3498DB" price="£14" stock="In stock · 3 retailers" />
              <V4FixRow rank="02" brand="Innova" name="Leopard3" classification="Progressive Turn" classClr="#B47ED4" price="£12" stock="In stock · 2 retailers" />
              <V4FixRow rank="03" brand="Discraft" name="Heat" classification="Early Turn" classClr="#9B59B6" price="£15" stock="Low stock" />
            </div>
          </div>
        </div>
      </section>

      {/* THREE STEPS — from V1 */}
      <section id="how" style={{ padding: '110px 0' }}>
        <div className="b-container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="b-eyebrow">How it works</p>
            <h2 style={{ fontSize: 52, marginTop: 12 }}>Three steps. Two minutes.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              { n: '1', t: 'Add your discs', d: 'Search by name. Tap to add. Takes about 30 seconds for a full bag.' },
              { n: '2', t: 'Tell BagIQ how you throw', d: 'Forehand, backhand, high release, low and flat. Good enough is good enough.' },
              { n: '3', t: 'Get your Bag Map', d: 'A clear picture of what your bag does, what it is missing, and what disc fixes it.' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '32px 28px',
                background: '#FBF7F0',
                border: '1px solid var(--border)',
                borderRadius: 22,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 999,
                  background: '#7C0236', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Manrope', fontWeight: 800, fontSize: 18,
                  marginBottom: 20,
                }}>{s.n}</div>
                <h3 style={{ fontSize: 22 }}>{s.t}</h3>
                <p style={{ marginTop: 10, color: '#4A4842', fontSize: 14.5, lineHeight: 1.55 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAROON CTA BLOCK — final close */}
      <section style={{ background: '#7C0236', color: '#fff', padding: '110px 0' }}>
        <div className="b-container-narrow">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>Free disc golf tool</p>
          <h2 style={{ fontSize: 64, marginTop: 18, color: '#fff', letterSpacing: '-0.03em' }}>
            Most bag advice<br />is wrong.
          </h2>
          <p style={{ marginTop: 28, fontSize: 17, color: 'rgba(255,255,255,0.85)', maxWidth: 580, lineHeight: 1.55 }}>
            Not wrong in an obvious way. Wrong in the way that feels right — because it is based on flight numbers and what the disc is supposed to do, rather than what you actually do with it. BagIQ works out the difference.
          </p>

          <form style={{ marginTop: 36, display: 'flex', gap: 10, maxWidth: 520, flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1, minWidth: 240,
                height: 52, padding: '0 20px',
                borderRadius: 999, border: 0,
                background: '#fff', color: '#111',
                fontSize: 15, fontFamily: 'Inter',
              }}
            />
            <button className="b-pill b-pill-d">Join the list</button>
          </form>
          <p style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
            Occasional update on bags, discs, and BagIQ releases. Unsubscribe any time.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function V4FeatureCard({ tag, tagClass, title, body, visual, caption }) {
  return (
    <div style={{
      padding: 24, background: '#fff', border: '1px solid var(--border)',
      borderRadius: 20, boxShadow: '0 1px 2px rgba(20,10,0,0.03)',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <span className={`b-flight ${tagClass}`} style={{ alignSelf: 'flex-start' }}>{tag}</span>
      <h3 style={{ fontSize: 26 }}>{title}</h3>
      <p style={{ color: '#4A4842', fontSize: 14.5, lineHeight: 1.55 }}>{body}</p>
      <div style={{
        marginTop: 'auto',
        background: '#FBF7F0',
        borderRadius: 14,
        padding: 12,
        border: '1px solid var(--border)',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>{visual}</div>
      <div style={{ fontSize: 12, color: '#8A8478', fontStyle: 'italic' }}>{caption}</div>
    </div>
  );
}

// Mini visuals — accurate Bag Map style for each feature

function MissingMapVisual() {
  // shows discs as colored dots + dashed pink "+" gap markers in the empty slots
  const W = 300, H = 180;
  const xS = (s) => 30 + ((s - 1) / 13) * (W - 50);
  const yS = (y) => 18 + ((3 - y) / 6) * (H - 36);
  const discs = [
    { x: 3, y: 0, c: '#27AE60', l: 'A' },
    { x: 4, y: 2.5, c: '#3498DB', l: 'Z' },
    { x: 5, y: 0.2, c: '#3498DB', l: 'CC' },
    { x: 7, y: 1.5, c: '#E67E22', l: 'TB' },
    { x: 11, y: 1.6, c: '#7C0236', l: 'W' },
  ];
  const gaps = [{ x: 7.5, y: 2.5, l: 'OS FW' }, { x: 9.5, y: -1.5, l: 'US DRV' }];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
      <rect x="0" y="0" width={W} height={H} fill="#FBF7F0" rx="6" />
      {[1,4,7,10,14].map((t,i)=>(<line key={'v'+i} x1={xS(t)} y1="18" x2={xS(t)} y2={H-18} stroke="#ECE0CC" strokeDasharray="2 3" />))}
      <line x1="30" y1={yS(0)} x2={W-20} y2={yS(0)} stroke="#D9CCB8" />
      {/* gap "+" markers */}
      {gaps.map((g, i) => (
        <g key={'gap' + i}>
          <circle cx={xS(g.x)} cy={yS(g.y)} r="20" fill="rgba(211,47,47,0.06)" stroke="#D32F2F" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={xS(g.x)} y={yS(g.y) + 1} fontSize="16" fill="#B12A2A" textAnchor="middle" fontWeight="500">+</text>
          <text x={xS(g.x)} y={yS(g.y) + 14} fontSize="8" fill="#B12A2A" textAnchor="middle" fontWeight="800" fontFamily="Inter" letterSpacing="0.04em">{g.l}</text>
        </g>
      ))}
      {/* discs */}
      {discs.map((d, i) => (
        <g key={i}>
          <circle cx={xS(d.x)} cy={yS(d.y)} r="13" fill={d.c} stroke="#fff" strokeWidth="2" />
          <text x={xS(d.x)} y={yS(d.y) + 4} fontSize="11" fill="#fff" textAnchor="middle" fontWeight="800" fontFamily="Manrope">{d.l}</text>
        </g>
      ))}
      <text x={W/2} y={H-4} fontSize="9" fill="#4A4842" textAnchor="middle" fontWeight="800" letterSpacing="0.14em" fontFamily="Inter">SPEED →</text>
    </svg>
  );
}

function OverlapMapVisual() {
  const W = 300, H = 180;
  const xS = (s) => 30 + ((s - 1) / 13) * (W - 50);
  const yS = (y) => 18 + ((3 - y) / 6) * (H - 36);
  // two overlap clusters
  const pairs = [
    [{ x: 4, y: 2.5, c: '#3498DB', l: 'Z' }, { x: 4.6, y: 2.3, c: '#3498DB', l: 'G' }],
    [{ x: 7, y: 1.5, c: '#E67E22', l: 'TB' }, { x: 6.2, y: -0.5, c: '#E67E22', l: 'L' }],
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
      <rect x="0" y="0" width={W} height={H} fill="#FBF7F0" rx="6" />
      {[1,4,7,10,14].map((t,i)=>(<line key={'v'+i} x1={xS(t)} y1="18" x2={xS(t)} y2={H-18} stroke="#ECE0CC" strokeDasharray="2 3" />))}
      <line x1="30" y1={yS(0)} x2={W-20} y2={yS(0)} stroke="#D9CCB8" />
      {/* overlap halo for first pair */}
      <ellipse cx={xS(4.3)} cy={yS(2.4)} rx="24" ry="18" fill="rgba(230,126,34,0.08)" stroke="#E67E22" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* extra single disc — putter */}
      <circle cx={xS(3)} cy={yS(0)} r="13" fill="#27AE60" stroke="#fff" strokeWidth="2" />
      <text x={xS(3)} y={yS(0) + 4} fontSize="11" fill="#fff" textAnchor="middle" fontWeight="800" fontFamily="Manrope">A</text>
      <circle cx={xS(11)} cy={yS(1.6)} r="13" fill="#7C0236" stroke="#fff" strokeWidth="2" />
      <text x={xS(11)} y={yS(1.6) + 4} fontSize="11" fill="#fff" textAnchor="middle" fontWeight="800" fontFamily="Manrope">W</text>
      {/* the overlapping pair */}
      {pairs[0].map((d, i) => (
        <g key={'pa'+i}>
          <circle cx={xS(d.x)} cy={yS(d.y)} r="13" fill={d.c} stroke="#fff" strokeWidth="2" />
          <text x={xS(d.x)} y={yS(d.y) + 4} fontSize="11" fill="#fff" textAnchor="middle" fontWeight="800" fontFamily="Manrope">{d.l}</text>
        </g>
      ))}
      <text x={xS(4.3)} y={yS(2.4) - 22} fontSize="9" fill="#C66510" textAnchor="middle" fontWeight="800" letterSpacing="0.06em" fontFamily="Inter">OVERLAP</text>
      <text x={W/2} y={H-4} fontSize="9" fill="#4A4842" textAnchor="middle" fontWeight="800" letterSpacing="0.14em" fontFamily="Inter">SPEED →</text>
    </svg>
  );
}

function DiscListPicksVisual() {
  // matches the "DiscList™ picks for your gaps" card style from the user's reference
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
      <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 13, color: '#111', marginBottom: 10 }}>DiscList™ picks for your gaps</div>
      {[
        { name: 'Zone',     gap: 'safe forehand approach gap', no: '#16', arrow: true },
        { name: 'Sapphire', gap: 'easy distance driver gap',    no: '#69', arrow: true },
        { name: 'Fireball', gap: 'wind-safe fairway gap',       no: null },
      ].map((p, i) => (
        <div key={i} style={{
          padding: '8px 10px',
          background: '#FBF7F0',
          border: '1px solid var(--border)',
          borderRadius: 8,
          marginTop: i === 0 ? 0 : 6,
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ color: '#4A4842' }}>
            <strong style={{ color: '#111' }}>{p.name}</strong> fills your {p.gap}
            {p.no && <span style={{ color: '#8A8478' }}> · DiscList {p.no}</span>}
          </span>
          {p.arrow && <span style={{ color: '#7C0236', fontWeight: 800 }}>→</span>}
        </div>
      ))}
    </div>
  );
}

function V4FixRow({ rank, badge, brand, name, classification, classClr, price, stock }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px',
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 14,
    }}>
      <div style={{ fontFamily: 'Manrope', fontWeight: 800, color: '#E8DED2', fontSize: 22, width: 30 }}>{rank}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: '#8A8478', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{brand}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#111', marginTop: 1 }}>{name}</div>
        <div style={{ marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px', borderRadius: 999, background: classClr + '22', color: classClr, fontSize: 11, fontWeight: 700 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: classClr }} />
          {classification}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        {badge && <div style={{ fontSize: 10, color: '#7C0236', fontWeight: 800, letterSpacing: '0.1em', marginBottom: 4 }}>{badge}</div>}
        <div style={{ fontFamily: 'Manrope', fontSize: 18, fontWeight: 800, color: '#111' }}>{price}</div>
        <div style={{ fontSize: 11, color: stock.startsWith('In') ? '#1B7B40' : '#8A8478', fontWeight: 600, marginTop: 2 }}>● {stock}</div>
      </div>
    </div>
  );
}

window.BagiqV4 = BagiqV4;
