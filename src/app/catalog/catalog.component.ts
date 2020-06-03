import { Component, OnInit } from '@angular/core';
import { StoreItem } from '../models/store-items';
import { StoreService } from '../services/store.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { environment } from '../../environments/environment';
import { Store, Select } from '@ngxs/store';
import { StoresState } from '../shared/states/stores.state'
import { SetStore, SetItems } from '../shared/actions/stores.actions';
import { AddToCart, UpdateAmount } from '../shared/actions/orders.actions';
import { Observable } from 'rxjs';
import { StoreDetails } from '../models/store-details';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  storeItems: StoreItem[];
  apiUrl: string;
  serachValue: string;

  @Select(StoresState.getItems) items$: Observable<StoreItem[]>;
  @Select(state => state.stores.activeStore.short_name) storeName$;
  @Select(state => state.stores.activeStore.store_id) storeId$;

  constructor(
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _appStore: Store,
    private _router: Router
  ) {
    this.storeItems = new Array();
    this.apiUrl = environment.apiUrl
    this.serachValue = ""
  }

  ngOnInit() {
    // this._route.queryParams.subscribe(params => {
    //   this.storeId = params['storeId'] ? params['storeId'] : null;
    // });
    // this.getItems()
  }

  getItems(): void{

    const store = this._route.snapshot.paramMap.get('store');
    if (store == undefined){
      this._router.navigate(['']);
    }

    

  }

  viewItem(item_id: string): void{

    this._router.navigate(['/item', { item: item_id }]);

    // this._snackBar.openFromComponent(MessageComponent, {
    //   data: `${item_id} has been selected`
    // });

  }

  addToCart(item_id: string, item_name: string): void{

    this._appStore.dispatch(new AddToCart(item_id)).subscribe(() => {

          this._appStore.dispatch(new UpdateAmount()).subscribe(() => {

            this._snackBar.open(`${item_name} has been added to your cart`);

            // this._snackBar.openFromComponent(MessageComponent, {
            //   data: `${item_name} has been added to your cart`
            // });

          });

        });
  }

}
