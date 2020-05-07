import { State, Action, StateContext, Select, Selector, Store } from '@ngxs/store';
import { SetUsername, ConfirmOrder, OrderFailed, OrderSuccess, SetStores, SetItems, AddToCart } from './app.actions';
import { tap, map, first, delay, retry } from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import { StoreService } from '../services/store.service';
import { Order } from '../models/order'
import { StoreDetails } from '../models/store-details'
import { AppStateModel } from '../models/app-state'
import { StoreItems } from '../models/store-items'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';


const defaults: AppStateModel = {
    username: '',
    orders: Array<Order>(),
    stores: Array<StoreDetails>(),
    items: Array<StoreItems>(),
    cart: []
};

@State<AppStateModel>({
  name: 'app',
  defaults
})
export class AppState {

  constructor(private orderService: OrderService, private _storeService: StoreService, private _snackBar: MatSnackBar) {}

  @Selector()
  static getStores(state: AppStateModel) {
      return state.stores;
  }

  @Selector()
  static getItems(state: AppStateModel) {
      return state.items;
  }

  @Selector()
  static getCart(state: AppStateModel) {
      return state.cart;
  }

  @Action(SetStores)
  setStores({patchState}: StateContext<AppStateModel>){

    this._storeService.getStores().pipe(
      tap((data: StoreDetails[]) => { patchState({ stores: data }) }, (error: any) => {
        this._snackBar.openFromComponent(MessageComponent, {
          data: error
        });
      }));
  }

  @Action(SetItems)
  setItems(context: StateContext<AppStateModel>, action: SetItems){

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


  @Action(AddToCart)
  addToCart(context: StateContext<AppStateModel>, action: AddToCart){
    const current = context.getState();
    const items = [...current.cart, action.itemId];
    context.patchState({ cart: items })
  }


  @Action(SetUsername)
  setUsername({ patchState }: StateContext<AppStateModel>, { payload }: SetUsername) {
    patchState({ username: payload });
  }

  // @Action(ConfirmOrder, { cancelUncompleted: true })
  // confirm({ dispatch, patchState }: StateContext<AppStateModel>) {
  //   patchState({ status: 'pending' });

  //   return this.orderService.post().pipe(
  //     tap(success => (success ? dispatch(OrderSuccess) : dispatch(OrderFailed)))
  //   );
  // }

  @Action(OrderSuccess)
  orderSuccess({ patchState }: StateContext<AppStateModel>) {
    patchState({ status: 'confirmed' });
  }

  @Action(OrderFailed)
  orderFailed({ patchState }: StateContext<AppStateModel>) {
    patchState({ status: 'declined' });
  }
}
