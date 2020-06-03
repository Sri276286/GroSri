import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from 'src/app/config/api.config';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient,
    private _commonService: CommonService) {

  }
  getStoresByCategory(id: string) {
    const location = this._commonService.getUserLocation();
    if (location) {
      let params = new HttpParams();
      params = params.append('category', id);
      return this._http.get(`${ApiConfig.storeListURL}/${location}`, { params: params });
    }
  }
}
