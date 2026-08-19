import { processQuoteSubmission } from '../../lib/quote-handler';

export const onRequestPost = async (context: {
  request: Request;
  env: Record<string, string | undefined>;
}) => {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const result = await processQuoteSubmission(formData, {
      mailgunApiKey: env.MAILGUN_API_KEY,
      mailgunDomain: env.MAILGUN_DOMAIN,
      quoteToEmail: env.QUOTE_TO_EMAIL,
      turnstileSecretKey: env.TURNSTILE_SECRET_KEY,
    });

    if (!result.ok) {
      return Response.redirect(new URL('/contact-us/?error=1', request.url), 302);
    }

    return Response.redirect(new URL('/contact-us/?sent=1', request.url), 302);
  } catch {
    return new Response('Unable to process request', { status: 500 });
  }
};
