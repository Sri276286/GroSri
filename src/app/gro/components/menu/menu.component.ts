import { Component } from '@angular/core';
import { LoginService } from '../../../common/services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/common/services/toast.service';
import { CommonService } from '../../services/common.service';

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
    private toast: ToastService,
    private _commonService: CommonService) {
    this._loginService.getCurrentUser().subscribe((user) => {
      console.log('current user ', user);
      this.user = user;
    });
    this.isLoggedIn = this._loginService.isLogin();
  }

  logout() {
    this.spinner.show();
    this._loginService.doLogout().subscribe(() => {
      this.logoutReset();
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
      // this.toast.show('Failed to logout');
      this.logoutReset();
    });
  }

  logoutReset() {
    localStorage.clear();
    this._commonService.userLocation = '';
    this._route.navigate(['/login']);
  }
}
