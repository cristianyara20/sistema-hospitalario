import type { Incapacidad } from "@/modules/incapacidades/types";
import { IncapacidadRepository } from "@/modules/incapacidades/incapacidad.repository";
import { IncapacidadService } from "@/modules/incapacidades/incapacidad.service";

export const metadata = { title: "Incapacidades" };

const service = new IncapacidadService(new IncapacidadRepository());

export default async function IncapacidadesPage() {
  const result = await service.getAll();

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <h2 className="text-red-700 font-semibold">Error al cargar incapacidades</h2>
        <p className="text-red-600 text-sm mt-1">{result.error}</p>
      </div>
    );
  }

  const incapacidades = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incapacidades</h1>
          <p className="text-sm text-gray-500 mt-1">
            {incapacidades.length} incapacidad{incapacidades.length !== 1 ? "es" : ""} registradas
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {incapacidades.length === 0 && (
          <div className="text-center py-16 text-gray-400 bg-white rounded-lg border border-gray-200">
            <p className="text-lg">No hay incapacidades registradas</p>
          </div>
        )}

        {incapacidades.map((incapacidad: Incapacidad) => (
          <div key={incapacidad.incapacidadId} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="font-semibold text-gray-900">
                Incapacidad #{incapacidad.incapacidadId}
              </h2>
              <p className="text-sm text-gray-500">
                Tratamiento #{incapacidad.tratamientoId} — {incapacidad.fecha}
              </p>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Descripcion</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Fecha Inicio</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Fecha Fin</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Dias</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {incapacidad.detalles.map((detalle) => (
                  <tr key={detalle.detalleId} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{detalle.descripcion}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.fechaInicio}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.fechaFin}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.numeroDias}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}