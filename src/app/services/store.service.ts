import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { StoreItems } from '../models/store-items';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreDetails } from '../models/store-details';
import { ServerService } from './server.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storeUrl = `${environment.apiUrl}/stores/`
  // storeUrl = `http://127.0.0.1:8000/stores/`

  constructor(
    private httpClient: HttpClient,
    private _server: ServerService) { }

  getItems(store_id: string): Observable<any>{
    return this.httpClient.post<StoreItems[]>(this.storeUrl, {"store_id": store_id})
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getStores(): Observable<StoreDetails[]>{
    return this.httpClient.get<StoreDetails[]>(this.storeUrl).pipe(
      retry(3),
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
      else{
        _response = error.status
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
_response = error.message

    return throwError(_response);
  }

}
