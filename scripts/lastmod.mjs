// Bepaalt per URL de datum van de laatste inhoudelijke wijziging (laatste git-commit van het bronbestand),
// zodat de sitemap een betrouwbare <lastmod> krijgt. Gebruikt in astro.config.mjs.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';

const gitDate = (file) => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim() || null;
  } catch {
    return null;
  }
};
const slugOf = (file) => readFileSync(file, 'utf8').match(/^slug:\s*"?([^"\n]+)"?/m)?.[1];
const files = (dir) => readdirSync(dir).map((f) => `${dir}/${f}`);

const pageUrls = {
  home: '/', blog: '/blog/', cases: '/cases/', contact: '/contact/', diensten: '/diensten/',
  faq: '/veelgestelde-vragen/', nen: '/diensten/nen-3140-1010/', 'over-ons': '/over-ons/',
  'service-onderhoud': '/service-onderhoud/', 'werken-bij': '/werken-bij/',
};

export function buildLastmod() {
  const map = new Map();
  const set = (url, file) => {
    const d = gitDate(file);
    if (d && (!map.has(url) || d > map.get(url))) map.set(url, d);
  };
  for (const [name, url] of Object.entries(pageUrls)) set(url, `src/content/pages/${name}.json`);
  for (const f of files('src/content/cases')) { const s = slugOf(f); if (s) { set(`/${s}/`, f); set('/cases/', f); } }
  for (const f of files('src/content/vacatures')) { const s = slugOf(f); if (s) { set(`/${s}/`, f); set('/werken-bij/', f); } }
  for (const f of files('src/content/blog')) { const s = slugOf(f); if (s) { set(`/post/${s}/`, f); set('/blog/', f); } }
  for (const f of files('src/content/diensten')) {
    const s = slugOf(f) ?? f.split('/').pop().replace(/\.md$/, '').replace(/^\d+-/, '');
    set(`/diensten/${s}/`, f); set('/diensten/', f);
  }
  for (const f of files('src/content/juridisch')) set(`/${f.split('/').pop().replace(/\.md$/, '')}/`, f);
  set('/veelgestelde-vragen/', 'src/content/faq');
  return map;
}
