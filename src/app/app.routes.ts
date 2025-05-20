import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'avisos',
    pathMatch: 'full'
  },
  {
    path: 'avisos',
    loadChildren: () => import('./avisos-lista/avisos-lista.module').then( m => m.AvisosListaPageModule)
  },
  {
    path: 'crear-aviso',
    loadChildren: () => import('./crear-aviso/crear-aviso.module').then( m => m.CrearAvisoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }