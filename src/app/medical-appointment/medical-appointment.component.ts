import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {calendar} from "ionicons/icons";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-medical-appointment',
  templateUrl: './medical-appointment.component.html',
  styleUrls: ['./medical-appointment.component.scss'],
  imports: [
    IonicModule
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

  openMenu() {
    this.menuCtrl.open('first');
  }
}
