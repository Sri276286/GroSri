import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userLocation: string = '';
  canProceedUpdatingCart: boolean = false;
  proceedUpdatingCart$: Subject<boolean> = new Subject<boolean>();
  ordersPlaced = [];
  storesListed = [];

  handleUserStorage(property: string, value: any) {
    const profile = JSON.parse(localStorage.getItem('currentUser'));
    profile[property] = value;
    localStorage.setItem('currentUser', JSON.stringify(profile));
  }

  getUserLocation() {
    const userLocation = localStorage.getItem('userLocation');
    if (userLocation) {
      return userLocation;
    }
  }

  public isLogin() {
    const auth_token = localStorage.getItem('auth_token');
    return auth_token ? true : false;
  }

  checkForSession(): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(true);
      }, 10 * 60 * 1000);
    });
  }

  getStoreDetailsFromId(id: string) {
    console.log('stores listed ', this.storesListed);
    return this.storesListed.find(t => t.id === +id);
  }

  getOrderDetailsFromId(id: string) {
    console.log('orders placed ', this.ordersPlaced);
    return this.ordersPlaced.find(t => t.orderId === id);
  }

}
