import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreItemsService {

  constructor(private _http: HttpClient) {

  }

  getItems() {
    return this._http.get('/api/products');
  }
}
