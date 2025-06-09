import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  restablecerContrasena(data: { token: string; newPassword: string }): Observable<any> {
    const url = 'localhost:///auth/restablecer-contrasena';
    return this.http.post(url, data);
  }
}
