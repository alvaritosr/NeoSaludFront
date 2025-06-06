import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController, PopoverController } from "@ionic/angular";
import { RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NgIf } from "@angular/common";
import { AjustesPopoverComponent } from "../ajustes-popover/ajustes-popover.component";
import { Medico } from '../models/Medico';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink,
    NgIf
  ]
})
export class MenuSuperiorComponent implements OnInit {

  nombreMedico: string = '';
  medicoDetalles: Medico = {};
  idPerfil: number | null = null;
  ajustesreportes: boolean = true;
  popoverAbierto: boolean = false;

  constructor(private authService: AuthService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.idPerfil = this.authService.getPerfilIdFromToken();

    if (this.idPerfil) {
      this.authService.verDetallesMedico(this.idPerfil).subscribe({
        next: (datos) => {
          this.medicoDetalles = datos;
          this.nombreMedico = datos.nombre + ' ' + datos.apellidos;
          console.log('Nombre del médico logueado:', this.nombreMedico);
        },
        error: (error) => {
          console.error('Error obteniendo detalles del médico:', error);
        }
      });
    }
  }


  async mostrarAjustes(ev: Event) {
    if (!this.nombreMedico) return;

    const popoverAjustes = await this.popoverCtrl.create({
      component: AjustesPopoverComponent,
      event: ev,
      translucent: false,
      cssClass: 'custom-popover',
    });

    this.popoverAbierto = true;
    await popoverAjustes.present();

    popoverAjustes.onDidDismiss().then(() => {
      this.popoverAbierto = false;
    });
  }
}
