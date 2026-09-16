# De Machinedokters – website & beheer

Deze map bevat de complete nieuwe website van **www.demachinedokters.nl**, nagebouwd vanaf de Wix-site.
Alles is van jou: de code, de teksten, de foto's. Geen abonnement meer nodig.

| Onderdeel | Wat |
|---|---|
| Website | Statische site gebouwd met **Astro** (snel, SEO-vriendelijk, geen server nodig) |
| Beheer (CMS) | **Sveltia CMS** op `/admin/` – teksten, foto's, cases, blog, team, FAQ, vacatures aanpassen in je browser |
| Opslag | GitHub-repository `mdb668/demachinedokters-site` (elke wijziging is een commit, dus alles heeft een historie) |
| Hosting | **GitHub Pages** (gratis, wereldwijd CDN, automatisch HTTPS) |
| Formulieren | **FormSubmit.co** stuurt contact-, sollicitatie- en downloadformulieren naar `info@demachinedokters.nl` |
| Domein | Blijft bij one.com; alleen de DNS-records wijzen naar GitHub Pages |

---

## 1. Live zetten (eenmalig, ±20 minuten)

### Stap 1 – Website online op GitHub Pages ✅ (al gedaan)
Dit is in de nacht van 16 september al ingericht:
- Repository `mdb668/demachinedokters-site` aangemaakt en gepusht. De repo is **publiek**, omdat GitHub Pages op een privé-repo alleen met een betaald GitHub Pro-account werkt. Er staat niets geheims in (alleen de site zoals bezoekers hem toch al zien). Wil je hem toch privé: neem GitHub Pro (±4 dollar/maand) en zet hem op privé; Pages blijft dan werken.
- GitHub Pages staat aan (bron: GitHub Actions) en het custom domain `www.demachinedokters.nl` is al ingevuld.
- De eerste deploy is geslaagd (groene workflow).

Let op: het tijdelijke adres `mdb668.github.io/demachinedokters-site` stuurt door naar `www.demachinedokters.nl` zolang het custom domain ingesteld staat. De nieuwe site is dus pas zichtbaar zodra de DNS is omgezet (stap 2). Wil je hem vooraf bekijken: lokaal met `npm run dev` (zie hoofdstuk 3).

### Stap 2 – Domein koppelen bij one.com
Log in op one.com → **DNS-instellingen** van `demachinedokters.nl`. Verwijder de oude Wix-records (A-records en CNAME `www` die naar Wix wijzen) en zet:

| Type | Naam/host | Waarde |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `mdb668.github.io` |

Laat MX-, TXT- (SPF/DKIM) en andere mailrecords **ongemoeid**, anders stopt je e-mail.

Daarna in GitHub: **Settings → Pages → Custom domain** = `www.demachinedokters.nl` → Save. Wacht tot de DNS-check groen is (kan 5 min tot enkele uren duren) en zet **Enforce HTTPS** aan.
Het bestand `public/CNAME` bevat al `www.demachinedokters.nl`, zodat GitHub het domein onthoudt bij elke nieuwe publicatie.

### Stap 3 – Formulieren activeren
Bij de **eerste** inzending van een formulier stuurt FormSubmit een activatiemail naar `info@demachinedokters.nl` met de knop **Activate form**. Klik erop; daarna komen alle berichten gewoon binnen.
Test na livegang dus één keer het contactformulier zelf.

### Stap 4 – Inloggen op het CMS
1. Maak een GitHub **personal access token**: https://github.com/settings/tokens → *Generate new token (classic)* → scope **repo** aanvinken → expiratie bv. 1 jaar.
2. Ga naar https://www.demachinedokters.nl/admin/ → **Sign in with Token** → plak het token.
3. Klaar. Elke "Opslaan" in het CMS is een commit; GitHub bouwt de site automatisch opnieuw (±2 min).

### Stap 5 – Wix opzeggen
Pas nadat de nieuwe site op het domein draait en je alles gecontroleerd hebt. Zet de Wix-site niet eerder uit dan dat de DNS is omgezet.

---

## 2. Dagelijks beheer via het CMS (`/admin/`)

| Menu | Wat pas je hier aan |
|---|---|
| ⚙️ Instellingen | Telefoon, e-mail, adres, menu, footer, socials, de vaste blokken "schakel je in voor" en "behandelplan" |
| 📄 Pagina's | Teksten, quotes, knoppen en afbeeldingen van homepage, diensten, over ons, contact, werken bij, FAQ, NEN, service & onderhoud, blog, download |
| 🔧 Diensten | De vier diensten (kaartjes + uitgebreide tekst) |
| 🏭 Cases | Klantcases met cijfers, uitdaging, aanpak en resultaat. Vinkje "Gepubliceerd" uit = tijdelijk verbergen |
| 👥 Team | Naam, functie, foto, volgorde |
| ❓ Veelgestelde vragen | Vraag + antwoord |
| 📝 Blog | Nieuwe blogposts schrijven met opmaak en afbeeldingen |
| ⭐ Reviews | Klantreviews in de slider |
| 🏢 Klantlogo's | Logo's in de logoband |
| 💼 Vacatures | Vacatures incl. sollicitatieformulier |
| ⚖️ Juridische pagina's | Privacyverklaring, cookiebeleid, algemene voorwaarden |

Tips
- Afbeeldingen die je uploadt komen in `public/images/uploads/`. Gebruik bij voorkeur jpg/webp van max. ±1600 px breed.
- In tekstvelden: een lege regel begint een nieuwe alinea, `**woord**` maakt vet, regels die met `- ` beginnen worden een opsomming.
- Nieuwe case? Vul bij *URL-slug* bijvoorbeeld `case-bedrijfsnaam` in; de pagina wordt dan `/case-bedrijfsnaam`.
- Downloads (PDF's): upload ze via **Pagina's → Download-pagina → Downloads** en pas de tekst van de automatische antwoordmail aan met de juiste link.

---

## 3. Lokaal werken (optioneel, voor Claude Code of ontwikkelaars)

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # bouwt de site naar dist/
```

Mapstructuur
- `src/content/` – alle inhoud (json/markdown), precies wat het CMS bewerkt
- `src/pages/` – de pagina's (routes), `src/components/` – bouwstenen, `src/layouts/Base.astro` – HTML-skelet + SEO
- `src/styles/global.css` – kleuren, lettertypen (Jost als Futura-alternatief, Patrick Hand voor de handgeschreven quotes)
- `public/` – afbeeldingen, video, `admin/` (CMS), `CNAME`, `robots.txt`
- `.github/workflows/deploy.yml` – automatische publicatie naar GitHub Pages

Lokaal het CMS gebruiken zonder token: start `npm run dev`, open http://localhost:4321/admin/ en kies **Work with Local Repository** (Chrome/Edge).

---

## 4. Wat er bewust anders is dan op Wix
- **Geen cookiebanner**: de site plaatst zelf geen tracking-cookies. Voeg je later Google Analytics of een pixel toe, plaats dan weer een cookiemelding.
- **Hero-video** is verkleind naar 480p (6 MB) voor snelheid; de originele 720p-versie staat in de map van de studie-bestanden. Wil je hem vervangen: `public/video/hero.mp4`.
- **Formulieren** via FormSubmit in plaats van Wix Forms. Bijlagen (CV) werken via het gewone formulier; het contactformulier verstuurt zonder pagina-herlaad.
- **Downloads** (checklist en case study) stonden niet publiek op Wix; plaats de PDF's in `public/downloads/` (zie LEES-MIJ.txt daar) of upload via het CMS.
- **Case WVS** staat op "niet gepubliceerd" omdat er op de oude site nog geen inhoud voor was.
- Alle oude URL's (`/case-coca-cola`, `/post/...`, `/diensten/nen-3140-1010`, enz.) zijn behouden voor SEO. Sitemap: `/sitemap-index.xml`, RSS: `/rss.xml`.
