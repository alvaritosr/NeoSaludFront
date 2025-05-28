import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    IonicModule,
  ]
})
export class ChatComponent  implements OnInit {
  nombreMedico: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
  }

}
