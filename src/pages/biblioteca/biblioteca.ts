import { Component} from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the Biblioteca page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-biblioteca',
  templateUrl: 'biblioteca.html'
})

@Injectable()
export class BibliotecaPage {

  //Componentes
  playing: boolean = true;
  tracks: any[] = [];
  currentTrack: any;
  progressInterval: any;
  canciones: FirebaseListObservable<any[]>;
  loading: any;
  allTracks: any[];

  //Campos de la cancion
  artist: any;
  url: any;
  image: any;
  genero: any;
  title: any;
  duracion: any;


  constructor(public af: AngularFire, public loadingCtrl: LoadingController) {

    this.showLoading(loadingCtrl);
    this.loading.present().then(() => {
      this.canciones = af.database.list('/songsData', { preserveSnapshot: true });
      this.canciones.subscribe(snapshots => {
      this.loading.dismiss();
        snapshots.forEach(snapshot => {
          this.tracks.push({
            title: snapshot.val().titulo,
            artist: snapshot.val().artista,
            url: snapshot.val().url,
            genero: snapshot.val().genero,
            image: snapshot.val().image,
            duracion: snapshot.val().duracion,
            playing: false,
            progress: 0
          })
        })
      })
    });
    this.currentTrack = this.tracks[0];
  }

  showLoading(loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando biblioteca...'
    });
  }


  loadLibrary(titulo: string, artista: string, url: string, image: string) {
    this.tracks.push({
      title: titulo,
      artist: artista,
      url: url,
      playing: false,
      progress: 0,
      image: image
    })
  }



 /* playTrack(track) {
    // First stop any currently playing tracks
    for (let checkTrack of this.tracks) {
      if (checkTrack.playing) {
        this.pauseTrack(checkTrack);
      }
    }
    track.playing = true;
    this.currentTrack = track;
    // Simulate track playing
    this.progressInterval = setInterval(() => {
      track.progress < 100 ? track.progress++ : track.progress = 0;
    }, 1000);
  }

  pauseTrack(track) {
    track.playing = false;
    clearInterval(this.progressInterval);
  }

  nextTrack() {
    let index = this.tracks.indexOf(this.currentTrack);
    index >= this.tracks.length - 1 ? index = 0 : index++;
    this.playTrack(this.tracks[index]);
  }

  prevTrack() {
    let index = this.tracks.indexOf(this.currentTrack);
    index > 0 ? index-- : index = this.tracks.length - 1;
    this.playTrack(this.tracks[index]);
  }*/

}
