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
    // when session expires
    this._commonService.checkForSession().subscribe((isTimeout) => {
      if (isTimeout) {
        console.log('session expired');
        this._cartService.getFromLocalStorage();
      }
    });
    // when browser refreshes
    window.onload = () => {
      console.log('browser refreshed');
      this._cartService.getFromLocalStorage();
    }
  }
}
