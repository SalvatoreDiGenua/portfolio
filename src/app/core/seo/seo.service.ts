import { Service, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { LANGUAGE_PATHS, SupportedLanguage } from '../i18n/locale';

interface SeoContent {
  title: string;
  description: string;
  imageAlt: string;
  locale: string;
  jobTitle: string;
}

const SITE_ORIGIN = 'https://salvatoredigenua.it';

const CONTENT: Record<SupportedLanguage, SeoContent> = {
  it: {
    title: 'Salvatore Di Genua | Angular, Full Stack e sistemi AI',
    description:
      'Portfolio di Salvatore Di Genua, Senior Frontend Engineer. Progetti Angular, sviluppo full stack e una piattaforma AI in sviluppo per la ricerca nei PDF.',
    imageAlt:
      'Copertina del portfolio di Salvatore Di Genua con il nome e il robot della sezione AI.',
    locale: 'it_IT',
    jobTitle: 'Senior Frontend Engineer e specialista Angular',
  },
  en: {
    title: 'Salvatore Di Genua | Angular, Full Stack and AI Systems',
    description:
      'Portfolio of Salvatore Di Genua, Senior Frontend Engineer. Angular projects, full-stack development, and an AI document retrieval platform in development.',
    imageAlt:
      'Salvatore Di Genua’s portfolio cover with his name and the robot from the AI section.',
    locale: 'en_US',
    jobTitle: 'Senior Frontend Engineer and Angular specialist',
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
    const canonicalUrl = new URL(LANGUAGE_PATHS[language], SITE_ORIGIN).href;

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
    this.meta.updateTag({
      property: 'og:image:alt',
      content: content.imageAlt,
    });
    this.meta.updateTag({ name: 'twitter:title', content: content.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: content.description,
    });
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: content.imageAlt,
    });

    this.document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', canonicalUrl);
    this.updateStructuredData(language, content, canonicalUrl);
  }

  private updateStructuredData(
    language: SupportedLanguage,
    content: SeoContent,
    url: string,
  ): void {
    const script = this.document.getElementById('person-schema');
    if (!script) return;

    const schema = JSON.parse(script.textContent ?? '{}');
    for (const item of schema['@graph']) {
      if (item['@type'] === 'Person') {
        item.description = content.description;
        item.jobTitle = content.jobTitle;
      } else if (item['@type'] === 'ProfilePage') {
        item['@id'] = url + '#webpage';
        item.url = url;
        item.name = content.title;
        item.description = content.description;
        item.inLanguage = language;
      }
    }
    script.textContent = JSON.stringify(schema);
  }
}
