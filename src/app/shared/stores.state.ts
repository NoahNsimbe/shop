import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetStore, SetStores, SetItems, SetItem } from './stores.actions';
import { tap } from 'rxjs/operators';
import { StoreService } from '../services/store.service';
import { StoreDetails } from '../models/store-details'
import { StoreItem } from '../models/store-items'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { OrderItem } from '../models/order';


export interface StoresStateModel{
    stores: StoreDetails[];
    items: StoreItem[];
    activeStore: StoreDetails;
    activeItem: StoreItem;
    itemsPool: StoreItem[];
};

const defaults: StoresStateModel = {
    stores: Array<StoreDetails>(),
    items: Array<StoreItem>(),
    activeStore: null,
    activeItem: null,
    itemsPool: Array<StoreItem>()
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
  static unPackCart(state: StoresStateModel, orderItems: OrderItem[]) {

      let items: StoreItem[];
      orderItems.forEach(order => {
        let id = order.item_id
        let item = state.itemsPool.find(item => item.item_id == id);
        items.push(item)
        
      });

      return items;
  }

  @Selector()
  static getUnitPrice(state: StoresStateModel, itemId: string) {
      return state.items.find(item => item.item_id == itemId).unit_price
  }

  @Selector()
  static getItem(state: StoresStateModel) {
       return state.activeItem
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
    this._storeService.getStores().subscribe((data: StoreDetails[]) => {
      patchState({ stores: data })
    }, (error: any) => {
      this._snackBar.openFromComponent(MessageComponent, {
          data: error
        });
    });
  }

  @Action(SetItems)
  setItems(context: StateContext<StoresStateModel>, action: SetItems){
    console.log("am here")
    const current = context.getState().itemsPool;
    this._storeService.getItems(action.storeId).subscribe(
      (data: StoreItem[]) => {
          const items = data
          const newPool = data.concat(current)
          context.patchState({ items: items })
          context.patchState({ itemsPool: newPool })
        },(error: any) => {
            this._snackBar.openFromComponent(MessageComponent, {
              data: error
            });
        });

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

  @Action(SetItem)
  setItem(context: StateContext<StoresStateModel>, { itemId }: SetItem) {
      let activeItem = context.getState().items.find(item => item.item_id == itemId)
      context.patchState({ activeItem: activeItem });
  }
}
