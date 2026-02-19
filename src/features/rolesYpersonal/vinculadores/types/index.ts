export interface Vinculador {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  id_centro_trabajo: number;
  nombre_centro: string;
  estado: 'activo' | 'inactivo';
  id_contacto: number;
  fecha_creacion: string;
  nombre_contacto: string;
  deletedAt?: string;
}

export interface VinculadorFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  id_centro_trabajo: number;
  estado: 'activo' | 'inactivo';
}

export interface VinculadorStats {
  total: number;
  activos: number;
  inactivos: number;
}
