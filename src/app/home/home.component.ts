import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule
  ]
})
export class HomeComponent implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}

  openMenu() {
    this.menuCtrl.open('first');
  }
}
