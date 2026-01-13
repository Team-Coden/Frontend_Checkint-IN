"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../../shared/components/ui/dialog"
import { Button } from "../../../../shared/components/ui/button"
import { ScrollArea } from "../../../../shared/components/ui/scroll-area"
import { RotateCcw, Trash2 } from "lucide-react"

interface HistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data de centros eliminados
const deletedCenters = [
  {
    id: 1,
    nombre: "Centro Sur Antiguo",
    codigo: "CT-010",
    ubicacion: "Monterrey, Nuevo León",
    eliminadoEl: "2024-01-15",
    eliminadoPor: "Admin Sistema",
    motivo: "Cierre de operaciones",
  },
  {
    id: 2,
    nombre: "Centro Oeste",
    codigo: "CT-008",
    ubicacion: "Guadalajara, Jalisco",
    eliminadoEl: "2023-12-20",
    eliminadoPor: "María García",
    motivo: "Fusión con Centro Norte",
  },
  {
    id: 3,
    nombre: "Centro Temporal Covid",
    codigo: "CT-TMP-01",
    ubicacion: "Puebla, Puebla",
    eliminadoEl: "2023-11-10",
    eliminadoPor: "Juan Pérez",
    motivo: "Centro temporal cerrado",
  },
]

export function HistoryDialog({ open, onOpenChange }: HistoryDialogProps) {
  const handleRestore = (id: number, nombre: string) => {
    console.log("[v0] Restaurando centro:", id, nombre)
    // Aquí iría la lógica para restaurar el centro
  }

  const handlePermanentDelete = (id: number, nombre: string) => {
    console.log("[v0] Eliminando permanentemente:", id, nombre)
    // Aquí iría la lógica para eliminar permanentemente
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Historial de Centros Eliminados</DialogTitle>
          <DialogDescription>
            Centros de trabajo que han sido eliminados del sistema. Puede restaurarlos o eliminarlos permanentemente.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4 py-4">
            {deletedCenters.map((center) => (
              <div key={center.id} className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{center.nombre}</h3>
                      <span className="text-sm text-muted-foreground">({center.codigo})</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{center.ubicacion}</p>
                    <div className="text-sm space-y-1 pt-2">
                      <p>
                        <span className="font-medium">Eliminado:</span> {center.eliminadoEl}
                      </p>
                      <p>
                        <span className="font-medium">Por:</span> {center.eliminadoPor}
                      </p>
                      <p>
                        <span className="font-medium">Motivo:</span> {center.motivo}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRestore(center.id, center.nombre)}
                      className="gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Restaurar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handlePermanentDelete(center.id, center.nombre)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {deletedCenters.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No hay centros eliminados en el historial</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
