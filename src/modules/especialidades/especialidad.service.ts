import type { ServiceResult } from "@/lib/interfaces/repository.interface";
import type { Especialidad, CreateEspecialidadDTO } from "./types";
import { EspecialidadRepository } from "./especialidad.repository";

export class EspecialidadService {
  constructor(private readonly repo: EspecialidadRepository) {}

  async getAll(): Promise<ServiceResult<Especialidad[]>> {
    try {
      const data = await this.repo.findAll();
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async create(dto: CreateEspecialidadDTO): Promise<ServiceResult<Especialidad>> {
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