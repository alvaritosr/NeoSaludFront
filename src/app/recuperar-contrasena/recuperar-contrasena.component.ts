import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RecuperarContrasenaService } from '../services/recuperar-contrasena.service';

function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { notMatching: true };
}

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class RecuperarContrasenaComponent implements OnInit {
  restablecerForm: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recuperarService: RecuperarContrasenaService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.restablecerForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit(): void {
    if (this.restablecerForm.valid && this.token) {
      const data = {
        token: this.token,
        newPassword: this.restablecerForm.get('password')?.value
      };
      this.recuperarService.restablecerContrasena(data).subscribe({
        next: () => {
          this.presentAlert('Contraseña restablecida correctamente.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.presentAlert('El token no es válido o ya fue usado dos veces.');
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
