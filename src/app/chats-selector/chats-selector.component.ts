import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";

@Component({
  selector: 'app-chats-selector',
  templateUrl: './chats-selector.component.html',
  styleUrls: ['./chats-selector.component.scss'],
    imports: [
        IonicModule,
        RouterLink,
        MenuSuperiorComponent
    ]
})
export class ChatsSelectorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
