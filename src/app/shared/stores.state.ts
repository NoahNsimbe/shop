import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetStore, SetStores, SetItems } from './stores.actions';
import { tap } from 'rxjs/operators';
import { StoreService } from '../services/store.service';
import { StoreDetails } from '../models/store-details'
import { StoreItems } from '../models/store-items'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';


export interface StoresStateModel{
    stores: StoreDetails[];
    items: StoreItems[];
    activeStore?: StoreDetails;
};

const defaults: StoresStateModel = {
    stores: Array<StoreDetails>(),
    items: Array<StoreItems>(),
    activeStore: null
};

@State<StoresStateModel>({
  name: 'stores',
  defaults
})
export class StoresState {

  constructor(private _storeService: StoreService, private _snackBar: MatSnackBar) {}

  @Selector()
  static getStores(state: StoresStateModel) {
      return state.stores;
  }

  @Selector()
  static getItem(state: StoresStateModel, itemId: string) {
       return state.items.find(item => item.item_id == itemId)
  }

  @Selector()
  static getStore(state: StoresStateModel) {
      return state.activeStore;
  }

  @Selector()
  static getItems(state: StoresStateModel) {
      return state.items;
  }

  @Action(SetStores)
  setStores({patchState}: StateContext<StoresStateModel>){

    this._storeService.getStores().pipe(
      tap((data: StoreDetails[]) => { patchState({ stores: data }) }, (error: any) => {
        this._snackBar.openFromComponent(MessageComponent, {
          data: error
        });
      }));
  }

  @Action(SetItems)
  setItems(context: StateContext<StoresStateModel>, action: SetItems){

    this._storeService.getItems(action.storeId).pipe(
      tap((data: StoreItems[]) => {
          const items = data;
          context.patchState({ items: items })
        },(error: any) => {
            this._snackBar.openFromComponent(MessageComponent, {
              data: error
            });
        }));

  }

  @Action(SetStore)
  setStore(context: StateContext<StoresStateModel>, { storeId }: SetStore) {

      let activeStore = context.getState().stores.find(store => store.store_id == storeId)

      if (activeStore.store_id == null){
        context.dispatch(new SetStores()).pipe(tap(() => {
            activeStore = context.getState().stores.find(store => store.store_id == storeId)
        }));
      }

      context.patchState({ activeStore: activeStore });
      context.dispatch(new SetItems(storeId));
      
  }
}
