import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Slides } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AudioProvider } from 'ionic-audio';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  _userData: any[] = [];
  subCanciones: any;
  subUserData: any;
  allTracks: any[] = [];
  loading: any;
  userdata: FirebaseListObservable<any[]>;
  canciones: FirebaseListObservable<any[]>;
  myTracks: any[] = [];
  currentTrack: any;
  myAllTracks: any[] = [];
  mostPopular: any[] = [];
  mostRecent: any[] = [];


  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public af: AngularFire,
    public _audioProvider: AudioProvider) {

  }

  ngOnInit() {
    this.showLoading(this.loadingCtrl);
    this.loading.present().then(() => {
      this.canciones = this.af.database.list('/audios');
      this.subCanciones = this.canciones.subscribe((track) => {
        this.loading.dismiss();
        track.forEach(element => {
          if (this.checkTrack(element) == undefined) {
            this.myTracks.push(element);
            this.mostPopular.push(element);
            this.mostRecent.push(element);
          }
        });
      })
      console.log(this.mostPopular);
      this.filtrarCanciones("popular");
      this.filtrarCanciones("novedades");
    })
  }


  ngAfterContentInit() {
    this.allTracks = this._audioProvider.tracks;
  }

  checkTrack(canciones: any) {
    let encontrado = this.myTracks.find(x => x._id == canciones._id);
    return encontrado;
  }



  showLoading(loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando canciones'
    });
    this.loading.present();
  }

  OrderByArray(values: any[], orderType: any) {
    return values.sort((a, b) => {
      if (a[orderType] < b[orderType]) {
        return -1;
      }
      if (a[orderType] > b[orderType]) {
        return 1;
      }
      return 0
    });
  }

  filtrarCanciones(filter: any) {
    switch (filter) {
      case "popular":
        this.OrderByArray(this.mostPopular, "view");
        this.mostPopular.reverse();
        break;

      case "novedades":
        this.mostRecent = this.mostRecent.reverse();
        break;
    }
  }





}




