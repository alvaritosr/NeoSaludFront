import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tac} from "../models/tac";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TacService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTacsByPaciente(pacienteId: number): Observable<Tac[]> {
    return this.http.get<Tac[]>(`${this.baseUrl}/tac/paciente/${pacienteId}`, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Error al obtener los TACs del paciente'));
      })
    );
  }
}
