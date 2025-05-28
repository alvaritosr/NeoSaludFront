import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class MedicoService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  buscarPacientes(params: any): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<any[]>(`${this.apiUrl}/pacientes/buscar`, { params: httpParams });
  }

  verDetallePaciente(nh: string, usernameMedico: string): Observable<any> {
    const params = new HttpParams()
      .set('usernameMedico', usernameMedico);
    return this.http.get<any>(`${this.apiUrl}/pacientes/${nh}`, { params });
  }

  verAntecedentesFamiliares(nh: string, usernameMedico: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/pacientes/${nh}`, { params: { usernameMedico } });
  }

  verAntecedenteFamiliarDetalle(nh: string, idAntecedente: number, usernameMedico: string): Observable<any> {
    return this.http.get<any>(`/api/pacientes/${nh}/detalles/${idAntecedente}`, { params: { usernameMedico } });
  }
}
