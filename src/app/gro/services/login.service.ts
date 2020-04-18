import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = "http://localhost:9090/login";

  constructor(private _http: HttpClient) { }

  doLogin(loginform: any): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };
    return this._http.post(
      this.loginUrl,
      JSON.stringify(loginform.value),
      options
    );
  }

}
