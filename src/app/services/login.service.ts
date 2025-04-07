import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../Hunt2HandFront/src/environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Login} from "../../../../Hunt2HandFront/src/app/modelos/Login";
import {Registro} from "../../../../Hunt2HandFront/src/app/modelos/Registro";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authState = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();


  constructor(private http: HttpClient) {}

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  login(loginData: Login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`/api/auth/login`, loginData);
  }

  register(registro: Registro): Observable<any> {
    return this.http.post<any>(`/api/auth/registro`, registro);
  }
}
