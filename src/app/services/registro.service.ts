import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Registro} from "../models/Registro";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = environment.apiUrl;
  private authState = new BehaviorSubject<boolean>(!!sessionStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) { }

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  registrarUsuario(registro: Registro): Observable<any>{
    return this.http.post<any>(`/api/auth/registro`,registro) ;
  }
}
