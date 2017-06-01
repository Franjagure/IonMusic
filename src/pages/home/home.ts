import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AudioProvider } from 'ionic-audio';
import firebase from 'firebase';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  subCanciones: any;
  allTracks: any[] = [];
  loading: any;
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
      this.canciones = this.af.database.list('userData/' + this.af.auth.getAuth().uid + "/playlist");
      this.subCanciones = this.canciones.subscribe((track) => {
        this.loading.dismiss();
        track.forEach(element => {
          if (this.checkTrack(element) == undefined)
            this.myTracks.push(element);
        });
      })
    })

    /// POPULARES 
    this.myTracks = this.mostPopular;
    
    
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
      case "filter1":
        this.OrderByArray(this.mostPopular, "view");
        this.myTracks.reverse();
        break;
      case "filter2":
        this.OrderByArray(this.myTracks, "title");
        break;
      case "filter3":
        this.myTracks = this.myAllTracks;
        this.myTracks = this.myTracks.reverse();
        break;
    }
  }
  




}




