// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://whatthehouse.net',
  // The hidden partner page must never appear in the sitemap (it's a private link).
  integrations: [sitemap({ filter: (page) => !page.includes('/partner') })],
  vite: {
    plugins: [tailwindcss()]
  }
});