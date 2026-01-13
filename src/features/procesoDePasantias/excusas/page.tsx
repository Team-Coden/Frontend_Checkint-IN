"use client"

import type React from "react"


import { Button } from "../../../shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Input } from "../../../shared/components/ui/input"
import { Label } from "../../../shared/components/ui/label"
import { Textarea } from "../../../shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/components/ui/table"
import { Badge } from "../../../shared/components/ui/badge"
import { Send, Upload, FileText, Search, Eye, Download, Trash2 } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../shared/components/ui/dropdown-menu"
import Main from "@/features/main/pages/page"

interface Excuse {
  id: string
  pasantia: string
  estudiante: string
  tutor: string
  justificacion: string
  certificado: string
  fecha: string
  estado: "Pendiente" | "Aprobada" | "Rechazada"
}

export default function ExcusasPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTaller, setFilterTaller] = useState("all")
  const [formData, setFormData] = useState({
    pasantia: "",
    estudiante: "",
    tutor: "",
    justificacion: "",
  })

  const [excuses] = useState<Excuse[]>([
    {
      id: "EXC001",
      pasantia: "Pasantía Desarrollo Web",
      estudiante: "Juan Pérez",
      tutor: "María González",
      justificacion: "Cita médica programada",
      certificado: "certificado_medico.pdf",
      fecha: "2024-01-15",
      estado: "Aprobada",
    },
    {
      id: "EXC002",
      pasantia: "Pasantía Marketing Digital",
      estudiante: "Ana Martínez",
      tutor: "Carlos Ruiz",
      justificacion: "Emergencia familiar",
      certificado: "justificacion.pdf",
      fecha: "2024-01-14",
      estado: "Pendiente",
    },
    {
      id: "EXC003",
      pasantia: "Pasantía Gestión",
      estudiante: "Pedro López",
      tutor: "Laura Sánchez",
      justificacion: "Problemas de transporte",
      certificado: "carta_excusa.pdf",
      fecha: "2024-01-13",
      estado: "Rechazada",
    },
  ])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      console.log("[v0] Archivo seleccionado:", e.target.files[0].name)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Enviando excusa:", formData)
    console.log("[v0] Archivo adjunto:", selectedFile?.name)

    // Reset form
    setFormData({
      pasantia: "",
      estudiante: "",
      tutor: "",
      justificacion: "",
    })
    setSelectedFile(null)
  }

  const filteredExcuses = excuses.filter((excuse) => {
    const matchesSearch =
      excuse.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excuse.pasantia.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterTaller === "all" || excuse.pasantia === filterTaller
    return matchesSearch && matchesFilter
  })

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Aprobada":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900">
            Aprobada
          </Badge>
        )
      case "Pendiente":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900">
            Pendiente
          </Badge>
        )
      case "Rechazada":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900">
            Rechazada
          </Badge>
        )
    }
  }

  return (
    <Main>
      <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3 text-foreground flex items-center gap-3">
              <FileText className="h-10 w-10" />
              Enviar Excusa
            </h1>
            <p className="text-muted-foreground text-lg">Sistema de Gestión de Pasantías CHECKINT IN</p>
          </div>

          {/* Form Card */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Registrar Nueva Excusa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pasantia">Pasantía *</Label>
                    <Select
                      value={formData.pasantia}
                      onValueChange={(value) => setFormData({ ...formData, pasantia: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione pasantía" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desarrollo-web">Pasantía Desarrollo Web</SelectItem>
                        <SelectItem value="marketing">Pasantía Marketing Digital</SelectItem>
                        <SelectItem value="gestion">Pasantía Gestión</SelectItem>
                        <SelectItem value="diseno">Pasantía Diseño Gráfico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estudiante">Estudiante *</Label>
                    <Select
                      value={formData.estudiante}
                      onValueChange={(value) => setFormData({ ...formData, estudiante: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione estudiante" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="juan">Juan Pérez</SelectItem>
                        <SelectItem value="ana">Ana Martínez</SelectItem>
                        <SelectItem value="pedro">Pedro López</SelectItem>
                        <SelectItem value="maria">María García</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tutor">Tutor *</Label>
                    <Select
                      value={formData.tutor}
                      onValueChange={(value) => setFormData({ ...formData, tutor: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tutor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maria">María González</SelectItem>
                        <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                        <SelectItem value="laura">Laura Sánchez</SelectItem>
                        <SelectItem value="roberto">Roberto Fernández</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certificado">Certificado (PNG o PDF)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="certificado"
                        type="file"
                        accept=".png,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => document.getElementById("certificado")?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {selectedFile ? selectedFile.name : "Seleccionar archivo"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justificacion">Justificación *</Label>
                  <Textarea
                    id="justificacion"
                    placeholder="Describa la razón de la excusa..."
                    value={formData.justificacion}
                    onChange={(e) => setFormData({ ...formData, justificacion: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Excusa
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Registered Excuses */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Excusas Registradas</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por estudiante..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterTaller} onValueChange={setFilterTaller}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filtrar por taller" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los talleres</SelectItem>
                    <SelectItem value="Pasantía Desarrollo Web">Desarrollo Web</SelectItem>
                    <SelectItem value="Pasantía Marketing Digital">Marketing Digital</SelectItem>
                    <SelectItem value="Pasantía Gestión">Gestión</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Pasantía</TableHead>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Tutor</TableHead>
                      <TableHead>Justificación</TableHead>
                      <TableHead>Certificado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExcuses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          No se encontraron excusas
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredExcuses.map((excuse) => (
                        <TableRow key={excuse.id}>
                          <TableCell className="font-medium">{excuse.id}</TableCell>
                          <TableCell>{excuse.pasantia}</TableCell>
                          <TableCell>{excuse.estudiante}</TableCell>
                          <TableCell>{excuse.tutor}</TableCell>
                          <TableCell className="max-w-xs truncate">{excuse.justificacion}</TableCell>
                          <TableCell>{excuse.certificado}</TableCell>
                          <TableCell>{excuse.fecha}</TableCell>
                          <TableCell>{getEstadoBadge(excuse.estado)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Acciones
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => console.log("[v0] Ver detalles:", excuse.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => console.log("[v0] Descargar certificado:", excuse.certificado)}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Descargar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => console.log("[v0] Eliminar excusa:", excuse.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
}
