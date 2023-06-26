import { Component, Optional } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss']
})
export class ForgotPassword {
  email: string = '';

  constructor(
    @Optional()
    private auth: AuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {
  }

  forgotPassword() {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regex.test(this.email)) {
      this.toast.error('รูปแบบอีเมล์ไม่ถูกต้อง');
      return;
    }

    this.auth
      .forgotPassword(this.email)
      .pipe(
        this.toast.observe({
          loading: 'loading...',
          success: 'Send password reset email complete.',
          error: ({message}) => `${message}`
        })
      )
      .subscribe({
        next: () => {},
        error: err => {
          this.toast.error(err.message);
        },
        complete: () => {
          this.router.navigate(['/login']).catch()
        }
      });
  }

}
