import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storesListed = [];
  constructor(private _http: HttpClient) {

  }

  getStores() {
    return this._http.get('/api/stores');
  }

}
