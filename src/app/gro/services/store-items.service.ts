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
  constructor(private _http: HttpClient) {

  }

  getItems(id) {
    return this._http.get(`${ApiConfig.storeProductsURL}/${id}`)
      .pipe(map((res: any) => {
        console.log('res ', res);
        if (res && res.products) {
          this.storeProductsList = res && res.products;
          this.categories = [];
          this.mapProducts(res.products);
          return true;
        } else {
          return false;
        }
      }));
  }

  mapProducts(itemsRes: any) {
    for (let category in itemsRes) {
      this.categories = [...this.categories, category];
      this.getItemsObjectOnCategory(category);
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

  private getSubCategoryWithCategory(category) {
    return this.subCategoriesWithCategory[category];
  }

  private getItemsObjectOnCategSubCategory(category, subcategory) {
    return this.storeProductsList[category][subcategory];
  }
}
