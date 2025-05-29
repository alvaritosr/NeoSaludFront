import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-menu-superior',
    templateUrl: './menu-superior.component.html',
    styleUrls: ['./menu-superior.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class MenuSuperiorComponent  implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}


}
