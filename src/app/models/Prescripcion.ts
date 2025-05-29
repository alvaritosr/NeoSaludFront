export class Prescripcion {
  id?: number;
  nombrePrescriptor!: string;
  numeroColegiado!: string;
  especialidad!: string;
  firmaDigital!: string;
  contactoPrescriptor!: string;
  nombreGenerico!: string;
  nombreComercial!: string;
  concentracion!: string;
  formaFarmaceutica!: string;
  viaAdministracion!: string;
  dosis!: string;
  frecuencia!: string;
  duracionDias!: number;
  cantidadEnvases!: number;
  lugarEmision!: string;
  fechaEmision!: string;
  indicacionesEspecificas!: string;
  notasAdicionales?: string;
}
