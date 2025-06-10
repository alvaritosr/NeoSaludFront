import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class RecuperarContrasenaService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  restablecerContrasena(data: { token: string; newPassword: string }): Observable<any> {
    const url = `${this.baseUrl}/auth/restablecer-contrasena`;
    return this.http.post(url, data);
  }
}
