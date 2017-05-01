import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LoadingController } from 'ionic-angular';
import { MediaPlugin, MediaObject } from '@ionic-native/media';
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


  constructor(public af: AngularFire, public loadingCtrl: LoadingController, public media: MediaPlugin) {

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

  playTrack(track) {
    this.media.create(track.url)
      .then((file: MediaObject) => {
        file.play();
        console.log(track.url);
        console.log(track.titulo);
      })
  }

  pauseTrack(track) {
    this.media.create(track.url)
      .then((file: MediaObject) => {
        file.pause();
        console.log(track.url);
        console.log(track.titulo);
      })
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




  nextTrack() {

  }

  prevTrack() {

  }

}
