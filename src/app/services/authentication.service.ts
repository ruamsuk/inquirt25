import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile, UserInfo
} from '@angular/fire/auth';
import { concatMap, from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(
    @Optional()
    private auth: Auth,
    private afAuth: AngularFireAuth
  ) {
  }

  login(email: string | null | undefined, password: string | null | undefined) {
    return from(signInWithEmailAndPassword(this.auth, <string>email, <string>password));
  }

  signUp(email: string | null | undefined, password: string | null | undefined) {
    // @ts-ignore
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

/*  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((user) => {
        return user?.sendEmailVerification();
      });
  }*/

  async sendEmail() {
    return await this.afAuth.currentUser.then((user) => {
      return user?.sendEmailVerification();
    });
  }

  forgotPassword(email: string) {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if (!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData);
      })
    );
  }


  logout() {
    return from(this.auth.signOut());
  }
}
