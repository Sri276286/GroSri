import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'gro-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public _cartService: CartService) {}
}
