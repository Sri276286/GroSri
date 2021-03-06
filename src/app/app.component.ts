import { Component, OnInit } from '@angular/core';
import { CommonService } from './gro/services/common.service';
import { CartService } from './gro/services/cart.service';

@Component({
  selector: 'gro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'grosri';

  constructor(private _commonService: CommonService,
    private _cartService: CartService) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    // load cart when application is loaded
    this._cartService.getCartItems().subscribe();
  }
}
