import type { Tratamiento } from "@/modules/tratamientos/types";
import { TratamientoRepository } from "@/modules/tratamientos/tratamiento.repository";
import { TratamientoService } from "@/modules/tratamientos/tratamiento.service";

export const metadata = { title: "Tratamientos" };

const service = new TratamientoService(new TratamientoRepository());

export default async function TratamientosPage() {
  const result = await service.getAll();

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <h2 className="text-red-700 font-semibold">Error al cargar tratamientos</h2>
        <p className="text-red-600 text-sm mt-1">{result.error}</p>
      </div>
    );
  }

  const tratamientos = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tratamientos</h1>
          <p className="text-sm text-gray-500 mt-1">
            {tratamientos.length} tratamiento{tratamientos.length !== 1 ? "s" : ""} registrados
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Visita ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha Inicio</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha Fin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tratamientos.map((t: Tratamiento) => (
              <tr key={t.tratamientoId} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">{t.tratamientoId}</td>
                <td className="px-4 py-3 text-gray-600">{t.visitaId}</td>
                <td className="px-4 py-3 text-gray-600">{t.fechaInicio}</td>
                <td className="px-4 py-3 text-gray-600">{t.fechaFin || "En curso"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {tratamientos.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay tratamientos registrados</p>
          </div>
        )}
      </div>
    </div>
  );
}