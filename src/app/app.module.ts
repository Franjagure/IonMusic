import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ValidateEmail } from '../providers/validate-email';

export const firebaseConfig = {
    apiKey: "AIzaSyD-RRTe73zQqZNGrkREKudOGnEwnXiAbaQ",
    authDomain: "ionic-2d2c9.firebaseapp.com",
    databaseURL: "https://ionic-2d2c9.firebaseio.com",
    projectId: "ionic-2d2c9",
    storageBucket: "ionic-2d2c9.appspot.com",
    messagingSenderId: "551436094592"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, ValidateEmail]
})
export class AppModule {}
