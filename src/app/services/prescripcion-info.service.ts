import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescripcion } from '../models/Prescripcion';
import { IonicModule} from "@ionic/angular";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PrescripcionService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPrescripcion(id: string): Observable<Prescripcion> {
    return this.http.get<Prescripcion>(`${this.baseUrl}/prescripciones/${id}`);
  }
}
