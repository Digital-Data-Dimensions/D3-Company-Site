'use client';

import { useState } from 'react';
import { CLIENTS } from '@/lib/data';

const TABS = [
  {
    key: 'government' as const,
    label: 'Government',
    desc: 'Ministries, government authorities and public sector organisations trusting D3 for critical IT infrastructure.',
  },
  {
    key: 'private' as const,
    label: 'Private Sector',
    desc: 'Leading private enterprises across telecoms, manufacturing, retail and services.',
  },
  {
    key: 'gcc' as const,
    label: 'GCC Clients',
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
          <p className="clients-panel-desc">{current.desc}</p>
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
        .clients-panel-desc {
          font-size: 15px;
          color: var(--body);
          line-height: 1.75;
          margin: 0 0 28px;
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
