// src/app/recuperar-contrasena/recuperar-contrasena.component.ts
import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/recuperar-contrasena.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, RouterLink, HttpClientModule, CommonModule]
})
export class RecuperarContrasenaComponent implements OnInit {
  restablecerForm: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private recuperarService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.restablecerForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      console.log('Token recibido:', this.token);

      if (!this.token || this.token.trim() === '') {
        this.presentAlert('No se encontró un token válido en la URL');
        this.router.navigate(['/login']);
        return;
      }

      try {
        this.token = decodeURIComponent(this.token);
        console.log('Token decodificado:', this.token);
      } catch (e) {
        console.error('Error al decodificar el token:', e);
        this.presentAlert('El token proporcionado no es válido');
        this.router.navigate(['/login']);
      }
    });
  }
  private passwordMatchValidator = (group: FormGroup) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit(): void {
    if (this.restablecerForm.valid && this.token) {
      const data = {
        token: this.token.trim(),
        newPassword: this.restablecerForm.get('password')?.value
      };

      console.log('Datos enviados al servidor:', data);

      this.recuperarService.restablecerContrasena(data).subscribe({
        next: () => {
          this.presentAlert('Contraseña restablecida con éxito');
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          let mensaje = 'Ha ocurrido un error al restablecer la contraseña';
          if (error.status === 400) {
            mensaje = error.error || 'El token no es válido o ha expirado. Verifica que el token y la contraseña sean correctos.';
          } else if (error.status === 500) {
            mensaje = 'Error interno del servidor. Intenta nuevamente más tarde.';
          } else {
            mensaje = `Error inesperado: ${error.message}`;
          }
          this.presentAlert(mensaje);
          console.error('Error completo:', error);
          console.error('Respuesta del servidor:', error.error);
        }
      });
    } else {
      this.presentAlert('Por favor, completa todos los campos correctamente.');
    }
  }

  async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Información',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
