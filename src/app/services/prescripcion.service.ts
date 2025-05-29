import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescripcion } from '../models/Prescripcion';

@Injectable({
  providedIn: 'root',
})
export class PrescripcionService {
  private apiUrl = 'http://localhost:8080/api/prescripciones';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Prescripcion[]> {
    return this.http.get<Prescripcion[]>(this.apiUrl);
  }

  añadir(prescripcion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, prescripcion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
