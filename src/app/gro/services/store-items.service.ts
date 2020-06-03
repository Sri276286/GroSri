import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiConfig } from 'src/app/config/api.config';
import { CommonService } from './common.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class StoreItemsService {

  categories = [];
  subCategoriesWithCategory = {};
  storeProductsList;
  private productsList = [];
  constructor(private _http: HttpClient,
    private _commonService: CommonService,
    private _cartService: CartService) {
  }

  getItems(id) {
    return new Observable((observer) => {
      this._http.get(`${ApiConfig.storeProductsURL}/${id}`)
        .subscribe((res: any) => {
          console.log('res ', res);
          if (res && res.productsByCategory) {
            // map products with cart for quantity
            this.mapWithCart(res).subscribe((result: any) => {
              console.log('aaaa xxx ', result);
              this.storeProductsList = result && result.productsByCategory;
              this.categories = [];
              this.mapProducts(result.productsByCategory);
              observer.next(result);
            });
          } else {
            observer.next(res);
          }
        });
    });
  }

  private mapProducts(itemsRes: any) {
    this.productsList = [];
    for (let category in itemsRes) {
      this.categories = [...this.categories, category];
      this.getItemsObjectOnCategory(category);
      for (let subcategory in itemsRes[category]) {
        this.productsList = [...this.productsList, ...itemsRes[category][subcategory]];
      }
    }
    console.log('products list ', this.productsList);
  }

  public searchStore(searchInput: string): Observable<any> {
    const searchResults = this.productsList.filter((t) => {
      const pattern = new RegExp(searchInput, 'gi');
      return pattern.test(t.productName) || pattern.test(t.brandName) || pattern.test(t.itemShortDescription);
    });
    return of(searchResults);
  }

  private mapWithCart(result) {
    const isLoggedIn = this._commonService.isLogin();
    return new Observable((observer) => {
      if (isLoggedIn) {
        // cart = this._cartService.cartEntity;
        this._cartService.getCartItems().subscribe((res) => {
          const cartStore = res && res.store && res.store.id;
          const cartProducts = res && res.orderProducts;
          if (cartStore && cartProducts && cartProducts.length) {
            this._handleStoreEntity(cartStore, cartProducts, result);
          }
          console.log('res xxxxx', result);
          observer.next(result);
        });
      } else {
        const cart = JSON.parse(localStorage.getItem('cartEntity'));
        const cartStore = cart && cart.storeId;
        const cartProducts = cart && cart.orderProducts;
        if (cartStore && cartProducts && cartProducts.length) {
          this._handleStoreEntity(cartStore, cartProducts, result);
        }
        observer.next(result);
      }
    });
  }

  private _handleStoreEntity(cartStoreId, cartProducts, result) {
    const products = result && result.productsByCategory;
    const store = result && result.store;
    if (cartStoreId
      && store
      && cartStoreId === store.id) {
      cartProducts.forEach((item) => {
        for (let category in products) {
          for (let sub in products[category]) {
            products[category][sub].map((t) => {
              console.log('t xxxx ', t);
              if (t.storeInventoryProductUnitId === item.storeInventoryProductUnitId) {
                t.quantity = item.quantity;
                t.weight = item.weight;
                t.unit = item.unit;
                t.mrp = item.mrp;
                t.price = item.price;
              }
              if (t.storeInventoryProductUnit && t.storeInventoryProductUnit.length) {
                t.storeInventoryProductUnit.forEach((k) => {
                  if (k.id === item.storeInventoryProductUnitId) {
                    k.quantity = item.quantity;
                  }
                });
              }
              return t;
            });
          }
        }
      });
    }
  }

  /**
   * Get products list based on category divided as sub categories
   * @param category
   */
  getProductsWithCategory(category: string): Observable<any> {
    return of(this.storeProductsList[category]);
  }

  private getItemsObjectOnCategory(category) {
    let subCats = [];
    let itemsOnCategory = this.storeProductsList[category];
    console.log('itemsOnCategory ', itemsOnCategory);
    for (let subcategory in itemsOnCategory) {
      subCats = [...subCats, subcategory];
      this.getItemsObjectOnCategSubCategory(category, subcategory);
    }
    console.log('list ', category, subCats);
    this.subCategoriesWithCategory[category] = subCats;
    console.log('sub categ ', this.subCategoriesWithCategory);
  }

  private getItemsObjectOnCategSubCategory(category, subcategory) {
    return this.storeProductsList[category][subcategory];
  }
}
