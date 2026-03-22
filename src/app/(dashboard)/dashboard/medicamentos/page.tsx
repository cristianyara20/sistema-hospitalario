import { MedicamentoRepository } from "@/modules/medicamentos/medicamento.repository";
import { MedicamentoService } from "@/modules/medicamentos/medicamento.service";

export const metadata = { title: "Medicamentos" };

const service = new MedicamentoService(new MedicamentoRepository());

export default async function MedicamentosPage() {
  const result = await service.getAll();

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-6">
        <h2 className="text-red-700 font-semibold">Error al cargar medicamentos</h2>
        <p className="text-red-600 text-sm mt-1">{result.error}</p>
      </div>
    );
  }

  const medicamentos = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medicamentos</h1>
          <p className="text-sm text-gray-500 mt-1">
            {medicamentos.length} medicamento{medicamentos.length !== 1 ? "s" : ""} registrados
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Prescripcion</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Unidades</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Cantidad</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Descripcion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {medicamentos.map((med) => (
              <tr key={med.medicamentoId} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{med.nombre}</td>
                <td className="px-4 py-3 text-gray-600">{med.prescripcion}</td>
                <td className="px-4 py-3 text-gray-600">{med.unidades}</td>
                <td className="px-4 py-3 text-gray-600">{med.cantidad}</td>
                <td className="px-4 py-3 text-gray-600">{med.descripcion || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {medicamentos.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay medicamentos registrados</p>
          </div>
        )}
      </div>
    </div>
  );
}