import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { StoreItems } from '../models/store-items';
import { StoresState } from '../shared/stores.state';
import { Observable } from 'rxjs';
import { StoreDetails } from '../models/store-details';
import { environment } from 'src/environments/environment';
import { SetStore } from '../shared/stores.actions';
import { tap } from 'rxjs/operators';
import { MessageComponent } from '../message/message.component';
import { AddToCart } from '../shared/app.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  storeItems: StoreItems[];
  apiUrl: string;
  storeName: string;
  @Select(StoresState.getItems) items$: Observable<StoreItems[]>;
  @Select(StoresState.getStore) getStore$: Observable<StoreDetails>;
  @Select(state => state.stores.activeStore.short_name) total$;

  constructor(private _snackBar: MatSnackBar, private _route: ActivatedRoute, private _appStore: Store) { 
    this.storeItems = new Array();
    this.apiUrl = environment.apiUrl
  }

  ngOnInit() {
    this.getItems()
  }

  getItems(): void{

    const store = this._route.snapshot.paramMap.get('store');

    this._appStore.dispatch(new SetStore(store)).pipe(tap(()=>{

      this.getStore$.pipe(tap((data: StoreDetails) => {
        this.storeName = data.short_name
      }));

    }));
  }

  viewItem(item_id: string): void{

    this._snackBar.openFromComponent(MessageComponent, {
      data: `${item_id} has been selected`
    });
  }

  addToCart(item_id: string, item_name: string): void{
    this._appStore.dispatch(new AddToCart(item_id));
    this._snackBar.openFromComponent(MessageComponent, {
      data: `${item_name} has been added to your cart => ${item_id}`
    });
  }

}
