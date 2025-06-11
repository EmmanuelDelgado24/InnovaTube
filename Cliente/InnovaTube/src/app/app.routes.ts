import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rutas públicas
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import(
        './shared/components/iniciar-sesion/iniciar-sesion.component'
      ).then((m) => m.IniciarSesionComponent),
    title: 'Login',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./shared/components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
    title: 'Login',
  },
  {
    path: 'listado',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/listado/listado.component').then((m) => m.ListadoComponent),
        title: 'Lista de Videos',
      },
    ],
  },
  {
    path: 'favoritos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/favoritos/favoritos.component').then((m) => m.FavoritosComponent),
        title: 'Videos Favoritos',
      },
    ],
  },
];
