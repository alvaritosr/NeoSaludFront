import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecuperarCuentaService } from '../services/recuperar-cuenta.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, RouterLink, HttpClientModule, CommonModule]
})
export class RecuperarCuentaComponent {
  recuperarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recuperarService: RecuperarCuentaService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      numeroColegiado: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.recuperarForm.valid) {
      const data = {
        email: this.recuperarForm.get('email')?.value,
        numeroColegiado: Number(this.recuperarForm.get('numeroColegiado')?.value)
      };

      this.recuperarService.recuperarContrasena(data).subscribe({
        next: () => {
          this.presentAlert('Se ha enviado un correo con las instrucciones para recuperar tu contraseña.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.presentAlert('Ha ocurrido un error. Por favor, intenta nuevamente.');
          console.error('Error:', error);
        }
      });
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
