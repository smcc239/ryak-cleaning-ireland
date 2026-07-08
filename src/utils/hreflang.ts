import { SITE } from '../consts';

const UK_SITE = 'https://www.ryakcleaning.com';

/** Path on .ie (with trailing slash) → equivalent path on .com */
export const HREFLANG_PAIRS: Record<string, string> = {
  '/': '/',
  '/services/commercial-kitchen-cleaning/': '/services/deep-kitchen-cleaning/',
  '/services/ducting-ventilation-cleaning/': '/services/ducting-ventilation-cleaning/',
  '/services/contract-cleaning/': '/services/contract-cleaning/',
  '/services/industrial-cleaning/': '/services/industrial-cleaning/',
  '/services/window-cleaning/': '/services/window-cleaning/',
  '/services/window-cleaning/abseil/': '/services/abseil-window-cleaning/',
  '/services/builders-cleans/': '/services/construction-cleaning/',
  '/services/road-sweeping/': '/services/road-sweeping/',
  '/services/deep-cleaning/': '/services/deep-cleaning/',
  '/services/power-washing/': '/services/power-washing/',
  '/about-us/': '/about-us/',
  '/contact-us/': '/contact-us/',
};

export function getHreflangAlternates(pathname: string) {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const ukPath = HREFLANG_PAIRS[normalized] ?? '/';
  const ieUrl = new URL(normalized, SITE.url).href;
  const ukUrl = new URL(ukPath, UK_SITE).href;

  return [
    { hreflang: 'en-IE', href: ieUrl },
    { hreflang: 'en-GB', href: ukUrl },
    { hreflang: 'x-default', href: ieUrl },
  ];
}
