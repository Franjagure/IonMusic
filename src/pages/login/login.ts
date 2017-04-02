import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';

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

  user: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  doLogin(){
    console.log(this.user);
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
