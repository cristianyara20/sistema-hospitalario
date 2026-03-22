import type { Formula } from "@/modules/formulas/types";
import { FormulaRepository } from "@/modules/formulas/formula.repository";
import { FormulaService } from "@/modules/formulas/formula.service";

export const metadata = { title: "Formulas" };

const repo = new FormulaRepository();

export default async function FormulasPage() {
  const formulas: Formula[] = await repo.findAll();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Formulas</h1>
          <p className="text-sm text-gray-500 mt-1">
            {formulas.length} formula{formulas.length !== 1 ? "s" : ""} registradas
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {formulas.length === 0 && (
          <div className="text-center py-16 text-gray-400 bg-white rounded-lg border border-gray-200">
            <p className="text-lg">No hay formulas registradas</p>
          </div>
        )}

        {formulas.map((formula: Formula) => (
          <div key={formula.formulaId} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">Formula #{formula.formulaId}</h2>
                <p className="text-sm text-gray-500">
                  Tratamiento #{formula.tratamientoId} — {formula.fecha}
                </p>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Medicamento</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Posologia</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Periodo</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Periodicidad</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Presentacion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {formula.detalles.map((detalle) => (
                  <tr key={detalle.detalleId} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{detalle.medicamento.nombre}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.posologia}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.periodoUso}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.periodicidadUso}</td>
                    <td className="px-3 py-2 text-gray-600">{detalle.presentacion}</td>
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