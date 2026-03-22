import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Incapacidad } from "./types";

export class IncapacidadRepository {
  async findAll(): Promise<Incapacidad[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("incapacidades")
      .select(`
        incapacidadid, fecha, tratamientoid,
        detallesincapacidades(
          detalleid, descripcion, fechainicio, fechafin, numerodias
        )
      `)
      .order("fecha", { ascending: false });
    if (error) throw new Error(error.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data || []).map((row: any) => ({
      incapacidadId:  row.incapacidadid,
      tratamientoId:  row.tratamientoid,
      fecha:          row.fecha,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      detalles: (row.detallesincapacidades || []).map((d: any) => ({
        detalleId:     d.detalleid,
        incapacidadId: row.incapacidadid,
        descripcion:   d.descripcion,
        fechaInicio:   d.fechainicio,
        fechaFin:      d.fechafin,
        numeroDias:    d.numerodias,
      })),
    }));
  }

  async findByTratamiento(tratamientoId: number): Promise<Incapacidad[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("incapacidades")
      .select(`
        incapacidadid, fecha, tratamientoid,
        detallesincapacidades(
          detalleid, descripcion, fechainicio, fechafin, numerodias
        )
      `)
      .eq("tratamientoid", tratamientoId)
      .order("fecha", { ascending: false });
    if (error) throw new Error(error.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data || []).map((row: any) => ({
      incapacidadId:  row.incapacidadid,
      tratamientoId:  row.tratamientoid,
      fecha:          row.fecha,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      detalles: (row.detallesincapacidades || []).map((d: any) => ({
        detalleId:     d.detalleid,
        incapacidadId: row.incapacidadid,
        descripcion:   d.descripcion,
        fechaInicio:   d.fechainicio,
        fechaFin:      d.fechafin,
        numeroDias:    d.numerodias,
      })),
    }));
  }

  async delete(id: number): Promise<boolean> {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("incapacidades")
      .delete()
      .eq("incapacidadid", id);
    return !error;
  }
}