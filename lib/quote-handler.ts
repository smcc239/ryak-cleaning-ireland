export interface QuoteFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  gdprConsent: string;
  turnstileToken: string;
}

export interface QuoteEnv {
  mailgunApiKey?: string;
  mailgunDomain?: string;
  quoteToEmail?: string;
  turnstileSecretKey?: string;
}

export function parseQuoteFormData(formData: FormData): QuoteFormData {
  return {
    firstName: String(formData.get('firstName') ?? '').trim(),
    lastName: String(formData.get('lastName') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    service: String(formData.get('service') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    gdprConsent: String(formData.get('gdprConsent') ?? '').trim(),
    turnstileToken: String(formData.get('cf-turnstile-response') ?? '').trim(),
  };
}

export function validateQuoteForm(data: QuoteFormData): string | null {
  if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.service) {
    return 'Missing required fields';
  }
  if (data.gdprConsent !== 'yes') {
    return 'GDPR consent is required';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Invalid email address';
  }
  return null;
}

async function verifyTurnstile(secret: string, token: string): Promise<boolean> {
  if (!token) return false;
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = (await verify.json()) as { success: boolean };
  return result.success;
}

export async function sendQuoteEmail(data: QuoteFormData, env: QuoteEnv): Promise<void> {
  const { mailgunApiKey, mailgunDomain, quoteToEmail = 'info@ryakcleaning.ie' } = env;

  if (!mailgunApiKey || !mailgunDomain) {
    throw new Error('Mailgun is not configured');
  }

  const textBody = [
    'New quote request from ryakcleaning.ie',
    '',
    `Name: ${data.firstName} ${data.lastName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Service: ${data.service}`,
    `GDPR consent: Yes`,
    '',
    data.message || '(No message provided)',
  ].join('\n');

  const htmlBody = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
    <p><strong>GDPR consent:</strong> Yes</p>
    <p><strong>Message:</strong><br>${escapeHtml(data.message || '(No message provided)').replace(/\n/g, '<br>')}</p>
  `.trim();

  const response = await fetch(`https://api.eu.mailgun.net/v3/${mailgunDomain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      from: `Ryak Website <noreply@${mailgunDomain}>`,
      to: quoteToEmail,
      subject: `Quote request: ${data.service}`,
      text: textBody,
      html: htmlBody,
      'h:Reply-To': data.email,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mailgun error (${response.status}): ${errorText}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function processQuoteSubmission(
  formData: FormData,
  env: QuoteEnv
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const data = parseQuoteFormData(formData);
  const validationError = validateQuoteForm(data);

  if (validationError) {
    return { ok: false, status: 400, message: validationError };
  }

  if (env.turnstileSecretKey) {
    const verified = await verifyTurnstile(env.turnstileSecretKey, data.turnstileToken);
    if (!verified) {
      return { ok: false, status: 403, message: 'Captcha verification failed' };
    }
  }

  try {
    await sendQuoteEmail(data, env);
    return { ok: true };
  } catch (error) {
    console.error('Quote email failed:', error);
    return { ok: false, status: 502, message: 'Unable to send enquiry email' };
  }
}
