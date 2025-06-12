import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: Stomp.Client | null = null;
  private messageSubject = new Subject<any>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getChatsByMedico(idMedico: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`api/chat/medico/${idMedico}`, { headers });
  }

  getOtroParticipante(chatId: number, medicoId: number) {
    return this.http.get<{ nombre: string }>(
      `/api/chat/otro-participante/${chatId}/${medicoId}`
    );
  }

  getMensajes(chatId: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(`/api/mensaje/chat/${chatId}`, { headers });
  }

  enviarMensaje(mensaje: any) {
    const token = this.authService.getToken();
    console.log('Enviando mensaje:', JSON.stringify(mensaje), 'con token:', token);
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>('/api/mensaje/enviar', mensaje, { headers });
  }

  // ---------- WebSocket / STOMP ----------

  connectWebSocket(chatId: number): void {
    if (this.stompClient && this.stompClient.connected) {
      return; // ya conectado
    }

    // Ajusta la URL según tu backend
    const socket = new SockJS('/api/ws'); // o la URL donde expongas SockJS
    this.stompClient = new Stomp.Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Conectado a WebSocket');
      // Suscribirse al topic del chat
      this.stompClient?.subscribe(`/topic/chat/${chatId}`, (message) => {
        if (message.body) {
          const mensajeRecibido = JSON.parse(message.body);
          this.messageSubject.next(mensajeRecibido);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Error STOMP: ' + frame.headers['message']);
      console.error('Detalle: ' + frame.body);
    };

    this.stompClient.activate();
  }

  disconnectWebSocket(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
  }

  onNewMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
