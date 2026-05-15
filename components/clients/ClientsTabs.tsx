'use client';

import { useState, type ReactNode } from 'react';
import { CLIENTS } from '@/lib/data';

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const GovIcon = () => (
  <svg {...iconProps}>
    <path d="M3 22V10M21 22V10M12 2L2 10h20L12 2z" />
    <rect x="6" y="14" width="3" height="8" />
    <rect x="15" y="14" width="3" height="8" />
    <rect x="10.5" y="14" width="3" height="8" />
  </svg>
);

const PrivateIcon = () => (
  <svg {...iconProps}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const GCCIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const TABS: {
  key: 'government' | 'private' | 'gcc';
  label: string;
  desc: string;
  Icon: () => ReactNode;
}[] = [
  {
    key: 'government',
    label: 'Government',
    Icon: GovIcon,
    desc: 'Ministries, government authorities and public sector organisations trusting D3 for critical IT infrastructure.',
  },
  {
    key: 'private',
    label: 'Private Sector',
    Icon: PrivateIcon,
    desc: 'Leading private enterprises across telecoms, manufacturing, retail and services.',
  },
  {
    key: 'gcc',
    label: 'GCC Clients',
    Icon: GCCIcon,
    desc: 'Regional clients across Bahrain, Saudi Arabia, UAE, Kuwait, Qatar and Oman.',
  },
];

export function ClientsTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]['key']>('government');
  const current = TABS.find((t) => t.key === active)!;
  const names = CLIENTS[active];

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg)' }}>
      <div className="section-container clients-tabs-wrap">
        <div className="clients-tabs" role="tablist" aria-label="Client categories">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active === tab.key}
              aria-controls={`clients-panel-${tab.key}`}
              id={`clients-tab-${tab.key}`}
              className={`clients-tab${active === tab.key ? ' clients-tab--on' : ''}`}
              onClick={() => setActive(tab.key)}
            >
              <span className="clients-tab-icon">
                <tab.Icon />
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        <div
          id={`clients-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`clients-tab-${active}`}
          className="clients-panel"
        >
          <div className="clients-panel-head">
            <span className="clients-panel-icon" aria-hidden>
              <current.Icon />
            </span>
            <div>
              <h2 className="clients-panel-title">{current.label}</h2>
              <p className="clients-panel-desc">{current.desc}</p>
            </div>
          </div>
          <ul className="clients-list">
            {names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .clients-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0;
        }
        .clients-tab {
          appearance: none;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 400;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .clients-tab-icon {
          display: flex;
          color: inherit;
          opacity: 0.85;
        }
        .clients-tab--on .clients-tab-icon {
          opacity: 1;
        }
        .clients-tab:hover {
          color: var(--heading);
        }
        .clients-tab--on {
          color: var(--heading);
          border-bottom-color: var(--heading);
        }
        .clients-panel {
          max-width: 900px;
        }
        .clients-panel-head {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 32px;
        }
        .clients-panel-icon {
          flex-shrink: 0;
          display: flex;
          margin-top: 4px;
          color: #002147;
        }
        .clients-panel-icon svg {
          width: 32px;
          height: 32px;
        }
        .clients-panel-title {
          font-family: var(--font);
          font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 400;
          letter-spacing: -0.6px;
          color: var(--heading);
          margin: 0 0 8px;
        }
        .clients-panel-desc {
          font-size: 15px;
          color: var(--body);
          line-height: 1.75;
          margin: 0;
          font-weight: 400;
        }
        .clients-list {
          list-style: disc;
          margin: 0;
          padding-left: 1.25em;
          columns: 2;
          column-gap: 48px;
        }
        .clients-list li {
          font-size: 14px;
          color: var(--body);
          line-height: 1.65;
          margin-bottom: 10px;
          break-inside: avoid;
          padding-left: 4px;
        }
        @media (max-width: 700px) {
          .clients-list {
            columns: 1;
          }
          .clients-tab {
            padding: 10px 14px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
