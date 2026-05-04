'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, LayoutTemplate, Rocket, Shield } from 'lucide-react';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery',        desc: 'We analyse your requirements, existing systems and compliance needs in a structured scoping session.',                   icon: <Search size={28} /> },
  { num: '02', title: 'Solution Design',  desc: 'Custom configuration planning, ERP integration mapping and project timeline sign-off.',                                  icon: <LayoutTemplate size={28} /> },
  { num: '03', title: 'Implementation',   desc: 'Rapid deployment with full testing, staff training, data migration and go-live support.',                                icon: <Rocket size={28} /> },
  { num: '04', title: 'Ongoing Support',  desc: 'Dedicated account manager, SLA-backed helpdesk and continuous platform updates.',                                        icon: <Shield size={28} /> },
];

const STEP_DURATION = 2200; // ms each step is "active" before advancing
const RESET_PAUSE   = 900;  // ms pause after last step before loop restart

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    function runCycle(startIndex = 0) {
      let i = startIndex;
      function next() {
        setActive(i);
        if (i < PROCESS_STEPS.length - 1) {
          i++;
          timerRef.current = setTimeout(next, STEP_DURATION);
        } else {
          // all done — pause then restart
          timerRef.current = setTimeout(() => {
            setActive(-1);
            timerRef.current = setTimeout(() => runCycle(0), 400);
          }, RESET_PAUSE + STEP_DURATION);
        }
      }
      next();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCycle(0);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <RevealOnScroll>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <SectionEyebrow center>How we work</SectionEyebrow>
            </div>
            <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 300, letterSpacing: -1.2, lineHeight: 1.1, color: 'var(--heading)', marginBottom: 0 }}>
              From consultation to <em style={{ fontStyle: 'normal', color: 'var(--heading)' }}>go-live</em>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Desktop horizontal timeline */}
        <div className="process-desktop">
          {/* Track */}
          <div className="process-track">
            <div className="process-track-base" />
            <div
              className="process-track-fill"
              style={{
                width: active >= PROCESS_STEPS.length - 1 ? '100%' : `${(active / (PROCESS_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="process-steps-row">
            {PROCESS_STEPS.map((step, i) => {
              const isActive = i <= active;
              return (
                <div key={step.num} className="process-step" style={{ transitionDelay: `${i * 80}ms` }}>
                  {/* Circle node */}
                  <div
                    className={`process-node${isActive ? ' process-node--active' : ''}`}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className={`process-content${isActive ? ' process-content--active' : ''}`}>
                    <div className="process-num">{step.num}</div>
                    <div className="process-title">{step.title}</div>
                    <p className="process-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="process-mobile" ref={sectionRef}>
          {PROCESS_STEPS.map((step, i) => {
            const isActive = i <= active;
            return (
              <div key={step.num} className="process-mob-step">
                <div className="process-mob-left">
                  <div className={`process-mob-node${isActive ? ' process-node--active' : ''}`}>
                    {step.icon}
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div
                      className="process-mob-line"
                      style={{ background: i < active ? 'var(--heading)' : 'var(--border)' }}
                    />
                  )}
                </div>
                <div className={`process-mob-body${isActive ? ' process-mob-body--active' : ''}`}>
                  <div className="process-num">{step.num}</div>
                  <div className="process-title">{step.title}</div>
                  <p className="process-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── DESKTOP ── */
        .process-desktop { display: block; position: relative; }
        .process-mobile  { display: none; }

        .process-track {
          position: relative;
          height: 2px;
          margin: 0 calc(100% / 8);
          margin-bottom: 0;
          top: 36px;
          z-index: 0;
        }
        .process-track-base {
          position: absolute; inset: 0;
          background: var(--border);
          border-radius: 2px;
        }
        .process-track-fill {
          position: absolute; top: 0; left: 0; bottom: 0;
          background: var(--heading);
          border-radius: 2px;
          transition: width 1.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .process-steps-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
          z-index: 1;
        }

        .process-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 20px;
        }

        /* Node circle */
        .process-node {
          width: 72px; height: 72px; border-radius: 50%;
          background: var(--card);
          border: 2px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px;
          color: var(--muted);
          transition: background 0.7s, border-color 0.7s, color 0.7s, box-shadow 0.7s, transform 0.7s;
        }
        .process-node--active {
          background: var(--heading);
          border-color: var(--heading);
          color: #fff;
          box-shadow: 0 6px 24px rgba(0,33,71,0.18);
          transform: scale(1.08);
        }

        /* Text content */
        .process-content {
          opacity: 0.25;
          transform: translateY(0);
          transition: opacity 0.8s, transform 0.8s;
        }
        .process-content--active {
          opacity: 1;
          transform: translateY(0) !important;
        }

        .process-num {
          font-size: 11px; font-weight: 400;
          letter-spacing: 0.1em; color: var(--muted);
          text-transform: uppercase; margin-bottom: 8px;
        }
        .process-title {
          font-size: 17px; font-weight: 400;
          color: var(--heading); margin-bottom: 12px;
        }
        .process-desc {
          font-size: 14px; color: var(--body); line-height: 1.65;
        }

        /* ── MOBILE VERTICAL ── */
        @media (max-width: 900px) {
          .process-desktop { display: none; }
          .process-mobile  { display: flex; flex-direction: column; gap: 0; }
        }

        .process-mob-step {
          display: flex; gap: 20px;
          padding-bottom: 40px;
        }
        .process-mob-left {
          display: flex; flex-direction: column; align-items: center;
          flex-shrink: 0;
        }
        .process-mob-node {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--card); border: 2px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--muted); flex-shrink: 0;
          transition: background 0.7s, border-color 0.7s, color 0.7s, box-shadow 0.7s;
        }
        .process-mob-line {
          width: 2px; flex: 1; min-height: 32px;
          margin-top: 8px; border-radius: 2px;
          transition: background 0.7s;
        }
        .process-mob-body {
          padding-top: 8px;
          padding-bottom: 8px;
          opacity: 0.45;
          transition: opacity 0.8s;
        }
        .process-mob-body--active {
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .process-track-fill { transition: none; }
          .process-node, .process-content { transition: none; }
          .process-content { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
