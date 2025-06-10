import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import jwt_decode, {jwtDecode} from 'jwt-decode';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private readonly TOKEN_KEY = 'authToken';

  private authState = new BehaviorSubject<boolean>(!!sessionStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  constructor(private httpClient: HttpClient, private route: Router) {}

  esAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.tokenDataDTO?.rol === 'ADMIN';
      } catch (e) {
        console.error('Error extracting perfilId from token', e);
        return false;
      }
    }
    return false;
  }

  verDetallesMedico(id: number): Observable<any> {
    const token = this.getToken();
    return this.httpClient.get<any[]>(`${this.apiUrl}/medicos/${id}`);
  }

  cerrarSesion(){
    sessionStorage.removeItem('authToken');
    this.route.navigate(['/login']);
  }


  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem("authToken");
  }

  getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }

  getPerfilIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.tokenDataDTO?.id || null;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    return null;
  }

  recuperarContrasena(email: string): Observable<any> {
    const options = this.getAuthHeaders();
    return this.httpClient.post(`${this.apiUrl}/auth/recuperar-contrasena`, { email }, options);
  }

  restablecerContrasena(token: string, newPassword: string): Observable<any> {
    const options = this.getAuthHeaders();
    return this.httpClient.post(`${this.apiUrl}/auth/restablecer-contrasena`, { token, newPassword }, options);
  }

  getUsernameFromToken(): string {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.tokenDataDTO?.username || '';
      } catch (error) {
        console.error('Error decoding token:', error);
        return '';
      }
    }
    return '';
  }

  getEmailFromToken(): string {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.tokenDataDTO?.email || '';
      } catch (error) {
        console.error('Error decoding token:', error);
        return '';
      }
    }
    return '';
  }
}
