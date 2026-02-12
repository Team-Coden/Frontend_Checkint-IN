import type { Pasantia, CreatePasantiaData, ApiResponse, PaginatedResponse, PasantiaQueryParams } from "../types";

const API_BASE_URL = "http://localhost:3001/api/pasantias";

// ==========================================
// SERVICIO DE PASANTIAS
// ==========================================

export const pasantiaService = {
  // Obtener todas las pasantías con paginación y filtros
  async getPasantias(params?: PasantiaQueryParams): Promise<PaginatedResponse<Pasantia[]>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.search) queryParams.append('search', params.search);
      if (params?.estado) queryParams.append('estado', params.estado);
      if (params?.taller) queryParams.append('taller', params.taller);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());

      const response = await fetch(`${API_BASE_URL}?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching pasantias:', error);
      throw error;
    }
  },

  // Obtener una pasantía por ID
  async getPasantiaById(id: string): Promise<ApiResponse<Pasantia>> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching pasantia by ID:', error);
      throw error;
    }
  },

  // Crear una nueva pasantía
  async createPasantia(data: CreatePasantiaData): Promise<ApiResponse<Pasantia>> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating pasantia:', error);
      throw error;
    }
  },

  // Actualizar una pasantía existente
  async updatePasantia(id: string, data: Partial<Pasantia>): Promise<ApiResponse<Pasantia>> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating pasantia:', error);
      throw error;
    }
  },

  // Actualizar estado de una pasantía
  async updatePasantiaEstado(id: string, estado: Pasantia['estado']): Promise<ApiResponse<Pasantia>> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating pasantia estado:', error);
      throw error;
    }
  },

  // Eliminar una pasantía
  async deletePasantia(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting pasantia:', error);
      throw error;
    }
  },

  // Exportar pasantías a CSV
  async exportPasantias(params?: PasantiaQueryParams): Promise<Blob> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.search) queryParams.append('search', params.search);
      if (params?.estado) queryParams.append('estado', params.estado);
      if (params?.taller) queryParams.append('taller', params.taller);

      const response = await fetch(`${API_BASE_URL}/export?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error exporting pasantias:', error);
      throw error;
    }
  },

  // Obtener estadísticas de pasantías
  async getPasantiaStats(): Promise<ApiResponse<{
    total: number;
    activas: number;
    completadas: number;
    pendientes: number;
    suspendidas: number;
  }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching pasantia stats:', error);
      throw error;
    }
  },
};
