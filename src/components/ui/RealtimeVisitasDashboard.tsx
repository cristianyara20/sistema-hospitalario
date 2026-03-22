/**
 * @file src/components/ui/RealtimeVisitasDashboard.tsx
 *
 * @description Dashboard de visitas con actualizacion en tiempo real.
 *
 * Implementa el Observer Pattern usando Supabase Realtime:
 * - Supabase PostgREST actua como el "Subject" (observable)
 * - Este componente actua como el "Observer" (suscriptor)
 * - Cuando hay un INSERT/UPDATE/DELETE en "visitas", Supabase
 *   notifica a todos los suscriptores via WebSocket
 *
 * @pattern Observer Pattern
 * @directive "use client" - necesita WebSocket (solo en el browser)
 */

"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { VisitaCompleta } from "@/modules/visitas/types";

interface Props {
  initialVisitas: VisitaCompleta[];
}

export function RealtimeVisitasDashboard({ initialVisitas }: Props) {
  const [visitas, setVisitas] = useState<VisitaCompleta[]>(initialVisitas);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    const channel = supabase
      .channel("dashboard.visitas")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "visitas",
        },
        (payload) => {
          console.log("Nueva visita registrada:", payload.new);
          setVisitas((prev) => [
            payload.new as VisitaCompleta,
            ...prev.slice(0, 9),
          ]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "visitas" },
        (payload) => {
          setVisitas((prev) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prev.filter((v) => (v as any).visitaid !== payload.old.visitaid)
          );
        }
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Visitas Recientes
        </h2>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"
            } transition-colors`}
          />
          <span className="text-xs text-gray-500">
            {isConnected ? "En tiempo real" : "Conectando..."}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {visitas.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            No hay visitas recientes
          </p>
        )}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {visitas.map((visita: any, index: number) => (
          <div
            key={visita.visitaid || visita.visitaId || index}
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {visita.pacientes?.nombre
                  ? `${visita.pacientes.nombre} ${visita.pacientes.apellido}`
                  : visita.paciente?.nombre
                  ? `${visita.paciente.nombre} ${visita.paciente.apellido}`
                  : "Sin nombre"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Dr.{" "}
                {visita.medicos?.nombre
                  ? `${visita.medicos.nombre} ${visita.medicos.apellido}`
                  : visita.medico?.nombre
                  ? `${visita.medico.nombre} ${visita.medico.apellido}`
                  : "Sin medico"}
              </p>
            </div>
            <span className="text-xs text-gray-400 shrink-0">
              {visita.fecha}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}