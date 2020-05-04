import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'gro-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class GroCartComponent implements OnInit {

  items = [];
  cartTotal = 0;
  constructor(public _cartService: CartService) {
  }

  ngOnInit() {
    this._cartService.getItems().subscribe((res: any) => {
      this.cartTotal = res && res.total;
      this.items = res && res.items;
    });
  }

  addItems(item) {
    this._cartService.addItems(item);
  }

  removeItems(item) {
    this._cartService.removeItems(item);
  }

  emptyCart() {
    this._cartService.cartItems = [];
  }

  placeOrder() {
    let order = {
      orderId: 123,
      totalPrice: this._cartService.cartTotal,
      items: this._cartService.cartItems,
      orderType: 1
    };
    this._cartService.placeOrder(order).subscribe(() => {
      // console.log('message ');
    });
  }

}
