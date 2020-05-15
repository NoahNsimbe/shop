import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
// import { AuthState } from './auth.state';
import { RefreshToken } from './auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService, public _appStore: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const access = this._appStore.selectSnapshot<string>(state => state.auth.access);

    if (access) {
      request = this.addToken(request, access);
    }
    

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: {access: string}) => {
          this._appStore.dispatch(new RefreshToken({access : token.access}));
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token.access));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          console.log(`jwt => ${jwt}`)
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}



// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//     private refreshTokenInProgress = false;
//     private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

//     constructor(public authService: AuthService) { }
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         if (request.url.indexOf('refresh') !== -1) {
//             return next.handle(request);
//         }

//         const accessExpired = this.authService.isAccessTokenExpired();
//         const refreshExpired = this.authService.isRefreshTokenExpired();

//         if (accessExpired && refreshExpired) {
//             return next.handle(request);
//         }
//         if (accessExpired && !refreshExpired) {
//             if (!this.refreshTokenInProgress) {
//                 this.refreshTokenInProgress = true;
//                 this.refreshTokenSubject.next(null);
//                 return this.authService.requestAccessToken().pipe(
//                     switchMap((authResponse) => {
//                         this.authService.saveToken(AuthService.TOKEN_NAME, authResponse.accessToken);
//                         this.authService.saveToken(AuthService.REFRESH_TOKEN_NAME, authResponse.refreshToken);
//                         this.refreshTokenInProgress = false;
//                         this.refreshTokenSubject.next(authResponse.refreshToken);
//                         return next.handle(this.injectToken(request));
//                     }),
//                 );
//             } else {
//                 return this.refreshTokenSubject.pipe(
//                     filter(result => result !== null),
//                     take(1),
//                     switchMap((res) => {
//                         return next.handle(this.injectToken(request))
//                     })
//                 );
//             }
//         }

//         if (!accessExpired) {
//             return next.handle(this.injectToken(request));
//         }
//     }

//     injectToken(request: HttpRequest<any>) {
//         const token = this.authService.getToken(AuthService.TOKEN_NAME);
//         return request.clone({
//             setHeaders: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//     }
// }