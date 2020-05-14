import { Component } from '@angular/core';
import { LoginService } from '../../../common/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gro-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent {
  user;
  constructor(private _loginService: LoginService,
    private _route: Router) {
    // this.user = this._loginService.currentUserValue;
    this._loginService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    // TODO: Save cart to backend
    localStorage.clear();
    // this._loginService.currentUserValue.next(null);
    this._route.navigate(['/login']);
  }
}
