import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlergiasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  verAlergias(nh: string, usernameMedico: string): Observable<string[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiUrl}/alergias/${nh}/sustancias`;
    const params = { usernameMedico };
    return this.http.get<string[]>(url, { headers, params });
  }

  verAlergiasDetalles(nh: string, nombre: string, usernameMedico: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiUrl}/alergias/${nh}/alergias`;
    const params = { nombre, usernameMedico };
    return this.http.get<any>(url, { headers, params });
  }
}
