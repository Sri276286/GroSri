import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreItemsService } from '../../services/store-items.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'gro-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class GroStoreComponent implements OnInit {
  items = [];
  // selectedWeight: string = '1 kg';
  private _subscriptions: Subscription[] = [];
  constructor(private _storeItemsService: StoreItemsService,
    private _cartService: CartService) {
  }

  ngOnInit() {
    this._subscriptions.push(
      this._storeItemsService.getItems()
        .subscribe((items: any) => {
          console.log('items ', items)
          this.items = items;
        })
    );
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onWeightChange(val, item) {
    console.log('val ', val, item);
    let weightEntity = item.weights.find(t => t.weight === val);
    console.log('weight ', weightEntity);
    item.weight = weightEntity.weight;
    item.price = weightEntity.price;
  }

  addItems(item) {
    // item.weight = this.selectedWeight;
    console.log('item in add ', item);
    this._cartService.addItems(item);
  }

  removeItems(item) {
    console.log('item in remove ', item);
    this._cartService.removeItems(item);
  }

}
