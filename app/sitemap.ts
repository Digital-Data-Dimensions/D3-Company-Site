import { MetadataRoute } from 'next';
import { SOLUTIONS, INDUSTRIES, CASE_STUDIES, BLOG_POSTS, isIndexablePost } from '@/lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.dthree.co';
const LOCALES = ['en'];

// Only pages with a real date carry <lastmod>. Google ignores a lastmod that is
// the same on every URL, and changefreq/priority are ignored entirely.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];
  const posts = BLOG_POSTS.filter(isIndexablePost);
  const newestPost = posts.map((p) => p.publishedAt).sort().at(-1);

  const staticPages = ['', '/about', '/projects', '/partners', '/case-studies', '/clients', '/contact', '/blog', '/careers', '/news', '/privacy-policy'];
  for (const locale of LOCALES) {
    for (const page of staticPages) {
      routes.push({
        url: `${BASE_URL}/${locale}${page}`,
        ...(page === '/blog' && newestPost ? { lastModified: new Date(newestPost) } : {}),
      });
    }
  }

  for (const sol of SOLUTIONS) {
    for (const locale of LOCALES) routes.push({ url: `${BASE_URL}/${locale}/solutions/${sol.slug}` });
  }

  for (const ind of INDUSTRIES) {
    for (const locale of LOCALES) routes.push({ url: `${BASE_URL}/${locale}/industries/${ind.slug}` });
  }

  for (const cs of CASE_STUDIES) {
    for (const locale of LOCALES) routes.push({ url: `${BASE_URL}/${locale}/case-studies/${cs.slug}` });
  }

  for (const post of posts) {
    for (const locale of LOCALES) {
      routes.push({ url: `${BASE_URL}/${locale}/blog/${post.slug}`, lastModified: new Date(post.publishedAt) });
    }
  }

  return routes;
}
