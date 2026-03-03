"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Label } from "../../../shared/components/ui/label"
import { Textarea } from "../../../shared/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../shared/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Building2, GraduationCap, History, FileText, Calendar, User, Award } from "lucide-react"
import Main from "@/features/main/pages/page"


export default function EvaluacionesPage() {
  const [evaluationForm, setEvaluationForm] = useState({
    // Datos personales y académicos
    identidadTitulo: "Desarrollo y administración de aplicaciones informáticas",
    codigoTitulo: "IFC006_3",
    nombreApellidos: "",
    horario: "",
    direccion: "",
    telefonos: "",
    fechaInicioPasantia: "",
    fechaTerminoPasantia: "",
    
    // Datos de la empresa
    centroTrabajo: "",
    direccionEmpresa: "",
    telefonosEmpresa: "",
    personaContacto: "",
    nombreTutor: "",
    telefonosCorreoTutor: "",
    
    // Evaluación por semanas (Capacidades)
    conocimientosTeoricos: Array(12).fill(""),
    seguimientoInstrucciones: Array(12).fill(""),
    organizacion: Array(12).fill(""),
    metodo: Array(12).fill(""),
    ritmoTrabajo: Array(12).fill(""),
    trabajoRealizado: Array(12).fill(""),
    
    // Evaluación por semanas (Habilidades)
    iniciativa: Array(12).fill(""),
    trabajoEquipo: Array(12).fill(""),
    puntualidadAsistencia: Array(12).fill(""),
    responsabilidad: Array(12).fill(""),
    
    // Promedios y nota final
    promedioCapacidades: "",
    promedioHabilidades: "",
    notaFinal: "",
    
    // Observaciones
    observaciones: "",
    
    // Firmas
    firmaTutorCentro: "",
    firmaTutorEducativo: "",
    fechaFirma: ""
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

  const handleEvaluationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Evaluación completa enviada:", evaluationForm)
    alert("Evaluación enviada correctamente")
    // Reset form
    setEvaluationForm({
      ...evaluationForm,
      nombreApellidos: "",
      horario: "",
      direccion: "",
      telefonos: "",
      fechaInicioPasantia: "",
      fechaTerminoPasantia: "",
      centroTrabajo: "",
      direccionEmpresa: "",
      telefonosEmpresa: "",
      personaContacto: "",
      nombreTutor: "",
      telefonosCorreoTutor: "",
      conocimientosTeoricos: Array(12).fill(""),
      seguimientoInstrucciones: Array(12).fill(""),
      organizacion: Array(12).fill(""),
      metodo: Array(12).fill(""),
      ritmoTrabajo: Array(12).fill(""),
      trabajoRealizado: Array(12).fill(""),
      iniciativa: Array(12).fill(""),
      trabajoEquipo: Array(12).fill(""),
      puntualidadAsistencia: Array(12).fill(""),
      responsabilidad: Array(12).fill(""),
      promedioCapacidades: "",
      promedioHabilidades: "",
      notaFinal: "",
      observaciones: "",
      firmaTutorCentro: "",
      firmaTutorEducativo: "",
      fechaFirma: ""
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
            <p className="text-muted-foreground mt-1">Completa el formulario de evaluación de pasantías</p>
          </div>
        </div>

        <Tabs defaultValue="evaluacion" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="evaluacion" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Formulario Evaluación
            </TabsTrigger>
            <TabsTrigger value="historial" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Historial
            </TabsTrigger>
          </TabsList>

          {/* Evaluation Form Tab */}
          <TabsContent value="evaluacion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Formulario de Evaluación de Pasantías</CardTitle>
                <CardDescription>Completa todos los campos del formulario de evaluación</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEvaluationSubmit} className="space-y-6">
                  
                  {/* Pestañas internas para organizar el formulario */}
                  <Tabs defaultValue="datos-personales" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[800px]">
                      <TabsTrigger value="datos-personales" className="text-sm">
                        <User className="h-4 w-4 mr-2" />
                        Datos Personales
                      </TabsTrigger>
                      <TabsTrigger value="datos-empresa" className="text-sm">
                        <Building2 className="h-4 w-4 mr-2" />
                        Datos Empresa
                      </TabsTrigger>
                      <TabsTrigger value="evaluacion" className="text-sm">
                        <Award className="h-4 w-4 mr-2" />
                        Evaluación
                      </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Datos Personales */}
                    <TabsContent value="datos-personales" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">🔹 1. Datos personales y académicos</CardTitle>
                          <CardDescription>Información personal y académica del alumno</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="identidad-titulo">Identidad del título</Label>
                              <Input
                                id="identidad-titulo"
                                value={evaluationForm.identidadTitulo}
                                readOnly
                                className="bg-muted"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="codigo-titulo">Código del título</Label>
                              <Input
                                id="codigo-titulo"
                                value={evaluationForm.codigoTitulo}
                                readOnly
                                className="bg-muted"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nombre-apellidos">Nombre y apellidos del alumno</Label>
                              <Input
                                id="nombre-apellidos"
                                placeholder="Ingrese nombre completo"
                                value={evaluationForm.nombreApellidos}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, nombreApellidos: e.target.value })}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="horario">Horario</Label>
                              <Input
                                id="horario"
                                placeholder="Ej: Lunes a Viernes 8:00-14:00"
                                value={evaluationForm.horario}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, horario: e.target.value })}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="direccion">Dirección</Label>
                            <Input
                              id="direccion"
                              placeholder="Ingrese dirección completa"
                              value={evaluationForm.direccion}
                              onChange={(e) => setEvaluationForm({ ...evaluationForm, direccion: e.target.value })}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="telefonos">Teléfono(s)</Label>
                              <Input
                                id="telefonos"
                                placeholder="Ingrese número(s) de teléfono"
                                value={evaluationForm.telefonos}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, telefonos: e.target.value })}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="fecha-inicio">Fecha inicio de pasantía</Label>
                              <Input
                                id="fecha-inicio"
                                type="date"
                                value={evaluationForm.fechaInicioPasantia}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, fechaInicioPasantia: e.target.value })}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="fecha-termino">Fecha término de pasantía</Label>
                              <Input
                                id="fecha-termino"
                                type="date"
                                value={evaluationForm.fechaTerminoPasantia}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, fechaTerminoPasantia: e.target.value })}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Tab 2: Datos Empresa */}
                    <TabsContent value="datos-empresa" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">🔹 2. Datos de la empresa</CardTitle>
                          <CardDescription>Información del centro de trabajo y tutor</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="centro-trabajo">Centro de trabajo (nombre de la empresa)</Label>
                              <Input
                                id="centro-trabajo"
                                placeholder="Ingrese nombre de la empresa"
                                value={evaluationForm.centroTrabajo}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, centroTrabajo: e.target.value })}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="persona-contacto">Persona de contacto</Label>
                              <Input
                                id="persona-contacto"
                                placeholder="Ingrese nombre de persona de contacto"
                                value={evaluationForm.personaContacto}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, personaContacto: e.target.value })}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="direccion-empresa">Dirección</Label>
                            <Input
                              id="direccion-empresa"
                              placeholder="Ingrese dirección de la empresa"
                              value={evaluationForm.direccionEmpresa}
                              onChange={(e) => setEvaluationForm({ ...evaluationForm, direccionEmpresa: e.target.value })}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="telefonos-empresa">Teléfonos</Label>
                              <Input
                                id="telefonos-empresa"
                                placeholder="Ingrese teléfonos de la empresa"
                                value={evaluationForm.telefonosEmpresa}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, telefonosEmpresa: e.target.value })}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="nombre-tutor">Nombre del tutor en el centro de trabajo</Label>
                              <Input
                                id="nombre-tutor"
                                placeholder="Ingrese nombre del tutor"
                                value={evaluationForm.nombreTutor}
                                onChange={(e) => setEvaluationForm({ ...evaluationForm, nombreTutor: e.target.value })}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="telefonos-correo-tutor">Teléfonos y correo del tutor</Label>
                            <Input
                              id="telefonos-correo-tutor"
                              placeholder="Ingrese teléfonos y correo electrónico del tutor"
                              value={evaluationForm.telefonosCorreoTutor}
                              onChange={(e) => setEvaluationForm({ ...evaluationForm, telefonosCorreoTutor: e.target.value })}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Tab 3: Evaluación */}
                    <TabsContent value="evaluacion" className="space-y-6">
                      {/* Sub-pestallas para evaluación */}
                      <Tabs defaultValue="capacidades" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                          <TabsTrigger value="capacidades" className="text-sm">Capacidades</TabsTrigger>
                          <TabsTrigger value="habilidades" className="text-sm">Habilidades</TabsTrigger>
                          <TabsTrigger value="observaciones" className="text-sm">Observaciones</TabsTrigger>
                          <TabsTrigger value="firmas" className="text-sm">Firmas</TabsTrigger>
                        </TabsList>

                        {/* Sub-tab: Capacidades */}
                        <TabsContent value="capacidades" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🔸 Capacidades</CardTitle>
                              <CardDescription>Evalúa las capacidades del estudiante (escala 0-10)</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="overflow-x-auto">
                                  <table className="w-full border-collapse border border-gray-300 text-sm">
                                    <thead>
                                      <tr className="bg-muted">
                                        <th className="border border-gray-300 p-2 text-left">Capacidad</th>
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <th key={i} className="border border-gray-300 p-2 text-center min-w-[50px]">
                                            {i + 1}ª
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="border border-gray-300 p-2 font-medium">Conocimientos teóricos</td>
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <td key={i} className="border border-gray-300 p-1">
                                            <Input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              className="w-full text-center text-xs h-8"
                                              value={evaluationForm.conocimientosTeoricos[i]}
                                              onChange={(e) => {
                                                const newValues = [...evaluationForm.conocimientosTeoricos]
                                                newValues[i] = e.target.value
                                                setEvaluationForm({ ...evaluationForm, conocimientosTeoricos: newValues })
                                              }}
                                            />
                                          </td>
                                        ))}
                                      </tr>
                                      <tr>
                                        <td className="border border-gray-300 p-2 font-medium">Seguimiento de instrucciones</td>
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <td key={i} className="border border-gray-300 p-1">
                                            <Input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              className="w-full text-center text-xs h-8"
                                              value={evaluationForm.seguimientoInstrucciones[i]}
                                              onChange={(e) => {
                                                const newValues = [...evaluationForm.seguimientoInstrucciones]
                                                newValues[i] = e.target.value
                                                setEvaluationForm({ ...evaluationForm, seguimientoInstrucciones: newValues })
                                              }}
                                            />
                                          </td>
                                        ))}
                                      </tr>
                                      <tr>
                                        <td className="border border-gray-300 p-2 font-medium">Organización</td>
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <td key={i} className="border border-gray-300 p-1">
                                            <Input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              className="w-full text-center text-xs h-8"
                                              value={evaluationForm.organizacion[i]}
                                              onChange={(e) => {
                                                const newValues = [...evaluationForm.organizacion]
                                                newValues[i] = e.target.value
                                                setEvaluationForm({ ...evaluationForm, organizacion: newValues })
                                              }}
                                            />
                                          </td>
                                        ))}
                                      </tr>
                                      <tr>
                                        <td className="border border-gray-300 p-2 font-medium">Método</td>
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <td key={i} className="border border-gray-300 p-1">
                                            <Input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              className="w-full text-center text-xs h-8"
                                              value={evaluationForm.metodo[i]}
                                              onChange={(e) => {
                                                const newValues = [...evaluationForm.metodo]
                                                newValues[i] = e.target.value
                                                setEvaluationForm({ ...evaluationForm, metodo: newValues })
                                              }}
                                            />
                                          </td>
                                        ))}
                                      </tr>
                                      <tr>
                                        <td className="border border-gray-300 p-2 font-medium">Ritmo de trabajo</td>
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <td key={i} className="border border-gray-300 p-1">
                                            <Input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              className="w-full text-center text-xs h-8"
                                              value={evaluationForm.ritmoTrabajo[i]}
                                              onChange={(e) => {
                                                const newValues = [...evaluationForm.ritmoTrabajo]
                                                newValues[i] = e.target.value
                                                setEvaluationForm({ ...evaluationForm, ritmoTrabajo: newValues })
                                              }}
                                            />
                                          </td>
                                        ))}
                                      </tr>
                                      <tr>
                                        <td className="border border-gray-300 p-2 font-medium">Trabajo realizado</td>
                                        {Array.from({ length: 12 }, (_, i) => (
                                          <td key={i} className="border border-gray-300 p-1">
                                            <Input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              className="w-full text-center text-xs h-8"
                                              value={evaluationForm.trabajoRealizado[i]}
                                              onChange={(e) => {
                                                const newValues = [...evaluationForm.trabajoRealizado]
                                                newValues[i] = e.target.value
                                                setEvaluationForm({ ...evaluationForm, trabajoRealizado: newValues })
                                              }}
                                            />
                                          </td>
                                        ))}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                
                                {/* Promedios */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                  <div className="space-y-2">
                                    <Label htmlFor="promedio-capacidades">Promedio Capacidades</Label>
                                    <Input
                                      id="promedio-capacidades"
                                      placeholder="0.00"
                                      value={evaluationForm.promedioCapacidades}
                                      onChange={(e) => setEvaluationForm({ ...evaluationForm, promedioCapacidades: e.target.value })}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="promedio-habilidades">Promedio Habilidades</Label>
                                    <Input
                                      id="promedio-habilidades"
                                      placeholder="0.00"
                                      value={evaluationForm.promedioHabilidades}
                                      onChange={(e) => setEvaluationForm({ ...evaluationForm, promedioHabilidades: e.target.value })}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="nota-final">Nota Final</Label>
                                    <Input
                                      id="nota-final"
                                      placeholder="0.00"
                                      value={evaluationForm.notaFinal}
                                      onChange={(e) => setEvaluationForm({ ...evaluationForm, notaFinal: e.target.value })}
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Sub-tab: Habilidades */}
                        <TabsContent value="habilidades" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🔸 Habilidades</CardTitle>
                              <CardDescription>Evalúa las habilidades del estudiante (escala 0-10)</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300 text-sm">
                                  <thead>
                                    <tr className="bg-muted">
                                      <th className="border border-gray-300 p-2 text-left">Habilidad</th>
                                      {Array.from({ length: 12 }, (_, i) => (
                                        <th key={i} className="border border-gray-300 p-2 text-center min-w-[50px]">
                                          {i + 1}ª
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="border border-gray-300 p-2 font-medium">Iniciativa</td>
                                      {Array.from({ length: 12 }, (_, i) => (
                                        <td key={i} className="border border-gray-300 p-1">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="10"
                                            placeholder="0-10"
                                            className="w-full text-center text-xs h-8"
                                            value={evaluationForm.iniciativa[i]}
                                            onChange={(e) => {
                                              const newValues = [...evaluationForm.iniciativa]
                                              newValues[i] = e.target.value
                                              setEvaluationForm({ ...evaluationForm, iniciativa: newValues })
                                            }}
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                    <tr>
                                      <td className="border border-gray-300 p-2 font-medium">Trabajo en equipo</td>
                                      {Array.from({ length: 12 }, (_, i) => (
                                        <td key={i} className="border border-gray-300 p-1">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="10"
                                            placeholder="0-10"
                                            className="w-full text-center text-xs h-8"
                                            value={evaluationForm.trabajoEquipo[i]}
                                            onChange={(e) => {
                                              const newValues = [...evaluationForm.trabajoEquipo]
                                              newValues[i] = e.target.value
                                              setEvaluationForm({ ...evaluationForm, trabajoEquipo: newValues })
                                            }}
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                    <tr>
                                      <td className="border border-gray-300 p-2 font-medium">Puntualidad y asistencia</td>
                                      {Array.from({ length: 12 }, (_, i) => (
                                        <td key={i} className="border border-gray-300 p-1">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="10"
                                            placeholder="0-10"
                                            className="w-full text-center text-xs h-8"
                                            value={evaluationForm.puntualidadAsistencia[i]}
                                            onChange={(e) => {
                                              const newValues = [...evaluationForm.puntualidadAsistencia]
                                              newValues[i] = e.target.value
                                              setEvaluationForm({ ...evaluationForm, puntualidadAsistencia: newValues })
                                            }}
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                    <tr>
                                      <td className="border border-gray-300 p-2 font-medium">Responsabilidad</td>
                                      {Array.from({ length: 12 }, (_, i) => (
                                        <td key={i} className="border border-gray-300 p-1">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="10"
                                            placeholder="0-10"
                                            className="w-full text-center text-xs h-8"
                                            value={evaluationForm.responsabilidad[i]}
                                            onChange={(e) => {
                                              const newValues = [...evaluationForm.responsabilidad]
                                              newValues[i] = e.target.value
                                              setEvaluationForm({ ...evaluationForm, responsabilidad: newValues })
                                            }}
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Sub-tab: Observaciones */}
                        <TabsContent value="observaciones" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🔹 4. Observaciones</CardTitle>
                              <CardDescription>Comentarios del tutor sobre el desempeño</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <Label htmlFor="observaciones">Comentarios sobre el desempeño</Label>
                                <Textarea
                                  id="observaciones"
                                  placeholder="El tutor puede escribir comentarios sobre el desempeño del estudiante..."
                                  rows={8}
                                  value={evaluationForm.observaciones}
                                  onChange={(e) => setEvaluationForm({ ...evaluationForm, observaciones: e.target.value })}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Sub-tab: Firmas */}
                        <TabsContent value="firmas" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">🔹 5. Firmas</CardTitle>
                              <CardDescription>Firmas de los tutores y fecha</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="firma-tutor-centro">Tutor del centro de trabajo</Label>
                                  <Input
                                    id="firma-tutor-centro"
                                    placeholder="Nombre y firma"
                                    value={evaluationForm.firmaTutorCentro}
                                    onChange={(e) => setEvaluationForm({ ...evaluationForm, firmaTutorCentro: e.target.value })}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="firma-tutor-educativo">Tutor del centro educativo</Label>
                                  <Input
                                    id="firma-tutor-educativo"
                                    placeholder="Nombre y firma"
                                    value={evaluationForm.firmaTutorEducativo}
                                    onChange={(e) => setEvaluationForm({ ...evaluationForm, firmaTutorEducativo: e.target.value })}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="fecha-firma">Fecha</Label>
                                  <Input
                                    id="fecha-firma"
                                    type="date"
                                    value={evaluationForm.fechaFirma}
                                    onChange={(e) => setEvaluationForm({ ...evaluationForm, fechaFirma: e.target.value })}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </TabsContent>
                  </Tabs>

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
