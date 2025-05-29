import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {MenuSuperiorComponent} from "../menu-superior/menu-superior.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    MenuSuperiorComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
}
