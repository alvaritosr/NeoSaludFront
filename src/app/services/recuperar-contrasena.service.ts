// src/app/services/recuperar-contrasena.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RestablecerContrasenaData {
  token: string;
  newPassword: string; // Cambiado de password a newPassword
}

@Injectable({
  providedIn: 'root'
})
export class RecuperarContrasenaService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  restablecerContrasena(data: RestablecerContrasenaData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/restablecer-contrasena`, data);
  }
}
