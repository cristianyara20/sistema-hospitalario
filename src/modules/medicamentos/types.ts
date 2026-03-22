export interface Medicamento {
  medicamentoId: number;
  nombre: string;
  descripcion?: string | null;
  prescripcion: string;
  unidades: string;
  cantidad: number;
}

export type CreateMedicamentoDTO = Omit<Medicamento, "medicamentoId">;
export type UpdateMedicamentoDTO = Partial<CreateMedicamentoDTO>;