import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
//import { MediaPlugin, MediaObject } from '@ionic-native/media';
import { AudioProvider } from 'ionic-audio';


@Component({
  selector: 'page-biblioteca',
  templateUrl: 'biblioteca.html'
})

@Injectable()
export class BibliotecaPage {

  //Componentes
  playing: boolean = true;
  //currentTrack: any;
  //progressInterval: any;
  canciones: FirebaseListObservable<any[]>;
  loading: any;
  allTracks: any[];
  myTracks: any[] = [];


  constructor(public af: AngularFire, public loadingCtrl: LoadingController, public _audioProvider: AudioProvider) {

    this.showLoading(loadingCtrl);
    this.loading.present().then(() => {
      this.canciones = af.database.list('/audios', { preserveSnapshot: true });
      this.canciones.subscribe(snapshots => {
        this.loading.dismiss();
        snapshots.forEach(snapshot => {
          this.myTracks.push({
           "art": snapshot.val().art,
           "artist": snapshot.val().artist,
           "preload": snapshot.val().preload,
           "src": snapshot.val().src,
           "title": snapshot.val().title,
           "gender": snapshot.val().gender,
           "time": snapshot.val().duration
          })
        });    
      })
    });
  }

  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks; 
  }

  showLoading(loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando biblioteca...'
    });
    this.loading.present();
  }

  playTrack(track) {
       // use AudioProvider to control selected track 
       this._audioProvider.play(track);
  }

  pauseTrack(track) {


  }

onTrackFinished(track: any) {
    console.log('Track finished', track)
  } 

}
