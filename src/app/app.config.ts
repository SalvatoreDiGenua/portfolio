import {
  ApplicationConfig,
  isDevMode,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import {
  LocationStrategy,
  TrailingSlashPathLocationStrategy,
} from '@angular/common';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';
import { provideClientHydration } from '@angular/platform-browser';
import { SupportedLanguage } from './core/i18n/locale';
import { routes } from './app.routes';
import { provideRouter, withViewTransitions } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes, withViewTransitions({ skipInitialTransition: true })),
    { provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy },
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
    provideClientHydration(),
  ],
};
