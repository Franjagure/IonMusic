import { Component, Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoadingController, AlertController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Component({
  selector: 'page-biblioteca',
  templateUrl: 'biblioteca.html'
})

@Injectable()
export class BibliotecaPage {

  //Firebase Audios


  //COMPONENTS
  canciones: FirebaseListObservable<any[]>;
  loading: any;
  allTracks: any[];
  myTracks: any[] = [];
  currentTrack: any;
  myTracksFilter: any[] = [];
  myAllTracks: any[] = [];

  //NAVBAR
  searchBar: string = '';

  //SOCIAL
  username: any;

  constructor(public af: AngularFire, public loadingCtrl: LoadingController, public _audioProvider: AudioProvider, public alertCtrl: AlertController) { }

  //////////////////////NAVBAR


  openMenu() {

  }

  onInput() {
    this.myTracks = this.myAllTracks;
    console.log("todas las canciones", this.myTracks);
    this.myTracks.filter((element => {
      return (element.title.toLowerCase().indexOf(this.searchBar.toLowerCase()) > -1);
    }));

  }

  /////////////////////SOCIAL OPTIONS
  addLibrary(track) {
    firebase.database().ref('userData/' + this.af.auth.getAuth().uid + "/playlist/" + track.title).set(track).then((funciona) => {
      this.showAlertFav();
    });
  }

  showAlertFav() {
    let alert = this.alertCtrl.create({
      title: 'Añadir a tu playlist',
      subTitle: 'Se ha añadido a tu lista de reproducción',
      buttons: ['Aceptar']
    });
    alert.present();
  }


  //////////////////////TRACK MANAGER
  playSong(track){
    //Añadir reproducción
    this.addView(track);
    //Reproducir canción
    track.isFinished = true;
    this._audioProvider.stop(this.currentTrack);
    this._audioProvider.play(track.id);
    this.currentTrack = track.id;
  }

  ngOnInit() {
    this.showLoading(this.loadingCtrl);
    this.loading.present().then(() => {
      this.canciones = this.af.database.list('/audios');
      this.canciones.forEach(lista => {
        lista.forEach(canciones => {
          this.myTracks.push(canciones);
        });
      });
      this.loading.dismiss();
    });
    this.myAllTracks = this.myTracks;
    console.log(this.myTracks);
    
  }

  ngAfterContentInit() {
    this.allTracks = this._audioProvider.tracks;
  }

  addView(track) {
    track.view++;
    //
    firebase.database().ref('/audios').child(track._id).update({ 'view': track.view });
  }


  showLoading(loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando biblioteca...'
    });
    this.loading.present();
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

}
