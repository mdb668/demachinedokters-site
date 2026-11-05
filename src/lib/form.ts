/** Versleutelt de Web3Forms access key zodat die niet als platte tekst in de HTML staat.
 *  FormGuard.astro zet hem in de browser terug als verborgen veld access_key. */
export function formTarget(site: { formKey?: string }): string {
  return Buffer.from([...(site.formKey ?? '')].reverse().join('')).toString('base64');
}
