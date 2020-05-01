import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { ConfirmPasswordValidator } from '../../services/confirm.password';

@Component({
  selector: 'gro-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {

  mySingnUpForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _signupService: SignupService) {
  }

  ngOnInit() {
    this.mySingnUpForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(2)]],
      email:["", Validators.required],
      number: ["", Validators.required],
      password: ["123", Validators.required],
      confirm_password: ["", [Validators.required, ConfirmPasswordValidator]]
    });
  }

  onSignUpSubmit() {
    this._signupService.doSignUp(this.mySingnUpForm).subscribe(
      res => {
        console.error("success!!")
        console.error(this.mySingnUpForm.value.number)
        // this.route.navigate(['/home/detail']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
