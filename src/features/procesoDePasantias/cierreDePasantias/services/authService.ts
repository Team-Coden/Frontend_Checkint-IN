import type { CierreAuthConfig, AuthValidation } from "../types/auth";
import { DEFAULT_CIERRE_CONFIG } from "../types/auth";

export class AuthService {
  private static readonly STORAGE_KEY = "cierre_auth_config";

  static getConfig(): CierreAuthConfig {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn("Error reading auth config from localStorage:", error);
    }
    
    // Si no hay configuración guardada, usar la por defecto
    this.saveConfig(DEFAULT_CIERRE_CONFIG);
    return DEFAULT_CIERRE_CONFIG;
  }

  static saveConfig(config: CierreAuthConfig): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error("Error saving auth config to localStorage:", error);
    }
  }

  static updatePassword(newPassword: string, changedBy: string = "admin"): boolean {
    try {
      const currentConfig = this.getConfig();
      const updatedConfig: CierreAuthConfig = {
        ...currentConfig,
        password: newPassword,
        lastChanged: new Date().toISOString(),
        changedBy
      };
      
      this.saveConfig(updatedConfig);
      return true;
    } catch (error) {
      console.error("Error updating password:", error);
      return false;
    }
  }

  static validatePassword(inputPassword: string): AuthValidation {
    try {
      const config = this.getConfig();
      
      if (!config.isEnabled) {
        return { isValid: true }; // Si está deshabilitado, permite el acceso
      }

      if (!inputPassword || inputPassword.trim() === "") {
        return { isValid: false, error: "La contraseña es requerida" };
      }

      if (inputPassword !== config.password) {
        return { isValid: false, error: "Contraseña incorrecta" };
      }

      return { isValid: true };
    } catch {
      return { isValid: false, error: "Error al validar la contraseña" };
    }
  }

  static toggleAuth(enabled: boolean): boolean {
    try {
      const currentConfig = this.getConfig();
      const updatedConfig: CierreAuthConfig = {
        ...currentConfig,
        isEnabled: enabled,
        lastChanged: new Date().toISOString(),
        changedBy: "admin"
      };
      
      this.saveConfig(updatedConfig);
      return true;
    } catch (error) {
      console.error("Error toggling auth:", error);
      return false;
    }
  }

  static resetToDefault(): boolean {
    try {
      this.saveConfig(DEFAULT_CIERRE_CONFIG);
      return true;
    } catch (error) {
      console.error("Error resetting to default:", error);
      return false;
    }
  }

  static isAuthEnabled(): boolean {
    try {
      const config = this.getConfig();
      return config.isEnabled;
    } catch {
      return true; // Por defecto, habilitado
    }
  }
}
