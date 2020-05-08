import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
