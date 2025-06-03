import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'select-user',
    loadComponent: () => import('./select-user/select-user.component').then((m) => m.SelectUserComponent),
  },
  {
    path: 'heal-history',
    loadComponent: () => import('./heal-history/heal-history.component').then((m) => m.HealHistoryComponent),
  },
  {
    path: 'medical-appointment',
    loadComponent: () => import('./medical-appointment/medical-appointment.component').then((m) => m.MedicalAppointmentComponent),
  },
  {
    path: 'appointment/:nh/:id',
    loadComponent: () => import('./appointment/appointment.component').then((m) => m.AppointmentComponent),
  },
  {
    path: 'chats-selector',
    loadComponent: () => import('./chats-selector/chats-selector.component').then((m) => m.ChatsSelectorComponent),
  },
  {
    path: 'chat/:id',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: 'hcdm-visor',
    loadComponent: () => import('./hcdm-visor/hcdm-visor.component').then((m) => m.HcdmVisorComponent),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.component').then((m) => m.CalendarComponent),
  },
  {
    path: 'visor-dicom',
    loadComponent: () => import('./visor-dicom/visor-dicom.component').then((m) => m.VisorDicomComponent),
  },
  {
    path: 'ingresos',
    loadComponent: () => import('./ingresos/ingresos.component').then((m) => m.IngresosComponent),
  }

  {
    path: 'ingresos',
    loadComponent: () => import('./ingresos/ingresos.component').then((m) => m.IngresosComponent),
  },
  {
    path: 'modificar-cama/:id',
    loadComponent: () => import('./camas/camas.component').then((m) => m.CamasComponent),
  },
  {
    path: 'emergencies',
    loadComponent: () => import('./emergencies/emergencies.component').then((m) => m.EmergenciesComponent),
  }
];
