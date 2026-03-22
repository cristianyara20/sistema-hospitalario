import type { ServiceResult } from "@/lib/interfaces/repository.interface";
import type { OrdenExamen } from "./types";
import { ExamenRepository } from "./examen.repository";

export class ExamenService {
  constructor(private readonly repo: ExamenRepository) {}

  async getAll(): Promise<ServiceResult<OrdenExamen[]>> {
    try {
      const data = await this.repo.findAll();
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async getByVisita(visitaId: number): Promise<ServiceResult<OrdenExamen[]>> {
    try {
      const data = await this.repo.findByVisita(visitaId);
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