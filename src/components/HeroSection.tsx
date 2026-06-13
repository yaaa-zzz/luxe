import React, { useEffect, useRef, useState } from 'react';

interface FloatingParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
}

const HeroSection: React.FC = () => {
  const [animPhase, setAnimPhase] = useState(0);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [butterflyPos, setButterflyPos] = useState({ x: 0, y: 0 });
  const [butterflyAngle, setButterflyAngle] = useState(0);
  const [wingPhase, setWingPhase] = useState(0);
  const [sweepActive, setSweepActive] = useState(false);

  const wingRafRef = useRef<number>(0);
  const wingPhaseRef = useRef(0);
  const butterflyRafRef = useRef<number>(0);
  const butterflyTimeRef = useRef(0);

  // Animation sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimPhase(1), 300),   // fade from black
      setTimeout(() => setAnimPhase(2), 800),   // draw monogram
      setTimeout(() => setAnimPhase(3), 1800),  // reveal "Creation Space"
      setTimeout(() => { setAnimPhase(4); setSweepActive(true); }, 2600), // light sweep
      setTimeout(() => setAnimPhase(5), 3200),  // full reveal + float
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Generate background particles
  useEffect(() => {
    const pts: FloatingParticle[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 200,
      color: Math.random() > 0.5 ? 'rgba(65,105,225,0.6)' : 'rgba(96,165,250,0.5)',
    }));
    setParticles(pts);
  }, []);

  // Wing animation
  useEffect(() => {
    const animate = () => {
      wingPhaseRef.current = (wingPhaseRef.current + 0.1) % (Math.PI * 2);
      setWingPhase(wingPhaseRef.current);
      wingRafRef.current = requestAnimationFrame(animate);
    };
    wingRafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(wingRafRef.current);
  }, []);

  // Decorative butterfly orbit
  useEffect(() => {
    if (animPhase < 5) return;
    const animate = () => {
      butterflyTimeRef.current += 0.008;
      const t = butterflyTimeRef.current;
      const cx = Math.cos(t * 0.7) * 220 + Math.cos(t * 1.3) * 60;
      const cy = Math.sin(t) * 90 + Math.sin(t * 1.8) * 40;
      const angle = Math.atan2(
        Math.sin(t + 0.01) * 90 - Math.sin(t) * 90,
        Math.cos((t + 0.01) * 0.7) * 220 - Math.cos(t * 0.7) * 220
      ) * (180 / Math.PI);
      setButterflyPos({ x: cx, y: cy });
      setButterflyAngle(angle);
      butterflyRafRef.current = requestAnimationFrame(animate);
    };
    butterflyRafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(butterflyRafRef.current);
  }, [animPhase]);

  const decoButterflyWing = Math.abs(Math.cos(wingPhase * 1.2));

  const letters = ['C', 'r', 'e', 'a', 't', 'i', 'o', 'n', ' ', 'S', 'p', 'a', 'c', 'e'];

  return (
    <section className="hero-section" id="hero">
      {/* Initial black overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#050505',
          zIndex: 10,
          opacity: animPhase >= 1 ? 0 : 1,
          transition: 'opacity 1.2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Background ambient orbs */}
      <div
        className="ambient-orb"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(65,105,225,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="ambient-orb"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(65,105,225,0.08) 0%, transparent 70%)',
          top: '20%',
          left: '20%',
        }}
      />
      <div
        className="ambient-orb"
        style={{
          width: 250,
          height: 250,
          background: 'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)',
          bottom: '25%',
          right: '18%',
        }}
      />

      {/* Flowing light ribbons */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '-30%',
              width: '160%',
              height: `${1 + i * 0.5}px`,
              background: `linear-gradient(90deg, transparent, rgba(65,105,225,${0.08 + i * 0.04}), rgba(96,165,250,${0.12 + i * 0.03}), transparent)`,
              top: `${30 + i * 20}%`,
              animation: `ribbonFlow ${10 + i * 3}s linear infinite`,
              animationDelay: `${i * 2.5}s`,
              transform: 'rotate(-8deg)',
            }}
          />
        ))}
      </div>

      {/* Floating background particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              bottom: '-10px',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `floatParticle ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <div
        className="hero-logo-container hero-logo-glow"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0px',
          opacity: animPhase >= 2 ? 1 : 0,
          transition: 'opacity 0.8s ease',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* AS Monogram SVG */}
        <div style={{ position: 'relative' }}>
          <svg
            width="240"
            height="220"
            viewBox="0 0 240 220"
            style={{
              overflow: 'visible',
              filter: 'drop-shadow(0 0 30px rgba(65,105,225,0.35)) drop-shadow(0 0 2px rgba(255,255,255,0.15))',
            }}
          >
            <defs>
              <linearGradient id="monogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset="25%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#c0c8e0" />
                <stop offset="75%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#9090b0" />
              </linearGradient>
              <linearGradient id="monogramGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d0d8f0" />
                <stop offset="40%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#8090c0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <clipPath id="monogramClip">
                <rect x="0" y="0" width="240" height="220"/>
              </clipPath>

              {/* Light sweep gradient */}
              <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {/* ===== S LETTER (large, background) ===== */}
            <g opacity={animPhase >= 2 ? 1 : 0} style={{ transition: 'opacity 0.6s ease 0.2s' }}>
              {/* Large S - outer curve top */}
              <path
                d="M 155 30 C 200 20, 225 55, 200 80 C 185 95, 145 100, 130 120 C 115 140, 125 175, 165 185 C 185 190, 210 182, 225 170"
                stroke="url(#monogramGrad)"
                strokeWidth="22"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: animPhase >= 2 ? 0 : 600,
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s',
                }}
              />
              {/* S inner highlight */}
              <path
                d="M 155 30 C 200 20, 225 55, 200 80 C 185 95, 145 100, 130 120 C 115 140, 125 175, 165 185 C 185 190, 210 182, 225 170"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: animPhase >= 2 ? 0 : 600,
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.5s',
                }}
              />
            </g>

            {/* ===== A LETTER (foreground, overlapping) ===== */}
            <g opacity={animPhase >= 2 ? 1 : 0} style={{ transition: 'opacity 0.6s ease 0.4s' }}>
              {/* A left stroke */}
              <path
                d="M 50 195 L 110 25"
                stroke="url(#monogramGrad2)"
                strokeWidth="18"
                strokeLinecap="round"
                filter="url(#glow)"
                style={{
                  strokeDasharray: 400,
                  strokeDashoffset: animPhase >= 2 ? 0 : 400,
                  transition: 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) 0.5s',
                }}
              />
              {/* A right stroke */}
              <path
                d="M 110 25 L 165 195"
                stroke="url(#monogramGrad2)"
                strokeWidth="18"
                strokeLinecap="round"
                filter="url(#glow)"
                style={{
                  strokeDasharray: 400,
                  strokeDashoffset: animPhase >= 2 ? 0 : 400,
                  transition: 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) 0.7s',
                }}
              />
              {/* A crossbar */}
              <path
                d="M 72 130 L 148 130"
                stroke="url(#monogramGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: animPhase >= 2 ? 0 : 200,
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1) 1.1s',
                }}
              />
              {/* A inner highlight lines */}
              <path
                d="M 50 195 L 110 25 L 165 195"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* ===== Decorative bracket / arc around S ===== */}
            <g opacity={animPhase >= 2 ? 1 : 0} style={{ transition: 'opacity 0.8s ease 0.8s' }}>
              <path
                d="M 110 15 C 80 10, 55 25, 45 50 C 38 70, 40 100, 48 120"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 300,
                  strokeDashoffset: animPhase >= 2 ? 0 : 300,
                  transition: 'stroke-dashoffset 1s ease 1s',
                }}
              />
              <path
                d="M 105 205 C 135 215, 175 210, 210 195"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: animPhase >= 2 ? 0 : 200,
                  transition: 'stroke-dashoffset 0.8s ease 1.1s',
                }}
              />
            </g>

            {/* ===== Stars / sparkles ===== */}
            <g opacity={animPhase >= 3 ? 1 : 0} style={{ transition: 'opacity 0.5s ease 0.2s' }}>
              {/* Big star */}
              <g transform="translate(72, 72)">
                <path d="M 0 -12 L 2.5 -2.5 L 12 0 L 2.5 2.5 L 0 12 L -2.5 2.5 L -12 0 L -2.5 -2.5 Z"
                  fill="white"
                  opacity="0.9"
                  style={{ animation: 'starTwinkle 2.5s ease-in-out infinite' }}
                />
              </g>
              {/* Small star */}
              <g transform="translate(168, 52)">
                <path d="M 0 -6 L 1.2 -1.2 L 6 0 L 1.2 1.2 L 0 6 L -1.2 1.2 L -6 0 L -1.2 -1.2 Z"
                  fill="rgba(255,255,255,0.7)"
                  style={{ animation: 'starTwinkle 3s ease-in-out infinite', animationDelay: '0.8s' }}
                />
              </g>
              {/* Tiny dot stars */}
              <circle cx="95" cy="48" r="2" fill="white" opacity="0.5" style={{ animation: 'starTwinkle 4s ease-in-out infinite', animationDelay: '1.2s' }}/>
              <circle cx="195" cy="155" r="1.5" fill="rgba(147,197,253,0.7)" style={{ animation: 'starTwinkle 3.5s ease-in-out infinite', animationDelay: '0.4s' }}/>
            </g>

            {/* Light sweep overlay */}
            {sweepActive && (
              <rect
                x="-240" y="0" width="240" height="220"
                fill="url(#sweepGrad)"
                style={{
                  animation: 'lightSweep 1.5s ease-in-out forwards',
                }}
              />
            )}
          </svg>
        </div>

        {/* "Creation Space" text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '12px',
            marginTop: '8px',
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: 'white',
              display: 'flex',
              flexWrap: 'wrap',
              perspective: '600px',
              lineHeight: 1,
            }}
          >
            {letters.map((letter, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: animPhase >= 3 ? 1 : 0,
                  transform: animPhase >= 3 ? 'translateY(0) rotateX(0deg)' : 'translateY(20px) rotateX(90deg)',
                  transition: `opacity 0.5s ease ${0.8 + i * 0.06}s, transform 0.5s ease ${0.8 + i * 0.06}s`,
                  color: letter === ' ' ? 'transparent' : 'white',
                  width: letter === ' ' ? '0.4em' : 'auto',
                  textShadow: '0 0 30px rgba(255,255,255,0.2)',
                  fontStyle: 'italic',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative orbiting butterfly */}
      {animPhase >= 5 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${butterflyPos.x}px), calc(-50% + ${butterflyPos.y}px)) rotate(${butterflyAngle}deg)`,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <svg
            width="28"
            height="24"
            viewBox="0 0 52 44"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(65,105,225,0.9)) drop-shadow(0 0 12px rgba(96,165,250,0.6))',
              opacity: 0.9,
            }}
          >
            <g style={{ transformOrigin: '26px 22px', transform: `scaleX(${-decoButterflyWing})` }}>
              <path d="M26 22 C18 10, 4 6, 2 14 C0 22, 10 28, 26 22" fill="rgba(65,105,225,0.8)" stroke="rgba(147,197,253,0.9)" strokeWidth="0.8"/>
              <path d="M26 22 C18 28, 6 32, 5 38 C4 44, 16 42, 26 22" fill="rgba(59,130,246,0.7)" stroke="rgba(147,197,253,0.8)" strokeWidth="0.6"/>
            </g>
            <g style={{ transformOrigin: '26px 22px', transform: `scaleX(${decoButterflyWing})` }}>
              <path d="M26 22 C34 10, 48 6, 50 14 C52 22, 42 28, 26 22" fill="rgba(65,105,225,0.8)" stroke="rgba(147,197,253,0.9)" strokeWidth="0.8"/>
              <path d="M26 22 C34 28, 46 32, 47 38 C48 44, 36 42, 26 22" fill="rgba(59,130,246,0.7)" stroke="rgba(147,197,253,0.8)" strokeWidth="0.6"/>
            </g>
            <ellipse cx="26" cy="22" rx="2" ry="8" fill="rgba(220,235,255,0.95)"/>
          </svg>
        </div>
      )}

      {/* Bottom tagline */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: animPhase >= 5 ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Home of Works Like &nbsp;
        </span>
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.05em',
          }}
        >
          AS Imagination
        </span>
      </div>

      {/* Scroll Indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: animPhase >= 5 ? 1 : 0,
          transition: 'opacity 1s ease 1s',
          zIndex: 2,
          cursor: 'none',
        }}
        onClick={() => document.getElementById('bio')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.45em',
            color: 'rgba(65,105,225,0.7)',
            textTransform: 'uppercase',
          }}
        >
          Scroll Down
        </span>
        {/* Animated mouse icon */}
        <div style={{ position: 'relative', width: 20, height: 32 }}>
          <svg width="20" height="32" viewBox="0 0 20 32">
            <rect x="1" y="1" width="18" height="28" rx="9" ry="9" fill="none" stroke="rgba(65,105,225,0.6)" strokeWidth="1.5"/>
            <circle cx="10" cy="9" r="2.5" fill="rgba(65,105,225,0.8)" style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
