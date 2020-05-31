import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { ApiConfig } from 'src/app/config/api.config';
import { CommonService } from '../../gro/services/common.service';
import { CartService } from 'src/app/gro/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private _http: HttpClient,
    private _commonService: CommonService,
    private _cartService: CartService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public isLogin() {
    const auth_token = localStorage.getItem('auth_token');
    return auth_token ? true : false;
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  doLogin(loginform: any): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };
    return this._http.post(
      ApiConfig.loginURL,
      JSON.stringify(loginform.value),
      options
    ).pipe(map((res: any) => {
      if (res && res.accessToken) {
        localStorage.setItem('auth_token', res.accessToken);
        // post cart once login
        this._cartService.getFromLocalStorage();
        // get user details once login is successful
        this.getUser().subscribe();
        // post items to cart if in local storage and loggedin
        this.postToCart();
        return res;
      } else {
        return throwError(`No access token received`);
      }
    }));
  }

  private getUser() {
    return this._http.get(ApiConfig.userDetailsURL)
      .pipe(map((res: any) => {
        const user = res && res.data;
        console.log('user ', user);
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          if (user && user.pincode) {
            this._commonService.userLocation = user.pincode;
            localStorage.setItem('userLocation', JSON.stringify(user.pincode));
          }
          this.currentUserSubject.next(user);
        }
      }));
  }

  private postToCart() {
    const cartEntity = localStorage.getItem('cartEntity');
    if (cartEntity) {
      const cart = JSON.parse(cartEntity);
      const items = cart && cart.items ? cart.items : [];
      if (items.length) {
        items.forEach(element => {
          this._cartService.postToCart(element);
        });
        localStorage.removeItem('cartEntity');
      }
    }
  }

  /**
   * Logout url
   */
  doLogout() {
    return this._http.get(ApiConfig.logoutURL);
  }

}
