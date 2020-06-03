import { Component, OnInit } from '@angular/core';
import { StoreDetails } from '../models/store-details';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetStores } from '../shared/actions/stores.actions';
import { MessageComponent } from '../message/message.component';
import { Store, Select } from '@ngxs/store';
import { StoresState } from '../shared/states/stores.state'
import { Observable, throwError } from 'rxjs';
import { SetStore, SetItems } from '../shared/actions/stores.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  shoppingStores: StoreDetails[];
  store_id: string;

  @Select(StoresState.getStores) stores$ : Observable<StoreDetails[]>;

  constructor( private _router: Router, private _snackBar: MatSnackBar, private _appStore: Store) {
      this.store_id = "";
      this._appStore.dispatch( new SetStores() );
   }

  ngOnInit() {
   
   // this.getStores();
  }

  goToItems() {
    // this._router.navigate(['/stores', { storeId: this.store_id }]);
    this._appStore.dispatch(new SetStore(this.store_id)).subscribe((data: any) => {
      // this._snackBar.open("PLease hold on as we navigate you to your store ");
      this._router.navigate(['/stores/'+this.store_id]);
    });
  }

  getStores(): void{
    this.stores$.subscribe((data: StoreDetails[]) => {
      this.shoppingStores = data;
      // console.log(this.shoppingStores);
    });
  }

}
