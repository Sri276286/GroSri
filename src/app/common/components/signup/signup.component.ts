import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { ConfirmPasswordValidator } from '../../services/confirm.password';
import { Router } from '@angular/router';

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
      pincode:["", [Validators.minLength(6), Validators.maxLength(6)]],
      email:["", [Validators.required, Validators.email]],
      mobileNumber: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirm_password: ["", [Validators.required, ConfirmPasswordValidator]]
    });
  }

  onSignUpSubmit() {
    console.log('form ', this.mySignUpForm);
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
