import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { AuthService } from "../services/auth.service";
import { ChatService } from "../services/chat.service";
import { Mensaje } from "../models/Mensaje";
import { addIcons } from "ionicons";
import { FormsModule } from "@angular/forms";
import { OtroParticipanteChat } from "../models/OtroParticipanteChat";
import { Subscription } from 'rxjs';

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
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  nombreReceptor: string = '';
  chatId: number | null = null;
  mensajes: any[] = [];
  idMedicoActual: number | null = null;
  nuevoMensaje: string = '';
  idReceptor: number | null = null;

  private wsSubscription: Subscription | null = null;

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
          if (response) {
            this.nombreReceptor = response.nombre || '';
            this.idReceptor = response.id || null;
          } else {
            console.warn('No se recibió respuesta válida del servicio');
          }
        },
        error: (err) => {
          console.error('Error obteniendo el otro participante:', err);
        }
      });

      this.chatService.getMensajes(this.chatId).subscribe({
        next: (data) => {
          this.mensajes = data;
          this.scrollToBottom();
          this.chatService.connectWebSocket(this.chatId!);
          this.wsSubscription = this.chatService.onNewMessage().subscribe((mensaje) => {
            if (mensaje.idChat === this.chatId) {
              this.mensajes.push(mensaje);
              this.scrollToBottom(); // Asegura que la vista se actualice
            }
          });
        },
        error: (err) => {
          console.error('Error cargando mensajes:', err);
        }
      });
    }
  }

  enviarMensaje() {
    if (!this.nuevoMensaje.trim() || !this.chatId || !this.idReceptor) {
      console.log(this.nuevoMensaje)
      console.log(this.chatId)
      console.log(this.idReceptor)

      console.warn('Faltan datos para enviar el mensaje');
      return;
    }

    const mensajeDTO = new Mensaje();
    mensajeDTO.idChat = this.chatId;
    mensajeDTO.idReceptor = this.idReceptor;
    mensajeDTO.contenido = this.nuevoMensaje;

    this.chatService.enviarMensaje(mensajeDTO).subscribe({
      next: () => {
        this.nuevoMensaje = '';
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error enviando mensaje:', err);
      }
    });
  }


  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {}
    }, 100);
  }


  ngOnDestroy() {
    this.wsSubscription?.unsubscribe();
    this.chatService.disconnectWebSocket();
  }
}
