import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private _httpClient: HttpClient) { }

  searchItem(searchValue: string){
    return this._httpClient.get<any>(`${environment.apiUrl}/items/?search=${searchValue}`)
    .pipe(
      catchError(this.handleError)
    );
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
        //this._router.navigate(['/account/login']);
        _response = "Invalid credentials";
      }
      else if (error.status == 400){
       // this._router.navigate(['/account/login']);
        _response = "Please log in again with correct credentials";
      }
      else{
        _response = error.status
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }

    return throwError(_response);
  }
}
