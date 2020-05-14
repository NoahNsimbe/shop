import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpHeaders  } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap, retry } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { RefreshToken } from './auth.actions';
import { UserModel } from '../auth/auth.models';
import { environment } from '../../environments/environment';

export class Tokens {
  jwt: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    return this._httpClient.post<any>(`${environment.apiUrl}/api/token/`, user)
    .pipe(
      catchError(this.handleError)
    );

  }

  register(user: any){
    return this._httpClient.post<any>(`${environment.apiUrl}/register/`, user)
    .pipe(
      catchError(this.handleError)
    );
  }

  logout(token?:string) {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/logout/`, {
      'refreshToken': token
    });
  }

  getUser() {
    return this._httpClient.get(`${environment.apiUrl}/user/`)
    .pipe(
      catchError(this.handleError)
    );
  }

  refreshToken() {
    const refreshToken = this._appStore.selectSnapshot<string>(state => state.auth.refresh);
    return this._httpClient.post<any>(`${environment.apiUrl}/api/refresh/`, {
      'refresh': refreshToken
    });
  }

    private handleError(error: HttpErrorResponse) {

    let _response = null
    if (error.error instanceof ErrorEvent) {
      _response = error.error.message
      console.error('An error occurred:', _response); 
    } 
    
    else {
      if (error.status == 500){
        _response = error.error
      }
      else if (error.status == 401){
        _response = "Invalid credentials";
      }
      else if (error.status == 400){
        _response = "Please log in again with correct credentials";
      }
      else{
        _response = error.status
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(_response);
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
