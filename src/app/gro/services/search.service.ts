import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http: HttpClient) { }

  search(query: string) {
    return this._http.get(`/api/search?q=${query}`);
  }
}
