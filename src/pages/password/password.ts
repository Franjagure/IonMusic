import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmail } from '../../providers/validate-email';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class PasswordPage {

  formPassword: FormGroup;
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public ValidateEmail: ValidateEmail,
    public auth: AuthService,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.formPassword = this.formBuilder.group({
      femail: ['', Validators.compose([Validators.required, ValidateEmail.isValid])]
    })
  }

  ionViewDidEnter() {
    //to disable menu, or
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    // to enable menu.
    this.menuCtrl.enable(true);
  }

  doResetPassword() {
    this.showLoading(this.loadingCtrl);
    this.loading.present().then(() => {
      this.auth.resetPassword(this.formPassword.value.femail)
      .then((work) => {
        this.loading.dismiss();
        this.showAlertWork();
      })
      .catch((error) => {
        this.loading.dismiss();
        this.showAlertError();
      })
    })
  }

  showAlertWork() {
    let alert = this.alertCtrl.create({
      title: 'Recuperar contraseña',
      subTitle: 'Se ha enviado el reestablecer contraseña',
      buttons: ['Aceptar']
    });
    alert.present();
  }

    showAlertError() {
    let alert = this.alertCtrl.create({
      title: 'Recuperar contraseña',
      subTitle: 'Error, comprueba que el email esté correcto o inténtelo más tarde',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  showLoading(loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Comprobando datos de la cuenta...'
    });
  }
}
