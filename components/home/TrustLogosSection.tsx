'use client';

import Image from 'next/image';
import { TRUST_LOGOS } from '@/lib/data';

const SECTOR_COLORS: Record<string, { bg: string; text: string }> = {
  Gov:      { bg: 'rgba(0,33,71,0.09)',   text: '#002147' },
  Industry: { bg: 'rgba(30,42,69,0.09)',  text: '#1E2A45' },
  Health:   { bg: 'rgba(0,53,128,0.08)',  text: '#003580' },
  Retail:   { bg: 'rgba(0,33,71,0.08)',   text: '#002147' },
  GCC:      { bg: 'rgba(14,40,80,0.09)',  text: '#0e2850' },
};

function LogoCard({ logo }: { logo: (typeof TRUST_LOGOS)[0] }) {
  const col = SECTOR_COLORS[logo.sector] || SECTOR_COLORS.Gov;
  return (
    <div className="tl-card">
      {logo.logo ? (
        <div className="tl-logo-img-wrap">
          <Image
            src={logo.logo}
            alt={logo.name}
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            sizes="120px"
            unoptimized
          />
        </div>
      ) : (
        <div className="tl-abbr" style={{ background: col.bg, color: col.text }}>
          {logo.abbr}
        </div>
      )}
      <div className="tl-name">{logo.name}</div>
    </div>
  );
}

const TRACK = [...TRUST_LOGOS, ...TRUST_LOGOS];

export function TrustLogosSection() {
  return (
    <section className="tl-section">
      <div className="container">
        <p className="tl-label">Trusted by leading organisations across the region</p>
      </div>

      <div className="tl-slider" aria-label="Client logos">
        <div className="tl-track" aria-hidden="true">
          {TRACK.map((logo, i) => (
            <LogoCard key={`${logo.abbr}-${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>

      <style>{`
        .tl-section {
          background: var(--bg-surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 44px 0;
          overflow: hidden;
        }
        .tl-label {
          text-align: center;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 32px;
        }
        .tl-slider {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .tl-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: tl-scroll 50s linear infinite;
        }
        .tl-slider:hover .tl-track { animation-play-state: paused; }
        @keyframes tl-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tl-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px 18px;
          flex-shrink: 0;
          min-width: 200px;
          max-width: 260px;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .tl-card:hover {
          border-color: var(--muted);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .tl-logo-img-wrap {
          position: relative;
          width: 56px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 6px;
          overflow: hidden;
          background: transparent;
        }
        .tl-abbr {
          width: 44px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.03em;
          text-align: center;
          flex-shrink: 0;
          line-height: 1.1;
          padding: 0 4px;
        }
        .tl-name {
          font-size: 12px;
          font-weight: 400;
          color: var(--heading);
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
          min-width: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .tl-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
