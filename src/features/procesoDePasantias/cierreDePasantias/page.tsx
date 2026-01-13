"use client"


import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent } from "../../../shared/components/ui/card"
import { AlertTriangle, Building2, Users, Calendar } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../shared/components/ui/alert-dialog.tsx"
import Main from "@/features/main/pages/page"

export default function CierrePasantiasPage() {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleClosureProcess = async () => {
    setIsProcessing(true)

    // Simula el proceso de cierre
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Iniciando cierre de pasantías...")
    console.log("[v0] Actualizando estado de plazas a inactivo...")
    console.log("[v0] Actualizando estado de usuarios relacionados con estudiantes a Eliminado...")
    console.log("[v0] Estableciendo fecha actual como fecha de fin para pasantías sin fecha de finalización...")
    console.log("[v0] Cierre de pasantías completado exitosamente")

    setIsProcessing(false)
    alert("Cierre de pasantías completado exitosamente.")
  }

  return (
    <Main>
      <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
         
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 text-foreground">Cierre de Pasantías</h1>
            <p className="text-muted-foreground text-lg">
              Esta acción reiniciará el sistema de pasantías, realizando las siguientes operaciones:
            </p>
          </div>

        
          <Card className="mb-8 border-2 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                
                <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
                  <div className="rounded-full bg-amber-100 dark:bg-amber-900/40 p-3">
                    <Building2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Actualizar estado de plazas</h3>
                    <p className="text-sm text-muted-foreground">Todas las plazas pasarán a estado inactivo</p>
                  </div>
                </div>

              
                <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/40 p-3">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Actualizar estado de usuarios</h3>
                    <p className="text-sm text-muted-foreground">
                      Los usuarios relacionados con estudiantes pasarán a estado Eliminado
                    </p>
                  </div>
                </div>

              
                <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-3">
                    <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Actualizar fechas de fin</h3>
                    <p className="text-sm text-muted-foreground">
                      Se establecerá la fecha actual como fecha de fin para las pasantías sin fecha de finalización
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-3 mb-6 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
                  <p className="text-sm text-red-900 dark:text-red-300 font-medium">
                    Esta acción es irreversible y afectará a todos los registros del sistema. Por favor, asegúrese de
                    realizar un respaldo antes de continuar.
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isProcessing}>
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      {isProcessing ? "Procesando..." : "Iniciar Cierre de Pasantías"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Está seguro de continuar?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción reiniciará completamente el sistema de pasantías. Todos los datos serán actualizados
                        y no se podrán recuperar. Asegúrese de haber realizado un respaldo antes de proceder.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClosureProcess} className="bg-red-600 hover:bg-red-700">
                        Sí, iniciar cierre
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
}
