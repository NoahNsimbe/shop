import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { SetStore, SetStores, SetItems, SetItem, UnPackCart } from './stores.actions';
import { tap } from 'rxjs/operators';
import { StoreService } from '../services/store.service';
import { StoreDetails } from '../models/store-details'
import { StoreItem } from '../models/store-items'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { OrderItem, CartItem } from '../models/order';
import { OrderStateModel } from './orders.state';


export interface StoresStateModel{
    stores: StoreDetails[];
    items: StoreItem[];
    activeStore: StoreDetails;
    activeItem: StoreItem;
    itemsPool: StoreItem[];
    cartItems: CartItem[];
};

const defaults: StoresStateModel = {
    stores: Array<StoreDetails>(),
    items: Array<StoreItem>(),
    activeStore: null,
    activeItem: null,
    itemsPool: Array<StoreItem>(),
    cartItems: Array<CartItem>()
};

@State<StoresStateModel>({
  name: 'stores',
  defaults
})
export class StoresState {

  constructor(private _storeService: StoreService, private _snackBar: MatSnackBar, private _appStore: Store) {}

  @Selector()
  static getStores(state: StoresStateModel) {
      return state.stores;
  }

  @Selector()
  static unPackCart(state: StoresStateModel) {
    return state.cartItems
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

  @Action(UnPackCart)
  unPackCart(context: StateContext<StoresStateModel>, action: UnPackCart){

      let cart = action.items
      let items: CartItem[] = Array<CartItem>();

      cart.forEach(order => {
        let item: CartItem = {
          quantity: 0,
          item: null
        };
        let id = order.item_id;
        item.quantity = order.quantity
        item.item = context.getState().itemsPool.find(item => item.item_id == id);

        if (item !== undefined){
          items.push(item)
        }

      });

      context.patchState({cartItems: items});
  }

  @Action(SetStores)
  setStores({patchState}: StateContext<StoresStateModel>){
    this._storeService.getStores().subscribe((data: StoreDetails[]) => {
      patchState({ stores: data })
    }, (error: any) => {
      this._snackBar.open(`${error}`);
      // this._snackBar.openFromComponent(MessageComponent, {
      //     data: error
      //   });
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
            this._snackBar.open(`${error}`);
            // this._snackBar.openFromComponent(MessageComponent, {
            //   data: error
            // });
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
