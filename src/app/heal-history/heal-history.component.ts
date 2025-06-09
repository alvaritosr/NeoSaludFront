import {Component, OnInit} from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";
import { MedicoService } from '../services/medico.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgForOf, NgIf} from '@angular/common';
import {AntecedentesService} from "../services/antecedentes.service";
import {AlergiasService} from "../services/alergias.service";
import {AnalisisService} from "../services/analisis.service";
import {HabitosVidaService} from "../services/habitos-vida.service";


@Component({
  selector: 'app-heal-history',
  templateUrl: './heal-history.component.html',
  styleUrls: ['./heal-history.component.scss'],
  providers: [DatePipe],
  imports: [
    IonicModule,
    MenuSuperiorComponent,
    NgIf,
    NgForOf,
    RouterLink
  ],
})
export class HealHistoryComponent implements OnInit {
  nombreMedico: string = '';
  paciente: any;
  alergias: string[] = [];
  analisis: string[] = [];
  antecedentes: string[] = [];
  consultas: any[] = [];

  detalleAlergias: any;
  detalleAnalisis: any;
  detalleAntecedente: any;
  habitos: string[] = [];
  detalleHabito: any;
  detalleConsulta: any;

  constructor(
    private medicoService: MedicoService,
    private alergiasService: AlergiasService,
    private analisisService: AnalisisService,
    private antecedentesService: AntecedentesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private habitosVidaService: HabitosVidaService,
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();

    this.route.queryParams.subscribe(params => {
      const nh = params['nh'];
      if (nh && this.nombreMedico) {
        this.medicoService.verDetallePaciente(nh, this.nombreMedico).subscribe(data => {
          this.paciente = data;
          this.paciente.fecha = this.datePipe.transform(this.paciente.fecha, 'dd/MM/yyyy HH:mm');
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

        this.medicoService.verConsultas(nh, this.nombreMedico).subscribe(data => {
          this.consultas = data;
          this.consultas.forEach(consulta => {
            consulta.fechaConsulta = this.datePipe.transform(consulta.fechaConsulta, 'dd/MM/yyyy HH:mm');
          });
        });
        this.habitosVidaService.obtenerTiposDeHabitosDeVida(nh, this.nombreMedico).subscribe(data => {
          this.habitos = data;
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
      this.detalleHabito = null;
      this.detalleConsulta = null;
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
      this.detalleConsulta = null;
      this.detalleHabito = null;
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
      this.detalleConsulta = null;
      this.detalleHabito = null;
      this.antecedentesService.verAntecedenteFamiliarDetalle(nh, nombreAntecedente, usernameMedico).subscribe((data: any) => {
        this.detalleAntecedente = data;
      });
    }
  }

  cargarDetalleConsulta(idConsulta: number) {
    const nh = this.paciente?.nh;
    const usernameMedico = this.nombreMedico;
    if (nh && usernameMedico) {
      this.detalleAlergias = null;
      this.detalleAnalisis = null;
      this.detalleAntecedente = null;
      this.medicoService.verDetalleConsulta(nh, idConsulta, usernameMedico).subscribe((data: any) => {
        this.detalleConsulta = data;
        this.detalleConsulta.fechaConsulta = this.datePipe.transform(this.detalleConsulta.fechaConsulta, 'dd/MM/yyyy');
        this.detalleConsulta.horaConsulta = this.datePipe.transform(this.detalleConsulta.fechaConsulta, 'HH:mm');
      });
    }
  }

  cargarDetalleHabito(tipoHabito: string) {
    const nh = this.paciente?.nh;
    const usernameMedico = this.nombreMedico;
    if (nh && usernameMedico) {
      this.detalleAlergias = null;
      this.detalleAnalisis = null;
      this.detalleAntecedente = null;
      this.detalleHabito = null;
      this.habitosVidaService.obtenerHabitoDeVidaPorTipo(nh, tipoHabito, usernameMedico).subscribe((data: any) => {
        this.detalleHabito = data;
      });
    }
  }
}
