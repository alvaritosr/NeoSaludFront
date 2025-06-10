import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VacunasService {
  private baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  obtenerVacunaPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/vacunas/${id}`);
  }

  obtenerTodasLasVacunas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vacunas`);
  }

  crearVacuna(vacuna: { nombre: string; descripcion: string }): Observable<any> {
    const url = `${this.baseUrl}/vacunas`;
    return this.http.post(url, vacuna);
  }

  actualizarVacuna(id: number, vacunaActualizada: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/vacunas/${id}`, vacunaActualizada);
  }

  eliminarVacuna(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/vacunas/${id}`);
  }


  infoPaciente(nhPaciente: string, usernameMedico: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/medicos/pacientes/${nhPaciente}?usernameMedico=${usernameMedico}`);
  }

  asignarVacuna(pacienteId: number, vacunaId: number, dosis: string, fecha: string): Observable<any> {
    const url = `${this.baseUrl}/vacunas/asignar`;
    const params = new HttpParams()
      .set('pacienteId', pacienteId.toString())
      .set('vacunaId', vacunaId.toString())
      .set('dosis', dosis)
      .set('fecha', fecha);

    return this.http.post(url, null, { params });
  }

  obtenerVacunasDePaciente(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vacunas/paciente/${pacienteId}`);
  }

  eliminarVacunaDePaciente(vacunaPacienteId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/vacunas/quitarVacuna/${vacunaPacienteId}`);
  }

}
