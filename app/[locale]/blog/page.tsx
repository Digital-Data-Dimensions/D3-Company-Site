import { BLOG_POSTS } from '@/lib/data';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { CTASection } from '@/components/home/CTASection';
import { pageCanonical } from '@/lib/solution-seo';
import { BlogList } from '@/components/blog/BlogList';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Blog & Resources | D3',
    description: 'Industry insights, product updates and best practices for enterprise IT from the D3 team — Bahrain and the GCC.',
    alternates: {
      canonical: pageCanonical(locale, '/blog'),
    },
  };
}

export default function BlogListPage() {
  return (
    <>
      <section className="page-hero" style={{ padding: '80px 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }} className="section-container">
          <SectionEyebrow>Resources</SectionEyebrow>
          <h1 style={{ fontFamily: 'var(--font)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: -1.5, lineHeight: 1.08, color: 'var(--heading)', marginBottom: 24, maxWidth: 700 }}>
            Insights & <em style={{ fontStyle: 'normal', color: 'var(--heading)' }}>guides</em>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--body)', lineHeight: 1.75, fontWeight: 400, maxWidth: 600 }}>
            Industry insights, product updates and best practices from the D3 team.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }} className="section-container">
          <BlogList posts={BLOG_POSTS} />
        </div>
        <style>{`
          .blog-toolbar {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 10px;
            margin-bottom: 28px;
          }
          .blog-sort-label {
            font-size: 13px;
            font-weight: 400;
            color: var(--muted);
          }
          .blog-sort {
            font-family: var(--font);
            font-size: 13px;
            font-weight: 400;
            color: var(--heading);
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 10px 14px;
            cursor: pointer;
            min-width: 160px;
          }
          .blog-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
          .blog-card:hover { transform: translateY(-5px); box-shadow: 0 12px 48px rgba(0,0,0,0.08); }
          @media (max-width: 900px) { .blog-grid { grid-template-columns: 1fr !important; } }
          .section-container { padding: 0 60px; }
          @media (max-width: 600px) { .section-container { padding: 0 20px !important; } }
        `}</style>
      </section>

      <CTASection />
    </>
  );
}
