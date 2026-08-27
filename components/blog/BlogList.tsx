'use client';

import { useMemo, useState } from 'react';
import { BLOG_POSTS, postsByNewest, postsByOldest } from '@/lib/data';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { ArrowIcon } from '@/components/shared/Button';
import { Link } from '@/i18n/navigation';

type SortKey = 'newest' | 'oldest' | 'title';
type Post = (typeof BLOG_POSTS)[number];

function sortPosts(posts: Post[], sort: SortKey): Post[] {
  if (sort === 'oldest') return postsByOldest(posts);
  if (sort === 'title') {
    return [...posts].sort((a, b) => a.title.localeCompare(b.title));
  }
  return postsByNewest(posts);
}

export function BlogList({ posts }: { posts: Post[] }) {
  const [sort, setSort] = useState<SortKey>('newest');
  const ordered = useMemo(() => sortPosts(posts, sort), [posts, sort]);

  return (
    <>
      <div className="blog-toolbar">
        <label htmlFor="blog-sort" className="blog-sort-label">Sort</label>
        <select
          id="blog-sort"
          className="blog-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="Sort articles"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      <div className="blog-grid">
        {ordered.map((post, i) => (
          <RevealOnScroll key={post.slug} delay={i % 2 * 80}>
            <Link href={`/blog/${post.slug}` as Parameters<typeof Link>[0]['href']} style={{
              display: 'block',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 20, padding: '32px 28px', textDecoration: 'none',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              className="blog-card"
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {post.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 11, fontWeight: 400, padding: '3px 8px', borderRadius: 4, background: 'var(--bg-surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}>{tag}</span>
                ))}
              </div>
              <h2 style={{ fontFamily: 'var(--font)', fontSize: 20, fontWeight: 400, color: 'var(--heading)', letterSpacing: -0.3, lineHeight: 1.3, marginBottom: 14 }}>{post.title}</h2>
              <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7, marginBottom: 24 }}>{post.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 400 }}>
                  {new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>
                  Read more <ArrowIcon size={13} />
                </div>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </>
  );
}
