import { Component } from '@angular/core';

@Component({
  templateUrl: 'forgot-pwd.component.html',
  styleUrls: ['forgot-pwd.component.scss']
})
export class ForgotPwdComponent {
  user_email: string = '';

  /**
   * Send Activation Link to update password
   */
  sendActivationLink() { }
}
