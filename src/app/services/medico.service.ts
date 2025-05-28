import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  verAntecedentesFamiliares(nh: string, usernameMedico: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/medicos/pacientes/${nh}`, { params: { usernameMedico } });
  }

  verAntecedenteFamiliarDetalle(nh: string, idAntecedente: number, usernameMedico: string): Observable<any> {
    return this.http.get<any>(`/api/medicos/pacientes/${nh}/detalles/${idAntecedente}`, { params: { usernameMedico } });
  }
}
