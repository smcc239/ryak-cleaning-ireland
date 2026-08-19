export const CONSENT_STORAGE_KEY = 'ryak-cookie-consent';

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  timestamp: string;
};

export function parseConsent(raw: string | null): CookieConsent | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as CookieConsent;
    if (typeof data.analytics !== 'boolean') return null;
    return { necessary: true, analytics: data.analytics, timestamp: data.timestamp };
  } catch {
    return null;
  }
}
