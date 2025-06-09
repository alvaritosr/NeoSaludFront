import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecuperarContrasenaService {
  private apiUrl = 'http://localhost:5433/api/auth';

  constructor(private http: HttpClient) {}

  restablecerContrasena(data: { token: string; newPassword: string }): Observable<any> {
    const url = `${this.apiUrl}/restablecer-contrasena`;
    return this.http.post(url, data);
  }
}
