import { ChangeDetectionStrategy, Component } from '@angular/core';
import { scrollToElement } from 'src/shared/utility/utility';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';

@Component({
    selector: 'sdg-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SkillsComponent, ExperienceComponent, ContactComponent]
})
export class HomeComponent {

  scrollToElement(id: string) {
    scrollToElement(id);
  }

}
