import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersPlaced = [];
  constructor(private _http: HttpClient) {

  }

  getOrders() {
    return this._http.get('/api/orders');
  }

  fetchOrders() {
    this.getOrders().subscribe((orders: any) => {
      this.ordersPlaced = orders;
    });
  }

  getOrderById(id) {
    return this.ordersPlaced.find(t => t.orderId === id);
  }
}
