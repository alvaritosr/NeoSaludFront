import { Component } from '@angular/core';
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { IonicModule, MenuController } from "@ionic/angular";
import { MedicoService } from '../services/medico.service';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NgForOf } from "@angular/common";
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    MenuSuperiorComponent,
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
    sexo: '',
    direccion: '',
    telefono: '',
    email: '',
  };

  cardId: string | null = null;

  constructor(
    private pacienteService: MedicoService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastErrorService: ToastErrorService
  ) {}

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
    this.cardId = this.route.snapshot.paramMap.get('cardId');
  }

  buscarPacientes() {
    const filteredParams = Object.fromEntries(
      Object.entries(this.searchParams).filter(([_, value]) => value)
    );
    this.pacienteService.buscarPacientes(filteredParams).subscribe(
      (data) => {
        this.pacientes = data;
      },
      (error) => {
        this.toastErrorService.presentToast('Error al buscar pacientes', 3000);
      }
    );
  }

  selectPaciente(paciente: any) {
    this.selectedPaciente = paciente;
  }

  verDetallePaciente() {
    if (!this.selectedPaciente) {
      this.toastErrorService.presentToast('Selecciona un paciente antes de continuar', 3000);
      return;
    }
    if (this.cardId) {
      switch (this.cardId) {
        case 'consultas':
          this.router.navigate(['/medical-appointment'], { queryParams: { nh: this.selectedPaciente.nh } });
          break;
        case 'historial-salud':
          this.router.navigate(['/heal-history'], { queryParams: { nh: this.selectedPaciente.nh } });
          break;
        case 'prescripciones':
          this.router.navigate(['/prescripciones'], { queryParams: { nh: this.selectedPaciente.nh } });
          break;
        case 'telederma':
          this.router.navigate(['/telederma'], { queryParams: { nh: this.selectedPaciente.nh } });
          break;
        case 'vacunas':
          this.router.navigate(['/vacunas'], { queryParams: { nh: this.selectedPaciente.nh } });
          break;
        case 'visados':
          this.router.navigate(['/visados'], { queryParams: { nh: this.selectedPaciente.nh } });
          break;
        case 'visorHCDM':
          this.router.navigate(['/hcdm-visor', this.selectedPaciente.id, this.selectedPaciente.nombre, this.selectedPaciente.primerApellido, this.selectedPaciente.segundoApellido]);
          break;
        case 'visorPACS':
          this.router.navigate(['/visor-dicom', this.selectedPaciente.id, this.selectedPaciente.nombre, this.selectedPaciente.primerApellido, this.selectedPaciente.segundoApellido]);
          break;
        default:
          this.toastErrorService.presentToast('Destino no definido para el cardId', 3000);
      }
    }
  }

  cancelarBusqueda() {
    this.searchParams = {
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      dni: '',
      pasaporte: '',
      nuss: '',
      nh: '',
      nuhsa: '',
      anyoNacimiento: '',
      sexo: '',
      direccion: '',
      telefono: '',
      email: '',
    };

    this.pacientes = [];
  }

  crearPaciente() {
    const paciente = {
      nombre: this.searchParams.nombre,
      primerApellido: this.searchParams.primerApellido,
      segundoApellido: this.searchParams.segundoApellido,
      anyoNacimiento: this.searchParams.anyoNacimiento,
      dni: this.searchParams.dni,
      pasaporte: this.searchParams.pasaporte,
      nuss: this.searchParams.nuss,
      nh: this.searchParams.nh,
      nuhsa: this.searchParams.nuhsa,
      fecha: this.searchParams.anyoNacimiento,
      sexo: this.searchParams.sexo,
      direccion: this.searchParams.direccion,
      telefono: this.searchParams.telefono,
      email: this.searchParams.email,
    };

    this.pacienteService.crearPaciente(this.nombreMedico, paciente).subscribe(
      (response) => {
        this.searchParams = {
          nombre: '',
          primerApellido: '',
          segundoApellido: '',
          dni: '',
          pasaporte: '',
          nuss: '',
          nh: '',
          nuhsa: '',
          anyoNacimiento: '',
          sexo: '',
          direccion: '',
          telefono: '',
          email: '',
        };
      },
      (error) => {
        this.toastErrorService.presentToast('Error al crear paciente', 3000);
      }
    );
  }
}
