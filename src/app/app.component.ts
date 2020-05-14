import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Router } from '@angular/router';
import { Logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shop';
  constructor(private _iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer, private actions: Actions, private router: Router) {
    this._iconRegistry.addSvgIcon( 'shopping-cart',
    this._sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/shopping-cart.svg'));

    this._iconRegistry.addSvgIcon( 'identity',
    this._sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/identity.svg'));

    this._iconRegistry.addSvgIcon( 'shopping-cart-remove',
    this._sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/shopping-cart-remove.svg'));

    this._iconRegistry.addSvgIcon( 'shopping-cart-add',
    this._sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/shopping-cart-add.svg'));

    this._iconRegistry.addSvgIcon( 'shopping-basket',
    this._sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/shopping-basket.svg'));

    this._iconRegistry.addSvgIcon( 'contact-support',
    this._sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/contact-support.svg'));
  }

  ngOnInit(): void {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['']);
    });

  }
}
