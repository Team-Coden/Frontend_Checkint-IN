"use client"

import { useState } from "react"
import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/components/ui/select"
import { GraduationCap, Award, BookOpen, TrendingUp } from "lucide-react"
import Main from "@/features/main/pages/page"


export default function CalificacionesPage() {
  const [selectedTaller, setSelectedTaller] = useState<string>("")
  const [showDetails, setShowDetails] = useState(false)

  const talleres = [
    { id: "gestion", name: "Gestión" },
    { id: "software", name: "Taller de Software" },
    { id: "automotriz", name: "Automotriz" },
    { id: "enfermeria", name: "Enfermería" },
    { id: "medicina", name: "Medicina Interna" },
  ]

  const studentGrades = [
    {
      id: 1,
      nombre: "Juan Pérez",
      rae: "12345",
      asistencia: 95,
      desempeno: 92,
      trabajoEquipo: 90,
      responsabilidad: 94,
      promedio: 93,
    },
    {
      id: 2,
      nombre: "María García",
      rae: "12346",
      asistencia: 98,
      desempeno: 96,
      trabajoEquipo: 95,
      responsabilidad: 97,
      promedio: 96,
    },
    {
      id: 3,
      nombre: "Carlos López",
      rae: "12347",
      asistencia: 88,
      desempeno: 85,
      trabajoEquipo: 87,
      responsabilidad: 86,
      promedio: 86,
    },
  ]

  const handleVerTalleres = () => {
    setShowDetails(true)
    console.log("[v0] Mostrando talleres disponibles")
  }

  return (
    <Main>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-10 w-10" />
                <h1 className="text-4xl font-bold">Calificaciones</h1>
              </div>
              <p className="text-blue-100">Sistema de Evaluación de Aprendices</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Último actualizado:</p>
              <p className="text-lg font-semibold">Hoy</p>
            </div>
          </div>
        </div>

        {/* Workshop Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Seleccionar Taller para Evaluación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Select value={selectedTaller} onValueChange={setSelectedTaller}>
                <SelectTrigger className="w-full md:w-[400px]">
                  <SelectValue placeholder="Seleccione un taller" />
                </SelectTrigger>
                <SelectContent>
                  {talleres.map((taller) => (
                    <SelectItem key={taller.id} value={taller.id}>
                      {taller.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!showDetails && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Sistema de Calificaciones</h3>
                  <p className="text-muted-foreground max-w-md">
                    Selecciona un taller para ver y gestionar las calificaciones de los estudiantes.
                  </p>
                </div>
                <Button onClick={handleVerTalleres} size="lg" className="mt-4">
                  Ver Talleres Disponibles
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Student Grades Table */}
        {showDetails && selectedTaller && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Calificaciones de desempeño del estudiante</CardTitle>
                  <CardDescription>
                    Taller: {talleres.find((t) => t.id === selectedTaller)?.name || "No seleccionado"}
                  </CardDescription>
                </div>
                <Button variant="outline">Exportar Reporte</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentGrades.map((student) => (
                  <Card key={student.id} className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold">{student.nombre}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">RAE: {student.rae}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-6 w-6 text-yellow-500" />
                          <div className="text-right">
                            <p className="text-3xl font-bold text-primary">{student.promedio}</p>
                            <p className="text-xs text-muted-foreground">Promedio</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Asistencia</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-secondary rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${student.asistencia}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{student.asistencia}%</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Desempeño</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-secondary rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${student.desempeno}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{student.desempeno}%</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Trabajo en Equipo</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-secondary rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full transition-all"
                                style={{ width: `${student.trabajoEquipo}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{student.trabajoEquipo}%</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Responsabilidad</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-secondary rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full transition-all"
                                style={{ width: `${student.responsabilidad}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{student.responsabilidad}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                        <Button size="sm">Editar Calificaciones</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Promedio General</p>
                      <p className="text-2xl font-bold">91.7</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Estudiantes</p>
                      <p className="text-2xl font-bold">{studentGrades.length}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aprobados</p>
                      <p className="text-2xl font-bold">{studentGrades.filter((s) => s.promedio >= 70).length}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-6 text-sm text-muted-foreground border-t">
          <p className="flex items-center justify-center gap-2">
            <Award className="h-4 w-4" />
            Sistema de Evaluación Checkint © 2025
          </p>
        </div>
      </div>
    </Main>
  )
}
