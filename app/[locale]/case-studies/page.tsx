import { CASE_STUDIES } from '@/lib/data';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { CTASection } from '@/components/home/CTASection';

export async function generateMetadata() {
  return {
    title: 'Client Projects | D3',
    description: 'Real projects delivered by D3 for government ministries, enterprises and institutions across Bahrain and the GCC.',
  };
}

export default function CaseStudiesListPage() {
  return (
    <>
      <section style={{ padding: '80px 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
          <SectionEyebrow>What We&apos;ve Done</SectionEyebrow>
          <h1 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, letterSpacing: -1.5, lineHeight: 1.08, color: 'var(--heading)', marginBottom: 24, maxWidth: 700 }}>
            Client Projects
          </h1>
          <p style={{ fontSize: 17, color: 'var(--body)', lineHeight: 1.75, fontWeight: 400, maxWidth: 600 }}>
            A selection of real deployments delivered by D3 across government, banking, education and the private sector in Bahrain and the GCC.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="cs-list-grid">
            {CASE_STUDIES.map((cs, i) => (
              <RevealOnScroll key={cs.slug} delay={i % 3 * 60}>
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '28px 24px',
                  height: '100%',
                }}>
                  <div style={{ marginBottom: 16 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 400, padding: '3px 10px', borderRadius: 6,
                      background: 'var(--bg-surface)', color: 'var(--muted)',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{cs.clientType}</span>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--heading)', marginBottom: 14, lineHeight: 1.35 }}>{cs.clientName}</div>
                  <div style={{ fontSize: 11, fontWeight: 400, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>What we delivered</div>
                  <div style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.7, fontWeight: 400 }}>{cs.solution}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
        <style>{`
          .cs-list-grid { grid-template-columns: repeat(3, 1fr); }
          @media (max-width: 1100px) { .cs-list-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 700px) { .cs-list-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <CTASection />
    </>
  );
}
