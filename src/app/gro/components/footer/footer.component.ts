import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'gro-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public _cartService: CartService) {}
}
