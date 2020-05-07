import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { OrderState } from '../shared/orders.state';
import { OrderItem } from '../models/order'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Select(OrderState.getCart) cart$;
  @Select(state => state.orders.cart.length) total$;
  // cartCount: number;

  constructor(private _appStore: Store) {
    // this.cartCount = 0
  }

  ngOnInit() {
   // this.getCart()
  }

  // getCart(): void{
  //   this.cart$.subscribe((data: OrderItem[]) => {
  //     this.cartCount = data
  //     this.cartCount = this.cartCount + 1
  //     console.log(this.cartCount);
  //   });
  // }

}
