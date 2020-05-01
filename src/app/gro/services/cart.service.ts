import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    item.quantity++;
    this.updateCart(item);
  }

  removeItems(item) {
    item.quantity--;
    this.updateCart(item);
  }

  updateCart(item) {
    console.log('item ', item);
    let itemRequired = this.getRequiredItem(item);
    let items = this.cartItems;
    let itemIndex = items.indexOf(item);
    if (itemIndex === -1) {
      items = [...items, item];
      this.cartQuantity++;
    } else {
      if (item && item.quantity) {
        items[itemIndex] = item;
      } else {
        items.splice(itemIndex, 1);
        this.cartQuantity--;
      }
    }
    this.cartTotal += item.price;
    this.cartItems = items;
    // set in local storage
    this.setInLocalStorage();
  }

  private getRequiredItem(item) {
    return {
      "storeInventoryProductId": item.id,
      "quantity": item.quantity || 0,
      "mrp": item.storeInventoryProductUnit[0].mrp,
      "price": item.storeInventoryProductUnit[0].price,
      "weight": item.storeInventoryProductUnit[0].weight,
      "unit": item.storeInventoryProductUnit[0].unit
    };
  }

  placeOrder(order) {
    return this._http.post('/api/order', order);
  }

  postCartItems(cart) {
    console.log('cart ', cart);
    return this._http.post('/api/cart', cart);
  }

  getItems() {
    return new Observable((observer) => {
      this.getCartItems().subscribe((res: any) => {
        if (res && res.total && res.items) {
          observer.next(res);
        } else {
          let cart = this.getCart();
          observer.next(cart);
        }
      }, () => {
        let cart = this.getCart();
        observer.next(cart);
      });
    });
  }

  getCartItems() {
    return this._http.get('/api/cart');
  }

  setInLocalStorage() {
    let cartEntity: any = {};
    cartEntity.total = this.cartTotal;
    cartEntity.items = this.cartItems;
    localStorage.setItem('cartEntity', JSON.stringify(cartEntity));
  }

  getCart() {
    let cartEntity = localStorage.getItem('cartEntity');
    let cart = cartEntity ? JSON.parse(cartEntity) : null;
    return cart;
  }

  getFromLocalStorage() {
    let cart = this.getCart();
    this.postCartItems(cart).subscribe();
  }

}
