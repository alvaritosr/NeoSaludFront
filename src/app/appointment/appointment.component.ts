import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";
import {jsPDF} from "jspdf";
import {AuthService} from "../services/auth.service";
import {MedicoService} from "../services/medico.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  providers: [DatePipe],
  imports: [
    IonicModule,
    MenuSuperiorComponent,
    FormsModule
  ]
})
export class AppointmentComponent  implements OnInit {
  consulta: any;
  nombreMedico: string = '';

  constructor(private authService: AuthService, private medicoService: MedicoService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
    this.loadConsultaDetails();
  }

  loadConsultaDetails() {
    const nh = this.route.snapshot.paramMap.get('nh');
    const idConsulta = Number(this.route.snapshot.paramMap.get('id'));

    if (nh && idConsulta && this.nombreMedico) {
      this.medicoService.verDetalleConsulta(nh, idConsulta, this.nombreMedico).subscribe(
        (data) => {
          if (data && data.fechaConsulta) {
            this.consulta = data;
            this.consulta.fechaConsulta = this.datePipe.transform(this.consulta.fechaConsulta, 'dd/MM/yyyy');
            this.consulta.horaConsulta = this.datePipe.transform(this.consulta.fechaConsulta, 'HH:mm');
          } else {
            console.error('La consulta no contiene datos válidos o fechaConsulta está ausente.');
          }
        },
        (error) => {
          console.error('Error al cargar los detalles de la consulta:', error);
        }
      );
    } else {
      console.error('Faltan datos para cargar los detalles de la consulta.');
    }
  }

  modificarConsulta() {
    const nh = this.route.snapshot.paramMap.get('nh');
    const idConsulta = Number(this.route.snapshot.paramMap.get('id'));

    if (nh && idConsulta && this.consulta) {
      this.medicoService.modificarConsulta(nh, idConsulta, this.consulta).subscribe(
        (updatedConsulta) => {
          this.consulta = updatedConsulta;
        },
        (error) => {
          console.error('Error al modificar la consulta:', error);
        }
      );
    } else {
      console.error('Faltan datos para modificar la consulta.');
    }
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
}
