/** WhatsApp-link met een voorgevuld bericht (uit Instellingen in het CMS). */
export function whatsappHref(site: { whatsappLink?: string; whatsappText?: string }): string | undefined {
  if (!site.whatsappLink) return undefined;
  return site.whatsappText ? `${site.whatsappLink}?text=${encodeURIComponent(site.whatsappText)}` : site.whatsappLink;
}
