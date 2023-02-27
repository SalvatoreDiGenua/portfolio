import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { themeReducer } from 'src/shared/services/theme/store/theme.reducer';
import { TypeTheme } from 'src/shared/services/theme/theme.service';
import { environment } from 'src/environments/environment';

const sdgTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 1500,
  disableTooltipInteractivity: true
};

export interface PortfolioState {
  theme: TypeTheme;
}

const portfolioReducers: ActionReducerMap<PortfolioState> = {
  theme: themeReducer
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
      trace: !environment.production,
      name: 'Portfolio'
    })
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: sdgTooltipDefaults },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
