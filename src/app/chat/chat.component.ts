import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    IonicModule,
    MenuSuperiorComponent
  ]
})
export class ChatComponent  implements OnInit {
  nombreMedico: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
  }

}
