import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Cart } from '../shared/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl = `${environment.apiUrl}/stores/`

  constructor(private httpClient: HttpClient) { }

  getCart(){
    return this.httpClient.get(this.cartUrl);
  }

  createCart(cart: Cart[]){
    return this.httpClient.post(this.cartUrl, cart);
  }

  updateCart(cart: Cart[]){
    return this.httpClient.put(this.cartUrl, cart);
  }

  getItems(store_id: string){
    return this.httpClient.post(this.cartUrl, {"store_id": store_id}).pipe(
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

    _response = `[Message : ${error.message}] [Code : ${error.status}], [Status Text : ${error.statusText}]`

    return throwError(_response);
  }
}
