import nodemailer from 'nodemailer';

/** SMTP settings for IONOS (port 587 + STARTTLS) and compatible providers. */
export function createMailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.ionos.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure =
    process.env.SMTP_SECURE === 'true' ||
    process.env.SMTP_SECURE === '1' ||
    port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    // Force upgrade to TLS on 587 (IONOS documents “Security: TLS” for this port)
    requireTLS: !secure && port === 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}
