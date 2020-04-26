import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userLocation: string = '';

  handleUserStorage(property: string, value: any) {
    const profile = JSON.parse(localStorage.getItem('currentUser'));
    profile[property] = value;
    localStorage.setItem('currentUser', JSON.stringify(profile));
  }
}
