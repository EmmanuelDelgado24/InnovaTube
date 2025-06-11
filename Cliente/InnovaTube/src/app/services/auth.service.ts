import { Injectable, signal } from '@angular/core';
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
}

