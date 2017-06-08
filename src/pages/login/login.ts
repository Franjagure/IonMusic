import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFire } from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmail } from '../../providers/validate-email';
import { AuthService } from '../../providers/auth-service';
import { MenuTabPage } from '../menu-tab/menu-tab';
import { PasswordPage } from '../password/password';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  
  alert: any;
  email: any;
  loading: any;
  password: any;
  formLogin: FormGroup;
  submitAttempt: boolean = false;
   logo = "src/assets/img/icon.png";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angfire: AngularFire,
    public formBuilder: FormBuilder,
    public ValidateEmail: ValidateEmail,
    public auth: AuthService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController) {

    this.formLogin = this.formBuilder.group({
      femail: ['', Validators.compose([Validators.required, ValidateEmail.isValid])],
      fpassword: ['', Validators.required]
    })

  }

  /* ============== OPCIONES DE LOGIN =============== */

  doLogin() {
    this.showLoading(this.loadingCtrl);
    this.loading.present().then(() => {
    this.auth.doLogin(this.formLogin.value.femail, this.formLogin.value.fpassword)
      .then((authService) => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(MenuTabPage);
        })
      })
      .catch((error) => {
        this.loading.dismiss().then(() => {
          this.messageError(error);
        })
      })
    })
  }

  /* ============== COMPONENTES =============== */

  ionViewDidEnter() {
    //to disable menu, or
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    // to enable menu.
    this.menuCtrl.enable(true);
  }

/*************** ALERTA DE ERRORES *****************/

  presentAlertNotFound() {
    this.alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'El usuario o la contraseña es incorrecto',
      buttons: ['Aceptar']
    });
    this.alert.present();
  }

  presentAlertNotNetwork() {
    this.alert = this.alertCtrl.create({
      title: 'Error de conexion',
      subTitle: 'El servicio no puede mantener la conexión',
      buttons: ['Aceptar']
    });
    this.alert.present();
  }

  presentAlertLogin() {
    this.alert = this.alertCtrl.create({
      title: 'Error en el sistema',
      subTitle: 'Este usuario ya se encuentra conectado',
      buttons: ['Aceptar']
    });
    this.alert.present();
  }

  
  messageError(error) {
    if(error.code == "auth/invalid-email")
      this.presentAlertNotFound();
    if(error.code == "auth/wrong-password")
       this.presentAlertNotFound();
    if (error.code == "auth/user-not-found")
      this.presentAlertNotFound();
    if (error.code == "auth/network-request-failed")
      this.presentAlertNotNetwork();
    if (error.code == "auth/requires-recent-login")
      this.presentAlertLogin();
    if (error.code == "auth/account-exists-with-different-credential")
      this.presentAlertNotFound();
  }

/************ LOADING  ******************/

  showLoading(loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando biblioteca...'
    });
  }

  /* ============== PAGINAS =============== */

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  
  goResetPassword() {
    this.navCtrl.push(PasswordPage);
  }

}
