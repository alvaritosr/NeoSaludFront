import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {DatePipe, NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    IonicModule,
    MenuSuperiorComponent,
    NgClass,
    DatePipe,
    NgForOf
  ]
})
export class ChatComponent  implements OnInit {
  nombreMedico: string = '';
  chatId: number | null = null;
  userId: number | null = null;
  mensajes: any[] = [];

  constructor(private authService: AuthService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
    this.userId = this.authService.getPerfilIdFromToken();
    this.chatId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarMensajes();

  }

  cargarMensajes() {
    this.http.get<any[]>(`api/mensaje/chat/${this.chatId}`).subscribe((data) => {
      this.mensajes = data;
    });
  }

}
