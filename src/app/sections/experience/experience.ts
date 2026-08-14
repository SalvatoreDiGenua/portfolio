import { Component } from '@angular/core';
import { EXPERIENCES } from '../../core/profile.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.html'
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCES;
}
