import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactLenis from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────────

const PROGRAMMING_LANGUAGES = [
  { name: 'HTML', level: 90, color: '#E34F26', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', level: 85, color: '#1572B6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Java', level: 80, color: '#ED8B00', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'PHP', level: 75, color: '#777BB4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Python', level: 82, color: '#3776AB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TypeScript', level: 78, color: '#3178C6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Kotlin', level: 70, color: '#7F52FF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Swift', level: 68, color: '#F05138', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
];

const SOFTWARE_SKILLS = [
  { name: 'Photoshop', level: 99, color: '#31A8FF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' },
  { name: 'Illustrator', level: 95, color: '#FF9A00', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
  { name: 'InDesign', level: 85, color: '#FF3366', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg' },
  { name: 'CorelDRAW', level: 70, color: '#00965C', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7b/CorelDRAW_2020.svg' },
  { name: 'Premiere Pro', level: 74, color: '#9999FF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg' },
  { name: 'VN Editor', level: 90, color: '#1DB954', logo: '' },
];

const EDUCATION = [
  {
    period: 'High School',
    title: 'Army Public School',
    description: 'Foundation in academics with a disciplined and competitive environment.',
    icon: '🎓',
  },
  {
    period: '2020 — 2024',
    title: 'B.Tech — MDU, Rohtak',
    description: 'Bachelor of Technology with focus on software engineering and computer science.',
    icon: '💻',
  },
  {
    period: '2024 — 2026',
    title: 'B.Design (Graphics) — LPU',
    description: 'Specializing in graphic design, visual communication, and creative branding at Lovely Professional University.',
    icon: '🎨',
  },
];

const PROJECT_CATEGORIES = [
  {
    name: 'Logo & Brand Identity',
    icon: '✦',
    description: 'Crafting distinctive visual identities that tell your brand story.',
    images: [
      { src: '/projects/brand-identity/1.jpeg', alt: 'KRAEV Brand Identity — Apparel & Label Design' },
      { src: '/projects/brand-identity/2.jpeg', alt: 'Creatix Logo & Brand Guidelines' },
      { src: '/projects/brand-identity/3.jpeg', alt: 'Firin Brand Identity — Logo & Merchandise' },
      { src: '/projects/brand-identity/4.jpeg', alt: 'Homemade Food Brand Identity Design' },
    ],
  },
  {
    name: 'Social Media Creative',
    icon: '📱',
    description: 'Scroll-stopping social media designs that boost engagement.',
    images: [
      { src: '/projects/social-media/1.jpeg', alt: 'Marbella Farms & Resort — Google Review Creative' },
      { src: '/projects/social-media/2.jpeg', alt: 'Suntips Tea — Taste of Togetherness Campaign' },
      { src: '/projects/social-media/3.jpeg', alt: 'Protein Bar — Fitness Poster Design' },
      { src: '/projects/social-media/4.jpeg', alt: 'KPG Masale — New Season of Flavours Campaign' },
    ],
  },
  {
    name: 'Infographics & Brochure Designs',
    icon: '📊',
    description: 'Transforming complex data into compelling visual narratives.',
    images: [
      { src: '/projects/infographics/1.jpeg', alt: 'Real Estate Trifold Brochure Design' },
      { src: '/projects/infographics/2.jpeg', alt: 'Restaurant Folding Menu — Elegant Layout' },
      { src: '/projects/infographics/3.jpeg', alt: 'Vibrant Trifold Brochure — Multi-purpose' },
      { src: '/projects/infographics/4.jpeg', alt: 'Infographic Layout Design' },
    ],
  },
  {
    name: 'Sports Posters',
    icon: '🏆',
    description: 'Dynamic sports visuals with high-energy compositions and bold typography.',
    images: [
      { src: '/projects/sports-posters/1.jpeg', alt: 'Badminton Typography Poster' },
      { src: '/projects/sports-posters/2.jpeg', alt: 'India vs Pakistan — Epic Cricket Showdown Poster' },
      { src: '/projects/sports-posters/3.jpeg', alt: 'Edgar Méndez — Bengaluru FC Digital Art' },
      { src: '/projects/sports-posters/4.jpeg', alt: 'Lava Jersey — Sports Apparel Design by Kyna' },
    ],
  },
  {
    name: 'Mockups & Package Design',
    icon: '📦',
    description: 'Realistic product mockups and packaging that shelf-pops.',
    images: [
      { src: '/projects/mockups/1.jpeg', alt: 'Rice Pouch Packaging — Stand-Up & Zip-Lock Design' },
      { src: '/projects/mockups/2.jpeg', alt: 'Desi Ghee — Traditional Packaging Design' },
      { src: '/projects/mockups/3.jpeg', alt: 'Creative Ad — Social Media Design' },
      { src: '/projects/mockups/4.jpeg', alt: 'Amritdhaan — Truck Branding & Vehicle Wrap' },
      { src: '/projects/mockups/5.jpeg', alt: 'Photorealistic Branding Mockup' },
      { src: '/projects/mockups/6.jpeg', alt: 'Logo Branding — Product Mockup' },
      { src: '/projects/mockups/7.jpeg', alt: 'Pav Bhaji — Food Packaging Design Concept' },
      { src: '/projects/mockups/8.jpeg', alt: 'Traditional Cosmetic — Luxury Packaging Design' },
    ],
  },
];

const WEBSITES = [
  { name: 'HandmadeJoy', url: 'https://www.handmadejoy.in' },
  { name: 'Global Equity Solutions', url: 'https://www.globalequitysolutions.in' },
  { name: 'Kian Girbana', url: 'https://www.kiangirbana.com' },
  { name: 'The Diamond Glass', url: 'https://www.thediamondglass.com' },
  { name: 'SmileShapersLab', url: 'https://www.smileshaperslab.com' },
  { name: 'Hammer Online', url: 'https://www.hammeronline.com' },
];

const SOCIAL_WORK = [
  {
    title: 'Event with Samrasa Foundation',
    location: 'GD International School',
    description: 'Organized and led community engagement events promoting social awareness and education among school students.',
    icon: '🤝',
  },
  {
    title: 'Event with Samrasa Foundation',
    location: 'Ajanta Public School',
    description: 'Facilitated workshops and activities to inspire students towards community service and social responsibility.',
    icon: '❤️',
  },
];

const MARQUEE_TEXT = 'DESIGN • DEVELOP • CREATE • INNOVATE • DESIGN • DEVELOP • CREATE • INNOVATE • ';

// ─── useInView Hook ────────────────────────────────────

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Reveal Wrapper (with 3D tilt) ────────────────────

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) perspective(800px) rotateX(0deg)' : 'translateY(60px) perspective(800px) rotateX(4deg)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── 3D Tilt Card ──────────────────────────────────────

function TiltCard({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)', transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// ─── Typing Effect ─────────────────────────────────────

function TypingText({ text, className = '', style = {}, startDelay = 0 }: { text: string; className?: string; style?: React.CSSProperties; startDelay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [text, started]);

  return (
    <span className={className} style={style}>
      {started ? displayed : ''}
      {started && (
        <span
          className="typing-cursor"
          style={{
            opacity: done ? 0 : 1,
            borderRight: '3px solid currentColor',
            marginLeft: '2px',
            animation: 'blink 0.7s step-end infinite',
          }}
        />
      )}
    </span>
  );
}

// ─── Pop Text ──────────────────────────────────────────

function PopText({ text, className = '', style = {} }: { text: string; className?: string; style?: React.CSSProperties }) {
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPopped(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        opacity: popped ? 1 : 0,
        transform: popped ? 'scale(1) translateY(0)' : 'scale(0.3) translateY(20px)',
        transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {text}
    </span>
  );
}

// ─── Lightbox ──────────────────────────────────────────

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onPrev, onNext]);

  const img = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all z-10 text-2xl"
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 mono text-sm text-white/40">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 w-12 h-12 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'lightboxIn 0.3s ease' }}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
        />
        <p className="text-white/50 text-sm mt-4 text-center max-w-lg">{img.alt}</p>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}
    </div>
  );
}

// ─── Skill Bar Component ───────────────────────────────

function SkillBar({ name, level, color, logo, delay }: {
  name: string; level: number; color: string; logo: string; delay: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!barRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setTimeout(() => setAnimated(true), delay);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [animated, delay]);

  return (
    <div ref={barRef} className="flex items-center gap-4 group" style={{ opacity: animated ? 1 : 0, transform: animated ? 'translateX(0)' : 'translateX(-20px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      <div className="skill-icon-box" style={{ background: `${color}22` }}>
        {logo ? (
          <img src={logo} alt={`${name} logo`} className="w-7 h-7 object-contain" />
        ) : (
          <span style={{ color, fontWeight: 700, fontSize: 14 }}>{name.slice(0, 2)}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-white/90">{name}</span>
          <span className="mono text-xs text-white/50">{animated ? level : 0}%</span>
        </div>
        <div className="skill-bar-track">
          <div className="skill-bar-fill" style={{ width: animated ? `${level}%` : '0%' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Marquee Component ─────────────────────────────────

function Marquee() {
  return (
    <div className="marquee-container py-6 border-y" style={{ borderColor: 'var(--border)' }}>
      <div className="marquee-track">
        {[0, 1].map((i) => (
          <span key={i} className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight px-4" style={{ fontFamily: 'var(--f-heading)', color: 'rgba(255,255,255,0.04)', WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}>
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Navigation ────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`glass-nav fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--f-heading)' }}>
          <span className="section-accent">SK</span>
          <span className="text-white/40 font-light ml-1">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {['Skills', 'Education', 'Projects', 'Social Work', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105" style={{ background: 'var(--accent-gradient)', color: 'white' }}>
          Let's Talk
        </a>
      </div>
    </nav>
  );
}

// ─── Icon Components ───────────────────────────────────

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ─── Parallax Section ──────────────────────────────────

function ParallaxSection({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current,
      { y: 30 },
      {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className={className} id={id}>
      {children}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────

export default function App() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 200);
  }, []);

  // Mouse-scroll parallax on hero
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroH = heroRef.current.offsetHeight;
      if (scrollY > heroH) return;
      const ratio = scrollY / heroH;
      const photo = heroRef.current.querySelector('.hero-photo-wrap') as HTMLElement;
      const text = heroRef.current.querySelector('.hero-text') as HTMLElement;
      if (photo) {
        photo.style.transform = `translateY(${scrollY * 0.15}px) scale(${1 - ratio * 0.08})`;
        photo.style.opacity = `${1 - ratio * 0.6}`;
      }
      if (text) {
        text.style.transform = `translateY(${scrollY * 0.25}px)`;
        text.style.opacity = `${1 - ratio * 0.7}`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox helpers
  const openLightbox = (images: { src: string; alt: string }[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % lightboxImages.length);

  return (
    <ReactLenis root>
      <div className="relative min-h-screen">
        <div className="grain" />
        <NavBar />

        {/* ═══ HERO ═══ */}
        <section id="hero" className="hero-section" ref={heroRef}>
          <div className="hero-inner">
            {/* Photo Side — Left */}
            <div className="hero-photo-wrap" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'scale(1)' : 'scale(0.8)', transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s' }}>
              <TiltCard className="glow-ring floating hero-photo">
                <img
                  src="/profile.jpeg"
                  alt="Sahil Kumar — Graphic Designer & Web Developer"
                  className="w-full h-full object-cover rounded-full"
                  style={{ border: '4px solid var(--bg)' }}
                />
              </TiltCard>
            </div>

            {/* Text Side — Right */}
            <div className="hero-text" style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
              <p className="mono text-sm tracking-[0.3em] uppercase mb-4 hero-tagline">
                {heroVisible && <PopText text="Graphic Designer" style={{ color: 'var(--accent-2)' }} />}
                <span className="mx-2 text-white/20">&</span>
                {heroVisible && <PopText text="Web Developer" style={{ color: 'var(--accent-2)' }} />}
              </p>
              <h1 className="hero-name">
                {heroVisible && <TypingText text="Sahil " className="hero-name-first" style={{ color: '#ffffff' }} />}
                {heroVisible && <TypingText text="Kumar" className="section-accent hero-name-accent" startDelay={550} />}
              </h1>
              <p className="text-white/60 text-base md:text-lg max-w-md leading-relaxed mb-8">
                Crafting visually stunning digital experiences through the fusion of design thinking and clean code.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="#projects" className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'var(--accent-gradient)', color: 'white', boxShadow: '0 4px 20px rgba(108,92,231,0.3)' }}>
                  View Projects
                </a>
                <a href="#contact" className="px-7 py-3 rounded-full font-semibold text-sm border transition-all duration-300 hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ MARQUEE ═══ */}
        <Marquee />

        {/* ═══ SKILLS ═══ */}
        <ParallaxSection id="skills" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent-2)' }}>Expertise</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                My <span className="section-accent">Skills</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 skills-grid-2col">
              {/* Programming Languages */}
              <TiltCard className="card-hover p-8">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: 'rgba(108,92,231,0.15)' }}>⟨⟩</span>
                  Programming Languages
                </h3>
                <div className="space-y-5">
                  {PROGRAMMING_LANGUAGES.map((skill, i) => (
                    <SkillBar key={skill.name} {...skill} delay={i * 120} />
                  ))}
                </div>
              </TiltCard>

              {/* Software Skills */}
              <TiltCard className="card-hover p-8">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: 'rgba(108,92,231,0.15)' }}>🎨</span>
                  Software Skills
                </h3>
                <div className="space-y-5">
                  {SOFTWARE_SKILLS.map((skill, i) => (
                    <SkillBar key={skill.name} {...skill} delay={i * 120} />
                  ))}
                </div>
              </TiltCard>
            </div>
          </div>
        </ParallaxSection>

        {/* ═══ EDUCATION ═══ */}
        <ParallaxSection id="education" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent-2)' }}>Background</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                <span className="section-accent">Education</span>
              </h2>
            </Reveal>

            <div className="relative timeline-desktop" style={{ paddingLeft: 56 }}>
              <div className="timeline-line" />
              {EDUCATION.map((edu, i) => (
                <Reveal key={i} delay={i * 200} className="relative mb-10 last:mb-0">
                  <div className="timeline-dot" />
                  <TiltCard className="card-hover p-6 ml-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{edu.icon}</span>
                      <div>
                        <p className="mono text-xs tracking-wider uppercase mb-1" style={{ color: 'var(--accent-2)' }}>{edu.period}</p>
                        <h3 className="text-lg font-bold text-white mb-2">{edu.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{edu.description}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ═══ MARQUEE 2 ═══ */}
        <Marquee />

        {/* ═══ PROJECTS ═══ */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent-2)' }}>Portfolio</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                What I <span className="section-accent">Create</span>
              </h2>
            </Reveal>

            {/* Project Categories with Image Galleries */}
            <div className="space-y-16">
              {PROJECT_CATEGORIES.map((project, catIdx) => (
                <Reveal key={catIdx} delay={catIdx * 80}>
                  <TiltCard className="card-hover p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl">{project.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{project.name}</h3>
                        <p className="text-white/40 text-sm mt-1">{project.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {project.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="project-img-card"
                          onClick={() => openLightbox(project.images, imgIdx)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(project.images, imgIdx); }}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="project-img-overlay">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            <span className="mono text-[9px] tracking-wider uppercase text-white/80 text-center leading-tight px-2">{img.alt.split('—')[0].trim()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                </Reveal>
              ))}

              {/* Website Development */}
              <Reveal delay={100}>
                <TiltCard className="card-hover p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">🌐</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">Website Development</h3>
                      <p className="text-white/40 text-sm mt-1">Custom-built, high-performance websites tailored for businesses.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {WEBSITES.map((site, i) => (
                      <a
                        key={i}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="website-card"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="website-card-icon">
                            {site.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{site.name}</p>
                            <p className="mono text-[10px] text-white/30 truncate">{site.url.replace('https://www.', '')}</p>
                          </div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-white/60 transition-colors shrink-0 ml-2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ SOCIAL WORK ═══ */}
        <ParallaxSection id="social-work" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent-2)' }}>Giving Back</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Social <span className="section-accent">Work</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SOCIAL_WORK.map((work, i) => (
                <Reveal key={i} delay={i * 200}>
                  <TiltCard className="card-hover p-8 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10" style={{ background: 'var(--accent-gradient)' }} />
                    <span className="text-4xl mb-4 block">{work.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                    <p className="mono text-xs tracking-wider uppercase mb-3 flex items-center gap-2" style={{ color: 'var(--accent-2)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {work.location}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">{work.description}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ═══ CONTACT / FOOTER ═══ */}
        <section id="contact" className="py-20 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-12">
              <p className="mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent-2)' }}>Get In Touch</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white" style={{ fontFamily: 'var(--f-heading)' }}>
                Let's Build<br />
                Something <span className="section-accent">Iconic</span>.
              </h2>
              <p className="text-white/40 text-base max-w-lg mx-auto mb-10">
                Whether you need a stunning brand identity, a modern website, or a full digital experience — I'm here to make it happen.
              </p>
            </Reveal>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {/* Email */}
              <Reveal delay={0}>
                <TiltCard className="card-hover p-6 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-lg" style={{ background: 'rgba(108,92,231,0.15)' }}>
                    ✉️
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Email Me</h4>
                  <a href="mailto:founder@athletagig.com" className="block text-sm text-white/60 hover:text-white transition-colors mb-1 underline underline-offset-4 decoration-white/10 hover:decoration-white/40">
                    founder@athletagig.com
                  </a>
                  <a href="mailto:info@thewhitecat.com" className="block text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-white/40">
                    info@thewhitecat.com
                  </a>
                </TiltCard>
              </Reveal>

              {/* WhatsApp */}
              <Reveal delay={150}>
                <a
                  href="https://wa.me/917029160848"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <TiltCard className="card-hover p-6 text-center group">
                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: '#25D366', color: 'white' }}>
                      <WhatsAppIcon size={24} />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">WhatsApp</h4>
                    <p className="text-sm text-white/60 group-hover:text-white transition-colors">
                      +91-7029160848
                    </p>
                  </TiltCard>
                </a>
              </Reveal>

              {/* Quick Connect */}
              <Reveal delay={300}>
                <TiltCard className="card-hover p-6 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-lg" style={{ background: 'rgba(108,92,231,0.15)' }}>
                    🌐
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Follow Me</h4>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:scale-110" style={{ background: 'rgba(255,255,255,0.06)' }} aria-label="LinkedIn">
                      <LinkedInIcon />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:scale-110" style={{ background: 'rgba(255,255,255,0.06)' }} aria-label="Instagram">
                      <InstagramIcon />
                    </a>
                    <a href="https://github.com/therookcode" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:scale-110" style={{ background: 'rgba(255,255,255,0.06)' }} aria-label="GitHub">
                      <GitHubIcon />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:scale-110" style={{ background: 'rgba(255,255,255,0.06)' }} aria-label="Twitter / X">
                      <TwitterIcon />
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            </div>

            {/* CTA Button */}
            <Reveal className="text-center mb-16">
              <a href="mailto:founder@athletagig.com" className="inline-block px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105" style={{ background: 'var(--accent-gradient)', color: 'white', boxShadow: '0 4px 20px rgba(108,92,231,0.3)' }}>
                Say Hello ✉
              </a>
            </Reveal>
          </div>

          {/* Footer Bar */}
          <div className="max-w-7xl mx-auto pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--border)' }}>
            <p className="mono text-[10px] uppercase tracking-widest text-white/25">
              © 2026 Sahil Kumar — Portfolio
            </p>
            <p className="mono text-[10px] uppercase tracking-widest text-white/25">
              Designed & Developed by SK
            </p>
          </div>
        </section>

        {/* ═══ LIGHTBOX ═══ */}
        {lightboxOpen && (
          <Lightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </div>
    </ReactLenis>
  );
}
