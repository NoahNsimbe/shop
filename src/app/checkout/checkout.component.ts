import { Component, OnInit } from '@angular/core';
import { StoreDetails } from '../models/store-details';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetStores } from '../shared/stores.actions';
import { MessageComponent } from '../message/message.component';
import { Store, Select } from '@ngxs/store';
import { StoresState } from '../shared/stores.state'
import { Observable, throwError } from 'rxjs';
import { OrderState } from '../shared/orders.state';
import { Locations, Order, OrderItem, CartItem } from '../models/order';
import { SetOrders, UpdateAmount } from '../shared/orders.actions';
import { StoreItem } from '../models/store-items';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  region: string;
  district: string;

  districts$ : string[];
  @Select(OrderState.getCart) cart$ : Observable<OrderItem[]>;
  @Select(StoresState.unPackCart) cartDetails$ : Observable<CartItem[]>;
  @Select(state => state.orders.total) sub_total$;
  regions$: string[];
  tranport: number;
  total: number;

  constructor(private _router: Router, private _snackBar: MatSnackBar, private _route: ActivatedRoute, private _appStore: Store) { }

  ngOnInit() {
    this.tranport = 2000;
    this.sub_total$.subscribe((data: number) => {
      this.total = this.tranport + data
    });
    this.regions$ = ["ff", "dsd"]
    this.districts$ = ["ff", "dsd"]
  }

  placeOrder() {
    // this._router.navigate(['/stores', { storeId: this.store_id }]);
    // this._router.navigate(['/stores/'+this.store_id]);

    // let order : Order = {
    //   address : "",
    //   order_time : null,
    //   amount: this.total,
    //   items: Array<OrderItem>()
    // }

    // this.cart$.subscribe((data: OrderItem[]) => {
    //   order.items = data;

    // });

    let order_id = "ST-2323-2323"
    this._snackBar.open(`${order_id} has been set. You will be notified once its approved`);

    // this._appStore.dispatch(new SetOrders(order)).subscribe(() => {

    //     this._snackBar.open(`${order_id} has been set. You will be notified once its approved`);

    //     this._snackBar.openFromComponent(MessageComponent, {
    //       data: `${order_id} has been set. You will be notified once its approved`
    //     });

    //   });
    }
  }
