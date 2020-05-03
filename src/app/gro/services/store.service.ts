import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storesListed = [];
  constructor(private _http: HttpClient) {

  }

  /**
   * Get stores based on area or pincode
   * @param locationKey
   */
  getStores(locationKey: string) {
    // return this._http.get('/api/stores');
    return this._http.get(`${ApiConfig.storeListURL}/${locationKey}`);
  }

}
