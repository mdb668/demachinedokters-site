/** Versleutelt het FormSubmit-doel (adres of hashed code) zodat het niet als platte tekst in de HTML staat.
 *  FormGuard.astro zet het in de browser terug in de action van het formulier. */
export function formTarget(site: { formEmail: string; formEndpoint?: string }): string {
  const target = site.formEndpoint || site.formEmail;
  return Buffer.from([...target].reverse().join('')).toString('base64');
}
