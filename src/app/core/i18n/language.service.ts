import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Service, computed, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import {
  LANGUAGE_PATHS,
  LANGUAGE_QUERY_PARAM,
  SupportedLanguage,
} from './locale';

@Service()
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly initialLanguage = this.getInitialLanguage();
  readonly language = signal(this.initialLanguage);
  readonly hasChangedLanguage = computed(
    () => this.language() !== this.initialLanguage,
  );
  readonly alternateLanguage = computed(() =>
    this.language() === 'it' ? 'en' : 'it',
  );
  readonly alternatePath = computed(
    () => LANGUAGE_PATHS[this.alternateLanguage()],
  );

  constructor() {
    this.applyLanguage(this.language());
  }

  toggle(): void {
    const language = this.alternateLanguage();
    this.language.set(language);
    this.applyLanguage(language);

    if (isPlatformBrowser(this.platformId)) {
      const history = this.document.defaultView?.history;
      const url = new URL(this.document.location.href);
      url.pathname = LANGUAGE_PATHS[language];
      url.searchParams.delete(LANGUAGE_QUERY_PARAM);
      history?.replaceState(history.state, '', url);
    }
  }

  private applyLanguage(language: SupportedLanguage): void {
    this.transloco.setActiveLang(language);
    this.document.documentElement.lang = language;
  }

  sectionHref(fragment: string): string {
    const search = this.document.location?.search ?? '';
    return LANGUAGE_PATHS[this.language()] + search + fragment;
  }

  private getInitialLanguage(): SupportedLanguage {
    const location = this.document.location;
    if (
      location?.pathname === '/it' ||
      location?.pathname === LANGUAGE_PATHS.it
    ) {
      return 'it';
    }

    return 'en';
  }
}
