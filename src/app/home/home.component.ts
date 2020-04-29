import { Component, OnInit } from '@angular/core';
import { StoreDetails } from '../store-details';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  shoppingStores: StoreDetails[];
  storeId: string;

  constructor(
     private router: Router
  ) {
    this.storeId = ""
   }

  ngOnInit() {
    this.getStores();
  }

  goToItems() {
    this.router.navigate(['/stores', { storeId: this.storeId }]);
  }

  getStores() {
    this.shoppingStores = [
      {id: 'xx', shortName: 'Capital Shoppers', fullName: 'Capital Shoppers Supermarket'},
      {id: 'yy', shortName: 'Mega Standard', fullName: 'Mega Standard Supermarket'},
      {id: 'zz', shortName: 'Best Buy', fullName: 'Best Buy Supermarket'}
    ];
  }

}
