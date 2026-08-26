# dthree.co SEO work — what was done

Summary of SEO and content updates shipped to `main` on [Digital-Data-Dimensions/D3-Company-Site](https://github.com/Digital-Data-Dimensions/D3-Company-Site.git). This is a record of work, not a ranking guarantee.

---

## Technical SEO (foundation)

| Item | Change |
|---|---|
| Canonicals | Every blog, case study, and static page now has its own canonical (`https://www.dthree.co/en/...`) via `pageCanonical()` in `lib/solution-seo.ts`. Nested pages no longer inherit `/en` from the locale layout. |
| Sitemap | Removed dead `/en/solutions` and `/en/industries` index URLs. Added careers, news, privacy-policy. Blog posts are included automatically from `BLOG_POSTS`. |
| robots.txt | Sitemap URL uses `https://www.dthree.co/sitemap.xml` (www, matching canonicals). |
| Homepage cards | Solution cards use next-intl `Link` so they go to `/en/solutions/{slug}` without a middleware redirect hop. |
| Favicon | Site icon set to `public/images/logos/favicon.png`. |
| Global keywords | Trimmed to 6 terms: D3, D3 Bahrain, TimeTech, Time Attendance System Bahrain, HRMS Bahrain, Enterprise IT Solutions Bahrain. |

Legacy 301s in `next.config.ts` were already in place (`/Time-Attendance`, `/RFID-Solutions`, `/hrpayroll`, `/CCTV`, etc.).

---

## Solution pages — primary keywords

`seoKeyword` (meta keywords) on each product page:

| Solution slug | Primary keyword |
|---|---|
| `time-attendance-system` | Time Attendance System Bahrain |
| `time-attendance-enterprise` | Enterprise Time Attendance |
| `hr-payroll-software` | HRMS Bahrain |
| `visitor-management` | Visitor Management System Bahrain |
| `queue-management-system` | Queue Management System Bahrain |
| `rfid-asset-tracking` | RFID Asset Tracking Bahrain |
| `access-control-system` | Access Control System Bahrain |
| `digital-signage` | Digital Signage Bahrain |
| `erp-retail-management` | ERP Software Bahrain |
| `consultancy` | IT Consultancy Bahrain |

Secondary keywords are woven into titles, meta descriptions, and H2 body copy in `lib/solution-seo.ts`. Industry pages (government, healthcare, retail, logistics) have matching H1/title/description keywords.

**Deferred:** `timetech-application` remains unpublished (not in nav or sitemap).

---

## Blog — newest first

`postsByNewest()` in `lib/data.ts` sorts `/en/blog` and the article “More Articles” sidebar by `publishedAt` descending. Newest guides appear at the top.

---

## All live articles (23)

Live URL prefix: `https://www.dthree.co/en/blog/`

### Product / solution funnel guides (10)

Each funnels to a solution page via CTA + `relatedBlogSlugs`.

| Date | Slug | Funnels to |
|---|---|---|
| 2026-09-09 | `access-control-cctv-security-bahrain` | Access Control |
| 2026-09-02 | `visitor-management-system-bahrain-guide` | Visitor Management |
| 2026-08-26 | `it-consultancy-managed-services-bahrain` | IT Consultancy |
| 2026-08-19 | `erp-retail-management-software-bahrain` | ERP & Retail |
| 2026-08-12 | `digital-signage-led-displays-bahrain` | Digital Signage |
| 2026-08-05 | `enterprise-time-attendance-multi-site-bahrain` | Enterprise Time Attendance |
| 2026-07-12 | `rfid-asset-tracking-warehouse-management-bahrain` | RFID |
| 2026-07-10 | `queue-management-system-bahrain` | Queue Management |
| 2026-07-05 | `hrms-payroll-software-bahrain-guide` | HRMS |
| 2026-07-01 | `biometric-attendance-system-bahrain` | Time Attendance (standard) |

### HR / compliance funnel (8) → HRMS

| Date | Slug | Primary topic |
|---|---|---|
| 2026-07-30 | `overtime-calculation-bahrain` | Overtime |
| 2026-07-28 | `offer-letter-sample-bahrain` | Offer letter |
| 2026-07-26 | `employment-contract-bahrain` | Employment contract |
| 2026-07-24 | `salary-slip-format-bahrain` | Payslip |
| 2026-07-22 | `bahrain-labour-law-resignation-notice` | Resignation / notice |
| 2026-07-20 | `average-salary-bahrain` | Average salary |
| 2026-07-18 | `indemnity-calculation-bahrain` | Indemnity / EOS |
| 2026-07-15 | `gosi-contribution-calculation-bahrain` | GOSI |
| 2026-07-08 | `lmra-compliance-wps-payroll-bahrain` | LMRA / WPS |

### Legacy posts (4) — retagged to avoid keyword cannibalization

| Date | Slug |
|---|---|
| 2026-04-01 | `choosing-hr-software-bahrain` |
| 2026-03-15 | `rfid-asset-tracking-manufacturing` |
| 2026-03-01 | `queue-management-government-sector` |
| 2026-02-15 | `top-5-benefits-biometric-attendance` |

---

## Files that own SEO copy

| File | Role |
|---|---|
| `lib/solution-seo.ts` | Solution/industry titles, descriptions, H2s, related blog slugs, canonical helper |
| `app/[locale]/solutions/[slug]/page.tsx` | `SOLUTION_DETAILS.seoKeyword` |
| `lib/data.ts` | `BLOG_POSTS` registry + `postsByNewest()` |
| `lib/blog-articles.ts` | Article bodies |
| `app/sitemap.ts` / `app/robots.ts` | Crawl files |
| `strategy/` | Drafts and this completion log |

---

## Not done (called out as later / Phase 2)

- Schema / local SEO extras mentioned in the original keyword package
- Keep vs redirect for `/en/solutions/timetech-application`
- Arabic (`/ar/`) content parity
- Pushing to the personal `origin` remote (`afkhan-fardeen/d3`) — production remote is `d3`
