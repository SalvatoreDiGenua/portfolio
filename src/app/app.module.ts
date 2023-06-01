import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PortfolioState } from 'src/shared/models/sdg-portfolio-models';
import { themeReducer } from 'src/shared/stores/theme/theme.reducer';
import { experienceReducer } from 'src/shared/stores/experience/experience.reducers';
import { skillReducer } from 'src/shared/stores/skill/skill.reducers';
import { socialReducer } from 'src/shared/stores/social/social.reducers';

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    StoreModule.forRoot(portfolioReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      name: 'Portfolio',
      trace: isDevMode()
    })
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: sdgTooltipDefaults },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
