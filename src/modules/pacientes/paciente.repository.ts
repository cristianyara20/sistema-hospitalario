import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Paciente, CreatePacienteDTO } from "./types";

export class PacienteRepository {
  async findAll(): Promise<Paciente[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("pacientes")
      .select("*")
      .order("apellido");
    if (error) throw new Error(error.message);
    return (data || []).map((row) => ({
      pacienteId:       row.pacienteid,
      nombre:           row.nombre,
      apellido:         row.apellido,
      fechaNacimiento:  row.fechanacimiento,
      sexo:             row.sexo,
      direccion:        row.direccion,
      telefono:         row.telefono,
      correoElectronico: row.correoelectronico,
    }));
  }

  async create(dto: CreatePacienteDTO): Promise<Paciente> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("pacientes")
      .insert({
        nombre:            dto.nombre,
        apellido:          dto.apellido,
        fechanacimiento:   dto.fechaNacimiento,
        sexo:              dto.sexo,
        direccion:         dto.direccion,
        telefono:          dto.telefono,
        correoelectronico: dto.correoElectronico,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return {
      pacienteId:        data.pacienteid,
      nombre:            data.nombre,
      apellido:          data.apellido,
      fechaNacimiento:   data.fechanacimiento,
      sexo:              data.sexo,
      direccion:         data.direccion,
      telefono:          data.telefono,
      correoElectronico: data.correoelectronico,
    };
  }

  async delete(id: number): Promise<boolean> {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("pacientes")
      .delete()
      .eq("pacienteid", id);
    return !error;
  }
}