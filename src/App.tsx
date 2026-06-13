import React, { useEffect, useRef, useState } from 'react';
// Using useState for displayLight only
import ButterflyCursor from './components/ButterflyCursor';
import HeroSection from './components/HeroSection';
import BioSection from './components/BioSection';
import GetStartedSection from './components/GetStartedSection';

const App: React.FC = () => {
  const lightRef = useRef({ x: 50, y: 50 });
  const [displayLight, setDisplayLight] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lightRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth ambient light follow
  useEffect(() => {
    const animate = () => {
      setDisplayLight(prev => ({
        x: prev.x + (lightRef.current.x - prev.x) * 0.05,
        y: prev.y + (lightRef.current.y - prev.y) * 0.05,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      style={{
        background: '#050505',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Global mouse-reactive ambient light */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(
            600px circle at ${displayLight.x}% ${displayLight.y}%,
            rgba(65, 105, 225, 0.04) 0%,
            transparent 60%
          )`,
          transition: 'background 0.1s ease',
        }}
      />

      {/* Subtle grain texture overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Custom Butterfly Cursor */}
      <ButterflyCursor />

      {/* Page Sections */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection />
        <BioSection />
        <GetStartedSection />
      </div>
    </div>
  );
};

export default App;
