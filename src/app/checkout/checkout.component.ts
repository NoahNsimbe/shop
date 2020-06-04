import { Component, OnInit } from '@angular/core';
import { StoreDetails } from '../shared/models/store-details';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetStores } from '../shared/actions/stores.actions';
import { MessageComponent } from '../message/message.component';
import { Store, Select } from '@ngxs/store';
import { StoresState } from '../shared/states/stores.state'
import { Observable, throwError } from 'rxjs';
import { OrderState } from '../shared/states/orders.state';
import { Locations, Order, OrderItem, CartItem } from '../shared/models/order';
import { SetOrders, UpdateAmount } from '../shared/actions/orders.actions';
import { StoreItem } from '../shared/models/store-items';
import { tap } from 'rxjs/operators';

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

  makeId() {
    const lengthOfCode = 4;
    let possible = "1234567890";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  placeOrder() {
    // this._router.navigate(['/stores', { storeId: this.store_id }]);
    // this._router.navigate(['/stores/'+this.store_id]);

    let dateTime = new Date()
    let order_id = "ORD-".concat(this.makeId()).concat("-").concat(this.makeId()).concat("-").concat(this.makeId())

    let order : Order = {
      order_id: order_id,
      address : "ddddddd",
      order_time : dateTime.toISOString(),
      amount: this.total,
      products: Array<OrderItem>()
    }
    // order.order_time = "2020-05-03 15:23:14"
    this.cart$.subscribe((data: OrderItem[]) => {
      order.products = data;
    })

    // console.log(order)
    this._appStore.dispatch(new SetOrders(order)).subscribe(() => {
        this._snackBar.open(`${order.order_id} has been set. You will be notified once its approved`);
        // this._router.navigate(['/stores/']);

      });
    }
  }
