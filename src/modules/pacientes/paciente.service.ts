import type { ServiceResult } from "@/lib/interfaces/repository.interface";
import type { Paciente, CreatePacienteDTO } from "./types";
import { PacienteRepository } from "./paciente.repository";

export class PacienteService {
  constructor(private readonly repo: PacienteRepository) {}

  async getAll(): Promise<ServiceResult<Paciente[]>> {
    try {
      const data = await this.repo.findAll();
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async create(dto: CreatePacienteDTO): Promise<ServiceResult<Paciente>> {
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