import { Injectable, Optional } from '@angular/core';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from '../models/user-profile.model';
import {
  addDoc,
  collection,
  collectionData, deleteDoc,
  doc,
  docData,
  Firestore, getDoc, orderBy,
  query,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (user?.uid) {
          const ref = doc(this.firestore, 'users', user?.uid);
          return docData(ref) as Observable<ProfileUser>;
        } else {
          return of(null);
        }
      })
    );
  }

  constructor(
    @Optional()
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {
  }

  addUser(user: { uid: string; displayName: string | null | undefined; email: string | null | undefined }) {
    const ref = doc(this.firestore, 'users', `${user.uid}`);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser) {
    const ref = doc(this.firestore, 'users', `${user.uid}`);
    return from(updateDoc(ref, {...user}));
  }

  loadUsers() {
    const dbInstance = collection(this.firestore, 'members');
    const userQuery = query(dbInstance, orderBy('firstname'));
    return collectionData(userQuery, {idField: 'id'});
  }

  deleteUser(id: string | undefined) {
    const docInstance = doc(this.firestore, 'members', `${id}`);
    return from(deleteDoc(docInstance));
  }

  updateMember(member: any): Observable<any> {
    const docInstance = doc(this.firestore, `members/${member.id}`);

    return from(updateDoc(docInstance, {...member}));
  }

  addMember(user: Member): Observable<any> {
    const docRef = collection(this.firestore, 'members');
    return from(addDoc(docRef, user));
  }

  /** get One */
  getMember(id: string) {
    const docRef = doc(this.firestore, 'users', `${id}`);

    return from(getDoc(docRef));
  }

  /** สมาชิกที่เสียชีวิตแล้ว */
  loadDepart() {
    const dbInstance = collection(this.firestore, 'depart');
    const userQuery = query(dbInstance, orderBy('firstname'));
    return collectionData(userQuery, {idField: 'id'});
  }

  addDepart(user: Member): Observable<any> {
    const docRef = collection(this.firestore, 'depart');
    return from(addDoc(docRef, user));
  }

  updateDepart(depart: any): Observable<any> {
    const docInstance = doc(this.firestore, `depart/${depart.id}`);

    return from(updateDoc(docInstance, {...depart}));
  }

  deleteDepart(id: string | undefined) {
    const docInstance = doc(this.firestore, 'depart', `${id}`);
    return from(deleteDoc(docInstance));
  }

}
