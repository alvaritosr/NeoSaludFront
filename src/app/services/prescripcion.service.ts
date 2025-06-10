import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescripcion } from '../models/Prescripcion';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PrescripcionService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(`${this.baseUrl}/prescripciones`);
  }

  obtenerPorId(prescripcionId: number): Observable<Prescripcion> {
    return this.http.get<Prescripcion>(`${this.baseUrl}/prescripciones/${prescripcionId}`);
  }

  obtenerPorPaciente(nombre: string): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(`${this.baseUrl}/prescripciones/paciente/${encodeURIComponent(nombre)}`);
  }

  obtenerPorMedico(nombrePrescriptor: string): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(`${this.baseUrl}/prescripciones/medico/${encodeURIComponent(nombrePrescriptor)}`);
  }
  crearPrescripcion(nhPaciente: string, prescripcion: Prescripcion): Observable<Prescripcion> {
    return this.http.post<Prescripcion>(`${this.baseUrl}/prescripciones/crear?nhPaciente=${encodeURIComponent(nhPaciente)}`, prescripcion);
  }

}
