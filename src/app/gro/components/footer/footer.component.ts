import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'gro-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public _cartQuantity = 0;
  constructor(public _cartService: CartService) { }

  ngOnInit() {
    this._cartService.cartQuantity$.subscribe((quantity) => {
      this._cartQuantity = quantity;
    });
  }
}
