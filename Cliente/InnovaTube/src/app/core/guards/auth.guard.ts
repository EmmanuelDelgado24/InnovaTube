// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { map, filter, take } from 'rxjs/operators'; // Importa filter y take
import { toObservable } from '@angular/core/rxjs-interop'; // Importa toObservable

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Convierte el signal authStatus a un observable y espera a que no esté 'checking'
  return toObservable(authService.authStatus).pipe(
    // Opcional: Espera hasta que el estado no sea 'checking' si es crítico que la verificación inicial termine
    filter(status => status !== 'checking'),
    take(1), // Toma el primer valor que no sea 'checking' y luego completa
    map(status => {
      if (status === 'authenticated') {
        return true; // Si el estado es 'authenticated', permite el acceso
      } else {
        router.navigate(['/login']); // Si no, redirige
        return false; // Deniega el acceso
      }
    })
  );
};