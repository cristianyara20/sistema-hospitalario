import { EspecialidadRepository } from "@/modules/especialidades/especialidad.repository";
import { EspecialidadService } from "@/modules/especialidades/especialidad.service";

export const metadata = { title: "Especialidades" };

const service = new EspecialidadService(new EspecialidadRepository());

export default async function EspecialidadesPage() {
  const result = await service.getAll();

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <h2 className="text-red-700 font-semibold">Error al cargar especialidades</h2>
        <p className="text-red-600 text-sm mt-1">{result.error}</p>
      </div>
    );
  }

  const especialidades = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Especialidades</h1>
          <p className="text-sm text-gray-500 mt-1">
            {especialidades.length} especialidad{especialidades.length !== 1 ? "es" : ""} registradas
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {especialidades.map((esp) => (
              <tr key={esp.especialidadId} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">{esp.especialidadId}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{esp.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {especialidades.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay especialidades registradas</p>
          </div>
        )}
      </div>
    </div>
  );
}