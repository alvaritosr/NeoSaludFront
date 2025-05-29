import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {calendar} from "ionicons/icons";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-medical-appointment',
  templateUrl: './medical-appointment.component.html',
  styleUrls: ['./medical-appointment.component.scss'],
  imports: [
    IonicModule,
    MenuSuperiorComponent
  ]
})
export class MedicalAppointmentComponent  implements OnInit {
  nombreMedico: string = '';

  constructor(private menuCtrl: MenuController, private authService: AuthService) {
    addIcons({
      'calendar': calendar
    });
  }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
  }

}
