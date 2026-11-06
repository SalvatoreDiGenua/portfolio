import { Routes } from '@angular/router';

const loadPortfolio = () => import('./app').then((module) => module.App);

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: loadPortfolio },
  { path: 'it', pathMatch: 'full', loadComponent: loadPortfolio },
];
