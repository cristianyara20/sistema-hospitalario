import { VisitaRepository } from "@/modules/visitas/visita.repository";
import { VisitaService } from "@/modules/visitas/visita.service";
import Link from "next/link";

export const metadata = { title: "Visitas" };

const service = new VisitaService(new VisitaRepository());

export default async function VisitasPage() {
  const result = await service.getAll();

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <h2 className="text-red-700 font-semibold">Error al cargar visitas</h2>
        <p className="text-red-600 text-sm mt-1">{result.error}</p>
      </div>
    );
  }

  const visitas = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visitas</h1>
          <p className="text-sm text-gray-500 mt-1">
            {visitas.length} visita{visitas.length !== 1 ? "s" : ""} registradas
          </p>
        </div>
        <Link
          href="/dashboard/visitas/nueva"
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          + Nueva Visita
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Fecha</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Hora</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Paciente</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Medico</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {visitas.map((visita: any, index: number) => (
              <tr key={visita.visitaid || visita.visitaId || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">{visita.visitaid || visita.visitaId}</td>
                <td className="px-4 py-3 text-gray-600">{visita.fecha}</td>
                <td className="px-4 py-3 text-gray-600">{visita.hora}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {visita.pacientes?.nombre
                    ? `${visita.pacientes.nombre} ${visita.pacientes.apellido}`
                    : visita.paciente?.nombre
                    ? `${visita.paciente.nombre} ${visita.paciente.apellido}`
                    : `Paciente ${visita.pacienteid || visita.pacienteId}`}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {visita.medicos?.nombre
                    ? `Dr. ${visita.medicos.nombre} ${visita.medicos.apellido}`
                    : visita.medico?.nombre
                    ? `Dr. ${visita.medico.nombre} ${visita.medico.apellido}`
                    : `Medico ${visita.medicoid || visita.medicoId}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visitas.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay visitas registradas</p>
          </div>
        )}
      </div>
    </div>
  );
}
