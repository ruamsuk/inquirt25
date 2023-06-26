import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { switchMap } from 'rxjs';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../../environments/environment';

export function passwordMatchValidator(): ValidatorFn {
  return (control?: AbstractControl): ValidationErrors | null => {
    // @ts-ignore
    const password = control.get('password').value;
    // @ts-ignore
    const confirmPassword = control.get('confirmPassword').value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {passwordsDontMatch: true};
    }
    return null;

  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public siteKey: any;

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    recaptcha: new FormControl('', Validators.required)
  }, {validators: passwordMatchValidator()});

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private reCaptcha: ReCaptchaV3Service,
    private toast: HotToastService,
    private router: Router
  ) {
    this.siteKey = environment.siteKey;
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    if (this.signUpForm.invalid) return;
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let mail = this.signUpForm.controls.email.value;
    if (!regex.test(<string>mail)) {
      this.toast.error('รูปแบบอีเมล์ไม่ถูกต้อง');
      return;
    }

    /**
     * reCaptcha V.3
     * */
    this.reCaptcha.execute(this.siteKey, 'sign-up', (token) => {
      if (!token) {
        this.toast.error('You are not a human!');
        return;
      } else {

        const {name, email, password} = this.signUpForm.value;

        this.authService.signUp(email, password)
          .pipe(
            // @ts-ignore
            switchMap(({user: {uid}}) =>
              this.userService.addUser({uid, email, displayName: name})),
            this.toast.observe({
              loading: 'loading...',
              success: 'Congrats! You are all signed up',
              error: ({message}) => `${message}`
            })
          )
          .subscribe({
            next: () => {
              this.authService
                .sendEmail()
                .then(() => this.router.navigate([`/verify-email/${mail}`]));
            },
            error: (err) => {
              this.toast.error(err.message);
            },
            complete: () => {
            }
          });
      }

    }, {useGlobalDomain: false});

  }
}
