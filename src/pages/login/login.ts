import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmail } from '../../providers/validate-email';
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  email: any;
  password: any;
  formLogin: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angfire: AngularFire,
    public formBuilder: FormBuilder,
    public ValidateEmail: ValidateEmail,
    public auth: AuthService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    this.formLogin = this.formBuilder.group({
      femail: ['', Validators.compose([Validators.required, ValidateEmail.isValid])],
      fpassword: ['', Validators.required]
    })

  }

  /* ============== OPCIONES DE LOGIN =============== */

  doLogin() {
    this.angfire.auth.login({
      email: this.email,
      password: this.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((response) => {
        this.presentLoading();
        console.log('Se ha iniciado sesion correctamente ' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.email,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.setRoot(HomePage);
      }).catch((error) => {
        this.presentAlert();
      });
  }

  /* ============== COMPONENTES =============== */

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Usuario identificado, porfavor espere...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'El usuario o la contraseña es incorrecto',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  /* ============== PAGINAS =============== */

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
