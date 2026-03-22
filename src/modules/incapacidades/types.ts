export interface DetalleIncapacidad {
  detalleId: number;
  incapacidadId: number;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  numeroDias: number;
}

export interface Incapacidad {
  incapacidadId: number;
  tratamientoId: number;
  fecha: string;
  detalles: DetalleIncapacidad[];
}

export type CreateDetalleIncapacidadDTO = Omit<DetalleIncapacidad, "detalleId">;
export type CreateIncapacidadDTO = {
  tratamientoId: number;
  fecha: string;
  detalles?: CreateDetalleIncapacidadDTO[];
};