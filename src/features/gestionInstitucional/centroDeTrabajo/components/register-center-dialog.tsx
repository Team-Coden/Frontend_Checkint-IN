"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../shared/components/ui/dialog"
import { Button } from "../../../../shared/components/ui/button"
import { Input } from "../../../../shared/components/ui/input"
import { Label } from "../../../../shared/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/components/ui/select"
import type { CentroTrabajo } from "../types"

interface RegisterCenterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCentro?: (centro: Omit<CentroTrabajo, "id" | "createdAt">) => void
}

export function RegisterCenterDialog({ open, onOpenChange, onAddCentro }: RegisterCenterDialogProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    ubicacion: "",
    tipo: "",
    responsable: "",
    telefono: "",
    email: "",
    descripcion: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (onAddCentro) {
      onAddCentro({
        name: formData.nombre,
        location: formData.ubicacion,
        employees: 1, // Valor mínimo por defecto
        status: "pending",
        validated: false,
      })
    }
    
    onOpenChange(false)
    // Reset form
    setFormData({
      nombre: "",
      codigo: "",
      ubicacion: "",
      tipo: "",
      responsable: "",
      telefono: "",
      email: "",
      descripcion: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Registrar Nuevo Centro de Trabajo</DialogTitle>
          <DialogDescription>
            Complete la información para registrar un nuevo centro de trabajo en el sistema
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Centro *</Label>
              <Input
                id="nombre"
                required
                placeholder="Ej: Centro Norte"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigo">Código *</Label>
              <Input
                id="codigo"
                required
                placeholder="Ej: CT-001"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ubicacion">Ubicación *</Label>
              <Input
                id="ubicacion"
                required
                placeholder="Ej: Ciudad de México"
                value={formData.ubicacion}
                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Centro *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="produccion">Producción</SelectItem>
                  <SelectItem value="oficina">Oficina</SelectItem>
                  <SelectItem value="almacen">Almacén</SelectItem>
                  <SelectItem value="distribucion">Distribución</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Registrar Centro</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
