import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { VacunasService } from '../services/vacunas.service';
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-vacunas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuSuperiorComponent,
    IonicModule,
    RouterLink
  ],
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.scss']
})
export class VacunasComponent implements OnInit {
  vacunas: any[] = [];
  vacuna = { nombre: '', descripcion: '' };
  nhPaciente = '';
  pacienteId = 0;
  vacunaId = 0;
  dosis = '';
  fechaAplicacion = '';
  selectedVacunaId: number | null = null;
  private usernameMedico: string = '';

  constructor(
    private vacunasService: VacunasService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.obtenerNhDesdeUrl();
    this.obtenerTodasLasVacunas();
    this.obtenerUsernameMedicoDesdeToken();
  }

  async mostrarAlertaExito(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  obtenerNhDesdeUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.nhPaciente = params['nh'] || '';
    });
  }

  obtenerTodasLasVacunas(): void {
    this.vacunasService.obtenerTodasLasVacunas().subscribe({
      next: (data) => (this.vacunas = data),
      error: (err) => console.error('Error al obtener vacunas:', err)
    });
  }

  obtenerUsernameMedicoDesdeToken(): void {
    this.usernameMedico = this.authService.getUsernameFromToken();
  }

  infoPaciente(): void {
    const nhPacienteString = this.nhPaciente?.trim();
    const usernameMedico = this.usernameMedico?.trim();

    if (!nhPacienteString || !usernameMedico) {
      console.error('nhPaciente o usernameMedico no están definidos correctamente.');
      return;
    }

    this.vacunasService.infoPaciente(nhPacienteString, usernameMedico).subscribe({
      next: (data) => {
        this.pacienteId = data.id;
      },
      error: (err) => console.error('Error al obtener información del paciente:', err)
    });
  }

  selectVacuna(vacunaId: number): void {
    this.selectedVacunaId = vacunaId;
  }

  asignarVacuna(): void {
    const nhPacienteString = this.nhPaciente?.trim();
    const usernameMedico = this.usernameMedico?.trim();
    const fechaAplicacion = this.fechaAplicacion?.trim();

    if (!nhPacienteString || !usernameMedico) {
      console.error('nhPaciente o usernameMedico no están definidos correctamente.');
      return;
    }
    if (!this.vacunaId || !this.dosis || !fechaAplicacion) {
      console.error('Faltan datos para asignar la vacuna.');
      console.log('Datos enviados a la vacuna:', {
        pacienteId: this.pacienteId,
        vacunaId: this.vacunaId,
        dosis: this.dosis,
        fechaAplicacion: fechaAplicacion
      })
      return;
    }

    this.vacunasService.infoPaciente(nhPacienteString, usernameMedico).subscribe({
      next: (data) => {
        this.pacienteId = data.id;
        console.log('Datos enviados a la vacuna:', {
          pacienteId: this.pacienteId,
          vacunaId: this.vacunaId,
          dosis: this.dosis,
          fechaAplicacion: fechaAplicacion
        });
        this.vacunasService.asignarVacuna(this.pacienteId, this.vacunaId, this.dosis, fechaAplicacion).subscribe({
          next: async (response) => {
            await this.mostrarAlertaExito('La vacuna se ha asignado correctamente.');
          },
          error: (err) => console.error('Error al asignar la vacuna:', err)
        });
      },
      error: (err) => console.error('Error al obtener información del paciente:', err)
    });
  }

  crearVacuna(): void {
    if (!this.vacuna.nombre || !this.vacuna.descripcion) {
      console.error('Faltan datos para crear la vacuna.');
      return;
    }

    this.vacunasService.crearVacuna(this.vacuna).subscribe({
      next: async (response) => {
        this.obtenerTodasLasVacunas();
        await this.mostrarAlertaExito('La vacuna se ha creado correctamente.');
      },
      error: (err) => console.error('Error al crear la vacuna:', err)
    });
  }
}
