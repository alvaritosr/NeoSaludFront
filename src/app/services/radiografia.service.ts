import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import * as cornerstone from 'cornerstone-core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RadiografiaService {
  private baseUrl = environment.apiUrl;



  constructor(private http: HttpClient) { }

  obtenerRadiografiasPorPaciente(pacienteId?: number): Observable<any[]> {
    console.log("Fetching radiographs for patient ID:", pacienteId);
    return this.http.get<any[]>(`${this.baseUrl}/radiografia/paciente/${pacienteId}`);
  }

  getStudyDescription(nombreArchivo: string): Observable<string> {
    const imageId = `wadouri:/${this.baseUrl}/radiografia/dicom/${nombreArchivo}`;

    return from<string>(
      cornerstone.loadImage(imageId).then((image: any) => {
        const dataSet = image.data;
        const studyDescription = dataSet.string('x00081030') || 'Sin descripción';
        return studyDescription;
      }).catch(() => 'Sin descripción')
    );
  }

  cargarDicomImage(nombreArchivo: string): Observable<any> {
    const imageId = `wadouri:/${this.baseUrl}/radiografia/dicom/${nombreArchivo}`;
    return from(cornerstone.loadImage(imageId));
  }
}
