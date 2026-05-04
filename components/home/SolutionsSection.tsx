import Image from 'next/image';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SOLUTIONS } from '@/lib/data';

const SOLUTION_IMAGES: Record<string, { src: string; alt: string }> = {
  'timetech-application':    { src: '/images/solutions/timeattendance-hero.png', alt: 'TimeTech Platform dashboard' },
  'time-attendance-system':  { src: '/images/solutions/timeattendance-shifts.png', alt: 'Time attendance system interface' },
  'time-attendance-enterprise': { src: '/images/solutions/timeattendance-hero.png', alt: 'TimeTech Enterprise attendance' },
  'hr-payroll-software':     { src: '/images/solutions/hrms-hero.png', alt: 'HR & Payroll software' },
  'visitor-management':      { src: '/images/solutions/visitor-hero.png', alt: 'Visitor management system' },
  'queue-management-system': { src: '/images/solutions/qms-hero.png', alt: 'Queue management system kiosk' },
  'digital-signage':         { src: '/images/solutions/signage-hero.jpg', alt: 'Digital signage display' },
  'rfid-asset-tracking':     { src: '/images/solutions/rfid-hero.png', alt: 'RFID asset tracking system' },
  'access-control-system':   { src: '/images/solutions/access-hero.jpeg', alt: 'IP CCTV and access control' },
  'erp-retail-management':   { src: '/images/solutions/erp-hero.png', alt: 'ERP retail management system' },
  'consultancy':             { src: '/images/solutions/consultancy-hero.png', alt: 'IT consultancy services' },
};

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}


export function SolutionsSection() {
  return (
    <section id="solutions" className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <RevealOnScroll>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <SectionEyebrow center>What We Offer</SectionEyebrow>
            </div>
            <h2 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: -1.2, lineHeight: 1.1, color: 'var(--heading)', marginBottom: 16 }}>
              Enterprise solutions for<br />every operational need
            </h2>
            <p style={{ fontSize: 16, color: 'var(--body)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
              From workforce management and queue systems to RFID tracking, digital signage and ERP. D3 delivers end-to-end technology for GCC enterprises.
            </p>
          </div>
        </RevealOnScroll>

        <div className="sol-grid">
          {SOLUTIONS.map((sol, i) => (
            <RevealOnScroll key={sol.slug} delay={i * 50}>
              <SolutionCard sol={sol} />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        .sol-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) { .sol-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px)  { .sol-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function SolutionCard({ sol }: { sol: (typeof SOLUTIONS)[0] }) {
  return (
    <a
      href={`/solutions/${sol.slug}`}
      className="sol-card"
      style={{ textDecoration: 'none' }}
    >
      {/* Product image area */}
      <div className="sol-img">
        {SOLUTION_IMAGES[sol.slug] ? (
          <Image
            src={SOLUTION_IMAGES[sol.slug].src}
            alt={SOLUTION_IMAGES[sol.slug].alt}
            width={720}
            height={405}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--bg-highlight)' }} />
        )}
      </div>

      {/* Card body */}
      <div className="sol-body">
        <div className="sol-num">{sol.num}</div>
        <h3 className="sol-title">{sol.title}</h3>
        <p className="sol-desc">{sol.desc}</p>

        <div className="sol-tags">
          {sol.tags.slice(0, 3).map(tag => (
            <span key={tag} className="sol-tag">{tag}</span>
          ))}
        </div>

        <div className="sol-link">
          Learn more <ArrowIcon />
        </div>
      </div>

      <style>{`
        .sol-card {
          display: flex;
          flex-direction: column;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .sol-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(0,33,71,0.09);
          border-color: var(--muted);
        }
        .sol-img {
          width: 100%;
          height: 190px;
          overflow: hidden;
          background: var(--bg-highlight);
          flex-shrink: 0;
        }
        .sol-body {
          padding: 24px 26px 26px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .sol-num {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .sol-title {
          font-family: var(--font);
          font-size: 17px;
          font-weight: 700;
          color: var(--heading);
          letter-spacing: -0.3px;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .sol-desc {
          font-size: 13px;
          color: var(--body);
          line-height: 1.68;
          margin-bottom: 18px;
          flex: 1;
        }
        .sol-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .sol-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          color: var(--muted);
          letter-spacing: 0.02em;
        }
        .sol-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          transition: color 0.2s;
        }
        .sol-card:hover .sol-link { color: var(--heading); }
      `}</style>
    </a>
  );
}
