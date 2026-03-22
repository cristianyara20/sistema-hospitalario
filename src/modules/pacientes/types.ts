export interface Paciente {
  pacienteId: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  sexo: string;
  direccion: string;
  telefono: string;
  correoElectronico: string;
}

export type CreatePacienteDTO = Omit<Paciente, "pacienteId">;
export type UpdatePacienteDTO = Partial<CreatePacienteDTO>;