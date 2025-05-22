import { Component } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    RouterLink
  ]
})
export class SelectUserComponent {
  primerApellido = '';
  segundoApellido = '';
  nombre = '';
  tipoDoc = '';
  numeroDoc = '';
  nuss = '';
  nif = '';
  nuhsa = '';
  provincia = '';
  anioNacimiento: number | null = null;

  constructor(private menuCtrl: MenuController) { }

  openMenu() {
    this.menuCtrl.open('first');
  }
}
