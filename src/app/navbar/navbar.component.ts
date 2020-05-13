import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { OrderState } from '../shared/orders.state';
import { OrderItem } from '../models/order';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Select(OrderState.getCart) cart$;
  @Select(state => state.orders.cart.length) total$;

  constructor(private _appStore: Store) {
  }

  ngOnInit() {
    this.registerIcons();
  }

  registerIcons(): void{

  }

}
