import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processQuoteSubmission } from './lib/quote-handler.js';

function requestToFormData(req: VercelRequest): FormData {
  const formData = new FormData();
  const body = req.body;

  if (body && typeof body === 'object' && !Buffer.isBuffer(body)) {
    for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
      if (Array.isArray(value)) {
        formData.set(key, String(value[0] ?? ''));
      } else if (value != null) {
        formData.set(key, String(value));
      }
    }
    return formData;
  }

  const raw =
    typeof body === 'string' ? body : Buffer.isBuffer(body) ? body.toString('utf8') : '';

  if (raw) {
    for (const [key, value] of new URLSearchParams(raw)) {
      formData.set(key, value);
    }
  }

  return formData;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const formData = requestToFormData(req);
    const result = await processQuoteSubmission(formData, {
      mailgunApiKey: process.env.MAILGUN_API_KEY,
      mailgunDomain: process.env.MAILGUN_DOMAIN,
      quoteToEmail: process.env.QUOTE_TO_EMAIL,
      turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
    });

    if (!result.ok) {
      console.error('Quote submission failed:', result.status, result.message);
      return res.redirect(302, '/contact-us/?error=1');
    }

    return res.redirect(302, '/contact-us/?sent=1');
  } catch (error) {
    console.error('Quote handler crashed:', error);
    return res.redirect(302, '/contact-us/?error=1');
  }
}
