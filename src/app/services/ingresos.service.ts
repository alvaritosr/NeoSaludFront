import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  verIngresos(username: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const url = `${this.baseUrl}/ingresos`;
    const params = { username };
    return this.http.get<any>(url, { headers, params });
  }

  modificarIngreso(id: number, data: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const url = `${this.baseUrl}/ingresos/${id}`;
    const params = new HttpParams()
      .set('nh', data.numero)
      .set('username', this.authService.getUsernameFromToken());
    return this.http.put<any>(url, data, { headers, params });
  }

  verIngresoPorId(id: number, username: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const url = `${this.baseUrl}/ingresos/${id}`;
    const params = { username };
    return this.http.get<any>(url, { headers, params });
  }
}
