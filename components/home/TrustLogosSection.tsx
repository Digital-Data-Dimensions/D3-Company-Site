'use client';

import Image from 'next/image';

const LOGOS: {
  name: string;
  abbr: string;
  sector: string;
  logo?: string;
  logoType?: 'svg' | 'png';
}[] = [
  { name: 'Ministry of Interior',   abbr: 'MOI',   sector: 'Gov',      logo: '/images/logos/moi.png',           logoType: 'png' },
  { name: 'Ministry of Works',      abbr: 'MOW',   sector: 'Gov' },
  { name: 'Bahrain Airport Co.',    abbr: 'BAC',   sector: 'Aviation', logo: '/images/logos/bac.svg',           logoType: 'svg' },
  { name: 'Ministry of Health',     abbr: 'MOH',   sector: 'Gov',      logo: '/images/logos/moh.png',           logoType: 'png' },
  { name: 'ALBA',                   abbr: 'ALBA',  sector: 'Industry', logo: '/images/logos/alba.svg',          logoType: 'svg' },
  { name: 'Gulf Air',               abbr: 'GFA',   sector: 'Aviation', logo: '/images/logos/gulf-air.png',      logoType: 'png' },
  { name: 'Batelco',                abbr: 'BTC',   sector: 'Telecom',  logo: '/images/logos/batelco.svg',       logoType: 'svg' },
  { name: 'Nass Corporation',       abbr: 'NSS',   sector: 'Industry', logo: '/images/logos/nass.png',          logoType: 'png' },
  { name: 'Jawad Business Group',   abbr: 'JBG',   sector: 'Retail',   logo: '/images/logos/jawad.png',         logoType: 'png' },
  { name: 'GFH Financial Group',    abbr: 'GFH',   sector: 'Finance',  logo: '/images/logos/gfh.png',           logoType: 'png' },
  { name: 'Bank of Bahrain & Kuwait', abbr: 'BBK', sector: 'Banking',  logo: '/images/logos/bbk.svg',           logoType: 'svg' },
  { name: 'National Bank of Bahrain', abbr: 'NBB', sector: 'Banking',  logo: '/images/logos/nbb.svg',           logoType: 'svg' },
  { name: 'Ithmaar Bank',           abbr: 'ITH',   sector: 'Banking' },
  { name: 'Ibn Al Nafees Hospital', abbr: 'IAN',   sector: 'Health',   logo: '/images/logos/ibn-al-nafees.png', logoType: 'png' },
  { name: 'Al Moayyed Group',       abbr: 'AMG',   sector: 'Industry', logo: '/images/logos/almoayyed.png',     logoType: 'png' },
  { name: 'BAPCO',                  abbr: 'BAPCO', sector: 'Energy',   logo: '/images/logos/bapco.png',         logoType: 'png' },
];

const SECTOR_COLORS: Record<string, { bg: string; text: string }> = {
  Gov:      { bg: 'rgba(0,33,71,0.09)',   text: '#002147' },
  Banking:  { bg: 'rgba(0,53,128,0.09)',  text: '#003580' },
  Industry: { bg: 'rgba(30,42,69,0.09)',  text: '#1E2A45' },
  Finance:  { bg: 'rgba(0,53,128,0.08)',  text: '#003580' },
  Aviation: { bg: 'rgba(0,33,71,0.09)',   text: '#002147' },
  Telecom:  { bg: 'rgba(30,42,69,0.09)',  text: '#1E2A45' },
  Retail:   { bg: 'rgba(0,33,71,0.08)',   text: '#002147' },
  Health:   { bg: 'rgba(0,53,128,0.08)',  text: '#003580' },
  Energy:   { bg: 'rgba(14,40,80,0.09)',  text: '#0e2850' },
};

function LogoCard({ logo }: { logo: (typeof LOGOS)[0] }) {
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

const TRACK = [...LOGOS, ...LOGOS];

export function TrustLogosSection() {
  return (
    <section className="tl-section">
      <div className="container">
        <p className="tl-label">Trusted by leading organisations across the region</p>
      </div>

      <div className="tl-slider" aria-label="Client logos">
        <div className="tl-track" aria-hidden="true">
          {TRACK.map((logo, i) => (
            <LogoCard key={`${logo.abbr}-${i}`} logo={logo} />
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
          animation: tl-scroll 40s linear infinite;
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
          min-width: 190px;
          max-width: 220px;
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
          font-weight: 400;
          letter-spacing: 0.03em;
          text-align: center;
          flex-shrink: 0;
          line-height: 1.1;
        }
        .tl-name {
          font-size: 12px;
          font-weight: 400;
          color: var(--heading);
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }
        @media (prefers-reduced-motion: reduce) {
          .tl-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
