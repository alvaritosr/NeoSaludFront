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
import {IngresosService} from "../services/ingresos.service";
import {AuthService} from "../services/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonLabel,
    NgForOf,
    NgClass,
    MenuSuperiorComponent,
    RouterLink
  ]
})
export class IngresosComponent implements OnInit {
  nombreMedico: string = '';

  rooms: Array<{
    id: number;
    numero: string;
    paciente: {
      id: number;
      nombre: string;
      primerApellido: string;
      segundoApellido: string;
      anyoNacimiento: string;
    } | null;
    severidad: string;
    status: string;
  }> = [];


  constructor(private ingresosService: IngresosService, private authService: AuthService) {}

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
    this.ingresosService.verIngresos(this.nombreMedico).subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Error al obtener los ingresos:', error);
      }
    );
  }
}

