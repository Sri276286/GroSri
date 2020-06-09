import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { CommonConstants } from '../../common.constants';

@Component({
  selector: 'gro-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  myLoginForm: FormGroup;

  get emailData() {
    return this.myLoginForm && this.myLoginForm.get('email');
  }

  get passwordData() {
    return this.myLoginForm && this.myLoginForm.get('password');
  }

  constructor(private fb: FormBuilder,
    private _loginService: LoginService,
    private route: Router) {
    this.myLoginForm = this.fb.group({
      email: ["", [Validators.required,
      Validators.email
      ]
      ],
      password: ["", [Validators.required,
      Validators.pattern(CommonConstants.password)]]
    });
  }

  ngOnInit() {
  }

  checkLogin() {
    console.error(this.myLoginForm.value);
    this._loginService.doLogin(this.myLoginForm).subscribe(
      (res) => {
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
