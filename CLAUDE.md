# De Machinedokters — www.demachinedokters.nl

Herbouw van de oude Wix-site als statische Astro-site met een eigen CMS, gehost op GitHub Pages, DNS bij Cloudflare (registrar: one.com). Zustersite: `../reboow-site` (www.reboow.nl), zelfde stack, apart onderhouden.

**Voor de volledige uitleg, begin hier:**
- [HANDLEIDING.md](HANDLEIDING.md) — livegang-stappen, CMS-gebruik, dagelijks beheer
- [DNS-BACKUP.md](DNS-BACKUP.md) — alle DNS-records (oud + nieuw), met uitleg per record

## Stack
- Astro 7, content in `src/content/*` (Zod-schema's in `src/content.config.ts`)
- Sveltia CMS op `/admin/`, zelf gehost (`public/admin/sveltia-cms.js`, bijwerken met `npm run cms:update`)
- Deploy: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`), repo `mdb668/demachinedokters-site` (publiek — GitHub Pages op privé-repo vereist Pro)
- Formulieren: FormSubmit.co (contact/sollicitatie/download)
- `scripts/postbuild.mjs` maakt na elke build alle interne URL's consistent **mét afsluitende slash** (canonical, links, JSON-LD, llms.txt) — GitHub Pages serveert mappen zo, dit voorkomt onnodige 301's. Niet verwijderen.

## Belangrijke eigenaardigheden
- Componenten (Header, Footer, ContactForm, Mail, enz.) zijn **niet gedeeld** met reboow-site — een wijziging moet in beide repo's apart doorgevoerd worden.
- E-mailadres staat *niet* als platte tekst in de HTML (`src/components/Mail.astro` bouwt het in de browser op) — tegen recruitment-harvesters. Optioneel CMS-veld `formEndpoint` (Instellingen) voor de hashed FormSubmit-code, verbergt het adres ook uit formulier-URL's.
- Team, cases, diensten, FAQ, klantlogo's, vacatures, juridische pagina's: alles bewerkbaar via het CMS, staat in `src/content/`.
- Oude Wix-URL's blijven werken via doorverwijzingen (`src/components/Redirect.astro`): `/home`, `/merchandise`, `/blank`, `/behandelplan`, `/blog-feed.xml` (serveert de RSS-feed).
- Sitemap-filter in `astro.config.mjs` sluit doorverwijzingspagina's en de (noindex) downloadpagina uit.

## Merkstrategie (sinds 21-09-2026)
De naam "Reboow" wordt uitgefaseerd op deze site; De Machinedokters is het enige merk hier. De vroegere Reboow-diensten (speciaalmachines, retrofit, robotisering) zijn overgenomen als eigen dienstenpagina's. reboow.nl blijft voorlopig apart bestaan.

## Development
```
npm install
npm run dev        # http://localhost:4321, CMS lokaal: /admin/ → "Work with Local Repository"
npm run build       # bouwt naar dist/ (inclusief postbuild-stap)
```

## Documentatie Astro
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Routing](https://docs.astro.build/en/guides/routing/)
