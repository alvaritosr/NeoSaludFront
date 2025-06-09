import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescripcion } from '../models/Prescripcion';

@Injectable({
  providedIn: 'root'
})
export class PrescripcionesService {
  private apiUrl = 'http://localhost:5433/api/prescripciones';

  constructor(private http: HttpClient) {}

  getPrescriptions(): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(this.apiUrl);
  }

  createPrescription(prescripcion: Prescripcion): Observable<Prescripcion> {
    return this.http.post<Prescripcion>(this.apiUrl, prescripcion);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
