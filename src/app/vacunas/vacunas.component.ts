import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VacunasService } from '../services/vacunas.service';
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import {ActivatedRoute, RouterLink} from '@angular/router';
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
  private usernameMedico: string = '';

  constructor(private vacunasService: VacunasService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerNhDesdeUrl();
    this.obtenerTodasLasVacunas();
    this.obtenerUsernameMedicoDesdeToken();
  }

  obtenerNhDesdeUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.nhPaciente = params['nh'] || '';
      console.log('nhPaciente obtenido desde la URL:', this.nhPaciente);
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
    console.log('usernameMedico obtenido desde el token:', this.usernameMedico);
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
        console.log('Información del paciente:', data);
      },
      error: (err) => console.error('Error al obtener información del paciente:', err)
    });
  }

  selectVacuna(vacunaId: number): void {
    this.vacunaId = vacunaId;
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
      return;
    }

    this.vacunasService.infoPaciente(nhPacienteString, usernameMedico).subscribe({
      next: (data) => {
        this.pacienteId = data.id;
        // Imprime los datos enviados
        console.log('Datos enviados a asignarVacuna:', {
          pacienteId: this.pacienteId,
          vacunaId: this.vacunaId,
          dosis: this.dosis,
          fechaAplicacion: fechaAplicacion
        });
        this.vacunasService.asignarVacuna(this.pacienteId, this.vacunaId, this.dosis, fechaAplicacion).subscribe({
          next: (response) => console.log('Vacuna asignada exitosamente:', response),
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
      next: (response) => {
        console.log('Vacuna creada exitosamente:', response);
        this.obtenerTodasLasVacunas();
      },
      error: (err) => console.error('Error al crear la vacuna:', err)
    });
  }
}
