import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importar environment
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VacunasService {
  private apiUrl = 'http://localhost:5433/vacunas';
  private apiUrlPacientes = 'http://localhost:5433/medicos/pacientes';

  constructor(private http: HttpClient) {}

  obtenerVacunaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  obtenerTodasLasVacunas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearVacuna(vacuna: { nombre: string; descripcion: string }): Observable<any> {
    const url = `/api/vacunas`;
    return this.http.post(url, vacuna);
  }

  actualizarVacuna(id: number, vacunaActualizada: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vacunaActualizada);
  }

  eliminarVacuna(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }


  infoPaciente(nhPaciente: string, usernameMedico: string): Observable<any> {
    return this.http.get(`${this.apiUrlPacientes}/${nhPaciente}?usernameMedico=${usernameMedico}`);
  }

  asignarVacuna(pacienteId: number, vacunaId: number, dosis: string, fecha: string): Observable<any> {
    const url = `${this.apiUrl}/asignar`;
    const params = new HttpParams()
      .set('pacienteId', pacienteId.toString())
      .set('vacunaId', vacunaId.toString())
      .set('dosis', dosis)
      .set('fecha', fecha);

    return this.http.post(url, null, { params });
  }

  obtenerVacunasDePaciente(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paciente/${pacienteId}`);
  }

  eliminarVacunaDePaciente(vacunaPacienteId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/quitarVacuna/${vacunaPacienteId}`);
  }

}
