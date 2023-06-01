import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Experience, PortfolioState } from 'src/shared/models/sdg-portfolio-models';
import { getExperience } from 'src/shared/stores/experience/experience.selectors';

@Component({
  selector: 'sdg-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {

  public experience$: Observable<Experience[]>;

  constructor(private portfolioStore: Store<PortfolioState>) {
    this.experience$ = this.portfolioStore.pipe(select(getExperience))
  }
}
