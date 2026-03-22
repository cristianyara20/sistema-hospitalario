export interface Tratamiento {
  tratamientoId: number;
  visitaId: number;
  fechaInicio: string;
  fechaFin?: string | null;
}

export type CreateTratamientoDTO = Omit<Tratamiento, "tratamientoId">;
export type UpdateTratamientoDTO = Partial<CreateTratamientoDTO>;