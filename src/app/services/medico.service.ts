import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class MedicoService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  buscarPacientes(params: any): Observable<any> {
    const token = this.authService.getToken();
    const httpParams = new HttpParams({ fromObject: params });
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.baseUrl}/medicos/pacientes/buscar`, { headers, params: httpParams });
  }

  verDetallePaciente(nh: string, usernameMedico: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/medicos/pacientes/${nh}`;
    const params = { usernameMedico };
    return this.http.get(url, { headers, params });
  }

  crearPaciente(usernameMedico: string, paciente: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const url = `${this.baseUrl}/medicos/${usernameMedico}/pacientes`;
    return this.http.post(url, paciente, { headers });
  }

  obtenerMedicos(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/medicos/all`;
    return this.http.get<any[]>(url, { headers });
  }

  verConsultasPorMedico(usernameMedico: string): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/medicos/${usernameMedico}/consultas`;
    return this.http.get<any[]>(url, { headers });
  }

  verConsultas(nh: string, usernameMedico: string): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/medicos/pacientes/${nh}/consultas`;
    const params = { usernameMedico };
    return this.http.get<any[]>(url, { headers, params });
  }

  verTodasLasConsultas(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/medicos/consultas`;
    return this.http.get<any[]>(url, { headers });
  }

  verDetalleConsulta(nh: string, idConsulta: number, usernameMedico: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/medicos/pacientes/${nh}/consultas/${idConsulta}`;
    const params = { usernameMedico };
    return this.http.get<any>(url, { headers, params });
  }

  modificarConsulta(nh: string, idConsulta: number, consulta: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/pacientes/${nh}/consultas/${idConsulta}`;
    return this.http.put<any>(url, {motivoConsulta: consulta.motivoConsulta, observaciones: consulta.observaciones, headers});
  }

  cambiarMedicoDePaciente(nh: string, nuevoUsernameMedico: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.baseUrl}/medicos/pacientes/${nh}/cambiar-medico`;
    const params = { nuevoUsernameMedico };
    return this.http.put(url, {}, { headers, params });
  }

  crearConsulta(nh: string, consulta: any, usernameMedico: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const url = `${this.baseUrl}/medicos/pacientes/${nh}/consultas`;
    const params = { usernameMedico };
    return this.http.post(url, consulta, { headers, params });
  }
}
