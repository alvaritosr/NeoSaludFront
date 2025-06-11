import { Component, OnInit } from '@angular/core';
import { PrescripcionService } from '../services/prescripcion.service';
import { Prescripcion } from '../models/Prescripcion';
import { IonicModule, AlertController } from "@ionic/angular";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";

@Component({
  selector: 'app-prescripciones',
  templateUrl: './prescripciones.component.html',
  imports: [
    IonicModule,
    ReactiveFormsModule,
    MenuSuperiorComponent
  ],
  styleUrls: ['./prescripciones.component.scss']
})
export class PrescripcionesComponent implements OnInit {
  prescripciones: Prescripcion[] = [];
  prescripcionSeleccionada: Prescripcion | null = null;
  mensajeError: string = '';
  prescripcionForm!: FormGroup;
  nhPaciente!: string;

  constructor(
    private prescripcionService: PrescripcionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.nhPaciente = params.get('nh') || '';
    });

    this.prescripcionForm = this.formBuilder.group({
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
      duracionDias: ['', [Validators.required, Validators.min(1)]],
      cantidadEnvases: ['', [Validators.required, Validators.min(1)]],
      lugarEmision: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      indicacionesEspecificas: ['', Validators.required],
      notasAdicionales: ['']
    });

    this.obtenerTodas();
  }

  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'La prescripción se ha guardado correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  onSubmit(): void {
    if (this.prescripcionForm.valid) {
      const prescripcion = {
        ...this.prescripcionForm.value,
        fechaEmision: new Date(this.prescripcionForm.value.fechaEmision).toISOString()
      };

      this.prescripcionService.crearPrescripcion(this.nhPaciente, prescripcion).subscribe({
        next: async (data) => {
          this.obtenerTodas();
          await this.mostrarAlertaExito();
        },
        error: (err) => {
          console.error('Error al enviar la prescripción:', err);
        }
      });
    } else {
      console.error('El formulario no es válido');
    }
  }

  obtenerTodas(): void {
    this.prescripcionService.obtenerTodas().subscribe({
      next: (data) => {
        this.prescripciones = data;
      },
      error: (err) => {
        this.mensajeError = 'Error al obtener las prescripciones';
        console.error(err);
      }
    });
  }

  obtenerPorId(id: number): void {
    this.prescripcionService.obtenerPorId(id).subscribe({
      next: (data) => {
        this.prescripcionSeleccionada = data;
      },
      error: (err) => {
        this.mensajeError = `Error al obtener la prescripción con ID ${id}`;
        console.error(err);
      }
    });
  }

  obtenerPorPaciente(nombre: string): void {
    this.prescripcionService.obtenerPorPaciente(nombre).subscribe({
      next: (data) => {
        this.prescripciones = data;
      },
      error: (err) => {
        this.mensajeError = `Error al obtener las prescripciones del paciente ${nombre}`;
        console.error(err);
      }
    });
  }

  obtenerPorMedico(nombrePrescriptor: string): void {
    this.prescripcionService.obtenerPorMedico(nombrePrescriptor).subscribe({
      next: (data) => {
        this.prescripciones = data;
      },
      error: (err) => {
        this.mensajeError = `Error al obtener las prescripciones del médico ${nombrePrescriptor}`;
        console.error(err);
      }
    });
  }

  navigateToVerPrescripciones(): void {
    this.router.navigate(['/ver-prescripciones']);
  }

  crearPrescripcion(nhPaciente: string, prescripcion: Prescripcion): void {
    const prescripcionFormateada = {
      ...prescripcion,
      fechaEmision: new Date(prescripcion.fechaEmision).toISOString()
    };

    this.prescripcionService.crearPrescripcion(nhPaciente, prescripcionFormateada).subscribe({
      next: async (data) => {
        this.prescripcionSeleccionada = data;
        this.obtenerTodas();
        await this.mostrarAlertaExito();
      },
      error: (err) => {
        this.mensajeError = 'Error al crear la prescripción';
        console.error(err);
      }
    });
  }
}
