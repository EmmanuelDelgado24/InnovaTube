import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rutas públicas
  //{
  //  path: '',
  //  redirectTo: 'login',
  //  pathMatch: 'full',
  //},
  {
    path: 'login',
    loadComponent: () =>
      import(
        './shared/components/iniciar-sesion/iniciar-sesion.component'
      ).then((m) => m.IniciarSesionComponent),
    title: 'Iniciar Sesión',
  },
  //{
  //  path: '',
  //  redirectTo: 'register',
  //  pathMatch: 'full',
  //},
  {
    path: 'register',
    loadComponent: () =>
      import('./shared/components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
    title: 'Registrarse',
  },

  // --- Rutas Protegidas (Solo para usuarios autenticados) ---

  {
    path: 'listado',
    loadComponent: () =>
      import('./pages/listado/listado.component').then(
        (m) => m.ListadoComponent
      ),
    title: 'Lista de Videos',
  },

  {
    path: 'favoritos',
    loadComponent: () =>
      import('./pages/favoritos/favoritos.component').then(
        (m) => m.FavoritosComponent
      ),
    title: 'Videos Favoritos',
  },

  

   // --- Redirección de la Ruta Raíz ---
  // Cuando alguien accede a la URL base (ej. http://localhost:4200/), lo redirige a login.
  // Después de iniciar sesión, el usuario será redirigido a 'listado' o 'favoritos' por tu AuthService.
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full',
  },
];
