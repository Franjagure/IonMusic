import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFire } from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmail } from '../../providers/validate-email';
import { AuthService } from '../../providers/auth-service';
import { MenuTabPage } from '../menu-tab/menu-tab';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  email: any;
  loading: any;
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
    this.submitAttempt = true;
    if (!this.formLogin.valid) {
      console.log(this.formLogin.value);
    } else {
      this.auth.doLogin(this.formLogin.value.femail, this.formLogin.value.fpassword)
        .then((authService) => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(MenuTabPage)
          })
        })
        .catch((error) => {
          this.loading.dismiss().then(() => {
            this.messageError(error);
          })
        })
      this.loading = this.loadingCtrl.create({
        content: 'Espere mientras se comunica el sistema...',
        dismissOnPageChange: true
      });
      this.loading.present();
    }

  }

  /* ============== COMPONENTES =============== */

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Espere mientras se comunica el sistema...'
    });
    loading.present();
  }

  presentAlertNotFound() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'El usuario o la contraseña es incorrecto',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  presentAlertNotNetwork() {
    let alert = this.alertCtrl.create({
      title: 'Error de conexion',
      subTitle: 'El servicio no puede mantener la conexión',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  presentAlertLogin() {
    let alert = this.alertCtrl.create({
      title: 'Error en el sistema',
      subTitle: 'Este usuario ya se encuentra conectado',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  messageError(error) {
    if (error.code == "auth/user-not-found")
      this.presentAlertNotFound();
    if (error.code == "auth/network-request-failed")
      this.presentAlertNotNetwork();
    if (error.code == "auth/requires-recent-login")
      this.presentAlertLogin();
    if (error.code == "auth/account-exists-with-different-credential")
      this.presentAlertNotFound();
  }

  /* ============== PAGINAS =============== */

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
