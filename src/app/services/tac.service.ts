import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tac} from "../models/tac";

@Injectable({
  providedIn: 'root'
})
export class TacService {
  constructor(private http: HttpClient) {}

  getTacsByPaciente(pacienteId: number): Observable<Tac[]> {
    return this.http.get<Tac[]>(`/api/tac/paciente/${pacienteId}`);
  }
}
