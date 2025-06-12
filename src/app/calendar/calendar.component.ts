import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuSuperiorComponent } from '../menu-superior/menu-superior.component';
import { AuthService } from '../services/auth.service';
import { MedicoService } from '../services/medico.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    MenuSuperiorComponent,
  ],
  templateUrl: './calendar.component.html',
  providers: [DatePipe],
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  nombreMedico: string = '';
  consultas: any[] = [];
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  hours = Array.from({ length: 7 }, (_, i) => `${i + 8}:00`);
  currentDate = new Date();
  weekDates: { day: string; date: string; consultas?: any[] }[] = [];

  constructor(private authService: AuthService, private medicoService: MedicoService, private datePipe: DatePipe) {
    this.calculateWeekDates();
  }

  ngOnInit() {
    this.nombreMedico = this.authService.getUsernameFromToken();
    this.fetchConsultas();
  }

  calculateWeekDates() {
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay() + 1); // Lunes

    this.weekDates = this.daysOfWeek.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day,
        date: this.datePipe.transform(date, 'dd/MM/yyyy') || '',
        consultas: [],
      };
    });
  }

  hasConsultasForHour(weekDate: any, hour: string): boolean {
    return weekDate.consultas?.some((consulta: any) => consulta.horaConsulta === hour) || false;
  }

  moveWeek(direction: number) {
    this.currentDate.setDate(this.currentDate.getDate() + direction * 7);
    this.calculateWeekDates();
    this.fetchConsultas();
  }

  fetchConsultas() {
    const usernameMedico = this.nombreMedico;

    if (!usernameMedico) {
      console.error('El nombre del médico no está definido.');
      return;
    }

    this.medicoService.verConsultasPorMedico(usernameMedico).subscribe(
      (data) => {
        const consultasPorDia: { [key: string]: any[] } = {};

        data.forEach(consulta => {
          const fechaConsulta = this.datePipe.transform(consulta.fechaConsulta, 'dd/MM/yyyy');
          if (fechaConsulta) {
            if (!consultasPorDia[fechaConsulta]) {
              consultasPorDia[fechaConsulta] = [];
            }
            consultasPorDia[fechaConsulta].push({
              ...consulta,
              horaConsulta: this.datePipe.transform(consulta.fechaConsulta, 'HH:mm'),
            });
          }
        });

        this.weekDates.forEach(day => {
          day.consultas = (consultasPorDia[day.date] || []).sort((a, b) => a.horaConsulta.localeCompare(b.horaConsulta));
        });
      },
      (error) => {
        console.error('Error al obtener las consultas:', error);
      }
    );
  }
}
