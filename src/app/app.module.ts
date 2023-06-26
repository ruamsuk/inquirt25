import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SharedModule } from './shared/shared.module';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddEditMemberComponent } from './components/add-edit-member/add-edit-member.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DepartComponent } from './components/depart/depart.component';
import { DepartListComponent } from './components/depart-list/depart-list.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    ProfileComponent,
    SignUpComponent,
    UserDetailComponent,
    UserListComponent,
    VerifyEmailComponent,
    FooterComponent,
    ForgotPassword,
    AddEditMemberComponent,
    DepartComponent,
    DepartListComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    NgxCaptchaModule
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS, useValue: environment.firebase,
    },
    {
      provide: MatDialogRef, useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA, useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
