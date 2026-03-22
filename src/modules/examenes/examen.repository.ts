import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { OrdenExamen, CreateOrdenExamenDTO } from "./types";

export class ExamenRepository {
  async findAll(): Promise<OrdenExamen[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("orden_examenes")
      .select(`
        ordenexamenid, fecha, visitaid,
        detallesexamenes(
          detalleexamenid, nombreexamen, tipoexamen, indicaciones
        )
      `)
      .order("fecha", { ascending: false });
    if (error) throw new Error(error.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data || []).map((row: any) => ({
      ordenExamenId: row.ordenexamenid,
      visitaId:      row.visitaid,
      fecha:         row.fecha,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      detalles: (row.detallesexamenes || []).map((d: any) => ({
        detalleExamenId: d.detalleexamenid,
        ordenExamenId:   row.ordenexamenid,
        nombreExamen:    d.nombreexamen,
        tipoExamen:      d.tipoexamen,
        indicaciones:    d.indicaciones,
      })),
    }));
  }

  async findByVisita(visitaId: number): Promise<OrdenExamen[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("orden_examenes")
      .select(`
        ordenexamenid, fecha, visitaid,
        detallesexamenes(
          detalleexamenid, nombreexamen, tipoexamen, indicaciones
        )
      `)
      .eq("visitaid", visitaId)
      .order("fecha", { ascending: false });
    if (error) throw new Error(error.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data || []).map((row: any) => ({
      ordenExamenId: row.ordenexamenid,
      visitaId:      row.visitaid,
      fecha:         row.fecha,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      detalles: (row.detallesexamenes || []).map((d: any) => ({
        detalleExamenId: d.detalleexamenid,
        ordenExamenId:   row.ordenexamenid,
        nombreExamen:    d.nombreexamen,
        tipoExamen:      d.tipoexamen,
        indicaciones:    d.indicaciones,
      })),
    }));
  }

  async delete(id: number): Promise<boolean> {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("orden_examenes")
      .delete()
      .eq("ordenexamenid", id);
    return !error;
  }
}