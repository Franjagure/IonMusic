import { Component, Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-biblioteca',
  templateUrl: 'biblioteca.html'
})

@Injectable()
export class BibliotecaPage {

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

  constructor(public af: AngularFire, public loadingCtrl: LoadingController, public _audioProvider: AudioProvider) { }

  //////////////////////NAVBAR


  openMenu() {

  }

  onInput() {
    this.myTracks = this.myAllTracks;
    console.log("todas las canciones",this.myTracks);
      //this.myTracksFilter = this.myAllTracks;
      this.myTracks = this.myTracks.filter((element => {
        return (element.title.toLowerCase().indexOf(this.searchBar.toLowerCase()) > -1);
      }));
      console.log("canciones filtradas",this.myTracks);
      console.log("busqueda",this.searchBar);
  }


  //////////////////////TRACK MANAGER

  ngOnInit() {
    this.showLoading(this.loadingCtrl);
    this.loading.present().then(() => {
      this.canciones = this.af.database.list('/audios', { preserveSnapshot: true });
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
    this.myAllTracks = this.myTracks;
  }

  ngAfterContentInit() {
    this.allTracks = this._audioProvider.tracks;
  }

  stop(){
   
    
  }

  stopTrack(){
    console.log(this._audioProvider.current); 
  }

  showLoading(loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando biblioteca...'
    });
    this.loading.present();
  }

  playTrack(track) {
    this._audioProvider.stop(this.currentTrack);
    this._audioProvider.play(track);
    
    console.log("actual",this.currentTrack);
  }

  pauseTrack(track) {
    this._audioProvider.stop(track);

  }

}
