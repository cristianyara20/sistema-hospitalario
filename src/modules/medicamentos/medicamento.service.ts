import type { ServiceResult } from "@/lib/interfaces/repository.interface";
import type { Medicamento, CreateMedicamentoDTO } from "./types";
import { MedicamentoRepository } from "./medicamento.repository";

export class MedicamentoService {
  constructor(private readonly repo: MedicamentoRepository) {}

  async getAll(): Promise<ServiceResult<Medicamento[]>> {
    try {
      const data = await this.repo.findAll();
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async create(dto: CreateMedicamentoDTO): Promise<ServiceResult<Medicamento>> {
    try {
      const data = await this.repo.create(dto);
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async delete(id: number): Promise<ServiceResult<boolean>> {
    try {
      const deleted = await this.repo.delete(id);
      return { data: deleted, error: null, success: true };
    } catch (err) {
      return { data: false, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }
}