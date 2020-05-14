import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiConfig } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StoreItemsService {

  categories = [];
  subCategoriesWithCategory = {};
  storeProductsList;
  private productsList = [];
  constructor(private _http: HttpClient) {

  }

  getItems(id) {
    return this._http.get(`${ApiConfig.storeProductsURL}/${id}`)
      .pipe(map((res: any) => {

        console.log('res ', res);
        if (res && res.products) {
          // map products with cart for quantity
          let result = this.mapWithCart(res);
          this.storeProductsList = result && result.products;
          this.categories = [];
          this.mapProducts(result.products);
        }
        console.log('reeeesss ', res);
        return res;
      }));
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
    let cart = JSON.parse(localStorage.getItem('cartEntity'));
    const products = result && result.products;
    if (cart && cart.storeId
      && result.store_details
      && cart.storeId === result.store_details.storeDetailsId) {
      cart.items.forEach((item) => {
        for (let category in products) {
          for (let sub in products[category]) {
            products[category][sub].map((t) => {
              if (t.id === item.storeInventoryProductId) {
                t.quantity = item.quantity;
                t.weight = item.weight;
                t.unit = item.unit;
                t.mrp = item.mrp;
                t.price = item.price;
              }
              return t;
            });
          }
        }
      });
    }
    console.log('res ', result);
    return result;
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
