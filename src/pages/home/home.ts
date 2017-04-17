import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        navCtrl.setRoot(LoginPage);
      } else {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/userData/' + userId).once('value').then(function (snapshot) {
          let username = snapshot.val().username;
        });
      }
    });
  }

  cargarUsuario() {

  }



}




