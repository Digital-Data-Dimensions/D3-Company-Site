'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Button, ArrowIcon } from '@/components/shared/Button';

interface LeadFormProps {
  dark?: boolean;
  onSuccess?: () => void;
}

export function LeadForm({ dark = false, onSuccess }: LeadFormProps) {
  const [state, setState] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [honey, setHoney] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!turnstileSiteKey) return;
    (window as unknown as { __d3TurnstileCb?: (t: string) => void }).__d3TurnstileCb = setTurnstileToken;
  }, [turnstileSiteKey]);

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 400, letterSpacing: '0.04em',
    color: dark ? 'rgba(255,255,255,0.6)' : 'var(--body)',
    display: 'block', marginBottom: 6,
    textTransform: 'uppercase',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px',
    borderRadius: 8, border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--border)'}`,
    background: dark ? 'rgba(255,255,255,0.06)' : 'var(--bg)',
    color: dark ? '#fff' : 'var(--heading)',
    fontSize: 16, fontFamily: 'var(--font)', /* 16px prevents iOS zoom */
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...state, website: honey, startedAt, turnstileToken }),
      });
      if (res.ok) {
        setStatus('success');
        setState({ name: '', company: '', email: '', phone: '', message: '' });
        onSuccess?.();
        if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
          ((window as unknown as { dataLayer: unknown[] }).dataLayer).push({ event: 'form_submit', form_type: 'lead' });
        }
      } else {
        setStatus('error');
        // Turnstile tokens are single-use: get a fresh one for the retry
        setTurnstileToken('');
        (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <div style={{ fontSize: 18, fontWeight: 400, color: dark ? '#fff' : 'var(--heading)', marginBottom: 8 }}>Thank you!</div>
        <div style={{ fontSize: 14, color: dark ? 'rgba(255,255,255,0.6)' : 'var(--body)' }}>We&apos;ll be in touch within 24 hours.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input style={inputStyle} required placeholder="Ahmed Al-Mansoori" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Company *</label>
          <input style={inputStyle} required placeholder="Your Company" value={state.company} onChange={(e) => setState({ ...state, company: e.target.value })} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>Email *</label>
          <input type="email" style={inputStyle} required placeholder="you@company.com" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input type="tel" style={inputStyle} placeholder="+973 XXXX XXXX" value={state.phone} onChange={(e) => setState({ ...state, phone: e.target.value })} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} placeholder="Tell us about your project..." value={state.message} onChange={(e) => setState({ ...state, message: e.target.value })} />
      </div>

      {/* Honeypot: off-screen (not display:none, which some bots skip); sent to the server and checked there */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} /></label>
      </div>

      {turnstileSiteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div
            ref={turnstileRef}
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-callback="__d3TurnstileCb"
          />
        </>
      )}

      {status === 'error' && (
        <div style={{ fontSize: 13, color: '#ef4444', padding: '10px 14px', background: 'rgba(239,68,68,0.1)', borderRadius: 8 }}>
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: 'var(--cta)', color: '#fff',
          padding: '14px 28px', borderRadius: 8,
          fontSize: 14, fontWeight: 400, border: 'none', cursor: 'pointer',
          letterSpacing: '0.02em',
          boxShadow: '0 4px 20px var(--cta-glow)',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        {status === 'loading' ? 'Sending...' : <>Send Message <ArrowIcon /></>}
      </button>
    </form>
  );
}
