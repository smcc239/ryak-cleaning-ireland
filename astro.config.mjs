import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ryakcleaning.ie',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      serialize(item) {
        return {
          ...item,
          lastmod: item.lastmod ?? new Date().toISOString(),
        };
      },
    }),
  ],
  image: {
    domains: ['images.pexels.com'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }],
  },
});
