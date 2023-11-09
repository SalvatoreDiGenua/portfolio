import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home-routing.module').then(m => m.HomeRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
