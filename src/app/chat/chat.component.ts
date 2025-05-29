import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
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
  chatId: number | null = null;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
  }


}
