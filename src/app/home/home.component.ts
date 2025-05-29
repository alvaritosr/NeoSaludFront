import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
    imports: [
        IonicModule,
        ReactiveFormsModule,
        RouterLink,
        MenuSuperiorComponent
    ]
})
export class HomeComponent implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}

  openMenu() {
    this.menuCtrl.open('first');
  }
}
