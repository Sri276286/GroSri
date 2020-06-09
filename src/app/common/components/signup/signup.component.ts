import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { ConfirmPasswordValidator } from '../../services/confirm.password';
import { Router } from '@angular/router';
import { CommonConstants } from '../../common.constants';

@Component({
  selector: 'gro-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {

  mySignUpForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _signupService: SignupService,
    private route: Router) {
  }

  ngOnInit() {
    this.mySignUpForm = this.fb.group({
      // storekeeper: [],
      name: ["", [Validators.required, Validators.minLength(6)]],
      pincode:["", [Validators.pattern(CommonConstants.pincode)]],
      email:["", [Validators.required, Validators.email]],
      mobileNumber: ["", [Validators.required, Validators.pattern(CommonConstants.phoneNumber)]],
      password: ["", [Validators.required, Validators.pattern(CommonConstants.password)]],
      confirm_password: ["", [Validators.required,
        ConfirmPasswordValidator]]
    });
  }

  onSignUpSubmit() {
    this._signupService.doSignUp(this.mySignUpForm).subscribe(
      res => {
        console.error("success!!");
        console.error(this.mySignUpForm.value.mobileNumber);
        this.route.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
