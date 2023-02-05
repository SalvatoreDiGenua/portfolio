import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

export enum TypeTheme {
  SDG_THEME_LIGHT = 'sdg-theme-light',
  SDG_THEME_DARK = 'sdg-theme-dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private keyThemeLocalStorage: string = 'SDG-PORTFOLIO-THEME';
  private readonly currentThemeSbj: BehaviorSubject<TypeTheme | null> = new BehaviorSubject<TypeTheme | null>(null);
  public onThemeChanged: Observable<TypeTheme> = this.currentThemeSbj.asObservable().pipe(filter(Boolean));
  public readonly typeTheme: typeof TypeTheme = TypeTheme;

  constructor() {
    this.setDefaultTheme();
  }

  private setDefaultTheme() {
    const currentTheme: TypeTheme = localStorage.getItem(this.keyThemeLocalStorage) as TypeTheme;

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
  getCurrentTheme(): TypeTheme {
    return this.currentThemeSbj.value as TypeTheme;
  }

  /**
   * Setta il tema light
   */
  setLightTheme() {
    const body = document.getElementsByTagName('body')[0];
    if (!body) { throw new Error('body not found'); }
    body.classList.remove(TypeTheme.SDG_THEME_DARK);
    body.classList.add(TypeTheme.SDG_THEME_LIGHT);
    localStorage.setItem(this.keyThemeLocalStorage, TypeTheme.SDG_THEME_LIGHT);
    this.currentThemeSbj.next(TypeTheme.SDG_THEME_LIGHT);
  }

  /**
   * Setta il tema dark
   */
  setDarkTheme() {
    const body = document.getElementsByTagName('body')[0];
    if (!body) { throw new Error('body not found'); }
    body.classList.remove(TypeTheme.SDG_THEME_LIGHT);
    body.classList.add(TypeTheme.SDG_THEME_DARK);
    localStorage.setItem(this.keyThemeLocalStorage, TypeTheme.SDG_THEME_DARK);
    this.currentThemeSbj.next(TypeTheme.SDG_THEME_DARK);
  }

}
