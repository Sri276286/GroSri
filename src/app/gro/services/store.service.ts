import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../config/api.config';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private _http: HttpClient,
    private _commonService: CommonService) {
  }

  /**
   * Get stores based on area or pincode
   * @param locationKey
   */
  getStores(locationKey: string) {
    // return this._http.get('/api/stores');
    return this._http.get(`${ApiConfig.storeListURL}/${locationKey}`)
      .pipe(map((res: any) => {
        const stores = res && res.storeDetails;
        this._commonService.storesListed = stores;
        return res;
      }));
  }

  markFavorite(storeEntity: any) {
    console.log('url ', ApiConfig.favoriteStoreURL);
    return this._http.post(ApiConfig.favoriteStoreURL, storeEntity);
  }
}
