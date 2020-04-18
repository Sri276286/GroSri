import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'gro-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent {
  user;
  constructor(private _loginService: LoginService) {
    this.user = _loginService.currentUserValue;
  }

  logout() {
    localStorage.clear();
  }
}
