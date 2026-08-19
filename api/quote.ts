import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processQuoteSubmission } from '../lib/quote-handler';

function getEnv() {
  return {
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
    quoteToEmail: process.env.QUOTE_TO_EMAIL,
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
  };
}

function bodyToFormData(body: Record<string, unknown>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    if (value != null) formData.set(key, String(value));
  }
  return formData;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = bodyToFormData((req.body ?? {}) as Record<string, unknown>);
  const result = await processQuoteSubmission(formData, getEnv());

  if (!result.ok) {
    return res.redirect(302, '/contact-us/?error=1');
  }

  return res.redirect(302, '/contact-us/?sent=1');
}
