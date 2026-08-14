import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { SKILLS } from '../../core/profile.data';

@Component({
  selector: 'app-skills',
  imports: [TranslocoModule],
  templateUrl: './skills.html',
})
export class SkillsComponent {
  readonly skillGroups = SKILLS;
}
