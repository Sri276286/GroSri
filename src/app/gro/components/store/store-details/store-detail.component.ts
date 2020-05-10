import { Component, OnInit, ViewChild } from '@angular/core';
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
  categories = [];
  storeProductCatalog;
  toggle = {
    step: 0,
    trigger: false
  };
  @ViewChild('itemslist') itemslist;
  private _subscriptions: Subscription[] = [];
  constructor(public _storeItemsService: StoreItemsService,
    private _route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this._route.snapshot.params.id;
    this._subscriptions.push(
      this._storeItemsService.getItems(id)
        .subscribe((itemsPresent: boolean) => {
          if (itemsPresent) {
            this.categories = this._storeItemsService.categories;
            const category = this.categories[0];
            this.getProductsWithCategory(category);
          }
        })
    );
  }

  toggleCategory(step) {
    console.log('step ', step, this.itemslist.nativeElement);
    this.toggle.step = step;
    this.toggle.trigger = !this.toggle.trigger;
  }

  getProductsWithCategory(category) {
    console.log('category ', category);
    this._storeItemsService.getProductsWithCategory(category).subscribe((entity) => {
      this.storeProductCatalog = entity;
    });
  }

}
