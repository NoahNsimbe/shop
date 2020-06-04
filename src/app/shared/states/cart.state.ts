import { State, Action, StateContext, Selector, Store, Select } from '@ngxs/store';
import { AddToCart, RemoveFromCart, SetCart, UpdateCartTotal, DecrementCartItem } from '../actions/cart.actions';
import { tap} from 'rxjs/operators';
import { StoreItem } from '../models/store-items';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';

export interface CartStateModel{
  CartItems: Cart[];
  CartSubTotal: number;
} 

const defaults: CartStateModel = {
    CartItems: Array<Cart>(),
    CartSubTotal: 0.0
};

@State<CartStateModel>({
  name: 'cart',
  defaults
})
@Injectable()
export class CartState {

  constructor(private _snackBar: MatSnackBar) {
  }

  @Selector()
  static getCart(state: CartStateModel) {
      return state.CartItems;
  }

  @Action(AddToCart)
  addToCart(context: StateContext<CartStateModel>, action: AddToCart){
    const current = context.getState();
    const oldItem = current.CartItems.find(item => item.item === action.item.item)
    

    let updatedItem: Cart = {
      store : undefined,
      item : undefined,
      quantity : undefined,
      subtotal : undefined
    };

    if(oldItem === undefined){
      updatedItem = action.item
      updatedItem.quantity = 1
    }
    else{
      updatedItem = oldItem
      updatedItem.quantity = updatedItem.quantity + 1
    }

    updatedItem.subtotal = updatedItem.quantity * updatedItem.item.unit_price

    let updatedItems: Cart[];

    if (updatedItem.quantity > 1){ 
        let otherItems = current.CartItems.filter(item => item.item != action.item.item)   
        otherItems.push(updatedItem)
        updatedItems = otherItems;
    }
    else{
        updatedItems = [...current.CartItems, updatedItem];
    }
    
    context.patchState({ CartItems: updatedItems });
    context.dispatch(new UpdateCartTotal());
  }

  @Action(RemoveFromCart)
  removeFromCart(context: StateContext<CartStateModel>, action: RemoveFromCart){
    const current = context.getState();
    const items = current.CartItems.filter(item => item.item != action.item.item);
    context.patchState({ CartItems: items });
    context.dispatch(new UpdateCartTotal());
  }

  @Action(DecrementCartItem)
  decrementCart(context: StateContext<CartStateModel>, action: DecrementCartItem){

    const count = context.getState().CartItems.filter(item => item.item == action.item.item).length
    const current = context.getState();

    let modifiedItem: Cart = {
      store : undefined,
      item : undefined,
      quantity : undefined,
      subtotal : undefined
    };
    
    modifiedItem.item = action.item.item
    modifiedItem.quantity = count - 1
    modifiedItem.subtotal = modifiedItem.quantity * modifiedItem.item.unit_price

    if (modifiedItem.quantity > 0){ 
        let newItems = current.CartItems.filter(item => item.item != modifiedItem.item)   
        newItems.push(modifiedItem)
        context.patchState({ CartItems: newItems });
    }
    else{
        context.dispatch(new RemoveFromCart(modifiedItem))
    }

    context.dispatch(new UpdateCartTotal())

  }

  @Action(UpdateCartTotal)
  updateCartTotal(context: StateContext<CartStateModel>){

    const items = context.getState().CartItems
    let total = 0.0
    items.forEach(item => {
      total = total + item.subtotal
    });
    context.patchState({ CartSubTotal: total });

  }
}
