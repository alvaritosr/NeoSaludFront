// import { Component } from '@angular/core';
// import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
// import { addDays, isWeekend } from 'date-fns';
// import { CalendarModule } from 'angular-calendar';
// import {CommonModule} from "@angular/common";
// import {IonicModule} from "@ionic/angular";  // Importa CalendarModule
//
// @Component({
//   selector: 'app-calendar',
//   standalone: true, // Componente standalone
//   imports: [
//     // Importa los módulos necesarios, incluido CalendarModule
//     IonicModule,
//     CommonModule,
//     CalendarModule,  // Esto es crucial
//   ],
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.scss'],
// })
// export class CalendarComponent {
//   view: CalendarView = CalendarView.Month;
//   viewDate: Date = new Date();
//   events: CalendarEvent[] = [];
//
//   constructor() {}
//
//   ngOnInit() {
//     this.loadEvents();
//   }
//
//   loadEvents() {
//     const today = new Date();
//     this.events = [
//       {
//         start: today,
//         end: today,
//         title: 'Evento de ejemplo',
//         color: { primary: '#ad2121', secondary: '#FAE3E3' },
//       },
//       {
//         start: addDays(today, 1),
//         end: addDays(today, 1),
//         title: 'Otro evento',
//         color: { primary: '#1e90ff', secondary: '#D1E8FF' },
//       },
//     ];
//   }
//
//   dayClicked({ day, sourceEvent }: { day: CalendarMonthViewDay, sourceEvent: MouseEvent | KeyboardEvent }): void {
//     console.log('Día seleccionado:', day.date);
//     console.log('Eventos para este día:', day.events);
//   }
//
//   beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
//     body.forEach(day => {
//       if (isWeekend(day.date)) {
//         day.cssClass = 'weekend-day';
//       }
//     });
//   }
// }
