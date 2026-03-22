export interface DetalleExamen {
  detalleExamenId: number;
  ordenExamenId: number;
  nombreExamen: string;
  tipoExamen: string;
  indicaciones?: string | null;
}

export interface OrdenExamen {
  ordenExamenId: number;
  visitaId: number;
  fecha: string;
  detalles: DetalleExamen[];
}

export type CreateDetalleExamenDTO = Omit<DetalleExamen, "detalleExamenId">;
export type CreateOrdenExamenDTO = {
  visitaId: number;
  fecha: string;
  detalles?: CreateDetalleExamenDTO[];
};