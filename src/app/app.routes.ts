import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
  },
  {
    path: 'cats',
    loadComponent: () => import('./pages/cats/cats.page').then((m) => m.CatsPage),
  },
  {
    path: 'got',
    loadComponent: () => import('./pages/got/got.page').then((m) => m.GotPage),
  },
  {
    path: 'rm-characters',
    loadComponent: () => import('./pages/rm-characters/rm-characters.page').then((m) => m.RmCharactersPage),
  },
];
