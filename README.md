# D3 Website — Digital Data Dimensions

B2B enterprise lead generation platform built with Next.js 16 + next-intl. Content is **static** (`lib/data.ts`); edit that file (and page-specific constants) to update copy, blog posts, case studies, and solution details.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: CSS custom properties (no Tailwind utility classes needed — all inline styles + CSS variables)
- **Content**: Static TypeScript / JSON in `lib/data.ts` and co-located page data
- **i18n**: next-intl (English only; locale segment `/en` for routing)
- **Email**: Nodemailer (SMTP; defaults tuned for IONOS, Gmail-compatible via env)
- **Hosting**: Vercel
- **Font**: Montserrat (Google Fonts)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env.local` in the project root with at least:

| Variable | Description |
|---|---|
| `SMTP_USER` | Full email address used to authenticate with your mail provider (e.g. IONOS mailbox) |
| `SMTP_PASS` | That mailbox’s password (or app-specific password if your host requires it) |
| `SMTP_HOST` | SMTP server hostname (default: `smtp.ionos.com`) |
| `SMTP_PORT` | SMTP port (default: `587`). Use `465` with `SMTP_SECURE=true` if your provider requires SSL on connect |
| `SMTP_SECURE` | Set to `true` when using port 465 (implicit TLS). Omit for port 587 (STARTTLS) |
| `SALES_EMAIL` | Inbox for **new lead** notifications. If omitted, leads go to `SMTP_USER` (same IONOS inbox) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (optional) |

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

## Project Structure

```
d3-website/
├── app/
│   ├── [locale]/           # Localized routes (currently `en` only)
│   │   ├── page.tsx        # Homepage
│   │   ├── solutions/[slug]/
│   │   ├── industries/[slug]/
│   │   ├── case-studies/[slug]/
│   │   ├── clients/
│   │   ├── contact/
│   │   └── blog/[slug]/
│   ├── api/contact/        # SMTP email handler
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/             # Navbar, Footer, ThemeProvider, FloatingActions, GTMScript
│   ├── home/               # All homepage sections
│   ├── shared/             # Button, SectionEyebrow, RevealOnScroll
│   └── forms/              # LeadForm
├── lib/
│   └── data.ts             # Solutions, industries, case studies, clients, blog posts
├── messages/
│   └── en.json
└── i18n/
    ├── routing.ts
    ├── request.ts
    └── navigation.ts
```

## Pages

| Route | Description |
|---|---|
| `/en` | Homepage |
| `/en/solutions/[slug]` | Solution pages (7 MVPs) |
| `/en/industries/[slug]` | Industry pages (5) |
| `/en/case-studies` | Case studies list |
| `/en/case-studies/[slug]` | Case study detail (6) |
| `/en/clients` | Clients page |
| `/en/contact` | Contact + lead form |
| `/en/blog` | Blog list |
| `/en/blog/[slug]` | Blog post (4) |

## Design Tokens

### Light Mode
- Page BG: `#FFFFFF`
- Surface: `#F4F6FB`
- Headings: `#002147`
- Body: `#3D3D5C`
- Nav: `#003580`
- CTA: `#FF6B2B`
- Border: `#E2E8F0`

### Dark Mode
- Page BG: `#0F1214`
- Surface: `#1A1A2E`
- Headings: `#FFFFFF`
- Body: `#B0BDD0`
- CTA: `#FF6B2B`
- Border: `#2A3550`

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard or via CLI:
vercel env add SMTP_USER
vercel env add SMTP_PASS
# Optional overrides (IONOS defaults apply if omitted):
# vercel env add SMTP_HOST
# vercel env add SMTP_PORT
# vercel env add SALES_EMAIL
vercel env add NEXT_PUBLIC_GTM_ID
```

## IONOS email (recommended)

1. In IONOS, create or use an existing mailbox (e.g. `contact@yourdomain.com`).
2. Set environment variables (locally in `.env.local` and on Vercel):

```env
SMTP_HOST=smtp.ionos.com
SMTP_PORT=587
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your-mailbox-password
# Optional: omit to receive leads at SMTP_USER
# SALES_EMAIL=leads@yourdomain.com
```

3. Outgoing mail uses `SMTP_USER` as the **From** address, so it must be a mailbox you are allowed to send as (same account is typical).

If IONOS shows a different SMTP host for your contract (e.g. regional), set `SMTP_HOST` to the value from their help centre.

### Test the contact API locally

With `.env.local` containing valid `SMTP_USER` and `SMTP_PASS`, start the dev server (`npm run dev`), then either:

```bash
curl -sS -X POST "http://127.0.0.1:3000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","company":"ACME","email":"your-real-inbox@example.com","phone":"","message":"curl test"}'
```

…or run `npm run test:contact` (uses `partner@time-tech.co` as the test lead email so the auto-reply goes to the same mailbox when that is your `SMTP_USER`).

Use a **real** `email` you can open if you want to verify the thank-you message; avoid fake domains or the second mail may bounce.

## Gmail SMTP (alternative)

Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, and use a [Google App Password](https://myaccount.google.com/apppasswords) as `SMTP_PASS` (2-Step Verification required).
