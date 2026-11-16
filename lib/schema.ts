import { SITE_URL } from '@/lib/solution-seo';

const ORG_ID = `${SITE_URL}/#organization`;

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function blogPosting({
  slug,
  title,
  description,
  publishedAt,
  modifiedAt,
}: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
}) {
  const url = `${SITE_URL}/en/blog/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/og-image.png`,
    inLanguage: 'en',
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    author: { '@type': 'Organization', '@id': ORG_ID, name: 'D3 Digital Data Dimensions' },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: 'D3 Digital Data Dimensions' },
  };
}

export function serviceSchema({ slug, name, description }: { slug: string; name: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}/en/solutions/${slug}`,
    serviceType: name,
    provider: { '@type': 'Organization', '@id': ORG_ID, name: 'D3 Digital Data Dimensions' },
    areaServed: { '@type': 'Country', name: 'Bahrain' },
  };
}
