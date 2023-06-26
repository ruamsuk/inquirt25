import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { DepartListComponent } from './components/depart-list/depart-list.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'verify-email/:mail',
    component: VerifyEmailComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'user-list',
    component: UserListComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'depart-list',
    component: DepartListComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'forgot-password', component: ForgotPassword
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
