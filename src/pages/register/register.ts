import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { ValidateEmail } from '../../providers/validate-email';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  newUser: any = {};
  formRegister: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public ValidateEmail: ValidateEmail) {
  
   this.formRegister = this.formBuilder.group({
     username: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'),Validators.required])],
     email: ['',ValidateEmail.isValid],
     password: ['',Validators.compose([Validators.required])],
     password2: ['',Validators.compose([Validators.required])]
   })

  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Porfavor espere...",
      duration: 3000
    });
    loader.present();
  }


presentAlert(titulo: string,mensaje: string) {
  let alert = this.alertCtrl.create({
    title: titulo,
    subTitle: mensaje,
    buttons: ['Aceptar']
  });
  alert.present();
}

  doRegister(){
    this.submitAttempt = true;
    if(!this.formRegister.valid){
      this.presentAlert('Registro','Rellene los campos correctamente');
    }
    else
    {
      this.presentLoading();
      this.navCtrl.setRoot(LoginPage);
      this.presentAlert('Registro','Cuenta creada correctamente');
    }
  }

}
