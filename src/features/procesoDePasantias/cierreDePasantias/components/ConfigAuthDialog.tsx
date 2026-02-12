"use client";

import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../shared/components/ui/dialog";
import { Button } from "../../../../shared/components/ui/button";
import { Input } from "../../../../shared/components/ui/input";
import { Label } from "../../../../shared/components/ui/label";
import { Switch } from "../../../../shared/components/ui/switch";
import { Settings, Key, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";
import { AuthService } from "../services/authService";
import type { CierreAuthConfig } from "../types/auth";

interface ConfigAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfigAuthDialog = ({ open, onOpenChange }: ConfigAuthDialogProps) => {
  const [config, setConfig] = useState<CierreAuthConfig>(() => AuthService.getConfig());
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleLoadConfig = () => {
    setConfig(AuthService.getConfig());
    setNewPassword("");
    setConfirmPassword("");
    setMessage(null);
  };

  const handlePasswordChange = () => {
    if (!newPassword.trim()) {
      setMessage({ type: "error", text: "La nueva contraseña es requerida" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }

    if (newPassword.length < 4) {
      setMessage({ type: "error", text: "La contraseña debe tener al menos 4 caracteres" });
      return;
    }

    setIsSaving(true);
    
    const success = AuthService.updatePassword(newPassword, "admin");
    
    if (success) {
      setMessage({ type: "success", text: "Contraseña actualizada correctamente" });
      setConfig(AuthService.getConfig());
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setMessage({ type: "error", text: "Error al actualizar la contraseña" });
    }
    
    setIsSaving(false);
  };

  const handleToggleAuth = (enabled: boolean) => {
    const success = AuthService.toggleAuth(enabled);
    
    if (success) {
      setConfig(AuthService.getConfig());
      setMessage({ 
        type: "success", 
        text: enabled ? "Autenticación habilitada" : "Autenticación deshabilitada" 
      });
    } else {
      setMessage({ type: "error", text: "Error al cambiar la configuración" });
    }
  };

  const handleReset = () => {
    const success = AuthService.resetToDefault();
    
    if (success) {
      setConfig(AuthService.getConfig());
      setNewPassword("");
      setConfirmPassword("");
      setMessage({ type: "success", text: "Configuración restablecida" });
    } else {
      setMessage({ type: "error", text: "Error al restablecer configuración" });
    }
  };

  const handleClose = () => {
    handleLoadConfig();
    onOpenChange(false);
  };

  // Cargar configuración cuando se abre el diálogo
  React.useEffect(() => {
    if (open) {
      handleLoadConfig();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Configuración de Autenticación
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Status */}
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Estado Actual</h4>
                <p className="text-sm text-muted-foreground">
                  Último cambio: {new Date(config.lastChanged).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Cambiado por: {config.changedBy}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={config.isEnabled}
                  onCheckedChange={handleToggleAuth}
                />
                <span className="text-sm font-medium">
                  {config.isEnabled ? "Habilitado" : "Deshabilitado"}
                </span>
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Key className="h-4 w-4" />
              Cambiar Contraseña
            </h4>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Ingrese nueva contraseña"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type={showPasswords ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme nueva contraseña"
                />
              </div>
            </div>

            <Button 
              onClick={handlePasswordChange}
              disabled={isSaving || !newPassword.trim() || !confirmPassword.trim()}
              className="w-full"
            >
              {isSaving ? "Guardando..." : "Actualizar Contraseña"}
            </Button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-lg flex items-center gap-2 ${
              message.type === "success" 
                ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
                : "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-900"
            }`}>
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <span className="text-sm">{message.text}</span>
            </div>
          )}

          {/* Reset Button */}
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="w-full"
            >
              Restablecer Configuración por Defecto
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
