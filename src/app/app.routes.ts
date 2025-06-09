import { Routes } from '@angular/router';
import {VerVacunasPacienteComponent} from "./ver-vacunas-paciente/ver-vacunas-paciente.component";

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
    path: 'prescripciones',
    loadComponent: () => import('./prescripciones/prescripciones.component').then((m) => m.PrescripcionesComponent),
  },
  {
    path: 'ver-prescripciones',
    loadComponent: () => import('./ver-prescripciones/ver-prescripciones.component').then((m) => m.VerPrescripcionesComponent),
  },
  {
    path: 'prescripcion-info/:idPrescripcion',
    loadComponent: () =>
      import('./prescripcion-info/prescripcion-info.component').then(
        (m) => m.PrescripcionInfoComponent
      ),
  },
  {
    path: 'recuperar',
    loadComponent: () => import('./recuperar-cuenta/recuperar-cuenta.component').then((m) => m.RecuperarCuentaComponent),
  },
  {
    path: 'restablecer-contrasena',
    loadComponent: () => import('./recuperar-contrasena/recuperar-contrasena.component').then((m) => m.RecuperarContrasenaComponent),
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
    path: 'vacunas',
    loadComponent: () => import('./vacunas/vacunas.component').then((m) => m.VacunasComponent),
  },

  {
    path: 'ver-vacunas-paciente/:nhPaciente',
    loadComponent: () => import('./ver-vacunas-paciente/ver-vacunas-paciente.component').then((m) => m.VerVacunasPacienteComponent)
  }
];
