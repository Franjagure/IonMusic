import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AudioProvider } from 'ionic-audio';
import { BibliotecaPage } from '../biblioteca/biblioteca';
import firebase from 'firebase';

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
  popTracks: any[] = [];
  latinoTracks: any[] = [];
  electroTracks: any[] = [];
  rockTracks: any[] = [];
  stoorage: any;
  //GENEROS
  btnPop: boolean = false;
  btnRock: boolean = false;
  btnElectro: boolean = false;
  btnLatino: boolean = false;


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
            this.popTracks.push(element);
            this.rockTracks.push(element);
            this.electroTracks.push(element);
            this.latinoTracks.push(element);
          }
        });
      })
      this.filtrarCanciones("popular");
      this.filtrarCanciones("novedades");
      this.stoorage = firebase.storage().ref();
    })
  }

  ngAfterViewInit() {
    this.allTracks = this._audioProvider.tracks;
  }

  checkTrack(canciones: any) {
    let encontrado = this.myTracks.find(x => x._id == canciones._id);
    return encontrado;
  }

  generoTrackPop() {
    this.popTracks = this.popTracks.filter((element => {
      return (element.gender == "Pop");
    }))
  }

  generoTrackRock() {
    this.rockTracks = this.rockTracks.filter((element => {
      return (element.gender == "Rock");
    }))
  }

  generoTrackLatino() {
    this.latinoTracks = this.latinoTracks.filter((element => {
      return (element.gender == "Latino");
    }))
  }

  generoTrackElectro() {
    this.electroTracks = this.electroTracks.filter((element => {
      return (element.gender == "Electrónica");
    }))
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

  filterPop(genero) {
    switch (genero) {

      case "Pop":
        this.generoTrackPop();
        this.btnPop = true;
        this.btnElectro = false;
        this.btnLatino = false;
        this.btnRock = false;
        break;

      case "Rock":
        this.generoTrackRock();
        this.btnPop = false;
        this.btnElectro = false;
        this.btnLatino = false;
        this.btnRock = true;
        break;

      case "Latino":
        this.generoTrackLatino();
        this.btnPop = false;
        this.btnElectro = false;
        this.btnLatino = true;
        this.btnRock = false;
        break;

      case "Electrónica":
        this.generoTrackElectro();
        this.btnPop = false;
        this.btnElectro = true;
        this.btnLatino = false;
        this.btnRock = false;

    }
  }

  visualizarTrack(track){
    this.navCtrl.setRoot(BibliotecaPage,{cancion: track});
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




