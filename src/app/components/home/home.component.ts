import { Component, Optional } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    @Optional()
    private auth: AuthenticationService,
    private router: Router
  ) {
  }

  logout() {
    this.auth
      .logout()
      .subscribe(() => this.router.navigate(['/']))
  }
}
