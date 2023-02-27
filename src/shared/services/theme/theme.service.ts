import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { changeTheme } from './store/theme.actions';
import { getTheme } from './store/theme.selectors';
import { PortfolioState } from 'src/app/app.module';

export enum TypeTheme {
  SDG_THEME_LIGHT = 'sdg-theme-light',
  SDG_THEME_DARK = 'sdg-theme-dark'
}

export function isTypeTheme(value: string): value is TypeTheme {
  return Object.values(TypeTheme).includes(value as TypeTheme);
}

export const keyThemeLocalStorage: string = 'SDG-PORTFOLIO-THEME';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public theme$: Observable<TypeTheme> = this.themeStore.pipe(select(getTheme));
  public readonly typeTheme: typeof TypeTheme = TypeTheme;

  constructor(private themeStore: Store<PortfolioState>) {
    this.setDefaultTheme();
  }

  private setDefaultTheme() {
    const currentTheme: TypeTheme = localStorage.getItem(keyThemeLocalStorage) as TypeTheme;

    switch (currentTheme) {
      case TypeTheme.SDG_THEME_LIGHT:
        this.setLightTheme();
        break;
      case TypeTheme.SDG_THEME_DARK:
        this.setDarkTheme();
        break;

      default:
        this.setDarkTheme();
        break;
    }
  }

  /**
   * Ritorna il tema corrente {@link TypeTheme}
   */
  async getCurrentTheme(): Promise<TypeTheme> {
    return await firstValueFrom(this.theme$);
  }

  /**
   * Setta il tema light
   */
  setLightTheme() {
    this.themeStore.dispatch(changeTheme({ theme: TypeTheme.SDG_THEME_LIGHT }));
  }

  /**
   * Setta il tema dark
   */
  setDarkTheme() {
    this.themeStore.dispatch(changeTheme({ theme: TypeTheme.SDG_THEME_DARK }));
  }

  /**
   * Cambia il tema
   */
  async onToggleTheme() {
    const currentTheme = await this.getCurrentTheme();
    
    if (currentTheme === TypeTheme.SDG_THEME_LIGHT) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

}
