/**
 * @file src/modules/formulas/formula.repository.ts
 *
 * @description Repositorio para Formulas (recetas medicas).
 *
 * Relacion: Tratamientos -> Formulas -> DetallesFormulas -> Medicamentos
 *
 * SQL equivalente:
 * SELECT f.*, df.*, m.*
 * FROM formulas f
 * JOIN detallesformulas df ON f.formulaid = df.formulaid
 * JOIN medicamentos m ON df.medicamentoid = m.medicamentoid
 * WHERE f.tratamientoid = :tratamientoid
 */

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Formula, CreateFormulaDTO } from "./types";

export class FormulaRepository {

  async findAll(): Promise<Formula[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("formulas")
      .select(`
        formulaid, fecha,
        tratamientoid,
        detallesformulas(
          detalleid,
          presentacion,
          posologia,
          periodouso,
          periodicidaduso,
          medicamentos!medicamentoid(
            medicamentoid, nombre, prescripcion, unidades, descripcion
          )
        )
      `)
      .order("fecha", { ascending: false });
    if (error) throw new Error(error.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data || []).map((f: any) => ({
      formulaId:     f.formulaid,
      tratamientoId: f.tratamientoid,
      fecha:         f.fecha,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      detalles: (f.detallesformulas || []).map((d: any) => ({
        detalleId:       d.detalleid,
        presentacion:    d.presentacion,
        posologia:       d.posologia,
        periodoUso:      d.periodouso,
        periodicidadUso: d.periodicidaduso,
        medicamento: {
          medicamentoId: d.medicamentos.medicamentoid,
          nombre:        d.medicamentos.nombre,
          prescripcion:  d.medicamentos.prescripcion,
          unidades:      d.medicamentos.unidades,
          descripcion:   d.medicamentos.descripcion,
          cantidad:      0,
        },
      })),
    }));
  }

  async findByTratamiento(tratamientoid: number): Promise<Formula[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("formulas")
      .select(`
        formulaid, fecha,
        tratamientoid,
        detallesformulas(
          detalleid,
          presentacion,
          posologia,
          periodouso,
          periodicidaduso,
          medicamentos!medicamentoid(
            medicamentoid, nombre, prescripcion, unidades, descripcion
          )
        )
      `)
      .eq("tratamientoid", tratamientoid)
      .order("fecha", { ascending: false });
    if (error) throw new Error(error.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data || []).map((f: any) => ({
      formulaId:     f.formulaid,
      tratamientoId: f.tratamientoid,
      fecha:         f.fecha,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      detalles: (f.detallesformulas || []).map((d: any) => ({
        detalleId:       d.detalleid,
        presentacion:    d.presentacion,
        posologia:       d.posologia,
        periodoUso:      d.periodouso,
        periodicidadUso: d.periodicidaduso,
        medicamento: {
          medicamentoId: d.medicamentos.medicamentoid,
          nombre:        d.medicamentos.nombre,
          prescripcion:  d.medicamentos.prescripcion,
          unidades:      d.medicamentos.unidades,
          descripcion:   d.medicamentos.descripcion,
          cantidad:      0,
        },
      })),
    }));
  }

  async createConDetalles(dto: CreateFormulaDTO): Promise<Formula> {
    const supabase = await createServerSupabaseClient();

    const { data: formula, error: fErr } = await supabase
      .from("formulas")
      .insert({
        tratamientoid: dto.tratamientoId,
        fecha:         dto.fecha,
      })
      .select("formulaid")
      .single();

    if (fErr) throw new Error(fErr.message);

    if (dto.detalles && dto.detalles.length > 0) {
      const detallesInsert = dto.detalles.map((d) => ({
        formulaid:       formula.formulaid,
        medicamentoid:   d.medicamentoId,
        presentacion:    d.presentacion,
        posologia:       d.posologia,
        periodouso:      d.periodoUso,
        periodicidaduso: d.periodicidadUso,
      }));

      const { error: dErr } = await supabase
        .from("detallesformulas")
        .insert(detallesInsert);

      if (dErr) throw new Error(`Error en detalles formula: ${dErr.message}`);
    }

    const formulas = await this.findByTratamiento(dto.tratamientoId);
    return formulas.find((f) => f.formulaId === formula.formulaid)!;
  }
}