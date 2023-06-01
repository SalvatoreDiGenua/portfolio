import { createAction, props } from '@ngrx/store';
import { TypeTheme } from 'src/shared/models/sdg-portfolio-models';

export const changeTheme = createAction<'[THEME] - CHANGE', { theme: TypeTheme }>('[THEME] - CHANGE', props<{ theme: TypeTheme }>());