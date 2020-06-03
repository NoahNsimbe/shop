import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
  CheckoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CheckoutComponent
  ]
})
export class CheckoutModule { }
