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
