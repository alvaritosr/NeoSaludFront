import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface RecuperarContrasenaData {
  email: string;
  numeroColegiado: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecuperarCuentaService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  recuperarContrasena(data: RecuperarContrasenaData): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/recuperar-contrasena`, data);
  }
}
