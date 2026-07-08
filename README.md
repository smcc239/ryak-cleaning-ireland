# Ryak Cleaning Ireland

Static Astro 5 website for [ryakcleaning.ie](https://www.ryakcleaning.ie) — commercial cleaning across the Republic of Ireland.

## Stack

- Astro 5 (static output)
- Tailwind CSS with concept design tokens
- Content collections (services, sectors, locations, news)
- Cloudflare Pages deployment with quote form function

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321)

## Build

```bash
npm run build
npm run preview
```

## Deployment

Deploy to Cloudflare Pages with:

- Build command: `npm run build`
- Output directory: `dist`
- Functions directory: `functions`

Set environment secrets for the quote form: `TURNSTILE_SECRET_KEY`, `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `QUOTE_TO_EMAIL`

Set `PUBLIC_TURNSTILE_SITE_KEY` for client-side Turnstile widget.

## Before client delivery

- Confirm registered Irish address in Google Business Profile matches Harcourt Centre, Dublin 2
- Set `PUBLIC_GA4_ID` and `PUBLIC_GSC_VERIFICATION` in Cloudflare Pages before launch
- Replace stock Pexels photography with client-owned site images where possible
- Confirm hreflang pairs with ryakcleaning.com
- Run Screaming Frog crawl and complete `_redirects` migration map
