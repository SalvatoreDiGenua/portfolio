import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

export type SupportedLanguage = 'it' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'portfolio-language';
  readonly language = signal<SupportedLanguage>(this.getInitialLanguage());

  constructor() {
    this.setLanguage(this.language());
  }

  setLanguage(language: SupportedLanguage): void {
    this.language.set(language);
    this.transloco.setActiveLang(language);
    this.document.documentElement.lang = language;
    localStorage.setItem(this.storageKey, language);
  }

  toggle(): void {
    this.setLanguage(this.language() === 'it' ? 'en' : 'it');
  }

  private getInitialLanguage(): SupportedLanguage {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'it' || stored === 'en') return stored;
    return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
  }
}
