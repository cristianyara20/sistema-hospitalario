import type { ServiceResult } from "@/lib/interfaces/repository.interface";
import type { Incapacidad } from "./types";
import { IncapacidadRepository } from "./incapacidad.repository";

export class IncapacidadService {
  constructor(private readonly repo: IncapacidadRepository) {}

  async getAll(): Promise<ServiceResult<Incapacidad[]>> {
    try {
      const data = await this.repo.findAll();
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async getByTratamiento(tratamientoId: number): Promise<ServiceResult<Incapacidad[]>> {
    try {
      const data = await this.repo.findByTratamiento(tratamientoId);
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