export const onRequestPost = async (context: {
  request: Request;
  env: Record<string, string | undefined>;
}) => {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const turnstileToken = String(formData.get('cf-turnstile-response') ?? '');

    if (!firstName || !lastName || !phone || !email || !service) {
      return new Response('Missing required fields', { status: 400 });
    }

    if (env.TURNSTILE_SECRET_KEY) {
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      });
      const result = (await verify.json()) as { success: boolean };
      if (!result.success) {
        return new Response('Captcha verification failed', { status: 403 });
      }
    }

    if (env.MAILGUN_API_KEY && env.MAILGUN_DOMAIN) {
      const body = [
        `Name: ${firstName} ${lastName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service: ${service}`,
        '',
        message || '(No message provided)',
      ].join('\n');

      await fetch(`https://api.eu.mailgun.net/v3/${env.MAILGUN_DOMAIN}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`api:${env.MAILGUN_API_KEY}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          from: `Ryak Website <noreply@${env.MAILGUN_DOMAIN}>`,
          to: env.QUOTE_TO_EMAIL || 'info@ryakcleaning.ie',
          subject: `Quote request: ${service}`,
          text: body,
          'h:Reply-To': email,
        }),
      });
    }

    return Response.redirect(new URL('/contact-us/?sent=1', request.url), 302);
  } catch {
    return new Response('Unable to process request', { status: 500 });
  }
};
