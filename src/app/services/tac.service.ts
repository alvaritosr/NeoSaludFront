import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, Observable, of, switchMap} from "rxjs";
import {Tac} from "../models/tac";
import * as cornerstone from 'cornerstone-core';

@Injectable({
  providedIn: 'root'
})
export class TacService {
  constructor(private http: HttpClient) {}

  getTacsByPaciente(pacienteId?: number): Observable<Tac[]> {
    return this.http.get<Tac[]>(`/api/tac/paciente/${pacienteId}`);
  }

  getDicomFilesByCarpeta(nombreCarpeta?: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/tac/estudio/${nombreCarpeta}`);
  }

  getStudyDescription(nombreCarpeta: string | undefined): Observable<string> {
    return this.getDicomFilesByCarpeta(nombreCarpeta).pipe(
      switchMap((files: any[]) => {
        if (files.length > 0) {
          const firstFileName = files[0].fileName;
          const imageId = `wadouri:http://localhost:5433/tac/${nombreCarpeta}/${firstFileName}`;

          return from<string>(cornerstone.loadImage(imageId).then((image: any) => {
            const dataSet = image.data;
            const studyDescription = dataSet.string('x00081030') || 'Sin descripción';
            return studyDescription;
          }));
        } else {
          return of('Sin imágenes');
        }
      })
    );
  }

}
