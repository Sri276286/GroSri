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
    console.log('val ', val);
    console.log('wwwqqqq item ', item);
    // map quantity for already selected weights
    item = this._mapItemOnWeightChange(item);
    let weightEntity = item.storeInventoryProductUnit.find(t => t.weight === val);
    console.log('weight ', weightEntity);
    item.weight = weightEntity.weight;
    item.price = weightEntity.price;
    item.storeInventoryProductUnitId = weightEntity.id;
    item.quantity = weightEntity.quantity;
  }

  addItems(item) {
    console.log('from adddddd ', JSON.stringify(this._cartService.cartEntity));
    console.log('wwwww item ', item);
    this._cartService.addItems(item);
  }

  removeItems(item) {
    this._cartService.removeItems(item);
  }

  private _mapItemOnWeightChange(item) {
    const units = item.storeInventoryProductUnit;
    if (item.quantity && units
      && units.length) {
      item.storeInventoryProductUnit = units.map((t) => {
        if (t.id === item.storeInventoryProductUnitId) {
          t.quantity = item.quantity;
        }
        return t;
      });
    }
    return item;
  }
}
