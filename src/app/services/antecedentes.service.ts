import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  verAntecedentesFamiliares(nh: string, usernameMedico: string): Observable<string[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiUrl}/antecedentes-familiares/pacientes/${nh}`;
    const params = { usernameMedico };
    return this.http.get<string[]>(url, { headers, params });
  }

  verAntecedenteFamiliarDetalle(nh: string, nombre: string, usernameMedico: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiUrl}/antecedentes-familiares/pacientes/${nh}/detalles`;
    const params = { nombre, usernameMedico };
    return this.http.get<string[]>(url, { headers, params });
  }
}
