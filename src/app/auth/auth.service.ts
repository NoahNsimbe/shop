import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { RefreshToken } from './auth.actions';

export class Tokens {
  jwt: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config = {
    apiUrl: "string"
  }

	// private readonly JWT_TOKEN = 'JWT_TOKEN';
	// private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
	// private loggedUser: string;

  constructor(private _httpClient: HttpClient, public _appStore: Store) { }


	// login(user: { username: string, password: string }): Observable<boolean> {
	// return this._httpClient.post<any>(`${this.config.apiUrl}/login`, user)
	//   .pipe(
	//     tap(tokens => this.doLoginUser(user.username, tokens)),
	//     mapTo(true),
	//     catchError(error => {
	//       alert(error.error);
	//       return of(false);
	//     }));
  //   }


  // logout(token?:string) {
  //   return this._httpClient.post<any>(`${this.config.apiUrl}/logout`, {
  //     'refreshToken': this.getRefreshToken()
  //   }).pipe(
  //     tap(() => this.doLogoutUser()),
  //     mapTo(true),
  //     catchError(error => {
  //       alert(error.error);
  //       return of(false);
  //     }));
  // }
    

	login(user: { username: string, password: string }){
    return this._httpClient.post<any>(`${this.config.apiUrl}/api/token/`, user);
  }

  logout(token?:string) {
    return this._httpClient.post<any>(`${this.config.apiUrl}/api/logout/`, {
      'refreshToken': token
    });
  }

  refreshToken() {
    const refreshToken = this._appStore.selectSnapshot<string>(state => state.auth.refresh);
    return this._httpClient.post<any>(`${this.config.apiUrl}/api/refresh/`, {
      'refresh': refreshToken
    });
  }

  // isLoggedIn() {
  //   return !!this.getJwtToken();
  // }

  // refreshToken() {
  //   const refreshToken = this._appStore.selectSnapshot<string>(state => state.auth.refresh);
  //   return this._httpClient.post<any>(`${this.config.apiUrl}/refresh`, {
  //     'refresh': refreshToken
  //   }).pipe(tap((tokens: Tokens) => {
  //      this.storeJwtToken(tokens.jwt);
  //   }));
  // }



  // getJwtToken() {
  //   return localStorage.getItem(this.JWT_TOKEN);
  // }

  // private doLoginUser(username: string, tokens: Tokens) {
  //   this.loggedUser = username;
  //   this.storeTokens(tokens);
  // }

  // private doLogoutUser() {
  //   this.loggedUser = null;
  //   this.removeTokens();
  // }

  // private getRefreshToken() {
  //   return localStorage.getItem(this.REFRESH_TOKEN);
  // }

  // private storeJwtToken(jwt: string) {
  //   localStorage.setItem(this.JWT_TOKEN, jwt);
  // }

  // private storeTokens(tokens: Tokens) {
  //   localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
  //   localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  // }

  // private removeTokens() {
  //   localStorage.removeItem(this.JWT_TOKEN);
  //   localStorage.removeItem(this.REFRESH_TOKEN);
  // }
}
