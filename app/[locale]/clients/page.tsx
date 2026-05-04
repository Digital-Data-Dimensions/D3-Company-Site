import { CLIENTS } from '@/lib/data';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { CTASection } from '@/components/home/CTASection';

export async function generateMetadata() {
  return {
    title: 'Our Clients | D3',
    description: '500+ clients across the GCC trust D3, from government ministries and leading banks to retail chains, hospitals and industrial organisations.',
  };
}

const GovIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#002147' }}>
    <path d="M3 22V10M21 22V10M12 2L2 10h20L12 2z"/><rect x="6" y="14" width="3" height="8"/><rect x="15" y="14" width="3" height="8"/><rect x="10.5" y="14" width="3" height="8"/>
  </svg>
);
const PrivateIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#002147' }}>
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);
const GCCIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#002147' }}>
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const CATEGORIES = [
  { key: 'government', label: 'Government', icon: <GovIcon />, desc: 'Ministries, government authorities and public sector organisations trusting D3 for their critical IT infrastructure.' },
  { key: 'private', label: 'Private Sector', icon: <PrivateIcon />, desc: 'Leading private enterprises across banking, telecoms, manufacturing and services.' },
  { key: 'gcc', label: 'GCC Clients', icon: <GCCIcon />, desc: 'Regional clients across Bahrain, Saudi Arabia, UAE, Kuwait, Qatar and Oman.' },
] as const;

export default function ClientsPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero" style={{ padding: '80px 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }} className="section-container">
          <SectionEyebrow>Our Clients</SectionEyebrow>
          <h1 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.08, color: 'var(--heading)', marginBottom: 24, maxWidth: 700 }}>
            500+ organisations trust <em style={{ fontStyle: 'normal', color: 'var(--cta)' }}>D3</em>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--body)', lineHeight: 1.75, fontWeight: 400, maxWidth: 600 }}>
            From government ministries to leading banks, retailers and hospitals across the GCC and beyond. Building long-term partnerships since 2010.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)', display: 'flex', gap: 60, flexWrap: 'wrap' }} className="section-container">
          {[
            { num: '500+', label: 'Total Clients' },
            { num: '15+', label: 'Years of Trust' },
            { num: '10+', label: 'Countries' },
            { num: '99.9%', label: 'Client Retention' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 36, fontWeight: 400, color: 'var(--heading)', letterSpacing: -1, lineHeight: 1, marginBottom: 4 }}>
                <span style={{ color: 'var(--cta)' }}>{s.num}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Client categories */}
      {CATEGORIES.map((cat, ci) => (
        <section key={cat.key} style={{
          padding: '80px 0',
          background: ci % 2 === 0 ? 'var(--bg)' : 'var(--bg-surface)',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }} className="section-container">
            <RevealOnScroll>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 48, flexWrap: 'wrap' }}>
                <div style={{ flexShrink: 0, marginTop: 4 }}>{cat.icon}</div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 400, letterSpacing: -0.8, color: 'var(--heading)', marginBottom: 8 }}>
                    {cat.label}
                  </h2>
                  <p style={{ fontSize: 15, color: 'var(--body)', fontWeight: 400, maxWidth: 500, lineHeight: 1.7 }}>{cat.desc}</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={80}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {CLIENTS[cat.key].map((name) => (
                  <div key={name} style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 100,
                    padding: '12px 24px',
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'var(--body)',
                    transition: 'all 0.2s',
                    cursor: 'default',
                  }}
                    className="client-pill-lg"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      ))}

      <style>{`
        .client-pill-lg:hover { border-color: var(--cta) !important; color: var(--cta) !important; transform: translateY(-2px); box-shadow: 0 4px 16px var(--cta-glow); }
        .section-container { padding: 0 60px; }
        @media (max-width: 600px) { .section-container { padding: 0 20px !important; } }
      `}</style>

      <CTASection />
    </>
  );
}
