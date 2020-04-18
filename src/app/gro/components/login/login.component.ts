import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'gro-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  myLoginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _loginService: LoginService) {
  }

  ngOnInit() {
    this.myLoginForm = this.fb.group({
      username: ["", Validators.required],
      lpassword: ["", Validators.required]
    });
  }

  checkLogin() {
    console.error(this.myLoginForm.value);
      this._loginService.doLogin(this.myLoginForm).subscribe(
        res => {
          console.error("success!!")
          // this.route.navigate(['/profile']);
        },
        error => {
          console.log(error);
        }
      );
    }
}
