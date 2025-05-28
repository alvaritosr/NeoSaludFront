import { Component } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import { MedicoService } from '../services/medico.service';
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    RouterLink
  ]
})
export class SelectUserComponent {
  nombreMedico: string = '';

  pacientes: any[] = [];
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
    this.pacienteService.buscarPacientes(this.searchParams).subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  verDetallePaciente(nh: string) {
    this.router.navigate(['/heal-history'], { queryParams: { nh } });
  }
}
