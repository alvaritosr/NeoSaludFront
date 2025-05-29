import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { MedicoService } from '../services/medico.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgForOf, NgIf} from '@angular/common';
import {AntecedentesService} from "../services/antecedentes.service";
import {AlergiasService} from "../services/alergias.service";
import {AnalisisService} from "../services/analisis.service";

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
  alergias: string[] = [];
  analisis: string[] = [];
  antecedentes: string[] = [];
  detalleAlergias: any;
  detalleAnalisis: any;
  detalleAntecedente: any;

  constructor(
    private medicoService: MedicoService,
    private alergiasService: AlergiasService,
    private analisisService: AnalisisService,
    private antecedentesService: AntecedentesService,
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

        this.alergiasService.verAlergias(nh, this.nombreMedico).subscribe(data => {
          this.alergias = data;
        });

        this.analisisService.verAnaliticas(nh).subscribe(data => {
          this.analisis = data;
        });

        this.antecedentesService.verAntecedentesFamiliares(nh, this.nombreMedico).subscribe(data => {
          this.antecedentes = data;
        });
      }
    });
  }

  cargarDetalleAlergias(nombreAlergia: string) {
    const nh = this.paciente?.nh;
    const usernameMedico = this.nombreMedico;
    if (nh && usernameMedico) {
      this.detalleAnalisis = null;
      this.detalleAntecedente = null;
      this.alergiasService.verAlergiasDetalles(nh, nombreAlergia, usernameMedico).subscribe((data: any) => {
        this.detalleAlergias = data;
      });
    }
  }

  cargarDetalleAnalisis(nombreAnalisis: string) {
    const nh = this.paciente?.nh;
    if (nh) {
      this.detalleAlergias = null;
      this.detalleAntecedente = null;
      this.analisisService.verAnaliticasDetalle(nh, nombreAnalisis).subscribe((data: any) => {
        this.detalleAnalisis = data;
      });
    }
  }

  cargarDetalleAntecedente(nombreAntecedente: string) {
    const nh = this.paciente?.nh;
    const usernameMedico = this.nombreMedico;
    if (nh && usernameMedico) {
      this.detalleAlergias = null;
      this.detalleAnalisis = null;
      this.antecedentesService.verAntecedenteFamiliarDetalle(nh, nombreAntecedente, usernameMedico).subscribe((data: any) => {
        this.detalleAntecedente = data;
      });
    }
  }
}
