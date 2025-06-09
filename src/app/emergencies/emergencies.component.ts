import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from "@ionic/angular";
import { addIcons } from "ionicons";
import { calendar } from "ionicons/icons";
import { MenuSuperiorComponent } from "../menu-superior/menu-superior.component";
import { AuthService } from "../services/auth.service";
import { MedicoService } from "../services/medico.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-emergencies',
  templateUrl: './emergencies.component.html',
  styleUrls: ['./emergencies.component.scss'],
  providers: [DatePipe],
  imports: [
    IonicModule,
    MenuSuperiorComponent,
    FormsModule,
    NgForOf
  ]
})
export class EmergenciesComponent implements OnInit {
  nombreMedico: string = '';
  consultas: any[] = [];
  medicos: any[] = [];
  paciente: any;
  showDatePicker: boolean = false;
  selectedDate: string = new Date().toISOString();

  constructor(
    private authService: AuthService,
    private medicoService: MedicoService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    addIcons({
      'calendar': calendar
    });
  }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
    this.cargarMedicos();
    this.fetchConsultas();
  }

  cargarMedicos() {
    this.medicoService.obtenerMedicos().subscribe(
      (data) => {
        this.medicos = data;
      },
      (error) => {
        console.error('Error al cargar la lista de médicos:', error);
      }
    );
  }

  generarPDF(consulta: any) {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(16);
    doc.text("Junta de Andalucía", pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text("Justificante de Consulta Médica", pageWidth / 2, 30, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Fecha: ${consulta.fechaConsulta}`, 50, 50);
    doc.text(`Hora: ${consulta.horaConsulta}`, 110, 50);
    doc.text(`Paciente: ${consulta.paciente.nombre + " " + consulta.paciente.primerApellido + " " + consulta.paciente.segundoApellido}`, 50, 60);
    doc.text(`NUHSA: ${consulta.paciente.nuhsa}`, 110, 60);
    doc.text(`Motivo: ${consulta.motivoConsulta || "No especificado"}`, 50, 70);
    doc.text(`Observaciones: ${consulta.observaciones || "No especificado"}`, 110, 70);
    doc.text(`Profesional: ${this.nombreMedico}`, 50, 80);

    doc.setFontSize(12);
    doc.text("Sello:", 45, 110);

    doc.text("Firma Medico:", 135, 110);


    doc.save(`Justificante_Consulta_${consulta.paciente.nh}.pdf`);
  }

  cambiarMedico(consulta: any, nuevoUsernameMedico: string) {
    const nh = consulta.paciente.nuhsa; // Cambiar a consulta.paciente.nuhsa si es el identificador correcto

    if (!nh || !nuevoUsernameMedico) {
      console.error('Faltan datos para cambiar el médico.');
      return;
    }

    this.medicoService.cambiarMedicoDePaciente(nh, nuevoUsernameMedico).subscribe(
      (data) => {
        console.log('Médico cambiado exitosamente:', data);
        this.fetchConsultas(); // Actualiza la lista de consultas después del cambio
      },
      (error) => {
        console.error('Error al cambiar el médico:', error);
      }
    );
  }

  anadirConsulta() {
    const nh = (document.querySelector('ion-input[name="nh"]') as HTMLInputElement)?.value;
    const usernameMedico = this.nombreMedico;
    const motivoConsulta = null;
    const observaciones = null;

    if (nh && observaciones && this.selectedDate) {
      const nuevaConsulta = {
        fechaConsulta: this.selectedDate,
        motivoConsulta: motivoConsulta,
        observaciones: observaciones,
      };
      this.medicoService.crearConsulta(nh, nuevaConsulta, usernameMedico).subscribe(
        (data) => {
          this.consultas.push(data);
        },
        (error) => {
          console.error('Error al añadir consulta:', error);
        }
      );
    } else {
      console.error('Faltan datos para añadir la consulta.');
    }
  }

  openDatePicker() {
    this.showDatePicker = true;
  }

  closeDatePicker() {
    this.showDatePicker = false;
  }

  onDateSelected(event: any) {
    const selectedDate = event.detail.value;
    console.log('Fecha seleccionada:', selectedDate);
    this.selectedDate = selectedDate;
    this.closeDatePicker();
  }

  fetchConsultas() {
    this.medicoService.verTodasLasConsultas().subscribe(
      (data) => {
        const today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
        this.consultas = data
          .map(consulta => ({
            ...consulta,
            fechaConsulta: this.datePipe.transform(consulta.fechaConsulta, 'dd/MM/yyyy'),
            horaConsulta: this.datePipe.transform(consulta.fechaConsulta, 'HH:mm')
          }))
          .filter(consulta => consulta.fechaConsulta === today);
      },
      (error) => {
        console.error('Error al obtener las consultas:', error);
      }
    );
  }

  navigateToAppointment(nh: String, appointmentId: number): void {
    this.router.navigate(['/appointment', nh, appointmentId]);
  }
}
