import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Especialidad, CreateEspecialidadDTO } from "./types";

export class EspecialidadRepository {
  async findAll(): Promise<Especialidad[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("especialidades")
      .select("*")
      .order("nombre");
    if (error) throw new Error(error.message);
    return (data || []).map((row) => ({
      especialidadId: row.especialidadid,
      nombre: row.nombre,
    }));
  }

  async create(dto: CreateEspecialidadDTO): Promise<Especialidad> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("especialidades")
      .insert({ nombre: dto.nombre })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { especialidadId: data.especialidadid, nombre: data.nombre };
  }

  async delete(id: number): Promise<boolean> {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("especialidades")
      .delete()
      .eq("especialidadid", id);
    return !error;
  }
}