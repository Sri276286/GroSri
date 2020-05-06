import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ApiConfig } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartQuantity = 0;
  cartEntity$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  cartEntity = {
    total: 0,
    items: []
  };

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

  private updateCart(item) {
    console.log('item ', item);
    let itemIndex = this.cartEntity.items.indexOf(item);
    console.log('item index ', itemIndex);
    if (itemIndex === -1) {
      this.cartEntity.items = [...this.cartEntity.items, item];
      console.log('here ', this.cartEntity.items);
      this.cartEntity.total += item.price;
      this.cartQuantity++;
    } else {
      if (item && item.quantity) {
        this.cartEntity.items[itemIndex] = item;
        this.cartEntity.total += item.price;
      } else {
        this.cartEntity.items.splice(itemIndex, 1);
        this.cartEntity.total -= item.price;
        this.cartQuantity--;
      }
    }
    console.log('cart items ', this.cartEntity.items);
    this.cartEntity$.next(this.cartEntity);
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
      "unit": item.unit,
      "productImgUrl": item.productImgUrl,
      "itemShortDescription": item.itemShortDescription,
      "brandName": item.brandName,
      "max_quantity": item.max_quantity,
      "available_quantity": item.available_quantity
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
          this.cartEntity = res;
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

  getFromLocalStorage() {
    let cart = this.getCart();
    console.log('cart ', cart);
    if (cart && cart.items && cart.items.length) {
      cart.items = this.mapCart(cart.items);
      this.postCartItems(cart).subscribe();
    }
  }

  emptyCart() {
    this.cartEntity$.next(null);
  }

  private getCartItems() {
    return this._http.get(ApiConfig.cartURL);
  }

  private setInLocalStorage() {
    localStorage.setItem('cartEntity', JSON.stringify(this.cartEntity));
  }

  private getCart() {
    let cartEntity = localStorage.getItem('cartEntity');
    let cart = cartEntity ? JSON.parse(cartEntity) : null;
    return cart;
  }

  private mapCart(cart) {
    return cart.map(t => this.getRequiredItem(t));
  }

}
