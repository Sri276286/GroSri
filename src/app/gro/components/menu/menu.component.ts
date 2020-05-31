import { Component } from '@angular/core';
import { LoginService } from '../../../common/services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'gro-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent {
  user;
  isLoggedIn: boolean = false;
  constructor(private _loginService: LoginService,
    private _route: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastService) {
    // this.user = this._loginService.currentUserValue;
    this._loginService.getCurrentUser().subscribe((user) => {
      console.log('login user ', user);
      this.user = user;
    });
    this.isLoggedIn = this._loginService.isLogin();
  }

  logout() {
    this.spinner.show();
    this._loginService.doLogout().subscribe(() => {
      localStorage.clear();
      this._route.navigate(['/login']);
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
      this.toast.show('Failed to logout');
      console.log('Logout failed');
    });
  }
}
