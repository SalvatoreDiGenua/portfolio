export type SupportedLanguage = 'en' | 'it';

export const LANGUAGE_PATHS: Record<SupportedLanguage, string> = {
  en: '/',
  it: '/it/',
};

export const LANGUAGE_QUERY_PARAM = 'lang';

export function legacyLanguageRedirect(url: URL): string | undefined {
  const language = url.searchParams.get(LANGUAGE_QUERY_PARAM);
  if (
    url.pathname !== LANGUAGE_PATHS.en ||
    (language !== 'en' && language !== 'it')
  ) {
    return undefined;
  }

  url.searchParams.delete(LANGUAGE_QUERY_PARAM);
  return LANGUAGE_PATHS[language] + url.search + url.hash;
}
