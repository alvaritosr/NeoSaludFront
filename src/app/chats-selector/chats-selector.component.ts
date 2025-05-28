import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-chats-selector',
  templateUrl: './chats-selector.component.html',
  styleUrls: ['./chats-selector.component.scss'],
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class ChatsSelectorComponent  implements OnInit {
  nombreMedico: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
  }

}
