import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const ButterflyCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [wingPhase, setWingPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: -200, y: -200 });
  const cursorPos = useRef({ x: -200, y: -200 });
  const particleIdRef = useRef(0);
  const rippleIdRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastParticleTime = useRef(0);
  const wingRaf = useRef<number>(0);
  const wingPhaseRef = useRef(0);

  const colors = [
    'rgba(65, 105, 225, 0.9)',
    'rgba(96, 165, 250, 0.9)',
    'rgba(147, 197, 253, 0.8)',
    'rgba(59, 130, 246, 0.9)',
    'rgba(186, 230, 253, 0.7)',
    'rgba(224, 242, 254, 0.8)',
  ];

  const addParticle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastParticleTime.current < 40) return;
    lastParticleTime.current = now;

    const id = particleIdRef.current++;
    const particle: Particle = {
      id,
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
    };
    setParticles(prev => [...prev.slice(-18), particle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 800);
  }, []);

  const addRipple = useCallback((x: number, y: number) => {
    const id = rippleIdRef.current++;
    setRipples(prev => [...prev, { id, x, y, size: 40 }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      addParticle(e.clientX, e.clientY);
    };

    const handleClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);
      for (let i = 0; i < 6; i++) {
        setTimeout(() => addParticle(e.clientX + (Math.random()-0.5)*30, e.clientY + (Math.random()-0.5)*30), i * 60);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [isVisible, addParticle, addRipple]);

  // Smooth cursor following
  useEffect(() => {
    const animate = () => {
      const lerp = 0.15;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerp;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Wing flap animation
  useEffect(() => {
    const animateWings = () => {
      wingPhaseRef.current = (wingPhaseRef.current + 0.12) % (Math.PI * 2);
      setWingPhase(wingPhaseRef.current);
      wingRaf.current = requestAnimationFrame(animateWings);
    };
    wingRaf.current = requestAnimationFrame(animateWings);
    return () => cancelAnimationFrame(wingRaf.current);
  }, []);

  const wingScale = Math.abs(Math.cos(wingPhase));
  const wingY = Math.sin(wingPhase) * 0.15;

  return (
    <>
      {/* Particle Trail */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}

      {/* Ripple Effects */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="ripple-effect"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
          }}
        />
      ))}

      {/* Butterfly Cursor */}
      <div
        ref={cursorRef}
        className="butterfly-cursor"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <svg
          width="52"
          height="44"
          viewBox="0 0 52 44"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(65,105,225,0.9)) drop-shadow(0 0 16px rgba(96,165,250,0.6))',
          }}
        >
          {/* Left wings */}
          <g style={{ transformOrigin: '26px 22px', transform: `scaleX(${-wingScale}) skewY(${wingY}rad)` }}>
            {/* Upper left wing */}
            <path
              d="M26 22 C18 10, 4 6, 2 14 C0 22, 10 28, 26 22"
              fill="rgba(65,105,225,0.75)"
              stroke="rgba(147,197,253,0.9)"
              strokeWidth="0.8"
            />
            {/* Lower left wing */}
            <path
              d="M26 22 C18 28, 6 32, 5 38 C4 44, 16 42, 26 22"
              fill="rgba(59,130,246,0.65)"
              stroke="rgba(147,197,253,0.8)"
              strokeWidth="0.6"
            />
            {/* Wing veins left */}
            <path d="M26 22 C16 16, 8 10, 3 13" stroke="rgba(186,230,253,0.5)" strokeWidth="0.5" fill="none"/>
            <path d="M26 22 C18 26, 10 32, 6 37" stroke="rgba(186,230,253,0.4)" strokeWidth="0.4" fill="none"/>
            {/* Wing shine */}
            <path d="M26 22 C20 14, 10 9, 5 12" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"/>
          </g>

          {/* Right wings */}
          <g style={{ transformOrigin: '26px 22px', transform: `scaleX(${wingScale}) skewY(${wingY}rad)` }}>
            {/* Upper right wing */}
            <path
              d="M26 22 C34 10, 48 6, 50 14 C52 22, 42 28, 26 22"
              fill="rgba(65,105,225,0.75)"
              stroke="rgba(147,197,253,0.9)"
              strokeWidth="0.8"
            />
            {/* Lower right wing */}
            <path
              d="M26 22 C34 28, 46 32, 47 38 C48 44, 36 42, 26 22"
              fill="rgba(59,130,246,0.65)"
              stroke="rgba(147,197,253,0.8)"
              strokeWidth="0.6"
            />
            {/* Wing veins right */}
            <path d="M26 22 C36 16, 44 10, 49 13" stroke="rgba(186,230,253,0.5)" strokeWidth="0.5" fill="none"/>
            <path d="M26 22 C34 26, 42 32, 46 37" stroke="rgba(186,230,253,0.4)" strokeWidth="0.4" fill="none"/>
            {/* Wing shine */}
            <path d="M26 22 C32 14, 42 9, 47 12" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"/>
          </g>

          {/* Body */}
          <ellipse cx="26" cy="22" rx="2" ry="9" fill="rgba(200,220,255,0.95)" />
          {/* Head */}
          <circle cx="26" cy="12" r="2.2" fill="rgba(220,235,255,0.95)" />
          {/* Antennae */}
          <path d="M26 11 C24 7, 21 5, 20 3" stroke="rgba(186,230,253,0.8)" strokeWidth="0.7" fill="none"/>
          <path d="M26 11 C28 7, 31 5, 32 3" stroke="rgba(186,230,253,0.8)" strokeWidth="0.7" fill="none"/>
          <circle cx="20" cy="3" r="1" fill="rgba(147,197,253,1)"/>
          <circle cx="32" cy="3" r="1" fill="rgba(147,197,253,1)"/>
        </svg>
      </div>
    </>
  );
};

export default ButterflyCursor;
