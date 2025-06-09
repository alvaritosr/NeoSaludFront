import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PrescripcionService } from '../services/prescripcion.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuSuperiorComponent } from '../menu-superior/menu-superior.component';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ver-prescripciones',
  templateUrl: './ver-prescripciones.component.html',
  styleUrls: ['./ver-prescripciones.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, MenuSuperiorComponent],
})
export class VerPrescripcionesComponent implements OnInit {
  prescripciones: any[] = [];

  constructor(
    private prescripcionService: PrescripcionService,
    private router: Router,
    private http: HttpClient
  ) {
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

  verPrescripcion(id: string): void {
    this.router.navigate(['/prescripcion-info', id]);
  }

  eliminarPrescripcion(id: number): void {
    const url = `http://localhost:5433/prescripciones/eliminar/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        this.prescripciones = this.prescripciones.filter((p) => p.id !== id);
        console.log('Prescripción eliminada correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar la prescripción:', err);
      },
    });
  }

  imprimirPrescripcion(prescripcion: any): void {
    const doc = new jsPDF();

    // Título principal
    doc.setFillColor(255, 230, 230); // fondo rosado claro
    doc.roundedRect(10, 10, 190, 277, 5, 5, 'F');

    doc.setFillColor(204, 0, 0); // rojo oscuro
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.rect(15, 15, 180, 10, 'F');
    doc.text('Información de la Prescripción', 105, 22, {align: 'center'});

    // === Datos del Prescriptor ===
    doc.setFillColor(153, 0, 0);
    doc.rect(15, 30, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Datos del Prescriptor', 20, 36);

    doc.setTextColor(0, 0, 0);
    autoTable(doc, {
      startY: 40,
      theme: 'plain',
      styles: {cellPadding: 1.5, fontSize: 10},
      columnStyles: {0: {cellWidth: 45}, 1: {cellWidth: 45}, 2: {cellWidth: 45}, 3: {cellWidth: 45}},
      body: [
        [
          {content: 'Nombre del Médico:', styles: {fontStyle: 'bold'}}, prescripcion.nombrePrescriptor,
          {content: 'Número de Colegiado:', styles: {fontStyle: 'bold'}}, prescripcion.numeroColegiado || 'N/A'
        ],
        [
          {content: 'Especialidad:', styles: {fontStyle: 'bold'}}, prescripcion.especialidad || 'N/A',
          {content: 'Firma Digital:', styles: {fontStyle: 'bold'}}, prescripcion.firmaDigital || 'N/A'
        ],
        [
          {content: 'Contacto del Prescriptor:', styles: {fontStyle: 'bold'}}, {
          content: prescripcion.contacto || 'N/A',
          colSpan: 3
        }
        ]
      ]
    });

    const prescriptorTableY = (doc as any).lastAutoTable.finalY;

    // === Datos del Fármaco ===
    doc.setFillColor(153, 0, 0);
    doc.rect(15, prescriptorTableY + 5, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Datos del Fármaco', 20, prescriptorTableY + 11);

    doc.setTextColor(0, 0, 0);
    autoTable(doc, {
      startY: prescriptorTableY + 15,
      theme: 'plain',
      styles: {cellPadding: 1.5, fontSize: 10},
      columnStyles: {0: {cellWidth: 45}, 1: {cellWidth: 45}, 2: {cellWidth: 45}, 3: {cellWidth: 45}},
      body: [
        [
          {content: 'Nombre Genérico:', styles: {fontStyle: 'bold'}}, prescripcion.nombreGenerico,
          {content: 'Nombre Comercial:', styles: {fontStyle: 'bold'}}, prescripcion.nombreComercial
        ],
        [
          {content: 'Concentración:', styles: {fontStyle: 'bold'}}, prescripcion.concentracion || 'N/A',
          {content: 'Forma Farmacéutica:', styles: {fontStyle: 'bold'}}, prescripcion.formaFarmaceutica || 'N/A'
        ],
        [
          {content: 'Vía de Administración:', styles: {fontStyle: 'bold'}}, prescripcion.viaAdministracion || 'N/A',
          {content: 'Dosis:', styles: {fontStyle: 'bold'}}, prescripcion.dosis
        ],
        [
          {content: 'Frecuencia:', styles: {fontStyle: 'bold'}}, prescripcion.frecuencia,
          {content: 'Duración (días):', styles: {fontStyle: 'bold'}}, prescripcion.duracionDias
        ],
        [
          {content: 'Cantidad de Envases:', styles: {fontStyle: 'bold'}}, prescripcion.cantidadEnvases || 'N/A', '', ''
        ]
      ]
    });

    const farmacoTableY = (doc as any).lastAutoTable.finalY;

    // === Datos de Emisión ===
    doc.setFillColor(153, 0, 0);
    doc.rect(15, farmacoTableY + 5, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('Datos de Emisión', 20, farmacoTableY + 11);

    doc.setTextColor(0, 0, 0);
    autoTable(doc, {
      startY: farmacoTableY + 15,
      theme: 'plain',
      styles: {cellPadding: 1.5, fontSize: 10},
      columnStyles: {0: {cellWidth: 45}, 1: {cellWidth: 45}, 2: {cellWidth: 45}, 3: {cellWidth: 45}},
      body: [
        [
          {content: 'Lugar de Emisión:', styles: {fontStyle: 'bold'}}, prescripcion.lugarEmision || 'N/A',
          {content: 'Fecha de Emisión:', styles: {fontStyle: 'bold'}}, prescripcion.fechaEmision || 'N/A'
        ],
        [
          {
            content: 'Indicaciones Específicas:',
            styles: {fontStyle: 'bold'}
          }, {content: prescripcion.indicaciones || 'N/A', colSpan: 3}
        ],
        [
          {
            content: 'Notas Adicionales:',
            styles: {fontStyle: 'bold'}
          }, {content: prescripcion.notasAdicionales || 'N/A', colSpan: 3}
        ]
      ]
    });

    doc.save(`Prescripcion_${prescripcion.id}.pdf`);
  }
}
