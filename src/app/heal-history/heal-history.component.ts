import { Component } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";

@Component({
  selector: 'app-heal-history',
  templateUrl: './heal-history.component.html',
  styleUrls: ['./heal-history.component.scss'],
  imports: [
    IonicModule
  ]
})
export class HealHistoryComponent {
  constructor(private menuCtrl: MenuController) { }

  openMenu() {
    this.menuCtrl.open('first');
  }
}
