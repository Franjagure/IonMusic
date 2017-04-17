import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { BibliotecaPage } from '../biblioteca/biblioteca';

@Component({
  selector: 'page-menu-tab',
  templateUrl: 'menu-tab.html'
})
export class MenuTabPage {

  tab1Root = HomePage;
  tab2Root = BibliotecaPage;

  constructor() {}

}
