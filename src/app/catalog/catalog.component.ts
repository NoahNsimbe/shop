import { Component, OnInit } from '@angular/core';
import { StoreItems } from '../store-items';
import { StoreService } from '../store.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  storeItems: StoreItems[];
  storeId: string;

  constructor(
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _storeService: StoreService,
  ) { 
    this.storeItems = new Array();
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.storeId = params['storeId'] ? params['storeId'] : null;
    });

    if (this.storeId != null) this.getItems(this.storeId)
  }

  getItems(id: string): void{
    this._storeService.getItems(id)
      .subscribe((data: StoreItems[]) => {
        this.storeItems = data;
      }, (error: any) => {
        console.log(error);
        this._snackBar.openFromComponent(MessageComponent, {
          data: error
        });
      })
      ;
  }

}
