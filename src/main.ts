import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { socialReducer } from 'src/shared/stores/social/social.reducers';
import { experienceReducer } from 'src/shared/stores/experience/experience.reducers';
import { skillReducer } from 'src/shared/stores/skill/skill.reducers';
import { themeReducer } from 'src/shared/stores/theme/theme.reducer';
import { PortfolioState } from 'src/shared/models/sdg-portfolio-models';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';

const sdgTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 1500,
  disableTooltipInteractivity: true
};
const portfolioReducers: ActionReducerMap<PortfolioState> = {
  theme: themeReducer,
  skill: skillReducer,
  experience: experienceReducer,
  social: socialReducer
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      StoreModule.forRoot(portfolioReducers),
      StoreDevtoolsModule.instrument({
        maxAge: 20,
        name: 'Portfolio',
        trace: isDevMode()
      })),
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: sdgTooltipDefaults },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideAnimations()
  ]
})
  .catch(err => console.error(err));
