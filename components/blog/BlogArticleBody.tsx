import { Fragment, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import type { BlogBlock } from '@/lib/blog-articles';

/** Parse **bold** and [label](url) markers into React nodes */
function richText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        const [, label, href] = m;
        const isExternal = href.startsWith('http');
        if (isExternal) {
          nodes.push(
            <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="blog-inline-link">
              {label}
            </a>,
          );
        } else {
          nodes.push(
            <Link key={key++} href={href as Parameters<typeof Link>[0]['href']} className="blog-inline-link">
              {label}
            </Link>,
          );
        }
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function BlogArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="blog-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={i} className="blog-p">
                {richText(block.text)}
              </p>
            );
          case 'h2':
            return (
              <h2 key={i} className="blog-h2">
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="blog-h3">
                {block.text}
              </h3>
            );
          case 'ul':
            return (
              <ul key={i} className="blog-ul">
                {block.items.map((item, j) => (
                  <li key={j}>{richText(item)}</li>
                ))}
              </ul>
            );
          case 'faq':
            return (
              <div key={i} className="blog-faq">
                {block.items.map((item, j) => (
                  <Fragment key={j}>
                    <h3 className="blog-faq-q">{item.q}</h3>
                    <p className="blog-faq-a">{richText(item.a)}</p>
                  </Fragment>
                ))}
              </div>
            );
          case 'note':
            return (
              <p key={i} className="blog-note">
                {richText(block.text)}
              </p>
            );
          default:
            return null;
        }
      })}

      <style>{`
        .blog-p {
          font-size: 15px;
          color: var(--body);
          line-height: 1.85;
          margin: 0 0 22px;
          font-weight: 400;
        }
        .blog-h2 {
          font-family: var(--font);
          font-size: clamp(22px, 2.4vw, 28px);
          font-weight: 400;
          letter-spacing: -0.6px;
          color: var(--heading);
          margin: 40px 0 16px;
          line-height: 1.25;
        }
        .blog-h3 {
          font-family: var(--font);
          font-size: 18px;
          font-weight: 400;
          color: var(--heading);
          margin: 28px 0 10px;
          line-height: 1.35;
        }
        .blog-ul {
          margin: 0 0 24px;
          padding-left: 1.25em;
          list-style: disc;
        }
        .blog-ul li {
          font-size: 15px;
          color: var(--body);
          line-height: 1.8;
          margin-bottom: 10px;
          padding-left: 4px;
        }
        .blog-faq {
          margin: 8px 0 28px;
        }
        .blog-faq-q {
          font-family: var(--font);
          font-size: 16px;
          font-weight: 500;
          color: var(--heading);
          margin: 22px 0 8px;
          line-height: 1.4;
        }
        .blog-faq-a {
          font-size: 15px;
          color: var(--body);
          line-height: 1.8;
          margin: 0 0 4px;
        }
        .blog-note {
          font-size: 15px;
          color: var(--body);
          line-height: 1.8;
          margin: 36px 0 0;
          padding: 20px 22px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          font-style: italic;
        }
        .blog-inline-link {
          color: var(--cta);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .blog-inline-link:hover {
          color: var(--heading);
        }
        .blog-body strong {
          font-weight: 600;
          color: var(--heading);
        }
      `}</style>
    </div>
  );
}
