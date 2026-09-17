# DNS-back-up demachinedokters.nl (Cloudflare) – stand vóór livegang, 17-09-2026

Registrar: one.com. DNS: Cloudflare (nameservers gabe.ns.cloudflare.com / nucum.ns.cloudflare.com).

## Site-records die vervangen zijn (oude Wix-koppeling)

| Type | Naam | Inhoud | Proxy |
|---|---|---|---|
| A | demachinedokters.nl | 185.230.63.107 | Proxied |
| A | demachinedokters.nl | 185.230.63.171 | Proxied |
| A | demachinedokters.nl | 185.230.63.186 | Proxied |
| CNAME | www | cdn1.wixdns.net | Proxied |

Terugdraaien naar Wix = deze vier records terugzetten en de GitHub-records verwijderen. Werkt alleen zolang het Wix-abonnement loopt.

## Nieuwe site-records (GitHub Pages)

| Type | Naam | Inhoud | Proxy |
|---|---|---|---|
| A | @ | 185.199.108.153 | DNS only |
| A | @ | 185.199.109.153 | DNS only |
| A | @ | 185.199.110.153 | DNS only |
| A | @ | 185.199.111.153 | DNS only |
| CNAME | www | mdb668.github.io | DNS only |

## Records die ongewijzigd blijven (mail en verificatie)

- MX: aspmx.l.google.com (10), alt1 (20), alt2 (30), alt3 (40), alt4 (50)  → Google Workspace
- MX send.mail.demachinedokters.nl → feedback-smtp.eu-west-1.amazonses.com (Resend)
- TXT @: v=spf1 include:_spf.google.com ~all
- TXT @: google-site-verification=G7tfCoq5QCuzG4rhVj94X1_Ug7mGwMRJswFHq0WkWPU
- TXT @: google-site-verification=zVlzO6VmbeP4grUlKHcTq8ZRShSdBPbCkL00ILLrjhg
- TXT _dmarc: v=DMARC1; p=none;
- TXT resend._domainkey.mail: DKIM-sleutel Resend
- (plus de SPF-record van send.mail, zie Cloudflare-export)

Volledige export: maak in Cloudflare via DNS → Records → **Export** een zonebestand en bewaar dat naast dit document.
