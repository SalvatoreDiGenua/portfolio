import { Component } from '@angular/core';
import { EDUCATION } from '../../core/profile.data';

@Component({
  selector: 'app-education',
  standalone: true,
  templateUrl: './education.html'
})
export class EducationComponent {
  readonly education = EDUCATION;
}
