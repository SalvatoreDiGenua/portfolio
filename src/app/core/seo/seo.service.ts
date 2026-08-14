import { Service, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SupportedLanguage } from '../i18n/language.service';

@Service()
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly siteUrl = 'https://salvatoredigenua.github.io/portfolio-v2/';

  update(language: SupportedLanguage): void {
    const content =
      language === 'it'
        ? {
            title: 'Salvatore Di Genua | Senior Frontend Engineer Angular',
            description:
              'Portfolio di Salvatore Di Genua, Senior Frontend Engineer specializzato in Angular, TypeScript e AI-assisted development.',
            locale: 'it_IT',
          }
        : {
            title: 'Salvatore Di Genua | Senior Frontend Engineer Angular',
            description:
              'Portfolio of Salvatore Di Genua, Senior Frontend Engineer specialized in Angular, TypeScript and AI-assisted development.',
            locale: 'en_US',
          };

    this.title.setTitle(content.title);
    this.meta.updateTag({ name: 'description', content: content.description });
    this.meta.updateTag({ property: 'og:title', content: content.title });
    this.meta.updateTag({
      property: 'og:description',
      content: content.description,
    });
    this.meta.updateTag({ property: 'og:url', content: this.siteUrl });
    this.meta.updateTag({ property: 'og:locale', content: content.locale });
    this.meta.updateTag({ name: 'twitter:title', content: content.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: content.description,
    });

    let canonical = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = this.siteUrl;
  }
}
