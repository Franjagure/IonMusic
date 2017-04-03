import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { HomePage } from '../home/home'; 

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: any;
  password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire) {

  }

  doLogin() {
    this.angfire.auth.login({
      email: this.email,
      password: this.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((response) => {
        console.log('Se ha iniciado sesion correctamente ' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.email,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser',JSON.stringify(currentuser));
        this.navCtrl.setRoot(HomePage);
      })
  }

    goToRegister(){
      this.navCtrl.push(RegisterPage);
    }

  }
