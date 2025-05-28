import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { MedicoService } from '../services/medico.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-heal-history',
  templateUrl: './heal-history.component.html',
  imports: [
    IonicModule,
    NgIf
  ],
  styleUrls: ['./heal-history.component.scss']
})
export class HealHistoryComponent implements OnInit {
  nombreMedico: string = '';
  paciente: any;
  antecedentes: string[] = [];
  detalleAntecedente: any;

  constructor(
    private menuCtrl: MenuController,
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();

    const usernameMedico = this.authService.getUsernameFromToken();
    this.route.queryParams.subscribe(params => {
      const nh = params['nh'];
      if (nh && usernameMedico) {
        this.medicoService.verDetallePaciente(nh, usernameMedico).subscribe(data => {
          this.paciente = data;
        });

        this.medicoService.verAntecedentesFamiliares(nh, usernameMedico).subscribe(data => {
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
