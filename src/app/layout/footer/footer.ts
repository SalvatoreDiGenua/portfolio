import { Component } from '@angular/core';
import { PROFILE } from '../../core/profile.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html'
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly year = new Date().getFullYear();
}
