import { Component, Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoadingController, AlertController, MenuController, NavController } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Component({
  selector: 'page-biblioteca',
  templateUrl: 'biblioteca.html'
})

@Injectable()
export class BibliotecaPage {


  //COMPONENTS
  subCanciones: any;
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
  like: boolean = false;

  constructor(public af: AngularFire, 
              public loadingCtrl: LoadingController, 
              public _audioProvider: AudioProvider, 
              public alertCtrl: AlertController,
              public nav: NavController,
              public menuCtrl: MenuController) { }

  //////////////////////NAVBAR
  presentAlertFilter() {
    let alert = this.alertCtrl.create({
      title: 'Filtro de canciones',
      message: 'Selecciona el tipo de filtro',
      inputs: [
        { type: 'radio', label: 'Mas populares', value:'filter1'},
        { type: 'radio', label: 'Titulo', value:'filter2'},
        { type: 'radio', label: 'Mas recientes / Mas antigüas', value:'filter3'}
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel', 
          handler: data  => { 
         console.log("cancelar",data) 
        }
      },
      {
        text: 'Confirmar',
        handler: data => {
          this.filtrarCanciones(data);
        }
      }
    ]
    });
   alert.present();
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

  filtrarCanciones(filter: any){

    switch(filter){
      case "filter1":
            this.OrderByArray(this.myTracks.reverse(),"view");
            break;
      case "filter2": 
            this.OrderByArray(this.myTracks,"title");
            break;
      case "filter3": 
            this.myTracks = this.myAllTracks;
            this.myTracks = this.myTracks.reverse();    
            break;
    }
  }
  onInput() {

    this.myTracks = this.myAllTracks;
    this.myTracks = this.myTracks.filter((element => {
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
      //console.log(this.OrderByArray(this.myTracks,"title").map(item => item.title));
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
      this.subCanciones = this.canciones.subscribe((lista) => {
        lista.forEach(canciones => {
          this.myTracks.push(canciones);
        })
        this.loading.dismiss();
      })  
    });
    this.myAllTracks = this.myTracks;  
    /*this.showLoading(this.loadingCtrl);
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
    console.log(this.myTracks);*/
    
  }

  ngAfterContentInit() {
    this.allTracks = this._audioProvider.tracks;

  }


  addView(track) {
   this.subCanciones.unsubscribe(); 
    track.view++;
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
