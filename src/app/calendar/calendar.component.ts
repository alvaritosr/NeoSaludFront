import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuSuperiorComponent } from '../menu-superior/menu-superior.component';

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
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  hours = Array.from({ length: 7 }, (_, i) => `${i + 8}:00`);
  currentDate = new Date();
  weekDates: { day: string; date: string }[] = [];

  constructor() {
    this.calculateWeekDates();
  }

  calculateWeekDates() {
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay() + 1); // Lunes

    this.weekDates = this.daysOfWeek.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day,
        date: `${date.getDate()} ${date.toLocaleString('es-ES', { month: 'long' })} ${date.getFullYear()}`,
      };
    });
  }

  moveWeek(direction: number) {
    this.currentDate.setDate(this.currentDate.getDate() + direction * 7);
    this.calculateWeekDates();
  }
}
