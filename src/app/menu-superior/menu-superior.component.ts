import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController, PopoverController } from "@ionic/angular";
import { RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NgIf } from "@angular/common";
import { AjustesPopoverComponent } from "../ajustes-popover/ajustes-popover.component";

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
  ajustesreportes: boolean = true;
  popoverAbierto: boolean = false;

  constructor(private authService: AuthService, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
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
