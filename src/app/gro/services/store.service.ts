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

// List the Store -> based on the pincode :  600078, 600096, 600116

// http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com/stores/findByPincode/600078


// List the products based on the store Id : 1,9,2,8

// http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com/products/findByStoreId/9
