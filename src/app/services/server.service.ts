import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User, UserLogin } from '../shared/models/user';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  access_token = ""
  refresh_token = ""
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': null,
    })
  }

  constructor(private _httpClient: HttpClient) { }

  saveUser(details: any): Observable<any>{
    this.httpOptions.headers.set('Authorization', 'JWT' + this.access_token);
    return this._httpClient.post('', details, this.httpOptions)
                          .pipe(
                            retry(3),
                            catchError(this.handleError)
                          );
  }
// `${environment.apiUrl}/users`

  // login(user: UserLogin) {
  //   return this._httpClient.post<any>(`${environment.apiUrl}/users/authenticate`, user)
  //       .pipe(map(user => {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('currentUser', JSON.stringify(user));

  //           this.currentUserSubject.next(user);
  //           return user;
  //       }));
  //   }
  login(user: UserLogin) {
    return this._httpClient.post<any>(`${environment.apiUrl}/token/`, user)
            .subscribe(data => {
                localStorage.setItem("access", data['access']);
                localStorage.setItem("refresh", data["refresh"]);
            },catchError(this.handleError));
    }

    logout() {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }

  getToken(user: UserLogin): boolean{

    let response: boolean = false;

    this._httpClient.post(`{environment.apiUrl}/token/`, JSON.stringify(user))
                   .subscribe(data => {
                       localStorage.setItem("access", data['access']);
                       localStorage.setItem("refresh", data["refresh"]);
                       response = true;
                      },catchError(this.handleError)
                     );
    return response

  }

  private refreshToken(): boolean{

    let refresh_token = localStorage.getItem("refresh");

    let response: boolean = false;

    this._httpClient.post(`{environment.apiUrl}/refresh/`, JSON.stringify({"refresh": refresh_token}))
                   .subscribe(data => {
                       localStorage.setItem("access", data['access'])
                       response = true;
                      },catchError(this.handleError)
                     );
    return response

  }

  setToken(): boolean{
    let access_token = localStorage.getItem("access");

    let response: boolean = false;

    this._httpClient.post(`{environment.apiUrl}/verify/`, JSON.stringify({"access": access_token}))
                   .subscribe(data => {
                       localStorage.setItem("access", data['access'])
                       response = true;
                      },catchError(this.handleError)
                     );
    return response

  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(
      'Something bad happened; please try again later.');
  }
}
