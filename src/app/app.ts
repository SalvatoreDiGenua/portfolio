import {
  ApplicationRef,
  Component,
  DOCUMENT,
  afterNextRender,
  effect,
  inject,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from './core/i18n/language.service';
import { SeoService } from './core/seo/seo.service';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/footer';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { Ai } from './sections/ai/ai';
import { SkillsComponent } from './sections/skills/skills';
import { ExperienceComponent } from './sections/experience/experience';
import { EducationComponent } from './sections/education/education';
import { ContactComponent } from './sections/contact/contact';
import { Projects } from './sections/projects/projects';

@Component({
  selector: 'app-root',
  imports: [
    TranslocoModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    Ai,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    Projects,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  private readonly languageService = inject(LanguageService);
  private readonly seo = inject(SeoService);
  private readonly document = inject(DOCUMENT);
  private readonly application = inject(ApplicationRef);

  constructor() {
    effect(() => this.seo.update(this.languageService.language()));
    afterNextRender(() => this.alignInitialFragment());
  }

  private alignInitialFragment(): void {
    const view = this.document.defaultView;
    const hash = view?.location.hash;
    if (!view || !hash) return;

    const navigation = view.performance.getEntriesByType('navigation')[0] as
      PerformanceNavigationTiming | undefined;
    if (navigation?.type === 'back_forward') return;

    const pending = new AbortController();
    for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
      view.addEventListener(event, () => pending.abort(), {
        once: true,
        passive: true,
        signal: pending.signal,
      });
    }

    // Translations and web fonts can move the initial anchor after the browser jumps to it.
    void Promise.all([
      this.application.whenStable(),
      this.document.fonts.ready,
    ]).then(() => {
      view.requestAnimationFrame(() => {
        if (!pending.signal.aborted && view.location.hash === hash) {
          this.document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ behavior: 'instant' });
        }
        pending.abort();
      });
    });
  }
}
