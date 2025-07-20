import React, { useEffect, useRef, useState, useMemo } from 'react';

// Enhanced Juicy Space Environment: more dynamic, vibrant, and exciting
const STAR_LAYERS = [
  { count: 100, speed: 0.02, size: [0.3, 1.2], opacity: 0.6, depth: 0.8 }, // far background
  { count: 70, speed: 0.08, size: [0.8, 2.2], opacity: 0.8, depth: 0.6 }, // mid background
  { count: 45, speed: 0.15, size: [1.2, 3], opacity: 0.95, depth: 0.4 }, // mid foreground
  { count: 25, speed: 0.25, size: [1.5, 3.5], opacity: 1, depth: 0.2 }, // near foreground
];
const SHOOTING_STAR_FREQ = 0.008; // slightly more frequent for juiciness

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Generate persistent star positions
const generateStarPositions = () => {
  const positions = {};
  STAR_LAYERS.forEach((layer, layerIndex) => {
    positions[layerIndex] = Array.from({ length: layer.count }, () => ({
      x: getRandom(0, 100),
      y: getRandom(0, 100),
      size: getRandom(...layer.size),
      opacity: layer.opacity * getRandom(0.7, 1),
      animationDelay: getRandom(0, 5),
      animationDuration: getRandom(4, 8),
      twinklePhase: getRandom(0, Math.PI * 2),
      twinkleSpeed: getRandom(0.5, 1.5)
    }));
  });
  return positions;
};

const Starfield = () => {
  const [shootingStars, setShootingStars] = useState([]);
  const starPositions = useMemo(() => generateStarPositions(), []);
  const scrollY = useRef(0);
  
  // Smooth parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      requestAnimationFrame(() => {
        document.querySelectorAll('.star-parallax').forEach((el, i) => {
          const layer = STAR_LAYERS[i];
          const translateY = scrollY.current * layer.speed;
          const scale = 1 + (scrollY.current * 0.0001 * layer.depth);
          el.style.transform = `translateY(${translateY}px) scale(${scale})`;
        });
        
        // Enhanced grid parallax
        document.querySelectorAll('.living-grid').forEach((el) => {
          const translateY = scrollY.current * 0.03;
          const scale = 1 + (scrollY.current * 0.00005);
          el.style.transform = `translateY(${translateY}px) scale(${scale})`;
        });
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fixed shooting stars - correct direction and trail
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < SHOOTING_STAR_FREQ) {
        const startX = getRandom(5, 95);
        const startY = getRandom(5, 25);
        const angle = getRandom(-25, 25); // downward angle
        const length = getRandom(60, 120);
        
        setShootingStars((prev) => [
          ...prev,
          {
            id: Math.random(),
            left: startX,
            top: startY,
            duration: getRandom(2.5, 4),
            angle: angle,
            length: length,
            // Calculate end position for proper trail direction
            endX: startX + (Math.sin(angle * Math.PI / 180) * length / 10),
            endY: startY + (Math.cos(angle * Math.PI / 180) * length / 10)
          },
        ]);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Clean up shooting stars
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShootingStars((prev) => prev.slice(1));
    }, 6000);
    return () => clearTimeout(timeout);
  }, [shootingStars]);

  return (
    <div className="starfield pointer-events-none">
      {/* Juicy Nebula Clouds */}
      <div className="nebula-cloud nebula-blue" />
      <div className="nebula-cloud nebula-purple" />
      <div className="nebula-cloud nebula-pink" />
      <div className="nebula-cloud nebula-cyan" />
      
      {/* Cosmic Dust Particles */}
      <div className="cosmic-dust" />
      
      {STAR_LAYERS.map((layer, i) => (
        <div key={i} className={`star-parallax absolute inset-0`} style={{zIndex: i}}>
          {starPositions[i].map((star, j) => (
            <div
              key={j}
              className="star"
              style={{
                top: `${star.y}vh`,
                left: `${star.x}vw`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: `${star.animationDuration}s`,
                filter: `blur(${i === 0 ? 0.2 : i === 1 ? 0.1 : 0}px)`,
                transform: `translateZ(${layer.depth * 100}px)`
              }}
            />
          ))}
        </div>
      ))}
      
      {/* Fixed Shooting stars with correct trail direction */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            height: `${star.length}px`,
            transform: `rotate(${star.angle}deg)`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      
      {/* Enhanced Aurora/nebula overlay */}
      <div className="aurora-overlay" />
    </div>
  );
};

const LivingOrbs = () => {
  const orbPositions = useMemo(() => [
    { class: 'orb-blue', delay: 0, duration: 45, size: 'large' },
    { class: 'orb-purple', delay: -12, duration: 52, size: 'medium' },
    { class: 'orb-teal', delay: -24, duration: 48, size: 'large' },
    { class: 'orb-white', delay: -36, duration: 55, size: 'small' },
    { class: 'orb-pink', delay: -48, duration: 38, size: 'medium' },
    { class: 'orb-cyan', delay: -60, duration: 42, size: 'large' },
    { class: 'orb-gold', delay: -72, duration: 50, size: 'medium' },
    { class: 'orb-magenta', delay: -84, duration: 44, size: 'small' }
  ], []);

  return (
    <div className="living-background">
      {orbPositions.map((orb, i) => (
        <div 
          key={i}
          className={`living-orb ${orb.class} ${orb.size}`}
          style={{
            animationDelay: `${orb.delay}s`,
            animationDuration: `${orb.duration}s`
          }}
        />
      ))}
    </div>
  );
};

const FloatingParticles = () => {
  const particlePositions = useMemo(() => 
    Array.from({ length: 20 }, () => ({
      x: getRandom(0, 100),
      y: getRandom(0, 100),
      delay: getRandom(-30, 0),
      duration: getRandom(25, 45),
      size: getRandom(1, 3)
    })), []
  );

  return (
    <div className="floating-particles">
      {particlePositions.map((particle, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

const Layout = ({ children }) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smart logo click handler - scroll to top if on homepage, navigate to homepage if on other pages
  const handleLogoClick = () => {
    // Check if we're on the homepage (index page)
    const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index';
    
    if (isHomepage) {
      // If already on homepage, scroll to top smoothly
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      // If on another page, navigate to homepage
      window.location.href = '/';
    }
  };

  // Smart sticky navbar state
  const [showNav, setShowNav] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);
      if (currentScrollY < 16) {
        setShowNav(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY > lastScrollY.current && currentScrollY > 64) {
        setShowNav(false); // scrolling down
      } else if (currentScrollY < lastScrollY.current) {
        setShowNav(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Enhanced Juicy 3D Starfield & Aurora */}
      <Starfield />
      {/* Living Orbs */}
      <LivingOrbs />
      {/* Subtle Grid Pattern with enhanced parallax */}
      <div className="living-grid" />
      {/* Realistic Floating Particles */}
      <FloatingParticles />
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 p-3 md:p-4 navbar-glass border-b border-white/10 transition-all duration-500 ${
          showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${scrolled ? 'shadow-lg' : ''}`}
        style={{
          backdropFilter: scrolled ? 'blur(40px) saturate(200%)' : 'blur(32px) saturate(180%)',
          background: scrolled
            ? 'linear-gradient(90deg, rgba(20,24,40,0.97) 0%, rgba(30,34,54,0.92) 100%)'
            : 'linear-gradient(90deg, rgba(24,28,48,0.82) 0%, rgba(40,44,74,0.72) 100%)',
          borderBottom: '1.5px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled ? '0 2px 24px 0 rgba(0,0,0,0.08)' : '0 1px 8px 0 rgba(0,0,0,0.04)',
          animation: !scrolled ? 'gradient-shift 8s ease-in-out infinite' : undefined
        }}
      >
        <div className="container-premium">
          <div className="flex flex-col md:flex-row items-center md:justify-between justify-center">
            <div className="w-full flex justify-center md:justify-start mb-2 md:mb-0">
              <button 
                onClick={handleLogoClick}
                className="text-2xl font-bold gradient-text-futuristic hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                style={{letterSpacing: '0.01em'}}
                aria-label="Go to homepage or scroll to top"
              >
                Riva
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-8 w-full md:w-auto justify-end">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium border-b-2 border-transparent hover:border-blue-400 pb-1 transition-all">Services</a>
              <a href="#examples" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium border-b-2 border-transparent hover:border-blue-400 pb-1 transition-all">Portfolio</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium border-b-2 border-transparent hover:border-blue-400 pb-1 transition-all">Contact</a>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout; 