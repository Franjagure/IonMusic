import { Component, Injector } from '@angular/core';
import { Platform, Events, LoadingController, NavController, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
import { AuthService } from '../providers/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any = LoginPage;
  subUserData: any;
  _username: any;
  _photo: any;
  _email: any;
  loading: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public events: Events,
    public af: AngularFire,
    public loadingCtrl: LoadingController,
    public _auth: AuthService,
    public app: App) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  showLoading(loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando perfil de usuario...'
    });
    this.loading.present();
  }

  loadProfile() {
    this.showLoading(this.loadingCtrl);
    this.loading.present().then(() => {
      firebase.database().ref('/userData/' + this.af.auth.getAuth().uid + '/profile').once('value')
        .then((snapshot) => {
          this._username = snapshot.val().username;
          this._email = snapshot.val().email;
          this._photo = snapshot.val().photo;
        });
      this.loading.dismiss();
    }
    )
  }



  logOut(){
    var nav = this.app.getActiveNav();
    nav.push(LoginPage);
    this._auth.doLogout();
    
    
  }
}

