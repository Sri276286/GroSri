import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = [];
  cartQuantity = 0;
  cartTotal = 0;

  constructor(private _http: HttpClient) {

  }

  addItems(item) {
    console.log('item in add ', item);
    item.quantity++;
    this.updateCart(item);
  }

  removeItems(item) {
    console.log('item in remove ', item);
    item.quantity--;
    this.updateCart(item);
  }

  updateCart(item) {
    console.log('item in update cart ', item);
    let items = this.cartItems;
    let itemIndex = items.indexOf(item);
    if (itemIndex === -1) {
      console.log('first time');
      items = [...items, item];
      this.cartQuantity++;
    } else {
      console.log('repeating ');
      if (item && item.quantity) {
        items[itemIndex] = item;
      } else {
        items.splice(itemIndex, 1);
        this.cartQuantity--;
      }
    }
    this.cartTotal += item.price;
    this.cartItems = items;
    console.log('cart items ', this.cartItems);
  }

  getOrders() {
    return this._http.get('/api/orders');
  }

  placeOrder(order) {
    return this._http.post('/api/order', order);
  }

}
