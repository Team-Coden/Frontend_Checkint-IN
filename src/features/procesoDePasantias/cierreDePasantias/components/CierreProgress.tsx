"use client";

import { Card, CardContent } from "../../../../shared/components/ui/card";
import { CheckCircle, Clock, AlertTriangle, RotateCcw } from "lucide-react";
import type { CierreStep } from "../types";

interface StepInfo {
  id: CierreStep;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: StepInfo[] = [
  {
    id: "plazas",
    title: "Actualizar Plazas",
    description: "Todas las plazas pasarán a estado inactivo",
    icon: <RotateCcw className="h-4 w-4" />,
  },
  {
    id: "usuarios",
    title: "Actualizar Usuarios",
    description: "Usuarios relacionados pasarán a estado Eliminado",
    icon: <RotateCcw className="h-4 w-4" />,
  },
  {
    id: "fechas",
    title: "Actualizar Fechas",
    description: "Establecer fecha actual como fecha de fin",
    icon: <RotateCcw className="h-4 w-4" />,
  },
  {
    id: "finalizado",
    title: "Proceso Completado",
    description: "Cierre de pasantías finalizado",
    icon: <CheckCircle className="h-4 w-4" />,
  },
];

interface CierreProgressProps {
  currentStep: CierreStep | null;
  getStepProgress: (step: CierreStep) => number;
  getStepStatus: (step: CierreStep) => "pending" | "processing" | "completed" | "error";
  process?: {
    plazasActualizadas: number;
    usuariosActualizados: number;
    fechasActualizadas: number;
    errores: string[];
  } | null;
}

export const CierreProgress = ({ 
  currentStep, 
  getStepProgress, 
  getStepStatus, 
  process 
}: CierreProgressProps) => {
  const getStatusIcon = (status: "pending" | "processing" | "completed" | "error") => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "processing":
        return <RotateCcw className="h-4 w-4 text-blue-600 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: "pending" | "processing" | "completed" | "error") => {
    switch (status) {
      case "pending":
        return "border-muted bg-muted/20";
      case "processing":
        return "border-blue-200 bg-blue-50 dark:bg-blue-950/20";
      case "completed":
        return "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20";
      case "error":
        return "border-red-200 bg-red-50 dark:bg-red-950/20";
    }
  };

  const getProgressColor = (status: "pending" | "processing" | "completed" | "error") => {
    switch (status) {
      case "pending":
        return "bg-muted";
      case "processing":
        return "bg-blue-600";
      case "completed":
        return "bg-emerald-600";
      case "error":
        return "bg-red-600";
    }
  };

  const getStepDetails = (stepId: CierreStep) => {
    if (!process) return null;
    
    switch (stepId) {
      case "plazas":
        return process.plazasActualizadas > 0 
          ? `${process.plazasActualizadas} plazas actualizadas`
          : null;
      case "usuarios":
        return process.usuariosActualizados > 0 
          ? `${process.usuariosActualizados} usuarios actualizados`
          : null;
      case "fechas":
        return process.fechasActualizadas > 0 
          ? `${process.fechasActualizadas} fechas actualizadas`
          : null;
      case "finalizado":
        return process.errores.length > 0 
          ? `${process.errores.length} errores encontrados`
          : "Proceso completado exitosamente";
      default:
        return null;
    }
  };

  return (
    <Card className="border">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Progreso del Cierre</h3>
        
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const progress = getStepProgress(step.id);
            const details = getStepDetails(step.id);
            const isActive = currentStep === step.id;
            
            return (
              <div
                key={step.id}
                className={`p-4 rounded-lg border transition-all ${
                  isActive ? "ring-2 ring-blue-500 ring-offset-2" : ""
                } ${getStatusColor(status)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getStatusIcon(status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{step.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {progress}%
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    
                    {details && (
                      <p className="text-sm font-medium text-foreground mb-3">
                        {details}
                      </p>
                    )}
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${getProgressColor(status)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="ml-5 mt-2 mb-2 w-0.5 h-4 bg-muted" />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Error Summary */}
        {process && process.errores.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
            <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">
              Errores Detectados
            </h4>
            <ul className="text-sm text-red-800 dark:text-red-400 space-y-1">
              {process.errores.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
