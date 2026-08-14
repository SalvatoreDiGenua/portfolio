import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PROFILE } from '../../core/profile.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './contact.html',
})
export class ContactComponent {
  readonly profile = PROFILE;
}
