'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

/* ── FLOATING PARTICLES (canvas) — very light ── */
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const PARTICLE_COUNT = 16;

    type P = { x: number; y: number; r: number; vx: number; vy: number; alpha: number; };
    let particles: P[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function spawn(): P {
      if (!canvas) return { x: 0, y: 0, r: 1, vx: 0, vy: 0, alpha: 0 };
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        r: 0.8 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(0.15 + Math.random() * 0.25),
        alpha: 0.03 + Math.random() * 0.07,
      };
    }

    function init() {
      if (!canvas) return;
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const p = spawn();
        p.y = Math.random() * canvas.height;
        return p;
      });
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 33, 71, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y + p.r < 0) Object.assign(p, spawn());
      }
      animId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    resize();
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}

/* ── HERO GRID (subtle fading grid lines) ── */
function HeroGrid() {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(to right, rgba(0,33,71,0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,33,71,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '72px 72px',
      maskImage: 'radial-gradient(ellipse 80% 100% at 50% 50%, black 30%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 50% 50%, black 30%, transparent 100%)',
    }} />
  );
}

/* ── COUNTER with IntersectionObserver ── */
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function animate() {
      if (started.current) return;
      started.current = true;
      let startTime: number | null = null;
      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / duration, 1);
        setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(step);
        else setCount(target);
      };
      requestAnimationFrame(step);
    }

    // Fire immediately if already visible (hero is above fold)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const delay = setTimeout(animate, 400);
      return () => clearTimeout(delay);
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { animate(); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ── SLIDES ── */
const SLIDES = [
  {
    tag: 'Enterprise IT for the GCC',
    headline: 'Complete Technology Solutions for GCC Enterprises',
    sub: 'D3 (Digital Data Dimensions) delivers workforce management, queue systems, RFID tracking, digital signage and ERP, trusted by 500+ organisations across Bahrain and the Gulf.',
    link: { label: 'Explore Solutions', href: '/solutions/time-attendance-system' },
  },
  {
    tag: 'Workforce Management',
    headline: 'Biometric Attendance, HR & Payroll: All in One',
    sub: 'TimeTech handles time attendance, HRMS, payroll, visitor management and mobile self-service for enterprises with full LMRA and WPS compliance.',
    link: { label: 'View Attendance', href: '/solutions/time-attendance-system' },
  },
  {
    tag: 'Queue Management',
    headline: 'Wired and Wireless Queue Systems for Every Enterprise',
    sub: 'Touchscreen kiosk dispensers, LED counter displays, audio announcements and live analytics, deployed across ministries, hospitals and enterprises in the GCC.',
    link: { label: 'Queue Solutions', href: '/solutions/queue-management-system' },
  },
  {
    tag: 'RFID & Digital Signage',
    headline: 'Full Asset Visibility and Smart Display Networks',
    sub: 'Active and passive RFID tracking for assets, documents and warehouse inventory. Indoor and outdoor LED displays with centralised CMS, end-to-end from a single trusted partner.',
    link: { label: 'Learn More', href: '/solutions/rfid-asset-tracking' },
  },
];

const INTERVAL = 5000;

export function HeroSection() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 280);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    timer.current = setTimeout(next, INTERVAL);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [current, next]);

  const { count: c15, ref: ref15 } = useCounter(15);
  const { count: c500, ref: ref500 } = useCounter(500);
  const { count: c10, ref: ref10 } = useCounter(10);
  const slide = SLIDES[current];

  return (
    <section className="hs-wrap" aria-label="Hero">
      {/* Background layers */}
      <div className="hero-mesh" aria-hidden="true" />
      <HeroGrid />
      <div className="hs-orb hs-orb--a" aria-hidden="true" />
      <div className="hs-orb hs-orb--b" aria-hidden="true" />
      <FloatingParticles />

      <div className="container hs-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* Tag pill */}
        <div className={`hs-tag${fading ? ' hs-fade-out' : ' hs-fade-in'}`} key={`tag-${current}`}>
          <span className="hs-tag-dot" aria-hidden="true" />
          {slide.tag}
        </div>

        {/* Headline */}
        <h1 className={`hs-h1${fading ? ' hs-fade-out' : ' hs-fade-in'}`} key={`h1-${current}`}>
          {slide.headline}
        </h1>

        {/* Para */}
        <p className={`hs-para${fading ? ' hs-fade-out' : ' hs-fade-in'}`} key={`para-${current}`}>
          {slide.sub}
        </p>

        {/* Buttons */}
        <div className="hs-btns">
          <Link href="/contact" className="btn btn-primary">
            {t('requestDemo')} <ArrowIcon />
          </Link>
          <Link href={slide.link.href} className="btn btn-ghost">
            {slide.link.label}
          </Link>
        </div>

        {/* Stats strip */}
        <div className="hs-stats">
          <div className="hs-stat">
            <span className="hs-stat-n" ref={ref15}>{c15}+</span>
            <span className="hs-stat-l">{t('yearsActive')}</span>
          </div>
          <div className="hs-stat-sep" aria-hidden="true" />
          <div className="hs-stat">
            <span className="hs-stat-n" ref={ref500}>{c500}+</span>
            <span className="hs-stat-l">{t('clients')}</span>
          </div>
          <div className="hs-stat-sep" aria-hidden="true" />
          <div className="hs-stat">
            <span className="hs-stat-n" ref={ref10}>{c10}+</span>
            <span className="hs-stat-l">{t('countries')}</span>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="hs-dots" role="tablist" aria-label="Slide indicators">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={s.tag}
              className={`hs-dot${i === current ? ' hs-dot--on' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

      </div>

      <style>{`
        .hs-wrap {
          min-height: calc(100svh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: var(--bg);
          padding-block: clamp(72px, 10vh, 120px);
        }

        .hs-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .hs-orb--a {
          width: 560px; height: 560px;
          top: -120px; right: -80px;
          background: radial-gradient(circle, rgba(0,53,128,0.07) 0%, transparent 70%);
        }
        .hs-orb--b {
          width: 400px; height: 400px;
          bottom: -60px; left: -60px;
          background: radial-gradient(circle, rgba(0,33,71,0.06) 0%, transparent 70%);
        }

        .hs-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
        }

        /* tag pill */
        .hs-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          color: var(--muted);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .hs-tag-dot {
          width: 6px; height: 6px;
          background: var(--cta);
          border-radius: 50%;
          flex-shrink: 0;
          animation: blink 2s ease infinite;
        }

        /* headline */
        .hs-h1 {
          font-family: var(--font);
          font-weight: 400;
          font-size: clamp(34px, 5vw, 72px);
          line-height: 1.05;
          letter-spacing: -2.5px;
          color: var(--heading);
          margin-bottom: 24px;
          max-width: 780px;
        }

        /* paragraph */
        .hs-para {
          font-size: clamp(15px, 1.8vw, 18px);
          color: var(--body);
          line-height: 1.8;
          font-weight: 400;
          max-width: 620px;
          margin-bottom: 36px;
        }

        /* buttons */
        .hs-btns {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 56px;
        }

        /* stats */
        .hs-stats {
          display: flex;
          align-items: center;
          gap: 36px;
          padding-top: 36px;
          border-top: 1px solid var(--border);
          margin-bottom: 36px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hs-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .hs-stat-n {
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 300;
          color: var(--heading);
          letter-spacing: -1.5px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .hs-stat-l {
          font-size: 10px;
          font-weight: 400;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .hs-stat-sep {
          width: 1px;
          height: 36px;
          background: var(--border);
        }

        /* dots */
        .hs-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .hs-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.25s ease;
        }
        .hs-dot--on {
          width: 28px;
          border-radius: 4px;
          background: var(--heading);
        }

        /* fade animation */
        .hs-fade-in {
          animation: hsFadeIn 0.35s ease both;
        }
        .hs-fade-out {
          animation: hsFadeOut 0.25s ease both;
        }
        @keyframes hsFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hsFadeOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-6px); }
        }

        @media (max-width: 600px) {
          .hs-stats { gap: 20px; }
          .hs-stat-sep { display: none; }
          .hs-btns { flex-direction: column; width: 100%; }
          .hs-btns .btn { width: 100%; justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hs-fade-in, .hs-fade-out { animation: none; }
          .hs-dot { transition: none; }
        }
      `}</style>
    </section>
  );
}
