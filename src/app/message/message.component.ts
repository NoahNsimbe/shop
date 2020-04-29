import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  template: '<p>{{data}}</p>',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
