import React, { useEffect, useRef, useState } from 'react';

const skills = [
  { label: 'Creative Direction', icon: '✦', desc: 'Visionary leadership for every project' },
  { label: 'Visual Storytelling', icon: '◈', desc: 'Stories that resonate and inspire' },
  { label: 'Brand Strategy', icon: '◉', desc: 'Building iconic, lasting identities' },
  { label: 'Motion Design', icon: '◎', desc: 'Cinematic animations & visual flow' },
  { label: 'Photography', icon: '⬡', desc: 'Capturing light, mood, and emotion' },
  { label: 'Client Satisfaction', icon: '★', desc: '100% commitment to excellence' },
];

const BioSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#050505',
        padding: 'clamp(60px, 8vw, 120px) clamp(20px, 6vw, 100px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background ambient elements */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(65,105,225,0.07) 0%, transparent 70%)',
            top: '10%',
            right: '-10%',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)',
            bottom: '20%',
            left: '5%',
            filter: 'blur(40px)',
          }}
        />
        {/* Horizontal line accent */}
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
      </div>

      <div
        className="bio-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'clamp(200px, 30%, 350px) 1fr',
          gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'start',
        }}
      >
        {/* ========== LEFT SIDE ========== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}
        >
          {/* Portrait Frame */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(180px, 22vw, 280px)',
              height: 'clamp(180px, 22vw, 280px)',
              animation: 'portraitFloat 5s ease-in-out infinite',
              animationDelay: '1s',
            }}
          >
            {/* Glowing blob behind */}
            <div
              style={{
                position: 'absolute',
                inset: -15,
                background: 'radial-gradient(circle, rgba(65,105,225,0.25) 0%, rgba(65,105,225,0.05) 60%, transparent 80%)',
                filter: 'blur(20px)',
                animation: 'blobMorph 8s ease-in-out infinite',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
            />

            {/* Neon border ring */}
            <div
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                background: 'linear-gradient(135deg, rgba(65,105,225,0.8), rgba(96,165,250,0.4), rgba(65,105,225,0.6), rgba(147,197,253,0.5))',
                animation: 'blobMorph 8s ease-in-out infinite',
                padding: '2px',
              }}
            />

            {/* Portrait area - glassmorphism placeholder */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                animation: 'blobMorph 8s ease-in-out infinite',
                background: 'linear-gradient(145deg, rgba(65,105,225,0.12), rgba(10,10,30,0.9))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(65,105,225,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Artistic initials inside portrait */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(3rem, 7vw, 5rem)',
                    fontWeight: 600,
                    color: 'white',
                    lineHeight: 1,
                    textShadow: '0 0 40px rgba(65,105,225,0.6), 0 0 80px rgba(65,105,225,0.3)',
                    fontStyle: 'italic',
                  }}
                >
                  AS
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.55rem',
                    letterSpacing: '0.3em',
                    color: 'rgba(147,197,253,0.7)',
                    marginTop: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Creative Director
                </div>
              </div>

              {/* Inner glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 30% 30%, rgba(65,105,225,0.1), transparent 60%)',
                }}
              />
            </div>
          </div>

          {/* Name & Title */}
          <div style={{ textAlign: 'center' }}>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.08em',
                marginBottom: '6px',
              }}
            >
              AS Creation Space
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: 'rgba(147,197,253,0.7)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Founder & Creative Director
            </p>

            {/* Elegant handwritten signature */}
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}
            >
              AS Creation Space
            </div>
          </div>

          {/* Social / decorative links */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {['◈', '◉', '◎'].map((icon, i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(65,105,225,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(147,197,253,0.7)',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(65,105,225,0.05)',
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* ========== RIGHT SIDE ========== */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s',
          }}
        >
          {/* About label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: 40, height: '1px', background: 'rgba(65,105,225,0.5)' }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '0.45em',
                color: 'rgba(65,105,225,0.8)',
                textTransform: 'uppercase',
              }}
            >
              About Me
            </span>
          </div>

          {/* Main title */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 300,
              lineHeight: 1.15,
              color: 'white',
              marginBottom: '28px',
              letterSpacing: '-0.01em',
            }}
          >
            Turning <span style={{ fontStyle: 'italic', color: 'rgba(147,197,253,0.9)' }}>Ideas</span> Into
            <br />
            Visual <span style={{ fontStyle: 'italic' }}>Stories</span>
          </h2>

          {/* Bio text */}
          <div style={{ marginBottom: '48px' }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                lineHeight: 1.9,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '20px',
                maxWidth: 560,
              }}
            >
              Welcome to AS Creation Space — where imagination transcends boundaries and every concept 
              is transformed into a breathtaking visual masterpiece. As a passionate creative director 
              and visual storyteller, I blend artistic vision with strategic thinking to craft experiences 
              that leave lasting impressions.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                lineHeight: 1.9,
                color: 'rgba(255,255,255,0.45)',
                maxWidth: 560,
              }}
            >
              From cinematic brand identities to immersive digital experiences, every project is 
              approached with uncompromising dedication to excellence. My work is defined by elegance, 
              precision, and an unwavering commitment to making each client's vision shine brighter 
              than they imagined possible.
            </p>
          </div>

          {/* Skill Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '14px',
            }}
          >
            {skills.map((skill, i) => (
              <div
                key={i}
                className="skill-card glass"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '18px 16px',
                  borderRadius: '12px',
                  background: hoveredCard === i
                    ? 'rgba(65,105,225,0.08)'
                    : 'rgba(255,255,255,0.02)',
                  border: hoveredCard === i
                    ? '1px solid rgba(65,105,225,0.4)'
                    : '1px solid rgba(65,105,225,0.12)',
                  transition: 'all 0.4s ease',
                  cursor: 'none',
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? (hoveredCard === i ? 'translateY(-8px) scale(1.02)' : 'translateY(0)')
                    : 'translateY(20px)',
                  transitionDelay: `${0.6 + i * 0.08}s`,
                  boxShadow: hoveredCard === i
                    ? '0 0 30px rgba(65,105,225,0.25), 0 8px 32px rgba(0,0,0,0.4)'
                    : '0 0 0 transparent',
                }}
              >
                <div
                  style={{
                    fontSize: '1.2rem',
                    color: 'rgba(65,105,225,0.9)',
                    marginBottom: '10px',
                    transition: 'all 0.3s ease',
                    filter: hoveredCard === i ? 'drop-shadow(0 0 8px rgba(65,105,225,0.8))' : 'none',
                  }}
                >
                  {skill.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: hoveredCard === i ? 'white' : 'rgba(255,255,255,0.8)',
                    marginBottom: '6px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {skill.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.65rem',
                    lineHeight: 1.5,
                    color: hoveredCard === i ? 'rgba(147,197,253,0.6)' : 'rgba(255,255,255,0.35)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {skill.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
