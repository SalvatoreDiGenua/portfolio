import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { EDUCATION } from '../../core/profile.data';

@Component({
  selector: 'app-education',
  imports: [TranslocoModule],
  templateUrl: './education.html',
})
export class EducationComponent {
  readonly education = EDUCATION;
}
