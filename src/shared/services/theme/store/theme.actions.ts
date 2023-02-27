import { createAction, props } from '@ngrx/store';
import { TypeTheme } from '../theme.service';

export const changeTheme = createAction<'[THEME] - CHANGE', { theme: TypeTheme }>('[THEME] - CHANGE', props<{ theme: TypeTheme }>());