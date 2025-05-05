import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {calendar} from "ionicons/icons";

@Component({
  selector: 'app-medical-appointment',
  templateUrl: './medical-appointment.component.html',
  styleUrls: ['./medical-appointment.component.scss'],
  imports: [
    IonicModule
  ]
})
export class MedicalAppointmentComponent  implements OnInit {

  constructor(private menuCtrl: MenuController) {
    addIcons({
      'calendar': calendar
    });
  }

  ngOnInit() {}

  openMenu() {
    this.menuCtrl.open('first');
  }
}
