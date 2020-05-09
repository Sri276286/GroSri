import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) {

  }
  getStoresByCategory(id: string) {
    return this._http.get(`${ApiConfig.storeListByCategoryURL}/${id}`);
  }
}
