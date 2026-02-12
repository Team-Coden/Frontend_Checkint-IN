export interface CierrePasantia {
  id: string;
  accion: string;
  descripcion: string;
  estado: "pendiente" | "en_proceso" | "completado" | "error";
  fechaEjecucion?: string;
  detalles?: string;
}

export interface CierreStats {
  total: number;
  pendientes: number;
  enProceso: number;
  completados: number;
  errores: number;
}

export interface CierreProcess {
  plazasActualizadas: number;
  usuariosActualizados: number;
  fechasActualizadas: number;
  errores: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type CierreStep = "plazas" | "usuarios" | "fechas" | "finalizado";
