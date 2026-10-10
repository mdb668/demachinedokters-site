// Na de build: alle interne URL's consistent maken op de vorm mét afsluitende slash,
// zodat canonical, interne links, structured data en sitemap allemaal dezelfde URL gebruiken
// (GitHub Pages serveert mappen als /pad/ en stuurt /pad met een 301 door).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const config = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
const site = config.match(/site:\s*'([^']+)'/)[1].replace(/\/$/, '');
const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

const isPage = (p) => p !== '' && !/\.[a-z0-9]+$/i.test(p) && !p.endsWith('/');
const addSlash = (p) => (isPage(p) ? p + '/' : p);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (name.endsWith('.html')) yield full;
  }
}

let files = 0, changes = 0;
for (const file of walk(dist)) {
  const before = readFileSync(file, 'utf8');
  let after = before
    // relatieve interne links en formulier-acties
    .replace(/\b(href|action)="(\/[^"#?]*)([#?][^"]*)?"/g, (m, attr, path, rest = '') => `${attr}="${addSlash(path)}${rest}"`)
    // absolute URL's van de eigen site in meta-tags, structured data en scripts
    .replace(new RegExp(site.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(/[^"\'<>\\s#?]*)', 'g'), (m, path) => site + addSlash(path));
  if (after !== before) { writeFileSync(file, after); changes++; }
  files++;
}
console.log(`postbuild: ${files} html-bestanden gecontroleerd, ${changes} aangepast (interne URL's met slash)`);

// ---------------------------------------------------------------------------
// WebP: maak naast elke JPG/PNG in dist/images een .webp en laat de HTML daarnaar
// verwijzen in <img src/srcset>, <source srcset>, <video poster> en inline
// style="background-image:url(...)". De originelen blijven staan: og:image,
// twitter:image, JSON-LD en <link rel="icon"> houden bewust JPG/PNG (betere
// ondersteuning bij social media en zoekmachines). Bronbestanden in public/
// worden niet aangeraakt.
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { relative, sep } from 'node:path';

const imagesDir = join(dist, 'images');
function* walkImages(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walkImages(full);
    else if (/\.(jpe?g|png)$/i.test(name)) yield full;
  }
}

const webpUrls = new Set(); // '/images/...jpg' waarvoor een kleinere .webp bestaat
let converted = 0, skipped = 0, bytesBefore = 0, bytesAfter = 0;
if (existsSync(imagesDir)) {
  for (const file of walkImages(imagesDir)) {
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const orig = statSync(file).size;
    // sharp behoudt het alfakanaal van PNG automatisch in WebP
    const buf = await sharp(file).webp({ quality: 78, effort: 4 }).toBuffer();
    if (buf.length >= orig) { skipped++; continue; }
    writeFileSync(out, buf);
    webpUrls.add('/' + relative(dist, file).split(sep).join('/'));
    converted++; bytesBefore += orig; bytesAfter += buf.length;
  }
}

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const imgUrlRe = new RegExp(`((?:${escRe(site)})?)(/images/[^"'\\s,)?#&]+\\.(?:jpe?g|png))(?=[?#&"'\\s,)]|$)`, 'gi');
const toWebp = (s) => s.replace(imgUrlRe, (m, host, path) => {
  let p = path;
  try { p = decodeURI(path); } catch {}
  return webpUrls.has(p) ? host + path.replace(/\.(jpe?g|png)$/i, '.webp') : m;
});
const rewriteAttr = (tag, attrs) =>
  tag.replace(new RegExp(`(\\s(?:${attrs})\\s*=\\s*)("[^"]*"|'[^']*')`, 'gi'), (m, pre, val) => pre + toWebp(val));

let webpPages = 0;
if (webpUrls.size) {
  for (const file of walk(dist)) {
    const before = readFileSync(file, 'utf8');
    const after = before
      .replace(/<(?:img|source)\b[^>]*>/gi, (tag) => rewriteAttr(tag, 'src|srcset'))
      .replace(/<video\b[^>]*>/gi, (tag) => rewriteAttr(tag, 'poster'))
      // inline style-attributen op elk element (bv. background-image: url(...))
      .replace(/<[a-z][a-z0-9-]*\b[^>]*\sstyle\s*=[^>]*>/gi, (tag) =>
        /^<(meta|link|script)\b/i.test(tag) ? tag : rewriteAttr(tag, 'style'));
    if (after !== before) { writeFileSync(file, after); webpPages++; }
  }
}
const mb = (n) => (n / 1048576).toFixed(2);
console.log(`postbuild: ${converted} afbeeldingen naar WebP (${mb(bytesBefore)} MB -> ${mb(bytesAfter)} MB, ${mb(bytesBefore - bytesAfter)} MB bespaard)` +
  `${skipped ? `, ${skipped} overgeslagen (WebP niet kleiner)` : ''}, ${webpPages} html-bestanden bijgewerkt`);
