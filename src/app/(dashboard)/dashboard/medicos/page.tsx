import type { MedicoConRelaciones } from "@/modules/medicos/types";
import { MedicoRepository } from "@/modules/medicos/medico.repository";
import { MedicoService } from "@/modules/medicos/medico.service";

export const metadata = { title: "Medicos" };

const service = new MedicoService(new MedicoRepository());

export default async function MedicosPage() {
  const result = await service.getAll();

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <h2 className="text-red-700 font-semibold">Error al cargar medicos</h2>
        <p className="text-red-600 text-sm mt-1">{result.error}</p>
      </div>
    );
  }

  const medicos = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medicos</h1>
          <p className="text-sm text-gray-500 mt-1">
            {medicos.length} médico{medicos.length !== 1 ? "s" : ""} registrados
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Especialidad</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Hospital</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Telefono</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Correo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {medicos.map((medico: MedicoConRelaciones) => (
              <tr key={medico.medicoId} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">{medico.medicoId}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {medico.nombre} {medico.apellido}
                </td>
                <td className="px-4 py-3 text-gray-600">{medico.especialidad.nombre}</td>
                <td className="px-4 py-3 text-gray-600">{medico.hospital.nombre}</td>
                <td className="px-4 py-3 text-gray-600">{medico.telefono}</td>
                <td className="px-4 py-3 text-gray-600">{medico.correoElectronico}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {medicos.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay medicos registrados</p>
          </div>
        )}
      </div>
    </div>
  );
}
