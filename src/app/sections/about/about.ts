import { Component } from '@angular/core';
import { PROFILE } from '../../core/profile.data';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html'
})
export class AboutComponent {
  readonly profile = PROFILE;

  readonly stats = [
    { value: '5+', label: 'Anni di esperienza' },
    { value: '3', label: 'Aziende / progetti chiave' },
    { value: '10+', label: 'Tecnologie padroneggiate' }
  ];
}
