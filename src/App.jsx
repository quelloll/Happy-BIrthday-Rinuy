import { useState, useEffect, useRef } from 'react'

const SECRET = '110625'

const FLOWERS = [
  { emoji: '💐', name: 'Bouquet',        color: '#c084fc', glow: '#7c3aed', msg: 'You are a beautiful mix of everything wonderful — complete, vibrant, and cherished.' },
  { emoji: '🌸', name: 'Cherry Blossom', color: '#ddd6fe', glow: '#a78bfa', msg: 'You are as beautiful as a cherry blossom — lovely, gentle, and bringing joy wherever you go.' },
  { emoji: '🌹', name: 'Rose',           color: '#f0abfc', glow: '#e879f9', msg: 'You are as elegant as a rose — bold, deeply loved, and timelessly beautiful.' },
  { emoji: '🌻', name: 'Sunflower',      color: '#fde68a', glow: '#f0c040', msg: 'You are a human sunflower — bright, full of warmth, and always chasing the light.' },
  { emoji: '🌷', name: 'Tulip',          color: '#bae6fd', glow: '#38bdf8', msg: 'You are as graceful as a tulip — a breath of fresh air that makes everything brighter.' },
  { emoji: '🌺', name: 'Lily',           color: '#f9a8d4', glow: '#ec4899', msg: 'You are as radiant as a Lily — exotic, full of life, and naturally captivating.' },
  { emoji: '🪷', name: 'Lotus',          color: '#c084fc', glow: '#7c3aed', msg: 'You are as resilient as a lotus — blooming beautifully and peacefully through it all.' },
]

const TIMELINE = [
  { title: 'The Very Beginning',   sub: 'First We Met',              desc: 'It started with a simple hello, but somehow it felt like the universe had been waiting for that exact moment.' },
  { title: 'A Magical Moment',     sub: 'Our First Conversation',    desc: 'We talked for hours and hours, and when it ended, I already knew you were someone different.' },
  { title: 'A Beautiful Memory',   sub: 'Our First Outing',          desc: 'The world felt a little more colorful that day, and a lot of that was because you were in it.' },
  { title: 'A Precious Moment',    sub: 'Laughter That Never Ended', desc: 'Every time I think of it I still smile. Laughing with you is one of my favorite things.' },
  { title: 'A Sweet Memory',       sub: 'Beautiful Silence Together',desc: "We didn't need words. The quiet between us said everything that mattered." },
  { title: 'Today',                sub: 'Your Very Special Birthday',desc: 'Here we are. And I am so happy I get to be part of your day.' },
]

const SONGS = [
  { title: 'Kiss Me',                    artist: 'Sixpence None the Richer', file: 'musik1.mp3' },
  { title: 'Stand By Me',                artist: 'Ben E. King',              file: 'musik2.mp3' },
  { title: "Can't Take My Eyes Off You", artist: 'Frankie Valli',            file: 'musik3.mp3' },
]

const NOTES = [
  'You make ordinary days feel extraordinary ✨',
  'Your laugh is literally my favourite sound 🌸',
  'I am grateful every day that our paths crossed 🌷',
  'You have this magic of making everyone feel seen 💫',
  'Watching you grow is one of my greatest joys 🌻',
  'You are braver than you believe, always 🦋',
  'Your kindness is something truly rare and precious 💐',
  'I cherish every single memory we have made together 🌹',
]

const PETALS = ['✦','★','✧','⋆','✦','✵','✦','★','✧','✦','⋆','✵','★','✦','✧','✦','⋆','✦','✵','✧','✦','★','⋆','✵']
const PETAL_COLORS = ['#c084fc','#f0c040','#38bdf8','#e879f9','#ffffff','#a78bfa','#fde68a','#7dd3fc']

// ── CHAT MESSAGES from Zen ──
const ZEN_MESSAGES = [
  { from: 'zen', text: 'HALOOWW RINUYYY BEBEEYY 👀', delay: 0 },
  { from: 'zen', text: 'I JUST WANNA SAY SOMETHING', delay: 1400 },
  { from: 'zen', text: 'HAPPY BIRTHDAYYY RINUYYY MY LOVEEEEE!! 🥳❤️', delay: 2800 },
  { from: 'zen', text: 'I REALLY HOPE YOU KNOW HOW SPECIAL YOU ARE TO ME', delay: 4200 },
  { from: 'zen', text: 'I LOOVEEEE YOUU YESTERDAY, TODAY, TOMORROW AND SURELY FOREVER INFINITY, ENDLESSLY ♾️♾️❤️❤️💐', delay: 5800 },
  { from: 'zen', text: 'SO TODAY… JUST ENJOY EVERY MOMENT. YOU DESERVEE IT ALL. ✨', delay: 7400 },
  { from: 'airin', text: 'AWW BEBEYY 🥺', delay: 9200 },
  { from: 'zen', text: 'I LOVE YAWWWWWWWWWW ', delay: 10600 },
]

// ── WISH JOURNAL entries (persisted in localStorage) ──
function getWishes() {
  try { return JSON.parse(localStorage.getItem('airin_wishes') || '[]') } catch { return [] }
}
function saveWishes(arr) {
  try { localStorage.setItem('airin_wishes', JSON.stringify(arr)) } catch {}
}

function Petals() {
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',overflow:'hidden',zIndex:0}} aria-hidden="true">
      {PETALS.map((p,i) => (
        <span key={i} style={{
          position:'absolute', top:'-3rem',
          left:`${(i*4.1+2)%96}%`,
          fontSize:`${0.7+(i%4)*0.4}rem`,
          opacity: 0.25+(i%5)*0.1,
          color: PETAL_COLORS[i % PETAL_COLORS.length],
          animation:`petalFall ${8+(i%6)*2.5}s ${(i*0.6)%9}s linear infinite`,
          textShadow:`0 0 6px ${PETAL_COLORS[i % PETAL_COLORS.length]}`,
        }}>{p}</span>
      ))}
    </div>
  )
}

// ── HEART TRAIL ──
function HeartTrail() {
  const [hearts, setHearts] = useState([])
  useEffect(() => {
    let id = 0
    const handler = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX
      const y = e.clientY ?? e.touches?.[0]?.clientY
      if (x == null) return
      const hid = id++
      setHearts(h => [...h.slice(-18), { id: hid, x, y }])
      setTimeout(() => setHearts(h => h.filter(t => t.id !== hid)), 900)
    }
    window.addEventListener('mousemove', handler)
    window.addEventListener('touchmove', handler, { passive: true })
    return () => { window.removeEventListener('mousemove', handler); window.removeEventListener('touchmove', handler) }
  }, [])
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:9999}} aria-hidden="true">
      {hearts.map(h => (
        <span key={h.id} style={{
          position:'fixed', left: h.x, top: h.y,
          transform:'translate(-50%,-50%)',
          fontSize:`${0.6 + Math.random()*0.5}rem`,
          color: PETAL_COLORS[h.id % PETAL_COLORS.length],
          animation:'heartPop 0.9s ease-out forwards',
          pointerEvents:'none',
        }}>✦</span>
      ))}
    </div>
  )
}

export default function App() {
  const [phase, setPhase]           = useState('loading')
  const [pwInput, setPwInput]       = useState('')
  const [pwError, setPwError]       = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const [activeFlower, setActiveFlower] = useState(null)
  const [currentSong, setCurrentSong]   = useState(0)
  const [playing, setPlaying]       = useState(false)
  const [note, setNote]             = useState(null)
  const [shaking, setShaking]       = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (phase !== 'loading') return
    const t = setTimeout(() => setPhase('password'), 3200)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.src = SONGS[currentSong].file
    if (playing) a.play().catch(() => {})
    else a.pause()
  }, [currentSong, playing])

  function handlePw() {
    if (pwInput === SECRET) { setPwError(false); setPhase('gift') }
    else { setPwError(true); setPwInput('') }
  }

  function shakeJar() {
    setShaking(true)
    setTimeout(() => { setShaking(false); setNote(NOTES[Math.floor(Math.random()*NOTES.length)]) }, 600)
  }

  return (
    <>
      <audio ref={audioRef} onEnded={() => setCurrentSong(p=>(p+1)%SONGS.length)} />
      <style>{CSS}</style>
      <Petals />
      <HeartTrail />
      {phase==='loading'  && <LoadingScreen />}
      {phase==='password' && <PasswordScreen input={pwInput} setInput={setPwInput} error={pwError} onSubmit={handlePw} />}
      {phase==='gift'     && <GiftScreen opened={giftOpened} onTap={()=>{ if(!giftOpened){setGiftOpened(true);setTimeout(()=>setPhase('main'),1800)} }} />}
      {phase==='main'     && <MainPage activeFlower={activeFlower} setActiveFlower={setActiveFlower}
          currentSong={currentSong} setCurrentSong={setCurrentSong}
          playing={playing} setPlaying={setPlaying}
          note={note} shaking={shaking} shakeJar={shakeJar} />}
    </>
  )
}

function LoadingScreen() {
  return (
    <div className="screen">
      <div className="nebula-orb" />
      <div className="load-ring">✦</div>
      <p className="load-text">preparing something special for you…</p>
    </div>
  )
}

function PasswordScreen({ input, setInput, error, onSubmit }) {
  return (
    <div className="screen">
      <div className="nebula-orb" />
      <div className="glass-card pw-card">
        <p className="eyebrow">for you, my love</p>
        <h2 className="serif-title">Enter Our Secret Code</h2>
        <div className="dots-row">
          {Array.from({length:6}).map((_,i)=>(
            <span key={i} className={`dot ${i<input.length?'filled':''}`} />
          ))}
        </div>
        <div className="numpad">
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k,i)=>(
            <button key={i} className={`num-btn ${k===''?'ghost':''}`}
              onClick={()=>{
                if(k==='⌫') setInput(p=>p.slice(0,-1))
                else if(k!==''&&input.length<6) setInput(p=>p+k)
              }}>{k}</button>
          ))}
        </div>
        <button className="cta-btn" onClick={onSubmit} disabled={input.length<6}>Unlock ✦</button>
        {error && <p className="err-text">oops, kokk lupa :((</p>}
      </div>
    </div>
  )
}

const PARTICLES = ['✦','★','✧','💜','⋆','✵','💙','✦','★','⋆','💜','✧','✦','💛','✵']

function GiftScreen({ opened, onTap }) {
  return (
    <div className="screen gift-screen" style={{flexDirection:'column',gap:'1.2rem'}}>
      <div className="nebula-orb" />
      <div className="nebula-orb-2" />
      {opened && (
        <div className="rays-wrap" aria-hidden="true">
          {Array.from({length:12}).map((_,i)=>(
            <div key={i} className="ray" style={{transform:`rotate(${i*30}deg)`}} />
          ))}
        </div>
      )}
      {opened && (
        <div className="particles-wrap" aria-hidden="true">
          {PARTICLES.map((p,i)=>(
            <span key={i} className="particle" style={{
              '--px':`${(i*23+10)%90}%`,'--py':`${(i*17+5)%80}%`,
              '--dur':`${1.2+(i%5)*0.4}s`,'--delay':`${(i*0.12)%0.8}s`,
              '--size':`${0.9+(i%4)*0.35}rem`,
              color: PETAL_COLORS[i % PETAL_COLORS.length],
            }}>{p}</span>
          ))}
        </div>
      )}
      <p className="eyebrow" style={{color:'#ddd6fe',position:'relative',zIndex:2}}>
        {opened ? '✦ Opening your gift... ✦' : 'opening your gift'}
      </p>
      <div className={`gift-wrap ${opened?'opened':''}`} onClick={onTap} style={{position:'relative',zIndex:2}}>
        <div className="g-lid">🎀</div>
        <div className="g-body">🎁</div>
        {opened && <div className="g-glow" />}
      </div>
      {!opened && (
        <p style={{color:'#c084fc',fontSize:'.9rem',animation:'blink 1.5s infinite',position:'relative',zIndex:2}}>
          Tap the gift box to open it 🎁
        </p>
      )}
    </div>
  )
}

// ══════════════════════════════════════════
// FITUR 3 — WISH CANDLE 🕯️
// ══════════════════════════════════════════
function WishCandle() {
  const [blown, setBlown]           = useState(false)
  const [blowing, setBlowing]       = useState(false)
  const [confetti, setConfetti]     = useState([])
  const [wishShown, setWishShown]   = useState(false)
  const [clickCount, setClickCount] = useState(0)

  function blowCandle() {
    if (blown) return
    setClickCount(c => {
      const next = c + 1
      if (next >= 3) {
        setBlowing(true)
        setTimeout(() => {
          setBlown(true)
          setBlowing(false)
          // spawn confetti
          const items = []
          for (let i = 0; i < 60; i++) {
            items.push({
              id: i,
              x: 30 + Math.random() * 40,
              dur: 1.5 + Math.random() * 2,
              delay: Math.random() * 0.6,
              color: PETAL_COLORS[i % PETAL_COLORS.length],
              char: ['✦','★','✧','⋆','✵','💜','💛','💙'][i % 8],
              drift: (Math.random() - 0.5) * 200,
            })
          }
          setConfetti(items)
          setTimeout(() => setWishShown(true), 800)
        }, 700)
      }
      return next
    })
  }

  const blowsLeft = Math.max(0, 3 - clickCount)

  return (
    <div className="candle-section">
      <div className="candle-wrap" onClick={blowCandle}>
        {/* candle body */}
        <div className="candle-body">
          <div className="candle-stripes" />
        </div>
        {/* flame or smoke */}
        {!blown ? (
          <div className={`candle-flame-wrap ${blowing ? 'flickering' : ''}`}>
            <div className="candle-flame-outer" />
            <div className="candle-flame-inner" />
            <div className="candle-flame-core" />
          </div>
        ) : (
          <div className="candle-smoke">
            <span className="smoke-puff s1" />
            <span className="smoke-puff s2" />
            <span className="smoke-puff s3" />
          </div>
        )}
        {/* wax drip */}
        <div className="candle-drip d1" />
        <div className="candle-drip d2" />
      </div>

      {!blown && (
        <p className="candle-hint">
          {blowsLeft > 0
            ? `Tap ${blowsLeft} more time${blowsLeft > 1 ? 's' : ''} to blow the candle 🌬️`
            : 'Blowing…'}
        </p>
      )}

      {/* confetti burst */}
      {blown && (
        <div className="confetti-wrap" aria-hidden="true">
          {confetti.map(c => (
            <span key={c.id} className="conf-piece" style={{
              left:`${c.x}%`,
              color: c.color,
              '--drift':`${c.drift}px`,
              '--dur':`${c.dur}s`,
              '--delay':`${c.delay}s`,
              textShadow:`0 0 8px ${c.color}`,
            }}>{c.char}</span>
          ))}
        </div>
      )}

      {/* wish message */}
      {wishShown && (
        <div className="wish-reveal">
          <p className="wish-reveal-emoji">🌟</p>
          <p className="wish-reveal-title">Your wish has been sent to the universe!</p>
          <p className="wish-reveal-msg">
            May every dream you carry quietly in your heart come true this year and beyond.
            You deserve nothing less than magic, Airin. 💜
          </p>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════
// FITUR 6 — CHAT FROM ZEN 💬
// ══════════════════════════════════════════
function ZenChat() {
  const [visible, setVisible]     = useState([])
  const [started, setStarted]     = useState(false)
  const [typing, setTyping]       = useState(false)
  const [done, setDone]           = useState(false)
  const bottomRef                 = useRef(null)
  const chatBodyRef               = useRef(null)

  function startChat() {
    if (started) return
    setStarted(true)
    ZEN_MESSAGES.forEach((msg, idx) => {
      if (msg.from === 'zen') {
        setTimeout(() => setTyping(true), msg.delay - 400 < 0 ? 0 : msg.delay - 400)
      }
      setTimeout(() => {
        setTyping(false)
        setVisible(v => [...v, msg])
        if (idx === ZEN_MESSAGES.length - 1) setTimeout(() => setDone(true), 1000)
      }, msg.delay)
    })
  }

  useEffect(() => {
    // scroll ONLY inside the chat box, never move the page
    const el = chatBodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visible, typing])

  return (
    <div className="chat-outer">
      {!started ? (
        <div className="chat-start-wrap">
          <p className="chat-preview-hint">Zen left you a message… 💬</p>
          <button className="cta-btn" onClick={startChat}>Open Message 💌</button>
        </div>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">Z</div>
            <div>
              <p className="chat-name">Zen</p>
              <p className="chat-status">{done ? 'Message sent with love ❤️' : 'typing…'}</p>
            </div>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {visible.map((msg, i) => (
              <div key={i} className={`chat-bubble-row ${msg.from === 'zen' ? 'row-zen' : 'row-airin'}`}>
                {msg.from === 'zen' && <div className="bubble-avatar">Z</div>}
                <div className={`chat-bubble ${msg.from === 'zen' ? 'bubble-zen' : 'bubble-airin'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="chat-bubble-row row-zen">
                <div className="bubble-avatar">Z</div>
                <div className="chat-bubble bubble-zen typing-dots">
                  <span/><span/><span/>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════
// FITUR 9 — WISH JOURNAL 📓
// ══════════════════════════════════════════
function WishJournal() {
  const [wishes, setWishes]   = useState(getWishes)
  const [input, setInput]     = useState('')
  const [saved, setSaved]     = useState(false)

  function addWish() {
    const txt = input.trim()
    if (!txt) return
    const next = [{ text: txt, date: new Date().toLocaleDateString('id-ID') }, ...wishes]
    setWishes(next)
    saveWishes(next)
    setInput('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function removeWish(idx) {
    const next = wishes.filter((_,i) => i !== idx)
    setWishes(next)
    saveWishes(next)
  }

  return (
    <div className="journal-wrap">
      <div className="journal-input-row">
        <textarea
          className="journal-textarea"
          placeholder="Write your birthday wish here… 🌠"
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={3}
        />
        <button className="cta-btn journal-send" onClick={addWish} disabled={!input.trim()}>
          {saved ? 'Saved ✦' : 'Save Wish 🌠'}
        </button>
      </div>
      {wishes.length > 0 && (
        <div className="journal-list">
          {wishes.map((w,i) => (
            <div key={i} className="journal-entry">
              <p className="journal-text">"{w.text}"</p>
              <div className="journal-meta">
                <span className="journal-date">{w.date}</span>
                <button className="journal-del" onClick={() => removeWish(i)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {wishes.length === 0 && (
        <p className="journal-empty">No wishes yet — write your first one above 🌠</p>
      )}
    </div>
  )
}

// ══════════════════════════════════════════
// FITUR 10 — METEOR SHOWER 🌠
// ══════════════════════════════════════════
function MeteorShower() {
  const [active, setActive]     = useState(false)
  const [meteors, setMeteors]   = useState([])
  const [wished, setWished]     = useState(false)
  const [wishText, setWishText] = useState('')

  function trigger() {
    if (active) return
    setActive(true)
    setWished(false)
    const ms = []
    for (let i = 0; i < 28; i++) {
      ms.push({
        id: i,
        x: Math.random() * 110 - 10,
        y: Math.random() * 30 - 20,
        dur: 0.8 + Math.random() * 1.2,
        delay: Math.random() * 2.5,
        size: 0.6 + Math.random() * 1.2,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      })
    }
    setMeteors(ms)
    setTimeout(() => {
      setActive(false)
      setMeteors([])
      setWished(true)
    }, 4000)
  }

  return (
    <div className="meteor-section">
      {/* meteor layer */}
      {active && (
        <div className="meteor-canvas" aria-hidden="true">
          {meteors.map(m => (
            <span key={m.id} className="meteor" style={{
              left:`${m.x}%`, top:`${m.y}%`,
              fontSize:`${m.size}rem`,
              color: m.color,
              '--dur':`${m.dur}s`,
              '--delay':`${m.delay}s`,
              textShadow:`0 0 8px ${m.color},0 0 20px ${m.color}`,
            }}>★</span>
          ))}
        </div>
      )}

      <div className="meteor-inner">
        <p className="meteor-sky">🌌</p>
        {!wished ? (
          <>
            <textarea
              className="journal-textarea"
              style={{marginBottom:'1rem'}}
              placeholder="Close your eyes, make a wish… then tap the button 🌠"
              value={wishText}
              onChange={e => setWishText(e.target.value)}
              rows={2}
            />
            <button className="cta-btn meteor-btn" onClick={trigger} disabled={active}>
              {active ? '🌠 Sending your wish…' : 'Make a Wish ✨'}
            </button>
          </>
        ) : (
          <div className="meteor-done">
            <p className="meteor-done-emoji">🌟</p>
            <p className="meteor-done-title">Wish sent to the stars!</p>
            <p className="meteor-done-msg">
              {wishText
                ? `"${wishText}" — the universe heard you, Airin. 💜`
                : 'The universe heard you. May every shooting star carry your dreams home. 💜'}
            </p>
            <button className="cta-btn" style={{marginTop:'1rem',fontSize:'.85rem'}} onClick={() => { setWished(false); setWishText('') }}>
              Make another wish 🌠
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// MUSIC PLAYER
// ══════════════════════════════════════════
function MusicPlayer({ songs, currentSong, setCurrentSong, playing, setPlaying }) {
  const [progress, setProgress]   = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]   = useState(0)
  const audioEl = useRef(null)

  useEffect(() => {
    const a = document.querySelector('audio')
    if (!a) return
    audioEl.current = a
    const onTime = () => { setCurrentTime(a.currentTime); setProgress(a.duration ? (a.currentTime/a.duration)*100 : 0) }
    const onMeta = () => setDuration(a.duration || 0)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('durationchange', onMeta)
    return () => { a.removeEventListener('timeupdate', onTime); a.removeEventListener('loadedmetadata', onMeta); a.removeEventListener('durationchange', onMeta) }
  }, [])

  function fmt(s) {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s/60), sec = Math.floor(s%60)
    return `${m}:${sec.toString().padStart(2,'0')}`
  }

  function seek(e) {
    const a = audioEl.current
    if (!a || !a.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    a.currentTime = ratio * a.duration
  }

  const ORB_STARS = ['✦','✧','⋆','★','✵','✦','✧']

  return (
    <div className="mp-card">
      <div className="mp-disc-wrap">
        <div className={`mp-disc ${playing?'spinning':''}`}>
          <div className="mp-disc-center">🎵</div>
        </div>
        {ORB_STARS.map((p,i)=>(
          <span key={i} className="mp-petal" style={{
            '--start':`${i*(360/ORB_STARS.length)}deg`,
            animationDuration:`${3+i*0.4}s`,
            color: PETAL_COLORS[i % PETAL_COLORS.length],
            textShadow:`0 0 6px ${PETAL_COLORS[i % PETAL_COLORS.length]}`,
          }}>{p}</span>
        ))}
      </div>
      <p className="mp-title">{songs[currentSong].title}</p>
      <p className="mp-artist">{songs[currentSong].artist}</p>
      <div className="mp-progress-wrap">
        <div className="mp-progress-bg" onClick={seek}>
          <div className="mp-progress-fill" style={{width:`${progress}%`}}>
            <div className="mp-progress-dot"/>
          </div>
        </div>
      </div>
      <div className="mp-times">
        <span>{fmt(currentTime)}</span>
        <span>{fmt(duration)}</span>
      </div>
      <div className="mp-controls">
        <button className="mp-btn-prev" onClick={()=>{setCurrentSong(p=>(p-1+songs.length)%songs.length);setPlaying(true)}}>⏮</button>
        <button className="mp-btn-play" onClick={()=>setPlaying(p=>!p)}>{playing?'⏸':'▶'}</button>
        <button className="mp-btn-next" onClick={()=>{setCurrentSong(p=>(p+1)%songs.length);setPlaying(true)}}>⏭</button>
      </div>
      <div className="mp-song-list">
        {songs.map((s,i)=>(
          <button key={i} className={`mp-song-row ${currentSong===i?'mp-song-active':''}`}
            onClick={()=>{setCurrentSong(i);setPlaying(true)}}>
            <span className="mp-s-num">{currentSong===i && playing ? '♪' : i+1}</span>
            <span className="mp-s-info">
              <span className="mp-s-title">{s.title}</span>
              <span className="mp-s-artist">{s.artist}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════
function MainPage({ activeFlower, setActiveFlower, currentSong, setCurrentSong, playing, setPlaying, note, shaking, shakeJar }) {
  return (
    <div className="main-wrap">

      {/* ── HERO ── */}
      <section className="section hero-sec">
        <div className="aurora-bar" />
        <p className="eyebrow">your special day</p>
        <h1 className="hero-h1">
          <TW text="Happy" d={0}/>{' '}<TW text="Birthday Rinuy" d={640}/>{' '}<TW text="My Love ❤️" d={1280}/>
        </h1>
        <TW className="hero-sub" text="the most beautiful day for you" d={1900}/>
      </section>

      {/* ── BOUQUET ── */}
      <section className="section">
        <div className="aurora-bar" />
        <p className="tag-line">— my first give —</p>
        <h2 className="sec-title">A Digital Bouquet</h2>
        <p className="sec-sub">each flower holds a little message just for you</p>
        <div className="orbit-stage">
          <div className="orbit-center">🌿</div>
          {FLOWERS.map((f,i)=>{
            const a = (i/FLOWERS.length)*Math.PI*2 - Math.PI/2
            const x = 50 + Math.cos(a)*40
            const y = 50 + Math.sin(a)*40
            return (
              <button key={i}
                className={`orb ${activeFlower===i?'orb-active':''}`}
                style={{'--g':f.glow,'--c':f.color,left:`${x}%`,top:`${y}%`}}
                onClick={()=>setActiveFlower(activeFlower===i?null:i)}>
                <span className="orb-em">{f.emoji}</span>
                <span className="orb-nm">{f.name}</span>
              </button>
            )
          })}
        </div>
        <div className="flower-popup-area">
          {activeFlower!==null ? (
            <div className="flower-popup" style={{'--g':FLOWERS[activeFlower].glow,'--c':FLOWERS[activeFlower].color}}>
              <span style={{fontSize:'2.8rem'}}>{FLOWERS[activeFlower].emoji}</span>
              <p className="popup-name">{FLOWERS[activeFlower].name}</p>
              <p className="popup-msg">"{FLOWERS[activeFlower].msg}"</p>
            </div>
          ) : (
            <p className="popup-placeholder">tap a flower to see its message ✦</p>
          )}
        </div>
      </section>

      {/* ── LETTER ── */}
      <section className="section">
        <div className="aurora-bar" />
        <p className="tag-line">— from my heart —</p>
        <h2 className="sec-title">A Letter For You</h2>
        <p className="letter-date">25 June</p>
        <div className="letter-paper">
          <div className="letter-deco">💌</div>
          <p>My dearest Airin,</p>
          <p>today is the most special day because it’s the day the most beautiful soul came into this world, happy birthday my love ihope you always surrounded by happiness, laughter, and all the love you deserve, if I could give you the whole world, i honestly would, because nothing compares to how much you mean to me rinuy thank you for being the light in my life thank you for your smile that can brighten even my darkest days, for your kindness, your love, your patience, and for simply being yourself you make everything feel so much better just by existing, and I don’t think i’ll ever be able to thank you enough for all the happiness you’ve brought into my life, i hope this new year of your life is filled with beautiful memories, exciting adventures, endless laughter, and dreams coming true one by one, i hope you stay healthy, continue chasing everything you’ve ever wanted, and never stop believing in yourself. You are so much stronger, smarter, kinder, and more amazing than you sometimes realize, and I hope you always remember that
i know life isn’t always easy, there will be moments when things feel difficult or overwhelming, but i hope you never forget that you don’t have to go through them alone, i’ll always be here to support you, cheer you on, celebrate your victories, comfort you when you’re sad, and remind you how incredibly loved you are no matter what happens, i want to be someone you can always count on.
Thank you for every memory we’ve made together, thank you for every laugh, every conversation, every late night talk, every little moment that may seem ordinary but means everything to me because i got to spend it with you. Being with you has made my life so much brighter, and every day i spend loving you feels like a gift, you deserve a love that makes you feel safe, appreciated, respected, and cherished every single day, i hope i can continue being someone who makes you smile, someone who reminds you how beautiful your heart is, and someone who makes you feel just as special as you truly are, i wish i could spend every second of today celebrating with you, making you laugh, giving you the biggest hug, and reminding you over and over how much you mean to me, even if i can’t be there every moment, please know that you’re in my thoughts, and I’m celebrating you with all my heart, happy 15th birthday rinuy my babyyy, i hope this year brings you countless reasons to smile, wonderful opportunities, unforgettable memories, and all the happiness your heart can hold may every candle you blow out carry a wish that eventually comes true, i promise to keep supporting you, believing in you, and caring about you through every chapter of your life, i hope we continue making beautiful memories together, laughing over silly things, growing together, and celebrating many more birthdays side by side, thank you for being the amazing person you are, thank you for choosing me, loving me, and making me feel like the luckiest person in the world, you truly are one of the best things that has ever happened to me, and I never want to take that for granted, once again, happy birthday, my beautiful rinuy.  may your heart always be full of peace, your smile never fade, and your dreams always find their way to you. i love you more than words could ever express, and i’ll keep choosing you every single day, enjoy your special day, my princess you deserve every bit of happiness this world has to offer happy birthday rinuyyy, i loooveeee youuu infinitely endlessly forever and ever ♾️♾️❤️❤️💕💕🤞🏻🤞🏻🫶🏻🫶🏻</p>
          <p className="sign-line">With my love,<br/><strong>Zen</strong></p>
        </div>
      </section>

      {/* ── PHOTOS ── */}
      <section className="section">
        <div className="aurora-bar" />
        <p className="tag-line">— collection memories —</p>
        <h2 className="sec-title">Our Photo Memories</h2>
        <p className="sec-sub">every picture holds a beautiful story</p>
        <div className="photo-grid">
          {[
            {file:'foto1.jpeg', cap:'The beginning of everything beautiful 🌸'},
            {file:'foto2.jpeg', cap:"A moment I'll never forget 💫"},
            {file:'foto3.jpeg', cap:'Us, always 💕'},
          ].map((p,i)=><PhotoCard key={i} {...p}/>)}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section">
        <div className="aurora-bar" />
        <p className="tag-line">— our journey —</p>
        <h2 className="sec-title">Memories We've Written Together</h2>
        <div className="timeline">
          {TIMELINE.map((t,i)=>(
            <div key={i} className={`tl-row ${i%2===0?'tl-r':'tl-l'}`}>
              <div className="tl-card">
                <p className="tl-h">{t.title}</p>
                <p className="tl-s">{t.sub}</p>
                <p className="tl-d">{t.desc}</p>
              </div>
              <div className="tl-spine"><div className="tl-dot"/></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MUSIC ── */}
      <section className="section" style={{textAlign:'center'}}>
        <div className="aurora-bar" />
        <p className="tag-line">— Songs For You —</p>
        <h2 className="sec-title">Special Playlist</h2>
        <MusicPlayer songs={SONGS} currentSong={currentSong} setCurrentSong={setCurrentSong} playing={playing} setPlaying={setPlaying} />
      </section>

      {/* ── FITUR 6: CHAT FROM ZEN ── */}
      <section className="section">
        <div className="aurora-bar" />
        <p className="tag-line">— a message from zen —</p>
        <h2 className="sec-title">He Left You a Message 💬</h2>
        <p className="sec-sub">tap to open and read it slowly 🥺</p>
        <ZenChat />
      </section>

      {/* ── FITUR 3: WISH CANDLE ── */}
      <section className="section" style={{textAlign:'center'}}>
        <div className="aurora-bar" />
        <p className="tag-line">— make a wish —</p>
        <h2 className="sec-title">Blow Out Your Candle 🕯️</h2>
        <p className="sec-sub">tap 3 times to blow it out and send your wish ✨</p>
        <WishCandle />
      </section>

      {/* ── FITUR 10: METEOR SHOWER ── */}
      <section className="section" style={{textAlign:'center'}}>
        <div className="aurora-bar" />
        <p className="tag-line">— shooting stars —</p>
        <h2 className="sec-title">Make a Wish on a Shooting Star 🌠</h2>
        <p className="sec-sub">write your wish and watch the stars carry it away</p>
        <MeteorShower />
      </section>

      {/* ── JAR ── */}
      <section className="section" style={{textAlign:'center'}}>
        <div className="aurora-bar" />
        <p className="tag-line">— from my heart to yours —</p>
        <h2 className="sec-title">Reasons I'm Grateful to Know You</h2>
        <p className="sec-sub">shake the jar and pick the notes</p>
        <div className={`jar ${shaking?'jar-shake':''}`} onClick={shakeJar}>
          <span style={{fontSize:'4.5rem'}}>🫙</span>
          <span style={{fontSize:'1.2rem',marginTop:'-.5rem'}}>💌💌💌</span>
        </div>
        <button className="cta-btn" style={{marginBottom:'1.5rem'}} onClick={shakeJar}>Shake the jar 🫙</button>
        {note && <div className="note-pop"><p>"{note}"</p></div>}
      </section>

      {/* ── FITUR 9: WISH JOURNAL ── */}
      <section className="section">
        <div className="aurora-bar" />
        <p className="tag-line">— your birthday journal —</p>
        <h2 className="sec-title">Your Wish Journal 📓</h2>
        <p className="sec-sub">write down your birthday wishes — they'll be saved here 🌠</p>
        <WishJournal />
      </section>

      {/* ── FOOTER ── */}
      <section className="section footer-sec">
        <div className="footer-stars">✦ ★ ✧ ⋆ ✵ ✦ ★ ✧ ⋆ ✵</div>
        <h2 className="sec-title" style={{fontSize:'2.2rem'}}>With All My Heart</h2>
        <p className="sec-sub" style={{fontStyle:'italic'}}>May your life always be filled with light and love</p>
        <p className="footer-wish">
          Happy Birthday, Airin 🎂<br/>
          May this year bring you more love than your heart can hold, more laughter than you can count, and more moments that take your breath away. You are so loved more than words could ever say.
        </p>
        <p className="footer-sign">— Zen ❤️</p>
      </section>
    </div>
  )
}

function TW({ text, d=0, className='' }) {
  const [s,setS]=useState('')
  useEffect(()=>{
    let i=0,t,start=setTimeout(()=>{
      t=setInterval(()=>{ setS(text.slice(0,++i)); if(i>=text.length)clearInterval(t) },75)
    },d)
    return ()=>{ clearTimeout(start);clearInterval(t) }
  },[text,d])
  return <span className={className}>{s}</span>
}

function PhotoCard({ file, cap }) {
  const [open,setOpen]=useState(false)
  return (
    <>
      <div className="photo-card" onClick={()=>setOpen(true)}>
        <img src={file} alt={cap}/>
        <p className="photo-cap">{cap}</p>
      </div>
      {open&&<div className="lightbox" onClick={()=>setOpen(false)}>
        <img src={file} alt={cap}/>
        <p>{cap}</p>
      </div>}
    </>
  )
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

body {
  font-family:'DM Sans',sans-serif;
  background: #0b0420;
  color:#e8d5ff;
  min-height:100vh;
}

/* ── STARS FALLING ── */
@keyframes petalFall {
  0%  {transform:translateY(-40px) rotate(0deg) scale(0.5);opacity:0}
  10% {opacity:1}
  90% {opacity:0.7}
  100%{transform:translateY(105vh) rotate(720deg) scale(1.3);opacity:0}
}

/* ── HEART TRAIL ── */
@keyframes heartPop {
  0%   { opacity:1; transform:translate(-50%,-50%) scale(0.5) rotate(0deg); }
  60%  { opacity:0.9; transform:translate(-50%,-120%) scale(1.2) rotate(20deg); }
  100% { opacity:0; transform:translate(-50%,-200%) scale(0.3) rotate(40deg); }
}

/* ── SCREENS ── */
.screen {
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(ellipse at 30% 20%,#1a0a4e 0%,#0b0420 50%,#080d1f 100%);
  position:relative;z-index:1;overflow:hidden;
}

.nebula-orb {
  position:absolute;width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,0.18) 0%,rgba(56,189,248,0.08) 40%,transparent 70%);
  top:-100px;left:-100px;pointer-events:none;z-index:0;
  animation:nebulaFloat 8s ease-in-out infinite alternate;
}
.nebula-orb-2 {
  position:absolute;width:400px;height:400px;border-radius:50%;
  background:radial-gradient(circle,rgba(232,121,249,0.15) 0%,rgba(240,192,64,0.06) 40%,transparent 70%);
  bottom:-80px;right:-80px;pointer-events:none;z-index:0;
  animation:nebulaFloat 10s ease-in-out infinite alternate-reverse;
}
@keyframes nebulaFloat{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.15) translate(20px,15px)}}

.load-ring  { font-size:4rem;animation:spin 3s linear infinite;color:#c084fc;filter:drop-shadow(0 0 18px #7c3aed);position:relative;z-index:1; }
.load-text  { margin-top:1.4rem;font-size:1rem;color:#c084fc;letter-spacing:.1em;font-style:italic;position:relative;z-index:1; }
@keyframes spin{to{transform:rotate(360deg)}}

.glass-card {
  background:rgba(124,58,237,0.08);
  backdrop-filter:blur(18px);
  border:1px solid rgba(192,132,252,0.2);
  border-radius:24px;
  box-shadow:0 8px 48px rgba(124,58,237,0.15),inset 0 1px 0 rgba(255,255,255,0.06);
  position:relative;z-index:1;
}

.pw-card { padding:2.5rem 2rem;max-width:360px;width:90%;display:flex;flex-direction:column;align-items:center;gap:0; }
.eyebrow { font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:#a78bfa;margin-bottom:.5rem; }
.serif-title { font-family:'Cormorant Garamond',serif;font-size:1.9rem;color:#faf5ff;margin-bottom:1.6rem;text-align:center; }
.dots-row { display:flex;gap:.9rem;margin-bottom:1.6rem; }
.dot { width:13px;height:13px;border-radius:50%;border:1.5px solid #7c3aed;transition:background .2s,transform .15s; }
.dot.filled { background:#7c3aed;border-color:#c084fc;transform:scale(1.25);box-shadow:0 0 10px #7c3aed99; }
.numpad { display:grid;grid-template-columns:repeat(3,1fr);gap:.55rem;width:100%;margin-bottom:1.4rem; }
.num-btn { padding:.85rem;font-size:1.2rem;border:1px solid rgba(192,132,252,0.2);border-radius:12px;
           background:rgba(124,58,237,0.1);color:#e8d5ff;cursor:pointer;transition:background .15s,transform .1s; }
.num-btn:hover { background:rgba(124,58,237,0.28);transform:scale(1.06);border-color:#7c3aed; }
.num-btn.ghost { visibility:hidden; }
.cta-btn { padding:.65rem 2rem;background:linear-gradient(135deg,#6d28d9,#7c3aed,#a78bfa);color:#fff;
           border:none;border-radius:999px;font-size:.95rem;cursor:pointer;
           box-shadow:0 4px 20px rgba(109,40,217,0.5);transition:transform .15s,box-shadow .15s;margin-top:.5rem; }
.cta-btn:hover:not(:disabled) { transform:scale(1.05);box-shadow:0 6px 30px rgba(124,58,237,0.65); }
.cta-btn:disabled { opacity:.35;cursor:not-allowed; }
.err-text { margin-top:.9rem;color:#a78bfa;font-size:.88rem; }

.gift-screen { overflow:hidden; }
.rays-wrap { position:fixed;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:1; }
.ray { position:absolute;width:2px;height:120vh;
  background:linear-gradient(to top,transparent 0%,rgba(124,58,237,0.15) 40%,rgba(192,132,252,0.3) 50%,rgba(56,189,248,0.15) 60%,transparent 100%);
  transform-origin:center center;animation:rayAppear .5s ease forwards; }
@keyframes rayAppear{from{opacity:0;transform:var(--r) scaleY(.3)}to{opacity:1;transform:var(--r) scaleY(1)}}
.particles-wrap { position:fixed;inset:0;pointer-events:none;z-index:1; }
.particle { position:absolute;left:var(--px);top:var(--py);font-size:var(--size);animation:floatUp var(--dur) var(--delay) ease-out infinite;opacity:0; }
@keyframes floatUp {
  0%   { opacity:0; transform:translateY(0) rotate(0deg) scale(.5); }
  15%  { opacity:1; }
  80%  { opacity:.8; }
  100% { opacity:0; transform:translateY(-140px) rotate(360deg) scale(1.3); }
}
.gift-wrap { cursor:pointer;position:relative;display:inline-block;user-select:none;text-align:center; }
.g-lid  { font-size:5rem;transition:transform .5s,opacity .5s;filter:drop-shadow(0 0 16px #7c3aed); }
.g-body { font-size:6rem;line-height:1;filter:drop-shadow(0 0 20px rgba(124,58,237,0.5)); }
.gift-wrap.opened .g-lid { transform:translateY(-55px) rotate(-35deg);opacity:0; }
.gift-wrap.opened .g-body { filter:drop-shadow(0 0 40px #c084fc) drop-shadow(0 0 80px #38bdf8); animation:giftPulse .6s ease; }
.g-glow { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120px;height:120px;border-radius:50%;
  background:radial-gradient(circle,rgba(192,132,252,0.7) 0%,rgba(56,189,248,0.3) 40%,transparent 70%);
  animation:glowPulse 1s ease-out forwards;pointer-events:none; }
@keyframes glowPulse{0%{transform:translate(-50%,-50%) scale(.5);opacity:1}100%{transform:translate(-50%,-50%) scale(3);opacity:0}}
@keyframes giftPulse{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}

/* ── MAIN ── */
.main-wrap {
  position:relative;
  background:
    radial-gradient(ellipse at 10% 20%,rgba(124,58,237,0.12) 0%,transparent 40%),
    radial-gradient(ellipse at 90% 60%,rgba(56,189,248,0.08) 0%,transparent 40%),
    radial-gradient(ellipse at 50% 80%,rgba(232,121,249,0.07) 0%,transparent 40%),
    #0b0420;
}
.section { padding:5rem 1.5rem;max-width:700px;margin:0 auto;position:relative;z-index:1; }
.aurora-bar {
  position:absolute;top:0;left:5%;right:5%;height:1px;
  background:linear-gradient(90deg,transparent,#7c3aed,#38bdf8,#e879f9,#f0c040,#7c3aed,transparent);
  opacity:0.5;animation:auroraShift 5s ease-in-out infinite alternate;
}
@keyframes auroraShift{0%{opacity:0.3;transform:scaleX(0.85)}100%{opacity:0.6;transform:scaleX(1.05)}}

.tag-line { font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;color:#a78bfa;margin-bottom:.5rem; }
.sec-title { font-family:'Cormorant Garamond',serif;font-size:2.1rem;font-weight:600;color:#faf5ff;margin-bottom:.4rem; }
.sec-sub { color:#a78bfa;font-size:.88rem;margin-bottom:2rem; }

.hero-sec { text-align:center;padding-top:6rem; }
.hero-h1  { font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,9vw,5.5rem);
            color:#faf5ff;line-height:1.05;margin:.6rem 0;min-height:1.1em;
            text-shadow:0 0 60px rgba(124,58,237,0.5),0 0 120px rgba(56,189,248,0.2); }
.hero-sub { font-size:1rem;color:#c084fc;font-style:italic;letter-spacing:.04em;min-height:1.5em;display:block; }

.orbit-stage { position:relative;width:360px;height:360px;margin:2rem auto 0; }
.orbit-center { position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  font-size:2.8rem;filter:drop-shadow(0 0 14px rgba(192,132,252,0.6));pointer-events:none; }
.orb { position:absolute;transform:translate(-50%,-50%);width:70px;height:70px;border-radius:50%;
  border:2px solid var(--c);
  background:radial-gradient(circle at 38% 32%,rgba(255,255,255,0.12) 0%,rgba(11,4,32,0.6) 100%);
  box-shadow:0 0 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,0.1);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
  cursor:pointer;transition:transform .25s,box-shadow .25s,border-color .25s; }
.orb:hover,.orb-active { transform:translate(-50%,-50%) scale(1.25);box-shadow:0 0 28px var(--g),0 0 56px rgba(124,58,237,0.2);border-color:var(--g); }
.orb-em { font-size:2rem;line-height:1; }
.orb-nm { font-size:.46rem;color:#ddd6fe;font-weight:600;letter-spacing:.05em;text-align:center;line-height:1.1; }
.flower-popup-area { min-height:160px;max-width:440px;margin:1.5rem auto 0;display:flex;align-items:center;justify-content:center; }
.popup-placeholder { color:rgba(167,139,250,0.35);font-size:.85rem;font-style:italic; }
.flower-popup { width:100%;background:rgba(124,58,237,0.08);border:1px solid var(--c);
  border-radius:20px;padding:1.6rem 2rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;text-align:center;
  box-shadow:0 0 40px rgba(124,58,237,0.15);animation:popIn .35s cubic-bezier(.34,1.56,.64,1); }
.popup-name { font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:#a78bfa;margin-top:.2rem; }
.popup-msg  { font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-style:italic;color:#f0e6ff;line-height:1.7; }
@keyframes popIn{from{opacity:0;transform:scale(.82) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}

.letter-date { font-size:.75rem;letter-spacing:.15em;color:#a78bfa;margin-bottom:1.2rem; }
.letter-paper {
  background:linear-gradient(160deg,rgba(124,58,237,0.07) 0%,rgba(56,189,248,0.04) 100%);
  border:1px solid rgba(192,132,252,0.18);border-radius:18px;padding:2.2rem 2rem;
  display:flex;flex-direction:column;gap:1rem;line-height:1.95;color:#ddd6fe;font-size:.95rem;
  box-shadow:0 4px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(192,132,252,0.08);position:relative; }
.letter-paper::before { content:'';position:absolute;top:0;left:10%;right:10%;height:1px;
  background:linear-gradient(90deg,transparent,#7c3aed,#38bdf8,transparent);opacity:0.4; }
.letter-deco { font-size:2rem;text-align:center;margin-bottom:.5rem;filter:drop-shadow(0 0 10px #7c3aed80); }
.ps-line   { color:#c084fc;font-style:italic; }
.sign-line { text-align:right;color:#ddd6fe; }

.photo-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem; }
.photo-card { border-radius:14px;overflow:hidden;cursor:pointer;border:1px solid rgba(192,132,252,0.15);
  box-shadow:0 4px 20px rgba(0,0,0,.4);transition:transform .2s,box-shadow .2s; }
.photo-card:hover { transform:scale(1.04);box-shadow:0 6px 30px rgba(124,58,237,0.25); }
.photo-card img { width:100%;height:180px;object-fit:cover; }
.photo-cap  { padding:.55rem .8rem;font-size:.78rem;color:#c084fc;text-align:center;background:rgba(11,4,32,0.7); }
.lightbox   { position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:999;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;cursor:pointer; }
.lightbox img { max-width:90vw;max-height:75vh;border-radius:14px; }
.lightbox p   { color:#c084fc;font-style:italic; }

.timeline { position:relative;padding:1rem 0; }
.timeline::before { content:'';position:absolute;left:50%;top:0;bottom:0;width:1.5px;
  background:linear-gradient(to bottom,transparent,#7c3aed 20%,#38bdf8 50%,#7c3aed 80%,transparent); }
.tl-row { display:flex;align-items:flex-start;margin-bottom:2.5rem; }
.tl-r   { flex-direction:row; }
.tl-l   { flex-direction:row-reverse; }
.tl-card { width:calc(50% - 2rem);background:rgba(124,58,237,0.07);border:1px solid rgba(192,132,252,0.15);
  border-radius:14px;padding:1rem 1.2rem;box-shadow:0 2px 16px rgba(0,0,0,.3); }
.tl-r .tl-card { margin-right:auto; }
.tl-l .tl-card { margin-left:auto;text-align:right; }
.tl-spine { width:4rem;display:flex;align-items:flex-start;justify-content:center;padding-top:.6rem;flex-shrink:0; }
.tl-dot   { width:13px;height:13px;border-radius:50%;background:#7c3aed;
  box-shadow:0 0 14px #7c3aed,0 0 28px rgba(56,189,248,0.4);border:2px solid #0b0420;flex-shrink:0; }
.tl-h { font-family:'Cormorant Garamond',serif;color:#faf5ff;font-size:1rem;margin-bottom:.15rem;font-weight:600; }
.tl-s { font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:#a78bfa;margin-bottom:.4rem; }
.tl-d { font-size:.82rem;color:#a78bfa;line-height:1.65; }

.mp-card { background:rgba(124,58,237,0.08);border:1px solid rgba(192,132,252,0.15);border-radius:22px;
  padding:1.8rem 1.6rem 1.4rem;max-width:340px;margin:1.5rem auto 0;
  box-shadow:0 8px 40px rgba(0,0,0,.4),0 0 60px rgba(124,58,237,0.08); }
.mp-disc-wrap { position:relative;width:170px;height:170px;margin:0 auto 1.4rem; }
.mp-disc { width:170px;height:170px;border-radius:50%;
  background:radial-gradient(circle at 50% 50%, #110530 0%, #110530 18%,
    rgba(124,58,237,0.3) 19%, rgba(124,58,237,0.1) 30%, #0b0420 31%, #0b0420 38%,
    rgba(56,189,248,0.2) 39%, rgba(56,189,248,0.07) 50%, #0b0420 51%, #0b0420 58%,
    rgba(192,132,252,0.15) 59%, rgba(192,132,252,0.05) 70%, #0b0420 71%);
  border:2px solid rgba(124,58,237,0.3);
  box-shadow:0 0 30px rgba(124,58,237,0.2),0 0 60px rgba(56,189,248,0.08);
  display:flex;align-items:center;justify-content:center; }
.mp-disc.spinning { animation:discSpin 3s linear infinite; }
@keyframes discSpin { to { transform:rotate(360deg); } }
.mp-disc-center { width:38px;height:38px;border-radius:50%;
  background:radial-gradient(circle,#a78bfa 0%,#7c3aed 60%,#4c1d95 100%);
  box-shadow:0 0 16px rgba(124,58,237,0.8),0 0 32px rgba(56,189,248,0.3);
  display:flex;align-items:center;justify-content:center;font-size:1.1rem; }
.mp-petal { position:absolute;font-size:1rem;pointer-events:none;animation:orbitPetal 4s linear infinite; }
@keyframes orbitPetal {
  from { transform:rotate(var(--start)) translateX(68px) rotate(calc(-1 * var(--start))); }
  to   { transform:rotate(calc(var(--start) + 360deg)) translateX(68px) rotate(calc(-1 * (var(--start) + 360deg))); }
}
.mp-title  { font-family:'Cormorant Garamond',serif;font-size:1.25rem;color:#faf5ff;margin-bottom:.2rem; }
.mp-artist { font-size:.75rem;color:#a78bfa;letter-spacing:.06em;margin-bottom:1.2rem; }
.mp-progress-wrap { position:relative;margin-bottom:.4rem; }
.mp-progress-bg { width:100%;height:4px;border-radius:99px;background:rgba(124,58,237,0.2);cursor:pointer;position:relative; }
.mp-progress-fill { height:100%;border-radius:99px;background:linear-gradient(90deg,#7c3aed,#38bdf8,#c084fc);transition:width .5s linear;position:relative; }
.mp-progress-dot { position:absolute;right:-5px;top:50%;transform:translateY(-50%);
  width:10px;height:10px;border-radius:50%;background:#c084fc;box-shadow:0 0 10px #7c3aed,0 0 20px #38bdf880; }
.mp-times { display:flex;justify-content:space-between;font-size:.68rem;color:#a78bfa;margin-bottom:1.2rem; }
.mp-controls { display:flex;align-items:center;justify-content:center;gap:1.2rem;margin-bottom:1rem; }
.mp-btn-prev,.mp-btn-next { width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(192,132,252,0.25);
  background:rgba(124,58,237,0.1);color:#c084fc;font-size:1rem;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:all .15s; }
.mp-btn-prev:hover,.mp-btn-next:hover { background:rgba(124,58,237,0.3);border-color:#7c3aed; }
.mp-btn-play { width:56px;height:56px;border-radius:50%;border:none;
  background:linear-gradient(135deg,#4c1d95,#7c3aed,#38bdf8);color:#fff;font-size:1.4rem;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 20px rgba(124,58,237,0.6),0 0 40px rgba(56,189,248,0.2);transition:transform .15s,box-shadow .15s; }
.mp-btn-play:hover { transform:scale(1.08);box-shadow:0 6px 30px rgba(124,58,237,0.75),0 0 50px rgba(56,189,248,0.3); }
.mp-song-list { display:flex;flex-direction:column;gap:.4rem;margin-top:.8rem; }
.mp-song-row { display:flex;align-items:center;gap:.8rem;padding:.65rem .9rem;border-radius:12px;
  border:1px solid rgba(192,132,252,0.1);background:rgba(124,58,237,0.05);cursor:pointer;text-align:left;transition:background .15s; }
.mp-song-row:hover,.mp-song-active { background:rgba(124,58,237,0.18);border-color:rgba(124,58,237,0.35); }
.mp-s-num { font-size:.8rem;font-weight:700;color:#a78bfa;width:1rem;flex-shrink:0; }
.mp-s-info { flex:1; }
.mp-s-title { font-size:.88rem;color:#f0e6ff;display:block; }
.mp-s-artist { font-size:.7rem;color:#a78bfa; }

.jar { display:inline-flex;flex-direction:column;align-items:center;cursor:pointer;margin:1rem 0; }
.jar-shake { animation:jarShake .55s ease; }
@keyframes jarShake{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(14deg)}60%{transform:rotate(-9deg)}80%{transform:rotate(9deg)}}
.note-pop { max-width:400px;margin:0 auto;background:rgba(124,58,237,0.08);border:1px solid rgba(192,132,252,0.2);
  border-radius:16px;padding:1.3rem 1.8rem;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.05rem;
  color:#f0e6ff;text-align:center;animation:popIn .4s cubic-bezier(.34,1.56,.64,1);box-shadow:0 4px 24px rgba(124,58,237,0.15); }

.footer-sec { text-align:center;background:radial-gradient(ellipse at 50% 100%,#1a0a4e 0%,#0b0420 70%);
  border-radius:28px 28px 0 0;padding-bottom:5rem; }
.footer-stars { font-size:1.4rem;letter-spacing:.4rem;margin-bottom:1.5rem;color:#a78bfa;
  filter:drop-shadow(0 0 8px rgba(124,58,237,0.5));animation:auroraShift 4s ease-in-out infinite alternate; }
.footer-wish { max-width:460px;margin:1rem auto 1.5rem;line-height:1.95;color:#a78bfa;font-size:.9rem; }
.footer-sign { font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:#c084fc; }

/* ══════════════════════════════════════════
   FITUR 6 — ZEN CHAT
══════════════════════════════════════════ */
.chat-outer { max-width:480px;margin:0 auto; }
.chat-start-wrap { text-align:center;padding:2rem;background:rgba(124,58,237,0.06);
  border:1px solid rgba(192,132,252,0.15);border-radius:20px; }
.chat-preview-hint { color:#a78bfa;font-size:.9rem;margin-bottom:1rem;font-style:italic; }
.chat-window { border-radius:20px;overflow:hidden;border:1px solid rgba(192,132,252,0.2);
  background:rgba(11,4,32,0.6);box-shadow:0 8px 40px rgba(0,0,0,.4); }
.chat-header { display:flex;align-items:center;gap:.8rem;padding:1rem 1.2rem;
  background:rgba(124,58,237,0.15);border-bottom:1px solid rgba(192,132,252,0.12); }
.chat-avatar { width:38px;height:38px;border-radius:50%;
  background:linear-gradient(135deg,#7c3aed,#38bdf8);color:#fff;
  display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.95rem;flex-shrink:0; }
.chat-name { color:#faf5ff;font-size:.9rem;font-weight:600; }
.chat-status { color:#a78bfa;font-size:.72rem; }
.chat-body { padding:1.2rem;display:flex;flex-direction:column;gap:.7rem;max-height:380px;overflow-y:auto; }
.chat-body::-webkit-scrollbar { width:4px; }
.chat-body::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.3);border-radius:99px; }
.chat-bubble-row { display:flex;align-items:flex-end;gap:.5rem; }
.row-zen  { flex-direction:row; }
.row-airin { flex-direction:row-reverse; }
.bubble-avatar { width:26px;height:26px;border-radius:50%;
  background:linear-gradient(135deg,#7c3aed,#38bdf8);color:#fff;
  display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.65rem;flex-shrink:0; }
.chat-bubble { padding:.6rem .9rem;border-radius:16px;font-size:.88rem;line-height:1.5;max-width:78%;
  animation:popIn .3s cubic-bezier(.34,1.56,.64,1); }
.bubble-zen { background:rgba(124,58,237,0.2);border:1px solid rgba(192,132,252,0.2);
  color:#e8d5ff;border-bottom-left-radius:4px; }
.bubble-airin { background:linear-gradient(135deg,rgba(232,121,249,0.25),rgba(124,58,237,0.2));
  border:1px solid rgba(232,121,249,0.2);color:#f0e6ff;border-bottom-right-radius:4px; }
.typing-dots { display:flex;gap:4px;align-items:center;padding:.7rem .9rem; }
.typing-dots span { width:7px;height:7px;border-radius:50%;background:#a78bfa;
  animation:typingBounce 1.2s ease-in-out infinite; }
.typing-dots span:nth-child(2) { animation-delay:.2s; }
.typing-dots span:nth-child(3) { animation-delay:.4s; }
@keyframes typingBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }

/* ══════════════════════════════════════════
   FITUR 3 — WISH CANDLE
══════════════════════════════════════════ */
.candle-section { display:flex;flex-direction:column;align-items:center;gap:1.2rem; }
.candle-wrap { position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer;user-select:none; }
.candle-body {
  width:44px;height:120px;
  background:linear-gradient(180deg,#e8d5ff 0%,#c084fc 40%,#7c3aed 100%);
  border-radius:6px 6px 4px 4px;
  position:relative;overflow:hidden;
  box-shadow:0 0 20px rgba(124,58,237,0.4);
}
.candle-stripes {
  position:absolute;inset:0;
  background:repeating-linear-gradient(
    180deg, transparent 0px, transparent 12px,
    rgba(255,255,255,0.12) 12px, rgba(255,255,255,0.12) 13px
  );
}
.candle-drip { position:absolute;width:8px;border-radius:0 0 6px 6px; background:#c084fc;opacity:0.7; }
.d1 { height:18px;top:0;left:8px; }
.d2 { height:10px;top:0;right:10px; }
/* flame */
.candle-flame-wrap { position:relative;width:30px;height:44px;margin-bottom:-2px; }
.candle-flame-outer {
  position:absolute;bottom:0;left:50%;transform:translateX(-50%);
  width:22px;height:38px;border-radius:50% 50% 30% 30%;
  background:radial-gradient(ellipse at 50% 80%,#f0c040 0%,#e879f9 55%,rgba(124,58,237,0) 100%);
  animation:flameWave 1.4s ease-in-out infinite alternate;
  filter:blur(1px);
}
.candle-flame-inner {
  position:absolute;bottom:4px;left:50%;transform:translateX(-50%);
  width:14px;height:26px;border-radius:50% 50% 30% 30%;
  background:radial-gradient(ellipse at 50% 80%,#fff 0%,#fde68a 40%,rgba(240,192,64,0) 100%);
  animation:flameWave 1s ease-in-out infinite alternate-reverse;
}
.candle-flame-core {
  position:absolute;bottom:6px;left:50%;transform:translateX(-50%);
  width:5px;height:12px;border-radius:50%;
  background:#fff;filter:blur(0.5px);
  box-shadow:0 0 8px #fff,0 0 20px #f0c040,0 0 40px #e879f9;
}
@keyframes flameWave {
  0%   { transform:translateX(-50%) scaleX(1) skewX(0deg); }
  50%  { transform:translateX(-50%) scaleX(0.85) skewX(-6deg); }
  100% { transform:translateX(-50%) scaleX(1.1) skewX(4deg); }
}
.flickering .candle-flame-outer,.flickering .candle-flame-inner,.flickering .candle-flame-core {
  animation:flickerOut .7s ease-in-out forwards;
}
@keyframes flickerOut {
  0%  { opacity:1;transform:translateX(-50%) scaleY(1); }
  50% { opacity:0.5;transform:translateX(-50%) scaleY(1.5) skewX(15deg); }
  100%{ opacity:0;transform:translateX(-50%) scaleY(0) skewX(30deg); }
}
/* smoke */
.candle-smoke { position:relative;width:30px;height:44px;margin-bottom:-2px; }
.smoke-puff {
  position:absolute;border-radius:50%;
  background:rgba(200,180,255,0.25);
  animation:smokeRise 2s ease-out infinite;
}
.s1 { width:10px;height:10px;bottom:0;left:50%;transform:translateX(-50%); animation-delay:0s; }
.s2 { width:14px;height:14px;bottom:0;left:50%;transform:translateX(-50%); animation-delay:0.4s; }
.s3 { width:8px; height:8px; bottom:0;left:50%;transform:translateX(-50%); animation-delay:0.8s; }
@keyframes smokeRise {
  0%   { opacity:0.7;transform:translateX(-50%) translateY(0) scale(0.5); }
  100% { opacity:0;transform:translateX(calc(-50% + 12px)) translateY(-50px) scale(2); }
}
.candle-hint { color:#a78bfa;font-size:.85rem;font-style:italic; }
/* confetti */
.confetti-wrap { position:relative;width:100%;height:0;pointer-events:none; }
.conf-piece {
  position:absolute;
  animation:confettiFly var(--dur) var(--delay) ease-out forwards;
  opacity:0;font-size:1rem;
}
@keyframes confettiFly {
  0%   { opacity:1;transform:translateY(0) translateX(0) rotate(0deg) scale(0.5); }
  100% { opacity:0;transform:translateY(-200px) translateX(var(--drift)) rotate(540deg) scale(1.2); }
}
/* wish reveal */
.wish-reveal { max-width:400px;margin:0 auto;background:rgba(124,58,237,0.08);
  border:1px solid rgba(192,132,252,0.2);border-radius:18px;padding:1.8rem 1.6rem;text-align:center;
  animation:popIn .5s cubic-bezier(.34,1.56,.64,1); }
.wish-reveal-emoji { font-size:2.4rem;margin-bottom:.6rem; }
.wish-reveal-title { font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:#faf5ff;margin-bottom:.8rem; }
.wish-reveal-msg { color:#ddd6fe;font-size:.9rem;line-height:1.8;font-style:italic; }

/* ══════════════════════════════════════════
   FITUR 10 — METEOR SHOWER
══════════════════════════════════════════ */
.meteor-section { position:relative;text-align:center; }
.meteor-canvas { position:fixed;inset:0;pointer-events:none;z-index:9990;overflow:hidden; }
.meteor {
  position:absolute;
  animation:meteorFall var(--dur) var(--delay) ease-in forwards;
  opacity:0;
}
@keyframes meteorFall {
  0%   { opacity:0;transform:translate(0,0) rotate(-45deg) scaleX(0.5); }
  10%  { opacity:1; }
  80%  { opacity:0.9; }
  100% { opacity:0;transform:translate(250px,250px) rotate(-45deg) scaleX(3); }
}
.meteor-inner { display:flex;flex-direction:column;align-items:center;gap:1rem; }
.meteor-sky { font-size:3.5rem;filter:drop-shadow(0 0 20px rgba(56,189,248,0.4));
  animation:nebulaFloat 4s ease-in-out infinite alternate; }
.meteor-btn { font-size:1rem;padding:.75rem 2.4rem; }
.meteor-done { max-width:400px;margin:0 auto;background:rgba(124,58,237,0.08);
  border:1px solid rgba(192,132,252,0.2);border-radius:18px;padding:1.8rem 1.6rem;text-align:center;
  animation:popIn .5s cubic-bezier(.34,1.56,.64,1); }
.meteor-done-emoji { font-size:2.4rem;margin-bottom:.6rem; }
.meteor-done-title { font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:#faf5ff;margin-bottom:.8rem; }
.meteor-done-msg { color:#ddd6fe;font-size:.9rem;line-height:1.8;font-style:italic; }

/* ══════════════════════════════════════════
   FITUR 9 — WISH JOURNAL
══════════════════════════════════════════ */
.journal-wrap { max-width:520px;margin:0 auto; }
.journal-input-row { display:flex;flex-direction:column;gap:.7rem;margin-bottom:1.4rem; }
.journal-textarea { width:100%;padding:.9rem 1.1rem;background:rgba(124,58,237,0.08);
  border:1px solid rgba(192,132,252,0.2);border-radius:14px;color:#e8d5ff;font-family:'DM Sans',sans-serif;
  font-size:.9rem;resize:none;outline:none;transition:border-color .2s;line-height:1.6; }
.journal-textarea::placeholder { color:rgba(167,139,250,0.45); }
.journal-textarea:focus { border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,0.15); }
.journal-send { align-self:flex-end; }
.journal-list { display:flex;flex-direction:column;gap:.8rem; }
.journal-entry { background:rgba(124,58,237,0.07);border:1px solid rgba(192,132,252,0.14);
  border-radius:14px;padding:1rem 1.2rem;animation:popIn .35s cubic-bezier(.34,1.56,.64,1); }
.journal-text { font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1rem;color:#f0e6ff;line-height:1.7;margin-bottom:.5rem; }
.journal-meta { display:flex;justify-content:space-between;align-items:center; }
.journal-date { font-size:.7rem;color:#a78bfa;letter-spacing:.08em; }
.journal-del  { background:none;border:none;color:rgba(167,139,250,0.35);cursor:pointer;
  font-size:.85rem;transition:color .15s;padding:0; }
.journal-del:hover { color:#e879f9; }
.journal-empty { color:rgba(167,139,250,0.35);font-style:italic;font-size:.88rem;text-align:center;padding:1.5rem; }

@media(max-width:560px){
  .orbit-stage{width:300px;height:300px}
  .orb{width:60px;height:60px}
  .orb-em{font-size:1.75rem}
  .timeline::before{left:16px}
  .tl-row,.tl-l{flex-direction:row}
  .tl-card{width:calc(100% - 3.5rem);margin-right:auto!important;margin-left:0!important;text-align:left!important}
  .tl-spine{width:3.5rem}
  .chat-body { max-height:280px; }
}
`