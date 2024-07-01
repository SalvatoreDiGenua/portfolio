import { Component, inject } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'sdg-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  public utilityService = inject(UtilityService);
}
