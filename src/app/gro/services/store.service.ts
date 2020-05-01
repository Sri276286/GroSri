import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this._http.get(`http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com/stores/findByPincode/${locationKey}`);
  }

}
