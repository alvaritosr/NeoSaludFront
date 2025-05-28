import { Component } from '@angular/core';
import { IonicModule, MenuController } from "@ionic/angular";
import { MedicoService } from '../services/medico.service';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgForOf
  ]
})
export class SelectUserComponent {
  nombreMedico: string = '';
  pacientes: any[] = [];
  selectedPaciente: any = null;

  searchParams = {
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    dni: '',
    pasaporte: '',
    nuss: '',
    nh: '',
    nuhsa: '',
    anyoNacimiento: '',
    direccion: '',
    tipoDoc: '',
    provincia: ''
  };

  constructor(private pacienteService: MedicoService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
  }

  buscarPacientes() {
    const filteredParams = Object.fromEntries(
      Object.entries(this.searchParams).filter(([_, value]) => value)
    );
    console.log('Parámetros filtrados:', filteredParams);
    this.pacienteService.buscarPacientes(filteredParams).subscribe(
      (data) => {
        console.log('Pacientes encontrados:', data);
        this.pacientes = data;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  selectPaciente(paciente: any) {
    this.selectedPaciente = paciente;
  }

  verDetallePaciente() {
    if (this.selectedPaciente) {
      console.log('NH del paciente seleccionado:', this.selectedPaciente.nh);
      this.router.navigate(['/heal-history'], { queryParams: { nh: this.selectedPaciente.nh } });
    } else {
      console.error('No patient selected');
    }
  }
}
