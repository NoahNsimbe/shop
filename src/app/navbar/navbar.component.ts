import { Component, OnInit } from '@angular/core';
import { Store, Select, getActionTypeFromInstance } from '@ngxs/store';
import { AppState } from '../shared/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Select(AppState.getCart) cart$;
  @Select(state => state.app.cart.length) total$;
  cartCount: number;

  constructor(private _appStore: Store) {
    this.cartCount = 0
  }

  ngOnInit() {
    this.getCart()
  }

  getCart(): void{
    this.cart$.subscribe((data: string[]) => {
      this.cartCount = data.length
      console.log(this.cartCount);
    });
  }

}
