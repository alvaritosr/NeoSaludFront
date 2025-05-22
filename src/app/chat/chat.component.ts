import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class ChatComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
