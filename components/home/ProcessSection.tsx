'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, LayoutTemplate, Rocket, Shield } from 'lucide-react';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

const STEPS = [
  { num: '01', title: 'Discovery',       desc: 'We analyse your requirements, existing systems and compliance needs in a structured scoping session.', icon: <Search size={26} /> },
  { num: '02', title: 'Solution Design', desc: 'Custom configuration planning, ERP integration mapping and project timeline sign-off.',                  icon: <LayoutTemplate size={26} /> },
  { num: '03', title: 'Implementation',  desc: 'Rapid deployment with full testing, staff training, data migration and go-live support.',               icon: <Rocket size={26} /> },
  { num: '04', title: 'Ongoing Support', desc: 'Dedicated account manager, SLA-backed helpdesk and continuous platform updates.',                       icon: <Shield size={26} /> },
];

const LINE_DURATION  = 1700; // how long the CSS line transition takes (ms)
const NODE_DELAY     = 1500; // delay before icon activates after line moves (ms)
const HOLD_DURATION  = 1000; // how long to hold before advancing (ms)
const RESET_PAUSE    = 600;  // pause after all steps complete before restarting (ms)

export function ProcessSection() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nodeTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // lineStep  → controls the fill line width (moves first)
  // nodeStep  → controls which node circles are lit (follows line)
  const [lineStep, setLineStep] = useState(-1);
  const [nodeStep, setNodeStep] = useState(-1);

  function clearAll() {
    if (timerRef.current) clearTimeout(timerRef.current);
    nodeTimers.current.forEach(clearTimeout);
    nodeTimers.current = [];
  }

  function runCycle() {
    let i = 0;

    function advance() {
      // 1. Move the line to step i
      setLineStep(i);

      // 2. After line has travelled, light up the node
      const nt = setTimeout(() => setNodeStep(i), NODE_DELAY);
      nodeTimers.current.push(nt);

      if (i < STEPS.length - 1) {
        i++;
        timerRef.current = setTimeout(advance, LINE_DURATION + HOLD_DURATION);
      } else {
        // All steps done — reset then loop
        timerRef.current = setTimeout(() => {
          setLineStep(-1);
          setNodeStep(-1);
          timerRef.current = setTimeout(runCycle, RESET_PAUSE);
        }, NODE_DELAY + HOLD_DURATION);
      }
    }

    advance();
  }

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCycle();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); clearAll(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Line fill percentage (desktop)
  const fillPct =
    lineStep < 0
      ? 0
      : lineStep >= STEPS.length - 1
      ? 100
      : (lineStep / (STEPS.length - 1)) * 100;

  return (
    <section className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container">

        <RevealOnScroll>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <SectionEyebrow center>How we work</SectionEyebrow>
            </div>
            <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, letterSpacing: -1.2, lineHeight: 1.1, color: 'var(--heading)' }}>
              From consultation to <em style={{ fontStyle: 'normal' }}>go-live</em>
            </h2>
          </div>
        </RevealOnScroll>

        {/* ── Shared observer wrapper ── */}
        <div ref={wrapRef}>

          {/* ── DESKTOP ── */}
          <div className="pw-desktop">
            {/* Connector track */}
            <div className="pw-track">
              <div className="pw-track-bg" />
              <div className="pw-track-fill" style={{ width: `${fillPct}%` }} />
            </div>

            <div className="pw-row">
              {STEPS.map((step, i) => {
                const lineOn = i <= lineStep;
                const nodeOn = i <= nodeStep;
                return (
                  <div key={step.num} className="pw-step">
                    <div className={`pw-node${nodeOn ? ' pw-node--on' : ''}`}>
                      {step.icon}
                    </div>
                    <div className={`pw-body${lineOn ? ' pw-body--on' : ''}`}>
                      <div className="pw-num">{step.num}</div>
                      <div className="pw-title">{step.title}</div>
                      <p className="pw-desc">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── MOBILE ── */}
          <div className="pw-mobile">
            {STEPS.map((step, i) => {
              const lineOn = i <= lineStep;
              const nodeOn = i <= nodeStep;
              return (
                <div key={step.num} className="pw-mob-row">
                  {/* Left: node + vertical connector */}
                  <div className="pw-mob-spine">
                    <div className={`pw-mob-node${nodeOn ? ' pw-node--on' : ''}`}>
                      {step.icon}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`pw-mob-seg${lineOn ? ' pw-mob-seg--on' : ''}`} />
                    )}
                  </div>

                  {/* Right: text */}
                  <div className={`pw-mob-body${nodeOn ? ' pw-mob-body--on' : ''}`}>
                    <div className="pw-num">{step.num}</div>
                    <div className="pw-title">{step.title}</div>
                    <p className="pw-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        /* ─── SHARED ─── */
        .pw-num   { font-size: 11px; font-weight: 400; letter-spacing: .1em; color: var(--muted); text-transform: uppercase; margin-bottom: 6px; }
        .pw-title { font-size: 17px; font-weight: 400; color: var(--heading); margin-bottom: 10px; line-height: 1.3; }
        .pw-desc  { font-size: 14px; color: var(--body); line-height: 1.65; margin: 0; }

        /* ─── NODE ─── */
        .pw-node {
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; border: 2px solid var(--border);
          background: var(--card); color: var(--muted);
          transition: background .65s ease, border-color .65s ease, color .65s ease, box-shadow .65s ease, transform .65s ease;
        }
        .pw-node--on {
          background: var(--heading); border-color: var(--heading);
          color: #fff;
          box-shadow: 0 6px 22px rgba(0,33,71,.2);
          transform: scale(1.1);
        }

        /* ─── DESKTOP ─── */
        .pw-desktop { display: block; position: relative; }
        .pw-mobile  { display: none; }

        .pw-track {
          position: relative; height: 2px;
          margin: 0 calc(100% / 8);
          top: 36px; z-index: 0;
        }
        .pw-track-bg   { position: absolute; inset: 0; background: var(--border); border-radius: 2px; }
        .pw-track-fill {
          position: absolute; top: 0; left: 0; height: 100%;
          background: var(--heading); border-radius: 2px;
          transition: width ${LINE_DURATION}ms cubic-bezier(.4,0,.2,1);
        }

        .pw-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          position: relative; z-index: 1;
        }
        .pw-step {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 0 20px;
        }
        .pw-step .pw-node { width: 72px; height: 72px; margin-bottom: 24px; }

        .pw-body {
          opacity: .3;
          transition: opacity .6s ease;
        }
        .pw-body--on { opacity: 1; }

        /* ─── MOBILE ─── */
        @media (max-width: 900px) {
          .pw-desktop { display: none; }
          .pw-mobile  { display: flex; flex-direction: column; }
        }

        .pw-mob-row {
          display: flex; gap: 20px; align-items: flex-start;
          padding-bottom: 36px;
        }
        .pw-mob-spine {
          display: flex; flex-direction: column; align-items: center;
          flex-shrink: 0;
        }
        .pw-mob-node { width: 52px; height: 52px; }
        .pw-mob-seg {
          width: 2px; flex: 1; min-height: 28px;
          margin-top: 6px; border-radius: 2px;
          background: var(--border);
          transition: background ${LINE_DURATION}ms cubic-bezier(.4,0,.2,1);
        }
        .pw-mob-seg--on { background: var(--heading); }

        .pw-mob-body {
          padding-top: 6px;
          opacity: .35;
          transition: opacity .65s ease;
        }
        .pw-mob-body--on { opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .pw-track-fill, .pw-node, .pw-body, .pw-mob-seg, .pw-mob-body { transition: none; }
          .pw-body, .pw-mob-body { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
