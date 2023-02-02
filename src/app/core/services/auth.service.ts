import { Injectable } from '@angular/core';
import { AuthResponse, Login, Register } from '../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CookieStorageService } from './cookie.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    private cookieStorageService: CookieStorageService,
    http: HttpClient
  ) {
    super(http);
  }

  signUp(payload: Register): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/signup', payload);
  }

  login(payload: Login): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/login', payload).pipe(
      tap((response: AuthResponse) => {
        const expiresInMilliseconds = 24 * 60 * 60 * 1000;

        const cookieExpire = new Date(Date.now() + expiresInMilliseconds);

        console.log('cookie expire date:');
        console.log(cookieExpire);

        this.cookieStorageService.setCookie(
          'token',
          response.token.accessToken,
          cookieExpire
        );

        this.cookieStorageService.setCookie(
          'refreshToken',
          response.token.refreshToken
        );

        // console.log('this is a refresh token');
        // console.log(this.RefreshTok);

        this.setUser(response.user);

        console.log(this.token);
        console.log(this.user);
      })
    );
  }

  get token(): string {
    return this.cookieStorageService.getCookie('token');
  }

  get RefreshTok(): string {
    return this.cookieStorageService.getCookie('refreshToken');
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  get user(): User {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  refreshToken(refresh: string): Observable<AuthResponse> {
    return this.post('auth/token', { refreshToken: refresh });
  }

  signOut() {
    localStorage.clear();
    this.cookieStorageService.deleteCookie('accessToken');
    this.cookieStorageService.deleteCookie('refreshToken');
  }
}
