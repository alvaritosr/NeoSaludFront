import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonImg,
  IonInput,
  IonList,
  IonRouterOutlet,
  IonText,
  IonTextarea
} from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";
import { EmailService } from "../services/email.service";
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // <- ✅ aquí es donde realmente está

@Component({
  selector: 'app-enviar-correo',
  templateUrl: './enviar-correo.component.html',
  styleUrls: ['./enviar-correo.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    ReactiveFormsModule,
    IonList,
    IonText,
    IonInput,
    IonTextarea,
    IonButton,
    MenuSuperiorComponent,
    IonRouterOutlet
  ]
})
export class EnviarCorreoComponent implements OnInit {

  correoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private alertController: AlertController,  // <- ✅ corregido aquí también
    private router: Router
  ) {
    this.correoForm = this.fb.group({
      destinatario: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  ngOnInit() {}

  enviarCorreo() {
    if (this.correoForm.valid) {
      const { destinatario, asunto, contenido } = this.correoForm.value;

      this.emailService.enviarCorreo(destinatario, asunto, contenido).subscribe({
        next: async () => {
          const alert = await this.alertController.create({
            header: 'Correo enviado',
            message: 'El correo se ha enviado correctamente.',
            buttons: [{
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/chats-selector']);
              }
            }]
          });
          await alert.present();
        },
        error: async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo enviar el correo. Inténtalo de nuevo.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });

    } else {
      console.warn('Formulario no válido');
    }
  }
}
