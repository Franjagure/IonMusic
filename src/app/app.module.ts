import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ValidateEmail } from '../providers/validate-email';
import { ValidatePassword } from '../providers/validate-password';
import { AngularFireModule, AuthProviders, AuthMethods,FirebaseApp } from 'angularfire2';
import { Camera } from '@ionic-native/camera'
import { AuthService } from '../providers/auth-service';
import { MenuTabPage } from '../pages/menu-tab/menu-tab';
import { ProgressBarComponent} from '../components/progress-bar/progress-bar';
import { BibliotecaPage } from '../pages/biblioteca/biblioteca';

export const firebaseConfig = {
    apiKey: "AIzaSyD-RRTe73zQqZNGrkREKudOGnEwnXiAbaQ",
    authDomain: "ionic-2d2c9.firebaseapp.com",
    databaseURL: "https://ionic-2d2c9.firebaseio.com",
    projectId: "ionic-2d2c9",
    storageBucket: "ionic-2d2c9.appspot.com",
    messagingSenderId: "551436094592"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MenuTabPage,
    ProgressBarComponent,
    BibliotecaPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MenuTabPage,
    ProgressBarComponent,
    BibliotecaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, ValidateEmail, ValidatePassword, AuthService, Camera]
})
export class AppModule {}
