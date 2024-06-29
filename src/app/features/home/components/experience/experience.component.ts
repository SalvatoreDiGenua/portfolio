import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Experience, PortfolioState } from 'src/shared/models/sdg-portfolio-models';
import { getExperience } from 'src/shared/stores/experience/experience.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sdg-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe],
  encapsulation: ViewEncapsulation.None
})
export class ExperienceComponent {
  private portfolioStore = inject<Store<PortfolioState>>(Store<PortfolioState>);
  public experience$: Observable<Experience[]>;

  constructor() {
    this.experience$ = this.portfolioStore.pipe(select(getExperience))
  }
}
