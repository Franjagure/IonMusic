import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { ValidateEmail } from '../../providers/validate-email';
import { ValidatePassword } from '../../providers/validate-password'; 
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  newUser: any = {};
  formRegister: FormGroup;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public ValidateEmail: ValidateEmail,
              public ValidatePassword: ValidatePassword,
              public authService: AuthService) {
  
   this.formRegister = this.formBuilder.group({
     username: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'),Validators.required])],
     email: ['',ValidateEmail.isValid],
     password: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
     password2: ['',Validators.compose([Validators.required,ValidatePassword.isValid])]
   })

  }

/* ================== COMPONENTES =================== */
  
presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Redirigiendo al inicio...",
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

/* ================= FUNCIONES ====================== */

  doRegister(){
    this.submitAttempt = true;
    if(!this.formRegister.valid){
      this.presentAlert('Registro','Rellene los campos correctamente');
    }
    else
    {
     this.authService.register(this.formRegister.value.email, this.formRegister.value.password).then( authService => {
        this.navCtrl.setRoot(LoginPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: "El email ya está siendo utilizado",
            buttons: [
              {
                text: "OK",
                role: 'Cancel'
              }
            ]
          });
          alert.present();
        });
        this.formRegister.reset();
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  saveUser(){
    
  }

}
