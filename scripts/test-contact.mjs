/**
 * POST /api/contact against a running Next dev server (default http://127.0.0.1:3000).
 * Next.js loads `.env.local` automatically — do not commit secrets; set SMTP_* there.
 *
 * Usage: `npm run dev` (other terminal), then `npm run test:contact`
 */
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';

async function main() {
  const ping = await fetch(`${base}/en`, { method: 'GET' }).catch(() => null);
  if (!ping || !ping.ok) {
    console.error('Server not reachable at', base, '— start with: npm run dev');
    process.exit(1);
  }

  const body = {
    name: 'Curl API Test',
    company: 'D3 Website',
    email: 'partner@time-tech.co',
    phone: '—',
    message: 'Automated test via npm run test:contact',
  };

  const res = await fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  console.log('HTTP', res.status, text);
  process.exit(res.ok ? 0 : 1);
}

main();
