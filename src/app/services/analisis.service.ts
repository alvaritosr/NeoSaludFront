import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  verAnaliticas(nh: string): Observable<string[]> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `api/analisis-medico/tipos`;
    const params = { nh };
    return this.http.get<string[]>(url, { headers, params });
  }

  verAnaliticasDetalle(nh: string, nombre: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const url = `/api/analisis-medico/nombre`;
    const params = { nh, nombre };
    return this.http.get<string[]>(url, { headers, params });
  }
}
