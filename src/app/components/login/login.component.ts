import { Component, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AppComponent } from '../../app.component';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../../environments/environment';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  hide = true;
  loading = false;
  submitted = false;
  public siteKey: string;

  constructor(
    @Optional()
    private app: AppComponent,
    private authService: AuthenticationService,
    private reCaptcha: ReCaptchaV3Service,
    private router: Router,
    private toast: HotToastService,
  ) {
    this.siteKey = environment.siteKey;
  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  submit() {
    if (this.loginForm.invalid) return;

    this.doAction(true);

    /**
     * reCaptcha V.3
     * */
    this.reCaptcha.execute(this.siteKey, 'login', (token) => {
      if (!token) {
        this.toast.error('You are not a human!')
        return;
      } else {
        const {email, password} = this.loginForm.value;
        this.authService
          .login(email, password)
          .pipe(
            this.toast.observe({
              loading: 'loading...',
              success: 'Logged In Success',
              error: ({message}) => `${message}`
            })
          )
          .subscribe({
            next: (user) => {
              if (!user.user.emailVerified) {
                this.toast.warning("Email not verified You can't do anything.");
              }
              this.doAction(false);
            },
            error: () => {
              this.doAction(false);
            },
            complete: () => {
              this.router.navigate(['/home']).catch();
            }
          });
      }
    }, {useGlobalDomain: false});

  }

  private doAction(val: boolean) {
    this.loading = val;
    this.submitted = val;
  }

}
