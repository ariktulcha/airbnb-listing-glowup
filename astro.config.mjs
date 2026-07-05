import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://listingglowstudio.com',
  output: 'static',
  integrations: [sitemap()]
});
