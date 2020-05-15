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
  isLoggedIn: boolean = false;
  constructor(private _loginService: LoginService,
    private _route: Router) {
    // this.user = this._loginService.currentUserValue;
    this._loginService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
    this.isLoggedIn = this._loginService.isLogin();
  }

  logout() {
    localStorage.clear();
    this._route.navigate(['/login']);
  }
}
