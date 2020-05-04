import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/app/config/api.config';

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
    // let itemRequired = this.getRequiredItem(item);
    // console.log('itemRequired ', itemRequired);
    // this.cartItems.push(itemRequired);
    let itemIndex = this.cartItems.indexOf(item);
    console.log('item index ', itemIndex);
    if (itemIndex === -1) {
      this.cartItems = [...this.cartItems, item];
      console.log('here ', this.cartItems);
      this.cartQuantity++;
    } else {
      if (item && item.quantity) {
        this.cartItems[itemIndex] = item;
      } else {
        this.cartItems.splice(itemIndex, 1);
        this.cartQuantity--;
      }
    }
    this.cartTotal += item.price;
    console.log('cart items ', this.cartItems);
    // set in local storage
    this.setInLocalStorage();
  }

  private getRequiredItem(item) {
    console.log('item => ', item);
    return {
      "storeInventoryProductId": item.storeInventoryProductId,
      "quantity": item.quantity || 0,
      "mrp": item.mrp,
      "price": item.price,
      "weight": item.weight,
      "unit": item.unit
    };
  }

  placeOrder(order) {
    return this._http.post('/api/order', order);
  }

  postCartItems(cart) {
    console.log('cart ', cart);
    return this._http.post(ApiConfig.cartURL, cart);
  }

  getItems() {
    return new Observable((observer) => {
      this.getCartItems().subscribe((res: any) => {
        console.log('aaaaa ', res);
        if (res && res.total && res.items) {
          localStorage.setItem('cartEntity', JSON.stringify(res));
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
    return this._http.get(ApiConfig.cartURL);
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
    if (cart && cart.items && cart.items.length) {
      cart.items = this.mapCart(cart.items);
      this.postCartItems(cart).subscribe();
    }
  }

  mapCart(cart) {
    return cart.map(t => this.getRequiredItem(t));
  }

}
