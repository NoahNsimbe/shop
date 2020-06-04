import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StoresState } from '../shared/states/stores.state';
import { Observable } from 'rxjs';
import { StoreDetails } from '../shared/models/store-details';
import { StoreItem } from '../shared/models/store-items';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { StoreService } from '../services/store.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';

import { SetStore, SetItem } from '../shared/actions/stores.actions';
import { AddToCart, UpdateAmount } from '../shared/actions/orders.actions';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  storeItem$ : StoreItem;
  
  apiUrl: string;
  // item$: Observable<StoreItem>;
  // activeItem: StoreItem;

  activeItem: Observable<StoreItem>;
   @Select(state => state.stores.activeItem) total$;
   @Select(state => state.orders.cart.length) totals$;
  // storeItem$: StoreItem;

  constructor(private _snackBar: MatSnackBar, private _route: ActivatedRoute, private _appStore: Store) { 
    this.apiUrl = environment.apiUrl
  }

  ngOnInit() {
    this.getItem()
  }

  getItem(): void{
    const item = this._route.snapshot.paramMap.get('item');

    this._appStore.dispatch(new SetItem(item)).subscribe(() => {

       this.total$.subscribe((data: StoreItem) => {
         this.storeItem$ = data
       });

    });
  }

  addToCart(item_id: string, item_name: string): void{

    this._appStore.dispatch(new AddToCart(item_id)).subscribe(() => {

          this._appStore.dispatch(new UpdateAmount()).subscribe(() => {

            this._snackBar.open(`${item_name} has been added to your cart`);

          });

        });
  }

}
