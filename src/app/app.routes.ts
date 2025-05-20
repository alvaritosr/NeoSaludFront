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
    path: 'prescripciones',
    loadComponent: () => import('./prescripciones/prescripciones.component').then((m) => m.PrescripcionesComponent),
  },
  {
    path: 'ver-prescripciones',
    loadComponent: () => import('./ver-prescripciones/ver-prescripciones.component').then((m) => m.VerPrescripcionesComponent),
  },
  {
    path: 'recuperar',
    loadComponent: () => import('./recuperar-cuenta/recuperar-cuenta.component').then((m) => m.RecuperarCuentaComponent),
  },
  {
    path: 'restablecer-contrasena', // Quitamos el parámetro de la ruta
    loadComponent: () => import('./recuperar-contrasena/recuperar-contrasena.component').then((m) => m.RecuperarContrasenaComponent),
  }
];
