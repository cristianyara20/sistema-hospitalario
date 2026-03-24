import type { Paciente } from "@/modules/pacientes/types";
import { PacienteRepository } from "@/modules/pacientes/paciente.repository";
import { PacienteService } from "@/modules/pacientes/paciente.service";

export const metadata = { title: "Pacientes" };

const service = new PacienteService(new PacienteRepository());

export default async function PacientesPage() {
  const result = await service.getAll();

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <h2 className="text-red-700 font-semibold">Error al cargar pacientes</h2>
        <p className="text-red-600 text-sm mt-1">{result.error}</p>
      </div>
    );
  }

  const pacientes = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-sm text-gray-500 mt-1">
            {pacientes.length} paciente{pacientes.length !== 1 ? "s" : ""} registrados
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha Nacimiento</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Sexo</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Telefono</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Correo</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Direccion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pacientes.map((paciente: Paciente) => (
              <tr key={paciente.pacienteId} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">{paciente.pacienteId}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {paciente.nombre} {paciente.apellido}
                </td>
                <td className="px-4 py-3 text-gray-600">{paciente.fechaNacimiento}</td>
                <td className="px-4 py-3 text-gray-600">{paciente.sexo}</td>
                <td className="px-4 py-3 text-gray-600">{paciente.telefono}</td>
                <td className="px-4 py-3 text-gray-600">{paciente.correoElectronico}</td>
                <td className="px-4 py-3 text-gray-600">{paciente.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {pacientes.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay pacientes registrados</p>
          </div>
        )}
      </div>
    </div>
  );
}
