import { Injectable } from "@angular/core";

import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from "firebase/app";
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
    //return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
  }

  //TODO: maybe fix later
  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }
}
