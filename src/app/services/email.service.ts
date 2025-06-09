import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  enviarCorreo(destinatario: string, asunto: string, contenido: string): Observable<any> {
    const params = new HttpParams()
      .set('destinatario', destinatario)
      .set('asunto', asunto)
      .set('contenido', contenido);

    return this.httpClient.post('/api/email/enviar', null, { params, responseType: 'text' });
  }
}
