/** URL-slug van een dienst: het veld `slug` uit de frontmatter, anders de bestandsnaam zonder volgnummer. */
export function serviceSlug(entry: { id: string; data: { slug?: string } }): string {
  return entry.data.slug ?? entry.id.replace(/^\d+-/, '');
}

/** Kort een meta-omschrijving af tot ±158 tekens op een woordgrens. */
export function metaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').replace(/\*\*/g, '').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 80)).replace(/[,;:]$/, '') + '…';
}
