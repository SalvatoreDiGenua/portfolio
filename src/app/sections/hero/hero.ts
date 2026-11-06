import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PROFILE } from '../../core/profile.data';

@Component({
  selector: 'app-hero',
  imports: [TranslocoModule],
  templateUrl: './hero.html',
})
export class HeroComponent {
  readonly givenName = PROFILE.name.split(' ', 1)[0];
  readonly familyName = PROFILE.name.slice(this.givenName.length + 1);
}
