import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrescripcionService } from '../services/prescripcion-info.service';
import { Prescripcion } from '../models/Prescripcion';
import {IonicModule} from "@ionic/angular";
import {DatePipe} from "@angular/common";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";

@Component({
  selector: 'app-prescripcion-info',
  templateUrl: './prescripcion-info.component.html',
  styleUrls: ['./prescripcion-info.component.scss'],
  imports: [
    IonicModule,
    DatePipe,
    MenuSuperiorComponent
  ]
})
export class PrescripcionInfoComponent implements OnInit {
  prescripcion!: Prescripcion;

  constructor(
    private route: ActivatedRoute,
    private prescripcionService: PrescripcionService
  ) {}

  ngOnInit(): void {
    const idPrescripcion = this.route.snapshot.paramMap.get('idPrescripcion');
    if (idPrescripcion) {
      this.prescripcionService.getPrescripcion(idPrescripcion).subscribe((data) => {
        this.prescripcion = data;
      });
    }
  }
}
