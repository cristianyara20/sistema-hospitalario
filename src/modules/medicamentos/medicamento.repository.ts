import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Medicamento, CreateMedicamentoDTO } from "./types";

export class MedicamentoRepository {
  async findAll(): Promise<Medicamento[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("medicamentos")
      .select("*")
      .order("nombre");
    if (error) throw new Error(error.message);
    return (data || []).map((row) => ({
      medicamentoId: row.medicamentoid,
      nombre:        row.nombre,
      descripcion:   row.descripcion,
      prescripcion:  row.prescripcion,
      unidades:      row.unidades,
      cantidad:      row.cantidad,
    }));
  }

  async create(dto: CreateMedicamentoDTO): Promise<Medicamento> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("medicamentos")
      .insert({
        nombre:       dto.nombre,
        descripcion:  dto.descripcion,
        prescripcion: dto.prescripcion,
        unidades:     dto.unidades,
        cantidad:     dto.cantidad,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return {
      medicamentoId: data.medicamentoid,
      nombre:        data.nombre,
      descripcion:   data.descripcion,
      prescripcion:  data.prescripcion,
      unidades:      data.unidades,
      cantidad:      data.cantidad,
    };
  }

  async delete(id: number): Promise<boolean> {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("medicamentos")
      .delete()
      .eq("medicamentoid", id);
    return !error;
  }
}