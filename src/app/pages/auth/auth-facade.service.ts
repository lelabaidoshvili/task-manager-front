import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthResponse, Login, User } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { CookieStorageService } from 'src/app/core/services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService extends AuthService {
  cookieStorageService: CookieStorageService = inject(CookieStorageService);

  override login(payload: Login) {
    return super.login(payload).pipe(
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

        console.log('this is a refresh token');
        console.log(this.RefreshTok);

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

  signOut() {
    localStorage.clear();
    this.cookieStorageService.deleteCookie('token');
    this.cookieStorageService.deleteCookie('refreshToken');
  }
}
