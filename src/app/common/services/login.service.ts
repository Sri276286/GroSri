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
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private _http: HttpClient,
    private _commonService: CommonService,
    private _cartService: CartService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
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
        return res;
      } else {
        return throwError(`No access token received`);
      }
    }));
  }

  private getUser() {
    return this._http.get(`${ApiConfig.userDetailsURL}`)
      .pipe(map((user: any) => {
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

}
