import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/common/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/common/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gro-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  user_profile: FormGroup;
  constructor(private _loginService: LoginService,
    private _fb: FormBuilder,
    private toasts: ToastService,
    private _router: Router) {
  }

  ngOnInit() {
    this.user_profile = this._fb.group({
      name: ['', Validators.required],
      mobileNumber: ['',
        [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      email: ['', Validators.required],
      dob: [''],
      promotions_ok: [true]
    });
    this._loginService.getUser().subscribe((user: any) => {
      const userObj = {
        name: user.name,
        mobileNumber: user.mobileNumber,
        email: user.email
      };
      this.user_profile.patchValue(userObj);
    });
  }

  onSubmit(user, valid) {
    if (valid) {
      this._loginService.saveUserDetails(user.value).subscribe(() => {
        this.toasts.show('Profile updated successfully');
        this._router.navigate(['/home']);
      }, () => {
        this.toasts.show('Profile update failed');
        this._router.navigate(['/home']);
      });
    }
  }
}
