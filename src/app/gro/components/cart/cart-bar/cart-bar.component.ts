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
  quantity =0;
  constructor(private _cartService: CartService) { }

  ngOnInit() {
    this._cartService.cartEntity$.subscribe((cart) => {
      this.cartTotal = cart && cart.total;
    });
    this._cartService.cartQuantity$.subscribe((quantity) => {
      this.quantity = quantity;
      if (quantity === 1) {
        this.cartQuantity = `${quantity} item`;
      } else {
        this.cartQuantity = `${quantity} items`;
      }
    });
  }
}
