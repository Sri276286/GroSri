import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/gro/services/cart.service';

@Component({
  selector: 'gro-cart-bar',
  templateUrl: 'cart-bar.component.html',
  styleUrls: ['cart-bar.component.scss']
})
export class CartBarComponent implements OnInit {

  cartTotal = 0;
  cartQuantity = '';
  quantity = 0;
  constructor(private _cartService: CartService) { }

  ngOnInit() {
    this._cartService.cartEntity$.subscribe((cart) => {
      this.cartTotal = cart && (cart.billTotal || cart.total);
      this.quantity = cart && cart.orderProducts && cart.orderProducts.length;
      if (this.quantity === 1) {
        this.cartQuantity = `1 item`;
      } else {
        this.cartQuantity = `${this.quantity} items`;
      }
    });
  }
}
