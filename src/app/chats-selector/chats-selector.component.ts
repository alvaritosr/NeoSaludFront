import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { AuthService } from "../services/auth.service";
import { ChatService } from "../services/chat.service";
import {NgForOf} from "@angular/common";
import {addIcons} from "ionicons";
import {close, construct, logOut, mail} from 'ionicons/icons';


@Component({
  selector: 'app-chats-selector',
  templateUrl: './chats-selector.component.html',
  styleUrls: ['./chats-selector.component.scss'],
  imports: [
    IonicModule,
    MenuSuperiorComponent,
    NgForOf
  ]
})
export class ChatsSelectorComponent implements OnInit {
  idMedico: number | null = 0;
  chats: any[] = [];
  nombreReceptor: string = '';
  chatId: number | null = null;

  constructor(private authService: AuthService, private chatService: ChatService, private router: Router, private route: ActivatedRoute) {
    addIcons({
    'mail': mail
  });
  }

  ngOnInit() {
    this.idMedico = this.authService.getPerfilIdFromToken();
    if (this.idMedico) {
      this.chatService.getChatsByMedico(this.idMedico).subscribe({
        next: (data) => {
          this.chats = data;
          this.chats.forEach(chat => {
            this.chatService.getOtroParticipante(chat.id, this.idMedico!).subscribe({
              next: (response) => {
                chat.nombre_receptor = response.nombre;
              },
              error: (err) => {
                console.error('Error obteniendo el otro participante:', err);
              }
            });
          });
        },
        error: (err) => {
          console.error('Error al obtener los chats:', err);
        }
      });
    }
  }


  navigateToChat(chatId: number): void {
    this.router.navigate(['/chat', chatId]);
  }

  navigateToCorreo(): void {
    this.router.navigate(['/enviarCorreo']);
  }

  enviarCorreo(): void {
    const correo = this.authService.getEmailFromToken();
    if (correo) {
      window.location.href = `mailto:${correo}`;
    } else {
      console.error('No se pudo obtener el correo electrónico del token.');
    }
  }

  verParticipante(chatId: number): void {
    this.chatId = Number(this.route.snapshot.paramMap.get('chatId'));
    const idMedico = this.authService.getPerfilIdFromToken();

    if (this.chatId && idMedico) {
      this.chatService.getOtroParticipante(this.chatId, idMedico).subscribe({
        next: (response) => {
          this.nombreReceptor = response.nombre;
          console.log('Nombre receptor:', this.nombreReceptor);
        },
        error: (err) => {
          console.error('Error obteniendo el otro participante:', err);
        }
      });
    }
  }
}
