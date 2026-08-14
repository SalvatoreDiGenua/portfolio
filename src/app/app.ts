import { Component } from '@angular/core';
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
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html'
})
export class App {
}
