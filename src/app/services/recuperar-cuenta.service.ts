// src/app/services/recuperar-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RecuperarContrasenaData {
  email: string;
  numeroColegiado: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecuperarCuentaService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  recuperarContrasena(data: RecuperarContrasenaData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/recuperar-contrasena`, data);
  }
}
