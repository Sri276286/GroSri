import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppToastsComponent } from './components/toasts/toasts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    AppToastsComponent
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    AppToastsComponent
  ]
})
export class GrosriCommonModule { }
