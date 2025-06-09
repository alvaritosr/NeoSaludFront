import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescripcion } from '../models/Prescripcion';

@Injectable({
  providedIn: 'root',
})
export class PrescripcionService {
  private baseUrl = 'api/prescripciones';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(`${this.baseUrl}`);
  }

  obtenerPorId(prescripcionId: number): Observable<Prescripcion> {
    return this.http.get<Prescripcion>(`${this.baseUrl}/${prescripcionId}`);
  }

  obtenerPorPaciente(nombre: string): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(`${this.baseUrl}/paciente/${encodeURIComponent(nombre)}`);
  }

  obtenerPorMedico(nombrePrescriptor: string): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(`${this.baseUrl}/medico/${encodeURIComponent(nombrePrescriptor)}`);
  }
  crearPrescripcion(nhPaciente: string, prescripcion: Prescripcion): Observable<Prescripcion> {
    return this.http.post<Prescripcion>(`${this.baseUrl}/crear?nhPaciente=${encodeURIComponent(nhPaciente)}`, prescripcion);
  }

}
