import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'gro-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class GroCartComponent implements OnInit {

  items = [];
  cartTotal = 0;
  storeId = '';
  isOrdered: boolean = false;
  isLoggedIn: boolean = false;
  constructor(public _cartService: CartService,
    private _router: Router,
    public _commonService: CommonService,
    private toast: ToastService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.isLoggedIn = this._commonService.isLogin();
    if (this.isLoggedIn) {
      this._cartService.getCartItems().subscribe((res: any) => {
        this.spinner.hide();
        this.cartTotal = res && res.billTotal || 0;
        this.items = res && res.orderProducts || [];
        this.storeId = res && res.store && res.store.id;
      });
    }
    this._cartService.cartEntity$.subscribe((res) => {
      console.log('abc ', res);
      this.spinner.hide();
      this.cartTotal = res && res.billTotal || 0;
      this.items = res && res.orderProducts || [];
    });
  }

  addItems(item) {
    this._cartService.addItems(item);
  }

  removeItems(item) {
    this._cartService.removeItems(item);
  }

  emptyCart() {
    this.spinner.show();
    if (this.isLoggedIn) {
      this._cartService.clearCart().subscribe(() => {
        this._cartService.resetCart();
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
        this.toast.show(`Failed to empty cart`);
      });
    } else {
      this._cartService.resetCart();
      this.spinner.hide();
    }
  }

  placeOrder() {
    if (this.isLoggedIn) {
      this._cartService.placeOrder().subscribe(() => {
        this._cartService.resetCart();
        this.isOrdered = true;
      });
    } else {
      this._router.navigate(['/login']);
    }
  }

}
