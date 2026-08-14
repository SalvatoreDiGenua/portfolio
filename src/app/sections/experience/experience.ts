import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { EXPERIENCES } from '../../core/profile.data';

@Component({
  selector: 'app-experience',
  imports: [TranslocoModule],
  templateUrl: './experience.html',
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCES;
}
