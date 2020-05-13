import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop';
  constructor(_iconRegistry: MatIconRegistry, _sanitizer: DomSanitizer) {
    _iconRegistry.addSvgIcon( 'shopping-cart',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping-cart.svg'));

    _iconRegistry.addSvgIcon( 'identity',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/identity.svg'));

    _iconRegistry.addSvgIcon( 'shopping-cart-remove',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping-cart-remove.svg'));

    _iconRegistry.addSvgIcon( 'shopping-cart-add',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping-cart-add.svg'));

    _iconRegistry.addSvgIcon( 'contact-support',
    _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/contact-support.svg'));
  }
}
