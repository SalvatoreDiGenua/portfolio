import { createReducer, on } from '@ngrx/store';
import { isTypeTheme, keyThemeLocalStorage, TypeTheme } from '../theme.service';
import { changeTheme } from './theme.actions';


export const themeReducer = createReducer(
    null,
    on(changeTheme, (_state: TypeTheme, action) => {
        const body = document.getElementsByTagName('body')[0];
        if (!body) { throw new Error('body not found'); }

        if (!isTypeTheme(action.theme)) {

            body.classList.remove(TypeTheme.SDG_THEME_LIGHT);
            body.classList.add(TypeTheme.SDG_THEME_DARK);
            action.theme = TypeTheme.SDG_THEME_DARK;

        } else if (action.theme === TypeTheme.SDG_THEME_LIGHT) {

            body.classList.remove(TypeTheme.SDG_THEME_DARK);
            body.classList.add(TypeTheme.SDG_THEME_LIGHT);

        } else if (action.theme === TypeTheme.SDG_THEME_DARK) {

            body.classList.remove(TypeTheme.SDG_THEME_LIGHT);
            body.classList.add(TypeTheme.SDG_THEME_DARK);

        }

        localStorage.setItem(keyThemeLocalStorage, action.theme);
        return action.theme;
    })
)
