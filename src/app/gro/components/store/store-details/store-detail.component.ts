import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreItemsService } from '../../../services/store-items.service';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/gro/services/store.service';
import { LoginService } from 'src/app/common/services/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

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
  toggleMap = new Map();
  public categoryIndex: number = 0;
  public storeName: string = '';
  public isFavoriteStore: boolean = false;
  public isLoggedIn: boolean = false;;

  private _subscriptions: Subscription[] = [];
  constructor(public _storeItemsService: StoreItemsService,
    private _route: ActivatedRoute,
    private _storeService: StoreService,
    private _loginService: LoginService,
    private _modal: NgbModal,
    private spinner: NgxSpinnerService) {
    this.spinner.show();
  }

  ngOnInit() {
    this.isLoggedIn = this._loginService.isLogin();
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this._subscriptions.push(
        this._storeItemsService.getItems(id)
          .subscribe((store: any) => {
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
            this.spinner.hide();
          }, () => {
            this.spinner.hide();
          })
      );
    })
  }

  openMenu(menuTemplate: TemplateRef<any>) {
    this._modal.open(menuTemplate, { backdrop: false, scrollable: true, container: '#menu-container' });
  }

  toggleCategory(step) {
    const canToggle = this.toggleMap.get(step);
    if (canToggle) {
      this.toggleMap.set(step, false);
    } else {
      this.toggleMap.set(step, true);
    }
  }

  getProductsWithCategory(category) {
    this.categoryIndex = category.id;
    this._storeItemsService.getProductsWithCategory(category.name).subscribe((entity) => {
      this.storeProductCatalog = entity;
      this.toggleMap.set(0, true);
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
