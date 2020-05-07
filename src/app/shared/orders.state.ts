import { State, Action, StateContext, Select, Selector, Store } from '@ngxs/store';
import {  ConfirmOrder, OrderFailed, OrderSuccess, AddToCart, RemoveFromCart, SetCart, SetOrders, UpdateAmount } from './orders.actions';
import { tap} from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import { StoreService } from '../services/store.service';
import { Order, OrderItem } from '../models/order'
import { StoreDetails } from '../models/store-details'
import { AppStateModel } from '../models/app-state'
import { StoreItems } from '../models/store-items'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { StoresState, StoresStateModel } from './stores.state';
import { Observable } from 'rxjs';


export interface OrderStateModel{
    cart?: OrderItem[];
    orders?: Order[];
    total?: number
};

const defaults: OrderStateModel = {
    orders: Array<Order>(),
    cart: Array<OrderItem>(),
    total: 0.00
};

@State<OrderStateModel>({
  name: 'app',
  defaults
})
export class OrderState {

  constructor(private _orderService: OrderService, private _storeService: StoreService, private _snackBar: MatSnackBar, private _appStore: Store) {}

  @Selector()
  static getAllOrders(state: OrderStateModel) {
      return state.orders;
  }

  @Selector()
  static getPendingOrders(state: OrderStateModel) {
      return state.orders.filter(order => order.status == "PENDING")
  }

  @Selector()
  static getCart(state: OrderStateModel) {
      return state.cart;
  }

  @Action(AddToCart)
  addToCart(context: StateContext<OrderStateModel>, action: AddToCart){
    const count = context.getState().cart.filter(item => item.item_id == action.itemId).length
    const current = context.getState();

    let newItem: OrderItem;
    newItem.item_id = action.itemId
    newItem.quantity = count + 1

    let updatedItems: OrderItem[];

    if (newItem.quantity > 1){ 
        let otherItems = current.cart.filter(item => item.item_id != action.itemId)   
        otherItems.push(newItem)
        updatedItems = [...current.cart].concat(otherItems);
    }
    else{
        updatedItems = [...current.cart, newItem];
    }
    
    context.patchState({ cart: updatedItems })
    context.dispatch(new UpdateAmount())
  }

  @Action(UpdateAmount)
  updateAmount (context: StateContext<OrderStateModel>){
    const items = context.getState().cart
    let amount = 0.00

    items.forEach(item => {
        let itemId = item.item_id;
        let quantity = item.quantity;

        let storeItem = this._appStore.select((state: StoresStateModel) => state.items.find(item => item.item_id = itemId))
        storeItem.pipe(tap((details: StoreItems) => {
            let unitPrice = details.unit_price
            amount = amount + (quantity * unitPrice)
        }));
    });

    context.patchState({total: amount})

  }

  @Action(RemoveFromCart)
  RemoveFromCart(context: StateContext<OrderStateModel>, action: RemoveFromCart){
    const current = context.getState();
    const items = current.cart.filter(item => item.item_id != action.itemId)  
    context.patchState({ cart: items })
    context.dispatch(new UpdateAmount())
  }

  @Action(RemoveFromCart)
  ReduceCartItem(context: StateContext<OrderStateModel>, action: RemoveFromCart){

    const count = context.getState().cart.filter(item => item.item_id == action.itemId).length
    const current = context.getState();

    let changedItem: OrderItem;
    changedItem.item_id = action.itemId
    changedItem.quantity = count - 1

    if (changedItem.quantity > 0){ 
        let newItems = current.cart.filter(item => item.item_id != action.itemId)   
        newItems.push(changedItem)
        context.patchState({ cart: newItems });
    }
    else{
        context.dispatch(new RemoveFromCart(action.itemId))
    }

    context.dispatch(new UpdateAmount())

  }

  @Action(SetOrders)
  setCart({patchState}: StateContext<AppStateModel>){

    this._storeService.getStores().pipe(
      tap((data: StoreDetails[]) => { patchState({ stores: data }) }, (error: any) => {
        this._snackBar.openFromComponent(MessageComponent, {
          data: error
        });
      }));
  }

  @Action(SetCart)
  setOrders(context: StateContext<AppStateModel>, action: SetCart){

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

}
