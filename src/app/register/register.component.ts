import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule, NgClass} from '@angular/common';

import {
  IonButton,
  IonContent,
  IonImg,
  IonInput,
  IonList, IonSelect, IonSelectOption,
  IonText
} from "@ionic/angular/standalone";
import {Registro} from "../models/Registro";
import {RegistroService} from "../services/registro.service";

export const comprobarPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('confirmarPassword');
  return password && confirmarPassword && password.value !== confirmarPassword.value ? { 'noCoinciden': true } : null;
}

@Component
({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports:
    [
      FormsModule,
      IonContent,
      IonImg,
      IonInput,
      IonList,
      IonText,
      ReactiveFormsModule,
      IonButton,
    ],
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent
{
  registroForm: FormGroup;
  registro: Registro = new Registro();
  usernameError: string | null = null;

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router, private alertController: AlertController) {
    this.registroForm = this.fb.group({
      colegiado: ['', Validators.required],
      username: [this.registro.username, Validators.required],
      password: [this.registro.password, Validators.required],
      confirmarPassword: ["", Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validator: comprobarPassword });
  }

  ngOnInit() {}

  doRegister() {
    if (this.registroForm.valid) {
      this.registro = { ...this.registro, ...this.registroForm.value };
      this.registroService.registrarUsuario(this.registro).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          this.registroForm.reset()
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error en el registro:', error);
          if (error.error.usernameExists) {
            this.usernameError = 'El nombre de usuario ya está registrado.';
          }
        }
      );
    } else {
      if (this.registroForm.errors?.['noCoinciden']) {
        console.error('Las contraseñas no coinciden');
      } else {
        console.error('Formulario inválido');
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
