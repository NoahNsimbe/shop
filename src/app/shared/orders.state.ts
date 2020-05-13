import { State, Action, StateContext, Selector, Store, Select } from '@ngxs/store';
import {  ConfirmOrder, OrderFailed, OrderSuccess, AddToCart, RemoveFromCart, SetCart, SetOrders, UpdateAmount } from './orders.actions';
import { tap} from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import { Order, OrderItem, Locations } from '../models/order';

import { StoreItem } from '../models/store-items';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { StoresStateModel, StoresState } from './stores.state';
import { Observable } from 'rxjs';

const location: Locations = {
  districts: ["Kampaala", "Jinja"],
  regions: ["Ntinda", "Kamwokya"]
}

export interface OrderStateModel{
    cart: OrderItem[];
    orders: Order[];
    total: number;
    locations: Locations;

};

const defaults: OrderStateModel = {
    orders: Array<Order>(),
    cart: Array<OrderItem>(),
    total: 0.00,
    locations: location
};

@State<OrderStateModel>({
  name: 'orders',
  defaults
})
export class OrderState {

  items$: Observable<StoreItem[]>;

  constructor(private _orderService: OrderService, private _snackBar: MatSnackBar, private _appStore: Store) {
  }

  @Selector()
  static getAllOrders(state: OrderStateModel) {
      return state.orders;
  }

  @Selector()
  static getPendingOrders(state: OrderStateModel) {
      return state.orders.filter(order => order.status == "PENDING")
  }

  @Selector()
  static getDistricts(state: OrderStateModel) {
      return state.locations.districts
  }

  @Selector()
  static getRegions(state: OrderStateModel) {
      return state.locations.regions
  }

  @Selector()
  static getCart(state: OrderStateModel) {
      return state.cart;
  }

  @Action(AddToCart)
  addToCart(context: StateContext<OrderStateModel>, action: AddToCart){

    const item = context.getState().cart.find(item => item.item_id === action.itemId)
    const current = context.getState();

    let newItem: OrderItem = {
      item_id : undefined,
      quantity: undefined
    };

    newItem.item_id = action.itemId

    if(item === undefined){
      newItem.quantity = 1
    }
    else{
      newItem.quantity = item.quantity + 1
    }

    let updatedItems: OrderItem[];

    if (newItem.quantity > 1){ 
        let otherItems = current.cart.filter(item => item.item_id != action.itemId)   
        otherItems.push(newItem)
        updatedItems = otherItems;
    }
    else{
        updatedItems = [...current.cart, newItem];
    }
    
    context.patchState({ cart: updatedItems });
  }

  @Action(SetOrders)
  setCart(context: StateContext<OrderStateModel>, action: SetOrders){

    const current = context.getState();
    let updatedOrders: Order[];
    updatedOrders = [...current.orders, action.order];
    context.patchState({ orders: updatedOrders });

    // const current = context.getState();

    // let newItem: OrderItem = {
    //   item_id : undefined,
    //   quantity: undefined
    // };

    // newItem.item_id = action.itemId

    // if(item === undefined){
    //   newItem.quantity = 1
    // }
    // else{
    //   newItem.quantity = item.quantity + 1
    // }

    // let updatedItems: OrderItem[];

    // if (newItem.quantity > 1){ 
    //     let otherItems = current.cart.filter(item => item.item_id != action.itemId)   
    //     otherItems.push(newItem)
    //     updatedItems = otherItems;
    // }
    // else{
    //     updatedItems = [...current.cart, newItem];
    // }
    
    // context.patchState({ cart: updatedItems });
  }

  @Action(UpdateAmount)
  updateAmount (context: StateContext<OrderStateModel>){
    const items = context.getState().cart
    let amount = 0.00
    this.items$ = this._appStore.select(state => state.stores.itemsPool);

    items.forEach(item => {
        let itemId = item.item_id;
        let quantity = item.quantity;

        this.items$.subscribe((data: StoreItem[]) => {
          let y = data.find(x => x.item_id == itemId);
          console.log(y)
          let unitPrice = y.unit_price
          amount = amount + (quantity * unitPrice)
        });

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

    let changedItem: OrderItem = {
      item_id : undefined,
      quantity: undefined
    };
    
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
}
