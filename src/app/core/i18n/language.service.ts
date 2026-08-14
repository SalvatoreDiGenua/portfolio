import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type SupportedLanguage = 'it' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'portfolio-language';

  readonly language = signal<SupportedLanguage>(this.getInitialLanguage());

  constructor() { this.setLanguage(this.language()); }

  setLanguage(language: SupportedLanguage): void {
    this.language.set(language);
    this.transloco.setActiveLang(language);
    this.document.documentElement.lang = language;
    if (isPlatformBrowser(this.platformId)) localStorage.setItem(this.storageKey, language);
  }

  toggle(): void { this.setLanguage(this.language() === 'it' ? 'en' : 'it'); }

  private getInitialLanguage(): SupportedLanguage {
    if (!isPlatformBrowser(this.platformId)) return 'en';
    const storedLanguage = localStorage.getItem(this.storageKey);
    if (storedLanguage === 'it' || storedLanguage === 'en') return storedLanguage;
    return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
  }
}
