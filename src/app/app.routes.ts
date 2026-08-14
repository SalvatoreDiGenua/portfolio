import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./app').then((c) => c.App),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
