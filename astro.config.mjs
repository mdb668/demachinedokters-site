// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { buildLastmod } from './scripts/lastmod.mjs';

const lastmod = buildLastmod();

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
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/?$/, '/');
        if (lastmod.has(path)) item.lastmod = lastmod.get(path);
        return item;
      },
    }),
  ],
});
