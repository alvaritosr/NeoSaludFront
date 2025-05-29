import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class MedicoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  buscarPacientes(params: any): Observable<any> {
    const token = this.authService.getToken();
    const httpParams = new HttpParams({ fromObject: params });
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`/api/medicos/pacientes/buscar`, { headers, params: httpParams });
  }

  verDetallePaciente(nh: string, usernameMedico: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `/api/medicos/pacientes/${nh}`;
    const params = { usernameMedico };
    return this.http.get(url, { headers, params });
  }

  crearPaciente(usernameMedico: string, paciente: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const url = `/api/medicos/${usernameMedico}/pacientes`;
    return this.http.post(url, paciente, { headers });
  }
}
