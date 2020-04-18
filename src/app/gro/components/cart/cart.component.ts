import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'gro-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class GroCartComponent implements OnInit {

  items = [];
  constructor(public _cartService: CartService) {
  }

  ngOnInit() {
    this.items = this._cartService.cartItems;
  }

  addItems(item) {
    console.log('item in add ', item);
    this._cartService.addItems(item);
  }

  removeItems(item) {
    console.log('item in remove ', item);
    this._cartService.removeItems(item);
  }

  placeOrder() {
    console.log('place order');
    let order = {
      orderId: 123,
      totalPrice: this._cartService.cartTotal,
      items: this._cartService.cartItems,
      orderType: 1
    };
    this._cartService.placeOrder(order).subscribe(() => {
      console.log('message ');
    });
  }

}
