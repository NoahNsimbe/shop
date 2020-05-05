import { Component, OnInit } from '@angular/core';
import { StoreDetails } from '../models/store-details';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetStores } from '../shared/app.actions';
import { MessageComponent } from '../message/message.component';
import { Store, Select } from '@ngxs/store';
import { AppState } from '../shared/app.state'
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  shoppingStores: StoreDetails[];
  store_id: string;

  @Select(AppState.getStores) stores$;

  constructor( private _router: Router, private _snackBar: MatSnackBar, private _appStore: Store) {
    this.store_id = "";
    this._appStore.dispatch( new SetStores() );
   }

  ngOnInit() {
    this.getStores();
  }

  goToItems() {
    // this._router.navigate(['/stores', { storeId: this.store_id }]);
    this._router.navigate(['/stores/'+this.store_id]);
  }

  getStores(): void{
    this.stores$.subscribe((data: StoreDetails[]) => {
      this.shoppingStores = data;
      console.log(this.shoppingStores);
    });

    // this._storeService.getStores()
    //   .subscribe((data: StoreDetails[]) => {
    //     this.shoppingStores = data;
    //     // console.log(this.shoppingStores);
	
    //   }, (error: any) => {
    //     console.log(error);
    //     this._snackBar.openFromComponent(MessageComponent, {
    //       data: error
    //     });
    //   });
  }

}
