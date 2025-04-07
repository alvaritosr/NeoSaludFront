import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import { NgIf } from "@angular/common";
import {eye, eyeOff} from "ionicons/icons";
import {Registro} from "../models/Registro";
import {LoginService} from "../services/login.service";
import {ToastOkService} from "../services/toast-ok.service";
import {ToastErrorService} from "../services/toast-error.service";


import { Keyboard } from '@capacitor/keyboard';
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from '../services/auth.service';


@Component
({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:
  [
    IonicModule,
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./login.component.scss']
})

export class LoginComponent
{
  constructor(
    private loginService: LoginService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService,
    private authService: AuthService,
    private router: Router


  )
  {
    addIcons
    ({
      'eye-off': eyeOff,
      'eye': eye
    });
  }
  isRegistro: boolean = false;
  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  telefono: string = '';
  especialidad: string = '';
  numero_colegiado: number = 0;
  medicalCenter: string = '';
  passwordFieldType: string = 'password';


  togglePasswordVisibility()
  {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  login(): void {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.loginService.login(loginData).subscribe({
      next: response => {
        this.authService.setToken(response.token);
        this.loginService.setAuthState(true);
        this.toastOkService.presentToast('Sesión iniciada con éxito', 2000, 'ok');
        this.router.navigate(['/productos']);
        window.location.reload();
      },
      error: err => {
        this.toastErrorService.presentToast('Contraseña o usuario incorrecto', 2000, 'error');
      }
    });
  }


  cambioRegistro() {
    this.isRegistro = !this.isRegistro;
  }

  register(): void {
    const registro: Registro = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      username: this.username,
      password: this.password,
      telefono: this.telefono,
      especialidad: this.especialidad,
      numero_colegiado: this.numero_colegiado
    };

    this.loginService.register(registro).subscribe({
      next: () => {
        this.toastOkService.presentToast('Registro exitoso, active su cuenta desde email', 3000, 'ok');
        this.cambioRegistro();
      },
      error: err => {
        this.toastErrorService.presentToast('Error al registrarse', 3000, 'error');
      }
    });
  }
}
