"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shared/components/ui/card"
import { Button } from "../../shared/components/ui/button"
import { FileText, Star, Building2, FolderOpen, Download, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/components/ui/select"
import { Label } from "../../shared/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../shared/components/ui/dialog"
import Main from "../main/pages/page"

interface ReportCard {
  id: string
  title: string
  description: string
  icon: typeof FileText
  color: string
  bgColor: string
}

export default function ReportesPage() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [, setSelectedReport] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    taller: "",
    periodo: "",
    formato: "pdf",
  })


  const reports: ReportCard[] = [
    {
      id: "estudiantes-pasantias",
      title: "Reporte de Estudiantes y Pasantías",
      description: "Genera un reporte detallado de estudiantes y sus pasantías, filtrado por taller",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
    },
    {
      id: "calificaciones",
      title: "Reporte de Calificaciones",
      description: "Genera un reporte de calificaciones de estudiantes por taller",
      icon: Star,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900",
    },
    {
      id: "asignaciones",
      title: "Reporte de Asignaciones",
      description: "Genera un reporte de estudiantes asignados a centros de trabajo",
      icon: Building2,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900",
    },
    {
      id: "documentacion",
      title: "Documentación Estudiante",
      description: "Genera un reporte de los documentos subidos por los estudiantes activos de un taller y año",
      icon: FolderOpen,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900",
    },
  ]

  const handleGenerateReport = () => {
    setStatusMessage(`¡Éxito! El reporte se ha generado en formato ${filters.formato.toUpperCase()}.`)
    // El timeout es seguro aquí porque es una función asíncrona de evento
    setTimeout(() => setStatusMessage(null), 5000)
  }

  // 2. Función para manejar la apertura/cierre del modal de forma limpia
  const handleOpenChange = (open: boolean, reportId: string) => {
    if (open) {
      setSelectedReport(reportId)
    } else {
      setSelectedReport(null)
    }
    // Limpiamos el mensaje de éxito cada vez que el modal se abre o se cierra
    setStatusMessage(null)
  }

  return (
    <Main>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 text-foreground">Reportes</h1>
            <p className="text-muted-foreground text-lg">Sistema de Gestión de Pasantías CHECKINT IN</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {reports.map((report) => {
              const Icon = report.icon
              return (
                <Dialog 
                  key={report.id} 
                  // 3. Usamos onOpenChange para resetear los estados sin useEffect
                  onOpenChange={(open) => handleOpenChange(open, report.id)}
                >
                  <DialogTrigger asChild>
                    <Card
                      className={`${report.bgColor} border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]`}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className={`rounded-full p-4 ${report.bgColor}`}>
                            <Icon className={`h-8 w-8 ${report.color}`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{report.title}</CardTitle>
                            <CardDescription className="text-sm">{report.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-transparent" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Generar Reporte
                        </Button>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${report.color}`} />
                        {report.title}
                      </DialogTitle>
                      <DialogDescription>{report.description}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {statusMessage && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-md flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                          <CheckCircle2 className="h-5 w-5" />
                          <p className="text-sm font-medium">{statusMessage}</p>
                        </div>
                      )}

                      {/* Selects y Filtros (Sin cambios) */}
                      <div className="space-y-2">
                        <Label>Seleccionar Taller</Label>
                        <Select
                          value={filters.taller}
                          onValueChange={(v) => setFilters({ ...filters, taller: v })}
                        >
                          <SelectTrigger><SelectValue placeholder="Seleccione un taller" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="desarrollo-web">Desarrollo Web</SelectItem>
                            <SelectItem value="todos">Todos los talleres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Período</Label>
                        <Select
                          value={filters.periodo}
                          onValueChange={(v) => setFilters({ ...filters, periodo: v })}
                        >
                          <SelectTrigger><SelectValue placeholder="Seleccione un período" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="todos">Todos los períodos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Formato</Label>
                        <Select
                          value={filters.formato}
                          onValueChange={(v) => setFilters({ ...filters, formato: v })}
                        >
                          <SelectTrigger><SelectValue placeholder="Seleccione formato" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full" size="lg" onClick={handleGenerateReport}>
                        <Download className="mr-2 h-4 w-4" />
                        Generar y Descargar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>

          {/* Info Card (Omitido por brevedad, se mantiene igual) */}
        </div>
      </div>
    </Main>
  )
}