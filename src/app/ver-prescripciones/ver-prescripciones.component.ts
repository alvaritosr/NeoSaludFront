import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PrescripcionService } from '../services/prescripcion.service';

@Component({
  selector: 'app-ver-prescripciones',
  templateUrl: './ver-prescripciones.component.html',
  styleUrls: ['./ver-prescripciones.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule], // Importa los módulos necesarios
})
export class VerPrescripcionesComponent implements OnInit {
  prescripciones: any[] = [];

  constructor(private prescripcionService: PrescripcionService) {}

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
}
