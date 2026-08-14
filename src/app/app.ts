import { Component, effect, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageService } from './core/i18n/language.service';
import { SeoService } from './core/seo/seo.service';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/footer';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { SkillsComponent } from './sections/skills/skills';
import { ExperienceComponent } from './sections/experience/experience';
import { EducationComponent } from './sections/education/education';
import { ContactComponent } from './sections/contact/contact';

@Component({
  selector: 'app-root',
  imports: [
    TranslocoModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  private readonly languageService = inject(LanguageService);
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => this.seo.update(this.languageService.language()));
  }
}
