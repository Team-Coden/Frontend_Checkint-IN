export interface CierreAuthConfig {
  password: string;
  isEnabled: boolean;
  lastChanged: string;
  changedBy: string;
}

export interface AuthValidation {
  isValid: boolean;
  error?: string;
}

export const DEFAULT_CIERRE_CONFIG: CierreAuthConfig = {
  password: "admin123", // Contraseña por defecto
  isEnabled: true,
  lastChanged: new Date().toISOString(),
  changedBy: "system"
};
