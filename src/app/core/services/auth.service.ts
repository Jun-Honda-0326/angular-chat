import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged(user => console.log(user))
   }

  create(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential | void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => console.error(error))
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

}
