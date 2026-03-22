import type { ServiceResult } from "@/lib/interfaces/repository.interface";
import type { Formula, CreateFormulaDTO } from "./types";
import { FormulaRepository } from "./formula.repository";

export class FormulaService {
  constructor(private readonly repo: FormulaRepository) {}

  async getByTratamiento(tratamientoId: number): Promise<ServiceResult<Formula[]>> {
    try {
      const data = await this.repo.findByTratamiento(tratamientoId);
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async create(dto: CreateFormulaDTO): Promise<ServiceResult<Formula>> {
    try {
      const data = await this.repo.createConDetalles(dto);
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }
}