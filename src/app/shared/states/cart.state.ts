import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddToCart, RemoveFromCart, SyncCart, UpdateCartTotal, DecrementCartItem } from '../actions/cart.actions';
import { tap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from 'src/app/cart/cart.service';

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

  constructor(private _snackBar: MatSnackBar, private _cartService: CartService) {
  }

  @Selector()
  static getCart(state: CartStateModel) {
      return state.CartItems;
  }

  @Action(SyncCart)
  syncCart(context: StateContext<CartStateModel>){
    
    this._cartService.getCart().pipe(tap((data: Cart[]) => {

      let currentItems = context.getState().CartItems
      let dbItems: Cart[] = data;

      if (dbItems.length === 0 && currentItems.length !== 0){
        this._cartService.createCart(currentItems);
      }
  
      else if (dbItems.length !== 0 && currentItems.length === 0){
        currentItems = dbItems;
        context.patchState({ CartItems: currentItems });
      }
  
      else if(dbItems.length !== 0 && currentItems.length !== 0){
        currentItems = currentItems.concat(dbItems);
        context.patchState({ CartItems: currentItems });
        this._cartService.updateCart(currentItems);
      }
      else{
        return []
      }
  
      context.dispatch(new UpdateCartTotal());

    }, (error: any) => {
      this._snackBar.open(`${error}`);
    }));
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
    context.dispatch(new SyncCart());
  }

  @Action(RemoveFromCart)
  removeFromCart(context: StateContext<CartStateModel>, action: RemoveFromCart){
    const current = context.getState();
    const items = current.CartItems.filter(item => item.item != action.item.item);
    context.patchState({ CartItems: items });
    context.dispatch(new SyncCart());
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

    context.dispatch(new SyncCart());

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
