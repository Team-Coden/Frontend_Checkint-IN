'use client';

import { useState, useCallback, useMemo } from "react";
import { CierreService } from "../services/cierreService";
import { AuthService } from "../services/authService";
import type { CierreStats, CierreProcess, CierreStep } from "../types";

export const useCierrePasantias = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<CierreStep | null>(null);
  const [process, setProcess] = useState<CierreProcess | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Estadísticas simuladas para el dashboard
  const stats = useMemo<CierreStats>(() => ({
    total: 3,
    pendientes: 3,
    enProceso: 0,
    completados: 0,
    errores: 0,
  }), []);

  const resetProcess = useCallback(() => {
    setProcess(null);
    setError(null);
    setCurrentStep(null);
  }, []);

  const executeCierre = useCallback(async (): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);
    resetProcess();

    try {
      setCurrentStep("plazas");
      
      const result = await CierreService.ejecutarCierreCompleto();
      
      if (result.success && result.data) {
        setProcess(result.data);
        setCurrentStep("finalizado");
        return true;
      } else {
        setError(result.message || "Error durante el proceso de cierre");
        setProcess(result.data || null);
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
      setCurrentStep(null);
    }
  }, [resetProcess]);

  const validatePassword = useCallback((password: string): boolean => {
    const validation = AuthService.validatePassword(password);
    
    if (!validation.isValid) {
      setError(validation.error || "Error de autenticación");
      return false;
    }
    
    return true;
  }, []);

  const executeCierreWithAuth = useCallback(async (password: string): Promise<boolean> => {
    // Primero validar la contraseña
    if (!validatePassword(password)) {
      return false;
    }

    // Si la validación es exitosa, ejecutar el cierre
    return executeCierre();
  }, [validatePassword, executeCierre]);

  const isAuthEnabled = useMemo(() => {
    return AuthService.isAuthEnabled();
  }, []);

  const exportData = useCallback(async (): Promise<string | null> => {
    setIsExporting(true);
    
    try {
      const result = await CierreService.exportarDatos();
      if (result.success && result.data) {
        return result.data;
      } else {
        setError(result.message || "Error al exportar datos");
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      return null;
    } finally {
      setIsExporting(false);
    }
  }, []);

  const downloadCSV = useCallback((csvData: string, filename: string = "cierre_pasantias.csv") => {
    try {
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al descargar el archivo";
      setError(errorMessage);
      return false;
    }
  }, []);

  const exportAndDownload = useCallback(async (): Promise<boolean> => {
    const csvData = await exportData();
    if (csvData) {
      return downloadCSV(csvData);
    }
    return false;
  }, [exportData, downloadCSV]);

  const getStepProgress = useCallback((step: CierreStep): number => {
    if (!process) return 0;
    
    switch (step) {
      case "plazas":
        return process.plazasActualizadas > 0 ? 100 : 0;
      case "usuarios":
        return process.usuariosActualizados > 0 ? 100 : 0;
      case "fechas":
        return process.fechasActualizadas > 0 ? 100 : 0;
      case "finalizado":
        return process.errores.length === 0 ? 100 : 80;
      default:
        return 0;
    }
  }, [process]);

  const getStepStatus = useCallback((step: CierreStep): "pending" | "processing" | "completed" | "error" => {
    if (currentStep === step) return "processing";
    if (!process) return "pending";
    
    switch (step) {
      case "plazas":
        return process.plazasActualizadas > 0 ? "completed" : "pending";
      case "usuarios":
        return process.usuariosActualizados > 0 ? "completed" : "pending";
      case "fechas":
        return process.fechasActualizadas > 0 ? "completed" : "pending";
      case "finalizado":
        return process.errores.length > 0 ? "error" : (currentStep === null ? "completed" : "pending");
      default:
        return "pending";
    }
  }, [currentStep, process]);

  const hasErrors = useMemo(() => {
    return process?.errores && process.errores.length > 0;
  }, [process]);

  const totalProcessed = useMemo(() => {
    if (!process) return 0;
    return process.plazasActualizadas + process.usuariosActualizados + process.fechasActualizadas;
  }, [process]);

  return {
    // Estado
    isProcessing,
    currentStep,
    process,
    error,
    isExporting,
    stats,
    hasErrors,
    totalProcessed,
    isAuthEnabled,
    
    // Acciones
    executeCierre,
    executeCierreWithAuth,
    exportAndDownload,
    resetProcess,
    validatePassword,
    
    // Utilidades
    getStepProgress,
    getStepStatus,
  };
};
