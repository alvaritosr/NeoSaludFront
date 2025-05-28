import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { MedicoService } from '../services/medico.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-heal-history',
  templateUrl: './heal-history.component.html',
  imports: [
    IonicModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./heal-history.component.scss']
})
export class HealHistoryComponent implements OnInit {
  nombreMedico: string = '';
  paciente: any;
  antecedentes: string[] = [];
  detalleAntecedente: any;

  constructor(
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();

    this.route.queryParams.subscribe(params => {
      const nh = params['nh'];
      if (nh && this.nombreMedico) {
        this.medicoService.verDetallePaciente(nh, this.nombreMedico).subscribe(data => {
          this.paciente = data;
        });

        this.medicoService.verAntecedentesFamiliares(nh, this.nombreMedico).subscribe(data => {
          this.antecedentes = data;
        });
      }
    });
  }

  cargarDetalleAntecedente(idAntecedente: number) {
    const nh = this.paciente?.nh;
    const usernameMedico = this.nombreMedico;
    if (nh && usernameMedico) {
      this.medicoService.verAntecedenteFamiliarDetalle(nh, idAntecedente, usernameMedico).subscribe(data => {
        this.detalleAntecedente = data;
      });
    }
  }
}
