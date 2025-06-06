import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  getChatsByMedico(idMedico: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`api/chat/medico/${idMedico}`, { headers });
  }

  getOtroParticipante(chatId: number, medicoId: number) {
    return this.http.get<{ nombre: string }>(`/api/chat/otro-participante/${chatId}/${medicoId}`);
  }

  getMensajes(chatId: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(`/api/mensaje/chat/${chatId}`, {headers});
  }

  enviarMensaje(mensaje: any) {
    const token = this.authService.getToken();
    console.log("Enviando mensaje:", JSON.stringify(mensaje), "con token:", token);
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>('/api/mensaje/enviar', mensaje, { headers });
  }


}
