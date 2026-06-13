import React, { useEffect, useRef, useState } from 'react';

const GetStartedSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [wingPhase, setWingPhase] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wingRafRef = useRef<number>(0);
  const wingPhaseRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animate = () => {
      wingPhaseRef.current = (wingPhaseRef.current + 0.08) % (Math.PI * 2);
      setWingPhase(wingPhaseRef.current);
      wingRafRef.current = requestAnimationFrame(animate);
    };
    wingRafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(wingRafRef.current);
  }, []);

  const decoButterflyWing = Math.abs(Math.cos(wingPhase));

  return (
    <section
      ref={sectionRef}
      id="get-started"
      style={{
        position: 'relative',
        minHeight: '60vh',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(60px, 8vw, 100px) 24px',
      }}
    >
      {/* Top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(65,105,225,0.3), transparent)',
        }}
      />

      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(65,105,225,0.1) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Energy wave lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '1px',
              top: `${25 + i * 16}%`,
              background: `linear-gradient(90deg, transparent, rgba(65,105,225,${0.15 - i * 0.025}), rgba(96,165,250,${0.2 - i * 0.03}), transparent)`,
              animation: `waveFlow ${6 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              opacity: visible ? 1 : 0,
              transition: `opacity 1s ease ${0.5 + i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Section label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s',
        }}
      >
        <div style={{ width: 40, height: '1px', background: 'rgba(65,105,225,0.5)' }} />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.5em',
            color: 'rgba(65,105,225,0.7)',
            textTransform: 'uppercase',
          }}
        >
          Begin Your Journey
        </span>
        <div style={{ width: 40, height: '1px', background: 'rgba(65,105,225,0.5)' }} />
      </div>

      {/* Main heading */}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          color: 'white',
          textAlign: 'center',
          marginBottom: '16px',
          letterSpacing: '0.05em',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
        }}
      >
        Ready to Create Something{' '}
        <span
          style={{
            fontStyle: 'italic',
            color: 'rgba(147,197,253,0.9)',
          }}
        >
          Extraordinary?
        </span>
      </h2>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
          color: 'rgba(255,255,255,0.4)',
          textAlign: 'center',
          maxWidth: 480,
          lineHeight: 1.8,
          marginBottom: '52px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.45s',
        }}
      >
        Step into the world of AS Imagination — where every vision finds its ultimate expression.
      </p>

      {/* GET STARTED BUTTON */}
      <div
        style={{
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '100px',
            background: 'linear-gradient(135deg, rgba(65,105,225,0.6), rgba(96,165,250,0.4), rgba(65,105,225,0.6))',
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s linear infinite',
            opacity: hovered ? 1 : 0.6,
            transition: 'opacity 0.3s ease',
            filter: hovered ? 'blur(2px)' : 'blur(1px)',
          }}
        />

        <a
          href="https://asimagination.com"
          target="_blank"
          rel="noopener noreferrer"
          className="get-started-btn"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            padding: '18px 52px',
            borderRadius: '100px',
            background: hovered
              ? 'rgba(65,105,225,0.15)'
              : 'rgba(5,5,5,0.95)',
            border: '1px solid rgba(65,105,225,0.5)',
            color: 'white',
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            transition: 'all 0.4s ease',
            position: 'relative',
            zIndex: 1,
            boxShadow: hovered
              ? '0 0 50px rgba(65,105,225,0.5), 0 0 100px rgba(65,105,225,0.2)'
              : '0 0 20px rgba(65,105,225,0.15)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          <span style={{ color: hovered ? 'white' : 'rgba(255,255,255,0.9)' }}>Get Started</span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid rgba(65,105,225,0.5)',
              fontSize: '0.8rem',
              color: 'rgba(147,197,253,0.9)',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            →
          </span>
        </a>
      </div>

      {/* Decorative butterfly near button */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(40px, 8vw, 120px)',
          bottom: 'clamp(40px, 8vw, 80px)',
          opacity: visible ? 0.8 : 0,
          transition: 'opacity 1s ease 1s',
          animation: 'portraitFloat 4s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      >
        <svg
          width="40"
          height="34"
          viewBox="0 0 52 44"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(65,105,225,0.9)) drop-shadow(0 0 16px rgba(96,165,250,0.5))',
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
          <circle cx="26" cy="13" r="2" fill="rgba(220,235,255,0.9)"/>
        </svg>
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: visible ? 0.4 : 0,
          transition: 'opacity 1s ease 1.2s',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
          }}
        >
          © 2025 AS Creation Space · All Rights Reserved
        </span>
      </div>
    </section>
  );
};

export default GetStartedSection;
