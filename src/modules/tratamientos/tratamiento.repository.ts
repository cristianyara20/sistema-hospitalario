import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Tratamiento, CreateTratamientoDTO } from "./types";

export class TratamientoRepository {
  async findAll(): Promise<Tratamiento[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("tratamientos")
      .select("*")
      .order("fechainicio", { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map((row) => ({
      tratamientoId: row.tratamientoid,
      visitaId:      row.visitaid,
      fechaInicio:   row.fechainicio,
      fechaFin:      row.fechafin,
    }));
  }

  async findByVisita(visitaId: number): Promise<Tratamiento[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("tratamientos")
      .select("*")
      .eq("visitaid", visitaId)
      .order("fechainicio", { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map((row) => ({
      tratamientoId: row.tratamientoid,
      visitaId:      row.visitaid,
      fechaInicio:   row.fechainicio,
      fechaFin:      row.fechafin,
    }));
  }

  async create(dto: CreateTratamientoDTO): Promise<Tratamiento> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("tratamientos")
      .insert({
        visitaid:    dto.visitaId,
        fechainicio: dto.fechaInicio,
        fechafin:    dto.fechaFin,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return {
      tratamientoId: data.tratamientoid,
      visitaId:      data.visitaid,
      fechaInicio:   data.fechainicio,
      fechaFin:      data.fechafin,
    };
  }

  async delete(id: number): Promise<boolean> {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("tratamientos")
      .delete()
      .eq("tratamientoid", id);
    return !error;
  }
}