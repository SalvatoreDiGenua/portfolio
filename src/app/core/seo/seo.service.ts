import { Service, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService, SupportedLanguage } from '../i18n/language.service';

interface SeoContent {
  title: string;
  description: string;
  locale: string;
}

const BASE_URL = 'https://salvatoredigenua.it/';

const CONTENT: Record<SupportedLanguage, SeoContent> = {
  it: {
    title: 'Salvatore Di Genua | Senior Frontend Engineer Angular',
    description:
      'Portfolio di Salvatore Di Genua, Senior Frontend Engineer specializzato in Angular, TypeScript e AI-assisted development.',
    locale: 'it_IT',
  },
  en: {
    title: 'Salvatore Di Genua | Senior Frontend Engineer Angular',
    description:
      'Portfolio of Salvatore Di Genua, Senior Frontend Engineer specialized in Angular, TypeScript and AI-assisted development.',
    locale: 'en_US',
  },
};

@Service()
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(language: SupportedLanguage): void {
    const content = CONTENT[language];
    const alternateLocale = CONTENT[language === 'it' ? 'en' : 'it'].locale;
    const canonicalUrl = this.buildCanonicalUrl(language);

    this.document.documentElement.lang = language;

    this.title.setTitle(content.title);
    this.meta.updateTag({ name: 'description', content: content.description });
    this.meta.updateTag({ property: 'og:title', content: content.title });
    this.meta.updateTag({
      property: 'og:description',
      content: content.description,
    });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:locale', content: content.locale });
    this.meta.updateTag({
      property: 'og:locale:alternate',
      content: alternateLocale,
    });
    this.meta.updateTag({ name: 'twitter:title', content: content.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: content.description,
    });

    this.updateCanonical(canonicalUrl);
    this.updateStructuredData(language, content, canonicalUrl);
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  private updateStructuredData(
    language: SupportedLanguage,
    content: SeoContent,
    url: string,
  ): void {
    const script = this.document.getElementById('person-schema');
    if (!script) return;

    try {
      const schema = JSON.parse(script.textContent ?? '{}');
      if (schema.mainEntity) {
        schema.mainEntity.description = content.description;
        schema.mainEntity.inLanguage = language;
        schema.mainEntity.url = url;
      } else {
        schema.description = content.description;
        schema.inLanguage = language;
        schema.url = url;
      }
      script.textContent = JSON.stringify(schema, null, 2);
    } catch {
      // ignore parse errors
    }
  }

  private buildCanonicalUrl(language: SupportedLanguage): string {
    const url = new URL(this.document.location.href);
    if (url.searchParams.has(LanguageService.langQueryParam)) {
      url.searchParams.set(LanguageService.langQueryParam, language);
      return url.toString();
    }
    return BASE_URL;
  }
}
