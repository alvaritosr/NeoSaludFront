import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescripcion } from '../models/Prescripcion';
import { IonicModule} from "@ionic/angular";

@Injectable({
  providedIn: 'root',
})
export class PrescripcionService {
  private apiUrl = 'http://localhost:5433/prescripciones/';

  constructor(private http: HttpClient) {}

  getPrescripcion(id: string): Observable<Prescripcion> {
    return this.http.get<Prescripcion>(`${this.apiUrl}${id}`);
  }
}
