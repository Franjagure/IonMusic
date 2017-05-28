import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AudioProvider } from 'ionic-audio';
import firebase from 'firebase';

/*
  Generated class for the Playlist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})
export class PlaylistPage {
  allTracks: any[] = [];
  loading: any;
  canciones: FirebaseListObservable<any[]>;
  myTracks: any[] = [];
  currentTrack: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public af: AngularFire, public _audioProvider: AudioProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }

  ngAfterContentInit() {
    this.allTracks = this._audioProvider.tracks;
  }

  addView(){
   
  }
  ngOnInit(){
    this.showLoading(this.loadingCtrl);
    this.loading.present().then(() => {
      this.canciones = this.af.database.list('userData/'+this.af.auth.getAuth().uid+"/playlist");
      this.canciones.subscribe((track) => {
        this.loading.dismiss();
        console.log(track);
        this.myTracks = track;
      })
    })
    console.log(this.myTracks);
  }
  
  playSong(track){

    //Reproducir canción
    track.isFinished = true;
    this._audioProvider.stop(this.currentTrack);
    this._audioProvider.play(track.id);
    this.currentTrack = track.id;
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
