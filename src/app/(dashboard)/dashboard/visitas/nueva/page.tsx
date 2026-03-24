"use client";

import { useActionState } from "react";
import { createVisitaAction } from "@/modules/visitas/visita.actions";
import { useRouter } from "next/navigation";

type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
} | null;

export default function NuevaVisitaPage() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    createVisitaAction,
    null
  );
  const router = useRouter();

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Nueva Visita</h1>
      </div>

      <form action={formAction} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID Paciente *</label>
          <input
            name="pacienteid"
            type="number"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="ID del paciente"
          />
          {state?.errors?.pacienteid && (
            <p className="text-red-500 text-xs mt-1">{state.errors.pacienteid[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID Medico *</label>
          <input
            name="medicoid"
            type="number"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="ID del medico"
          />
          {state?.errors?.medicoid && (
            <p className="text-red-500 text-xs mt-1">{state.errors.medicoid[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
          <input
            name="fecha"
            type="date"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hora *</label>
          <input
            name="hora"
            type="time"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {state && !state.success && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{state.message}</p>
          </div>
        )}

        {state?.success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 text-sm">{state.message}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 transition-colors"
          >
            {isPending ? "Registrando..." : "Registrar Visita"}
          </button>
        </div>
      </form>
    </div>
  );
}
