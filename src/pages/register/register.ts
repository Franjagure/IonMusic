import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { ValidateEmail } from '../../providers/validate-email';
import { ValidatePassword } from '../../providers/validate-password';
import { AuthService } from '../../providers/auth-service';
import { Camera } from 'ionic-native';
import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  //Firebase components
  filename: any;
  ref: any;
  imageRef: any;
  storageRef: any;
  ruta: string;


  //Variables
  camara: boolean = false;
  newUser: any = {};
  formRegister: FormGroup;
  submitAttempt: boolean = false;
  loading: any;
  photoURL: any = "https://image.freepik.com/iconos-gratis/usuario-masculino-foto-de-perfil_318-37825.jpg";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ValidateEmail: ValidateEmail,
    public ValidatePassword: ValidatePassword,
    public authService: AuthService,
    public menuCtrl: MenuController) {

    this.formRegister = this.formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', ValidateEmail.isValid],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password2: ['', Validators.compose([Validators.required, ValidatePassword.isValid])]
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

  ionViewDidEnter() {
    //to disable menu, or
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    // to enable menu.
    this.menuCtrl.enable(true);
  }

  presentAlert(titulo: string, mensaje: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }


  getPicture() {
    let options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
    }
    Camera.getPicture(options)
      .then((imageData) => {
        this.camara = true;
        this.photoURL = 'data:image/jpeg;base64,' + imageData;
      }, (error) => {

      })
  }

  messageError(error){
    switch(error.code){
      case "auth/email-already-in-use": this.presentAlert("Error", "El email está siendo utilizado");
                                        break;
      case "auth/invalid-email": this.presentAlert("Error", "La cuenta de correo no es válida");
                                 break;
    }
  }

  upload() {
    this.storageRef = firebase.storage().ref();
    this.filename = Math.floor(Date.now() / 1000);
    this.imageRef = this.storageRef.child('photos/' + this.filename + '.jpg');
    this.imageRef.putString(this.photoURL, firebase.storage.StringFormat.DATA_URL);
    this.ruta = "gs://ionic-2d2c9.appspot.com/photos/"+this.filename+".jpg"

  }

  /* ================= FUNCIONES ====================== */

  doRegister() {
    /*** REGISTRO FOTO DE PERFIL POR DEFECTO ***/
    if (!this.camara) {
      this.ruta = this.photoURL;
      this.authService.register(this.formRegister.value.email, this.formRegister.value.password, this.ruta, this.formRegister.value.username)
      .then(authService => {
        this.navCtrl.setRoot(LoginPage);
        this.presentAlert("Registro", "Se ha creado la cuenta");
      }, error => {
        this.messageError(error);
      });
    }
    /*** REGISTRO FOTO DE PERFIL DE LA CAMARA ***/
    else {
      this.upload();
      this.authService.register(this.formRegister.value.email, this.formRegister.value.password, this.ruta, this.formRegister.value.username).then(authService => {
        this.navCtrl.setRoot(LoginPage);
        this.presentAlert("Registro", "Se ha creado la cuenta");
      }, error => {
        this.messageError(error);
      });
    }
  }
}
