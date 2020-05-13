import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
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
  constructor(_iconRegistry: MatIconRegistry, _sanitizer: DomSanitizer, private actions: Actions, private router: Router) {
    _iconRegistry.addSvgIcon( 'shopping-cart',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping-cart.svg'));

    _iconRegistry.addSvgIcon( 'identity',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/identity.svg'));

    _iconRegistry.addSvgIcon( 'shopping-cart-remove',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping-cart-remove.svg'));

    _iconRegistry.addSvgIcon( 'shopping-cart-add',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping-cart-add.svg'));

    _iconRegistry.addSvgIcon( 'shopping-basket',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping-basket.svg'));

    _iconRegistry.addSvgIcon( 'contact-support',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/contact-support.svg'));
  }

  ngOnInit(): void {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['']);
    });

  }
}
