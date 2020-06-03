import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpClient) {
  }

  /**
   * Get user address list
   */
  getAddressList() {
    return this._http.get(ApiConfig.userAddressListURL);
  }

  /**
   * Add a new address
   */
  addAddress(address) {
    return this._http.post(ApiConfig.userAddressAddURL, address);
  }

  /**
   * Update address
   * @param address
   */
  updateAddress(address) {
    return this._http.post(ApiConfig.userAddressUpdateURL, address);
  }
}
