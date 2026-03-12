export interface Feedback {
  id: number;
  usuario: string;
  email: string;
  tipo: 'Queja' | 'Sugerencia' | 'Felicitación' | 'Otro';
  modulo: string;
  asunto: string;
  mensaje: string;
  estado: 'Pendiente' | 'En Revisión' | 'Resuelto' | 'Cerrado';
  prioridad: 'Baja' | 'Media' | 'Alta' | 'Urgente';
  fechaCreacion: string;
  fechaActualizacion?: string;
  respuesta?: string;
  calificacion?: number;
}

export interface FeedbackStats {
  total: number;
  pendientes: number;
  enRevision: number;
  resueltos: number;
  cerrados: number;
  quejas: number;
  sugerencias: number;
  felicitaciones: number;
  otros: number;
}
