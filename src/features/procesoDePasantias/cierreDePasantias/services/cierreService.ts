import type { CierreProcess, ApiResponse } from "../types";

export class CierreService {

  static async actualizarPlazas(): Promise<ApiResponse<number>> {
    try {
      // Simulación de actualización de plazas
      await this.simulateDelay(1500);
      
      // Simulación de posible error (10% de probabilidad)
      if (Math.random() < 0.1) {
        throw new Error("Error al conectar con la base de datos de plazas");
      }

      const plazasActualizadas = Math.floor(Math.random() * 50) + 10;
      
      return {
        success: true,
        data: plazasActualizadas,
        message: `${plazasActualizadas} plazas actualizadas correctamente`
      };
    } catch (error) {
      return {
        success: false,
        data: 0,
        message: error instanceof Error ? error.message : "Error desconocido"
      };
    }
  }

  static async actualizarUsuarios(): Promise<ApiResponse<number>> {
    try {
      // Simulación de actualización de usuarios
      await this.simulateDelay(2000);
      
      // Simulación de posible error (15% de probabilidad)
      if (Math.random() < 0.15) {
        throw new Error("Error al actualizar estados de usuarios");
      }

      const usuariosActualizados = Math.floor(Math.random() * 100) + 20;
      
      return {
        success: true,
        data: usuariosActualizados,
        message: `${usuariosActualizados} usuarios actualizados correctamente`
      };
    } catch (error) {
      return {
        success: false,
        data: 0,
        message: error instanceof Error ? error.message : "Error desconocido"
      };
    }
  }

  static async actualizarFechasFin(): Promise<ApiResponse<number>> {
    try {
      // Simulación de actualización de fechas
      await this.simulateDelay(1000);
      
      // Simulación de posible error (5% de probabilidad)
      if (Math.random() < 0.05) {
        throw new Error("Error al actualizar fechas de finalización");
      }

      const fechasActualizadas = Math.floor(Math.random() * 30) + 5;
      
      return {
        success: true,
        data: fechasActualizadas,
        message: `${fechasActualizadas} fechas actualizadas correctamente`
      };
    } catch (error) {
      return {
        success: false,
        data: 0,
        message: error instanceof Error ? error.message : "Error desconocido"
      };
    }
  }

  static async ejecutarCierreCompleto(): Promise<ApiResponse<CierreProcess>> {
    const process: CierreProcess = {
      plazasActualizadas: 0,
      usuariosActualizados: 0,
      fechasActualizadas: 0,
      errores: []
    };

    try {
      // Paso 1: Actualizar plazas
      const plazasResult = await this.actualizarPlazas();
      if (plazasResult.success) {
        process.plazasActualizadas = plazasResult.data;
      } else {
        process.errores.push(`Plazas: ${plazasResult.message}`);
      }

      // Paso 2: Actualizar usuarios
      const usuariosResult = await this.actualizarUsuarios();
      if (usuariosResult.success) {
        process.usuariosActualizados = usuariosResult.data;
      } else {
        process.errores.push(`Usuarios: ${usuariosResult.message}`);
      }

      // Paso 3: Actualizar fechas
      const fechasResult = await this.actualizarFechasFin();
      if (fechasResult.success) {
        process.fechasActualizadas = fechasResult.data;
      } else {
        process.errores.push(`Fechas: ${fechasResult.message}`);
      }

      const success = process.errores.length === 0;
      
      return {
        success,
        data: process,
        message: success 
          ? "Cierre de pasantías completado exitosamente" 
          : "Cierre completado con errores"
      };

    } catch (error) {
      process.errores.push(error instanceof Error ? error.message : "Error crítico en el proceso");
      
      return {
        success: false,
        data: process,
        message: "Error crítico durante el proceso de cierre"
      };
    }
  }

  static async generarResumen(): Promise<ApiResponse<Record<string, unknown> | null>> {
    try {
      await this.simulateDelay(500);
      
      const resumen = {
        fecha: new Date().toISOString(),
        proceso: "Cierre de Pasantías",
        estado: "Completado",
        detalles: {
          plazasProcesadas: Math.floor(Math.random() * 50) + 10,
          usuariosProcesados: Math.floor(Math.random() * 100) + 20,
          fechasActualizadas: Math.floor(Math.random() * 30) + 5,
          duracion: Math.floor(Math.random() * 5000) + 3000 + "ms"
        }
      };

      return {
        success: true,
        data: resumen,
        message: "Resumen generado correctamente"
      };
    } catch {
      return {
        success: false,
        data: null,
        message: "Error al generar resumen"
      };
    }
  }

  private static simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async exportarDatos(): Promise<ApiResponse<string>> {
    try {
      await this.simulateDelay(800);
      
      const csv = [
        ["Módulo", "Acción", "Registros Afectados", "Estado", "Timestamp"],
        ["Plazas", "Actualizar estado inactivo", Math.floor(Math.random() * 50) + 10, "Completado", new Date().toISOString()],
        ["Usuarios", "Actualizar estado eliminado", Math.floor(Math.random() * 100) + 20, "Completado", new Date().toISOString()],
        ["Pasantías", "Actualizar fechas de fin", Math.floor(Math.random() * 30) + 5, "Completado", new Date().toISOString()]
      ].map(row => row.join(",")).join("\n");

      return {
        success: true,
        data: csv,
        message: "Datos exportados correctamente"
      };
    } catch {
      return {
        success: false,
        data: "",
        message: "Error al exportar datos"
      };
    }
  }
}
