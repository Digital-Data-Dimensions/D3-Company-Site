# Solution Page Content Gap — Keyword Update Table

Covers all 6 previously-unfunneled solution pages. First 4 are new drafts in this package; last 2 (visitor management, access control) were drafted earlier and just need renaming/adapting into this repo's `seoTitle`/`seoKeyword`/tags convention before adding to `lib/blog-articles.ts`.

| Solution slug | Existing seoKeyword | New blog slug | Primary tags to add |
|---|---|---|---|
| `time-attendance-enterprise` | Enterprise Time Attendance | `enterprise-time-attendance-multi-site-bahrain` | Enterprise Time Attendance, Multi-Company HRMS, GCC Time Attendance, Multi-Site Workforce Management |
| `digital-signage` | Digital Signage Bahrain | `digital-signage-led-displays-bahrain` | Digital Signage Bahrain, LED Display Solutions, Video Wall Bahrain, Indoor Outdoor Signage |
| `erp-retail-management` | ERP Software Bahrain | `erp-retail-management-software-bahrain` | ERP Software Bahrain, Retail Management Software, Inventory Management Software |
| `consultancy` | IT Consultancy Bahrain | `it-consultancy-managed-services-bahrain` | IT Consultancy Bahrain, Managed IT Services Bahrain, Digital Transformation Bahrain |
| `visitor-management` | Visitor Management System Bahrain | `visitor-management-system-bahrain-guide` *(adapt from earlier draft)* | Visitor Management System Bahrain, Digital Transformation Bahrain, Government IT Solutions |
| `access-control-system` | Access Control System Bahrain | `access-control-cctv-security-bahrain` *(adapt from earlier draft)* | Access Control System Bahrain, IP CCTV Bahrain, Biometric Access Control |

## Implementation steps for Cursor
1. Add each article's content into `lib/blog-articles.ts` following the existing structured-block format used by the 13 current Tier 1/2 posts (each `.md` file here has clearly marked `## H2` sections, an `## INTRO`, and an `## FAQ` block that maps directly to that structure)
2. Add matching entries to `BLOG_POSTS` in `lib/data.ts` (slug, title, seoTitle, excerpt, tags, publishedAt)
3. Add each new slug to `relatedBlogSlugs` on its corresponding solution page in `lib/solution-seo.ts`, so the solution page links to its new funnel post
4. Add the reciprocal "Related posts" links noted at the bottom of each `.md` file
5. Add all 6 new slugs to `app/sitemap.ts`
6. Stagger publishing 5-7 days apart, not all at once

## Reminder on ranking expectations
No content update guarantees a permanent #1 position — Google's results shift with algorithm updates and competitor activity. What these updates do is bring your 6 previously-unsupported solution pages up to the same on-page + long-tail structure as your 4 pages that are already funneling search traffic well. Combined with the schema markup and local SEO items in the Phase 2 plan, this is the strongest realistic path to consistently ranking near the top for these Bahrain-specific terms — not a one-time guarantee.
