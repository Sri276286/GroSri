import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gro-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class GroCartComponent implements OnInit {

  items = [];
  cartTotal = 0;
  constructor(public _cartService: CartService,
    private _router: Router) {
  }

  ngOnInit() {
    this._cartService.getItems().subscribe((res: any) => {
      this.cartTotal = res && res.total;
      this.items = res && res.items;
    });

    this._cartService.cartEntity$.subscribe((res) => {
      this.cartTotal = res && res.total || 0;
      this.items = res && res.items || [];
    });
  }

  addItems(item) {
    this._cartService.addItems(item);
  }

  removeItems(item) {
    this._cartService.removeItems(item);
  }

  emptyCart() {
    this._cartService.emptyCart();
  }

  placeOrder() {
    this._cartService.placeOrder(this._cartService.cartEntity).subscribe(() => {
      this._cartService.cartEntity$.next(null);
      // console.log('message ');
      this._router.navigate(['/home']);
    });
  }

}
