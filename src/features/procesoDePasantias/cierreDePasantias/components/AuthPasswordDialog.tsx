"use client";

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
import { Alert, AlertDescription } from "../../../../shared/components/ui/alert";
import { Eye, EyeOff, Key, AlertTriangle } from "lucide-react";
import type { AuthValidation } from "../types/auth";

interface AuthPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (password: string) => void;
  isLoading?: boolean;
}

export const AuthPasswordDialog = ({ 
  open, 
  onOpenChange, 
  onConfirm, 
  isLoading = false 
}: AuthPasswordDialogProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState<AuthValidation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setValidation({ isValid: false, error: "La contraseña es requerida" });
      return;
    }

    onConfirm(password);
  };

  const handleClose = () => {
    setPassword("");
    setShowPassword(false);
    setValidation(null);
    onOpenChange(false);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (validation && !validation.isValid) {
      setValidation(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-amber-600" />
            Autenticación Requerida
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Warning Message */}
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-300">
              Esta acción requiere autorización. Por favor, ingrese la contraseña de administrador para continuar con el cierre de pasantías.
            </AlertDescription>
          </Alert>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña de Administrador</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Ingrese la contraseña"
                className="pr-10"
                disabled={isLoading}
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            
            {/* Validation Error */}
            {validation && !validation.isValid && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {validation.error}
              </p>
            )}
          </div>

          {/* Info Message */}
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
            <p>
              <strong>Nota:</strong> La contraseña por defecto es "admin123". 
              Puede ser cambiada en la configuración del sistema.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !password.trim()}
            >
              {isLoading ? "Verificando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
