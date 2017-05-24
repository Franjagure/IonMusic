import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { BibliotecaPage } from '../biblioteca/biblioteca';
import { PlaylistPage } from '../playlist/playlist';

@Component({
  selector: 'page-menu-tab',
  templateUrl: 'menu-tab.html'
})
export class MenuTabPage {

  tab1Root = HomePage;
  tab2Root = BibliotecaPage;
  tab3Root = PlaylistPage;

  constructor() {}

}
