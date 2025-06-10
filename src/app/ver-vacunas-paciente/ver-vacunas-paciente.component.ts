import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacunasService } from '../services/vacunas.service';
import { AuthService } from '../services/auth.service';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-vacunas-paciente',
  standalone: true,
  imports: [IonicModule, CommonModule, MenuSuperiorComponent, RouterLink],
  templateUrl: './ver-vacunas-paciente.component.html',
  styleUrls: ['./ver-vacunas-paciente.component.scss']
})
export class VerVacunasPacienteComponent implements OnInit {
  vacunas: any[] = [];
  nhPaciente!: string;
  pacienteId!: number;
  usernameMedico!: string;

  constructor(
    private route: ActivatedRoute,
    private vacunasService: VacunasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerUsernameMedicoDesdeToken();
    this.nhPaciente = this.route.snapshot.paramMap.get('nhPaciente')!;
    this.vacunasService.infoPaciente(this.nhPaciente, this.usernameMedico).subscribe(paciente => {
      this.pacienteId = paciente.id;
      this.cargarVacunas();
    });
  }

  obtenerVacunasPorId(id: number): void {
    this.vacunasService.obtenerVacunaPorId(id).subscribe(
      vacuna => {
        console.log('Vacuna obtenida por ID:', vacuna);
      },
      error => {
        console.error('Error al obtener la vacuna por ID:', error);
      }
    );
  }

  obtenerUsernameMedicoDesdeToken(): void {
    this.usernameMedico = this.authService.getUsernameFromToken();
    console.log('usernameMedico obtenido desde el token:', this.usernameMedico);
  }

  cargarVacunas(): void {
    this.vacunasService.obtenerVacunasDePaciente(this.pacienteId).subscribe(
      vacunas => {
        this.vacunas = vacunas;
        console.log('Vacunas del paciente:', this.vacunas);
      },
      error => {
        console.error('Error al cargar las vacunas del paciente:', error);
      }
    );
  }

  eliminarVacuna(vacunaPacienteId: number): void {
    this.vacunasService.eliminarVacunaDePaciente(vacunaPacienteId).subscribe({
      next: () => {
        this.vacunas = this.vacunas.filter(v => v.id !== vacunaPacienteId);
      },
      error: err => {
        if (err.status === 200) {
          this.vacunas = this.vacunas.filter(v => v.id !== vacunaPacienteId);
        } else {
          console.error('Error real al eliminar la vacuna:', err);
        }
      }
    });
  }
}
