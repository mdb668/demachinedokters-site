// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.demachinedokters.nl',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/bedankt') && !page.includes('/admin') && !page.includes('/404') &&
        !/\/(home|merchandise|blank|behandelplan|download-pagina)\/?$/.test(page),
    }),
  ],
});
