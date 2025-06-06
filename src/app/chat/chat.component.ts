import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { AuthService } from "../services/auth.service";
import { ChatService } from "../services/chat.service";
import { Mensaje } from "../models/Mensaje";
import { addIcons } from "ionicons";
import { FormsModule } from "@angular/forms";
import {OtroParticipanteChat} from "../models/OtroParticipanteChat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    IonicModule,
    MenuSuperiorComponent,
    CommonModule,
    FormsModule
  ]
})
export class ChatComponent implements OnInit {

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  nombreReceptor: string = '';
  chatId: number | null = null;
  mensajes: any[] = [];
  idMedicoActual: number | null = null;
  nuevoMensaje: string = '';
  idReceptor: number | null = null;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {
    addIcons({
      'medkit-outline': 'medkit-outline',
      'person-outline': 'person-outline',
    });
  }

  ngOnInit() {
    this.chatId = Number(this.route.snapshot.paramMap.get('chatId'));
    this.idMedicoActual = this.authService.getPerfilIdFromToken();

    if (this.chatId && this.idMedicoActual) {
      this.chatService.getOtroParticipante(this.chatId, this.idMedicoActual).subscribe({
        next: (response: OtroParticipanteChat) => {
          this.nombreReceptor = response.nombre || '';
          this.idReceptor = response.id || null;
        },
        error: (err) => {
          console.error('Error obteniendo el otro participante:', err);
        }
      });

      // Cargamos los mensajes del chat
      this.chatService.getMensajes(this.chatId).subscribe({
        next: (data) => {
          this.mensajes = data;
          console.log('Mensajes cargados:', this.mensajes);
        },
        error: (err) => {
          console.error('Error cargando mensajes:', err);
        }
      });
    }
  }

  enviarMensaje() {
    if (!this.nuevoMensaje.trim() || !this.chatId || !this.idReceptor) {
      console.warn('Faltan datos para enviar el mensaje');
      return;
    }

    const mensajeDTO = new Mensaje();
    mensajeDTO.idChat = this.chatId;
    mensajeDTO.idReceptor = this.idReceptor;
    mensajeDTO.contenido = this.nuevoMensaje;

    this.chatService.enviarMensaje(mensajeDTO).subscribe({
      next: (nuevoMensaje) => {
        this.mensajes.push(nuevoMensaje);
        this.nuevoMensaje = '';
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error enviando mensaje:', err);
      }
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
