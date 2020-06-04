import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { OrderState } from '../shared/states/orders.state';
import { OrderItem } from '../shared/models/order';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Select(OrderState.getCart) cart$;
  @Select(state => state.orders.cart.length) total$;

  constructor(private _appStore: Store, public _dialog: MatDialog) {
  }

  ngOnInit() {
  }

   openLogin() {
    this._dialog.open(LoginComponent);
  }

  openRegister() {
    this._dialog.open(RegisterComponent);
  }


}
