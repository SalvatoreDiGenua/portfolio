import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PROFILE } from '../../core/profile.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './hero.html',
})
export class HeroComponent {
  readonly profile = PROFILE;
}
