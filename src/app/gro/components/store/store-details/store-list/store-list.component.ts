import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/gro/services/cart.service';

@Component({
  selector: 'gro-store-list',
  templateUrl: 'store-list.component.html',
  styleUrls: ['store-list.component.scss']
})
export class StoreListComponent {

  @Input('items') items;
  constructor(private _cartService: CartService) {
  }

  onWeightChange(val, item) {
    let weightEntity = item.storeInventoryProductUnit.find(t => t.weight === val);
    item.weight = weightEntity.weight;
    item.price = weightEntity.price;
  }

  addItems(item) {
    this._cartService.postToCart(item).subscribe(() => {
      this._cartService.addItems(item);
    });
  }

  removeItems(item) {
    this._cartService.postToCart(item).subscribe(() => {
      this._cartService.removeItems(item);
    });
  }
}
