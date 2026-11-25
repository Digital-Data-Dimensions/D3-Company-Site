import { NextRequest, NextResponse } from 'next/server';
import { createMailTransporter } from '@/lib/mail-transport';

interface ContactPayload {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  /** Honeypot: real users never fill this. */
  website?: unknown;
  /** Client timestamp (ms) of when the form was rendered. */
  startedAt?: unknown;
  /** Cloudflare Turnstile token (only when Turnstile is configured). */
  turnstileToken?: unknown;
}

const MIN_FILL_MS = 3000; // humans take longer than this to fill the form
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT = 3; // submissions per window per IP
const RATE_WINDOW_MS = 10 * 60 * 1000;

const LIMITS = { name: 100, company: 150, email: 200, phone: 40, message: 3000 };

// Best-effort in-memory limiter (per server instance). Pair with Turnstile for real protection.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
  }
  return false;
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

function validateEmail(email: string): boolean {
  return /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/.test(email);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Strip CR/LF so values can't inject headers or break subjects. */
function oneLine(s: string): string {
  return s.replace(/[\r\n]+/g, ' ').trim();
}

function str(v: unknown, max: number): string | null {
  if (v === undefined || v === null || v === '') return '';
  if (typeof v !== 'string' || v.length > max) return null;
  return v.trim();
}

function looksLikeSpam(fields: string[]): boolean {
  const text = fields.join(' ');
  const links = (text.match(/https?:\/\/|www\./gi) ?? []).length;
  return links > 1;
}

async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet — skip
  if (typeof token !== 'string' || !token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Same-origin only: browsers send Origin on cross-site POSTs.
    const origin = req.headers.get('origin');
    if (origin) {
      const host = req.headers.get('host');
      let originHost = '';
      try {
        originHost = new URL(origin).host;
      } catch {}
      if (!host || originHost !== host) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    let body: ContactPayload;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const ip = clientIp(req);

    // Honeypot filled or form submitted too fast / with a bad timestamp:
    // pretend success so bots don't adapt, but send nothing.
    const startedAt = typeof body.startedAt === 'number' ? body.startedAt : NaN;
    const elapsed = Date.now() - startedAt;
    const botSignal =
      (typeof body.website === 'string' && body.website.trim() !== '') ||
      !Number.isFinite(elapsed) ||
      elapsed < MIN_FILL_MS ||
      elapsed > MAX_AGE_MS;
    if (botSignal) {
      console.warn('Contact form: bot signal, dropped', { ip });
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = str(body.name, LIMITS.name);
    const company = str(body.company, LIMITS.company);
    const email = str(body.email, LIMITS.email);
    const phone = str(body.phone, LIMITS.phone);
    const message = str(body.message, LIMITS.message);

    if (
      name === null || company === null || email === null || phone === null || message === null ||
      !name || !company || !email || !validateEmail(email)
    ) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    if (!(await verifyTurnstile(body.turnstileToken, ip))) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }

    if (looksLikeSpam([name, company, message])) {
      console.warn('Contact form: spam content, dropped', { ip });
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Contact form: SMTP_USER and SMTP_PASS are not set');
      return NextResponse.json({ error: 'Email not configured' }, { status: 503 });
    }

    const transporter = createMailTransporter();

    const salesEmail =
      process.env.SALES_EMAIL || process.env.SMTP_USER || 'sales@dthree.co';

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : 'Not provided';
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : 'No message provided';

    // Email to sales team
    await transporter.sendMail({
      from: `"D3 Website" <${process.env.SMTP_USER}>`,
      to: salesEmail,
      replyTo: email,
      subject: `New Lead: ${oneLine(name)} — ${oneLine(company)}`,
      html: `
        <h2 style="color:#002147;font-family:Arial,sans-serif;">New Lead from D3 Website</h2>
        <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px 0;color:#8898AA;font-weight:600;width:120px">Name</td><td style="padding:8px 0;color:#3D3D5C">${safeName}</td></tr>
          <tr><td style="padding:8px 0;color:#8898AA;font-weight:600">Company</td><td style="padding:8px 0;color:#3D3D5C">${safeCompany}</td></tr>
          <tr><td style="padding:8px 0;color:#8898AA;font-weight:600">Email</td><td style="padding:8px 0;color:#3D3D5C"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding:8px 0;color:#8898AA;font-weight:600">Phone</td><td style="padding:8px 0;color:#3D3D5C">${safePhone}</td></tr>
          <tr><td style="padding:8px 0;color:#8898AA;font-weight:600;vertical-align:top">Message</td><td style="padding:8px 0;color:#3D3D5C">${safeMessage}</td></tr>
        </table>
        <p style="margin-top:24px;font-size:12px;color:#8898AA;font-family:Arial,sans-serif">Submitted from D3 website at ${new Date().toISOString()} (IP ${escapeHtml(ip)})</p>
      `,
    });

    // Auto-response to lead (only reached after all checks pass)
    await transporter.sendMail({
      from: `"D3 — Digital Data Dimensions" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting D3',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#003580;padding:32px;border-radius:8px 8px 0 0">
            <h1 style="color:#fff;margin:0;font-size:24px">D3 <span style="color:#FF6B2B">Digital Data Dimensions</span></h1>
          </div>
          <div style="background:#F4F6FB;padding:32px;border-radius:0 0 8px 8px">
            <p style="color:#3D3D5C;font-size:16px">Dear ${safeName},</p>
            <p style="color:#3D3D5C;font-size:15px;line-height:1.7">Thank you for reaching out to D3. We've received your enquiry and a member of our team will be in touch within 24 hours.</p>
            <p style="color:#3D3D5C;font-size:15px;line-height:1.7">In the meantime, you can explore our solutions at <a href="https://dthree.co" style="color:#FF6B2B">dthree.co</a>.</p>
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid #E2E8F0">
              <p style="color:#8898AA;font-size:13px;margin:0">D3 — Digital Data Dimensions</p>
              <p style="color:#8898AA;font-size:13px;margin:4px 0">Manama, Kingdom of Bahrain</p>
              <p style="color:#8898AA;font-size:13px;margin:4px 0"><a href="tel:+97317000000" style="color:#8898AA">+973 1700 0000</a> · <a href="mailto:info@dthree.co" style="color:#8898AA">info@dthree.co</a></p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
