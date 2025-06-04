import { Component, OnInit } from '@angular/core';
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid, IonLabel,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonLabel,
    NgForOf,
    NgClass
  ]
})
export class IngresosComponent implements OnInit {
  rooms: Array<{
    number: number | string,
    beds: Array<{
      number: number,
      status: string,
      patient: string,
      severity: 'grave' | 'medio' | 'leve' | 'nula'
    }>
  }> = [];

  constructor() { }

  ngOnInit() {
    const allBeds: Array<{
      number: number;
      status: string;
      patient: string;
      severity: 'grave' | 'medio' | 'leve' | 'nula';
    }> = [
      { number: 1, status: 'Ocupada', patient: 'Juan Pérez', severity: 'grave' },
      { number: 2, status: 'Libre', patient: '', severity: 'nula' },
      { number: 3, status: 'Ocupada', patient: 'Ana Gómez', severity: 'medio' },
      { number: 4, status: 'Libre', patient: '', severity: 'nula' },
      { number: 5, status: 'Ocupada', patient: 'Luis Martínez', severity: 'grave' },
      { number: 6, status: 'Libre', patient: '', severity: 'nula' },
      { number: 7, status: 'Ocupada', patient: 'María López', severity: 'medio' },
      { number: 8, status: 'Libre', patient: '', severity: 'nula' },
      { number: 9, status: 'Ocupada', patient: 'Carlos Ruiz', severity: 'leve' },
      { number: 10, status: 'Libre', patient: '', severity: 'nula' },
      { number: 11, status: 'Ocupada', patient: 'Laura Fernández', severity: 'grave' },
      { number: 12, status: 'Libre', patient: '', severity: 'nula' }
    ];

    // Crear 3 habitaciones con 4 camas cada una
    for (let i = 0; i < allBeds.length; i += 4) {
      this.rooms.push({
        number: (i / 4) + 1,
        beds: allBeds.slice(i, i + 4)
      });
    }

    // Añadir habitación especial de aislamiento
    this.rooms.push({
      number: 'Aislamiento',
      beds: [
        { number: 13, status: 'Ocupada', patient: 'Pedro Sánchez', severity: 'grave' }
      ]
    });
  }
}

