import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/app/config/api.config';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersMap = new Map();
  constructor(private _http: HttpClient,
    private _commonService: CommonService) {

  }

  getOrders() {
    return this._http.get(`${ApiConfig.ordersListURL}/1`)
      .pipe(map((res: any) => {
        const orders = res && res.orders;
        this._commonService.ordersPlaced = orders;
        return res;
      }));
  }

  getOrderById(id) {
    return this._http.get(`${ApiConfig.orderURL}/${id}`);
  }
}
