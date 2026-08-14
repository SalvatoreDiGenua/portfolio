import {
  ApplicationConfig,
  isDevMode,
  PLATFORM_ID,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';
import { provideClientHydration } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import {
  LanguageService,
  SupportedLanguage,
} from './core/i18n/language.service';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

class NoopStorage implements Storage {
  length = 0;
  clear(): void {
    //
  }
  getItem(): string | null {
    return null;
  }
  key(): string | null {
    return null;
  }
  removeItem(): void {
    //
  }
  setItem(): void {
    //
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
    provideTransloco({
      config: {
        availableLangs: ['en', 'it'] as SupportedLanguage[],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoPersistLang({
      storage: {
        useFactory: (platformId: object) =>
          isPlatformBrowser(platformId) ? localStorage : new NoopStorage(),
        deps: [PLATFORM_ID],
      },
      storageKey: LanguageService.storageKey,
    }),
    provideClientHydration(),
  ],
};
