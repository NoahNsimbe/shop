import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpHeaders } from '@angular/common/http';
import { StoreItem } from '../models/store-items';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreDetails } from '../models/store-details';
import { ServerService } from './server.service'
import { Order } from '../models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  storeItems: StoreItem[]
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': null,
    })
  }
  orderUrl: string;

  constructor(private _httpClient: HttpClient, private _server: ServerService) {
    this.orderUrl = `${environment.apiUrl}/order/`;
   }

  setHeaders(): void{
    this._server.setToken()
    this.httpOptions.headers.set("Authorization", `Bearer ${localStorage.getItem("access")}`)
  }

  getOrders(): Observable<any>{

    this.setHeaders()

    return this._httpClient.get<Order[]>(this.orderUrl)
    .pipe(
      retry(3),
    );
  }

  placeOrder(data: Order){

    return this._httpClient.post<any>(this.orderUrl, data)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  changeOrder(data: Order): Observable<any>{

    this.setHeaders()
    
    return this._httpClient.put<Order[]>(this.orderUrl, data)
    .pipe(
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
      else if (error.status == 400){
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
