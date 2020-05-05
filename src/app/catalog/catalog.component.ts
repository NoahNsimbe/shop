import { Component, OnInit } from '@angular/core';
import { StoreItems } from '../models/store-items';
import { StoreService } from '../services/store.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { environment } from '../../environments/environment';
import { Store } from '@ngxs/store';
import { AppState } from '../shared/app.state'
import { AddToCart } from '../shared/app.actions';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  storeItems: StoreItems[];
  storeId: string;
  apiUrl: string;

  constructor(
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _storeService: StoreService,
    private _appStore: Store
  ) { 
    this.storeItems = new Array();
    this.apiUrl = environment.apiUrl
  }

  ngOnInit() {
    // this._route.queryParams.subscribe(params => {
    //   this.storeId = params['storeId'] ? params['storeId'] : null;
    // });
    this.getItems()
  }

  getItems(): void{
    const store = this._route.snapshot.paramMap.get('store');
    console.log(store);
    this._storeService.getItems(store)
      .subscribe((data: StoreItems[]) => {
        this.storeItems = data;
      }, (error: any) => {
        console.log(error);
        this._snackBar.openFromComponent(MessageComponent, {
          data: error
        });
      });
  }

  viewItem(item_id: string): void{

    this._snackBar.openFromComponent(MessageComponent, {
      data: `${item_id} has been selected`
    });



    // const store = this._route.snapshot.paramMap.get('store');
    // console.log(store);
    // this._storeService.getItems(store)
    //   .subscribe((data: StoreItems[]) => {
    //     this.storeItems = data;
    //   }, (error: any) => {
    //     console.log(error);
    //     this._snackBar.openFromComponent(MessageComponent, {
    //       data: error
    //     });
    //   });
  }

  addToCart(item_id: string, item_name: string): void{
    this._appStore.dispatch(new AddToCart(item_id))
    this._snackBar.openFromComponent(MessageComponent, {
      data: `${item_name} has been added to your cart => ${item_id}`
    });
  }

}
