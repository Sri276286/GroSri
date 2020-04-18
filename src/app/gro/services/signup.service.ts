import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signUpUrl = "http://localhost:9090/signup";

  constructor(private _http: HttpClient) { }

  doSignUp(signUpform: any): Observable<any> {
    let httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    let options = {
      headers: httpHeaders
    };
    return this._http.post(
      this.signUpUrl,
      JSON.stringify(signUpform.value),
      options
    );
  }
}
