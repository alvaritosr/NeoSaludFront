import { Component, OnInit } from '@angular/core';
import {IonicModule, MenuController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {calendar} from "ionicons/icons";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";

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

  constructor() {
    addIcons({
      'calendar': calendar
    });
  }

  ngOnInit() {}

}
