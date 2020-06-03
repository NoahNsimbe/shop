import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { StoreItem } from '../models/store-items';
import { StoresState } from '../shared/states/stores.state';
import { Observable } from 'rxjs';
import { StoreDetails } from '../models/store-details';
import { environment } from 'src/environments/environment';
import { SetStore, UnPackCart } from '../shared/actions/stores.actions';
import { tap } from 'rxjs/operators';
// import { MessageComponent } from '../message/message.component';
import { AddToCart, UpdateAmount, RemoveFromCart } from '../shared/actions/orders.actions';
import { OrderState } from '../shared/states/orders.state';
import { OrderItem, CartItem } from '../models/order';

export interface Cart{
  item: StoreItem;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // storeItems: StoreItem[];
  apiUrl: string;
  storeName: string;
  items$: StoreItem[];
  // @Select(StoresState.getStore) getStore$: Observable<StoreDetails>;

  @Select(state => state.orders.total) sub_total$;
  @Select(OrderState.getCart) cart$: Observable<OrderItem[]>;
  @Select(StoresState.unPackCart) cartItems$: Observable<CartItem[]>;

  cart: Cart[];
  tranport: number;
  total: number;

  constructor(private _router: Router, private _snackBar: MatSnackBar, private _route: ActivatedRoute, private _appStore: Store) {
    this.items$ = new Array();
    this.apiUrl = environment.apiUrl;
    this.tranport = 2000
  }

  ngOnInit() {



    this.sub_total$.subscribe((data: number) => {
      this.total = this.tranport + data
    });

    this.cart$.subscribe((items: OrderItem[]) => {
      this._appStore.dispatch(new UnPackCart(items));
    });
  }

  getTotal(): void{
    this._router.navigate(['/checkout/']);
   //  this.addToCart("ITEM-8588-9895-1648", "ITEM-8588-9895-1648")
  }

  getItems(): void{

    this.cart$.pipe(tap((items: OrderItem[]) => {

      items.forEach(element => {
        let item: Cart;
        item.quantity = element.quantity
        this._appStore.selectOnce(store => store.stores.items.find(item => item.item_id == element.item_id))
        .pipe(tap((details: StoreItem) => {
          item.item = details
        }));
        this.cart.push(item)
      });
    }))
  }

  viewItem(item_id: string): void{
    this._snackBar.open(`${item_id} has been selected`);
  }

  removeFromCart(item_id: string, item_name: string): void{

    // this._snackBar.open(`${item_name} has been removed from your cart`);

      this._appStore.dispatch(new RemoveFromCart(item_id)).subscribe(() => {
        this._snackBar.open(`${item_name} has been removed from your cart`);
      });

      // this._appStore.dispatch(new UpdateAmount());

    // this._appStore.dispatch(new RemoveFromCart(item_id)).pipe(tap(() => {

    //   this._snackBar.open(`${item_name} has been removed from your cart`);

    //       this._appStore.dispatch(new UpdateAmount()).subscribe(() => {

    //         this._snackBar.open(`amount has been updated`);

    //       })

    //     }));
  }

  updateCart(item_id: string): void{

    this.cartItems$.subscribe((items: CartItem[]) => {
      let item = items.find(item => item.item.item_id == item_id);
      this._snackBar.open(`new quantity is ${item.quantity}`);
    });

    // this._appStore.dispatch(new AddToCart(item_id)).subscribe(() => {

    //   this._appStore.dispatch(new UpdateAmount()).subscribe(() => {

    //   })

    // });
  }

}
