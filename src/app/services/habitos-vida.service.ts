import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class HabitosVidaService {
  private baseUrl = '/api/habito-de-vida';

  constructor(private http: HttpClient, private authService: AuthService) {}

  crearHabitoDeVida(nhPaciente: string, habito: any, usernameMedico: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${nhPaciente}`, habito, {
      params: { usernameMedico },
    });
  }

  obtenerTiposDeHabitosDeVida(nhPaciente: string, usernameMedico: string): Observable<string[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/${nhPaciente}/tipos`;
    const params = { usernameMedico };
    return this.http.get<string[]>(url, { headers, params });
  }

  obtenerHabitoDeVidaPorTipo(nhPaciente: string, tipo: string, usernameMedico: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/${nhPaciente}/habitos`;
    const params = { tipo, usernameMedico };
    return this.http.get<any>(url, { headers, params });
  }
}
