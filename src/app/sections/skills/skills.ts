import { Component } from '@angular/core';
import { SKILLS } from '../../core/profile.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html'
})
export class SkillsComponent {
  readonly skillGroups = SKILLS;
}
