import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrescripcionService } from '../services/prescripcion.service';
import { Prescripcion } from '../models/Prescripcion';
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-prescripciones',
  templateUrl: './prescripciones.component.html',
  styleUrls: ['./prescripciones.component.scss'],
  imports: [IonicModule, ReactiveFormsModule]
})
export class PrescripcionesComponent implements OnInit {
  prescripcionForm: FormGroup;
  prescripciones: Prescripcion[] = [];

  constructor(private fb: FormBuilder, private prescripcionService: PrescripcionService) {
    this.prescripcionForm = this.fb.group({
      nombrePrescriptor: ['', Validators.required],
      numeroColegiado: ['', Validators.required],
      especialidad: ['', Validators.required],
      firmaDigital: ['', Validators.required],
      contactoPrescriptor: ['', Validators.required],
      nombreGenerico: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      concentracion: ['', Validators.required],
      formaFarmaceutica: ['', Validators.required],
      viaAdministracion: ['', Validators.required],
      dosis: ['', Validators.required],
      frecuencia: ['', Validators.required],
      duracionDias: [0, [Validators.required, Validators.min(1)]],
      cantidadEnvases: [0, [Validators.required, Validators.min(1)]],
      lugarEmision: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      indicacionesEspecificas: ['', Validators.required],
      notasAdicionales: [''],
    });
  }

  ngOnInit(): void {
    this.cargarPrescripciones();
  }

  cargarPrescripciones(): void {
    this.prescripcionService.obtenerTodas().subscribe(
      (data) => {
        this.prescripciones = data;
      },
      (error) => {
        console.error('Error al cargar las prescripciones:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.prescripcionForm.valid) {
      const prescripcionConValoresHardcoded = {
        ...this.prescripcionForm.value,
        medico: { id: 1 }, // Estructura requerida para medico
        paciente: { id: 1 }, // Estructura requerida para paciente
        cantidadEnvases: this.prescripcionForm.value.cantidadEnvases || 1,
        concentracion: this.prescripcionForm.value.concentracion || '500mg',
        contactoPrescriptor: this.prescripcionForm.value.contactoPrescriptor || 'Sin contacto',
        dosis: this.prescripcionForm.value.dosis || '1 dosis',
        duracionDias: this.prescripcionForm.value.duracionDias || 7,
        especialidad: this.prescripcionForm.value.especialidad || 'General',
        fechaEmision: this.prescripcionForm.value.fechaEmision || new Date().toISOString().split('T')[0],
        firmaDigital: this.prescripcionForm.value.firmaDigital || 'Sin firma',
        formaFarmaceutica: this.prescripcionForm.value.formaFarmaceutica || 'Tableta',
        frecuencia: this.prescripcionForm.value.frecuencia || 'Cada 8 horas',
        indicacionesEspecificas: this.prescripcionForm.value.indicacionesEspecificas || 'Sin indicaciones',
        lugarEmision: this.prescripcionForm.value.lugarEmision || 'Hospital Central',
        nombreComercial: this.prescripcionForm.value.nombreComercial || 'Sin nombre comercial',
        nombreGenerico: this.prescripcionForm.value.nombreGenerico || 'Sin nombre genérico',
        nombrePrescriptor: this.prescripcionForm.value.nombrePrescriptor || 'Dr. Ejemplo',
        notasAdicionales: this.prescripcionForm.value.notasAdicionales || 'Sin notas adicionales',
        numeroColegiado: this.prescripcionForm.value.numeroColegiado || '0000',
        viaAdministracion: this.prescripcionForm.value.viaAdministracion || 'Oral'
      };

      console.log('Payload enviado:', prescripcionConValoresHardcoded);

      this.prescripcionService.añadir(prescripcionConValoresHardcoded).subscribe(
        (response) => {
          console.log('Prescripción añadida:', response);
          this.prescripciones.push(response);
          this.prescripcionForm.reset();
        },
        (error) => {
          console.error('Error al añadir la prescripción:', error);
        }
      );
    }
  }

  eliminarPrescripcion(id: number): void {
    this.prescripcionService.eliminar(id).subscribe(
      () => {
        this.prescripciones = this.prescripciones.filter((p) => p.id !== id);
        console.log('Prescripción eliminada');
      },
      (error) => {
        console.error('Error al eliminar la prescripción:', error);
      }
    );
  }
}
