// ==========================================
// Componente de Vista Previa de Reportes con Gráficos
// ==========================================

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import { Download, Eye, BarChart3, PieChart, Users, FileText, Star, Building2, FolderOpen } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/components/ui/select"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface ReportPreviewProps {
  reportType: string
  filters: {
    taller: string
    periodo: string
    formato: string
  }
  onClose: () => void
}

// Lista de talleres disponibles
const talleresDisponibles = [
  { id: "desarrollo-web", nombre: "Desarrollo Web" },
  { id: "diseno-ux", nombre: "Diseño UX" },
  { id: "marketing-digital", nombre: "Marketing Digital" },
  { id: "data-science", nombre: "Data Science" },
  { id: "movil", nombre: "Desarrollo Móvil" },
  { id: "cloud", nombre: "Cloud Computing" },
]

// Datos de ejemplo para los reportes
const getMockData = (reportType: string) => {
  switch (reportType) {
    case "estudiantes-pasantias":
      return {
        title: "Reporte de Estudiantes y Pasantías",
        icon: Users,
        summary: {
          totalEstudiantes: 45,
          pasantiasActivas: 32,
          pasantiasCompletadas: 28,
          empresasParticipantes: 15
        },
        chartData: [
          { name: "Enero", estudiantes: 12, pasantias: 8 },
          { name: "Febrero", estudiantes: 15, pasantias: 10 },
          { name: "Marzo", estudiantes: 18, pasantias: 14 },
          { name: "Abril", estudiantes: 22, pasantias: 18 },
          { name: "Mayo", estudiantes: 25, pasantias: 20 },
          { name: "Junio", estudiantes: 30, pasantias: 25 }
        ],
        pieData: [
          { name: "Desarrollo Web", value: 35, color: "#3b82f6" },
          { name: "Diseño UX", value: 25, color: "#10b981" },
          { name: "Marketing Digital", value: 20, color: "#f59e0b" },
          { name: "Data Science", value: 20, color: "#8b5cf6" }
        ],
        tableData: [
          { id: 1, nombre: "Juan Pérez", taller: "Desarrollo Web", empresa: "TechCorp", estado: "Activo", horas: 240 },
          { id: 2, nombre: "María García", taller: "Diseño UX", empresa: "DesignHub", estado: "Activo", horas: 180 },
          { id: 3, nombre: "Carlos Rodríguez", taller: "Marketing Digital", empresa: "AdAgency", estado: "Completado", horas: 200 },
          { id: 4, nombre: "Ana Martínez", taller: "Data Science", empresa: "DataLab", estado: "Activo", horas: 220 }
        ]
      }
    
    case "calificaciones":
      return {
        title: "Reporte de Calificaciones",
        icon: Star,
        summary: {
          totalCalificaciones: 156,
          promedioGeneral: 8.5,
          calificacionesAltas: 89,
          calificacionesBajas: 12
        },
        chartData: [
          { name: "Desarrollo Web", promedio: 8.7, total: 45 },
          { name: "Diseño UX", promedio: 8.2, total: 38 },
          { name: "Marketing Digital", promedio: 8.9, total: 42 },
          { name: "Data Science", promedio: 8.1, total: 31 }
        ],
        pieData: [
          { name: "Excelente (9-10)", value: 45, color: "#10b981" },
          { name: "Bueno (7-8)", value: 78, color: "#3b82f6" },
          { name: "Regular (5-6)", value: 25, color: "#f59e0b" },
          { name: "Insuficiente (<5)", value: 8, color: "#ef4444" }
        ],
        tableData: [
          { id: 1, estudiante: "Juan Pérez", taller: "Desarrollo Web", nota: 9.2, evaluador: "Prof. Smith" },
          { id: 2, estudiante: "María García", taller: "Diseño UX", nota: 8.5, evaluador: "Prof. Johnson" },
          { id: 3, estudiante: "Carlos Rodríguez", taller: "Marketing Digital", nota: 7.8, evaluador: "Prof. Davis" },
          { id: 4, estudiante: "Ana Martínez", taller: "Data Science", nota: 9.0, evaluador: "Prof. Wilson" }
        ]
      }
    
    case "asignaciones":
      return {
        title: "Reporte de Asignaciones",
        icon: Building2,
        summary: {
          totalAsignaciones: 67,
          empresasActivas: 23,
          plazasDisponibles: 15,
          asignacionesPendientes: 8
        },
        chartData: [
          { name: "TechCorp", asignados: 12, capacidad: 15 },
          { name: "DesignHub", asignados: 8, capacidad: 10 },
          { name: "AdAgency", asignados: 6, capacidad: 8 },
          { name: "DataLab", asignados: 10, capacidad: 12 },
          { name: "StartupXYZ", asignados: 4, capacidad: 6 }
        ],
        pieData: [
          { name: "Tecnología", value: 35, color: "#3b82f6" },
          { name: "Diseño", value: 20, color: "#8b5cf6" },
          { name: "Marketing", value: 25, color: "#f59e0b" },
          { name: "Consultoría", value: 20, color: "#10b981" }
        ],
        tableData: [
          { id: 1, estudiante: "Juan Pérez", empresa: "TechCorp", puesto: "Frontend Developer", fecha: "2024-01-15" },
          { id: 2, estudiante: "María García", empresa: "DesignHub", puesto: "UX Designer", fecha: "2024-01-20" },
          { id: 3, estudiante: "Carlos Rodríguez", empresa: "AdAgency", puesto: "Marketing Analyst", fecha: "2024-02-01" },
          { id: 4, estudiante: "Ana Martínez", empresa: "DataLab", puesto: "Data Analyst", fecha: "2024-02-10" }
        ]
      }
    
    case "documentacion":
      return {
        title: "Reporte de Documentación Estudiantil",
        icon: FolderOpen,
        summary: {
          totalDocumentos: 234,
          documentosCompletos: 189,
          documentosPendientes: 45,
          estudiantesConDocumentos: 67
        },
        chartData: [
          { name: "Enero", documentos: 35, completados: 28 },
          { name: "Febrero", documentos: 42, completados: 35 },
          { name: "Marzo", documentos: 38, completados: 32 },
          { name: "Abril", documentos: 45, completados: 38 },
          { name: "Mayo", documentos: 40, completados: 34 },
          { name: "Junio", documentos: 34, completados: 22 }
        ],
        pieData: [
          { name: "CV", value: 67, color: "#3b82f6" },
          { name: "Carta Recomendación", value: 45, color: "#10b981" },
          { name: "Certificados", value: 56, color: "#f59e0b" },
          { name: "Formularios", value: 66, color: "#8b5cf6" }
        ],
        tableData: [
          { id: 1, estudiante: "Juan Pérez", tipo: "CV", estado: "Completado", fecha: "2024-01-15" },
          { id: 2, estudiante: "María García", tipo: "Carta Recomendación", estado: "Pendiente", fecha: "2024-01-20" },
          { id: 3, estudiante: "Carlos Rodríguez", tipo: "Certificados", estado: "Completado", fecha: "2024-02-01" },
          { id: 4, estudiante: "Ana Martínez", tipo: "Formularios", estado: "Completado", fecha: "2024-02-10" }
        ]
      }
    
    default:
      return null
  }
}

export const ReportPreview = ({ reportType, filters, onClose }: ReportPreviewProps) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showTallerSelector, setShowTallerSelector] = useState(true)
  const [selectedTaller, setSelectedTaller] = useState(filters.taller || "")
  const [currentPeriodo, setCurrentPeriodo] = useState(filters.periodo || "2024")
  const reportData = getMockData(reportType)
  
  if (!reportData) return null

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    
    try {
      const element = document.getElementById('report-preview-content')
      if (!element) return
      
      // Crear canvas del contenido
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      const imgData = canvas.toDataURL('image/png')
      
      // Crear PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0
      
      // Agregar imagen al PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      // Descargar PDF
      pdf.save(`${reportData.title.replace(/\s+/g, '_')}_${selectedTaller}_${filters.periodo}.pdf`)
      
    } catch (error) {
      console.error('Error generando PDF:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const Icon = reportData.icon

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6 bg-linear-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{reportData.title}</h2>
                <p className="text-gray-600">
                  Taller: {selectedTaller || "Todos"} | Período: {currentPeriodo === "todos" ? "Todos" : currentPeriodo}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32">
                <Select value={currentPeriodo} onValueChange={setCurrentPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="todos">Todos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                onClick={onClose}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Cerrar Vista Previa
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF || showTallerSelector}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                {isGeneratingPDF ? "Generando..." : "Descargar PDF"}
              </Button>
            </div>
          </div>
        </div>

        {/* Selector de Talleres */}
        {showTallerSelector && (
          <div className="p-6 border-b bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-center">Selecciona un Taller para Ver el Reporte</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {talleresDisponibles.map((taller) => (
                  <Card 
                    key={taller.id}
                    className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-2 ${
                      selectedTaller === taller.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => {
                      setSelectedTaller(taller.id)
                      setShowTallerSelector(false)
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-lg font-medium">{taller.nombre}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {taller.id === 'desarrollo-web' && '15 estudiantes activos'}
                        {taller.id === 'diseno-ux' && '12 estudiantes activos'}
                        {taller.id === 'marketing-digital' && '8 estudiantes activos'}
                        {taller.id === 'data-science' && '10 estudiantes activos'}
                        {taller.id === 'movil' && '6 estudiantes activos'}
                        {taller.id === 'cloud' && '4 estudiantes activos'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-2 ${
                    selectedTaller === "todos" 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => {
                    setSelectedTaller("todos")
                    setShowTallerSelector(false)
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-medium">Todos los Talleres</div>
                    <div className="text-sm text-gray-600 mt-1">55 estudiantes en total</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!showTallerSelector && (
          <div id="report-preview-content" className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-white">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(reportData.summary).map(([key, value]) => (
                <Card key={key} className="border-2">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Tendencias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="estudiantes" fill="#3b82f6" />
                      <Bar dataKey="pasantias" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribución
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={reportData.pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reportData.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Detalles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {Object.keys(reportData.tableData[0]).map((key) => (
                          <th key={key} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.tableData.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          {Object.values(row).map((value, cellIndex) => (
                            <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
