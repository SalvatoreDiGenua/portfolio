import { Component } from '@angular/core';
import { PROFILE } from '../../core/profile.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html'
})
export class ContactComponent {
  readonly profile = PROFILE;
}
