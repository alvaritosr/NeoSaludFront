// prescripciones.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PrescripcionesService } from '../services/prescripciones.service'; // Ajusta la ruta
import { Prescripcion } from '../models/Prescripcion';
import { IonicModule} from "@ionic/angular";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-prescripciones',
  templateUrl: './prescripciones.component.html',
  imports: [
    IonicModule,
    ReactiveFormsModule,
    NavbarComponent
  ],
  styleUrls: ['./prescripciones.component.scss']
})
export class PrescripcionesComponent implements OnInit {
  prescripcionForm: FormGroup;
  prescripciones: Prescripcion[] = [];

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescripcionesService
  ) {
    this.prescripcionForm = this.fb.group({
      nombreGenerico: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      concentracion: ['', Validators.required],
      formaFarmaceutica: ['', Validators.required],
      viaAdministracion: ['', Validators.required],
      dosis: ['', Validators.required],
      frecuencia: ['', Validators.required],
      duracionDias: [null, [Validators.required, Validators.min(1)]],
      cantidadEnvases: [null, [Validators.required, Validators.min(1)]],
      nombrePrescriptor: ['', Validators.required],
      numeroColegiado: ['', Validators.required],
      especialidad: ['', Validators.required],
      contactoPrescriptor: ['', Validators.required],
      indicacionesEspecificas: [''],
      notasAdicionales: ['']
    });
  }

  ngOnInit(): void {
    this.cargarPrescripciones();
  }

  cargarPrescripciones(): void {
    this.prescriptionService.getPrescriptions().subscribe({
      next: (data: Prescripcion[]) => this.prescripciones = data,
      error: (error: Error) => console.error('Error al cargar prescripciones:', error)
    });
  }

  onSubmit(): void {
    if (this.prescripcionForm.valid) {
      const formValue = this.prescripcionForm.value;
      const prescripcion: Prescripcion = {
        ...formValue,
        fechaEmision: new Date().toISOString(),
        lugarEmision: 'Hospital',
        firmaDigital: 'firma-digital',
        paciente: {
          id: 1 // Asegúrate de tener un ID válido de paciente
        }
      };

      this.prescriptionService.createPrescription(prescripcion).subscribe({
        next: (nuevaPrescripcion: Prescripcion) => {
          this.prescripciones.push(nuevaPrescripcion);
          this.prescripcionForm.reset();
        },
        error: (error: Error) => console.error('Error al crear prescripción:', error)
      });
    }
  }

  eliminarPrescripcion(id: number): void {
    this.prescriptionService.deletePrescription(id).subscribe({
      next: () => {
        this.prescripciones = this.prescripciones.filter(p => p.id !== id);
      },
      error: (error: Error) => console.error('Error al eliminar prescripción:', error)
    });
  }
}
