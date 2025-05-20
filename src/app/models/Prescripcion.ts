// src/app/models/Prescripcion.ts
import { Paciente } from './Paciente';

export interface Prescripcion {
  id?: number;
  paciente: Paciente;

  // Datos del prescriptor
  nombrePrescriptor: string;
  numeroColegiado: string;
  especialidad: string;
  firmaDigital: string;
  contactoPrescriptor: string;

  // Datos del medicamento
  nombreGenerico: string;
  nombreComercial: string;
  concentracion: string;
  formaFarmaceutica: string;
  viaAdministracion: string;
  dosis: string;
  frecuencia: string;
  duracionDias: number;
  cantidadEnvases: number;

  // Información adicional
  fechaEmision: string;
  lugarEmision: string;
  indicacionesEspecificas: string;
  notasAdicionales: string;
}
