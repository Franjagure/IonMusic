import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  
  public fireAuth: any;
  public userData: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userData');
  }

  doLogin(email: string, password: string): any {
  return this.fireAuth.signInWithEmailAndPassword(email, password);
}

  register(email: string, password: string, photo: string, username: string): any {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      this.userData.child(newUser.uid).set({email: email, photo:photo, username: username});
    });
    
}

  resetPassword(email: string): any {
  return this.fireAuth.sendPasswordResetEmail(email);
}

  doLogout(): any {
  return this.fireAuth.signOut();
  }
}