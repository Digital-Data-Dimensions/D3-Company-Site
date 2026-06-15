'use client';

import Image from 'next/image';
import { TRUST_LOGOS } from '@/lib/data';

const TRACK = [...TRUST_LOGOS, ...TRUST_LOGOS];

export function TrustLogosSection() {
  return (
    <section className="tl-section">
      <div className="container">
        <p className="tl-label">Trusted by leading organisations across the region</p>
      </div>

      <div className="tl-slider" aria-label="Client logos">
        <div className="tl-track" aria-hidden="true">
          {TRACK.map((client, i) => (
            <div key={`${client.logo}-${i}`} className="tl-logo-card">
              <Image
                src={client.logo}
                alt={client.name}
                width={750}
                height={400}
                className="tl-logo-img"
                sizes="180px"
                unoptimized
              />
            </div>
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
          align-items: center;
          gap: 20px;
          width: max-content;
          animation: tl-scroll 45s linear infinite;
        }
        .tl-slider:hover .tl-track { animation-play-state: paused; }
        @keyframes tl-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tl-logo-card {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 24px;
          min-width: 180px;
          height: 72px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .tl-logo-card:hover {
          border-color: var(--muted);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .tl-logo-img {
          width: auto;
          height: 80px;
          max-width: 140px;
          object-fit: contain;
          object-position: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .tl-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
