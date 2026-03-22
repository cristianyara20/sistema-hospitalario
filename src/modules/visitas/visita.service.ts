import type { ServiceResult } from "@/lib/interfaces/repository.interface";
import type { VisitaCompleta, CreateVisitaCompletaDTO } from "./types";
import { VisitaRepository } from "./visita.repository";

export class VisitaService {
  constructor(private readonly repo: VisitaRepository) {}

  async getByPaciente(pacienteId: number): Promise<ServiceResult<VisitaCompleta[]>> {
    try {
      const data = await this.repo.findByPaciente(pacienteId);
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async getAll(): Promise<ServiceResult<VisitaCompleta[]>> {
    try {
      const supabase_data = await this.repo.findAll();
      return { data: supabase_data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }

  async create(dto: CreateVisitaCompletaDTO): Promise<ServiceResult<VisitaCompleta>> {
    try {
      const data = await this.repo.createCompleta(dto);
      return { data, error: null, success: true };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : "Error", success: false };
    }
  }
}