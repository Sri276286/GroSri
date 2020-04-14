import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'gro-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class GroCartComponent {

  constructor(public _cartService: CartService) {
  }

  addItems(item) {
    console.log('item in add ', item);
    this._cartService.addItems(item);
  }

  removeItems(item) {
    console.log('item in remove ', item);
    this._cartService.removeItems(item);
  }

}
