import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PROFILE } from '../../core/profile.data';

@Component({
  selector: 'app-about',
  imports: [TranslocoModule],
  templateUrl: './about.html',
})
export class AboutComponent {
  readonly profile = PROFILE;
  readonly stats = [
    { value: '5+', key: 'about.years' },
    { value: '3', key: 'about.projects' },
    { value: '10+', key: 'about.technologies' },
  ];
}
