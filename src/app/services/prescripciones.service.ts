import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescripcion } from '../models/Prescripcion';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PrescripcionesService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPrescriptions(): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(`${this.baseUrl}/prescripciones`);
  }

  createPrescription(prescripcion: Prescripcion): Observable<Prescripcion> {
    return this.http.post<Prescripcion>(`${this.baseUrl}/prescripciones`, prescripcion);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/prescripciones/${id}`);
  }
}
