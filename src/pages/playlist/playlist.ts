import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
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

  subCanciones: any;
  allTracks: any[] = [];
  loading: any;
  canciones: FirebaseListObservable<any[]>;
  myTracks: any[] = [];
  currentTrack: any;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController, 
              public af: AngularFire, 
              public _audioProvider: AudioProvider,
              public alertCtrl: AlertController) {}

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
      this.subCanciones = this.canciones.subscribe((track) => {
        this.loading.dismiss();
        track.forEach(element => {
          if(this.checkTrack(element)==undefined)
          this.myTracks.push(element);
        });      
      })
    })
  }

 checkTrack(canciones: any) {
    let encontrado = this.myTracks.find(x => x._id == canciones._id);
    return encontrado;
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

  borrarCancion(track,index){
    let alert = this.alertCtrl.create({
      title: 'Borrar canción',
      message: '¿Quieres borrar esta canción de tu playlist?',
      buttons: [
        {
          text: 'Cancelar', role: 'cancel',
          handler: data => {}
        },
        {
          text: 'Confirmar',
          handler: data => {
            if(this.currentTrack == track.id){
            track.isFinished = true;
            this._audioProvider.stop(track.id); 
            }   
            firebase.database().ref('userData/' + this.af.auth.getAuth().uid + "/playlist/").child(track.title).remove(); 
            this.myTracks.splice(index,1);
            console.log(index);
          }
        }
      ]
    });
    alert.present();
  }
  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

}
