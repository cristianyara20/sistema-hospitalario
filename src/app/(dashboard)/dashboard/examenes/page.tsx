import type { OrdenExamen } from "@/modules/examenes/types";
import { ExamenRepository } from "@/modules/examenes/examen.repository";
import { ExamenService } from "@/modules/examenes/examen.service";

export const metadata = { title: "Examenes" };

const service = new ExamenService(new ExamenRepository());

export default async function ExamenesPage() {
  const result = await service.getAll();

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <h2 className="text-red-700 font-semibold">Error al cargar examenes</h2>
        <p className="text-red-600 text-sm mt-1">{result.error}</p>
      </div>
    );
  }

  const ordenes = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Examenes</h1>
          <p className="text-sm text-gray-500 mt-1">
            {ordenes.length} orden{ordenes.length !== 1 ? "es" : ""} registradas
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {ordenes.length === 0 && (
          <div className="text-center py-16 text-gray-400 bg-white rounded-lg border border-gray-200">
            <p className="text-lg">No hay examenes registrados</p>
          </div>
        )}

        {ordenes.map((orden: OrdenExamen) => (
          <div key={orden.ordenExamenId} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="font-semibold text-gray-900">Orden #{orden.ordenExamenId}</h2>
              <p className="text-sm text-gray-500">
                Visita #{orden.visitaId} — {orden.fecha}
              </p>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Examen</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Tipo</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Indicaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orden.detalles.map((detalle) => (
                  <tr key={detalle.detalleExamenId} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{detalle.nombreExamen}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.tipoExamen}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.indicaciones || "—"}</td>
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