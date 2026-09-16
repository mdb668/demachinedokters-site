import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const settings = (await getEntry('settings', 'site'))!.data;
  const posts = (await getCollection('blog', (b) => b.data.published)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const items = posts
    .map((p) => `<item><title>${esc(p.data.title)}</title><link>${site}post/${p.data.slug}</link><guid>${site}post/${p.data.slug}</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${esc(p.data.excerpt)}</description></item>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog ${esc(settings.siteName)}</title><link>${site}blog</link><description>${esc(settings.seoDescription)}</description><language>nl</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
