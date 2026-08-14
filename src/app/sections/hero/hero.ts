import { Component } from '@angular/core';
import { PROFILE } from '../../core/profile.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html'
})
export class HeroComponent {
  readonly profile = PROFILE;
}
