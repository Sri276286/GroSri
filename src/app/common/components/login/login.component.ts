import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';

@Component({
  selector: 'gro-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  myLoginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _loginService: LoginService,
    private route: Router) {
  }

  ngOnInit() {
    this.myLoginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  checkLogin() {
    console.error(this.myLoginForm.value);
    this._loginService.doLogin(this.myLoginForm).subscribe(
      (res) => {
        console.log('res ', res, Role.Seller);
        if (res && res.storeKeeper) {
          this.route.navigate(['/store-dashboard']);
        } else {
          this.route.navigate(['/home']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
