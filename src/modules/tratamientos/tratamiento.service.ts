import type { ServiceResult } from "@/lib/interfaces/repository.interface";
import type { Tratamiento, CreateTratamientoDTO } from "./types";
import { TratamientoRepository } from "./tratamiento.repository";

export class TratamientoService {
  constructor(private readonly repo: TratamientoRepository) {}

  async getAll(): Promise<ServiceResult<Tratamiento[]>> {
    try {
      const data = await this.repo.findAll();
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async getByVisita(visitaId: number): Promise<ServiceResult<Tratamiento[]>> {
    try {
      const data = await this.repo.findByVisita(visitaId);
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async create(dto: CreateTratamientoDTO): Promise<ServiceResult<Tratamiento>> {
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