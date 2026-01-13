"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Label } from "../../../shared/components/ui/label"
import { Textarea } from "../../../shared/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../shared/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/components/ui/select"
import { Building2, GraduationCap, History, FileText, Calendar, User, Award } from "lucide-react"
import Main from "@/features/main/pages/page"


export default function EvaluacionesPage() {
  const [centerForm, setCenterForm] = useState({
    pasantia: "",
    calidadTrabajo: "",
    adaptacionTareas: "",
    capacidades2025: "",
    observaciones: "",
  })

  const [studentForm, setStudentForm] = useState({
    pasantia: "",
    estudiante: "",
    asistencia: "",
    desempeno: "",
    disponibilidad: "",
    responsabilidad: "",
    interes: "",
    trabajoEquipo: "",
    resolucionProblemas: "",
    observaciones: "",
  })

  const [historyTab, setHistoryTab] = useState<"centros" | "estudiantes">("centros")

  // Sample data for history
  const centerEvaluations = [
    {
      id: 1,
      centro: "Hospital General",
      pasantia: "Enfermería 2024-1",
      fecha: "15/12/2024",
      evaluador: "Dr. Carlos Méndez",
      calificacion: 92,
    },
    {
      id: 2,
      centro: "Clínica Santa María",
      pasantia: "Medicina Interna 2024-1",
      fecha: "10/12/2024",
      evaluador: "Dra. Ana Torres",
      calificacion: 88,
    },
  ]

  const studentEvaluations = [
    {
      id: 1,
      estudiante: "Juan Pérez",
      pasantia: "Enfermería 2024-1",
      fecha: "15/12/2024",
      tutor: "Dr. Carlos Méndez",
      calificacion: 90,
    },
    {
      id: 2,
      estudiante: "María García",
      pasantia: "Medicina Interna 2024-1",
      fecha: "12/12/2024",
      tutor: "Dra. Ana Torres",
      calificacion: 95,
    },
  ]

  const handleCenterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Evaluación del centro enviada:", centerForm)
    alert("Evaluación del centro enviada correctamente")
    // Reset form
    setCenterForm({
      pasantia: "",
      calidadTrabajo: "",
      adaptacionTareas: "",
      capacidades2025: "",
      observaciones: "",
    })
  }

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Evaluación del estudiante enviada:", studentForm)
    alert("Evaluación del estudiante enviada correctamente")
    // Reset form
    setStudentForm({
      pasantia: "",
      estudiante: "",
      asistencia: "",
      desempeno: "",
      disponibilidad: "",
      responsabilidad: "",
      interes: "",
      trabajoEquipo: "",
      resolucionProblemas: "",
      observaciones: "",
    })
  }

  return (
    <Main>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Evaluaciones
            </h1>
            <p className="text-muted-foreground mt-1">Gestiona las evaluaciones de centros de trabajo y estudiantes</p>
          </div>
        </div>

        <Tabs defaultValue="centro" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="centro" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Evaluación Centro
            </TabsTrigger>
            <TabsTrigger value="estudiante" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Evaluación Estudiante
            </TabsTrigger>
            <TabsTrigger value="historial" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Historial
            </TabsTrigger>
          </TabsList>

          {/* Centro Evaluation Tab */}
          <TabsContent value="centro" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Evaluación del Centro de Trabajo</CardTitle>
                <CardDescription>Evalúa el desempeño y las condiciones del centro de trabajo</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCenterSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="center-pasantia">Seleccione Pasantía</Label>
                    <Select
                      value={centerForm.pasantia}
                      onValueChange={(value) => setCenterForm({ ...centerForm, pasantia: value })}
                    >
                      <SelectTrigger id="center-pasantia">
                        <SelectValue placeholder="Seleccione una pasantía" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enfermeria-2024-1">Enfermería 2024-1</SelectItem>
                        <SelectItem value="medicina-2024-1">Medicina Interna 2024-1</SelectItem>
                        <SelectItem value="pediatria-2024-1">Pediatría 2024-1</SelectItem>
                        <SelectItem value="cirugia-2024-1">Cirugía General 2024-1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calidad-trabajo">Calidad de Trabajo (%)</Label>
                      <Input
                        id="calidad-trabajo"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={centerForm.calidadTrabajo}
                        onChange={(e) => setCenterForm({ ...centerForm, calidadTrabajo: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adaptacion-tareas">Adaptación de Tareas (%)</Label>
                      <Input
                        id="adaptacion-tareas"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={centerForm.adaptacionTareas}
                        onChange={(e) => setCenterForm({ ...centerForm, adaptacionTareas: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacidades-2025">Capacidades para el 2025 (%)</Label>
                    <Input
                      id="capacidades-2025"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0%"
                      value={centerForm.capacidades2025}
                      onChange={(e) => setCenterForm({ ...centerForm, capacidades2025: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="center-observaciones">Observaciones</Label>
                    <Textarea
                      id="center-observaciones"
                      placeholder="Ingrese sus observaciones sobre el centro de trabajo..."
                      rows={4}
                      value={centerForm.observaciones}
                      onChange={(e) => setCenterForm({ ...centerForm, observaciones: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Enviar Evaluación
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Evaluation Tab */}
          <TabsContent value="estudiante" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Evaluación del Estudiante</CardTitle>
                <CardDescription>Evalúa el desempeño y las competencias del estudiante</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStudentSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-pasantia">Seleccione Pasantía</Label>
                      <Select
                        value={studentForm.pasantia}
                        onValueChange={(value) => setStudentForm({ ...studentForm, pasantia: value })}
                      >
                        <SelectTrigger id="student-pasantia">
                          <SelectValue placeholder="Seleccione una pasantía" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enfermeria-2024-1">Enfermería 2024-1</SelectItem>
                          <SelectItem value="medicina-2024-1">Medicina Interna 2024-1</SelectItem>
                          <SelectItem value="pediatria-2024-1">Pediatría 2024-1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estudiante">RAE</Label>
                      <Select
                        value={studentForm.estudiante}
                        onValueChange={(value) => setStudentForm({ ...studentForm, estudiante: value })}
                      >
                        <SelectTrigger id="estudiante">
                          <SelectValue placeholder="Seleccione un estudiante" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12345">12345 - Juan Pérez</SelectItem>
                          <SelectItem value="12346">12346 - María García</SelectItem>
                          <SelectItem value="12347">12347 - Carlos López</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="asistencia">Asistencia (%)</Label>
                      <Input
                        id="asistencia"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={studentForm.asistencia}
                        onChange={(e) => setStudentForm({ ...studentForm, asistencia: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="desempeno">Desempeño (%)</Label>
                      <Input
                        id="desempeno"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={studentForm.desempeno}
                        onChange={(e) => setStudentForm({ ...studentForm, desempeno: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="disponibilidad">Disponibilidad (%)</Label>
                      <Input
                        id="disponibilidad"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={studentForm.disponibilidad}
                        onChange={(e) => setStudentForm({ ...studentForm, disponibilidad: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsabilidad">Responsabilidad (%)</Label>
                      <Input
                        id="responsabilidad"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={studentForm.responsabilidad}
                        onChange={(e) => setStudentForm({ ...studentForm, responsabilidad: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interes">Interés (%)</Label>
                      <Input
                        id="interes"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={studentForm.interes}
                        onChange={(e) => setStudentForm({ ...studentForm, interes: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="trabajo-equipo">Trabajo en Equipo (%)</Label>
                      <Input
                        id="trabajo-equipo"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={studentForm.trabajoEquipo}
                        onChange={(e) => setStudentForm({ ...studentForm, trabajoEquipo: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resolucion-problemas">Resolución de Problemas (%)</Label>
                      <Input
                        id="resolucion-problemas"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0%"
                        value={studentForm.resolucionProblemas}
                        onChange={(e) =>
                          setStudentForm({
                            ...studentForm,
                            resolucionProblemas: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-observaciones">Observaciones</Label>
                    <Textarea
                      id="student-observaciones"
                      placeholder="Ingrese sus observaciones sobre el desempeño del estudiante..."
                      rows={4}
                      value={studentForm.observaciones}
                      onChange={(e) => setStudentForm({ ...studentForm, observaciones: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Enviar Evaluación
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="historial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Evaluaciones</CardTitle>
                <CardDescription>Consulta las evaluaciones anteriores de centros y estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={historyTab} onValueChange={(v) => setHistoryTab(v as "centros" | "estudiantes")}>
                  <TabsList>
                    <TabsTrigger value="centros">Centros de Trabajo</TabsTrigger>
                    <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="centros" className="space-y-4 mt-6">
                    {centerEvaluations.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No hay evaluaciones de centros de trabajo registradas</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {centerEvaluations.map((evaluation) => (
                          <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">{evaluation.centro}</h3>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4" />
                                      {evaluation.pasantia}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      {evaluation.fecha}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4" />
                                      {evaluation.evaluador}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  <Award className="h-5 w-5 text-yellow-500" />
                                  <span className="text-2xl font-bold text-primary">{evaluation.calificacion}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="estudiantes" className="space-y-4 mt-6">
                    {studentEvaluations.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No hay evaluaciones de estudiantes registradas</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {studentEvaluations.map((evaluation) => (
                          <Card key={evaluation.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">{evaluation.estudiante}</h3>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4" />
                                      {evaluation.pasantia}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      {evaluation.fecha}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4" />
                                      {evaluation.tutor}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  <Award className="h-5 w-5 text-yellow-500" />
                                  <span className="text-2xl font-bold text-primary">{evaluation.calificacion}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Main>
  )
}
