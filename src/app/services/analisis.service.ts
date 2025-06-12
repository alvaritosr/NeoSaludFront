import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  verAnaliticas(nh: string): Observable<string[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiUrl}/analisis-medico/tipos`;
    const params = { nh };
    return this.http.get<string[]>(url, { headers, params });
  }

  verAnaliticasDetalle(nh: string, nombre: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiUrl}/analisis-medico/nombre`;
    const params = { nh, nombre };
    return this.http.get<string[]>(url, { headers, params });
  }

  verResultadosPorAnalisisMedico(analisisMedicoId: number): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiUrl}/resultados-analisis/ver/${analisisMedicoId}`;
    console.log(url);
    return this.http.get<any[]>(url, { headers });
  }
}
