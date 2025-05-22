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
    path: 'visor-dicom',
    loadComponent: () => import('./visor-dicom/visor-dicom.component').then((m) => m.VisorDicomComponent),
  },
];
