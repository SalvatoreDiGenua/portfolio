import { legacyLanguageRedirect } from '../../src/app/core/i18n/locale.ts';

export default function redirectLegacyLanguage(
  request: Request,
): Response | undefined {
  const redirect = legacyLanguageRedirect(new URL(request.url));

  if (redirect) {
    return new Response(null, { status: 301, headers: { Location: redirect } });
  }
}

export const config = { path: '/', onError: 'bypass' };
