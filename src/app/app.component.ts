import { Component, OnInit, Optional } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$ = this.userService.currentUserProfile$;
  photo$ = this.authService.currentUser$;
  userImg: string | null | undefined;
  canDo: boolean = true;

  constructor(
    @Optional()
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.checkRole();
    this.getProfile();
  }

  getProfile() {
    this.photo$
      .pipe(untilDestroyed(this))
      .subscribe(pic => {
        this.userImg = pic?.photoURL;
      });
  }

  logout() {
    this.authService.logout()
      .subscribe(() => this.router.navigate(['']));
  }

  private checkRole() {
    this.userService.currentUserProfile$.pipe(
      untilDestroyed(this)
    )
      .subscribe((user) => {
        if (user) {
          this.canDo = user.role == 'admin';
        }
      });
  }
}
