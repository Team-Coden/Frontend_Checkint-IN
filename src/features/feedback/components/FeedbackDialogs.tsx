import { useState } from "react";
import { Button } from "../../../shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../shared/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/components/ui/select";
import { Input } from "../../../shared/components/ui/input";
import { Label } from "../../../shared/components/ui/label";
import { Textarea } from "../../../shared/components/ui/textarea";
import type { Feedback } from "../types";

// Create Feedback Dialog
interface CreateFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (feedback: Omit<Feedback, 'id' | 'fechaCreacion'>) => void;
  modulos: string[];
}

export function CreateFeedbackDialog({ open, onOpenChange, onSubmit, modulos }: CreateFeedbackDialogProps) {
  const [formData, setFormData] = useState({
    usuario: "",
    email: "",
    tipo: "Sugerencia" as Feedback['tipo'],
    modulo: "",
    asunto: "",
    mensaje: "",
    prioridad: "Media" as Feedback['prioridad'],
    estado: "Pendiente" as Feedback['estado'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      usuario: "",
      email: "",
      tipo: "Sugerencia",
      modulo: "",
      asunto: "",
      mensaje: "",
      prioridad: "Media",
      estado: "Pendiente",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nuevo Feedback</DialogTitle>
          <DialogDescription>
            Registra un nuevo feedback o sugerencia del usuario.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Nombre</Label>
              <Input
                id="usuario"
                value={formData.usuario}
                onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                placeholder="Nombre del usuario"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={formData.tipo} onValueChange={(value: Feedback['tipo']) => setFormData({ ...formData, tipo: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Queja">Queja</SelectItem>
                  <SelectItem value="Sugerencia">Sugerencia</SelectItem>
                  <SelectItem value="Felicitación">Felicitación</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Módulo</Label>
              <Select value={formData.modulo} onValueChange={(value) => setFormData({ ...formData, modulo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar módulo" />
                </SelectTrigger>
                <SelectContent>
                  {modulos.map((modulo) => (
                    <SelectItem key={modulo} value={modulo}>
                      {modulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Prioridad</Label>
              <Select value={formData.prioridad} onValueChange={(value: Feedback['prioridad']) => setFormData({ ...formData, prioridad: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baja">Baja</SelectItem>
                  <SelectItem value="Media">Media</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="asunto">Asunto</Label>
            <Input
              id="asunto"
              value={formData.asunto}
              onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
              placeholder="Asunto del feedback"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje</Label>
            <Textarea
              id="mensaje"
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              placeholder="Describe detallamente tu feedback..."
              rows={4}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Feedback</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// View Feedback Dialog
interface ViewFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feedback: Feedback | null;
}

export function ViewFeedbackDialog({ open, onOpenChange, feedback }: ViewFeedbackDialogProps) {
  if (!feedback) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Feedback</DialogTitle>
          <DialogDescription>
            Información completa del feedback seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Usuario</Label>
              <p className="font-medium">{feedback.usuario}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Email</Label>
              <p className="font-medium">{feedback.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Tipo</Label>
              <div className="mt-1">
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                  {feedback.tipo}
                </span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Prioridad</Label>
              <div className="mt-1">
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                  {feedback.prioridad}
                </span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
              <div className="mt-1">
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                  {feedback.estado}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground">Módulo</Label>
            <p className="font-medium">{feedback.modulo}</p>
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground">Asunto</Label>
            <p className="font-medium">{feedback.asunto}</p>
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground">Mensaje</Label>
            <p className="text-sm bg-muted p-3 rounded-lg">{feedback.mensaje}</p>
          </div>

          {feedback.respuesta && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Respuesta</Label>
              <p className="text-sm bg-green-50 p-3 rounded-lg border border-green-200">{feedback.respuesta}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Fecha Creación</Label>
              <p className="font-medium">{feedback.fechaCreacion}</p>
            </div>
            {feedback.fechaActualizacion && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Última Actualización</Label>
                <p className="font-medium">{feedback.fechaActualizacion}</p>
              </div>
            )}
          </div>

          {feedback.calificacion && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Calificación</Label>
              <div className="flex items-center gap-1">
                <span className="text-2xl">⭐</span>
                <span className="font-medium">{feedback.calificacion}/5</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Delete Feedback Dialog
interface DeleteFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  feedbackAsunto: string | undefined;
}

export function DeleteFeedbackDialog({ open, onOpenChange, onConfirm, feedbackAsunto }: DeleteFeedbackDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Eliminar Feedback</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este feedback? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        {feedbackAsunto && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="font-medium">{feedbackAsunto}</p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
