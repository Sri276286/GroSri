import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'gro-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class GroCartComponent implements OnInit {

  items = [];
  cartTotal = 0;
  isOrdered: boolean = false;
  isLoggedIn: boolean = false;
  constructor(public _cartService: CartService,
    private _router: Router,
    public _commonService: CommonService) {
  }

  ngOnInit() {
    this.isLoggedIn = this._commonService.isLogin();
    this._cartService.cartEntity$.subscribe((res) => {
      this._cartService.cartEntity = res;
      console.log('res cart ', res)
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
    this._cartService.resetCart();
  }

  placeOrder() {
    if (this.isLoggedIn) {
      console.log('orderr place ', this._cartService.cartEntity);
      this._cartService.placeOrder(this._cartService.cartEntity).subscribe(() => {
        this._cartService.resetCart();
        this.isOrdered = true;
      });
    } else {
      this._router.navigate(['/login']);
    }
  }

}
