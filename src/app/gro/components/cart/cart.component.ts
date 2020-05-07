import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FloatingModalComponent } from '../floating-modal/floating-modal.component';

@Component({
  selector: 'gro-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class GroCartComponent implements OnInit {

  items = [];
  cartTotal = 0;
  isOrdered: boolean = false;
  constructor(public _cartService: CartService,
    private _router: Router,
    private _modalService: NgbModal) {
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
    this.resetCart();
  }

  placeOrder() {
    const isLoggedIn = localStorage.getItem('auth_token');
    if (isLoggedIn) {
      this._cartService.placeOrder(this._cartService.cartEntity).subscribe(() => {
        // console.log('message ');
        // this._router.navigate(['/home']);
        // this._modalService.open(FloatingModalComponent);
        this.resetCart();
        this.isOrdered = true;
      });
    } else {
      this._router.navigate(['/login']);
    }
  }

  private resetCart() {
    this._cartService.cartEntity$.next(null);
    this._cartService.cartQuantity$.next(0);
    this._cartService.setInLocalStorage();
  }

}
