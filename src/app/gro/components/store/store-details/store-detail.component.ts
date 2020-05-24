import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreItemsService } from '../../../services/store-items.service';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/gro/services/store.service';
import { LoginService } from 'src/app/common/services/login.service';

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
    last_step: 0,
    current_step: 0,
    expand: true,
    collapse: false
  };
  public categoryIndex: number = 0;
  public storeName: string = '';
  public isFavoriteStore: boolean = false;
  public isLoggedIn: boolean = false;;

  private _subscriptions: Subscription[] = [];
  constructor(public _storeItemsService: StoreItemsService,
    private _route: ActivatedRoute,
    private _storeService: StoreService,
    private _loginService: LoginService) {
  }

  ngOnInit() {
    this.isLoggedIn = this._loginService.isLogin();
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this._subscriptions.push(
        this._storeItemsService.getItems(id)
          .subscribe((store) => {
            console.log('storeeee ', store);
            if (store.store) {
              this.storeName = store.store.storeName;
              this.isFavoriteStore = store.store.mark_favorite ? true : false;
            }
            if (store.productsByCategory) {
              this.categories = this._storeItemsService.categories;
              this.categories = this.categories.map((t, index) => {
                return {
                  id: index,
                  name: t
                }
              })
              const category = this.categories[0];
              this.getProductsWithCategory(category);
            }
          })
      );
    })
  }

  toggleCategory(step) {
    console.log('step ', step, this.toggle);
    this.toggle.current_step = step;
    if (this.toggle.last_step !== this.toggle.current_step) {
      this.toggle.expand = true;
    } else {
      this.toggle.expand = false;
    }
    console.log('trigger ', this.toggle);
  }

  getProductsWithCategory(category) {
    console.log('category ', category);
    this.categoryIndex = category.id;
    this._storeItemsService.getProductsWithCategory(category.name).subscribe((entity) => {
      this.storeProductCatalog = entity;
    });
  }

  makeFavorite() {
    const id = this._route.snapshot.params.id;
    let favorite = {
      storeId: id,
      mark_favorite: (this.isFavoriteStore ? 0 : 1)
    }
    console.log('favorite ', favorite);
    this._storeService.markFavorite(favorite).subscribe(() => {
      this.isFavoriteStore = !this.isFavoriteStore;
      console.log('is faaa ', this.isFavoriteStore);
    });
  }

}
