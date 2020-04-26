import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreItemsService } from '../../../services/store-items.service';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gro-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class GroStoreDetailComponent implements OnInit {
  items = [];
  storeProduct;
  toggle = false;
  // selectedWeight: string = '1 kg';
  private _subscriptions: Subscription[] = [];
  constructor(private _storeItemsService: StoreItemsService,
    private _cartService: CartService,
    private _route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = this._route.snapshot.params.id;
    console.log('id ', id);
    this._subscriptions.push(
      this._storeItemsService.getItems(id)
        .subscribe((storeItemsEntity: any) => {
          console.log('items ', storeItemsEntity)
          this.storeProduct = storeItemsEntity;
          // this.items = items;
          for (let category in storeItemsEntity) {
            console.log('obj ', category);
            console.log('value ', storeItemsEntity[category]);
            for (let sub in storeItemsEntity[category]) {
              this.items = [...this.items, ...storeItemsEntity[category][sub]];
            }
          }
          console.log('items after', this.items)
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
