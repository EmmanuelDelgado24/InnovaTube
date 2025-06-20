import { computed, inject, Injectable, signal } from '@angular/core';
import { UserResponse } from '../shared/interfaces/auth.interfaces';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/interfaces/lista.interfaces';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of, tap, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

const backUrl = environment.backUrl;
const backUrl2 = environment.backUrl2;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);

  private router = inject(Router);

  public authCheckState = toSignal(
    this.checkStatus().pipe(
      // Emitir 'pending' inmediatamente para indicar que la comprobación está en curso
      startWith('pending' as 'pending' | 'success' | 'error')
    ),
    { initialValue: 'pending' as 'pending' | 'success' | 'error' }
  );

  //solo lectura
  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() == 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(this._token);

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<UserResponse>(`${backUrl}`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((resp) => {
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          this._token.set(resp.token);

          localStorage.setItem('token', resp.token);
        }),
        map(() => true),
        catchError((error: any) => {
          this._user.set(null);
          this._token.set(null);
          this._authStatus.set('not-authenticated');
          return of(false);
        })
      );
  }

  // Nuevo método para registrar un usuario
  register(nameCompleto: string, nameUser: string, email: string, password: string): Observable<boolean> {
    return this.http
      .post<UserResponse>(`${backUrl2}`, { 
        nameCompleto: nameCompleto,
        nameUser: nameUser,
        email: email,
        password: password,
      })
      .pipe(
        tap((resp) => {
          // Si el registro es exitoso, podrías querer loguear al usuario automáticamente
          // o simplemente indicar que se registró correctamente.
          // Para este ejemplo, lo loguearemos directamente.
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          this._token.set(resp.token);
          localStorage.setItem('token', resp.token);
        }),
        map(() => true),
        catchError((error: any) => {
          // Si hay un error en el registro, limpiamos cualquier estado potencial
          this._user.set(null);
          this._token.set(null);
          this._authStatus.set('not-authenticated');
          return of(false); // Retornamos false para indicar que el registro falló
        })
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }

    return this.http
      .get<UserResponse>(`${backUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((resp) => {
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          this._token.set(resp.token);
          localStorage.setItem('token', resp.token);
        }),
        map(() => true),
        catchError((error: any) => {
          this._user.set(null);
          this._token.set(null);
          this._authStatus.set('not-authenticated');
          return of(false);
        })
      );
  }
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this._user.set(null); // Restablece el usuario a null
    this._token.set(null); // Restablece el token a null
    this._authStatus.set('not-authenticated'); // Actualiza el estado a no autenticado
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }


}
